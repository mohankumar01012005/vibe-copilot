import React from "react";
import { useState } from "react";
import axios from "axios";
export default function Edit() {
    const [assignTo,setAssignTo]=useState("");
    const [status,setStatus]=useState("");
    const id = localStorage.getItem("id");


    const updateTask = async ( assignTo, status) => {
        try {
            const response = await axios.put(`http://localhost:3000/edit/${id}`, {
                assignTo,
                status
            });
    
            console.log("Updated Task:", response.data);
            alert("Done");
            return response.data;
        } catch (error) {
            alert("Error");
            console.error("Error updating task:", error.response?.data || error.message);
        }
    };


    return (
        <div className="w-full mx-auto p-4">
            <div className="relative h-12 w-full bg-gradient-to-r from-blue-500 to-yellow-500 p-2 text-center rounded-full flex items-center justify-center font-semibold rounded">
                <div className="flex items-center text-white">
                    <h1>Vendor Ticket</h1>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mt-10 text-gray-800">
                <div className="space-y-4">
                    <div>
                        <label className="block font-semibold">Site Owner:</label>
                        <input type="text" className="w-full border rounded px-3 py-1.5" />
                    </div>
                    <div>
                        <label className="block font-semibold">Building Name:</label>
                        <input type="text" className="w-full border rounded px-3 py-1.5" />
                    </div>
                    <div>
                        <label className="block font-semibold">Related To:</label>
                        <input type="text" className="w-full border rounded px-3 py-1.5" />
                    </div>
                    <div>
                        <label className="block font-semibold">Priority:</label>
                        <select className="w-full border rounded px-3 py-1.5">
                            <option>Select Priority</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold">Categories:</label>
                        <select className="w-full border rounded px-3 py-1.5">
                            <option>Select Category</option>
                        </select>
                    </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                    <div>
                        <label className="block font-semibold">Ticket No.:</label>
                        <input type="text" className="w-full border rounded px-3 py-1.5" />
                    </div>
                    <div>
                        <label className="block font-semibold">Floor Name:</label>
                        <input type="text" className="w-full border rounded px-3 py-1.5" />
                    </div>
                    <div>
                        <label className="block font-semibold">Status:</label>
                        <select className="w-full border rounded px-3 py-1.5" onChange={(e)=>{setStatus(e.target.value)}}>
                            <option>Select Status</option>
                            <option>Complete</option>
                            <option>On Hold</option>
                            <option>Development Done</option>
                            <option>Additional Info Needed</option>
                            <option>Reopen</option>
                            <option>Closed</option>
                            <option>Pending</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold">Assigned To:</label>
                        <select className="w-full border rounded px-3 py-1.5" onChange={(e)=>{setAssignTo(e.target.value)}}>
                            <option>Select Assign To</option>
                            <option>Company Admin</option>
                            <option>Anurag Sharma</option>
                            <option>Akshar Sharwat</option>
                            <option>Test User 2 Testing</option>
                            <option>Mittu Panda</option>
                            <option>Pankti seth</option>
                            <option>Minal Suryavashi</option>
                            <option>developer one</option>
                            <option>admin connect</option>
                            <option>HRMS Admin</option>
                            <option>Hemanth Singh</option>
                            <option>Vibe User</option>
                            <option>Admin Connect</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold">Sub Categories:</label>
                        <select className="w-full border rounded px-3 py-1.5">
                            <option>Sub Category</option>
                        </select>
                    </div>
                </div>

                {/* Column 3 */}
                <div className="space-y-4">
                    <div>
                        <label className="block font-semibold">Site:</label>
                        <input type="text" className="w-full border rounded px-3 py-1.5" />
                    </div>
                    <div>
                        <label className="block font-semibold">Unit:</label>
                        <input type="text" className="w-full border rounded px-3 py-1.5" />
                    </div>
                    <div>
                        <label className="block font-semibold">Issue Type:</label>
                        <select className="w-full border rounded px-3 py-1.5">
                            <option>Request</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold">Approval Authority:</label>
                        <select className="w-full border rounded px-3 py-1.5">
                            <option>Select Approval</option>
                        </select>
                    </div>
                    <div>
                        <label className="block font-semibold">Proactive/Reactive:</label>
                        <select className="w-full border rounded px-3 py-1.5">
                            <option>Reactive</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
                <div className="absolute top-5 bg-white px-4 py-2 rounded shadow-lg text-black">
                    </div>
                <form
                    className="w-full p-6 rounded-lg shadow-lg space-y-4"
                >
                    {[
                        "Description",
                        "Root Cause",
                        "Impact",
                        "Corrective Action",
                        "Correction",
                        "Comment",
                    ].map((label, index) => (
                        <div key={index}>
                            <label className="block text-gray-700 font-semibold mb-1">
                                {label}:
                            </label>
                            <textarea
                                className="w-full p-2 border rounded focus:ring focus:ring-blue-300"
                                rows="3"
                            ></textarea>
                        </div>
                    ))}

                    <div className="flex items-center space-x-4">
                        <input type="file" className="border p-2 rounded" />
                    </div>

                    <div className="text-center mt-4">
                        <button
                            type="button"
                            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                            onClick={()=>{updateTask(assignTo,status)}}
                        >
                            Save
                        </button>
                    </div>
                </form>
                <footer className="mt-6 text-sm text-white">
                    Copyright © 2023 Digielves Tech Wizards Private Limited. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
