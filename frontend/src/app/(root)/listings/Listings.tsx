"use client";
import SearchListing from "@/app/(root)/listings/SearchListing";
import { getListings } from "@/app/actions/listings.actions";
import Listing from "@/components/Listing";
import ListingPagination from "@/components/ListingPagination";
import { Property, PropertyDocs } from "@/types/index";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";

const Listings = () => {
  const router = useRouter();

  const [properties, setProperties] = useState<Property[]>();
  const [paginationData, setPaginationData] = useState<
    Omit<PropertyDocs, "docs">
  >({
    totalDocs: 0,
    limit: 0,
    totalPages: 0,
    page: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null,
  });
  const [formSearch, setFormSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sortBy") ?? "createdAt:desc";
  const limit = searchParams.get("limit") ?? "6";
  const page = searchParams.get("page") ?? "1";
  const search = searchParams.get("search") ?? "";

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const url = search
        ? `properties?limit=${limit}&sortBy=${sortBy}&page=${page}&search=${search}`
        : `properties?limit=${limit}&sortBy=${sortBy}&page=${page}`;

      const { docs, ...pagination }: PropertyDocs = await getListings(
        url,
        true
      );

      setProperties(docs);
      setPaginationData(pagination);

      setLoading(false);
    };

    fetchListings();

    return () => {
      setLoading(false);
    };
  }, [limit, page, sortBy, search]);

  // handle search form function
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ formSearch, click: "clicked" });
    const setNewSearchParams = new URLSearchParams();

    if (search) {
      setNewSearchParams.delete("search");
    }

    if (formSearch) {
      setNewSearchParams.set("search", formSearch);
      router.push(
        `/listings?limit=${limit}&sortBy=${sortBy}&page=${page}&search=${formSearch}`
      );
    } else {
      router.push(`/listings?limit=${limit}&sortBy=${sortBy}&page=${page}`);
    }
  };

  return (
    <div>
      <SearchListing
        handleSearch={handleSearch}
        search={formSearch}
        setSearch={setFormSearch}
      />

      {loading ? (
        <ListingContentLoader />
      ) : !properties || properties.length === 0 ? (
        <div className="py-5 text-center mx-auto">
          <p className="text-xl text-center font-semibold">
            Sorry, No Listings Available
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {properties.map((property) => (
              <Listing key={property._id} property={property} />
            ))}
          </div>

          {/* pagination */}
          {paginationData.totalPages > 1 && (
            <ListingPagination
              {...paginationData}
              sortBy={sortBy}
              search={search}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Listings;

const ListingContentLoader = () => {
  return (
    <div className="flex items-center justify-center mx-auto">
      <ContentLoader />
    </div>
  );
};
