# Teste Blocks - Pleno/Sênior

Avaliação prática para a posição de Desenvolvedor Front-end Pleno/Sênior na Blocks

## Descrição do Projeto

Este projeto consiste em um catálogo de produtos da Blocks, consumindo a API fornecida e implementando scroll infinito para carregamento dinâmico dos produtos. O objetivo é demonstrar habilidades técnicas, organização de código, testes e aplicação de boas práticas de arquitetura.

## Requisitos Atendidos

- **Framework:** React + TypeScript
- **Estilização:** Tailwind CSS
- **Scroll Infinito:** Implementado para carregar mais produtos conforme o usuário rola a página
- **Paginação:** Utilização dos parâmetros `page` e `limit` na API
- **Ordenação:** Parâmetro `sortBy` sempre como "recent"
- **Imagens:** Exibição das imagens dos produtos utilizando o ID da família
- **Testes:** Cobertura com Jest e React Testing Library
- **Documentação:** Este README justifica as decisões técnicas e arquiteturais

## Requisitos Atendidos Não Obrigatórios

- **Tradução (Internacionalização):** O catálogo suporta múltiplos idiomas (português, inglês e espanhol), com textos adaptados dinamicamente.
- **Mobile (Responsividade):** O layout é totalmente responsivo, garantindo boa experiência em dispositivos móveis e desktops.
- **Rotas:** Utilização do react-router-dom para navegação entre páginas e tratamento de rotas não encontradas.
- **Animações:** Utilização do framer-motion para animações suaves na interface.

## Como rodar o projeto

1. **Instale as dependências:**
   ```bash
   pnpm install
   # ou
   npm install
   # ou
   yarn install
   ```
2. **Inicie o servidor de desenvolvimento:**
   ```bash
   pnpm dev
   # ou
   npm run dev
   # ou
   yarn dev
   ```
3. **Acesse:** [http://localhost:5173](http://localhost:5173)

## Scripts disponíveis
- `dev`: inicia o ambiente de desenvolvimento
- `build`: build de produção
- `lint`: análise de código com Biome (lint)
- `test`: executa os testes unitários
- `preview`: preview do build

## Arquitetura do Projeto

### Abordagem: **Clean Architecture**

O projeto segue os princípios da Clean Architecture, promovendo uma separação clara entre as camadas de domínio, aplicação, infraestrutura e apresentação. Essa abordagem facilita a manutenção, testabilidade e escalabilidade do sistema.

#### Estrutura principal:

```
src/
  models/             # Camada de domínio (tipos, entidades, regras de negócio)
  services/           # Camada de aplicação (casos de uso, regras de negócio de aplicação, acesso à API)
  components/         # Camada de apresentação (componentes reutilizáveis)
  pages/              # Camada de apresentação (páginas e containers)
  contexts/           # Gerenciamento de estado global (infraestrutura)
  hooks/              # Hooks customizados (infraestrutura)
  utils/              # Funções utilitárias (infraestrutura)
```

#### Justificativa da arquitetura

- **Separação de responsabilidades:** Cada camada tem um papel bem definido, facilitando a manutenção e evolução do projeto.
- **Testabilidade:** A separação permite testar regras de negócio de forma isolada, sem dependências da interface ou infraestrutura.
- **Escalabilidade:** Novas funcionalidades podem ser adicionadas sem impactar outras camadas.
- **Facilidade de troca de tecnologia:** A infraestrutura pode ser alterada (ex: troca de biblioteca de requisição HTTP) sem afetar o domínio ou a aplicação.

## Testes

- **Frameworks:** Jest + React Testing Library
- **Cobertura:**
  - Testes unitários para serviços e hooks
  - Testes de componentes (ex: ProductCard, InfiniteScroll)
  - Testes de casos de sucesso e erro da API
- **Executando os testes:**
  ```bash
  pnpm test
  # ou
  npm test
  # ou
  yarn test
  ```
- **Cobertura:** O relatório pode ser visualizado em `coverage/lcov-report/index.html` após rodar os testes.

## Decisões Técnicas

- **React + Vite:** Build rápido e experiência moderna de desenvolvimento
- **Tailwind CSS:** Produtividade e padronização visual
- **React Context:** Para gerenciamento de estado global (ex: Toast, Locale)
- **Axios:** Para requisições HTTP
- **React Testing Library:** Para testes de componentes com foco em comportamento do usuário
- **Biome:** Ferramenta de linting rápida e moderna utilizada para padronização e análise estática do código

## Deploy

A aplicação está publicada em: [https://test-blocks-virid.vercel.app/](https://test-blocks-virid.vercel.app/)

## Autor
Juathan Coelho Duarte

---

> Projeto desenvolvido para avaliação técnica da Blocks.