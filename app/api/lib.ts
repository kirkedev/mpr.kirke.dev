import { bisector } from "d3-array";
import { format } from "d3-format";
import type { Data, Series } from "../ui/LineChart";

const formatNumber = format(".2f");

const { center: bisectDate } = bisector<Data, Date>(datum => datum.date);

const getObservation = (data: Series, date: Date): Data =>
    data[bisectDate(data, date)];

export { formatNumber, getObservation };
