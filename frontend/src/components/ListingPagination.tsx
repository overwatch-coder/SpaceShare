import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PropertyDocs } from "@/types/index";

const ListingPagination = ({
  limit,
  totalPages,
  page,
  hasPrevPage,
  hasNextPage,
  prevPage,
  nextPage,
  sortBy,
  search,
}: Omit<PropertyDocs, "docs"> & { sortBy: string; search: string }) => {
  return (
    <Pagination className="my-10">
      <PaginationContent>
        {
          <PaginationItem className={`${hasPrevPage ? "" : "opacity-10"}`}>
            <PaginationPrevious
              href={
                hasPrevPage
                  ? `/listings?page=${prevPage}&sortBy=${sortBy}&limit=${limit}&search=${search}`
                  : "#"
              }
            />
          </PaginationItem>
        }
        {new Array(totalPages).fill(0).map((_, index) => (
          <PaginationItem
            key={index}
            className={
              page === index + 1 ? "bg-pink-500 text-white rounded" : ""
            }
          >
            <PaginationLink
              href={`/listings?page=${
                index + 1
              }&sortBy=${sortBy}&limit=${limit}&search=${search}`}
              className="hover:text-white hover:bg-pink-500"
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        {
          <PaginationItem className={`${hasNextPage ? "" : "opacity-10"}`}>
            <PaginationNext
              href={
                hasNextPage
                  ? `/listings?page=${nextPage}&sortBy=${sortBy}&limit=${limit}&search=${search}`
                  : "#"
              }
            />
          </PaginationItem>
        }
      </PaginationContent>
    </Pagination>
  );
};

export default ListingPagination;
