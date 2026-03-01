import { useState } from "react";
import { ReportCardPreview } from "../components/Cards";
import { TestReportPreviewData } from "../constants";
import type { ReportPreviewData } from "../types";

export default function HomePage() {
  const [reportPreviews, setReportPreviews] = useState<ReportPreviewData[]>([
    TestReportPreviewData,
    TestReportPreviewData,
    TestReportPreviewData,
  ]);

  return (
    <>
      {/* Main Content. Requests etc. */}
      <div className="flex flex-col items-center">
        <ul className="w-1/2 flex flex-col gap-16">
          {reportPreviews.map((p) => (
            <li key={p.id}>
              <ReportCardPreview preview={p} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
