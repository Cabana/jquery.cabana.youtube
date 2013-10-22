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