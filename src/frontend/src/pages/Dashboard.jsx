import React, { useEffect, useState } from "react";
import { FaHandHoldingMedical, FaDog, FaCat, FaEarlybirds, FaUsers, FaHorseHead } from 'react-icons/fa';
import { getDogCount } from "../client";

const Dashboard = () => {

    const [dogCount, setDogCount] = useState("")

    const fetchCounts = () =>
        getDogCount()
            .then(res => res.json())
            .then(data => {
                setDogCount(data);
            })

    useEffect(() => {
        fetchCounts();
    }, []);

    return (
        <div className="w-full">
            <div className="h-fit w-full flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
                <div className="border bg-purple-300 rounded-lg flex justify-between md:justify-between text-lg my-2 md:my-0 p-8 px-12 items-center">
                    <FaHandHoldingMedical className=" text-gray-500 text-5xl" />
                    <div className=" flex-col text-right h-full">
                        <p className="text-white text-5xl">{dogCount.doctorCount}</p>
                        <p className="text-gray-500 text-sm">Doctors</p>
                    </div>
                </div>
                <div className="border bg-green-200 rounded-lg flex justify-between text-lg my-2 md:my-0 p-8 px-12  items-center">
                    <FaUsers className=" text-gray-500 text-5xl" />
                    <div className=" flex-col text-right h-full">
                        <p className="text-white text-5xl">{dogCount.ownersCount}</p>
                        <p className="text-gray-500 text-sm">Owners</p>
                    </div>
                </div>
                <div className="border bg-orange-200 rounded-lg flex justify-between text-lg my-2 md:my-0 p-8 px-12  items-center">
                    <FaHorseHead className=" text-gray-500 text-5xl" />
                    <div className=" flex-col text-right h-full">
                        <p className="text-white text-5xl">{dogCount.totalPetCount}</p>
                        <p className="text-gray-500 text-sm">Pets</p>
                    </div>
                </div>
                <div className="border bg-blue-200 rounded-lg flex justify-between text-lg my-2 md:my-0 p-8 px-12  items-center">
                    <FaDog className=" text-gray-500 text-5xl" />
                    <div className=" flex-col text-right h-full">
                        <p className="text-white text-5xl">{dogCount.dogCount}</p>
                        <p className="text-gray-500 text-sm">Dogs</p>
                    </div>
                </div>

                <div className="border bg-red-200 rounded-lg flex justify-between text-lg my-2 md:my-0 p-8 px-12  items-center">
                    <FaCat className=" text-gray-500 text-5xl" />
                    <div className=" flex-col text-right h-full">
                        <p className="text-white text-5xl">{dogCount.catCount}</p>
                        <p className="text-gray-500 text-sm">Cats</p>
                    </div>
                </div>
                <div className="border bg-yellow-200 rounded-lg flex justify-between text-lg my-2 md:my-0 p-8 px-12  items-center">
                    <FaEarlybirds className=" text-gray-500 text-5xl" />
                    <div className=" flex-col text-right h-full">
                        <p className="text-white text-5xl">{dogCount.otherCount}</p>
                        <p className="text-gray-500 text-sm">Others</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
