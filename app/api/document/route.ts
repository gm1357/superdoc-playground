import fs from "fs/promises";
import path from "path";

export async function GET() {
  const document = await fs.readFile(
    path.join(process.cwd(), "app/api/document/test.docx"),
  );
  return new Response(document, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    },
  });
}
