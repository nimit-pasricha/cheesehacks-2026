import type { PT_classname } from "../types";
import { jcn } from "../utility";

export function Logo(props: {} & PT_classname) {
  return (
    <h2 className={jcn("text-xl text-light font-bold", props.className)}>
      Sustainable Reporting
    </h2>
  );
}
