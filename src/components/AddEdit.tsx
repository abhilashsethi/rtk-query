import React, { useEffect, useState } from "react";
import { Student } from "../model/student.model";
import {
  useAddStudentMutation,
  useGetStudentQuery,
  useGetStudentsQuery,
  useUpdateStudentMutation,
} from "../features/studentSlice";
import { useNavigate, useParams } from "react-router-dom";

const AddEdit = () => {
  const [students, setStudents] = useState<Student>(Object);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [addStudent] = useAddStudentMutation();
  const [updateStudent] = useUpdateStudentMutation();
  // const { refetch } = useGetStudentsQuery();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetStudentQuery(id!);
  console.log(data);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudents({ ...students, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    if (id && data) {
      setEditMode(true);
      setStudents({ ...data });
    } else {
      setEditMode(false);
    }
  }, [id, data]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editMode) {
      await updateStudent(students);
    } else {
      await addStudent(students);
    }
    // refetch();
    navigate("/");
    setEditMode(false);
  };

  return (
    <div className="container mx-auto">
      <h2>{editMode ? "Update Form" : "Add Form"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Student Name</label>
          <input
            name="studentName"
            type="text"
            onChange={handleChange}
            value={students?.studentName || ""}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Student Email</label>
          <input
            name="studentEmail"
            type="text"
            onChange={handleChange}
            value={students?.studentEmail || ""}
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editMode ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddEdit;
