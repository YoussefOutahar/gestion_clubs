import { Box, Button, Autocomplete, TextField } from "@material-ui/core";
import { formStyle, h5Style, inputGroup, inputStyle, textareaStyle } from "./Styles";
import MatxLoading from "../../../../components/MatxLoading";
import { useState } from "react";
import ClubsService from "../../../../DataBase/services/ClubsService";
import { useEffect } from "react";

function ClubsInfo({ extractClubId, handleNext }) {
    const [clubData, setClubData] = useState({
        name: "",
        date_creation: new Date(),
        mission: "",
        kpo: "",
        logo: "",
        nb_member: 4,
        id_category: 1,
        type: "",
        state: "pending",
    });

    const [categories, setCategories] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const categories = await ClubsService.getAllCategories();
            setCategories(categories);
        };
        fetchCategories();
    }, []);

    const [category, setCategory] = useState(null);

    const handleCategoryChange = (event) => {};

    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file); // Set the selected image here
        }
    };

    const [textAreaHeight, setTextareaHeight] = useState("auto");
    const handleTextareaChange = (event) => {
        event.target.style.height = "auto";
        event.target.style.height = event.target.scrollHeight + "px";
        setTextareaHeight(event.target.style.height);
    };

    const handleInputChange = (key, value) => {
        setClubData({ ...clubData, [key]: value });
    };

    const save = async () => {
        const club = await ClubsService.addClub(clubData);
        console.log(club);

        extractClubId(club.id);

        if (selectedImage) await ClubsService.addClubLogo(club.id, selectedImage);
    };

    const [loading, setLoading] = useState(false);

    return (
        <>
            {loading ? (
                <MatxLoading />
            ) : (
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
                            style={{
                                ...inputGroup,
                                ...textareaStyle,
                                height: textAreaHeight,
                                minHeight: "100px",
                            }}
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
                            style={{
                                ...inputGroup,
                                ...textareaStyle,
                                height: textAreaHeight,
                                minHeight: "100px",
                            }}
                            onChange={(event) => {
                                handleTextareaChange(event);
                                handleInputChange("kpo", event.target.value);
                            }}
                            value={clubData.kpo}
                        />
                        <label htmlFor="type" style={{ ...h5Style }}>
                            Club type :
                        </label>
                        <select
                            id="type"
                            style={{ ...inputGroup, ...inputStyle }}
                            value={clubData.type}
                            onChange={(e) => handleInputChange("type", e.target.value)}
                        >
                            <option value="educatif">educatif</option>
                            <option value="non-educatif">non-educatif</option>
                        </select>
                        {categories && (
                            <Autocomplete
                                value={category}
                                onChange={(e) => handleCategoryChange(e)}
                                options={categories.map((option) => option.category_name)}
                                renderInput={(params) => (
                                    <TextField {...params} label="Category" variant="outlined" />
                                )}
                            />
                        )}
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
                    <Box pt={2}>
                        <Button
                            sx={{ ml: 2 }}
                            variant="contained"
                            color="primary"
                            onClick={async () => {
                                setLoading(true);
                                await save();
                                handleNext();
                                setLoading(false);
                            }}
                        >
                            Next
                        </Button>
                    </Box>
                </div>
            )}
        </>
    );
}

export default ClubsInfo;
