import { getListings } from "@/app/actions/listings.actions";
import BookingSheet from "@/app/listings/[id]/BookingSheet";
import ListingDetailsSummary from "@/app/listings/[id]/ListingDetailsSummary";
import BreadCrumpLinks from "@/components/BreadCrumpLinks";
import { Property } from "@/types/index";
import { Metadata } from "next";
import { IoLocationSharp } from "react-icons/io5";

type ListingDetailsPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({
  params: { id },
}: ListingDetailsPageProps): Promise<Metadata> {
  const property: Property = await getListings(`properties/${id}`);

  return {
    title: property.name,
    description: property.description,
    keywords: property.name,
    openGraph: {
      title: property.name,
      description: property.description,
      images: [property.coverImage, ...property.images],
    },
  };
}

const ListingDetailsPage = async ({
  params: { id },
}: ListingDetailsPageProps) => {
  const property: Property = await getListings(`properties/${id}`);

  return (
    <div className="flex flex-col gap-5 pb-10">
      {/* Hero Section */}
      <section
        id="welcome"
        className="bg-hero-2 bg-center bg-cover bg-no-repeat h-full md:h-[80vh] lg:h-[100vh] py-16"
      >
        <div className="mt-24 md:mt-32 flex flex-col gap-6 md:gap-8 justify-center items-center max-w-2xl mx-auto">
          <BreadCrumpLinks lastLink={property.name} />

          <h2 className="text-center font-semibold text-3xl md:text-5xl text-white">
            {property.name}
          </h2>

          <p className="text-center text-white flex items-center justify-center gap-3">
            <IoLocationSharp size={30} className="text-white" />
            <span className="text-lg font-medium">{property.location}</span>
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-5 px-8 md:px-16 pt-6 pb-10">
        <div className="flex flex-col-reverse gap-5 md:flex-row md:items-start md:gap-10">
          <div className="flex flex-col gap-5 md:w-[300px] w-full">
            <BookingSheet property={property} />
          </div>

          <div className="flex flex-col gap-5 md:flex-1 w-full">
            <ListingDetailsSummary property={property} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListingDetailsPage;
