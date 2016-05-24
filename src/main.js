import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

import Home from './views/home.vue'
import DeviceList from './views/device-list.vue'
import Device from './views/device.vue'
import Add from './views/add-device.vue'
import Input from './views/device-input.vue'
import Login from './views/login.vue'
import Register from './views/register.vue'
import Reset from './views/reset-password.vue'
import SetNew from './views/set-new.vue'
import RangeBar from './components/range-bar.vue'
import TimeRange from './views/time-range.vue'
import Warnings from './views/warnings.vue'
import Settings from './views/settings.vue'


Vue.use(require('vue-resource'))
Vue.use(VueRouter);
var VueTouch = require('vue-touch')
Vue.use(VueTouch)
var filters = require('./filters.js');
Vue.use(filters);

// var App = Vue.extend({});
var router = new VueRouter();
router.map({
    '/home': {
        component: Home
    },
    '/devices': {
        component: DeviceList
    },
    '/devices/:id': {
        name: 'device-info',
        component: Device,
        subRoutes: {
            '/range': {
                component: RangeBar
            },
            '/track': {
                component: TimeRange
            }
        }
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
    },
    '/reset': {
        component: Reset
    },
    '/reset/:mobile': {
        auth: false,
        component: SetNew
    },
    'warnings/:id': {
        component: Warnings
    },
    'settings': {
        component: Settings
    }
});
router.redirect({
    '*': '/devices',
});

router.start(App, '#app');
/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// })
