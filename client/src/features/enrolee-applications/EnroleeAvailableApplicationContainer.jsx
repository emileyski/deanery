/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { ENTRANTS_SERVICE_URL } from "../../credentials";
import { formatCertificateName } from "../../utils";

function EnroleeAvailableSpecialtiesContainer({ specialties }) {
  const navigate = useNavigate();

  const handleApply = (specialty) => {
    if (window.confirm(`Apply for ${specialty.name}?`)) {
      const accessToken = localStorage.getItem("accessToken");
      const data = { specialtyId: specialty.id };

      fetch(`${ENTRANTS_SERVICE_URL}applications/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(() => {
          navigate("/enrolee/applications");
        })
        .catch((error) => {
          alert("There was a problem with the fetch operation:", error);
        });
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Available Specialties</h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <p className="text-sm font-semibold mt-2">Coefficients:</p>
            <ul className="list-disc ml-6">
              {specialty.coefficients.map((coefficient) => (
                <li key={coefficient.id}>
                  {formatCertificateName(coefficient.certificateType)}:{" "}
                  {coefficient.coefficient}
                </li>
              ))}
            </ul>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
              onClick={() => handleApply(specialty)}
            >
              Apply
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default EnroleeAvailableSpecialtiesContainer;
