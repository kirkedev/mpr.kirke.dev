import { map } from "../itertools/map";
import zip from "../itertools/zip";
import { getDate, getFloat } from "../mpr";
import type Cutout from ".";
import type { ValuesRecord, ValuesResponse, VolumeRecord, VolumeResponse } from "./mpr";

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
