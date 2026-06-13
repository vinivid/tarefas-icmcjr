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

## Esquema de tarefa

### Esquema

```json
usuarioId: {
  type: Schema.Types.ObjectId,
  ref: "User",
  required: true
},
titulo: {
  type: String,
  required: true
},
desc: {
  type: String,
  required: true
},
prazo: {
  type: Date,
  required: true
},
finished: {
  type: Boolean,
  required: true
}
```

Neste esquema temos que **usuarioId** funciona como uma chave estrangeira que faz referência ao documento da coleção de usuários.

### Documento de exemplo

```json
{
  "usuarioId": ObjectId("64b7f1e29d3b4c1a2b3c4d5e"),
  "titulo": "Finalizar relatório mensal",
  "desc": "Concluir a análise financeira e enviar para a diretoria",
  "prazo": ISODate("2026-06-30T23:59:59.000Z"),
  "finished": false
}
```