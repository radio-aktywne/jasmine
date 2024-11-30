import { msg } from "@lingui/macro";

export const errors = {
  download: {
    generic: msg({
      message: "An error occurred while downloading the prerecording.",
    }),
    notFound: msg({
      message: "Prerecording not found.",
    }),
  },
  upload: {
    generic: msg({
      message: "An error occurred while uploading the prerecording.",
    }),
    missingContentType: msg({
      message: "Content-Type header is missing.",
    }),
    notFound: msg({
      message: "Event instance not found.",
    }),
  },
};
