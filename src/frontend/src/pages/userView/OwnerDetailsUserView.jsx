import { Avatar, Descriptions, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import {
  AppstoreOutlined,
  MailOutlined,
} from "@ant-design/icons";
import OwnerInformation from "../../Owners/OwnerDetailsDisplay/OwnerInformation";
import OwnerPetList from "../../Owners/OwnerDetailsDisplay/OwnerPetList";




const items = [
  {
    label: "Owner Info",
    key: 0,
    icon: <MailOutlined />,
  },
  {
    label: "Pet List",
    key: 1,
    icon: <AppstoreOutlined />,

  },
];

const OwnerDetailsUserView = ({owner}) => {

  const [current, setCurrent] = useState("0");
  const [displayContent, setDisplayContent] = useState("0")
  console.log(owner)


  return (

    <Descriptions title="" bordered className='w-full py-2' column={1}>
        <Descriptions.Item label="Name" labelStyle={{width:"100px"}}>{owner?.name}</Descriptions.Item>
        <Descriptions.Item label="Address" labelStyle={{width:"100px"}}>{owner?.address}</Descriptions.Item>
        <Descriptions.Item label="Phone Number" >{owner?.phone}</Descriptions.Item>
        <Descriptions.Item label="Email" >{owner?.email}</Descriptions.Item>
        <Descriptions.Item label="Notes" >
        {owner?.notes}
        </Descriptions.Item>
      </Descriptions>
  );
};

export default OwnerDetailsUserView;
