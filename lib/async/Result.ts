interface Loading<T> {
    readonly status: "loading";
    readonly data?: T;
}

interface Success<T> {
    readonly status: "success";
    readonly data: T;
}

interface Failure<E extends Error> {
    readonly status: "error";
    readonly error: E;
}

namespace Result {
    export const Loading = <T>(data?: T): Loading<T> => ({
        status: "loading",
        data
    });

    export const Success = <T>(data: T): Success<T> => ({
        status: "success",
        data
    });

    export const Failure = <E extends Error>(error: E): Failure<E> => ({
        status: "error",
        error
    });

    export const isLoading = <T, E extends Error>(result: Result<T, E>): result is Loading<T> =>
        result.status === "loading";

    export const isSuccess = <T, E extends Error>(result: Result<T, E>): result is Success<T> =>
        result.status === "success";

    export const isFailure = <T, E extends Error>(result: Result<T, E>): result is Failure<E> =>
        result.status === "error";
}

type Result<T, E extends Error> = Success<T> | Loading<T> | Failure<E>;

export default Result;

export type { Success, Failure, Loading };
