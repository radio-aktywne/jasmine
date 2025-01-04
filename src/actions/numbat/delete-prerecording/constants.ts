import { msg } from "@lingui/macro";

export const errors = {
  generic: msg({ message: "An error occurred while deleteing prerecording." }),
  invalidInput: msg({ message: "Invalid input." }),
  notFound: msg({ message: "Prerecording not found." }),
  unauthorized: msg({
    message: "You are not authorized to delete the prerecording.",
  }),
};
