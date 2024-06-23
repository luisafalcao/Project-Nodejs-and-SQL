"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/usuario/logado`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsuario(data);
      });
  }, []);

  return (
    <main>
      <h2 className="page-title">Meus cursos</h2>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"></div>
    </main>
  );
}
