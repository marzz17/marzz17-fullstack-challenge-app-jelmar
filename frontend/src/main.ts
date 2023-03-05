import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import 'primevue/resources/themes/saga-blue/theme.css'   //theme
import 'primevue/resources/primevue.min.css'                //core css
import 'primeicons/primeicons.css'

import "./assets/main.css";
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';

import Dialog from 'primevue/dialog';
// import DataTable from 'primevue/datatable';
// import Row from 'primevue/row';
// import Column from 'primevue/column';

const app = createApp(App);
app.use(createPinia());
app.use(router);

app.use(PrimeVue, { ripple: true });
app.component('Button', Button);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Dialog', Dialog);
// app.component('Column', Column);
// app.component('DataTable', DataTable);
// app.component('Row', Row);

app.mount("#app");