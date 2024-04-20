import React from "react";
import { FaWifi } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { PiTelevisionSimple } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";
import { GiWashingMachine } from "react-icons/gi";
import { MdPool } from "react-icons/md";
import { GiHomeGarage } from "react-icons/gi";

const Amenities = () => {
  return (
    <section className="flex flex-col items-center text-center mx-auto gap-5 px-8 md:px-16 pb-10 pt-5">
      <h3 className="font-bold text-4xl text-pink-500">Available Amenities</h3>
      <p className="text-center font-medium text-gray-500 max-w-xl">
        You can find detailed information about each rental, including photos,
        amenities, location, and rental terms.
      </p>

      <div className="flex items-start md:items-center gap-5 flex-wrap justify-center">
        <p className="w-32 flex flex-col gap-4 items-center text-center p-4 rounded-md hover:shadow-md cursor-pointer">
          <PiTelevisionSimple size={30} />
          <span className="font-semibold">TV</span>
        </p>
        <p className="w-32 flex flex-col gap-4 items-center text-center p-4 rounded-md hover:shadow-md cursor-pointer">
          <TbAirConditioning size={30} />
          <span className="font-semibold">Air Conditioning</span>
        </p>
        <p className="w-32 flex flex-col gap-4 items-center text-center p-4 rounded-md hover:shadow-md cursor-pointer">
          <CgGym size={30} />
          <span className="font-semibold">Gym</span>
        </p>
        <p className="w-32 flex flex-col gap-4 items-center text-center p-4 rounded-md hover:shadow-md cursor-pointer">
          <GiWashingMachine size={30} />
          <span className="font-semibold">Washing Machine</span>
        </p>
        <p className="w-32 flex flex-col gap-4 items-center text-center p-4 rounded-md hover:shadow-md cursor-pointer">
          <MdPool size={30} />
          <span className="font-semibold">Pool</span>
        </p>
        <p className="w-32 flex flex-col gap-4 items-center text-center p-4 rounded-md hover:shadow-md cursor-pointer">
          <GiHomeGarage size={30} />
          <span className="font-semibold">Garage</span>
        </p>
        <p className="w-32 flex flex-col gap-4 items-center text-center p-4 rounded-md hover:shadow-md cursor-pointer">
          <FaWifi size={30} />
          <span className="font-semibold">Wifi</span>
        </p>
      </div>
    </section>
  );
};

export default Amenities;
