# API de Gestão de Inventário Fotográfico

Uma API RESTful desenvolvida em Node.js e TypeScript para gerenciar o ciclo de vida de ativos físicos (SKUs) em estúdios fotográficos

O projeto tem como objetivo garantir o controle estrito de equipamentos (câmeras, lentes, iluminação) através de um backend tipado e com arquitetura modular

# Tecnologias Utilizadas

*   **Node.js & Express:** Servidor HTTP e roteamento.
*   **TypeScript:** Tipagem estática para garantir contratos de dados (Interfaces) rigorosos nas requisições.
*   **SQLite3:** Banco de dados relacional leve e embutido para persistência de dados.
*   **tsx:** Motor de execução moderno para compilar e rodar módulos ESM nativamente.

## Arquitetura e Padrões

O código foi refatorado utilizando os princípios de **Separation of Concerns (Separação de Responsabilidades)**. A regra de negócio e a interação com o banco de dados foram isoladas em **Controllers**, mantendo o arquivo principal de rotas (`index.ts`) limpo e escalável.

## Como executar o projeto localmente

1. Clone este repositório:
   ```bash
   git clone <URL_DO_SEU_REPOSITORIO>

2. Instale as dependências
   npm install
   
Endpoints CRUD
GET /api/equipamentos
POST /api/equipamentos
PUT /api/equipamentos/:id
DELETE /api/equipamentos/:id
