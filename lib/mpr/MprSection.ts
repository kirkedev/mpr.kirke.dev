import axios from "axios";
import type { Nullable } from "..";
import type { MprResponse } from ".";
import { queryString } from ".";
import MprRequest from "./MprRequest";

class MprSection<Section extends string, T extends Record<string, Nullable<string>>>
    extends MprRequest<MprResponse<Section, T>> {

    public constructor(private readonly baseUrl: string, filters?: Map<string, string>, sort?: string) {
        super(filters, sort);
    }

    public get url(): string {
        const query = queryString(this.query);
        return query.length === 0 ? this.baseUrl : `${this.baseUrl}?${query}`;
    }

    public get(): Promise<MprResponse<Section, T>> {
        return axios.get<MprResponse<Section, T>>(this.url).then(response => response.data);
    }
}

export default MprSection;
