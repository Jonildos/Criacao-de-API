import sqlite3 from 'sqlite3';

// O modo verbose melhora o debug, ajudando a rastrear erros no terminal
const sqlite = sqlite3.verbose();

// Cria ou conecta ao arquivo do banco na raiz do seu projeto
const db = new sqlite.Database('./inventario.db', (err) => {
    if (err) {
        console.error("Erro ao conectar com SQLite:", err.message);
    } else {
        console.log("Conectado ao SQLite com sucesso.");
    }
});

// Código SQL real: Cria a tabela se ela ainda não existir.
// SKU (Stock Keeping Unit) será único para cada equipamento.
const criarTabela = `
    CREATE TABLE IF NOT EXISTS equipamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sku TEXT UNIQUE NOT NULL,
        nome TEXT NOT NULL,
        categoria TEXT,
        status TEXT DEFAULT 'Disponível'
    )
`;

// Executa a query
db.run(criarTabela, (err) => {
    if (err) {
        console.error("Erro ao criar tabela:", err.message);
    } else {
        console.log("Tabela de SKUs 'equipamentos' sincronizada e pronta.");
    }
});

export default db;