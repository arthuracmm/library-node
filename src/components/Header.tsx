import { Search } from "lucide-react";

export function Header() {
    const getLinkClass = (path: string) => {
        return location.pathname === path
            ? 'visible'
            : 'hidden';
    };
    return (
        <div className="flex fixed z-1000 flex-1 justify-center bg-zinc-100 p-2 top-0 w-screen shadow-md items-center">
            <form className={`flex gap-2 bg-zinc-100 h-12 rounded-md items-center pl-4 p-2 shadow-md border-1 border-zinc-200 ${getLinkClass('/')}`}>
                <input type="text" placeholder="Buscar..." className="outline-none text-sm w-80 " />
                <button type="submit" className="cursor-pointer text-white bg-orange-500 p-2 px-4 rounded-lg hover:bg-orange-400 transition">
                    <Search />
                </button>
            </form>
            <h1 className={`${getLinkClass('/new-book')} text-xl font-bold flex gap-2 bg-zinc-100 h-12 items-center pl-4 p-2 border-zinc-200`}>Adicionando Livro</h1>
            <h1 className={`${getLinkClass('/new-author')} text-xl font-bold flex gap-2 bg-zinc-100 h-12 items-center pl-4 p-2 border-zinc-200`}>Adicionando Autor</h1>
            <h1 className={`${getLinkClass('/new-user')} text-xl font-bold flex gap-2 bg-zinc-100 h-12 items-center pl-4 p-2 border-zinc-200`}>Adicionando Usuario</h1>
            <h1 className={`${getLinkClass('/new-loan')} text-xl font-bold flex gap-2 bg-zinc-100 h-12 items-center pl-4 p-2 border-zinc-200`}>Adicionando Emprestimo</h1>
            <h1 className={`${getLinkClass('/return')} text-xl font-bold flex gap-2 bg-zinc-100 h-12 items-center pl-4 p-2 border-zinc-200`}>Devoluções</h1>
            <h1 className={`${getLinkClass('/available')} text-xl font-bold flex gap-2 bg-zinc-100 h-12 items-center pl-4 p-2 border-zinc-200`}>Disponiveis</h1>
            <h1 className={`${getLinkClass('/borrowed')} text-xl font-bold flex gap-2 bg-zinc-100 h-12 items-center pl-4 p-2 border-zinc-200`}>Emprestados</h1>
        </div>
    )
}