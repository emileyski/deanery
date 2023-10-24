import { useState } from "react";

// Enum for Deanery Request Status
const DeaneryRequestStatus = {
  Pending: "Pending",
  InProgress: "InProgress",
  Resolved: "Resolved",
  Rejected: "Rejected",
};

const requests = [
  {
    submittedBy: {
      firstName: "Shamil",
      lastName: "Atarkov",
      version: 0,
      id: "6535a1b9c948b0a7029850b6",
    },
    text: "some htrhthrt",
    type: "AcademicQuestions",
    status: "Pending",
    submissionDate: "2023-10-23T18:50:56.115Z",
    version: 0,
    id: "6536c090d3d549409c60e76e",
  },
  {
    submittedBy: {
      firstName: "Shamil",
      lastName: "Atarkov",
      version: 0,
      id: "6535a1b9c948b0a7029850b6",
    },
    text: "some htrhthrt",
    type: "AcademicQuestions",
    status: "Pending",
    submissionDate: "2023-10-23T18:50:59.992Z",
    version: 0,
    id: "6536c093d3d549409c60e770",
  },
  {
    submittedBy: {
      firstName: "Shamil",
      lastName: "Atarkov",
      version: 0,
      id: "6535a1b9c948b0a7029850b6",
    },
    text: "some htrhthrt",
    type: "AcademicQuestions",
    status: "Pending",
    submissionDate: "2023-10-23T18:51:00.888Z",
    version: 0,
    id: "6536c094d3d549409c60e772",
  },
];

const DeaneryRequestsPage = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [verdict, setVerdict] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [searchName, setSearchName] = useState("");

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleVerdictChange = (event) => {
    setVerdict(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchName(event.target.value);
  };

  const filteredRequests = requests.filter(
    (request) =>
      request.submittedBy.firstName
        .toLowerCase()
        .includes(searchName.toLowerCase()) ||
      request.submittedBy.lastName
        .toLowerCase()
        .includes(searchName.toLowerCase())
  );

  const handleSetVerdict = (requestId) => {
    // Set the verdict and status for the selected request
    // You can handle the state update and API call here
    console.log(`Setting verdict for request ${requestId}:`, {
      status: selectedStatus,
      verdict,
    });
    // Clear the input fields and selected request
    setSelectedStatus("");
    setVerdict("");
    setSelectedRequestId(null);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Deanery Requests</h2>
      <div className="mb-4">
        <label className="mr-2">Search by Name:</label>
        <input
          type="text"
          value={searchName}
          onChange={handleSearchChange}
          className="border rounded py-1 px-2"
        />
      </div>
      <ul>
        {filteredRequests.map((request) => (
          <li key={request.id} className="mb-4">
            <p>
              <strong>Submitted by:</strong> {request.submittedBy.firstName}{" "}
              {request.submittedBy.lastName}
            </p>
            <p>
              <strong>Text:</strong> {request.text}
            </p>
            <p>
              <strong>Type:</strong> {request.type}
            </p>
            <p>
              <strong>Status:</strong> {request.status}
            </p>
            <p>
              <strong>Submission Date:</strong>{" "}
              {new Date(request.submissionDate).toLocaleString()}
            </p>

            {/* Verdict input fields */}
            {selectedRequestId === request.id && (
              <div className="mt-2">
                <select
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className="mr-2 border rounded py-1 px-2"
                >
                  <option value="">Select Status</option>
                  {Object.values(DeaneryRequestStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Verdict"
                  value={verdict}
                  onChange={handleVerdictChange}
                  className="border rounded py-1 px-2"
                />
                <button
                  onClick={() => handleSetVerdict(request.id)}
                  className="bg-blue-500 text-white rounded py-1 px-2 ml-2"
                >
                  Set Verdict
                </button>
                <button
                  onClick={() => setSelectedRequestId(null)}
                  className="bg-red-500 text-white rounded py-1 px-2 ml-2"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Button to show/hide verdict input fields */}
            {!selectedRequestId && (
              <button
                onClick={() => setSelectedRequestId(request.id)}
                className="bg-green-500 text-white rounded py-1 px-2 mt-2"
              >
                Set Verdict
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeaneryRequestsPage;
