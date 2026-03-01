import { useNavigate } from "react-router-dom";
import type { PT_children, PT_classname, ReportPreviewData } from "../types";
import { asCurrency, jcn, locationToUrl } from "../utility";
import { Image } from "./Image";

export function CardPlaceholder(props: {} & PT_classname & PT_children) {
  return (
    <>
      <div
        className={jcn(
          "flex flex-col outline-dark outline-2 rounded-lg",
          props.className,
        )}
      >
        {props.children}
      </div>
    </>
  );
}

export function ReportCardPreview(
  props: {
    preview: ReportPreviewData;
  } & PT_classname,
) {
  const nav = useNavigate();
  const locationUrl = locationToUrl(props.preview.location);
  return (
    <>
      <div
        className={jcn(
          "flex flex-col rounded w-full bg-secondary text-primary px-4 pt-4 pb-4 cursor-pointer",
          props.className,
        )}
        onClick={() => {
          nav(`/report/${props.preview.id}`);
        }}
      >
        <span className="flex justify-between text-lg font-bold">
          {props.preview.funding > 0 && (
            <h4>{asCurrency(props.preview.funding)}</h4>
          )}
          {props.preview.interest > 0 && (
            <h4>{props.preview.interest} People</h4>
          )}
        </span>

        <span className="mt-1">
          Location: <a href={locationUrl}>{locationUrl}</a>
        </span>

        <ul className="flex gap-2 mt-2">
          {props.preview.tags.map((tg) => (
            <li key={tg}>
              <span className="bg-accent rounded-full px-2 pb-1">{tg}</span>
            </li>
          ))}
        </ul>

        <Image
          className="w-full object-cover aspect-3/2 py-4"
          src={props.preview.images[0]}
          alt=""
        />
      </div>
    </>
  );
}
