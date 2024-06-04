"use client";
import { Search } from "lucide-react";
import React, { useState } from "react";

type SearchListingProps = {
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const SearchListing = ({
  handleSearch,
  search,
  setSearch,
}: SearchListingProps) => {
  return (
    <section className="pt-5 pb-10">
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center mx-auto"
        method="GET"
      >
        <div className="relative w-full max-w-3xl rounded-full border border-gray-200 flex items-center gap-3">
          <Search className="absolute top-1/2 -translate-y-1/2 left-3 text-gray-400" />
          <input
            type="text"
            name="search"
            placeholder="Search listings..."
            className="w-full px-4 mx-6 py-2 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="bg-pink-500 text-white px-6 py-2 rounded-full"
          >
            Search
          </button>
        </div>
      </form>
    </section>
  );
};

export default SearchListing;
