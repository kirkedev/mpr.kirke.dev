import { map } from "../itertools/map";
import zip from "../itertools/zip";
import { getDate, getFloat } from "../mpr";
import type { Cutout } from ".";
import type { PrimalsRecord, PrimalsResponse, VolumeRecord, VolumeResponse } from "./mpr";

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

const parseResponse = (volume: VolumeResponse, primals: PrimalsResponse): Iterable<Cutout> =>
    map(zip(volume.results, primals.results), parse);

export default parseResponse;
