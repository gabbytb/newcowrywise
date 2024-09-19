import "../assets/styles/tailwind.css";
import { AdminNavbar, HeaderStats, Sidebar,  } from "../components";
import { Dashboard } from "../views";









const Admin = () => {

    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <AdminNavbar />
                <HeaderStats />
                <div className="px-4 md:px-10 mx-auto w-full -m-24">
                    <Dashboard />
                </div>
            </div>
        </>
    );
};

export default Admin