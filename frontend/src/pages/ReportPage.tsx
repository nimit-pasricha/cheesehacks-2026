import { useEffect, useState } from "react";
import type { ReportData } from "../types";
import { TestReportData } from "../constants";
import { Image } from "../components/Image";
import { asCurrency } from "../utility";

export default function ReportPage() {
  const [reportDetails, setReportDetails] = useState<ReportData | undefined>(
    undefined,
  );
  const isLoading = reportDetails === undefined;

  useEffect(() => {
    setTimeout(() => {
      setReportDetails(() => TestReportData);
    }, 200);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="w-1/2 flex flex-col gap-16">
        {isLoading ? (
          <p className="text-dark">Loading...</p>
        ) : (
          <>
            <Image src={reportDetails.images[0]} alt="" />
            <div className="flex flex-col text-4xl font-bold">
              <span className="flex justify-between">
                <span>Funding:</span>
                <span>{asCurrency(reportDetails.funding)}</span>
              </span>
              <span className="flex justify-between">
                <span>Contributors:</span>
                <span>{reportDetails.interest}</span>
              </span>
            </div>
            <p className="text-lg">{reportDetails.description}</p>
          </>
        )}
      </div>
    </div>
  );
}
