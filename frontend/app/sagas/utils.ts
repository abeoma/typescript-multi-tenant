import { SagaIterator } from "@redux-saga/core";
import {
  call,
  CallEffect,
  cancel,
  ForkEffect,
  takeLeading,
} from "redux-saga/effects";
import { Action, ActionCreator } from "typescript-fsa";
import { ApiError } from "../../lib/redux/middlewares/request";

const handleError = (error: unknown) => {
  console.log(error);
  if (error instanceof ApiError) {
    if (error.errcode) {
      alert(`ApiError: ${error.errcode}`);
    }
  } else if (error instanceof Error) {
    alert(`FrontendError: ${error.name}`);
  }
};

function callSafeInternal<Args extends unknown[]>(
  saga: (...args: Args) => unknown,
  cancelIfError: boolean,
  ...args: Args
): CallEffect {
  return call(function* (): SagaIterator {
    try {
      return yield call(saga, ...args);
    } catch (error) {
      handleError(error);
      if (cancelIfError) yield cancel();
    }
  });
}

export function callSafe<Args extends unknown[]>(
  saga: (...args: Args) => unknown,
  ...args: Args
): CallEffect {
  return callSafeInternal(saga, true, ...args);
}

export function takeLeadingSafe<Payload>(
  actionCreator: ActionCreator<Payload>,
  saga: (action: Action<Payload>) => void
): ForkEffect {
  return takeLeading(actionCreator, function* _(action: Action<Payload>) {
    yield callSafeInternal(saga, false, action);
  });
}
