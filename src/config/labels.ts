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
      title: "jasmine",
      description: "jasmine",
    },
    events: {
      title: "Events • jasmine",
      description: "jasmine",
    },
    prerecordings: {
      title: "Prerecordings • jasmine",
      description: "jasmine",
    },
    prerecordingsEventNotFound: {
      text: "Event not found",
    },
    uploadPrerecording: {
      title: "Upload Prerecording • jasmine",
      description: "jasmine",
    },
    notFound: {
      title: "Not Found • jasmine",
      description: "jasmine",
      text: "Page not found",
    },
    error: {
      title: "Error • jasmine",
      description: "jasmine",
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
