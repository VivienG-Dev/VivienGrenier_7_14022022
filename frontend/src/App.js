import "./App.css";
// On "remplace" Fetch par Axios (plus simple à utiliser)
import Axios from "axios";
import { useEffect, useState } from "react";

function App() {
  // On utilise useState pour sauvegarder les données du formulaire
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [position, setPosition] = useState("");
  const [country, setCountry] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [usersList, setUsersList] = useState([]);

  // Inscription
  const [userNameReg, setUserNameReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  // Connexion
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Status de connexion (si l'utilisateur c'est bien connecté)
  const [loginStatus, setLoginStatus] = useState("");

  // Avec cette fonction on envoie l'objet de données vers le backend
  const addUser = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      gender: gender,
      position: position,
      country: country,
    }).then(() => {
      // console.log("success");
      setUsersList([
        ...usersList,
        {
          name: name,
          age: age,
          gender: gender,
          position: position,
          country: country,
        },
      ]);
    });
  };

  const getUsers = () => {
    Axios.get("http://localhost:3001/getusers").then((response) => {
      // console.log(response);
      setUsersList(response.data);
    });
  };

  const updateUserCountry = (id) => {
    Axios.put("http://localhost:3001/update", {
      country: newCountry,
      id: id,
    }).then((response) => {
      setUsersList(
        usersList.map((user) => {
          return user.id === id
            ? {
                id: user.id,
                name: user.name,
                age: user.age,
                gender: user.gender,
                position: user.position,
                country: newCountry,
              }
            : user;
        })
      );
    });
  };

  const deleteUser = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setUsersList(
        usersList.filter((user) => {
          return user.id !== id;
        })
      );
    });
  };

  Axios.defaults.withCredentials = true;
  const register = () => {
    Axios.post("http://localhost:3001/register", {
      username: userNameReg,
      password: passwordReg,
      email: emailReg,
    }).then((response) => {
      console.log(response);
    });
  };

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      password: password,
      email: email,
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        // On cible le premier élément de notre tableau et on récupère le nom de l'utilisateur
        setLoginStatus(`Bienvenue ${response.data[0].username}`);
      }
    });
  };

  const logout = () => {
    Axios.post("http://localhost:3001/logout").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(`Vous avez été déconneté`);
      }
    });
  }

  // useEffect marchera à chaque fois qu'un utilisateur refresh la page
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.loggedIn === true) {
        setLoginStatus(`Bienvenue ${response.data.user[0].username}`);
      }
    });
  }, []);

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/logout").then((response) => {
  //     if (response.data.loggedIn === false) {
  //       setLoginStatus("");
  //     }
  //   });
  // }, [setLoginStatus]);

  return (
    <div className="App">
      <div className="information">
        <h1>Incription</h1>
        <input
          type="text"
          onChange={(e) => {
            setUserNameReg(e.target.value);
          }}
          placeholder="Username..."
        />
        <input
          type="email"
          onChange={(e) => {
            setEmailReg(e.target.value);
          }}
          placeholder="Email..."
        />
        <input
          type="password"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
          placeholder="Password..."
        />
        <button onClick={register}>Inscription</button>
        <hr />
        <h1>Connexion</h1>
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email..."
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password..."
        />
        <button onClick={login}>Connexion</button>
        <button onClick={logout}>Deconnexion</button>
        <h2>{loginStatus}</h2>
        <hr />
        {/* Au changement (onChange) de la valeur dans un input, on appel une fonction qui cible la valeur de l'input et useState s'occupe de mettre cette valeur dans une variable */}
        <label>Name:</label>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <label>Gender:</label>
        <input
          type="text"
          onChange={(e) => {
            setGender(e.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
        <button onClick={addUser}>Add User</button>
        <button onClick={getUsers}>Show Users</button>

        {usersList.map((user, key) => {
          return (
            <div key={key}>
              <h3>{user.name}</h3>
              <h3>{user.age}</h3>
              <h3>{user.gender}</h3>
              <h3>{user.position}</h3>
              <h3>{user.country}</h3>
              <div>
                <input
                  type="text"
                  placeholder="Country..."
                  onChange={(e) => {
                    setNewCountry(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateUserCountry(user.id);
                  }}
                >
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteUser(user.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
