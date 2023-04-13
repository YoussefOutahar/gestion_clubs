import { SplitLeft , SplitRight , Centered } from "../Utils/StyledElements";

function AuthentificationPage() {
    
    return (
        <div>
            <h1>Authentification Page</h1>
            <div>
            <SplitLeft>
            <Centered>
            <form>
                    <label>
                        Email:
                        <input type="text" name="email" />
                    </label>
                    <label>
                        Password:
                        <input type="text" name="password" />
                    </label>
                    <input type="submit" value="Submit" />

                </form>
            </Centered>
            </SplitLeft>
            <SplitRight>
                    <Centered>
                        <h1>Image</h1>
                    </Centered>
            </SplitRight>
            </div>
            
        </div>
    );
}

export default AuthentificationPage;
