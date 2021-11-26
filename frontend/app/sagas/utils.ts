import { Action, ActionCreator } from "typescript-fsa";
import {
  CallEffect,
  ForkEffect,
  call,
  cancel,
  takeLeading,
} from "redux-saga/effects";
import { ApiError } from "../../lib/redux/middlewares/request";
import { SagaIterator } from "@redux-saga/core";

const handleError = (error: unknown) => {
  // eslint-disable-next-line no-console
  console.log(error);
  if (error instanceof ApiError) {
    if (error.errcode) {
      // eslint-disable-next-line no-alert
      alert(`ApiError: ${error.errcode}`);
    }
  } else if (error instanceof Error) {
    // eslint-disable-next-line no-alert
    alert(`FrontendError: ${error.name}`);
  }
};

const callSafeInternal = <Args extends unknown[]>(
  saga: (...args: Args) => unknown,
  cancelIfError: boolean,
  ...args: Args
): CallEffect => {
  // eslint-disable-next-line consistent-return
  return call(function* execCallSafe(): SagaIterator {
    try {
      return yield call(saga, ...args);
    } catch (error) {
      handleError(error);
      if (cancelIfError) yield cancel();
    }
  });
};

export const callSafe = <Args extends unknown[]>(
  saga: (...args: Args) => unknown,
  ...args: Args
): CallEffect => {
  return callSafeInternal(saga, true, ...args);
};

export const takeLeadingSafe = <Payload>(
  actionCreator: ActionCreator<Payload>,
  saga: (action: Action<Payload>) => void
): ForkEffect => {
  return takeLeading(actionCreator, function* _(action: Action<Payload>) {
    yield callSafeInternal(saga, false, action);
  });
};
