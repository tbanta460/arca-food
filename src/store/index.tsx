import { AxiosError } from "axios";
import {
  CANCEL_ERROR,
  CLIENT_ERROR,
  CONNECTION_ERROR,
  getProblemFromError,
  NETWORK_ERROR,
  SERVER_ERROR,
  TIMEOUT_ERROR,
} from "./errorParser"

export type CustomAxiosErrorType = {
  axiosError: AxiosError;
  loggedIn: boolean;
  logout: () => void;
};
export const defaultErrorHandler = (error: CustomAxiosErrorType) => {
  try {
    // If the error is not due to API request, we'll throw and handle it elsewhere
    // if (error instanceof Error) {
    //   logErrors({
    //     log: error,
    //     hint: "`defaultErrorHandler` error instance",
    //   });
    //   alert(
    //     "Internal Error: Something went wrong. Please try again later."
    //   );
    //   throw error;
    // }
    let errorList = [];

    const { axiosError: err, logout } = error;

    const problem = getProblemFromError(err);

    if (problem === CLIENT_ERROR) {
      if (err.response?.status === 401) {
        alert("You have been logged out.");
        logout();
      } else if (err.response?.status === 429) {
        alert(
          "You have made too many requests in a short amount of time. Please try again later."
        );
      } else if (err.response?.status === 422) {
        errorList = err.response?.data as any;
      } else {
        errorList = [err.response?.data];
      }
    } else if (problem === SERVER_ERROR) {
      // 5XX, nothing we can do on our end
      const message =
        "Server Error: Something went wrong. Please try again later.";
      console.warn(message);
      alert(message);
    } else if (problem === TIMEOUT_ERROR) {
      // We can just show on a Alert
      const message =
        "Timeout: Request took too long to process. Please try again.";
      console.warn(message);
      alert(message);
    } else if (problem === CONNECTION_ERROR) {
      // We can just show on a Alert
      const message = "Error: Server is not available. Please try again later.";
      console.warn(message);
      alert(message);
    } else if (problem === NETWORK_ERROR) {
      // We can just show on a Alert
      const message =
        "Unable to connect to the internet. Please check your connection and try again.";
      console.warn(message);
      alert(message);
    } else if (problem === CANCEL_ERROR) {
      // We don't need to do anything
      const message = "Request has been canceled.";
      console.warn(message);
    } else {
      // We should never get here
      const message =
        "Fatal Error: Something went very wrong. Please try again later.";
      console.warn(message);
      alert(message);
    }

    throw errorList;
  } catch (e) {
    console.error(e, e);
    throw e;
  }
};