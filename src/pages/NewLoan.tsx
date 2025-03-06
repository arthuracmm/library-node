import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { useState, useEffect } from "react";
import api from "../api";

export function NewLoan() {
    const [livro, setLivro] = useState('');
    const [livros, setLivros] = useState<{ titulo: string; quantidade: number; id: number }[]>([]);
    const [usuario, setUsuario] = useState('');
    const [usuarios, setUsuarios] = useState<{ nome: string }[]>([]);
    const [data_emprestimo, setDataEmprestimo] = useState('');
    const [data_devolucao, setDataDevolucao] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const fetchLivrosComEstoque = async () => {
        try {
            const response = await api.get('/livros');
            const livrosComEstoque = response.data.filter((livro: { quantidade: number }) => livro.quantidade > 0);
            setLivros(livrosComEstoque);
        } catch (error) {
            console.error('Erro ao buscar livros:', error);
        }
    };
    
    useEffect(() => {
        fetchLivrosComEstoque();
    }, []);

    useEffect(() => {
        const hoje = new Date();
        setDataEmprestimo(hoje.toISOString().split('T')[0]);

        if (data_emprestimo) {
            const emprestimoDate = new Date(data_emprestimo);
            const devolucaoDate = new Date(emprestimoDate);
            devolucaoDate.setDate(emprestimoDate.getDate() + 7);
            setDataDevolucao(devolucaoDate.toISOString().split('T')[0]);
        }
    }, [data_emprestimo]);

    useEffect(() => {
        const fetchAutores = async () => {
            try {
                const response = await api.get('/usuarios');
                setUsuarios(response.data);
            } catch (error) {
                console.error('Erro ao buscar usuario:', error);
            }
        };
        fetchAutores();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const emprestimoDate = new Date(data_emprestimo);
        const devolucaoDate = new Date(emprestimoDate);
        devolucaoDate.setDate(emprestimoDate.getDate() + 7);
        const data_devolucao = devolucaoDate.toISOString().split('T')[0];

        const livroSelecionado = livros.find(livroItem => livroItem.titulo === livro);

        if (!livroSelecionado) {
            setResponseMessage('Livro não encontrado!');
            return;
        }

        const novoEmprestimo = {
            livro,
            usuario,
            data_emprestimo,
            data_devolucao
        };

        try {
            await api.post('/emprestimos', novoEmprestimo);
            await api.put(`/livros/${livroSelecionado.id}`, {
                ...livroSelecionado,
                quantidade: livroSelecionado.quantidade - 1
            });
            setResponseMessage('Emprestimo adicionado com sucesso!');
            console.log(responseMessage);
            setLivro('');
            setUsuario('');
            setDataEmprestimo('');
            fetchLivrosComEstoque();
        } catch (error) {
            console.error('Erro ao adicionar emprestimo:', error);
            setResponseMessage('Erro ao adicionar emprestimo!');
        }
        console.log(novoEmprestimo);
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
                                <h1 className="text-2xl font-bold">Criar um Emprestimo</h1>
                                <div className="flex flex-col">
                                    <label htmlFor="livro">Livro</label>
                                    <select
                                        id="livro"
                                        value={livro}
                                        onChange={(e) => setLivro(e.target.value)}
                                        required
                                        className="p-2 border-1 border-zinc-400 rounded-md w-100"
                                    >
                                        <option value="" disabled>Selecione o Livro</option>
                                        {livros.map((livroItem) => (
                                            <option key={livroItem.titulo} value={livroItem.titulo}>
                                                {livroItem.titulo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col">
                                    <label htmlFor="usuario">Usuario</label>
                                    <select
                                        id="usuario"
                                        value={usuario}
                                        onChange={(e) => setUsuario(e.target.value)}
                                        required
                                        className="p-2 border-1 border-zinc-400 rounded-md w-100"
                                    >
                                        <option value="" disabled>Selecione o Usuario</option>
                                        {usuarios.map((userItem: { nome: string }) => (
                                            <option key={userItem.nome} value={userItem.nome}>
                                                {userItem.nome}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="data_emprestimo">Data de Emprestimo</label>
                                    <input
                                        type="date"
                                        id="data_emprestimo"
                                        value={data_emprestimo}
                                        onChange={(e) => setDataEmprestimo(e.target.value)}
                                        required
                                        placeholder="Data de Emprestimo"
                                        className="p-2 border-1 border-zinc-400 placeholder:text-zinc-400 rounded-md w-100"
                                    />
                                </div>
                                <h2 className="text-lg ">Prazo de devolução padrão de 7 dias</h2>
                                <div className="flex flex-col">
                                    <label htmlFor="data_devolucao">Data de Devolução</label>
                                    <input
                                        type="date"
                                        id="data_devolucao"
                                        value={data_devolucao}
                                        onChange={(e) => setDataDevolucao(e.target.value)}
                                        placeholder="Data de Devolução"
                                        className="p-2 border-1 border-zinc-400 placeholder:text-zinc-400 rounded-md w-100"
                                    />
                                </div>
                                <button type="submit" className="bg-orange-500 p-2 px-4 rounded-md text-white shadow-md cursor-pointer">Adicionar usuario</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}