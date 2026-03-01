import { apiClient } from "./core";
import type { GeoLocation, ReportData, ReportPreviewData } from "../types";
import {
  TestReportDatas,
  TestReportPreviewData,
  TestReportPreviewDataPlural,
} from "../constants";
import type { ReportFilters } from "../pages/HomePage";

export const reportsApi = {
  getReportPreviews: (filters?: ReportFilters): ReportPreviewData[] => {
    apiClient.get("/reports/");
    return TestReportPreviewDataPlural;
  },
  getReportInfo: (id: string): ReportData => {
    apiClient.get("");
    return TestReportDatas.filter((t) => `${t.id}` === id)[0];
  },
  createReport: (
    location: GeoLocation,
    tags: string[],
    description: string,
  ) => {
    // TODO
    apiClient.post("", {
      location: location,
      tags: tags,
      description: description,
    });
  },
};
