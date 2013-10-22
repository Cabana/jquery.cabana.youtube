# jQuery youtube plugin

jQuery youtube plugin is for rendering youtube player

## Dependencies
* jQuery library
* jQuery UI Core library
* Zurb Foundation CSS library

## Usage
Include `cabana.youtube.js` in your JS (app.js) bundle.
To add youtube player, place this markup somewhere in your html:
```html
<div class="youtube-video" data-id="JuCIqJYc9oc"></div>
```
and initiate it through javascript:
```js
$(document).ready(function(){

	$('.youtube-video').youtube();

});
```

## Data params
* `id` Youtube video ID, required.

## Options
* `theme` Youtube player theme - `["light", "dark"]`

## Events
* `youtube:beforerender` Fired just before Youtube iframe is injected into container. Params passed: `container`, `options`
* `youtube:afterrender` Fired after Youtube iframe was injected into the container. Params passed: `container`, `options`

### Compatibility
IE9+, all modern browsers
