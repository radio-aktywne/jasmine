import { MasterDetailLayoutDetailPanel } from "@radio-aktywne/ui";

import { PrerecordingListLayoutInput } from "./types";

export default function PrerecordingListLayout({
  children,
}: PrerecordingListLayoutInput) {
  return (
    <MasterDetailLayoutDetailPanel>{children}</MasterDetailLayoutDetailPanel>
  );
}
