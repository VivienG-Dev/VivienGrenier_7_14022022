import "./App.css";
// On "remplace" Fetch par Axios (plus simple à utiliser)
import Axios from "axios";
import { useState } from "react";

function App() {
  // On utilise useState pour sauvegarder les données du formulaire
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [position, setPosition] = useState("");
  const [country, setCountry] = useState("");

  const [newCountry, setNewCountry] = useState("");

  const [usersList, setUsersList] = useState([]);

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

  return (
    <div className="App">
      <div className="information">
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
