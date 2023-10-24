import { useNavigate } from "react-router-dom";
import { STUDENTS_SERVICE_URL } from "../../credentials";

function DeanSpecialtiesPage() {
  const specialties = [
    {
      name: "Software Ingeneering",
      faculty: "Computer science",
      code: "122",
      availableForRecruitment: true,
      version: 0,
      id: "6535a0a2a54a69c1fe9cad08",
    },
    {
      name: "Право",
      faculty: "Computer science",
      code: "071",
      availableForRecruitment: true,
      version: 0,
      id: "6535a128a54a69c1fe9cad0a",
    },
    {
      name: "Право",
      faculty: "Computer science",
      code: "071",
      availableForRecruitment: true,
      version: 0,
      id: "65366cea91a48e7ba3a6ce30",
    },
    {
      name: "Інженерія програмного забезпечення",
      faculty: "Комп*ютерних наук",
      code: "125",
      availableForRecruitment: true,
      version: 0,
      id: "65366d4891a48e7ba3a6ce35",
    },
    {
      name: "Інженерія програмного забезпечення 2",
      faculty: "Комп*ютерних наук",
      code: "153",
      availableForRecruitment: true,
      version: 0,
      id: "65366d5d91a48e7ba3a6ce37",
    },
    {
      name: "Інженерія програмного забезпечення 2",
      faculty: "Комп*ютерних наук",
      code: "153",
      availableForRecruitment: true,
      version: 0,
      id: "65366d8391a48e7ba3a6ce39",
    },
    {
      name: "hgtr[hrt",
      faculty: "hgtr[hrt",
      code: "125",
      availableForRecruitment: true,
      version: 0,
      id: "65366ded91a48e7ba3a6ce3b",
    },
  ];

  const navigate = useNavigate();

  const handleAddStreamClick = async (specialtyId) => {
    const streamName = prompt("Enter the stream name:");

    const resp = await fetch(`${STUDENTS_SERVICE_URL}streams`, {
      body: JSON.stringify({ specialty: specialtyId, name: streamName }),
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
    });

    if (resp.ok) {
      alert("Stream added successfully!");
    } else {
      alert("Failed to add stream!");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Available Specialties</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {specialties.map((specialty) => (
          <div
            key={specialty.id}
            className="bg-white p-6 rounded-lg shadow-md mb-4"
          >
            <h3 className="text-lg font-semibold mb-2">{specialty.name}</h3>
            <p>{specialty.faculty}</p>
            <p>{specialty.code}</p>
            <p>
              Available for Recruitment:{" "}
              {specialty.availableForRecruitment ? "Yes" : "No"}
            </p>
            {/* Add more details or buttons as needed */}
            <button className="bg-red-500 py-1 px-3 rounded-full text-white">
              Remove
            </button>
            <button
              onClick={() => navigate(`/specialty/${specialty.id}`)}
              className="bg-sky-500 py-1 px-3 rounded-full text-white ml-2"
            >
              Streams
            </button>
            <button
              onClick={() => handleAddStreamClick(specialty.id)}
              className="bg-green-500 py-1 px-3 rounded-full text-white ml-2"
            >
              Add stream
            </button>
          </div>
        ))}
        <div
          className="bg-sky-300 p-6 rounded-lg shadow-md mb-4"
          onClick={() => navigate("/dean/specialties/new")}
        >
          <span className="text-lg">Add new specialty</span>
        </div>
      </div>
    </div>
  );
}

export default DeanSpecialtiesPage;
