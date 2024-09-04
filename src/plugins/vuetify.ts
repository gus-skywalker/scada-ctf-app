// npm install vuetify@next
// npm install @mdi/font
// npm install @vitejs/plugin-vue
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { aliases, fa } from 'vuetify/iconsets/fa';

const vuetify = createVuetify({
  icons: {
    
    defaultSet: 'fa', // Configura ícones
    aliases,
    sets: { fa },
  },
});
export default vuetify;


