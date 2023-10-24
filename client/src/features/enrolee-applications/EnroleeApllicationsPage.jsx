import { useLoaderData } from "react-router-dom";
import EnroleeAvailableSpecialtiesContainer from "./EnroleeAvailableApplicationContainer";
import EnroleeApllicationsContainer from "./EnroleeApllicationsContainer";
import { ENTRANTS_SERVICE_URL } from "../../credentials";
import axios from "axios";

// Mock data (replace with actual API calls)

const EnroleeApllicationsPage = () => {
  const { availableSpecialties, myApplications } = useLoaderData();

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">
        Specialties and Applications
      </h1>

      <EnroleeAvailableSpecialtiesContainer
        specialties={availableSpecialties}
      />

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
