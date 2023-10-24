import { useLoaderData, useNavigate } from "react-router-dom";
import { STUDENTS_SERVICE_URL } from "../../credentials";

function StreamsBySpecialtyPage() {
  const { specialty, streams } = useLoaderData();

  const handleAddGroupClick = async (streamId) => {
    const groupName = prompt("Enter group name");
    const resp = await fetch(`${STUDENTS_SERVICE_URL}groups`, {
      body: JSON.stringify({ streamId, name: groupName }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      method: "POST",
    });

    if (resp.ok) {
      alert("Group added");
    } else {
      alert("Failed to add group");
    }
  };

  const navigate = useNavigate();

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">{specialty.name}</h1>
      <p className="text-gray-500 mb-4">
        Faculty: {specialty.faculty} | Code: {specialty.code}
      </p>
      <p className="text-gray-500 mb-4">
        Available for recruitment:{" "}
        {specialty.availableForRecruitment ? "Yes" : "No"}
      </p>
      <h2 className="text-lg font-semibold mb-4">Streams</h2>
      <ul className="list-disc pl-8">
        {streams.map((stream) => (
          <li className="flex mt-2" key={stream.id}>
            <span>{stream.name}</span>
            <button
              onClick={() => navigate(`/stream/${stream.id}`)}
              className="ml-4 bg-sky-500 text-white rounded-md py-2 px-2"
            >
              Groups list
            </button>
            <button
              onClick={() => handleAddGroupClick(stream.id)}
              className="ml-4 bg-green-500 text-white rounded-md py-2 px-2"
            >
              Add group
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function loader({ params }) {
  const resp = await fetch(`${STUDENTS_SERVICE_URL}specialities/${params.id}`);

  const data = await resp.json();

  return data;
}

export default StreamsBySpecialtyPage;
