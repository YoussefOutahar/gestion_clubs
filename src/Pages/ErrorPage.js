import { useRouteError } from "react-router-dom";
import { Button, Result } from "antd";

export default function ErrorPage() {
    const error = useRouteError();

    function handleBackHome() {
        window.location.href = "/";
    }

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Button type="primary" onClick={handleBackHome}>Back Home</Button>}
        />
    );
}
