import RenderSteps from "./RenderSteps"
export default function AddCourse(){
    return (
        <>
        <div className="text-white flex gap-7  " >
            <div className="min-w-[550px] ">
                <h1>Add Course</h1>
                <div>
                    <RenderSteps></RenderSteps>
                </div>
            </div>
            <div className="  top-10 hidden max-w-[400px] flex-1 max-h-[500px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6 xl:block">
          <p className="mb-8 text-lg text-richblack-5">⚡ Course Upload Tips</p>
          <ul className="ml-5 list-item list-disc space-y-4 text-xs text-richblack-5">
                <li> Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create and organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Announcements to notify any important</li> 
                <li>Notes to all enrolled students at once.</li>
                </ul>
            </div>
        </div>
        </>
    )
}
