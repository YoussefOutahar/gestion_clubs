import { formStyle, h2Style, h5Style, inputGroup, inputStyle, textareaStyle } from "./Styles";

export default PresidentInfo = () => {
    handleInputChange = (key, value) => {
    };
    return (
        <div className="container">
          <form style={formStyle}>
            <label htmlFor="presidentName" style={{ ...h5Style }}>
              President's Full Name:
            </label>
            <input
              placeholder="Enter president's full name"
              type="text"
              id="presidentName"
              style={{ ...inputGroup, ...inputStyle }}
              value={presidentData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />

            <label htmlFor="presidentField" style={{ ...h5Style }}>
              President's Field:
            </label>
            <input
              placeholder="Enter president's field"
              type="text"
              id="presidentField"
              style={{ ...inputGroup, ...inputStyle }}
              value={presidentData.field}
              onChange={(e) => handleInputChange("field", e.target.value)}
            />

            <label htmlFor="presidentYear" style={{ ...h5Style }}>
              President's Year:
            </label>
            <input
              placeholder="Enter president's year"
              type="text"
              id="presidentYear"
              style={{ ...inputGroup, ...inputStyle }}
              value={presidentData.year}
              onChange={(e) => handleInputChange("year", e.target.value)}
            />

            <label htmlFor="presidentPhone" style={{ ...h5Style }}>
              President's Phone:
            </label>
            <input
              placeholder="Enter president's phone number"
              type="text"
              id="presidentPhone"
              style={{ ...inputGroup, ...inputStyle }}
              value={presidentData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />

            <label htmlFor="presidentEmail" style={{ ...h5Style }}>
              President's Email:
            </label>
            <input
              placeholder="Enter president's email address"
              type="email"
              id="presidentEmail"
              style={{ ...inputGroup, ...inputStyle }}
              value={presidentData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </form>
        </div>
      );
};