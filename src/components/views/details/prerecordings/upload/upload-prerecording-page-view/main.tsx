import { notFound } from "next/navigation";

import {
  getShow,
  ShowNotFoundError,
} from "../../../../../../lib/beaver/get-show";
import { listEventsInstances } from "../../../../../../lib/wrappers/list-events-instances";
import { UploadPrerecordingWidget } from "../../../../../widgets/upload-prerecording-widget";
import { datetimeFormat } from "./constants";
import { UploadPrerecordingPageViewInput } from "./types";
import { getEndDatetime } from "./utils";

export async function UploadPrerecordingPageView({
  show: showId,
}: UploadPrerecordingPageViewInput) {
  const { show } = await (async () => {
    try {
      return await getShow({ id: showId });
    } catch (error) {
      if (error instanceof ShowNotFoundError) notFound();
      throw error;
    }
  })();

  const props = {
    end: getEndDatetime().format(datetimeFormat),
    where: JSON.stringify({
      show: { is: { id: show.id } },
      type: "prerecorded",
    }),
  };
  const { instances } = await listEventsInstances(props);

  return (
    <UploadPrerecordingWidget instances={instances} show={show} {...props} />
  );
}
