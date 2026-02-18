"use client";

import dynamic from "next/dynamic";
import "@superdoc-dev/react/style.css";
import { useRef, useState } from "react";
import { SuperDocRef } from "@superdoc-dev/react";

const SuperDocEditor = dynamic(
  () => import("@superdoc-dev/react").then((mod) => mod.SuperDocEditor),
  {
    ssr: false,
  },
);

export default function Editor({ docx }: { docx: string }) {
  const editorRef = useRef<SuperDocRef>(null);

  const [hideToolbar, setHideToolbar] = useState(false);

  const toggleToolbar = () => {
    setHideToolbar((prev) => !prev);
  };

  const exportDOCX = async () => {
    await editorRef.current?.getInstance()?.export({ triggerDownload: true });
  };

  const exportHTML = () => {
    const htmlArray = editorRef.current?.getInstance()?.getHTML();

    const htmlString = htmlArray?.join("\n");
    if (!htmlString) return;

    const blob = new Blob([htmlString], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "document.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button onClick={exportDOCX}>Download DOCX</button>
      <button onClick={exportHTML}>Export HTML</button>
      <button onClick={toggleToolbar}>Toggle Toolbar</button>
      <SuperDocEditor
        ref={editorRef}
        document={docx}
        renderLoading={() => (
          <div className="loading-spinner">Loading document...</div>
        )}
        hideToolbar={hideToolbar}
      />
    </>
  );
}
