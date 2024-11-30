import { msg } from "@lingui/macro";

export const errors = {
  generic: msg({ message: "An error occurred while listing prerecordings." }),
  invalidInput: msg({ message: "Invalid input." }),
  notFound: msg({ message: "Event not found." }),
};
