import Link from "next/link";

export const metadata = {
  title: "404 | Page Not Found - Spaceshare Vacation Rentals",
  description: "Page Not Found",
};

const NotFound = () => {
  return (
    <section className="flex flex-col items-center mt-32 py-20 space-y-5">
      <h1 className="font-bold font-[georgia] text-6xl text-primary-dark">
        404
      </h1>
      <h2 className="text-4xl font-semibold">Page not found</h2>
      <p className="text-gray-600">
        We are sorry, the page you requested could not be found.
      </p>
      <Link
        href={"/"}
        className="px-5 py-3 text-white uppercase bg-pink-500 hover:bg-transparent border hover:border-pink-500 hover:text-pink-500 rounded"
      >
        Go Home
      </Link>
    </section>
  );
};

export default NotFound;
