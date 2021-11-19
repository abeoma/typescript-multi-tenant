import { SagaIterator } from "@redux-saga/core";
import { call, CallEffect } from "redux-saga/effects";
import { ApiError } from "../../lib/redux/middlewares/request";

export function callSafe<Args extends unknown[]>(
  saga: (...args: Args) => unknown,
  ...args: Args
): CallEffect {
  return call(function* (): SagaIterator {
    try {
      return yield call(saga, ...args);
    } catch (error) {
      if (error instanceof ApiError) {
        if (error.errcode) {
          alert(`ApiError: ${error.errcode}`);
        }
      } else if (error instanceof Error) {
        alert(`FrontendError: ${error.name}`);
      }
      console.log(error);
    }
  });
}
