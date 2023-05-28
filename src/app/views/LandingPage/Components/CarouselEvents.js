import { useState, useEffect } from 'react';
import supabase from "../../../DataBase/Clients/SupabaseClient";
import ImageSlider from './ImageSlider';


function CarouselEvents() {
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        const fetchClubs = async () => {
            const { data, error } = await supabase.from("Publication").select("*");
            if (error) throw error;
            setClubs(data);
            console.log(data);
        };
        fetchClubs();
    }, []);
    
      const containerStyles = {
        width: "100%",
        height: "650px",
        margin: "0 auto",
      };
      return (
          <div style={containerStyles}>
            <ImageSlider slides={clubs} parentWidth={1550} />
          </div>
      );
}

export default CarouselEvents;
