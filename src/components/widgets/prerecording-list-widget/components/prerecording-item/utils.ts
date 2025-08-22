import prettyBytes from "pretty-bytes";
import slugify from "slugify";

import dayjs from "../../../../../dayjs";
import { PrerecordingItemInput } from "./types";

export function formatStartDateText(
  prerecording: PrerecordingItemInput["prerecording"],
  timezone?: string,
) {
  const start = dayjs.tz(prerecording.start, prerecording.event.timezone);
  return (timezone ? start.tz(timezone) : start.local()).format("LL");
}

export function formatStartTimeText(
  prerecording: PrerecordingItemInput["prerecording"],
  timezone?: string,
) {
  const start = dayjs.tz(prerecording.start, prerecording.event.timezone);
  return (timezone ? start.tz(timezone) : start.local()).format("LT");
}

export function formatSizeText(
  prerecording: PrerecordingItemInput["prerecording"],
  language: string,
) {
  return prettyBytes(prerecording.length, { locale: language });
}

export function formatFilename(
  prerecording: PrerecordingItemInput["prerecording"],
) {
  const title = prerecording.event.show?.title;
  const start = dayjs.tz(prerecording.start, prerecording.event.timezone);

  const formattedTitle = slugify(title || "Unknown");
  const formattedStart = start.utc().format("YYYYMMDDTHHmmss[Z]");

  return `${formattedTitle}_${formattedStart}`;
}
