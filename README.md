# 🌱 Vizinhorta

**Vizinhorta** é uma aplicação web mobile-first construída para conectar e organizar a rotina de **jardins e hortas comunitárias**. A ideia é dar a uma comunidade de vizinhos que cultiva um espaço coletivo um único lugar para: acompanhar os lotes da horta, se organizar em mutirões, marcar presença em eventos, trocar sementes/mudas/ferramentas e manter a comunicação entre os membros.

Não é um app nativo — é uma aplicação **Next.js totalmente responsiva**, pensada e desenhada prioritariamente para a experiência em smartphones (a navegação, os componentes e o layout seguem os padrões de um app mobile, com barra de navegação inferior fixa, cards, gestos de toque etc.), mas funciona em qualquer navegador, inclusive desktop.

## Referência de mercado

O design e o conjunto de funcionalidades foram inspirados em pesquisa sobre produtos já existentes voltados a hortas comunitárias, com destaque para:

- **Patchwork** — foco em atribuição/gestão de lotes, agendamento e comunicação entre membros.
- **Community Garden App** — plataforma com waitlist de lotes, controle de voluntariado e cadastro de membros.
- Padrões recorrentes do setor: diário de plantio com fotos, lembretes de tarefas (rega, poda, colheita), calendário de mutirões, câmbio de sementes/mudas/ferramentas e eventos com confirmação de presença (RSVP).

A partir dessas referências, o produto foi organizado em 5 áreas principais, refletidas na navegação inferior do app: **Início, Mapa, Tarefas, Comunidade e Perfil**.

## Funcionalidades

- **Início** — saudação personalizada, previsão do tempo, atalhos rápidos, próximas tarefas e prévia da atividade da comunidade.
- **Mapa da horta** — grade visual dos lotes com status (disponível, ocupado, meu lote, em espera), legenda e lista completa dos lotes.
- **Detalhe do lote** (`/lote/[id]`) — informações do lote, responsável, culturas plantadas, tarefas vinculadas, diário de fotos e ação principal contextual (reservar, entrar na fila, registrar rega, etc.).
- **Tarefas & mutirões** — lista filtrável de atividades (mutirão, manutenção, rega, colheita) com inscrição/cancelamento de voluntários.
- **Comunidade** — feed social com curtidas, agenda de eventos com confirmação de presença, mural de trocas (sementes, mudas, ferramentas, adubo) e diretório de membros com busca.
- **Perfil** — dados do usuário, estatísticas, conquistas, meus lotes, preferências de notificação e informações da horta.

## Stack técnica

- [Next.js 16](https://nextjs.org/) (App Router, Server Components, Turbopack)
- [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) para ícones

Os dados (lotes, membros, tarefas, eventos, posts e itens de troca) são **mocks locais em TypeScript** (`src/lib/mock-data.ts`), sem backend ou banco de dados — o foco do projeto é a experiência de interface responsiva.

## Design mobile-first

Em telas de smartphone o app ocupa 100% da viewport, com barra de navegação inferior fixa (padrão de apps mobile). Em telas maiores (tablet/desktop), o conteúdo é exibido dentro de um **frame centralizado que simula um celular** (`AppShell`), já que o produto foi desenhado exclusivamente para a experiência mobile.

## Estrutura do projeto

```
src/
├── app/
│   ├── page.tsx              # Início
│   ├── mapa/page.tsx          # Mapa da horta
│   ├── lote/[id]/page.tsx     # Detalhe do lote
│   ├── tarefas/page.tsx       # Tarefas & mutirões
│   ├── comunidade/page.tsx    # Comunidade (feed, eventos, trocas, membros)
│   ├── perfil/page.tsx        # Perfil do usuário
│   └── layout.tsx             # Layout raiz (fontes, metadata, AppShell)
├── components/                # AppShell, BottomNav, PageHeader, Avatar, Switch, CommunityView
└── lib/
    ├── types.ts                # Tipos do domínio (Plot, Member, GardenTask, Post, etc.)
    ├── mock-data.ts             # Dados fictícios da horta
    └── format.ts                # Helpers de formatação de data/hora
```

## Rodando o projeto

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) — para a melhor experiência, abra o DevTools do navegador e ative a simulação de dispositivo móvel (ex.: iPhone 14, 390×844).

```bash
npm run build   # build de produção
npm run start   # roda o build de produção
```
Autoria: **Lázaro Vasconcelos**.