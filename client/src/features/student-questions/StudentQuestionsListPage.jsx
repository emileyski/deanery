import { useLoaderData } from "react-router-dom";
import { STUDENTS_SERVICE_URL } from "../../credentials";

const StudentQuestionsListPage = () => {
  const onDelete = (id) => {};
  const onEdit = (id) => {};

  const requests = useLoaderData();

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Deanery Request List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {requests.map((request) => (
          <div key={request.id} className="bg-white p-6 rounded-lg shadow-md">
            <p>
              <strong>Submitted by:</strong> {request.submittedBy}
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
            <div className="mt-4">
              <button
                onClick={() => onEdit(request.id)}
                className="bg-blue-500 text-white rounded py-1 px-2 mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(request.id)}
                className="bg-red-500 text-white rounded py-1 px-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function loader() {
  const response = await fetch(`${STUDENTS_SERVICE_URL}dean-applications/my`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const data = await response.json();
  return data;
}

export default StudentQuestionsListPage;
