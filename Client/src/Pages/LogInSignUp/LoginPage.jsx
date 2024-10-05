import LoginCanvas from "../Quiz/components/LoginCanvas.jsx";
import Card from "./Card.jsx";

function LoginPage() {
    return (
        <div
            style={{
                backgroundImage:
                    "url('https://www.pixelstalk.net/wp-content/uploads/image10/Cool-4K-Space-wallpaper-with-a-beautiful-image-of-a-blue-ringed-planet-with-its-moons-set-against-a-deep-blue-starry-background.jpg')",
            }}
            className="h-screen flex justify-center px-6 py-2 bg-center bg-cover bg-no-repeat fixed"
        >
            <div className="flex w-[60vw] bg-[#004f6c] rounded-[16px]">
                <div className="canvas">
                    <LoginCanvas />
                </div>
                <div>
                    <Card isLogin={true} params="params"/>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
