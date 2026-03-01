import type { PT_children, PT_classname } from "../types";
import { jcn } from "../utility";

export function Button(
  props: {
    type?: "submit" | "reset" | "button";
    onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  } & PT_classname &
    PT_children,
) {
  return (
    <button
      onClick={props.onClick}
      type={props.type}
      className={jcn(
        "bg-accent text-light px-4 py-2 rounded cursor-pointer",
        props.className,
      )}
    >
      {props.children}
    </button>
  );
}
