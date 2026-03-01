import { NavLink } from "react-router-dom";
import { TextInput } from "../components/Input";
import { Button } from "../components/Button";

export default function LoginPage() {
  return (
    <div className="flex flex-col gap-8 w-1/3 bg-secondary text-primary px-4 py-4">
      <form className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold mb-4">Log In</h2>
        <label>
          Username:
          <TextInput placeholder="Enter Username" />
        </label>
        <label>
          Password:
          <TextInput type="password" placeholder="Enter Password" />
        </label>
        <Button type="submit" className="mt-4">
          Login
        </Button>
      </form>
      <span className="">
        New User?{" "}
        <NavLink className="text-accent underline" to={"/signup"}>
          Sign Up
        </NavLink>
      </span>
    </div>
  );
}
