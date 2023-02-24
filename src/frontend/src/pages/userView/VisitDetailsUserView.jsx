import { Badge, Button, Descriptions } from "antd";
import React, { useEffect, useState } from "react";
import { getEntry } from "../../../client";
import AddNewVisitForm from "./AddNewVisitForm";
import VisitCard from "./VisitCard";

const VisitDetailsUserView = (pet) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [petVisit, setPetVisit] = useState("")

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
        <div className="flex items-center">
          <Button
            onClick={() => setShowDrawer(!showDrawer)}
            className="flex items-center justify-center rounded-lg ml-8"
          >
            Add New Visit
          </Button>
          <Badge count={pet.length} className="site-badge-count-4" />
        </div>
        <AddNewVisitForm
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
          petId={pet.pet.id}
          fetchPetVisits={fetchPetVisits}
        />
        <div>
          {petVisit.visits?.map((visit) => (
            <VisitCard key={visit.visitId} visit={visit} />))}
        </div>

      </div>
    </div>
  );
};

export default VisitDetailsUserView;
