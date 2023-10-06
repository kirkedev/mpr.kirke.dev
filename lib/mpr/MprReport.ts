import axios from "axios";
import type { MprRecord, MprResponse } from "../mpr";
import { queryString } from "../mpr";
import { MprRequest } from "./MprRequest";
import MprSection from "./MprSection";

type Response<Section extends string> = MprResponse<Section, MprRecord>;

class MprReport<Section extends string> extends MprRequest<Response<Section>[]> {
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

    public get(): Promise<Response<Section>[]> {
        return axios.get<Response<Section>[]>(this.url).then(response => response.data);
    }
}

export default MprReport;
