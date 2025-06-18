import { notFound } from "next/navigation";

import {
  getShow,
  ShowNotFoundError,
} from "../../../../../../lib/beaver/get-show";
import { UploadPrerecordingWidget } from "../../../../../widgets/upload-prerecording-widget";
import { UploadPrerecordingPageViewInput } from "./types";

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

  return <UploadPrerecordingWidget show={show} />;
}
