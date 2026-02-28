import { CardPlaceholder } from "../components/Cards";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-primary text-dark">
        {/* Top Header w Navigation */}
        <header className="flex justify-between fixed top-0 bg-secondary text-primary w-full py-2 px-6">
          <h2 className="text-lg font-bold">
            <a href="#">Sustainable Outreach</a>
          </h2>
          <nav className="">
            <a href="#" className="underline">
              Sign up
            </a>
          </nav>
        </header>

        {/* Main Content. Requests etc. */}
        <div className="flex flex-col items-center pt-24">
          <ul className="w-1/2 flex flex-col gap-16">
            <li>
              <CardPlaceholder className="w-full h-64" />
            </li>
            <li>
              <CardPlaceholder className="w-full h-64" />
            </li>
            <li>
              <CardPlaceholder className="w-full h-64" />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
