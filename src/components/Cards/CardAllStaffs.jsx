import { Suspense, useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../api";
import sketch from '../../assets/img/sketch.jpg';

// components
import { Preloader, CardAllApprovedStaffs, CardAllPendingStaffs, CardAllRejectedStaffs, TableDropdown } from "..";








export default function CardAllStaffs({ color }) {


  // ****************************************************************************
  // MANAGE STATE:-  TO FIND ALL STAFFS
  // ****************************************************************************
  const [allStaffs, setAllStaffs] = useState([]);
  // console.log("ALL STAFFS: ", allStaffs);
    
  // eslint-disable-next-line
  const [totalAdminUsers, setTotalAdminUsers] = useState(null);
  // console.log("TOTAL USERS: ", totalAdminUsers);
  const [totalPages, setTotalPages] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10; // Number of items per page
  const leftArrow = "<", rightArrow = ">";


  
  // ****************************************************************************
  // MANAGE STATE:-  SPECIAL FEATURES
  // ****************************************************************************
  const [isLoading, setIsLoading] = useState(true);
  const [activeDisplay, setActiveDisplay] = useState("allStaffs");


  useEffect(() => {
      var allStaffsLink = document.querySelector("#staffsLinkID .allStaffs");
      // console.log("ALL STAFFS LINK", allStaffsLink);
      if (activeDisplay === "allStaffs") {
          allStaffsLink?.classList.add("activeStaffView");
      } else {
          allStaffsLink?.classList.remove("activeStaffView");
      };
  }, [activeDisplay]);

  
  useEffect(() => {
      if (activeDisplay === "allStaffs") {

          setIsLoading(true);

          // ****************************************************************************
          // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL STAFFS
          // ****************************************************************************             
          async function fetchAllStaffs() {
              await api.get(`/api/v1/auth/account/admins?page=${currentPage}&limit=${limit}`)
              .then((response) => {
                  const { success, data, message } = response.data;
                  const { staffsList, pagination } = data;

                  if (!success && message === "No staff found") {
                      console.log("Success: ", success);
                      console.log("Message: ", message);
                  };

                  setAllStaffs(staffsList);
              
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

          var timerID = setTimeout(fetchAllStaffs, 400);   // Delay execution of findAllStaffs by 1800ms
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


  
  
  

  if (isLoading) {
      return (
          <>
            <div
                className={
                  "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
                  (color === "dark" ? "bg-white" : "bg-lightBlue-900 text-white")
                }
              >

                {/* Staffs Navigation */}
                <div id="staffsLinkID" className="flex flex-row gap-3 mt-8 mb-10 px-7">
                  <Link className="allUsers activeUserView py-4 px-10 rounded-lg border mr-2" onClick={() => setActiveDisplay("allStaffs")}>All</Link>
                  <Link className="allApprovedUsers py-4 px-10 rounded-lg border mr-2" onClick={() => setActiveDisplay("allApprovedStaffs")}>Approved</Link>
                  <Link className="allPendingUsers py-4 px-10 rounded-lg border mr-2" onClick={() => setActiveDisplay("allPendingStaffs")}>Pending</Link>
                  <Link className="allRejectedUsers py-4 px-10 rounded-lg border" onClick={() => setActiveDisplay("allRejectedStaffs")}>Rejected</Link>
                </div>
                {/* Staffs Navigation */}

                
                {/* Page Title */}
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3
                        className={
                          "font-semibold text-lg " +
                          (color === "dark" ? "text-blueGray-700" : "text-white")
                        }
                      >
                        All Staffs
                      </h3>
                    </div>
                  </div>
                </div>
                {/* Page Title */}


                <div className={`w-full overflow-x-auto ${activeDisplay === "allStaffs" ? "block" : "hidden"}`}>
                  {/* Projects table */}
                  <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                  }
                >
                  S/N
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                  }
                >
                  Full Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                  }
                >
                  E-mail address
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                  }
                >
                  Status
                </th> 
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                  }
                >
                  Action
                </th>              
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                  }
                ></th>
              </tr>
                    </thead>         
                    <tbody className='w-16 h-16'>
                            <tr>
                              <td></td>
                              <td></td>
                              <td className="max-w-40 h-60 flex justify-center items-center">
                                <Preloader />
                              </td>
                              <td></td>
                            </tr>                
                    </tbody>
                  </table>
                </div> 
            </div>      
          </>
      );
  };


  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
          (color === "dark" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >

        {/* Staffs Navigation */}
        <div id="staffsLinkID" className="flex flex-row gap-3 mt-8 mb-10 px-7">
          <Link className="allStaffs activeStaffView py-4 px-10 rounded-lg border mr-2" onClick={() => setActiveDisplay("allStaffs")}>All</Link>
          <Link className="allApprovedStaffs py-4 px-10 rounded-lg border mr-2" onClick={() => setActiveDisplay("allApprovedStaffs")}>Approved</Link>
          <Link className="allPendingStaffs py-4 px-10 rounded-lg border mr-2" onClick={() => setActiveDisplay("allPendingStaffs")}>Pending</Link>
          <Link className="allRejectedStaffs py-4 px-10 rounded-lg border" onClick={() => setActiveDisplay("allRejectedStaffs")}>Rejected</Link>
        </div>
        {/* Users Navigation */}

        
        {/* Page Title */}
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "dark" ? "text-blueGray-700" : "text-white")
                }
              >
                All Staffs
              </h3>
            </div>
          </div>
        </div>
        {/* Page Title */}


        {/* Views */}
        <div className={`w-full overflow-x-auto ${activeDisplay === "allStaffs" ? "block" : "hidden"}`}>
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                    ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                    : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                  }
                >
                  S/N
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                  }
                >
                  Full Name
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                  }
                >
                  E-mail address
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                  }
                >
                  Status
                </th> 
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                  }
                >
                  Action
                </th>              
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-blueGray-50 text-gray-500 border-lightBlue-300")
                  }
                ></th>
              </tr>
            </thead>
            {
              allStaffs?.length !== 0 ?
                <tbody>                                                    
                  {
                      allStaffs?.map((user, userIndex) => {
                          if (user?.status === "pending") {
                              return (
                                  <tr key={userIndex}>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                                        #{userIndex+1}
                                      </td>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md tracking-supertight whitespace-nowrap p-4 text-left flex items-center capitalize">
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
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg tracking-supertight font-bold whitespace-nowrap p-4">
                                        {user?.email}
                                      </td>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg font-bold whitespace-nowrap p-4 capitalize">
                                        <i className="fas fa-circle text-orange-400 mr-2"></i>{user?.status}
                                      </td>                  
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap p-4 capitalize">
                                          <Link to={`/admin/staffs/${user._id}`}>View details</Link>
                                      </td>    
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-right">
                                        <TableDropdown />
                                      </td>
                                  </tr>               
                                );
                          } else if (user?.status === "rejected") {
                            return (
                                  <tr key={userIndex}>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                                        #{userIndex+1}
                                      </td>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md tracking-supertight whitespace-nowrap p-4 text-left flex items-center">
                                        <img src={sketch} className="h-12 w-12 bg-white rounded-full border" alt="user-profile-pic" />{" "}
                                        <span
                                          className={
                                            "ml-3 font-bold " +
                                            + (color === "light" ? "text-blueGray-600" : "text-white")
                                          }
                                        >
                                          {user?.firstName} {user?.lastName}
                                        </span>
                                      </td>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg tracking-supertight font-bold whitespace-nowrap p-4">
                                        {user?.email}
                                      </td>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg font-bold whitespace-nowrap p-4 capitalize">
                                        <i className="fas fa-circle text-red-500 mr-2"></i>{user?.status}
                                      </td> 
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap p-4 capitalize">
                                          <Link to={`/admin/staffs/${user._id}`}>View details</Link>
                                      </td>                   
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-right">
                                        <TableDropdown />
                                      </td>
                                  </tr>               
                            );
                          } else {
                                return (
                                  <tr key={userIndex}>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                                        #{userIndex+1}
                                      </td>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md tracking-supertight whitespace-nowrap p-4 text-left flex items-center">
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
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg tracking-supertight font-bold whitespace-nowrap p-4">
                                        {user?.email}
                                      </td>
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg font-bold whitespace-nowrap p-4 capitalize">
                                        <i className="fas fa-circle text-green-500 mr-2"></i>{user?.status}
                                      </td>  
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-lg font-semibold whitespace-nowrap p-4 capitalize">
                                          <Link to={`/admin/staffs/${user._id}`}>View details</Link>
                                      </td>                  
                                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-right">
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
                      <td className="text-left max-w-60 pl-6 h-60 flex justify-start items-center">No record of staff</td>
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
        <Suspense fallback={<div>Loading...</div>}>
          <CardAllApprovedStaffs activeDisplay={activeDisplay} />
        </Suspense>        
        <Suspense fallback={<div>Loading...</div>}>                            
          <CardAllPendingStaffs activeDisplay={activeDisplay} />
        </Suspense>                       
        <Suspense fallback={<div>Loading...</div>}>
          <CardAllRejectedStaffs activeDisplay={activeDisplay} />
        </Suspense>
        {/* Views */}

      </div>
    </>
  );
};


CardAllStaffs.defaultProps = {
  color: "light",
};

CardAllStaffs.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};
