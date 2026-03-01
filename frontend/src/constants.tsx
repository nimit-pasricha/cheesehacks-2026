import type { ReportPreviewData, ReportData } from "./types";

export const TestReportPreviewData: ReportPreviewData = {
  id: 0,
  funding: 2.38,
  interest: 4,
  location: {
    latitude: 43.07337,
    longitude: -89.406466,
  },
  tags: ["Misc.", "Littering"],
  images: [
    "https://t4.ftcdn.net/jpg/01/96/59/53/360_F_196595321_SPW8Q3mmGBWSoSel1f17pR84uzkHGzEZ.jpg",
  ],
  // description:
  //   "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad, facere cumque. Quam, voluptatem consequuntur, ipsam quos molestias similique iste soluta aperiam facilis ut consequatur deleniti voluptatum placeat rerum aspernatur consectetur.",
};

export const TestReportPreviewDataPlural: ReportPreviewData[] = [
  {
    id: 0,
    funding: 2.38,
    interest: 4,
    location: {
      latitude: 43.07337,
      longitude: -89.406466,
    },
    tags: ["Misc.", "Littering"],
    images: [
      "https://t4.ftcdn.net/jpg/01/96/59/53/360_F_196595321_SPW8Q3mmGBWSoSel1f17pR84uzkHGzEZ.jpg",
    ],
  },
  {
    id: 1,
    funding: 0.74,
    interest: 2,
    location: {
      latitude: 41.8514,
      longitude: -87.681,
    },
    tags: ["Stray Animals"],
    images: [
      "https://www.havahart.com/media/Articles/Havahart/What_to_Do_If_You_Find_a_Stray_Animal.jpg",
    ],
  },
];

export const TestReportData: ReportData = {
  ...TestReportPreviewData,
  description:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad, facere cumque. Quam, voluptatem consequuntur, ipsam quos molestias similique iste soluta aperiam facilis ut consequatur deleniti voluptatum placeat rerum aspernatur consectetur.\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Ad, facere cumque. Quam, voluptatem consequuntur, ipsam quos molestias similique iste soluta aperiam facilis ut consequatur deleniti voluptatum placeat rerum aspernatur consectetur.",
};

export const TestReportDatas: ReportData[] = TestReportPreviewDataPlural.map(
  (d) => {
    (d as any).description =
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad, facere cumque. Quam, voluptatem consequuntur, ipsam quos molestias similique iste soluta aperiam facilis ut consequatur deleniti voluptatum placeat rerum aspernatur consectetur.\nLorem ipsum, dolor sit amet consectetur adipisicing elit. Ad, facere cumque. Quam, voluptatem consequuntur, ipsam quos molestias similique iste soluta aperiam facilis ut consequatur deleniti voluptatum placeat rerum aspernatur consectetur.";
    return d as ReportData;
  },
);

export const AllTags = ["Misc.", "Littering", "Homeless", "Stray Animals"];
