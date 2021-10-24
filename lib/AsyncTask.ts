import Result from "./Result";

interface IAsyncTask<T> {
    when<R>(matcher: AsyncTask.Matcher<T, R>): void;
}

namespace AsyncTask {
    export enum Type {
        Loading = "Loading",
        Complete = "Complete"
    }

    export interface Matcher<T, R> extends Result.Matcher<T, R> {
        isLoading(): R;
    }

    export class Loading<T> implements IAsyncTask<T> {
        public type = Type.Loading;
        public when = <R>(matcher: Matcher<T, R>): R => matcher.isLoading();
    }

    export class Complete<T> implements IAsyncTask<T> {
        public type = Type.Complete;
        public constructor(public readonly result: Result<T>) {}
        public when = <R>(matcher: Matcher<T, R>): R => this.result.when(matcher);
    }

    export const isLoading = <T>(state: AsyncTask<T>): state is Loading<T> =>
        state.type === Type.Loading;

    export const isComplete = <T>(state: AsyncTask<T>): state is Complete<T> =>
        state.type === Type.Complete;

    export async function * from<T>(promise: Promise<T>): AsyncIterable<AsyncTask<T>> {
        yield new Loading<T>();
        yield new Complete(await Result.fromAsync(promise));
    }
}

type AsyncTask<T> = AsyncTask.Loading<T> | AsyncTask.Complete<T>;

export default AsyncTask;
