import { MasterDetailLayoutDetailPanel } from "@radio-aktywne/ui";

import { PrerecordingsLayoutInput } from "./types";

export default function PrerecordingsLayout({
  children,
}: PrerecordingsLayoutInput) {
  return (
    <MasterDetailLayoutDetailPanel>{children}</MasterDetailLayoutDetailPanel>
  );
}
