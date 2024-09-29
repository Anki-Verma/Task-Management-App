"use client";
import Sidebar from "../app/Components/auth/Sidebar/SideBar"; // Ensure casing is consistent

import { useUserContext } from "@/context/userContext";
import React from "react";

function SidebarProvider() {
  const userId = useUserContext().user._id;
  return <>{userId && <Sidebar />}</>;
}

export default SidebarProvider;


