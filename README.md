# 👟 Lira Sneakers — Web

Site responsivo de agendamento de serviços para sneakers com programa de fidelidade. Convertido de app mobile (React Native-like) para site web completo, pronto para deploy no Vercel.

---

## Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18.3 | UI e gerenciamento de estado |
| Vite | 5.4 | Bundler e dev server |
| lucide-react | 1.7 | Ícones (tree-shaken, ~7KB gzip) |
| Google Fonts | — | Bebas Neue + DM Sans |
| CSS Variables | — | Design system (sem framework CSS) |

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
│   │   ├── constants.js          ← serviços, tiers, recompensas, nav
│   │   └── mockData.js           ← dados de seed do usuário demo
│   ├── hooks/
│   │   ├── useAuth.js            ← autenticação + updateUser
│   │   ├── useCart.js            ← carrinho de orçamento
│   │   ├── useTier.js            ← cálculo de nível e progresso
│   │   └── useToast.js           ← notificações temporárias
│   ├── lib/
│   │   └── auth.js               ← login/cadastro estático (hardcoded)
│   ├── pages/
│   │   ├── AuthPage.jsx          ← login e cadastro
│   │   ├── CarrinhoPage.jsx      ← orçamento + envio para WhatsApp
│   │   ├── FidelidadePage.jsx    ← pontos, resgates, níveis, histórico
│   │   ├── HomePage.jsx          ← dashboard principal
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
└── vercel.json                   ← SPA rewrite rules
```

---

## Funcionalidades

### Serviços disponíveis

| Serviço | Categoria | Preço base |
|---|---|---|
| Limpeza Completa | Limpeza | R$ 70 |
| Limpeza Premium (Grife) | Limpeza | R$ 100 |
| Limpeza de Bonés | Limpeza | R$ 40 |
| Pintura Entressola | Pintura | R$ 90 |
| Pintura de Cabedal | Pintura | R$ 100 |
| Restauração de Camurça | Couro | R$ 70 |
| Hidratação de Camurça | Couro | R$ 50 |
| Hidratação do Couro | Couro | R$ 30 |
| Colagem | Reparo | R$ 60 |
| Impermeabilização | Proteção | R$ 35 |
| Taxa de Urgência | Extra | R$ 30 |

Os valores são estimativas — confirmação acontece via WhatsApp.

### Programa de fidelidade

**1 ponto por R$ 1 gasto.**

| Nível | Pontos | Benefícios |
|---|---|---|
| 🥉 Bronze | 0 – 399 | 5% desconto |
| 🥈 Prata | 400 – 799 | 10% + frete grátis |
| 🥇 Ouro | 800 – 1599 | 15% + frete + prioridade |
| 💎 Diamante | 1600+ | 20% + VIP + brinde mensal |

**Recompensas disponíveis para resgate:**

| Recompensa | Pontos |
|---|---|
| Hidratação de Couro Grátis | 200 pts |
| 10% OFF no próximo serviço | 350 pts |
| Kit Impermeabilização | 400 pts |
| Limpeza Completa Grátis | 550 pts |

### Fluxo de orçamento

1. Usuário adiciona serviços ao carrinho em **Serviços**
2. Revisa o total estimado e pontos a ganhar em **Orçamento**
3. Clica em **Solicitar via WhatsApp** → abre conversa pré-preenchida
4. Pontos são creditados automaticamente no perfil
5. Pedido aparece no histórico em **Lira+ → Histórico**

---

## Roteamento

Navegação por hash URL — sem bibliotecas adicionais, sem reload de página.

| URL | Página |
|---|---|
| `/#home` | Início (padrão) |
| `/#servicos` | Catálogo de serviços |
| `/#carrinho` | Orçamento |
| `/#fidelidade` | Programa Lira+ |
| `/#perfil` | Perfil do usuário |
| `/#notificacoes` | Notificações |
| `/#suporte` | FAQ e contato |
| `/#meus-pedidos` | Acompanhamento |

O botão voltar/avançar do browser funciona nativamente. Links podem ser compartilhados diretamente.

---

## Responsividade

| Breakpoint | Layout |
|---|---|
| Desktop (> 768px) | Sidebar fixa 260px + conteúdo em grid de 2 colunas |
| Tablet (768px – 1024px) | Sidebar 220px + conteúdo adaptado |
| Mobile (≤ 768px) | Drawer hamburger + BottomNav de 5 itens |

A troca de layout é feita exclusivamente via CSS (sem JavaScript de resize).

---

## Personalização

### Trocar o logo

Substitua o arquivo `public/logo.png`. Aparece automaticamente em: AuthPage, Sidebar, Perfil e favicon.

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

O filtro de categorias na página de serviços é gerado automaticamente.

### Adicionar ícones

Em `src/components/Icon.jsx`, importe e registre no `ICON_MAP`:

```js
import { NomeDoIcone } from 'lucide-react';

const ICON_MAP = {
  // ...existentes
  'nome-do-icone': NomeDoIcone,
};
```

### Trocar cores do design system

Em `src/styles/global.css`, seção `:root`:

```css
:root {
  --gold:       #f5c842;  /* cor de destaque principal */
  --bg:         #080808;  /* fundo da aplicação */
  --surface:    #111111;  /* fundo de cards */
  --text:       #ffffff;  /* texto principal */
}
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

## Conectar um banco de dados real

Esta versão roda completamente em memória. Para migrar para persistência real com Supabase:

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

export async function staticCadastro(nome, email, telefone, senha) {
  const { data, error } = await supabase.auth.signUp({
    email, password: senha,
    options: { data: { nome, telefone } },
  });
  if (error) return { ok: false, error: error.message };
  return { ok: true, user: data.user };
}
```

**4. Substituir `updateUser` em `src/hooks/useAuth.js`**

Troque as mutações em memória por `supabase.from('profiles').update(...)`.

**5. Adicionar `.env`**

```
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

O arquivo `mockData.js` pode ser deletado após a migração.

---

## Build e performance

```
dist/index.html                 1.98 KB │ gzip: 0.80 KB
dist/assets/index.css           8.33 KB │ gzip: 2.45 KB
dist/assets/index.js           74.29 KB │ gzip: 17.60 KB   ← código do app
dist/assets/vendor-react.js   133.94 KB │ gzip: 43.13 KB   ← React
dist/assets/vendor-lucide.js   25.19 KB │ gzip:  6.92 KB   ← apenas os ícones usados
```

**Total transferido no primeiro acesso: ~70 KB gzip.**

Chunks separados permitem cache granular — atualizar o app não invalida o cache do React e do Lucide nos browsers dos usuários.

---

## Licença

Projeto privado — Lira Sneakers. Todos os direitos reservados.
