import React from "react";

import Footer from "./Components/Footer";
import NavBar from "./Components/NavBar";
import CarouselClubs from "./Components/CarouselClubs";

function LandingPage() {

    return (
        <>
            <NavBar
                logo={
                    <img
                        src="https://www.uir.ac.ma/assets/_resources/img/mono-logo.png"
                        alt="logo"
                        width={80}
                        height={80}
                    />
                }
                children={
                    <>
                        
                    </>
                }
            />

            <CarouselClubs />

            <Footer />
        </>
    );
}

export default LandingPage;