export type UploadPrerecordingInput = {
  data: ReadableStream<Uint8Array>;
  event: string;
  start: string;
  type: string;
};
