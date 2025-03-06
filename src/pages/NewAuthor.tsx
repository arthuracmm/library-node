import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { useState } from "react";
import api from "../api";

export function NewAuthor() {
    const [nome, setNome] = useState('');
    const [nacionalidade, setNacionalidade] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const novoLivro = {
            nome,
            nacionalidade
        };
        try {
            await api.post('/autores', novoLivro);
            setResponseMessage('Autor adicionado com sucesso!');
            console.log(responseMessage);
            setNome('');
            setNacionalidade('');
        } catch (error) {
            console.error('Erro ao adicionar autor:', error);
            setResponseMessage('Erro ao adicionar autor!');
        }
        console.log(novoLivro);
    };
    return (
        <>
            <div className="flex  font-poppin gap-4 h-full">
                <Header />
                <div className="flex flex-1 h-screen w-full p-4 font-poppin gap-4">
                    <SideBar />
                    <div className="flex flex-col gap-4 pl-60 justify-center w-full">
                        <div className="flex mt-16 bg-zinc-100 p-4 rounded-md w-full h-full shadow-md items-center justify-center">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center items-center py-4">
                                <h1 className="text-2xl font-bold">Adicionar um Autor</h1>
                                <div className="flex flex-col">
                                    <label htmlFor="nome">Nome</label>
                                    <input
                                        type="text"
                                        id="nome"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                        required
                                        placeholder="Nome do Autor"
                                        className="p-2 border-1 border-zinc-400 placeholder:text-zinc-400 rounded-md w-100"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="titulo">Nacionalidade</label>
                                    <input
                                        type="text"
                                        id="autor"
                                        value={nacionalidade}
                                        onChange={(e) => setNacionalidade(e.target.value)}
                                        required
                                        placeholder="Nacionalidade do Autor"
                                        className="p-2 border-1 border-zinc-400 placeholder:text-zinc-400 rounded-md w-100"
                                    />
                                </div>
                                <button type="submit" className="bg-orange-500 p-2 px-4 rounded-md text-white shadow-md cursor-pointer">Adicionar Autor</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}