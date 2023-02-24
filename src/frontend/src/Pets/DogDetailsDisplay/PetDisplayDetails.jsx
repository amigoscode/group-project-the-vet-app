import { Descriptions, message, Tag,Button,Upload } from "antd";
import React from "react";
import { getDocLinks } from "../../client";
import { UploadOutlined } from '@ant-design/icons';

const PetDisplayDetails = ({ pet }) => {

  const isAboutToExpire = (lastVaccine) => {
    let date1 = new Date(lastVaccine).getTime() / 1000 / 3600 / 24;
    let date2 = new Date().getTime() / 1000 / 3600 / 24; //covnerting to date
    if (date1 == "") {
      return ""
    }
    else if (date2 - date1 > 200 && date2 - date1 < 365) {
      return "orange";
    } else if (date2 - date1 > 365) {
      return "red";
    }
    return "green";
  };

  const propsDocs =  {
    name: 'file',
    action: `api/v1/documents/pet/${pet.id}/document/upload`,
    method: "post",
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

  console.log(pet)

  //Used to open in a new window the document link after fetching the info
  const handleClick = (id, key) =>{
    console.log(id,key)
    getDocLinks(id, key)
    .then(res => res.text())
    .then(data => {
      window.open(data)
    })

  }

  const typeOfAnimalShowVaccine = (typeOfPet) => {
    if (typeOfPet === "dog") {
      //Vaccines shown for dogs------------------------------------
      return (
        <>
          <div className="grid gap-2 grid-cols-2">
            <div>Kc</div>
            <Tag className="w-fit min-w-[100px] flex justify-center items-center" color={isAboutToExpire(pet.lastKc)}>
              {pet.lastKc ? pet.lastKc : "No Data"}
            </Tag>
          </div>
          <div className="grid gap-2 grid-cols-2">
            <div>Rabia</div>
            <Tag className="w-fit min-w-[100px] flex justify-center items-center" color={isAboutToExpire(pet.lastRabia)}>
              {pet.lastRabia ? pet.lastRabia : "No Data"}
            </Tag>
          </div>
          <div className="grid gap-2 grid-cols-2">
            <div>Sextuple</div>
            <Tag className="w-fit min-w-[100px] flex justify-center items-center" color={isAboutToExpire(pet.lastSextuple)}>
              {pet.lastSextuple ? pet.lastSextuple : "No Data"}
            </Tag>
          </div>
          <div className="grid gap-2 grid-cols-2">
            <div>Triple</div>
            <Tag className="w-fit min-w-[100px] flex justify-center items-center" color={isAboutToExpire(pet.lastTriple)}>
              {pet.lastTriple ? pet.lastTriple : "No Data"}
            </Tag>
          </div>
          <div className="grid gap-2 grid-cols-2">
            <div>Parvovirosis</div>
            <Tag className="w-fit min-w-[100px] flex justify-center items-center" color={isAboutToExpire(pet.lastParv)}>
              {pet.lastParv ? pet.lastParv : "No Data"}
            </Tag>
          </div>
          <div className="grid gap-2  grid-cols-2">
            <div>Quintuple</div>
            <Tag className="w-fit min-w-[100px] flex justify-center items-center" color={isAboutToExpire(pet.lastQuint)}>
              {pet.lastQuint ? pet.lastQuint : "No Data"}
            </Tag>
          </div>
          <div className="grid gap-2 grid-cols-2">
            <div>Giardia</div>
            <Tag className="w-fit min-w-[100px] flex justify-center item-center" color={isAboutToExpire(pet.lastGiardia)}>
              {pet.lastGiardia ? pet.lastGiardia : "No Data"}
            </Tag>
          </div>
          <div className="grid gap-2  grid-cols-2">
            <div>Parvo / Moquillo</div>
            <Tag className="w-fit min-w-[100px] flex justify-center items-center" color={isAboutToExpire(pet.lastParvMoquillo)}>
              {pet.lastParvMoquillo ? pet.lastParvMoquillo : "No Data"}
            </Tag>
          </div>
        </>
      )
    } //Vaccines shown for dogs------------------------------------

    //Vaccines shown for cats------------------------------------
    else if (typeOfPet === "cat") {
      return (
        <>
          <div className="grid gap-2 grid-cols-2">
            <div>Rabia</div>
            <Tag className="w-fit min-w-[100px] flex justify-center items-center" color={isAboutToExpire(pet.lastRabia)}>
              {pet.lastRabia ? pet.lastRabia : "No Data"}
            </Tag>
          </div>
          <div className="grid gap-2 grid-cols-2">
            <div>Triple</div>
            <Tag className="w-fit min-w-[100px] flex justify-center items-center" color={isAboutToExpire(pet.lastTriple)}>
              {pet.lastTriple ? pet.lastTriple : "No Data"}
            </Tag>
          </div>
          <div className="grid gap-2  grid-cols-2">
            <div>Quintuple</div>
            <Tag className="w-fit min-w-[100px] flex justify-center items-center" color={isAboutToExpire(pet.lastQuint)}>
              {pet.lastQuint ? pet.lastQuint : "No Data"}
            </Tag>
          </div>
        </>
      )
    }//Vaccines shown for cats------------------------------------

    else if (typeOfPet === "other") {
      return (
        <>
          <div className="grid gap-2 grid-cols-2">
            <div>Rabia</div>
            <Tag className="w-fit min-w-[100px] flex justify-center" color={isAboutToExpire(pet.lastRabia)}>
              {pet.lastRabia ? pet.lastRabia : "No Data"}
            </Tag>
          </div>
        </>
      )
    }

  }

  return (
    <Descriptions title="" bordered className="w-full py-2" column={1}>
      <Descriptions.Item label="Name" labelStyle={{ width: "100px" }}>
        {pet.name?.charAt(0).toUpperCase() + pet.name?.slice(1)}{/*first letter to uppecarse*/}
      </Descriptions.Item>
      <Descriptions.Item label="DOB">{pet.dob?.slice(8, 10)}/{pet.dob?.slice(5, 7)}/{pet.dob?.slice(0, 4)} {"(DD/MM/AAAA)"}</Descriptions.Item>
      <Descriptions.Item label="Type">{pet.type}</Descriptions.Item>
      <Descriptions.Item label="Breed">{pet.breed}</Descriptions.Item>
      <Descriptions.Item label="Color">{pet.color}</Descriptions.Item>
      <Descriptions.Item label="Gender">{pet.gender}</Descriptions.Item>
      <Descriptions.Item label="Weight">{pet.weight}</Descriptions.Item>
      <Descriptions.Item label="Vaccines">
        <div className="md:w-[60%] lg:w-[30%]">
          {typeOfAnimalShowVaccine(pet.type)}
        </div>
      </Descriptions.Item>
      <Descriptions.Item label="Notes">{pet.notes}</Descriptions.Item>
      <Descriptions.Item label="Documents">
        <div className="flex flex-col">
          {pet.documents?.map((document) => (
            // <a key={document.id} rel="noopener noreferrer" href={`api/v1/documents/pets/${pet.id}/download/${document.documentLink}`} target="_blank">{document.name}</a>
            <div>
              <button key={document.id} onClick={()=>handleClick(pet.id, document.documentLink)}>
                <Tag color="blue" className="my-1 flex justify-center">{document.name.length>20?document.name.slice(0,15):document.name}</Tag>
                </button>
            </div>
            )
          )}
          <Upload {...propsDocs}>
            <Button className="mt-4" icon={<UploadOutlined />}></Button>
          </Upload>
        </div>
      </Descriptions.Item>
    </Descriptions>
  );
};

export default PetDisplayDetails;
