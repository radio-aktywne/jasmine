import { notFound } from "next/navigation";

import {
  EventNotFoundError,
  listPrerecordings,
} from "../../../../lib/numbat/list-prerecordings";
import { PrerecordingListWidget } from "../../../widgets/prerecording-list-widget";
import { PrerecordingListPageViewInput } from "./types";

export async function PrerecordingListPageView({
  event,
}: PrerecordingListPageViewInput) {
  try {
    const { prerecordings } = await listPrerecordings({ event: event });

    return (
      <PrerecordingListWidget event={event} prerecordings={prerecordings} />
    );
  } catch (error) {
    if (error instanceof EventNotFoundError) notFound();
    throw error;
  }
}
