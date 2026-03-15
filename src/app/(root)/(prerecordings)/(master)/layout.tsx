import { connection } from "next/server";

import type { LayoutInput } from "../../../types";
import type { Keys } from "./types";

import { PrerecordingsMasterLayoutView } from "./layout.view";

export default async function PrerecordingsMasterLayout({
  children,
}: LayoutInput<Keys.Path, Keys.Slots>) {
  await connection();

  return (
    <PrerecordingsMasterLayoutView>{children}</PrerecordingsMasterLayoutView>
  );
}
