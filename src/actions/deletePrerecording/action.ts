"use server";

import { emilounge } from "../../api";
import { DeletePrerecordingProps } from "./types";

const errorMessage = "Deleting prerecording failed.";

export async function deletePrerecording({
  event,
  start,
}: DeletePrerecordingProps) {
  try {
    const { error, response } = await emilounge.DELETE(
      "/prerecordings/{event}/{start}",
      {
        params: {
          path: { event, start },
        },
      },
    );

    return { error: error || !response.ok ? errorMessage : undefined };
  } catch (error) {
    return { error: errorMessage };
  }
}
