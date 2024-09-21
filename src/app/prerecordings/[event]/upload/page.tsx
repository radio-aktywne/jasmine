import { notFound } from "next/navigation";
import { getEvent } from "../../../../actions";
import { UploadPrerecordingWidget } from "../../../../components";

type UploadPrerecordingPageParams = Readonly<{
  event: string;
}>;

export type UploadPrerecordingPageProps = Readonly<{
  params: UploadPrerecordingPageParams;
}>;

export const dynamic = "force-dynamic";

export default async function UploadPrerecordingPage({
  params,
}: UploadPrerecordingPageProps) {
  const { data: event, error: eventError } = await getEvent({
    id: params.event,
  });

  if (eventError !== undefined) throw new Error(eventError);
  if (event === undefined) notFound();

  return <UploadPrerecordingWidget event={event} />;
}
