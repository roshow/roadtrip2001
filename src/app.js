import App from './components/App.html';

const app = new App({
  target: document.querySelector('main'),
  data: {
    message: 'this is a svelte starter app on glitch!'
  }
})