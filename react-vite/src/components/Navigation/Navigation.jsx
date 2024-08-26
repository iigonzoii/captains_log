import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
// import CreateCourse from "../CreateCourse/CreateCourse";

import "./Navigation.css";
function Navigation() {

  return (
    <nav>
      <div>
        <NavLink to="/home" className="white">Captains Quarters</NavLink>
      </div>
      <div>
      <NavLink to="/courses/new" className="white">Create a Course</NavLink>
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
