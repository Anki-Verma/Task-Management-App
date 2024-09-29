"use client";
import { useUserContext } from "@/context/userContext";
import Image from "next/image";
import React from "react";

function Profile() {
    const { user } = useUserContext();

    return (
        <div className="p-2">
            <div className="flex items-center gap-2 bg-[#E6E6E6]/20 rounded-md
            hover:bg-[#E6E6E6]/50 transition duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:border-white">
                <div>
                    <Image
                        src={user?.photo}
                        alt="avatar"
                        width={40} // Smaller avatar
                        height={40}
                        className="rounded-full"
                    />
                </div>
                <div>
                    <h1 className="text-sm"> {/* Smaller font sizes */}
                        <span className="font-medium">Hello,</span>
                        <span className="font-bold block">{user?.name}</span>
                    </h1>
                </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                    { label: "Total Tasks", value: 10, color: "purple-500" },
                    { label: "In Progress", value: 11, color: "teal-500" },
                    { label: "Open Tasks", value: 13, color: "orange-400" },
                    { label: "Completed", value: 14, color: "green-400" },
                ].map((task, index) => (
                    <div key={index} className="text-gray-400">
                        <p className="text-xs">{task.label}</p> {/* Smaller labels */}
                        <p className="pl-2 relative flex gap-2">
                            <span className={`absolute h-[50%] w-[0.2rem] left-[1px] top-1/2 translate-y-[-50%] bg-${task.color} rounded-[5px]`}></span>
                            <span className="font-medium text-xl text-[#333]"> {/* Smaller font */}
                                {task.value}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile;
