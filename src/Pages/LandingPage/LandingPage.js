import styled from "styled-components";
import { Spacer } from "../../Utils/StyledElements";

import { Link } from "react-router-dom";

function LandingPage() {
    const NavBarStyle = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: #000000;
        color: #ffffff;
        padding: 1rem;
    `;

    const NavBar = (props) => {
        return (
            <NavBarStyle>
                {props.logo}
                <Spacer />
                {props.children}
            </NavBarStyle>
        );
    };

    return (
        <>
            <NavBar
                logo={<h1>test</h1>}
                children={
                    <>
                        <a href="/authentification">Authentification</a>
                        <a href="/landingPage">Landing Page</a>
                    </>
                }
            />
            <h1>Landing Page</h1>
        </>
    );
}

export default LandingPage;
