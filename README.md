# Cardápio Online

Aplicação web completa para restaurantes, lanchonetes e estabelecimentos de alimentação realizarem pedidos por delivery, retirada ou mesa.

O projeto combina uma interface pública otimizada para mobile, um painel administrativo em tempo real e suporte a instalação como PWA (Progressive Web App).

## Recursos

### Experiência do cliente

- Cardápio organizado por categorias
- Busca e destaques de produtos
- Produtos, promoções, adicionais e observações
- Sugestões de complementos no carrinho
- Delivery, retirada e pedidos por mesa
- Cupons de desconto e programa de fidelidade
- Acompanhamento do status do pedido
- Compartilhamento e prévias de produtos no WhatsApp
- Interface responsiva e instalável como aplicativo

### Painel administrativo

- Dashboard com vendas, ticket médio e itens mais vendidos
- Gestão de pedidos em tempo real
- Alertas sonoros e notificações no navegador
- Atendimento de mesas e chamados de garçom
- QR Codes para o cardápio e para mesas
- Cadastro de produtos, categorias e adicionais
- Gestão de cupons e clientes
- Controle de contas a pagar e a receber
- Configuração de horários, taxas, pagamentos e aparência
- Impressão térmica via Web Bluetooth
- Perfis de proprietário e atendente

## Tecnologias

- HTML5, CSS3 e JavaScript moderno com módulos ES
- Firebase Authentication
- Firebase Cloud Firestore
- Service Worker e Web App Manifest
- APIs serverless da Vercel
- Tabler Icons
- Google Fonts
- Web Bluetooth

Não há dependências de npm ou processo de build: os arquivos podem ser servidos diretamente por um servidor HTTP.

## Arquitetura

```text
cardapio-online/
├── index.html              # Cardápio público
├── pedido.html             # Acompanhamento do pedido
├── admin/
│   ├── index.html          # Painel administrativo
│   └── manifest.json       # Manifesto PWA do painel
├── api/
│   ├── _firestore.js       # Cliente REST do Firestore
│   ├── imagem.js           # Entrega da imagem do produto
│   └── produto.js          # Página de prévia para compartilhamento
├── assets/                 # Ícones e imagens públicas
├── css/                    # Estilos público e administrativo
├── js/
│   ├── config.js           # Configuração do Firebase
│   ├── db.js               # Camada única de dados e autenticação
│   ├── cliente.js          # Interface do cardápio
│   ├── pedido.js           # Acompanhamento do pedido
│   ├── seed.js             # Dados de demonstração
│   └── admin/              # Módulos do painel administrativo
├── firestore.rules         # Regras de segurança do Firestore
├── manifest.json           # Manifesto PWA do cliente
├── sw.js                   # Cache e funcionamento offline
└── vercel.json             # Rotas, cabeçalhos e redeploy seguro
```

## Modo demo

Se `firebaseConfig.apiKey` estiver vazia, o projeto inicia automaticamente em modo demo.

Nesse modo:

- Os dados são armazenados no `localStorage` do navegador
- Não é necessário configurar uma conta Firebase
- É possível testar login com qualquer e-mail válido e senha com pelo menos 6 caracteres
- Os dados de exemplo podem ser carregados pelo painel
- Os dados ficam isolados no navegador e são removidos ao limpar os dados do site

## Executando localmente

Os módulos JavaScript exigem acesso por HTTP. Não abra o `index.html` diretamente pelo sistema de arquivos.

### Opção 1: VS Code Live Server

1. Instale a extensão **Live Server**.
2. Abra a pasta do projeto no VS Code.
3. Clique em **Go Live**.

### Opção 2: servidor Node.js

```bash
npx serve -l 3000
```

Acesse `http://localhost:3000`.

### Opção 3: servidor Python

```bash
python -m http.server 3000
```

Acesse `http://localhost:3000`.

## Configuração com Firebase

### 1. Criar o projeto

1. Acesse o [Firebase Console](https://console.firebase.google.com/).
2. Crie um projeto.
3. Adicione um aplicativo Web.
4. Ative **Authentication > Sign-in method > E-mail/senha**.
5. Crie o banco em **Firestore Database**.

### 2. Configurar o aplicativo

Copie as credenciais Web do Firebase para `js/config.js`:

```javascript
export const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_PROJETO.firebasestorage.app",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID"
};
```

No mesmo arquivo, defina o e-mail do proprietário:

```javascript
export const SUPERADMIN_EMAIL = "administrador@seudominio.com";
```

Crie esse mesmo e-mail em **Authentication > Users**. A senha pode ser criada pelo próprio Firebase ou definida pela opção de redefinição.

### 3. Publicar as regras

Abra `firestore.rules` e confirme que o e-mail permitido corresponde ao valor de `SUPERADMIN_EMAIL`.

Depois:

1. Acesse **Firebase Console > Firestore Database > Regras**.
2. Copie todo o conteúdo de `firestore.rules`.
3. Publique as regras.

O projeto utiliza perfis de `dono` e `atendente`, com restrições específicas para leitura e alteração de dados.

### 4. Criar dados iniciais

No modo demo, os dados de exemplo são carregados automaticamente.

Com Firebase ativo:

1. Entre no painel em `/admin/`.
2. Acesse **Configurações > Ferramentas**.
3. Use a opção para carregar dados de exemplo ou cadastre manualmente a loja e os produtos.

## Variáveis da Vercel

As rotas serverless usadas nas prévias de produtos precisam das seguintes variáveis:

| Variável | Descrição |
|---|---|
| `FIREBASE_PROJECT_ID` | ID do projeto Firebase |
| `FIREBASE_API_KEY` | API key Web do projeto |

Configure-as em **Vercel > Project Settings > Environment Variables**.

Após alterar as regras ou as variáveis, faça um novo deploy.

## Deploy na Vercel

### Pela interface

1. Importe o repositório na Vercel.
2. Selecione o diretório do projeto.
3. Configure as variáveis de ambiente.
4. Finalize o deploy.

### Pela CLI

```bash
npm install -g vercel
vercel login
vercel
```

Para publicar em produção:

```bash
vercel --prod
```

O arquivo `vercel.json` configura a rota pública de produtos, os cabeçalhos de segurança e a página do painel.

## Estrutura de dados

As principais coleções do Firestore são:

| Coleção | Finalidade |
|---|---|
| `config` | Dados, aparência e horários da loja |
| `categorias` | Categorias do cardápio |
| `produtos` | Produtos e promoções |
| `adicionais` | Grupos de opções dos produtos |
| `bairros` | Taxas e prazos de entrega |
| `pedidos` | Pedidos e status de atendimento |
| `mesas` | Mesas e solicitações em tempo real |
| `cupons` | Cupons e limites de uso |
| `clientes` | Cadastro de clientes |
| `fidelidade` | Pontuação do programa de fidelidade |
| `equipe` | Usuários do painel |
| `contadores` | Numeração sequencial dos pedidos |
| `contas_pagar` | Contas pagas e pendentes |
| `contas_receber` | Recebimentos e repasses |

## PWA e Service Worker

O projeto pode ser instalado no celular e no computador.

- A versão do cache está definida em `sw.js`
- Páginas usam estratégia network-first
- Arquivos estáticos usam cache-first
- APIs da Vercel e serviços do Google/Firebase não são interceptados
- Ao publicar uma atualização, aumente o valor de `VERSAO` em `sw.js`

Exemplo:

```javascript
const VERSAO = 'co-v12';
```

## Segurança

Antes de publicar em produção:

- Configure o Firebase com um projeto próprio
- Atualize `SUPERADMIN_EMAIL` no arquivo de configuração
- Publique as regras de `firestore.rules`
- Não use dados ou credenciais reais em ambientes de demonstração
- Restrinja os domínios autorizados no Firebase Authentication
- Configure variáveis sensíveis como variáveis de ambiente na Vercel
- Use HTTPS em produção

## Navegadores suportados

Recomenda-se utilizar versões atuais de Chrome, Edge, Firefox ou Safari.

Alguns recursos dependem dos recursos disponíveis no navegador, como:

- Instalação PWA
- Notificações
- Web Bluetooth
- Cache offline

## Dicas de manutenção

- Para alterar a aparência do cliente, use as configurações de tema no painel ou revise `css/base.css`.
- Para alterar as opções de dados locais, revise `js/db.js`.
- Para alterar produtos iniciais, revise `js/seed.js`.
- Para alterar os cabeçalhos HTTP ou rotas públicas, revise `vercel.json`.
- Para alterar regras de acesso, revise `firestore.rules`.
