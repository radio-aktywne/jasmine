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
    uploadPrerecording: {
      title: "Upload Prerecording • weblounge",
      description: "weblounge",
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
      buttons: {
        upload: {
          label: "Upload",
        },
      },
      empty: {
        text: "No prerecordings...",
      },
    },
    uploadPrerecording: {
      form: {
        fields: {
          start: {
            label: "Start",
            option: (start: string) => start,
            errors: {
              missing: "Start is required",
            },
          },
          file: {
            label: "File",
            errors: {
              missing: "File is required",
            },
          },
        },
        buttons: {
          upload: {
            label: "Upload",
          },
        },
      },
      toasts: {
        upload: {
          error: "Failed to upload prerecording",
          success: (start: string) => `Prerecording ${start} uploaded`,
        },
      },
    },
  },
};
