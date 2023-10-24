import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUserData } from "./userSlice";

function UserPage() {
  const userData = useSelector((state) => state.user.userData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { firstName, lastName, email, birthDate, roles } = userData;

  const handleLogout = () => {
    localStorage.clear();
    dispatch(clearUserData());
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img
        src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
        alt="User Profile"
        className="w-32 h-32 rounded-full mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">
        {firstName} {lastName}
      </h1>
      <p className="text-gray-600 mb-4">{email}</p>
      <p className="text-gray-600 mb-4">
        Date of Birth: {new Date(birthDate).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-4">Roles: {roles.join(", ")}</p>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default UserPage;
