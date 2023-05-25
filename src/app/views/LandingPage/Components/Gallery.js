import { useState, useEffect } from 'react';
import supabase from "../../../DataBase/SupabaseClient";
import ImageSlider from './ImageSlider';


function Gallery() {
    /*const [clubs, setClubs] = useState([]);

    useEffect(() => {
        const fetchClubs = async () => {
            const { data, error } = await supabase.from("Clubs").select("*");
            if (error) throw error;
            setClubs(data);
        };
        fetchClubs();
    }, []);*/
    
      const containerStyles = {
        width: "100%",
        height: "200px",
        margin: "90px auto",
      };
      const heading = {
        fontSize: "33px",
        fontWeight: "700",
        fontFamily: "Montserrat, Helvetica Neue, Helvetica, Arial, Lucida Grande, sans-serif",
        margin: "0px 0px 50px",
        color: "#192026",
        lineHeight: "1.2",
        textAlign: "center",
      };
      const photos = [
        {
          key: "0",
          logo: "https://www.uir.ac.ma/assets/imgs/UIR_DSC_1647.jpg",
        },
        { 
          key: "1",
          logo: "https://www.uir.ac.ma/assets/imgs/IMG_0031.JPG",
        } ,
        { 
          key: "2",
          logo: "https://www.uir.ac.ma/assets/imgs/IMG_0169.JPG",
        } ,
        { 
          key: "3",
          logo: "https://www.uir.ac.ma/assets/imgs/UIR__MG_1157.jpg",
        } ,
        { 
          key: "4",
          logo: "https://www.uir.ac.ma/assets/imgs/DSC_0086.jpg",
        } ,
        {
          key: "5",
          logo: "https://www.uir.ac.ma/assets/imgs/IMG_5406.JPG",
        },
        { 
          key: "6",
          logo: "https://www.uir.ac.ma/assets/imgs/Salle%20Omnisports.jpg",
        } ,
        { 
          key: "7",
          logo: "https://www.uir.ac.ma/assets/imgs/UIR__MG_1157.jpg",
        } ,
      ];
      return (
        <>
          <div style={containerStyles}>
            <h3 style={heading}>Vie dans le compus</h3>
            <ImageSlider slides={photos} parentWidth={400} />
          </div>
          </>
      );
}

export default Gallery;
