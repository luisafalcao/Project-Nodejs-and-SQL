"use client";

import { useEffect, useState } from "react";

export default function Home() {
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
      <ul>
        {alunos.map((aluno, index) => {
          return <li key={index}>{aluno.name}</li>;
        })}
      </ul>
    </main>
  );
}
