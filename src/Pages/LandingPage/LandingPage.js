import React from "react";
import styled from "styled-components";

import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import CarouselEvents from "./Components/CarouselEvents";
import CarouselClubs from "./Components/CarouselClubs";


function LandingPage() {

    return (
        <>
        <bodyStyle>
            <NavBar/>
            <CarouselEvents/>
            <CarouselClubs/>
            </bodyStyle>
            <Footer />
        </>
    );
}

export default LandingPage;
