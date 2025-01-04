import "server-only";

import { numbat } from "../../../services/numbat";
import { NumbatError } from "../errors";
import { PrerecordingNotFoundError } from "./errors";
import { DeletePrerecordingInput } from "./types";

export async function deletePrerecording({
  event,
  start,
}: DeletePrerecordingInput): Promise<void> {
  const { error, response } = await numbat.DELETE(
    "/prerecordings/{event}/{start}",
    {
      params: {
        path: {
          event: event,
          start: start,
        },
      },
    },
  );

  if (error || !response.ok) {
    if (response.status === 404) throw new PrerecordingNotFoundError();
    throw new NumbatError();
  }
}
