import { NavLink } from "react-router-dom";
import type { PT_classname } from "../types";
import { jcn } from "../utility";
import { Logo } from "./Logo";
import { useAuth } from "../hooks/contexts/authContext";

export function Header(props: {} & PT_classname) {
  const auth = useAuth();
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
        {!auth.loggedIn && (
          <NavLink to={"/signup"} className="underline">
            Sign up
          </NavLink>
        )}
        {auth.loggedIn && (
          <NavLink to={"/"} onClick={() => auth.logout()} className="underline">
            Logout
          </NavLink>
        )}
      </nav>
    </header>
  );
}
