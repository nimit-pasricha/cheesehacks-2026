import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function FocusLayout() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="fixed inset-0 flex flex-col justify-center items-center w-full h-screen overflow-hidden bg-primary text-dark">
        {/* Focus View */}
        <Outlet />
      </div>
    </>
  );
}
