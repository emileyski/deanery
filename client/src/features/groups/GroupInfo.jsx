import { useState } from "react";
import { STUDENTS_SERVICE_URL } from "../../credentials";
import { redirect, useLoaderData } from "react-router-dom";

function GroupInfo() {
  const { group, students, unassignedStudents } = useLoaderData();

  const [unassignedStudentsList, setUnassignedStudentsList] =
    useState(unassignedStudents);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEnrollClick = async (student) => {
    const sure = confirm("Are you sure you want to enroll this student?");
    if (!sure) return;

    const resp = await fetch(`${STUDENTS_SERVICE_URL}students/togroup`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId: student.id, groupId: group.id }),
    });

    if (resp.ok) {
      alert("Student enrolled successfully!");
      window.location.reload();
    } else {
      alert("Failed to enroll student!");
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUnassignedStudents = unassignedStudentsList.filter((student) =>
    `${student.firstName} ${student.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">{group.name}</h1>
      <h2 className="text-lg font-semibold mb-4">Students</h2>
      <ul className="list-disc pl-8">
        {students.map((student) => (
          <li key={student.id}>
            {student.firstName} {student.lastName}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4">Unassigned Students</h2>
        <input
          type="text"
          placeholder="Search by name"
          className="mb-4 border rounded py-2 px-3"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <ul className="list-disc pl-8">
          {filteredUnassignedStudents.map((student) => (
            <li className="mt-1" key={student.id}>
              {student.firstName} {student.lastName}
              <button
                className="bg-green-500 py-1 px-3 rounded-full text-white ml-2"
                onClick={() => handleEnrollClick(student)}
              >
                Enroll
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export async function groupByIdLoader({ params }) {
  const groupResp = await fetch(`${STUDENTS_SERVICE_URL}groups/${params.id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const studsResp = await fetch(`${STUDENTS_SERVICE_URL}students/free`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (groupResp.ok && studsResp.ok) {
    const data = await groupResp.json();
    const students = await studsResp.json();
    return { ...data, unassignedStudents: students };
  } else {
    return redirect("/dean/specialties");
  }
}

export default GroupInfo;
