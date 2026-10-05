const API_URL = "http://localhost:3000/students";

// GET: Display all students
async function getStudents() {

  try {

    const response = await fetch(API_URL);
    const students = await response.json();
    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach(student => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.branch}</td>
                <td>${student.marks}</td>

                <td>
                    <button onclick="updateStudent('${student.id}')">
                        Update
                    </button>

                    <button onclick="deleteStudent('${student.id}')">
                        Delete
                    </button>
                </td>
            `;
      table.appendChild(row);
    });

  } catch (error) {
    console.error("Error:", error);
    alert("Unable to fetch student records.");
  }
}


// POST: Add a new student
async function addStudent() {

  const name = document.getElementById("name").value;
  const branch = document.getElementById("branch").value;
  const marks = document.getElementById("marks").value;

  if (name === "" || branch === "" || marks === "") {
    alert("Please enter all student details.");
    return;
  }

  const student = {
    name: name,
    branch: branch,
    marks: Number(marks)
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(student)
    });

    if (response.ok) {
      alert("Student added successfully.");

      document.getElementById("name").value = "";
      document.getElementById("branch").value = "";
      document.getElementById("marks").value = "";

      getStudents();
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Unable to add student.");
  }
}


// PUT: Update student
async function updateStudent(id) {

  try {
    // Get current student details
    const response = await fetch(`${API_URL}/${id}`);
    const student = await response.json();

    // Ask for updated values
    const name = prompt("Enter student name:", student.name);

    if (name === null) {
      return;
    }

    const branch = prompt("Enter branch:", student.branch);

    if (branch === null) {
      return;
    }

    const marks = prompt("Enter marks:", student.marks);

    if (marks === null) {
      return;
    }

    



    const updatedStudent = {
	name: name,
      branch: branch,
      marks: Number(marks)
    };

    // Update using PUT
    const updateResponse = await fetch(`${API_URL}/${id}`, {  
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(updatedStudent)
    });

    if (updateResponse.ok) {
      alert("Student updated successfully.");
      getStudents();
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Unable to update student.");
  }
}


// DELETE: Delete student
async function deleteStudent(id) {

  const confirmDelete = confirm(
    "Are you sure you want to delete this student?"
  );

  if (!confirmDelete) {
    return;
  }

  try {

    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    if (response.ok) {
      alert("Student deleted successfully.");
      getStudents();
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Unable to delete student.");
  }
}

// Load students when page opens
getStudents();
