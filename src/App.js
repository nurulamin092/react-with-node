import { useEffect, useState } from 'react';
import './App.css';
function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);
  const handleAddUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };
    // data post server
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),

    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data];
        setUsers(newUsers)
        console.log(data);
      });
  }
  return (
    <div className="App">

      <h3>My own data:{users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='Name' required />
        <input type='text' name='email' placeholder='Email' required />
        <input type="submit" value="Add User" />
      </form>
      {
        users.map(user => <ul key={user.id}>
          <li> id: {user.id} name: {user.name} Email : {user.email}</li>
        </ul>)
      }
    </div>

  );
}

export default App;
