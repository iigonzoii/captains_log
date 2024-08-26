import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
// import CourseMapper from '../components/AllCoursesPage/CourseMapper';
import AllCoursesPage from '../components/AllCoursesPage/AllCoursesPage';
import CaptainsQuarters from '../components/CaptainsQuarters';
import CreateCourse from '../components/CreateCourse';
import UpdateCourse from '../components/UpdateCourse/UpdateCourse';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <h1>Sploosh!</h1>,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "/courses",
        element: <AllCoursesPage />,
      },
      {
        path: "/home",
        element: <CaptainsQuarters />,
      },
      {
        path: '/courses/new',
        element: <CreateCourse />
      },
      {
        path:"/courses/:course_id/edit",
        element: <UpdateCourse />
      }
    ],
  },
]);
