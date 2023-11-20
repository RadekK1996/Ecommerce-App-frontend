import { Register } from "../../components/register/register";
import { Login } from "../../components/login/login";

export const AuthPage = () => {
  return (
    <div className="auth">
      <Register /> <Login />
    </div>
  );
};
