## Esquema de Usuário

### Esquema

```json
nome: {
  type: String,
  required: true
},
dataNascimento: {
  type: Date,
  required: true,
},
email: {
  type: String,
  unique: true,
  required: true
},
cpf: {
  type: String,
  unique: true,
  required: true
},
senha: {
  type: String,
  required: true 
}
```

Neste equema temos que email e cpf são indices dos documentos.

### Documento de exemplo

```json
{
  "nome": "A",
  "dataNascimento": ISODate("2007-01-12T00:00:00.000Z"),
  "email": "a@g.c",
  "cpf": "28069389028",
  "senha": "$2b$10$/TjXarMgC54CWEKK5ESoGe7wuLY29uP17K6SihXp6qCzootVz0ELO",
}
```