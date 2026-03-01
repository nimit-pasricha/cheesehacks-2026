import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

export default function HeaderLayout() {
  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-primary text-dark">
        {/* Top Header w Navigation */}
        <Header />
        <span className="py-12" />
        <Outlet />
        <span className="py-12" />
      </div>
    </>
  );
}
