import { useState } from "react";
import { FileUpload, MultilineTextInput, TextInput } from "../components/Input";
import { AllTags } from "../constants";
import { jcn } from "../utility";
import { Button } from "../components/Button";
import { LocationPicker } from "../components/LocationManagement";
import type { GeoLocation } from "../types";

export default function ReportCreationPage() {
  const [image, setImage] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [location, setLocation] = useState<GeoLocation | undefined>();

  function toggleTag(tag: string) {
    const exists = selectedTags.includes(tag);
    const next = exists
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(() => next);
  }

  return (
    <>
      <div className="flex flex-col w-1/3 px-4 py-4 bg-secondary text-primary">
        <form className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Create Report</h2>
          <label>
            Image:
            <FileUpload
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
            />
          </label>
          <label>
            Tags:
            <div className="flex flex-wrap gap-2">
              {AllTags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={jcn(
                    "px-2 py-1 rounded cursor-pointer",
                    selectedTags.includes(tag)
                      ? "bg-accent text-white"
                      : "bg-gray-800",
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </label>
          <label>
            Location:
            <LocationPicker
              height="200px"
              onSelect={(loc) => {
                if (loc !== undefined) setLocation(loc);
              }}
            />
          </label>
          <label>
            Description:
            <MultilineTextInput />
          </label>
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </>
  );
}
