import { Sidebar, Menu, MenuItem, useProSidebar, SubMenu } from "react-pro-sidebar";

// Icons :
import { BiStats } from "react-icons/bi";
import { BsFillCalendarFill } from "react-icons/bs";
import { CgOrganisation } from "react-icons/cg";
import { IoSettingsSharp } from "react-icons/io5";
import { MdGroups2, MdOutlineSpaceDashboard } from "react-icons/md";
import { AiOutlineMenu } from "react-icons/ai";

import { Link, Outlet } from "react-router-dom";


function FinancePage(){
    const { collapseSidebar } = useProSidebar();
    return (
        <div
            style={{
                minHeight: "100%",
                display: "flex",
                flexDirection: "row",
            }}
        >
            <Sidebar
                rootStyles={{
                    transition: "all 0.3s ease",
                    background:
                        "linear-gradient(180deg, rgba(166,240,255,1) 0%, rgba(220,250,255,1) 49%, rgba(230,252,255,1) 100%)",
                }}
            >
                <Menu
                    menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                            if (level === 0)
                                return {
                                    color: "#344cff",
                                };
                        },
                    }}
                >
                    <MenuItem icon={<AiOutlineMenu onClick={() => collapseSidebar()} />}>
                        <h1>User Dashboard</h1>
                    </MenuItem>
                    <br />
                    <br />
                    <br />
                    <MenuItem component={<Link to="/userDashboard/myClubs" />} icon={<BiStats />}>
                        {" "}
                        My clubs
                    </MenuItem>
                    <MenuItem component={<Link to="/userDashboard/Calendar" />} icon={<BsFillCalendarFill />}>
                        {" "}
                        Calendar
                    </MenuItem>
                    <MenuItem component={<Link to="/userDashboard/Forums" />} icon={<CgOrganisation />}>
                        {" "}
                        Forums
                    </MenuItem>
                    <MenuItem component={<Link to="/userDashboard/Members" />} icon={<MdGroups2 />}>
                        {" "}
                        Mmebers
                    </MenuItem>
                </Menu>
                <br />
                <br />
                <br />
                <Menu
                    menuItemStyles={{
                        button: ({ level, active, disabled }) => {
                            // only apply styles on first level elements of the tree
                            if (level === 0)
                                return {
                                    color: "#344cff",
                                };
                        },
                    }}
                >
                    
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <MenuItem component={<Link to="/userDashboard/Settings" />} icon={<IoSettingsSharp />}>
                        {" "}
                        Settings
                    </MenuItem>
                </Menu>
            </Sidebar>
            <div
                style={{
                    height: "100%",
                    width: "100%",
                    overflow: "auto",
                    padding: "20px",
                }}
            >
                <Outlet />
            </div>
        </div>
    );
}
export default FinancePage;