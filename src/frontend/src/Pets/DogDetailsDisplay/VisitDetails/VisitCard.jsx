import { Button, Col, Descriptions, Form, Input, Row, Select, Tag, message, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import { addNewVaccineToVisit, getDocLinkFromVisit, getEntry, getVaccines } from '../../../client'
import { errorNotification, successNotification } from '../../../Notification'
import { UploadOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';

const VisitCard = ({visit, count}) => {
  const {
    doctor,
atHomeTreatment,
clinicTreatment,
date,
diagnostic,
petId,
symptoms,
vaccines,
visitId,
visitReason,
pet,
notes,
complExams
  } = visit
  
  const [vaccineList, setVaccineList] = useState([]);
  const [openVaccine, setOpenVaccine] = useState(false);

const fetchVaccines = () =>{
      getVaccines()
      .then(res => res.json())
          .then(data => {
            setVaccineList(data)
          })
      }

useEffect(() => {
    fetchVaccines();
}, []);

const propsDocs =  {
  name: 'file',
  action: `api/v1/documents/visit/${visitId}/document/upload`,
  method: "post",
  onChange(info) {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      window.location.reload(false);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

//Used to open in a new window the document link after fetching the info
const handleClick = (id, key) =>{
  console.log(id,key)
  getDocLinkFromVisit(id, key)
  .then(res => res.text())
  .then(data => {
    window.open(data)
  })

}

  const onFinish = ( vaccine ) => {
    console.log(JSON.stringify(vaccine, null, 2));
    console.log(pet.id, vaccine.vaccineId, visitId)
    addNewVaccineToVisit(pet.id, vaccine.vaccineId, visitId)
      .then(() => {
        successNotification(
          "Vaccine successfully added",
          `${vaccine.name} was added to pet ${petId} in visit ${visitId}`
        );
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err.response);
        err.response.json().then((res) => {
          errorNotification(
            "There was and issue",
            `${res.message} [statusCode:${res.status}] [${res.error}]`,
            "bottomLeft"
          );
        });
      })
      .finally(() => {
        setOpenVaccine(false);
      });
  };

 

  return (
    <>
    <div className='p-2 text-xl border-2 border-gray-300 w-fit rounded-lg my-2'>Visit {count} </div>
    <Descriptions bordered className='w-full' column={1}>
    <Descriptions.Item label="Doctor" labelStyle={{width:"100px"}}>{doctor}</Descriptions.Item>
    <Descriptions.Item label="Date" >{date?.slice(8,10)}/{date?.slice(5,7)}/{date?.slice(0,4)} {"(DD/MM/AAAA)"}</Descriptions.Item>
    <Descriptions.Item label="Reason for the Visit" >{visitReason}</Descriptions.Item>
    <Descriptions.Item label="Symptoms">{symptoms}</Descriptions.Item>
    <Descriptions.Item label="Complementary Exams">{complExams}</Descriptions.Item>
    <Descriptions.Item label="Diagnostic" >
    {diagnostic}
    </Descriptions.Item>
    <Descriptions.Item label="at Home Treatment" >{atHomeTreatment}</Descriptions.Item>
    <Descriptions.Item label="On Site treatment" >
    {clinicTreatment}
    </Descriptions.Item>
    <Descriptions.Item label="Notes" >
    {notes}
    </Descriptions.Item>
    <Descriptions.Item label="Vaccines" >
      <div className='flex flex-col lg:max-w-[30%]'>
      <div className='py-1 flex flex-col lg:w-fit '>
    {vaccines?.map((vaccine)=>(
      <Tag color="blue" className='my-1 flex justify-center'>{vaccine.name}</Tag>
    ))}
      </div>
      <div className='"max-w-[10%]"'> 
    <Button
            onClick={() => setOpenVaccine(true)}
            className={ openVaccine?`hidden`:`flex items-center justify-center rounded-lg mt-4`}
          >
            Add New Vaccine
          </Button>
          </div>
          </div>
          <Form
          // onFinishFailed={onFinishFailed}
          onFinish={onFinish}
          className={openVaccine?`block`:`hidden`}>
            <Form.Item name="visitId" hidden="true">
                <Input  name="visitId" value={visitId} />
            </Form.Item>
          <Row gutter={12}>
          
          <Form.Item
                name="vaccineId"
                className="w-full md:w-[30%] lg:w-[20%]"
              >
                <Select
                  placeholder="Select a vaccine"
                  optionFilterProp="children"
                >
                  {vaccineList.map((vaccine) => (
                    <Select.Option key={vaccine.id} value={vaccine.id}>{vaccine.name}</Select.Option>
                    ))}
                </Select>
              </Form.Item>
              
          </Row>
          <Form.Item>
                <Button type="default" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
          </Form>
    </Descriptions.Item>
    <Descriptions.Item label="Documents">
        <div className="flex flex-col">
          {visit.documents?.map((document) => (
            // <a key={document.id} rel="noopener noreferrer" href={`api/v1/documents/pets/${pet.id}/download/${document.documentLink}`} target="_blank">{document.name}</a>
            <div>
              <button key={document.id} onClick={()=>handleClick(pet.id, document.documentLink)}>
                {/*Slicing the string to fit in mobile devices when is longer than 20 characteres */}
                <Tag color="blue" className="my-1 flex justify-center">{document.name.length>15?document.name.slice(0,15):document.name}</Tag>
                </button>
            </div>
            )
          )}
        </div>
        <Upload {...propsDocs}>
            <Button className="rounded-lg mt-4" icon={<UploadOutlined />}>Select File</Button>
          </Upload>
      </Descriptions.Item>
  </Descriptions>
  </>
  )
}

export default VisitCard