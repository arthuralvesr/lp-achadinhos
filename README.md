# Acha+ · Site público

Landing page pública independente, com Next.js App Router, React, TypeScript e Tailwind CSS 4. Inclui hero animada, faixas de marcas, promoções, convite para o grupo, cupons, vantagens, perguntas frequentes e catálogo em `/promocoes`.

## Executar

Requer Node.js 22 ou superior.

```sh
npm install
npm run dev
```

Abra **http://localhost:3001**.

```sh
npm run lint
npm run typecheck
npm run build
npm start
```

O servidor de produção usa a porta padrão do Next.js (3000) ou a variável `PORT` da hospedagem.

## Onde editar

- `src/app/`: página inicial, layout, metadados, ícone e estilos globais.
- `src/components/home/`: hero, celular com conversa, ofertas laterais e animações.
- `src/components/offers/`: cards de produtos, identificação das lojas, estilos e catálogo com busca e filtros.
- `src/components/ui/`: link do grupo e ícones reutilizáveis.
- `src/content/hero.ts`: textos da hero e tipagem da demonstração.
- `src/content/brands.ts`: marketplaces e exemplos de marcas das faixas cruzadas.
- `src/content/benefits.ts`: títulos, descrições e detalhes das quatro vantagens do grupo.
- `src/content/offers.ts`: produtos públicos extraídos do acervo, seleção da landing, moeda e cálculo de desconto.
- `src/content/faq.ts`: cinco perguntas e respostas sobre o grupo, compra e condições das ofertas.
- `src/content/coupons.ts`: exemplos de descontos do acervo e produto destacado na nota ilustrativa.
- `src/content/groups.ts`: números e estados de apresentação dos grupos, configurados manualmente conforme a proposta do usuário.
- `src/content/group-preview.json`: seleção pública de mensagens reais já enviadas no grupo.
- `src/config/site.ts`: nome da marca e links públicos do grupo e Instagram.
- `src/assets/fonts/`: Poppins local e licença.
- `public/images/hero/`: imagens WebP usadas na composição.

As cores gerais ficam em `src/app/globals.css`; a paleta escura e a composição da hero em `src/components/home/hero.css`. Tailwind está disponível para os próximos componentes. A página e o texto principal são renderizados no servidor. A conversa é pré-renderizada com a primeira mensagem e continua no navegador, com notificações, rolagem do chat e entrada dos cards laterais.

A entrada começa quando a área do celular fica visível: o aparelho desce do topo da tela, gira 360° no eixo vertical com inclinação e pousa de frente em aproximadamente **1,7 segundo**. Descida e rotação têm curvas contínuas independentes, sem as desacelerações intermediárias da primeira versão. O volume é construído em CSS 3D, com frente, traseira, câmeras, bordas e espessura; não exige WebGL, vídeo ou modelo externo. `phone-model.tsx` contém a geometria e `hero.css` contém os percursos `phone-descend` e `phone-drop-spin`.

O pouso preserva a cena 3D e o último quadro das animações. A tela frontal fica desde o início no plano Z=0; não há troca para uma composição plana ou mudança de profundidade ao terminar o giro.

As notificações e os cards laterais ficam bloqueados até o evento de término da entrada. A sequência avança automaticamente e para quando a aba está oculta ou o celular sai da área visível. Não há controles, bolinhas de progresso ou legenda externa. Com movimento reduzido, o aparelho aparece parado com todas as mensagens e o botão do grupo disponíveis. A rolagem da página usa `requestAnimationFrame`, sem atualizar estado React a cada evento.

Após o pouso, a primeira notificação aparece em 160 ms e a mensagem com seu balão lateral em 650 ms. A primeira oferta é o gloss do print de referência. Um cursor ilustrativo toca seu link e abre, dentro do celular, uma prévia identificada do produto, seguida de uma simulação de entrega. O botão “Comprar na loja” é um link real; a demonstração nunca navega para fora, abre abas ou realiza compras automaticamente. As próximas mensagens chegam em intervalos de 1,4 segundo. Ao focar, clicar ou rolar dentro do celular, a demonstração pausa e retoma após 6,5 segundos sem interação. Ao terminar, mostra “Quero ver mais achados” dentro do aparelho.

As mensagens flutuantes se distribuem por toda a hero, em alturas diferentes, incluindo as laterais do título e a região do celular. No desktop, ficam mais próximas entre si, com sobreposição leve. Até 900 px, todas viram notificações compactas e se concentram na parte inferior, sobre o aparelho; o título começa diretamente no topo, sem espaço reservado para notificações. Os links originais das ofertas são preservados. Os enfeites externos de estrela e X foram removidos. Hover ou foco trazem uma mensagem para a frente e pausam seu movimento para leitura. Clicar nela (ou pressionar Enter/Espaço ao focar o grupo) mantém o destaque até selecionar outra. A preferência de movimento reduzido desativa a flutuação.

## Escopo atual

A ordem da landing é: hero, faixas de marcas, promoções, grupos, cupons, vantagens e perguntas frequentes. A seção institucional de vantagens foi movida para o final; a seção de IA e seus arquivos exclusivos foram removidos.

A seção dos grupos usa fundo off-white. Os grupos lotados ficam menores, em cinza suave e com vermelho discreto; o card atual é inteiramente uma conversa do WhatsApp no tema claro, com borda verde e indicação de vagas no cabeçalho. `group-invite-chat.tsx` é um componente de servidor e mostra a conversa pronta: “Quero fazer parte” já enviada e a resposta do assistente com o convite de `src/config/site.ts`. O convite tem prévia destacada e botão verde maior, visível desde o primeiro carregamento, sem campo de envio, temporizador, animação ou rolagem interna. A conversa é ilustrativa; clicar no convite abre o WhatsApp. O mesmo conteúdo funciona sem JavaScript.

As vantagens têm notificações ilustrativas do grupo sobre as fotos dos cards. `benefits-notifications.tsx` controla a visibilidade da animação: as mensagens entram em sequência, pausam fora da tela ou com a aba oculta e não interceptam cliques. Em telas pequenas aparecem duas posições; movimento reduzido mostra apenas uma notificação parada. Os textos são genéricos, sem preços, contadores ou alegações de envios ao vivo.

A hero começa diretamente pelo título, sem barra superior. Tem chamadas funcionais para o grupo. Um celular central reproduz visualmente uma conversa do WhatsApp em HTML/CSS, usando a fonte do sistema para a interface do aplicativo. As ofertas laterais e os links das mensagens levam às URLs reais dos envios.

Duas faixas cruzadas aparecem abaixo do celular, com espaço entre o aparelho e as faixas, trazendo os nomes de Shopee, Mercado Livre e exemplos de marcas de produtos. Os nomes são tipográficos, sem indicar parceria ou disponibilidade garantida. O movimento em sentidos opostos usa apenas CSS e pausa ao passar o mouse sobre uma faixa. Movimento reduzido mantém as faixas paradas. O destaque do título usa o mesmo verde-lima da faixa principal.

A seção `#vantagens` fica depois dos cupons e antes das perguntas frequentes, e adapta os quatro benefícios de “04 / Vantagens” do Figcraft à identidade da hero: fundo escuro, título em verde-lima e cards fotográficos com título e descrição em bases coloridas. Os quatro cards cabem em uma linha no desktop e em duas linhas nas telas menores, sem rolagem lateral ou setas. `benefits-cards.tsx` controla o destaque por mouse, toque ou teclado: o card destacado cresce enquanto os vizinhos encolhem, mantendo a largura disponível e a altura dos cards. Toque mantém o destaque. As fotos são WebP locais; fontes e créditos estão em `public/images/benefits/SOURCES.md`. `benefits-motion.tsx` acrescenta entradas na rolagem com IntersectionObserver e Web Animations. O conteúdo permanece disponível sem JavaScript, e a preferência de movimento reduzido mantém as interações sem transições animadas. O botão da seção usa o mesmo link público do grupo.

O acervo contém quatro ofertas efetivamente enviadas pelo sistema em **09/11/2026** (robô aspirador, mochila, panelas e gloss) e o trecho do Mercado Livre de um boletim real de cupons enviado na mesma data. Fotos, preços, texto formatado, URLs e horários vêm desses registros. Os títulos curtos usados nas descrições das imagens são editoriais. O boletim está identificado como trecho e tem um link para o grupo.

`whatsapp-message.tsx` é o único componente de balão, usado tanto no celular quanto nas laterais. Ele segue o print no tema claro: remetente “Acha Mais”, fundo branco, foto, texto com as mesmas quebras e formatação, preço anterior riscado, URL azul sublinhada e horário à direita. Não há avatar, selo da loja ou cartão de preços inventado dentro da mensagem.

É uma seleção reproduzida em uma sequência de demonstração; não é um histórico cronológico completo nem um feed ao vivo. A data do acervo permanece nos dados e nas mensagens. A legenda externa de data e preços foi removida a pedido do usuário. O antigo cupom simulado de 10% foi removido da hero.

A interface foi implementada neste projeto; não usa o código proprietário do WhatsApp. Referência visual adicional: [WhatsApp Groups](https://www.whatsapp.com/groups). O padrão do fundo da conversa é um SVG local.

A seção `#achados`, “Escolhidas para o seu dia”, vem logo depois das faixas de marcas. Mostra três produtos completos com fotos e preços do acervo, preço anterior riscado, percentual de desconto calculado, logo da loja e links de afiliado originais. A quarta posição é uma prévia cortada e desfocada, com convite para o grupo VIP; o conteúdo por trás é decorativo e inerte. O convite para o grupo fica somente no último card dessa seção; o topo mostra apenas o título, a descrição e o link para todas as promoções, sem a chamada anterior acima do título. `offers-reveal.tsx` faz os produtos entrarem na rolagem, com deslocamento, escala e opacidade em sequência; movimento reduzido desativa essa animação, e o conteúdo continua disponível sem JavaScript.

O botão “Ver todas as promoções” abre `/promocoes`, que mantém os quatro produtos acessíveis, com busca sem distinção de acentos, filtro por loja, ordenação por data/preço/desconto e estado vazio com limpeza dos filtros. Não há cadastro ou grupo obrigatório para abrir a loja. O convite para o grupo fica como alternativa no final da listagem. Cards e imagens são renderizados no servidor; somente os controles do catálogo usam estado no navegador. Os links externos abrem uma nova aba com `sponsored noopener noreferrer`.

As duas vitrines informam a data do acervo, a possibilidade de mudança dos preços e a existência de links com comissão. Os produtos são estáticos, sem sincronização automática ou consulta de disponibilidade na loja. Os logos locais e suas fontes estão em `public/images/stores/SOURCES.md`.

A seção `#cupons` aparece entre os grupos e as vantagens. `coupons.tsx` mostra apenas um trecho compacto do final de uma nota ilustrativa: topo cortado, papel claro inclinado, bordas serrilhadas e código de barras decorativo. A chamada ao lado foi reduzida a título, uma frase e convite para receber cupons. `src/content/coupons.ts` seleciona um desconto do boletim público 221 e a mochila do registro 222, com preço anterior riscado, preço registrado, economia calculada e link de afiliado original. A nota informa a data do acervo e que cupons e produto são independentes; nenhum desconto foi inventado ou aplicado ao produto. A faixa coberta abre um modal nativo com o convite do grupo, via `coupon-gate.tsx`; Escape, botão de fechar e clique fora fecham o modal. Sem JavaScript, há um convite direto. Não há feed de cupons nem consulta de validade em tempo real.

A seção `#grupos` fica abaixo dos produtos. Os grupos 12 e 13 estão apresentados como lotados, com X grande e botões nativamente desabilitados, sem link de convite. O grupo 14 é destacado como atual e usa o convite de `src/config/site.ts`. Esses estados são de apresentação, definidos manualmente pelo usuário; não há consulta ao WhatsApp para verificar capacidade ou número de participantes. No desktop os três cards ficam lado a lado; em telas menores, os dois encerrados dividem uma linha e o atual ocupa a linha seguinte. Todo o conteúdo funciona sem JavaScript.

O repositório contém apenas arquivos públicos do site e instala suas próprias dependências. A execução atual não exige variáveis de ambiente. Arquivos locais, builds, logs, bancos de dados e credenciais estão excluídos pelo `.gitignore`.
A seção `#perguntas-frequentes` encerra a página com fundo branco, título à esquerda e cinco perguntas expansíveis à direita, em verde e verde-lima. Em telas menores, as duas colunas se empilham. `faq.tsx` usa `details`/`summary` nativos com o mesmo `name`: a primeira resposta vem aberta e apenas uma permanece aberta por vez. Funciona por toque, mouse e teclado, inclusive sem JavaScript. Movimento reduzido desativa a entrada das respostas.
