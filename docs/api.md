# API

## Versão

v1

## Autenticação

As rotas protegidas utilizam JWT.

O token deve ser enviado no cabeçalho da requisição:

```http
Authorization: Bearer <token>
```

---

# Endpoints

## POST /api/v1/auth/registrar

Cria um novo usuário.

### Request Body

```json
{
  "nome": "João Silva",
  "dataNascimento": "2007-01-12",
  "email": "joao@email.com",
  "cpf": "12345678900",
  "senha": "senha123"
}
```

### Response 201

```json
{
  "token": "<jwt>",
  "usuario": {
    "id": "6848e7e95f5e0e8a64d2e1f1",
    "nome": "João Silva",
    "dataNascimento": "2007-01-12",
    "email": "joao@email.com",
    "cpf": "12345678900",
    "senha": "senha123"
  }
}
```

### Possíveis erros

* 409 → `EMAIL_EXISTS`
* 409 → `CPF_EXISTS`

---

## POST /api/v1/auth/login/email

Realiza login por e-mail.

### Request Body

```json
{
  "email": "joao@email.com",
  "senha": "senha123"
}
```

### Response 200

```json
{
  "token": "<jwt>",
  "usuario": {
    "id": "6848e7e95f5e0e8a64d2e1f1",
    "nome": "João Silva",
    "dataNascimento": "2007-01-12",
    "email": "joao@email.com",
    "cpf": "12345678900",
    "senha": "senha123"
  }
}
```

### Possíveis erros

* 401 → senha incorreta;
* 404 → usuário não encontrado.

---

## POST /api/v1/auth/login/cpf

Realiza login por CPF.

### Request Body

```json
{
  "cpf": "12345678900",
  "senha": "senha123"
}
```

### Response 200

Mesmo formato do login por e-mail.

---

## PUT /api/v1/auth/usuario/:id

Atualiza os dados do usuário.

### Request Body

```json
{
  "nome": "João Silva",
  "email": "novoemail@email.com"
}
```

### Response 200

```json
{
  "usuario": {
    "id": "6848e7e95f5e0e8a64d2e1f1",
    "nome": "João Silva",
    "dataNascimento": "2007-01-12T00:00:00.000Z",
    "email": "novoemail@email.com",
    "cpf": "12345678900"
  }
}
```

### Possíveis erros

* 404 → `USUARIO_NOT_FOUND`
* 409 → `EMAIL_EXISTS`
* 409 → `CPF_EXISTS`

---

## DELETE /api/v1/auth/usuario/:id

Remove o usuário.

### Response

Status 200.

### Possíveis erros

* 404 → `USUARIO_NOT_FOUND`

---

## POST /api/v1/auth/esqueci-senha

Solicita a redefinição de senha.

### Request Body

```json
{
  "email": "joao@email.com"
}
```

ou

```json
{
  "cpf": "12345678900"
}
```

### Response

Status 200.

### Possíveis erros

* 400 → `EMAIL_OU_CPF_NECESSARIO`
* 404 → usuário não encontrado

---

## POST /api/v1/auth/redefinir-senha

Redefine a senha do usuário.

### Request Body

```json
{
  "token": "123456",
  "novaSenha": "novasenha123"
}
```

### Response

Status 200.

### Possíveis erros

* 400 → `TOKEN_INVALIDO`

---

## GET /api/v1/tarefas

Lista as tarefas do usuário autenticado.

### Response 200

```json
[
  {
    "id": "6848e7e95f5e0e8a64d2e1f1",
    "titulo": "Estudar",
    "desc": "Resolver exercícios",
    "prazo": "2026-06-20T00:00:00.000Z",
    "finished": false
  }
]
```

---

## POST /api/v1/tarefas

Cria uma nova tarefa.

### Request Body

```json
{
  "titulo": "Estudar",
  "desc": "Resolver exercícios",
  "prazo": "2026-06-20"
}
```

### Response 201

```json
{
  "id": "6848e7e95f5e0e8a64d2e1f1",
  "titulo": "Estudar",
  "desc": "Resolver exercícios",
  "prazo": "2026-06-20T00:00:00.000Z",
  "finished": false
}
```

### Possíveis erros

* 400 → `DADOS_INVALIDOS`

---

## PUT /api/v1/tarefas/:id

Atualiza uma tarefa.

### Request Body

```json
{
  "finished": true
}
```

### Response 200

Retorna a tarefa atualizada.

### Possíveis erros

* 400 → `DADOS_INVALIDOS`
* 404 → `TAREFA_NOT_FOUND`

---

## DELETE /api/v1/tarefas/:id

Remove uma tarefa.

### Response

Status 204.

### Possíveis erros

* 404 → `TAREFA_NOT_FOUND`

---

# Modelos de Dados

## User

* id
* nome
* dataNascimento
* email
* cpf
* senha

## Tarefa

* id
* usuarioId
* titulo
* desc
* prazo
* finished

## ResetToken

* usuarioId
* token
* expiracao

---

# Códigos de Erro

```json
{
  "err": "CODIGO_DO_ERRO"
}
```

Principais códigos:

* EMAIL_EXISTS
* CPF_EXISTS
* USUARIO_NOT_FOUND
* TOKEN_INVALIDO
* EMAIL_OU_CPF_NECESSARIO
* TAREFA_NOT_FOUND
* DADOS_INVALIDOS
