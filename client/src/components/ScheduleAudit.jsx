import React from "react"
import { useState } from "react"
import {Plus, Trash2 } from "lucide-react"
import axios from "axios"
function ScheduleAudit() {
    const [createNew, setCreateNew] = useState(false)
    const [createTask, setCreateTask] = useState(false)
    const [weightage, setWeightage] = useState(false)

    // Basic Info Information 
    const [scheduleFor, setScheduleFor] = useState("Asset")
    const [activityName, setActivityName] = useState("");
    const [description, setDescription] = useState("");
    const [allowObservations, setAllowObservations] = useState(false)
    const [checklistType, setChecklistType] = useState("Individual")

    

    const [taskLevel, setTaskLevel] = useState("");
    const [assignedTo, setAssignedTo] = useState("");
    const [category, setCategory] = useState("");


    // Schedule Section 

    const [schedulechecklistType, setScheduleChecklistType] = useState("");
    const [assignTo, setAssignTo] = useState("");
    const [scanType, setScanType] = useState("");
    const [planDuration, setPlanDuration] = useState("");
    const [priority, setPriority] = useState("");
    const [emailTriggerRule, setEmailTriggerRule] = useState("");
    const [supervisors, setSupervisors] = useState("");
    const [schedulecategory, setScheduleCategory] = useState("");
    const [lockOverdueTask, setLockOverdueTask] = useState("");
    const [frequency, setFrequency] = useState("");
    const [startFrom, setStartFrom] = useState("");
    const [endAt, setEndAt] = useState("");
    const [supplier, setSupplier] = useState("");


    // Post Request To Send the Data to the Database

    


    const handleSubmit = async(e) => {
        e.preventDefault(); // Prevent page reload

        const formData = {
            activity: activityName,
            assignTo : assignTo,
            duration : planDuration,
            startTime:  startFrom,
            endTime: endAt,
            conductedBy : assignTo,
            task : taskSections.task,
        };
        try {
            
            const response = await axios.post("http://localhost:3000/tasks",formData)
            console.log(response.data);
            alert("Data Successfully Submitted");
            console.log("Schedule Form Data:", formData);
        } catch (error) {
            alert("Error");
            console.log("Error ",error);
        }
    };

    // State to manage task sections
    const [taskSections, setTaskSections] = useState([])

    // Function to add a new task section
    const addTaskSection = () => {
        const newSection = {
            id: taskSections.length + 1,
            group: "",
            subGroup: "",
            task: "",
            inputType: "",
            mandatory: false,
            reading: false,
            helpText: false,
        }
        setTaskSections([...taskSections, newSection])
    }

    // Function to delete a task section
    const deleteTaskSection = (id) => {
        if (taskSections.length) {
            setTaskSections(taskSections.filter((section) => section.id !== id))
        }
    }
    console.log(category);

    // Function to update a task section field
    const updateTaskSection = (id, field, value) => {
        setTaskSections(taskSections.map((section) => (section.id === id ? { ...section, [field]: value } : section)))
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header with gradient */}
            <div className="w-100 h-12 rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-400 to-amber-500 flex items-center justify-center">
                <h1 className="text-white text-2xl font-semibold">Schedule Audit</h1>
            </div>

            {/* Main content */}
            <div className="flex-1 p-4">
                <div className="max-w-6xl mx-auto bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    {/* Toggle switches */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                            <label className="font-medium">Create New:</label>
                            <div className="mt-1">
                                <button
                                    type="button"
                                    onClick={() => setCreateNew(!createNew)}
                                    className={`relative inline-flex h-4 w-10 items-center rounded-full ${createNew ? "bg-gray-400" : "bg-gray-200"
                                        }`}
                                >
                                    <span
                                        className={`${createNew ? "translate-x-6" : "translate-x-1"
                                            } inline-block h-3 w-3 transform rounded-full bg-white transition`}
                                    />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="font-medium">Create Task:</label>
                            <div className="mt-1">
                                <button
                                    type="button"
                                    onClick={() => setCreateTask(!createTask)}
                                    className={`relative inline-flex h-4 w-10 items-center rounded-full ${createTask ? "bg-gray-400" : "bg-gray-200"
                                        }`}
                                >
                                    <span
                                        className={`${createTask ? "translate-x-6" : "translate-x-1"
                                            } inline-block h-3 w-3 transform rounded-full bg-white transition`}
                                    />
                                </button>
                            </div>
                        </div>
                        <div>
                            <label className="font-medium">Weightage:</label>
                            <div className="mt-1">
                                <button
                                    type="button"
                                    onClick={() => setWeightage(!weightage)}
                                    className={`relative inline-flex h-4 w-10 items-center rounded-full ${weightage ? "bg-gray-400" : "bg-gray-200"
                                        }`}
                                >
                                    <span
                                        className={`${weightage ? "translate-x-6" : "translate-x-1"
                                            } inline-block h-3 w-3 transform rounded-full bg-white transition`}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Create Task True */} 

                    {createTask && <div className="flex items-center flex-col space-y-2 h-fit w-full">

                        {/* Radio Buttons */}
                        <div className="flex flex-col space-y-1">
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="level" className="form-radio"
                                    onChange={(e) => setTaskLevel("Checklist Level")} />
                                <span>Checklist Level</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input type="radio" name="level" className="form-radio"
                                    onChange={(e) => setTaskLevel("Question Level")} />
                                <span>Question Level</span>
                            </label>
                        </div>

                        {/* Dropdowns */}
                        <select className="border border-gray-300 rounded-md p-2 w-56">
                            <option onChange={(e) => { setAssignedTo(e.target.value) }}>select assigned to</option>
                        </select>
                        <select className="border border-gray-300 rounded-md p-2 w-56">
                            <option onChange={(e) => { setCategory(e.target.value) }}>select category</option>
                        </select>
                    </div>}

                    {/* Basic Info Section */} 


                    {!createNew && <div className="mb-6">
                        <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">Basic Info</h2>

                        <div className="mb-4">
                            <label className="block font-medium mb-2">Schedule For :</label>
                            <div className="flex flex-wrap gap-2">
                                {["Asset", "Services", "Vendor", "Training", "Compliance"].map((option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        onClick={() => setScheduleFor(option)}
                                        className={`px-4 py-2 rounded-full border ${scheduleFor === option ? "bg-black text-white" : "bg-white text-black border-gray-300"
                                            }`}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="activityName" className="block font-medium mb-2">
                                Activity Name
                            </label>
                            <input
                                id="activityName"
                                type="text"
                                placeholder="Enter Activity Name"
                                onChange={(e) => { setActivityName(e.target.value) }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="description" className="block font-medium mb-2">
                                Description
                            </label>
                            <textarea
                                id="description"
                                placeholder="Enter Description"
                                rows={4}
                                onChange={(e) => { setDescription(e.target.value) }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-center mb-4">
                            <label htmlFor="allowObservations" className="font-medium mr-2">
                                Allow Observations
                            </label>
                            <input
                                id="allowObservations"
                                type="checkbox"
                                checked={allowObservations}
                                onChange={() => setAllowObservations(!allowObservations)}
                                className="h-4 w-4 border-gray-300 rounded"
                            />
                        </div>
                    </div>}


                    {/* Task Section */} 


                    <div className="mb-6">
                        <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">Task</h2>

                        {/* Render task sections dynamically */}
                        {taskSections.map((section) => (
                            <div key={section.id} className="mb-6 border border-gray-200 rounded-lg p-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block font-medium mb-2">Group:</label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                                            value={section.group}
                                            onChange={(e) => updateTaskSection(section.id, "group", e.target.value)}
                                        >
                                            <option value="">Select Group</option>
                                            <option value="group1">Asset</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-2">SubGroup:</label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                                            value={section.subGroup}
                                            onChange={(e) => updateTaskSection(section.id, "subGroup", e.target.value)}
                                        >
                                            <option value="">Select SubGroup</option>
                                            <option value="subgroup1">Sub Asset</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block font-medium mb-2">Task:</label>
                                        <input
                                            type="text"
                                            placeholder="Enter Task"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={section.task}
                                            onChange={(e) => updateTaskSection(section.id, "task", e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-medium mb-2">Input Type:</label>
                                        <select
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
                                            value={section.inputType}
                                            onChange={(e) => updateTaskSection(section.id, "inputType", e.target.value)}
                                        >
                                            <option value="">Select Input Type</option>
                                            <option value="text">Text</option>
                                            <option value="date">Date</option>
                                            <option value="date">Drop Down</option>
                                            <option value="date">Radio Button</option>
                                            <option value="date">Numeric</option>
                                            <option value="date">Multiline</option>
                                            <option value="date">Options & Inputs</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mb-2">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={section.mandatory}
                                            onChange={(e) => updateTaskSection(section.id, "mandatory", e.target.checked)}
                                            className="h-4 w-4 border-gray-300 rounded mr-2"
                                        />
                                        <span>Mandatory</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={section.reading}
                                            onChange={(e) => updateTaskSection(section.id, "reading", e.target.checked)}
                                            className="h-4 w-4 border-gray-300 rounded mr-2"
                                        />
                                        <span>Reading</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={section.helpText}
                                            onChange={(e) => updateTaskSection(section.id, "helpText", e.target.checked)}
                                            className="h-4 w-4 border-gray-300 rounded mr-2"
                                        />
                                        <span>Help Text</span>
                                    </label>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => deleteTaskSection(section.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button
                            type="button"
                            onClick={addTaskSection}
                            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                        >
                            <Plus size={18} />
                            Add Section
                        </button>
                    </div>

                    {/* Schedule Section */} 

                    <div className="mb-6">
                        <h2 className="text-lg font-bold border-b border-gray-300 pb-2 mb-4">Schedule</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">

                                {/* Checklist Type */}
                                <div>
                                    <label className="block font-medium mb-2">Checklist Type:</label>
                                    <div className="flex items-center space-x-4 border border-gray-300 rounded-lg p-3">
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="checklistType"
                                                value="Individual"
                                                checked={schedulechecklistType === "Individual"}
                                                onChange={() => setScheduleChecklistType("Individual")}
                                                className="h-4 w-4 text-blue-600"
                                            />
                                            <span className="ml-2">Individual</span>
                                        </label>
                                        <label className="inline-flex items-center">
                                            <input
                                                type="radio"
                                                name="checklistType"
                                                value="Asset Group"
                                                checked={schedulechecklistType === "Asset Group"}
                                                onChange={() => setScheduleChecklistType("Asset Group")}
                                                className="h-4 w-4 text-blue-600"
                                            />
                                            <span className="ml-2">Asset Group</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Assign To */}
                                <div>
                                    <label className="block font-medium mb-2">Assign To:</label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        value={assignTo}
                                        onChange={(e) => setAssignTo(e.target.value)}
                                    >
                                        <option value="">Select Assignee</option>
                                        <option value="Ankit Parkar">Ankit Parkar</option>
                                        <option value="Vishal Yadav">Vishal Yadav</option>
                                        <option value="Ravindar Sahani">Ravindar Sahani</option>
                                    </select>
                                </div>

                                {/* Scan Type */}
                                <div>
                                    <label className="block font-medium mb-2">Scan Type:</label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        value={scanType}
                                        onChange={(e) => setScanType(e.target.value)}
                                    >
                                        <option value="">Select Scan Type</option>
                                        <option value="QR">QR</option>
                                        <option value="NFC">NFC</option>
                                    </select>
                                </div>

                                {/* Plan Duration */}
                                <div>
                                    <label className="block font-medium mb-2">Plan Duration:</label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        value={planDuration}
                                        onChange={(e) => setPlanDuration(e.target.value)}
                                    >
                                        <option value="">Select Plan Duration</option>
                                        <option value="Minutes">Minutes</option>
                                        <option value="Day">Day</option>
                                        <option value="Hour">Hour</option>
                                        <option value="Week">Week</option>
                                    </select>
                                </div>

                                {/* Priority */}
                                <div>
                                    <label className="block font-medium mb-2">Priority:</label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                    >
                                        <option value="">Select Priority</option>
                                        <option value="High">High</option>
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                    </select>
                                </div>

                                {/* Email Trigger Rule */}
                                <div>
                                    <label className="block font-medium mb-2">Email Trigger Rule:</label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        value={emailTriggerRule}
                                        onChange={(e) => setEmailTriggerRule(e.target.value)}
                                    >
                                        <option value="">Select Email Trigger Rule</option>
                                        <option value="Reminder Mail for 1 day">Reminder Mail for 1 day (Supplier)</option>
                                        <option value="Reminder Mail for 30 days">Reminder Mail for 30 days (Supplier)</option>
                                    </select>
                                </div>


                                <div>
                                    <label className="block font-medium mb-2">Supervisors:</label>
                                    <select value={supervisors} onChange={(e) => setSupervisors(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                        <option value="">Select Supervisors</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-medium mb-2">Category:</label>
                                    <select value={schedulecategory} onChange={(e) => setScheduleCategory(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                        <option value="">Select Category</option>
                                        <option value="Technical">Technical</option>
                                        <option value="Non-Technical">Non-Technical</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-medium mb-2">Lock Overdue Task:</label>
                                    <select value={lockOverdueTask} onChange={(e) => setLockOverdueTask(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                        <option value="">Select Lock Overdue Task</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block font-medium mb-2">Frequency:</label>
                                    <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                                        <option value="">Select Frequency</option>
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">Quarterly</option>
                                        <option value="Half-Yearly">Half Yearly</option>
                                        <option value="Yearly">Yearly</option>
                                    </select>
                                </div>



                                {/* Start From */}
                                <div>
                                    <label className="block font-medium mb-2">Start From:</label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        value={startFrom}
                                        onChange={(e) => setStartFrom(e.target.value)}
                                    />
                                </div>

                                {/* End At */}
                                <div>
                                    <label className="block font-medium mb-2">End At:</label>
                                    <input
                                        type="date"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        value={endAt}
                                        onChange={(e) => setEndAt(e.target.value)}
                                    />
                                </div>

                                {/* Select Supplier */}
                                <div>
                                    <label className="block font-medium mb-2">Select Supplier:</label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                        value={supplier}
                                        onChange={(e) => setSupplier(e.target.value)}
                                    >
                                        <option value="">Select Supplier</option>
                                        <option value="Supplier1">Supplier 1</option>
                                        <option value="Supplier2">Supplier 2</option>
                                    </select>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center mt-8">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="w-full bg-gradient-to-r from-indigo-600 via-purple-430 to-amber-500 text-white p-3 text-center text-sm">
                Copyright © 2023 Digielves Tech Wizards Private Limited. All rights reserved
            </div>
        </div>
    )
}

export default ScheduleAudit;

