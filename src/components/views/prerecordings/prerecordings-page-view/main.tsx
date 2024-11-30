import { notFound } from "next/navigation";

import {
  EventNotFoundError,
  listPrerecordings,
} from "../../../../lib/numbat/list-prerecordings";
import { PrerecordingListWidget } from "../../../widgets/prerecording-list-widget";
import { perPage } from "./constants";
import { PrerecordingsPageViewInput } from "./types";

export async function PrerecordingsPageView({
  event,
}: PrerecordingsPageViewInput) {
  try {
    const { prerecordings } = await listPrerecordings({
      event: event,
      limit: perPage,
    });

    return (
      <PrerecordingListWidget
        event={event}
        perPage={perPage}
        prerecordings={prerecordings}
      />
    );
  } catch (error) {
    if (error instanceof EventNotFoundError) notFound();
    throw error;
  }
}
