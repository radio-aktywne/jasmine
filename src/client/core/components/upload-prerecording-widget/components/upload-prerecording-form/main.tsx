import type { SetNonNullableDeep } from "type-fest";

import { msg } from "@lingui/core/macro";
import { Button, FileInput, Select } from "@mantine/core";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCallback, useMemo, useState } from "react";

import type { UploadPrerecordingFormInput } from "./types";

import { dayjs } from "../../../../../../common/dates/vars/dayjs";
import { useForm } from "../../../../../../isomorphic/core/hooks/use-form";
import { useLocalization } from "../../../../../../isomorphic/localization/hooks/use-localization";
import { orpcClientSideQueryClient } from "../../../../../orpc/vars/clients";
import { ShowFilter } from "./components/show-filter";
import { constants } from "./constants";
import { Schemas } from "./schemas";

export function UploadPrerecordingForm({
  initialValues,
  onError,
  onShowChange,
  onSubmit,
  show,
}: UploadPrerecordingFormInput) {
  const { localization } = useLocalization();

  const [now] = useState(dayjs().locale(localization.locale).local());

  const instancesListInput = useMemo(
    () => ({
      end: now.add(1, "month").utc().format("YYYY-MM-DDTHH:mm:ss[Z]"),
      include: { event: true },
      limit: null,
      where: {
        event: { is: { showId: show ?? null, type: "prerecorded" as const } },
      },
    }),
    [now, show],
  );

  const instancesListQuery = useSuspenseQuery(
    orpcClientSideQueryClient.core.instances.list.queryOptions({
      input: instancesListInput,
    }),
  );

  const { form, handleFormSubmit, submitting } = useForm({
    initialValues: initialValues,
    onError: onError,
    onSubmit: onSubmit,
    schema: Schemas.Values,
  });

  const instances = instancesListQuery.data.instances as SetNonNullableDeep<
    typeof instancesListQuery.data.instances,
    "0.event"
  >;

  const handleShowChange = useCallback(
    (value: null | string) => {
      form.setFieldValue("instance", null);
      onShowChange?.(value);
    },
    [form.setFieldValue, onShowChange],
  );

  return (
    <form onSubmit={handleFormSubmit} style={{ display: "contents" }}>
      <ShowFilter onShowChange={handleShowChange} show={show} />
      <Select
        data={instances.map((instance) => ({
          label: dayjs
            .tz(instance.start, instance.event.timezone)
            .locale(localization.locale)
            .local()
            .format("LLL"),
          value: `${instance.event.id}/${instance.start}`,
        }))}
        key={form.key("instance")}
        label={localization.localize(msg({ message: "Instance" }))}
        placeholder={localization.localize(msg({ message: "Select instance" }))}
        required={true}
        {...form.getInputProps("instance")}
      />
      <FileInput
        accept={constants.file.types.join(",")}
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
