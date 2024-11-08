# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

src/
├── assets/                  # Imagens, ícones, e outros assets estáticos
├── components/             # Componentes Vue.js
│   ├── Auth/
│   │   ├── LoginForm.vue
│   │   └── RegisterForm.vue
│   ├── Challenges/
│   │   ├── ChallengeList.vue
│   │   └── ChallengeDetail.vue
│   ├── Dashboard/
│   │   ├── Dashboard.vue
│   │   └── Ranking.vue
│   ├── NoVNC/
│   │   └── NoVNCViewer.vue
│   └── Layout/
│       ├── Navbar.vue
│       ├── Sidebar.vue
│       └── Footer.vue
├── views/                   # Páginas principais da aplicação
│   ├── Home.vue
│   ├── Login.vue
│   ├── Register.vue
│   └── Challenges.vue
├── router/                  # Configuração de rotas
│   └── index.js
├── store/                   # Gerenciamento de estado (Vuex)
│   ├── index.js
│   └── modules/
│       ├── auth.js
│       ├── challenges.js
│       └── ranking.js
├── App.vue                  # Componente raiz
├── main.js                  # Arquivo principal de entrada
└── vuetify.js               # Configuração do Vuetify (se estiver usando)

# Production
npm install -g serve

ou

pm2 start ecosystem.config.js
