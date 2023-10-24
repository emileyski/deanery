import { useState } from "react";

const group = {
  name: "PZPI-21-1g24",
  stream: "65368a9791a48e7ba3a6ce47",
  version: 0,
  id: "6536a50b50bfaee93e0fac29",
};

const students = [
  {
    firstName: "Bohdan",
    lastName: "SAgtrghort",
    version: 0,
    group: "6536a50b50bfaee93e0fac29",
    id: "65362985c948b0a7029850b8",
  },
];

const unassignedStudents = [
  {
    firstName: "Shamil",
    lastName: "Atarkov",
    version: 0,
    id: "6535a1b9c948b0a7029850b6",
  },
  {
    firstName: "Bohdan",
    lastName: "ggtr",
    version: 0,
    id: "65368bc1b7cd06ea4af92b88",
  },
];

function GroupInfo() {
  const [enrolledStudents, setEnrolledStudents] = useState(students);
  const [unassignedStudentsList, setUnassignedStudentsList] =
    useState(unassignedStudents);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEnrollClick = (student) => {
    setEnrolledStudents((prevStudents) => [...prevStudents, student]);
    setUnassignedStudentsList((prevList) =>
      prevList.filter((s) => s.id !== student.id)
    );
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
        {enrolledStudents.map((student) => (
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

export default GroupInfo;
