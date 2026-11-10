# Site público Acha+

- Este repositório contém somente o site público. Instalação, build e publicação são próprios.
- Não importe código, bancos de dados, credenciais, sessões ou arquivos privados de projetos externos. Qualquer integração futura deve receber somente dados públicos.
- A landing contém hero, faixas de marcas, promoções, grupos, cupons, vantagens e perguntas frequentes, além do catálogo `/promocoes`. Amplie seções e rotas quando solicitado; evite links para páginas ou âncoras inexistentes.
- Textos e exemplos da hero ficam em `src/content/hero.ts`; links públicos em `src/config/site.ts`; cores em `src/app/globals.css`.
- A demonstração usa mensagens reais arquivadas em `src/content/group-preview.json`, com fotos locais. Mantenha a data do acervo e a indicação de reprodução animada; não apresente esses preços ou cupons como atuais ou como um feed ao vivo.
- Leia as instruções da versão instalada em `node_modules/next/dist/docs/` antes de alterar convenções do Next.js. Use componentes de servidor para conteúdo e componentes de cliente apenas onde há interatividade.
- Antes de entregar alterações estruturais, execute `npm run lint`, `npm run typecheck` e `npm run build`. Confira visualmente alterações de layout em desktop e celular.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
