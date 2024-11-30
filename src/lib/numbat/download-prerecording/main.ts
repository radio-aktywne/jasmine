import "server-only";

import { numbat } from "../../../services/numbat";
import { NumbatError } from "../errors";
import { PrerecordingNotFoundError } from "./errors";
import { DownloadPrerecordingInput, DownloadPrerecordingOutput } from "./types";

export async function downloadPrerecording({
  event,
  start,
}: DownloadPrerecordingInput): Promise<DownloadPrerecordingOutput> {
  const { data, error, response } = await numbat.GET(
    "/prerecordings/{event}/{start}",
    {
      params: {
        path: {
          event: event,
          start: start,
        },
      },
      parseAs: "stream",
    },
  );

  if (error) {
    if (response.status === 404) throw new PrerecordingNotFoundError();
    throw new NumbatError();
  }

  const etag = response.headers.get("etag")!;
  const length = Number(response.headers.get("content-length")!);
  const modified = response.headers.get("last-modified")!;
  const type = response.headers.get("content-type")!;

  return {
    data: data!,
    etag: etag,
    length: length,
    modified: modified,
    type: type,
  };
}
