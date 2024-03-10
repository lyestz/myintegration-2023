   var events_blacklist = [
            'onmousedown',
            'onmouseup',
            'oncontextmenu',
            'onselectstart',
            'ondragstart',
            'ondrag',
            'ondragenter',
            'ondragleave',
            'ondragover',
            'ondrop',
            'ondragend'
        ],
        rEventBlacklist = new RegExp( events_blacklist.join('|').replace(/^on/g, ''), 'i' ),
        oldAEL, win;

    // unwraps the element so we can use its methods freely
    function unwrap(elem) {
        if (elem) {
            if (typeof XPCNativeWrapper === 'function' && typeof XPCNativeWrapper.unwrap === 'function') {
                return XPCNativeWrapper.unwrap(elem);
            } else if (elem.wrappedJSObject) {
                return elem.wrappedJSObject;
            }
        }

        return elem;
    }

    win = unwrap(window);

    // don't let blacklisted events get added by addEventListener
    oldAEL = win.Element.prototype.addEventListener; // store a reference to the original addEventListener
    win.Element.prototype.addEventListener = function () {
        if ( !rEventBlacklist.test(name) ) {
            return oldAEL.apply(this, arguments);
        }
    };

    // remove other listeners when the page loads
    JSL.runAt('interactive', function (event) {
        var all = document.getElementsByTagName('*'),
            doc = win.document,
            body = win.document.body,
            isPrototype = typeof doc.observe === 'function' && typeof doc.stopObserving === 'function',
            len, e, i, jQall, jQdoc; 

        events_blacklist.forEach(function (event) {
            doc[event] = null;
            body.removeAttribute(event);
            if (isPrototype === true) {
                doc.stopObserving(event); // disable Prototype observation
            }
        });

        // Disabling of specific elements
        for (i = 0, len = all.length; i < len; i += 1) {

            e = unwrap( all[i] );

            events_blacklist.forEach(function (event) {
                e[event] = null;
                e.removeAttribute(event);
            });

            if (e.style.MozUserSelect === 'none') {
                e.style.MozUserSelect = 'text';
            }

        }

        // Disabling by jQuery
        if (typeof win.$ === 'function' && typeof win.$.prototype.unbind === 'function') {
            jQall = win.$('*');
            jQdoc = win.$(doc);
            events_blacklist.forEach(function (event) {
                jQall.unbind(event);
                jQdoc.unbind(event);
            });
        }

        if (typeof win.jQuery === 'function' && typeof win.jQuery.prototype.unbind === 'function') {
            win.jQuery(win).unbind('keypress'); // Remove keyboard blocking - comment line out if you don't want it
        }

        if (typeof win.ProtectImg !== 'undefined') {
            win.ProtectImg = function () {
                return true;
            };
        }
    });
