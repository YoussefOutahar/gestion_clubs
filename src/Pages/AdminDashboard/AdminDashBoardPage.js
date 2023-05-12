import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { FaGem } from "react-icons/fa";
import { BiX } from "react-icons/bi";
import { Link, Outlet } from "react-router-dom";

export default function AdminDashBoardPage() {
    const { collapseSidebar } = useProSidebar();
    return (
        <div style={{ display: "flex", height: "100%" }}>
            <Sidebar>
                <Menu>
                    <MenuItem component={<Link to="/adminDashboard/test" />} icon={<FaGem />}>
                        {" "}
                        Documentation
                    </MenuItem>
                    <MenuItem component={<Link to="/documentation" />}> Calendar</MenuItem>
                    <MenuItem component={<Link to="/documentation" />}> E-commerce</MenuItem>
                </Menu>
            </Sidebar>
            <main>
                <button onClick={() => collapseSidebar()}>
                    <BiX size={30} />
                </button>
                <Outlet />
            </main>
        </div>
    );
}
