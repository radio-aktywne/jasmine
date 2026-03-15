import type { NextRequest } from "next/server";

import { STATUS_CODES } from "http";
import { connection } from "next/server";

import type { RouteInput } from "../../../../types";
import type { Keys } from "./types";

import { state } from "../../../../../server/state/vars/state";
import { Schemas } from "./schemas";

export async function GET(
  request: NextRequest,
  { params }: RouteInput<Keys.Path>,
) {
  await connection();

  const pathParameters = await Schemas.Path.parseAsync(await params);

  const { response: prerecordingsEventStartDownloadResponse } =
    await state.current.apis.numbat.prerecordingsEventStartDownload({
      path: { event: pathParameters.event, start: pathParameters.start },
    });

  if (prerecordingsEventStartDownloadResponse.status === 404)
    return new Response(STATUS_CODES[404], { status: 404 });

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

  const pathParameters = await Schemas.Path.parseAsync(await params);

  const contentType = request.headers.get("Content-Type");

  if (!request.body || !contentType)
    return new Response(STATUS_CODES[400], { status: 400 });

  const { response: prerecordingsEventStartUploadResponse } =
    await state.current.apis.numbat.prerecordingsEventStartUpload({
      body: request.body,
      headers: { "Content-Type": contentType },
      path: { event: pathParameters.event, start: pathParameters.start },
    });

  if (prerecordingsEventStartUploadResponse.status === 404)
    return new Response(STATUS_CODES[404], { status: 404 });

  return new Response(null, { status: 204 });
}
