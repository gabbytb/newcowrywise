import { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import axios from "axios";






const RejectedUsersPage = ({ activeDisplay }) => {  


    // ****************************************************************************
    // MANAGE STATE:-  TO FIND ALL REJECTED USERS
    // ****************************************************************************
    const [rejectedUsers, setRejectedUsers] = useState([]);
    // console.log("REJECTED USERS: ", rejectedUsers);
    
    // eslint-disable-next-line
    const [totalRejectedUsers, setTotalRejectedUsers] = useState(null);
    const [totalPages, setTotalPages] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);    
    const limit = 10; // Number of items per page
    const leftArrow = "<", rightArrow = ">";


    useEffect(() => {
        var allRejectedUsersLink = document.querySelector("#usersLinkID .allRejectedUsers");
        // console.log("All Rejected Users Link: ", allRejectedUsersLink);

        if (activeDisplay === "allRejectedUsers") {
            allRejectedUsersLink?.classList.add("activeUserView");
        } else {
            allRejectedUsersLink?.classList.remove("activeUserView");
        };
    }, [activeDisplay]);


    useEffect(() => {
        if (activeDisplay === "allRejectedUsers") {
            // ****************************************************************************
            // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL "REJECTED" USERS
            // ****************************************************************************             
            async function fetchRejectedUsers() {        
                const rejectedStatus = 'rejected';
                await axios.get(`http://127.0.0.1:8000/api/v1/auth/account/by-role/ROLE_USERS?page=${currentPage}&limit=${limit}&status=${rejectedStatus}`)
                .then((response) => {
                    const { success, data, message } = response.data;
                    const { usersList, pagination } = data;

                    if (!success && message === "No user found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    };

                    setRejectedUsers(usersList);

                    setTotalRejectedUsers(pagination?.usersRecord);
                    setTotalPages(pagination?.lastPage);
                })
                .catch((error) => {
                    console.log("Error fetching data: ", error);
                });
            };

            var timerID = setTimeout(fetchRejectedUsers, 300);   // Delay execution of findAllApprovedUsers by 1800ms
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
            <div className={`capitalize border ${activeDisplay === "allRejectedUsers" ? "grid" : "hidden"}`}>
                <table className="table-fixed capitalize w-full border staff__table">
                    <thead>
                        <tr className="text-left">
                            <th className="w-12 h-16 px-3 py-3">ID</th>
                            <th className="w-40 px-3 py-3">NAME</th>
                            <th className="w-60 px-3 py-3">E-MAIL ADDRESS</th>
                            <th className="w-40 px-3 py-3 text-center">STATUS</th>
                            <th className="w-40 px-3 py-3 text-center">ACTION</th>
                        </tr>
                    </thead>
                    {
                        rejectedUsers?.length !== 0 ?
                            <tbody>
                                {
                                    rejectedUsers?.map((user, userIndex) => {
                                        if (user?.status === "pending") {
                                            return (
                                                <tr key={userIndex} className="text-left">
                                                    <td className="w-12 px-3 py-4 font-firma tracking-supertight">#{userIndex+1}</td>
                                                    <td className="w-40 px-3 py-4">{user?.firstName} {user?.lastName}</td>
                                                    <td className="w-60 px-3 py-4 lowercase font-bold">{user?.email}</td>
                                                    <td className="w-40"><div className="text-center text-white font-medium text-lg rounded-full py-3 px-8 w-full bg-orange-500">{user?.status}</div></td>
                                                    <td className="w-4/5 text-center flex justify-center mx-auto">
                                                        <Link className="w-full text-slate-700 py-6" to={`/admin/users/${user?._id}`} alt="view user details">view details</Link>
                                                    </td>
                                                </tr>
                                            );
                                        } else if (user?.status === "rejected") {
                                            return (
                                                <tr key={userIndex} className="text-left">
                                                    <td className="w-12 px-3 py-4 font-firma tracking-supertight">#{userIndex+1}</td>
                                                    <td className="w-40 px-3 py-4">{user?.firstName} {user?.lastName}</td>
                                                    <td className="w-60 px-3 py-4 lowercase font-bold">{user?.email}</td>
                                                    <td className="w-40"><div className="text-center text-white font-medium text-lg rounded-full py-3 px-8 w-full bg-red-500">{user?.status}</div></td>
                                                    <td className="w-4/5 text-center flex justify-center mx-auto">
                                                        <Link className="w-full text-slate-700 py-6" to={`/admin/users/${user?._id}`} alt="view user details">view details</Link>
                                                    </td>
                                                </tr>
                                            );
                                        } else {
                                            return (
                                                <tr key={userIndex} className="text-left">
                                                    <td className="w-12 px-3 py-4 font-firma tracking-supertight">#{userIndex+1}</td>
                                                    <td className="w-40 px-3 py-4">{user?.firstName} {user?.lastName}</td>
                                                    <td className="w-60 px-3 py-4 lowercase font-bold">{user?.email}</td>
                                                    <td className="w-40"><div className="text-center text-white font-medium text-lg rounded-full py-3 px-8 w-full bg-green-500">{user?.status}</div></td>
                                                    <td className="w-4/5 text-center flex justify-center mx-auto">
                                                        <Link className="w-full text-slate-700 py-6" to={`/admin/users/${user?._id}`} alt="view user details">view details</Link>
                                                    </td>
                                                </tr>
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
                                        No record of user
                                    </td>
                                    <td className="text-center"></td>
                                    <td className="text-center"></td>
                                </tr>
                            </tbody>
                    }
                </table>


                {/* Pagination controls */}
                <div className="flex justify-between">
                    <div className="p-4 font-medium text-3xl font-firma tracking-supertight flex flex-row gap-6 items-center">
                        {limit} 
                        <div className="text-xl normal-case">Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></div>
                    </div>
                    <nav className="relative z-0 inline-flex shadow-sm">
                        {/* Previous page button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={currentPage === 1}
                        >{leftArrow}
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
                        >{rightArrow}
                        </button>
                    </nav>
                </div>
                {/* Pagination controls */}
            </div>
        </>
    );
};


export default RejectedUsersPage;





















