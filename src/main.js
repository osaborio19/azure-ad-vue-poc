import { createApp } from 'vue'
import App from './App.vue'
import Store from './store/azure/Index';

const app = createApp(App);
app.config.globalProperties.$msalInstance = {};

app.use(Store).mount('#app');


