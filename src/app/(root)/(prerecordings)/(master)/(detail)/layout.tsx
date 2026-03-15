import { connection } from "next/server";

import type { LayoutInput } from "../../../../types";
import type { Keys } from "./types";

import { PrerecordingsDetailLayoutView } from "./layout.view";

export default async function PrerecordingsDetailLayout({
  children,
}: LayoutInput<Keys.Path, Keys.Slots>) {
  await connection();

  return (
    <PrerecordingsDetailLayoutView>{children}</PrerecordingsDetailLayoutView>
  );
}
