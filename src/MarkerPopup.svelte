<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	export let count;
	export let address;
	export let city;
	export let state;
	export let notes;
	export let date;
	
	function addValue(delta) {
		count += delta;
		dispatch('change', count);
	}
</script>

<style>
</style>

<div>
	<h3>{date}/2001</h3>
	<h3>{address}</h3>
	<p>{city}, {state}</p>
	{#if notes}<p>Notes: {notes}</p>{/if}
</div>

<div style="width:100%;text-align:center;font-weight:600">
	{count}
</div>
