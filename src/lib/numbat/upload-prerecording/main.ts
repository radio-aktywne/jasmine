import "server-only";

import { numbat } from "../../../services/numbat";
import { NumbatError } from "../errors";
import { EventInstanceNotFoundError } from "./errors";
import { UploadPrerecordingInput } from "./types";

export async function uploadPrerecording({
  data,
  event,
  start,
  type,
}: UploadPrerecordingInput): Promise<void> {
  const { error, response } = await numbat.PUT(
    "/prerecordings/{event}/{start}",
    {
      body: data as unknown as undefined,
      bodySerializer: (body) => body,
      duplex: "half",
      params: {
        header: {
          "Content-Type": type,
        },
        path: {
          event: event,
          start: start,
        },
      },
    },
  );

  if (error || !response.ok) {
    if (response.status === 404) throw new EventInstanceNotFoundError();
    throw new NumbatError();
  }
}
