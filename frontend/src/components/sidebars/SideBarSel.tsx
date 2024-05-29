import AdminSideBar from "./AdminSideBar"
import LYPSideBar from "./LYPSideBar"
import ReceptionSideBar from "./ReceptionSideBar"
import WaiterSideBar from "./WaiterSideBar"

const SideBarSel = (role:any) => {
    switch(role){
        case 'RECEPTIONIST':
            return <ReceptionSideBar />
        case 'LYPREP':
            return <LYPSideBar />
        case 'ADMIN':
            return <AdminSideBar />
        case 'WAITER':
            return <WaiterSideBar />
    }
    return <></>
}

export default SideBarSel