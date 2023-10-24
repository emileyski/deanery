import { useState } from "react";
import { STUDENTS_SERVICE_URL } from "../../credentials";

const DeaneryRequestType = {
  AcademicQuestions: "AcademicQuestions",
  FinancialIssues: "FinancialIssues",
  HealthAndWellness: "HealthAndWellness",
  OrganizationalMatters: "OrganizationalMatters",
  CareerRelated: "CareerRelated",
  ConflictsAndSafety: "ConflictsAndSafety",
  TechnicalIssues: "TechnicalIssues",
  SuggestionsAndFeedback: "SuggestionsAndFeedback",
  WithdrawalRequest: "WithdrawalRequest",
};

function CreateDeanQuestionPage() {
  const [formData, setFormData] = useState({
    type: DeaneryRequestType.AcademicQuestions,
    text: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission (you can send data to the server or perform other actions)
    const request = await fetch(`${STUDENTS_SERVICE_URL}/dean-applications/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(formData),
    });

    if (request.ok) {
      alert("Request created");
      setFormData({
        type: DeaneryRequestType.AcademicQuestions,
        text: "",
      });
    } else {
      alert("Failed to create request");
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Deanery Request Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="type" className="block mb-2 font-bold">
            Request Type:
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full border rounded py-2 px-3"
          >
            {Object.values(DeaneryRequestType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block mb-2 font-bold">
            Request Text:
          </label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleInputChange}
            className="w-full border rounded py-2 px-3"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateDeanQuestionPage;
