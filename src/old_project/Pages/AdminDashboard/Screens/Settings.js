import { Menu ,Button} from "antd";
import  supabase  from "../../../DataBase/SupabaseClient";
import { useNavigate } from "react-router-dom";
import { MailOutlined, SettingOutlined, AppstoreOutlined } from "@ant-design/icons";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem("Navigation One", "sub1", <MailOutlined />, [
        getItem("Item 1", "g1", null, [getItem("Option 1", "1"), getItem("Option 2", "2")], "group"),
        getItem("Item 2", "g2", null, [getItem("Option 3", "3"), getItem("Option 4", "4")], "group"),
    ]),
    getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
        getItem("Option 5", "5"),
        getItem("Option 6", "6"),
        getItem("Submenu", "sub3", null, [getItem("Option 7", "7"), getItem("Option 8", "8")]),
    ]),
    {
        type: "divider",
    },
    getItem("Navigation Three", "sub4", <SettingOutlined />, [
        getItem("Option 9", "9"),
        getItem("Option 10", "10"),
        getItem("Option 11", "11"),
        getItem("Option 12", "12"),
    ]),
    getItem("Group", "grp", null, [getItem("Option 13", "13"), getItem("Option 14", "14")], "group"),
];

export default function SettingsPage(props) {
    const navigate = useNavigate();
    const onClick = (e) => {
        console.log("click ", e);
    };
    return (
        <>
            <Menu width={256}
                onClick={onClick}
                style={{
                    width: 256,
                }}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
                items={items}
            />
            <Button
                type="primary"
                danger={true}
                about="Sign Out"
                onClick={
                    () => {
                        supabase.auth.signOut();
                        navigate("/landingPage");
                    }
                }
            />
        </>
    );
}
