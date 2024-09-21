export const labels = {
  toasts: {
    titles: {
      error: "Error",
      warning: "Warning",
      success: "Success",
      info: "Info",
    },
  },
  pages: {
    index: {
      title: "weblounge",
      description: "weblounge",
    },
    events: {
      title: "Events • weblounge",
      description: "weblounge",
    },
    prerecordings: {
      title: "Prerecordings • weblounge",
      description: "weblounge",
    },
    prerecordingsEventNotFound: {
      text: "Event not found",
    },
    notFound: {
      title: "Not Found • weblounge",
      description: "weblounge",
      text: "Page not found",
    },
    error: {
      title: "Error • weblounge",
      description: "weblounge",
      text: "Something went wrong",
      buttons: {
        retry: {
          label: "Retry",
        },
      },
    },
  },
  widgets: {
    events: {
      tiles: {
        event: {
          text: (id: string) => `${id}`,
        },
      },
      empty: {
        text: "No events...",
      },
    },
    prerecordings: {
      tiles: {
        prerecording: {
          text: (start: string) => `${start}`,
          toasts: {
            delete: {
              error: (start: string) =>
                `Failed to delete prerecording ${start}`,
              success: (start: string) => `Prerecording ${start} deleted`,
            },
          },
        },
      },
      empty: {
        text: "No prerecordings...",
      },
    },
  },
};
