import type { MprResponse } from "../mpr";
import type MprReport from "../mpr/MprReport";
import type MprSection from "../mpr/MprSection";

interface VolumeRecord extends Record<string, string> {
    slug_id: string;
    slug_name: string;
    report_title: string;
    published_date: string;
    report_date: string;
    temp_cuts_total_load: string;
    temp_process_total_load: string;
}

interface ValuesRecord extends Record<string, string> {
    slug_id: string;
    slug_name: string;
    report_title: string;
    published_date: string;
    report_date: string;
    pork_carcass: string;
    pork_belly: string;
    pork_butt: string;
    pork_ham: string;
    pork_loin: string;
    pork_picnic: string;
    pork_rib: string;
}

type Section = "Current Volume" | "Cutout and Primal Values";
type VolumeResponse = MprResponse<"Current Volume", VolumeRecord>;
type ValuesResponse = MprResponse<"Cutout and Primal Values", ValuesRecord>;

interface CutoutReport extends MprReport<Section> {
    section(section: "Current Volume"): MprSection<"Current Volume", VolumeRecord>;
    section(section: "Cutout and Primal Values"): MprSection<"Cutout and Primal Values", ValuesRecord>;
}

export type { CutoutReport, ValuesRecord, VolumeRecord, ValuesResponse, VolumeResponse };
