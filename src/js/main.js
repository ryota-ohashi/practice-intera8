import '../scss/style.scss'

import Roulette from './modules/roulette';

var INTERA8 = INTERA8 || {};

INTERA8 = {
  init: function() {
    this.setParams();
    this.bind();
  },
  setParams: function() {

  },
  bind: function() {
    new Roulette();
  },
};

window.addEventListener('DOMContentLoaded', () => {
  INTERA8.init();
});

