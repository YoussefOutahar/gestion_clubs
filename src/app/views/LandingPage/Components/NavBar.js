import styled from "styled-components";
import { Spacer } from "../../../../old_project/Utils/StyledElements";
import { Link , useNavigate } from "react-router-dom";
import { Space, Dropdown ,Button, ConfigProvider} from "antd";
import { DownOutlined } from "@ant-design/icons";

const NavBarStyle = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #013667;
    color: #ffffff;
    padding: 0rem 3rem 0rem;
`;
const NavUnlisted = styled.ul`
  text-decoration: none;
`;

const linkStyle = {
    margin: "1rem",
    textDecoration: "none",
    color: 'white',
    alignContent: "center",
    fontSize: "1rem",
    fontWeight: "bolder",
    textFransform: "uppercase",
    fontFamily: 'sans-serif'
  }; 
  const items = [
    {
      key: "0",
      label: "Condidatez à l'uir",
      disabled: true,
    },
    { 
      key: "1",
      label: ( <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com"> Condidats</a> ),
    } ,
    { 
      key: "2",
      label: ( <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com"> Condidats Internationale</a> ),
    } ,
    { 
      key: "3",
      label: ( <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com"> Calendrier des concours</a> ),
    } ,
    { 
      key: "4",
      label: ( <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com"> Calendrier de la rentrée</a> ),
    } ,
    {
      type: "divider",
    },
    {
      key: "5",
      label: "Ecole doctorale",
      disabled: true,
    },
    { 
      key: "6",
      label: ( <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com"> A propos</a> ),
    } ,
    { 
      key: "7",
      label: ( <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com"> Admission</a> ),
    } ,
    { 
      key: "8",
      label: ( <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com"> Bourses de Recherche</a> ),
    } ,
  ];

function NavBar() {
  const navigate = useNavigate();
    return (
        <NavBarStyle>
            <img
                src="https://www.uir.ac.ma/assets/_resources/img/mono-logo.png"
                alt="logo"
                width={80}
                height={80}
            />
            <Spacer />
            <>
            <NavUnlisted>
                <Link to="https://www.uir.ac.ma/" style={linkStyle}>UIR</Link>
                <Link to="/" style={linkStyle}>Admission</Link>
                <Dropdown  menu={{ items, }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                        Admission
                        <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
                <Link to="/" style={linkStyle}>Formation</Link>
                <Link to="https://www.uir.ac.ma/fr/pole/executive-education" style={linkStyle}>Executive Education</Link>
                <Link to="/" style={linkStyle}>Recherche</Link>
                <Link to="/" style={linkStyle}>Internationale</Link>
                <Link to="/" style={linkStyle}>Vie dans le compus</Link>
            </NavUnlisted>
            </>
            <Spacer />
            <ConfigProvider
                theme={{
                    components: {
                        Button: {
                            colorPrimary: '#d0d700',
                            //margi-right:20px,
                        },
                    },
                }}
            >
            <Button type="primary" style={{ backgroundColor: '#d0d700', color: '#003667' }} onClick={
                () => {
                    navigate("/session/signin");
                }
            }>Login</Button>
            </ConfigProvider>
        </NavBarStyle>
    );
};

export default NavBar;
