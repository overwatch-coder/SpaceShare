"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

type BreadCrump = {
  name: string;
  path: string;
};

const BreadCrumpLinks = ({ lastLink }: { lastLink?: string }) => {
  // generate breadcrumps from pathname
  const pathname = usePathname();

  const generateBreadcrumbs = () => {
    const segments = pathname.split("/").filter((segment) => segment !== ""); // Remove empty segments
    let breadcrumbs: BreadCrump[] = [
      {
        name: "Home",
        path: "/",
      },
    ];

    segments.reduce((accumulator, segment) => {
      const path = `${accumulator}/${segment}`;
      breadcrumbs.push({ name: segment, path });
      return path;
    }, "");

    return breadcrumbs;
  };

  const breadcrumps = generateBreadcrumbs();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumps
          .slice(0, breadcrumps.length - 1)
          .map((breadcrump, index) => (
            <>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink
                  className="capitalize text-white hover:text-pink-500"
                  href={breadcrump.path}
                >
                  {breadcrump.name}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator
                className={`text-white ${lastLink ? "" : "last:hidden"}`}
              />
            </>
          ))}

        {lastLink !== undefined && (
          <BreadcrumbItem key={lastLink}>
            <BreadcrumbLink className="capitalize text-white hover:text-pink-500">
              {lastLink}
            </BreadcrumbLink>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumpLinks;
