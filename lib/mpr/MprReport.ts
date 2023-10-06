import type { MprRecord, MprResponse } from "../mpr";
import { queryString } from "../mpr";
import { MprRequest } from "./MprRequest";
import MprSection from "./MprSection";

class MprReport<Section extends string> extends MprRequest<MprResponse<Section, MprRecord>[]> {
    private readonly baseUrl: string;

    public constructor(baseUrl: string, slug: number, filters?: Map<string, string>, sort?: string) {
        super(filters, sort);
        this.baseUrl = `${baseUrl}/reports/${slug}`;
    }

    public section(section: Section): MprSection<Section, MprRecord> {
        return new MprSection<Section, MprRecord>(`${this.baseUrl}/${section}`, this.filters, this.sortColumn);
    }

    public get url(): string {
        return `${this.baseUrl}?${queryString(this.query.set("allSections", "true"))}`;
    }
}

export default MprReport;
