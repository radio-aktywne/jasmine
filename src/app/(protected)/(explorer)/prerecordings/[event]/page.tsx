import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { PrerecordingListPageMetadata } from "../../../../../components/metadata/prerecordings/prerecording-list-page-metadata";
import { PrerecordingListPageView } from "../../../../../components/views/prerecordings/prerecording-list-page-view";
import { getLanguage } from "../../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../../lib/i18n/load-locale";
import { PrerecordingListPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({}: PrerecordingListPageInput): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "jasmine" })),
    title: i18n._(msg({ message: "Prerecordings • jasmine" })),
  };
}

export default function PrerecordingListPage({
  params,
}: PrerecordingListPageInput) {
  const event = params.event;

  return (
    <>
      <PrerecordingListPageMetadata event={event} />
      <PrerecordingListPageView event={event} />
    </>
  );
}
