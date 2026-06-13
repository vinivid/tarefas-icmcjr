# Arquitetura

## Visão Geral

O sistema é dividido em três módulos principais:

* Front-end;
* Back-end;
* Banco de Dados.

A comunicação entre os componentes ocorre através de requisições HTTP enviadas pelo Front-end para a API desenvolvida em Node.js. O Back-end é responsável pelas regras de negócio e pela persistência dos dados no MongoDB.

---

## Protótipos e Fluxos

### Protótipo das telas

Link do Figma:

```text
https://www.figma.com/design/6Kg7IaxRZK9eM7ih6S1hyh/Tarefas---ICMCjr?node-id=339-1050&p=f&t=vV3vgo37omIyiIG6-0
```

## Responsabilidades dos Módulos

### Front-end

Responsável pela interface com o usuário, captura das informações preenchidas e comunicação com a API.

### Back-end

Responsável pelas regras de negócio da aplicação, autenticação dos usuários, gerenciamento das tarefas e integração com o banco de dados.

Tecnologias utilizadas:

* Node.js;
* TypeScript;
* Express;
* JWT;
* bcrypt.

### Banco de Dados

Responsável pelo armazenamento dos dados da aplicação.

Tecnologia utilizada:

* MongoDB.

As principais coleções são:

* User;
* Tarefa;
* ResetToken.

---

## Arquitetura Geral

```text
Usuário
    ↓
Front-end
    ↓
API (Node.js + Express + TypeScript)
    ↓
MongoDB
```

---

## Fluxo de Dados

### Login

1. O usuário acessa a tela de login.
2. O Front-end envia uma requisição `POST /auth/login/email` ou `POST /auth/login/cpf`.
3. O Back-end valida as credenciais no MongoDB.
4. Caso os dados sejam válidos, um token JWT é gerado.
5. O token é retornado ao Front-end.
6. O usuário é direcionado para a tela principal da aplicação.

---

### Cadastro

1. O usuário acessa a tela de registro.
2. O Front-end envia uma requisição `POST /auth/registrar`.
3. O Back-end valida os dados recebidos.
4. O usuário é salvo no MongoDB.
5. O Back-end retorna a resposta ao Front-end.
6. O usuário é redirecionado para a tela principal.

---

### Criação de Tarefa

1. O usuário seleciona a opção de adicionar tarefa.
2. O Front-end coleta as informações preenchidas.
3. O Front-end envia uma requisição `POST /tarefas`.
4. O middleware `authToken` valida o JWT do usuário.
5. O Back-end armazena a tarefa no MongoDB.
6. A resposta é retornada ao Front-end.
7. A tarefa passa a ser exibida na tela principal.

---

### Visualização de Tarefas

1. O usuário acessa a tela principal.
2. O Front-end envia uma requisição `GET /tarefas`.
3. O middleware `authToken` valida o JWT.
4. O Back-end consulta as tarefas do usuário no MongoDB.
5. As tarefas são retornadas para o Front-end.
6. O usuário pode visualizar suas tarefas.

---

### Edição de Tarefa

1. O usuário seleciona uma tarefa.
2. O Front-end envia uma requisição `PUT /tarefas/:id`.
3. O middleware `authToken` valida o token.
4. O Back-end atualiza a tarefa no MongoDB.
5. Os dados atualizados são retornados ao Front-end.
6. A tarefa é exibida com as alterações realizadas.

---

### Exclusão de Tarefa

1. O usuário seleciona uma tarefa.
2. O Front-end solicita confirmação da exclusão.
3. Após a confirmação, é enviada uma requisição `DELETE /tarefas/:id`.
4. O middleware `authToken` valida o JWT.
5. O Back-end remove a tarefa do MongoDB.
6. O Front-end atualiza a lista de tarefas exibida.

---

### Filtragem de Tarefas

1. O usuário seleciona um filtro na tela principal.
2. O Front-end solicita as tarefas do usuário.
3. O Back-end retorna as tarefas armazenadas.
4. O Front-end aplica o filtro selecionado.
5. Apenas as tarefas correspondentes são exibidas.

---

### Edição de Perfil

1. O usuário acessa a tela de perfil.
2. O Front-end envia uma requisição `PUT /auth/usuario/:id`.
3. O middleware `authToken` valida o JWT.
4. O Back-end atualiza os dados do usuário no MongoDB.
5. As informações atualizadas são retornadas ao Front-end.
6. O perfil é exibido com os novos dados.

---

### Exclusão de Perfil

1. O usuário solicita a exclusão da conta.
2. O Front-end apresenta uma confirmação da ação.
3. Após a confirmação, é enviada uma requisição `DELETE /auth/usuario/:id`.
4. O middleware `authToken` valida o token.
5. O Back-end remove o usuário do MongoDB.
6. O usuário retorna para a tela inicial da aplicação.

---

### Recuperação de Senha

1. O usuário seleciona a opção "Esqueci minha senha".
2. O Front-end envia uma requisição `POST /auth/esqueci-senha`.
3. O Back-end gera um token temporário de redefinição.
4. O token é armazenado na coleção `ResetToken`.
5. Um e-mail é enviado ao usuário.
6. O usuário informa a nova senha.
7. O Front-end envia uma requisição `POST /auth/redefinir-senha`.
8. O Back-end valida o token recebido.
9. A senha do usuário é atualizada no MongoDB.
10. O usuário pode realizar o login normalmente.
