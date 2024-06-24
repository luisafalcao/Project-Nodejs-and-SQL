export default function Navbar() {
  return (
    <ul className="flex mb-6 p-6 border-b">
      <li className="mr-6 pb-0 mr-auto">
        <div className="flex items-center flex-shrink-0 text-blue mr-6">
          <svg
            className="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
          </svg>
          <span className="font-semibold text-xl tracking-tight">Cursos</span>
        </div>
      </li>
      <li className="mr-6 pb-0 content-center">
        <a className="text-blue-500 hover:text-blue-800" href="#">
          Cursos
        </a>
      </li>
      <li className="mr-6 pb-0 content-center">
        <a className="text-blue-500 hover:text-blue-800" href="#">
          Cadastrar
        </a>
      </li>
      <li className="mr-6 pb-0 content-center">
        <a className="text-blue-500 hover:text-blue-800" href="#">
          Entrar
        </a>
      </li>
    </ul>
  );
}
