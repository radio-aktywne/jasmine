import type { NextRequest } from "next/server";

import { STATUS_CODES } from "http";
import { connection } from "next/server";

import type { RouteInput } from "../../../../types";
import type { Keys } from "./types";

import { isAuthenticated } from "../../../../../common/access/lib/is-authenticated";
import { getIdentity } from "../../../../../server/identity/lib/get-identity";
import { state } from "../../../../../server/state/vars/state";
import { Schemas } from "./schemas";

export async function GET(
  request: NextRequest,
  { params }: RouteInput<Keys.Path>,
) {
  await connection();

  const { identity } = await getIdentity();
  if (!isAuthenticated(identity.user))
    return new Response(STATUS_CODES[403], { status: 403 });

  const pathParameters = await Schemas.Path.parseAsync(await params);

  const {
    data: prerecordingsEventStartDownloadData,
    response: prerecordingsEventStartDownloadResponse,
  } = await state.current.apis.numbat.prerecordingsEventStartDownload({
    path: { event: pathParameters.event, start: pathParameters.start },
  });

  if (prerecordingsEventStartDownloadData === undefined) {
    if (prerecordingsEventStartDownloadResponse.status === 400)
      return new Response(STATUS_CODES[400], { status: 400 });

    if (prerecordingsEventStartDownloadResponse.status === 404)
      return new Response(STATUS_CODES[404], { status: 404 });

    return new Response(STATUS_CODES[500], { status: 500 });
  }

  return new Response(prerecordingsEventStartDownloadResponse.body, {
    headers: {
      "Content-Length":
        prerecordingsEventStartDownloadResponse.headers.get("Content-Length")!,
      "Content-Type":
        prerecordingsEventStartDownloadResponse.headers.get("Content-Type")!,
      ETag: prerecordingsEventStartDownloadResponse.headers.get("ETag")!,
      "Last-Modified":
        prerecordingsEventStartDownloadResponse.headers.get("Last-Modified")!,
    },
    status: 200,
  });
}

export async function PUT(
  request: NextRequest,
  { params }: RouteInput<Keys.Path>,
) {
  await connection();

  const { identity } = await getIdentity();
  if (!isAuthenticated(identity.user))
    return new Response(STATUS_CODES[403], { status: 403 });

  const pathParameters = await Schemas.Path.parseAsync(await params);

  const contentType = request.headers.get("Content-Type");

  if (!request.body || !contentType)
    return new Response(STATUS_CODES[400], { status: 400 });

  const {
    data: prerecordingsEventStartUploadData,
    response: prerecordingsEventStartUploadResponse,
  } = await state.current.apis.numbat.prerecordingsEventStartUpload({
    body: request.body,
    headers: { "Content-Type": contentType },
    path: { event: pathParameters.event, start: pathParameters.start },
  });

  if (prerecordingsEventStartUploadData === undefined) {
    if (prerecordingsEventStartUploadResponse.status === 400)
      return new Response(STATUS_CODES[400], { status: 400 });

    return new Response(STATUS_CODES[500], { status: 500 });
  }

  return new Response(null, { status: 204 });
}
