import * as z from "zod";

import { constants } from "./constants";

export const Schemas = {
  Values: z.object({
    file: z
      .file()
      .mime([...constants.file.types])
      .nullish(),
    instance: z.string().nullish(),
  }),
};
