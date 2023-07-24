import { loginUser, registerUser } from '../services/user.services';

export default function UserForm () {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get('username').toString();
    const password = formData.get('password').toString();

    loginUser({ username, password })
      .then((user) => {
        console.log(user);

        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
      })
      .catch((error) => {
        console.log(error);
      });

    // registerUser({ username, password })
    //   .then((user) => {
    //     console.log(user);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="UserName" />
        <input type="password" name="password" placeholder="*******" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
