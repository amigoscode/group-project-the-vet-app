import { Layout, Drawer } from "antd";
import React, { useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AppoinmentCalendar from "./Calendar/AppoinmentCalendar";
import PetList from "./Pets/PetList";
import Dashboard from "./pages/Dashboard";
import PetInformation from "./Pets/PetInformation";
import { FaDog } from "react-icons/fa";
import Owners from "./Owners/Owners";
import OwnerDetails from "./Owners/OwnerDetails";
import Logo from "./assets/logo.png";
import { Divide as Hamburger } from "hamburger-react";
import Signup from "./pages/Signup";
import { MdLogout } from "react-icons/md";
import {
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineDashboard,
} from "react-icons/ai";

const { Content, Footer, Sider } = Layout;

const AdminHome = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  console.log(window.location.pathname)
  const [selected, setSelected] = useState(window.location.pathname);

  // const handleLogout = async () => {
  //   try {
  //     await logOut();
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onClose = () => {
    setOpen(false);
  };

  const handleDrawer = () => {
    setOpen(!open);
  };

  // const handleDrawerLogoutTime = () => {
  //   handleDrawer();
  //   setTimeout(() => {
  //     handleLogout();
  //   }, 200); //used to give the drawer some time to fully close (pending revision to find a better way to logout)
  // };

  const handleOnClick = (destination) => {
    setSelected(`${destination}`)
    console.log(selected)
    navigate(`${destination}`)
  };
  return (
    <>
      <div
        // className={`${!user ? "hidden" : "flex"} w-full min-h-screen `} //hide the bar when use is not logged in
        className={`flex w-full min-h-screen `}
      >
        {/*Sidebar for computer starts */}
        <div className="fixed hidden md:block left-0 w-[0px] md:w-[75px] lg:w-[151px] bg-[#041F31] h-full">
          <div className=" h-[30px] m-2 my-4 flex justify-center items-center logo">
            <p className="hidden lg:block text-bold text-gray-300 text-2xl">
              Kaninos
            </p>
          </div>
          <div className="h-[90%] flex flex-col w-full mb-4 justify-between">
            <ul className="w-full flex flex-col text-gray-300  h-2/5 ">
              <li
                className={`flex justify-center lg:justify-start items-center py-2 pl-2  hover:text-white  cursor-default ${selected === "/" ? "bg-cyan-700 text-white" : ""
                  }`}
                onClick={() => {
                  handleOnClick("/");
                }}
              >
                <AiOutlineDashboard className="lg:px-2 w-[32px] h-[24px]" />
                <p className="hidden lg:block">Dashboard</p>
              </li>
              <li
                className={`flex justify-center lg:justify-start items-center py-2 pl-2  hover:text-white  cursor-default ${selected === "/petList" ? "bg-cyan-700 text-white" : ""
                  }`}
                onClick={() => {
                  handleOnClick("/petList");
                }}
              >
                <FaDog className="lg:px-2 w-[32px] h-[24px]" />{" "}
                <p className="hidden lg:block">Pets</p>
              </li>
              <li
                className={`flex justify-center lg:justify-start items-center py-2 pl-2  hover:text-white cursor-default ${selected === "/ownerList" ? "bg-cyan-700 text-white" : ""
                  }`}
                onClick={() => {
                  handleOnClick("/ownerList");
                }}
              >
                <AiOutlineUser className="lg:px-2 w-[32px] h-[24px]" />{" "}
                <p className="hidden lg:block">Owners</p>
              </li>
              <li
                className={`flex justify-center lg:justify-start items-center py-2 pl-2  hover:text-white  cursor-default ${selected === "/calendar" ? "bg-cyan-700 text-white" : ""}`}
                onClick={() => {
                  handleOnClick("/calendar");
                }}
              >
                <AiOutlineCalendar className="lg:px-2 w-[32px] h-[24px]" />{" "}
                <p className="hidden lg:block">Calendar</p>
              </li>
            </ul>
            <ul>
              <li
                className="flex py-2 items-center justify-center text-gray-300 lg:justify-start pl-2  hover:text-white  hover:bg-cyan-700 "
                // onClick={() => {
                //   handleLogout();
                // }}
              >
                <MdLogout className="ml-1 lg:ml-0 lg:px-2 w-[32px] h-[24px]" />{" "}
                <p className="hidden lg:block">Log Out</p>
              </li>
            </ul>
          </div>
        </div>
        {/*Sidebar for computer ends */}

        {/*Navbar for mobile */}
        <div className="md:hidden pl-4 pr-2 fixed w-full h-[80px] flex justify-between items-center bg-[#041F31] text-white z-20  ">
          <div className="">
            <img src={Logo} alt="Logo" style={{ width: "50px" }} />
          </div>

          {/* Hamburger */}
          <div
            onClick={handleDrawer}
            className="md:hidden z-20 flex items-center  text-gray-300"
          >
            {<Hamburger size={19} toggled={open} />}
          </div>
          {/* Mobile Menus*/}
          <Drawer
            placement="top"
            onClose={onClose}
            open={open}
            closable={false}
            width={250}
            zIndex={10}
            bodyStyle={{ backgroundColor: "#041F31" }}
            className="mt-[80px] z-10"
          >
            <ul className="w-full flex flex-col text-gray-300  h-2/5 ">
              <li
                className=" flex items-center text-lg py-2 "
                onClick={() => {
                  navigate("/");
                  handleDrawer();
                }}
              >
                <AiOutlineDashboard className="px-2 w-[32px]" /> Dashboard
              </li>
              <li
                className=" flex text-lg py-2 items-center "
                onClick={() => {
                  navigate("/petList");
                  handleDrawer();
                }}
              >
                <FaDog className="px-2 w-[32px] " /> Pets
              </li>
              <li
                className=" flex py-2 items-center text-lg"
                onClick={() => {
                  navigate("/ownerList");
                  handleDrawer();
                }}
              >
                <AiOutlineUser className="px-2 w-[32px] " /> Owners
              </li>
              <li
                className="flex py-2 items-center text-lg"
                onClick={() => {
                  navigate("/calendar");
                  handleDrawer();
                }}
              >
                <AiOutlineCalendar className="px-2 w-[32px]" /> Calendar
              </li>
              <li
                className="flex py-2 items-center text-lg"
                // onClick={() => {
                //   handleDrawerLogoutTime();
                // }}
              >
                <MdLogout className="px-2 w-[32px]" /> Log Out
              </li>
            </ul>
          </Drawer>
        </div>
        {/*Navbar for mobile ends*/}
        <Layout
          className={`site-layout ease-in-out duration-150 transition-all md:ml-[75px]  lg:ml-[150px]
          } `}
        >
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <div
              style={{
                margin: "32px 0",
              }}
            ></div>
            <div className="site-layout-background min-h-[360px] mt-[100px] md:mt-[0px]">
              { }
              <Routes>
                <Route
                  path="/"
                  element={
                      <Dashboard />
                  }
                />
                <Route path="/signup" element={<Signup />} />
                <Route
                  path="/petList"
                  element={
                      <PetList />
                  }
                />
                <Route
                  path="/ownerList"
                  element={
                      <Owners />
                  }
                />
                <Route
                  path="/calendar"
                  element={
                      <AppoinmentCalendar />
                  }
                />
                <Route
                  path="/pet"
                  element={
                      <PetInformation />
                  }
                />
                <Route
                  path="/owner"
                  element={
                      <OwnerDetails />
                  }
                />
              </Routes>
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Created by Simon Bruce
          </Footer>
        </Layout>
      </div>
    </>
  );
};

export default AdminHome;
