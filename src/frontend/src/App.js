import "./App.css";
import React from "react";
import AdminHome from "./AdminHome";
import UserView from "./pages/userView/UserView";
import { Route, Routes } from "react-router-dom";

const App = () => {
  
  return (
    <>
    <Routes>
        <Route
          path="/*"//* used to let router know that inside "/" path it will find more subroutes
          element={
              <AdminHome />
          }
        >
        </Route>
        <Route
          path="/userView/*"
          element={
              <UserView />
          }
        />
        {/* <Route path="*" element={<RedirectRoute />} /> */}
      </Routes>
    </>
  );
};

export default App;
