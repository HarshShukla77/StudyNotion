import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { MdOutlineEdit, MdDelete } from "react-icons/md";
import { IoIosArrowDropdown } from "react-icons/io";
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async (sectionId) => {
    const result = await deleteSection({ sectionId, courseId: course._id, token });
    if (result) {
      dispatch(setCourse(result));
    }
    setConfirmationModal(null);
  };

 const handleDeleteSubSection = async (subSectionId, sectionId) => {
  const result = await deleteSubSection({ subSectionId, sectionId, token, courseId: course._id });

  if (result) {
    dispatch(setCourse(result));
  }

  setConfirmationModal(null);
};


  return (
    <div className="rounded-lg bg-richblack-700 p-6 px-8">
      {course?.courseContent?.map((section) => (
        <details key={section._id} open>
          <summary className="flex items-center justify-between gap-x-3 border-b-2 py-2">
            <div className="flex items-center gap-x-3">
              <RxDropdownMenu />
              <p>{section.sectionName}</p>
            </div>

            <div className="flex items-center gap-x-3">
              <button onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                <MdOutlineEdit />
              </button>
              <button
                onClick={() =>
                  setConfirmationModal({
                    text1: "Delete this Section?",
                    text2: "All the lectures in this section will be deleted",
                    btn1Text: "Delete",
                    btn2Text: "Cancel",
                    btn1Handler: () => handleDeleteSection(section._id),
                    btn2Handler: () => setConfirmationModal(null),
                  })
                }
              >
                <MdDelete />
              </button>
              <IoIosArrowDropdown className="text-xl text-richblack-300" />
            </div>
          </summary>

          <div className="space-y-2">
            {section?.subSection?.map((subSection) => (
              <div
                key={subSection?._id}
                onClick={() => setViewSubSection(subSection)}
                className="flex items-center justify-between gap-x-3 border-b-2 py-2 cursor-pointer hover:bg-richblack-600 transition-all"
              >
                <div className="flex items-center gap-x-3">
                  <RxDropdownMenu />
                  <p>{subSection.title}</p>
                </div>

                <div className="flex items-center gap-x-3">
                  <button onClick={(e) => {
                     e.stopPropagation();
                     setEditSubSection({ ...subSection, sectionId: section._id });
                  }}>
                    <MdOutlineEdit />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setConfirmationModal({
                        text1: "Delete this Sub Section?",
                        text2: "Selected lecture in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteSubSection(subSection._id, section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      });
                    }}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={() => setAddSubSection(section._id)}
              className="mt-2 flex items-center gap-x-2 text-yellow-50"
            >
              + <p>Add Lecture</p>
            </button>
          </div>
        </details>
      ))}

      {/* SubSection Modals */}
      {addSubSection && (
        <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add />
      )}
      {viewSubSection && (
        <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view />
      )}
      {editSubSection && (
        <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit />
      )}

      {/* Confirmation Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default NestedView;
