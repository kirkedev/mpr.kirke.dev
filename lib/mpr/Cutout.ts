import type { Observation } from "..";
import { map } from "../itertools/map";
import zip from "../itertools/zip";
import type { MprResponse } from ".";
import { getDate, getFloat } from ".";

interface VolumeRecord extends Record<string, string> {
    slug_id: string;
    slug_name: string;
    report_title: string;
    published_date: string;
    report_date: string;
    temp_cuts_total_load: string;
    temp_process_total_load: string;
}

interface PrimalsRecord extends Record<string, string> {
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

interface Cutout extends Observation {
    reportDate: Date;
    primalLoads: number;
    trimmingLoads: number;
    carcassPrice: number;
    bellyPrice: number;
    buttPrice: number;
    hamPrice: number;
    loinPrice: number;
    picnicPrice: number;
    ribPrice: number;
}

const parse = ([volume, primals]: [VolumeRecord, PrimalsRecord]): Cutout => ({
    date: getDate(volume.report_date),
    reportDate: getDate(volume.report_date),
    primalLoads: getFloat(volume.temp_cuts_total_load),
    trimmingLoads: getFloat(volume.temp_process_total_load),
    carcassPrice: getFloat(primals.pork_carcass),
    bellyPrice: getFloat(primals.pork_belly),
    buttPrice: getFloat(primals.pork_butt),
    hamPrice: getFloat(primals.pork_ham),
    loinPrice: getFloat(primals.pork_loin),
    picnicPrice: getFloat(primals.pork_picnic),
    ribPrice: getFloat(primals.pork_rib)
});

type VolumeResponse = MprResponse<"Current Volume", VolumeRecord>;

type PrimalsResponse = MprResponse<"Cutout and Primal Values", PrimalsRecord>;

const parseResponse = (volume: VolumeResponse, primals: PrimalsResponse): Iterable<Cutout> =>
    map(zip(volume.results, primals.results), parse);

export default parseResponse;

export type { Cutout, PrimalsRecord, VolumeRecord, PrimalsResponse, VolumeResponse };
