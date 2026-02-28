import type { PT_children, PT_classname } from "../types";
import { jcn } from "../utility";

export function CardPlaceholder(props: {} & PT_classname & PT_children) {
  return (
    <>
      <div
        className={jcn(
          "flex flex-col outline-dark outline-2 rounded-lg",
          props.className,
        )}
      ></div>
    </>
  );
}
