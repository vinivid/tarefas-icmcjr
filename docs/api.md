# Versão 1

## Autenticação

Para as rotas cuja a autenticação é necessária para acessa-las utiliza-se de bearer tokens. As tokens são JWT.

# Endpoints

### POST /api/v1/auth/registrar

**Descrição**: Cria um novo usuário no sistema se não houver conflitos com os dados de registro e retorna uma token de autenticação.

**Request Body**:

```json
{
  "nome": "string",
  "dataNascimento": "string",
  "email": "string",
  "cpf": "string",
  "senha": "string"
}
```

**Response 201**:
```json
{
  "token": "string",
  "usuario": {
    "nome": "string",
    "dataNascimento": "string",
    "email": "string",
    "cpf": "string",
    "senha": "string"
  }
}
```

**Response 409**:
```json
{
  "err": "string"
}
```

### POST /api/v1/auth/login/email

**Descrição**: Faz o login do usuário com base no email e senha. Caso estejam cadastrados no sistema, envia uma token de autenticação.

**Request Body**:

```json
{
  "email": "string",
  "senha": "string"
}
```

**Response 200**:
```json
{
  "token": "string",
  "usuario": {
    "nome": "string",
    "dataNascimento": "string",
    "email": "string",
    "cpf": "string",
    "senha": "string"
  }
}
```

**Response 404**:
Mensagem padrão do código.

**Response 401**:
Mensagem padrão do código.

### POST /api/v1/auth/login/cpf

**Descrição**: Faz o login do usuário com base no cpf e senha. Caso estejam cadastrados no sistema, envia uma token de autenticação.

**Request Body**:

```json
{
  "cpf": "string",
  "senha": "string"
}
```

**Response 200**:
```json
{
  "token": "string",
  "usuario": {
    "nome": "string",
    "dataNascimento": "string",
    "email": "string",
    "cpf": "string",
    "senha": "string"
  }
}
```

**Response 404**:
Mensagem padrão do código.

**Response 401**:
Mensagem padrão do código.

### PUT /api/v1/auth/usuario/:id

**Descrição**: Atualiza os dados de um usuário existente. O endpoint requer autenticação por token e permite alterar nome, data de nascimento, e-mail, CPF e senha. Em caso de sucesso, retorna os dados atualizados do usuário.

**Parâmetros de Rota**:

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| id | string | Identificador do usuário a ser atualizado. |

**Headers**:

```http
Authorization: Bearer <token>
```

**Request Body**:

```json
{
  "nome": "string",
  "dataNascimento": "string",
  "email": "string",
  "cpf": "string",
  "senha": "string"
}
```

**Response 200**:

```json
{
  "usuario": {
    "id": "string",
    "nome": "string",
    "dataNascimento": "string",
    "email": "string",
    "cpf": "string"
  }
}
```

**Response 404**:

```json
{
  "err": "UsuarioNotFound"
}
```

Retornado quando não existe um usuário com o identificador informado.

**Response 409**:

```json
{
  "err": "string"
}
```

Retornado quando a atualização viola alguma regra de negócio ou restrição de unicidade, como CPF ou e-mail já cadastrados para outro usuário.

**Response 401**:

```json
{
  "err": "string"
}
```

Retornado quando o token de autenticação está ausente, expirado ou é inválido.
```

### DELETE /api/v1/auth/usuario/:id

**Descrição**: Remove permanentemente um usuário do sistema. O endpoint requer autenticação por token e exclui a conta associada ao identificador informado.

**Parâmetros de Rota**:

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| id | string | Identificador do usuário a ser removido. |

**Headers**:

```http
Authorization: Bearer <token>
```

**Response 200**:

Sem corpo de resposta.

**Response 404**:

```json
{
  "err": "USUARIO_NOT_FOUND"
}
```

Retornado quando não existe um usuário com o identificador informado.

**Response 401**:

```json
{
  "err": "string"
}
```

Retornado quando o token de autenticação está ausente, expirado ou é inválido.
```

### POST /api/v1/auth/esqueci-senha

**Descrição**: Inicia o processo de redefinição de senha. O usuário deve informar seu e-mail ou CPF. Caso uma conta correspondente seja encontrada, um código de redefinição é gerado, armazenado temporariamente e enviado para o endereço de e-mail cadastrado. O código possui validade de 15 minutos.

**Request Body**:

```json
{
  "email": "string"
}
```

ou

```json
{
  "cpf": "string"
}
```

**Response 200**:

Sem corpo de resposta.

**Response 400**:

```json
{
  "err": "EMAIL_OU_CPF_NECESSARIO"
}
```

Retornado quando nem o e-mail nem o CPF são fornecidos na requisição.

**Response 404**:

Sem corpo de resposta.

Retornado quando não existe exatamente um usuário correspondente ao e-mail ou CPF informado.
```

### POST /api/v1/auth/redefinir-senha

**Descrição**: Conclui o processo de redefinição de senha. O usuário deve informar o código de redefinição recebido por e-mail e a nova senha desejada. Caso o token seja válido, a senha é atualizada e o token é invalidado para impedir reutilização.

**Request Body**:

```json
{
  "token": "string",
  "novaSenha": "string"
}
```

**Response 200**:

Sem corpo de resposta.

**Response 400**:

```json
{
  "err": "TOKEN_INVALIDO"
}
```

Retornado quando o token informado não existe ou não é mais válido.

**Response 400**:

```json
{
  "err": "string"
}
```

Retornado quando ocorre algum erro durante a atualização da senha, como violação de regras de validação definidas pelo sistema.

## Tarefas

### GET /api/v1/tarefa

**Descrição**: Retorna a lista de todas as tarefas pertencentes ao usuário autenticado.

**Headers**:

```http
Authorization: Bearer <token>
```

**Response 200**:

```json
[
  {
    "id": "number",
    "titulo": "string",
    "desc": "string",
    "prazo": "string",
    "finished": "boolean"
  }
]
```

Caso o usuário não possua tarefas cadastradas, será retornado um vetor vazio:

```json
[]
```

**Response 401**:

```json
{
  "err": "string"
}
```

Retornado quando o token de autenticação está ausente, expirado ou é inválido.

### POST /api/v1/tarefa

**Descrição**: Cria uma nova tarefa associada ao usuário autenticado. É necessário informar o título, a descrição e o prazo da tarefa.

**Headers**:

```http
Authorization: Bearer <token>
```

**Request Body**:

```json
{
  "titulo": "string",
  "desc": "string",
  "prazo": "2026-06-12T23:59:59.000Z"
}
```

**Response 201**:

```json
{
  "id": "number",
  "titulo": "string",
  "desc": "string",
  "prazo": "string",
  "finished": false
}
```

**Response 400**:

```json
{
  "err": "DADOS_INVALIDOS"
}
```

Retornado quando o título ou a descrição são vazios, não são strings válidas, ou quando o prazo informado possui formato inválido.

**Response 401**:

```json
{
  "err": "string"
}
```

Retornado quando o token de autenticação está ausente, expirado ou é inválido.

### PUT /api/v1/tarefa/:id

**Descrição**: Atualiza uma tarefa existente pertencente ao usuário autenticado. É possível atualizar um ou mais dos seguintes campos: título, descrição, prazo e status de conclusão.

**Parâmetros de Rota**:

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| id | string | Identificador da tarefa a ser atualizada. |

**Headers**:

```http
Authorization: Bearer <token>
```

**Request Body**:

Todos os campos são opcionais, mas pelo menos um deles deve ser informado.

```json
{
  "titulo": "string",
  "desc": "string",
  "prazo": "2026-06-12T23:59:59.000Z",
  "finished": true
}
```

**Response 200**:

```json
{
  "id": "number",
  "titulo": "string",
  "desc": "string",
  "prazo": "string",
  "finished": true
}
```

**Response 400**:

```json
{
  "err": "DADOS_INVALIDOS"
}
```

Retornado quando:
- Nenhum campo é fornecido para atualização;
- O título ou a descrição são vazios ou não são strings válidas;
- O prazo possui formato inválido;
- O campo `finished` não é um valor booleano.

**Response 404**:

```json
{
  "err": "TAREFA_NOT_FOUND"
}
```

Retornado quando o identificador informado não é válido ou quando a tarefa não existe ou não pertence ao usuário autenticado.

**Response 401**:

```json
{
  "err": "string"
}
```

Retornado quando o token de autenticação está ausente, expirado ou é inválido.

### DELETE /api/v1/tarefa/:id

**Descrição**: Remove uma tarefa pertencente ao usuário autenticado.

**Parâmetros de Rota**:

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| id | string | Identificador da tarefa a ser removida. |

**Headers**:

```http
Authorization: Bearer <token>
```

**Response 204**:

Sem corpo de resposta.

**Response 404**:

```json
{
  "err": "TAREFA_NOT_FOUND"
}
```

Retornado quando o identificador informado não é válido ou quando a tarefa não existe ou não pertence ao usuário autenticado.

**Response 401**:

```json
{
  "err": "string"
}
```

Retornado quando o token de autenticação está ausente, expirado ou é inválido.
```