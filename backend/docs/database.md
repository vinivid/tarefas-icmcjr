# database.md

# Banco de Dados

A aplicação utiliza MongoDB para armazenamento dos dados.

---

# Coleção User

## Campos

* nome (String)
* dataNascimento (Date)
* email (String, único)
* cpf (String, único)
* senha (String)

## Índices

* email
* cpf

## Documento de exemplo

```json
{
  "nome": "João Silva",
  "dataNascimento": "2007-01-12T00:00:00.000Z",
  "email": "joao@email.com",
  "cpf": "12345678900",
  "senha": "$2b$10$..."
}
```

---

# Coleção Tarefa

## Campos

* usuarioId (ObjectId)
* titulo (String)
* desc (String)
* prazo (Date)
* finished (Boolean)

## Relação

Cada tarefa pertence a um usuário através do campo `usuarioId`.

## Documento de exemplo

```json
{
  "usuarioId": "6848e7e95f5e0e8a64d2e1f1",
  "titulo": "Estudar",
  "desc": "Resolver exercícios",
  "prazo": "2026-06-20T00:00:00.000Z",
  "finished": false
}
```

---

# Coleção ResetToken

## Campos

* usuarioId (ObjectId)
* token (String)
* expiracao (Date)

## Relação

Cada token de redefinição pertence a um usuário.

## Documento de exemplo

```json
{
  "usuarioId": "6848e7e95f5e0e8a64d2e1f1",
  "token": "123456",
  "expiracao": "2026-06-20T15:00:00.000Z"
}
```
