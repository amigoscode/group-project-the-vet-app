
import React, { useEffect, useState } from "react";
import { deleteEntry, getAllRows } from "../client";
import { errorNotification, successNotification } from "../Notification";
import { PlusOutlined } from "@ant-design/icons";
import AddNewDogForm from "./AddNewDogForm";
import { isMobile } from "react-device-detect";
import PetListCard from "./PetListCard";

const removeDog = (id, callback, petName) => {
  deleteEntry("pets", id)
    .then(() => {
      successNotification("Dog deleted", `${petName} has been deleted`);
      callback();

    })
    .catch((err) => {
      console.log("error removing")
      err.response.json().then((res) => {
        console.log(res);
        errorNotification(
          "There was an issue",
          `${res.message} [${res.status}] [${res.error}]`,
          "bottomLeft"
        );
      });
    });
};

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: isMobile ? 8 : 10,
    },
  });

  const fetchPets = () => {
    setLoading(true);
    getAllRows("pets")
      .then((res) => res.json())
      .then((data) => {
        setPets(data);
        console.log(data)
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: pets.length, //total of items the list will have, used to create the number of pages
          },
        });
      })
      .catch((err) => {
        console.log("error fetching")
        console.log(err.response);
        err.response.json().then((res) => {
          console.log(res);
          errorNotification(
            "There was and issue",
            `${res.message} [statusCode:${res.status}] [${res.error}]`
          );
        });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div className=" py-2 md:p-4">
      <AddNewDogForm
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        fetchPets={fetchPets}
      />
      <div className="flex items-center">
        <div className="flex py-1 px-3 border items-center  mx-2 rounded-xl text-black hover:border-cyan-700 hover:text-cyan-700">
          <PlusOutlined className="mr-1 " />
          <button
            onClick={() => setShowDrawer(!showDrawer)}
            className=""
          >
            Add New Pet
          </button>
        </div>
        <span className="border rounded-full py-1 px-2" >{pets.length}</span>
      </div>
      <div className="flex flex-wrap ">
        {pets?.map((pet) => {
          return <PetListCard key={pet.id} pet={pet} />
        })}
      </div>
    </div>
  );
};

export default PetList;
