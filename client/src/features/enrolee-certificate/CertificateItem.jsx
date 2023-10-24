/* eslint-disable react/prop-types */
import { formatCertificateName } from "../../utils";

function CertificateItem({ certificate }) {
  return (
    <li className="bg-white p-6 rounded-lg shadow-md relative">
      <h2 className="text-lg font-semibold mb-2">
        {formatCertificateName(certificate.certificateType)}
      </h2>
      <p className="text-gray-600">Grade: {certificate.grade}</p>
      {/* Buttons */}
      <div className="absolute top-0 right-0 m-2 space-x-2">
        <button
          className="text-blue-500 hover:underline"
          onClick={() => handleEdit(certificate.id)}
        >
          Edit
        </button>
        <button
          className="text-red-500 hover:underline"
          onClick={() => handleDelete(certificate.id)}
        >
          Delete
        </button>
      </div>
      {/* Add more details or styling as needed */}
    </li>
  );
}

export default CertificateItem;
