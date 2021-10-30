import axios from "axios";
import type { Nullable } from "..";
import type { MprResponse } from "../mpr";
import { queryString } from "../mpr";
import { MprRequest } from "./MprRequest";
import MprSection from "./MprSection";

type Response<Section extends string> = MprResponse<Section, Record<string, Nullable<string>>>[];

class MprReport<Section extends string> extends MprRequest<Response<Section>> {
    private readonly baseUrl: string;

    public constructor(baseUrl: string, slug: number, filters?: Map<string, string>, sort?: string) {
        super(filters, sort);
        this.baseUrl = `${baseUrl}/reports/${slug}`;
    }

    public section<T extends Record<string, Nullable<string>>>(section: Section): MprSection<Section, T> {
        return new MprSection<Section, T>(`${this.baseUrl}/${section}`, this.filters, this.sortColumn);
    }

    public get url(): string {
        return `${this.baseUrl}?${queryString(this.query.set("allSections", "true"))}`;
    }

    public get(...sections: Section[]): Promise<Response<Section>> {
        return sections.length === 0
            ? axios.get<Response<Section>>(this.url).then(response => response.data)
            : Promise.all(sections.map(section => this.section(section).get()));
    }
}

export default MprReport;
