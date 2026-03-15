import { orpcContractRootBase } from "../../../../../../../bases/root";
import { Schemas } from "./schemas";

export const listShowPrerecordings = orpcContractRootBase
  .input(Schemas.Input)
  .output(Schemas.Output);
