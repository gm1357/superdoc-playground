"use client";

import { SuperDocEditor, SuperDocRef } from "@superdoc-dev/react";
import "@superdoc-dev/react/style.css";
import { useRef, useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | undefined>(undefined);
  const editorRef = useRef<SuperDocRef>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  const handleExport = async () => {
    const blob = await editorRef.current?.getInstance()?.export({
      triggerDownload: true,
    });
    return blob;
  };

  return (
    <div>
      <input type="file" accept=".docx" onChange={handleFileChange} />
      {file && (
        <>
          <button onClick={handleExport}>Export</button>
          <SuperDocEditor ref={editorRef} document={file} />
        </>
      )}
    </div>
  );
}
