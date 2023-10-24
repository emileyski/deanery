import { useNavigate } from "react-router-dom";
import { ENTRANTS_SERVICE_URL } from "../../credentials";

/* eslint-disable react/prop-types */
function EnroleeApllicationsContainer({ applications }) {
  const navigate = useNavigate();

  const handleCancel = (application) => {
    const confirmCancel = window.confirm(
      `Cancel application for ${application.specialty_name}?`
    );
    if (confirmCancel) {
      const accessToken = localStorage.getItem("accessToken");
      fetch(
        `${ENTRANTS_SERVICE_URL}applications/my/${application.application_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          navigate("/enrolee/applications");
        })
        .catch((error) => {
          alert("There was a problem with the fetch operation:", error);
        });
    }
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Your Applications</h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {applications.map((application) => (
          <div
            key={application.application_id}
            className="bg-white p-6 rounded-lg shadow-md mb-4"
          >
            <h3 className="text-lg font-semibold mb-2">
              {application.specialty_code} {application.specialty_name}
            </h3>
            <p>Status: {application.application_status}</p>
            <p>Competitive Score: {application.application_competitiveScore}</p>
            <button
              className="bg-red-500 mt-1 text-white px-4 py-2 rounded"
              onClick={() => handleCancel(application)}
            >
              Cancel
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default EnroleeApllicationsContainer;
