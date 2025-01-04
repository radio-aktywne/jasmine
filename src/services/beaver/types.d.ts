/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export type paths = {
  "/events": {
    delete?: never;
    /**
     * List events
     * @description List events that match the request.
     */
    get: operations["EventsList"];
    head?: never;
    options?: never;
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    patch?: never;
    /**
     * Create event
     * @description Create a new event.
     */
    post: operations["EventsCreate"];
    put?: never;
    trace?: never;
  };
  "/events/{id}": {
    /**
     * Delete event
     * @description Delete an event by ID.
     */
    delete: operations["EventsIdDelete"];
    /**
     * Get event
     * @description Get an event by ID.
     */
    get: operations["EventsIdGet"];
    head?: never;
    options?: never;
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    /**
     * Update event
     * @description Update an event by ID.
     */
    patch: operations["EventsIdUpdate"];
    post?: never;
    put?: never;
    trace?: never;
  };
  "/ping": {
    delete?: never;
    /**
     * Ping
     * @description Ping.
     */
    get: operations["PingPing"];
    /**
     * Ping headers
     * @description Ping headers.
     */
    head: operations["PingHeadping"];
    options?: never;
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    patch?: never;
    post?: never;
    put?: never;
    trace?: never;
  };
  "/schedule": {
    delete?: never;
    /**
     * List schedules
     * @description List event schedules with instances between two dates.
     */
    get: operations["ScheduleList"];
    head?: never;
    options?: never;
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    patch?: never;
    post?: never;
    put?: never;
    trace?: never;
  };
  "/shows": {
    delete?: never;
    /**
     * List shows
     * @description List shows that match the request.
     */
    get: operations["ShowsList"];
    head?: never;
    options?: never;
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    patch?: never;
    /**
     * Create show
     * @description Create a new show.
     */
    post: operations["ShowsCreate"];
    put?: never;
    trace?: never;
  };
  "/shows/{id}": {
    /**
     * Delete show
     * @description Delete a show by ID.
     */
    delete: operations["ShowsIdDelete"];
    /**
     * Get show
     * @description Get a show by ID.
     */
    get: operations["ShowsIdGet"];
    head?: never;
    options?: never;
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    /**
     * Update show
     * @description Update a show by ID.
     */
    patch: operations["ShowsIdUpdate"];
    post?: never;
    put?: never;
    trace?: never;
  };
  "/sse": {
    delete?: never;
    /**
     * Get SSE stream
     * @description Get a stream of Server-Sent Events.
     */
    get: operations["SseSubscribe"];
    head?: never;
    options?: never;
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    patch?: never;
    post?: never;
    put?: never;
    trace?: never;
  };
};
export type webhooks = { [key: string]: never };
export type components = {
  headers: never;
  parameters: never;
  pathItems: never;
  requestBodies: never;
  responses: never;
  schemas: {
    /**
     * EventCreateInput
     * @description Data to create an event.
     */
    EventCreateInput: {
      /** Format: date-time */
      end: string;
      id?: string;
      recurrence?: components["schemas"]["events_models_Recurrence"] | null;
      showId?: string;
      /** Format: date-time */
      start: string;
      timezone: string;
      /** @enum {string} */
      type: "live" | "prerecorded" | "replay";
    };
    /** EventInstance */
    EventInstance: {
      /** Format: date-time */
      end: string;
      /** Format: date-time */
      start: string;
    };
    /** EventList */
    EventList: {
      /** @description Total number of events that matched the query. */
      count: number;
      /** @description Events that matched the request. */
      events: components["schemas"]["events_models_Event"][];
      /** @description Maximum number of returned events. */
      limit?: null | number;
      /** @description Number of events skipped. */
      offset?: null | number;
    };
    /** Event */
    events_models_Event: {
      /**
       * Format: date-time
       * @description End time of the event in event timezone.
       */
      end: string;
      /**
       * Format: uuid
       * @description Identifier of the event.
       */
      id: string;
      /** @description Recurrence rule of the event. */
      recurrence?: components["schemas"]["events_models_Recurrence"] | null;
      /** @description Show that the event belongs to. */
      show?: components["schemas"]["events_models_Show"] | null;
      /**
       * Format: uuid
       * @description Identifier of the show that the event belongs to.
       */
      showId: string;
      /**
       * Format: date-time
       * @description Start time of the event in event timezone.
       */
      start: string;
      /** @description Timezone of the event. */
      timezone: string;
      /**
       * @description Type of the event.
       * @enum {string}
       */
      type: "live" | "prerecorded" | "replay";
    };
    /** Recurrence */
    events_models_Recurrence: {
      /** @description Excluded dates of the recurrence in event timezone. */
      exclude?: null | string[];
      /** @description Included dates of the recurrence in event timezone. */
      include?: null | string[];
      /** @description Rule of the recurrence. */
      rule?: components["schemas"]["events_models_RecurrenceRule"] | null;
    };
    /** RecurrenceRule */
    events_models_RecurrenceRule: {
      /** @description Hours of the recurrence. */
      byHours?: null | number[];
      /** @description Minutes of the recurrence. */
      byMinutes?: null | number[];
      /** @description Monthdays of the recurrence. */
      byMonthdays?: null | number[];
      /** @description Months of the recurrence. */
      byMonths?: null | number[];
      /** @description Seconds of the recurrence. */
      bySeconds?: null | number[];
      /** @description Set positions of the recurrence. */
      bySetPositions?: null | number[];
      /** @description Weekdays of the recurrence. */
      byWeekdays?: components["schemas"]["events_models_WeekdayRule"][] | null;
      /** @description Weeks of the recurrence. */
      byWeeks?: null | number[];
      /** @description Yeardays of the recurrence. */
      byYeardays?: null | number[];
      /** @description Number of occurrences of the recurrence. */
      count?: null | number;
      /**
       * @description Frequency of the recurrence.
       * @enum {string}
       */
      frequency:
        | "daily"
        | "hourly"
        | "minutely"
        | "monthly"
        | "secondly"
        | "weekly"
        | "yearly";
      /** @description Interval of the recurrence. */
      interval?: null | number;
      /** @description End date of the recurrence in UTC. */
      until?: null | string;
      /**
       * @description Start day of the week.
       * @enum {null|string}
       */
      weekStart?:
        | "friday"
        | "monday"
        | "saturday"
        | "sunday"
        | "thursday"
        | "tuesday"
        | "wednesday"
        | null;
    };
    /** Show */
    events_models_Show: {
      /** @description Description of the show. */
      description?: null | string;
      /** @description Events that the show belongs to. */
      events?: components["schemas"]["events_models_Event"][] | null;
      /** @description Identifier of the show. */
      id: string;
      /** @description Title of the show. */
      title: string;
    };
    /** WeekdayRule */
    events_models_WeekdayRule: {
      /**
       * @description Day of the week.
       * @enum {string}
       */
      day:
        | "friday"
        | "monday"
        | "saturday"
        | "sunday"
        | "thursday"
        | "tuesday"
        | "wednesday";
      /** @description Occurrence of the day in the year. */
      occurrence?: null | number;
    };
    /**
     * EventUpdateInput
     * @description Data to update an event.
     */
    EventUpdateInput: {
      /** Format: date-time */
      end?: string;
      id?: string;
      recurrence?: components["schemas"]["events_models_Recurrence"] | null;
      /** Format: date-time */
      start?: string;
      timezone?: string;
      /** @enum {string} */
      type?: "live" | "prerecorded" | "replay";
    };
    /** Schedule */
    Schedule: {
      event: components["schemas"]["schedule_models_Event"];
      /** @description Event instances. */
      instances: components["schemas"]["EventInstance"][];
    };
    /**
     * Event
     * @description Event data.
     */
    schedule_models_Event: {
      /**
       * Format: date-time
       * @description End time of the event in event timezone.
       */
      end: string;
      /**
       * Format: uuid
       * @description Identifier of the event.
       */
      id: string;
      /** @description Recurrence rule of the event. */
      recurrence?: components["schemas"]["schedule_models_Recurrence"] | null;
      /** @description Show that the event belongs to. */
      show?: components["schemas"]["schedule_models_Show"] | null;
      /**
       * Format: uuid
       * @description Identifier of the show that the event belongs to.
       */
      showId: string;
      /**
       * Format: date-time
       * @description Start time of the event in event timezone.
       */
      start: string;
      /** @description Timezone of the event. */
      timezone: string;
      /**
       * @description Type of the event.
       * @enum {string}
       */
      type: "live" | "prerecorded" | "replay";
    };
    /** Recurrence */
    schedule_models_Recurrence: {
      /** @description Excluded dates of the recurrence in event timezone. */
      exclude?: null | string[];
      /** @description Included dates of the recurrence in event timezone. */
      include?: null | string[];
      /** @description Rule of the recurrence. */
      rule?: components["schemas"]["schedule_models_RecurrenceRule"] | null;
    };
    /** RecurrenceRule */
    schedule_models_RecurrenceRule: {
      /** @description Hours of the recurrence. */
      byHours?: null | number[];
      /** @description Minutes of the recurrence. */
      byMinutes?: null | number[];
      /** @description Monthdays of the recurrence. */
      byMonthdays?: null | number[];
      /** @description Months of the recurrence. */
      byMonths?: null | number[];
      /** @description Seconds of the recurrence. */
      bySeconds?: null | number[];
      /** @description Set positions of the recurrence. */
      bySetPositions?: null | number[];
      /** @description Weekdays of the recurrence. */
      byWeekdays?:
        | components["schemas"]["schedule_models_WeekdayRule"][]
        | null;
      /** @description Weeks of the recurrence. */
      byWeeks?: null | number[];
      /** @description Yeardays of the recurrence. */
      byYeardays?: null | number[];
      /** @description Number of occurrences of the recurrence. */
      count?: null | number;
      /**
       * @description Frequency of the recurrence.
       * @enum {string}
       */
      frequency:
        | "daily"
        | "hourly"
        | "minutely"
        | "monthly"
        | "secondly"
        | "weekly"
        | "yearly";
      /** @description Interval of the recurrence. */
      interval?: null | number;
      /** @description End date of the recurrence in UTC. */
      until?: null | string;
      /**
       * @description Start day of the week.
       * @enum {null|string}
       */
      weekStart?:
        | "friday"
        | "monday"
        | "saturday"
        | "sunday"
        | "thursday"
        | "tuesday"
        | "wednesday"
        | null;
    };
    /** Show */
    schedule_models_Show: {
      /** @description Description of the show. */
      description?: null | string;
      /** @description Events that the show belongs to. */
      events?: components["schemas"]["schedule_models_Event"][] | null;
      /** @description Identifier of the show. */
      id: string;
      /** @description Title of the show. */
      title: string;
    };
    /** WeekdayRule */
    schedule_models_WeekdayRule: {
      /**
       * @description Day of the week.
       * @enum {string}
       */
      day:
        | "friday"
        | "monday"
        | "saturday"
        | "sunday"
        | "thursday"
        | "tuesday"
        | "wednesday";
      /** @description Occurrence of the day in the year. */
      occurrence?: null | number;
    };
    /** ScheduleList */
    ScheduleList: {
      /** @description Total number of schedules that matched the query. */
      count: number;
      /** @description Maximum number of returned schedules. */
      limit?: null | number;
      /** @description Number of schedules skipped. */
      offset?: null | number;
      /** @description Schedules that matched the request. */
      schedules: components["schemas"]["Schedule"][];
    };
    /**
     * ShowCreateInput
     * @description Data to create a show.
     */
    ShowCreateInput: {
      description?: null | string;
      id?: string;
      title: string;
    };
    /** ShowList */
    ShowList: {
      /** @description Total number of shows that matched the query. */
      count: number;
      /** @description Maximum number of returned shows. */
      limit?: null | number;
      /** @description Number of shows skipped. */
      offset?: null | number;
      /** @description Shows that matched the request. */
      shows: components["schemas"]["shows_models_Show"][];
    };
    /** Event */
    shows_models_Event: {
      /**
       * Format: date-time
       * @description End time of the event in event timezone.
       */
      end: string;
      /**
       * Format: uuid
       * @description Identifier of the event.
       */
      id: string;
      /** @description Recurrence rule of the event. */
      recurrence?: components["schemas"]["shows_models_Recurrence"] | null;
      /** @description Show that the event belongs to. */
      show?: components["schemas"]["shows_models_Show"] | null;
      /**
       * Format: uuid
       * @description Identifier of the show that the event belongs to.
       */
      showId: string;
      /**
       * Format: date-time
       * @description Start time of the event in event timezone.
       */
      start: string;
      /** @description Timezone of the event. */
      timezone: string;
      /**
       * @description Type of the event.
       * @enum {string}
       */
      type: "live" | "prerecorded" | "replay";
    };
    /** Recurrence */
    shows_models_Recurrence: {
      /** @description Excluded dates of the recurrence in event timezone. */
      exclude?: null | string[];
      /** @description Included dates of the recurrence in event timezone. */
      include?: null | string[];
      /** @description Rule of the recurrence. */
      rule?: components["schemas"]["shows_models_RecurrenceRule"] | null;
    };
    /** RecurrenceRule */
    shows_models_RecurrenceRule: {
      /** @description Hours of the recurrence. */
      byHours?: null | number[];
      /** @description Minutes of the recurrence. */
      byMinutes?: null | number[];
      /** @description Monthdays of the recurrence. */
      byMonthdays?: null | number[];
      /** @description Months of the recurrence. */
      byMonths?: null | number[];
      /** @description Seconds of the recurrence. */
      bySeconds?: null | number[];
      /** @description Set positions of the recurrence. */
      bySetPositions?: null | number[];
      /** @description Weekdays of the recurrence. */
      byWeekdays?: components["schemas"]["shows_models_WeekdayRule"][] | null;
      /** @description Weeks of the recurrence. */
      byWeeks?: null | number[];
      /** @description Yeardays of the recurrence. */
      byYeardays?: null | number[];
      /** @description Number of occurrences of the recurrence. */
      count?: null | number;
      /**
       * @description Frequency of the recurrence.
       * @enum {string}
       */
      frequency:
        | "daily"
        | "hourly"
        | "minutely"
        | "monthly"
        | "secondly"
        | "weekly"
        | "yearly";
      /** @description Interval of the recurrence. */
      interval?: null | number;
      /** @description End date of the recurrence in UTC. */
      until?: null | string;
      /**
       * @description Start day of the week.
       * @enum {null|string}
       */
      weekStart?:
        | "friday"
        | "monday"
        | "saturday"
        | "sunday"
        | "thursday"
        | "tuesday"
        | "wednesday"
        | null;
    };
    /** Show */
    shows_models_Show: {
      /** @description Description of the show. */
      description?: null | string;
      /** @description Events that the show belongs to. */
      events?: components["schemas"]["shows_models_Event"][] | null;
      /** @description Identifier of the show. */
      id: string;
      /** @description Title of the show. */
      title: string;
    };
    /** WeekdayRule */
    shows_models_WeekdayRule: {
      /**
       * @description Day of the week.
       * @enum {string}
       */
      day:
        | "friday"
        | "monday"
        | "saturday"
        | "sunday"
        | "thursday"
        | "tuesday"
        | "wednesday";
      /** @description Occurrence of the day in the year. */
      occurrence?: null | number;
    };
    /**
     * ShowUpdateInput
     * @description Data to update a show.
     */
    ShowUpdateInput: {
      description?: null | string;
      id?: string;
      title?: string;
    };
  };
};
export type $defs = { [key: string]: never };
export type operations = {
  EventsCreate: {
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: {
        /** @description Relations to include in the response. */
        include?: null | string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["EventCreateInput"];
      };
    };
    responses: {
      /** @description Document created, URL follows */
      201: {
        content: {
          "application/json": components["schemas"]["events_models_Event"];
        };
        headers: {
          [name: string]: unknown;
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            detail: string;
            extra?:
              | {
                  [key: string]: unknown;
                }
              | null
              | unknown[];
            status_code: number;
          };
        };
        headers: {
          [name: string]: unknown;
        };
      };
    };
  };
  EventsIdDelete: {
    parameters: {
      cookie?: never;
      header?: never;
      path: {
        /** @description Identifier of the event to delete. */
        id: string;
      };
      query?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Request fulfilled, nothing follows */
      204: {
        content: {
          "application/json": null;
        };
        headers: {
          [name: string]: unknown;
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            detail: string;
            extra?:
              | {
                  [key: string]: unknown;
                }
              | null
              | unknown[];
            status_code: number;
          };
        };
        headers: {
          [name: string]: unknown;
        };
      };
    };
  };
  EventsIdGet: {
    parameters: {
      cookie?: never;
      header?: never;
      path: {
        /** @description Identifier of the event to get. */
        id: string;
      };
      query?: {
        /** @description Relations to include in the response. */
        include?: null | string;
      };
    };
    requestBody?: never;
    responses: {
      /** @description Request fulfilled, document follows */
      200: {
        content: {
          "application/json": components["schemas"]["events_models_Event"];
        };
        headers: {
          [name: string]: unknown;
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            detail: string;
            extra?:
              | {
                  [key: string]: unknown;
                }
              | null
              | unknown[];
            status_code: number;
          };
        };
        headers: {
          [name: string]: unknown;
        };
      };
    };
  };
  EventsIdUpdate: {
    parameters: {
      cookie?: never;
      header?: never;
      path: {
        /** @description Identifier of the event to update. */
        id: string;
      };
      query?: {
        /** @description Relations to include in the response. */
        include?: null | string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["EventUpdateInput"];
      };
    };
    responses: {
      /** @description Request fulfilled, document follows */
      200: {
        content: {
          "application/json": components["schemas"]["events_models_Event"];
        };
        headers: {
          [name: string]: unknown;
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            detail: string;
            extra?:
              | {
                  [key: string]: unknown;
                }
              | null
              | unknown[];
            status_code: number;
          };
        };
        headers: {
          [name: string]: unknown;
        };
      };
    };
  };
  EventsList: {
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: {
        /** @description Relations to include in the response. */
        include?: null | string;
        /** @description Maximum number of events to return. */
        limit?: null | number;
        /** @description Number of events to skip. */
        offset?: null | number;
        /** @description Order to apply to the results. */
        order?: null | string;
        /** @description Advanced query to apply to find events. */
        query?: null | string;
        /** @description Filter to apply to find events. */
        where?: null | string;
      };
    };
    requestBody?: never;
    responses: {
      /** @description Request fulfilled, document follows */
      200: {
        content: {
          "application/json": components["schemas"]["EventList"];
        };
        headers: {
          [name: string]: unknown;
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            detail: string;
            extra?:
              | {
                  [key: string]: unknown;
                }
              | null
              | unknown[];
            status_code: number;
          };
        };
        headers: {
          [name: string]: unknown;
        };
      };
    };
  };
  PingHeadping: {
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Request fulfilled, nothing follows */
      204: {
        content: {
          "application/json": null;
        };
        headers: {
          [name: string]: unknown;
          "cache-control"?: string;
        };
      };
    };
  };
  PingPing: {
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Request fulfilled, nothing follows */
      204: {
        content: {
          "application/json": null;
        };
        headers: {
          [name: string]: unknown;
          "cache-control"?: string;
        };
      };
    };
  };
  ScheduleList: {
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: {
        /** @description End time in UTC to filter events instances. */
        end?: null | string;
        /** @description Relations to include in the response. */
        include?: null | string;
        /** @description Maximum number of schedules to return. */
        limit?: null | number;
        /** @description Number of schedules to skip. */
        offset?: null | number;
        /** @description Order to apply to the results. */
        order?: null | string;
        /** @description Start time in UTC to filter events instances. */
        start?: null | string;
        /** @description Filter to apply to find events. */
        where?: null | string;
      };
    };
    requestBody?: never;
    responses: {
      /** @description Request fulfilled, document follows */
      200: {
        content: {
          "application/json": components["schemas"]["ScheduleList"];
        };
        headers: {
          [name: string]: unknown;
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            detail: string;
            extra?:
              | {
                  [key: string]: unknown;
                }
              | null
              | unknown[];
            status_code: number;
          };
        };
        headers: {
          [name: string]: unknown;
        };
      };
    };
  };
  ShowsCreate: {
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: {
        /** @description Relations to include in the response. */
        include?: null | string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ShowCreateInput"];
      };
    };
    responses: {
      /** @description Document created, URL follows */
      201: {
        content: {
          "application/json": components["schemas"]["shows_models_Show"];
        };
        headers: {
          [name: string]: unknown;
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            detail: string;
            extra?:
              | {
                  [key: string]: unknown;
                }
              | null
              | unknown[];
            status_code: number;
          };
        };
        headers: {
          [name: string]: unknown;
        };
      };
    };
  };
  ShowsIdDelete: {
    parameters: {
      cookie?: never;
      header?: never;
      path: {
        /** @description Identifier of the show to delete. */
        id: string;
      };
      query?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Request fulfilled, nothing follows */
      204: {
        content: {
          "application/json": null;
        };
        headers: {
          [name: string]: unknown;
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            detail: string;
            extra?:
              | {
                  [key: string]: unknown;
                }
              | null
              | unknown[];
            status_code: number;
          };
        };
        headers: {
          [name: string]: unknown;
        };
      };
    };
  };
  ShowsIdGet: {
    parameters: {
      cookie?: never;
      header?: never;
      path: {
        /** @description Identifier of the show to get. */
        id: string;
      };
      query?: {
        /** @description Relations to include in the response. */
        include?: null | string;
      };
    };
    requestBody?: never;
    responses: {
      /** @description Request fulfilled, document follows */
      200: {
        content: {
          "application/json": components["schemas"]["shows_models_Show"];
        };
        headers: {
          [name: string]: unknown;
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            detail: string;
            extra?:
              | {
                  [key: string]: unknown;
                }
              | null
              | unknown[];
            status_code: number;
          };
        };
        headers: {
          [name: string]: unknown;
        };
      };
    };
  };
  ShowsIdUpdate: {
    parameters: {
      cookie?: never;
      header?: never;
      path: {
        /** @description Identifier of the show to update. */
        id: string;
      };
      query?: {
        /** @description Relations to include in the response. */
        include?: null | string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["ShowUpdateInput"];
      };
    };
    responses: {
      /** @description Request fulfilled, document follows */
      200: {
        content: {
          "application/json": components["schemas"]["shows_models_Show"];
        };
        headers: {
          [name: string]: unknown;
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            detail: string;
            extra?:
              | {
                  [key: string]: unknown;
                }
              | null
              | unknown[];
            status_code: number;
          };
        };
        headers: {
          [name: string]: unknown;
        };
      };
    };
  };
  ShowsList: {
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: {
        /** @description Relations to include in the response. */
        include?: null | string;
        /** @description Maximum number of shows to return. */
        limit?: null | number;
        /** @description Number of shows to skip. */
        offset?: null | number;
        /** @description Order to apply to the results. */
        order?: null | string;
        /** @description Filter to apply to find shows. */
        where?: null | string;
      };
    };
    requestBody?: never;
    responses: {
      /** @description Request fulfilled, document follows */
      200: {
        content: {
          "application/json": components["schemas"]["ShowList"];
        };
        headers: {
          [name: string]: unknown;
        };
      };
      /** @description Bad request syntax or unsupported method */
      400: {
        content: {
          "application/json": {
            detail: string;
            extra?:
              | {
                  [key: string]: unknown;
                }
              | null
              | unknown[];
            status_code: number;
          };
        };
        headers: {
          [name: string]: unknown;
        };
      };
    };
  };
  SseSubscribe: {
    parameters: {
      cookie?: never;
      header?: never;
      path?: never;
      query?: never;
    };
    requestBody?: never;
    responses: {
      /** @description Request fulfilled, document follows */
      200: {
        content: {
          "": string;
        };
        headers: {
          [name: string]: unknown;
          /** @description File size in bytes */
          "content-length"?: string;
          /** @description Entity tag */
          etag?: string;
          /** @description Last modified data-time in RFC 2822 format */
          "last-modified"?: string;
        };
      };
    };
  };
};