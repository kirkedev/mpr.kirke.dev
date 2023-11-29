namespace Result {
    export class Loading<T> {
        public readonly status = "loading";
        public constructor(public readonly data?: T) {}
    }

    export class Success<T> {
        public readonly status = "success";
        public constructor(public readonly data: T) {}
    }

    export class Failure<E extends Error> {
        public readonly status = "error";
        public constructor(public readonly error: E) {}
    }

    export const isLoading = <T, E extends Error>(result: Result<T, E>): result is Loading<T> =>
        result.status === "loading";

    export const isSuccess = <T, E extends Error>(result: Result<T, E>): result is Success<T> =>
        result.status === "success";

    export const isFailure = <T, E extends Error>(result: Result<T, E>): result is Failure<E> =>
        result.status === "error";
}

type Result<T, E extends Error> = Result.Success<T> | Result.Loading<T> | Result.Failure<E>;

export default Result;
