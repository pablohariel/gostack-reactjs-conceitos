import React, { useState, useEffect } from "react";

import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const repository = {
      title: "Default Title",
      url: "github.com",
      techs: ["tech-1", "tech-2"]
    };

    const response = await api.post("repositories", repository);
    if(response.status !== 201 && response.status !== 200) return;
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if(repositoryIndex < 0) return;
    const response = await api.delete(`repositories/${id}`);
    if(response.status !== 204) return;

    let updatedRepositories = [...repositories];
    updatedRepositories.splice(repositoryIndex, 1);
    setRepositories(updatedRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
