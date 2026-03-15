import "server-only";

import type { Sdk as BeaverSDK } from "../../common/apis/beaver/sdk";
import type { Sdk as ICanHazDadJokeSDK } from "../../common/apis/icanhazdadjoke/sdk";
import type { Sdk as NumbatSDK } from "../../common/apis/numbat/sdk";
import type { Config } from "../config/types";

export type APIs = {
  beaver: BeaverSDK;
  icanhazdadjoke: ICanHazDadJokeSDK;
  numbat: NumbatSDK;
};

export type State = {
  apis: APIs;
  config: Config;
};
