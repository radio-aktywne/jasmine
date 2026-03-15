import { msg } from "@lingui/core/macro";
import { Button, FileInput, Select } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import type { UploadPrerecordingFormInput } from "./types";

import { dayjs } from "../../../../../../common/dates/vars/dayjs";
import { useForm } from "../../../../../../isomorphic/core/hooks/use-form";
import { useLocalization } from "../../../../../../isomorphic/localization/hooks/use-localization";
import { orpcClientSideQueryClient } from "../../../../../orpc/vars/clients";
import { Schemas } from "./schemas";

export function UploadPrerecordingForm({
  id,
  initialValues,
  onError,
  onSubmit,
}: UploadPrerecordingFormInput) {
  const { localization } = useLocalization();

  const [now] = useState(dayjs().locale(localization.locale).local());

  const scheduleListInput = useMemo(
    () => ({
      end: now.add(1, "month").utc().format("YYYY-MM-DDTHH:mm:ss"),
      limit: null,
      where: { showId: id, type: "prerecorded" as const },
    }),
    [id, now],
  );

  const scheduleListQuery = useSuspenseQuery(
    orpcClientSideQueryClient.core.schedule.list.queryOptions({
      input: scheduleListInput,
    }),
  );

  const { form, handleFormSubmit, submitting } = useForm({
    initialValues: initialValues,
    onError: onError,
    onSubmit: onSubmit,
    schema: Schemas.Values,
  });

  return (
    <form onSubmit={handleFormSubmit} style={{ display: "contents" }}>
      <Select
        data={scheduleListQuery.data.schedules.flatMap((schedule) =>
          schedule.instances.map((instance) => ({
            label: dayjs
              .tz(instance.start, schedule.event.timezone)
              .locale(localization.locale)
              .local()
              .format("LLL"),
            value: `${schedule.event.id}/${instance.start}`,
          })),
        )}
        key={form.key("instance")}
        label={localization.localize(msg({ message: "Instance" }))}
        placeholder={localization.localize(msg({ message: "Select instance" }))}
        required={true}
        {...form.getInputProps("instance")}
      />
      <FileInput
        key={form.key("file")}
        label={localization.localize(msg({ message: "File" }))}
        placeholder={localization.localize(
          msg({ message: "Select prerecording file" }),
        )}
        required={true}
        {...form.getInputProps("file")}
      />
      <Button
        loading={submitting}
        mt="auto"
        style={{ flexShrink: 0 }}
        type="submit"
      >
        {localization.localize(msg({ message: "Upload" }))}
      </Button>
    </form>
  );
}
