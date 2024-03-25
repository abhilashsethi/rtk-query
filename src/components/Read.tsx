import { NavLink } from "react-router-dom";
import { useDeleteStudentMutation, useGetStudentsQuery } from "../features/studentSlice";

const Read = () => {
  const { data: students, isSuccess, isError, error, isLoading } = useGetStudentsQuery();
  console.log(students);
  const [deleteStudent] = useDeleteStudentMutation();

  const handleDelete = (id: string) => {
    deleteStudent(id);
  };

  return (
    <div className="container mx-auto">
      <h2>Read Operation</h2>
      <div className="row">
        {isLoading && <span>Loading...</span>}
        {isError && <span>Something went wrong</span>}
        {students?.map((item, id) => (
          <div key={id} className="col-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item?.studentName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{item?.studentEmail}</h6>
                <button className="card-link">
                  <NavLink to={`edit/${item?.id}`}>Edit</NavLink>
                </button>
                <button onClick={() => handleDelete(item?.id)} className="card-link">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Read;
