import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/students";

function App() {

  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [marks, setMarks] = useState("");

  const [editId, setEditId] = useState(null);


  // GET students
  const getStudents = async () => {

    const response = await fetch(API_URL);

    const data = await response.json();

    setStudents(data);
  };


  // Load students when application starts
  useEffect(() => {

    getStudents();

  }, []);


  // Add or Update student
  const handleSubmit = async (event) => {

    event.preventDefault();

    const student = {
      name: name,
      branch: branch,
      marks: Number(marks)
    };

    if (editId) {
      await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
      });
      alert("Student updated successfully");
      setEditId(null);
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
      });
      alert("Student added successfully");
    }
    clearForm();
    getStudents();
  };

  // Load student data into form
  const editStudent = (student) => {
    setEditId(student._id);
    setName(student.name);
    setBranch(student.branch);
    setMarks(student.marks);
  };


  // Delete student
  const deleteStudent = async (id) => {
    const confirmation =
      window.confirm(
        "Are you sure you want to delete this student?"
      );
    if (!confirmation) {
      return;
    }

    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    alert("Student deleted successfully");
    getStudents();
  };

  // Clear form
  const clearForm = () => {
    setName("");
    setBranch("");
    setMarks("");
    setEditId(null);
  };
  return (
    <div className="container">
      <h1>Student Management System</h1>
      <div className="form-container">
        <h2>
          {editId
            ? "Update Student"
            : "Add Student"}
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Student Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />
          <input
            type="text"
            placeholder="Branch"
            value={branch}
            onChange={(e) =>
              setBranch(e.target.value)
            }
            required
          />
          <input
            type="number"
            placeholder="Marks"
            value={marks}
            onChange={(e) =>
              setMarks(e.target.value)
            }
            required
          />
          <button type="submit">

            {editId
              ? "Update Student"
              : "Add Student"}
          </button>
          <button
            type="button"
            onClick={clearForm}
          >
            Clear
          </button>
        </form>
      </div>
      <div className="table-container">
        <h2>Student Records</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Branch</th>
              <th>Marks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.branch}</td>
                <td>{student.marks}</td>
                <td>
                  <button
                    onClick={() =>
                      editStudent(student)
                    }
                  >
                    Update
                  </button>
                  <button
                    onClick={() =>
                      deleteStudent(
                        student._id
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default App;
