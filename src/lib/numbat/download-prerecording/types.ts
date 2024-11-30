export type DownloadPrerecordingInput = {
  event: string;
  start: string;
};

export type DownloadPrerecordingOutput = {
  data: ReadableStream<Uint8Array>;
  etag: string;
  length: number;
  modified: string;
  type: string;
};
