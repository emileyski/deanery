import { useLoaderData } from "react-router-dom";
import EnroleeAvailableSpecialtiesContainer from "./EnroleeAvailableApplicationContainer";
import EnroleeApllicationsContainer from "./EnroleeApllicationsContainer";
import { ENTRANTS_SERVICE_URL } from "../../credentials";
import axios from "axios";
import { useState } from "react";

// Mock data (replace with actual API calls)

const EnroleeApllicationsPage = () => {
  const { availableSpecialties, myApplications } = useLoaderData();

  const [searchTerm, setSearchTerm] = useState("");

  // Функция для фильтрации специальностей по названию
  const filteredSpecialties = availableSpecialties.filter((specialty) =>
    specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">
        Specialties and Applications
      </h1>

      {/* Добавьте поле ввода для поиска */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by specialty name"
          className="border rounded-lg py-2 px-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Передайте отфильтрованные специальности в контейнер */}
      <EnroleeAvailableSpecialtiesContainer specialties={filteredSpecialties} />

      {/* Display submitted applications */}
      <EnroleeApllicationsContainer applications={myApplications} />
    </div>
  );
};

export async function loader() {
  const specialties = await axios.get(`${ENTRANTS_SERVICE_URL}specialties`);

  const accessToken = localStorage.getItem("accessToken"); // Assuming you have the accessToken stored in localStorage

  const resp = await fetch(`${ENTRANTS_SERVICE_URL}applications/my`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const applications = await resp.json();

  return {
    availableSpecialties: specialties.data,
    myApplications: applications,
  };
}

export default EnroleeApllicationsPage;
