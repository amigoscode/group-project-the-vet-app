import { Descriptions } from 'antd'
import React from 'react'

const OwnerInformation = (owner) => {
  return (
    <Descriptions title="" bordered className='w-full py-2' column={1}>
      <Descriptions.Item label="Name" labelStyle={{ width: "100px" }}>{owner?.owner.name}</Descriptions.Item>
      <Descriptions.Item label="Address" labelStyle={{ width: "100px" }}>{owner?.owner.address}</Descriptions.Item>
      <Descriptions.Item label="Phone Number" >{owner?.owner.phone}</Descriptions.Item>
      <Descriptions.Item label="Notes" >
        {owner?.owner.notes}
      </Descriptions.Item>
    </Descriptions>
  )
}

export default OwnerInformation