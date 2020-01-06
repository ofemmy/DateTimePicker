import Vue from 'vue'
import OCalendar from './components/OCalendar'

Vue.config.productionTip = false

new Vue({
  render: h => h(OCalendar),
}).$mount('#app')
