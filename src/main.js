import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Home from './views/home.vue'
import Device from './views/device-list.vue'

Vue.use(VueRouter);

// var App = Vue.extend({});
var router = new VueRouter();
router.map({
	'/home': {
		component: Home
	},
	'/list': {
		component: Device
	}
});

router.start(App, '#app');
/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// })
