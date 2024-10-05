import LoginCanvas from "../Quiz/components/LoginCanvas.jsx";
import Card from "./Card.jsx";
import styles from "./LoginPage.module.css";

// function LoginPage() {
//     return (
//         <div
//             style={{
//                 backgroundImage:
//                     "url('https://www.pixelstalk.net/wp-content/uploads/image10/Cool-4K-Space-wallpaper-with-a-beautiful-image-of-a-blue-ringed-planet-with-its-moons-set-against-a-deep-blue-starry-background.jpg')",
//             }}
//             className="h-screen flex justify-center items-center bg-center bg-cover bg-no-repeat"
//         >
//             <div className="flex w-[80vw] max-w-[1200px] bg-[#004f6c] rounded-[16px] overflow-hidden shadow-lg">
//                 {/* Canvas section */}
//                 <div className="flex-1">
//                     <LoginCanvas />
//                 </div>
//                 {/* Card section */}
//                 <div className="flex-none w-[300px] p-4">
//                     <Card isLogin={true} params="params" />
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default LoginPage;


function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className="w-[50%]">
          <div className="h-full w-full">
            <LoginCanvas />
            </div>
        </div>
          <Card isLogin={true} params="params" />
      </div>
    </div>
  )
}

export default LoginPage