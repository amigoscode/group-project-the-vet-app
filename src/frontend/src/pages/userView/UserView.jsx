// import React, { useEffect, useState } from 'react'
// import { getOwnerByEmail } from "../../client";
// import OwnerDetailsUserView from './OwnerDetailsUserView';
// import { Route, Routes, useNavigate } from "react-router-dom";
// import { Layout, Drawer } from "antd";
// import { FaDog } from "react-icons/fa";
// import Logo from "../../assets/logo.png";
// import { Divide as Hamburger } from "hamburger-react";
// import { MdLogout } from "react-icons/md";
// import { AiOutlineUser, AiOutlineDashboard } from "react-icons/ai";
// import PetInformationUserView from './PetInformationUserView';
// import PetList from './PetListUserView';

// const { Content, Footer } = Layout;

// const UserView = () => {
//     const [owner, setOwner] = useState([])
//     const [open, setOpen] = useState(false);
//     const [current, setCurrent] = useState("0");
//     const [displayContent, setDisplayContent] = useState("0")

//     const navigate = useNavigate();


//     // const handleLogout = async () => {
//     //     try {
//     //         await logOut();
//     //         navigate("/");
//     //     } catch (error) {
//     //         console.log(error);
//     //     }
//     // };

//     console.log(user)


//     const getOwner = () => {
//         getOwnerByEmail(user.email)
//             .then(res => res.json())
//             .then(data => {
//                 setOwner(data);
//             })
//     }

//     useEffect(() => {
//         getOwner();
//     }, [user]);




//     const onClose = () => {
//         setOpen(false);
//     };

//     const handleDrawer = () => {
//         setOpen(!open);
//     };

//     const handleDrawerLogoutTime = () => {
//         handleDrawer();
//         setTimeout(() => {
//             handleLogout();
//         }, 200); //used to give the drawer some time to fully close (pending revision to find a better way to logout)
//     };



//     // const PageDisplay = () => {
//     //     if (displayContent === "1") {
//     //         return <OwnerPetListUserView owner={owner} />;
//     //     } else if (displayContent === "0") {
//     //         return <OwnerDetailsUserView owner={owner} />
//     //     } else {
//     //         return <VisitsDetails pet={owner} />;
//     //     }
//     // };

//     /*Set page number after clicking one of the menu items to render the corresponding component */
//     const onClick = (e) => {
//         setCurrent(e.key);
//         setDisplayContent(e.key);
//     };


//     if (owner.name !== "") {
//         return (
//             <>
//                 <div
//                     className={`${!user ? "hidden" : "flex"} w-full min-h-screen `} //hide the bar when use is not logged in
//                 >
//                     {/*Sidebar for computer starts */}
//                     <div className="fixed hidden md:block left-0 w-[0px] md:w-[75px] lg:w-[151px] bg-[#041F31] h-full">
//                         <div className=" h-[30px] m-2 my-4 flex justify-center items-center logo">
//                             <p className="hidden lg:block text-bold text-gray-300 text-2xl">
//                                 Kaninos
//                             </p>
//                         </div>
//                         <div className="h-[90%] flex flex-col w-full mb-4 justify-between">
//                             <ul className="w-full flex flex-col text-gray-300  h-2/5 ">
//                                 <li
//                                     className=" flex py-2 items-center justify-center lg:justify-start pl-2  hover:text-white"
//                                     onClick={() => {
//                                         navigate("/userView/pets");
//                                     }}
//                                 >
//                                     <FaDog className="lg:px-2 w-[32px] h-[24px]" />{" "}
//                                     <p className="hidden lg:block">Pets</p>
//                                 </li>
//                                 <li
//                                     className=" flex py-2 items-center justify-center lg:justify-start pl-2  hover:text-white"
//                                     onClick={() => {
//                                         navigate("/userView");
//                                     }}
//                                 >
//                                     <AiOutlineUser className="lg:px-2 w-[32px] h-[24px]" />{" "}
//                                     <p className="hidden lg:block">Owners</p>
//                                 </li>
//                             </ul>
//                             <ul>
//                                 <li
//                                     className="flex py-2 items-center justify-center text-gray-300 lg:justify-start pl-2  hover:text-black "
//                                     onClick={() => {
//                                         handleLogout();
//                                     }}
//                                 >
//                                     <MdLogout className="ml-1 lg:ml-0 lg:px-2 w-[32px] h-[24px]" />{" "}
//                                     <p className="hidden lg:block">Log Out</p>
//                                 </li>
//                             </ul>
//                         </div>
//                     </div>
//                     {/*Sidebar for computer ends */}

//                     {/*Navbar for mobile */}
//                     <div className="md:hidden pl-4 pr-2 fixed w-full h-[80px] flex justify-between items-center bg-[#041F31] text-white z-20  ">
//                         <div className="">
//                             <img src={Logo} alt="Logo" style={{ width: "50px" }} />
//                         </div>

//                         {/* Hamburger */}
//                         <div
//                             onClick={handleDrawer}
//                             className="md:hidden z-20 flex items-center  text-gray-300"
//                         >
//                             {<Hamburger size={19} toggled={open} />}
//                         </div>
//                         {/* Mobile Menus*/}
//                         <Drawer
//                             placement="top"
//                             onClose={onClose}
//                             open={open}
//                             closable={false}
//                             width={250}
//                             zIndex={10}
//                             bodyStyle={{ backgroundColor: "#041F31" }}
//                             className="mt-[80px] z-10"
//                         >
//                             <ul className="w-full flex flex-col text-gray-300  h-2/5 ">
//                                 <li
//                                     className=" flex text-lg py-2 items-center "
//                                     onClick={() => {
//                                         navigate("/userView/pets");
//                                         handleDrawer();
//                                     }}
//                                 >
//                                     <FaDog className="px-2 w-[32px] " /> Pets
//                                 </li>
//                                 <li
//                                     className=" flex py-2 items-center text-lg"
//                                     onClick={() => {
//                                         navigate("/userView");
//                                         handleDrawer();
//                                     }}
//                                 >
//                                     < AiOutlineUser className="px-2 w-[32px] " /> Owners
//                                 </li>
//                                 <li
//                                     className="flex py-2 items-center text-lg"
//                                     onClick={() => {
//                                         handleDrawerLogoutTime();
//                                     }}
//                                 >
//                                     <MdLogout className="px-2 w-[32px]" /> Log Out
//                                 </li>
//                             </ul>
//                         </Drawer>
//                     </div>
//                     {/*Navbar for mobile ends*/}
//                     <Layout
//                         className={`site-layout ease-in-out duration-150 transition-all md:ml-[75px]  lg:ml-[150px]
//                 } `}
//                     >
//                         <Content
//                             style={{
//                                 margin: "0 16px",
//                             }}
//                         >
//                             <div
//                                 style={{
//                                     margin: "32px 0",
//                                 }}
//                             ></div>
//                             <div className="site-layout-background min-h-[360px] mt-[100px] md:mt-[0px]">
//                                 { }
//                                 <Routes>
//                                     {/* <Route
//                         path="/petList"
//                         element={
//                           <Protectedroute>
//                             <PetList />
//                           </Protectedroute>
//                         }
//                       /> */}
//                                     <Route
//                                         path="/"
//                                         element={
//                                                 <OwnerDetailsUserView owner={owner} />
//                                         }
//                                     />
//                                     <Route
//                                         path="/pets"
//                                         element={
//                                                 <PetList pets={owner.pets} />
//                                         }
//                                     />
//                                     <Route
//                                         path="/pet"
//                                         element={
//                                                 <PetInformationUserView />
//                                         }
//                                     />
//                                 </Routes>
//                             </div>
//                         </Content>
//                         <Footer
//                             style={{
//                                 textAlign: "center",
//                             }}
//                         >
//                             Created by Simon Bruce
//                         </Footer>
//                     </Layout>
//                 </div>
//             </>
//         )
//     }


// }

// export default UserView