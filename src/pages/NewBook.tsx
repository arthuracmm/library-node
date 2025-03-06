import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { useState, useEffect } from "react";
import api from "../api";

export function NewBook() {
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [ano_publicacao, setAnoPublicacao] = useState('');
    const [isbn, setIsbn] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [responseMessage, setResponseMessage] = useState('');
    const [autores, setAutores] = useState<Autor[]>([]);

    interface Autor {
        nome: string;
    }

    useEffect(() => {
        const fetchAutores = async () => {
            try {
                const response = await api.get('/autores');
                setAutores(response.data); 
            } catch (error) {
                console.error('Erro ao buscar autores:', error);
            }
        };
        fetchAutores();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const novoLivro = {
            titulo,
            autor,
            ano_publicacao,
            isbn,
            quantidade
        };
        try {
            await api.post('/livros', novoLivro);
            setResponseMessage('Livro adicionado com sucesso!');
            console.log(responseMessage);
            setTitulo('');
            setAutor('');
            setAnoPublicacao('');
            setIsbn('');
        } catch (error) {
            console.error('Erro ao adicionar livro:', error);
            setResponseMessage('Erro ao adicionar livro!');
        }
        console.log(novoLivro);
    };
    return (
        <>
            <div className="flex gap-4 h-full">
                <Header />
                <div className="flex flex-1 h-screen w-full p-4 gap-4">
                    <SideBar />
                    <div className="flex flex-col gap-4 pl-60 justify-center w-full">
                        <div className="flex mt-16 bg-zinc-100 p-4 rounded-md w-full h-full shadow-md items-center justify-center">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4 justify-center items-center py-4">
                                <h1 className="text-2xl font-bold">Adicionar um Livro</h1>
                                <div className="flex flex-col">
                                    <label htmlFor="titulo">Título</label>
                                    <input
                                        type="text"
                                        id="titulo"
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                        required
                                        placeholder="Titulo do Livro"
                                        className="p-2 border-1 border-zinc-400 placeholder:text-zinc-400 rounded-md w-100"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="autor">Autor</label>
                                    <select
                                        id="autor"
                                        value={autor}
                                        onChange={(e) => setAutor(e.target.value)}
                                        required
                                        className="p-2 border-1 border-zinc-400 rounded-md w-100"
                                    >
                                        <option value="" disabled>Selecione o Autor</option>
                                        {autores.map((autorItem) => (
                                            <option key={autorItem.nome} value={autorItem.nome}>
                                                {autorItem.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="titulo">Ano Publicação</label>
                                    <input
                                        type="number"
                                        id="ano_publicacao"
                                        value={ano_publicacao}
                                        onChange={(e) => setAnoPublicacao(e.target.value)}
                                        required
                                        placeholder="Ano de Publicação"
                                        className="p-2 border-1 border-zinc-400 placeholder:text-zinc-400 rounded-md w-100"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="titulo">ISBN</label>
                                    <input
                                        type="text"
                                        id="isbn"
                                        value={isbn}
                                        onChange={(e) => setIsbn(e.target.value)}
                                        required
                                        placeholder="ISBN"
                                        className="p-2 border-1 border-zinc-400 placeholder:text-zinc-400 rounded-md w-100"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="quantidade">Quantidade</label>
                                    <input
                                        type="number"
                                        id="quantidade"
                                        value={quantidade}
                                        onChange={(e) => setQuantidade(e.target.value)}
                                        required
                                        placeholder="Quantidade"
                                        className="p-2 border-1 border-zinc-400 placeholder:text-zinc-400 rounded-md w-100"
                                    />
                                </div>
                                <button type="submit" className="bg-orange-500 p-2 px-4 rounded-md text-white shadow-md cursor-pointer">Adicionar Livro</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}