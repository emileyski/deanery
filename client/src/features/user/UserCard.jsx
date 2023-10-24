import { useSelector } from "react-redux";
import { getIsLoggedIn } from "./userSlice";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";

function UserCard() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const userData = useSelector((state) => state.user.userData);

  const navigate = useNavigate();

  return (
    <div className="hidden text-sm font-semibold md:block">
      {isLoggedIn ? (
        <div onClick={() => navigate("/user")} className="flex items-center">
          <img
            src={
              userData.picture ||
              "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
            }
            className="mr-2 h-10 w-10 rounded-full"
            alt="User"
          />
          <span>
            {userData.firstName} {userData.lastName}
            <span
              className={`inline-block bg-sky-600 rounded-full px-2 py-1 text-sm font-semibold text-white relative top-[-0.5em]`}
            >
              {userData.roles[0]}
            </span>
          </span>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Button type="small-light" to="/login">
            Log in
          </Button>
          <Button type="small-light" to="/signup">
            Sign up
          </Button>
        </div>
      )}
    </div>
  );
}

export default UserCard;
