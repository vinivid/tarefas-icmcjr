Todos os comandos executados neste documento pressupõe que você esta na pasta "backend".
Se você não estiver nela os comandos não funcionarão. 

# Rodando o projeto usando Node

É necessário ter um .env padronizado. Para isso é suficiente que você execute o comando:

```
cp .env.example .env
```

Além disso, antes de executar os próximos comandos, é necessário que você realize o setup do mongodb em sua maquina e que um url de acesso para ela seja o mesmo do contido no .env.

Também é necessário iniciar o schema e alguns dados do DB, para isto execute o comando:

```
npm run seed
```

Este comando deve ser executado enquanto o banco de dados estiver sendo executado.
Ele não precisa ser executado toda vez que se inicia o servidor, apenas uma vez para inicializar os schemas e alguns dados.

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

É necessário ter um .env padronizado. Para isso é suficiente que você execute o comando:

```
cp .env.example .env
```

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