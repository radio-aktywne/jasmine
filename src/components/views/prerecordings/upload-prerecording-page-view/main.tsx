import { notFound } from "next/navigation";

import { EventNotFoundError, getEvent } from "../../../../lib/beaver/get-event";
import { UploadPrerecordingWidget } from "../../../widgets/upload-prerecording-widget";
import { UploadPrerecordingPageViewInput } from "./types";

export async function UploadPrerecordingPageView({
  event: eventId,
}: UploadPrerecordingPageViewInput) {
  try {
    const { event } = await getEvent({ id: eventId });

    return <UploadPrerecordingWidget event={event} />;
  } catch (error) {
    if (error instanceof EventNotFoundError) notFound();
    throw error;
  }
}
