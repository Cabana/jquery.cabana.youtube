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
            theme: "light",
            autoplay: 0,
            rel: 0,
            showinfo: 0,
            listType: "user_uploads",
            controls: 1,
            wmode: 'transparent',
            enablejsapi: 1,
            origin: 'http://' + document.domain
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

            this._id = this.element.data('id');
            this._container = this.element.wrap('<div class="flex-video"/>');
            this._elementCached = this.element;

            this._render();

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

            var _iframeHtml = $('<iframe />', {
                frameborder: "0",
                border: "0",
                scrolling: "no",
                allowfullscreen: "1",
                mozallowfullscreen: "1",
                webkitallowfullscreen: "1",
                src: this._src,
            });

            this.element.html(_iframeHtml);

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
