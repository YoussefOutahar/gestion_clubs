import { formStyle, h2Style, h5Style, inputGroup, inputStyle, textareaStyle } from "./Styles";

export default SecretaryInfo = () => {

    handleInputChange = (key, value) => {
    };

    return (
        <div className="container">
          <form style={formStyle}>
            <label htmlFor="secretaryName" style={{ ...h5Style }}>
              Secretary Name:
            </label>
            <input
              placeholder="Enter Secretary's name"
              type="text"
              id="secretaryName"
              style={{ ...inputGroup, ...inputStyle }}
              value={secretaryData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />

            <label htmlFor="secretaryField" style={{ ...h5Style }}>
              Secretary Field:
            </label>
            <input
              placeholder="Enter Secretary's field"
              type="text"
              id="secretaryField"
              style={{ ...inputGroup, ...inputStyle }}
              value={secretaryData.field}
              onChange={(e) => handleInputChange("field", e.target.value)}
            />

            <label htmlFor="secretaryYear" style={{ ...h5Style }}>
              Secretary Year:
            </label>
            <input
              placeholder="Enter Secretary's year"
              type="text"
              id="secretaryYear"
              style={{ ...inputGroup, ...inputStyle }}
              value={secretaryData.year}
              onChange={(e) => handleInputChange("year", e.target.value)}
            />

            <label htmlFor="secretaryPhone" style={{ ...h5Style }}>
              Secretary Phone:
            </label>
            <input
              placeholder="Enter Secretary's phone"
              type="text"
              id="secretaryPhone"
              style={{ ...inputGroup, ...inputStyle }}
              value={secretaryData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />

            <label htmlFor="secretaryEmail" style={{ ...h5Style }}>
              Secretary Email:
            </label>
            <input
              placeholder="Enter Secretary's email"
              type="email"
              id="secretaryEmail"
              style={{ ...inputGroup, ...inputStyle }}
              value={secretaryData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </form>
        </div>
      );
};