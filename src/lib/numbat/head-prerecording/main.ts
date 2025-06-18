import "server-only";

import { numbat } from "../../../services/numbat";
import { NumbatError } from "../errors";
import { PrerecordingNotFoundError } from "./errors";
import { HeadPrerecordingInput, HeadPrerecordingOutput } from "./types";

export async function headPrerecording({
  event,
  start,
}: HeadPrerecordingInput): Promise<HeadPrerecordingOutput> {
  const { error, response } = await numbat.HEAD(
    "/prerecordings/{event}/{start}",
    {
      cache: "no-store",
      params: {
        path: {
          event: event,
          start: start,
        },
      },
      parseAs: "stream",
    },
  );

  if (error || !response.ok) {
    if (response.status === 404) throw new PrerecordingNotFoundError();
    throw new NumbatError();
  }

  const etag = response.headers.get("etag")!;
  const length = Number(response.headers.get("content-length")!);
  const modified = response.headers.get("last-modified")!;
  const type = response.headers.get("content-type")!;

  return {
    etag: etag,
    length: length,
    modified: modified,
    type: type,
  };
}
