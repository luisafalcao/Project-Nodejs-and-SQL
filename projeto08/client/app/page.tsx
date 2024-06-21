"use client";

import { useEffect, useState } from "react";
// import { Container, Row, Col } from "react-grid-system";

export default function Home() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.usuarios);
        setUsuarios(data.usuarios);
      });
  }, []);

  return (
    <main>
      {/* <Container>
        <Row>
          <Col sm={4}>One of three columns</Col>
          <Col sm={4}>One of three columns</Col>
          <Col sm={4}>One of three columns</Col>
        </Row>
      </Container> */}
      <ul>
        {usuarios.map((usuario, index) => {
          return <li key={index}>{usuario.name}</li>;
        })}
      </ul>
    </main>
  );
}
