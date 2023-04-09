import { useSelector } from "react-redux";

const useAuth = () => {
  const auth = useSelector((state) => state.auth);
  if (auth?.accessToken && auth?.user) {
    if (auth?.user?.role === "student") {
      return "student";
    } else {
      return "admin";
    }
  } else {
    return false;
  }
};
export default useAuth;
