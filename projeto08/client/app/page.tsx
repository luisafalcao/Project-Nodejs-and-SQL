"use client";

import { useEffect, useState } from "react";
// import PORT from "../../server/server";

export default function Home() {
  // const [message, setMessage] = useState("Loading...");
  const [alunos, setAlunos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.alunos);
        setAlunos(data.alunos);
      });
  }, []);

  return (
    <main>
      {/* <h2>{message}</h2> */}
      <ul>
        {alunos.map((aluno, index) => {
          return <li key={index}>{aluno.name}</li>;
        })}
      </ul>
    </main>
  );
}
