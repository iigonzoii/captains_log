import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
function Navigation() {

  return (
    <nav>
      <div>
        <NavLink to="/home" className="white">Captains Quarters</NavLink>
      </div>
      <div>
        <NavLink to="/courses" className="white">Courses</NavLink>
      </div>
      <div>
        <ProfileButton />
      </div>
    </nav>
  );
}

export default Navigation;
