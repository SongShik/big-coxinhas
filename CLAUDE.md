# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Comandos

```bash
npm run dev      # inicia o servidor de desenvolvimento em localhost:3000
npm run build    # build de produção
npm run lint     # verificação ESLint
```

## Arquitetura

**Big Coxinhas** é um sistema de gestão em Next.js 16 (App Router) para uma fabrica/fornecedor de coxinhas. Stack: Next.js 16, React 19, TypeScript, Tailwind CSS v4, Supabase (Postgres + Auth), NextAuth v4, shadcn/ui, React Hook Form + Zod, TanStack Table, Sonner (toasts).

### Diretórios principais

- `src/app/` — páginas do App Router. Módulos principais: `clientes/`, `produtos/`, `comandas/`, `dashboard/`, `menu/`
- `src/components/ui/` — primitivos shadcn/ui (não editar manualmente; usar o CLI `shadcn`)
- `src/components/lists/` — componentes de tabela/lista por domínio (`clientsList`, `produtctsList`, `comandasList`)
- `src/components/comandas/` — sub-componentes específicos de comanda (badges, ícones, progresso de pagamento)
- `src/components/modal/` — modais compartilhados (ex: `modalApagar` para confirmação de exclusão)
- `src/components/modules/` — componentes de layout (`menuMobile`)
- `src/lib/supabase.ts` — cliente Supabase singleton usando `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `src/types/database.types.ts` — tipos Supabase gerados automaticamente; usar o helper `Tables<'nome_tabela'>` para tipos de linha
- `src/context/provider.tsx` — envolve o app no `SessionProvider` (NextAuth)
- `src/utils/` — `formatPhone.ts`, `currencyFormatter.ts`

### Modelo de dados (tabelas Supabase)

`clients` → `comandas` (pedidos) → `itens_comanda` (itens do pedido) → `products`  
`comandas` também possuem `payments` (pagamentos parciais múltiplos) e se relacionam com `massadas` (lotes de produção)  
`profiles` guarda nome e papel (role) do usuário vinculado ao auth do Supabase

### Autenticação

NextAuth v4 com `CredentialsProvider` — autentica via `supabase.auth.signInWithPassword`, depois busca a linha de `profiles` para obter `name` e `role`. Sessão JWT com expiração de 1 hora. A sessão é estendida com os campos `id` e `role` via module augmentation em `auth-options.ts`.

### Convenções de roteamento

CRUD por entidade segue o padrão: `/<entidade>/page.tsx` (listagem), `/<entidade>/criar/page.tsx` (criação), `/<entidade>/editar/[id]/page.tsx` (edição), `/<entidade>/[id]/page.tsx` (detalhe, usado em `comandas`).

### Padrões de UI

- Todas as chamadas ao Supabase são feitas diretamente nos arquivos de página/componente (sem camada de serviço separada)
- Formulários usam React Hook Form + Zod para validação
- Componente `Field` (`src/components/ui/field.tsx`) encapsula label + input para layout de formulário consistente
- Notificações via `sonner` (`toast.success`, `toast.error`)
- Layout limita o conteúdo a `max-w-6xl` com barra de navegação mobile fixa na parte inferior (`MenuMobile`)
- Tailwind CSS v4 — usa sintaxe `@import "tailwindcss"`, não as diretivas `@tailwind`

### Variáveis de ambiente necessárias

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
```
