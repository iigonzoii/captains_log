import { NavLink,  } from "react-router-dom";
// useNavigate
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { fetchCourses } from "../../redux/courseReducer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Navigation() {
  let courseData = useSelector((state) => state.course);
  // courseData = Object.values(courseData)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);
  console.log("COURSEFETCHDATA",courseData)

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
{/* {console.log("YEET YEET YEET SKRRR")} */}
      <li>
        <ProfileButton />
      </li>
    </ul>
  );
}

export default Navigation;
