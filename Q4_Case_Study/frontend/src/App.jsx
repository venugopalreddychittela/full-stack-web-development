import { useEffect, useState } from "react";
import "./style.css";

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000")
  .replace(/\/$/, "") + "/api";

const emptyForm = {
  rollNo: "",
  name: "",
  department: "Computer Science and Engineering",
  semester: 5,
  gpa: 8.5,
  email: ""
};

export default function App() {
  const [students, setStudents] = useState([]);
  const [summary, setSummary] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Quick department update modal/state for Q4(c) demonstration
  const [quickUpdateRoll, setQuickUpdateRoll] = useState("");
  const [newDept, setNewDept] = useState("Artificial Intelligence & Data Science");

  async function loadData() {
    setLoading(true);
    try {
      const [studentsRes, summaryRes] = await Promise.all([
        fetch(`${API}/students`),
        fetch(`${API}/reports/department-summary`)
      ]);
      if (studentsRes.ok) {
        const studentData = await studentsRes.json();
        setStudents(studentData);
      }
      if (summaryRes.ok) {
        const summaryData = await summaryRes.json();
        setSummary(summaryData);
      }
    } catch (err) {
      setMessage("Could not load data from API. Please verify the backend is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "semester" || name === "gpa" ? Number(value) : value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const url = editingId ? `${API}/students/${editingId}` : `${API}/students`;
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || data.error || "Save failed");

      setMessage(editingId ? "Student updated successfully!" : "Student registered successfully!");
      setForm(emptyForm);
      setEditingId(null);
      await loadData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  }

  function startEdit(student) {
    setEditingId(student._id);
    setForm({
      rollNo: student.rollNo,
      name: student.name,
      department: student.department,
      semester: student.semester,
      gpa: student.gpa,
      email: student.email
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function removeStudent(id, rollNo) {
    if (!window.confirm(`Are you sure you want to delete student ${rollNo}?`)) return;
    try {
      const res = await fetch(`${API}/students/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Delete failed");
      setMessage(`Student record (${rollNo}) deleted successfully.`);
      await loadData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  }

  // Fast Update Department handler demonstrating Q4(c)
  async function handleQuickDeptUpdate(e) {
    e.preventDefault();
    if (!quickUpdateRoll) {
      setMessage("Please enter a student roll number.");
      return;
    }
    try {
      const res = await fetch(`${API}/students/${quickUpdateRoll}/department`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ department: newDept })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      setMessage(`Department for ${quickUpdateRoll} successfully updated to "${newDept}".`);
      setQuickUpdateRoll("");
      await loadData();
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  }

  const totalStudents = students.length;
  const overallAvgGpa = totalStudents
    ? (students.reduce((acc, s) => acc + (Number(s.gpa) || 0), 0) / totalStudents).toFixed(2)
    : "0.00";

  return (
    <main className="container">
      <header className="header">
        <div className="badge">Course: Full-Stack Web Development | Unit V</div>
        <h1>Student Management System</h1>
        <p className="subtitle">
          CRUD Operations & Aggregation with MongoDB Atlas, Express.js, React & Node.js
        </p>
        <div className="student-badge">
          Candidate Roll No: <strong>A24126552078</strong> | Allocated Question: <strong>Q4 (MongoDB Operations)</strong>
        </div>
      </header>

      {/* Metrics Cards */}
      <section className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">TOTAL STUDENTS</span>
          <span className="stat-value">{totalStudents}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">OVERALL AVERAGE GPA</span>
          <span className="stat-value">{overallAvgGpa} / 10.0</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">DEPARTMENTS ENROLLED</span>
          <span className="stat-value">{summary.length}</span>
        </div>
      </section>

      {message && (
        <div className={`alert-box ${message.startsWith("Error") ? "error" : "success"}`}>
          {message}
          <button className="close-btn" onClick={() => setMessage("")}>×</button>
        </div>
      )}

      {/* Student Form (Create / Edit) */}
      <section className="card">
        <h2>{editingId ? "Edit Student Details" : "Add New Student Record (Q4-a: Insert)"}</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            ROLL NUMBER
            <input
              name="rollNo"
              value={form.rollNo}
              onChange={handleChange}
              placeholder="e.g. A24126552078"
              required
              disabled={!!editingId}
            />
          </label>
          <label>
            STUDENT NAME
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Venugopal R"
              required
            />
          </label>
          <label>
            DEPARTMENT
            <select name="department" value={form.department} onChange={handleChange} required>
              <option value="Computer Science and Engineering">Computer Science and Engineering</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Electronics and Communication">Electronics and Communication</option>
              <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
            </select>
          </label>
          <label>
            SEMESTER
            <input
              type="number"
              name="semester"
              value={form.semester}
              onChange={handleChange}
              min="1"
              max="8"
              required
            />
          </label>
          <label>
            GPA (0.0 - 10.0)
            <input
              type="number"
              step="0.01"
              name="gpa"
              value={form.gpa}
              onChange={handleChange}
              min="0"
              max="10"
              required
            />
          </label>
          <label>
            EMAIL ADDRESS
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="student@college.edu"
              required
            />
          </label>
          <div className="button-group">
            <button type="submit" className="btn btn-primary">
              {editingId ? "Save Changes" : "Insert Student"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Quick Update Section for Q4(c) */}
      <section className="card highlight-card">
        <h3>Quick Update: Change Student's Department (Q4-c)</h3>
        <p className="hint">
          Directly demonstrates: <code>db.students.updateOne(&#123; rollNo &#125;, &#123; $set: &#123; department &#125; &#125;)</code>
        </p>
        <form onSubmit={handleQuickDeptUpdate} className="quick-update-form">
          <input
            type="text"
            placeholder="Enter Student Roll No (e.g. A24126552078)"
            value={quickUpdateRoll}
            onChange={(e) => setQuickUpdateRoll(e.target.value)}
            required
          />
          <select value={newDept} onChange={(e) => setNewDept(e.target.value)}>
            <option value="Computer Science and Engineering">Computer Science and Engineering</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Electronics and Communication">Electronics and Communication</option>
            <option value="Artificial Intelligence & Data Science">Artificial Intelligence & Data Science</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
          </select>
          <button type="submit" className="btn btn-warning">Update Department</button>
        </form>
      </section>

      {/* Student Records Table (Q4-b: Retrieve All) */}
      <section className="card">
        <div className="card-header-flex">
          <h2>Student Records in MongoDB (Q4-b: Retrieve All)</h2>
          <button onClick={loadData} className="btn btn-sm">Refresh List</button>
        </div>
        {loading && <p>Loading student records...</p>}
        {!loading && students.length === 0 && <p>No student records found in database.</p>}
        {students.length > 0 && (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Roll No</th>
                  <th>Student Name</th>
                  <th>Department</th>
                  <th>Semester</th>
                  <th>GPA</th>
                  <th>Email</th>
                  <th>Actions (Q4-c, Q4-d)</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id} className={s.rollNo === "A24126552078" ? "my-row" : ""}>
                    <td><strong>{s.rollNo}</strong></td>
                    <td>{s.name}</td>
                    <td><span className="badge-dept">{s.department}</span></td>
                    <td>Sem {s.semester}</td>
                    <td><strong>{Number(s.gpa).toFixed(2)}</strong></td>
                    <td>{s.email}</td>
                    <td className="actions-cell">
                      <button className="btn btn-sm btn-outline" onClick={() => startEdit(s)}>
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeStudent(s._id, s.rollNo)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Aggregation Summary Report */}
      <section className="card">
        <h2>Department-wise Aggregation Summary ($group & $avg)</h2>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Department</th>
                <th>Enrolled Students</th>
                <th>Average GPA</th>
                <th>Max GPA</th>
                <th>Min GPA</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((row) => (
                <tr key={row._id}>
                  <td><strong>{row._id}</strong></td>
                  <td>{row.studentCount}</td>
                  <td>{Number(row.averageGpa || 0).toFixed(2)}</td>
                  <td>{Number(row.highestGpa || 0).toFixed(2)}</td>
                  <td>{Number(row.lowestGpa || 0).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
