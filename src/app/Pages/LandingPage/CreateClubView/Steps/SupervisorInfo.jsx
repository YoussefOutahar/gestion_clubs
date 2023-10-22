import { formStyle, h5Style, inputGroup, inputStyle} from "./Styles";
import { useState } from "react";

function SuperVisorInfo() {
    const [supervisorData, setSupervisorData] = useState({
        clubName: "",
        name: "",
        function: "",
        phone: "",
        email: "",
        role_club: "Supervisor",
      });
      const handleInputChange = (key, value) => {
        setSupervisorData({ ...supervisorData, [key]: value });
    };
    return (
        <div className="container">
          <form style={formStyle}>
            <label htmlFor="superviserName" style={{ ...h5Style }}>
              Full Name :
            </label>
            <input
              placeholder="Enter full name"
              type="text"
              id="superviserName"
              style={{ ...inputGroup, ...inputStyle }}
              value={supervisorData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
            />

            <label htmlFor="function" style={{ ...h5Style }}>
              Function :
            </label>
            <input
              placeholder="Enter function"
              type="text"
              id="function"
              style={{ ...inputGroup, ...inputStyle }}
              value={supervisorData.function}
              onChange={(e) => handleInputChange("function", e.target.value)}
            />

            <label htmlFor="phone" style={{ ...h5Style }}>
              Phone :
            </label>
            <input
              placeholder="Enter phone number"
              type="text"
              id="phone"
              style={{ ...inputGroup, ...inputStyle }}
              value={supervisorData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
            />

            <label htmlFor="email" style={{ ...h5Style }}>
              Email :
            </label>
            <input
              placeholder="Enter email address"
              type="email"
              id="email"
              style={{ ...inputGroup, ...inputStyle }}
              value={supervisorData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </form>
        </div>
      );
}

export default SuperVisorInfo;