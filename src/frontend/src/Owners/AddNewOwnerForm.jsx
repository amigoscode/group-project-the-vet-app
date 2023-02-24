// StudentDrawerForm.js

import { Drawer, Input, Col, Form, Row, Button, Spin } from "antd";
import { addNewEntry } from "../client";
import { LoadingOutlined } from "@ant-design/icons";
import { useState } from "react";
import {
  successNotification,
  errorNotification
} from "../Notification";
import { isMobile } from 'react-device-detect';


const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function AddNewOwnerForm({ showDrawer, setShowDrawer, fetchOwners }) {
  const onCLose = () => setShowDrawer(false);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm(); //used to reset the form values after submitting

  const onFinish = (owner) => {
    setSubmitting(true);
    console.log(JSON.stringify(owner, null, 2));
    addNewEntry("owners", owner)
      .then(() => {
        onCLose();
        successNotification(
          "Owner successfully added",
          `${owner.name} was added to the system`
        )
        fetchOwners();
      }).catch((err) => {
        console.log(JSON.stringify(owner, null, 2));
        console.log("error agregando owner");
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
        setSubmitting(false);
        // window.location.reload(false); used to refresh the page
        form.resetFields();//used to reset the form values after submitting
      });
  };

  const onFinishFailed = (errorInfo) => {
    alert(JSON.stringify(errorInfo, null, 2));
    errorNotification(
      "There was and issue",
      'Please fill all the required fields',
      "bottomLeft"
    );
  };

  return (
    <Drawer
      className=""
      title="Add new owner"
      width={isMobile ? 300 : 720}
      onClose={onCLose}
      open={showDrawer}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button onClick={onCLose} style={{ marginRight: 8 }}>
            Cancel
          </Button>
        </div>
      }
    >
      <Form
        layout="vertical"
        onFinishFailed={onFinishFailed}
        onFinish={onFinish}
        form={form} //used to reset the form values after submitting
        hideRequiredMark
      >{
          isMobile ? (<>
            <Row>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter student name" }]}
                className="w-full"
              >
                <Input placeholder="Please enter pet name" />
              </Form.Item>
              <Form.Item
                name="address"
                label="Address"
                rules={[{ required: true, message: "Please enter Address name" }]}
                className="w-full"
              >
                <Input placeholder="Please enter owners address" />
              </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    className="w-full"
                    rules={[{ required: true, message: "Please enter owners email" }]}
                  >
                    <Input placeholder="Please enter owners email" />
                  </Form.Item>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: "Please enter owners phone" }]}
                className="w-full"
              >
                <Input placeholder="Please enter owners phone" />
              </Form.Item>
              <Form.Item
                name="notes"
                label="Notes"
                rules={[{ message: "Please enter notes" }]}
                className="w-full"
              >
                <Input.TextArea placeholder="Please enter notes" />
              </Form.Item>
              <Row>
                <Col span={12}>
                  <Form.Item>
                    <Button type="default" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              <Row>{submitting && <Spin indicator={antIcon} />}</Row></Row></>
          ) : (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[{ required: true, message: "Please enter student name" }]}
                  >
                    <Input placeholder="Please enter pet name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="address"
                    label="Address"
                    rules={[{ required: true, message: "Please enter Address name" }]}
                  >
                    <Input placeholder="Please enter owners address" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: "Please enter owners email" }]}
                  >
                    <Input placeholder="Please enter owners email" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[{ required: true, message: "Please enter owners phone" }]}
                  >
                    <Input placeholder="Please enter owners phone" />
                  </Form.Item>
                </Col>
              </Row>
              <Col span={24}>
                <Form.Item
                  name="notes"
                  label="Notes"
                  rules={[{ message: "Please enter notes" }]}
                >
                  <Input.TextArea placeholder="Please enter notes" />
                </Form.Item>
              </Col>
              <Row>
                <Col span={12}>
                  <Form.Item>
                    <Button type="default" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              <Row>{submitting && <Spin indicator={antIcon} />}</Row>
            </>)
        }
      </Form>
    </Drawer>
  );
}

export default AddNewOwnerForm;
