import { Popconfirm, Table, Radio, Badge, Button } from "antd";
import React, { useEffect, useState } from "react";
import { deleteEntry, getAllRows } from "../../client";
import { errorNotification, successNotification } from "../../Notification";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";

const columnsMobile = (pets, navigate) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: true,
  },
  {
    title: "Breed",
    dataIndex: "breed",
    key: "breed",
  },
  {
    title: "Actions",
    key: "actions",
    render: (text, pet) => (
      <Radio.Group className="flex">
        <Radio.Button
          value="small"
          onClick={() =>
            navigate({
              pathname: `/userView/pet`,
              search: `?petId=${pet.id}`,
            })
          }
        >
          Details
        </Radio.Button>
      </Radio.Group>
    ),
  },
];

const columns = (pet, navigate) => [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    sorter: true,
  },
  {
    title: "Breed",
    dataIndex: "breed",
    key: "breed",
  },
  {
    title: "Color",
    dataIndex: "color",
    key: "color",
  },
  {
    title: "Actions",
    key: "actions",
    render: (text, pet) => (
      <Radio.Group>
        <Radio.Button
          value="small"
          onClick={() =>
            navigate({
              pathname: `/userView/pet`,
              search: `?petId=${pet.id}`,
            })
          }
        >
          Details
        </Radio.Button>
      </Radio.Group>
    ),
  },
];

const PetList = ({pets}) => {
  const navigate = useNavigate();
  const [showDrawer, setShowDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: isMobile ? 8 : 10,
    },
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  return (
    <div className="">
      <Table
        columns={
          isMobile
            ? columnsMobile(pets, navigate)
            : columns(pets, navigate)
        }
        title={() => (
          <div className="flex items-center">
            <Badge count={pets.length} className="site-badge-count-4" />
          </div>
        )}
        rowKey={(pets) => pets.id}
        dataSource={pets}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        className="p-2"
      />
    </div>
  );
};

export default PetList;
