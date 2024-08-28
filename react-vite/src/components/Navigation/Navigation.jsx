import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
// import CreateCourse from "../CreateCourse/CreateCourse";

import "./Navigation.css";
function Navigation() {

  return (
    <nav>
      <div>
        <NavLink to="/courses" className="nav-color-size">Courses</NavLink>
      </div>
      <div className="nav-right-side">
      <div>
        <NavLink to="/courses/new" className="nav-color-size">Create a Course</NavLink>
      </div>

      <div>
        <NavLink to="/home" className="nav-color-size">Captains Quarters</NavLink>
      </div>


      <div>
        <ProfileButton />
      </div>
      </div>
    </nav>
  );
}

export default Navigation;
