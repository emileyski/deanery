import { Link, useLoaderData } from "react-router-dom";
import CertificateItem from "./CertificateItem";
import { ENTRANTS_SERVICE_URL } from "../../credentials";

function EnroleeCertificatePage() {
  const certificates = useLoaderData();

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Enrolee Certificates</h1>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate) => (
          <CertificateItem certificate={certificate} key={certificate.id} />
        ))}

        <li className="bg-sky-300 p-6 rounded-lg shadow-md relative">
          <Link to="/enrolee/certificate/new" className="block w-full h-full">
            <span className="text-xl font-bold">Upload new certificate</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export async function loader() {
  const accessToken = localStorage.getItem("accessToken"); // Assuming you have the accessToken stored in localStorage

  const certificates = await fetch(
    `${ENTRANTS_SERVICE_URL}certificates/ent-all`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  return certificates;
}

export default EnroleeCertificatePage;
