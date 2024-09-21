import type { Metadata } from "next";
import { ReactNode } from "react";
import { labels } from "../../../../config/labels";

type UploadPrerecordingLayoutParams = Readonly<{
  event: string;
}>;

export type UploadPrerecordingLayoutProps = Readonly<{
  children: ReactNode;
  params: UploadPrerecordingLayoutParams;
}>;

export async function generateMetadata({}: UploadPrerecordingLayoutProps): Promise<Metadata> {
  return {
    title: labels.pages.uploadPrerecording.title,
    description: labels.pages.uploadPrerecording.description,
  };
}

export default function UploadPrerecordingLayout({
  children,
}: UploadPrerecordingLayoutProps) {
  return children;
}
