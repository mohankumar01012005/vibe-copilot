import React from "react"
import { useState, useEffect } from "react"
import { Eye, Printer, Edit, Plus, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
// Sample data for each tab
const Audit = () => {
    const navigate = useNavigate();
    const [checklistsData, setChecklistsData] = useState([]);
    const [conductedData, setConductedData] = useState([]);
    const [scheduledData, setScheduledData] = useState([]);
    // State for active tab, status, filter, and search
    const [activeTab, setActiveTab] = useState("Scheduled")
    const [activeStatus, setActiveStatus] = useState("Operational")
    const [activeFilter, setActiveFilter] = useState("All")
    const [searchTerm, setSearchTerm] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const [filteredData, setFilteredData] = useState([])


    const getData = async () => {
        try {
            const response = await axios.get("http://localhost:3000/tasks");
            const data = response.data;
            setChecklistsData(data);
            setConductedData(data);
            setScheduledData(data);
            // console.log("Response ", response.data);

        } catch (error) {
            console.error("Error ", error);
        }

    }
    useEffect(() => {
        getData();
    })


    // Get the appropriate data based on the active tab
    const getTabData = () => {
        switch (activeTab) {
            case "Conducted":
                return conductedData
            case "Checklists":
                return checklistsData
            default:
                return scheduledData
        }
    }

    // Filter data based on active filter, search term, and status
    useEffect(() => {
        let data = getTabData()

        // Filter by status (if applicable)
        if (activeFilter !== "All") {
            data = data.filter((item) => item.status === activeFilter)
        }

        // Filter by search term
        if (searchTerm) {
            data = data.filter((item) => {
                return Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase()))
            })
        }

        setFilteredData(data)
        setCurrentPage(1) // Reset to first page when filters change
    }, [activeTab, activeFilter, searchTerm, activeStatus])
    // console.log("ChecklistData ",checklistsData);
    // Calculate pagination
    const totalPages = Math.ceil(filteredData.length / rowsPerPage)
    const startIndex = (currentPage - 1) * rowsPerPage
    const endIndex = startIndex + rowsPerPage
    const currentData = filteredData.slice(startIndex, endIndex)
    const pageInfo = `${startIndex + 1}-${Math.min(endIndex, filteredData.length)} of ${filteredData.length}`

    function arrays() {
        if (activeStatus === "Operational") return ["Scheduled", "Conducted", "Checklists"];
        return ["Scheduled", "Conducted"];
    }

    // Render table columns based on active tab
    const renderTableHeader = () => {
        switch (activeTab) {
            case "Scheduled":
                return (
                    <tr className="text-white text-left bg-gradient-to-r from-indigo-600 via-indigo-400 via-purple-400 via-purple-300 via-amber-400 to-amber-600">
                        <th className="py-3 px-4">ACTION</th>
                        <th className="py-3 px-4">ID</th>
                        <th className="py-3 px-4">ACTIVITY</th>
                        <th className="py-3 px-4">TASK</th>
                        <th className="py-3 px-4">ASSIGNED TO</th>
                        <th className="py-3 px-4">CREATED ON</th>
                    </tr>
                )
            case "Conducted":
                return (
                    <tr className="text-white text-left bg-gradient-to-r from-indigo-600 via-indigo-400 via-purple-400 via-purple-300 via-amber-400 to-amber-600">
                        <th className="py-3 px-4">REPORT</th>
                        <th className="py-3 px-4">ID</th>
                        <th className="py-3 px-4">AUDIT NAME</th>
                        <th className="py-3 px-4">START DATE & TIME</th>
                        <th className="py-3 px-4">CONDUCTED BY</th>
                        <th className="py-3 px-4">STATUS</th>
                        <th className="py-3 px-4">SITE</th>
                        <th className="py-3 px-4">DURATION</th>
                        <th className="py-3 px-4">%</th>
                    </tr>
                )
            case "Checklists":
                return (
                    <tr className="text-white text-left bg-gradient-to-r from-indigo-600 via-indigo-400 via-purple-400 via-purple-300 via-amber-400 to-amber-600">
                        <th className="py-3 px-4">ACTION</th>
                        <th className="py-3 px-4">ID</th>
                        <th className="py-3 px-4">ACTIVITY</th>
                    </tr>
                )
            default:
                return null
        }
    }

    // Render table rows based on active tab
    const renderTableRows = () => {
        return currentData.map((item) => {
            switch (activeTab) {
                case "Scheduled":
                    return (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                                <div className="flex space-x-2">
                                    <Eye className="h-5 w-5 text-gray-500 cursor-pointer" />
                                    {activeStatus === "Vendor" && <Edit className="h-5 w-5 text-gray-500 cursor-pointer" onClick={()=>{localStorage.setItem("id",item.id),navigate("/edit") }} />}
                                </div>
                            </td>
                            <td className="py-3 px-4">{item.id}</td>
                            <td className="py-3 px-4">{item.activity}</td>
                            <td className="py-3 px-4">{item.task}</td>
                            <td className="py-3 px-4">{item.assignTo}</td>
                            <td className="py-3 px-4">{item.createdOn}</td>
                        </tr>
                    )
                case "Conducted":
                    return (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                                <Printer className="h-5 w-5 text-gray-500 cursor-pointer" />
                            </td>
                            <td className="py-3 px-4">{item.id}</td>
                            <td className="py-3 px-4">{item.auditName}</td>
                            <td className="py-3 px-4">{item.startDate}</td>
                            <td className="py-3 px-4">{item.conductedBy}</td>
                            <td className="py-3 px-4">{item.status}</td>
                            <td className="py-3 px-4">{item.site}</td>
                            <td className="py-3 px-4">{item.duration}</td>
                            <td className="py-3 px-4">{item.percentage}</td>
                        </tr>
                    )
                case "Checklists":
                    return (
                        <tr key={item.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                                <div className="flex space-x-2">
                                    <Eye className="h-5 w-5 text-gray-500 cursor-pointer" />
                                    {activeStatus === "Vendor" && <Edit className="h-5 w-5 text-gray-500 cursor-pointer" />}
                                </div>
                            </td>
                            <td className="py-3 px-4">{item.id}</td>
                            <td className="py-3 px-4">{item.activity}</td>
                        </tr>
                    )
                default:
                    return null
            }
        })
    }

    return (
        <div className="container mx-auto p-4">
            {/* Status Toggle */}
            <div className="flex justify-center mb-6">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-l-lg ${activeStatus === "Operational" ? "bg-blue-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveStatus("Operational")}
                    >
                        Operational
                    </button>
                    <button
                        type="button"
                        className={`px-4 py-2 text-sm font-medium rounded-r-lg ${activeStatus === "Vendor" ? "bg-gray-200 text-gray-700" : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                        onClick={() => setActiveStatus("Vendor")}
                    >
                        Vendor
                    </button>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b mb-4">
                <nav className="-mb-px flex">
                    {arrays().map((tab) => (
                        <button
                            key={tab}
                            className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${activeTab === tab
                                ? "border-blue-500 text-blue-600"
                                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Filter Options and Search */}
            <div className="flex flex-col md:flex-row justify-between mb-4 space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4 border rounded-md p-2">
                    <div className="flex items-center">
                        <input
                            id="filter-all"
                            type="radio"
                            name="filter"
                            value="All"
                            checked={activeFilter === "All"}
                            onChange={() => setActiveFilter("All")}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="filter-all" className="ml-2 text-sm text-gray-700">
                            All
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="filter-open"
                            type="radio"
                            name="filter"
                            value="Open"
                            checked={activeFilter === "Open"}
                            onChange={() => setActiveFilter("Open")}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="filter-open" className="ml-2 text-sm text-gray-700">
                            Open
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="filter-closed"
                            type="radio"
                            name="filter"
                            value="Closed"
                            checked={activeFilter === "Closed"}
                            onChange={() => setActiveFilter("Closed")}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="filter-closed" className="ml-2 text-sm text-gray-700">
                            Closed
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="filter-pending"
                            type="radio"
                            name="filter"
                            value="Pending"
                            checked={activeFilter === "Pending"}
                            onChange={() => setActiveFilter("Pending")}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="filter-pending" className="ml-2 text-sm text-gray-700">
                            Pending
                        </label>
                    </div>
                    <div className="flex items-center">
                        <input
                            id="filter-completed"
                            type="radio"
                            name="filter"
                            value="Completed"
                            checked={activeFilter === "Completed"}
                            onChange={() => setActiveFilter("Completed")}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <label htmlFor="filter-completed" className="ml-2 text-sm text-gray-700">
                            Completed
                        </label>
                    </div>
                </div>

                <div className="flex space-x-2">
                    {(activeTab === "Scheduled" || activeTab === "Checklists") && (
                        <button className="flex items-center border rounded-md px-4 py-2 bg-white hover:bg-gray-50" onClick={() => { navigate("/schedule-audit") }}>
                            <Plus className="h-5 w-5 mr-1" />
                            Add
                        </button>
                    )}
                    <input
                        type="text"
                        placeholder="Search"
                        className="border rounded-md px-4 py-2 w-full md:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md px-4 py-2">Export</button>
                </div>
            </div>

            {/* Data Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                    <thead>{renderTableHeader()}</thead>
                    <tbody>{renderTableRows()}</tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                <div className="flex items-center mb-4 md:mb-0">
                    <span className="mr-2 text-sm text-gray-700">Rows per page:</span>
                    <select
                        className="border rounded-md px-2 py-1 text-sm"
                        value={rowsPerPage}
                        onChange={(e) => setRowsPerPage(Number(e.target.value))}
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>

                <div className="flex items-center">
                    <span className="mr-4 text-sm text-gray-700">{pageInfo}</span>
                    <div className="flex space-x-1">
                        <button
                            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                            onClick={() => setCurrentPage(1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronsLeft className="h-5 w-5" />
                        </button>
                        <button
                            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages || totalPages === 0}
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                        <button
                            className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
                            onClick={() => setCurrentPage(totalPages)}
                            disabled={currentPage === totalPages || totalPages === 0}
                        >
                            <ChevronsRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Audit

