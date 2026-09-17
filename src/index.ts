import express from 'express';
import cors from 'cors';
import './database.js';

// Importamos as lógicas do nosso controlador (Lembre-se da regra do .js no ESM)
import { listarEquipamentos, cadastrarEquipamento, atualizarStatus } from './controllers/EquipamentoController.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// As rotas agora funcionam como placas de trânsito: apenas apontam para o destino correto
app.get('/api/equipamentos', listarEquipamentos);
app.post('/api/equipamentos', cadastrarEquipamento);
app.put('/api/equipamentos/:id', atualizarStatus);

app.listen(port, () => {
    console.log(`Servidor de pé em http://localhost:${port} - Arquitetura Refatorada`);
});