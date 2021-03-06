# Slow.js

Slow Motion CSS

## About

slow.js is a small script used to slow down CSS transition durations by a predefined factor on a key press event.
Disclaimer: This only works (for now) in Chrome, Safari, and Firefox browsers
How To: Hold down shift before interacting with any CSS transitions and they will be (hopefully) slowed down.

## Features

<ul>
	<li>Linted: Valid JS</li>
	<li>No dependencies</li>
	<li>Caches elements with transitions</li>
	<li>Support for multiple transition speeds
		<ul>
			<li>(i.e. <code>width 0.3s ease, height 1s linear</code>)</li>
		</ul>
	</li>
</ul>

## Usage

````
slow.listen({
    keyCode: 16,
    multiplier: 2
});
````

This will make all CSS transition durations twice as long when the shift key is pressed.