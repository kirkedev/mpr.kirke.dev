import Result from "lib/Result";
import type { Readable } from "svelte/store";

const promisify = <T>(store: Readable<Result<T>>): Promise<T> =>
    new Promise(function(resolve, reject) {
        const unsubscribe = store.subscribe(function(result) {
            if (Result.isSuccess(result)) {
                resolve(result.data);
                unsubscribe();
            }

            if (Result.isFailure(result)) {
                reject(result.error);
                unsubscribe();
            }
        });
    });

export { promisify };
