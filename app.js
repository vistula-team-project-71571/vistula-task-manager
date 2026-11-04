const { createApp } = Vue;
const { loadModule } = window['vue3-sfc-loader'];

const options = {
  moduleCache: {
    vue: Vue
  },
  async getFile(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to load ${url}: ${res.statusText}`);
    return await res.text();
  },
  addStyle(textContent) {
    const style = document.createElement('style');
    style.textContent = textContent;
    const ref = document.head.getElementsByTagName('style')[0] || null;
    document.head.insertBefore(style, ref);
  }
};

const app = createApp({
  components: {
    'App': Vue.defineAsyncComponent(() => loadModule('./App.vue', options))
  },
  template: '<App />'
});

app.mount('#app');
