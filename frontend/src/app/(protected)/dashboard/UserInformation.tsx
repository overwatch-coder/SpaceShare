import React from "react";
import { User } from "@/types/index";

const UserInformation = ({ user }: { user: User }) => {
  return (
    <div className="flex flex-col gap-4 flex-grow w-full">
      <p className="text-gray-600">
        <span className="font-semibold text-primary-dark">Name:</span>{" "}
        {user.name}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold text-primary-dark">Username:</span>{" "}
        {user.username}
      </p>
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
      {user.gender && (
        <p className="text-gray-600">
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
      <p className="text-gray-600">
        <span className="font-semibold text-primary-dark">Smoker:</span>{" "}
        {user.smoker ? "Yes" : "No"}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold text-primary-dark">Drinker:</span>{" "}
        {user.drinker ? "Yes" : "No"}
      </p>
      <p className="text-gray-600">
        <span className="font-semibold text-primary-dark">Pets:</span>{" "}
        {user.pets ? "You have pets" : "You do not have pets"}
      </p>
      <p className="text-gray-600 flex flex-col gap-2">
        <span className="font-semibold text-primary-dark">Hobbies:</span>{" "}
        {user.hobbies.length > 0 ? (
          Array.from(new Set(user.hobbies)).map((hobby) => (
            <span key={hobby}>{hobby}</span>
          ))
        ) : (
          <span>You do not have any hobbies listed</span>
        )}
      </p>
      <p className="text-gray-600 flex flex-col gap-2">
        <span className="font-semibold text-primary-dark">Interests:</span>{" "}
        {user.interests.length > 0 ? (
          Array.from(new Set(user.interests)).map((interest) => (
            <span key={interest}>{interest}</span>
          ))
        ) : (
          <span>You currently do not have any interests listed</span>
        )}
      </p>
    </div>
  );
};

export default UserInformation;
