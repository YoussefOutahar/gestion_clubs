import { useEffect, useState } from "react";
import supabase from "../../../DataBase/SupabaseClient";
import { Carousel } from "antd";

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

    const contentStyle = {
        height: "500px",
        color: "#fff",
        lineHeight: "500px",
        textAlign: "center",
        background: "#364d79",
    };

    return (
        <Carousel autoplay>
            {clubs.map((club) => (
                <div>
                    <h3 style={contentStyle}>{club.nom}</h3>
                </div>
            ))}
        </Carousel>
    );
}

export default CarouselClubs;
