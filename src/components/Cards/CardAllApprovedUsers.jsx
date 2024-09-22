import { useEffect, useState, } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import sketch from '../../assets/img/sketch.jpg';

// components
import { Preloader, TableDropdown } from "..";








export default function CardAllApprovedUsers({ color, activeDisplay }) {


    // ****************************************************************************
    // MANAGE STATE:-  TO FIND ALL USERS
    // ****************************************************************************
    const [allApprovedUsers, setAllApprovedUsers] = useState([]);
    // console.log("ALL USERS: ", allUsers);

    // eslint-disable-next-line
    const [totalUsers, setTotalUsers] = useState(null);
    // console.log("TOTAL USERS: ", totalUsers);

    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const limit = 10; // Number of items per page
    const leftArrow = "<", rightArrow = ">";

  

    // ****************************************************************************
    // MANAGE STATE:-  SPECIAL FEATURES
    // ****************************************************************************
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        var allApprovedUsersLink = document.querySelector("#usersLinkID .allApprovedUsers");
        // console.log("ALL USERS LINK", allUsersLink);
        if (activeDisplay === "allApprovedUsers") {
            allApprovedUsersLink?.classList.add("activeUserView");
        } else {
            allApprovedUsersLink?.classList.remove("activeUserView");
        };
    }, [activeDisplay]);

    useEffect(() => {
        if (activeDisplay === "allApprovedUsers") {
            
            setIsLoading(true);

            // ****************************************************************************
            // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL USERS
            // ****************************************************************************             
            async function fetchAllApprovedUsers() {
                var approved = 'approved';
                await api.get(`/api/v1/auth/account/by-role/ROLE_USERS?page=${currentPage}&limit=${limit}&status=${approved}`)
                .then((response) => {
                            const { success, data, message } = response.data;
                            const { usersList, pagination } = data;

                            if (!success && message === "No user found") {
                                console.log("Success: ", success);
                                console.log("Message: ", message);
                            };

                            setAllApprovedUsers(usersList);
                        
                            setTotalUsers(pagination?.usersRecord);
                            setTotalPages(pagination?.lastPage);
                })
                .catch((error) => {
                      console.log("Error fetching data: ", error);
                })
                .finally(() => {
                      setIsLoading(false);
                });
            };
            var timerID = setTimeout(fetchAllApprovedUsers, 400);   // Delay execution of findAllApprovedUsers by 1800ms
        
            return () => {
                clearTimeout(timerID);                  // Clean up timer if component unmounts or token changes
            };
        };
    }, [activeDisplay, currentPage]); // Fetch data when activeDisplay and currentPage changes
    // ****************************************************************************
    // **************************************************************************** 
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // ****************************************************************************
    // ****************************************************************************





    if (isLoading) {
        return (
        <>
            <div className={`w-full overflow-x-auto ${activeDisplay === "allApprovedUsers" ? "block" : "hidden"}`}>
              {/* Projects table */}
              <table className="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                    >
                      S/N
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                    >
                      Full Name
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                    >
                      E-mail address
                    </th>
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                    >
                      Status
                    </th>              
                    <th
                      className={
                        "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                        (color === "light"
                          ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                          : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                      }
                    ></th>
                  </tr>
                </thead>          
                <tbody className='w-16 h-16 '>
                  <tr>
                    <td></td>
                    <td></td>
                    <td className="max-w-40 h-60 flex justify-center items-center"><Preloader /></td>
                    <td></td>
                  </tr>                
                </tbody>
              </table>
            </div>       
        </>
        );
    };


    return (
      <>
          <div className={`w-full overflow-x-auto ${activeDisplay === "allApprovedUsers" ? "block" : "hidden"}`}>
            {/* Projects table */}
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    S/N
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Full Name
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    E-mail address
                  </th>
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  >
                    Status
                  </th>              
                  <th
                    className={
                      "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                      (color === "light"
                        ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                        : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                    }
                  ></th>
                </tr>
              </thead>
              {
                allApprovedUsers?.length !== 0 ?
                  <tbody>                                                    
                    {
                        allApprovedUsers?.map((user, userIndex) => {
                            if (user?.status === "pending") {
                                return (
                                    <tr key={userIndex}>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                          #{userIndex+1}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                          <img src={sketch} className="h-12 w-12 bg-white rounded-full border" alt="user-profile-pic" />{" "}
                                          <span
                                            className={
                                              "ml-3 font-bold " +
                                              +(color === "light" ? "text-blueGray-600" : "text-white")
                                            }
                                          >
                                            {user?.firstName} {user?.lastName}
                                          </span>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs text-sm tracking-supertight font-bold whitespace-nowrap p-4">
                                          {user?.email}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 capitalize">
                                          <i className="fas fa-circle text-orange-500 mr-2"></i>{user?.status}
                                        </td>                  
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                          <TableDropdown />
                                        </td>
                                    </tr>               
                                  );
                            } else if (user?.status === "rejected") {
                              return (
                                    <tr key={userIndex}>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                          #{userIndex+1}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                          <img src={sketch} className="h-12 w-12 bg-white rounded-full border" alt="user-profile-pic" />{" "}
                                          <span
                                            className={
                                              "ml-3 font-bold" +
                                              +(color === "light" ? "text-blueGray-600" : "text-white")
                                            }
                                          >
                                            {user?.firstName} {user?.lastName}
                                          </span>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs text-sm tracking-supertight font-bold whitespace-nowrap p-4">
                                          {user?.email}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 capitalize">
                                          <i className="fas fa-circle text-red-500 mr-2"></i>{user?.status}
                                        </td>                  
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                          <TableDropdown />
                                        </td>
                                    </tr>               
                              );
                            } else {
                                  return (
                                    <tr key={userIndex}>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                          #{userIndex+1}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                          <img src={sketch} className="h-12 w-12 bg-white rounded-full border" alt="user-profile-pic" />{" "}
                                          <span
                                            className={
                                              "ml-3 font-bold " +
                                              +(color === "light" ? "text-blueGray-600" : "text-white")
                                            }
                                          >
                                            {user?.firstName} {user?.lastName}
                                          </span>
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs text-sm tracking-supertight font-bold whitespace-nowrap p-4">
                                          {user?.email}
                                        </td>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 capitalize">
                                          <i className="fas fa-circle text-green-500 mr-2"></i>{user?.status}
                                        </td>                  
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                          <TableDropdown />
                                        </td>
                                    </tr>               
                                  );
                            };
                        })
                    }
                  </tbody>
                  :
                  <tbody>                    
                      <tr>
                        <td className=""></td>
                        <td className=""></td>
                        <td className="text-left max-w-52 pl-4 h-60 flex justify-center items-center">No record of approved user</td>
                        <td className=""></td>
                        <td className=""></td>
                        <td className=""></td>
                      </tr>
                  </tbody>
              }
            </table>


            {/* Pagination controls */}
            <div className="flex justify-between items-center py-2 mr-6">
                                    <div className="p-4 font-medium text-3xl font-firma tracking-supertight flex flex-row gap-6 items-center">
                                        {limit} 
                                        <div className="text-xl normal-case">Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></div>
                                    </div>
                                    <nav className="relative z-0 inline-flex shadow-sm">
                                        {/* Previous page button */}
                                        <button
                                            onClick={() => handlePageChange(currentPage - 1)}
                                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-xl font-black text-gray-500 hover:bg-gray-50 w-16 justify-center h-14 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={currentPage === 1}
                                        >{leftArrow}
                                        </button>


                                        {/* Page numbers */}
                                        {Array.from({ length: totalPages }, (_, index) => (
                                            <button
                                            key={index}
                                            onClick={() => handlePageChange(index + 1)}
                                            className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-xl font-bold text-gray-700 hover:bg-gray-50 w-16 justify-center h-14 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`}>
                                            {index + 1}
                                            </button>
                                        ))}


                                        {/* Next page button */}
                                        <button
                                            onClick={() => handlePageChange(currentPage + 1)}
                                            className={`-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-xl font-black text-gray-500 hover:bg-gray-50 w-16 justify-center h-14 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
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

CardAllApprovedUsers.defaultProps = {
  color: "light",
};

CardAllApprovedUsers.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
