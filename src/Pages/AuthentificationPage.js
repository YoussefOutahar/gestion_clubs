import { SplitLeft, SplitRight, Center } from "../Utils/StyledElements";

function AuthentificationPage() {
    return (
        <div>
            <SplitLeft>
                <h1>Authentification Page</h1>
                <Center>
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
                </Center>
            </SplitLeft>
            <SplitRight>
                <Center>
                    <img
                        src="https://www.uir.ac.ma/upload/cbuilder/c076f4b3518ce8be7f84bb05ec8ce0b2cc0f366f.png"
                        alt="LogoBDE"
                        style={{
                            width: "90%",
                            height: "90%",
                        }}
                    />
                </Center>
            </SplitRight>
        </div>
    );
}

export default AuthentificationPage;
