import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function App() {

  const navigate = useNavigate();
  
  useEffect(() => {
    navigate("/landingPage");
    //TODO: handle session navigation 
    
  }, []);

  return (
    <>
    </>
  );
}

export default App;
