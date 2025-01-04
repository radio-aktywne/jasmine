import { i18n } from "@lingui/core";
import { msg, t } from "@lingui/macro";
import { Metadata } from "next";

import { PrerecordingsPageMetadata } from "../../../../components/metadata/prerecordings/prerecordings-page-metadata";
import { PrerecordingsPageView } from "../../../../components/views/prerecordings/prerecordings-page-view";
import { getLanguage } from "../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../lib/i18n/load-locale";
import { PrerecordingsPageInput } from "./types";

export const dynamic = "force-dynamic";

export async function generateMetadata({}: PrerecordingsPageInput): Promise<Metadata> {
  const { language } = getLanguage();
  await loadLocale({ i18n, language });

  return {
    description: t(i18n)(msg({ message: "jasmine" })),
    title: t(i18n)(msg({ message: "Prerecordings • jasmine" })),
  };
}

export default function PrerecordingsPage({ params }: PrerecordingsPageInput) {
  const event = params.event;

  return (
    <>
      <PrerecordingsPageMetadata event={event} />
      <PrerecordingsPageView event={event} />
    </>
  );
}
