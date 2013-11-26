/*
*   jquery youtube plugin
*   jQuery UI Widget-factory plugin (for 1.8/9+)
*   v0.1
*/

; (function ($, window, document, undefined) {

    $.widget("cabana.youtube", {

        /*
        *   Options to be used as defaults
        */
        options: {
            autohide: 2,
            autoplay: 0,
            cc_load_policy: 0,
            color: 'red',
            controls: 1,
            disablekb: 0,
            enablejsapi: 1,
            fs: 1,
            iv_load_policy: 1,
            list: '',
            listType: 'user_uploads',
            loop: 0,
            modestbranding: 1,
            origin: 'http://' + document.domain,
            playerapiid: '',
            playlist: '',
            rel: 0,
            showinfo: 0,
            theme: "dark",
            wmode: 'transparent',
            renderScreenshot: false,
            screenshotSrc: 'youtube',
            playButton: true
        },

        /*
        *   prefix all custom events that this widget will fire: "youtube:beforerender"
        */
        widgetEventPrefix: 'youtube:',

        /*
        *   Setup widget (eg. element creation, apply theming, bind events etc.)
        */
        _create: function () {
            
            if (typeof this.element.data('id') === "undefined" || typeof this.element.data('id') === undefined) {
                alert("The element '" + String(this.element.attr('class')) + "' doesn't have an youtube id assigned");
                this.destroy();
                return;
            }

            this._applyDataParams();

            this._id = this.element.data('id');
            this._container = this.element.wrap('<div class="flex-video"/>');
            this._elementCached = this.element;           

            this._render();

        },

        /*
        *   Apply options set through data params
        */
        _applyDataParams: function() {
            this._applyDataParam('autohide', 'autohide');
            this._applyDataParam('autoplay', 'autoplay');
            this._applyDataParam('cc_load_policy', 'cc-load-policy');
            this._applyDataParam('color', 'color');
            this._applyDataParam('controls', 'controls');
            this._applyDataParam('disablekb', 'disablekb');
            this._applyDataParam('enablejsapi', 'enablejsapi');
            this._applyDataParam('fs', 'fs');
            this._applyDataParam('iv_load_policy', 'iv-load-policy');
            this._applyDataParam('list', 'list');
            this._applyDataParam('listType', 'listtype');
            this._applyDataParam('loop', 'loop');
            this._applyDataParam('modestbranding', 'modestbranding');
            this._applyDataParam('origin', 'origin');
            this._applyDataParam('playerapiid', 'playerapiid');
            this._applyDataParam('playlist', 'playlist');
            this._applyDataParam('rel', 'rel');
            this._applyDataParam('showinfo', 'showinfo');
            this._applyDataParam('theme', 'theme');
            this._applyDataParam('wmode', 'wmode');
            this._applyDataParam('renderScreenshot', 'render-screenshot');
            this._applyDataParam('screenshotSrc', 'screenshot-src');
            this._applyDataParam('playButton', 'play-button');
        },

        /*
        *   Helper method for applying an option set through a data param
        */
        _applyDataParam: function(optionToSet, dataParam) {
            if ($(this.element).data(dataParam)) {
                this.options[optionToSet] = $(this.element).data(dataParam);
            }
        },

        /*
        *   Destroy an instantiated plugin and clean up modifications the widget has made to the DOM
        */
        _destroy: function () {

            this.element.unbind();
            this.element.unwrap().html('');

        },

        /*
        *   append ID and params to the url
        *   trigger before render event
        *   append the iframe to the this.element
        *   trigger after render event
        */
        _render: function () {
            
            this._src = "//www.youtube.com/embed/" + this._id + "?" + $.param(this.options);

            this._trigger("beforerender", null, {
                container: this._container,
                options: this.options
            });

            var _$iframeHtml = $('<iframe />', {
                frameborder: "0",
                border: "0",
                scrolling: "no",
                allowfullscreen: "1",
                mozallowfullscreen: "1",
                webkitallowfullscreen: "1",
                src: this._src,
            });

            // render some additional markup for the static screenshot and possibly play button
            if (Boolean(this.options.renderScreenshot)) {

                this._thumbSrc = (this.options.screenshotSrc == 'youtube') ? "//img.youtube.com/vi/" + this._id + "/0.jpg" : this.options.screenshotSrc;

                var _imageStyles = { 'position': 'absolute', 'top': '0', 'left': '0', 'width': '100%', 'height': '100%' };
                var _$imageHtml = $('<img/>', {
                    src: this._thumbSrc
                }).css(_imageStyles);

                if (Boolean(this.options.playButton)) {
                    var _playButtonStyles = { 'position': 'absolute', 'top': '50%', 'left': '50%' };
                    var _$playButtonHtml = $('<div/>').addClass(this.element.attr('class') + '-play-button').css(_playButtonStyles);
                }

                this.element.html([_$imageHtml, _$playButtonHtml]).on('click', function () {
                    $(this).off();
                    $(this).html(_$iframeHtml);
                });

            } else {
                // no screenshot set. render iframe
                this.element.html(_$iframeHtml);

            }            

            this._trigger("afterrender", null, {
                container: this._container,
                options: this.options
            });

        },

        /*
        *   set options
        */
        _setOption: function (key, value) {
            switch (key) {
                case "theme":
                    // check if current theme is not the same
                    if (this.options["theme"] !== value) {
                        this.options["theme"] = value;
                        this._render();
                    }
                    break;
                default:
                    this.options[ key ] = value;
                    break;
            }

            this._super( "_setOption", key, value );
        }
    });

})(jQuery, window, document);
