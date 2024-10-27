/**
 * This file is mostly taken from apisauce, adapted to run in web
 * https://github.com/infinitered/apisauce/blob/master/lib/apisauce.ts
 */
import axios from "axios";

/**
 * Given a min and max, determines if the value is included
 * in the range.
 *
 * @sig Number a -> a -> a -> b
 * @param {Number} the minimum number
 * @param {Number} the maximum number
 * @param {Number} the value to test
 * @return {Boolean} is the value in the range?
 * @example
 * isWithin(1, 5, 3) //=> true
 * isWithin(1, 5, 1) //=> true
 * isWithin(1, 5, 5) //=> true
 * isWithin(1, 5, 5.1) //=> false
 */
const isWithin = (min: number, max: number, value: number): boolean =>
  value >= min && value <= max;

export const NONE = null;
export const CLIENT_ERROR = "CLIENT_ERROR";
export const SERVER_ERROR = "SERVER_ERROR";
export const TIMEOUT_ERROR = "TIMEOUT_ERROR";
export const CONNECTION_ERROR = "CONNECTION_ERROR";
export const NETWORK_ERROR = "NETWORK_ERROR";
export const UNKNOWN_ERROR = "UNKNOWN_ERROR";
export const CANCEL_ERROR = "CANCEL_ERROR";

const TIMEOUT_ERROR_CODES = ["ECONNABORTED"];
const NODEJS_CONNECTION_ERROR_CODES = [
  "ENOTFOUND",
  "ECONNREFUSED",
  "ECONNRESET",
];
const in200s = (n: number): boolean => isWithin(200, 299, n);
const in400s = (n: number): boolean => isWithin(400, 499, n);
const in500s = (n: number): boolean => isWithin(500, 599, n);

/**
 * What's the problem for this axios response?
 */
export const getProblemFromError = (error: any) => {
  // first check if the error message is Network Error (set by axios at 0.12) on platforms other than NodeJS.
  if (error.message === "Network Error") return NETWORK_ERROR;
  if (axios.isCancel(error)) return CANCEL_ERROR;

  // then check the specific error code
  if (TIMEOUT_ERROR_CODES.includes(error.code)) return TIMEOUT_ERROR;
  if (NODEJS_CONNECTION_ERROR_CODES.includes(error.code))
    return CONNECTION_ERROR;
  if (error.response) return getProblemFromStatus(error.response.status);
  return UNKNOWN_ERROR;
};

type StatusCodes = undefined | number;

/**
 * Given a HTTP status code, return back the appropriate problem enum.
 */
export const getProblemFromStatus = (status: StatusCodes) => {
  if (!status) return UNKNOWN_ERROR;
  if (in200s(status)) return NONE;
  if (in400s(status)) return CLIENT_ERROR;
  if (in500s(status)) return SERVER_ERROR;
  return UNKNOWN_ERROR;
};