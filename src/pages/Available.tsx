import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { useState, useEffect } from "react";
import api from "../api";

export function Available() {
    const [livros, setLivros] = useState<{ titulo: string, quantidade: number, autor: string }[]>([]);
    const [livrosSemEstoque, setLivrosSemEstoque] = useState<{ titulo: string, quantidade: number, autor: string }[]>([])

    const fetchLivrosComEstoque = async () => {
        try {
            const response = await api.get('/livros');
            const livrosComEstoque = response.data.filter((livro: { quantidade: number }) => livro.quantidade > 0);
            setLivros(livrosComEstoque);
        } catch (error) {
            console.error('Erro ao buscar livros:', error);
        }
    };

    const fetchLivrosSemEstoque = async () => {
        try {
            const response = await api.get('/livros');
            const livrosSemEstoque = response.data.filter((livro: { quantidade: number }) => livro.quantidade === 0);
            setLivrosSemEstoque(livrosSemEstoque);
        } catch (error) {
            console.error('Erro ao buscar livros:', error);
        }
    };

    useEffect(() => {
        fetchLivrosComEstoque();
        fetchLivrosSemEstoque();
    }, []);


    return (
        <>
            <div className="flex gap-4 h-full">
                <Header />
                <div className="flex flex-1 w-full p-4 gap-4">
                    <SideBar />
                    <div className="flex flex-col gap-4 pl-60 justify-center w-full">
                        <div className="flex mt-16 bg-zinc-100 p-4 rounded-md w-full h-full shadow-md ">
                            <div className="flex flex-col gap-4">
                                <h1 className="text-2xl font-bold">Livros disponíveis</h1>
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-xl font-bold">Livros com estoque</h2>
                                    <div className="flex w-auto h-0.5 bg-green-500" />
                                    <ul className="flex flex-wrap gap-2">
                                        {livros.map(livro => (
                                            <li key={livro.titulo} className="flex flex-col truncate w-50 bg-zinc-200 p-2 rounded-md items-center relative">
                                                <img src="https://rseat.pics/" alt="capa" className="size-50 object-cover" />
                                                <div className="flex flex-col pl-2">
                                                    <p className="font-bold w-50 truncate">{livro.titulo}</p>
                                                    <p className="text-sm w-50 truncate">{livro.autor}</p>
                                                    <p className="absolute top-4 right-4 rounded-full bg-green-500 px-2 text-white text-center">{livro.quantidade} uni.</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <h2 className="text-xl font-bold">Livros sem estoque</h2>
                                    <div className="flex w-auto h-0.5 bg-red-500" />
                                    <ul className="flex flex-wrap gap-2">
                                        {livrosSemEstoque.map(livro => (
                                            <li key={livro.titulo} className="flex flex-col truncate w-50 bg-zinc-200 p-2 rounded-md items-center relative">
                                            <img src="https://rseat.pics/" alt="capa" className="size-50 object-cover" />
                                            <div className="flex flex-col pl-2">
                                                <p className="font-bold w-50 truncate">{livro.titulo}</p>
                                                <p className="text-sm w-50 truncate">{livro.autor}</p>
                                                <p className="absolute top-4 right-4 rounded-full bg-green-500 px-2 text-white text-center">{livro.quantidade} uni.</p>
                                            </div>
                                        </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}