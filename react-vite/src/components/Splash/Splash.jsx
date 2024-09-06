import { useNavigate } from "react-router-dom"

import "./Splash.css"
function Splash() {
    const navigate = useNavigate()
    return (
        <div className="splash-container">
        <h1>Welcome To Captains Log!</h1>
        <h2>A place where people with wanderlust and a love for two wheels can share the treasures of their travels.</h2>
        <h3>With everything being on our phones it&#39;s easy for things to get lost or misplaced. This App&#39;s purpose is to combine your photo gallery and note pad into one place
            
        </h3>
        <ol>
            <li>
                After you gear up for your ride Chart a course with only the required info on the form.
            </li>
            <li>
                Either during or after your ride, visit Captains Quarters to find the Course you created which will be have options to update or delete.
            </li>
            <li>
                Click update to add or edit your log entry, add pictures, and points of interest that you have discovered.
            </li>
        </ol>
        <button onClick={()=> navigate("/courses") }>Enter</button>
        </div>
    )
}

export default Splash
