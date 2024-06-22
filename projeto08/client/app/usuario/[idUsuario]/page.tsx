"use client";

import { useEffect, useState } from "react";
import Curso from "@/components/curso";
import { MeusCursos } from "@/lib/methods";
import type { Curso as CursoType } from "@/lib/mockup";

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
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* { MeusCursos.map( (curso : CursoType) => <Curso data={ curso } key={ curso.id } /> ) } */}
      </div>
    </main>
  );
}
