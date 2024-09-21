import { notFound, redirect } from "next/navigation";
import { getEvent, listPrerecordings } from "../../../actions";
import { PrerecordingListWidget } from "../../../components";
import { createModifiedURLSearchParams } from "../../../utils/url";

type PrerecordingsPageParams = Readonly<{
  event: string;
}>;

type PrerecordingsPageSearchParams = Readonly<{
  page?: string | string[];
}>;

export type PrerecordingsPageProps = Readonly<{
  params: PrerecordingsPageParams;
  searchParams: PrerecordingsPageSearchParams;
}>;

export const dynamic = "force-dynamic";

const perPage = 5;

function redirectWithParams(event: string, params: URLSearchParams): never {
  redirect(`/prerecordings/${event}?` + params.toString());
}

async function validatePage(
  params: PrerecordingsPageParams,
  searchParams: PrerecordingsPageSearchParams,
) {
  const page = searchParams.page;

  if (page === undefined)
    redirectWithParams(
      params.event,
      createModifiedURLSearchParams(searchParams, { page: "1" }),
    );

  if (Array.isArray(page))
    redirectWithParams(
      params.event,
      createModifiedURLSearchParams(searchParams, { page: page[0] }),
    );

  const parsedPage = parseInt(page, 10);

  if (isNaN(parsedPage) || parsedPage < 1)
    redirectWithParams(
      params.event,
      createModifiedURLSearchParams(searchParams, { page: "1" }),
    );

  const { data: checkPrerecordings, error: checkError } =
    await listPrerecordings({
      event: params.event,
      limit: 0,
    });

  if (checkError !== undefined) throw new Error(checkError);
  if (checkPrerecordings === undefined) notFound();

  const offset = perPage * (parsedPage - 1);

  if (checkPrerecordings.count > 0 && offset >= checkPrerecordings.count)
    redirectWithParams(
      params.event,
      createModifiedURLSearchParams(searchParams, {
        page: (Math.ceil(checkPrerecordings.count / perPage) || 1).toString(),
      }),
    );

  return parsedPage;
}

export default async function PrerecordingsPage({
  params,
  searchParams,
}: PrerecordingsPageProps) {
  const page = await validatePage(params, searchParams);
  const limit = perPage;
  const offset = perPage * (page - 1);

  const { data: event, error: eventError } = await getEvent({
    id: params.event,
  });

  if (eventError !== undefined) throw new Error(eventError);
  if (event === undefined) notFound();

  const { data: prerecordings, error } = await listPrerecordings({
    event: event.id,
    limit,
    offset,
  });

  if (error !== undefined) throw new Error(error);
  if (prerecordings === undefined) notFound();

  return (
    <PrerecordingListWidget
      event={event}
      prerecordings={prerecordings}
      page={page}
      perPage={perPage}
    />
  );
}
