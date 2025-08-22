import { i18n } from "@lingui/core";
import { msg } from "@lingui/core/macro";
import { Metadata } from "next";

import { PrerecordingListPageMetadata } from "../../../../../components/metadata/details/prerecordings/prerecording-list-page-metadata";
import { PrerecordingListPageView } from "../../../../../components/views/details/prerecordings/prerecording-list-page-view";
import dayjs from "../../../../../dayjs";
import { getLanguage } from "../../../../../lib/i18n/get-language";
import { loadLocale } from "../../../../../lib/i18n/load-locale";
import { PrerecordingListPageInput } from "./types";
import { parseParams } from "./utils";

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
  searchParams,
}: PrerecordingListPageInput) {
  const { id: show } = params;

  const { data: parsedSearchParams, error: parsingSearchParamsError } =
    parseParams(searchParams);

  if (parsingSearchParamsError) throw new Error("Invalid query parameters");

  const { after, before, timezone } = parsedSearchParams;

  if (after && !dayjs.tz(after, timezone).isValid())
    throw new Error("Invalid query parameters");

  if (before && !dayjs.tz(before, timezone).isValid())
    throw new Error("Invalid query parameters");

  return (
    <>
      <PrerecordingListPageMetadata show={show} />
      <PrerecordingListPageView
        after={after}
        before={before}
        show={show}
        timezone={timezone}
      />
    </>
  );
}
