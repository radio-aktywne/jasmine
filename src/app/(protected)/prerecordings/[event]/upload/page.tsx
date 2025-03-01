import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { UploadPrerecordingPageMetadata } from "../../../../../components/metadata/prerecordings/upload-prerecording-page-metadata";
import { UploadPrerecordingPageView } from "../../../../../components/views/prerecordings/upload-prerecording-page-view";
import { getLanguage } from "../../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../../lib/i18n/load-locale";
import { UploadPrerecordingPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({}: UploadPrerecordingPageInput): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: i18n._(msg({ message: "jasmine" })),
    title: i18n._(msg({ message: "Upload prerecording • jasmine" })),
  };
}

export default function UploadPrerecordingPage({
  params,
}: UploadPrerecordingPageInput) {
  const event = params.event;

  return (
    <>
      <UploadPrerecordingPageMetadata event={event} />
      <UploadPrerecordingPageView event={event} />
    </>
  );
}
