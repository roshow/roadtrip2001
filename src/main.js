import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'Fastify'
	}
});

export default app;