
import { Avatar, Menu } from "antd";
import React, { useEffect, useState } from "react";
import {
  CarryOutOutlined,
  UserOutlined,
  FileOutlined,
} from "@ant-design/icons";
import PetDisplayDetails from "./DogDetailsDisplay/PetDisplayDetails";
import PetDisplayVisitDetails from "./DogDetailsDisplay/VisitDetails/PetDisplayVisitDetails";
import PetDisplayOwnerDetails from "./DogDetailsDisplay/PetDisplayOwnerDetails";
import { getEntry } from "../client";
import { useSearchParams } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload } from 'antd';
import Compressor from "compressorjs";


const items = [
  {
    label: "Pet Details",
    key: 0,
    icon: <FileOutlined />,
  },
  {
    label: "Owner Details",
    key: 1,
    icon: <UserOutlined />,

  },
  {
    label: "Visits",
    key: 2,
    icon: <CarryOutOutlined />,
  },
];

const itemsMobile = [
  {
    label: "Pet",
    key: 0,
    icon: <FileOutlined />,
  },
  {
    label: "Owner",
    key: 1,
    icon: <UserOutlined />,

  },
  {
    label: "Visits",
    key: 2,
    icon: <CarryOutOutlined />,
  },
];

const PetInformation = (state) => {

  const [current, setCurrent] = useState("0");
  const [displayContent, setDisplayContent] = useState("0")
  const [pet, setPet] = useState("")
  const [searchParams] = useSearchParams();
  const petId = searchParams.get("petId") //getting the value from the query param from URL.


  const fetchPet = (petId) => {
    getEntry("pets", petId)
      .then(res => res.json())
      .then(data => {
        setPet(data);
        console.log(data)
      })
  }

  useEffect(() => {
    fetchPet(petId);
  }, []);

  const props = {
    name: 'file',
    action: `api/v1/pets/${petId}/profilePicture/upload`,
    method: "post",
    showUploadList: false,
    beforeUpload(file) {//before upload compress image
      return new Promise((resolve) => {
        const image = file;
        new Compressor(image, {
          quality: 0.3, // 0.6 can also be used, but its not recommended to go below.
          success: (compressedResult) => {
            resolve(compressedResult)
          },
        });
    })
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        window.location.reload(false);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };



  const PageDisplay = () => {
    if (displayContent === "0") {
      return <PetDisplayDetails pet={pet} />;
    } else if (displayContent === "1") {
      return <PetDisplayOwnerDetails pet={pet} />
    } else {
      return <PetDisplayVisitDetails pet={pet} />;
    }
  };

  /*Set page number after clicking one of the menu items to render the corresponding component */
  const onClick = (e) => {
    setCurrent(e.key);
    setDisplayContent(e.key);
  };

  return (

    <div className="w-full min-h-screen">
      {/* Avatar section */}
      <div className=" h-1/5 bg-grey-300 pt-4">
        <div className="h-full flex flex-col justify-end items-center">
          <div className="relative ">
            {pet.petProfileImageLink ? <img className="rounded-full w-[128px] h-[128px] lg:w-[200px] lg:h-[200px] object-cover" src={`api/v1/pets/${petId}/profilePicture/download`} alt="loginPic" />
              : <Avatar size={isMobile ? 128 : 200} icon={<UserOutlined />} />}
            <h1>{ }</h1>
            <Upload {...props}>
              <Button className="absolute bg-[#002140] text-white rounded-full bottom-10 right-0" icon={<UploadOutlined />}></Button>
            </Upload>
          </div>
        </div>
      </div>
      {/* End avatar section */}
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={isMobile ? itemsMobile : items}
        className="flex justify-center"
      />
      <div className="w-full flex justify-center p-2 pt-4">
        {PageDisplay()}
      </div>
    </div>
  );
};

export default PetInformation;
