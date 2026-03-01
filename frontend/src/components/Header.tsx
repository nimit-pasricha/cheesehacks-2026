import { NavLink } from "react-router-dom";
import type { PT_classname } from "../types";
import { jcn } from "../utility";
import { Logo } from "./Logo";

export function Header(props: {} & PT_classname) {
  return (
    <header
      className={jcn(
        "flex justify-between fixed top-0 bg-secondary text-primary w-full py-2 px-6",
        props.className,
      )}
    >
      <NavLink to={"/"}>
        <Logo />
      </NavLink>
      <nav className="">
        <NavLink to={"/"} className="underline">
          Sign up
        </NavLink>
      </nav>
    </header>
  );
}
