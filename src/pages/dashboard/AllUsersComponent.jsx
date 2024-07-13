import { useEffect, useState } from 'react';
import axios from 'axios';





const AllUsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10; // Number of items per page


  useEffect(() => {
    fetchData();
  }, [currentPage]); // Fetch data when currentPage changes


  const fetchData = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/v1/admin/users/manage?page=${currentPage}&limit=${limit}`);
      const { data } = response.data;
      setUsers(data);
      // Assuming your backend also sends total number of pages
      setTotalPages(Math.ceil(response.data.totalCount / limit));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };




  return (
    <div className="container mx-auto p-4">
  
      {/* Display your data */}
      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 border border-gray-200 rounded">
            <p>{user.name}</p>
            <p>{user.email}</p>
            {/* Add more fields as needed */}
          </div>
        ))}
      </div>





      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <nav className="relative z-0 inline-flex shadow-sm">
            
          {/* Previous page button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={currentPage === 1}
          >
            Previous
          </button>


          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`}
            >
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
    </div>
  );
};

export default AllUsersComponent;
