import { connection } from "next/server";

import type { LoadingInput } from "../../../../types";

import { PrerecordingsDetailLoadingView } from "./loading.view";

export default async function PrerecordingsDetailLoading({}: LoadingInput) {
  await connection();

  return <PrerecordingsDetailLoadingView />;
}
