import { Link } from "react-router-dom";
import UserCard from "../features/user/UserCard";
import LinkButton from "./LinkButton";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../features/user/userSlice";

function Header() {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const userData = useSelector((state) => state.user.userData);

  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-sky-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="tracking-widest text-white">
        My Deanery
      </Link>

      {isLoggedIn && (
        <>
          {userData.roles[0] === "enrollee" && (
            <>
              <LinkButton to="/enrolee/certificate">Certificates</LinkButton>
              <LinkButton to="/enrolee/applications">Applications</LinkButton>
            </>
          )}
          {userData.roles[0] === "student" && (
            <>
              <LinkButton to="/student/questions/new">
                make question for dean
              </LinkButton>
              <LinkButton to="/student/questions/">my questions</LinkButton>
            </>
          )}
          {userData.roles[0] === "dean" && (
            <>
              <LinkButton to="/dean/specialties">specialties</LinkButton>
              <LinkButton to="/dean/applications">applications</LinkButton>
              <LinkButton to="/dean/questions">questions</LinkButton>
            </>
          )}
        </>
      )}

      <UserCard />
    </header>
  );
}

export default Header;
