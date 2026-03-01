import type { PT_classname } from "../types";
import { jcn } from "../utility";

export function Image(
  props: {
    src: string;
    alt: string;
  } & PT_classname,
) {
  return (
    <img
      className={jcn("rounded object-cover", props.className)}
      src={props.src}
      alt={props.alt}
    />
  );
}
