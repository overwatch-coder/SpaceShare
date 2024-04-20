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

const BreadCrumpLinks = () => {
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
        {breadcrumps.map((breadcrump, index) => (
          <>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink className="capitalize" href={breadcrump.path}>
                {breadcrump.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className={`last:hidden`} />
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumpLinks;
