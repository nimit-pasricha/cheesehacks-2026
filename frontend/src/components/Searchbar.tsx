import type { PT_classname } from "../types";
import { jcn } from "../utility";

export function Searchbar(props: {} & PT_classname) {
  return <div className={jcn("", props.className)}></div>;
}
