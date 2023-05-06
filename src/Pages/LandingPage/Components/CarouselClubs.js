import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, EffectCoverflow, Autoplay } from 'swiper'
import { useEffect, useState,React } from "react";
import supabase from "../../../DataBase/SupabaseClient";

import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import '../../../Resources/Carousel.css'

function CarouselClubs() {
const [clubs, setClubs] = useState([]);

    useEffect(() => {
        const fetchClubs = async () => {
            const { data, error } = await supabase.from("Clubs").select("*");
            if (error) throw error;
            setClubs(data);
        };
        fetchClubs();
    }, []);

  return (
    <div className='carousel'>
        <div>
            <div className='carousel-content'>
                <span>discover</span>
                <h1>UIR clubs </h1>
                <hr />
                <p>L’UIR a la fierté de compter 29 clubs étudiants affiliés à la Direction de la Vie<br/> Etudiante et qui contribuent à promouvoir l’expérience étudiante en participant à l’animation de leur campus et par conséquent, au rayonnement et au développement de leur communauté..</p>
            </div>
        </div>

        <Swiper 
        className='myswiper'
        modules={[Pagination, EffectCoverflow, Autoplay]}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 3,
            slideShadows: true
        }}
        loop={true}
        pagination={{clickable: true}}

        autoplay={{
            delay: 5000,
            disableOnInteraction: false
        }}
        breakpoints={{
            640: {
                slidesPerView: 2
            },
            768: {
                slidesPerView: 1
            },
            1024: {
                slidesPerView: 2
            },
            1560: {
                slidesPerView: 3
            },
        }}
        
        >
            {
                clubs.map(club => (

                    <SwiperSlide style={{ backgroundImage: `url(${club.logo})` }} className="myswiper-slider">
                        <div>
                            <h2>{club.nom}</h2>
                            <p>{club.description}</p>
                            <a href={`${club.logo}`} target="_blank" className='slider-btn'>explore</a>
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    </div>
  )
}

export default CarouselClubs