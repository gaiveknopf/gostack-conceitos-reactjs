import api from "../src/services/api";
import React from "react";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = React.useState([]);

  React.useEffect(() => {
    api.get("/repositories").then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: `Curso Rocketseat ${Date.now()}`,
      url: "https://github.com/gaiveknopf/gostack-conceitos-nodejs",
      techs: ["nodejs", "reacjs", "react-native"],
    });

    setRepositories([...repositories, response.data]);
    console.log(response.data);
  }

  async function handleRemoveRepository(id, itemIndex) {
    const response = await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter((item, index) => index !== itemIndex));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((rep, index) => (
          <li key={rep.id}>
            {rep.title}
            <button onClick={() => handleRemoveRepository(rep.id, index)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
