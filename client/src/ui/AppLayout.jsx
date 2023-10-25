import Header from "./Header";
import Loader from "./Loader";
// import CartOverview from "../features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import { fetchUserData } from "../features/user/userSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const dispatch = useDispatch();
  // const userData = useSelector((state) => state.user.userData);
  // const navigate = useNavigate();

  useEffect(
    function () {
      dispatch(fetchUserData());
      // if (!userData) navigate("/login");
    },
    [dispatch]
  );
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />

      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>

      {/* <CartOverview /> */}
    </div>
  );
}

export default AppLayout;
