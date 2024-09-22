import { useEffect, useState, } from "react";
import PropTypes from "prop-types";
import api from "../../api";
import sketch from '../../assets/img/sketch.jpg';

// components
import { TableDropdown } from "..";








export default function CardAllApprovedStaffs({ color, activeDisplay }) {


    // ****************************************************************************
    // MANAGE STATE:-  TO FIND ALL USERS
    // ****************************************************************************
    const [allApprovedStaffs, setAllApprovedUsers] = useState([]);
    // console.log("ALL USERS: ", allApprovedStaffs);

    
    // eslint-disable-next-line
    const [totalAdminUsers, setTotalAdminUsers] = useState(null);
    // console.log("TOTAL STAFFS: ", totalAdminUsers);
    const [totalPages, setTotalPages] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10; // Number of items per page
    const leftArrow = "<", rightArrow = ">";



    // ****************************************************************************
    // MANAGE STATE:-  SPECIAL FEATURES
    // ****************************************************************************
    const [isLoading, setIsLoading] = useState(true);


  
    useEffect(() => {
      const allApprovedStaffsLink = document.querySelector("#staffsLinkID .allApprovedStaffs");
      // console.log("ALL STAFFS LINK", allApprovedStaffsLink);
      if (activeDisplay === "allApprovedStaffs") {
          allApprovedStaffsLink?.classList.add("activeStaffView");
      } else {
          allApprovedStaffsLink?.classList.remove("activeStaffView");
      };
    }, [activeDisplay]);

  
    useEffect(() => {
        if (activeDisplay === "allApprovedStaffs") {
            // ****************************************************************************
            // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL APPROVED STAFFS
            // ****************************************************************************             
            async function fetchAllApprovedStaffs() {
                var approvedStaffs = 'approved';
                await api.get(`/api/v1/auth/account/admins?page=${currentPage}&limit=${limit}&status=${approvedStaffs}`)
                .then((response) => {
                    const { success, data, message } = response.data;
                    const { staffsList, pagination } = data;

                    if (!success && message === "No staff found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                    };

                    setAllApprovedUsers(staffsList);
                
                    setTotalAdminUsers(pagination?.staffsRecord);
                    setTotalPages(pagination?.lastPage);

                })
                .catch((error) => {
                    console.log("Error fetching data: ", error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
            };

            var timerID = setTimeout(fetchAllApprovedStaffs, 300);   // Delay execution of findAllStaffs by 1800ms
            return () => {
                clearTimeout(timerID);                  // Clean up timer if component unmounts or token changes
            };
        };
    }, [activeDisplay, currentPage]); // Fetch data when currentPage changes
    // ****************************************************************************
    // **************************************************************************** 
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // ****************************************************************************
    // ****************************************************************************



    return (
        <div className={`w-full overflow-x-auto ${activeDisplay === "allApprovedStaffs" ? "block" : "hidden"}`}>
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
                allApprovedStaffs?.length !== 0 ?
                  <tbody>                                                    
                    {
                        allApprovedStaffs?.map((user, userIndex) => {
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
                        <td class=""></td>
                        <td class=""></td>
                        <td class="text-left pl-4">No record of approved staff</td>
                        <td class=""></td>
                        <td class=""></td>
                        <td class=""></td>
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
    );
};

// CardAllApprovedStaffs.defaultProps = {
//   color: "light",
// };

CardAllApprovedStaffs.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
