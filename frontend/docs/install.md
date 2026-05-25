# Instalação e execução do front-end

Este documento descreve como preparar e executar o aplicativo React Native com Expo em ambiente local.

## Pré-requisitos

- Node.js em versão LTS
- npm
- Git
- Expo Go no celular ou um emulador Android/iOS configurado

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/vinivid/tarefas-icmcjr
```

2. Acesse a pasta do front-end:

```bash
cd tarefas-icmcjr/frontend
```

3. Instale as dependências:

```bash
npm install
```

## Execução

Para iniciar o servidor de desenvolvimento do Expo:

```bash
npm start
```

Também existem scripts para abrir diretamente em uma plataforma específica:

```bash
npm run android
npm run ios
npm run web
```

## Qualidade de código

Para executar o lint configurado pelo Expo:

```bash
npm run lint
```

## Variáveis de ambiente

Atualmente o app usa dados locais e o `AuthContext` para simular autenticação. Não há variável `.env` obrigatória para rodar o projeto.

Quando houver integração com uma API, documente aqui as variáveis necessárias, por exemplo:

```bash
EXPO_PUBLIC_API_URL=http://localhost:3000
```
