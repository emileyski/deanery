import { useNavigate } from "react-router-dom";
import { STUDENTS_SERVICE_URL } from "../../credentials";

const stream = {
  name: "pzpu-22",
  specialty: "6535a0a2a54a69c1fe9cad08",
  version: 0,
  id: "65368a9791a48e7ba3a6ce47",
};

const groups = [
  {
    curator: "Elena Petrovna",
    name: "PZPI-21-1g24",
    stream: "65368a9791a48e7ba3a6ce47",
    version: 0,
    id: "6536a50b50bfaee93e0fac29",
  },
  {
    name: "ghrthtr",
    stream: "65368a9791a48e7ba3a6ce47",
    version: 0,
    id: "6536a56024a8e1a1239af9d6",
  },
  {
    name: "hgrthrt",
    stream: "65368a9791a48e7ba3a6ce47",
    version: 0,
    id: "6536a5f324a8e1a1239af9ee",
  },
];

function StreamById() {
  const navigate = useNavigate();

  const handleAddGroupClick = async (groupId) => {
    const studentId = prompt("Enter student id:");
    const resp = await fetch(`${STUDENTS_SERVICE_URL}students/togroup`, {
      body: JSON.stringify({ studentId, groupId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      method: "PUT",
    });

    if (resp.ok) {
      alert("Student added to group");
    } else {
      alert("Failed to add student to group");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">{stream.name}</h1>
      <h2 className="text-lg font-semibold mb-4">Groups</h2>
      <ul className="list-disc pl-8">
        {groups.map((group) => (
          <li className="mt-2" key={group.id}>
            {group.name} | Curator: {group.curator}{" "}
            <button
              onClick={() => navigate(`/group/${group.id}`)}
              className="bg-blue-300 py-1 px-2 text-white rounded-lg"
            >
              To group
            </button>
            <button
              onClick={() => handleAddGroupClick(group.id)}
              className="bg-green-300 py-1 ml-2 px-2 text-white rounded-lg"
            >
              Put student to group
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default StreamById;
