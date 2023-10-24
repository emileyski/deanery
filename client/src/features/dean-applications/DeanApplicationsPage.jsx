import { useState } from "react";
import { ENTRANTS_SERVICE_URL } from "../../credentials";
import { useLoaderData, useNavigate } from "react-router-dom";

function DeanApplicationsPage() {
  const applications = useLoaderData();

  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleApplicationClick = (application) => {
    setSelectedApplication(application);
  };

  const navigate = useNavigate();

  const handleAcceptClick = async (applicationId) => {
    // Handle accept logic here
    console.log(applicationId);
    try {
      const resp = await fetch(
        `${ENTRANTS_SERVICE_URL}applications/apply/${applicationId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (resp.ok) {
        alert("Accepted");
        navigate("/dean/applications");
      } else {
        alert("Failed to accept");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleRejectClick = () => {
    // Handle reject logic here
  };

  const filteredApplications = applications.filter((application) =>
    `${application.entrant_firstName} ${application.entrant_lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Student Applications</h1>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Search by name"
          className="border rounded-lg py-2 px-4 mr-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredApplications.map((application) => (
          <div
            key={application.application_id}
            className={`p-4 border rounded-lg cursor-pointer ${
              selectedApplication?.application_id === application.application_id
                ? "bg-blue-100"
                : ""
            }`}
            onClick={() => handleApplicationClick(application)}
          >
            <h2 className="text-lg font-semibold">
              {application.entrant_firstName} {application.entrant_lastName}
            </h2>
            <p className="text-gray-500">
              Status: {application.application_status}
            </p>
            <p className="text-gray-500">
              Competitive Score: {application.application_competitiveScore}
            </p>
          </div>
        ))}
      </div>
      {selectedApplication && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">
            {selectedApplication.entrant_firstName}{" "}
            {selectedApplication.entrant_lastName}
          </h2>
          <p className="text-gray-500">
            Status: {selectedApplication.application_status}
          </p>
          <p className="text-gray-500">
            Competitive Score:{" "}
            {selectedApplication.application_competitiveScore}
          </p>
          <div className="mt-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mr-4"
              onClick={() =>
                handleAcceptClick(selectedApplication.application_id)
              }
            >
              Accept
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              onClick={handleRejectClick}
            >
              Reject
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export async function loader() {
  const resp = await fetch(`${ENTRANTS_SERVICE_URL}applications`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const applications = await resp.json();

  return applications;
}

export default DeanApplicationsPage;
