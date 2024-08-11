import { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import axios from "axios";






const DashboardStaffsApprovedPage = ({ activeDisplay }) => {
    

    // ****************************************************************************
    // MANAGE STATE:-  TO FIND ALL USERS
    // ****************************************************************************
    const [approvedStaffs, setApprovedStaffs] = useState([]);
    console.log("APPROVED STAFFS: ", approvedStaffs);
    
    // const [totalApprovedAdminUsers, setTotalApprovedAdminUsers] = useState(null);
    // console.log("APPROVED STAFFS or TOTAL APPROVED STAFFS: ", totalApprovedAdminUsers);
    const [totalPages, setTotalPages] = useState(0);
    
    const [currentPage, setCurrentPage] = useState(1);    
    const limit = 10; // Number of items per page

    

    useEffect(() => {
        var allApprovedStaffsLink = document.querySelector("#staffsLinkID .allApprovedStaffs");
        console.log("All Approved Staffs Link: ", allApprovedStaffsLink);

        if (activeDisplay === "allApprovedStaffs") {
            allApprovedStaffsLink?.classList.add("activeStaffView");
        } else {
            allApprovedStaffsLink?.classList.remove("activeStaffView");
        }
    }, [activeDisplay]);



    useEffect(() => {
        if (activeDisplay === "allApprovedStaffs") {
            // ****************************************************************************
            // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL "APPROVED" STAFFS
            // ****************************************************************************             
            async function fetchApprovedStaffs() {        
                const approvedStatus = "approved";
                await axios.get(`http://127.0.0.1:8000/api/v1/auth/account/admins?page=${currentPage}&limit=${limit}&status=${approvedStatus}`)
                .then((response) => {
                    const { success, data, message } = response.data;
                    const { staffsList, pagination } = data;

                    if (!success && message === "No admin found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    };

                    setApprovedStaffs(staffsList);
                    
                    // setTotalApprovedAdminUsers(pagination?.staffsRecord);
                    setTotalPages(pagination?.lastPage);
                })
                .catch((error) => {
                    console.log("Error fetching data: ", error);
                });
            };

            var timerID = setTimeout(fetchApprovedStaffs, 300);   // Delay execution of findAllApprovedUsers by 1800ms
            return () => {
                clearTimeout(timerID);                  // Clean up timer if component unmounts or token changes
            };
        }
    }, [activeDisplay, currentPage]); // Fetch data when currentPage changes
    // ****************************************************************************
    // ****************************************************************************
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // ****************************************************************************
    // ****************************************************************************


    
    return (
        <>
            <div className={`capitalize border ${activeDisplay === "allApprovedStaffs" ? "grid" : "hidden"}`}>
                <table className="table-fixed capitalize w-full border staff__table">
                    <thead>
                        <tr>
                            <th className="w-20 h-16 flex justify-center items-center">S/N</th>
                            <th>NAME</th>
                            <th>E-MAIL ADDRESS</th>
                            <th className="text-center">STATUS</th>
                            <th className="text-center">ACTION</th>
                        </tr>
                    </thead>
                    {
                        approvedStaffs?.length !== 0 ?
                            <tbody>
                                {
                                    approvedStaffs?.map((user, userIndex) => {
                                        if (user?.status === "pending") {
                                            return (
                                                user?.roles?.map((roleUsers) => {
                                                    if ((roleUsers?.role === "ROLE_ADMIN") || (roleUsers?.role === "ROLE_EDITOR") || (roleUsers?.role === "ROLE_STAFF")) {
                                                        return (
                                                            <tr key={userIndex} className="">
                                                                <td className="w-8 text-center font-black text-42xl font-firma tracking-supertight">{userIndex+1}</td>
                                                                <td className="w-40 text-center">{user?.firstName} {user?.lastName}</td>
                                                                <td className="w-60 text-center lowercase">{user?.email}</td>
                                                                <td className="w-40 text-center text-white font-medium text-xl rounded-full h-2 py-2 px-8 bg-green-500">{user?.status}</td>
                                                                <td className="w-40 flex justify-center">
                                                                    <Link className="bg-skin-darkblue text-white py-6 px-20" to={`/admin/staffs/${user?._id}`} alt="view staff details">view details</Link>
                                                                </td>
                                                            </tr>
                                                        );
                                                    } else {
                                                        return (
                                                            <tr>
                                                                <td>no record of pending staff</td>
                                                            </tr>
                                                        );
                                                    };
                                                })
                                            );
                                        } else if (user?.status === "rejected") {
                                            return (
                                                user?.roles?.map((roleUsers) => {
                                                    if ((roleUsers?.role === "ROLE_ADMIN") || (roleUsers?.role === "ROLE_EDITOR") || (roleUsers?.role === "ROLE_STAFF")) {
                                                        return (
                                                            <tr key={userIndex} className="">
                                                                <td className="w-8 text-center font-black text-42xl font-firma tracking-supertight">{userIndex+1}</td>
                                                                <td className="w-40 text-center">{user?.firstName} {user?.lastName}</td>
                                                                <td className="w-60 text-center lowercase">{user?.email}</td>
                                                                <td className="w-40 text-center text-white font-medium text-xl rounded-full h-2 py-2 px-8 bg-green-500">{user?.status}</td>
                                                                <td className="w-40 flex justify-center">
                                                                    <Link className="bg-skin-darkblue text-white py-6 px-20" to={`/admin/staffs/${user?._id}`} alt="view staff details">view details</Link>
                                                                </td>
                                                            </tr>
                                                        );
                                                    } else {
                                                        return (
                                                            <tr>
                                                                <td>no record of rejected staff</td>
                                                            </tr>
                                                        );
                                                    };
                                                })
                                            );
                                        } else {
                                            return (
                                                user?.roles?.map((roleUsers) => {
                                                    if ((roleUsers?.role === "ROLE_ADMIN") || (roleUsers?.role === "ROLE_EDITOR") || (roleUsers?.role === "ROLE_STAFF")) {
                                                        return (
                                                            <tr key={userIndex} className="">
                                                                <td className="w-8 text-center font-black text-42xl font-firma tracking-supertight">{userIndex+1}</td>
                                                                <td className="w-40 text-center">{user?.firstName} {user?.lastName}</td>
                                                                <td className="w-60 text-center lowercase">{user?.email}</td>
                                                                <td className="w-40 text-center text-white font-medium text-xl rounded-full h-2 py-2 px-8 bg-green-500">{user?.status}</td>
                                                                <td className="w-4/5 flex justify-center mx-auto">
                                                                    <Link className="w-full bg-skin-darkblue text-white py-6 px-20" to={`/admin/staffs/${user?._id}`} alt="view staff details">view details</Link>
                                                                </td>
                                                            </tr>
                                                        );
                                                    } else {
                                                        return (
                                                            <tr>
                                                                <td>no record of approved staff</td>
                                                            </tr>
                                                        );
                                                    };
                                                })
                                            );
                                        };
                                    })
                                }
                            </tbody>
                            :
                            <tbody>
                                <tr className="h-32 mb-28">
                                    <td className="w-20 h-16 text-center"></td>
                                    <td className="text-center"></td>
                                    <td className=" w-121 text-center uppercase font-medium text-lg tracking-supertight">
                                        No record of staff
                                    </td>
                                    <td className="text-center"></td>
                                    <td className="text-center"></td>
                                </tr>
                            </tbody>
                    }
                </table>



                {/* Pagination controls */}
                <div className="flex justify-between">
                    <div className="border-e-2 border-gray-200/50 p-4 font-black text-42xl font-firma tracking-supertight">
                        {limit}
                    </div>
                    <nav className="relative z-0 inline-flex shadow-sm">
                        {/* Previous page button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentPage === 1}
                        >
                            Prev
                        </button>


                        {/* Page numbers */}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`}>
                            {index + 1}
                            </button>
                        ))}


                        {/* Next page button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </nav>
                </div>
                {/* Pagination controls */}
            </div>
        </>
    );
};
      

export default DashboardStaffsApprovedPage;


