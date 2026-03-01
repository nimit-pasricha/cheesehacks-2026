import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Button } from "../components/Button";

export default function FocusLayout() {
  const nav = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="fixed inset-0 flex flex-col justify-center items-center w-full h-screen overflow-hidden bg-primary text-dark">
        {/* Focus View */}
        <Button
          className="absolute top-5 left-5"
          onClick={() => {
            nav(-1);
          }}
        >
          Back
        </Button>

        <Outlet />
      </div>
    </>
  );
}
