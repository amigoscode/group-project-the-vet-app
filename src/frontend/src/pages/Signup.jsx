// import { async } from "@firebase/util";
// import React, { useState } from "react";
// import { Link, useNavigate} from "react-router-dom";
// import { UserAuth } from "../auth/AuthContext";

// const Signup = () => {

//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const {user,signUp} =UserAuth();
//   const navigate = useNavigate()

//   const handleSubmit = async (e) =>{
//     e.preventDefault()
//     try {
//       await signUp(email,password)
//       navigate('/')
//     } catch (error){
//       console.log(error)
//     }

//   }
//   return (
//     <>
//       <div className="w-full h-screem">
//         <img
//           className="hidden sm:block absolute w-full h-full object-cover"
//           src="https://assets.nflxext.com/ffe/siteui/vlv3/5ea364b1-8e59-4693-8ad8-f0eaee32d1bf/a9941766-3014-41d1-877b-095af8f45b8f/US-en-20220530-popsignuptwoweeks-perspective_alpha_website_large.jpg"
//           alt="backgroudn"
//         />
//         <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
//         <div className="fixed w-full px-4 py-24 z-50">
//           <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
//             <div className="max-w-[320px] mx-auto py-16">
//               <h1 className="text-3x font-bold">Sign Up</h1>
//               <form onSubmit={handleSubmit} className="w-full flex flex-col py-4">
//                 <input onChange={(e) => setEmail(e.target.value)}
//                   className="p-3 my-2 bg-gray-700 rounded"
//                   type="email"
//                   placeholder="Email"
//                   autoComplete="email"
//                 />
//                 <input onChange={(e) => setPassword(e.target.value)}
//                   className="p-3 my-2 bg-gray-700 rounded"
//                   type="password"
//                   placeholder="Password"
//                   autoComplete="current-password"
//                 />
//                 <button className="bg-red-600 py-3 my-6 rounded font-bold hover:scale-105">
//                   Sign Up
//                 </button>
//                 <div className="flex justify-between items-center text-sm text-gray-600">
//                   <p>
//                     <input className="mr-2" type="checkbox" />
//                     Remember Me
//                   </p>
//                   <p> Need Help?</p>
//                 </div>
//                 <p className="py-8 just">
//                   <span className="text-gray-600">
//                     Already Subscrbed to Netflix?
//                   </span>{"  "}
//                   <Link to="/login">Sign In</Link>
//                 </p>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Signup;
