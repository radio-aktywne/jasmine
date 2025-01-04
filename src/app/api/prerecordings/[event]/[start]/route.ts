import { NextRequest, NextResponse } from "next/server";

import { auth } from "../../../../../auth";
import {
  downloadPrerecording,
  PrerecordingNotFoundError,
} from "../../../../../lib/numbat/download-prerecording";
import {
  EventInstanceNotFoundError,
  uploadPrerecording,
} from "../../../../../lib/numbat/upload-prerecording";
import { errors } from "./constants";
import { RouteContext } from "./types";

export async function GET(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  try {
    const session = await auth.auth();
    if (!session)
      return NextResponse.json(
        { error: errors.download.unauthorized },
        { status: 401, statusText: "Unauthorized" },
      );

    const { event, start } = context.params;

    const { data, etag, length, modified, type } = await downloadPrerecording({
      event: event,
      start: start,
    });

    const headers = {
      "Content-Length": length.toString(),
      "Content-Type": type,
      ETag: etag,
      "Last-Modified": modified,
    };

    return new NextResponse(data, {
      headers: headers,
      status: 200,
      statusText: "OK",
    });
  } catch (error) {
    if (error instanceof PrerecordingNotFoundError) {
      return NextResponse.json(
        { error: errors.download.notFound },
        { status: 404, statusText: "Not Found" },
      );
    }

    return NextResponse.json(
      { error: errors.download.generic },
      { status: 500, statusText: "Internal Server Error" },
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: RouteContext,
): Promise<NextResponse> {
  try {
    const session = await auth.auth();
    if (!session)
      return NextResponse.json(
        { error: errors.upload.unauthorized },
        { status: 401, statusText: "Unauthorized" },
      );

    const { event, start } = context.params;

    const type = request.headers.get("Content-Type");

    if (!type)
      return NextResponse.json(
        { error: errors.upload.missingContentType },
        { status: 400, statusText: "Bad Request" },
      );

    await uploadPrerecording({
      data: request.body!,
      event: event,
      start: start,
      type: type,
    });

    return new NextResponse(null, { status: 204, statusText: "No Content" });
  } catch (error) {
    if (error instanceof EventInstanceNotFoundError) {
      return NextResponse.json(
        { error: errors.upload.notFound },
        { status: 404, statusText: "Not Found" },
      );
    }

    return NextResponse.json(
      { error: errors.upload.generic },
      { status: 500, statusText: "Internal Server Error" },
    );
  }
}
