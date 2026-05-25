# Guia de estilos e padrões

Este documento registra os padrões visuais e de interface usados no aplicativo.

## Tipografia

O projeto usa a família **Roboto Mono**, carregada em `src/App.tsx` com `@expo-google-fonts/roboto-mono`.

Variações em uso:

- `RobotoMono_300Light`
- `RobotoMono_400Regular`
- `RobotoMono_500Medium`
- `RobotoMono_600SemiBold`
- `RobotoMono_700Bold`

## Paleta de cores

As cores estão centralizadas em `src/constants/theme.ts`.

| Nome | Valor | Uso |
| :--- | :--- | :--- |
| `primary` | `#6750A4` | Botões de ação, estados ativos e títulos principais. |
| `primaryTint` | `#D9CAFF` | Destaques suaves e elementos secundários. |
| `background` | `#F9F7FD` | Fundo das telas e componentes. |
| `onSurface` | `#1E1E1E` | Textos principais e elementos de maior contraste. |
| `onSurfaceVariant` | `#49454F` | Ícones neutros, labels e estados desativados. |
| `error` | `#B3261E` | Mensagens de erro, validação e ações destrutivas. |

## Componentes padronizados

### `<Botao />`

Use para ações principais.

```tsx
<Botao
  conteudo="Entrar"
  onPress={handleEntrar}
  desativado={false}
/>
```

### `<LineInput />`

Campo de texto padrão do sistema. Suporta estado de foco, erro, placeholder, teclado específico, texto seguro e limpeza do campo.

```tsx
<LineInput
  label="E-mail"
  value={email}
  onChangeText={setEmail}
  onClosePress={() => setEmail("")}
  error={emailInvalido}
  errorValue="E-mail inválido"
  placeholder="Digite seu e-mail"
  keyboardType="email-address"
/>
```

## Convenções de interface

- Preferir componentes existentes antes de criar novos.
- Usar as cores de `Colors.light` em vez de valores hexadecimais soltos.
- Manter textos e labels em português, seguindo o vocabulário já usado nas telas.
- Para campos de formulário, exibir mensagem de erro próxima ao campo quando houver validação.
- Para novos componentes reutilizáveis, documentar aqui quando eles passarem a fazer parte do padrão do projeto.
