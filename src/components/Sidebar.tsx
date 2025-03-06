import { BookCopy, BookDown, BookPlus, BookUp, Home, Pencil, UserRoundPlus } from "lucide-react";
import { Link, useLocation } from 'react-router-dom';

export function SideBar() {
  const location = useLocation(); // Obtém a rota atual

  const getLinkClass = (path: string) => {
    return location.pathname === path 
      ? 'text-orange-500 visible'
      : 'text-gray-700 hover:bg-gray-200'; 
  };

  return (
    <div className="flex flex-col w-55 top-16 bottom-2 h-[90%] mt-4 py-5 gap-2 text-sm text-zinc-600 bg-zinc-100 items-center rounded-lg shadow-md fixed overflow-y-auto">
      <div>
        <h1 className="font-bold text-xl text-black">Library</h1>
      </div>
      <Link to="/" className={`flex gap-3 hover:bg-zinc-200 w-45 items-center justify-start p-2 rounded-lg cursor-pointer transi mt-5 relative ${getLinkClass('/')}`}>
      <div className={`w-1 h-[50%] rounded-lg left-0 bg-orange-500 absolute invisible ${getLinkClass('/')}`}/>
        <Home />
        <p>Home</p>
      </Link>

      <Link to="/new-book" className={`flex gap-3 hover:bg-zinc-200 w-45 items-center justify-start p-2 rounded-lg cursor-pointer transi relative ${getLinkClass('/new-book')}`}>
      <div className={`w-1 h-[50%] rounded-lg left-0 bg-orange-500 absolute invisible ${getLinkClass('/new-book')}`}/>
        <BookPlus />
        <p>Novo Livro</p>
      </Link>

      <Link to="/new-author" className={`flex gap-3 hover:bg-zinc-200 w-45 items-center justify-start p-2 rounded-lg cursor-pointer transi relative ${getLinkClass('/new-author')}`}>
      <div className={`w-1 h-[50%] rounded-lg left-0 bg-orange-500 absolute invisible ${getLinkClass('/new-author')}`}/>
        <Pencil />
        <p>Novo Autor</p>
      </Link>

      <Link to="/new-user" className={`flex gap-3 hover:bg-zinc-200 w-45 items-center justify-start p-2 rounded-lg cursor-pointer transi relative ${getLinkClass('/new-user')}`}>
      <div className={`w-1 h-[50%] rounded-lg left-0 bg-orange-500 absolute invisible ${getLinkClass('/new-user')}`}/>
        <UserRoundPlus />
        <p>Novo Usuario</p>
      </Link>

      <Link to="/available" className={`flex gap-3 hover:bg-zinc-200 w-45 items-center justify-start p-2 rounded-lg cursor-pointer transi relative ${getLinkClass('/available')}`}>
      <div className={`w-1 h-[50%] rounded-lg left-0 bg-orange-500 absolute invisible ${getLinkClass('/available')}`}/>
        <BookCopy />
        <p>Disponiveis</p>
      </Link>

      <Link to="/new-loan" className={`flex gap-3 hover:bg-zinc-200 w-45 items-center justify-start p-2 rounded-lg cursor-pointer transi relative ${getLinkClass('/new-loan')}`}>
      <div className={`w-1 h-[50%] rounded-lg left-0 bg-orange-500 absolute invisible ${getLinkClass('/new-loan')}`}/>
        <BookUp />
        <p>Novo Emprestimo</p>
      </Link>

      <Link to="/return" className={`flex gap-3 hover:bg-zinc-200 w-45 items-center justify-start p-2 rounded-lg cursor-pointer transi relative ${getLinkClass('/return')}`}>
      <div className={`w-1 h-[50%] rounded-lg left-0 bg-orange-500 absolute invisible ${getLinkClass('/return')}`}/>
        <BookDown />
        <p>Nova Devolução</p>
      </Link>

    </div>
  );
}
