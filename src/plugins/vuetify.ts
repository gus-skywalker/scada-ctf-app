// npm install vuetify@next
// npm install @mdi/font
// npm install @vitejs/plugin-vue
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Importa os estilos base do Vuetify
import '@mdi/font/css/materialdesignicons.min.css'; // Importa ícones do Material Design
import { aliases, mdi } from 'vuetify/iconsets/mdi'; // Importa `mdi` para Vuetify

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi', // Define `mdi` como conjunto de ícones padrão
    aliases,
    sets: {
      mdi,
    },
  },
});

export default vuetify;
