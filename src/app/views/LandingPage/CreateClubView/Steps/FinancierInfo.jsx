import { formStyle, h2Style, h5Style, inputGroup, inputStyle, textareaStyle } from "./Styles";

export default FinancierInfo = () => {
    handleInputChange = (key, value) => {
    };
    return (
        <div className="container">
          <form style={formStyle}>
            <label htmlFor="financierName" style={{ ...h5Style }}>
              Financier's Name:
            </label>
            <input
              placeholder="Enter financier's name"
              type="text"
              id="financierName"
              style={{ ...inputGroup, ...inputStyle }}
              value={financerData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
            <label htmlFor="financierField" style={{ ...h5Style }}>
              Field:
            </label>
            <input
              placeholder="Enter financier's field"
              type="text"
              id="financierField"
              style={{ ...inputGroup, ...inputStyle }}
              value={financerData.field}
              onChange={(e) => handleInputChange("field", e.target.value)}
            />
            <label htmlFor="financierYear" style={{ ...h5Style }}>
              Year:
            </label>
            <input
              placeholder="Enter financier's year"
              type="text"
              id="financierYear"
              style={{ ...inputGroup, ...inputStyle }}
              value={financerData.year}
              onChange={(e) => handleInputChange("year", e.target.value)}
            />
            <label htmlFor="financierPhone" style={{ ...h5Style }}>
              Phone:
            </label>
            <input
              placeholder="Enter financier's phone number"
              type="text"
              id="financierPhone"
              style={{ ...inputGroup, ...inputStyle }}
              value={financerData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />
            <label htmlFor="financierEmail" style={{ ...h5Style }}>
              Email:
            </label>
            <input
              placeholder="Enter financier's email address"
              type="email"
              id="financierEmail"
              style={{ ...inputGroup, ...inputStyle }}
              value={financerData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </form>
        </div>
      );
};