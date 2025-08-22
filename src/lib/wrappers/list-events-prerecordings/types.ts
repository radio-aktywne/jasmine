import { ListEventsInput, ListEventsOutput } from "../../beaver/list-events";
import { HeadPrerecordingOutput } from "../../numbat/head-prerecording";
import {
  ListPrerecordingsInput,
  ListPrerecordingsOutput,
} from "../../numbat/list-prerecordings";

export type ListEventsPrerecordingsPrerecording = {
  etag: HeadPrerecordingOutput["etag"];
  event: ListEventsOutput["events"]["events"][number];
  length: HeadPrerecordingOutput["length"];
  modified: HeadPrerecordingOutput["modified"];
  start: ListPrerecordingsOutput["prerecordings"]["prerecordings"][number]["start"];
  type: HeadPrerecordingOutput["type"];
};

export type ListEventsPrerecordingsPrerecordings = {
  events: ListEventsOutput["events"]["events"];
  prerecordings: ListEventsPrerecordingsPrerecording[];
};

export type ListEventsPrerecordingsInput = {
  after?: string;
  before?: string;
  include?: ListEventsInput["include"];
  limit?: ListPrerecordingsInput["limit"];
  order?: ListPrerecordingsInput["order"];
  timezone?: string;
  where?: ListEventsInput["where"];
};

export type ListEventsPrerecordingsOutput = {
  prerecordings: ListEventsPrerecordingsPrerecordings;
};
