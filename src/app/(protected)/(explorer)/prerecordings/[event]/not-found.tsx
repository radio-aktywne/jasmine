import { PrerecordingListEventNotFoundMetadata } from "../../../../../components/metadata/prerecordings/prerecording-list-event-not-found-metadata";
import { PrerecordingListEventNotFoundView } from "../../../../../components/views/prerecordings/prerecording-list-event-not-found-view";
import { PrerecordingListEventNotFoundInput } from "./types";

export const dynamic = "force-dynamic";

export default function PrerecordingListEventNotFound({}: PrerecordingListEventNotFoundInput) {
  return (
    <>
      <PrerecordingListEventNotFoundMetadata />
      <PrerecordingListEventNotFoundView />
    </>
  );
}
