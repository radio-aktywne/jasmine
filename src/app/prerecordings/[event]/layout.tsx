import type { Metadata } from "next";
import { ReactNode } from "react";
import { labels } from "../../../config/labels";

type PrerecordingsLayoutParams = Readonly<{
  event: string;
}>;

export type PrerecordingsLayoutProps = Readonly<{
  children: ReactNode;
  params: PrerecordingsLayoutParams;
}>;

export async function generateMetadata({}: PrerecordingsLayoutProps): Promise<Metadata> {
  return {
    title: labels.pages.prerecordings.title,
    description: labels.pages.prerecordings.description,
  };
}

export default function PrerecordingsLayout({
  children,
}: PrerecordingsLayoutProps) {
  return children;
}
