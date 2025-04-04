import { Appbar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/UserComponent";

export const Dashboard = () => {
  return <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
          <Appbar />
          <div className="h-full flex flex-col justify-center">
              <Balance value={1000} />
              <Users />
          </div>
      </div>
  </div>;
}