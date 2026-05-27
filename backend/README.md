# Rodando o projeto usando Node

Executar no modo desenvolvedor
```
npm run dev
``` 

Buildar e iniciar o servidor
```
npm run build
npm run start
```

# Rodando o projeto usando docker

É necessário que se tenha um .env neste diretório contendo o campo MONGO_URL.
Ex:

MONGO_URL=mongodb://mongo:27017/dados

Tendo isso, é necessário rodar o comando:

```
docker compose up
```

Também é necessário iniciar o schema e alguns dados do DB, para isto execute o comando:

```
docker compose run backend npm run seed
```

Este comando deve ser executado após o backend estar rodando com o docker compose up.

Uma vez seedado não é necessário seedar outras vezes.