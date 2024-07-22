import { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import axios from "axios";






const DashboardStaffsPendingPage = ({ activeDisplay }) => {  


    // ****************************************************************************
    // MANAGE STATE:-  TO FIND ALL USERS
    // ****************************************************************************
    const [pendingAdmins, setPendingAdmins] = useState([]);
    console.log("PENDING ADMINS: ", pendingAdmins);

    const [totalPages, setTotalPages] = useState(0);
    const [totalPendingAdminUsers, setTotalPendingAdminUsers] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);    
    const limit = 10; // Number of items per page




    useEffect(() => {
        if (activeDisplay === "allPendingStaffs") {
            var timerID = setTimeout(fetchPendingStaffs, 300);   // Delay execution of findAllApprovedUsers by 1800ms
            return () => {
                clearTimeout(timerID);                  // Clean up timer if component unmounts or token changes
            };
        }
    }, [activeDisplay, currentPage]); // Fetch data when currentPage changes
    // ****************************************************************************
    // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL "APPROVED" STAFFS
    // ****************************************************************************             
    async function fetchPendingStaffs() {        
        const pendingStatus = "pending";
        await axios.get(`http://127.0.0.1:8000/api/v1/auth/account/admins?page=${currentPage}&limit=${limit}&status=${pendingStatus}`)
        .then((response) => {
            const { success, data, message } = response.data;
            const { accountList, pagination } = data;

            if (!success && message === "No admin found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };

            setPendingAdmins(accountList)

            setTotalPages(pagination?.lastPage);
            setTotalPendingAdminUsers(pagination?.adminRecords);
        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        });
    };
    // ****************************************************************************
    // ****************************************************************************
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // ****************************************************************************
    // ****************************************************************************




   return (
        <>
            <div className={`capitalize ${activeDisplay === "allPendingStaffs" ? "grid" : "hidden"}`}>
                <table className="table-fixed capitalize w-full staff__table">
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>NAME</th>
                            <th>E-MAIL</th>
                            <th>STATUS</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pendingAdmins.map((user, userIndex) => {
                                if (user?.status === "pending") {
                                    return (
                                        user?.roles?.map((roleUsers) => {
                                            if ((roleUsers?.role === "ROLE_ADMIN") || (roleUsers?.role === "ROLE_EDITOR") || (roleUsers?.role === "ROLE_STAFF")) {
                                                return (
                                                    <tr key={userIndex}>
                                                        <td>{userIndex+1}</td>
                                                        <td>{user?.firstName} {user?.lastName}</td>
                                                        <td className="lowercase">{user?.email}</td>
                                                        <td className="text-white font-medium text-xl rounded-full h-2 py-2 px-8 bg-orange-500">{user?.status}</td>
                                                        <td>
                                                            <Link to={`/admin/staffs/${user?._id}`} alt="view user details">view details</Link>
                                                        </td>
                                                    </tr>
                                                );
                                            } else {
                                                return (
                                                    <tr>
                                                        <td>No admins found</td>
                                                    </tr>
                                                );
                                            };
                                        })
                                    );
                                } else if (user?.status === "failed") {
                                    return (
                                        user?.roles?.map((roleUsers) => {
                                            if ((roleUsers?.role === "ROLE_ADMIN") || (roleUsers?.role === "ROLE_EDITOR") || (roleUsers?.role === "ROLE_STAFF")) {
                                                return (
                                                    <tr key={userIndex}>
                                                        <td>{userIndex+1}</td>
                                                        <td>{user?.firstName} {user?.lastName}</td>
                                                        <td className="lowercase">{user?.email}</td>
                                                        <td className="text-white font-medium text-xl rounded-full h-2 py-2 px-8 bg-red-500">{user?.status}</td>
                                                        <td>
                                                            <Link to={`/admin/staffs/${user?._id}`} alt="view user details">view details</Link>
                                                        </td>
                                                    </tr>
                                                );
                                            } else {
                                                return (
                                                    <tr>
                                                        <td>No admins found</td>
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
                                                    <tr key={userIndex}>
                                                        <td>{userIndex+1}</td>
                                                        <td>{user?.firstName} {user?.lastName}</td>
                                                        <td className="lowercase">{user?.email}</td>
                                                        <td className="text-white font-medium text-xl rounded-full h-2 py-2 px-8 bg-green-500">{user?.status}</td>
                                                        <td>
                                                            <Link to={`/admin/staffs/${user?._id}`} alt="view user details">view details</Link>
                                                        </td>
                                                    </tr>
                                                );
                                            } else {
                                                return (
                                                    <tr>
                                                        <td>No admins found</td>
                                                    </tr>
                                                );
                                            };
                                        })
                                    );
                                };
                            })
                        }
                    </tbody>
                </table>



                {/* Pagination controls */}
                <div className="flex justify-between mt-4">
                    <div>
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
                        {/* Previous page button */}



                        {/* Page numbers */}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`}>
                            {index + 1}
                            </button>
                        ))}
                        {/* Page numbers */}



                        {/* Next page button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className={`-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                        {/* Next page button */}

                    </nav>
                </div>
                {/* Pagination controls */}
            </div>
        </>
    );
};


export default DashboardStaffsPendingPage;





