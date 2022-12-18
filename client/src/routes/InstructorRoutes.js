import { Routes, Route } from "react-router-dom";
import CreateCourse from "../pages/instructor/CreateCourse";
import EditProfile from "../components/instructor/EditProfile";
import ViewInstructorReviews from "../pages/instructor/ViewInstructorReviews";
import ViewInstructorCourses from "../pages/instructor/ViewInstructorCourses";
import Protected from "../components/shared/Protected";
import Layout from "../components/shared/Layout";
import CourseList from "../pages/corporateTrainee/CourseList";
export function InstructorRoutes() {
	return (
		<>
			<Protected authorizedUserType={"Instructor"}>
				<Layout />
				<Routes>
					<Route path="courses" element={<CourseList searchInInstructorCourses={false} />} />
					<Route path="createCourse" element={<CreateCourse />} />
					<Route path="editProfile" element={<EditProfile />} />
					<Route path="viewInstructorReviews" element={<ViewInstructorReviews />} />
					<Route path="viewInstructorCourses" element={<ViewInstructorCourses />} />
				</Routes>
			</Protected>
		</>
	);
}
