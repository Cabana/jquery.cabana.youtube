/*!
 * jQuery UI Widget-factory plugin boilerplate (for 1.8/9+)
 * Author: @addyosmani
 * Further changes: @peolanha
 * Licensed under the MIT license
 */

; (function ($, window, document, undefined) {

    // define your widget under a namespace of your choice
    //  with additional parameters e.g.
    // $.widget( "namespace.widgetname", (optional) - an
    // existing widget prototype to inherit from, an object
    // literal to become the widget's prototype );

    $.widget("cabana.youtube", {

        //Options to be used as defaults
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

        widgetEventPrefix: 'youtube:',

        //Setup widget (eg. element creation, apply theming
        // , bind events etc.)
        _create: function () {

            // _create will automatically run the first time
            // this widget is called. Put the initial widget
            // setup code here, then you can access the element
            // on which the widget was called via this.element.
            // The options defined above can be accessed
            // via this.options this.element.addStuff();
            
            if (typeof this.element.data('id') === "undefined" || typeof this.element.data('id') === undefined) {
                alert("The element '" + String(this.element.attr('class')) + "' doesn't have an youtube id assigned");
                this.destroy();
                return;
            }

            this._id = this.element.data('id');
            this._container = this.element.wrap('<div class="flex-video"/>');

            this._render();

        },

        // Destroy an instantiated plugin and clean up
        // modifications the widget has made to the DOM
        _destroy: function () {

            // this.element.removeStuff();
            // For UI 1.8, destroy must be invoked from the
            // base widget
            //$.Widget.prototype.destroy.call(this);
            // For UI 1.9, define _destroy instead and don't
            // worry about
            // calling the base widget

            this.element.unbind();
            this.element.remove();
        },

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

        // Respond to any changes the user makes to the
        // option method
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

            // For UI 1.8, _setOption must be manually invoked
            // from the base widget
            //$.Widget.prototype._setOption.apply(this, arguments);
            // For UI 1.9 the _super method can be used instead
            this._super( "_setOption", key, value );
        }
    });

})(jQuery, window, document);
