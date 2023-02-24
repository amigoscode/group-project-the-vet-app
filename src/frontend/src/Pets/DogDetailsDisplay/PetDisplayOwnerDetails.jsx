import { Descriptions } from 'antd'
import React, { useEffect, useState } from 'react'
import { getEntry } from '../../client';

const OwnerDetails = (pet) => {
/* In this component, I am using the property in pet named ownerIndicator
 to identify the owner Id and use it to call the backend and 
retrieve the information of the owner corresponding to that id */

  const [owner, setOwner] = useState([]);

  const fetchOwner = () =>{
    console.log(pet)
    getEntry("owners", pet.pet.owner.id)
        .then(res => res.json())
        .then(data => {
          setOwner(data);
        })
    }
        
useEffect(() => {
  fetchOwner();
}, []);

    return (
        <Descriptions title="" bordered className='w-full py-2' column={1}>
        <Descriptions.Item label="Name" labelStyle={{width:"100px"}}>{owner?.name}</Descriptions.Item>
        <Descriptions.Item label="Address" labelStyle={{width:"100px"}}>{owner?.address}</Descriptions.Item>
        <Descriptions.Item label="Phone Number" >{owner?.phone}</Descriptions.Item>
        <Descriptions.Item label="Notes" >
        {owner?.notes}
        </Descriptions.Item>
      </Descriptions>
    )
}

export default OwnerDetails