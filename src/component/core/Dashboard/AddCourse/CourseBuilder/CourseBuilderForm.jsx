import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Iconbtn from '../../../../common/iconbtn';
import { IoAddCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRight } from "react-icons/fa";
import { setEditCourse, setStep, setCourse } from '../../../../../slices/courseSlice';
import { updateSection, createSection } from '../../../../../services/operations/courseDetailsAPI';
import toast from 'react-hot-toast';
import NestedView from './NestedView';

const CourseBuilderForm = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [editSection, setEditSectionName] = useState(null);
  const { course } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    setLoading(true);
    let result;

    try {
      if (editSection) {
        // Editing existing section
        result = await updateSection(
          {
            sectionName: data.sectionName,
            sectionId: editSection,
            courseId: course._id,
          },
          token
        );
      } else {
        // Creating new section
        result = await createSection(
          {
            sectionName: data.sectionName,
            courseId: course._id,
          },
          token
        );
      }

      if (result) {
        dispatch(setCourse(result));
        setEditSectionName(null);
        setValue("sectionName", "");
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setEditSectionName(null);
    setValue("sectionName", "");
  };

  const goBack = () => {
    dispatch(setStep(1));
    dispatch(setEditCourse(true));
  };

  const goToNext = () => {
    const content = course?.courseContent;

    if (!Array.isArray(content) || content.length === 0) {
      toast.error("Please add at least one section");
      return;
    }

    const emptySubsections = content.some(
      (section) => !Array.isArray(section?.subSection) || section.subSection.length === 0
    );

    if (emptySubsections) {
      toast.error("Please add at least one lecture in each section");
      return;
    }

    dispatch(setStep(3));
  };

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    if (editSection === sectionId) {
      cancelEdit();
      return;
    }
    setEditSectionName(sectionId);
    setValue("sectionName", sectionName);
  };

  return (
    <div>
      <p className="text-2xl font-semibold mb-4">Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="sectionName" className="text-sm font-medium text-white">
            Section Name <sup className="text-pink-200">*</sup>
          </label>
          <input
            type="text"
            id="sectionName"
            placeholder="Add section name"
            {...register("sectionName", { required: true })}
            className="w-full p-2 mt-1 bg-richblack-800 text-white border border-richblack-600 rounded"
          />
          {errors.sectionName && (
            <span className="text-pink-200 text-sm">Section Name is required</span>
          )}
        </div>

        <div className="mt-6 flex items-center gap-4">
          <Iconbtn
            outline={true}
            type="submit"
            text={editSection ? "Edit Section Name" : "Create Section"}
          >
            <IoAddCircleOutline color="yellow" />
          </Iconbtn>

          {editSection && (
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-richblack-300 underline"
            >
              Cancel edit
            </button>
          )}
        </div>
      </form>

      {Array.isArray(course?.courseContent) && course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={goBack}
          className="px-4 py-2 bg-richblack-700 text-white rounded hover:bg-richblack-600"
        >
          Back
        </button>
        <Iconbtn text="Next" onClick={goToNext}>
          <FaArrowRight />
        </Iconbtn>
      </div>
    </div>
  );
};

export default CourseBuilderForm;
