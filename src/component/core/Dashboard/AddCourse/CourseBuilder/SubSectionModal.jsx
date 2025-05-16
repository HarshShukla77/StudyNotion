import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import Upload from '../Upload';
import { RxCross1 } from "react-icons/rx";
import Iconbtn from '../../../../common/iconbtn';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

const SubSectionModal = ({ modalData, setModalData, add = false, view = false, edit = false }) => {
  const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);

  // Prefill form for edit/view
  useEffect(() => {
    if (view || edit) {
      setValue("lectureTitle", modalData.title);
      setValue("lectureDesc", modalData.description);
      setValue("lectureVideo", modalData.videoUrl);
    }
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    return (
      currentValues.lectureTitle !== modalData.title ||
      currentValues.lectureDesc !== modalData.description ||
      currentValues.lectureVideo !== modalData.videoUrl
    );
  }

  const handleEditSubSection = async () => {
    const currentValues = getValues();
    const formData = new FormData();

    formData.append("sectionId", modalData.sectionId);
    formData.append("subSectionId", modalData._id);

    if (currentValues.lectureTitle !== modalData.title) {
      formData.append("title", currentValues.lectureTitle);
    }
    if (currentValues.lectureDesc !== modalData.description) {
      formData.append("description", currentValues.lectureDesc);
    }
    if (currentValues.lectureVideo !== modalData.videoUrl) {
      formData.append("video", currentValues.lectureVideo);
    }

    setLoading(true);
    const result = await updateSubSection(formData, token);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === result._id ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  const onSubmit = async (data) => {
    if (view) return;

    if (edit) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form");
      } else {
        await handleEditSubSection();
      }
      return;
    }

    // Add new sub-section
    const formData = new FormData();
    formData.append("sectionId", modalData); // ✅ Fixed
    formData.append("title", data.lectureTitle);
    formData.append("description", data.lectureDesc);
    formData.append("video", data.lectureVideo);

    setLoading(true);
    const result = await createSubSection(formData, token);
    if (result) {
      const updatedCourseContent = course.courseContent.map((section) =>
        section._id === result._id ? result : section
      );
      const updatedCourse = { ...course, courseContent: updatedCourseContent };
      dispatch(setCourse(updatedCourse));
    }
    setModalData(null);
    setLoading(false);
  };

  return (
    <div className="  fixed inset-0 bg-black bg-opacity-60 z-[1000] grid place-items-center overflow-y-auto">
      <div className="w-11/12 max-w-[700px] bg-richblack-800 p-6 rounded-lg border border-richblack-200">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-semibold text-richblack-5">
            {view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture
          </p>
          <button onClick={() => !loading && setModalData(null)}>
            <RxCross1 className="text-2xl text-richblack-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Upload
            name="lectureVideo"
            label="Lecture Video"
            register={register}
            setValue={setValue}
            errors={errors}
            video={true}
            viewData={view ? modalData.videoUrl : null}
            editData={edit ? modalData.videoUrl : null}
          />

          {/* Lecture Title */}
          <div className="my-4">
            <label htmlFor="lectureTitle" className="block text-sm mb-1 text-richblack-5">Lecture Title <sup className="text-pink-200">*</sup></label>
            <input
              type="text"
              id="lectureTitle"
              placeholder="Enter Lecture Title"
              disabled={view || loading}
              {...register("lectureTitle", { required: true })}
              className="w-full text-richblack-800 font-medium p-2 form-style"
            />
            {errors.lectureTitle && (
              <span className="text-xs text-pink-200">Lecture Title is required</span>
            )}
          </div>

          {/* Lecture Description */}
          <div className="my-4">
            <label htmlFor="lectureDesc" className="block text-sm mb-1 text-richblack-5">Lecture Description <sup className="text-pink-200">*</sup></label>
            <textarea
              id="lectureDesc"
              disabled={view || loading}
              placeholder="Enter Lecture Description"
              {...register("lectureDesc", { required: true })}
              className="w-full form-style min-h-[130px] text-richblack-800 font-medium p-2 resize-none"
            />
            {errors.lectureDesc && (
              <span className="text-xs text-pink-200">Lecture Description is required</span>
            )}
          </div>

          {/* Submit Button */}
          {!view && (
            <div className="flex justify-end">
              <Iconbtn
                disabled={loading}
                text={loading ? "Loading..." : edit ? "Save Changes" : "Save"}
              />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SubSectionModal;
