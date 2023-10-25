import { redirect, useLoaderData, useNavigate } from "react-router-dom";
import { STUDENTS_SERVICE_URL } from "../../credentials";

function DeanSpecialtiesPage() {
  const specialties = useLoaderData();

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

  const handleRemoveSpecialtyClick = async (specialtyId) => {
    const sure = confirm("Are you sure you want to remove this specialty?");
    if (!sure) return;

    const resp = await fetch(
      `${STUDENTS_SERVICE_URL}specialities/${specialtyId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    if (resp.ok) {
      alert("Specialty removed successfully!");
      window.location.reload();
    } else {
      alert("Failed to remove specialty!");
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
            <button
              onClick={() => handleRemoveSpecialtyClick(specialty.id)}
              className="bg-red-500 py-1 px-3 rounded-full text-white"
            >
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

export async function deanSpecialtiesPageLoader() {
  const resp = await fetch(`${STUDENTS_SERVICE_URL}specialities`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  if (resp.ok) {
    const specialties = await resp.json();
    console.log(specialties);
    return specialties;
  } else {
    return redirect("/login");
  }
}

export default DeanSpecialtiesPage;
