export default function ErrorPage() {
  return (
    <>
      <div className="flex flex-col justify-center pl-5 w-screen h-screen bg-accent text-primary">
        <h1 className="text-3xl font-bold">
          {" "}
          Uh Oh! An Unexpected Error Occured!{" "}
        </h1>
        <p className="ml-5">
          An unexpected error has occured! Please try and return to the previous
          page.
        </p>
      </div>
    </>
  );
}
