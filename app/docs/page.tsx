import type { Metadata } from "next";
import { DocsContent } from "./DocsContent";

export const metadata: Metadata = {
  title: "Documentation — NetShape",
  description:
    "Complete documentation for NetShape — a local throttling proxy for simulating degraded network conditions.",
};

export default function DocsPage() {
  return <DocsContent />;
}
