import { apiClient } from "./core";
import type { GeoLocation, ReportData, ReportPreviewData } from "../types";
import { TestReportData, TestReportPreviewData } from "../constants";
import type { ReportFilters } from "../pages/HomePage";

export const reportsApi = {
  getReportPreviews: (filters?: ReportFilters): ReportPreviewData[] => {
    apiClient.get("", {});
    return [TestReportPreviewData];
  },
  getReportInfo: (id: string): ReportData => {
    apiClient.get("");
    return TestReportData;
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
