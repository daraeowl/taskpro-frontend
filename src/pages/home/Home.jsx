import { Timeline } from "flowbite-react";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Tecnologías Utilizadas</h1>

      <Timeline>
        <Timeline.Item>
          <Timeline.Point />
          <Timeline.Content>
            <Timeline.Title>
              .NET Core 8 para las API protegidas con JWT
            </Timeline.Title>
            <Timeline.Body>
              Utilizamos .NET Core 8 para desarrollar las API que están
              protegidas con JSON Web Tokens (JWT), brindando seguridad y
              autenticación en nuestras aplicaciones.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point />
          <Timeline.Content>
            <Timeline.Title>Frontend con React</Timeline.Title>
            <Timeline.Body>
              Desarrollamos el frontend de nuestras aplicaciones utilizando
              React, una biblioteca de JavaScript de código abierto mantenido
              por Facebook, que nos permite crear interfaces de usuario
              interactivas y de alta calidad.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point />
          <Timeline.Content>
            <Timeline.Title>Base de Datos SQL</Timeline.Title>
            <Timeline.Body>
              Utilizamos una base de datos SQL para almacenar y administrar los
              datos de nuestras aplicaciones de manera eficiente y segura.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item>
          <Timeline.Point />
          <Timeline.Content>
            <Timeline.Title>Máquina Virtual de Windows</Timeline.Title>
            <Timeline.Body>
              Todas nuestras aplicaciones se ejecutan en una máquina virtual de
              Windows, lo que nos proporciona un entorno de desarrollo y
              despliegue confiable y escalable.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
