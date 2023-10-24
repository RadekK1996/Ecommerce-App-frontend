import { Register } from "../../components/register";
import { Login } from "../../components/login";

export const AuthPage = () => {
  return (
    <div className="auth">
      <Register /> <Login />
    </div>
  );
};
