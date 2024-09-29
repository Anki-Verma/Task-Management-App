import React from "react";
import Profile from "../Profile/Profile";
import RadialChart from "../RadialChart/RadialChart";

function Sidebar() {
  return (
    <div className="w-[20rem] mt-[5rem] h-[calc(100%-5rem)] fixed right-0 top-0 bg-[#f9f9f9] flex flex-col">
      {/* Smaller Profile component */}
      <div className="flex-shrink-0 mb-2"> {/* Reduced margin for spacing */}
        <Profile />
      </div>

    {/* Radial Chart with flex-grow to use remaining space */}
    <div className="mx-12 flex-grow flex items-center justify-center">
        {/* Center the chart in the remaining space */}
        <RadialChart />
        </div>

      {/* Sign out button positioned at the bottom */}
      <button className="mt-2 mb-4 mx-6 py-2 px-4 bg-[#EB4E31] text-white rounded-[40px] hover:bg-[#3aafae] transition duration-200 ease-in-out self-center">
       Sign Out
      </button>
    </div>
  );
}

export default Sidebar;