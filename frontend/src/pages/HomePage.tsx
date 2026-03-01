import { useState } from "react";
import { ReportCardPreview } from "../components/Cards";
import { AllTags, TestReportPreviewData } from "../constants";
import type { GeoLocation, PT_classname, ReportPreviewData } from "../types";
import { jcn } from "../utility";
import { NumberInput } from "../components/Input";
import { LocationPicker } from "../components/LocationManagement";

interface ReportFilters {
  tags: string[];
  minInterest?: number;
  maxInterest?: number;
  minFunding?: number;
  maxFunding?: number;
  center?: GeoLocation;
  maxDistanceKm?: number;
}

function FilterForm(
  props: {
    filters: ReportFilters;
    onChange: (filters: ReportFilters) => void;
    availableTags: string[];
  } & PT_classname,
) {
  const { filters, onChange, availableTags } = props;

  function update<K extends keyof ReportFilters>(
    key: K,
    value: ReportFilters[K],
  ) {
    onChange({ ...filters, [key]: value });
  }

  function toggleTag(tag: string) {
    const exists = filters.tags.includes(tag);
    const next = exists
      ? filters.tags.filter((t) => t !== tag)
      : [...filters.tags, tag];

    update("tags", next);
  }

  return (
    <form
      className={jcn(
        "w-full flex flex-col gap-4 bg-secondary text-primary px-4 pt-4 pb-6",
        props.className,
      )}
    >
      {/* TAG FILTER */}
      <div>
        <h3 className="font-semibold mb-2">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              className={jcn(
                "px-2 py-1 rounded cursor-pointer",
                filters.tags.includes(tag)
                  ? "bg-accent text-white"
                  : "bg-gray-800",
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* INTEREST RANGE */}
      <div>
        <h3 className="font-semibold mb-2">Interest</h3>
        <div className="flex gap-2">
          <NumberInput
            placeholder="Min"
            value={filters.minInterest ?? ""}
            onChange={(e) => update("minInterest", Number(e.target.value))}
          />
          <NumberInput
            placeholder="Max"
            value={filters.maxInterest ?? ""}
            onChange={(e) => update("maxInterest", Number(e.target.value))}
          />
        </div>
      </div>

      {/* FUNDING RANGE */}
      <div>
        <h3 className="font-semibold mb-2">Funding ($)</h3>
        <div className="flex gap-2">
          <NumberInput
            placeholder="Min"
            value={filters.minFunding ?? ""}
            onChange={(e) => update("minFunding", Number(e.target.value))}
          />
          <NumberInput
            placeholder="Max"
            value={filters.maxFunding ?? ""}
            onChange={(e) => update("maxFunding", Number(e.target.value))}
          />
        </div>
      </div>

      {/* DISTANCE */}
      <div>
        <div className="w-full">
          <LocationPicker height="150px" />
        </div>

        <h3 className="font-semibold mb-2">Distance (km)</h3>
        <NumberInput
          placeholder="Max Distance"
          value={filters.maxDistanceKm ?? ""}
          onChange={(e) => update("maxDistanceKm", Number(e.target.value))}
        />
      </div>
    </form>
  );
}

export default function HomePage() {
  const [searchFilters, setSearchFilters] = useState<ReportFilters>({
    tags: [],
  });
  const [reportPreviews, setReportPreviews] = useState<ReportPreviewData[]>([
    TestReportPreviewData,
    TestReportPreviewData,
    TestReportPreviewData,
  ]);

  return (
    <>
      {/* Main Content. Requests etc. */}
      <div className="flex">
        <div className="fixed w-1/4 px-8">
          <FilterForm
            filters={searchFilters}
            onChange={(n) => {
              setSearchFilters(n);
              console.log("New filters", n);
            }}
            availableTags={AllTags}
          />
        </div>

        <div className="w-1/4"> {/* Spacer */} </div>

        <ul className="w-1/2 flex flex-col gap-16">
          {reportPreviews.map((p) => (
            <li key={p.id}>
              <ReportCardPreview
                preview={p}
                onSelectTag={(tg) => {
                  if (tg in searchFilters.tags) return;
                  setSearchFilters((prev) => ({
                    ...prev,
                    tags: [...prev.tags, tg],
                  }));
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
