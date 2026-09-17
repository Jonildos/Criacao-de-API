import { type Request, type Response } from 'express';
import db from '../database.js';

// Nossos contratos de tipagem isolados
interface EquipamentoPayload {
    nome: string;
    categoria: string;
}

interface UpdateEquipamentoPayload {
    status: string;
}

// Lógica isolada da rota GET
export const listarEquipamentos = (req: Request, res: Response): void => {
    const sql = `SELECT * FROM equipamentos`;
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Erro na busca:", err.message);
            res.status(500).json({ erro: "Erro ao buscar equipamentos no banco de dados." });
            return;
        }
        res.status(200).json({ total: rows.length, equipamentos: rows });
    });
};

// Lógica isolada da rota POST
export const cadastrarEquipamento = (req: Request<{}, {}, EquipamentoPayload>, res: Response): any => {
    const { nome, categoria } = req.body;

    if (!nome || !categoria) {
        return res.status(400).json({ erro: "Nome e categoria são obrigatórios." });
    }

    const sku = `FOTO-${Date.now().toString().slice(-6)}`;
    const sql = `INSERT INTO equipamentos (sku, nome, categoria) VALUES (?, ?, ?)`;
    
    db.run(sql, [sku, nome, categoria], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: "Erro interno ao salvar no banco." });
        }
        res.status(201).json({
            mensagem: "Ativo registrado com sucesso!",
            dados: { id: this.lastID, sku, nome, categoria, status: 'Disponível' }
        });
    });
};

// Lógica isolada da rota PUT
export const atualizarStatus = (req: Request<{ id: string }, {}, UpdateEquipamentoPayload>, res: Response): any => {
    const id = req.params.id;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ erro: "O campo 'status' é obrigatório." });
    }

    const sql = `UPDATE equipamentos SET status = ? WHERE id = ?`;

    db.run(sql, [status, id], function(err) {
        if (err) {
            console.error("Erro ao atualizar:", err.message);
            return res.status(500).json({ erro: "Erro interno no banco." });
        }
        if (this.changes === 0) {
            return res.status(404).json({ erro: "Equipamento não encontrado." });
        }
        res.status(200).json({ mensagem: "Equipamento atualizado!", id_modificado: id, novo_status: status });
    });
};
// Lógica isolada da rota DELETE
export const deletarEquipamento = (req: Request<{ id: string }>, res: Response): any => {
    const id = req.params.id;

    // Comando SQL destrutivo: remove a linha definitivamente
    const sql = `DELETE FROM equipamentos WHERE id = ?`;

    db.run(sql, [id], function(err) {
        if (err) {
            console.error("Erro ao deletar:", err.message);
            return res.status(500).json({ erro: "Erro interno no banco." });
        }
        
        // Se this.changes for 0, o ID passado não existe no banco
        if (this.changes === 0) {
            return res.status(404).json({ erro: "Equipamento não encontrado para exclusão." });
        }
        
        res.status(200).json({ 
            mensagem: "Equipamento removido permanentemente do inventário.", 
            id_removido: id 
        });
    });
};