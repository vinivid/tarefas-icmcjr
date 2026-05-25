# Testes e validação

Este projeto ainda não possui suíte de testes automatizados configurada. O `package.json` atual não define scripts como `test` ou `test:coverage`.

## Validação disponível hoje

Use o lint para verificar problemas de código:

```bash
npm run lint
```

Use também o próprio Expo para validar o funcionamento manual do app:

```bash
npm start
```

## Como configurar testes no futuro

Quando a suíte de testes for adicionada, recomenda-se usar Jest com React Native Testing Library, seguindo estes padrões:

- Manter testes próximos ao arquivo testado.
- Usar extensão `.test.ts`, `.test.tsx`, `.spec.ts` ou `.spec.tsx`.
- Testar comportamento observável pelo usuário, não detalhes internos de implementação.
- Adicionar scripts no `package.json`, por exemplo `test` e `test:coverage`.

Exemplo esperado depois da configuração:

```bash
npm test
npm run test:coverage
```
