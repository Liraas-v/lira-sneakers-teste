# 👟 Lira Sneakers — Web

Site responsivo completo para lavanderia/restauração de sneakers com landing page pública, área logada para clientes, programa de fidelidade e painel administrativo para o gestor.

---

## Stack

| Tecnologia       | Versão  | Uso                                      |
|------------------|---------|------------------------------------------|
| React            | 18.3    | UI e gerenciamento de estado             |
| Vite             | 5.4     | Bundler e dev server                     |
| lucide-react     | 1.7     | Ícones (tree-shaken, ~7KB gzip)          |
| chart.js         | 4.4     | Gráficos no painel admin                 |
| react-chartjs-2  | 5.2     | Wrapper React para Chart.js              |
| Google Fonts     | —       | Bebas Neue + DM Sans                     |
| CSS Variables    | —       | Design system (sem framework CSS)        |

Sem backend. Sem variáveis de ambiente obrigatórias. Funciona 100% em memória.

---

## Início rápido

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em modo desenvolvimento
npm run dev
# → http://localhost:5173

# 3. Build de produção
npm run build

# 4. Preview do build
npm run preview
```

**Credenciais de acesso (demo):**

```
Usuário: admin
Senha:   1234
```

---

## Estrutura de pastas

```
lira-sneakers-web/
├── public/
│   └── logo.png                  ← substitua pelo logo real
├── src/
│   ├── components/
│   │   ├── BottomNav.jsx         ← navegação inferior (mobile only)
│   │   ├── Icon.jsx              ← wrapper lucide-react com mapa de ícones
│   │   ├── PageHeader.jsx        ← título + botão voltar (desktop)
│   │   ├── ServicoCard.jsx       ← card de serviço com botão add
│   │   ├── Sidebar.jsx           ← nav lateral desktop + drawer mobile
│   │   ├── TierCard.jsx          ← card de nível de fidelidade
│   │   ├── Toast.jsx             ← feedback de ações
│   │   └── TopBar.jsx            ← header mobile com hamburger
│   ├── context/
│   │   └── AppContext.jsx        ← estado global + lógica de negócio
│   ├── data/
│   │   ├── constants.js          ← serviços, tiers, recompensas, nav, depoimentos, localização
│   │   └── mockData.js           ← dados de seed do usuário demo
│   ├── hooks/
│   │   ├── useAuth.js            ← autenticação + updateUser
│   │   ├── useCart.js            ← carrinho de orçamento
│   │   ├── useTier.js            ← cálculo de nível e progresso
│   │   └── useToast.js           ← notificações temporárias
│   ├── lib/
│   │   └── auth.js               ← login/cadastro estático (hardcoded)
│   ├── pages/
│   │   ├── AdminPage.jsx         ← PAINEL ADMIN (novo)
│   │   ├── AuthPage.jsx          ← login e cadastro
│   │   ├── CarrinhoPage.jsx      ← orçamento + envio para WhatsApp
│   │   ├── FidelidadePage.jsx    ← pontos, resgates, níveis, histórico
│   │   ├── HomePage.jsx          ← dashboard principal do cliente
│   │   ├── LandingPage.jsx       ← página pública (sem login)
│   │   ├── MeusPedidosPage.jsx   ← acompanhamento de pedidos
│   │   ├── NotificacoesPage.jsx  ← central de notificações
│   │   ├── PerfilPage.jsx        ← dados do usuário e acesso rápido
│   │   ├── ServicosPage.jsx      ← catálogo com filtro por categoria
│   │   └── SuportePage.jsx       ← FAQ e canais de contato
│   ├── styles/
│   │   └── global.css            ← design system completo (CSS variables)
│   ├── App.jsx                   ← shell responsivo + roteamento
│   └── main.jsx                  ← entry point
├── index.html                    ← meta tags Open Graph + favicon
├── vite.config.js                ← code splitting manual
├── vercel.json                   ← SPA rewrite rules
└── package.json
```

---

## Fluxo de navegação

```
[Visitante]
    ↓
LandingPage (pública)
    ├── Ver serviços, depoimentos, localização
    ├── Botão "Solicitar orçamento" → abre WhatsApp direto
    └── Botão "Entrar" → modal de login

[Logado como cliente]
    ↓
HomePage → dashboard com TierCard e categorias
    ├── ServicosPage → catálogo com filtro por categoria
    │       └── Adicionar ao carrinho
    ├── CarrinhoPage → orçamento + envio WhatsApp + acúmulo de pontos
    ├── FidelidadePage → pontos, resgates, níveis, histórico
    ├── PerfilPage → stats + menu de acesso rápido
    │       ├── MeusPedidosPage → acompanhamento com timeline
    │       ├── NotificacoesPage → notificações com badge
    │       ├── SuportePage → FAQ + canais de contato
    │       └── AdminPage → PAINEL GESTOR
    └── AdminPage → gestão completa (ver abaixo)

[Painel Admin]
    ├── Dashboard → métricas + gráficos
    ├── Pedidos → CRUD + adição rápida por texto
    └── Financeiro → pendências + análise de receita
```

---

## Funcionalidades por área

### 🌐 Landing Page (pública)

- Hero com proposta de valor, CTA direto para WhatsApp
- Catálogo completo de serviços com preços e prazos de entrega
- Filtro de categorias (Limpeza, Pintura, Couro, Proteção...)
- Depoimentos de clientes com nota e serviço realizado
- Seção de localização com horários de atendimento
- Modal de login/cadastro sobreposto (sem sair da página)
- Responsiva: menu hamburger no mobile

### 🛍️ Catálogo de Serviços

| Serviço                 | Categoria | Preço base |
|-------------------------|-----------|------------|
| Limpeza Completa        | Limpeza   | R$ 70      |
| Limpeza Premium (Grife) | Limpeza   | R$ 100     |
| Limpeza de Bonés        | Limpeza   | R$ 40      |
| Pintura Entressola      | Pintura   | R$ 90      |
| Pintura de Cabedal      | Pintura   | R$ 100     |
| Restauração de Camurça  | Couro     | R$ 70      |
| Hidratação de Camurça   | Couro     | R$ 50      |
| Hidratação do Couro     | Couro     | R$ 30      |
| Colagem                 | Reparo    | R$ 60      |
| Impermeabilização       | Proteção  | R$ 35      |
| Taxa de Urgência        | Extra     | R$ 30      |

Os valores são estimativas — confirmação acontece via WhatsApp.

### 🌟 Programa de Fidelidade (Lira+)

**1 ponto por R$ 1 gasto.**

| Nível      | Pontos    | Benefícios                                  |
|------------|-----------|---------------------------------------------|
| 🥉 Bronze  | 0 – 399   | 5% desconto                                 |
| 🥈 Prata   | 400 – 799 | 10% + frete grátis                          |
| 🥇 Ouro    | 800 – 1599| 15% + frete + prioridade                    |
| 💎 Diamante| 1600+     | 20% + VIP + brinde mensal                   |

**Recompensas disponíveis para resgate:**

| Recompensa                  | Pontos |
|-----------------------------|--------|
| Hidratação de Couro Grátis  | 200 pts|
| 10% OFF no próximo serviço  | 350 pts|
| Kit Impermeabilização        | 400 pts|
| Limpeza Completa Grátis     | 550 pts|

### 🛒 Fluxo de Orçamento

1. Cliente adiciona serviços ao carrinho em **Serviços**
2. Revisa o total estimado e pontos a ganhar em **Orçamento**
3. Clica em **Solicitar via WhatsApp** → abre conversa pré-preenchida
4. Pontos são creditados automaticamente no perfil
5. Pedido aparece no histórico em **Lira+ → Histórico**

### 🔧 Painel Admin (AdminPage)

Acesso: faça login → Perfil → Painel Admin (ou `#admin` na URL).

#### Dashboard
- **Métricas em tempo real**: faturamento total, total recebido, a receber, ticket médio
- **Gráfico de receita mensal**: faturado vs recebido (últimos 4 meses)
- **Gráfico de status**: pizza com distribuição Pago / Parcial / Pendente
- **Últimos 5 pedidos** com visão rápida de status

#### Gestão de Pedidos
- **Adição rápida por texto**: digite `Laura — Limpeza + Pintura — R$ 160,00` e pressione Enter. Sem formulário.
- **Formulário completo**: nome, telefone, serviços, valor total, valor recebido, status do serviço, data, observações
- **Preview de pagamento**: barra de progresso em tempo real ao preencher valores
- **Filtro por status**: Todos / Pagos / Parciais / Pendentes
- **Ações por linha**: Ver detalhes, Registrar pagamento, Editar, Excluir

#### Registro de Pagamento Parcial
- Selecione o pedido com saldo pendente
- Informe o valor recebido agora
- O sistema calcula automaticamente o novo saldo, atualiza a barra de progresso e marca como Pago quando quitado

Exemplo: Pedido de R$ 160,00. Cliente pagou R$ 100,00.
→ Saldo: R$ 60,00 pendente. Barra: 62% concluído.
→ Quando registrar os R$ 60,00 restantes: status muda para Pago automaticamente.

#### Financeiro
- **A receber por cliente**: lista com barra de progresso individual
- **Serviços mais realizados**: gráfico de barras horizontal
- **Tabela de pendências**: visão consolidada de todos os clientes com saldo aberto

---

## Roteamento

Navegação por hash URL — sem bibliotecas adicionais, sem reload de página.

| URL              | Página                    | Acesso    |
|------------------|---------------------------|-----------|
| `/`              | LandingPage ou HomePage   | Público   |
| `/#home`         | Início (dashboard cliente)| Logado    |
| `/#servicos`     | Catálogo de serviços      | Logado    |
| `/#carrinho`     | Orçamento                 | Logado    |
| `/#fidelidade`   | Programa Lira+            | Logado    |
| `/#perfil`       | Perfil do usuário         | Logado    |
| `/#notificacoes` | Notificações              | Logado    |
| `/#suporte`      | FAQ e contato             | Logado    |
| `/#meus-pedidos` | Acompanhamento            | Logado    |
| `/#admin`        | Painel Admin              | Logado    |

---

## Responsividade

| Breakpoint      | Layout                                           |
|-----------------|--------------------------------------------------|
| Desktop (>768px)| Sidebar fixa 260px + conteúdo em grid 2 colunas |
| Tablet (768–1024px)| Sidebar 220px + conteúdo adaptado            |
| Mobile (≤768px) | Drawer hamburger + BottomNav de 5 itens          |

A troca de layout é feita exclusivamente via CSS (sem JavaScript de resize).

---

## Personalização

### Trocar o logo

Substitua o arquivo `public/logo.png`. Aparece automaticamente em: LandingPage, Sidebar, Perfil e favicon.

### Alterar o número do WhatsApp

Em `src/data/constants.js`:

```js
export const WHATSAPP_NUMBER = '5511930733933'; // DDD + número sem espaços
```

### Adicionar ou editar serviços

Em `src/data/constants.js`, array `SERVICOS`:

```js
{ id: 12, titulo: 'Novo Serviço', desc: 'Descrição.', categoria: 'Categoria', preco: 80 }
```

### Atualizar prazos de entrega

Em `src/data/constants.js`, objeto `PRAZOS`:

```js
export const PRAZOS = {
  'Novo Serviço': '2 a 3 dias úteis',
  // ...
};
```

### Atualizar depoimentos

Em `src/data/constants.js`, array `DEPOIMENTOS`:

```js
{ id: 'd5', nome: 'João P.', cidade: 'SP', texto: 'Excelente serviço!', servico: 'Limpeza Completa', nota: 5, inicial: 'J' }
```

### Alterar números de impacto (hero)

Em `src/data/constants.js`, array `NUMEROS`:

```js
export const NUMEROS = [
  { valor: '800+',  label: 'Pares restaurados' },
  // ...
];
```

### Atualizar localização e horários

Em `src/data/constants.js`, objeto `LOCATION`:

```js
export const LOCATION = {
  cidade: 'São Paulo',
  estado: 'SP',
  descricao: 'Atendemos...',
  horarios: [
    { dia: 'Segunda a Sexta', hora: '9h às 19h' },
    // ...
  ],
};
```

### Trocar cores do design system

Em `src/styles/global.css`, seção `:root`:

```css
:root {
  --gold:    #f5c842;  /* cor de destaque principal */
  --bg:      #080808;  /* fundo da aplicação */
  --surface: #111111;  /* fundo de cards */
  --text:    #ffffff;  /* texto principal */
}
```

### Adicionar ícones

Em `src/components/Icon.jsx`, importe e registre no `ICON_MAP`:

```js
import { NomeDoIcone } from 'lucide-react';

const ICON_MAP = {
  'nome-do-icone': NomeDoIcone,
};
```

---

## Deploy no Vercel

```bash
# 1. Push para o GitHub
git init && git add . && git commit -m "initial"
git remote add origin https://github.com/seu-usuario/lira-sneakers-web
git push -u origin main

# 2. Importe o repositório em vercel.com
# → Framework Preset: Vite
# → Build Command: npm run build
# → Output Directory: dist
# → Sem variáveis de ambiente necessárias
```

O arquivo `vercel.json` já está configurado com o rewrite para SPA:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## Conectar um banco de dados real (Supabase)

Esta versão roda completamente em memória. Para migrar para persistência real:

**1. Instalar o cliente**

```bash
npm install @supabase/supabase-js
```

**2. Criar `src/lib/supabase.js`**

```js
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

**3. Substituir `src/lib/auth.js`**

```js
import { supabase } from './supabase';

export async function staticLogin(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
  if (error) return { ok: false, error: error.message };
  return { ok: true, user: data.user };
}
```

**4. Adicionar `.env`**

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

**5. Persistir pedidos do admin**

No `AdminPage.jsx`, substitua o estado `pedidos` por chamadas a:
```js
supabase.from('pedidos').select('*')
supabase.from('pedidos').insert([novoPedido])
supabase.from('pedidos').update({...}).eq('id', id)
supabase.from('pedidos').delete().eq('id', id)
```

---

## Próximas melhorias sugeridas (roadmap)

1. **Persistência Supabase** — dados sobrevivem ao recarregar (prioridade máxima)
2. **Histórico por cliente** — ao digitar um nome no admin, ver todos os pedidos anteriores
3. **Cobrança WhatsApp 1 clique** — botão que abre WhatsApp com mensagem de cobrança pronta
4. **Status editável pelo admin** — mover pedido entre etapas e o cliente ver em tempo real
5. **Foto do tênis no pedido** — upload direto no admin via Supabase Storage
6. **Relatório mensal** — exportar PDF/Excel com faturamento e métricas
7. **Metas financeiras** — definir meta mensal e ver barra de progresso no dashboard

---

## Build e performance

```
dist/index.html              ~1.98 KB │ gzip: ~0.80 KB
dist/assets/index.css        ~8.33 KB │ gzip: ~2.45 KB
dist/assets/index.js        ~74.29 KB │ gzip: ~17.60 KB  ← código do app
dist/assets/vendor-react.js ~133.94 KB│ gzip: ~43.13 KB  ← React
dist/assets/vendor-lucide.js ~25.19 KB│ gzip: ~6.92 KB   ← ícones usados
dist/assets/vendor-charts.js ~90.00 KB│ gzip: ~30.00 KB  ← Chart.js
```

Total transferido no primeiro acesso: ~100 KB gzip.

Chunks separados permitem cache granular — atualizar o app não invalida o cache do React e do Lucide nos browsers dos usuários.

---

## Licença

Projeto privado — Lira Sneakers. Todos os direitos reservados.
