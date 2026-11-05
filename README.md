ATENÇÃO: NA HORA DE CRIAR CONTAS, DESPESAS, RECEITAS E INVESTIMENTOS APARECE UM ERRO INTERNAL SERVER ERROR, MAS OS ITENS ESTÃO SENDO CRIADOS, APENAS CLIQUE EM *ATUALIZAR*

# Grand — gestão financeira

Frontend React com TypeScript, rotas SPA e consumo da API REST Spring Boot.
O Vite continua sendo utilizado como servidor de desenvolvimento e ferramenta
de build; por isso, não foi removido.

## Frontend React

Requisitos: Node.js. Na pasta `grand/`, instale as dependências e inicie o
servidor:

```powershell
npm install
npm run dev
```

Abra `http://localhost:5173`. A URL padrão da API é
`http://localhost:8080/api`. Para usar outra URL, copie `.env.example` para
`.env.local` e ajuste `VITE_API_URL`.

O frontend inclui login demonstrativo, página inicial com resumo carregado da
API e páginas de listagem/criação/edição/exclusão para usuários, contas,
despesas, receitas e investimentos. A navegação SPA é feita com React Router;
as páginas do painel exigem login.

### Login para testes

- **E-mail:** `demo@grand.com`
- **Senha:** `Grand123!`

Esse login fixo é validado somente no frontend para demonstração; ele não
representa autenticação segura e não é enviado ao backend. Não use esses dados
em produção. O acesso às APIs também continua sem autenticação.

As páginas CRUD precisam do backend ativo e configurado com Oracle. Erros de
conexão com a API são exibidos na interface.

## Backend REST (Spring Boot + Oracle)

O backend independente fica em `backend/` e implementa as entidades `Usuario`,
`Conta`, `Despesa`, `Receita` e `Investimento`, com camadas Model, Repository,
Service e Controller. As tabelas e os relacionamentos seguem o diagrama
`src/assets/relational.png`.

Requisitos: Java 17+ e uma instância Oracle. O Maven Wrapper do projeto baixa
e usa automaticamente o Maven 3.9.9, sem instalação global. Configure as
variáveis de ambiente no PowerShell antes de iniciar:

```powershell
$env:ORACLE_JDBC_URL = "jdbc:oracle:thin:@oracle.fiap.com.br:1521:orcl"
$env:ORACLE_USERNAME = "seu_usuario"
$env:ORACLE_PASSWORD = "sua_senha"
Set-Location .\backend
.\mvnw.cmd spring-boot:run
```

Para compilar o backend, use `.\mvnw.cmd -DskipTests package` dentro de
`backend/`.

`ORACLE_JDBC_URL` tem um valor local padrão; usuário e senha são obrigatórios
e não são armazenados no código. O Hibernate usa `update` por padrão para
criar/atualizar as tabelas; use `JPA_DDL_AUTO=validate` para validar um schema
existente sem alterá-lo.

O CORS aceita por padrão as origens locais do Vite (`http://localhost:5173`) e
do preview (`http://localhost:4173`). Configure `CORS_ALLOWED_ORIGINS` no
backend para permitir outras origens, separadas por vírgula.

| Entidade | Base |
|---|---|
| Usuário | `/api/usuarios` |
| Conta | `/api/contas` |
| Despesa | `/api/despesas` |
| Receita | `/api/receitas` |
| Investimento | `/api/investimentos` |

Cada base aceita `GET` (lista), `GET /{id}`, `POST`, `PUT /{id}` e
`DELETE /{id}`. POST retorna `201 Created` com cabeçalho `Location`; GET e PUT
retornam `200 OK`; DELETE retorna `204 No Content`. IDs inexistentes retornam
`404 Not Found`, registros inválidos retornam `400 Bad Request` e a exclusão
de usuário que ainda tenha registros relacionados retorna `409 Conflict`.

Para criar/atualizar uma conta, despesa, receita ou investimento, informe o
usuário como `{ "usuario": { "idUsuario": 1 } }`; por exemplo:

```json
{
  "usuario": { "idUsuario": 1 },
  "valor": 125.50,
  "dataDespesa": "2026-11-05",
  "descricao": "Exemplo",
  "categoria": "Moradia"
}
```

O corpo de `PUT` substitui os campos editáveis da entidade. Os IDs são gerados
pelo banco.

### Sequências Oracle dos IDs

As cinco entidades usam sequências Oracle independentes, iniciando em 1 e
incrementando de 1. Antes de iniciar a aplicação, execute uma vez
`backend/oracle-sequences.sql` no schema Oracle configurado. O script também
remove a propriedade `IDENTITY` das colunas caso tenham sido criadas pelo
mapeamento JPA anterior. Ele pressupõe tabelas vazias; se já houver registros,
ajuste o `START WITH` de cada sequência para `MAX(ID) + 1`, sem apagar dados.
