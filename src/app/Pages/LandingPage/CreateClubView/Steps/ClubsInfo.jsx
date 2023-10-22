import { formStyle, h5Style, inputGroup, inputStyle, textareaStyle } from "./Styles";
import { useState } from "react";

function ClubsInfo({ textareaHeight, handleTextareaChange }) {
    const [clubData, setClubData] = useState({
        name: "",
        mission: "",
        kpo: "",
        logo: "",
        nb_member: 4,
        state: "pending",
    });
    const [clubName, setClubName] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const handleInputChange = (key, value) => {
        setClubData({ ...clubData, [key]: value });
        if (key === "name") {
            setClubName(value);
        }
    };
    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file); // Set the selected image here
        }
    };
    return (
        <div className="container">
            <form style={formStyle}>
                <label htmlFor="name" style={{ ...h5Style }}>
                    Club name :
                </label>
                <input
                    placeholder="Enter club's name "
                    type="text"
                    id="name"
                    style={{ ...inputGroup, ...inputStyle }}
                    value={clubData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                />
                <label htmlFor="mission" style={{ ...h5Style }}>
                    Club mission :
                </label>
                <textarea
                    placeholder="Your mission must be ambitious but achievable! The mission is your reason for being; it’s about defining what your club will accomplish. To summarize your mission, please reformulate it in the form of a slogan!"
                    type="text"
                    id="mission"
                    style={{ ...inputGroup, ...textareaStyle, height: textareaHeight, minHeight: "100px" }}
                    onChange={(event) => {
                        handleTextareaChange(event);
                        handleInputChange("mission", event.target.value);
                    }}
                    value={clubData.mission}
                />
                <label htmlFor="kpo" style={{ ...h5Style }}>
                    KPO & KPI (Club Objectives & Performance Indicators) :
                </label>
                <textarea
                    placeholder="Describe in a few lines the objectives you wish to achieve as well as the indicators for monitoring your productivity and performance. This will allow you, but also the DVE, to measure the progress made or to be made to achieve your objectives."
                    type="text"
                    id="kpo"
                    style={{ ...inputGroup, ...textareaStyle, height: textareaHeight, minHeight: "100px" }}
                    onChange={(event) => {
                        handleTextareaChange(event);
                        handleInputChange("kpo", event.target.value);
                    }}
                    value={clubData.kpo}
                />
                <label htmlFor="image" style={{ ...h5Style }}>
                    Upload Club's logo:
                </label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e)}
                    style={{ ...inputGroup, ...inputStyle }}
                />
            </form>
        </div>
    );
}

export default ClubsInfo;
