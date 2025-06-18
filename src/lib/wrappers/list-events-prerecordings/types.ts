import { ListEventsInput, ListEventsOutput } from "../../beaver/list-events";
import { HeadPrerecordingOutput } from "../../numbat/head-prerecording";
import {
  ListPrerecordingsInput,
  ListPrerecordingsOutput,
} from "../../numbat/list-prerecordings";

export type Prerecording = {
  etag: HeadPrerecordingOutput["etag"];
  event: ListEventsOutput["events"]["events"][number];
  length: HeadPrerecordingOutput["length"];
  modified: HeadPrerecordingOutput["modified"];
  start: ListPrerecordingsOutput["prerecordings"]["prerecordings"][number]["start"];
  type: HeadPrerecordingOutput["type"];
};

export type ListEventsPrerecordingsInput = {
  after?: ListPrerecordingsInput["after"];
  before?: ListPrerecordingsInput["before"];
  include?: ListEventsInput["include"];
  order?: ListPrerecordingsInput["order"];
  where?: ListEventsInput["where"];
};

export type ListEventsPrerecordingsOutput = {
  prerecordings: Prerecording[];
};
