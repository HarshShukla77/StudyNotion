import React, { useEffect, useState } from "react";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import ProgressBar from "@ramonak/react-progress-bar";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

const EnrolledCourses = () => {
    const { token } = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const [loading, setLoading] = useState(true);

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            console.log("Enrolled Courses in Component:", response); // Debugging
            setEnrolledCourses(response);
        } catch (err) {
            console.log("Error fetching enrolled courses:", err);
        } finally {
            setLoading(false); // Ensure loading is set to false
        }
    };

    useEffect(() => {
        getEnrolledCourses();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="#fff" size={50} />
            </div>
        );
    }
    return (
        <div className="text-white">
            <div className="text-[2.5rem]" >Enrolled Courses</div>
            {!enrolledCourses || enrolledCourses.length === 0 ? (
                <p>You have not enrolled in any course yet</p>
            ) : (
                <div>
                    <div className="flex justify-between">
                        <p>Course Name</p>
                        <p>Duration</p>
                        <p>Progress</p>
                    </div>
                    {enrolledCourses.map((course, index) => (
                        <div key={index} className="flex justify-between items-center my-4">
                            <div className="flex items-center gap-4">
                                <img
                                    src={course.thumbnail}
                                    alt={course.courseName}
                                    className="w-16 h-16 object-cover rounded"
                                />
                                <div>
                                    <p className="font-semibold">{course.courseName}</p>
                                    <p className="text-sm text-gray-400">{course.courseDescription}</p>
                                </div>
                            </div>
                            <div>{course?.totalDuration}</div> 
                            <div className="w-1/3">
                                <p>Progress: {course.progressPercentage || 0}%</p>
                                <ProgressBar
                                    completed={course.progressPercentage || 0}
                                    height="8px"
                                    isLabelVisible={false}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EnrolledCourses;