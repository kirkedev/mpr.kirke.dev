import { createResource } from "solid-js";
import type Observation from "lib/Observation";
import type Repository from "lib/Repository";
import AsyncTask from "lib/AsyncTask";
import Result from "lib/Result";

interface Query {
    start: Date;
    end: Date;
}

function useQuery<T extends Observation>(repository: Repository<T>, start: Date, end: Date): AsyncTask<T[]> {
    const [data] = createResource(() => repository.query(start, end));

    return data.loading
        ? new AsyncTask.Loading<T[]>()
        : data.error
            ? new AsyncTask.Complete<T[]>(new Result.Failure<T[]>(data.error))
            : new AsyncTask.Complete<T[]>(new Result.Success<T[]>(data() as T[]));
}

export default useQuery;
export type { Query };
