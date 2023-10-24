import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { STUDENTS_SERVICE_URL } from "../../credentials";

// eslint-disable-next-line react/prop-types
function CoefficientSelect({ index, handleCoefficientChange }) {
  return (
    <div key={index} className="mb-2">
      <label
        htmlFor={`certificateType${index}`}
        className="block mb-2 font-bold"
      >
        Certificate type:
      </label>
      <select
        id={`certificateType${index}`}
        className="w-full border rounded py-2 px-3"
        onChange={(e) =>
          handleCoefficientChange(index, "certificateType", e.target.value)
        }
      >
        <option value="">Select a certificate type</option>
        <option value="zno:history">ЗНО: Історія</option>
        <option value="zno:math">ЗНО: Математика</option>
        <option value="zno:ukrainian">ЗНО: Українська мова і література</option>
        <option value="zno:english">ЗНО: Англійська мова</option>
        <option value="sertificate:school">Шкільний атестат</option>
      </select>
      <label htmlFor={`coefficient${index}`} className="block mb-2 font-bold">
        Coefficient:
      </label>
      <input
        type="text"
        id={`coefficient${index}`}
        className="w-full border rounded py-2 px-3"
        onChange={(e) =>
          handleCoefficientChange(
            index,
            "coefficient",
            parseFloat(e.target.value)
          )
        }
      />
    </div>
  );
}

function AddSpecialtyPage() {
  const [name, setName] = useState("");
  const [faculty, setFaculty] = useState("");
  const [code, setCode] = useState("");
  const [coeficients, setCoeficients] = useState([
    { certificateType: "", coefficient: "" },
    { certificateType: "", coefficient: "" },
    { certificateType: "", coefficient: "" },
    { certificateType: "", coefficient: "" },
  ]);

  const navigate = useNavigate();

  const handleCoefficientChange = (index, field, value) => {
    const newCoeficients = [...coeficients];
    newCoeficients[index][field] = value;
    setCoeficients(newCoeficients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { name, faculty, code, coeficients };
    //в этой части кода нужно отправить данные на сервер методом post прикрепив аксесс токен
    // console.log(data);

    const accessToken = localStorage.getItem("accessToken");

    const resp = await fetch(`${STUDENTS_SERVICE_URL}specialities/`, {
      body: JSON.stringify(data),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${accessToken}`,
      },
    });

    if (resp.status === 200) {
      alert("Specialty added successfully!");
      navigate("/dean/specialties");
    }
  };

  return (
    <Form method="POST" className="p-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 font-bold">
          Name:
        </label>
        <input
          type="text"
          id="name"
          className="w-full border rounded py-2 px-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="faculty" className="block mb-2 font-bold">
          Faculty:
        </label>
        <input
          type="text"
          id="faculty"
          className="w-full border rounded py-2 px-3"
          value={faculty}
          onChange={(e) => setFaculty(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="code" className="block mb-2 font-bold">
          Code:
        </label>
        <input
          type="text"
          id="code"
          className="w-full border rounded py-2 px-3"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <span className="text-lg font-bold">Coefficients</span>
        {coeficients.map((coeficient, index) => (
          <CoefficientSelect
            key={index}
            index={index}
            handleCoefficientChange={handleCoefficientChange}
          />
        ))}
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </Form>
  );
}

export default AddSpecialtyPage;
