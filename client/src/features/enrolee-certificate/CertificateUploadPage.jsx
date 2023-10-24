import { useForm } from "react-hook-form";
import { ENTRANTS_SERVICE_URL } from "../../credentials";
import { useNavigate } from "react-router-dom";

const CertificateUploadPage = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // Отправка данных на сервер
    try {
      const formData = new FormData();
      formData.append("certificate", data.file[0]);
      formData.append("certificateType", data.certificateType);
      formData.append("grade", data.grade);

      const accessToken = localStorage.getItem("accessToken"); // Assuming you have the accessToken stored in localStorage

      // Добавьте ваш запрос на сервер здесь
      // Например, используя fetch или axios
      await fetch(`${ENTRANTS_SERVICE_URL}certificates/`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Обработка ответа сервера

      navigate("/enrolee/certificate");
    } catch (error) {
      console.error("Ошибка при отправке данных на сервер:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Upload Certificate</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="certificateType"
          >
            Certificate Type
          </label>
          <input
            {...register("certificateType", { required: true })}
            type="text"
            id="certificateType"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="grade"
          >
            Grade
          </label>
          <input
            {...register("grade", { required: true })}
            type="text"
            id="grade"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="file"
          >
            Certificate File
          </label>
          <input
            {...register("file", { required: true })}
            type="file"
            id="file"
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
        >
          Upload Certificate
        </button>
      </form>
    </div>
  );
};

export default CertificateUploadPage;
