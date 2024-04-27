import React from "react";
import { User } from "@/types/index";
import arrayUniq from "array-uniq";

const UserInformation = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col gap-6 flex-grow w-full">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-start md:gap-10">
        <p className="text-gray-600">
          <span className="font-semibold text-primary-dark">Name:</span>{" "}
          {user.name}
        </p>

        <p className="text-gray-600">
          <span className="font-semibold text-primary-dark">Username:</span>{" "}
          {user.username}
        </p>
      </div>

      <p className="text-gray-600">
        <span className="font-semibold text-primary-dark">Email:</span>{" "}
        {user.email}
      </p>

      {user.phone && (
        <p className="text-gray-600">
          <span className="font-semibold text-primary-dark">Phone Number:</span>{" "}
          {user.phone}
        </p>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-start md:gap-10">
        {user.gender && (
          <p className="text-gray-600 capitalize">
            <span className="font-semibold text-primary-dark">Gender:</span>{" "}
            {user.gender}
          </p>
        )}

        {user.age && (
          <p className="text-gray-600">
            <span className="font-semibold text-primary-dark">Age:</span>{" "}
            {user.age}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-start md:gap-10">
        <p className="text-gray-600">
          <span className="font-semibold text-primary-dark">Smoker:</span>{" "}
          {user.smoker ? "Yes" : "No"}
        </p>

        <p className="text-gray-600">
          <span className="font-semibold text-primary-dark">Drinker:</span>{" "}
          {user.drinker ? "Yes" : "No"}
        </p>
      </div>

      <p className="text-gray-600">
        <span className="font-semibold text-primary-dark">Pets:</span>{" "}
        {user.pets ? "You have pets" : "You do not have pets"}
      </p>

      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-start md:gap-10">
        <p className="text-gray-600 flex flex-col gap-2">
          <span className="font-semibold text-primary-dark">Hobbies:</span>{" "}
          {user.hobbies.length > 0 ? (
            arrayUniq(user.hobbies.map((x) => x.trim())).map((hobby, idx) => (
              <span key={idx}>{hobby}</span>
            ))
          ) : (
            <span>You do not have any hobbies listed</span>
          )}
        </p>

        <p className="text-gray-600 flex flex-col gap-2">
          <span className="font-semibold text-primary-dark">Interests:</span>{" "}
          {user.interests.length > 0 ? (
            arrayUniq(user.interests.map((x) => x.trim())).map((interest) => (
              <span key={interest}>{interest}</span>
            ))
          ) : (
            <span>You currently do not have any interests listed</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default UserInformation;
