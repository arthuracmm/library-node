import { Header } from "../components/Header";
import { SideBar } from "../components/Sidebar";
import { useState, useEffect } from "react";
import api from "../api";
import { CircleCheckBig } from "lucide-react";

export function Return() {
    const [emprestimos, setEmprestimos] = useState<any[]>([]);
    const [devolvido] = useState('');
    const [, setResponseMessage] = useState('');
    const [emprestimosDevolvidos, setEmprestimosDevolvidos] = useState<any[]>([]);

    const formatarData = (data: string) => {
        const partes = data.split('-');
        if (partes.length === 3) {
            const [ano, mes, dia] = partes;
            return `${dia}/${mes}/${ano}`;
        }
        return data;
    };

    useEffect(() => {
        const fetchEmprestimos = async () => {
            try {
                const response = await api.get('/emprestimos');
                const naoDevolvidos = response.data.filter((emprestimo: any) => !emprestimo.devolvido);
                const devolvidos = response.data.filter((emprestimo: any) => emprestimo.devolvido);
                setEmprestimos(naoDevolvidos);
                setEmprestimosDevolvidos(devolvidos);
            } catch (error) {
                console.error('Erro ao buscar emprestimos:', error);
            }
        };
        fetchEmprestimos();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, id: number) => {
        e.preventDefault();
        const novoEmprestimo = {
            devolvido,
        };

        try {
            await api.patch(`/emprestimos/${id}`, { devolvido: true });
            setResponseMessage('Devolução registrada com sucesso!');
            setEmprestimos(emprestimos.map(emprestimo =>
                emprestimo.id === id ? { ...emprestimo, devolvido: true } : emprestimo
             ));
            setEmprestimosDevolvidos([...emprestimosDevolvidos, emprestimos.find(emprestimo => emprestimo.id === id)]);
            setEmprestimos(emprestimos.filter(emprestimo => emprestimo.id !== id));
        } catch (error) {
            console.error('Erro ao registrar devolução:', error);
            setResponseMessage('Erro ao registrar devolução!');
        }
        console.log(novoEmprestimo);
    };

    const hoje = new Date();

    const emprestimosForaDoPrazo = emprestimos.filter(emprestimo => new Date(emprestimo.data_devolucao) < hoje);
    const emprestimosDentroDoPrazo = emprestimos.filter(emprestimo => new Date(emprestimo.data_devolucao) >= hoje);
    return (
        <>
            <div className="flex gap-4 h-full">
                <Header />
                <div className="flex flex-1 w-full p-4 gap-4">
                    <SideBar />
                    <div className="flex flex-col gap-4 pl-60 w-full">
                        <div className="flex flex-col mt-16 bg-zinc-100 p-4 rounded-md w-full h-full shadow-md items-around justify-around">
                            <div className="flex flex-col">
                                <h1 className="text-2xl font-bold">Não Devolvidos</h1>
                                <div className="flex w-auto h-0.5 mt-2 bg-red-500" />
                                <div className="flex flex-col mt-4">
                                    <p className="text-lg font-semibold text"><span className="text-red-500">Fora</span> do Prazo</p>
                                    <div className="flex flex-wrap gap-4 mt-1">
                                        {emprestimosForaDoPrazo.map((emprestimoItem: { id: number, usuario: string, livro: string, data_emprestimo: string, data_devolucao: string}) => (
                                            <form onSubmit={(e) => handleSubmit(e, emprestimoItem.id)} className="flex flex-col gap-2 justify-center items-center p-4 bg-zinc-200 size-53.5 text-center relative" key={emprestimoItem.id}>
                                                <p className="font-bold text-xl">{emprestimoItem.usuario}</p>
                                                <p>{emprestimoItem.livro}</p>
                                                <p className="absolute top-2 left-2 bg-zinc-500 text-white p-1 text-[12px] rounded-md">{formatarData(emprestimoItem.data_emprestimo)}</p>
                                                <p className="absolute top-2 right-2 bg-red-500 text-white p-1 text-[12px] rounded-md">{formatarData(emprestimoItem.data_devolucao)}</p>
                                                <button type="submit" className="bg-green-500 p-2 rounded-md text-white shadow-md cursor-pointer flex gap-2 items-center text-[14px] absolute right-2 bottom-2">
                                                    <CircleCheckBig size={24} /> Confirmar
                                                </button>
                                            </form>
                                        ))}
                                    </div>

                                </div>
                                <div className="flex flex-col mt-2">
                                    <p className="text-lg font-semibold text"><span className="text-blue-700">Dentro</span> do Prazo</p>
                                    <div className="flex flex-wrap gap-4 mt-2">
                                        {emprestimosDentroDoPrazo.map((emprestimoItem: { id: number, usuario: string, livro: string, data_emprestimo: string, data_devolucao: string }) => (
                                            <form onSubmit={(e) => handleSubmit(e, emprestimoItem.id)} className="flex flex-col gap-2 justify-center items-center p-4 bg-zinc-200 size-53.5 text-center relative" key={emprestimoItem.id}>
                                                <p className="font-bold text-xl">{emprestimoItem.usuario}</p>
                                                <p>{emprestimoItem.livro}</p>
                                                <p className="absolute top-2 left-2 bg-zinc-500 text-white p-1 text-[12px] rounded-md">{formatarData(emprestimoItem.data_emprestimo)}</p>
                                                <p className="absolute top-2 right-2 bg-blue-700 text-white p-1 text-[12px] rounded-md">{formatarData(emprestimoItem.data_devolucao)}</p>
                                                <button type="submit" className="bg-green-500 p-2 rounded-md text-white shadow-md cursor-pointer flex gap-2 items-center text-[14px] absolute right-2 bottom-2">
                                                    <CircleCheckBig size={24} /> Confirmar
                                                </button>
                                            </form>
                                        ))}
                                    </div>

                                </div>
                                <div className="flex flex-col mt-5">
                                    <h1 className="text-2xl font-bold">Devolvidos</h1>
                                    <div className="flex w-auto h-0.5 mt-2 bg-green-500" />
                                    <div className="flex flex-wrap gap-4 mt-4">
                                        {emprestimosDevolvidos.map((emprestimoItem: { id: number, usuario: string, livro: string, data_emprestimo: string, data_devolucao: string}) => (
                                            <div className="flex flex-col gap-2 justify-center items-center p-4 bg-zinc-200 size-53.5 text-center relative" key={emprestimoItem.id}>
                                                <p className="font-bold text-xl">{emprestimoItem.usuario}</p>
                                                <p>{emprestimoItem.livro}</p>
                                                <p className="absolute top-2 left-2 bg-zinc-500 text-white p-1 text-[12px] rounded-md">{formatarData(emprestimoItem.data_emprestimo)}</p>
                                                <p className="absolute top-2 right-2 bg-green-500 text-white p-1 text-[12px] rounded-md">{formatarData(emprestimoItem.data_devolucao)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}