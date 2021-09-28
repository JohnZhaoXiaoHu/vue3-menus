import Vue3Menus from './Vue3Menus.vue';
import $menusEvent from './event';

const directive = {
  mounted(el, { value, arg, instance }) {
    if (arg === undefined || arg === 'right') {
      el.addEventListener("contextmenu", $menusEvent.bind(instance, value));
    } else if (arg === 'left') {
      el.addEventListener("click", $menusEvent.bind(instance, value));
    } else if (arg === 'all') {
      el.addEventListener("contextmenu", $menusEvent.bind(instance, value));
      el.addEventListener("click", $menusEvent.bind(instance, value));
    }
  },
  unmounted(el, { arg }) {
    if (arg === undefined || arg === 'right') {
      el.removeEventListener("contextmenu", $menusEvent);
    } else if (arg === 'left') {
      el.removeEventListener("click", $menusEvent);
    } else if (arg === 'all') {
      el.removeEventListener("contextmenu", $menusEvent);
      el.removeEventListener("click", $menusEvent);
    }
  }
}

const install = function (app, options = {}) {
  app.component(options.name || Vue3Menus.name, Vue3Menus);
  app.directive('menus', directive);
  app.config.globalProperties.$menusEvent = (event, menus) => $menusEvent(menus, event);
}

const menusEvent = (event, menus) => $menusEvent(menus, event);

export {
  install,
  Vue3Menus,
  directive,
  menusEvent
}
