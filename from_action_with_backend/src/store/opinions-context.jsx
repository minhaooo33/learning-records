import { createContext, useEffect, useState } from 'react';

export const OpinionsContext = createContext({
  opinions: null,
  addOpinion: (opinion) => {},
  upvoteOpinion: (id) => {},
  downvoteOpinion: (id) => {},
});

export function OpinionsContextProvider({ children }) {
  const [opinions, setOpinions] = useState([]);

  useEffect(() => {
    async function loadOpinions() {
      const response = await fetch('http://localhost:3000/opinions');
      const opinions = await response.json();
      setOpinions(opinions);
    }

    loadOpinions();
  }, []);

  async function addOpinion(enteredOpinionData) {
    const response = await fetch('http://localhost:3000/opinions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(enteredOpinionData),
    });

    if (!response.ok) {
      return;
    }

    const savedOpinion = await response.json();
    setOpinions((prevOpinions) => [savedOpinion, ...prevOpinions]);
  }

  async function upvoteOpinion(id) {
    try {
      const response = await fetch(`http://localhost:3000/opinions/${id}/upvote`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to upvote");

      setOpinions((prevOpinions) =>
        prevOpinions.map((opinion) =>
          opinion.id === id ? { ...opinion, votes: opinion.votes + 1 } : opinion
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function downvoteOpinion(id) {
    try {
      const response = await fetch(`http://localhost:3000/opinions/${id}/downvote`, {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to downvote");

      setOpinions((prevOpinions) =>
        prevOpinions.map((opinion) =>
          opinion.id === id ? { ...opinion, votes: opinion.votes - 1 } : opinion
        )
      );
    } catch (error) {
      console.error(error);
    }
  }

  const contextValue = {
    opinions: opinions,
    addOpinion,
    upvoteOpinion,
    downvoteOpinion,
  };

  return <OpinionsContext.Provider value={contextValue}>{children}</OpinionsContext.Provider>;
}
