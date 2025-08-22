import {
  MasterDetailLayout,
  MasterDetailLayoutMasterPanel,
} from "@radio-aktywne/ui";

import { ShowListWidget } from "../../../components/widgets/show-list-widget";
import { listShows } from "../../../lib/beaver/list-shows";
import { ShowListLayoutInput } from "./types";

export const dynamic = "force-dynamic";

export default async function ShowListLayout({
  children,
}: ShowListLayoutInput) {
  const limit = 10;
  const order = JSON.stringify({ title: "asc" });
  const where = JSON.stringify({ events: { some: { type: "prerecorded" } } });
  const { shows } = await listShows({
    limit: limit,
    order: order,
    where: where,
  });

  return (
    <MasterDetailLayout>
      <MasterDetailLayoutMasterPanel>
        <ShowListWidget
          limit={limit}
          order={order}
          shows={shows}
          where={where}
        />
      </MasterDetailLayoutMasterPanel>
      {children}
    </MasterDetailLayout>
  );
}
