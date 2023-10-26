import type { UnaryOperator } from "./index";

namespace Result {
    export interface Loading {
        state: "Loading";
    }

    export interface Success<T> {
        state: "Success";
        data: T;
    }

    export interface Failure<E = Error> {
        state: "Failure";
        error: E;
    }

    export const Loading = <T>(): Result<T> => ({
        state: "Loading"
    });

    export const Success = <T>(data: T): Result<T> => ({
        state: "Success",
        data
    });

    export const Failure = <T>(error: Error): Result<T> => ({
        state: "Failure",
        error
    });

    export const isLoading = <T>(result: Result<T>): result is Loading =>
        result.state === "Loading";

    export const isSuccess = <T>(result: Result<T>): result is Success<T> =>
        result.state === "Success";

    export const isFailure = <T>(result: Result<T>): result is Failure =>
        result.state === "Failure";

    export const map = <T, R>(result: Result<T>, operator: UnaryOperator<T, R>): Result<R> => {
        switch (result.state) {
            case "Loading":
                return result;
            case "Success":
                return { state: "Success", data: operator(result.data) };
            case "Failure":
                return { state: "Failure", error: result.error };
        }
    };
}

type Result<T, E = Error> = Result.Loading | Result.Success<T> | Result.Failure<E>;

export default Result;
