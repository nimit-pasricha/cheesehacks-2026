import React from "react";

export type PT_children = { children?: React.ReactNode };
export type PT_classname = { className?: string };
export type PT_key = { key?: React.Key };

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface ReportPreviewData {
  id: number;
  funding: number; // Amount people are willing to pay for fixing this issue.
  interest: number; // Number of people
  location: GeoLocation; // Location of the issue
  tags: string[];
  images: string[]; // Array of image URLs
}

export interface ReportData extends ReportPreviewData {
  description: string;
}
