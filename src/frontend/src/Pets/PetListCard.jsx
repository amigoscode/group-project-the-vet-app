import { Avatar } from 'antd'
import React from 'react'
import {
  UserOutlined,
} from "@ant-design/icons";
import { isMobile } from 'react-device-detect';
import { useNavigate } from "react-router-dom";

const PetListCard = ({ pet }) => {
  const navigate = useNavigate();
  return (
    <div className='w-[110px] h-[200px] md:w-[200px] md:h-[300px] flex flex-col border-2 border-blac rounded-xl my-4 mx-2 p-2 hover:-translate-y-1 duration-500 cursor-pointer ' onClick={() =>
      navigate({
        pathname: "/pet",
        search: `?petId=${pet.id}`,
      })
    }>
      {pet.petProfileImageLink ? <img className="rounded-lg w-full h-2/3 object-cover" src={`api/v1/pets/${pet.id}/profilePicture/download`} /> : <div className='bg-gray-400 h-2/3 w-full object-cover  rounded-lg'></div>}
      <p><strong>{pet.name.charAt(0).toUpperCase() + pet.name.slice(1)}</strong></p>{/* first letter to uppercase*/}
      <p className='hidden md:block'>{pet.breed}</p>
      <p className='text-cyan-700'>{pet.owner.name}</p>
      <p className='hidden md:block'>{pet.owner.phone}</p>
    </div>
  )
}

export default PetListCard