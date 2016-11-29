window._ = require('lodash');
window.$ = window.jQuery = require('jquery');

import Vue from 'vue'
import CookiesBar from './CookiesBar.vue'

// eslint-disable-line no-new
new Vue({
  el: '#cookiebar',
  render: (h) => h(CookiesBar)
})
