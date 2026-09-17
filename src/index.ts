import express, { type Request, type Response } from 'express';
import cors from 'cors';
import db from './database.js';

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// --- INTERFACES (Contratos do TypeScript) ---
// Define a estrutura exata que o cliente deve enviar no corpo (body) da requisição POST
interface EquipamentoPayload {
    nome: string;
    categoria: string;
}

// --- ROTAS DA API ---

// Rota GET: Mantida como estava, apenas checando se a API responde
app.get('/api/equipamentos', (req: Request, res: Response) => {
    res.status(200).json({ 
        mensagem: "API de Inventário do Estúdio rodando com sucesso!",
        status: "ativo"
    });
});

// NOVA Rota POST: Cadastra o equipamento no banco de dados
// O tipo Request<{}, {}, EquipamentoPayload> avisa ao Express que o req.body segue nossa Interface
app.post('/api/equipamentos', (req: Request<{}, {}, EquipamentoPayload>, res: Response): any => {
    const { nome, categoria } = req.body;

    // Validação: Impede que itens vazios cheguem ao banco
    if (!nome || !categoria) {
        return res.status(400).json({ erro: "Nome e categoria são obrigatórios." });
    }

    // Gera um código de SKU baseado na data/hora
    const sku = `FOTO-${Date.now().toString().slice(-6)}`;

    // Comando SQL para inserir na tabela. As (?) protegem contra ataques (SQL Injection)
    const sql = `INSERT INTO equipamentos (sku, nome, categoria) VALUES (?, ?, ?)`;
    
    db.run(sql, [sku, nome, categoria], function(err) {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: "Erro interno ao salvar no banco de dados." });
        }
        
        // this.lastID pega o ID automático gerado pelo SQLite
        res.status(201).json({
            mensagem: "Ativo registrado com sucesso!",
            dados: { id: this.lastID, sku, nome, categoria, status: 'Disponível' }
        });
    });
});

// --- INICIALIZAÇÃO DO SERVIDOR ---
app.listen(port, () => {
    console.log(`Servidor de pé em http://localhost:${port}`);
});