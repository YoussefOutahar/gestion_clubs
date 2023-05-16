import { Checkbox, Radio, Select, Input, Button } from "antd";
import supabase from "../../../DataBase/SupabaseClient";
import { useNavigate } from "react-router-dom";

export default function UserSettingsPage(props) {
    const navigate = useNavigate();
    return (
        <div 
            style={{
                height: "100vh",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                padding: "1% 1% 1% 1%",
            }}
        > 
            <h1>Settings</h1>
            <Checkbox>Option 1</Checkbox>
            <Radio.Group>
                <Radio value="value1">Value 1</Radio>
                <Radio value="value2">Value 2</Radio>
            </Radio.Group>
            <Select>
                <Select.Option value="value1">Value 1</Select.Option>
                <Select.Option value="value2">Value 2</Select.Option>
                <Select.Option value="value3">Value 3</Select.Option>
            </Select>
            <Input placeholder="Option 4" />
            <Button type="primary">Save</Button>
            <Button type="primary" danger={true} on onClick={
                () => {
                    supabase.auth.signOut();
                    navigate("/" , { replace: true } );
                }
            }>Log Out</Button>
        </div>
    );
}
