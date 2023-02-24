import React from "react";
import PetDisplayDetails from "../../Pets/DogDetailsDisplay/PetDisplayDetails";

const OwnerPetList = ({ owner }) => {

  return (
    <div className="flex-col w-full">
      {owner.pets?.map((pet) => {
        return <PetDisplayDetails pet={pet} />
      })}
    </div>)
};

export default OwnerPetList;
