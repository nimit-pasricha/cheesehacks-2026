import { NavLink } from "react-router-dom";
import { TextInput } from "../components/Input";
import { Button } from "../components/Button";

export default function SignupPage() {
  return (
    <div className="flex flex-col gap-8 w-1/3 bg-secondary text-primary px-4 py-4">
      <form className="flex flex-col gap-2">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

        <label>
          Username:
          <TextInput placeholder="eg. John Doe" />
        </label>

        <label>
          Password:
          <TextInput type="password" placeholder="Enter Password" />
        </label>

        <label>
          Confirm Password:
          <TextInput type="password" placeholder="Confirm Password" />
        </label>

        <Button type="submit" className="mt-4">
          Sign Up
        </Button>
      </form>

      <span className="">
        Already a User?{" "}
        <NavLink className="text-accent underline" to={"/login"}>
          Login
        </NavLink>
      </span>
    </div>
  );
}
