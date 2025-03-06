import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { useEffect, useState } from 'react';
import api from "../api";

export function Home() {
    interface Livro {
        titulo: string;
        autor: string;
        ano_publicacao: string;
    }

    const [livro, setLivro] = useState<Livro[]>([]);
    interface Emprestimo {
        livro: string;
        usuario: string;
        data_emprestimo: string;
    }

    const [emprestimo, setEmprestimo] = useState<Emprestimo[]>([]);

    useEffect(() => {
        api.get('/livros')
            .then(response => {
                setLivro(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar usuários:', error);
            });
    }, []);

    useEffect(() => {
        api.get('/emprestimos')
            .then(response => {
                setEmprestimo(response.data);
            })
            .catch(error => {
                console.error('Erro ao carregar usuários:', error);
            });
    }, []);

    return (
        <>
            <div className="flex  bg-zinc-200 font-poppin gap-4 ">
                <Header />
                <div className="flex p-4 bg-zinc-200 font-poppin gap-4">
                    <SideBar />
                    <div className="flex flex-col gap-4 pl-60 justify-center">
                        <div className="flex mt-16 relative">
                            <div className="flex relative w-full h-70 object-cover rounded-lg shadow-md bg-orange-400 justify-center items-center" >
                            <p className="text-[3rem] font-bold text-white p-4 bg-orange-500 rounded-lg">BANNER AQUI</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="flex flex-col bg-zinc-100 rounded-lg p-5 ">
                                <h1 className="text-2xl font-semibold">Livros Disponíveis</h1>
                                <div className="flex w-auto h-0.5 mt-2 bg-orange-500" />
                                <div className="flex mt-5">
                                    <ul className="flex flex-wrap gap-5 justify-between cursor-pointer">
                                        {livro.slice(0, 10).map((livros, index) => (
                                            <li key={index} className="flex-col relative w-55 truncate ">
                                                <img src="https://rseat.pics/" alt={`CAPA ${livros.titulo}`} className="size-55 shadow-md rounded-lg object-cover" />
                                                <p className="absolute top-2 right-2 bg-orange-500 text-white px-2 rounded-md text-ellipsis">{livros.ano_publicacao}</p>
                                                <strong className="text-lg">{livros.titulo}</strong>
                                                <p className="text-sm">Autor: {livros.autor}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="flex flex-col w-150 truncate">
                                <div className="flex flex-col bg-zinc-100 p-5 rounded-lg h-full ">
                                    <h1 className="text-2xl font-semibold">Ultimos Emprestimos</h1>
                                    <div className="flex w-auto h-0.5 mt-2 bg-orange-500" />
                                    <ul className="flex flex-col mt-3 gap-2 h-full justify-between">
                                        {emprestimo
                                            .sort((a, b) => new Date(b.data_emprestimo).getTime() - new Date(a.data_emprestimo).getTime())
                                            .slice(0, 10)
                                            .map((emprestimo, i) => {
                                                const formatarData = (data: string) => {
                                                    const partes = data.split('-');
                                                    if (partes.length === 3) {
                                                        const [ano, mes, dia] = partes;
                                                        return `${dia}/${mes}/${ano}`;
                                                    }
                                                    return data;
                                                };
                                                return (
                                                    <li key={i} className="flex flex-col">
                                                        <p className="text-lg font-semibold truncate">{emprestimo.livro}</p>
                                                        <div className="flex justify-between">
                                                            <p className="text-sm">{emprestimo.usuario}</p>
                                                            <p className="text-sm">{formatarData(emprestimo.data_emprestimo)}</p>
                                                        </div>
                                                    </li>
                                                );
                                            })}
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