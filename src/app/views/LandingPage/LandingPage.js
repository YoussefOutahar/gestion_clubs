import React from "react";

import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import CarouselEvents from "./Components/CarouselEvents";
import CarouselClubs from "./Components/CarouselClubs";
import Gallery from "./Components/Gallery";
import Body from "./Components/body";


function LandingPage() {

    return (
        <>
            <NavBar/>
            <CarouselEvents/>
            <CarouselClubs/>
            <Body/>
            <Gallery/>
            <Footer />
        </>
    );
}

export default LandingPage;
