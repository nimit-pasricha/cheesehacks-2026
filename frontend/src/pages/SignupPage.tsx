import { NavLink, useNavigate } from "react-router-dom";
import { TextInput } from "../components/Input";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/contexts/authContext";
import { apiClient } from "../api/core";
import { authApi } from "../api/auth";
import { useState } from "react";

function SignupForm(props: {
  onSubmit?: (e: React.SubmitEvent<HTMLFormElement>, data: any) => void;
}) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e?.preventDefault();
        if (props.onSubmit === undefined) return;
        props.onSubmit(e, {
          username,
          email,
          password,
        });
      }}
      className="flex flex-col gap-2"
    >
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>

      <label>
        Username:
        <TextInput
          placeholder="eg. John Doe"
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>

      <label>
        Email:
        <TextInput
          type="email"
          placeholder="eg. John.Doe@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
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
        Sign Up
      </Button>
    </form>
  );
}

export default function SignupPage() {
  const auth = useAuth();
  const nav = useNavigate();
  const handleSignup = async (data: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      await authApi.signup(data);
      nav("/");
    } catch (err) {
      console.error(err);
      // TODO: show error message in UI
    }
  };

  return (
    <div className="flex flex-col gap-8 w-1/3 bg-secondary text-primary px-4 py-4">
      <SignupForm
        onSubmit={(e, data) => {
          e?.preventDefault();
          handleSignup(data).then((resp) => {
            auth.login();
          });
          nav("/");
        }}
      />

      <span className="">
        Already a User?{" "}
        <NavLink className="text-accent underline" to={"/login"}>
          Login
        </NavLink>
      </span>
    </div>
  );
}
