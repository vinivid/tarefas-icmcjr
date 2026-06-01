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