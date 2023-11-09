<script>
	import { params } from '$lib/data/cache';

	export let key;
	export let label;

	let input;

	function insertTextAtCursor(text) {
		let selection = window.getSelection();
		let range = selection.getRangeAt(0);
		range.deleteContents();
		let node = document.createTextNode(text);
		range.insertNode(node);
		selection.collapseToEnd();
		$params[key] = input.innerText;
	}

	function handlePaste(event) {
		insertTextAtCursor(event.clipboardData.getData('text/plain'));
	}
</script>

<div
	role="textbox"
	tabindex="0"
	on:paste|preventDefault={handlePaste}
	contenteditable="true"
	placeholder={label}
	bind:this={input}
	bind:innerText={$params[key]}
/>

<style>
	div {
		width: 100%;
		outline: none;
		padding: 0;
		padding-bottom: 10px;
	}
	div:empty:before {
		content: attr(placeholder);
		opacity: 0.5;
	}
</style>
