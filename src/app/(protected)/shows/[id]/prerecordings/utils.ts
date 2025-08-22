import { parseQueryParams } from "../../../../../lib/urls/parse-query-params";
import { searchParamsSchema } from "./schemas";
import { PrerecordingListSearchParams } from "./types";

export function parseParams(params: PrerecordingListSearchParams) {
  return parseQueryParams({
    params: new URLSearchParams(params),
    schema: searchParamsSchema,
  });
}
