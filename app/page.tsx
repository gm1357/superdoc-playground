"use client";

import dynamic from "next/dynamic";
import "@superdoc-dev/react/style.css";

const SuperDocEditor = dynamic(
  () => import("@superdoc-dev/react").then((mod) => mod.SuperDocEditor),
  {
    ssr: false,
    loading: () => <div>Loading editor...</div>,
  },
);

export default function EditorPage() {
  return <SuperDocEditor document="/api/document" />;
}
