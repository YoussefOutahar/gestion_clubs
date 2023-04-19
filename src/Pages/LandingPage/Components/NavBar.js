import styled from "styled-components";
import { Spacer } from "../../../Utils/StyledElements";

import { Space, Dropdown } from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";

const NavBarStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #000000;
    color: #ffffff;
    padding: 1rem;
`;

const items = [
    {
        key: "1",
        label: <a href="/authentification">Authentification</a>,
    },
    {
        key: "2",
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item (disabled)
            </a>
        ),
        icon: <SmileOutlined />,
        disabled: true,
    },
    {
        key: "3",
        danger: true,
        label: "a danger item",
    },
];

const NavBar = (props) => {
    return (
        <NavBarStyle>
            {props.logo}
            <Spacer />
            {props.children}
            <Spacer />
            <Dropdown
                menu={{
                    items,
                }}
            >
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        Acces rapide
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
        </NavBarStyle>
    );
};

export default NavBar;
