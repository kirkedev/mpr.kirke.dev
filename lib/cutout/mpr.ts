import type { MprRecord, MprResponse } from "../mpr";
import type MprReport from "../mpr/MprReport";
import type MprSection from "../mpr/MprSection";
import type Cutout from "./index";
import { getDate, getFloat } from "../mpr";
import map from "../itertools/map";
import zip from "../itertools/zip";

interface VolumeRecord extends MprRecord {
    slug_id: string;
    slug_name: string;
    report_title: string;
    published_date: string;
    report_date: string;
    temp_cuts_total_load: string;
    temp_process_total_load: string;
}

interface ValuesRecord extends MprRecord {
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

const parse = ([volume, values]: [VolumeRecord, ValuesRecord]): Cutout => ({
    date: getDate(volume.report_date),
    reportDate: getDate(volume.report_date),
    primalLoads: getFloat(volume.temp_cuts_total_load),
    trimmingLoads: getFloat(volume.temp_process_total_load),
    carcassPrice: getFloat(values.pork_carcass),
    bellyPrice: getFloat(values.pork_belly),
    buttPrice: getFloat(values.pork_butt),
    hamPrice: getFloat(values.pork_ham),
    loinPrice: getFloat(values.pork_loin),
    picnicPrice: getFloat(values.pork_picnic),
    ribPrice: getFloat(values.pork_rib)
});

const parseResponse = (volume: VolumeResponse, values: ValuesResponse): Iterable<Cutout> =>
    map(zip(volume.results, values.results), parse);

export default parseResponse;

export type { CutoutReport, ValuesRecord, VolumeRecord, ValuesResponse, VolumeResponse };
