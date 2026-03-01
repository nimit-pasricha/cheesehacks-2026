import { NavLink, useNavigate } from "react-router-dom";
import { TextInput } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from "react";
import { authApi } from "../api/auth";

function LoginForm(props: { onSubmit?: (e: any, data: any) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e?.preventDefault();
        if (props.onSubmit === undefined) return;
        props.onSubmit(e, {
          username,
          password,
        });
      }}
      className="flex flex-col gap-2"
    >
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <label>
        Username:
        <TextInput
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <TextInput
          type="password"
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <Button type="submit" className="mt-4">
        Login
      </Button>
    </form>
  );
}

export default function LoginPage() {
  const nav = useNavigate();
  const handleLogin = async (
    e: any,
    data: { username: string; password: string },
  ) => {
    try {
      await authApi.login(data);
      nav("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col gap-8 w-1/3 bg-secondary text-primary px-4 py-4">
      <LoginForm onSubmit={handleLogin} />
      <span className="">
        New User?{" "}
        <NavLink className="text-accent underline" to={"/signup"}>
          Sign Up
        </NavLink>
      </span>
    </div>
  );
}
