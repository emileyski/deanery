import { useState } from "react";
import { STUDENTS_SERVICE_URL } from "../../credentials";
import { useLoaderData, useNavigate } from "react-router-dom";

const DeanStudentsPage = () => {
  const { groups, students } = useLoaderData();

  const navigate = useNavigate();

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentSearchQuery, setStudentSearchQuery] = useState("");
  const [groupSearchQuery, setGroupSearchQuery] = useState("");

  const handleEnrollClick = async (groupId) => {
    const studentId = selectedStudent.id;

    console.log(studentId, groupId);

    const resp = await fetch(`${STUDENTS_SERVICE_URL}students/togroup`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ studentId, groupId }),
    });

    if (resp.ok) {
      alert("Student enrolled successfully");
      setSelectedStudent(null);
      navigate("/dean/students");
    } else {
      alert("Something went wrong");
    }
  };

  const filteredStudents = students.filter((student) =>
    `${student.firstName} ${student.lastName}`
      .toLowerCase()
      .includes(studentSearchQuery.toLowerCase())
  );

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(groupSearchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-8">
      <div className="flex">
        <div className="w-1/2 pr-4">
          <h2 className="text-xl font-semibold mb-4">Students</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search students by name"
              className="border rounded-lg px-4 py-2 w-full"
              value={studentSearchQuery}
              onChange={(e) => setStudentSearchQuery(e.target.value)}
            />
          </div>
          <ul>
            {filteredStudents.map((student) => (
              <li
                key={student.id}
                className={`p-4 border rounded-lg cursor-pointer ${
                  selectedStudent?.id === student.id ? "bg-blue-100" : ""
                }`}
                onClick={() => setSelectedStudent(student)}
              >
                <p>
                  <strong>Name:</strong> {student.firstName} {student.lastName}
                </p>
                <p>
                  <strong>Group:</strong>{" "}
                  {student.group ? student.group : "Not Enrolled"}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2 pl-4">
          <h2 className="text-xl font-semibold mb-4">Groups</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search groups by name"
              className="border rounded-lg px-4 py-2 w-full"
              value={groupSearchQuery}
              onChange={(e) => setGroupSearchQuery(e.target.value)}
            />
          </div>
          <ul>
            {filteredGroups.map((group) => (
              <li key={group.id} className="p-4 border rounded-lg mb-4">
                <p>
                  <strong>Name:</strong> {group.name}
                </p>
                <button
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded mt-2"
                  onClick={() => handleEnrollClick(group.id)}
                >
                  Enroll Student
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export async function deanStudentsPageLoader() {
  const groupResp = await fetch(`${STUDENTS_SERVICE_URL}groups`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const studentsResp = await fetch(`${STUDENTS_SERVICE_URL}students`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const groups = await groupResp.json();
  const students = await studentsResp.json();

  return { groups, students };
}

export default DeanStudentsPage;
