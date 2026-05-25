# Estrutura de diretórios

O projeto concentra o código da aplicação em `src/`, separando componentes, telas, navegação, contexto, hooks, tipos e constantes.

## Visão geral

```text
src/
├── App.tsx
├── assets/
├── components/
├── constants/
├── context/
├── hooks/
├── navigation/
├── screens/
├── types/
└── types.d.ts
```

## Pastas principais

### `src/App.tsx`

Ponto principal da aplicação. Carrega as fontes Roboto Mono e renderiza o `AppNavigator`.

### `src/assets/`

Arquivos estáticos usados pelo app, como imagens.

### `src/components/`

Componentes reutilizáveis de interface:

- `Botao.tsx`: botão padrão do aplicativo.
- `LineInput.tsx`: campo de texto base com label, foco, erro e ícones.
- `MaskedLineInput.tsx`: variação de input com máscara.
- `TarefaCard.tsx`: card para exibição de tarefas.
- `ModalTarefa.tsx`: modal para criação e edição de tarefas.
- `auth/`: componentes específicos das telas de autenticação, como `UserFieldInput.tsx` e `MaskedUserFieldInput.tsx`.

### `src/constants/`

Constantes globais da aplicação.

- `theme.ts`: paleta de cores usada pelos componentes.

### `src/context/`

Gerenciamento de estado global com React Context.

- `AuthContext.tsx`: estado de autenticação e dados do usuário logado.

### `src/hooks/`

Hooks customizados, principalmente para validação e tratamento dos campos de autenticação.

- `auth/useCpfStr.ts`
- `auth/useDateStr.ts`
- `auth/useEmailStr.ts`
- `auth/usePasswordStr.ts`
- `auth/useUsernameStr.ts`

### `src/navigation/`

Configuração de navegação com React Navigation.

- `AppNavigator.tsx`: decide entre fluxo autenticado e não autenticado.
- `AuthNavigator.ts`: stack das telas de entrada, login e cadastro.
- `HomeNavigator.ts`: abas internas para usuários autenticados.

### `src/screens/`

Telas completas do aplicativo.

- `auth/`: `Init.tsx`, `Login.tsx` e `Registrar.tsx`.
- `home/`: `Tarefas.tsx` e `Perfil.tsx`.

### `src/types/`

Tipos compartilhados do TypeScript, como `User` e `Result`.
