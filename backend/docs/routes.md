# routes.md

# /auth

Rotas responsáveis pela autenticação e gerenciamento dos usuários.

### POST /registrar

Realiza o cadastro de um novo usuário.

### POST /login/email

Realiza autenticação utilizando e-mail e senha.

### POST /login/cpf

Realiza autenticação utilizando CPF e senha.

### PUT /usuario/:id

Atualiza os dados do usuário.

Middleware aplicado:

* authToken

### DELETE /usuario/:id

Exclui a conta do usuário.

Middleware aplicado:

* authToken

### POST /esqueci-senha

Solicita a redefinição de senha através do envio de um token temporário por e-mail.

### POST /redefinir-senha

Redefine a senha do usuário utilizando o token recebido.

---

# /tarefas

Rotas responsáveis pelo gerenciamento das tarefas do usuário.

### GET /

Lista todas as tarefas do usuário autenticado.

### POST /

Cria uma nova tarefa.

### PUT /:id

Atualiza uma tarefa existente.

### DELETE /:id

Remove uma tarefa.

Middleware aplicado em todas as rotas:

* authToken

---

# Outros Middlewares

### express.json()

Middleware responsável por interpretar requisições em formato JSON.
