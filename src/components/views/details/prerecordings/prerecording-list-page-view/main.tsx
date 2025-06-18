import { notFound } from "next/navigation";

import { getShow, ShowNotFoundError } from "../../../../../lib/beaver/get-show";
import { listEventsPrerecordings } from "../../../../../lib/wrappers/list-events-prerecordings";
import { PrerecordingListWidget } from "../../../../widgets/prerecording-list-widget";
import { PrerecordingListPageViewInput } from "./types";

export async function PrerecordingListPageView({
  show: showId,
}: PrerecordingListPageViewInput) {
  const { show } = await (async () => {
    try {
      return await getShow({ id: showId });
    } catch (error) {
      if (error instanceof ShowNotFoundError) notFound();
      throw error;
    }
  })();

  const include = JSON.stringify({ show: true });
  const where = JSON.stringify({ show: { id: show.id }, type: "prerecorded" });
  const { prerecordings } = await listEventsPrerecordings({
    include: include,
    where: where,
  });

  return (
    <PrerecordingListWidget
      include={include}
      prerecordings={prerecordings}
      show={show}
      where={where}
    />
  );
}
