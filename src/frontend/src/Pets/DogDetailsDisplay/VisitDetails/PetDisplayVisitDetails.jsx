import { Descriptions } from "antd";
import React, { useEffect, useState } from "react";
import { getEntry } from "../../../client";
import AddNewVisitForm from "./AddNewVisitForm";
import VisitCard from "./VisitCard";
import { PlusOutlined } from "@ant-design/icons";

const PetDisplayVisitDetails = (pet) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [petVisit, setPetVisit] = useState("")

  let count =0;

  const fetchPetVisits = () => {
    getEntry("pets", pet.pet.id)
      .then(res => res.json())
      .then(data => {
        setPetVisit(data);
        console.log(data)
      })
  }

  useEffect(() => {
    fetchPetVisits();
  }, []);

  return (
    <div className="flex w-full py-2">
      <div>
        <Descriptions
          title=""
          className="w-full"
          column={1}
        ></Descriptions>
       <div className="flex py-1 px-3 border items-center  mx-2 rounded-xl text-black hover:border-cyan-700 hover:text-cyan-700 w-fit">
          <PlusOutlined className="mr-1 " />
          <button
            onClick={() => setShowDrawer(!showDrawer)}
            className=""
          >
            Add New Pet
          </button>
        </div>
        <AddNewVisitForm
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          petId={pet.pet.id}
          fetchPetVisits={fetchPetVisits}
        />
        <div>
          {petVisit.visits?.map((visit) => (
            <VisitCard key={visit.visitId} visit={visit} count={count=count+1} />))}
        </div>

      </div>
    </div>
  );
};

export default PetDisplayVisitDetails;
