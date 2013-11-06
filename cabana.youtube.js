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

            // bind data- params
            this.options.autohide = ($.type(this.element.data('autohide')) === 'undefined') ? this.options.autohide : this.element.data('autohide');
            this.options.autoplay = ($.type(this.element.data('autoplay')) === 'undefined') ? this.options.autoplay : this.element.data('autoplay');
            this.options.cc_load_policy = ($.type(this.element.data('cc-load-policy')) === 'undefined') ? this.options.cc_load_policy : this.element.data('cc-load-policy');
            this.options.color = ($.type(this.element.data('color')) === 'undefined') ? this.options.color : this.element.data('color');
            this.options.controls = ($.type(this.element.data('controls')) === 'undefined') ? this.options.controls : this.element.data('controls');
            this.options.disablekb = ($.type(this.element.data('disablekb')) === 'undefined') ? this.options.disablekb : this.element.data('disablekb');
            this.options.enablejsapi = ($.type(this.element.data('enablejsapi')) === 'undefined') ? this.options.enablejsapi : this.element.data('enablejsapi');
            this.options.fs = ($.type(this.element.data('fs')) === 'undefined') ? this.options.fs : this.element.data('fs');
            this.options.iv_load_policy = ($.type(this.element.data('iv-load-policy')) === 'undefined') ? this.options.iv_load_policy : this.element.data('iv-load-policy');
            this.options.list = ($.type(this.element.data('list')) === 'undefined') ? this.options.list : this.element.data('list');
            this.options.listType = ($.type(this.element.data('listtype')) === 'undefined') ? this.options.listType : this.element.data('listtype');
            this.options.loop = ($.type(this.element.data('loop')) === 'undefined') ? this.options.loop : this.element.data('loop');
            this.options.modestbranding = ($.type(this.element.data('modestbranding')) === 'undefined') ? this.options.modestbranding : this.element.data('modestbranding');
            this.options.origin = ($.type(this.element.data('origin')) === 'undefined') ? this.options.origin : this.element.data('origin');
            this.options.playerapiid = ($.type(this.element.data('playerapiid')) === 'undefined') ? this.options.playerapiid : this.element.data('playerapiid');
            this.options.playlist = ($.type(this.element.data('playlist')) === 'undefined') ? this.options.playlist : this.element.data('playlist');
            this.options.rel = ($.type(this.element.data('rel')) === 'undefined') ? this.options.rel : this.element.data('rel');
            this.options.showinfo = ($.type(this.element.data('showinfo')) === 'undefined') ? this.options.showinfo : this.element.data('showinfo');
            this.options.theme = ($.type(this.element.data('theme')) === 'undefined') ? this.options.theme : this.element.data('theme');
            this.options.wmode = ($.type(this.element.data('wmode')) === 'undefined') ? this.options.wmode : this.element.data('wmode');

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
