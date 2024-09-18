import { Sidebar,  } from "../components";
import { Dashboard } from "../views";









const Admin = () => {
    
    return (
        <>
            <Sidebar />
            <div className="relative md:ml-64 bg-blueGray-100">
                <Dashboard />
            </div>
        </>
    );
};

export default Admin