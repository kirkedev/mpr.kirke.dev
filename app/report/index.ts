import { format } from "d3-format";
import { bisector } from "d3-array";
import type Observation from "lib/Observation";

const formatNumber = format(".2f");
const { center: bisectDate } = bisector<Observation, Date>(observation => observation.date);

export { formatNumber, bisectDate };
