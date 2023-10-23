export const AuthPage = () => {
  return (
    <div className="auth">
      <Register /> <Login />
    </div>
  );
};

const Register = () => {
  return (
    <div className="auth-container">
      <form>
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type=" text" id="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const Login = () => {
  return <div>Login</div>;
};
