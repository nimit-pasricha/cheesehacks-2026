import { useEffect, useState } from "react";
import type { ReportData } from "../types";
import { TestReportData } from "../constants";
import { Image } from "../components/Image";
import { asCurrency } from "../utility";
import { Button } from "../components/Button";
import { LocationDisplay } from "../components/LocationManagement";
import { reportsApi } from "../api/reports";
import { useParams } from "react-router-dom";

export default function ReportPage() {
  const [reportDetails, setReportDetails] = useState<ReportData | undefined>(
    undefined,
  );
  const params = useParams();
  const isLoading = reportDetails === undefined;

  useEffect(() => {
    const res = reportsApi.getReportInfo(params.reportId!);
    setReportDetails(() => res);
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
            <div className="flex flex-col gap-4">
              {reportDetails.description.split(RegExp("\n+")).map((p, i) => (
                <p key={i} className="text-lg">
                  {p}
                </p>
              ))}
            </div>

            <Button>Contribute</Button>

            <div className="w-full h-100 mt-4 rounded-lg overflow-hidden border">
              <LocationDisplay location={reportDetails.location} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
