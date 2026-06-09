# Parabéns Atlas! 🎂 - Convite de Aniversário (Vite + Vue 3)

Este é um convite de aniversário moderno e elegante desenvolvido com **Vite**, **Vue 3** (Single File Components) e **Vanilla CSS**, apresentando um visual premium em estilo **Glassmorphic** e animações fluidas.

---

## 🎨 Características do Projeto

1. **Vite + Vue 3**: Estrutura moderna baseada em componentes SFC (`.vue`) para melhor organização do código e build otimizado.
2. **Design Glassmorphic Celestial**: Um layout futurista e vibrante com cores neon, fundo degradê animado e orbes flutuantes de HSL sob medida.
3. **Contador Regressivo**: Timer em tempo real exibindo dias, horas, minutos e segundos até o início da festa.
4. **Integração RSVP**: Botão de confirmação de presença que gera mensagens codificadas direto para o WhatsApp do aniversariante.
5. **Localização Integrada**: Botão com link customizado do Google Maps para guiar os convidados.
6. **Navegação SPA (Vue Router)**: Transição suave entre a tela do convite e a página de **Sugestão de Presentes** utilizando Hash History (`/#/` e `/#/gifts`) para garantir que os links funcionem corretamente no GitHub Pages sem erros 404.
7. **Reserva de Presentes Inteligente**: Uma lista com categorias (Casa, Tecnologia, Experiências, Estilo) onde o convidado pode "reservar" um item. A escolha é salva localmente via `localStorage` e gera uma mensagem de confirmação para ser enviada no WhatsApp do anfitrião.
8. **Pipeline GitHub Actions**: Um script de build e deploy automático para compilar o site e publicá-lo diretamente no GitHub Pages.

---

## 📂 Estrutura de Arquivos

```
parabens-atlas/
├── .github/
│   └── workflows/
│       └── static.yml     # Workflow de Deploy Automático para o GitHub Pages
├── src/
│   ├── assets/
│   │   ├── style.css      # Estilização completa do layout e animações
│   │   └── profile.png    # Foto/Ilustração do aniversariante
│   ├── router/
│   │   └── index.js       # Roteamento SPA
│   ├── views/
│   │   ├── HomeView.vue   # Componente da Página do Convite Principal
│   │   └── GiftsView.vue  # Componente da Página de Sugestão de Presentes
│   ├── App.vue            # Componente raiz
│   ├── config.js          # Configuração dos dados do evento e presentes
│   └── main.js            # Arquivo de entrada do Vue 3
├── index.html             # Arquivo HTML de entrada
├── package.json           # Dependências e scripts do projeto
├── vite.config.js         # Configurações do Vite
├── .nojekyll              # Ignora processador Jekyll do GitHub Pages
└── README.md              # Este guia explicativo
```

---

## ⚙️ Como Personalizar os Dados do Evento

Todas as informações do convite estão centralizadas no arquivo [config.js](file:///C:/Users/Lucas/Documents/Projetos/parabens-atlas/src/config.js). Basta abrir este arquivo e alterar os campos dentro do objeto `EVENT_SETTINGS`:

```javascript
export const EVENT_SETTINGS = {
  hostName: "Atlas",                     // Nome do Aniversariante
  eventDate: "2026-07-11T20:00:00",      // Data e hora do evento no formato ISO
  whatsappNumber: "5511999998888",      // WhatsApp com DDI (55) + DDD + Número
  mapsLink: "https://goo.gl/maps/xyz",   // Link do Google Maps do local
  locationAddress: "Rua das Estrelas...", // Endereço legível que aparecerá no card
  locationName: "Espaço Cosmos",         // Nome do local
  timeText: "Sábado, 11 de Julho...",    // Texto legível da data/hora
  descriptionText: "Estou comemorando..."// Mensagem de convite personalizada
};
```

### 🎁 Modificando a Lista de Presentes
Para atualizar as sugestões de presentes, altere a lista `GIFT_SUGGESTIONS` dentro do mesmo arquivo [config.js](file:///C:/Users/Lucas/Documents/Projetos/parabens-atlas/src/config.js):

```javascript
export const GIFT_SUGGESTIONS = [
  { id: 1, name: "Nome do Presente", category: "casa", icon: "emoji", description: "Descrição" },
  // ...
];
```
*Categorias aceitas para filtragem visual no layout:* `casa`, `tecnologia`, `experiencia` ou `moda`.

---

## 🚀 Como Executar Localmente

Você precisará do [Node.js](https://nodejs.org/) instalado na sua máquina.

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   Acesse a URL gerada (geralmente `http://localhost:5173`) no seu navegador.

3. Para gerar a build de produção localmente (pasta `/dist`):
   ```bash
   npm run build
   ```

---

## 🌐 Como Publicar no GitHub Pages

O projeto já está configurado para publicar automaticamente via **GitHub Actions** quando você enviar o código para o seu repositório do GitHub.

1. Crie um repositório no seu GitHub (ex: `parabens-atlas`).
2. Adicione os arquivos do projeto a ele e empurre para a branch principal:
   ```bash
   git init
   git add .
   git commit -m "feat: setup project with vite and vue"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/parabens-atlas.git
   git push -u origin main
   ```
3. No painel do seu repositório no GitHub:
   - Vá em **Settings** > **Pages** (no menu lateral esquerdo).
   - Sob a seção **Build and deployment**, no menu suspenso **Source**, selecione **GitHub Actions** (em vez de *Deploy from a branch*).
4. O workflow criado em `.github/workflows/static.yml` será disparado automaticamente. Assim que terminar, seu site estará publicado e acessível.
