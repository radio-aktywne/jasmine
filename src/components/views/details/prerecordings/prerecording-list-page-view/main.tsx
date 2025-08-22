import { notFound } from "next/navigation";

import { getShow, ShowNotFoundError } from "../../../../../lib/beaver/get-show";
import { listEventsPrerecordings } from "../../../../../lib/wrappers/list-events-prerecordings";
import { PrerecordingListWidget } from "../../../../widgets/prerecording-list-widget";
import { PrerecordingListPageViewInput } from "./types";

export async function PrerecordingListPageView({
  after,
  before,
  show: showId,
  timezone,
}: PrerecordingListPageViewInput) {
  const { show } = await (async () => {
    try {
      return await getShow({ id: showId });
    } catch (error) {
      if (error instanceof ShowNotFoundError) notFound();
      throw error;
    }
  })();

  const props = {
    after: after && before && timezone ? after : undefined,
    before: after && before && timezone ? before : undefined,
    include: JSON.stringify({ show: true }),
    limit: 100,
    timezone: after && before && timezone ? timezone : undefined,
    where: JSON.stringify({
      show: { is: { id: show.id } },
      type: "prerecorded",
    }),
  };
  const { prerecordings } = await listEventsPrerecordings(props);

  return (
    <PrerecordingListWidget
      prerecordings={prerecordings}
      show={show}
      {...props}
    />
  );
}
