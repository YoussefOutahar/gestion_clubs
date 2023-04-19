import styled from "styled-components";
import { Spacer } from "../../../Utils/StyledElements";

function Footer(props) {
    const FooterStyle = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        background-color: #000000;
        color: #ffffff;
        padding: 1rem;
    `;

    return (
        <FooterStyle>
            {props.children}
            <Spacer />
            {props.logo}
        </FooterStyle>
    );
}

export default Footer;
