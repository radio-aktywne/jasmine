import { PrerecordingsEventNotFoundMetadata } from "../../../../components/metadata/prerecordings/prerecordings-event-not-found-metadata";
import { PrerecordingsEventNotFoundView } from "../../../../components/views/prerecordings/prerecordings-event-not-found-view";
import { PrerecordingsEventNotFoundInput } from "./types";

export default function PrerecordingsEventNotFound({}: PrerecordingsEventNotFoundInput) {
  return (
    <>
      <PrerecordingsEventNotFoundMetadata />
      <PrerecordingsEventNotFoundView />
    </>
  );
}
