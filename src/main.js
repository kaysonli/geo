import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Home from './views/home.vue'
import Device from './views/device-list.vue'
import Add from './views/add-device.vue'
import Input from './views/device-input.vue'
import Login from './views/login.vue'
import Register from './views/register.vue'

Vue.use(VueRouter);

// var App = Vue.extend({});
var router = new VueRouter();
router.map({
	'/home': {
		component: Home
	},
	'/list': {
		component: Device
	},
	'/add': {
		component: Add
	},
	'/input': {
		component: Input
	},
	'/login': {
		component: Login
	},
	'/register': {
		component: Register
	}
});

router.start(App, '#app');
/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// })
