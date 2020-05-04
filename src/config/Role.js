import Hospital from "../components/Hospital";
import Department from "../components/Department";
import Login from "../components/Login";
import Register from "../components/Register";
import ReceiveLogin from "../components/ReceiveLogin";
import Request from "../components/Request/Request";
import Reserve from "../components/Reserve/Reserve";

const totalRoute = {
  hospital: { path: "/", component: Hospital },
  department: { path: "/department", component: Department },
  login: { path: "/login", component: Login },
  register: { path: "/register", component: Register },
  ReceiveLogin: { path: "/receivelogin", component: ReceiveLogin },
  Request: { path: "/request", component: Request },
  Reserve: { path: "/reserve", component: Reserve },
};

const Role = {
  guest: {
    haveRoutes: [
      totalRoute.login,
      totalRoute.register,
      totalRoute.ReceiveLogin,
    ],
    redirect: "/login",
  },
  admin: {
    haveRoutes: [
      totalRoute.hospital,
      totalRoute.department,
      totalRoute.Request,
      totalRoute.Reserve,
    ],
    redirect: "/",
  },
};

export default Role;
