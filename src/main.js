
import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)


const App = () => import('@/App')

Vue.config.productionTip = false

global.assignedStore = require('@/assets/assignedStore.json')
global.brandDateData = require('@/assets/brandDateData.json')


Vue.filter('percentage', (value, decimals) => {
    if(!value) {
        value = 0;
    }

    if(!decimals) {
        decimals = 0;
    }

    value = value * 100;
    value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    value = value + '%';
    return value;
})


Vue.filter('quantity', (value) => {
    const amt = Number(value)
    return amt && amt.toLocaleString(undefined, {maximumFractionDigits:2}) || '0'
})
new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
})
