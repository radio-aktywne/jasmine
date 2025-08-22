import { parseQueryParams } from "../../../../../lib/urls/parse-query-params";
import { searchParamsSchema } from "./schemas";
import { PrerecordingListPageSearchParams } from "./types";

export function parseParams(params: PrerecordingListPageSearchParams) {
  return parseQueryParams({
    params: new URLSearchParams(params),
    schema: searchParamsSchema,
  });
}
