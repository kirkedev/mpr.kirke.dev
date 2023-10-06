import type { MprRecord, MprResponse } from ".";
import { queryString } from ".";
import MprRequest from "./MprRequest";

class MprSection<Section extends string, T extends MprRecord> extends MprRequest<MprResponse<Section, T>> {
    public constructor(private readonly baseUrl: string, filters?: Map<string, string>, sort?: string) {
        super(filters, sort);
    }

    public get url(): string {
        const query = queryString(this.query);
        return query.length === 0 ? this.baseUrl : `${this.baseUrl}?${query}`;
    }
}

export default MprSection;
