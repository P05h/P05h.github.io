!function yg() {
    if (window["%is-hammerhead%"])
        throw new TypeError("already ran");
    window["%is-hammerhead%"] = !0,
    window.rammerheadTop = function() {
        for (var e = window; e !== e.top && e.parent["%hammerhead"]; )
            e = e.parent;
        return e
    }(),
    window.rammerheadParent = window.rammerheadTop === window ? window : window.rammerheadParent,
    window.distanceRammerheadTopToTop = function() {
        for (var e = 0, t = window; t !== window.rammerheadTop; )
            e++,
            t = t.parent;
        return e
    }(),
    window.rammerheadAncestorOrigins = Array.from(location.ancestorOrigins).slice(0, -window.distanceRammerheadTopToTop),
    function() {
        var R = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
        function j(e) {
            var t = {
                exports: {}
            };
            return e(t, t.exports),
            t.exports
        }
        function H() {}
        var B, F = "pending", U = "settled", V = "fulfilled", G = "rejected", W = void 0 !== R && void 0 !== R.process && "function" == typeof R.process.emit, q = "undefined" == typeof setImmediate ? setTimeout : setImmediate, K = [];
        function z() {
            for (var e = 0; e < K.length; e++)
                K[e][0](K[e][1]);
            B = !(K = [])
        }
        function X(e, t) {
            K.push([e, t]),
            B || (B = !0,
            q(z, 0))
        }
        function $(e, t) {
            function r(e) {
                ee(t, e)
            }
            try {
                e(function(e) {
                    J(t, e)
                }, r)
            } catch (e) {
                r(e)
            }
        }
        function Y(t) {
            var e = t.owner
              , r = e._state
              , e = e._data
              , n = t[r]
              , t = t.then;
            if ("function" == typeof n) {
                r = V;
                try {
                    e = n(e)
                } catch (e) {
                    ee(t, e)
                }
            }
            Q(t, e) || (r === V && J(t, e),
            r === G && ee(t, e))
        }
        function Q(t, r) {
            var n;
            try {
                if (t === r)
                    throw new TypeError("A promises callback cannot return that same promise.");
                if (r && ("function" == typeof r || "object" == typeof r)) {
                    var e = r.then;
                    if ("function" == typeof e)
                        return e.call(r, function(e) {
                            n || (n = !0,
                            (r === e ? Z : J)(t, e))
                        }, function(e) {
                            n || (n = !0,
                            ee(t, e))
                        }),
                        1
                }
            } catch (e) {
                return n || ee(t, e),
                1
            }
        }
        function J(e, t) {
            e !== t && Q(e, t) || Z(e, t)
        }
        function Z(e, t) {
            e._state === F && (e._state = U,
            e._data = t,
            X(re, e))
        }
        function ee(e, t) {
            e._state === F && (e._state = U,
            e._data = t,
            X(ne, e))
        }
        function te(e) {
            e._then = e._then.forEach(Y)
        }
        function re(e) {
            e._state = V,
            te(e)
        }
        function ne(e) {
            e._state = G,
            te(e),
            !e._handled && W && R.process.emit("unhandledRejection", e._data, e)
        }
        function oe(e) {
            R.process.emit("rejectionHandled", e)
        }
        function ie(e) {
            if ("function" != typeof e)
                throw new TypeError("Promise resolver " + e + " is not a function");
            if (this instanceof ie == !1)
                throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
            this._then = [],
            $(e, this)
        }
        ie.prototype = {
            constructor: ie,
            _state: F,
            _then: null,
            _data: void 0,
            _handled: !1,
            then: function(e, t) {
                var r = {
                    owner: this,
                    then: new this.constructor(H),
                    fulfilled: e,
                    rejected: t
                };
                return !t && !e || this._handled || (this._handled = !0,
                this._state === G && W && X(oe, this)),
                this._state === V || this._state === G ? X(Y, r) : this._then.push(r),
                r.then
            },
            catch: function(e) {
                return this.then(null, e)
            }
        },
        ie.all = function(s) {
            if (Array.isArray(s))
                return new ie(function(r, e) {
                    var n = []
                      , o = 0;
                    for (var t, i = 0; i < s.length; i++)
                        (t = s[i]) && "function" == typeof t.then ? t.then(function(t) {
                            return o++,
                            function(e) {
                                n[t] = e,
                                --o || r(n)
                            }
                        }(i), e) : n[i] = t;
                    o || r(n)
                }
                );
            throw new TypeError("You must pass an array to Promise.all().")
        }
        ,
        ie.race = function(o) {
            if (Array.isArray(o))
                return new ie(function(e, t) {
                    for (var r, n = 0; n < o.length; n++)
                        (r = o[n]) && "function" == typeof r.then ? r.then(e, t) : e(r)
                }
                );
            throw new TypeError("You must pass an array to Promise.race().")
        }
        ,
        ie.resolve = function(t) {
            return t && "object" == typeof t && t.constructor === ie ? t : new ie(function(e) {
                e(t)
            }
            )
        }
        ,
        ie.reject = function(r) {
            return new ie(function(e, t) {
                t(r)
            }
            )
        }
        ;
        var se = ie
          , ae = function(e, t) {
            return (ae = Object.setPrototypeOf || {
                __proto__: []
            }instanceof Array && function(e, t) {
                e.__proto__ = t
            }
            || function(e, t) {
                for (var r in t)
                    t.hasOwnProperty(r) && (e[r] = t[r])
            }
            )(e, t)
        };
        function e(e, t) {
            function r() {
                this.constructor = e
            }
            ae(e, t),
            e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype,
            new r)
        }
        function le() {
            for (var e = 0, t = 0, r = arguments.length; t < r; t++)
                e += arguments[t].length;
            for (var n = Array(e), o = 0, t = 0; t < r; t++)
                for (var i = arguments[t], s = 0, a = i.length; s < a; s++,
                o++)
                    n[o] = i[s];
            return n
        }
        var _ = {
            processDomMethodName: "hammerhead|process-dom-method",
            processedContext: "hammerhead|processed-context",
            documentWasCleaned: "hammerhead|document-was-cleaned",
            documentCharset: "hammerhead|document-charset",
            iframeNativeMethods: "hammerhead|iframe-native-methods",
            hammerhead: "%hammerhead%",
            selection: "hammerhead|selection",
            shadowUIElement: "hammerhead|shadow-ui-element",
            forceProxySrcForImage: "hammerhead|image|force-proxy-src-flag",
            skipNextLoadEventForImage: "hammerhead|image|skip-next-load-event-flag",
            cachedImage: "hammerhead|image|cached-image",
            sandboxIsReattached: "hammerhead|sandbox-is-reattached",
            nativeStrRepresentation: "hammerhead|native-string-representation",
            currentBaseUrl: "hammerhead|current-base-url"
        }
          , t = "undefined" == typeof window && "object" == typeof self
          , ce = t ? self : window
          , pe = {
            isInWorker: t,
            global: ce,
            isServiceWorker: t && !ce.XMLHttpRequest
        };
        function ue(e, t, r) {
            var n;
            r && e[t] && (n = e[t].toString(),
            r.toString = function() {
                return n
            }
            ),
            e[t] = r
        }
        function he(e, t, r) {
            var n = r.getter
              , o = r.setter
              , r = r.value
              , e = b.objectGetOwnPropertyDescriptor(e, t);
            if ((n || o) && r)
                throw new Error("Cannot both specify accessors and a value or writable attribute.");
            return r ? (b.objectHasOwnProperty.call(e, "writable") || (e.writable = !!e.set,
            delete e.get,
            delete e.set),
            e.value = r) : (b.objectHasOwnProperty.call(e, "writable") && (delete e.value,
            delete e.writable),
            null !== n && ue(e, "get", n),
            null !== o && ue(e, "set", o)),
            e
        }
        function d(e, t, r) {
            r = he(e, t, r);
            b.objectDefineProperty(e, t, r)
        }
        function de(e, t) {
            var r, n, o;
            r = e,
            n = t.name,
            (o = b.objectGetOwnPropertyDescriptor(r, "name")) && (o.value = n,
            b.objectDefineProperty(r, "name", o)),
            b.objectDefineProperty(e, _.nativeStrRepresentation, {
                value: b.Function.prototype.toString.call(t),
                configurable: !0
            })
        }
        function fe(e) {
            return !b.objectHasOwnProperty.call(e, _.nativeStrRepresentation)
        }
        function f(e, t, r) {
            var n = e[t];
            fe(n) && (de(r, n),
            e[t] = r)
        }
        function me(e, t, r, n) {
            void 0 === n && (n = !1);
            var o = e[t].prototype;
            f(e, t, r),
            r.prototype = o,
            n && (o.constructor = r)
        }
        var ge = Object.freeze({
            __proto__: null,
            createOverriddenDescriptor: he,
            overrideDescriptor: d,
            overrideStringRepresentation: de,
            isNativeFunction: fe,
            overrideFunction: f,
            overrideConstructor: me
        })
          , ye = /\[native code]/;
        function o(e, t) {
            t = t || pe.global,
            this.refreshWindowMeths(t, pe.isInWorker),
            this.refreshWorkerMeths(t),
            pe.isInWorker || (this.refreshDocumentMeths(e, t),
            this.refreshElementMeths(e, t))
        }
        o._getDocumentPropOwnerName = function(e, t) {
            return e.hasOwnProperty(t) ? "Document" : "HTMLDocument"
        }
        ,
        o.prototype.getStoragesPropsOwner = function(e) {
            return this.isStoragePropsLocatedInProto ? e.Window.prototype : e
        }
        ,
        o.prototype.refreshWorkerMeths = function(e) {
            this.importScripts = e.importScripts
        }
        ,
        o.prototype.refreshDocumentMeths = function(e, t) {
            e = e || document;
            var r = (t = t || window).Document.prototype
              , e = (this.createDocumentFragment = r.createDocumentFragment,
            this.createElement = r.createElement,
            this.createElementNS = r.createElementNS,
            this.createTextNode = r.createTextNode,
            this.documentOpenPropOwnerName = o._getDocumentPropOwnerName(r, "open"),
            this.documentClosePropOwnerName = o._getDocumentPropOwnerName(r, "close"),
            this.documentWritePropOwnerName = o._getDocumentPropOwnerName(r, "write"),
            this.documentWriteLnPropOwnerName = o._getDocumentPropOwnerName(r, "writeln"),
            this.documentOpen = t[this.documentOpenPropOwnerName].prototype.open,
            this.documentClose = t[this.documentClosePropOwnerName].prototype.close,
            this.documentWrite = t[this.documentWritePropOwnerName].prototype.write,
            this.documentWriteLn = t[this.documentWriteLnPropOwnerName].prototype.writeln,
            this.elementFromPoint = r.elementFromPoint,
            this.caretRangeFromPoint = r.caretRangeFromPoint,
            this.caretPositionFromPoint = r.caretPositionFromPoint,
            this.getElementById = r.getElementById,
            this.getElementsByClassName = r.getElementsByClassName,
            this.getElementsByName = r.getElementsByName,
            this.getElementsByTagName = r.getElementsByTagName,
            this.querySelector = r.querySelector,
            this.querySelectorAll = r.querySelectorAll,
            this.createHTMLDocument = t.DOMImplementation.prototype.createHTMLDocument,
            e.registerElement && (this.registerElement = r.registerElement),
            t.EventTarget || (this.documentAddEventListener = r.addEventListener,
            this.documentRemoveEventListener = r.removeEventListener),
            this.documentCreateEvent = r.createEvent,
            this.documentCreateTouch = r.createTouch,
            this.documentCreateTouchList = r.createTouchList,
            this.documentCookiePropOwnerName = o._getDocumentPropOwnerName(r, "cookie"),
            t.Object.getOwnPropertyDescriptor(t[this.documentCookiePropOwnerName].prototype, "cookie"));
            if (!this.isNativeCode(e.get) || !this.isNativeCode(e.get.toString))
                try {
                    var n = t.parent["%hammerhead%"].nativeMethods;
                    e.get = n.documentCookieGetter,
                    e.set = n.documentCookieSetter
                } catch (e) {}
            this.documentReferrerGetter = t.Object.getOwnPropertyDescriptor(r, "referrer").get,
            this.documentStyleSheetsGetter = t.Object.getOwnPropertyDescriptor(r, "styleSheets").get,
            this.documentActiveElementGetter = t.Object.getOwnPropertyDescriptor(r, "activeElement").get,
            this.documentCookieGetter = e.get,
            this.documentCookieSetter = e.set;
            n = t.Object.getOwnPropertyDescriptor(r, "documentURI"),
            n && (this.documentDocumentURIGetter = n.get),
            e = t.Object.getOwnPropertyDescriptor(r, "title");
            this.documentTitleGetter = e.get,
            this.documentTitleSetter = e.set
        }
        ,
        o.prototype.refreshElementMeths = function(t, e) {
            function r(e) {
                return n.createElement.call(t || document, e)
            }
            var n = this
              , o = (e = e || window,
            r("div"))
              , i = n.createTextNode.call(t || document, "text");
            if (this.appendChild = e.Node.prototype.appendChild,
            this.append = e.Element.prototype.append,
            this.prepend = e.Element.prototype.prepend,
            this.after = e.Element.prototype.after,
            this.attachShadow = e.Element.prototype.attachShadow,
            this.replaceChild = o.replaceChild,
            this.cloneNode = o.cloneNode,
            this.elementGetElementsByClassName = o.getElementsByClassName,
            this.elementGetElementsByTagName = o.getElementsByTagName,
            this.elementQuerySelector = o.querySelector,
            this.elementQuerySelectorAll = o.querySelectorAll,
            this.getAttribute = o.getAttribute,
            this.getAttributeNS = o.getAttributeNS,
            this.getAttributeNode = o.getAttributeNode,
            this.getAttributeNodeNS = o.getAttributeNodeNS,
            this.insertBefore = o.insertBefore,
            this.insertCell = r("tr").insertCell,
            this.insertTableRow = r("table").insertRow,
            this.insertTBodyRow = r("tbody").insertRow,
            this.removeAttribute = o.removeAttribute,
            this.removeAttributeNS = o.removeAttributeNS,
            this.removeAttributeNode = o.removeAttributeNode,
            this.removeChild = e.Node.prototype.removeChild,
            this.remove = e.Element.prototype.remove,
            this.elementReplaceWith = e.Element.prototype.replaceWith,
            this.setAttribute = o.setAttribute,
            this.setAttributeNS = o.setAttributeNS,
            this.hasAttribute = o.hasAttribute,
            this.hasAttributeNS = o.hasAttributeNS,
            this.hasAttributes = o.hasAttributes,
            this.anchorToString = e.HTMLAnchorElement.prototype.toString,
            this.matches = o.matches || o.msMatchesSelector,
            this.closest = o.closest,
            this.insertAdjacentMethodsOwner = (e.Element.prototype.hasOwnProperty("insertAdjacentElement") ? e.Element : e.HTMLElement).prototype,
            this.insertAdjacentElement = this.insertAdjacentMethodsOwner.insertAdjacentElement,
            this.insertAdjacentHTML = this.insertAdjacentMethodsOwner.insertAdjacentHTML,
            this.insertAdjacentText = this.insertAdjacentMethodsOwner.insertAdjacentText,
            this.appendData = i.appendData,
            !this.isNativeCode(this.elementGetElementsByTagName))
                try {
                    var s = e.parent["%hammerhead%"].nativeMethods;
                    this.elementGetElementsByTagName = s.elementGetElementsByTagName
                } catch (e) {}
            e.EventTarget ? (this.addEventListener = e.EventTarget.prototype.addEventListener,
            this.removeEventListener = e.EventTarget.prototype.removeEventListener,
            this.dispatchEvent = e.EventTarget.prototype.dispatchEvent) : (this.addEventListener = o.addEventListener,
            this.removeEventListener = o.removeEventListener,
            this.dispatchEvent = o.dispatchEvent),
            this.blur = o.blur,
            this.click = o.click,
            this.focus = o.focus,
            this.select = window.TextRange ? r("body").createTextRange().select : null,
            this.setSelectionRange = r("input").setSelectionRange,
            this.textAreaSetSelectionRange = r("textarea").setSelectionRange,
            this.svgFocus = (e.SVGElement ? e.SVGElement.prototype : this).focus,
            this.svgBlur = (e.SVGElement ? e.SVGElement.prototype : this).blur,
            this.htmlElementStylePropOwnerName = e.Element.prototype.hasOwnProperty("style") ? "Element" : "HTMLElement";
            i = e.Object.getOwnPropertyDescriptor(e[this.htmlElementStylePropOwnerName].prototype, "style"),
            this.htmlElementStyleGetter = i.get,
            i.set && (this.htmlElementStyleSetter = i.set),
            s = e.Object.getOwnPropertyDescriptor(e.CSSStyleDeclaration.prototype, "cssText");
            this.styleCssTextGetter = s.get,
            this.styleCssTextSetter = s.set
        }
        ,
        o.prototype._refreshGettersAndSetters = function(e, t) {
            void 0 === t && (t = !1);
            var r, n, o, i, s, a, l, c, p, u, h, d, f, m, g, y, v, E, S, _, b, w, x, C, T, R, j, H, B, F, U, V, G, W, q, K, z, X, $, A, P, I = (e = e || window).constructor.prototype, I = (this.isEventPropsLocatedInProto = I.hasOwnProperty("onerror"),
            this.isEventPropsLocatedInProto ? I : e), N = e.Object.getOwnPropertyDescriptor(I, "onbeforeunload"), O = e.Object.getOwnPropertyDescriptor(I, "onunload"), L = e.Object.getOwnPropertyDescriptor(I, "onpagehide"), k = e.Object.getOwnPropertyDescriptor(I, "onmessage"), D = e.Object.getOwnPropertyDescriptor(I, "onerror"), M = e.Object.getOwnPropertyDescriptor(I, "onhashchange"), N = (this.winOnBeforeUnloadSetter = N && N.set,
            this.winOnUnloadSetter = O && O.set,
            this.winOnPageHideSetter = L && L.set,
            this.winOnMessageSetter = k && k.set,
            this.winOnErrorSetter = D && D.set,
            this.winOnHashChangeSetter = M && M.set,
            e.Object.getOwnPropertyDescriptor(I, "onunhandledrejection")), L = (N && (this.winOnUnhandledRejectionSetter = N.set),
            !e.WebSocket || (O = e.Object.getOwnPropertyDescriptor(e.WebSocket.prototype, "url")) && O.get && O.configurable && (this.webSocketUrlGetter = O.get),
            this.messageEventOriginGetter = e.Object.getOwnPropertyDescriptor(e.MessageEvent.prototype, "origin").get,
            e.PerformanceNavigationTiming && (this.performanceEntryNameGetter = e.Object.getOwnPropertyDescriptor(e.PerformanceEntry.prototype, "name").get),
            e.Object.getOwnPropertyDescriptor(e.MessageEvent.prototype, "data"));
            L && (this.messageEventDataGetter = L.get),
            e.fetch && (this.responseStatusGetter = e.Object.getOwnPropertyDescriptor(e.Response.prototype, "status").get,
            this.responseTypeGetter = e.Object.getOwnPropertyDescriptor(e.Response.prototype, "type").get,
            this.responseUrlGetter = e.Object.getOwnPropertyDescriptor(e.Response.prototype, "url").get,
            this.requestUrlGetter = e.Object.getOwnPropertyDescriptor(e.Request.prototype, "url").get,
            this.requestReferrerGetter = e.Object.getOwnPropertyDescriptor(e.Request.prototype, "referrer").get),
            e.XMLHttpRequest && (k = e.Object.getOwnPropertyDescriptor(e.XMLHttpRequest.prototype, "responseURL")) && (this.xhrResponseURLGetter = k.get),
            e.Window && (this.isStoragePropsLocatedInProto = e.Window.prototype.hasOwnProperty("localStorage"),
            D = this.getStoragesPropsOwner(e),
            this.winLocalStorageGetter = e.Object.getOwnPropertyDescriptor(D, "localStorage").get,
            this.winSessionStorageGetter = e.Object.getOwnPropertyDescriptor(D, "sessionStorage").get),
            t || (this.storageGetItem = e.Storage.prototype.getItem,
            this.storageSetItem = e.Storage.prototype.setItem,
            this.storageRemoveItem = e.Storage.prototype.removeItem,
            this.storageClear = e.Storage.prototype.clear,
            this.storageKey = e.Storage.prototype.key,
            this.storageLengthGetter = e.Object.getOwnPropertyDescriptor(e.Storage.prototype, "length"),
            M = e.Object.getOwnPropertyDescriptor(e.HTMLObjectElement.prototype, "data"),
            I = e.Object.getOwnPropertyDescriptor(e.HTMLInputElement.prototype, "type"),
            N = e.Object.getOwnPropertyDescriptor(e.HTMLInputElement.prototype, "value"),
            O = e.Object.getOwnPropertyDescriptor(e.HTMLInputElement.prototype, "disabled"),
            L = e.Object.getOwnPropertyDescriptor(e.HTMLInputElement.prototype, "required"),
            k = e.Object.getOwnPropertyDescriptor(e.HTMLTextAreaElement.prototype, "value"),
            D = e.Object.getOwnPropertyDescriptor(e.HTMLImageElement.prototype, "src"),
            t = e.Object.getOwnPropertyDescriptor(e.HTMLScriptElement.prototype, "src"),
            r = e.Object.getOwnPropertyDescriptor(e.HTMLScriptElement.prototype, "integrity"),
            n = e.Object.getOwnPropertyDescriptor(e.HTMLEmbedElement.prototype, "src"),
            o = e.Object.getOwnPropertyDescriptor(e.HTMLSourceElement.prototype, "src"),
            i = e.Object.getOwnPropertyDescriptor(e.HTMLMediaElement.prototype, "src"),
            s = e.Object.getOwnPropertyDescriptor(e.HTMLInputElement.prototype, "src"),
            a = e.Object.getOwnPropertyDescriptor(e.HTMLFrameElement.prototype, "src"),
            l = e.Object.getOwnPropertyDescriptor(e.HTMLIFrameElement.prototype, "src"),
            c = e.Object.getOwnPropertyDescriptor(e.HTMLAnchorElement.prototype, "href"),
            p = e.Object.getOwnPropertyDescriptor(e.HTMLLinkElement.prototype, "href"),
            u = e.Object.getOwnPropertyDescriptor(e.HTMLLinkElement.prototype, "integrity"),
            h = e.Object.getOwnPropertyDescriptor(e.HTMLLinkElement.prototype, "rel"),
            P = e.Object.getOwnPropertyDescriptor(e.HTMLLinkElement.prototype, "as"),
            d = e.Object.getOwnPropertyDescriptor(e.HTMLAreaElement.prototype, "href"),
            f = e.Object.getOwnPropertyDescriptor(e.HTMLBaseElement.prototype, "href"),
            m = e.Object.getOwnPropertyDescriptor(e.HTMLAnchorElement.prototype, "host"),
            g = e.Object.getOwnPropertyDescriptor(e.HTMLAnchorElement.prototype, "hostname"),
            y = e.Object.getOwnPropertyDescriptor(e.HTMLAnchorElement.prototype, "pathname"),
            v = e.Object.getOwnPropertyDescriptor(e.HTMLAnchorElement.prototype, "port"),
            E = e.Object.getOwnPropertyDescriptor(e.HTMLAnchorElement.prototype, "protocol"),
            S = e.Object.getOwnPropertyDescriptor(e.HTMLAnchorElement.prototype, "search"),
            _ = e.Object.getOwnPropertyDescriptor(e.HTMLAnchorElement.prototype, "target"),
            b = e.Object.getOwnPropertyDescriptor(e.HTMLFormElement.prototype, "target"),
            w = e.Object.getOwnPropertyDescriptor(e.HTMLAreaElement.prototype, "target"),
            x = e.Object.getOwnPropertyDescriptor(e.HTMLBaseElement.prototype, "target"),
            C = e.Object.getOwnPropertyDescriptor(e.HTMLInputElement.prototype, "formTarget"),
            T = e.Object.getOwnPropertyDescriptor(e.HTMLButtonElement.prototype, "formTarget"),
            R = e.Object.getOwnPropertyDescriptor(e.SVGImageElement.prototype, "href"),
            j = e.Object.getOwnPropertyDescriptor(e.SVGAnimatedString.prototype, "animVal"),
            H = e.Object.getOwnPropertyDescriptor(e.SVGAnimatedString.prototype, "baseVal"),
            B = e.Object.getOwnPropertyDescriptor(e.HTMLInputElement.prototype, "autocomplete"),
            F = e.Object.getOwnPropertyDescriptor(e.HTMLFormElement.prototype, "action"),
            U = e.Object.getOwnPropertyDescriptor(e.HTMLInputElement.prototype, "formAction"),
            V = e.Object.getOwnPropertyDescriptor(e.HTMLButtonElement.prototype, "formAction"),
            G = e.Object.getOwnPropertyDescriptor(e.Node.prototype, "textContent"),
            W = e.Object.getOwnPropertyDescriptor(e.HTMLElement.prototype, "innerText"),
            q = e.Object.getOwnPropertyDescriptor(e.HTMLScriptElement.prototype, "text"),
            K = e.Object.getOwnPropertyDescriptor(e.HTMLAnchorElement.prototype, "text"),
            z = e.Object.getOwnPropertyDescriptor(e.HTMLTitleElement.prototype, "text"),
            X = e.Object.getOwnPropertyDescriptor(e.HTMLIFrameElement.prototype, "sandbox"),
            $ = e.Object.getOwnPropertyDescriptor(e.HTMLMetaElement.prototype, "httpEquiv"),
            (A = e.Object.getOwnPropertyDescriptor(e, "origin")) && (this.windowOriginGetter = A.get,
            this.windowOriginSetter = A.set),
            O && (this.inputDisabledSetter = O.set,
            this.inputDisabledGetter = O.get),
            this.elementHTMLPropOwnerName = e.Element.prototype.hasOwnProperty("innerHTML") ? "Element" : "HTMLElement",
            A = e.Object.getOwnPropertyDescriptor(e[this.elementHTMLPropOwnerName].prototype, "innerHTML"),
            O = e.Object.getOwnPropertyDescriptor(e[this.elementHTMLPropOwnerName].prototype, "outerHTML"),
            this.objectDataSetter = M.set,
            this.inputTypeSetter = I.set,
            this.inputValueSetter = N.set,
            this.inputRequiredSetter = L.set,
            this.textAreaValueSetter = k.set,
            this.imageSrcSetter = D.set,
            this.scriptSrcSetter = t.set,
            this.embedSrcSetter = n.set,
            this.sourceSrcSetter = o.set,
            this.mediaSrcSetter = i.set,
            this.inputSrcSetter = s.set,
            this.frameSrcSetter = a.set,
            this.iframeSrcSetter = l.set,
            this.anchorHrefSetter = c.set,
            this.linkHrefSetter = p.set,
            this.linkRelSetter = h.set,
            this.linkAsSetter = P && P.set,
            this.areaHrefSetter = d.set,
            this.baseHrefSetter = f.set,
            this.anchorHostSetter = m.set,
            this.anchorHostnameSetter = g.set,
            this.anchorPathnameSetter = y.set,
            this.anchorPortSetter = v.set,
            this.anchorProtocolSetter = E.set,
            this.anchorSearchSetter = S.set,
            this.anchorTargetSetter = _.set,
            this.formTargetSetter = b.set,
            this.areaTargetSetter = w.set,
            this.baseTargetSetter = x.set,
            this.inputFormTargetSetter = C.set,
            this.buttonFormTargetSetter = T.set,
            this.svgAnimStrBaseValSetter = H.set,
            this.inputAutocompleteSetter = B.set,
            this.formActionSetter = F.set,
            this.inputFormActionSetter = U.set,
            this.buttonFormActionSetter = V.set,
            this.iframeSandboxSetter = X.set,
            this.metaHttpEquivSetter = $.set,
            this.htmlElementOnloadSetter = e.Object.getOwnPropertyDescriptor(e.HTMLElement.prototype, "onload").set,
            this.nodeTextContentSetter = G.set,
            this.htmlElementInnerTextSetter = W.set,
            this.scriptTextSetter = q.set,
            this.anchorTextSetter = K.set,
            this.elementInnerHTMLSetter = A.set,
            this.elementOuterHTMLSetter = O.set,
            r && u && (this.scriptIntegritySetter = r.set,
            this.linkIntegritySetter = u.set),
            this.titleElementTextSetter = z.set,
            this.elementClassListPropOwnerName = e.Element.prototype.hasOwnProperty("classList") ? "Element" : "HTMLElement",
            this.elementClassListGetter = e.Object.getOwnPropertyDescriptor(e[this.elementClassListPropOwnerName].prototype, "classList").get,
            this.htmlCollectionLengthGetter = e.Object.getOwnPropertyDescriptor(e.HTMLCollection.prototype, "length").get,
            this.nodeListLengthGetter = e.Object.getOwnPropertyDescriptor(e.NodeList.prototype, "length").get,
            this.elementChildElementCountGetter = e.Object.getOwnPropertyDescriptor(e.Element.prototype, "childElementCount").get,
            this.inputFilesGetter = e.Object.getOwnPropertyDescriptor(e.HTMLInputElement.prototype, "files").get,
            this.styleSheetHrefGetter = e.Object.getOwnPropertyDescriptor(e.StyleSheet.prototype, "href").get,
            this.objectDataGetter = M.get,
            this.inputTypeGetter = I.get,
            this.inputValueGetter = N.get,
            this.inputRequiredGetter = L.get,
            this.textAreaValueGetter = k.get,
            this.imageSrcGetter = D.get,
            this.scriptSrcGetter = t.get,
            this.embedSrcGetter = n.get,
            this.sourceSrcGetter = o.get,
            this.mediaSrcGetter = i.get,
            this.inputSrcGetter = s.get,
            this.frameSrcGetter = a.get,
            this.iframeSrcGetter = l.get,
            this.anchorHrefGetter = c.get,
            this.linkHrefGetter = p.get,
            this.linkRelGetter = h.get,
            this.areaHrefGetter = d.get,
            this.baseHrefGetter = f.get,
            this.anchorHostGetter = m.get,
            this.anchorHostnameGetter = g.get,
            this.anchorPathnameGetter = y.get,
            this.anchorPortGetter = v.get,
            this.anchorProtocolGetter = E.get,
            this.anchorSearchGetter = S.get,
            this.anchorTargetGetter = _.get,
            this.formTargetGetter = b.get,
            this.areaTargetGetter = w.get,
            this.baseTargetGetter = x.get,
            this.inputFormTargetGetter = C.get,
            this.buttonFormTargetGetter = T.get,
            this.svgImageHrefGetter = R.get,
            this.svgAnimStrAnimValGetter = j.get,
            this.svgAnimStrBaseValGetter = H.get,
            this.inputAutocompleteGetter = B.get,
            this.formActionGetter = F.get,
            this.inputFormActionGetter = U.get,
            this.buttonFormActionGetter = V.get,
            this.iframeSandboxGetter = X.get,
            this.metaHttpEquivGetter = $.get,
            this.contentWindowGetter = e.Object.getOwnPropertyDescriptor(e.HTMLIFrameElement.prototype, "contentWindow").get,
            this.contentDocumentGetter = e.Object.getOwnPropertyDescriptor(e.HTMLIFrameElement.prototype, "contentDocument").get,
            this.frameContentWindowGetter = e.Object.getOwnPropertyDescriptor(e.HTMLFrameElement.prototype, "contentWindow").get,
            this.nodeTextContentGetter = G.get,
            this.htmlElementInnerTextGetter = W.get,
            this.scriptTextGetter = q.get,
            this.anchorTextGetter = K.get,
            this.elementInnerHTMLGetter = A.get,
            this.elementOuterHTMLGetter = O.get,
            this.nodeFirstChildGetter = e.Object.getOwnPropertyDescriptor(e.Node.prototype, "firstChild").get,
            this.nodeLastChildGetter = e.Object.getOwnPropertyDescriptor(e.Node.prototype, "lastChild").get,
            this.nodeNextSiblingGetter = e.Object.getOwnPropertyDescriptor(e.Node.prototype, "nextSibling").get,
            this.nodePrevSiblingGetter = e.Object.getOwnPropertyDescriptor(e.Node.prototype, "previousSibling").get,
            this.nodeParentNodeGetter = e.Object.getOwnPropertyDescriptor(e.Node.prototype, "parentNode").get,
            this.nodeChildNodesGetter = e.Object.getOwnPropertyDescriptor(e.Node.prototype, "childNodes").get,
            this.elementFirstElementChildGetter = e.Object.getOwnPropertyDescriptor(e.Element.prototype, "firstElementChild").get,
            this.elementLastElementChildGetter = e.Object.getOwnPropertyDescriptor(e.Element.prototype, "lastElementChild").get,
            this.elementNextElementSiblingGetter = e.Object.getOwnPropertyDescriptor(e.Element.prototype, "nextElementSibling").get,
            this.elementPrevElementSiblingGetter = e.Object.getOwnPropertyDescriptor(e.Element.prototype, "previousElementSibling").get,
            r && u && (this.scriptIntegrityGetter = r.get,
            this.linkIntegrityGetter = u.get),
            P = (e.Element.prototype.hasOwnProperty("children") ? e.Element : e.HTMLElement).prototype,
            this.elementChildrenGetter = e.Object.getOwnPropertyDescriptor(P, "children").get,
            (M = e.Object.getOwnPropertyDescriptor(e.HTMLAnchorElement.prototype, "origin")) && (this.anchorOriginGetter = M.get),
            (I = e.Object.getOwnPropertyDescriptor(e.HTMLIFrameElement.prototype, "srcdoc")) && (this.iframeSrcdocGetter = I.get,
            this.iframeSrcdocSetter = I.set),
            (N = e.Object.getOwnPropertyDescriptor(e.CSSStyleSheet.prototype, "href")) && (this.cssStyleSheetHrefGetter = N.get),
            (L = e.Object.getOwnPropertyDescriptor(e.Node.prototype, "baseURI")) && (this.nodeBaseURIGetter = L.get),
            this.elementAttributesPropOwnerName = e.Element.prototype.hasOwnProperty("attributes") ? "Element" : "Node",
            this.elementAttributesGetter = e.Object.getOwnPropertyDescriptor(e[this.elementAttributesPropOwnerName].prototype, "attributes").get,
            (k = e.Object.getOwnPropertyDescriptor(e.HTMLHtmlElement.prototype, "manifest")) && (this.htmlManifestGetter = k.get,
            this.htmlManifestSetter = k.set),
            this.titleElementTextGetter = z.get,
            this.mutationRecordNextSiblingGetter = e.Object.getOwnPropertyDescriptor(e.MutationRecord.prototype, "nextSibling").get,
            this.mutationRecordPrevSiblingGetter = e.Object.getOwnPropertyDescriptor(e.MutationRecord.prototype, "previousSibling").get)
        }
        ,
        o.prototype.refreshWindowMeths = function(e, t) {
            void 0 === t && (t = !1);
            var r = (e = e || window).constructor.prototype;
            this.eval = e.eval,
            this.formSubmit = e.HTMLFormElement && e.HTMLFormElement.prototype.submit,
            this.documentFragmentQuerySelector = e.DocumentFragment && e.DocumentFragment.prototype.querySelector,
            this.documentFragmentQuerySelectorAll = e.DocumentFragment && e.DocumentFragment.prototype.querySelectorAll,
            this.preventDefault = e.Event.prototype.preventDefault,
            this.historyPushState = e.history && e.history.pushState,
            this.historyReplaceState = e.history && e.history.replaceState,
            this.postMessage = e.postMessage || r.postMessage,
            this.windowOpen = e.open || r.open,
            this.setTimeout = e.setTimeout || r.setTimeout,
            this.setInterval = e.setInterval || r.setInterval,
            this.clearTimeout = e.clearTimeout || r.clearTimeout,
            this.clearInterval = e.clearInterval || r.clearInterval,
            this.registerProtocolHandler = e.navigator.registerProtocolHandler,
            this.sendBeacon = e.Navigator && e.Navigator.prototype.sendBeacon,
            e.XMLHttpRequest && (o = (e.EventTarget || e.XMLHttpRequest).prototype,
            this.xhrAbort = e.XMLHttpRequest.prototype.abort,
            this.xhrOpen = e.XMLHttpRequest.prototype.open,
            this.xhrSend = e.XMLHttpRequest.prototype.send,
            this.xhrAddEventListener = o.addEventListener,
            this.xhrRemoveEventListener = o.removeEventListener,
            this.xhrDispatchEvent = o.dispatchEvent,
            this.xhrGetResponseHeader = e.XMLHttpRequest.prototype.getResponseHeader,
            this.xhrGetAllResponseHeaders = e.XMLHttpRequest.prototype.getAllResponseHeaders,
            this.xhrSetRequestHeader = e.XMLHttpRequest.prototype.setRequestHeader,
            this.xhrOverrideMimeType = e.XMLHttpRequest.prototype.overrideMimeType);
            try {
                this.registerServiceWorker = e.navigator.serviceWorker.register,
                this.getRegistrationServiceWorker = e.navigator.serviceWorker.getRegistration
            } catch (e) {
                this.registerServiceWorker = null,
                this.getRegistrationServiceWorker = null
            }
            this.createContextualFragment = e.Range && e.Range.prototype.createContextualFragment;
            var n, o, i = e.performance;
            i && (n = e.performance.now || e.Performance.prototype.now,
            this.performanceNow = function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return n.apply(i, e)
            }
            ),
            this.fetch = e.fetch,
            this.Request = e.Request,
            e.Headers && (this.Headers = e.Headers,
            this.headersSet = e.Headers.prototype.set,
            this.headersGet = e.Headers.prototype.get,
            this.headersDelete = e.Headers.prototype.delete,
            this.headersEntries = e.Headers.prototype.entries,
            this.headersForEach = e.Headers.prototype.forEach,
            this.headersValues = e.Headers.prototype.values),
            this.windowAddEventListener = e.addEventListener || r.addEventListener,
            this.windowRemoveEventListener = e.removeEventListener || r.removeEventListener,
            this.windowDispatchEvent = e.dispatchEvent,
            this.WindowPointerEvent = e.PointerEvent || r.PointerEvent,
            this.WindowMSPointerEvent = e.MSPointerEvent || r.MSPointerEvent,
            this.WindowTouch = e.Touch || r.Touch,
            this.WindowTouchEvent = e.TouchEvent || r.TouchEvent,
            this.WindowKeyboardEvent = e.KeyboardEvent || r.KeyboardEvent,
            this.WindowFocusEvent = e.FocusEvent || r.FocusEvent,
            this.WindowTextEvent = e.TextEvent || r.TextEvent,
            this.WindowInputEvent = e.InputEvent || r.InputEvent,
            this.WindowMouseEvent = e.MouseEvent || r.MouseEvent,
            this.eventTargetGetter = e.Object.getOwnPropertyDescriptor(e.Event.prototype, "target").get,
            this.canvasContextDrawImage = e.CanvasRenderingContext2D && e.CanvasRenderingContext2D.prototype.drawImage,
            this.formDataAppend = e.FormData && e.FormData.prototype.append,
            this.date = e.Date,
            this.dateNow = e.Date.now,
            this.math = e.Math,
            this.mathRandom = e.Math.random,
            this.objectToString = e.Object.prototype.toString,
            this.objectAssign = e.Object.assign,
            this.objectKeys = e.Object.keys,
            this.objectDefineProperty = e.Object.defineProperty,
            this.objectDefineProperties = e.Object.defineProperties,
            this.objectCreate = e.Object.create,
            this.objectIsExtensible = e.Object.isExtensible,
            this.objectIsFrozen = e.Object.isFrozen,
            this.objectGetOwnPropertyDescriptor = e.Object.getOwnPropertyDescriptor,
            this.objectHasOwnProperty = e.Object.hasOwnProperty,
            this.objectGetOwnPropertyNames = e.Object.getOwnPropertyNames,
            this.objectGetPrototypeOf = e.Object.getPrototypeOf,
            this.objectSetPrototypeOf = e.Object.setPrototypeOf,
            this.objectGetOwnPropertySymbols = e.Object.getOwnPropertySymbols,
            this.arraySlice = e.Array.prototype.slice,
            this.arrayConcat = e.Array.prototype.concat,
            this.arrayFilter = e.Array.prototype.filter,
            this.arrayFind = e.Array.prototype.find,
            this.arrayMap = e.Array.prototype.map,
            this.arrayJoin = e.Array.prototype.join,
            this.arraySplice = e.Array.prototype.splice,
            this.arrayUnshift = e.Array.prototype.unshift,
            this.arrayForEach = e.Array.prototype.forEach,
            this.arrayIndexOf = e.Array.prototype.indexOf,
            this.arraySome = e.Array.prototype.some,
            this.arrayReverse = e.Array.prototype.reverse,
            this.arrayReduce = e.Array.prototype.reduce,
            this.arrayFrom = e.Array.from,
            this.isArray = e.Array.isArray,
            this.DOMParserParseFromString = e.DOMParser && e.DOMParser.prototype.parseFromString,
            this.arrayBufferIsView = e.ArrayBuffer.prototype.constructor.isView,
            t || (this.tokenListAdd = e.DOMTokenList.prototype.add,
            this.tokenListRemove = e.DOMTokenList.prototype.remove,
            this.tokenListReplace = e.DOMTokenList.prototype.replace,
            this.tokenListSupports = e.DOMTokenList.prototype.supports,
            this.tokenListToggle = e.DOMTokenList.prototype.toggle,
            this.tokenListContains = e.DOMTokenList.prototype.contains,
            (o = e.Object.getOwnPropertyDescriptor(e.DOMTokenList.prototype, "value")) && (this.tokenListValueSetter = o.set),
            this.styleGetPropertyValue = e.CSSStyleDeclaration.prototype.getPropertyValue,
            this.styleSetProperty = e.CSSStyleDeclaration.prototype.setProperty,
            this.styleRemoveProperty = e.CSSStyleDeclaration.prototype.removeProperty,
            this.styleInsertRule = e.CSSStyleSheet.prototype.insertRule,
            this.scrollTo = e.scrollTo),
            e.Promise && (this.promiseThen = e.Promise.prototype.then,
            this.promiseReject = e.Promise.reject),
            this.console = e.console,
            this.console && (this.consoleMeths = {
                log: e.console.log,
                warn: e.console.warn,
                error: e.console.error,
                info: e.console.info
            }),
            this.crypto = e.crypto || e.msCrypto,
            this.cryptoGetRandomValues = this.crypto && this.crypto.getRandomValues,
            this.refreshClasses(e),
            this._refreshGettersAndSetters(e, t)
        }
        ,
        o.prototype.refreshClasses = function(e) {
            this.windowClass = e.Window,
            this.documentClass = e.Document,
            this.locationClass = e.Location,
            this.elementClass = e.Element,
            this.svgElementClass = e.SVGElement,
            this.Worker = e.Worker,
            this.MessageChannel = e.MessageChannel,
            this.Array = e.Array,
            this.ArrayBuffer = e.ArrayBuffer,
            this.Uint8Array = e.Uint8Array,
            this.Uint16Array = e.Uint16Array,
            this.Uint32Array = e.Uint32Array,
            this.DataView = e.DataView,
            this.Blob = e.Blob,
            this.XMLHttpRequest = e.XMLHttpRequest,
            this.Image = e.Image,
            this.Function = e.Function,
            this.functionToString = e.Function.prototype.toString,
            this.Error = e.Error,
            this.FontFace = e.FontFace,
            this.StorageEvent = e.StorageEvent,
            this.MutationObserver = e.MutationObserver,
            this.EventSource = e.EventSource,
            this.Proxy = e.Proxy,
            this.WebSocket = e.WebSocket,
            this.HTMLCollection = e.HTMLCollection,
            this.NodeList = e.NodeList,
            this.Node = e.Node,
            this.URL = e.URL,
            this.DataTransfer = e.DataTransfer,
            this.DataTransferItemList = e.DataTransferItemList,
            this.DataTransferItem = e.DataTransferItem,
            this.FileList = e.FileList,
            e.File && "function" == typeof e.File && (this.File = e.File)
        }
        ,
        o.prototype.refreshElectronMeths = function(e) {
            return (!this.createScript || !fe(e.createScript)) && (this.createScript = e.createScript,
            this.runInDebugContext = e.runInDebugContext,
            this.runInContext = e.runInContext,
            this.runInNewContext = e.runInNewContext,
            this.runInThisContext = e.runInThisContext,
            !0)
        }
        ,
        o._ensureDocumentMethodRestore = function(e, t, r, n) {
            t[r] = n,
            e[r] !== t[r] && (e[r] = n)
        }
        ,
        o.prototype.restoreDocumentMeths = function(e, t) {
            var r = e.Document.prototype;
            o._ensureDocumentMethodRestore(t, r, "createDocumentFragment", this.createDocumentFragment),
            o._ensureDocumentMethodRestore(t, r, "createElement", this.createElement),
            o._ensureDocumentMethodRestore(t, r, "createElementNS", this.createElementNS),
            o._ensureDocumentMethodRestore(t, r, "elementFromPoint", this.elementFromPoint),
            o._ensureDocumentMethodRestore(t, r, "caretRangeFromPoint", this.caretRangeFromPoint),
            o._ensureDocumentMethodRestore(t, r, "caretPositionFromPoint", this.caretPositionFromPoint),
            o._ensureDocumentMethodRestore(t, r, "getElementById", this.getElementById),
            o._ensureDocumentMethodRestore(t, r, "getElementsByClassName", this.getElementsByClassName),
            o._ensureDocumentMethodRestore(t, r, "getElementsByName", this.getElementsByName),
            o._ensureDocumentMethodRestore(t, r, "getElementsByTagName", this.getElementsByTagName),
            o._ensureDocumentMethodRestore(t, r, "querySelector", this.querySelector),
            o._ensureDocumentMethodRestore(t, r, "querySelectorAll", this.querySelectorAll),
            e.EventTarget || (o._ensureDocumentMethodRestore(t, r, "addEventListener", this.documentAddEventListener),
            o._ensureDocumentMethodRestore(t, r, "removeEventListener", this.documentRemoveEventListener)),
            o._ensureDocumentMethodRestore(t, r, "createEvent", this.documentCreateEvent),
            o._ensureDocumentMethodRestore(t, r, "createTouch", this.documentCreateTouch),
            o._ensureDocumentMethodRestore(t, r, "createTouchList", this.documentCreateTouchList),
            o._ensureDocumentMethodRestore(t, e[this.documentOpenPropOwnerName].prototype, "open", this.documentOpen),
            o._ensureDocumentMethodRestore(t, e[this.documentClosePropOwnerName].prototype, "close", this.documentClose),
            o._ensureDocumentMethodRestore(t, e[this.documentWritePropOwnerName].prototype, "write", this.documentWrite),
            o._ensureDocumentMethodRestore(t, e[this.documentWriteLnPropOwnerName].prototype, "writeln", this.documentWriteLn)
        }
        ,
        o.prototype.refreshIfNecessary = function(e, t) {
            function r(e) {
                try {
                    return e()
                } catch (e) {
                    return !0
                }
            }
            var n = this
              , o = r(function() {
                return !e.createElement || fe(document.createElement)
            })
              , i = r(function() {
                return fe(n.createElement.call(e, "div").getAttribute)
            })
              , s = r(function() {
                return n.setTimeout.call(t, function() {}, 0),
                fe(t.XMLHttpRequest.prototype.open)
            });
            o && this.refreshDocumentMeths(e, t),
            i && this.refreshElementMeths(e, t),
            s && this.refreshWindowMeths(t)
        }
        ,
        o.prototype.isNativeCode = function(e) {
            return ye.test(this.functionToString.call(e))
        }
        ;
        var b = new o
          , t = j(function(e) {
            var t, r;
            t = R,
            r = function() {
                function s(t) {
                    function e(e) {
                        e = t.match(e);
                        return e && 1 < e.length && e[1] || ""
                    }
                    var r, n = e(/(ipod|iphone|ipad)/i).toLowerCase(), o = !/like android/i.test(t) && /android/i.test(t), i = /nexus\s*[0-6]\s*/i.test(t), s = !i && /nexus\s*[0-9]+/i.test(t), a = /CrOS/.test(t), l = /silk/i.test(t), c = /sailfish/i.test(t), p = /tizen/i.test(t), u = /(web|hpw)os/i.test(t), h = /windows phone/i.test(t), d = (/SamsungBrowser/i.test(t),
                    !h && /windows/i.test(t)), f = !n && !l && /macintosh/i.test(t), m = !o && !c && !p && !u && /linux/i.test(t), g = e(/edge\/(\d+(\.\d+)?)/i), y = e(/version\/(\d+(\.\d+)?)/i), v = /tablet/i.test(t), E = !v && /[^-]mobi/i.test(t), S = /xbox/i.test(t), a = (/opera/i.test(t) ? r = {
                        name: "Opera",
                        opera: !0,
                        version: y || e(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
                    } : /opr|opios/i.test(t) ? r = {
                        name: "Opera",
                        opera: !0,
                        version: e(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || y
                    } : /SamsungBrowser/i.test(t) ? r = {
                        name: "Samsung Internet for Android",
                        samsungBrowser: !0,
                        version: y || e(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
                    } : /coast/i.test(t) ? r = {
                        name: "Opera Coast",
                        coast: !0,
                        version: y || e(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
                    } : /yabrowser/i.test(t) ? r = {
                        name: "Yandex Browser",
                        yandexbrowser: !0,
                        version: y || e(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
                    } : /ucbrowser/i.test(t) ? r = {
                        name: "UC Browser",
                        ucbrowser: !0,
                        version: e(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
                    } : /mxios/i.test(t) ? r = {
                        name: "Maxthon",
                        maxthon: !0,
                        version: e(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
                    } : /epiphany/i.test(t) ? r = {
                        name: "Epiphany",
                        epiphany: !0,
                        version: e(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
                    } : /puffin/i.test(t) ? r = {
                        name: "Puffin",
                        puffin: !0,
                        version: e(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
                    } : /sleipnir/i.test(t) ? r = {
                        name: "Sleipnir",
                        sleipnir: !0,
                        version: e(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
                    } : /k-meleon/i.test(t) ? r = {
                        name: "K-Meleon",
                        kMeleon: !0,
                        version: e(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
                    } : h ? (r = {
                        name: "Windows Phone",
                        windowsphone: !0
                    },
                    g ? (r.msedge = !0,
                    r.version = g) : (r.msie = !0,
                    r.version = e(/iemobile\/(\d+(\.\d+)?)/i))) : /msie|trident/i.test(t) ? r = {
                        name: "Internet Explorer",
                        msie: !0,
                        version: e(/(?:msie |rv:)(\d+(\.\d+)?)/i)
                    } : a ? r = {
                        name: "Chrome",
                        chromeos: !0,
                        chromeBook: !0,
                        chrome: !0,
                        version: e(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                    } : /chrome.+? edge/i.test(t) ? r = {
                        name: "Microsoft Edge",
                        msedge: !0,
                        version: g
                    } : /vivaldi/i.test(t) ? r = {
                        name: "Vivaldi",
                        vivaldi: !0,
                        version: e(/vivaldi\/(\d+(\.\d+)?)/i) || y
                    } : c ? r = {
                        name: "Sailfish",
                        sailfish: !0,
                        version: e(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
                    } : /seamonkey\//i.test(t) ? r = {
                        name: "SeaMonkey",
                        seamonkey: !0,
                        version: e(/seamonkey\/(\d+(\.\d+)?)/i)
                    } : /firefox|iceweasel|fxios/i.test(t) ? (r = {
                        name: "Firefox",
                        firefox: !0,
                        version: e(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
                    },
                    /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(t) && (r.firefoxos = !0)) : l ? r = {
                        name: "Amazon Silk",
                        silk: !0,
                        version: e(/silk\/(\d+(\.\d+)?)/i)
                    } : /phantom/i.test(t) ? r = {
                        name: "PhantomJS",
                        phantom: !0,
                        version: e(/phantomjs\/(\d+(\.\d+)?)/i)
                    } : /slimerjs/i.test(t) ? r = {
                        name: "SlimerJS",
                        slimer: !0,
                        version: e(/slimerjs\/(\d+(\.\d+)?)/i)
                    } : /blackberry|\bbb\d+/i.test(t) || /rim\stablet/i.test(t) ? r = {
                        name: "BlackBerry",
                        blackberry: !0,
                        version: y || e(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
                    } : u ? (r = {
                        name: "WebOS",
                        webos: !0,
                        version: y || e(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
                    },
                    /touchpad\//i.test(t) && (r.touchpad = !0)) : /bada/i.test(t) ? r = {
                        name: "Bada",
                        bada: !0,
                        version: e(/dolfin\/(\d+(\.\d+)?)/i)
                    } : p ? r = {
                        name: "Tizen",
                        tizen: !0,
                        version: e(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || y
                    } : /qupzilla/i.test(t) ? r = {
                        name: "QupZilla",
                        qupzilla: !0,
                        version: e(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || y
                    } : /chromium/i.test(t) ? r = {
                        name: "Chromium",
                        chromium: !0,
                        version: e(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || y
                    } : /chrome|crios|crmo/i.test(t) ? r = {
                        name: "Chrome",
                        chrome: !0,
                        version: e(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
                    } : o ? r = {
                        name: "Android",
                        version: y
                    } : /safari|applewebkit/i.test(t) ? (r = {
                        name: "Safari",
                        safari: !0
                    },
                    y && (r.version = y)) : n ? (r = {
                        name: "iphone" == n ? "iPhone" : "ipad" == n ? "iPad" : "iPod"
                    },
                    y && (r.version = y)) : r = /googlebot/i.test(t) ? {
                        name: "Googlebot",
                        googlebot: !0,
                        version: e(/googlebot\/(\d+(\.\d+))/i) || y
                    } : {
                        name: e(/^(.*)\/(.*) /),
                        version: (h = /^(.*)\/(.*) /,
                        (h = t.match(h)) && 1 < h.length && h[2] || "")
                    },
                    !r.msedge && /(apple)?webkit/i.test(t) ? (/(apple)?webkit\/537\.36/i.test(t) ? (r.name = r.name || "Blink",
                    r.blink = !0) : (r.name = r.name || "Webkit",
                    r.webkit = !0),
                    !r.version && y && (r.version = y)) : !r.opera && /gecko\//i.test(t) && (r.name = r.name || "Gecko",
                    r.gecko = !0,
                    r.version = r.version || e(/gecko\/(\d+(\.\d+)?)/i)),
                    r.windowsphone || r.msedge || !o && !r.silk ? r.windowsphone || r.msedge || !n ? f ? r.mac = !0 : S ? r.xbox = !0 : d ? r.windows = !0 : m && (r.linux = !0) : (r[n] = !0,
                    r.ios = !0) : r.android = !0,
                    ""), g = (r.windowsphone ? a = e(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i) : n ? a = (a = e(/os (\d+([_\s]\d+)*) like mac os x/i)).replace(/[_\s]/g, ".") : o ? a = e(/android[ \/-](\d+(\.\d+)*)/i) : r.webos ? a = e(/(?:web|hpw)os\/(\d+(\.\d+)*)/i) : r.blackberry ? a = e(/rim\stablet\sos\s(\d+(\.\d+)*)/i) : r.bada ? a = e(/bada\/(\d+(\.\d+)*)/i) : r.tizen && (a = e(/tizen[\/\s](\d+(\.\d+)*)/i)),
                    a && (r.osversion = a),
                    a.split(".")[0]);
                    return v || s || "ipad" == n || o && (3 == g || 4 <= g && !E) || r.silk ? r.tablet = !0 : (E || "iphone" == n || "ipod" == n || o || i || r.blackberry || r.webos || r.bada) && (r.mobile = !0),
                    r.msedge || r.msie && 10 <= r.version || r.yandexbrowser && 15 <= r.version || r.vivaldi && 1 <= r.version || r.chrome && 20 <= r.version || r.samsungBrowser && 4 <= r.version || r.firefox && 20 <= r.version || r.safari && 6 <= r.version || r.opera && 10 <= r.version || r.ios && r.osversion && 6 <= r.osversion.split(".")[0] || r.blackberry && 10.1 <= r.version || r.chromium && 20 <= r.version ? r.a = !0 : r.msie && r.version < 10 || r.chrome && r.version < 20 || r.firefox && r.version < 20 || r.safari && r.version < 6 || r.opera && r.version < 10 || r.ios && r.osversion && r.osversion.split(".")[0] < 6 || r.chromium && r.version < 20 ? r.c = !0 : r.x = !0,
                    r
                }
                var a = s("undefined" != typeof navigator && navigator.userAgent || "");
                function n(e) {
                    return e.split(".").length
                }
                function o(e, t) {
                    var r, n = [];
                    if (Array.prototype.map)
                        return Array.prototype.map.call(e, t);
                    for (r = 0; r < e.length; r++)
                        n.push(t(e[r]));
                    return n
                }
                function l(e) {
                    for (var r = Math.max(n(e[0]), n(e[1])), t = o(e, function(e) {
                        var t = r - n(e);
                        return o((e += new Array(1 + t).join(".0")).split("."), function(e) {
                            return new Array(20 - e.length).join("0") + e
                        }).reverse()
                    }); 0 <= --r; ) {
                        if (t[0][r] > t[1][r])
                            return 1;
                        if (t[0][r] !== t[1][r])
                            return -1;
                        if (0 === r)
                            return 0
                    }
                }
                function i(e, t, r) {
                    var n, o = a, i = ("string" == typeof t && (r = t,
                    t = void 0),
                    void 0 === t && (t = !1),
                    "" + (o = r ? s(r) : o).version);
                    for (n in e)
                        if (e.hasOwnProperty(n) && o[n]) {
                            if ("string" != typeof e[n])
                                throw new Error("Browser version in the minVersion map should be a string: " + n + ": " + String(e));
                            return l([i, e[n]]) < 0
                        }
                    return t
                }
                return a.test = function(e) {
                    for (var t = 0; t < e.length; ++t) {
                        var r = e[t];
                        if ("string" == typeof r && r in a)
                            return !0
                    }
                    return !1
                }
                ,
                a.isUnsupportedBrowser = i,
                a.compareVersions = l,
                a.check = function(e, t, r) {
                    return !i(e, t, r)
                }
                ,
                a._detect = s,
                a
            }
            ,
            e.exports ? e.exports = r() : t.bowser = r()
        })
          , ce = navigator.userAgent.toLowerCase()
          , r = t._detect(ce)
          , n = ce.match(/applewebkit\/(\d+(:?\.\d+)*)/)
          , t = t.compareVersions
          , ve = !!r.mac
          , Ee = !!r.android
          , Se = !!r.ios
          , i = !!r.mobile
          , _e = !!r.tablet
          , be = parseInt(r.version, 10)
          , we = r.version
          , n = n && n[1] || ""
          , S = !(!r.msie && !r.msedge)
          , xe = S && 11 === be
          , s = S && 10 === be
          , Ce = S && 9 === be
          , Te = !!r.firefox
          , Ae = !!r.msedge
          , Pe = !!r.chrome
          , Ie = !!r.safari
          , Ne = !(!r.webkit && !r.blink)
          , Oe = /electron/g.test(ce)
          , Le = Object.freeze({
            __proto__: null,
            compareVersions: t,
            isMacPlatform: ve,
            isAndroid: Ee,
            isIOS: Se,
            isMobile: i,
            isTablet: _e,
            version: be,
            fullVersion: we,
            webkitVersion: n,
            isIE: S,
            isIE11: xe,
            isIE10: s,
            isIE9: Ce,
            isFirefox: Te,
            isMSEdge: Ae,
            isChrome: Pe,
            isSafari: Ie,
            isWebKit: Ne,
            isElectron: Oe
        })
          , ke = (De.prototype.emit = function(e) {
            for (var t = [], r = 1; r < arguments.length; r++)
                t[r - 1] = arguments[r];
            var n = this.eventsListeners[e];
            if (n)
                for (var o = 0; n[o]; ) {
                    if (S)
                        try {
                            n[o].toString()
                        } catch (e) {
                            b.arraySplice.call(n, o, 1);
                            continue
                        }
                    n[o++].apply(this, t)
                }
        }
        ,
        De.prototype.off = function(e, t) {
            var r = this.eventsListeners[e];
            r && (this.eventsListeners[e] = b.arrayFilter.call(r, function(e) {
                return e !== t
            }))
        }
        ,
        De.prototype.on = function(e, t) {
            return this.eventsListeners[e] = this.eventsListeners[e] || [],
            -1 === this.eventsListeners[e].indexOf(t) && this.eventsListeners[e].push(t),
            t
        }
        ,
        De);
        function De() {
            this.eventsListeners = b.objectCreate(null)
        }
        var a = {
            storedAttrPostfix: "-hammerhead-stored-value",
            hoverPseudoClass: "data-hammerhead-hovered",
            focusPseudoClass: "data-hammerhead-focused",
            uploadInfoHiddenInputName: "hammerhead|upload-info-hidden-input-name"
        }
          , r = "-hammerhead-shadow-ui"
          , Me = {
            postfix: r,
            charset: "charset" + r,
            script: "script" + r,
            selfRemovingScript: "self-removing-script" + r,
            uiStylesheet: "ui-stylesheet" + r
        };
        function Re(e) {
            return "string" == typeof e ? e.replace(/(^\s+)|(\s+$)/g, "") : e
        }
        var je, He = /^\s*([\w-]+?:)?(?:\/\/(?:([^/]+)@)?(([^/%?;#: ]*)(?::(\d+))?))?(.*?)\s*$/, Be = /^([\w-]+?:)(\/\/|[^\\/]|$)/, Fe = /(\?.+|#[^#]*)$/, Ue = /^\/([^/]+?)\/([\S\s]+)$/, Ve = /^https?:/, Ge = /^file:/i, We = /^http(s)?:\/\//, qe = /^s\*/, Ke = /^(.+?[;,]\s*(?:url\s*=\s*)?(['"])?)(.+?)?(\2)?$/i, ze = /^(?:https?|file):/i, Xe = /^#/, $e = "!", Ye = "*", Qe = /\/$/, Je = "about:blank", ce = "about:error", Ze = [Je, ce], et = "80", tt = "443", rt = ((t = je = je || {})[t.include = 0] = "include",
        t[t.sameOrigin = 1] = "sameOrigin",
        t[t.omit = 2] = "omit",
        t[t.unknown = 3] = "unknown",
        {
            protocol: "about:",
            host: "",
            hostname: "",
            port: "",
            partAfterHost: ""
        }), nt = [{
            name: "isIframe",
            flag: "i"
        }, {
            name: "isForm",
            flag: "f"
        }, {
            name: "isScript",
            flag: "s"
        }, {
            name: "isEventSource",
            flag: "e"
        }, {
            name: "isHtmlImport",
            flag: "h"
        }, {
            name: "isWebSocket",
            flag: "w"
        }, {
            name: "isServiceWorker",
            flag: "c"
        }, {
            name: "isAjax",
            flag: "a"
        }, {
            name: "isObject",
            flag: "o"
        }];
        function ot(e) {
            var t = {};
            if (!e)
                return t;
            for (var r = 0, n = nt; r < n.length; r++) {
                var o = n[r]
                  , i = o.name
                  , o = o.flag;
                -1 < e.indexOf(o) && (t[i] = !0)
            }
            return t
        }
        function it(e) {
            if (!e)
                return null;
            for (var t = "", r = 0, n = nt; r < n.length; r++) {
                var o = n[r]
                  , i = o.name
                  , o = o.flag;
                e[i] && (t += o)
            }
            return t || null
        }
        function st(e) {
            return e ? qe.test(e) ? e.replace(qe, "https://") : "http://" + e : "null"
        }
        function at(e, t) {
            if ((e = e.replace(/^www./i, "")) === (t = t.replace(/^www./i, "")))
                return !0;
            var r = t.lastIndexOf(e);
            return "." === t[r - 1] && t.length === r + e.length
        }
        function lt(e, t) {
            if (!t)
                return !0;
            t = ft(t);
            if (!t.host)
                return !0;
            var r = ft(e)
              , e = ht(e);
            if (t.host === r.host && t.protocol === r.protocol)
                return !0;
            e = e ? e.destResourceInfo : r;
            if (!e)
                return !1;
            var r = !t.protocol || t.protocol === e.protocol
              , n = !e.port && !t.port || e.port && e.port.toString() === t.port;
            return r && !!n && e.hostname === t.hostname
        }
        function ct(e) {
            return null === e && /iPad|iPhone/i.test(window.navigator.userAgent) ? "" : String(e).replace(/[\n\t]/g, "")
        }
        function pt(e, t) {
            var r = [t.sessionId]
              , r = (t.windowId && r.push(t.windowId),
            [r.join(Ye)])
              , n = (t.resourceType && r.push(t.resourceType),
            t.charset && r.push(t.charset.toLowerCase()),
            "number" == typeof t.credentials && r.push(t.credentials.toString()),
            t.reqOrigin && r.push(encodeURIComponent("null" === (n = t.reqOrigin) ? "" : n.replace(We, function(e, t) {
                return t ? "s*" : ""
            }))),
            r.join($e));
            return (t.proxyProtocol || "http:") + "//" + t.proxyHostname + ":" + t.proxyPort + "/" + n + "/" + ((r = ft(r = e)).protocol = r.protocol && r.protocol.toLowerCase(),
            r.host = r.host && r.host.toLowerCase(),
            yt(r))
        }
        function ut(e) {
            return "file:" === e.protocol ? "null" : yt({
                protocol: e.protocol,
                host: e.host,
                hostname: e.hostname,
                port: String(e.port || "")
            })
        }
        function ht(e) {
            e = ft(e);
            if (!e.partAfterHost)
                return null;
            var t = e.partAfterHost.match(Ue);
            if (!t)
                return null;
            var r = function(e) {
                var t = (e = e.split($e))[0]
                  , r = e[1]
                  , e = e.slice(2);
                if (!t)
                    return null;
                var n = (t = t.split(Ye))[0]
                  , t = t[1]
                  , n = {
                    sessionId: n,
                    resourceType: r || null
                };
                return t && (n.windowId = t),
                r && e.length && ((t = ot(r)).isScript || t.isServiceWorker ? n.charset = e[0] : t.isWebSocket || t.isIframe && e[0] ? n.reqOrigin = decodeURIComponent(st(e[0])) : t.isAjax && (n.credentials = parseInt(e[0]),
                2 === e.length && (n.reqOrigin = decodeURIComponent(st(e[1]))))),
                n
            }(t[1]);
            if (!r)
                return null;
            var t = t[2]
              , n = t.replace(/#[\S\s]*$/, "");
            return _t(n) || ze.test(t) ? (n = _t(n) ? rt : ft(t = Ct(t)),
            {
                destUrl: t,
                destResourceInfo: n,
                partAfterHost: e.partAfterHost,
                proxy: {
                    hostname: e.hostname || "",
                    port: e.port || ""
                },
                sessionId: r.sessionId,
                resourceType: r.resourceType,
                charset: r.charset,
                reqOrigin: r.reqOrigin,
                windowId: r.windowId,
                credentials: r.credentials
            }) : null
        }
        function dt(e) {
            return e.replace(Fe, "")
        }
        function ft(e) {
            if (!(e = Et(e)))
                return {};
            e = e.match(He);
            return e ? {
                protocol: e[1],
                auth: e[2],
                host: e[3],
                hostname: e[4],
                port: e[5],
                partAfterHost: e[6]
            } : {}
        }
        function mt(e) {
            if (e = Re(e || ""),
            Xe.test(e))
                return !1;
            e = e.match(Be);
            return !e || ze.test(e[0])
        }
        function gt(e, t) {
            return t = t || pt,
            mt(e) && (t = ht(t(e))) ? yt(t.destResourceInfo) : e
        }
        function yt(e) {
            if (!("file:" === e.protocol || "about:" === e.protocol || e.host || e.hostname && e.port))
                return e.partAfterHost || "";
            var t = e.protocol || "";
            return "about:" !== e.protocol && (t += "//"),
            e.auth && (t += e.auth + "@"),
            e.host ? t += e.host : e.hostname && (t += e.hostname,
            e.port && (t += ":" + e.port)),
            e.partAfterHost && (t += e.partAfterHost),
            t
        }
        function vt(e, t) {
            return void 0 === t && (t = ""),
            e.match(Ge) || t.match(Ge) ? e.replace(/^(file:)?\/+(\/\/\/.*$)/i, "$1$2").replace(/^(file:)?\/*([A-Za-z]):/i, "$1///$2:") : e.replace(/^(https?:)?\/+(\/\/.*$)/i, "$1$2")
        }
        function Et(e) {
            return vt(ct(e))
        }
        function St(e, t) {
            if (!wt(t))
                return t;
            var r = Qe.test(e)
              , n = Qe.test(t);
            return r && !n ? t += "/" : e && !r && n && (t = t.replace(Qe, "")),
            t
        }
        function _t(e) {
            return -1 !== Ze.indexOf(e)
        }
        function bt(e) {
            e = ft(e);
            return "file:" !== e.protocol && !e.host
        }
        function wt(e) {
            var e = ft(e);
            return "file:" === e.protocol || "about:" === e.protocol || !!e.hostname && (!e.port || (e = e.port,
            0 < (e = parseInt(e, 10)) && e <= 65535))
        }
        function xt(e) {
            var t = ft(e);
            return !t.partAfterHost && t.protocol && Ve.test(t.protocol) ? e + "/" : e
        }
        function Ct(e) {
            var t = ft(e);
            return "https:" === t.protocol && t.port === tt || "http:" === t.protocol && t.port === et ? (t.host = t.hostname,
            t.port = "",
            yt(t)) : e
        }
        function Tt(e) {
            return e = xt(e = Ct(e))
        }
        function At(e, t) {
            var r = e.match(Ke);
            return r && r[3] ? r[1] + t(r[3]) + (r[4] || "") : e
        }
        window.overrideGetProxyUrl = function(e) {
            pt = e(pt)
        }
        ,
        window.overrideParseProxyUrl = function(e) {
            ht = e(ht)
        }
        ;
        var Pt = Object.freeze({
            __proto__: null,
            SUPPORTED_PROTOCOL_RE: ze,
            HASH_RE: Xe,
            REQUEST_DESCRIPTOR_VALUES_SEPARATOR: $e,
            REQUEST_DESCRIPTOR_SESSION_INFO_VALUES_SEPARATOR: Ye,
            TRAILING_SLASH_RE: Qe,
            SPECIAL_BLANK_PAGE: Je,
            SPECIAL_ERROR_PAGE: ce,
            SPECIAL_PAGES: Ze,
            HTTP_DEFAULT_PORT: et,
            HTTPS_DEFAULT_PORT: tt,
            get Credentials() {
                return je
            },
            parseResourceType: ot,
            getResourceTypeString: it,
            restoreShortOrigin: st,
            isSubDomain: at,
            sameOriginCheck: lt,
            getURLString: ct,
            getProxyUrl: pt,
            getDomain: ut,
            parseProxyUrl: ht,
            getPathname: dt,
            parseUrl: ft,
            isSupportedProtocol: mt,
            resolveUrlAsDest: gt,
            formatUrl: yt,
            correctMultipleSlashes: vt,
            processSpecialChars: Et,
            ensureTrailingSlash: St,
            isSpecialPage: _t,
            isRelativeUrl: bt,
            isValidUrl: wt,
            ensureOriginTrailingSlash: xt,
            omitDefaultPort: Ct,
            prepareUrl: Tt,
            updateScriptImportUrls: function(e, t, r, n) {
                return t = new RegExp("(" + t.protocol + "//" + t.hostname + ":(?:" + t.port + "|" + t.crossDomainPort + ")/)[^/" + $e + "]+","g"),
                e.replace(t, "$1" + r + (n ? Ye + n : ""))
            },
            processMetaRefreshContent: At
        })
          , It = "hammerhead|document-url-resolver"
          , Nt = {
            _createResolver: function(e) {
                var e = b.createHTMLDocument.call(e.implementation, "title")
                  , t = b.createElement.call(e, "a")
                  , r = b.createElement.call(e, "base");
                return b.appendChild.call(e.body, t),
                b.appendChild.call(e.head, r),
                e
            },
            _getResolver: function(e) {
                return e[It] || b.objectDefineProperty(e, It, {
                    value: this._createResolver(e),
                    writable: !0
                }),
                e[It]
            },
            _isNestedIframeWithoutSrc: function(e) {
                if (!e || !e.parent || e.parent === e || e.parent.parent === e.parent)
                    return !1;
                e = hn(window);
                return !!e && Dn(e)
            },
            init: function(e) {
                this.updateBase(Rt(), e)
            },
            getResolverElement: function(e) {
                return b.nodeFirstChildGetter.call(this._getResolver(e).body)
            },
            resolve: function(e, t) {
                var r = this.getResolverElement(t)
                  , n = null;
                if (null === e)
                    b.removeAttribute.call(r, "href");
                else {
                    b.anchorHrefSetter.call(r, e);
                    n = b.anchorHrefGetter.call(r);
                    if (e && (!n || "/" === n.charAt(0)) && this._isNestedIframeWithoutSrc(t.defaultView))
                        return this.resolve(e, window.rammerheadParent.document)
                }
                return St(e, n)
            },
            updateBase: function(e, t) {
                var r = this._getResolver(t)
                  , r = b.elementGetElementsByTagName.call(r.head, "base")[0]
                  , n = ft(e = e || Rt())
                  , o = "file:" !== n.protocol && "about:" !== n.protocol && !n.host
                  , n = /^\/\//.test(e) && !!n.host;
                (o || n) && (o = Rt(),
                this.updateBase(o, t),
                e = this.resolve(e, t)),
                b.setAttribute.call(r, "href", e)
            },
            getBaseUrl: function(e) {
                e = b.elementGetElementsByTagName.call(this._getResolver(e).head, "base")[0];
                return b.getAttribute.call(e, "href")
            },
            changeUrlPart: function(e, t, r, n) {
                n = this.getResolverElement(n);
                return b.anchorHrefSetter.call(n, e),
                t.call(n, r),
                b.anchorHrefGetter.call(n)
            },
            dispose: function(e) {
                e[It] = null
            }
        };
        function Ot() {
            this._settings = {
                isFirstPageLoad: !0,
                sessionId: "",
                forceProxySrcForImage: !1,
                crossDomainProxyPort: "",
                referer: "",
                serviceMsgUrl: "",
                transportWorkerUrl: "",
                iframeTaskScriptTemplate: "",
                cookie: "",
                allowMultipleWindows: !1,
                isRecordMode: !1,
                windowId: ""
            }
        }
        Ot.prototype.set = function(e) {
            this._settings = e
        }
        ,
        Ot.prototype.get = function() {
            return this._settings
        }
        ;
        var m = new Ot
          , Lt = null;
        function kt() {
            if (Lt)
                return Lt;
            var e = hn(pe.global);
            return e && Dn(e) ? m.get().referer : pe.global.location.toString()
        }
        function Dt(e, t) {
            return lt(e, t = t && Mt(t))
        }
        function Mt(e, t) {
            var r, n = ct(e);
            return n = n && 0 === n.indexOf("//") ? (r = Ht().protocol) + vt(n, r) : vt(n),
            pe.isInWorker ? "blob:" !== self.location.protocol ? new b.URL(n,Rt()).href : e : Nt.resolve(n, t || document)
        }
        var Rt = function() {
            var e = kt()
              , t = ht(e);
            return t ? t.destUrl : e
        };
        function jt() {
            var e = ht(kt());
            return null != e && e.reqOrigin ? e.reqOrigin + "/" : ""
        }
        function Ht() {
            var e, t, r, n = Rt();
            return pe.isInWorker ? (r = n,
            {
                protocol: (r = new b.URL(r)).protocol,
                port: r.port,
                hostname: r.hostname,
                host: r.host,
                pathname: r.pathname,
                hash: r.hash,
                search: r.search
            }) : (r = n,
            n = Nt.getResolverElement(document),
            r = ft(r).port,
            b.anchorHrefSetter.call(n, Rt()),
            e = b.anchorHostnameGetter.call(n),
            "/" !== (t = b.anchorPathnameGetter.call(n)).charAt(0) && (t = "/" + t),
            {
                protocol: b.anchorProtocolGetter.call(n),
                port: r ? b.anchorPortGetter.call(n) : "",
                hostname: e,
                host: r ? b.anchorHostGetter.call(n) : e,
                pathname: t,
                hash: n.hash,
                search: b.anchorSearchGetter.call(n)
            })
        }
        function Bt() {
            return ut(Ht())
        }
        var Ft = Object.freeze({
            __proto__: null,
            getLocation: kt,
            forceLocation: function(e) {
                Lt = e
            },
            sameOriginCheck: Dt,
            resolveUrl: Mt,
            get get() {
                return Rt
            },
            getReferrer: jt,
            overrideGet: function(e) {
                Rt = e
            },
            withHash: function(e) {
                return Rt().replace(/(#.*)$/, "") + e
            },
            getParsed: Ht,
            getOriginHeader: Bt
        })
          , Ut = /#[\S\s]*$/
          , Vt = /^wss?:/i
          , Gt = /\/[^/]*$/
          , Wt = function() {
            for (var e = pe.isInWorker ? {
                location: Jt(self.location.origin),
                parent: null
            } : window, t = e.location; !t.hostname; )
                t = (e = e.parent).location;
            return {
                hostname: t.hostname,
                port: t.port.toString(),
                protocol: t.protocol
            }
        }();
        var w = function(e, t) {
            e = ct(e);
            var r = t && t.resourceType
              , n = ot(r);
            if (!n.isWebSocket && !nr(e) && !or(e))
                return e;
            var o = Mt(e, t && t.doc);
            if (n.isWebSocket && !rr(o) || !wt(o))
                return e;
            var i = t && t.proxyHostname || Wt.hostname
              , s = t && t.proxyPort || Wt.port
              , a = t && t.proxyProtocol || Wt.protocol
              , l = n.isWebSocket ? a.replace("http", "ws") : a
              , c = t && t.sessionId || m.get().sessionId
              , p = t && t.windowId || m.get().windowId
              , u = t && t.credentials
              , h = t && t.charset
              , t = t && t.reqOrigin
              , d = Xt(s)
              , f = ht(o);
            if (!!f && f.proxy.hostname === i && (f.proxy.port === s || f.proxy.port === d)) {
                if (r && f.resourceType === r)
                    return o;
                d = yt(f.destResourceInfo);
                return w(d, {
                    proxyProtocol: l,
                    proxyHostname: i,
                    proxyPort: s,
                    sessionId: c,
                    resourceType: r,
                    charset: h,
                    reqOrigin: t,
                    credentials: u
                })
            }
            f = ft(o);
            return f.protocol ? (h = h || (((d = n).isScript || d.isServiceWorker) && self.document && document[_.documentCharset] || null),
            f.protocol === a && f.hostname === i && f.port === s && (d = Ht(),
            f.protocol = d.protocol,
            f.host = d.host,
            f.hostname = d.hostname,
            f.port = d.port || "",
            o = yt(f)),
            n.isWebSocket && (f.protocol = f.protocol.replace("ws", "http"),
            o = yt(f),
            t = t || Bt()),
            pt(o, {
                proxyProtocol: l,
                proxyHostname: i,
                proxyPort: s,
                sessionId: c,
                resourceType: r,
                charset: h,
                reqOrigin: t = n.isIframe && s === m.get().crossDomainProxyPort ? t || Bt() : t,
                windowId: p,
                credentials: u
            })) : e
        };
        function qt(e, t) {
            var r = t.rammerheadTop !== t
              , t = t.location.toString();
            return or(r ? t : (r = Qt(t)) && r.destUrl) && bt(e) ? "" : (e = Tt(e),
            w(e))
        }
        var Kt = function(e) {
            return w(e, {
                proxyPort: m.get().crossDomainProxyPort,
                resourceType: it({
                    isIframe: !0
                })
            })
        };
        function zt(e, t) {
            var r = Qt(e)
              , n = null;
            r && (e = r.destUrl,
            n = r.resourceType),
            n && ((r = ir(n)).isIframe = !1,
            n = sr(r));
            r = !Dt(kt(), e) ? m.get().crossDomainProxyPort : location.port.toString();
            return w(e, {
                windowId: t,
                proxyPort: r,
                resourceType: n
            })
        }
        function Xt(e) {
            return m.get().crossDomainProxyPort === e ? location.port.toString() : m.get().crossDomainProxyPort
        }
        var $t = function(e) {
            return gt(e, w)
        };
        function Yt(e) {
            return yt(e)
        }
        var Qt = function(e) {
            return ht(e)
        };
        function Jt(e) {
            return ft(e)
        }
        var Zt = function(e, t, r, n) {
            return w(e, {
                resourceType: t,
                charset: r,
                proxyPort: (n = void 0 === n ? !1 : n) ? m.get().crossDomainProxyPort : Wt.port
            })
        };
        function er() {
            return ut({
                protocol: location.protocol,
                hostname: location.hostname,
                port: m.get().crossDomainProxyPort
            })
        }
        function tr(e, t, r, n) {
            var o, i, s = ht(e);
            return s ? (o = s.sessionId,
            i = s.proxy,
            s = Nt.changeUrlPart(s.destUrl, t, r, document),
            w(s, {
                proxyHostname: i.hostname,
                proxyPort: i.port,
                sessionId: o,
                resourceType: n
            })) : e
        }
        function rr(e) {
            e = $t(e);
            return Vt.test(e)
        }
        function nr(e) {
            return mt(e)
        }
        function or(e) {
            return _t(e)
        }
        function ir(e) {
            return ot(e)
        }
        function sr(e) {
            return it(e)
        }
        function ar(e, t) {
            return w(e).replace(Ut, "") === w(t).replace(Ut, "")
        }
        function lr(e) {
            var t = Qt(e);
            return t ? t.destUrl : e
        }
        function cr(e) {
            if (!nr(e))
                return null;
            e = Jt($t(e));
            return e ? dt(e.partAfterHost).replace(Gt, "/") || "/" : null
        }
        function pr(e, t) {
            var r = !Dt(kt(), e)
              , t = {
                resourceType: it({
                    isAjax: !0
                }),
                credentials: t
            };
            return r && (t.proxyPort = m.get().crossDomainProxyPort,
            t.reqOrigin = Bt()),
            w(e, t)
        }
        var ur = Object.freeze({
            __proto__: null,
            DEFAULT_PROXY_SETTINGS: Wt,
            REQUEST_DESCRIPTOR_VALUES_SEPARATOR: $e,
            get getProxyUrl() {
                return w
            },
            overrideGetProxyUrl: function(e) {
                w = e
            },
            getNavigationUrl: qt,
            get getCrossDomainIframeProxyUrl() {
                return Kt
            },
            overrideGetCrossDomainIframeProxyUrl: function(e) {
                Kt = e
            },
            getPageProxyUrl: zt,
            getCrossDomainProxyPort: Xt,
            get resolveUrlAsDest() {
                return $t
            },
            overrideResolveUrlAsDest: function(e) {
                $t = e
            },
            formatUrl: Yt,
            get parseProxyUrl() {
                return Qt
            },
            overrideParseProxyUrl: function(e) {
                Qt = e
            },
            parseUrl: Jt,
            get convertToProxyUrl() {
                return Zt
            },
            getCrossDomainProxyOrigin: er,
            overrideConvertToProxyUrl: function(e) {
                Zt = e
            },
            changeDestUrlPart: tr,
            isValidWebSocketUrl: rr,
            isSubDomain: at,
            isSupportedProtocol: nr,
            isSpecialPage: or,
            parseResourceType: ir,
            stringifyResourceType: sr,
            isChangedOnlyHash: ar,
            getDestinationUrl: lr,
            getScope: cr,
            getAjaxProxyUrl: pr
        })
          , hr = !1
          , dr = !1
          , fr = !1
          , mr = !1
          , gr = !1
          , yr = !1
          , vr = !1
          , Er = !1
          , Sr = (b.createElement && (n = b.createElement.call(document, "form"),
        s = b.getElementsByName.call(document, ""),
        hr = b.formActionGetter.call(n) === window.location.toString(),
        dr = b.objectToString.call(window) === b.objectToString.call(Window.prototype),
        fr = "ontouchstart"in window,
        mr = S && (0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints),
        gr = (i || _e) && fr,
        yr = !!window.DataTransfer,
        vr = !!b.objectGetOwnPropertyDescriptor.call(window.Object, NamedNodeMap.prototype, "getNamedItem"),
        Er = b.objectGetPrototypeOf.call(window.Object, s) === b.HTMLCollection.prototype),
        Object.freeze({
            __proto__: null,
            get emptyActionAttrFallbacksToTheLocation() {
                return hr
            },
            get instanceAndPrototypeToStringAreEqual() {
                return dr
            },
            get hasTouchEvents() {
                return fr
            },
            get hasTouchPoints() {
                return mr
            },
            get isTouchDevice() {
                return gr
            },
            get hasDataTransfer() {
                return yr
            },
            get attrGetNamedItemIsNotEnumerable() {
                return vr
            },
            get getElementsByNameReturnsHTMLCollection() {
                return Er
            }
        }))
          , _r = 4;
        function br(e) {
            e = e || "";
            e = parseInt(e.replace("px", ""), 10);
            return isNaN(e) ? 0 : e
        }
        function l(e, t, r, n) {
            e = Cr(e = e.documentElement || e, r, n);
            return e && e[t]
        }
        function wr(e, t, r) {
            (e = e.documentElement || e).style[t] = r
        }
        function xr(e) {
            return {
                bottom: br(l(e, "borderBottomWidth")),
                left: br(l(e, "borderLeftWidth")),
                right: br(l(e, "borderRightWidth")),
                top: br(l(e, "borderTopWidth"))
            }
        }
        function Cr(e, t, r) {
            return t = t || document,
            r = r || window,
            (t.defaultView || r).getComputedStyle(e, null)
        }
        function Tr(e) {
            return {
                bottom: br(l(e, "paddingBottom")),
                left: br(l(e, "paddingLeft")),
                right: br(l(e, "paddingRight")),
                top: br(l(e, "paddingTop"))
            }
        }
        function Ar(e) {
            var t = Vn(e)
              , r = window
              , n = (t && Nn(e) && ((n = pn(e)) && (r = b.contentWindowGetter.call(n))),
            t ? r : e);
            return {
                left: kr(n),
                top: Dr(n)
            }
        }
        function Pr(e) {
            if (!e)
                return null;
            if (co(e))
                return e.document.documentElement.clientHeight;
            var t, r, n;
            if (po(e))
                return n = "offsetHeight",
                (t = e.documentElement)[o = "clientHeight"] >= t[r = "scrollHeight"] ? t[o] : Math.max(e.body[r], t[r], e.body[n], t[n]);
            var o = e.offsetHeight;
            return (o -= br(l(e, "paddingTop"))) - br(l(e, "paddingBottom")) - br(l(e, "borderTopWidth")) - br(l(e, "borderBottomWidth"))
        }
        function Ir(e) {
            if (!e)
                return null;
            if (co(e))
                return e.document.documentElement.clientWidth;
            if (po(e))
                return e.documentElement.clientWidth;
            var t = e.offsetWidth;
            return (t -= br(l(e, "borderLeftWidth"))) - br(l(e, "borderRightWidth"))
        }
        function Nr(e) {
            var t = Or(e)
              , r = Tr(e)
              , r = e.scrollHeight - (r.top + r.bottom)
              , n = gn(e).length;
            return 1 === t ? Pr(e) : S && n < t ? Math.round(r / n) : Math.round(r / Math.max(n, t))
        }
        function Or(e) {
            if (Ie && fr || Ee)
                return 1;
            var t = b.getAttribute.call(e, "size")
              , e = b.getAttribute.call(e, "multiple")
              , r = t ? parseInt(t, 10) : 1;
            return r = e && (!t || r < 1) ? _r : r
        }
        function Lr(e) {
            var t = mn(e)
              , r = Cn(e);
            return Zn(t) && 1 < Or(t) && ("option" === r || "optgroup" === r) && (!Te || e.label)
        }
        function kr(e) {
            return e ? co(e) ? e.pageXOffset : po(e) ? e.defaultView.pageXOffset : e.scrollLeft : null
        }
        function Dr(e) {
            return e ? co(e) ? e.pageYOffset : po(e) ? e.defaultView.pageYOffset : e.scrollTop : null
        }
        function Mr(e, t) {
            var r, n;
            e && (co(e) || po(e) ? (r = En(e).defaultView,
            n = Dr(e),
            b.scrollTo.call(r, t, n)) : e.scrollLeft = t)
        }
        function Rr(e, t) {
            var r, n;
            e && (co(e) || po(e) ? (r = En(e).defaultView,
            n = kr(e),
            b.scrollTo.call(r, n, t)) : e.scrollTop = t)
        }
        function jr(e) {
            if (e) {
                for (var t = e.offsetParent || document.body; t && !/^(?:body|html)$/i.test(t.nodeName) && "static" === l(t, "position"); )
                    t = t.offsetParent;
                return t
            }
        }
        function Hr(e) {
            if (!e || co(e) || po(e))
                return null;
            var t = e.getBoundingClientRect()
              , r = e.ownerDocument
              , n = r.documentElement;
            if (!n.contains(e) || e === n)
                return {
                    top: t.top,
                    left: t.left
                };
            var o = r.defaultView
              , i = n.clientTop || r.body.clientTop || 0
              , s = n.clientLeft || r.body.clientLeft || 0
              , a = o.pageYOffset || n.scrollTop || r.body.scrollTop
              , o = o.pageXOffset || n.scrollLeft || r.body.scrollLeft;
            return {
                top: (t = e.getBoundingClientRect()).top + a - i,
                left: t.left + o - s
            }
        }
        function Br(e, t) {
            if (!In(e, t))
                return !1;
            for (; e; ) {
                if ("none" === l(e, "display", t) || "hidden" === l(e, "visibility", t))
                    return !1;
                e = Pn(e)
            }
            return !0
        }
        function Fr(e) {
            e = pn(e);
            return e && !Br(e, En(e))
        }
        var Ur = Object.freeze({
            __proto__: null,
            get: l,
            set: wr,
            getBordersWidth: xr,
            getComputedStyle: Cr,
            getElementMargin: function(e) {
                return {
                    bottom: br(l(e, "marginBottom")),
                    left: br(l(e, "marginLeft")),
                    right: br(l(e, "marginRight")),
                    top: br(l(e, "marginTop"))
                }
            },
            getElementPadding: Tr,
            getElementScroll: Ar,
            getWidth: function(e) {
                if (!e)
                    return null;
                if (co(e))
                    return e.document.documentElement.clientWidth;
                var t, r, n;
                if (po(e))
                    return n = "offsetWidth",
                    (t = e.documentElement)[o = "clientWidth"] >= t[r = "scrollWidth"] ? t[o] : Math.max(e.body[r], t[r], e.body[n], t[n]);
                var o = e.offsetWidth;
                return (o -= br(l(e, "paddingLeft"))) - br(l(e, "paddingRight")) - br(l(e, "borderLeftWidth")) - br(l(e, "borderRightWidth"))
            },
            getHeight: Pr,
            getInnerWidth: Ir,
            getInnerHeight: function(e) {
                if (!e)
                    return null;
                if (co(e))
                    return e.document.documentElement.clientHeight;
                if (po(e))
                    return e.documentElement.clientHeight;
                var t = e.offsetHeight;
                return (t -= br(l(e, "borderTopWidth"))) - br(l(e, "borderBottomWidth"))
            },
            getOptionHeight: Nr,
            getSelectElementSize: Or,
            isVisibleChild: Lr,
            getScrollLeft: kr,
            getScrollTop: Dr,
            setScrollLeft: Mr,
            setScrollTop: Rr,
            getOffsetParent: jr,
            getOffset: Hr,
            isElementVisible: Br,
            isElementInInvisibleIframe: Fr
        });
        function Vr(e) {
            return xn(e) ? b.elementQuerySelectorAll : To(e) || Ao(e) ? b.documentFragmentQuerySelectorAll : b.querySelectorAll
        }
        var Gr = 0
          , Wr = ["[object HTMLMapElement]", "[object HTMLAreaElement]"]
          , Ce = "undefined" == typeof window
          , qr = Ce ? "" : c(window)
          , Kr = /^\[object .*?Document]$/i
          , zr = /^\[object .*?ProcessingInstruction]$/i
          , Xr = /^\[object SVG\w+?Element]$/i
          , $r = /^\[object HTML.*?Element]$/i
          , Yr = /^\[object ArrayBuffer]$/i
          , Qr = /^\[object DataView]$/i
          , Jr = Ce ? "" : c(b.createElement.call(document, "td"))
          , Zr = Ce ? -1 : Node.ELEMENT_NODE
          , en = /^(select|option|applet|area|audio|canvas|datalist|keygen|map|meter|object|progress|source|track|video|img)$/
          , tn = /^(input|textarea|button)$/
          , rn = /^(script|style)$/i
          , nn = /^(email|number|password|search|tel|text|url)$/
          , on = /^(number|email)$/
          , sn = /^(color|date|datetime-local|month|week)$/;
        function an(e) {
            return e.offsetWidth <= 0 && e.offsetHeight <= 0
        }
        function c(e) {
            return dr ? e && "object" == typeof e ? b.objectToString.call(b.objectGetPrototypeOf(e)) : "" : b.objectToString.call(e)
        }
        function ln(e) {
            for (var e = e || document, t = b.documentActiveElementGetter.call(e), r = xn(t) ? t : e.body; r && r.shadowRoot; ) {
                var n = r.shadowRoot.activeElement;
                if (!n)
                    break;
                r = n
            }
            return r
        }
        function cn(e, t) {
            return gn(e).indexOf(t)
        }
        function pn(e) {
            return hn(e[_.processedContext])
        }
        function un(e) {
            var t = null;
            try {
                t = b.contentDocumentGetter.call(e).location.href
            } catch (e) {
                t = null
            }
            var e = b.getAttribute.call(e, "src" + a.storedAttrPostfix) || b.getAttribute.call(e, "src") || b.iframeSrcGetter.call(e)
              , r = t && nr(t) && Qt(t)
              , n = e && nr(e) && Qt(e);
            return {
                documentLocation: r ? r.destUrl : t,
                srcLocation: n ? n.destUrl : e
            }
        }
        function hn(e) {
            try {
                return e.frameElement
            } catch (e) {
                return null
            }
        }
        function dn(e) {
            var t = Ho(e, "map")
              , t = '[usemap="#' + b.getAttribute.call(t, "name") + '"]';
            return b.querySelector.call(En(e), t)
        }
        function fn() {
            var e, t;
            return Gr || ((e = b.createElement.call(document, "div")).style.height = "100px",
            e.style.overflow = "scroll",
            e.style.position = "absolute",
            e.style.top = "-9999px",
            e.style.width = "100px",
            b.appendChild.call(document.body, e),
            t = e.offsetWidth - e.clientWidth,
            Gr = t,
            b.nodeParentNodeGetter.call(e).removeChild(e)),
            Gr
        }
        function mn(e) {
            return Ho(b.nodeParentNodeGetter.call(e), "select")
        }
        function gn(e) {
            for (var t = b.elementQuerySelectorAll.call(e, "optgroup, option"), r = [], n = b.nodeListLengthGetter.call(t), o = 0; o < n; o++) {
                var i = t[o];
                (!Te || ("optgroup" !== Cn(i) || i.label)) && r.push(i)
            }
            return r
        }
        function yn(e) {
            var t, r = e, n = e.rammerheadParent;
            if (r === e.rammerheadTop)
                return r;
            for (; n; )
                bn(e, n) || ((t = hn(n)) && Dn(t) || (r = n)),
                n = n !== e.rammerheadTop ? n.parent : null;
            return r
        }
        function vn(e, t, r) {
            var n = Vr(e).call(e, t);
            if (r)
                for (var o = b.nodeListLengthGetter.call(n), i = 0; i < o; i++)
                    r(n[i]);
            return n
        }
        function En(e) {
            if (e.documentElement)
                return e;
            if (e.ownerDocument && e.ownerDocument.defaultView)
                return e.ownerDocument;
            e = bo(e) && b.nodeParentNodeGetter.call(e);
            return e ? En(e) : document
        }
        function Sn(e) {
            var t, r = null;
            return !!(r = wo(e) ? e.parentElement || b.nodeParentNodeGetter.call(e) : e) && (t = r.isContentEditable && !((t = Cn(t = r)) && (en.test(t) || tn.test(t))),
            io(r) && (t || "on" === En(e).designMode))
        }
        function _n(e, t) {
            e = un(e);
            if (!t && null === e.documentLocation)
                return !0;
            t = t ? e.srcLocation : e.documentLocation;
            return !(!t || !nr(t)) && !Dt(location.toString(), t)
        }
        function bn(e, t) {
            try {
                if (e === t)
                    return !1;
                var r = e.location.toString()
                  , n = t.location.toString();
                return nr(r) && nr(n) ? !(Dt(r, n) && !!(()=>{
                    try {
                        return e["%is-hammerhead%"]
                    } catch (e) {
                        return !0
                    }
                }
                )() == !!(()=>{
                    try {
                        return t["%is-hammerhead%"]
                    } catch (e) {
                        return !0
                    }
                }
                )()) : !1
            } catch (e) {
                return !0
            }
        }
        function wn(e) {
            return e !== e.rammerheadTop
        }
        function xn(e) {
            return e instanceof b.elementClass || e && $r.test(c(e)) && bo(e) && e.tagName
        }
        function Cn(e) {
            return e && "string" == typeof e.tagName ? e.tagName.toLowerCase() : ""
        }
        var Tn = "hammerhead|element|shadow-root-parent";
        function An(e) {
            for (var t = b.nodeParentNodeGetter.call(e); t && t.nodeType !== Node.DOCUMENT_FRAGMENT_NODE; )
                t = b.nodeParentNodeGetter.call(t);
            return t && t[Tn]
        }
        function Pn(e) {
            e = b.nodeParentNodeGetter.call(e);
            return e && e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && e[Tn] ? e[Tn] : e
        }
        function In(e, t) {
            t = t || document;
            if (!t.documentElement)
                return !1;
            if (t.documentElement.contains(e))
                return !0;
            t = An(e);
            return !!t && In(t)
        }
        function Nn(e, t) {
            t = t || En(e);
            return window.document !== t
        }
        function On(e) {
            return e === a.focusPseudoClass || e === a.hoverPseudoClass || -1 !== e.indexOf(a.storedAttrPostfix)
        }
        function Ln(e) {
            return "[object HTMLIFrameElement]" === c(e)
        }
        function kn(e) {
            return "[object HTMLFrameElement]" === c(e)
        }
        function Dn(e) {
            var t = un(e)
              , r = t.srcLocation
              , t = t.documentLocation;
            if (null === t)
                return !1;
            if (b.contentWindowGetter.call(e)[_.documentWasCleaned])
                return !0;
            t = nr(t);
            return !t && !b.getAttribute.call(e, "src") || (!r || !nr(r)) && !t
        }
        function Mn(e) {
            return b.iframeSrcdocGetter && b.hasAttribute.call(e, "srcdoc")
        }
        function Rn(e) {
            return "[object HTMLImageElement]" === c(e)
        }
        function jn(e) {
            return "[object HTMLInputElement]" === c(e)
        }
        function Hn(e) {
            return "[object HTMLTitleElement]" === c(e)
        }
        function Bn(e) {
            return "[object HTMLButtonElement]" === c(e)
        }
        function Fn(e) {
            return "[object HTMLFieldSetElement]" === c(e)
        }
        function Un(e) {
            return "[object HTMLOptGroupElement]" === c(e)
        }
        function Vn(e) {
            return "[object HTMLHtmlElement]" === c(e)
        }
        function Gn(e) {
            return "[object HTMLBodyElement]" === c(e)
        }
        function Wn(e) {
            var e = b.nodeParentNodeGetter.call(e);
            return "html" === Cn(e) && "#document" === (null == (e = b.nodeParentNodeGetter.call(e)) ? void 0 : e.nodeName)
        }
        function qn(e) {
            e = c(e);
            return "[object HTMLHeadElement]" === e || "[object HTMLBodyElement]" === e
        }
        function Kn(e) {
            e = c(e);
            return "[object HTMLHeadElement]" === e || "[object HTMLBodyElement]" === e || "[object HTMLHtmlElement]" === e
        }
        function zn(e) {
            return "[object HTMLBaseElement]" === c(e)
        }
        function Xn(e) {
            return "[object HTMLScriptElement]" === c(e)
        }
        function $n(e) {
            return "[object HTMLStyleElement]" === c(e)
        }
        function Yn(e) {
            return "[object HTMLLabelElement]" === c(e)
        }
        function Qn(e) {
            return "[object HTMLTextAreaElement]" === c(e)
        }
        function Jn(e) {
            return "[object HTMLOptionElement]" === c(e)
        }
        function Zn(e) {
            return "[object HTMLSelectElement]" === c(e)
        }
        function eo(e) {
            return "[object HTMLFormElement]" === c(e)
        }
        function to(e) {
            return jn(e) && "file" === e.type.toLowerCase()
        }
        function ro(e) {
            return jn(e) && sn.test(e.type.toLowerCase())
        }
        function no(e) {
            return Gn(e) && Wn(e) && b.htmlCollectionLengthGetter.call(b.elementChildrenGetter.call(e))
        }
        function oo(e) {
            return -1 !== Wr.indexOf(c(e))
        }
        function io(e) {
            return !(xo(e) || Co(e) || rn.test(e.nodeName))
        }
        function so(e) {
            e = b.getAttribute.call(e, "tabIndex"),
            e = parseInt(e, 10);
            return isNaN(e) ? null : e
        }
        function ao(e) {
            return jo(e, ":disabled")
        }
        function lo(e) {
            if (!e)
                return !1;
            var t = so(e)
              , r = ao(e)
              , n = "hidden" === l(e, "visibility")
              , o = "none" === l(e, "display")
              , i = Ne ? an(e) && !Jn(e) : an(e);
            return !(r || n || o || i) && ((!Jn(e) || !S) && (Po(e) ? null !== t || jo(e, "a[href]") : !(!No(e) || !S) || (jo(e, 'input, select, textarea, button, body, iframe, [contenteditable="true"], [contenteditable=""], [tabIndex]') || null !== t)))
        }
        function x(e) {
            return !!e[_.shadowUIElement]
        }
        function co(t) {
            try {
                if (!(t = (S || Ae) && t && t === t.window ? t.window : t) || !t.toString || qr !== c(t))
                    return !1
            } catch (e) {
                try {
                    return !!t.rammerheadTop
                } catch (e) {
                    return !1
                }
            }
            try {
                b.winLocalStorageGetter.call(t)
            } catch (e) {
                return !1
            }
            return !0
        }
        function po(e) {
            if (e instanceof b.documentClass)
                return !0;
            try {
                return e && Kr.test(c(e))
            } catch (e) {
                return !1
            }
        }
        function uo(e) {
            return e && "[object Blob]" === c(e)
        }
        function ho(e) {
            if (e)
                if (S || Ie || Pe) {
                    var t = e;
                    var r = null;
                    try {
                        r = t.__proto__
                    } catch (e) {
                        var n = Ie || Pe;
                        return t.replace && (n || !!t.assign)
                    }
                    return !!r && ("[object LocationPrototype]" === (n = b.objectToString.call(r)) || "[object Location]" === n);
                    return
                } else
                    return e instanceof b.locationClass || "[object Location]" === b.objectToString.call(e);
            return !1
        }
        function fo(e) {
            return e instanceof b.svgElementClass || e && Xr.test(c(e))
        }
        function mo(e) {
            return !!Ho(e, "svg")
        }
        function go(e) {
            return !!(b.Headers && e instanceof b.Headers) || e && "[object Headers]" === c(e)
        }
        function yo(e) {
            return !!(b.Request && e instanceof b.Request) || e && "[object Request]" === c(e)
        }
        function vo(e) {
            return e.readOnly || "readonly" === e.getAttribute("readonly")
        }
        function Eo(e) {
            var t = e.getAttribute("type");
            return jn(e) && t ? nn.test(t) : nn.test(e.type)
        }
        function So(e) {
            return Eo(e) || Qn(e)
        }
        function _o(e) {
            return So(e) && !vo(e)
        }
        function bo(e) {
            return e && e.nodeType === Zr
        }
        function wo(e) {
            return "[object Text]" === c(e)
        }
        function xo(e) {
            return zr.test(c(e))
        }
        function Co(e) {
            return "[object Comment]" === c(e)
        }
        function To(e) {
            return "[object DocumentFragment]" === c(e)
        }
        function Ao(e) {
            return "[object ShadowRoot]" === c(e)
        }
        function Po(e) {
            return "[object HTMLAnchorElement]" === c(e)
        }
        function Io(e) {
            return "[object HTMLTableElement]" === c(e)
        }
        function No(e) {
            return c(e) === Jr
        }
        function Oo(e) {
            return "[object WebSocket]" === c(e)
        }
        function Lo(e) {
            return "[object MessageEvent]" === c(e)
        }
        function ko(e) {
            return "[object PerformanceNavigationTiming]" === c(e)
        }
        function Do(e) {
            return e instanceof b.ArrayBuffer || e && Yr.test(c(e))
        }
        function Mo(e) {
            return e && b.arrayBufferIsView(e)
        }
        function Ro(e) {
            return e instanceof b.DataView || e && Qr.test(c(e))
        }
        function jo(e, t) {
            return !!bo(e) && b.matches.call(e, t)
        }
        function Ho(e, t) {
            if (bo(e))
                if (b.closest)
                    return b.closest.call(e, t);
                else {
                    var r = e;
                    var n = t;
                    for (; r; ) {
                        if (jo(r, n))
                            return r;
                        r = b.nodeParentNodeGetter.call(r)
                    }
                    return null;
                    return
                }
            return null
        }
        function Bo(e, t) {
            if (e)
                for (var r = 0, n = t.split(/\s+/); r < n.length; r++) {
                    var o = n[r];
                    b.tokenListAdd.call(b.elementClassListGetter.call(e), o)
                }
        }
        function Fo(e, t) {
            if (e)
                for (var r = 0, n = t.split(/\s+/); r < n.length; r++) {
                    var o = n[r];
                    b.tokenListRemove.call(b.elementClassListGetter.call(e), o)
                }
        }
        function Uo(e, t) {
            return !!e && b.tokenListContains.call(b.elementClassListGetter.call(e), t)
        }
        function Vo() {
            var e = b.querySelector.call(document, "." + Me.charset);
            return e && e.getAttribute("charset")
        }
        function Go(e, t) {
            for (var r = [], n = Wo(e); n; )
                (!t && bo(n) || t && jo(n, t)) && r.push(n),
                n = Wo(n);
            return r
        }
        function Wo(e) {
            return e = e.assignedSlot || e,
            b.nodeParentNodeGetter.call(e) || e.host
        }
        function qo(e, t, r) {
            for ((t = void 0 === t ? !1 : t) || (e = b.nodeParentNodeGetter.call(e)); e; ) {
                if ("function" != typeof r || r(e))
                    return e;
                e = b.nodeParentNodeGetter.call(e)
            }
            return null
        }
        function Ko(e) {
            for (var t = [], r = b.nodeListLengthGetter.call(e), n = 0; n < r; n++)
                t.push(e[n]);
            return t
        }
        function zo(e) {
            return to(e) ? [e] : Ko(Vr(e).call(e, "input[type=file]"))
        }
        function Xo(e) {
            return Ln(e) ? [e] : Ko(Vr(e).call(e, "iframe,frame"))
        }
        function $o(e) {
            return Xn(e) ? [e] : Ko(Vr(e).call(e, "script"))
        }
        function Yo(e) {
            return jn(e) && on.test(e.type)
        }
        function Qo(e) {
            return !!Yo(e) && !("number" == typeof e.selectionStart && "number" == typeof e.selectionEnd)
        }
        function Jo(e) {
            if (!Yn(e))
                return null;
            var t = En(e);
            return e.control || e.htmlFor && b.getElementById.call(t, e.htmlFor)
        }
        var Zo, ei, ti, ri, ni, oi, ii, si, ai, li, ci, pi = Object.freeze({
            __proto__: null,
            instanceToString: c,
            getActiveElement: ln,
            getChildVisibleIndex: cn,
            getIframeByElement: pn,
            getIframeLocation: un,
            getFrameElement: hn,
            getMapContainer: dn,
            getParentWindowWithSrc: function e(t) {
                var r = t.rammerheadParent
                  , n = null;
                if (t === t.rammerheadTop)
                    return t;
                if (r === t.rammerheadTop || bn(t, r))
                    return r;
                try {
                    n = r.frameElement
                } catch (e) {
                    n = null
                }
                return null !== n && Dn(n) ? e(r) : r
            },
            getScrollbarSize: fn,
            getSelectParent: mn,
            getSelectVisibleChildren: gn,
            getTopSameDomainWindow: yn,
            find: vn,
            findDocument: En,
            isContentEditableElement: Sn,
            isCrossDomainIframe: _n,
            isCrossDomainWindows: bn,
            isIframeWindow: wn,
            isDomElement: xn,
            getTagName: Cn,
            SHADOW_ROOT_PARENT_ELEMENT: Tn,
            getNodeShadowRootParent: An,
            getParentExceptShadowRoot: Pn,
            isElementInDocument: In,
            isElementInIframe: Nn,
            isHammerheadAttr: On,
            isIframeElement: Ln,
            isFrameElement: kn,
            isIframeWithoutSrc: Dn,
            isIframeWithSrcdoc: Mn,
            isImgElement: Rn,
            isInputElement: jn,
            isTitleElement: Hn,
            isButtonElement: Bn,
            isFieldSetElement: Fn,
            isOptGroupElement: Un,
            isHtmlElement: Vn,
            isBodyElement: Gn,
            isPageBody: Wn,
            isHeadElement: function(e) {
                return "[object HTMLHeadElement]" === c(e)
            },
            isHeadOrBodyElement: qn,
            isHeadOrBodyOrHtmlElement: Kn,
            isBaseElement: zn,
            isScriptElement: Xn,
            isStyleElement: $n,
            isLabelElement: Yn,
            isTextAreaElement: Qn,
            isOptionElement: Jn,
            isRadioButtonElement: function(e) {
                return jn(e) && "radio" === e.type.toLowerCase()
            },
            isColorInputElement: function(e) {
                return jn(e) && "color" === e.type.toLowerCase()
            },
            isCheckboxElement: function(e) {
                return jn(e) && "checkbox" === e.type.toLowerCase()
            },
            isSelectElement: Zn,
            isFormElement: eo,
            isFileInput: to,
            isInputWithNativeDialog: ro,
            isBodyElementWithChildren: no,
            isMapElement: oo,
            isRenderedNode: io,
            getTabIndex: so,
            isElementDisabled: ao,
            isElementFocusable: lo,
            isShadowUIElement: x,
            isWindow: co,
            isDocument: po,
            isBlob: uo,
            isLocation: ho,
            isSVGElement: fo,
            isSVGElementOrChild: mo,
            isFetchHeaders: go,
            isFetchRequest: yo,
            isElementReadOnly: vo,
            isTextEditableInput: Eo,
            isTextEditableElement: So,
            isTextEditableElementAndEditingAllowed: _o,
            isElementNode: bo,
            isTextNode: wo,
            isProcessingInstructionNode: xo,
            isCommentNode: Co,
            isDocumentFragmentNode: To,
            isShadowRoot: Ao,
            isAnchorElement: Po,
            isTableElement: Io,
            isTableDataCellElement: No,
            isWebSocket: Oo,
            isMessageEvent: Lo,
            isPerformanceNavigationTiming: ko,
            isArrayBuffer: Do,
            isArrayBufferView: Mo,
            isDataView: Ro,
            matches: jo,
            closest: Ho,
            addClass: Bo,
            removeClass: Fo,
            hasClass: Uo,
            parseDocumentCharset: Vo,
            getParents: Go,
            findParent: qo,
            nodeListToArray: Ko,
            getFileInputs: zo,
            getIframes: Xo,
            getScripts: $o,
            isNumberOrEmailInput: Yo,
            isInputWithoutSelectionProperties: Qo,
            getAssociatedElement: Jo
        }), r = (e(ui, Zo = ke),
        ui.prototype.isDeactivated = function() {
            try {
                var e;
                if (this.document.body,
                this.window[_.hammerhead])
                    return !!(e = hn(this.window)) && !In(e, En(e))
            } catch (e) {}
            return !0
        }
        ,
        ui.prototype.attach = function(e, t) {
            this.window = e,
            this.document = t || e.document
        }
        ,
        ui);
        function ui() {
            var e = null !== Zo && Zo.apply(this, arguments) || this;
            return e.window = null,
            e.nativeMethods = b,
            e.document = null,
            e
        }
        var hi = {
            AssignmentExpression: "AssignmentExpression",
            AssignmentPattern: "AssignmentPattern",
            ArrayExpression: "ArrayExpression",
            ArrayPattern: "ArrayPattern",
            ArrowFunctionExpression: "ArrowFunctionExpression",
            AwaitExpression: "AwaitExpression",
            BlockStatement: "BlockStatement",
            BinaryExpression: "BinaryExpression",
            BreakStatement: "BreakStatement",
            CallExpression: "CallExpression",
            CatchClause: "CatchClause",
            ClassBody: "ClassBody",
            ClassDeclaration: "ClassDeclaration",
            ClassExpression: "ClassExpression",
            ComprehensionBlock: "ComprehensionBlock",
            ComprehensionExpression: "ComprehensionExpression",
            ConditionalExpression: "ConditionalExpression",
            ContinueStatement: "ContinueStatement",
            DirectiveStatement: "DirectiveStatement",
            DoWhileStatement: "DoWhileStatement",
            DebuggerStatement: "DebuggerStatement",
            EmptyStatement: "EmptyStatement",
            ExportAllDeclaration: "ExportAllDeclaration",
            ExportBatchSpecifier: "ExportBatchSpecifier",
            ExportDeclaration: "ExportDeclaration",
            ExportNamedDeclaration: "ExportNamedDeclaration",
            ExportSpecifier: "ExportSpecifier",
            ExpressionStatement: "ExpressionStatement",
            ForStatement: "ForStatement",
            ForInStatement: "ForInStatement",
            ForOfStatement: "ForOfStatement",
            FunctionDeclaration: "FunctionDeclaration",
            FunctionExpression: "FunctionExpression",
            GeneratorExpression: "GeneratorExpression",
            Identifier: "Identifier",
            IfStatement: "IfStatement",
            ImportExpression: "ImportExpression",
            ImportSpecifier: "ImportSpecifier",
            ImportDeclaration: "ImportDeclaration",
            ChainExpression: "ChainExpression",
            Literal: "Literal",
            LabeledStatement: "LabeledStatement",
            LogicalExpression: "LogicalExpression",
            MemberExpression: "MemberExpression",
            MetaProperty: "MetaProperty",
            MethodDefinition: "MethodDefinition",
            ModuleDeclaration: "ModuleDeclaration",
            NewExpression: "NewExpression",
            ObjectExpression: "ObjectExpression",
            ObjectPattern: "ObjectPattern",
            Program: "Program",
            Property: "Property",
            RestElement: "RestElement",
            ReturnStatement: "ReturnStatement",
            SequenceExpression: "SequenceExpression",
            SpreadElement: "SpreadElement",
            Super: "Super",
            SwitchStatement: "SwitchStatement",
            SwitchCase: "SwitchCase",
            TaggedTemplateExpression: "TaggedTemplateExpression",
            TemplateElement: "TemplateElement",
            TemplateLiteral: "TemplateLiteral",
            ThisExpression: "ThisExpression",
            ThrowStatement: "ThrowStatement",
            TryStatement: "TryStatement",
            UnaryExpression: "UnaryExpression",
            UpdateExpression: "UpdateExpression",
            VariableDeclaration: "VariableDeclaration",
            VariableDeclarator: "VariableDeclarator",
            WhileStatement: "WhileStatement",
            WithStatement: "WithStatement",
            YieldExpression: "YieldExpression"
        }
          , C = hi
          , di = 0
          , fi = 1
          , mi = 1
          , gi = 2
          , yi = 2
          , vi = 3
          , t = 8
          , ce = 9
          , n = 10
          , i = 11
          , _e = 12
          , Ei = 13
          , Si = 14
          , _i = 14
          , bi = 15
          , wi = 16
          , xi = 17
          , Ci = 17
          , Ti = 18
          , s = 19
          , Ai = {
            "||": vi,
            "&&": 4,
            "|": 5,
            "^": 6,
            "&": 7,
            "==": t,
            "!=": t,
            "===": t,
            "!==": t,
            is: t,
            isnt: t,
            "<": ce,
            ">": ce,
            "<=": ce,
            ">=": ce,
            in: ce,
            instanceof: ce,
            "<<": n,
            ">>": n,
            ">>>": n,
            "+": i,
            "-": i,
            "*": _e,
            "%": _e,
            "/": _e,
            "??": 3,
            "**": 14
        };
        var Pi = [5760, 6158, 8192, 8193, 8194, 8195, 8196, 8197, 8198, 8199, 8200, 8201, 8202, 8239, 8287, 12288, 65279]
          , Ii = new RegExp("[ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮ̀-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁ҃-҇Ҋ-ԧԱ-Ֆՙա-և֑-ׇֽֿׁׂׅׄא-תװ-ײؐ-ؚؠ-٩ٮ-ۓە-ۜ۟-۪ۨ-ۼۿܐ-݊ݍ-ޱ߀-ߵߺࠀ-࠭ࡀ-࡛ࢠࢢ-ࢬࣤ-ࣾऀ-ॣ०-९ॱ-ॷॹ-ॿঁ-ঃঅ-ঌএঐও-নপ-রলশ-হ়-ৄেৈো-ৎৗড়ঢ়য়-ৣ০-ৱਁ-ਃਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹ਼ਾ-ੂੇੈੋ-੍ੑਖ਼-ੜਫ਼੦-ੵઁ-ઃઅ-ઍએ-ઑઓ-નપ-રલળવ-હ઼-ૅે-ૉો-્ૐૠ-ૣ૦-૯ଁ-ଃଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହ଼-ୄେୈୋ-୍ୖୗଡ଼ଢ଼ୟ-ୣ୦-୯ୱஂஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹா-ூெ-ைொ-்ௐௗ௦-௯ఁ-ఃఅ-ఌఎ-ఐఒ-నప-ళవ-హఽ-ౄె-ైొ-్ౕౖౘౙౠ-ౣ౦-౯ಂಃಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹ಼-ೄೆ-ೈೊ-್ೕೖೞೠ-ೣ೦-೯ೱೲംഃഅ-ഌഎ-ഐഒ-ഺഽ-ൄെ-ൈൊ-ൎൗൠ-ൣ൦-൯ൺ-ൿංඃඅ-ඖක-නඳ-රලව-ෆ්ා-ුූෘ-ෟෲෳก-ฺเ-๎๐-๙ກຂຄງຈຊຍດ-ທນ-ຟມ-ຣລວສຫອ-ູົ-ຽເ-ໄໆ່-ໍ໐-໙ໜ-ໟༀ༘༙༠-༩༹༵༷༾-ཇཉ-ཬཱ-྄྆-ྗྙ-ྼ࿆က-၉ၐ-ႝႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚ፝-፟ᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-᜔ᜠ-᜴ᝀ-ᝓᝠ-ᝬᝮ-ᝰᝲᝳក-៓ៗៜ៝០-៩᠋-᠍᠐-᠙ᠠ-ᡷᢀ-ᢪᢰ-ᣵᤀ-ᤜᤠ-ᤫᤰ-᤻᥆-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉ᧐-᧙ᨀ-ᨛᨠ-ᩞ᩠-᩿᩼-᪉᪐-᪙ᪧᬀ-ᭋ᭐-᭙᭫-᭳ᮀ-᯳ᰀ-᰷᱀-᱉ᱍ-ᱽ᳐-᳔᳒-ᳶᴀ-ᷦ᷼-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼ‌‍‿⁀⁔ⁱⁿₐ-ₜ⃐-⃥⃜⃡-⃰ℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯ⵿-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⷠ-ⷿⸯ々-〇〡-〯〱-〵〸-〼ぁ-ゖ゙゚ゝ-ゟァ-ヺー-ヿㄅ-ㄭㄱ-ㆎㆠ-ㆺㇰ-ㇿ㐀-䶵一-鿌ꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘫꙀ-꙯ꙴ-꙽ꙿ-ꚗꚟ-꛱ꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐ-ꞓꞠ-Ɦꟸ-ꠧꡀ-ꡳꢀ-꣄꣐-꣙꣠-ꣷꣻ꤀-꤭ꤰ-꥓ꥠ-ꥼꦀ-꧀ꧏ-꧙ꨀ-ꨶꩀ-ꩍ꩐-꩙ꩠ-ꩶꩺꩻꪀ-ꫂꫛ-ꫝꫠ-ꫯꫲ-꫶ꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯪ꯬꯭꯰-꯹가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻ︀-️︠-︦︳︴﹍-﹏ﹰ-ﹴﹶ-ﻼ０-９Ａ-Ｚ＿ａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]");
        function Ni(e) {
            if (e < 128)
                return 97 <= e && e <= 122 || 65 <= e && e <= 90 || 48 <= e && e <= 57 || 36 === e || 95 === e || 92 === e;
            e = String.fromCharCode(e);
            return Ii.test(e)
        }
        function Oi(e) {
            return 10 === e || 13 === e || 8232 === e || 8233 === e
        }
        function Li(e) {
            return 32 === e || 9 === e || Oi(e) || 11 === e || 12 === e || 160 === e || 5760 <= e && 0 <= Pi.indexOf(e)
        }
        function ki(e, t) {
            var r = "";
            for (t |= 0; 0 < t; t >>>= 1,
            e += e)
                1 & t && (r += e);
            return r
        }
        function Di(e, t) {
            return 8232 == (-2 & e) ? (t ? "u" : "\\u") + (8232 === e ? "2028" : "2029") : 10 === e || 13 === e ? (t ? "" : "\\") + (10 === e ? "n" : "r") : String.fromCharCode(e)
        }
        function Mi(e) {
            for (var t, r, n, o = "", i = 0, s = 0, a = 0, l = e.length; a < l; ++a) {
                if (39 === (t = e.charCodeAt(a)))
                    ++i;
                else if (34 === t)
                    ++s;
                else if (47 === t && ei)
                    o += "\\";
                else {
                    if (Oi(t) || 92 === t) {
                        o += function(e) {
                            var t = "\\";
                            switch (e) {
                            case 92:
                                t += "\\";
                                break;
                            case 10:
                                t += "n";
                                break;
                            case 13:
                                t += "r";
                                break;
                            case 8232:
                                t += "u2028";
                                break;
                            case 8233:
                                t += "u2029"
                            }
                            return t
                        }(t);
                        continue
                    }
                    if (ei && t < 32 || !(ei || oi || 32 <= t && t <= 126)) {
                        o += function(e, t) {
                            var r, n, o = "\\";
                            switch (e) {
                            case 8:
                                o += "b";
                                break;
                            case 12:
                                o += "f";
                                break;
                            case 9:
                                o += "t";
                                break;
                            default:
                                r = e.toString(16).toUpperCase(),
                                ei || 255 < e ? o += "u" + "0000".slice(r.length) + r : 0 !== e || 48 <= (n = t) && n <= 57 ? o += 11 === e ? "x0B" : "x" + "00".slice(r.length) + r : o += "0"
                            }
                            return o
                        }(t, e.charCodeAt(a + 1));
                        continue
                    }
                }
                o += String.fromCharCode(t)
            }
            if (n = (r = !("double" === ni || "auto" === ni && s < i)) ? "'" : '"',
            !(r ? i : s))
                return n + o + n;
            for (e = o,
            o = n,
            a = 0,
            l = e.length; a < l; ++a)
                (39 === (t = e.charCodeAt(a)) && r || 34 === t && !r) && (o += "\\"),
                o += String.fromCharCode(t);
            return o + n
        }
        function p(e, t) {
            if (!e.length)
                return t;
            if (!t.length)
                return e;
            var r = e.charCodeAt(e.length - 1)
              , n = t.charCodeAt(0);
            return Ni(r) && Ni(n) || r === n && (43 === r || 45 === r) || 47 === r && 105 === n ? e + g.space + t : Li(r) || Li(n) ? e + t : e + g.optSpace + t
        }
        function Ri() {
            var e = g.indent;
            return g.indent += g.indentUnit,
            e
        }
        function ji(e) {
            return e.type === hi.BlockStatement ? g.optSpace : e.type === hi.EmptyStatement ? "" : g.newline + g.indent + g.indentUnit
        }
        function Hi(e) {
            return e.type === hi.BlockStatement ? g.optSpace : g.newline + g.indent
        }
        function Bi(e) {
            var t = e.body
              , r = e
              , n = r.params
              , o = n.length
              , i = o - 1;
            if (r.type === hi.ArrowFunctionExpression && 1 === o && n[0].type === hi.Identifier)
                g.js += n[0].name;
            else {
                g.js += "(";
                for (var s = 0; s < o; ++s) {
                    var a = n[s];
                    n[s].type === hi.Identifier ? g.js += a.name : y[a.type](a, u.e4),
                    s !== i && (g.js += "," + g.optSpace)
                }
                g.js += ")"
            }
            e.type === hi.ArrowFunctionExpression && (g.js += g.optSpace + "=>"),
            e.expression ? (g.js += g.optSpace,
            "{" === (r = h(t, u.e4)).charAt(0) && (r = "(" + r + ")"),
            g.js += r) : (g.js += ji(t),
            es[t.type](t, u.s8))
        }
        var Fi = (Fi = Array.isArray) || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }
          , u = {
            e1: function(e) {
                return {
                    precedence: mi,
                    allowIn: e,
                    allowCall: !0,
                    allowUnparenthesizedNew: !0
                }
            },
            e2: function(e) {
                return {
                    precedence: vi,
                    allowIn: e,
                    allowCall: !0,
                    allowUnparenthesizedNew: !0
                }
            },
            e3: {
                precedence: bi,
                allowIn: !0,
                allowCall: !0,
                allowUnparenthesizedNew: !1
            },
            e4: {
                precedence: mi,
                allowIn: !0,
                allowCall: !0,
                allowUnparenthesizedNew: !0
            },
            e5: {
                precedence: di,
                allowIn: !0,
                allowCall: !0,
                allowUnparenthesizedNew: !0
            },
            e6: function(e) {
                return {
                    precedence: wi,
                    allowIn: !0,
                    allowCall: !1,
                    allowUnparenthesizedNew: e
                }
            },
            e7: {
                precedence: Ei,
                allowIn: !0,
                allowCall: !0,
                allowUnparenthesizedNew: !0
            },
            e8: {
                precedence: Si,
                allowIn: !0,
                allowCall: !0,
                allowUnparenthesizedNew: !0
            },
            e9: {
                precedence: void 0,
                allowIn: !0,
                allowCall: !0,
                allowUnparenthesizedNew: !0
            },
            e10: {
                precedence: bi,
                allowIn: !0,
                allowCall: !0,
                allowUnparenthesizedNew: !0
            },
            e11: function(e) {
                return {
                    precedence: bi,
                    allowIn: !0,
                    allowCall: e,
                    allowUnparenthesizedNew: !1
                }
            },
            e12: {
                precedence: s,
                allowIn: !1,
                allowCall: !1,
                allowUnparenthesizedNew: !0
            },
            e13: {
                precedence: s,
                allowIn: !0,
                allowCall: !0,
                allowUnparenthesizedNew: !0
            },
            e14: {
                precedence: di,
                allowIn: !1,
                allowCall: !0,
                allowUnparenthesizedNew: !0
            },
            e15: function(e) {
                return {
                    precedence: di,
                    allowIn: !0,
                    allowCall: e,
                    allowUnparenthesizedNew: !0
                }
            },
            e16: function(e, t) {
                return {
                    precedence: e,
                    allowIn: t,
                    allowCall: !0,
                    allowUnparenthesizedNew: !0
                }
            },
            e17: function(e) {
                return {
                    precedence: bi,
                    allowIn: e,
                    allowCall: !0,
                    allowUnparenthesizedNew: !0
                }
            },
            e18: function(e) {
                return {
                    precedence: mi,
                    allowIn: e,
                    allowCall: !0,
                    allowUnparenthesizedNew: !0
                }
            },
            e19: {
                precedence: di,
                allowIn: !0,
                allowCall: !0,
                semicolonOptional: !1
            },
            e20: {
                precedence: _i,
                allowCall: !0
            },
            s1: function(e, t) {
                return {
                    allowIn: !0,
                    functionBody: !1,
                    directiveContext: e,
                    semicolonOptional: t
                }
            },
            s2: {
                allowIn: !0,
                functionBody: !1,
                directiveContext: !1,
                semicolonOptional: !0
            },
            s3: function(e) {
                return {
                    allowIn: e,
                    functionBody: !1,
                    directiveContext: !1,
                    semicolonOptional: !1
                }
            },
            s4: function(e) {
                return {
                    allowIn: !0,
                    functionBody: !1,
                    directiveContext: !1,
                    semicolonOptional: e
                }
            },
            s5: function(e) {
                return {
                    allowIn: !0,
                    functionBody: !1,
                    directiveContext: !0,
                    semicolonOptional: e
                }
            },
            s6: {
                allowIn: !1,
                functionBody: !1,
                directiveContext: !1,
                semicolonOptional: !1
            },
            s7: {
                allowIn: !0,
                functionBody: !1,
                directiveContext: !1,
                semicolonOptional: !1
            },
            s8: {
                allowIn: !0,
                functionBody: !0,
                directiveContext: !1,
                semicolonOptional: !1
            }
        }
          , Ui = /[.eExX]|^0[0-9]+/
          , Vi = /[0-9]$/;
        function Gi(e, t) {
            var r = e.operator
              , n = Ai[e.operator]
              , o = n < t.precedence
              , t = t.allowIn || o
              , n = u.e16(n, t)
              , i = h(e.left, n)
              , t = ((o |= "in" === r && !t) && (g.js += "("),
            i = 47 === i.charCodeAt(i.length - 1) && Ni(r.charCodeAt(0)) ? i + g.space + r : p(i, r),
            n.precedence++,
            h(e.right, n));
            "/" === r && "/" === t.charAt(0) || "<" === r.slice(-1) && "!--" === t.slice(0, 3) ? i += g.space + t : i = p(i, t),
            g.js += i,
            o && (g.js += ")")
        }
        function Wi(e) {
            var t = e.elements
              , r = t.length;
            if (r) {
                var n = r - 1
                  , o = 1 < r
                  , e = Ri()
                  , i = g.newline + g.indent;
                g.js += "[";
                for (var s = 0; s < r; s++) {
                    var a = t[s];
                    o && (g.js += i),
                    a && y[a.type](a, u.e4),
                    s === n && a || (g.js += ",")
                }
                g.indent = e,
                o && (g.js += g.newline + g.indent),
                g.js += "]"
            } else
                g.js += "[]"
        }
        function qi(e) {
            var t = e.blocks
              , r = e.filter
              , n = e.type === hi.GeneratorExpression
              , o = n ? "(" : "["
              , e = h(e.body, u.e4);
            if (t) {
                for (var i = Ri(), s = t.length, a = 0; a < s; ++a)
                    var l = h(t[a], u.e5)
                      , o = 0 < a ? p(o, l) : o + l;
                g.indent = i
            }
            r && (i = h(r, u.e5),
            o = p(o, "if" + g.optSpace),
            o = p(o, "(" + i + ")")),
            o = p(o, e),
            g.js += o += n ? ")" : "]"
        }
        var Ki = {
            SequenceExpression: function(e, t) {
                var r = e.expressions
                  , n = r.length
                  , o = n - 1
                  , e = di < t.precedence
                  , i = u.e1(t.allowIn || e);
                e && (g.js += "(");
                for (var s = 0; s < n; s++) {
                    var a = r[s];
                    y[a.type](a, i),
                    s !== o && (g.js += "," + g.optSpace)
                }
                e && (g.js += ")")
            },
            AssignmentExpression: function(e, t) {
                var r = e.left
                  , n = e.right
                  , o = mi < t.precedence
                  , t = t.allowIn || o;
                o && (g.js += "("),
                y[r.type](r, u.e17(t)),
                g.js += g.optSpace + e.operator + g.optSpace,
                y[n.type](n, u.e18(t)),
                o && (g.js += ")")
            },
            AssignmentPattern: function(e) {
                e = {
                    left: e.left,
                    right: e.right,
                    operator: "="
                };
                y.AssignmentExpression(e, u.e4)
            },
            ArrowFunctionExpression: function(e, t) {
                t = yi < t.precedence;
                t && (g.js += "("),
                e.async && (g.js += "async "),
                Bi(e),
                t && (g.js += ")")
            },
            AwaitExpression: function(e, t) {
                t = _i < t.precedence;
                t && (g.js += "("),
                g.js += e.all ? "await* " : "await ",
                y[e.argument.type](e.argument, u.e20),
                t && (g.js += ")")
            },
            ConditionalExpression: function(e, t) {
                var r = e.test
                  , n = e.consequent
                  , e = e.alternate
                  , o = gi < t.precedence
                  , t = t.allowIn || o
                  , i = u.e2(t)
                  , t = u.e1(t);
                o && (g.js += "("),
                y[r.type](r, i),
                g.js += g.optSpace + "?" + g.optSpace,
                y[n.type](n, t),
                g.js += g.optSpace + ":" + g.optSpace,
                y[e.type](e, t),
                o && (g.js += ")")
            },
            LogicalExpression: Gi,
            BinaryExpression: Gi,
            CallExpression: function(e, t) {
                var r = e.callee
                  , n = e.arguments
                  , o = n.length
                  , i = o - 1
                  , t = !t.allowCall || bi < t.precedence;
                t && (g.js += "("),
                y[r.type](r, u.e3),
                e.optional && (g.js += "?."),
                g.js += "(";
                for (var s = 0; s < o; ++s) {
                    var a = n[s];
                    y[a.type](a, u.e4),
                    s !== i && (g.js += "," + g.optSpace)
                }
                g.js += ")",
                t && (g.js += ")")
            },
            NewExpression: function(e, t) {
                var r = e.arguments
                  , n = wi < t.precedence
                  , o = r.length
                  , i = o - 1
                  , t = !t.allowUnparenthesizedNew || ii || 0 < o
                  , e = h(e.callee, u.e6(!t));
                if (n && (g.js += "("),
                g.js += p("new", e),
                t) {
                    g.js += "(";
                    for (var s = 0; s < o; ++s) {
                        var a = r[s];
                        y[a.type](a, u.e4),
                        s !== i && (g.js += "," + g.optSpace)
                    }
                    g.js += ")"
                }
                n && (g.js += ")")
            },
            MemberExpression: function(e, t) {
                var r, n = e.object, o = e.property, i = Ti < t.precedence, s = !e.computed && n.type === hi.Literal && "number" == typeof n.value;
                i && (g.js += "("),
                s ? (s = h(n, u.e11(t.allowCall)),
                r = Vi.test(s) && !Ui.test(s),
                g.js += r ? s + "." : s) : y[n.type](n, u.e11(t.allowCall)),
                e.computed ? (e.optional && (g.js += "?."),
                g.js += "[",
                y[o.type](o, u.e15(t.allowCall)),
                g.js += "]") : g.js += (e.optional ? "?." : ".") + o.name,
                i && (g.js += ")")
            },
            UnaryExpression: function(e, t) {
                var r, t = Ei < t.precedence, n = e.operator, e = h(e.argument, u.e7);
                t && (g.js += "("),
                "" === g.optSpace || 2 < n.length ? g.js += p(n, e) : (g.js += n,
                ((n = n.charCodeAt(n.length - 1)) === (r = e.charCodeAt(0)) && (43 === n || 45 === n) || Ni(n) && Ni(r)) && (g.js += g.space),
                g.js += e),
                t && (g.js += ")")
            },
            YieldExpression: function(e, t) {
                var r = e.argument
                  , e = e.delegate ? "yield*" : "yield"
                  , t = fi < t.precedence;
                t && (g.js += "("),
                r && (e = p(e, h(r, u.e4))),
                g.js += e,
                t && (g.js += ")")
            },
            UpdateExpression: function(e, t) {
                var r = e.argument
                  , n = e.operator
                  , e = e.prefix
                  , t = (e ? Ei : Si) < t.precedence;
                t && (g.js += "("),
                e ? (g.js += n,
                y[r.type](r, u.e8)) : (y[r.type](r, u.e8),
                g.js += n),
                t && (g.js += ")")
            },
            FunctionExpression: function(e) {
                var t = !!e.generator;
                e.async && (g.js += "async "),
                g.js += t ? "function*" : "function",
                e.id ? (g.js += t ? g.optSpace : g.space,
                g.js += e.id.name) : g.js += g.optSpace,
                Bi(e)
            },
            ExportBatchSpecifier: function() {
                g.js += "*"
            },
            ArrayPattern: Wi,
            ArrayExpression: Wi,
            ClassExpression: function(e) {
                var t = e.id
                  , r = e.superClass
                  , e = e.body
                  , n = "class";
                t && (n = p(n, h(t, u.e9))),
                r && (t = p("extends", t = h(r, u.e4)),
                n = p(n, t)),
                g.js += n + g.optSpace,
                es[e.type](e, u.s2)
            },
            MetaProperty: function(e, t) {
                var r = e.meta
                  , e = e.property
                  , t = Ti < t.precedence;
                t && (g.js += "("),
                g.js += ("string" == typeof r ? r : r.name) + "." + ("string" == typeof e ? e : e.name),
                t && (g.js += ")")
            },
            MethodDefinition: function(e) {
                var t = e.static ? "static" + g.optSpace : ""
                  , r = h(e.key, u.e5);
                e.computed && (r = "[" + r + "]"),
                "get" === e.kind || "set" === e.kind ? (r = p(e.kind, r),
                g.js += p(t, r)) : e.value.generator ? g.js += t + "*" + r : e.value.async ? g.js += t + "async " + r : g.js += p(t, r),
                Bi(e.value)
            },
            Property: function(e) {
                var t = e.value
                  , r = e.kind
                  , n = h(e.key, u.e4);
                e.computed && (n = "[" + n + "]"),
                "get" === r || "set" === r ? (g.js += r + g.space + n,
                Bi(t)) : e.shorthand ? g.js += n : e.method ? (t.generator ? n = "*" + n : t.async && (n = "async " + n),
                g.js += n,
                Bi(t)) : (g.js += n + ":" + g.optSpace,
                y[t.type](t, u.e4))
            },
            ObjectExpression: function(e) {
                var t = e.properties
                  , r = t.length;
                if (r) {
                    var n = r - 1
                      , e = Ri();
                    g.js += "{";
                    for (var o = 0; o < r; o++) {
                        var i = t[o]
                          , s = i.type || hi.Property;
                        g.js += g.newline + g.indent,
                        y[s](i, u.e5),
                        o !== n && (g.js += ",")
                    }
                    g.indent = e,
                    g.js += g.newline + g.indent + "}"
                } else
                    g.js += "{}"
            },
            ObjectPattern: function(e) {
                var t = e.properties
                  , r = t.length;
                if (r) {
                    var n = r - 1
                      , o = !1;
                    if (1 === r)
                        o = t[0].value.type !== hi.Identifier;
                    else
                        for (var i = 0; i < r; i++)
                            if (!t[i].shorthand) {
                                o = !0;
                                break
                            }
                    g.js += o ? "{" + g.newline : "{";
                    for (var e = Ri(), s = "," + (o ? g.newline : g.optSpace), i = 0; i < r; i++) {
                        var a = t[i];
                        o && (g.js += g.indent),
                        y[a.type](a, u.e5),
                        i !== n && (g.js += s)
                    }
                    g.indent = e,
                    g.js += o ? g.newline + g.indent + "}" : "}"
                } else
                    g.js += "{}"
            },
            ThisExpression: function() {
                g.js += "this"
            },
            Identifier: function(e, t, r) {
                g.js += e.name
            },
            ImportExpression: function(e, t) {
                t = bi < t.precedence,
                e = e.source;
                t && (g.js += "("),
                g.js += "import(",
                y[e.type](e, u.e4),
                g.js += ")",
                t && (g.js += ")")
            },
            ImportSpecifier: function(e) {
                g.js += e.imported.name,
                e.local && (g.js += g.space + "as" + g.space + e.local.name)
            },
            ExportSpecifier: function(e) {
                g.js += e.local.name,
                e.exported && (g.js += g.space + "as" + g.space + e.exported.name)
            },
            ChainExpression: function(e, t) {
                var r = Ci < t.precedence
                  , e = e.expression
                  , t = {
                    precedence: Ci,
                    allowIn: (t = t || {}).allowIn,
                    allowCall: t.allowCall,
                    allowUnparenthesizedNew: t.allowUnparenthesizedNew
                };
                r && (t.allowCall = !0,
                g.js += "("),
                y[e.type](e, t),
                r && (g.js += ")")
            },
            Literal: function(e) {
                var t;
                ci.raw && void 0 !== e.raw ? g.js += e.raw : null === e.value ? g.js += "null" : (t = typeof e.value,
                g.js += "string" == t ? Mi(e.value) : "number" == t ? function(e) {
                    var t, r, n, o, i;
                    if (e === 1 / 0)
                        return ei ? "null" : ti ? "1e400" : "1e+400";
                    if (t = "" + e,
                    !ti || t.length < 3)
                        return t;
                    for (r = t.indexOf("."),
                    ei || 48 !== t.charCodeAt(0) || 1 !== r || (r = 0,
                    t = t.slice(1)),
                    t = (n = t).replace("e+", "e"),
                    (o = 0) < (i = n.indexOf("e")) && (o = +n.slice(i + 1),
                    n = n.slice(0, i)),
                    0 <= r && (o -= n.length - r - 1,
                    n = +(n.slice(0, r) + n.slice(r + 1)) + ""),
                    i = 0; 48 === n.charCodeAt(n.length + i - 1); )
                        --i;
                    return 0 !== i && (o -= i,
                    n = n.slice(0, i)),
                    0 !== o && (n += "e" + o),
                    t = (n.length < t.length || ri && 1e12 < e && Math.floor(e) === e && (n = "0x" + e.toString(16)).length < t.length) && +n === e ? n : t
                }(e.value) : "boolean" == t ? e.value ? "true" : "false" : function(e) {
                    var t, r, n, o, i, s, a = e.toString();
                    if (e.source) {
                        if (!(t = a.match(/\/([^/]*)$/)))
                            return a;
                        for (t = t[1],
                        a = "",
                        s = i = !1,
                        r = 0,
                        n = e.source.length; r < n; ++r)
                            o = e.source.charCodeAt(r),
                            s = s ? (a += Di(o, s),
                            !1) : (i ? 93 === o && (i = !1) : 47 === o ? a += "\\" : 91 === o && (i = !0),
                            a += Di(o, s),
                            92 === o);
                        return "/" + a + "/" + t
                    }
                    return a
                }(e.value))
            },
            GeneratorExpression: qi,
            ComprehensionExpression: qi,
            ComprehensionBlock: function(e) {
                var t = e.left
                  , r = void 0
                  , n = h(e.right, u.e5);
                r = p(r = t.type === hi.VariableDeclaration ? t.kind + g.space + Qi(t.declarations[0], u.s6) : h(t, u.e10), e.of ? "of" : "in"),
                g.js += "for" + g.optSpace + "(" + p(r, n) + ")"
            },
            RestElement: function(e) {
                g.js += "..." + e.argument.name
            },
            SpreadElement: function(e) {
                e = e.argument;
                g.js += "...",
                y[e.type](e, u.e4)
            },
            TaggedTemplateExpression: function(e, t) {
                var r = e.tag
                  , e = e.quasi
                  , n = xi < t.precedence;
                n && (g.js += "("),
                y[r.type](r, u.e11(t.allowCall)),
                y[e.type](e, u.e12),
                n && (g.js += ")")
            },
            TemplateElement: function(e) {
                g.js += e.value.raw
            },
            TemplateLiteral: function(e) {
                var t = e.quasis
                  , r = e.expressions
                  , n = t.length
                  , o = n - 1;
                g.js += "`";
                for (var i = 0; i < n; ++i) {
                    var s = t[i];
                    y[s.type](s, u.e13),
                    i !== o && (s = r[i],
                    g.js += "${" + g.optSpace,
                    y[s.type](s, u.e5),
                    g.js += g.optSpace + "}")
                }
                g.js += "`"
            },
            Super: function() {
                g.js += "super"
            }
        }
          , zi = /^{|^class(?:\s|{)|^(async )?function(?:\s|\*|\()/;
        function Xi(e, t, r) {
            for (var n = r.length, o = n - 1, i = 0; i < n; ++i)
                e = p(e, Qi(r[i], u.s7)),
                !t && i === o || (e += Hi(r[i].body));
            return e
        }
        function $i(e, t, r) {
            var n = t.body
              , o = t.left
              , r = !si && r.semicolonOptional
              , i = Ri()
              , s = "for" + (t.await ? " await" : "") + g.optSpace + "("
              , a = (o.type === hi.VariableDeclaration ? (a = Ri(),
            s += o.kind + g.space + Qi(o.declarations[0], u.s6),
            g.indent = a) : s += h(o, u.e10),
            s = p(s, e),
            h(t.right, u.e4))
              , s = p(s, a) + ")";
            g.indent = i,
            g.js += s + ji(n),
            es[n.type](n, u.s4(r))
        }
        var Yi = {
            BlockStatement: function(e, t) {
                var r = e.body
                  , n = r.length
                  , o = n - 1
                  , e = Ri();
                g.js += "{" + g.newline;
                for (var i = 0; i < n; i++) {
                    var s = r[i];
                    g.js += g.indent,
                    es[s.type](s, u.s1(t.functionBody, i === o)),
                    g.js += g.newline
                }
                g.indent = e,
                g.js += g.indent + "}"
            },
            BreakStatement: function(e, t) {
                e.label ? g.js += "break " + e.label.name : g.js += "break",
                !si && t.semicolonOptional || (g.js += ";")
            },
            ContinueStatement: function(e, t) {
                e.label ? g.js += "continue " + e.label.name : g.js += "continue",
                !si && t.semicolonOptional || (g.js += ";")
            },
            ClassBody: function(e) {
                var t = e.body
                  , r = t.length
                  , n = r - 1
                  , e = Ri();
                g.js += "{" + g.newline;
                for (var o = 0; o < r; o++) {
                    var i = t[o]
                      , s = i.type || hi.Property;
                    g.js += g.indent,
                    y[s](i, u.e5),
                    o !== n && (g.js += g.newline)
                }
                g.indent = e,
                g.js += g.newline + g.indent + "}"
            },
            ClassDeclaration: function(e) {
                var t = e.body
                  , r = e.superClass
                  , e = "class " + e.id.name;
                r && (r = h(r, u.e4),
                e += g.space + p("extends", r)),
                g.js += e + g.optSpace,
                es[t.type](t, u.s2)
            },
            DirectiveStatement: function(e, t) {
                ci.raw && e.raw ? g.js += e.raw : g.js += function(e) {
                    for (var t, r = "double" === ni ? '"' : "'", n = 0, o = e.length; n < o; ++n) {
                        if (39 === (t = e.charCodeAt(n))) {
                            r = '"';
                            break
                        }
                        if (34 === t) {
                            r = "'";
                            break
                        }
                        92 === t && ++n
                    }
                    return r + e + r
                }(e.directive),
                !si && t.semicolonOptional || (g.js += ";")
            },
            DoWhileStatement: function(e, t) {
                var r = e.body
                  , e = e.test
                  , r = p("do", ji(r) + Qi(r, u.s7) + Hi(r));
                g.js += p(r, "while" + g.optSpace + "("),
                y[e.type](e, u.e5),
                g.js += ")",
                !si && t.semicolonOptional || (g.js += ";")
            },
            CatchClause: function(e) {
                var t = e.param
                  , r = e.guard
                  , e = e.body
                  , n = Ri();
                g.js += "catch" + g.optSpace,
                t && (g.js += "(",
                y[t.type](t, u.e5)),
                r && (g.js += " if ",
                y[r.type](r, u.e5)),
                g.indent = n,
                t && (g.js += ")"),
                g.js += ji(e),
                es[e.type](e, u.s7)
            },
            DebuggerStatement: function(e, t) {
                g.js += "debugger",
                !si && t.semicolonOptional || (g.js += ";")
            },
            EmptyStatement: function() {
                g.js += ";"
            },
            ExportAllDeclaration: function(e, t) {
                Yi.ExportDeclaration(e, t, !0)
            },
            ExportDeclaration: function(e, t, r) {
                var n = e.specifiers
                  , o = e.declaration
                  , t = si || !t.semicolonOptional;
                if (e.default) {
                    var i = h(o, u.e4);
                    g.js += p("export default", i),
                    t && (g.js += ";")
                } else if (n || r) {
                    var s = "export";
                    if (r)
                        s += g.optSpace + "*";
                    else if (0 === n.length)
                        s += g.optSpace + "{" + g.optSpace + "}";
                    else if (n[0].type === hi.ExportBatchSpecifier)
                        s = p(s, h(n[0], u.e5));
                    else {
                        var r = Ri()
                          , a = n.length
                          , l = a - 1;
                        s += g.optSpace + "{";
                        for (var c = 0; c < a; ++c)
                            s = (s += g.newline + g.indent) + h(n[c], u.e5),
                            c !== l && (s += ",");
                        g.indent = r,
                        s += g.newline + g.indent + "}"
                    }
                    e.source ? (g.js += p(s, "from" + g.optSpace),
                    y.Literal(e.source)) : g.js += s,
                    t && (g.js += ";")
                } else
                    o && (i = Qi(o, u.s4(!t)),
                    g.js += p("export", i))
            },
            ExportNamedDeclaration: function(e, t) {
                Yi.ExportDeclaration(e, t)
            },
            ExpressionStatement: function(e, t) {
                var r = h(e.expression, u.e5)
                  , e = zi.test(r) || li && t.directiveContext && e.expression.type === hi.Literal && "string" == typeof e.expression.value;
                g.js += e ? "(" + r + ")" : r,
                !si && t.semicolonOptional || (g.js += ";")
            },
            ImportDeclaration: function(e, t) {
                var r = e.specifiers
                  , n = "import"
                  , o = r.length;
                if (o) {
                    var i = !!r[0].default
                      , s = i ? 1 : 0
                      , a = o - 1;
                    if (i && (n = p(n, r[0].id.name)),
                    s < o) {
                        if (i && (n += ","),
                        n += g.optSpace + "{",
                        s == a)
                            n += g.optSpace + h(r[s], u.e5) + g.optSpace;
                        else {
                            for (var i = Ri(), l = s; l < o; l++)
                                n += g.newline + g.indent + h(r[l], u.e5),
                                l !== a && (n += ",");
                            g.indent = i,
                            n += g.newline + g.indent
                        }
                        n += "}" + g.optSpace
                    }
                    n = p(n, "from")
                }
                g.js += n + g.optSpace,
                y.Literal(e.source),
                !si && t.semicolonOptional || (g.js += ";")
            },
            VariableDeclarator: function(e, t) {
                var r = e.id
                  , e = e.init
                  , t = u.e1(t.allowIn);
                e ? (y[r.type](r, t),
                g.js += g.optSpace + "=" + g.optSpace,
                y[e.type](e, t)) : r.type === hi.Identifier ? g.js += r.name : y[r.type](r, t)
            },
            VariableDeclaration: function(e, t) {
                var r = e.declarations
                  , n = r.length
                  , o = 1 < n ? Ri() : g.indent
                  , i = u.s3(t.allowIn);
                g.js += e.kind;
                for (var s = 0; s < n; s++) {
                    var a = r[s];
                    g.js += 0 === s ? g.space : "," + g.optSpace,
                    es[a.type](a, i)
                }
                !si && t.semicolonOptional || (g.js += ";"),
                g.indent = o
            },
            ThrowStatement: function(e, t) {
                e = h(e.argument, u.e5);
                g.js += p("throw", e),
                !si && t.semicolonOptional || (g.js += ";")
            },
            TryStatement: function(e) {
                var t = e.block
                  , r = e.finalizer
                  , t = "try" + ji(t) + Qi(t, u.s7) + Hi(t)
                  , n = e.handlers || e.guardedHandlers;
                n && (t = Xi(t, r, n)),
                e.handler && (t = Xi(t, r, n = Fi(e.handler) ? e.handler : [e.handler])),
                r && (t = p(t, "finally" + ji(r)),
                t += Qi(r, u.s7)),
                g.js += t
            },
            SwitchStatement: function(e) {
                var t = e.cases
                  , e = e.discriminant
                  , r = Ri();
                if (g.js += "switch" + g.optSpace + "(",
                y[e.type](e, u.e5),
                g.js += ")" + g.optSpace + "{" + g.newline,
                g.indent = r,
                t)
                    for (var n = t.length, o = n - 1, i = 0; i < n; i++) {
                        var s = t[i];
                        g.js += g.indent,
                        es[s.type](s, u.s4(i === o)),
                        g.js += g.newline
                    }
                g.js += g.indent + "}"
            },
            SwitchCase: function(e, t) {
                var r = e.consequent
                  , n = r[0]
                  , e = e.test
                  , o = 0
                  , i = !si && t.semicolonOptional
                  , s = r.length
                  , a = s - 1
                  , t = Ri();
                for (e ? (e = h(e, u.e5),
                g.js += p("case", e) + ":") : g.js += "default:",
                s && n.type === hi.BlockStatement && (o++,
                g.js += ji(n),
                es[n.type](n, u.s7)); o < s; o++) {
                    var l = r[o]
                      , c = o === a && i;
                    g.js += g.newline + g.indent,
                    es[l.type](l, u.s4(c))
                }
                g.indent = t
            },
            IfStatement: function(e, t) {
                var r = e.consequent
                  , n = e.test
                  , o = Ri()
                  , t = !si && t.semicolonOptional;
                g.js += "if" + g.optSpace + "(",
                y[n.type](n, u.e5),
                g.js += ")",
                g.indent = o,
                g.js += ji(r),
                e.alternate ? (n = Qi(r, u.s7) + Hi(r),
                o = Qi(e.alternate, u.s4(t)),
                o = e.alternate.type === hi.IfStatement ? "else " + o : p("else", ji(e.alternate) + o),
                g.js += p(n, o)) : es[r.type](r, u.s4(t))
            },
            ForStatement: function(e, t) {
                var r = e.init
                  , n = e.test
                  , o = e.body
                  , e = e.update
                  , t = !si && t.semicolonOptional
                  , i = Ri();
                g.js += "for" + g.optSpace + "(",
                r ? r.type === hi.VariableDeclaration ? es[r.type](r, u.s6) : (y[r.type](r, u.e14),
                g.js += ";") : g.js += ";",
                n && (g.js += g.optSpace,
                y[n.type](n, u.e5)),
                g.js += ";",
                e && (g.js += g.optSpace,
                y[e.type](e, u.e5)),
                g.js += ")",
                g.indent = i,
                g.js += ji(o),
                es[o.type](o, u.s4(t))
            },
            ForInStatement: function(e, t) {
                $i("in", e, t)
            },
            ForOfStatement: function(e, t) {
                $i("of", e, t)
            },
            LabeledStatement: function(e, t) {
                var r = e.body
                  , t = !si && t.semicolonOptional
                  , n = g.indent;
                g.js += e.label.name + ":" + ji(r),
                r.type !== hi.BlockStatement && (n = Ri()),
                es[r.type](r, u.s4(t)),
                g.indent = n
            },
            ModuleDeclaration: function(e, t) {
                g.js += "module" + g.space + e.id.name + g.space + "from" + g.optSpace,
                y.Literal(e.source),
                !si && t.semicolonOptional || (g.js += ";")
            },
            Program: function(e) {
                var t = e.body
                  , r = t.length
                  , n = r - 1;
                ai && 0 < r && (g.js += "\n");
                for (var o = 0; o < r; o++) {
                    var i = t[o];
                    g.js += g.indent,
                    es[i.type](i, u.s5(!ai && o === n)),
                    o !== n && (g.js += g.newline)
                }
            },
            FunctionDeclaration: function(e) {
                var t = !!e.generator;
                e.async && (g.js += "async "),
                g.js += t ? "function*" + g.optSpace : "function" + g.space,
                g.js += e.id.name,
                Bi(e)
            },
            ReturnStatement: function(e, t) {
                var e = e.argument;
                e ? (e = h(e, u.e5),
                g.js += p("return", e)) : g.js += "return",
                !si && t.semicolonOptional || (g.js += ";")
            },
            WhileStatement: function(e, t) {
                var r = e.body
                  , e = e.test
                  , t = !si && t.semicolonOptional
                  , n = Ri();
                g.js += "while" + g.optSpace + "(",
                y[e.type](e, u.e5),
                g.js += ")",
                g.indent = n,
                g.js += ji(r),
                es[r.type](r, u.s4(t))
            },
            WithStatement: function(e, t) {
                var r = e.body
                  , e = e.object
                  , t = !si && t.semicolonOptional
                  , n = Ri();
                g.js += "with" + g.optSpace + "(",
                y[e.type](e, u.e5),
                g.js += ")",
                g.indent = n,
                g.js += ji(r),
                es[r.type](r, u.s4(t))
            }
        };
        function h(e, t) {
            var r = g.js
              , e = (g.js = "",
            y[e.type](e, t),
            g.js);
            return g.js = r,
            e
        }
        function Qi(e, t) {
            var r = g.js
              , e = (g.js = "",
            es[e.type](e, t),
            g.js);
            return g.js = r,
            e
        }
        function Ji(l) {
            return function(e, t) {
                if (ci.verbatim && e.hasOwnProperty(ci.verbatim)) {
                    var r = e
                      , n = t
                      , o = "string" == typeof (r = r[ci.verbatim])
                      , n = (o || void 0 === r.precedence ? di : r.precedence) < n.precedence
                      , i = (o ? r : r.content).split(/\r\n|\n/)
                      , s = i.length;
                    n && (g.js += "("),
                    g.js += i[0];
                    for (var a = 1; a < s; a++)
                        g.js += g.newline + g.indent + i[a];
                    n && (g.js += ")")
                } else
                    l(e, t)
            }
        }
        function Zi(e, t) {
            var r = {
                indent: null,
                base: null,
                parse: null,
                format: {
                    indent: {
                        style: "    ",
                        base: 0
                    },
                    newline: "\n",
                    space: " ",
                    json: !1,
                    renumber: !1,
                    hexadecimal: !1,
                    quotes: "single",
                    escapeless: !1,
                    compact: !1,
                    parentheses: !0,
                    semicolons: !0,
                    safeConcatenation: !1
                },
                directive: !1,
                raw: !0,
                verbatim: null
            };
            return null != t ? ("string" == typeof t.indent && (r.format.indent.style = t.indent),
            "number" == typeof t.base && (r.format.indent.base = t.base),
            t = function e(t, r) {
                var n, o;
                function i(e) {
                    return "object" == typeof e && e instanceof Object && !(e instanceof RegExp)
                }
                for (n in r)
                    r.hasOwnProperty(n) && (i(o = r[n]) ? i(t[n]) ? e(t[n], o) : t[n] = e({}, o) : t[n] = o);
                return t
            }(r, t),
            g.indentUnit = t.format.indent.style,
            "string" == typeof t.base ? g.indent = t.base : g.indent = ki(g.indentUnit, t.format.indent.base)) : (g.indentUnit = (t = r).format.indent.style,
            g.indent = ki(g.indentUnit, t.format.indent.base)),
            ei = t.format.json,
            ti = t.format.renumber,
            ri = !ei && t.format.hexadecimal,
            ni = ei ? "double" : t.format.quotes,
            oi = t.format.escapeless,
            g.newline = t.format.newline,
            g.optSpace = t.format.space,
            t.format.compact && (g.newline = g.optSpace = g.indentUnit = g.indent = ""),
            g.space = g.optSpace || " ",
            ii = t.format.parentheses,
            si = t.format.semicolons,
            ai = t.format.safeConcatenation,
            li = t.directive,
            ei || t.parse,
            y = (ci = t).verbatim ? function() {
                var e, t = {};
                for (e in Ki)
                    Ki.hasOwnProperty(e) && (t[e] = Ji(Ki[e]));
                return t
            }() : Ki,
            r = e,
            g.js = "",
            es[r.type] ? es[r.type](r, u.s7) : y[r.type](r, u.e19),
            g.js
        }
        var g = {
            js: "",
            newline: "\n",
            optSpace: " ",
            space: " ",
            indentUnit: "    ",
            indent: ""
        }
          , y = void 0
          , es = Yi
          , v = {
            getLocation: "__get$Loc",
            setLocation: "__set$Loc",
            getProperty: "__get$",
            setProperty: "__set$",
            callMethod: "__call$",
            processScript: "__proc$Script",
            processHtml: "__proc$Html",
            getEval: "__get$Eval",
            getPostMessage: "__get$PostMessage",
            getProxyUrl: "__get$ProxyUrl",
            restArray: "__rest$Array",
            arrayFrom: "__arrayFrom$",
            restObject: "__rest$Object",
            swScopeHeaderValue: "__swScopeHeaderValue"
        }
          , ts = "_hh$temp"
          , rs = (ns.resetCounter = function() {
            ns._counter = 0
        }
        ,
        ns.generateName = function(e, t, r) {
            if (!e)
                return ts + ns._counter++;
            if (t) {
                if (t.type === C.Identifier)
                    return e + "$" + t.name;
                if (t.type === C.Literal && t.value)
                    return e + "$" + t.value.toString().replace(/[^a-zA-Z0-9]/g, "")
            }
            return e + "$i" + r
        }
        ,
        ns.isHHTempVariable = function(e) {
            return 0 === e.indexOf(ts)
        }
        ,
        ns.prototype.append = function(e) {
            this._list.push(e)
        }
        ,
        ns.prototype.get = function() {
            return this._list
        }
        ,
        ns._counter = 0,
        ns);
        function ns() {
            this._list = []
        }
        function os(e) {
            return {
                type: C.Identifier,
                name: e
            }
        }
        function is(e) {
            return {
                type: C.ExpressionStatement,
                expression: e
            }
        }
        function ss(e, t, r) {
            return {
                type: C.AssignmentExpression,
                operator: t,
                left: e,
                right: r
            }
        }
        function as(e, t) {
            return {
                type: C.CallExpression,
                callee: e,
                arguments: t,
                optional: !1
            }
        }
        function ls(e) {
            return {
                type: C.ArrayExpression,
                elements: e
            }
        }
        function cs(e, t, r) {
            return {
                type: C.MemberExpression,
                object: e,
                property: t,
                computed: r,
                optional: !1
            }
        }
        function ps(e, t, r) {
            return {
                type: C.BinaryExpression,
                left: e,
                right: r,
                operator: t
            }
        }
        function us(e) {
            return {
                type: C.SequenceExpression,
                expressions: e
            }
        }
        function hs(e) {
            return {
                type: C.ReturnStatement,
                argument: e = void 0 === e ? null : e
            }
        }
        function ds() {
            return e = "void",
            t = fs(0),
            {
                type: C.UnaryExpression,
                operator: e,
                prefix: !0,
                argument: t
            };
            var e, t
        }
        function fs(e) {
            return {
                type: C.Literal,
                value: e
            }
        }
        function ms(e, t) {
            return is(ss(e, "=", t))
        }
        function gs(e) {
            return {
                type: C.BlockStatement,
                body: e
            }
        }
        function ys(e, t) {
            return {
                type: C.VariableDeclarator,
                id: e,
                init: t = void 0 === t ? null : t
            }
        }
        function vs(e, t) {
            return {
                type: C.VariableDeclaration,
                declarations: t,
                kind: e
            }
        }
        function Es(e, t) {
            var e = [e]
              , r = os(v.processScript);
            return t && e.push(fs(!0)),
            as(r, e)
        }
        function Ss(e, t, r) {
            var n = os(rs.generateName())
              , o = as(os(v.setLocation), [e, n])
              , e = ss(e, "=", n)
              , i = os("call");
            s = null,
            a = [],
            t = gs([vs("var", [ys(n, t)]), hs((n = "||",
            {
                type: C.LogicalExpression,
                left: o,
                right: e,
                operator: n
            }))]);
            var s, a, l, c, o = as(cs({
                type: C.FunctionExpression,
                id: s,
                params: a,
                body: t,
                async: l = void 0 === l ? !1 : l,
                generator: c = void 0 === c ? !1 : c
            }, i, !1), [{
                type: C.ThisExpression
            }]);
            return r ? us([fs(0), o]) : o
        }
        function _s(e) {
            return as(os(v.getEval), [e])
        }
        function bs(e) {
            return as(os(v.getPostMessage), e.type === C.MemberExpression ? [e.object] : [fs(null), e])
        }
        function ws(e, t) {
            return e.test ? e.test(t) : Ts.call(e, t)
        }
        var Ce = ["postMessage", "replace", "assign"]
          , t = ["href", "location"]
          , xs = new RegExp("^(" + Ce.join("|") + ")$")
          , Cs = new RegExp("^(" + t.join("|") + ")$")
          , Ts = RegExp.prototype.test;
        function As(e) {
            return ws(xs, String(e))
        }
        function Ps(e) {
            return ws(Cs, String(e))
        }
        var Is = Object.freeze({
            __proto__: null,
            METHODS: Ce,
            PROPERTIES: t,
            shouldInstrumentMethod: As,
            shouldInstrumentProperty: Ps
        })
          , ce = {
            nodeReplacementRequireTransform: !0,
            nodeTypes: C.MemberExpression,
            condition: function(e, t) {
                return !(!e.computed || !t) && (!(e.property.type === C.Literal && !Ps(e.property.value)) && (e.object.type !== C.Super && ((t.type !== C.AssignmentExpression || t.left !== e) && ((t.type !== C.UnaryExpression || "delete" !== t.operator) && ((t.type !== C.UpdateExpression || "++" !== t.operator && "--" !== t.operator) && ((t.type !== C.CallExpression || t.callee !== e) && ((t.type !== C.NewExpression || t.callee !== e) && (t.type !== C.ForInStatement || t.left !== e))))))))
            },
            run: function(e) {
                return t = e.property,
                r = e.object,
                e = e.optional,
                n = os(v.getProperty),
                r = [r, t],
                (e = void 0 === e ? !1 : e) && r.push(fs(e)),
                as(n, r);
                var t, r, n
            }
        }
          , n = {
            nodeReplacementRequireTransform: !0,
            nodeTypes: C.AssignmentExpression,
            condition: function(e) {
                var t = e.left;
                return (t.type !== C.MemberExpression || t.object.type !== C.Super) && (!("=" !== e.operator || t.type !== C.MemberExpression || !t.computed) && (t.property.type !== C.Literal || Ps(t.property.value)))
            },
            run: function(e) {
                var t, r = e.left;
                return t = r.property,
                r = r.object,
                e = e.right,
                as(os(v.setProperty), [r, t, e])
            }
        }
          , i = {
            nodeReplacementRequireTransform: !0,
            nodeTypes: C.AssignmentExpression,
            condition: function(e) {
                if ("+=" !== e.operator)
                    return !1;
                e = e.left;
                if (e.type === C.Identifier)
                    return Ps(e.name);
                if (e.type === C.MemberExpression) {
                    if (e.computed)
                        return e.property.type === C.Literal ? Ps(e.property.value) : e.property.type !== C.UpdateExpression;
                    if (e.property.type === C.Identifier)
                        return Ps(e.property.name)
                }
                return !1
            },
            run: function(e) {
                return t = e.left,
                e = e.right,
                ss(t, "=", ps(t, "+", e));
                var t
            }
        };
        function Ns(e, t, r, n) {
            var o = r[n];
            o instanceof Array ? e ? o[o.indexOf(e)] = t : o.unshift(t) : r[n] = t,
            e ? (t.originStart = t.start = e.start,
            t.originEnd = t.end = e.end) : t.start = t.end = t.originStart = t.originEnd = o[1] ? o[1].start : r.start + 1
        }
        var _e = {
            nodeReplacementRequireTransform: !1,
            nodeTypes: C.CallExpression,
            condition: function(e) {
                if (!e.arguments.length)
                    return !1;
                e = e.callee;
                return e.type === C.Identifier && "eval" === e.name || e.type === C.MemberExpression && "eval" === (e.property.type === C.Identifier && e.property.name || e.property.type === C.Literal && e.property.value)
            },
            run: function(e) {
                var t = Es(e.arguments[0]);
                return Ns(e.arguments[0], t, e, "arguments"),
                null
            }
        }
          , s = {
            nodeReplacementRequireTransform: !1,
            nodeTypes: C.CallExpression,
            condition: function(e) {
                if (e.callee.type === C.MemberExpression && e.callee.property.type === C.Identifier && "bind" === e.callee.property.name) {
                    e = e.callee.object;
                    if (e.type === C.MemberExpression && "eval" === (e.property.type === C.Identifier && e.property.name || e.property.type === C.Literal && e.property.value))
                        return !0;
                    if (e.type === C.Identifier && "eval" === e.name)
                        return !0
                }
                return !1
            },
            run: function(e) {
                var e = e.callee
                  , t = _s(e.object);
                return Ns(e.object, t, e, "object"),
                null
            }
        }
          , Os = /^(call|apply)$/
          , Ce = {
            nodeReplacementRequireTransform: !1,
            nodeTypes: C.CallExpression,
            condition: function(e) {
                if (e.arguments.length < 2)
                    return !1;
                if (e.callee.type === C.MemberExpression && e.callee.property.type === C.Identifier && Os.test(e.callee.property.name)) {
                    e = e.callee.object;
                    if (e.type === C.Identifier && "eval" === e.name)
                        return !0;
                    if (e.type === C.MemberExpression && "eval" === (e.property.type === C.Identifier && e.property.name || e.property.type === C.Literal && e.property.value))
                        return !0
                }
                return !1
            },
            run: function(e) {
                var t = e.callee.property
                  , t = Es(e.arguments[1], "apply" === t.name);
                return Ns(e.arguments[1], t, e, "arguments"),
                null
            }
        }
          , t = {
            nodeReplacementRequireTransform: !1,
            nodeTypes: C.Identifier,
            condition: function(e, t) {
                return !("eval" !== e.name || !t) && ((t.type !== C.CallExpression || t.callee !== e) && (t.type !== C.MethodDefinition && (t.type !== C.ClassDeclaration && (t.type !== C.MemberExpression && ((t.type !== C.FunctionExpression && t.type !== C.FunctionDeclaration || t.id !== e) && ((t.type !== C.FunctionExpression && t.type !== C.FunctionDeclaration && t.type !== C.ArrowFunctionExpression || -1 === t.params.indexOf(e)) && ((t.type !== C.Property || t.key !== e) && ((t.type !== C.Property || t.value !== e || !t.shorthand) && ((t.type !== C.AssignmentExpression && t.type !== C.AssignmentPattern || t.left !== e) && ((t.type !== C.VariableDeclarator || t.id !== e) && ((t.type !== C.UpdateExpression || "++" !== t.operator && "--" !== t.operator) && ((t.type !== C.CallExpression || t.callee.type !== C.Identifier || t.callee.name !== v.getEval) && (t.type !== C.RestElement && (t.type !== C.ExportSpecifier && t.type !== C.ImportSpecifier))))))))))))))
            },
            run: _s
        }
          , Ls = {
            nodeReplacementRequireTransform: !1,
            nodeTypes: C.MemberExpression,
            condition: function(e, t) {
                return !!t && ((t.type !== C.MemberExpression || t.property !== e && t.object !== e) && ((t.type !== C.CallExpression || t.callee !== e) && ((t.type !== C.AssignmentExpression || t.left !== e) && ((t.type !== C.CallExpression || t.callee.type !== C.Identifier || t.callee.name !== v.getEval) && (e.property.type === C.Identifier && "eval" === e.property.name || e.property.type === C.Literal && "eval" === e.property.value)))))
            },
            run: _s
        }
          , ks = {
            nodeReplacementRequireTransform: !1,
            nodeTypes: C.Identifier,
            condition: function(e, t) {
                return !("postMessage" !== e.name || !t) && (t.type !== C.MemberExpression && (t.type !== C.MethodDefinition && (t.type !== C.ClassDeclaration && ((t.type !== C.FunctionExpression && t.type !== C.FunctionDeclaration || t.id !== e) && ((t.type !== C.FunctionExpression && t.type !== C.FunctionDeclaration && t.type !== C.ArrowFunctionExpression || -1 === t.params.indexOf(e)) && ((t.type !== C.Property || t.key !== e) && ((t.type !== C.Property || t.value !== e || !t.shorthand) && ((t.type !== C.AssignmentExpression && t.type !== C.AssignmentPattern || t.left !== e) && ((t.type !== C.VariableDeclarator || t.id !== e) && ((t.type !== C.UpdateExpression || "++" !== t.operator && "--" !== t.operator) && ((t.type !== C.CallExpression || t.callee.type !== C.Identifier || t.callee.name !== v.getPostMessage && (t.callee.name !== v.callMethod || t.arguments[1] !== e)) && (t.type !== C.RestElement && (t.type !== C.ExportSpecifier && t.type !== C.ImportSpecifier)))))))))))))
            },
            run: bs
        }
          , Ds = {
            nodeReplacementRequireTransform: !1,
            nodeTypes: C.MemberExpression,
            condition: function(e, t) {
                return !!t && ((t.type !== C.MemberExpression || t.property !== e && t.object !== e) && ((t.type !== C.CallExpression || t.callee !== e) && ((t.type !== C.AssignmentExpression || t.left !== e) && ((t.type !== C.CallExpression || t.callee.type !== C.Identifier || t.callee.name !== v.getPostMessage) && (e.property.type === C.Identifier && "postMessage" === e.property.name || e.property.type === C.Literal && "postMessage" === e.property.value)))))
            },
            run: bs
        }
          , Ms = /^(call|apply|bind)$/
          , Rs = {
            nodeReplacementRequireTransform: !1,
            nodeTypes: C.CallExpression,
            condition: function(e) {
                if (e.callee.type === C.MemberExpression && e.callee.property.type === C.Identifier && Ms.test(e.callee.property.name)) {
                    if (e.arguments.length < 2 && "bind" !== e.callee.property.name)
                        return !1;
                    e = e.callee.object;
                    if (e.type === C.MemberExpression && "postMessage" === (e.property.type === C.Identifier && e.property.name || e.property.type === C.Literal && e.property.value))
                        return !0;
                    if (e.type === C.Identifier && "postMessage" === e.name)
                        return !0
                }
                return !1
            },
            run: function(e) {
                var e = e.callee
                  , t = bs(e.object);
                return Ns(e.object, t, e, "object"),
                null
            }
        }
          , js = {
            nodeReplacementRequireTransform: !1,
            nodeTypes: C.ForInStatement,
            condition: function(e) {
                return e.left.type === C.MemberExpression
            },
            run: function(e) {
                var t = os(rs.generateName())
                  , r = vs("var", [ys(t)])
                  , t = ms(e.left, t);
                return e.body.type !== C.BlockStatement ? Ns(e.body, gs([t, e.body]), e, "body") : Ns(null, t, e.body, "body"),
                Ns(e.left, r, e, "left"),
                null
            }
        };
        function Hs(e) {
            var t = e.left
              , o = []
              , r = (null == (r = t.declarations[0]) ? void 0 : r.id.type) === C.ArrayPattern
              , n = e.body.type === C.BlockStatement;
            if (r && n) {
                for (var i = t.declarations[0].id, s = i.elements, r = e.body, a = function(e) {
                    for (var t = 0, r = s; t < r.length; t++) {
                        var n = r[t];
                        n && n.name === e.name && o.push(n)
                    }
                }, l = [], c = [], p = 0, u = r.body; p < u.length; p++) {
                    var h = u[p];
                    h.type === C.VariableDeclaration && l.push.apply(l, h.declarations)
                }
                for (var d = 0, f = l; d < f.length; d++) {
                    var m = f[d];
                    if (m.type === C.VariableDeclarator && (m.id.type === C.Identifier && c.push(m.id),
                    m.id.type === C.ArrayPattern && c.push.apply(c, m.id.elements),
                    m.id.type === C.ObjectPattern))
                        for (var g = 0, y = m.id.properties; g < y.length; g++) {
                            var v = y[g];
                            "value"in v && c.push(v.value)
                        }
                }
                for (var E = 0, S = c; E < S.length; E++) {
                    var _ = S[E];
                    _ && _.type === C.Identifier && a(_)
                }
                for (var b = 0, w = o; b < w.length; b++)
                    Ns(w[b], os(rs.generateName()), i, "elements")
            }
        }
        var Bs = {
            nodeReplacementRequireTransform: !1,
            nodeTypes: C.ForOfStatement,
            condition: function(e) {
                e = e.left;
                return (e = e.type === C.VariableDeclaration ? e.declarations[0].id : e).type === C.ObjectPattern || e.type === C.ArrayPattern
            },
            run: function(e) {
                var t, r, n = os(rs.generateName()), o = e.left;
                return o.type === C.VariableDeclaration ? (Hs(e),
                (r = vs(o.kind, [ys(o.declarations[0].id, n)])).reTransform = !0,
                Ns(o.declarations[0].id, n, o.declarations[0], "id")) : (t = vs("var", [ys(n)]),
                r = ms(o, n),
                Ns(o, t, e, "left")),
                e.body.type === C.BlockStatement ? Ns(null, r, e.body, "body") : Ns(e.body, gs([r, e.body]), e, "body"),
                null
            }
        }
          , Fs = {
            nodeReplacementRequireTransform: !1,
            nodeTypes: C.Identifier,
            condition: function(e, t) {
                return !("location" !== e.name || !t) && ((t.type !== C.VariableDeclarator || t.id !== e) && ((t.type !== C.AssignmentExpression && t.type !== C.AssignmentPattern || t.left !== e) && ((t.type !== C.FunctionExpression && t.type !== C.FunctionDeclaration || t.id !== e) && ((t.type !== C.MemberExpression || t.property !== e) && ((t.type !== C.Property || t.key !== e) && ((t.type !== C.Property || t.value !== e || !t.shorthand) && ((t.type !== C.UpdateExpression || "++" !== t.operator && "--" !== t.operator) && ((t.type !== C.FunctionExpression && t.type !== C.FunctionDeclaration && t.type !== C.ArrowFunctionExpression || -1 === t.params.indexOf(e)) && ((t.type !== C.CallExpression || t.callee.type !== C.Identifier || t.callee.name !== v.getLocation) && (t.type !== C.MethodDefinition && (t.type !== C.ClassDeclaration && (t.type !== C.RestElement && (t.type !== C.ExportSpecifier && t.type !== C.ImportSpecifier)))))))))))))
            },
            run: function(e) {
                return as(os(v.getLocation), [e])
            }
        }
          , Us = {
            nodeReplacementRequireTransform: !1,
            nodeTypes: C.AssignmentExpression,
            condition: function(e) {
                return "=" === e.operator && e.left.type === C.Identifier && "location" === e.left.name
            },
            run: function(e, t, r) {
                if (!t)
                    return null;
                r = "arguments" !== r && "consequent" !== r && "alternate" !== r && (t.type !== C.SequenceExpression || t.expressions[0] === e);
                return Ss(e.left, e.right, r)
            }
        }
          , Vs = {
            nodeReplacementRequireTransform: !0,
            nodeTypes: C.MemberExpression,
            condition: function(e, t) {
                return !(e.computed || !t) && (!(e.property.type === C.Identifier && !Ps(e.property.name)) && (e.object.type !== C.Super && ((t.type !== C.AssignmentExpression || t.left !== e) && ((t.type !== C.UnaryExpression || "delete" !== t.operator) && ((t.type !== C.CallExpression || t.callee !== e) && ((t.type !== C.UpdateExpression || "++" !== t.operator && "--" !== t.operator) && ((t.type !== C.NewExpression || t.callee !== e) && (t.type !== C.ForInStatement || t.left !== e))))))))
            },
            run: function(e) {
                return t = e.property.name,
                r = e.object,
                e = e.optional,
                n = os(v.getProperty),
                r = [r, fs(t)],
                (e = void 0 === e ? !1 : e) && r.push(fs(e)),
                as(n, r);
                var t, r, n
            }
        }
          , Gs = {
            nodeReplacementRequireTransform: !0,
            nodeTypes: C.AssignmentExpression,
            condition: function(e) {
                return (e.left.type !== C.MemberExpression || e.left.object.type !== C.Super) && ("=" === e.operator && e.left.type === C.MemberExpression && !e.left.computed && e.left.property.type === C.Identifier && Ps(e.left.property.name))
            },
            run: function(e) {
                var t = e.left
                  , r = t.property;
                return r = r.name,
                t = t.object,
                e = e.right,
                as(os(v.setProperty), [t, fs(r), e])
            }
        }
          , Ws = {
            nodeReplacementRequireTransform: !0,
            nodeTypes: C.CallExpression,
            condition: function(e) {
                e = e.callee;
                return e.type === C.MemberExpression && (e.object.type !== C.Super && (e.computed ? e.property.type !== C.Literal || As(e.property.value) : e.property.type === C.Identifier && As(e.property.name)))
            },
            run: function(e) {
                var t = e.callee
                  , r = t.computed ? t.property : fs(t.property.name);
                return t = t.object,
                e = e.arguments,
                as(os(v.callMethod), [t, r, ls(e)])
            }
        }
          , qs = {
            nodeReplacementRequireTransform: !0,
            nodeTypes: C.ExpressionStatement,
            condition: function(e, t) {
                return !!qs.wrapLastExpr && !!t && t.type === C.Program && t.body[t.body.length - 1] === e
            },
            run: function(e) {
                return qs.wrapLastExpr = !1,
                t = os(v.processHtml),
                r = os("parent"),
                n = os("window"),
                is(as(cs(r, t, !1), [n, e.expression]));
                var t, r, n
            }
        }
          , Ks = {
            nodeReplacementRequireTransform: !1,
            nodeTypes: C.Literal,
            condition: function(e, t) {
                return !!t && (t.type === C.ImportDeclaration || t.type === C.ExportAllDeclaration || t.type === C.ExportNamedDeclaration) && t.source === e
            },
            run: function(e) {
                return Ks.resolver ? fs((0,
                Ks.resolver)(String(e.value), it({
                    isScript: !0
                }))) : null
            }
        }
          , zs = {
            nodeReplacementRequireTransform: !0,
            nodeTypes: C.ImportExpression,
            condition: function() {
                return !0
            },
            run: function(e) {
                t = e.source,
                n = null == (n = zs.getBaseUrl) ? void 0 : n.call(zs),
                r = os(v.getProxyUrl),
                t = [t],
                n && t.push(fs(n));
                var t, r, n = as(r, t);
                return Ns(e.source, n, e, "source"),
                null
            }
        };
        function Xs(e, t, r) {
            if (e.type === C.Identifier && rs.isHHTempVariable(e.name))
                return e;
            r = os(r || rs.generateName(r));
            return t(r, e, !0),
            r
        }
        function $s(e, t, r, n) {
            if (t) {
                var o = e.properties
                  , e = o.length && o[o.length - 1].type === C.RestElement
                  , i = Xs(t, r, n)
                  , s = []
                  , a = [];
                if (n = n || i.name,
                e)
                    for (var l = 0; l < o.length - 1; l++) {
                        var c, p = (u = o[l]).key;
                        p.type === C.Identifier ? s.push(u.computed ? p : fs(p.name)) : p.type === C.Literal ? s.push(p) : (r(c = os(rs.generateName()), p, !0),
                        s.push(c),
                        u.key = c)
                    }
                for (var u, h, d, f, m, l = 0; l < o.length; l++)
                    (u = o[l]).type === C.RestElement ? r(u.argument, as(os(v.restObject), [i, ls(s)])) : (d = rs.generateName(n, (h = u).key, l),
                    -1 < a.indexOf(d) && (d = rs.generateName(d, void 0, l)),
                    a.push(d),
                    d = d,
                    m = f = void 0,
                    f = (h = h).value,
                    m = h.computed || h.key.type === C.Literal,
                    Js(f, cs(i, h.key, m), r, d))
            }
        }
        function Ys(e, t, r, n) {
            if (t) {
                t.type !== C.ArrayExpression && (o = t,
                t = as(os(v.arrayFrom), [o]));
                var o, i = Xs(t, r, n);
                n = n || i.name;
                for (var s, a = 0; a < e.elements.length; a++) {
                    var l = e.elements[a];
                    l && (l.type === C.RestElement ? (s = a,
                    t = as(os(v.restArray), [i, fs(s)]),
                    l = l.argument) : t = cs(i, fs(a), !0),
                    Js(l, t, r, rs.generateName(n, void 0, a)))
                }
            }
        }
        function Qs(e, t, r, n) {
            var o, i;
            t && (o = e.left,
            e = e.right,
            t = Xs(t, r, n),
            i = ps(t, "===", ds()),
            i = {
                type: C.ConditionalExpression,
                test: i,
                consequent: e,
                alternate: t
            },
            n = n || t.name,
            Js(o, i, r, n += "$assign"))
        }
        function Js(e, t, r, n) {
            e.type === C.ObjectPattern ? $s(e, t, r, n) : e.type === C.ArrayPattern ? Ys(e, t, r, n) : e.type === C.AssignmentPattern ? Qs(e, t, r, n) : r(e, t)
        }
        var Zs = {
            nodeReplacementRequireTransform: !0,
            nodeTypes: C.VariableDeclaration,
            condition: function(e, t) {
                if ((null == t ? void 0 : t.type) === C.ForInStatement)
                    return !1;
                for (var r = 0, n = e.declarations; r < n.length; r++) {
                    var o = n[r];
                    if (o.id.type === C.ObjectPattern || o.id.type === C.ArrayPattern)
                        return !0
                }
                return !1
            },
            run: function(e) {
                for (var r = [], t = 0, n = e.declarations; t < n.length; t++) {
                    var o = n[t];
                    Js(o.id, o.init || null, function(e, t) {
                        return r.push(ys(e, t))
                    })
                }
                return vs(e.kind, r)
            }
        }
          , ea = {
            nodeReplacementRequireTransform: !0,
            nodeTypes: C.AssignmentExpression,
            condition: function(e) {
                return "=" === e.operator && (e.left.type === C.ObjectPattern || e.left.type === C.ArrayPattern)
            },
            run: function(e, t, r, n) {
                var o = []
                  , i = !0
                  , s = null;
                return Js(e.left, e.right, function(e, t, r) {
                    i && (i = !1,
                    r && (s = e)),
                    o.push(ss(e, "=", t)),
                    r && n && n.append(e.name)
                }),
                s && o.push(s),
                us(o)
            }
        };
        function ta(e) {
            return {
                nodeReplacementRequireTransform: !1,
                nodeTypes: e,
                condition: function(e) {
                    for (var t = 0, r = e.params; t < r.length; t++) {
                        var n = r[t];
                        if ((n = n.type === C.AssignmentPattern ? n.left : n).type === C.ObjectPattern || n.type === C.ArrayPattern)
                            return !0
                    }
                    return !1
                },
                run: function(e) {
                    for (var t = [], r = 0, n = e.params; r < n.length; r++) {
                        var o, i = n[r], s = e, a = "params";
                        i.type === C.AssignmentPattern && (i = (s = i).left,
                        a = "left"),
                        (i.type === C.ObjectPattern && i.properties.length || i.type === C.ArrayPattern && i.elements.length) && (Ns(i, o = os(rs.generateName()), s, a),
                        t.push(ys(i, o)))
                    }
                    if (!t.length)
                        return null;
                    var l, c = vs("var", t);
                    return e.body.type !== C.BlockStatement ? (l = hs(e.body),
                    Ns(e.body, gs([c, l]), e, "body"),
                    e.expression = !1,
                    e) : (Ns(null, c, e.body, "body"),
                    c.reTransform = !0,
                    null)
                }
            }
        }
        var ra = [ta(C.FunctionDeclaration), ta(C.FunctionExpression), ta(C.ArrowFunctionExpression), ea, ce, n, i, _e, s, Ce, t, Ls, ks, Ds, Rs, js, Bs, Fs, Us, Vs, Gs, Ws, qs, Ks, zs, Zs];
        var na = function() {
            for (var e = new Map, t = 0, r = ra; t < r.length; t++) {
                var n = r[t]
                  , o = n.nodeTypes
                  , i = e.get(o);
                i || e.set(o, i = []),
                i.push(n)
            }
            return e
        }()
          , oa = [/^\s*at .*\((\S+)\)/, /^\s*at (\S+)/, /^.*@(\S+)/, /(.+)/]
          , ia = /(?:^|\n)(?:\s*at |.*@)(?:.*\()?(\S+?):\d+:\d+\)?/g
          , sa = /:\d+:\d+$/;
        function aa(e) {
            e = ht(e);
            return e && e.destUrl
        }
        function la(e, t) {
            var r = aa(t = t.replace(sa, ""));
            return r ? e.replace(t, r) : e
        }
        function ca(e) {
            if (!e)
                return e;
            for (var t = e.split("\n"), r = 0; r < t.length; r++)
                for (var n = t[r], o = 0, i = oa; o < i.length; o++) {
                    var s = i[o];
                    if (s.test(n)) {
                        t[r] = n.replace(s, la);
                        break
                    }
                }
            return t.join("\n")
        }
        function pa(e) {
            if (!e)
                return null;
            for (var t = ia.exec(e); t; ) {
                var r = aa(t[1]);
                if (r)
                    return ia.lastIndex = 0,
                    r;
                t = ia.exec(e)
            }
            return null
        }
        var ua = Object.freeze({
            __proto__: null,
            replaceProxiedUrlsInStack: ca,
            getFirstDestUrl: pa
        })
          , ha = (da.create = function(e, t, r, n, o) {
            void 0 === o && (o = !1);
            var i = t.type === C.NewExpression && !e.newExpressionAncestor
              , s = new da;
            return s.hasTransformedAncestor = e.hasTransformedAncestor || o,
            s.newExpressionAncestor = i ? t : e.newExpressionAncestor,
            s.newExpressionAncestorParent = i ? r : e.newExpressionAncestorParent,
            s.newExpressionAncestorKey = i ? n : e.newExpressionAncestorKey,
            s
        }
        ,
        da);
        function da() {
            this.hasTransformedAncestor = !1
        }
        var fa = Object.prototype.toString
          , ma = Object.keys;
        function ga(e, t) {
            return {
                start: e.originStart,
                end: e.originEnd,
                node: e,
                parentType: t
            }
        }
        function ya(e, t, r, n) {
            for (var o = 0, i = ma(e); o < i.length; o++) {
                var s = i[o]
                  , a = e[s]
                  , l = fa.call(a);
                if ("[object Array]" === l)
                    for (var c = 0, p = a; c < p.length; c++) {
                        var u = p[c];
                        u && ba(u, t, r, e, s, n)
                    }
                else
                    "[object Object]" === l && ba(a, t, r, e, s, n)
            }
        }
        function va(e) {
            return void 0 !== e.originStart && void 0 !== e.originEnd
        }
        function Ea(e, t, r, n) {
            e.hasTransformedAncestor || e.newExpressionAncestor && va(e.newExpressionAncestor) || (e.newExpressionAncestor && e.newExpressionAncestorParent ? (Ns(e.newExpressionAncestor, e.newExpressionAncestor, e.newExpressionAncestorParent, e.newExpressionAncestorKey),
            t.push(ga(e.newExpressionAncestor, e.newExpressionAncestorParent.type))) : t.push(ga(r, n)))
        }
        function Sa(e, t, r, n) {
            var n = n.get();
            n.length && (Ns(null, n = function(e) {
                for (var t = [], r = 0, n = e; r < n.length; r++) {
                    var o = n[r];
                    t.push(ys(os(o)))
                }
                return vs("var", t)
            }(n), e, "body"),
            Ea(r, t, n, e.type))
        }
        function _a(e, t) {
            var r = na.get(e.type);
            if (r)
                for (var n = 0, o = r; n < o.length; n++) {
                    var i = o[n];
                    if (i.condition(e, t))
                        return i
                }
            return null
        }
        function ba(e, t, r, n, o, i) {
            var s = e.type === C.BlockStatement
              , a = !1;
            if (s && (i = new rs),
            !e.reTransform && va(e))
                Ea(r, t, e, n.type),
                a = !0;
            else {
                for (var l = e, c = _a(e, n), p = null; c && (p = c.run(p || e, n, o, i)) && (a = !0,
                c.nodeReplacementRequireTransform); )
                    c = _a(p, n),
                    e = p;
                a && p && (Ns(l, p, n, o),
                Ea(r, t, p, n.type))
            }
            ya(e, t, r = ha.create(r, e, n, o, a), i),
            s && Sa(e, t, r, i)
        }
        function wa(e, t, r) {
            void 0 === t && (t = !1);
            var n, o = [], i = new ha, s = new rs;
            return rs.resetCounter(),
            t = t,
            n = r,
            qs.wrapLastExpr = t = void 0 === t ? !1 : t,
            Ks.resolver = n,
            t = "undefined" == typeof window,
            zs.getBaseUrl = t ? function() {
                return void 0 === zs.baseUrl && (zs.baseUrl = n ? ht(n("./")).destUrl : ""),
                zs.baseUrl
            }
            : function() {
                var e;
                return void 0 === zs.baseUrl && (e = (new Error).stack,
                zs.baseUrl = e && pa(e) || ""),
                zs.baseUrl
            }
            ,
            ya(e, o, i, s),
            Sa(e, o, i, s),
            qs.wrapLastExpr = !1,
            Ks.resolver = void 0,
            zs.baseUrl = void 0,
            o
        }
        function xa(e) {
            return e.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&")
        }
        var Ca = JSON.parse
          , Ta = JSON.stringify;
        var Aa = Object.freeze({
            __proto__: null,
            parse: Ca,
            stringify: Ta,
            isSerializable: function e(t) {
                if (t) {
                    if ("function" == typeof t || (n = t) && n.jquery || (n = t,
                    "object" == typeof Node ? n instanceof Node : "number" == typeof n.nodeType && "string" == typeof n.nodeName))
                        return !1;
                    if ("object" == typeof t)
                        for (var r in t)
                            if (t.hasOwnProperty(r) && !e(t[r]))
                                return !1
                }
                var n;
                return !0
            }
        })
          , ea = "/*hammerhead|script|start*/"
          , Pa = "/*hammerhead|script|end*/"
          , ce = "/*hammerhead|script|processing-header-end*/"
          , Ia = "{strict-placeholder}"
          , Na = "{sw-scope-header-value}"
          , Oa = ("\n    " + ea + "\n    " + Ia + "\n    " + Na + "\n\n    if (typeof window !== 'undefined' && window){\n        window['" + _.processDomMethodName + "'] && window['" + _.processDomMethodName + "']();\n\n        if (window." + v.getProperty + " && typeof " + v.getProperty + " === 'undefined')\n            var " + v.getLocation + " = window." + v.getLocation + ",\n                " + v.setLocation + " = window." + v.setLocation + ",\n                " + v.setProperty + " = window." + v.setProperty + ",\n                " + v.getProperty + " = window." + v.getProperty + ",\n                " + v.callMethod + " = window." + v.callMethod + ",\n                " + v.getEval + " = window." + v.getEval + ",\n                " + v.processScript + " = window." + v.processScript + ",\n                " + v.processHtml + " = window." + v.processHtml + ",\n                " + v.getPostMessage + " = window." + v.getPostMessage + ",\n                " + v.getProxyUrl + " = window." + v.getProxyUrl + ",\n                " + v.restArray + " = window." + v.restArray + ",\n                " + v.restObject + " = window." + v.restObject + ",\n                " + v.arrayFrom + " = window." + v.arrayFrom + ";\n    } else {\n        if (typeof " + v.getProperty + " === 'undefined')\n            var " + v.getLocation + " = function(l){return l},\n                " + v.setLocation + " = function(l,v){return l = v},\n                " + v.setProperty + " = function(o,p,v){return o[p] = v},\n                " + v.getProperty + " = function(o,p){return o[p]},\n                " + v.callMethod + " = function(o,p,a){return o[p].apply(o,a)},\n                " + v.getEval + " = function(e){return e},\n                " + v.processScript + " = function(s){return s},\n                " + v.processHtml + " = function(h){return h},\n                " + v.getPostMessage + " = function(w,p){return arguments.length===1?w.postMessage:p},\n                " + v.getProxyUrl + " = function(u,d){return u},\n                " + v.restArray + " = function(a,i){return Array.prototype.slice.call(a, i)},\n                " + v.restObject + " = function(o,p){var k=Object.keys(o),n={};for(var i=0;i<k.length;++i)if(p.indexOf(k[i])<0)n[k[i]]=o[k[i]];return n},\n                " + v.arrayFrom + ' = function(r){if(!r)return r;return!Array.isArray(r)&&"function"==typeof r[Symbol.iterator]?Array.from(r):r};\n        if (typeof importScripts !== "undefined" && /\\[native code]/g.test(importScripts.toString()))\n            importScripts((location.origin || (location.protocol + "//" + location.host)) + "/worker-hammerhead.js");\n    }\n    ' + ce + "\n").replace(/\n(?!$)\s*/g, "")
          , La = new RegExp(xa(ea) + "[\\S\\s]+?" + xa(ce) + "\n?","gi")
          , ka = new RegExp("\n?" + xa(Pa) + "\\s*","gi");
        function Da(e) {
            return e.replace(La, "").replace(ka, "")
        }
        function Ma(e, t, r) {
            return Oa.replace(Ia, t ? '"use strict";' : "").replace(Na, r ? "var " + v.swScopeHeaderValue + " = " + Ta(r) + ";" : "") + e + "\n" + Pa
        }
        function Ra() {
            this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1
        }
        var ja = Object.freeze({
            __proto__: null,
            SCRIPT_PROCESSING_START_COMMENT: ea,
            SCRIPT_PROCESSING_END_COMMENT: Pa,
            SCRIPT_PROCESSING_END_HEADER_COMMENT: ce,
            remove: Da,
            add: Ma
        })
          , Ha = j(function(e, t) {
            t.__esModule = !0,
            t.isIdentifierChar = function(e, t) {
                return e < 48 ? 36 === e : e < 58 || !(e < 65) && (e < 91 || (e < 97 ? 95 === e : e < 123 || (e <= 65535 ? 170 <= e && o.test(String.fromCharCode(e)) : !1 !== t && (a(e, i) || a(e, s)))))
            }
            ,
            t.isIdentifierStart = function(e, t) {
                return e < 65 ? 36 === e : e < 91 || (e < 97 ? 95 === e : e < 123 || (e <= 65535 ? 170 <= e && n.test(String.fromCharCode(e)) : !1 !== t && a(e, i)))
            }
            ,
            t.reservedWords = t.keywords = t.keywordRelationalOperator = void 0;
            t.reservedWords = {
                3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
                5: "class enum extends super const export import",
                6: "enum",
                strict: "implements interface let package private protected public static yield",
                strictBind: "eval arguments"
            };
            var r = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this"
              , r = (t.keywords = {
                5: r,
                "5module": r + " export import",
                6: r + " const class extends export import super"
            },
            t.keywordRelationalOperator = /^in(stanceof)?$/,
            "ªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽͿΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԯԱ-Ֆՙՠ-ֈא-תׯ-ײؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘࡠ-ࡪࡰ-ࢇࢉ-ࢎࢠ-ࣉऄ-हऽॐक़-ॡॱ-ঀঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱৼਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡૹଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-హఽౘ-ౚౝౠౡಀಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೝೞೠೡೱೲഄ-ഌഎ-ഐഒ-ഺഽൎൔ-ൖൟ-ൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆก-ะาำเ-ๆກຂຄຆ-ຊຌ-ຣລວ-ະາຳຽເ-ໄໆໜ-ໟༀཀ-ཇཉ-ཬྈ-ྌက-ဪဿၐ-ၕၚ-ၝၡၥၦၮ-ၰၵ-ႁႎႠ-ჅჇჍა-ჺჼ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏽᏸ-ᏽᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛸᜀ-ᜑᜟ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰក-ឳៗៜᠠ-ᡸᢀ-ᢨᢪᢰ-ᣵᤀ-ᤞᥐ-ᥭᥰ-ᥴᦀ-ᦫᦰ-ᧉᨀ-ᨖᨠ-ᩔᪧᬅ-ᬳᭅ-ᭌᮃ-ᮠᮮᮯᮺ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᲀ-ᲈᲐ-ᲺᲽ-Ჿᳩ-ᳬᳮ-ᳳᳵᳶᳺᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕ℘-ℝℤΩℨK-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⰀ-ⳤⳫ-ⳮⳲⳳⴀ-ⴥⴧⴭⴰ-ⵧⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞ々-〇〡-〩〱-〵〸-〼ぁ-ゖ゛-ゟァ-ヺー-ヿㄅ-ㄯㄱ-ㆎㆠ-ㆿㇰ-ㇿ㐀-䶿一-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚝꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꟊꟐꟑꟓꟕ-ꟙꟲ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꣽꣾꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꧠ-ꧤꧦ-ꧯꧺ-ꧾꨀ-ꨨꩀ-ꩂꩄ-ꩋꩠ-ꩶꩺꩾ-ꪯꪱꪵꪶꪹ-ꪽꫀꫂꫛ-ꫝꫠ-ꫪꫲ-ꫴꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꬰ-ꭚꭜ-ꭩꭰ-ꯢ가-힣ힰ-ퟆퟋ-ퟻ豈-舘並-龎ﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚｦ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ")
              , n = new RegExp("[" + r + "]")
              , o = new RegExp("[" + r + "‌‍·̀-ͯ·҃-֑҇-ׇֽֿׁׂׅׄؐ-ًؚ-٩ٰۖ-ۜ۟-۪ۤۧۨ-ۭ۰-۹ܑܰ-݊ަ-ް߀-߉߫-߽߳ࠖ-࠙ࠛ-ࠣࠥ-ࠧࠩ-࡙࠭-࡛࢘-࢟࣊-ࣣ࣡-ःऺ-़ा-ॏ॑-ॗॢॣ०-९ঁ-ঃ়া-ৄেৈো-্ৗৢৣ০-৯৾ਁ-ਃ਼ਾ-ੂੇੈੋ-੍ੑ੦-ੱੵઁ-ઃ઼ા-ૅે-ૉો-્ૢૣ૦-૯ૺ-૿ଁ-ଃ଼ା-ୄେୈୋ-୍୕-ୗୢୣ୦-୯ஂா-ூெ-ைொ-்ௗ௦-௯ఀ-ఄ఼ా-ౄె-ైొ-్ౕౖౢౣ౦-౯ಁ-ಃ಼ಾ-ೄೆ-ೈೊ-್ೕೖೢೣ೦-೯ഀ-ഃ഻഼ാ-ൄെ-ൈൊ-്ൗൢൣ൦-൯ඁ-ඃ්ා-ුූෘ-ෟ෦-෯ෲෳัิ-ฺ็-๎๐-๙ັິ-ຼ່-ໍ໐-໙༘༙༠-༩༹༵༷༾༿ཱ-྄྆྇ྍ-ྗྙ-ྼ࿆ါ-ှ၀-၉ၖ-ၙၞ-ၠၢ-ၤၧ-ၭၱ-ၴႂ-ႍႏ-ႝ፝-፟፩-፱ᜒ-᜕ᜲ-᜴ᝒᝓᝲᝳ឴-៓៝០-៩᠋-᠍᠏-᠙ᢩᤠ-ᤫᤰ-᤻᥆-᥏᧐-᧚ᨗ-ᨛᩕ-ᩞ᩠-᩿᩼-᪉᪐-᪙᪰-᪽ᪿ-ᫎᬀ-ᬄ᬴-᭄᭐-᭙᭫-᭳ᮀ-ᮂᮡ-ᮭ᮰-᮹᯦-᯳ᰤ-᰷᱀-᱉᱐-᱙᳐-᳔᳒-᳨᳭᳴᳷-᳹᷀-᷿‿⁀⁔⃐-⃥⃜⃡-⃰⳯-⵿⳱ⷠ-〪ⷿ-゙゚〯꘠-꘩꙯ꙴ-꙽ꚞꚟ꛰꛱ꠂ꠆ꠋꠣ-ꠧ꠬ꢀꢁꢴ-ꣅ꣐-꣙꣠-꣱ꣿ-꤉ꤦ-꤭ꥇ-꥓ꦀ-ꦃ꦳-꧀꧐-꧙ꧥ꧰-꧹ꨩ-ꨶꩃꩌꩍ꩐-꩙ꩻ-ꩽꪰꪲ-ꪴꪷꪸꪾ꪿꫁ꫫ-ꫯꫵ꫶ꯣ-ꯪ꯬꯭꯰-꯹ﬞ︀-️︠-︯︳︴﹍-﹏０-９＿]")
              , i = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1070, 4050, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 46, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 482, 44, 11, 6, 17, 0, 322, 29, 19, 43, 1269, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4152, 8, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938]
              , s = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 357, 0, 62, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
            function a(e, t) {
                for (var r = 65536, n = 0; n < t.length; n += 2) {
                    if (e < (r += t[n]))
                        return !1;
                    if (e <= (r += t[n + 1]))
                        return !0
                }
            }
        })
          , E = j(function(e, t) {
            t.__esModule = !0,
            t.types = t.keywords = t.TokenType = void 0;
            var r = function(e, t) {
                void 0 === t && (t = {}),
                this.label = e,
                this.keyword = t.keyword,
                this.beforeExpr = !!t.beforeExpr,
                this.startsExpr = !!t.startsExpr,
                this.isLoop = !!t.isLoop,
                this.isAssign = !!t.isAssign,
                this.prefix = !!t.prefix,
                this.postfix = !!t.postfix,
                this.binop = t.binop || null,
                this.updateContext = null
            };
            function n(e, t) {
                return new r(e,{
                    beforeExpr: !0,
                    binop: t
                })
            }
            t.TokenType = r;
            var o = {
                beforeExpr: !0
            }
              , i = {
                startsExpr: !0
            }
              , s = {};
            function a(e, t) {
                return (t = void 0 === t ? {} : t).keyword = e,
                s[e] = new r(e,t)
            }
            t.keywords = s;
            o = {
                num: new r("num",i),
                regexp: new r("regexp",i),
                string: new r("string",i),
                name: new r("name",i),
                privateId: new r("privateId",i),
                eof: new r("eof"),
                bracketL: new r("[",{
                    beforeExpr: !0,
                    startsExpr: !0
                }),
                bracketR: new r("]"),
                braceL: new r("{",{
                    beforeExpr: !0,
                    startsExpr: !0
                }),
                braceR: new r("}"),
                parenL: new r("(",{
                    beforeExpr: !0,
                    startsExpr: !0
                }),
                parenR: new r(")"),
                comma: new r(",",o),
                semi: new r(";",o),
                colon: new r(":",o),
                dot: new r("."),
                question: new r("?",o),
                questionDot: new r("?."),
                arrow: new r("=>",o),
                template: new r("template"),
                invalidTemplate: new r("invalidTemplate"),
                ellipsis: new r("...",o),
                backQuote: new r("`",i),
                dollarBraceL: new r("${",{
                    beforeExpr: !0,
                    startsExpr: !0
                }),
                eq: new r("=",{
                    beforeExpr: !0,
                    isAssign: !0
                }),
                assign: new r("_=",{
                    beforeExpr: !0,
                    isAssign: !0
                }),
                incDec: new r("++/--",{
                    prefix: !0,
                    postfix: !0,
                    startsExpr: !0
                }),
                prefix: new r("!/~",{
                    beforeExpr: !0,
                    prefix: !0,
                    startsExpr: !0
                }),
                logicalOR: n("||", 1),
                logicalAND: n("&&", 2),
                bitwiseOR: n("|", 3),
                bitwiseXOR: n("^", 4),
                bitwiseAND: n("&", 5),
                equality: n("==/!=/===/!==", 6),
                relational: n("</>/<=/>=", 7),
                bitShift: n("<</>>/>>>", 8),
                plusMin: new r("+/-",{
                    beforeExpr: !0,
                    binop: 9,
                    prefix: !0,
                    startsExpr: !0
                }),
                modulo: n("%", 10),
                star: n("*", 10),
                slash: n("/", 10),
                starstar: new r("**",{
                    beforeExpr: !0
                }),
                coalesce: n("??", 1),
                _break: a("break"),
                _case: a("case", o),
                _catch: a("catch"),
                _continue: a("continue"),
                _debugger: a("debugger"),
                _default: a("default", o),
                _do: a("do", {
                    isLoop: !0,
                    beforeExpr: !0
                }),
                _else: a("else", o),
                _finally: a("finally"),
                _for: a("for", {
                    isLoop: !0
                }),
                _function: a("function", i),
                _if: a("if"),
                _return: a("return", o),
                _switch: a("switch"),
                _throw: a("throw", o),
                _try: a("try"),
                _var: a("var"),
                _const: a("const"),
                _while: a("while", {
                    isLoop: !0
                }),
                _with: a("with"),
                _new: a("new", {
                    beforeExpr: !0,
                    startsExpr: !0
                }),
                _this: a("this", i),
                _super: a("super", i),
                _class: a("class", i),
                _extends: a("extends", o),
                _export: a("export"),
                _import: a("import", i),
                _null: a("null", i),
                _true: a("true", i),
                _false: a("false", i),
                _in: a("in", {
                    beforeExpr: !0,
                    binop: 7
                }),
                _instanceof: a("instanceof", {
                    beforeExpr: !0,
                    binop: 7
                }),
                _typeof: a("typeof", {
                    beforeExpr: !0,
                    prefix: !0,
                    startsExpr: !0
                }),
                _void: a("void", {
                    beforeExpr: !0,
                    prefix: !0,
                    startsExpr: !0
                }),
                _delete: a("delete", {
                    beforeExpr: !0,
                    prefix: !0,
                    startsExpr: !0
                })
            };
            t.types = o
        })
          , T = j(function(e, t) {
            t.__esModule = !0,
            t.isNewLine = i,
            t.lineBreakG = t.lineBreak = void 0,
            t.nextLineBreak = function(e, t, r) {
                void 0 === r && (r = e.length);
                for (var n = t; n < r; n++) {
                    var o = e.charCodeAt(n);
                    if (i(o))
                        return n < r - 1 && 13 === o && 10 === e.charCodeAt(n + 1) ? n + 2 : n + 1
                }
                return -1
            }
            ,
            t.skipWhiteSpace = t.nonASCIIwhitespace = void 0;
            var r = /\r\n?|\n|\u2028|\u2029/
              , r = (t.lineBreak = r,
            new RegExp(r.source,"g"));
            function i(e) {
                return 10 === e || 13 === e || 8232 === e || 8233 === e
            }
            t.lineBreakG = r;
            t.nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
            t.skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g
        })
          , Ba = j(function(e, t) {
            t.__esModule = !0,
            t.loneSurrogate = t.isArray = t.hasOwn = void 0,
            t.wordsRegexp = function(e) {
                return new RegExp("^(?:" + e.replace(/ /g, "|") + ")$")
            }
            ;
            var r = Object.prototype
              , n = r.hasOwnProperty
              , o = r.toString
              , r = Object.hasOwn || function(e, t) {
                return n.call(e, t)
            }
              , r = (t.hasOwn = r,
            Array.isArray || function(e) {
                return "[object Array]" === o.call(e)
            }
            );
            t.isArray = r;
            t.loneSurrogate = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/
        })
          , Fa = j(function(e, t) {
            t.__esModule = !0,
            t.SourceLocation = t.Position = void 0,
            t.getLineInfo = function(e, t) {
                for (var r = 1, n = 0; ; ) {
                    var o = (0,
                    T.nextLineBreak)(e, n, t);
                    if (o < 0)
                        return new i(r,t - n);
                    ++r,
                    n = o
                }
            }
            ;
            r.prototype.offset = function(e) {
                return new r(this.line,this.column + e)
            }
            ;
            var i = r;
            function r(e, t) {
                this.line = e,
                this.column = t
            }
            t.Position = i,
            t.SourceLocation = function(e, t, r) {
                this.start = t,
                this.end = r,
                null !== e.sourceFile && (this.source = e.sourceFile)
            }
        })
          , Ua = j(function(e, t) {
            t.__esModule = !0,
            t.defaultOptions = void 0;
            var o = {
                ecmaVersion: null,
                sourceType: "script",
                onInsertedSemicolon: null,
                onTrailingComma: null,
                allowReserved: null,
                allowReturnOutsideFunction: !(t.getOptions = function(e) {
                    var t, r = {};
                    for (t in o)
                        r[t] = (e && (0,
                        Ba.hasOwn)(e, t) ? e : o)[t];
                    "latest" === r.ecmaVersion ? r.ecmaVersion = 1e8 : null == r.ecmaVersion ? (!i && "object" == typeof console && console.warn && (i = !0,
                    console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.")),
                    r.ecmaVersion = 11) : 2015 <= r.ecmaVersion && (r.ecmaVersion -= 2009);
                    null == r.allowReserved && (r.allowReserved = r.ecmaVersion < 5);
                    {
                        var n;
                        (0,
                        Ba.isArray)(r.onToken) && (n = r.onToken,
                        r.onToken = function(e) {
                            return n.push(e)
                        }
                        )
                    }
                    (0,
                    Ba.isArray)(r.onComment) && (r.onComment = function(s, a) {
                        return function(e, t, r, n, o, i) {
                            e = {
                                type: e ? "Block" : "Line",
                                value: t,
                                start: r,
                                end: n
                            };
                            s.locations && (e.loc = new Fa.SourceLocation(this,o,i)),
                            s.ranges && (e.range = [r, n]),
                            a.push(e)
                        }
                    }(r, r.onComment));
                    return r
                }
                ),
                allowImportExportEverywhere: !1,
                allowAwaitOutsideFunction: null,
                allowSuperOutsideMethod: null,
                allowHashBang: !1,
                locations: !1,
                onToken: null,
                onComment: null,
                ranges: !1,
                program: null,
                sourceFile: null,
                directSourceFile: null,
                preserveParens: !1
            }
              , i = (t.defaultOptions = o,
            !1)
        })
          , A = j(function(e, t) {
            t.__esModule = !0,
            t.SCOPE_VAR = t.SCOPE_TOP = t.SCOPE_SUPER = t.SCOPE_SIMPLE_CATCH = t.SCOPE_GENERATOR = t.SCOPE_FUNCTION = t.SCOPE_DIRECT_SUPER = t.SCOPE_CLASS_STATIC_BLOCK = t.SCOPE_ASYNC = t.SCOPE_ARROW = t.BIND_VAR = t.BIND_SIMPLE_CATCH = t.BIND_OUTSIDE = t.BIND_NONE = t.BIND_LEXICAL = t.BIND_FUNCTION = void 0,
            t.functionFlags = function(e, t) {
                return r | (e ? n : 0) | (t ? o : 0)
            }
            ;
            var r = 2
              , n = 4
              , o = 8;
            t.SCOPE_VAR = 257 | r,
            t.SCOPE_CLASS_STATIC_BLOCK = 256,
            t.SCOPE_DIRECT_SUPER = 128,
            t.SCOPE_SUPER = 64,
            t.SCOPE_SIMPLE_CATCH = 32,
            t.SCOPE_ARROW = 16,
            t.SCOPE_GENERATOR = o,
            t.SCOPE_ASYNC = n,
            t.SCOPE_FUNCTION = r,
            t.SCOPE_TOP = 1;
            t.BIND_OUTSIDE = 5,
            t.BIND_SIMPLE_CATCH = 4,
            t.BIND_FUNCTION = 3,
            t.BIND_LEXICAL = 2,
            t.BIND_VAR = 1,
            t.BIND_NONE = 0
        })
          , Va = j(function(e, t) {
            t.__esModule = !0,
            t.Parser = void 0;
            n.prototype.parse = function() {
                var e = this.options.program || this.startNode();
                return this.nextToken(),
                this.parseTopLevel(e)
            }
            ,
            Object.defineProperty(n.prototype, "inFunction", {
                get: function() {
                    return 0 < (this.currentVarScope().flags & A.SCOPE_FUNCTION)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "inGenerator", {
                get: function() {
                    return 0 < (this.currentVarScope().flags & A.SCOPE_GENERATOR) && !this.currentVarScope().inClassFieldInit
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "inAsync", {
                get: function() {
                    return 0 < (this.currentVarScope().flags & A.SCOPE_ASYNC) && !this.currentVarScope().inClassFieldInit
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "canAwait", {
                get: function() {
                    for (var e = this.scopeStack.length - 1; 0 <= e; e--) {
                        var t = this.scopeStack[e];
                        if (t.inClassFieldInit || t.flags & A.SCOPE_CLASS_STATIC_BLOCK)
                            return !1;
                        if (t.flags & A.SCOPE_FUNCTION)
                            return 0 < (t.flags & A.SCOPE_ASYNC)
                    }
                    return this.inModule && 13 <= this.options.ecmaVersion || this.options.allowAwaitOutsideFunction
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "allowSuper", {
                get: function() {
                    var e = this.currentThisScope()
                      , t = e.flags
                      , e = e.inClassFieldInit;
                    return 0 < (t & A.SCOPE_SUPER) || e || this.options.allowSuperOutsideMethod
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "allowDirectSuper", {
                get: function() {
                    return 0 < (this.currentThisScope().flags & A.SCOPE_DIRECT_SUPER)
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "treatFunctionsAsVar", {
                get: function() {
                    return this.treatFunctionsAsVarInScope(this.currentScope())
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "allowNewDotTarget", {
                get: function() {
                    var e = this.currentThisScope()
                      , t = e.flags
                      , e = e.inClassFieldInit;
                    return 0 < (t & (A.SCOPE_FUNCTION | A.SCOPE_CLASS_STATIC_BLOCK)) || e
                },
                enumerable: !0,
                configurable: !0
            }),
            Object.defineProperty(n.prototype, "inClassStaticBlock", {
                get: function() {
                    return 0 < (this.currentVarScope().flags & A.SCOPE_CLASS_STATIC_BLOCK)
                },
                enumerable: !0,
                configurable: !0
            }),
            n.extend = function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                for (var r = this, n = 0; n < e.length; n++)
                    r = e[n](r);
                return r
            }
            ,
            n.parse = function(e, t) {
                return new this(t,e).parse()
            }
            ,
            n.parseExpressionAt = function(e, t, r) {
                r = new this(r,e,t);
                return r.nextToken(),
                r.parseExpression()
            }
            ,
            n.tokenizer = function(e, t) {
                return new this(t,e)
            }
            ;
            var r = n;
            function n(e, t, r) {
                this.options = e = (0,
                Ua.getOptions)(e),
                this.sourceFile = e.sourceFile,
                this.keywords = (0,
                Ba.wordsRegexp)(Ha.keywords[6 <= e.ecmaVersion ? 6 : "module" === e.sourceType ? "5module" : 5]);
                var n = ""
                  , n = (!0 !== e.allowReserved && (n = Ha.reservedWords[6 <= e.ecmaVersion ? 6 : 5 === e.ecmaVersion ? 5 : 3],
                "module" === e.sourceType && (n += " await")),
                this.reservedWords = (0,
                Ba.wordsRegexp)(n),
                (n ? n + " " : "") + Ha.reservedWords.strict);
                this.reservedWordsStrict = (0,
                Ba.wordsRegexp)(n),
                this.reservedWordsStrictBind = (0,
                Ba.wordsRegexp)(n + " " + Ha.reservedWords.strictBind),
                this.input = String(t),
                this.containsEsc = !1,
                r ? (this.pos = r,
                this.lineStart = this.input.lastIndexOf("\n", r - 1) + 1,
                this.curLine = this.input.slice(0, this.lineStart).split(T.lineBreak).length) : (this.pos = this.lineStart = 0,
                this.curLine = 1),
                this.type = E.types.eof,
                this.value = null,
                this.start = this.end = this.pos,
                this.startLoc = this.endLoc = this.curPosition(),
                this.lastTokEndLoc = this.lastTokStartLoc = null,
                this.lastTokStart = this.lastTokEnd = this.pos,
                this.context = this.initialContext(),
                this.exprAllowed = !0,
                this.inModule = "module" === e.sourceType,
                this.strict = this.inModule || this.strictDirective(this.pos),
                this.potentialArrowAt = -1,
                this.potentialArrowInForAwait = !1,
                this.yieldPos = this.awaitPos = this.awaitIdentPos = 0,
                this.labels = [],
                this.undefinedExports = Object.create(null),
                0 === this.pos && e.allowHashBang && "#!" === this.input.slice(0, 2) && this.skipLineComment(2),
                this.scopeStack = [],
                this.enterScope(A.SCOPE_TOP),
                this.regexpState = null,
                this.privateNameStack = []
            }
            t.Parser = r
        })
          , n = Va.Parser.prototype
          , Ga = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;
        n.strictDirective = function(e) {
            for (; ; ) {
                T.skipWhiteSpace.lastIndex = e,
                e += T.skipWhiteSpace.exec(this.input)[0].length;
                var t = Ga.exec(this.input.slice(e));
                if (!t)
                    return !1;
                if ("use strict" === (t[1] || t[2]))
                    return !1;
                e += t[0].length,
                T.skipWhiteSpace.lastIndex = e,
                e += T.skipWhiteSpace.exec(this.input)[0].length,
                ";" === this.input[e] && e++
            }
        }
        ,
        n.eat = function(e) {
            return this.type === e && (this.next(),
            !0)
        }
        ,
        n.isContextual = function(e) {
            return this.type === E.types.name && this.value === e && !this.containsEsc
        }
        ,
        n.eatContextual = function(e) {
            return !!this.isContextual(e) && (this.next(),
            !0)
        }
        ,
        n.expectContextual = function(e) {
            this.eatContextual(e) || this.unexpected()
        }
        ,
        n.canInsertSemicolon = function() {
            return this.type === E.types.eof || this.type === E.types.braceR || T.lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
        }
        ,
        n.insertSemicolon = function() {
            if (this.canInsertSemicolon())
                return this.options.onInsertedSemicolon && this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc),
                !0
        }
        ,
        n.semicolon = function() {
            this.eat(E.types.semi) || this.insertSemicolon() || this.unexpected()
        }
        ,
        n.afterTrailingComma = function(e, t) {
            if (this.type === e)
                return this.options.onTrailingComma && this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc),
                t || this.next(),
                !0
        }
        ,
        n.expect = function(e) {
            this.eat(e) || this.unexpected()
        }
        ,
        n.unexpected = function(e) {
            this.raise(null != e ? e : this.start, "Unexpected token")
        }
        ,
        n.checkPatternErrors = function(e, t) {
            e && (-1 < e.trailingComma && this.raiseRecoverable(e.trailingComma, "Comma is not permitted after the rest element"),
            -1 < (t = t ? e.parenthesizedAssign : e.parenthesizedBind) && this.raiseRecoverable(t, "Parenthesized pattern"))
        }
        ,
        n.checkExpressionErrors = function(e, t) {
            return !!e && (r = e.shorthandAssign,
            e = e.doubleProto,
            t ? (0 <= r && this.raise(r, "Shorthand property assignments are valid only in destructuring patterns"),
            void (0 <= e && this.raiseRecoverable(e, "Redefinition of __proto__ property"))) : 0 <= r || 0 <= e);
            var r
        }
        ,
        n.checkYieldAwaitInDefaultParams = function() {
            this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos) && this.raise(this.yieldPos, "Yield expression cannot be a default value"),
            this.awaitPos && this.raise(this.awaitPos, "Await expression cannot be a default value")
        }
        ,
        n.isSimpleAssignTarget = function(e) {
            return "ParenthesizedExpression" === e.type ? this.isSimpleAssignTarget(e.expression) : "Identifier" === e.type || "MemberExpression" === e.type
        }
        ;
        var Wa = Object.defineProperty({
            DestructuringErrors: Ra
        }, "__esModule", {
            value: !0
        });
        function qa(e, t) {
            var r, n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (n)
                return (n = n.call(e)).next.bind(n);
            if (Array.isArray(e) || (n = function(e, t) {
                if (e) {
                    if ("string" == typeof e)
                        return Ka(e, t);
                    var r = Object.prototype.toString.call(e).slice(8, -1);
                    return "Map" === (r = "Object" === r && e.constructor ? e.constructor.name : r) || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Ka(e, t) : void 0
                }
            }(e)) || t && e && "number" == typeof e.length)
                return n && (e = n),
                r = 0,
                function() {
                    return r >= e.length ? {
                        done: !0
                    } : {
                        done: !1,
                        value: e[r++]
                    }
                }
                ;
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        function Ka(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++)
                n[r] = e[r];
            return n
        }
        var i = Va.Parser.prototype
          , za = (i.parseTopLevel = function(e) {
            var t = Object.create(null);
            for (e.body || (e.body = []); this.type !== E.types.eof; ) {
                var r = this.parseStatement(null, !0, t);
                e.body.push(r)
            }
            if (this.inModule)
                for (var n = 0, o = Object.keys(this.undefinedExports); n < o.length; n++) {
                    var i = o[n];
                    this.raiseRecoverable(this.undefinedExports[i].start, "Export '" + i + "' is not defined")
                }
            return this.adaptDirectivePrologue(e.body),
            this.next(),
            e.sourceType = this.options.sourceType,
            this.finishNode(e, "Program")
        }
        ,
        {
            kind: "loop"
        })
          , Xa = {
            kind: "switch"
        }
          , $a = (i.isLet = function(e) {
            if (this.options.ecmaVersion < 6 || !this.isContextual("let"))
                return !1;
            T.skipWhiteSpace.lastIndex = this.pos;
            var t = T.skipWhiteSpace.exec(this.input)
              , t = this.pos + t[0].length
              , r = this.input.charCodeAt(t);
            if (91 === r || 92 === r || 55295 < r && r < 56320)
                return !0;
            if (e)
                return !1;
            if (123 === r)
                return !0;
            if ((0,
            Ha.isIdentifierStart)(r, !0)) {
                for (var n = t + 1; (0,
                Ha.isIdentifierChar)(r = this.input.charCodeAt(n), !0); )
                    ++n;
                if (92 === r || 55295 < r && r < 56320)
                    return !0;
                e = this.input.slice(t, n);
                if (!Ha.keywordRelationalOperator.test(e))
                    return !0
            }
            return !1
        }
        ,
        i.isAsyncFunction = function() {
            if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
                return !1;
            T.skipWhiteSpace.lastIndex = this.pos;
            var e = T.skipWhiteSpace.exec(this.input)
              , e = this.pos + e[0].length;
            return !(T.lineBreak.test(this.input.slice(this.pos, e)) || "function" !== this.input.slice(e, e + 8) || e + 8 !== this.input.length && ((0,
            Ha.isIdentifierChar)(e = this.input.charCodeAt(e + 8)) || 55295 < e && e < 56320))
        }
        ,
        i.parseStatement = function(e, t, r) {
            var n, o = this.type, i = this.startNode();
            switch (this.isLet(e) && (o = E.types._var,
            n = "let"),
            o) {
            case E.types._break:
            case E.types._continue:
                return this.parseBreakContinueStatement(i, o.keyword);
            case E.types._debugger:
                return this.parseDebuggerStatement(i);
            case E.types._do:
                return this.parseDoStatement(i);
            case E.types._for:
                return this.parseForStatement(i);
            case E.types._function:
                return e && (this.strict || "if" !== e && "label" !== e) && 6 <= this.options.ecmaVersion && this.unexpected(),
                this.parseFunctionStatement(i, !1, !e);
            case E.types._class:
                return e && this.unexpected(),
                this.parseClass(i, !0);
            case E.types._if:
                return this.parseIfStatement(i);
            case E.types._return:
                return this.parseReturnStatement(i);
            case E.types._switch:
                return this.parseSwitchStatement(i);
            case E.types._throw:
                return this.parseThrowStatement(i);
            case E.types._try:
                return this.parseTryStatement(i);
            case E.types._const:
            case E.types._var:
                return n = n || this.value,
                e && "var" !== n && this.unexpected(),
                this.parseVarStatement(i, n);
            case E.types._while:
                return this.parseWhileStatement(i);
            case E.types._with:
                return this.parseWithStatement(i);
            case E.types.braceL:
                return this.parseBlock(!0, i);
            case E.types.semi:
                return this.parseEmptyStatement(i);
            case E.types._export:
            case E.types._import:
                if (10 < this.options.ecmaVersion && o === E.types._import) {
                    T.skipWhiteSpace.lastIndex = this.pos;
                    var s = T.skipWhiteSpace.exec(this.input)
                      , s = this.pos + s[0].length
                      , s = this.input.charCodeAt(s);
                    if (40 === s || 46 === s)
                        return this.parseExpressionStatement(i, this.parseExpression())
                }
                return this.options.allowImportExportEverywhere || (t || this.raise(this.start, "'import' and 'export' may only appear at the top level"),
                this.inModule || this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'")),
                o === E.types._import ? this.parseImport(i) : this.parseExport(i, r);
            default:
                if (this.isAsyncFunction())
                    return e && this.unexpected(),
                    this.next(),
                    this.parseFunctionStatement(i, !0, !e);
                var s = this.value
                  , a = this.parseExpression();
                return o === E.types.name && "Identifier" === a.type && this.eat(E.types.colon) ? this.parseLabeledStatement(i, s, a, e) : this.parseExpressionStatement(i, a)
            }
        }
        ,
        i.parseBreakContinueStatement = function(e, t) {
            for (var r = "break" === t, n = (this.next(),
            this.eat(E.types.semi) || this.insertSemicolon() ? e.label = null : this.type !== E.types.name ? this.unexpected() : (e.label = this.parseIdent(),
            this.semicolon()),
            0); n < this.labels.length; ++n) {
                var o = this.labels[n];
                if (null == e.label || o.name === e.label.name) {
                    if (null != o.kind && (r || "loop" === o.kind))
                        break;
                    if (e.label && r)
                        break
                }
            }
            return n === this.labels.length && this.raise(e.start, "Unsyntactic " + t),
            this.finishNode(e, r ? "BreakStatement" : "ContinueStatement")
        }
        ,
        i.parseDebuggerStatement = function(e) {
            return this.next(),
            this.semicolon(),
            this.finishNode(e, "DebuggerStatement")
        }
        ,
        i.parseDoStatement = function(e) {
            return this.next(),
            this.labels.push(za),
            e.body = this.parseStatement("do"),
            this.labels.pop(),
            this.expect(E.types._while),
            e.test = this.parseParenExpression(),
            6 <= this.options.ecmaVersion ? this.eat(E.types.semi) : this.semicolon(),
            this.finishNode(e, "DoWhileStatement")
        }
        ,
        i.parseForStatement = function(e) {
            this.next();
            var t = 9 <= this.options.ecmaVersion && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
            if (this.labels.push(za),
            this.enterScope(0),
            this.expect(E.types.parenL),
            this.type === E.types.semi)
                return -1 < t && this.unexpected(t),
                this.parseFor(e, null);
            var r = this.isLet();
            if (this.type === E.types._var || this.type === E.types._const || r)
                return n = this.startNode(),
                r = r ? "let" : this.value,
                this.next(),
                this.parseVar(n, !0, r),
                this.finishNode(n, "VariableDeclaration"),
                (this.type === E.types._in || 6 <= this.options.ecmaVersion && this.isContextual("of")) && 1 === n.declarations.length ? (9 <= this.options.ecmaVersion && (this.type === E.types._in ? -1 < t && this.unexpected(t) : e.await = -1 < t),
                this.parseForIn(e, n)) : (-1 < t && this.unexpected(t),
                this.parseFor(e, n));
            var r = this.isContextual("let")
              , n = !1
              , o = new Wa.DestructuringErrors
              , i = this.parseExpression(!(-1 < t) || "await", o);
            return this.type === E.types._in || (n = 6 <= this.options.ecmaVersion && this.isContextual("of")) ? (9 <= this.options.ecmaVersion && (this.type === E.types._in ? -1 < t && this.unexpected(t) : e.await = -1 < t),
            r && n && this.raise(i.start, "The left-hand side of a for-of loop may not start with 'let'."),
            this.toAssignable(i, !1, o),
            this.checkLValPattern(i),
            this.parseForIn(e, i)) : (this.checkExpressionErrors(o, !0),
            -1 < t && this.unexpected(t),
            this.parseFor(e, i))
        }
        ,
        i.parseFunctionStatement = function(e, t, r) {
            return this.next(),
            this.parseFunction(e, Ya | (r ? 0 : Qa), !1, t)
        }
        ,
        i.parseIfStatement = function(e) {
            return this.next(),
            e.test = this.parseParenExpression(),
            e.consequent = this.parseStatement("if"),
            e.alternate = this.eat(E.types._else) ? this.parseStatement("if") : null,
            this.finishNode(e, "IfStatement")
        }
        ,
        i.parseReturnStatement = function(e) {
            return this.inFunction || this.options.allowReturnOutsideFunction || this.raise(this.start, "'return' outside of function"),
            this.next(),
            this.eat(E.types.semi) || this.insertSemicolon() ? e.argument = null : (e.argument = this.parseExpression(),
            this.semicolon()),
            this.finishNode(e, "ReturnStatement")
        }
        ,
        i.parseSwitchStatement = function(e) {
            var t;
            this.next(),
            e.discriminant = this.parseParenExpression(),
            e.cases = [],
            this.expect(E.types.braceL),
            this.labels.push(Xa),
            this.enterScope(0);
            for (var r, n = !1; this.type !== E.types.braceR; )
                this.type === E.types._case || this.type === E.types._default ? (r = this.type === E.types._case,
                t && this.finishNode(t, "SwitchCase"),
                e.cases.push(t = this.startNode()),
                t.consequent = [],
                this.next(),
                r ? t.test = this.parseExpression() : (n && this.raiseRecoverable(this.lastTokStart, "Multiple default clauses"),
                n = !0,
                t.test = null),
                this.expect(E.types.colon)) : (t || this.unexpected(),
                t.consequent.push(this.parseStatement(null)));
            return this.exitScope(),
            t && this.finishNode(t, "SwitchCase"),
            this.next(),
            this.labels.pop(),
            this.finishNode(e, "SwitchStatement")
        }
        ,
        i.parseThrowStatement = function(e) {
            return this.next(),
            T.lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) && this.raise(this.lastTokEnd, "Illegal newline after throw"),
            e.argument = this.parseExpression(),
            this.semicolon(),
            this.finishNode(e, "ThrowStatement")
        }
        ,
        [])
          , Ya = (i.parseTryStatement = function(e) {
            var t, r;
            return this.next(),
            e.block = this.parseBlock(),
            e.handler = null,
            this.type === E.types._catch && (t = this.startNode(),
            this.next(),
            this.eat(E.types.parenL) ? (t.param = this.parseBindingAtom(),
            r = "Identifier" === t.param.type,
            this.enterScope(r ? A.SCOPE_SIMPLE_CATCH : 0),
            this.checkLValPattern(t.param, r ? A.BIND_SIMPLE_CATCH : A.BIND_LEXICAL),
            this.expect(E.types.parenR)) : (this.options.ecmaVersion < 10 && this.unexpected(),
            t.param = null,
            this.enterScope(0)),
            t.body = this.parseBlock(!1),
            this.exitScope(),
            e.handler = this.finishNode(t, "CatchClause")),
            e.finalizer = this.eat(E.types._finally) ? this.parseBlock() : null,
            e.handler || e.finalizer || this.raise(e.start, "Missing catch or finally clause"),
            this.finishNode(e, "TryStatement")
        }
        ,
        i.parseVarStatement = function(e, t) {
            return this.next(),
            this.parseVar(e, !1, t),
            this.semicolon(),
            this.finishNode(e, "VariableDeclaration")
        }
        ,
        i.parseWhileStatement = function(e) {
            return this.next(),
            e.test = this.parseParenExpression(),
            this.labels.push(za),
            e.body = this.parseStatement("while"),
            this.labels.pop(),
            this.finishNode(e, "WhileStatement")
        }
        ,
        i.parseWithStatement = function(e) {
            return this.strict && this.raise(this.start, "'with' in strict mode"),
            this.next(),
            e.object = this.parseParenExpression(),
            e.body = this.parseStatement("with"),
            this.finishNode(e, "WithStatement")
        }
        ,
        i.parseEmptyStatement = function(e) {
            return this.next(),
            this.finishNode(e, "EmptyStatement")
        }
        ,
        i.parseLabeledStatement = function(e, t, r, n) {
            for (var o, i = qa(this.labels); !(o = i()).done; )
                (s = o.value).name === t && this.raise(r.start, "Label '" + t + "' is already declared");
            for (var s, a = this.type.isLoop ? "loop" : this.type === E.types._switch ? "switch" : null, l = this.labels.length - 1; 0 <= l && (s = this.labels[l]).statementStart === e.start; l--)
                s.statementStart = this.start,
                s.kind = a;
            return this.labels.push({
                name: t,
                kind: a,
                statementStart: this.start
            }),
            e.body = this.parseStatement(n ? -1 === n.indexOf("label") ? n + "label" : n : "label"),
            this.labels.pop(),
            e.label = r,
            this.finishNode(e, "LabeledStatement")
        }
        ,
        i.parseExpressionStatement = function(e, t) {
            return e.expression = t,
            this.semicolon(),
            this.finishNode(e, "ExpressionStatement")
        }
        ,
        i.parseBlock = function(e, t, r) {
            for (void 0 === e && (e = !0),
            (t = void 0 === t ? this.startNode() : t).body = [],
            this.expect(E.types.braceL),
            e && this.enterScope(0); this.type !== E.types.braceR; ) {
                var n = this.parseStatement(null);
                t.body.push(n)
            }
            return r && (this.strict = !1),
            this.next(),
            e && this.exitScope(),
            this.finishNode(t, "BlockStatement")
        }
        ,
        i.parseFor = function(e, t) {
            return e.init = t,
            this.expect(E.types.semi),
            e.test = this.type === E.types.semi ? null : this.parseExpression(),
            this.expect(E.types.semi),
            e.update = this.type === E.types.parenR ? null : this.parseExpression(),
            this.expect(E.types.parenR),
            e.body = this.parseStatement("for"),
            this.exitScope(),
            this.labels.pop(),
            this.finishNode(e, "ForStatement")
        }
        ,
        i.parseForIn = function(e, t) {
            var r = this.type === E.types._in;
            return this.next(),
            "VariableDeclaration" === t.type && null != t.declarations[0].init && (!r || this.options.ecmaVersion < 8 || this.strict || "var" !== t.kind || "Identifier" !== t.declarations[0].id.type) && this.raise(t.start, (r ? "for-in" : "for-of") + " loop variable declaration may not have an initializer"),
            e.left = t,
            e.right = r ? this.parseExpression() : this.parseMaybeAssign(),
            this.expect(E.types.parenR),
            e.body = this.parseStatement("for"),
            this.exitScope(),
            this.labels.pop(),
            this.finishNode(e, r ? "ForInStatement" : "ForOfStatement")
        }
        ,
        i.parseVar = function(e, t, r) {
            for (e.declarations = [],
            e.kind = r; ; ) {
                var n = this.startNode();
                if (this.parseVarId(n, r),
                this.eat(E.types.eq) ? n.init = this.parseMaybeAssign(t) : "const" !== r || this.type === E.types._in || 6 <= this.options.ecmaVersion && this.isContextual("of") ? "Identifier" === n.id.type || t && (this.type === E.types._in || this.isContextual("of")) ? n.init = null : this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value") : this.unexpected(),
                e.declarations.push(this.finishNode(n, "VariableDeclarator")),
                !this.eat(E.types.comma))
                    break
            }
            return e
        }
        ,
        i.parseVarId = function(e, t) {
            e.id = this.parseBindingAtom(),
            this.checkLValPattern(e.id, "var" === t ? A.BIND_VAR : A.BIND_LEXICAL, !1)
        }
        ,
        1)
          , Qa = 2;
        function Ja(e, t) {
            var r = e.computed
              , e = e.key;
            return !r && ("Identifier" === e.type && e.name === t || "Literal" === e.type && e.value === t)
        }
        function Za(e, t) {
            var r, n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (n)
                return (n = n.call(e)).next.bind(n);
            if (Array.isArray(e) || (n = function(e, t) {
                if (e) {
                    if ("string" == typeof e)
                        return el(e, t);
                    var r = Object.prototype.toString.call(e).slice(8, -1);
                    return "Map" === (r = "Object" === r && e.constructor ? e.constructor.name : r) || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? el(e, t) : void 0
                }
            }(e)) || t && e && "number" == typeof e.length)
                return n && (e = n),
                r = 0,
                function() {
                    return r >= e.length ? {
                        done: !0
                    } : {
                        done: !1,
                        value: e[r++]
                    }
                }
                ;
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        function el(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++)
                n[r] = e[r];
            return n
        }
        i.parseFunction = function(e, t, r, n, o) {
            this.initFunction(e),
            (9 <= this.options.ecmaVersion || 6 <= this.options.ecmaVersion && !n) && (this.type === E.types.star && t & Qa && this.unexpected(),
            e.generator = this.eat(E.types.star)),
            8 <= this.options.ecmaVersion && (e.async = !!n),
            t & Ya && (e.id = 4 & t && this.type !== E.types.name ? null : this.parseIdent(),
            !e.id || t & Qa || this.checkLValSimple(e.id, this.strict || e.generator || e.async ? this.treatFunctionsAsVar ? A.BIND_VAR : A.BIND_LEXICAL : A.BIND_FUNCTION));
            var n = this.yieldPos
              , i = this.awaitPos
              , s = this.awaitIdentPos;
            return this.yieldPos = 0,
            this.awaitPos = 0,
            this.awaitIdentPos = 0,
            this.enterScope((0,
            A.functionFlags)(e.async, e.generator)),
            t & Ya || (e.id = this.type === E.types.name ? this.parseIdent() : null),
            this.parseFunctionParams(e),
            this.parseFunctionBody(e, r, !1, o),
            this.yieldPos = n,
            this.awaitPos = i,
            this.awaitIdentPos = s,
            this.finishNode(e, t & Ya ? "FunctionDeclaration" : "FunctionExpression")
        }
        ,
        i.parseFunctionParams = function(e) {
            this.expect(E.types.parenL),
            e.params = this.parseBindingList(E.types.parenR, !1, 8 <= this.options.ecmaVersion),
            this.checkYieldAwaitInDefaultParams()
        }
        ,
        i.parseClass = function(e, t) {
            this.next();
            var r = this.strict
              , n = (this.strict = !0,
            this.parseClassId(e, t),
            this.parseClassSuper(e),
            this.enterClassBody())
              , o = this.startNode()
              , i = !1;
            for (o.body = [],
            this.expect(E.types.braceL); this.type !== E.types.braceR; ) {
                var s = this.parseClassElement(null !== e.superClass);
                s && (o.body.push(s),
                "MethodDefinition" === s.type && "constructor" === s.kind ? (i && this.raise(s.start, "Duplicate constructor in the same class"),
                i = !0) : s.key && "PrivateIdentifier" === s.key.type && function(e, t) {
                    var r = t.key.name
                      , n = e[r]
                      , o = "true";
                    "MethodDefinition" !== t.type || "get" !== t.kind && "set" !== t.kind || (o = (t.static ? "s" : "i") + t.kind);
                    if ("iget" === n && "iset" === o || "iset" === n && "iget" === o || "sget" === n && "sset" === o || "sset" === n && "sget" === o)
                        e[r] = "true";
                    else {
                        if (n)
                            return 1;
                        e[r] = o
                    }
                }(n, s) && this.raiseRecoverable(s.key.start, "Identifier '#" + s.key.name + "' has already been declared"))
            }
            return this.strict = r,
            this.next(),
            e.body = this.finishNode(o, "ClassBody"),
            this.exitClassBody(),
            this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression")
        }
        ,
        i.parseClassElement = function(e) {
            if (this.eat(E.types.semi))
                return null;
            var t = this.options.ecmaVersion
              , r = this.startNode()
              , n = ""
              , o = !1
              , i = !1
              , s = "method"
              , a = !1;
            if (this.eatContextual("static")) {
                if (13 <= t && this.eat(E.types.braceL))
                    return this.parseClassStaticBlock(r),
                    r;
                this.isClassElementNameStart() || this.type === E.types.star ? a = !0 : n = "static"
            }
            return r.static = a,
            !n && 8 <= t && this.eatContextual("async") && (!this.isClassElementNameStart() && this.type !== E.types.star || this.canInsertSemicolon() ? n = "async" : i = !0),
            !n && (9 <= t || !i) && this.eat(E.types.star) && (o = !0),
            n || i || o || (a = this.value,
            (this.eatContextual("get") || this.eatContextual("set")) && (this.isClassElementNameStart() ? s = a : n = a)),
            n ? (r.computed = !1,
            r.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc),
            r.key.name = n,
            this.finishNode(r.key, "Identifier")) : this.parseClassElementName(r),
            t < 13 || this.type === E.types.parenL || "method" !== s || o || i ? (n = (a = !r.static && Ja(r, "constructor")) && e,
            a && "method" !== s && this.raise(r.key.start, "Constructor can't have get/set modifier"),
            r.kind = a ? "constructor" : s,
            this.parseClassMethod(r, o, i, n)) : this.parseClassField(r),
            r
        }
        ,
        i.isClassElementNameStart = function() {
            return this.type === E.types.name || this.type === E.types.privateId || this.type === E.types.num || this.type === E.types.string || this.type === E.types.bracketL || this.type.keyword
        }
        ,
        i.parseClassElementName = function(e) {
            this.type === E.types.privateId ? ("constructor" === this.value && this.raise(this.start, "Classes can't have an element named '#constructor'"),
            e.computed = !1,
            e.key = this.parsePrivateIdent()) : this.parsePropertyName(e)
        }
        ,
        i.parseClassMethod = function(e, t, r, n) {
            var o = e.key
              , o = ("constructor" === e.kind ? (t && this.raise(o.start, "Constructor can't be a generator"),
            r && this.raise(o.start, "Constructor can't be an async method")) : e.static && Ja(e, "prototype") && this.raise(o.start, "Classes may not have a static property named prototype"),
            e.value = this.parseMethod(t, r, n));
            return "get" === e.kind && 0 !== o.params.length && this.raiseRecoverable(o.start, "getter should have no params"),
            "set" === e.kind && 1 !== o.params.length && this.raiseRecoverable(o.start, "setter should have exactly one param"),
            "set" === e.kind && "RestElement" === o.params[0].type && this.raiseRecoverable(o.params[0].start, "Setter cannot use rest params"),
            this.finishNode(e, "MethodDefinition")
        }
        ,
        i.parseClassField = function(e) {
            var t, r;
            return Ja(e, "constructor") ? this.raise(e.key.start, "Classes can't have a field named 'constructor'") : e.static && Ja(e, "prototype") && this.raise(e.key.start, "Classes can't have a static field named 'prototype'"),
            this.eat(E.types.eq) ? (r = (t = this.currentThisScope()).inClassFieldInit,
            t.inClassFieldInit = !0,
            e.value = this.parseMaybeAssign(),
            t.inClassFieldInit = r) : e.value = null,
            this.semicolon(),
            this.finishNode(e, "PropertyDefinition")
        }
        ,
        i.parseClassStaticBlock = function(e) {
            e.body = [];
            var t = this.labels;
            for (this.labels = [],
            this.enterScope(A.SCOPE_CLASS_STATIC_BLOCK | A.SCOPE_SUPER); this.type !== E.types.braceR; ) {
                var r = this.parseStatement(null);
                e.body.push(r)
            }
            return this.next(),
            this.exitScope(),
            this.labels = t,
            this.finishNode(e, "StaticBlock")
        }
        ,
        i.parseClassId = function(e, t) {
            this.type === E.types.name ? (e.id = this.parseIdent(),
            t && this.checkLValSimple(e.id, A.BIND_LEXICAL, !1)) : (!0 === t && this.unexpected(),
            e.id = null)
        }
        ,
        i.parseClassSuper = function(e) {
            e.superClass = this.eat(E.types._extends) ? this.parseExprSubscripts(!1) : null
        }
        ,
        i.enterClassBody = function() {
            var e = {
                declared: Object.create(null),
                used: []
            };
            return this.privateNameStack.push(e),
            e.declared
        }
        ,
        i.exitClassBody = function() {
            for (var e = this.privateNameStack.pop(), t = e.declared, r = e.used, e = this.privateNameStack.length, n = 0 === e ? null : this.privateNameStack[e - 1], o = 0; o < r.length; ++o) {
                var i = r[o];
                (0,
                Ba.hasOwn)(t, i.name) || (n ? n.used.push(i) : this.raiseRecoverable(i.start, "Private field '#" + i.name + "' must be declared in an enclosing class"))
            }
        }
        ,
        i.parseExport = function(e, t) {
            if (this.next(),
            this.eat(E.types.star))
                return 11 <= this.options.ecmaVersion && (this.eatContextual("as") ? (e.exported = this.parseModuleExportName(),
                this.checkExport(t, e.exported.name, this.lastTokStart)) : e.exported = null),
                this.expectContextual("from"),
                this.type !== E.types.string && this.unexpected(),
                e.source = this.parseExprAtom(),
                this.semicolon(),
                this.finishNode(e, "ExportAllDeclaration");
            var r, n;
            if (this.eat(E.types._default))
                return this.checkExport(t, "default", this.lastTokStart),
                r = void 0,
                this.type === E.types._function || (r = this.isAsyncFunction()) ? (n = this.startNode(),
                this.next(),
                r && this.next(),
                e.declaration = this.parseFunction(n, 4 | Ya, !1, r)) : this.type === E.types._class ? (n = this.startNode(),
                e.declaration = this.parseClass(n, "nullableID")) : (e.declaration = this.parseMaybeAssign(),
                this.semicolon()),
                this.finishNode(e, "ExportDefaultDeclaration");
            if (this.shouldParseExportStatement())
                e.declaration = this.parseStatement(null),
                "VariableDeclaration" === e.declaration.type ? this.checkVariableExport(t, e.declaration.declarations) : this.checkExport(t, e.declaration.id.name, e.declaration.id.start),
                e.specifiers = [],
                e.source = null;
            else {
                if (e.declaration = null,
                e.specifiers = this.parseExportSpecifiers(t),
                this.eatContextual("from"))
                    this.type !== E.types.string && this.unexpected(),
                    e.source = this.parseExprAtom();
                else {
                    for (var o = qa(e.specifiers); !(i = o()).done; ) {
                        var i = i.value;
                        this.checkUnreserved(i.local),
                        this.checkLocalExport(i.local),
                        "Literal" === i.local.type && this.raise(i.local.start, "A string literal cannot be used as an exported binding without `from`.")
                    }
                    e.source = null
                }
                this.semicolon()
            }
            return this.finishNode(e, "ExportNamedDeclaration")
        }
        ,
        i.checkExport = function(e, t, r) {
            e && ((0,
            Ba.hasOwn)(e, t) && this.raiseRecoverable(r, "Duplicate export '" + t + "'"),
            e[t] = !0)
        }
        ,
        i.checkPatternExport = function(e, t) {
            var r = t.type;
            if ("Identifier" === r)
                this.checkExport(e, t.name, t.start);
            else if ("ObjectPattern" === r)
                for (var n = qa(t.properties); !(o = n()).done; ) {
                    var o = o.value;
                    this.checkPatternExport(e, o)
                }
            else if ("ArrayPattern" === r)
                for (var i = qa(t.elements); !(s = i()).done; ) {
                    var s = s.value;
                    s && this.checkPatternExport(e, s)
                }
            else
                "Property" === r ? this.checkPatternExport(e, t.value) : "AssignmentPattern" === r ? this.checkPatternExport(e, t.left) : "RestElement" === r ? this.checkPatternExport(e, t.argument) : "ParenthesizedExpression" === r && this.checkPatternExport(e, t.expression)
        }
        ,
        i.checkVariableExport = function(e, t) {
            if (e)
                for (var r = qa(t); !(n = r()).done; ) {
                    var n = n.value;
                    this.checkPatternExport(e, n.id)
                }
        }
        ,
        i.shouldParseExportStatement = function() {
            return "var" === this.type.keyword || "const" === this.type.keyword || "class" === this.type.keyword || "function" === this.type.keyword || this.isLet() || this.isAsyncFunction()
        }
        ,
        i.parseExportSpecifiers = function(e) {
            var t = []
              , r = !0;
            for (this.expect(E.types.braceL); !this.eat(E.types.braceR); ) {
                if (r)
                    r = !1;
                else if (this.expect(E.types.comma),
                this.afterTrailingComma(E.types.braceR))
                    break;
                var n = this.startNode();
                n.local = this.parseModuleExportName(),
                n.exported = this.eatContextual("as") ? this.parseModuleExportName() : n.local,
                this.checkExport(e, n.exported["Identifier" === n.exported.type ? "name" : "value"], n.exported.start),
                t.push(this.finishNode(n, "ExportSpecifier"))
            }
            return t
        }
        ,
        i.parseImport = function(e) {
            return this.next(),
            this.type === E.types.string ? (e.specifiers = $a,
            e.source = this.parseExprAtom()) : (e.specifiers = this.parseImportSpecifiers(),
            this.expectContextual("from"),
            e.source = this.type === E.types.string ? this.parseExprAtom() : this.unexpected()),
            this.semicolon(),
            this.finishNode(e, "ImportDeclaration")
        }
        ,
        i.parseImportSpecifiers = function() {
            var e, t = [], r = !0;
            if (this.type === E.types.name && ((e = this.startNode()).local = this.parseIdent(),
            this.checkLValSimple(e.local, A.BIND_LEXICAL),
            t.push(this.finishNode(e, "ImportDefaultSpecifier")),
            !this.eat(E.types.comma)))
                return t;
            if (this.type === E.types.star)
                return e = this.startNode(),
                this.next(),
                this.expectContextual("as"),
                e.local = this.parseIdent(),
                this.checkLValSimple(e.local, A.BIND_LEXICAL),
                t.push(this.finishNode(e, "ImportNamespaceSpecifier")),
                t;
            for (this.expect(E.types.braceL); !this.eat(E.types.braceR); ) {
                if (r)
                    r = !1;
                else if (this.expect(E.types.comma),
                this.afterTrailingComma(E.types.braceR))
                    break;
                (e = this.startNode()).imported = this.parseModuleExportName(),
                this.eatContextual("as") ? e.local = this.parseIdent() : (this.checkUnreserved(e.imported),
                e.local = e.imported),
                this.checkLValSimple(e.local, A.BIND_LEXICAL),
                t.push(this.finishNode(e, "ImportSpecifier"))
            }
            return t
        }
        ,
        i.parseModuleExportName = function() {
            var e;
            return 13 <= this.options.ecmaVersion && this.type === E.types.string ? (e = this.parseLiteral(this.value),
            Ba.loneSurrogate.test(e.value) && this.raise(e.start, "An export name cannot include a lone surrogate."),
            e) : this.parseIdent(!0)
        }
        ,
        i.adaptDirectivePrologue = function(e) {
            for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t)
                e[t].directive = e[t].expression.raw.slice(1, -1)
        }
        ,
        i.isDirectiveCandidate = function(e) {
            return "ExpressionStatement" === e.type && "Literal" === e.expression.type && "string" == typeof e.expression.value && ('"' === this.input[e.start] || "'" === this.input[e.start])
        }
        ;
        var _e = Va.Parser.prototype
          , tl = (_e.toAssignable = function(e, t, r) {
            if (6 <= this.options.ecmaVersion && e)
                switch (e.type) {
                case "Identifier":
                    this.inAsync && "await" === e.name && this.raise(e.start, "Cannot use 'await' as identifier inside an async function");
                    break;
                case "ObjectPattern":
                case "ArrayPattern":
                case "AssignmentPattern":
                case "RestElement":
                    break;
                case "ObjectExpression":
                    e.type = "ObjectPattern",
                    r && this.checkPatternErrors(r, !0);
                    for (var n = Za(e.properties); !(o = n()).done; ) {
                        var o = o.value;
                        this.toAssignable(o, t),
                        "RestElement" !== o.type || "ArrayPattern" !== o.argument.type && "ObjectPattern" !== o.argument.type || this.raise(o.argument.start, "Unexpected token")
                    }
                    break;
                case "Property":
                    "init" !== e.kind && this.raise(e.key.start, "Object pattern can't contain getter or setter"),
                    this.toAssignable(e.value, t);
                    break;
                case "ArrayExpression":
                    e.type = "ArrayPattern",
                    r && this.checkPatternErrors(r, !0),
                    this.toAssignableList(e.elements, t);
                    break;
                case "SpreadElement":
                    e.type = "RestElement",
                    this.toAssignable(e.argument, t),
                    "AssignmentPattern" === e.argument.type && this.raise(e.argument.start, "Rest elements cannot have a default value");
                    break;
                case "AssignmentExpression":
                    "=" !== e.operator && this.raise(e.left.end, "Only '=' operator can be used for specifying default value."),
                    e.type = "AssignmentPattern",
                    delete e.operator,
                    this.toAssignable(e.left, t);
                    break;
                case "ParenthesizedExpression":
                    this.toAssignable(e.expression, t, r);
                    break;
                case "ChainExpression":
                    this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
                    break;
                case "MemberExpression":
                    if (!t)
                        break;
                default:
                    this.raise(e.start, "Assigning to rvalue")
                }
            else
                r && this.checkPatternErrors(r, !0);
            return e
        }
        ,
        _e.toAssignableList = function(e, t) {
            for (var r, n = e.length, o = 0; o < n; o++) {
                var i = e[o];
                i && this.toAssignable(i, t)
            }
            return n && (r = e[n - 1],
            6 === this.options.ecmaVersion && t && r && "RestElement" === r.type && "Identifier" !== r.argument.type && this.unexpected(r.argument.start)),
            e
        }
        ,
        _e.parseSpread = function(e) {
            var t = this.startNode();
            return this.next(),
            t.argument = this.parseMaybeAssign(!1, e),
            this.finishNode(t, "SpreadElement")
        }
        ,
        _e.parseRestBinding = function() {
            var e = this.startNode();
            return this.next(),
            6 === this.options.ecmaVersion && this.type !== E.types.name && this.unexpected(),
            e.argument = this.parseBindingAtom(),
            this.finishNode(e, "RestElement")
        }
        ,
        _e.parseBindingAtom = function() {
            if (6 <= this.options.ecmaVersion)
                switch (this.type) {
                case E.types.bracketL:
                    var e = this.startNode();
                    return this.next(),
                    e.elements = this.parseBindingList(E.types.bracketR, !0, !0),
                    this.finishNode(e, "ArrayPattern");
                case E.types.braceL:
                    return this.parseObj(!0)
                }
            return this.parseIdent()
        }
        ,
        _e.parseBindingList = function(e, t, r) {
            for (var n = [], o = !0; !this.eat(e); )
                if (o ? o = !1 : this.expect(E.types.comma),
                t && this.type === E.types.comma)
                    n.push(null);
                else {
                    if (r && this.afterTrailingComma(e))
                        break;
                    if (this.type === E.types.ellipsis) {
                        var i = this.parseRestBinding();
                        this.parseBindingListItem(i),
                        n.push(i),
                        this.type === E.types.comma && this.raise(this.start, "Comma is not permitted after the rest element"),
                        this.expect(e);
                        break
                    }
                    i = this.parseMaybeDefault(this.start, this.startLoc);
                    this.parseBindingListItem(i),
                    n.push(i)
                }
            return n
        }
        ,
        _e.parseBindingListItem = function(e) {
            return e
        }
        ,
        _e.parseMaybeDefault = function(e, t, r) {
            if (r = r || this.parseBindingAtom(),
            this.options.ecmaVersion < 6 || !this.eat(E.types.eq))
                return r;
            e = this.startNodeAt(e, t);
            return e.left = r,
            e.right = this.parseMaybeAssign(),
            this.finishNode(e, "AssignmentPattern")
        }
        ,
        _e.checkLValSimple = function(e, t, r) {
            var n = (t = void 0 === t ? A.BIND_NONE : t) !== A.BIND_NONE;
            switch (e.type) {
            case "Identifier":
                this.strict && this.reservedWordsStrictBind.test(e.name) && this.raiseRecoverable(e.start, (n ? "Binding " : "Assigning to ") + e.name + " in strict mode"),
                n && (t === A.BIND_LEXICAL && "let" === e.name && this.raiseRecoverable(e.start, "let is disallowed as a lexically bound name"),
                r && ((0,
                Ba.hasOwn)(r, e.name) && this.raiseRecoverable(e.start, "Argument name clash"),
                r[e.name] = !0),
                t !== A.BIND_OUTSIDE && this.declareName(e.name, t, e.start));
                break;
            case "ChainExpression":
                this.raiseRecoverable(e.start, "Optional chaining cannot appear in left-hand side");
                break;
            case "MemberExpression":
                n && this.raiseRecoverable(e.start, "Binding member expression");
                break;
            case "ParenthesizedExpression":
                return n && this.raiseRecoverable(e.start, "Binding parenthesized expression"),
                this.checkLValSimple(e.expression, t, r);
            default:
                this.raise(e.start, (n ? "Binding" : "Assigning to") + " rvalue")
            }
        }
        ,
        _e.checkLValPattern = function(e, t, r) {
            switch (void 0 === t && (t = A.BIND_NONE),
            e.type) {
            case "ObjectPattern":
                for (var n = Za(e.properties); !(o = n()).done; ) {
                    var o = o.value;
                    this.checkLValInnerPattern(o, t, r)
                }
                break;
            case "ArrayPattern":
                for (var i = Za(e.elements); !(s = i()).done; ) {
                    var s = s.value;
                    s && this.checkLValInnerPattern(s, t, r)
                }
                break;
            default:
                this.checkLValSimple(e, t, r)
            }
        }
        ,
        _e.checkLValInnerPattern = function(e, t, r) {
            switch (void 0 === t && (t = A.BIND_NONE),
            e.type) {
            case "Property":
                this.checkLValInnerPattern(e.value, t, r);
                break;
            case "AssignmentPattern":
                this.checkLValPattern(e.left, t, r);
                break;
            case "RestElement":
                this.checkLValPattern(e.argument, t, r);
                break;
            default:
                this.checkLValPattern(e, t, r)
            }
        }
        ,
        j(function(e, t) {
            t.__esModule = !0,
            t.types = t.TokContext = void 0;
            var r = function(e, t, r, n, o) {
                this.token = e,
                this.isExpr = !!t,
                this.preserveSpace = !!r,
                this.override = n,
                this.generator = !!o
            }
              , n = {
                b_stat: new (t.TokContext = r)("{",!1),
                b_expr: new r("{",!0),
                b_tmpl: new r("${",!1),
                p_stat: new r("(",!1),
                p_expr: new r("(",!0),
                q_tmpl: new r("`",!0,!0,function(e) {
                    return e.tryReadTemplateToken()
                }
                ),
                f_stat: new r("function",!1),
                f_expr: new r("function",!0),
                f_expr_gen: new r("function",!0,!1,null,!0),
                f_gen: new r("function",!1,!1,null,!0)
            }
              , r = (t.types = n,
            Va.Parser.prototype);
            r.initialContext = function() {
                return [n.b_stat]
            }
            ,
            r.curContext = function() {
                return this.context[this.context.length - 1]
            }
            ,
            r.braceIsBlock = function(e) {
                var t = this.curContext();
                return t === n.f_expr || t === n.f_stat || (e !== E.types.colon || t !== n.b_stat && t !== n.b_expr ? e === E.types._return || e === E.types.name && this.exprAllowed ? T.lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) : e === E.types._else || e === E.types.semi || e === E.types.eof || e === E.types.parenR || e === E.types.arrow || (e === E.types.braceL ? t === n.b_stat : e !== E.types._var && e !== E.types._const && e !== E.types.name && !this.exprAllowed) : !t.isExpr)
            }
            ,
            r.inGeneratorContext = function() {
                for (var e = this.context.length - 1; 1 <= e; e--) {
                    var t = this.context[e];
                    if ("function" === t.token)
                        return t.generator
                }
                return !1
            }
            ,
            r.updateContext = function(e) {
                var t, r = this.type;
                r.keyword && e === E.types.dot ? this.exprAllowed = !1 : (t = r.updateContext) ? t.call(this, e) : this.exprAllowed = r.beforeExpr
            }
            ,
            r.overrideContext = function(e) {
                this.curContext() !== e && (this.context[this.context.length - 1] = e)
            }
            ,
            E.types.parenR.updateContext = E.types.braceR.updateContext = function() {
                var e;
                1 === this.context.length ? this.exprAllowed = !0 : ((e = this.context.pop()) === n.b_stat && "function" === this.curContext().token && (e = this.context.pop()),
                this.exprAllowed = !e.isExpr)
            }
            ,
            E.types.braceL.updateContext = function(e) {
                this.context.push(this.braceIsBlock(e) ? n.b_stat : n.b_expr),
                this.exprAllowed = !0
            }
            ,
            E.types.dollarBraceL.updateContext = function() {
                this.context.push(n.b_tmpl),
                this.exprAllowed = !0
            }
            ,
            E.types.parenL.updateContext = function(e) {
                e = e === E.types._if || e === E.types._for || e === E.types._with || e === E.types._while;
                this.context.push(e ? n.p_stat : n.p_expr),
                this.exprAllowed = !0
            }
            ,
            E.types.incDec.updateContext = function() {}
            ,
            E.types._function.updateContext = E.types._class.updateContext = function(e) {
                !e.beforeExpr || e === E.types._else || e === E.types.semi && this.curContext() !== n.p_stat || e === E.types._return && T.lineBreak.test(this.input.slice(this.lastTokEnd, this.start)) || (e === E.types.colon || e === E.types.braceL) && this.curContext() === n.b_stat ? this.context.push(n.f_stat) : this.context.push(n.f_expr),
                this.exprAllowed = !1
            }
            ,
            E.types.backQuote.updateContext = function() {
                this.curContext() === n.q_tmpl ? this.context.pop() : this.context.push(n.q_tmpl),
                this.exprAllowed = !1
            }
            ,
            E.types.star.updateContext = function(e) {
                e === E.types._function && (e = this.context.length - 1,
                this.context[e] === n.f_expr ? this.context[e] = n.f_expr_gen : this.context[e] = n.f_gen),
                this.exprAllowed = !0
            }
            ,
            E.types.name.updateContext = function(e) {
                var t = !1;
                6 <= this.options.ecmaVersion && e !== E.types.dot && ("of" === this.value && !this.exprAllowed || "yield" === this.value && this.inGeneratorContext()) && (t = !0),
                this.exprAllowed = t
            }
        }));
        function rl(e, t) {
            var r, n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
            if (n)
                return (n = n.call(e)).next.bind(n);
            if (Array.isArray(e) || (n = function(e, t) {
                if (e) {
                    if ("string" == typeof e)
                        return nl(e, t);
                    var r = Object.prototype.toString.call(e).slice(8, -1);
                    return "Map" === (r = "Object" === r && e.constructor ? e.constructor.name : r) || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? nl(e, t) : void 0
                }
            }(e)) || t && e && "number" == typeof e.length)
                return n && (e = n),
                r = 0,
                function() {
                    return r >= e.length ? {
                        done: !0
                    } : {
                        done: !1,
                        value: e[r++]
                    }
                }
                ;
            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
        }
        function nl(e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++)
                n[r] = e[r];
            return n
        }
        s = Va.Parser.prototype;
        s.checkPropClash = function(e, t, r) {
            if (!(9 <= this.options.ecmaVersion && "SpreadElement" === e.type || 6 <= this.options.ecmaVersion && (e.computed || e.method || e.shorthand))) {
                var n = e.key;
                switch (n.type) {
                case "Identifier":
                    o = n.name;
                    break;
                case "Literal":
                    o = String(n.value);
                    break;
                default:
                    return
                }
                var o, e = e.kind;
                6 <= this.options.ecmaVersion ? "__proto__" === o && "init" === e && (t.proto && (r ? r.doubleProto < 0 && (r.doubleProto = n.start) : this.raiseRecoverable(n.start, "Redefinition of __proto__ property")),
                t.proto = !0) : ((r = t[o = "$" + o]) ? ("init" === e ? this.strict && r.init || r.get || r.set : r.init || r[e]) && this.raiseRecoverable(n.start, "Redefinition of property") : r = t[o] = {
                    init: !1,
                    get: !1,
                    set: !1
                },
                r[e] = !0)
            }
        }
        ,
        s.parseExpression = function(e, t) {
            var r = this.start
              , n = this.startLoc
              , o = this.parseMaybeAssign(e, t);
            if (this.type !== E.types.comma)
                return o;
            var i = this.startNodeAt(r, n);
            for (i.expressions = [o]; this.eat(E.types.comma); )
                i.expressions.push(this.parseMaybeAssign(e, t));
            return this.finishNode(i, "SequenceExpression")
        }
        ,
        s.parseMaybeAssign = function(e, t, r) {
            if (this.isContextual("yield")) {
                if (this.inGenerator)
                    return this.parseYield(e);
                this.exprAllowed = !1
            }
            var n = !1
              , o = -1
              , i = -1
              , s = -1
              , a = (t ? (o = t.parenthesizedAssign,
            i = t.trailingComma,
            s = t.doubleProto,
            t.parenthesizedAssign = t.trailingComma = -1) : (t = new Wa.DestructuringErrors,
            n = !0),
            this.start)
              , l = this.startLoc
              , c = (this.type !== E.types.parenL && this.type !== E.types.name || (this.potentialArrowAt = this.start,
            this.potentialArrowInForAwait = "await" === e),
            this.parseMaybeConditional(e, t));
            return r && (c = r.call(this, c, a, l)),
            this.type.isAssign ? ((r = this.startNodeAt(a, l)).operator = this.value,
            this.type === E.types.eq && (c = this.toAssignable(c, !1, t)),
            n || (t.parenthesizedAssign = t.trailingComma = t.doubleProto = -1),
            t.shorthandAssign >= c.start && (t.shorthandAssign = -1),
            this.type === E.types.eq ? this.checkLValPattern(c) : this.checkLValSimple(c),
            r.left = c,
            this.next(),
            r.right = this.parseMaybeAssign(e),
            -1 < s && (t.doubleProto = s),
            this.finishNode(r, "AssignmentExpression")) : (n && this.checkExpressionErrors(t, !0),
            -1 < o && (t.parenthesizedAssign = o),
            -1 < i && (t.trailingComma = i),
            c)
        }
        ,
        s.parseMaybeConditional = function(e, t) {
            var r = this.start
              , n = this.startLoc
              , o = this.parseExprOps(e, t);
            return !this.checkExpressionErrors(t) && this.eat(E.types.question) ? ((t = this.startNodeAt(r, n)).test = o,
            t.consequent = this.parseMaybeAssign(),
            this.expect(E.types.colon),
            t.alternate = this.parseMaybeAssign(e),
            this.finishNode(t, "ConditionalExpression")) : o
        }
        ,
        s.parseExprOps = function(e, t) {
            var r = this.start
              , n = this.startLoc
              , o = this.parseMaybeUnary(t, !1, !1, e);
            return this.checkExpressionErrors(t) || o.start === r && "ArrowFunctionExpression" === o.type ? o : this.parseExprOp(o, r, n, -1, e)
        }
        ,
        s.parseExprOp = function(e, t, r, n, o) {
            var i, s, a, l, c, p = this.type.binop;
            if (null != p && (!o || this.type !== E.types._in) && n < p)
                return i = this.type === E.types.logicalOR || this.type === E.types.logicalAND,
                (s = this.type === E.types.coalesce) && (p = E.types.logicalAND.binop),
                a = this.value,
                this.next(),
                l = this.start,
                c = this.startLoc,
                l = this.parseExprOp(this.parseMaybeUnary(null, !1, !1, o), l, c, p, o),
                c = this.buildBinary(t, r, e, l, a, i || s),
                (i && this.type === E.types.coalesce || s && (this.type === E.types.logicalOR || this.type === E.types.logicalAND)) && this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses"),
                this.parseExprOp(c, t, r, n, o);
            return e
        }
        ,
        s.buildBinary = function(e, t, r, n, o, i) {
            "PrivateIdentifier" === n.type && this.raise(n.start, "Private identifier can only be left side of binary expression");
            e = this.startNodeAt(e, t);
            return e.left = r,
            e.operator = o,
            e.right = n,
            this.finishNode(e, i ? "LogicalExpression" : "BinaryExpression")
        }
        ,
        s.parseMaybeUnary = function(e, t, r, n) {
            var o, i = this.start, s = this.startLoc;
            if (this.isContextual("await") && this.canAwait)
                o = this.parseAwait(n),
                t = !0;
            else if (this.type.prefix) {
                var a = this.startNode()
                  , l = this.type === E.types.incDec;
                a.operator = this.value,
                a.prefix = !0,
                this.next(),
                a.argument = this.parseMaybeUnary(null, !0, l, n),
                this.checkExpressionErrors(e, !0),
                l ? this.checkLValSimple(a.argument) : this.strict && "delete" === a.operator && "Identifier" === a.argument.type ? this.raiseRecoverable(a.start, "Deleting local variable in strict mode") : "delete" === a.operator && function e(t) {
                    return "MemberExpression" === t.type && "PrivateIdentifier" === t.property.type || "ChainExpression" === t.type && e(t.expression)
                }(a.argument) ? this.raiseRecoverable(a.start, "Private fields can not be deleted") : t = !0,
                o = this.finishNode(a, l ? "UpdateExpression" : "UnaryExpression")
            } else if (t || this.type !== E.types.privateId) {
                if (o = this.parseExprSubscripts(e, n),
                this.checkExpressionErrors(e))
                    return o;
                for (; this.type.postfix && !this.canInsertSemicolon(); )
                    (a = this.startNodeAt(i, s)).operator = this.value,
                    a.prefix = !1,
                    a.argument = o,
                    this.checkLValSimple(o),
                    this.next(),
                    o = this.finishNode(a, "UpdateExpression")
            } else
                !n && 0 !== this.privateNameStack.length || this.unexpected(),
                o = this.parsePrivateIdent(),
                this.type !== E.types._in && this.unexpected();
            return r || !this.eat(E.types.starstar) ? o : t ? void this.unexpected(this.lastTokStart) : this.buildBinary(i, s, o, this.parseMaybeUnary(null, !1, !1, n), "**", !1)
        }
        ,
        s.parseExprSubscripts = function(e, t) {
            var r = this.start
              , n = this.startLoc
              , o = this.parseExprAtom(e, t);
            if ("ArrowFunctionExpression" === o.type && ")" !== this.input.slice(this.lastTokStart, this.lastTokEnd))
                return o;
            o = this.parseSubscripts(o, r, n, !1, t);
            return e && "MemberExpression" === o.type && (e.parenthesizedAssign >= o.start && (e.parenthesizedAssign = -1),
            e.parenthesizedBind >= o.start && (e.parenthesizedBind = -1),
            e.trailingComma >= o.start && (e.trailingComma = -1)),
            o
        }
        ,
        s.parseSubscripts = function(e, t, r, n, o) {
            for (var i = 8 <= this.options.ecmaVersion && "Identifier" === e.type && "async" === e.name && this.lastTokEnd === e.end && !this.canInsertSemicolon() && e.end - e.start == 5 && this.potentialArrowAt === e.start, s = !1; ; ) {
                var a, l = this.parseSubscript(e, t, r, n, i, s, o);
                if (l.optional && (s = !0),
                l === e || "ArrowFunctionExpression" === l.type)
                    return s && ((a = this.startNodeAt(t, r)).expression = l,
                    l = this.finishNode(a, "ChainExpression")),
                    l;
                e = l
            }
        }
        ,
        s.parseSubscript = function(e, t, r, n, o, i, s) {
            var a = 11 <= this.options.ecmaVersion
              , l = a && this.eat(E.types.questionDot)
              , c = (n && l && this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions"),
            this.eat(E.types.bracketL));
            if (c || l && this.type !== E.types.parenL && this.type !== E.types.backQuote || this.eat(E.types.dot))
                (p = this.startNodeAt(t, r)).object = e,
                c ? (p.property = this.parseExpression(),
                this.expect(E.types.bracketR)) : this.type === E.types.privateId && "Super" !== e.type ? p.property = this.parsePrivateIdent() : p.property = this.parseIdent("never" !== this.options.allowReserved),
                p.computed = !!c,
                a && (p.optional = l),
                e = this.finishNode(p, "MemberExpression");
            else if (!n && this.eat(E.types.parenL)) {
                var p, c = new Wa.DestructuringErrors, n = this.yieldPos, u = this.awaitPos, h = this.awaitIdentPos, d = (this.yieldPos = 0,
                this.awaitPos = 0,
                this.awaitIdentPos = 0,
                this.parseExprList(E.types.parenR, 8 <= this.options.ecmaVersion, !1, c));
                if (o && !l && !this.canInsertSemicolon() && this.eat(E.types.arrow))
                    return this.checkPatternErrors(c, !1),
                    this.checkYieldAwaitInDefaultParams(),
                    0 < this.awaitIdentPos && this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function"),
                    this.yieldPos = n,
                    this.awaitPos = u,
                    this.awaitIdentPos = h,
                    this.parseArrowExpression(this.startNodeAt(t, r), d, !0, s);
                this.checkExpressionErrors(c, !0),
                this.yieldPos = n || this.yieldPos,
                this.awaitPos = u || this.awaitPos,
                this.awaitIdentPos = h || this.awaitIdentPos,
                (p = this.startNodeAt(t, r)).callee = e,
                p.arguments = d,
                a && (p.optional = l),
                e = this.finishNode(p, "CallExpression")
            } else
                this.type === E.types.backQuote && ((l || i) && this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions"),
                (p = this.startNodeAt(t, r)).tag = e,
                p.quasi = this.parseTemplate({
                    isTagged: !0
                }),
                e = this.finishNode(p, "TaggedTemplateExpression"));
            return e
        }
        ,
        s.parseExprAtom = function(e, t) {
            this.type === E.types.slash && this.readRegexp();
            var r = this.potentialArrowAt === this.start;
            switch (this.type) {
            case E.types._super:
                return this.allowSuper || this.raise(this.start, "'super' keyword outside a method"),
                a = this.startNode(),
                this.next(),
                this.type !== E.types.parenL || this.allowDirectSuper || this.raise(a.start, "super() call outside constructor of a subclass"),
                this.type !== E.types.dot && this.type !== E.types.bracketL && this.type !== E.types.parenL && this.unexpected(),
                this.finishNode(a, "Super");
            case E.types._this:
                return a = this.startNode(),
                this.next(),
                this.finishNode(a, "ThisExpression");
            case E.types.name:
                var n = this.start
                  , o = this.startLoc
                  , i = this.containsEsc
                  , s = this.parseIdent(!1);
                if (8 <= this.options.ecmaVersion && !i && "async" === s.name && !this.canInsertSemicolon() && this.eat(E.types._function))
                    return this.overrideContext(tl.types.f_expr),
                    this.parseFunction(this.startNodeAt(n, o), 0, !1, !0, t);
                if (r && !this.canInsertSemicolon()) {
                    if (this.eat(E.types.arrow))
                        return this.parseArrowExpression(this.startNodeAt(n, o), [s], !1, t);
                    if (8 <= this.options.ecmaVersion && "async" === s.name && this.type === E.types.name && !i && (!this.potentialArrowInForAwait || "of" !== this.value || this.containsEsc))
                        return s = this.parseIdent(!1),
                        !this.canInsertSemicolon() && this.eat(E.types.arrow) || this.unexpected(),
                        this.parseArrowExpression(this.startNodeAt(n, o), [s], !0, t)
                }
                return s;
            case E.types.regexp:
                var a, i = this.value;
                return (a = this.parseLiteral(i.value)).regex = {
                    pattern: i.pattern,
                    flags: i.flags
                },
                a;
            case E.types.num:
            case E.types.string:
                return this.parseLiteral(this.value);
            case E.types._null:
            case E.types._true:
            case E.types._false:
                return (a = this.startNode()).value = this.type === E.types._null ? null : this.type === E.types._true,
                a.raw = this.type.keyword,
                this.next(),
                this.finishNode(a, "Literal");
            case E.types.parenL:
                n = this.start,
                o = this.parseParenAndDistinguishExpression(r, t);
                return e && (e.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(o) && (e.parenthesizedAssign = n),
                e.parenthesizedBind < 0 && (e.parenthesizedBind = n)),
                o;
            case E.types.bracketL:
                return a = this.startNode(),
                this.next(),
                a.elements = this.parseExprList(E.types.bracketR, !0, !0, e),
                this.finishNode(a, "ArrayExpression");
            case E.types.braceL:
                return this.overrideContext(tl.types.b_expr),
                this.parseObj(!1, e);
            case E.types._function:
                return a = this.startNode(),
                this.next(),
                this.parseFunction(a, 0);
            case E.types._class:
                return this.parseClass(this.startNode(), !1);
            case E.types._new:
                return this.parseNew();
            case E.types.backQuote:
                return this.parseTemplate();
            case E.types._import:
                return 11 <= this.options.ecmaVersion ? this.parseExprImport() : this.unexpected();
            default:
                this.unexpected()
            }
        }
        ,
        s.parseExprImport = function() {
            var e = this.startNode()
              , t = (this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword import"),
            this.parseIdent(!0));
            switch (this.type) {
            case E.types.parenL:
                return this.parseDynamicImport(e);
            case E.types.dot:
                return e.meta = t,
                this.parseImportMeta(e);
            default:
                this.unexpected()
            }
        }
        ,
        s.parseDynamicImport = function(e) {
            var t;
            return this.next(),
            e.source = this.parseMaybeAssign(),
            this.eat(E.types.parenR) || (t = this.start,
            this.eat(E.types.comma) && this.eat(E.types.parenR) ? this.raiseRecoverable(t, "Trailing comma is not allowed in import()") : this.unexpected(t)),
            this.finishNode(e, "ImportExpression")
        }
        ,
        s.parseImportMeta = function(e) {
            this.next();
            var t = this.containsEsc;
            return e.property = this.parseIdent(!0),
            "meta" !== e.property.name && this.raiseRecoverable(e.property.start, "The only valid meta property for import is 'import.meta'"),
            t && this.raiseRecoverable(e.start, "'import.meta' must not contain escaped characters"),
            "module" === this.options.sourceType || this.options.allowImportExportEverywhere || this.raiseRecoverable(e.start, "Cannot use 'import.meta' outside a module"),
            this.finishNode(e, "MetaProperty")
        }
        ,
        s.parseLiteral = function(e) {
            var t = this.startNode();
            return t.value = e,
            t.raw = this.input.slice(this.start, this.end),
            110 === t.raw.charCodeAt(t.raw.length - 1) && (t.bigint = t.raw.slice(0, -1).replace(/_/g, "")),
            this.next(),
            this.finishNode(t, "Literal")
        }
        ,
        s.parseParenExpression = function() {
            this.expect(E.types.parenL);
            var e = this.parseExpression();
            return this.expect(E.types.parenR),
            e
        }
        ,
        s.parseParenAndDistinguishExpression = function(e, t) {
            var r, n = this.start, o = this.startLoc, i = 8 <= this.options.ecmaVersion;
            if (6 <= this.options.ecmaVersion) {
                this.next();
                var s = this.start
                  , a = this.startLoc
                  , l = []
                  , c = !0
                  , p = !1
                  , u = new Wa.DestructuringErrors
                  , h = this.yieldPos
                  , d = this.awaitPos
                  , f = void 0;
                for (this.yieldPos = 0,
                this.awaitPos = 0; this.type !== E.types.parenR; ) {
                    if (c ? c = !1 : this.expect(E.types.comma),
                    i && this.afterTrailingComma(E.types.parenR, !0)) {
                        p = !0;
                        break
                    }
                    if (this.type === E.types.ellipsis) {
                        f = this.start,
                        l.push(this.parseParenItem(this.parseRestBinding())),
                        this.type === E.types.comma && this.raise(this.start, "Comma is not permitted after the rest element");
                        break
                    }
                    l.push(this.parseMaybeAssign(!1, u, this.parseParenItem))
                }
                var m = this.lastTokEnd
                  , g = this.lastTokEndLoc;
                if (this.expect(E.types.parenR),
                e && !this.canInsertSemicolon() && this.eat(E.types.arrow))
                    return this.checkPatternErrors(u, !1),
                    this.checkYieldAwaitInDefaultParams(),
                    this.yieldPos = h,
                    this.awaitPos = d,
                    this.parseParenArrowList(n, o, l, t);
                l.length && !p || this.unexpected(this.lastTokStart),
                f && this.unexpected(f),
                this.checkExpressionErrors(u, !0),
                this.yieldPos = h || this.yieldPos,
                this.awaitPos = d || this.awaitPos,
                1 < l.length ? ((r = this.startNodeAt(s, a)).expressions = l,
                this.finishNodeAt(r, "SequenceExpression", m, g)) : r = l[0]
            } else
                r = this.parseParenExpression();
            return this.options.preserveParens ? ((e = this.startNodeAt(n, o)).expression = r,
            this.finishNode(e, "ParenthesizedExpression")) : r
        }
        ,
        s.parseParenItem = function(e) {
            return e
        }
        ,
        s.parseParenArrowList = function(e, t, r, n) {
            return this.parseArrowExpression(this.startNodeAt(e, t), r, !1, n)
        }
        ;
        var ol = []
          , Ce = (s.parseNew = function() {
            this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword new");
            var e = this.startNode()
              , t = this.parseIdent(!0);
            if (6 <= this.options.ecmaVersion && this.eat(E.types.dot))
                return e.meta = t,
                t = this.containsEsc,
                e.property = this.parseIdent(!0),
                "target" !== e.property.name && this.raiseRecoverable(e.property.start, "The only valid meta property for new is 'new.target'"),
                t && this.raiseRecoverable(e.start, "'new.target' must not contain escaped characters"),
                this.allowNewDotTarget || this.raiseRecoverable(e.start, "'new.target' can only be used in functions and class static block"),
                this.finishNode(e, "MetaProperty");
            var t = this.start
              , r = this.startLoc
              , n = this.type === E.types._import;
            return e.callee = this.parseSubscripts(this.parseExprAtom(), t, r, !0, !1),
            n && "ImportExpression" === e.callee.type && this.raise(t, "Cannot use new with import()"),
            this.eat(E.types.parenL) ? e.arguments = this.parseExprList(E.types.parenR, 8 <= this.options.ecmaVersion, !1) : e.arguments = ol,
            this.finishNode(e, "NewExpression")
        }
        ,
        s.parseTemplateElement = function(e) {
            var e = e.isTagged
              , t = this.startNode();
            return this.type === E.types.invalidTemplate ? (e || this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal"),
            t.value = {
                raw: this.value,
                cooked: null
            }) : t.value = {
                raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"),
                cooked: this.value
            },
            this.next(),
            t.tail = this.type === E.types.backQuote,
            this.finishNode(t, "TemplateElement")
        }
        ,
        s.parseTemplate = function(e) {
            var e = (void 0 === e ? {} : e).isTagged
              , t = void 0 !== e && e
              , r = this.startNode()
              , n = (this.next(),
            r.expressions = [],
            this.parseTemplateElement({
                isTagged: t
            }));
            for (r.quasis = [n]; !n.tail; )
                this.type === E.types.eof && this.raise(this.pos, "Unterminated template literal"),
                this.expect(E.types.dollarBraceL),
                r.expressions.push(this.parseExpression()),
                this.expect(E.types.braceR),
                r.quasis.push(n = this.parseTemplateElement({
                    isTagged: t
                }));
            return this.next(),
            this.finishNode(r, "TemplateLiteral")
        }
        ,
        s.isAsyncProp = function(e) {
            return !e.computed && "Identifier" === e.key.type && "async" === e.key.name && (this.type === E.types.name || this.type === E.types.num || this.type === E.types.string || this.type === E.types.bracketL || this.type.keyword || 9 <= this.options.ecmaVersion && this.type === E.types.star) && !T.lineBreak.test(this.input.slice(this.lastTokEnd, this.start))
        }
        ,
        s.parseObj = function(e, t) {
            var r = this.startNode()
              , n = !0
              , o = {};
            for (r.properties = [],
            this.next(); !this.eat(E.types.braceR); ) {
                if (n)
                    n = !1;
                else if (this.expect(E.types.comma),
                5 <= this.options.ecmaVersion && this.afterTrailingComma(E.types.braceR))
                    break;
                var i = this.parseProperty(e, t);
                e || this.checkPropClash(i, o, t),
                r.properties.push(i)
            }
            return this.finishNode(r, e ? "ObjectPattern" : "ObjectExpression")
        }
        ,
        s.parseProperty = function(e, t) {
            var r, n, o, i, s = this.startNode();
            if (9 <= this.options.ecmaVersion && this.eat(E.types.ellipsis))
                return e ? (s.argument = this.parseIdent(!1),
                this.type === E.types.comma && this.raise(this.start, "Comma is not permitted after the rest element"),
                this.finishNode(s, "RestElement")) : (this.type === E.types.parenL && t && (t.parenthesizedAssign < 0 && (t.parenthesizedAssign = this.start),
                t.parenthesizedBind < 0 && (t.parenthesizedBind = this.start)),
                s.argument = this.parseMaybeAssign(!1, t),
                this.type === E.types.comma && t && t.trailingComma < 0 && (t.trailingComma = this.start),
                this.finishNode(s, "SpreadElement"));
            6 <= this.options.ecmaVersion && (s.method = !1,
            s.shorthand = !1,
            (e || t) && (o = this.start,
            i = this.startLoc),
            e || (r = this.eat(E.types.star)));
            var a = this.containsEsc;
            return this.parsePropertyName(s),
            !e && !a && 8 <= this.options.ecmaVersion && !r && this.isAsyncProp(s) ? (n = !0,
            r = 9 <= this.options.ecmaVersion && this.eat(E.types.star),
            this.parsePropertyName(s, t)) : n = !1,
            this.parsePropertyValue(s, e, r, n, o, i, t, a),
            this.finishNode(s, "Property")
        }
        ,
        s.parsePropertyValue = function(e, t, r, n, o, i, s, a) {
            (r || n) && this.type === E.types.colon && this.unexpected(),
            this.eat(E.types.colon) ? (e.value = t ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(!1, s),
            e.kind = "init") : 6 <= this.options.ecmaVersion && this.type === E.types.parenL ? (t && this.unexpected(),
            e.kind = "init",
            e.method = !0,
            e.value = this.parseMethod(r, n)) : t || a || !(5 <= this.options.ecmaVersion) || e.computed || "Identifier" !== e.key.type || "get" !== e.key.name && "set" !== e.key.name || this.type === E.types.comma || this.type === E.types.braceR || this.type === E.types.eq ? 6 <= this.options.ecmaVersion && !e.computed && "Identifier" === e.key.type ? ((r || n) && this.unexpected(),
            this.checkUnreserved(e.key),
            "await" !== e.key.name || this.awaitIdentPos || (this.awaitIdentPos = o),
            e.kind = "init",
            t ? e.value = this.parseMaybeDefault(o, i, this.copyNode(e.key)) : this.type === E.types.eq && s ? (s.shorthandAssign < 0 && (s.shorthandAssign = this.start),
            e.value = this.parseMaybeDefault(o, i, this.copyNode(e.key))) : e.value = this.copyNode(e.key),
            e.shorthand = !0) : this.unexpected() : ((r || n) && this.unexpected(),
            e.kind = e.key.name,
            this.parsePropertyName(e),
            e.value = this.parseMethod(!1),
            a = "get" === e.kind ? 0 : 1,
            e.value.params.length !== a ? (t = e.value.start,
            "get" === e.kind ? this.raiseRecoverable(t, "getter should have no params") : this.raiseRecoverable(t, "setter should have exactly one param")) : "set" === e.kind && "RestElement" === e.value.params[0].type && this.raiseRecoverable(e.value.params[0].start, "Setter cannot use rest params"))
        }
        ,
        s.parsePropertyName = function(e) {
            if (6 <= this.options.ecmaVersion) {
                if (this.eat(E.types.bracketL))
                    return e.computed = !0,
                    e.key = this.parseMaybeAssign(),
                    this.expect(E.types.bracketR),
                    e.key;
                e.computed = !1
            }
            return e.key = this.type === E.types.num || this.type === E.types.string ? this.parseExprAtom() : this.parseIdent("never" !== this.options.allowReserved)
        }
        ,
        s.initFunction = function(e) {
            e.id = null,
            6 <= this.options.ecmaVersion && (e.generator = e.expression = !1),
            8 <= this.options.ecmaVersion && (e.async = !1)
        }
        ,
        s.parseMethod = function(e, t, r) {
            var n = this.startNode()
              , o = this.yieldPos
              , i = this.awaitPos
              , s = this.awaitIdentPos;
            return this.initFunction(n),
            6 <= this.options.ecmaVersion && (n.generator = e),
            8 <= this.options.ecmaVersion && (n.async = !!t),
            this.yieldPos = 0,
            this.awaitPos = 0,
            this.awaitIdentPos = 0,
            this.enterScope((0,
            A.functionFlags)(t, n.generator) | A.SCOPE_SUPER | (r ? A.SCOPE_DIRECT_SUPER : 0)),
            this.expect(E.types.parenL),
            n.params = this.parseBindingList(E.types.parenR, !1, 8 <= this.options.ecmaVersion),
            this.checkYieldAwaitInDefaultParams(),
            this.parseFunctionBody(n, !1, !0, !1),
            this.yieldPos = o,
            this.awaitPos = i,
            this.awaitIdentPos = s,
            this.finishNode(n, "FunctionExpression")
        }
        ,
        s.parseArrowExpression = function(e, t, r, n) {
            var o = this.yieldPos
              , i = this.awaitPos
              , s = this.awaitIdentPos;
            return this.enterScope((0,
            A.functionFlags)(r, !1) | A.SCOPE_ARROW),
            this.initFunction(e),
            8 <= this.options.ecmaVersion && (e.async = !!r),
            this.yieldPos = 0,
            this.awaitPos = 0,
            this.awaitIdentPos = 0,
            e.params = this.toAssignableList(t, !0),
            this.parseFunctionBody(e, !0, !1, n),
            this.yieldPos = o,
            this.awaitPos = i,
            this.awaitIdentPos = s,
            this.finishNode(e, "ArrowFunctionExpression")
        }
        ,
        s.parseFunctionBody = function(e, t, r, n) {
            var o = t && this.type !== E.types.braceL
              , i = this.strict
              , s = !1;
            o ? (e.body = this.parseMaybeAssign(n),
            e.expression = !0,
            this.checkParams(e, !1)) : (o = 7 <= this.options.ecmaVersion && !this.isSimpleParamList(e.params),
            i && !o || (s = this.strictDirective(this.end)) && o && this.raiseRecoverable(e.start, "Illegal 'use strict' directive in function with non-simple parameter list"),
            n = this.labels,
            this.labels = [],
            s && (this.strict = !0),
            this.checkParams(e, !i && !s && !t && !r && this.isSimpleParamList(e.params)),
            this.strict && e.id && this.checkLValSimple(e.id, A.BIND_OUTSIDE),
            e.body = this.parseBlock(!1, void 0, s && !i),
            e.expression = !1,
            this.adaptDirectivePrologue(e.body.body),
            this.labels = n),
            this.exitScope()
        }
        ,
        s.isSimpleParamList = function(e) {
            for (var t, r = rl(e); !(t = r()).done; )
                if ("Identifier" !== t.value.type)
                    return !1;
            return !0
        }
        ,
        s.checkParams = function(e, t) {
            for (var r = Object.create(null), n = rl(e.params); !(o = n()).done; ) {
                var o = o.value;
                this.checkLValInnerPattern(o, A.BIND_VAR, t ? null : r)
            }
        }
        ,
        s.parseExprList = function(e, t, r, n) {
            for (var o = [], i = !0; !this.eat(e); ) {
                if (i)
                    i = !1;
                else if (this.expect(E.types.comma),
                t && this.afterTrailingComma(e))
                    break;
                var s = void 0;
                r && this.type === E.types.comma ? s = null : this.type === E.types.ellipsis ? (s = this.parseSpread(n),
                n && this.type === E.types.comma && n.trailingComma < 0 && (n.trailingComma = this.start)) : s = this.parseMaybeAssign(!1, n),
                o.push(s)
            }
            return o
        }
        ,
        s.checkUnreserved = function(e) {
            var t = e.start
              , r = e.end
              , e = e.name;
            this.inGenerator && "yield" === e && this.raiseRecoverable(t, "Cannot use 'yield' as identifier inside a generator"),
            this.inAsync && "await" === e && this.raiseRecoverable(t, "Cannot use 'await' as identifier inside an async function"),
            this.currentThisScope().inClassFieldInit && "arguments" === e && this.raiseRecoverable(t, "Cannot use 'arguments' in class field initializer"),
            !this.inClassStaticBlock || "arguments" !== e && "await" !== e || this.raise(t, "Cannot use " + e + " in class static initialization block"),
            this.keywords.test(e) && this.raise(t, "Unexpected keyword '" + e + "'"),
            this.options.ecmaVersion < 6 && -1 !== this.input.slice(t, r).indexOf("\\") || (this.strict ? this.reservedWordsStrict : this.reservedWords).test(e) && (this.inAsync || "await" !== e || this.raiseRecoverable(t, "Cannot use keyword 'await' outside an async function"),
            this.raiseRecoverable(t, "The keyword '" + e + "' is reserved"))
        }
        ,
        s.parseIdent = function(e, t) {
            var r = this.startNode();
            return this.type === E.types.name ? r.name = this.value : this.type.keyword ? (r.name = this.type.keyword,
            "class" !== r.name && "function" !== r.name || this.lastTokEnd === this.lastTokStart + 1 && 46 === this.input.charCodeAt(this.lastTokStart) || this.context.pop()) : this.unexpected(),
            this.next(!!e),
            this.finishNode(r, "Identifier"),
            e || (this.checkUnreserved(r),
            "await" !== r.name || this.awaitIdentPos || (this.awaitIdentPos = r.start)),
            r
        }
        ,
        s.parsePrivateIdent = function() {
            var e = this.startNode();
            return this.type === E.types.privateId ? e.name = this.value : this.unexpected(),
            this.next(),
            this.finishNode(e, "PrivateIdentifier"),
            0 === this.privateNameStack.length ? this.raise(e.start, "Private field '#" + e.name + "' must be declared in an enclosing class") : this.privateNameStack[this.privateNameStack.length - 1].used.push(e),
            e
        }
        ,
        s.parseYield = function(e) {
            this.yieldPos || (this.yieldPos = this.start);
            var t = this.startNode();
            return this.next(),
            this.type === E.types.semi || this.canInsertSemicolon() || this.type !== E.types.star && !this.type.startsExpr ? (t.delegate = !1,
            t.argument = null) : (t.delegate = this.eat(E.types.star),
            t.argument = this.parseMaybeAssign(e)),
            this.finishNode(t, "YieldExpression")
        }
        ,
        s.parseAwait = function(e) {
            this.awaitPos || (this.awaitPos = this.start);
            var t = this.startNode();
            return this.next(),
            t.argument = this.parseMaybeUnary(null, !0, !1, e),
            this.finishNode(t, "AwaitExpression")
        }
        ,
        Va.Parser.prototype)
          , t = (Ce.raise = function(e, t) {
            var r = (0,
            Fa.getLineInfo)(this.input, e)
              , t = (t += " (" + r.line + ":" + r.column + ")",
            new SyntaxError(t));
            throw t.pos = e,
            t.loc = r,
            t.raisedAt = this.pos,
            t
        }
        ,
        Ce.raiseRecoverable = Ce.raise,
        Ce.curPosition = function() {
            if (this.options.locations)
                return new Fa.Position(this.curLine,this.pos - this.lineStart)
        }
        ,
        Va.Parser.prototype)
          , il = function(e) {
            this.flags = e,
            this.var = [],
            this.lexical = [],
            this.functions = [],
            this.inClassFieldInit = !1
        }
          , sl = (t.enterScope = function(e) {
            this.scopeStack.push(new il(e))
        }
        ,
        t.exitScope = function() {
            this.scopeStack.pop()
        }
        ,
        t.treatFunctionsAsVarInScope = function(e) {
            return e.flags & A.SCOPE_FUNCTION || !this.inModule && e.flags & A.SCOPE_TOP
        }
        ,
        t.declareName = function(e, t, r) {
            var n = !1;
            if (t === A.BIND_LEXICAL) {
                n = -1 < (o = this.currentScope()).lexical.indexOf(e) || -1 < o.functions.indexOf(e) || -1 < o.var.indexOf(e);
                o.lexical.push(e),
                this.inModule && o.flags & A.SCOPE_TOP && delete this.undefinedExports[e]
            } else if (t === A.BIND_SIMPLE_CATCH)
                (o = this.currentScope()).lexical.push(e);
            else if (t === A.BIND_FUNCTION) {
                var o = this.currentScope();
                n = this.treatFunctionsAsVar ? -1 < o.lexical.indexOf(e) : -1 < o.lexical.indexOf(e) || -1 < o.var.indexOf(e),
                o.functions.push(e)
            } else
                for (var i = this.scopeStack.length - 1; 0 <= i; --i) {
                    if (-1 < (o = this.scopeStack[i]).lexical.indexOf(e) && !(o.flags & A.SCOPE_SIMPLE_CATCH && o.lexical[0] === e) || !this.treatFunctionsAsVarInScope(o) && -1 < o.functions.indexOf(e)) {
                        n = !0;
                        break
                    }
                    if (o.var.push(e),
                    this.inModule && o.flags & A.SCOPE_TOP && delete this.undefinedExports[e],
                    o.flags & A.SCOPE_VAR)
                        break
                }
            n && this.raiseRecoverable(r, "Identifier '" + e + "' has already been declared")
        }
        ,
        t.checkLocalExport = function(e) {
            -1 === this.scopeStack[0].lexical.indexOf(e.name) && -1 === this.scopeStack[0].var.indexOf(e.name) && (this.undefinedExports[e.name] = e)
        }
        ,
        t.currentScope = function() {
            return this.scopeStack[this.scopeStack.length - 1]
        }
        ,
        t.currentVarScope = function() {
            for (var e = this.scopeStack.length - 1; ; e--) {
                var t = this.scopeStack[e];
                if (t.flags & A.SCOPE_VAR)
                    return t
            }
        }
        ,
        t.currentThisScope = function() {
            for (var e = this.scopeStack.length - 1; ; e--) {
                var t = this.scopeStack[e];
                if (t.flags & A.SCOPE_VAR && !(t.flags & A.SCOPE_ARROW))
                    return t
            }
        }
        ,
        j(function(e, t) {
            t.__esModule = !0,
            t.Node = void 0;
            var n = function(e, t, r) {
                this.type = "",
                this.start = t,
                this.end = 0,
                e.options.locations && (this.loc = new Fa.SourceLocation(e,r)),
                e.options.directSourceFile && (this.sourceFile = e.options.directSourceFile),
                e.options.ranges && (this.range = [t, 0])
            }
              , t = (t.Node = n,
            Va.Parser.prototype);
            function o(e, t, r, n) {
                return e.type = t,
                e.end = r,
                this.options.locations && (e.loc.end = n),
                this.options.ranges && (e.range[1] = r),
                e
            }
            t.startNode = function() {
                return new n(this,this.start,this.startLoc)
            }
            ,
            t.startNodeAt = function(e, t) {
                return new n(this,e,t)
            }
            ,
            t.finishNode = function(e, t) {
                return o.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc)
            }
            ,
            t.finishNodeAt = function(e, t, r, n) {
                return o.call(this, e, t, r, n)
            }
            ,
            t.copyNode = function(e) {
                var t, r = new n(this,e.start,this.startLoc);
                for (t in e)
                    r[t] = e[t];
                return r
            }
        }))
          , al = j(function(e, t) {
            t.__esModule = !0,
            t.default = void 0;
            var r = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS"
              , n = r + " Extended_Pictographic"
              , o = n + " EBase EComp EMod EPres ExtPict"
              , i = {
                9: r,
                10: n,
                11: n,
                12: o,
                13: "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS Extended_Pictographic EBase EComp EMod EPres ExtPict"
            }
              , s = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu"
              , r = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb"
              , n = r + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd"
              , o = n + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho"
              , a = o + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi"
              , l = {
                9: r,
                10: n,
                11: o,
                12: a,
                13: "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith"
            }
              , c = {};
            for (var p, u = 0, h = [9, 10, 11, 12, 13]; u < h.length; u++)
                (p = c[p = h[u]] = {
                    binary: (0,
                    Ba.wordsRegexp)(i[p] + " " + s),
                    nonBinary: {
                        General_Category: (0,
                        Ba.wordsRegexp)(s),
                        Script: (0,
                        Ba.wordsRegexp)(l[p])
                    }
                }).nonBinary.Script_Extensions = p.nonBinary.Script,
                p.nonBinary.gc = p.nonBinary.General_Category,
                p.nonBinary.sc = p.nonBinary.Script,
                p.nonBinary.scx = p.nonBinary.Script_Extensions;
            t.default = c,
            e.exports = t.default
        })
          , ll = j(function(e, t) {
            t.__esModule = !0,
            t.RegExpValidationState = void 0;
            var r = (i = al) && i.__esModule ? i : {
                default: i
            };
            function n(e, t) {
                var r, n = "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
                if (n)
                    return (n = n.call(e)).next.bind(n);
                if (Array.isArray(e) || (n = function(e, t) {
                    if (e) {
                        if ("string" == typeof e)
                            return o(e, t);
                        var r = Object.prototype.toString.call(e).slice(8, -1);
                        return "Map" === (r = "Object" === r && e.constructor ? e.constructor.name : r) || "Set" === r ? Array.from(e) : "Arguments" === r || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? o(e, t) : void 0
                    }
                }(e)) || t && e && "number" == typeof e.length)
                    return n && (e = n),
                    r = 0,
                    function() {
                        return r >= e.length ? {
                            done: !0
                        } : {
                            done: !1,
                            value: e[r++]
                        }
                    }
                    ;
                throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
            }
            function o(e, t) {
                (null == t || t > e.length) && (t = e.length);
                for (var r = 0, n = new Array(t); r < t; r++)
                    n[r] = e[r];
                return n
            }
            var i = Va.Parser.prototype;
            function s(e) {
                this.parser = e,
                this.validFlags = "gim" + (6 <= e.options.ecmaVersion ? "uy" : "") + (9 <= e.options.ecmaVersion ? "s" : "") + (13 <= e.options.ecmaVersion ? "d" : ""),
                this.unicodeProperties = r.default[13 <= e.options.ecmaVersion ? 13 : e.options.ecmaVersion],
                this.source = "",
                this.flags = "",
                this.start = 0,
                this.switchU = !1,
                this.switchN = !1,
                this.pos = 0,
                this.lastIntValue = 0,
                this.lastStringValue = "",
                this.lastAssertionIsQuantifiable = !1,
                this.numCapturingParens = 0,
                this.maxBackReference = 0,
                this.groupNames = [],
                this.backReferenceNames = []
            }
            function a(e) {
                return e <= 65535 ? String.fromCharCode(e) : (e -= 65536,
                String.fromCharCode(55296 + (e >> 10), 56320 + (1023 & e)))
            }
            function l(e) {
                return 36 === e || 40 <= e && e <= 43 || 46 === e || 63 === e || 91 <= e && e <= 94 || 123 <= e && e <= 125
            }
            function c(e) {
                return 65 <= e && e <= 90 || 97 <= e && e <= 122
            }
            function p(e) {
                return c(e) || 95 === e
            }
            function u(e) {
                return 48 <= e && e <= 57
            }
            function h(e) {
                return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102
            }
            function d(e) {
                return 65 <= e && e <= 70 ? e - 65 + 10 : 97 <= e && e <= 102 ? e - 97 + 10 : e - 48
            }
            function f(e) {
                return 48 <= e && e <= 55
            }
            s.prototype.reset = function(e, t, r) {
                var n = -1 !== r.indexOf("u");
                this.start = 0 | e,
                this.source = t + "",
                this.flags = r,
                this.switchU = n && 6 <= this.parser.options.ecmaVersion,
                this.switchN = n && 9 <= this.parser.options.ecmaVersion
            }
            ,
            s.prototype.raise = function(e) {
                this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + e)
            }
            ,
            s.prototype.at = function(e, t) {
                void 0 === t && (t = !1);
                var r = this.source
                  , n = r.length;
                if (n <= e)
                    return -1;
                var o = r.charCodeAt(e);
                if (!t && !this.switchU || o <= 55295 || 57344 <= o || n <= e + 1)
                    return o;
                t = r.charCodeAt(e + 1);
                return 56320 <= t && t <= 57343 ? (o << 10) + t - 56613888 : o
            }
            ,
            s.prototype.nextIndex = function(e, t) {
                void 0 === t && (t = !1);
                var r = this.source
                  , n = r.length;
                if (n <= e)
                    return n;
                var o = r.charCodeAt(e);
                return !t && !this.switchU || o <= 55295 || 57344 <= o || n <= e + 1 || (t = r.charCodeAt(e + 1)) < 56320 || 57343 < t ? e + 1 : e + 2
            }
            ,
            s.prototype.current = function(e) {
                return this.at(this.pos, e = void 0 === e ? !1 : e)
            }
            ,
            s.prototype.lookahead = function(e) {
                return this.at(this.nextIndex(this.pos, e = void 0 === e ? !1 : e), e)
            }
            ,
            s.prototype.advance = function(e) {
                this.pos = this.nextIndex(this.pos, e = void 0 === e ? !1 : e)
            }
            ,
            s.prototype.eat = function(e, t) {
                return this.current(t = void 0 === t ? !1 : t) === e && (this.advance(t),
                !0)
            }
            ,
            t.RegExpValidationState = s,
            i.validateRegExpFlags = function(e) {
                for (var t = e.validFlags, r = e.flags, n = 0; n < r.length; n++) {
                    var o = r.charAt(n);
                    -1 === t.indexOf(o) && this.raise(e.start, "Invalid regular expression flag"),
                    -1 < r.indexOf(o, n + 1) && this.raise(e.start, "Duplicate regular expression flag")
                }
            }
            ,
            i.validateRegExpPattern = function(e) {
                this.regexp_pattern(e),
                !e.switchN && 9 <= this.options.ecmaVersion && 0 < e.groupNames.length && (e.switchN = !0,
                this.regexp_pattern(e))
            }
            ,
            i.regexp_pattern = function(e) {
                e.pos = 0,
                e.lastIntValue = 0,
                e.lastStringValue = "",
                e.lastAssertionIsQuantifiable = !1,
                e.numCapturingParens = 0,
                e.maxBackReference = 0,
                e.groupNames.length = 0,
                e.backReferenceNames.length = 0,
                this.regexp_disjunction(e),
                e.pos !== e.source.length && (e.eat(41) && e.raise("Unmatched ')'"),
                (e.eat(93) || e.eat(125)) && e.raise("Lone quantifier brackets")),
                e.maxBackReference > e.numCapturingParens && e.raise("Invalid escape");
                for (var t = n(e.backReferenceNames); !(r = t()).done; ) {
                    var r = r.value;
                    -1 === e.groupNames.indexOf(r) && e.raise("Invalid named capture referenced")
                }
            }
            ,
            i.regexp_disjunction = function(e) {
                for (this.regexp_alternative(e); e.eat(124); )
                    this.regexp_alternative(e);
                this.regexp_eatQuantifier(e, !0) && e.raise("Nothing to repeat"),
                e.eat(123) && e.raise("Lone quantifier brackets")
            }
            ,
            i.regexp_alternative = function(e) {
                for (; e.pos < e.source.length && this.regexp_eatTerm(e); )
                    ;
            }
            ,
            i.regexp_eatTerm = function(e) {
                return this.regexp_eatAssertion(e) ? (e.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(e) && e.switchU && e.raise("Invalid quantifier"),
                !0) : !(e.switchU ? !this.regexp_eatAtom(e) : !this.regexp_eatExtendedAtom(e)) && (this.regexp_eatQuantifier(e),
                !0)
            }
            ,
            i.regexp_eatAssertion = function(e) {
                var t = e.pos;
                if (e.lastAssertionIsQuantifiable = !1,
                e.eat(94) || e.eat(36))
                    return !0;
                if (e.eat(92)) {
                    if (e.eat(66) || e.eat(98))
                        return !0;
                    e.pos = t
                }
                if (e.eat(40) && e.eat(63)) {
                    var r = !1;
                    if (9 <= this.options.ecmaVersion && (r = e.eat(60)),
                    e.eat(61) || e.eat(33))
                        return this.regexp_disjunction(e),
                        e.eat(41) || e.raise("Unterminated group"),
                        e.lastAssertionIsQuantifiable = !r,
                        !0
                }
                return e.pos = t,
                !1
            }
            ,
            i.regexp_eatQuantifier = function(e, t) {
                return !!this.regexp_eatQuantifierPrefix(e, t = void 0 === t ? !1 : t) && (e.eat(63),
                !0)
            }
            ,
            i.regexp_eatQuantifierPrefix = function(e, t) {
                return e.eat(42) || e.eat(43) || e.eat(63) || this.regexp_eatBracedQuantifier(e, t)
            }
            ,
            i.regexp_eatBracedQuantifier = function(e, t) {
                var r = e.pos;
                if (e.eat(123)) {
                    var n, o = -1;
                    if (this.regexp_eatDecimalDigits(e) && (n = e.lastIntValue,
                    e.eat(44) && this.regexp_eatDecimalDigits(e) && (o = e.lastIntValue),
                    e.eat(125)))
                        return -1 !== o && o < n && !t && e.raise("numbers out of order in {} quantifier"),
                        !0;
                    e.switchU && !t && e.raise("Incomplete quantifier"),
                    e.pos = r
                }
                return !1
            }
            ,
            i.regexp_eatAtom = function(e) {
                return this.regexp_eatPatternCharacters(e) || e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e)
            }
            ,
            i.regexp_eatReverseSolidusAtomEscape = function(e) {
                var t = e.pos;
                if (e.eat(92)) {
                    if (this.regexp_eatAtomEscape(e))
                        return !0;
                    e.pos = t
                }
                return !1
            }
            ,
            i.regexp_eatUncapturingGroup = function(e) {
                var t = e.pos;
                if (e.eat(40)) {
                    if (e.eat(63) && e.eat(58)) {
                        if (this.regexp_disjunction(e),
                        e.eat(41))
                            return !0;
                        e.raise("Unterminated group")
                    }
                    e.pos = t
                }
                return !1
            }
            ,
            i.regexp_eatCapturingGroup = function(e) {
                if (e.eat(40)) {
                    if (9 <= this.options.ecmaVersion ? this.regexp_groupSpecifier(e) : 63 === e.current() && e.raise("Invalid group"),
                    this.regexp_disjunction(e),
                    e.eat(41))
                        return e.numCapturingParens += 1,
                        !0;
                    e.raise("Unterminated group")
                }
                return !1
            }
            ,
            i.regexp_eatExtendedAtom = function(e) {
                return e.eat(46) || this.regexp_eatReverseSolidusAtomEscape(e) || this.regexp_eatCharacterClass(e) || this.regexp_eatUncapturingGroup(e) || this.regexp_eatCapturingGroup(e) || this.regexp_eatInvalidBracedQuantifier(e) || this.regexp_eatExtendedPatternCharacter(e)
            }
            ,
            i.regexp_eatInvalidBracedQuantifier = function(e) {
                return this.regexp_eatBracedQuantifier(e, !0) && e.raise("Nothing to repeat"),
                !1
            }
            ,
            i.regexp_eatSyntaxCharacter = function(e) {
                var t = e.current();
                return !!l(t) && (e.lastIntValue = t,
                e.advance(),
                !0)
            }
            ,
            i.regexp_eatPatternCharacters = function(e) {
                for (var t, r = e.pos; -1 !== (t = e.current()) && !l(t); )
                    e.advance();
                return e.pos !== r
            }
            ,
            i.regexp_eatExtendedPatternCharacter = function(e) {
                var t = e.current();
                return !(-1 === t || 36 === t || 40 <= t && t <= 43 || 46 === t || 63 === t || 91 === t || 94 === t || 124 === t) && (e.advance(),
                !0)
            }
            ,
            i.regexp_groupSpecifier = function(e) {
                if (e.eat(63)) {
                    if (this.regexp_eatGroupName(e))
                        return -1 !== e.groupNames.indexOf(e.lastStringValue) && e.raise("Duplicate capture group name"),
                        void e.groupNames.push(e.lastStringValue);
                    e.raise("Invalid group")
                }
            }
            ,
            i.regexp_eatGroupName = function(e) {
                if (e.lastStringValue = "",
                e.eat(60)) {
                    if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62))
                        return !0;
                    e.raise("Invalid capture group name")
                }
                return !1
            }
            ,
            i.regexp_eatRegExpIdentifierName = function(e) {
                if (e.lastStringValue = "",
                this.regexp_eatRegExpIdentifierStart(e)) {
                    for (e.lastStringValue += a(e.lastIntValue); this.regexp_eatRegExpIdentifierPart(e); )
                        e.lastStringValue += a(e.lastIntValue);
                    return !0
                }
                return !1
            }
            ,
            i.regexp_eatRegExpIdentifierStart = function(e) {
                var t = e.pos
                  , r = 11 <= this.options.ecmaVersion
                  , n = e.current(r);
                return e.advance(r),
                92 === n && this.regexp_eatRegExpUnicodeEscapeSequence(e, r) && (n = e.lastIntValue),
                r = n,
                (0,
                Ha.isIdentifierStart)(r, !0) || 36 === r || 95 === r ? (e.lastIntValue = n,
                !0) : (e.pos = t,
                !1)
            }
            ,
            i.regexp_eatRegExpIdentifierPart = function(e) {
                var t = e.pos
                  , r = 11 <= this.options.ecmaVersion
                  , n = e.current(r);
                return e.advance(r),
                92 === n && this.regexp_eatRegExpUnicodeEscapeSequence(e, r) && (n = e.lastIntValue),
                r = n,
                (0,
                Ha.isIdentifierChar)(r, !0) || 36 === r || 95 === r || 8204 === r || 8205 === r ? (e.lastIntValue = n,
                !0) : (e.pos = t,
                !1)
            }
            ,
            i.regexp_eatAtomEscape = function(e) {
                return !!(this.regexp_eatBackReference(e) || this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e) || e.switchN && this.regexp_eatKGroupName(e)) || (e.switchU && (99 === e.current() && e.raise("Invalid unicode escape"),
                e.raise("Invalid escape")),
                !1)
            }
            ,
            i.regexp_eatBackReference = function(e) {
                var t = e.pos;
                if (this.regexp_eatDecimalEscape(e)) {
                    var r = e.lastIntValue;
                    if (e.switchU)
                        return r > e.maxBackReference && (e.maxBackReference = r),
                        !0;
                    if (r <= e.numCapturingParens)
                        return !0;
                    e.pos = t
                }
                return !1
            }
            ,
            i.regexp_eatKGroupName = function(e) {
                if (e.eat(107)) {
                    if (this.regexp_eatGroupName(e))
                        return e.backReferenceNames.push(e.lastStringValue),
                        !0;
                    e.raise("Invalid named reference")
                }
                return !1
            }
            ,
            i.regexp_eatCharacterEscape = function(e) {
                return this.regexp_eatControlEscape(e) || this.regexp_eatCControlLetter(e) || this.regexp_eatZero(e) || this.regexp_eatHexEscapeSequence(e) || this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) || !e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e) || this.regexp_eatIdentityEscape(e)
            }
            ,
            i.regexp_eatCControlLetter = function(e) {
                var t = e.pos;
                if (e.eat(99)) {
                    if (this.regexp_eatControlLetter(e))
                        return !0;
                    e.pos = t
                }
                return !1
            }
            ,
            i.regexp_eatZero = function(e) {
                return 48 === e.current() && !u(e.lookahead()) && (e.lastIntValue = 0,
                e.advance(),
                !0)
            }
            ,
            i.regexp_eatControlEscape = function(e) {
                var t = e.current();
                return 116 === t ? (e.lastIntValue = 9,
                e.advance(),
                !0) : 110 === t ? (e.lastIntValue = 10,
                e.advance(),
                !0) : 118 === t ? (e.lastIntValue = 11,
                e.advance(),
                !0) : 102 === t ? (e.lastIntValue = 12,
                e.advance(),
                !0) : 114 === t && (e.lastIntValue = 13,
                e.advance(),
                !0)
            }
            ,
            i.regexp_eatControlLetter = function(e) {
                var t = e.current();
                return !!c(t) && (e.lastIntValue = t % 32,
                e.advance(),
                !0)
            }
            ,
            i.regexp_eatRegExpUnicodeEscapeSequence = function(e, t) {
                var r = e.pos
                  , t = (t = void 0 === t ? !1 : t) || e.switchU;
                if (e.eat(117)) {
                    if (this.regexp_eatFixedHexDigits(e, 4)) {
                        var n = e.lastIntValue;
                        if (t && 55296 <= n && n <= 56319) {
                            var o = e.pos;
                            if (e.eat(92) && e.eat(117) && this.regexp_eatFixedHexDigits(e, 4)) {
                                var i = e.lastIntValue;
                                if (56320 <= i && i <= 57343)
                                    return e.lastIntValue = 1024 * (n - 55296) + (i - 56320) + 65536,
                                    !0
                            }
                            e.pos = o,
                            e.lastIntValue = n
                        }
                        return !0
                    }
                    if (t && e.eat(123) && this.regexp_eatHexDigits(e) && e.eat(125) && (0 <= (i = e.lastIntValue) && i <= 1114111))
                        return !0;
                    t && e.raise("Invalid unicode escape"),
                    e.pos = r
                }
                return !1
            }
            ,
            i.regexp_eatIdentityEscape = function(e) {
                if (e.switchU)
                    return !!this.regexp_eatSyntaxCharacter(e) || !!e.eat(47) && (e.lastIntValue = 47,
                    !0);
                var t = e.current();
                return !(99 === t || e.switchN && 107 === t) && (e.lastIntValue = t,
                e.advance(),
                !0)
            }
            ,
            i.regexp_eatDecimalEscape = function(e) {
                e.lastIntValue = 0;
                var t = e.current();
                if (49 <= t && t <= 57) {
                    for (; e.lastIntValue = 10 * e.lastIntValue + (t - 48),
                    e.advance(),
                    48 <= (t = e.current()) && t <= 57; )
                        ;
                    return !0
                }
                return !1
            }
            ,
            i.regexp_eatCharacterClassEscape = function(e) {
                var t, r = e.current();
                if (100 === (t = r) || 68 === t || 115 === t || 83 === t || 119 === t || 87 === t)
                    return e.lastIntValue = -1,
                    e.advance(),
                    !0;
                if (e.switchU && 9 <= this.options.ecmaVersion && (80 === r || 112 === r)) {
                    if (e.lastIntValue = -1,
                    e.advance(),
                    e.eat(123) && this.regexp_eatUnicodePropertyValueExpression(e) && e.eat(125))
                        return !0;
                    e.raise("Invalid property name")
                }
                return !1
            }
            ,
            i.regexp_eatUnicodePropertyValueExpression = function(e) {
                var t = e.pos;
                if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
                    var r, n = e.lastStringValue;
                    if (this.regexp_eatUnicodePropertyValue(e))
                        return r = e.lastStringValue,
                        this.regexp_validateUnicodePropertyNameAndValue(e, n, r),
                        !0
                }
                return e.pos = t,
                !!this.regexp_eatLoneUnicodePropertyNameOrValue(e) && (n = e.lastStringValue,
                this.regexp_validateUnicodePropertyNameOrValue(e, n),
                !0)
            }
            ,
            i.regexp_validateUnicodePropertyNameAndValue = function(e, t, r) {
                (0,
                Ba.hasOwn)(e.unicodeProperties.nonBinary, t) || e.raise("Invalid property name"),
                e.unicodeProperties.nonBinary[t].test(r) || e.raise("Invalid property value")
            }
            ,
            i.regexp_validateUnicodePropertyNameOrValue = function(e, t) {
                e.unicodeProperties.binary.test(t) || e.raise("Invalid property name")
            }
            ,
            i.regexp_eatUnicodePropertyName = function(e) {
                var t;
                for (e.lastStringValue = ""; p(t = e.current()); )
                    e.lastStringValue += a(t),
                    e.advance();
                return "" !== e.lastStringValue
            }
            ,
            i.regexp_eatUnicodePropertyValue = function(e) {
                var t, r;
                for (e.lastStringValue = ""; p(r = t = e.current()) || u(r); )
                    e.lastStringValue += a(t),
                    e.advance();
                return "" !== e.lastStringValue
            }
            ,
            i.regexp_eatLoneUnicodePropertyNameOrValue = function(e) {
                return this.regexp_eatUnicodePropertyValue(e)
            }
            ,
            i.regexp_eatCharacterClass = function(e) {
                if (e.eat(91)) {
                    if (e.eat(94),
                    this.regexp_classRanges(e),
                    e.eat(93))
                        return !0;
                    e.raise("Unterminated character class")
                }
                return !1
            }
            ,
            i.regexp_classRanges = function(e) {
                for (; this.regexp_eatClassAtom(e); ) {
                    var t, r = e.lastIntValue;
                    e.eat(45) && this.regexp_eatClassAtom(e) && (t = e.lastIntValue,
                    !e.switchU || -1 !== r && -1 !== t || e.raise("Invalid character class"),
                    -1 !== r && -1 !== t && t < r && e.raise("Range out of order in character class"))
                }
            }
            ,
            i.regexp_eatClassAtom = function(e) {
                var t = e.pos;
                if (e.eat(92)) {
                    if (this.regexp_eatClassEscape(e))
                        return !0;
                    e.switchU && (99 !== (r = e.current()) && !f(r) || e.raise("Invalid class escape"),
                    e.raise("Invalid escape")),
                    e.pos = t
                }
                var r = e.current();
                return 93 !== r && (e.lastIntValue = r,
                e.advance(),
                !0)
            }
            ,
            i.regexp_eatClassEscape = function(e) {
                var t = e.pos;
                if (e.eat(98))
                    return e.lastIntValue = 8,
                    !0;
                if (e.switchU && e.eat(45))
                    return e.lastIntValue = 45,
                    !0;
                if (!e.switchU && e.eat(99)) {
                    if (this.regexp_eatClassControlLetter(e))
                        return !0;
                    e.pos = t
                }
                return this.regexp_eatCharacterClassEscape(e) || this.regexp_eatCharacterEscape(e)
            }
            ,
            i.regexp_eatClassControlLetter = function(e) {
                var t = e.current();
                return !(!u(t) && 95 !== t) && (e.lastIntValue = t % 32,
                e.advance(),
                !0)
            }
            ,
            i.regexp_eatHexEscapeSequence = function(e) {
                var t = e.pos;
                if (e.eat(120)) {
                    if (this.regexp_eatFixedHexDigits(e, 2))
                        return !0;
                    e.switchU && e.raise("Invalid escape"),
                    e.pos = t
                }
                return !1
            }
            ,
            i.regexp_eatDecimalDigits = function(e) {
                var t, r = e.pos;
                for (e.lastIntValue = 0; u(t = e.current()); )
                    e.lastIntValue = 10 * e.lastIntValue + (t - 48),
                    e.advance();
                return e.pos !== r
            }
            ,
            i.regexp_eatHexDigits = function(e) {
                var t, r = e.pos;
                for (e.lastIntValue = 0; h(t = e.current()); )
                    e.lastIntValue = 16 * e.lastIntValue + d(t),
                    e.advance();
                return e.pos !== r
            }
            ,
            i.regexp_eatLegacyOctalEscapeSequence = function(e) {
                var t, r;
                return !!this.regexp_eatOctalDigit(e) && (t = e.lastIntValue,
                this.regexp_eatOctalDigit(e) ? (r = e.lastIntValue,
                t <= 3 && this.regexp_eatOctalDigit(e) ? e.lastIntValue = 64 * t + 8 * r + e.lastIntValue : e.lastIntValue = 8 * t + r) : e.lastIntValue = t,
                !0)
            }
            ,
            i.regexp_eatOctalDigit = function(e) {
                var t = e.current();
                return f(t) ? (e.lastIntValue = t - 48,
                e.advance(),
                !0) : (e.lastIntValue = 0,
                !1)
            }
            ,
            i.regexp_eatFixedHexDigits = function(e, t) {
                for (var r = e.pos, n = e.lastIntValue = 0; n < t; ++n) {
                    var o = e.current();
                    if (!h(o))
                        return e.pos = r,
                        !1;
                    e.lastIntValue = 16 * e.lastIntValue + d(o),
                    e.advance()
                }
                return !0
            }
        })
          , cl = j(function(e, t) {
            t.__esModule = !0,
            t.Token = void 0;
            var r = function(e) {
                this.type = e.type,
                this.value = e.value,
                this.start = e.start,
                this.end = e.end,
                e.options.locations && (this.loc = new Fa.SourceLocation(e,e.startLoc,e.endLoc)),
                e.options.ranges && (this.range = [e.start, e.end])
            }
              , t = (t.Token = r,
            Va.Parser.prototype);
            function o(e) {
                return "function" != typeof BigInt ? null : BigInt(e.replace(/_/g, ""))
            }
            function i(e) {
                return e <= 65535 ? String.fromCharCode(e) : (e -= 65536,
                String.fromCharCode(55296 + (e >> 10), 56320 + (1023 & e)))
            }
            t.next = function(e) {
                !e && this.type.keyword && this.containsEsc && this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword),
                this.options.onToken && this.options.onToken(new r(this)),
                this.lastTokEnd = this.end,
                this.lastTokStart = this.start,
                this.lastTokEndLoc = this.endLoc,
                this.lastTokStartLoc = this.startLoc,
                this.nextToken()
            }
            ,
            t.getToken = function() {
                return this.next(),
                new r(this)
            }
            ,
            "undefined" != typeof Symbol && (t[Symbol.iterator] = function() {
                var t = this;
                return {
                    next: function() {
                        var e = t.getToken();
                        return {
                            done: e.type === E.types.eof,
                            value: e
                        }
                    }
                }
            }
            ),
            t.nextToken = function() {
                var e = this.curContext();
                return e && e.preserveSpace || this.skipSpace(),
                this.start = this.pos,
                this.options.locations && (this.startLoc = this.curPosition()),
                this.pos >= this.input.length ? this.finishToken(E.types.eof) : e.override ? e.override(this) : void this.readToken(this.fullCharCodeAtPos())
            }
            ,
            t.readToken = function(e) {
                return (0,
                Ha.isIdentifierStart)(e, 6 <= this.options.ecmaVersion) || 92 === e ? this.readWord() : this.getTokenFromCode(e)
            }
            ,
            t.fullCharCodeAtPos = function() {
                var e = this.input.charCodeAt(this.pos);
                if (e <= 55295 || 56320 <= e)
                    return e;
                var t = this.input.charCodeAt(this.pos + 1);
                return t <= 56319 || 57344 <= t ? e : (e << 10) + t - 56613888
            }
            ,
            t.skipBlockComment = function() {
                var e = this.options.onComment && this.curPosition()
                  , t = this.pos
                  , r = this.input.indexOf("*/", this.pos += 2);
                if (-1 === r && this.raise(this.pos - 2, "Unterminated comment"),
                this.pos = r + 2,
                this.options.locations)
                    for (var n, o = t; -1 < (n = (0,
                    T.nextLineBreak)(this.input, o, this.pos)); )
                        ++this.curLine,
                        o = this.lineStart = n;
                this.options.onComment && this.options.onComment(!0, this.input.slice(t + 2, r), t, this.pos, e, this.curPosition())
            }
            ,
            t.skipLineComment = function(e) {
                for (var t = this.pos, r = this.options.onComment && this.curPosition(), n = this.input.charCodeAt(this.pos += e); this.pos < this.input.length && !(0,
                T.isNewLine)(n); )
                    n = this.input.charCodeAt(++this.pos);
                this.options.onComment && this.options.onComment(!1, this.input.slice(t + e, this.pos), t, this.pos, r, this.curPosition())
            }
            ,
            t.skipSpace = function() {
                e: for (; this.pos < this.input.length; ) {
                    var e = this.input.charCodeAt(this.pos);
                    switch (e) {
                    case 32:
                    case 160:
                        ++this.pos;
                        break;
                    case 13:
                        10 === this.input.charCodeAt(this.pos + 1) && ++this.pos;
                    case 10:
                    case 8232:
                    case 8233:
                        ++this.pos,
                        this.options.locations && (++this.curLine,
                        this.lineStart = this.pos);
                        break;
                    case 47:
                        switch (this.input.charCodeAt(this.pos + 1)) {
                        case 42:
                            this.skipBlockComment();
                            break;
                        case 47:
                            this.skipLineComment(2);
                            break;
                        default:
                            break e
                        }
                        break;
                    default:
                        if (!(8 < e && e < 14 || 5760 <= e && T.nonASCIIwhitespace.test(String.fromCharCode(e))))
                            break e;
                        ++this.pos
                    }
                }
            }
            ,
            t.finishToken = function(e, t) {
                this.end = this.pos,
                this.options.locations && (this.endLoc = this.curPosition());
                var r = this.type;
                this.type = e,
                this.value = t,
                this.updateContext(r)
            }
            ,
            t.readToken_dot = function() {
                var e = this.input.charCodeAt(this.pos + 1);
                if (48 <= e && e <= 57)
                    return this.readNumber(!0);
                var t = this.input.charCodeAt(this.pos + 2);
                return 6 <= this.options.ecmaVersion && 46 === e && 46 === t ? (this.pos += 3,
                this.finishToken(E.types.ellipsis)) : (++this.pos,
                this.finishToken(E.types.dot))
            }
            ,
            t.readToken_slash = function() {
                var e = this.input.charCodeAt(this.pos + 1);
                return this.exprAllowed ? (++this.pos,
                this.readRegexp()) : 61 === e ? this.finishOp(E.types.assign, 2) : this.finishOp(E.types.slash, 1)
            }
            ,
            t.readToken_mult_modulo_exp = function(e) {
                var t = this.input.charCodeAt(this.pos + 1)
                  , r = 1
                  , n = 42 === e ? E.types.star : E.types.modulo;
                return 7 <= this.options.ecmaVersion && 42 === e && 42 === t && (++r,
                n = E.types.starstar,
                t = this.input.charCodeAt(this.pos + 2)),
                61 === t ? this.finishOp(E.types.assign, r + 1) : this.finishOp(n, r)
            }
            ,
            t.readToken_pipe_amp = function(e) {
                var t = this.input.charCodeAt(this.pos + 1);
                if (t !== e)
                    return 61 === t ? this.finishOp(E.types.assign, 2) : this.finishOp(124 === e ? E.types.bitwiseOR : E.types.bitwiseAND, 1);
                if (12 <= this.options.ecmaVersion && 61 === this.input.charCodeAt(this.pos + 2))
                    return this.finishOp(E.types.assign, 3);
                return this.finishOp(124 === e ? E.types.logicalOR : E.types.logicalAND, 2)
            }
            ,
            t.readToken_caret = function() {
                return 61 === this.input.charCodeAt(this.pos + 1) ? this.finishOp(E.types.assign, 2) : this.finishOp(E.types.bitwiseXOR, 1)
            }
            ,
            t.readToken_plus_min = function(e) {
                var t = this.input.charCodeAt(this.pos + 1);
                return t === e ? 45 !== t || this.inModule || 62 !== this.input.charCodeAt(this.pos + 2) || 0 !== this.lastTokEnd && !T.lineBreak.test(this.input.slice(this.lastTokEnd, this.pos)) ? this.finishOp(E.types.incDec, 2) : (this.skipLineComment(3),
                this.skipSpace(),
                this.nextToken()) : 61 === t ? this.finishOp(E.types.assign, 2) : this.finishOp(E.types.plusMin, 1)
            }
            ,
            t.readToken_lt_gt = function(e) {
                var t = this.input.charCodeAt(this.pos + 1)
                  , r = 1;
                return t === e ? (r = 62 === e && 62 === this.input.charCodeAt(this.pos + 2) ? 3 : 2,
                61 === this.input.charCodeAt(this.pos + r) ? this.finishOp(E.types.assign, r + 1) : this.finishOp(E.types.bitShift, r)) : 33 !== t || 60 !== e || this.inModule || 45 !== this.input.charCodeAt(this.pos + 2) || 45 !== this.input.charCodeAt(this.pos + 3) ? this.finishOp(E.types.relational, r = 61 === t ? 2 : r) : (this.skipLineComment(4),
                this.skipSpace(),
                this.nextToken())
            }
            ,
            t.readToken_eq_excl = function(e) {
                var t = this.input.charCodeAt(this.pos + 1);
                return 61 === t ? this.finishOp(E.types.equality, 61 === this.input.charCodeAt(this.pos + 2) ? 3 : 2) : 61 === e && 62 === t && 6 <= this.options.ecmaVersion ? (this.pos += 2,
                this.finishToken(E.types.arrow)) : this.finishOp(61 === e ? E.types.eq : E.types.prefix, 1)
            }
            ,
            t.readToken_question = function() {
                var e = this.options.ecmaVersion;
                if (11 <= e) {
                    var t, r = this.input.charCodeAt(this.pos + 1);
                    if (46 === r)
                        if ((t = this.input.charCodeAt(this.pos + 2)) < 48 || 57 < t)
                            return this.finishOp(E.types.questionDot, 2);
                    if (63 === r) {
                        if (12 <= e)
                            if (61 === (t = this.input.charCodeAt(this.pos + 2)))
                                return this.finishOp(E.types.assign, 3);
                        return this.finishOp(E.types.coalesce, 2)
                    }
                }
                return this.finishOp(E.types.question, 1)
            }
            ,
            t.readToken_numberSign = function() {
                var e = this.options.ecmaVersion
                  , t = 35;
                if (13 <= e && (++this.pos,
                t = this.fullCharCodeAtPos(),
                (0,
                Ha.isIdentifierStart)(t, !0) || 92 === t))
                    return this.finishToken(E.types.privateId, this.readWord1());
                this.raise(this.pos, "Unexpected character '" + i(t) + "'")
            }
            ,
            t.getTokenFromCode = function(e) {
                switch (e) {
                case 46:
                    return this.readToken_dot();
                case 40:
                    return ++this.pos,
                    this.finishToken(E.types.parenL);
                case 41:
                    return ++this.pos,
                    this.finishToken(E.types.parenR);
                case 59:
                    return ++this.pos,
                    this.finishToken(E.types.semi);
                case 44:
                    return ++this.pos,
                    this.finishToken(E.types.comma);
                case 91:
                    return ++this.pos,
                    this.finishToken(E.types.bracketL);
                case 93:
                    return ++this.pos,
                    this.finishToken(E.types.bracketR);
                case 123:
                    return ++this.pos,
                    this.finishToken(E.types.braceL);
                case 125:
                    return ++this.pos,
                    this.finishToken(E.types.braceR);
                case 58:
                    return ++this.pos,
                    this.finishToken(E.types.colon);
                case 96:
                    if (this.options.ecmaVersion < 6)
                        break;
                    return ++this.pos,
                    this.finishToken(E.types.backQuote);
                case 48:
                    var t = this.input.charCodeAt(this.pos + 1);
                    if (120 === t || 88 === t)
                        return this.readRadixNumber(16);
                    if (6 <= this.options.ecmaVersion) {
                        if (111 === t || 79 === t)
                            return this.readRadixNumber(8);
                        if (98 === t || 66 === t)
                            return this.readRadixNumber(2)
                    }
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                    return this.readNumber(!1);
                case 34:
                case 39:
                    return this.readString(e);
                case 47:
                    return this.readToken_slash();
                case 37:
                case 42:
                    return this.readToken_mult_modulo_exp(e);
                case 124:
                case 38:
                    return this.readToken_pipe_amp(e);
                case 94:
                    return this.readToken_caret();
                case 43:
                case 45:
                    return this.readToken_plus_min(e);
                case 60:
                case 62:
                    return this.readToken_lt_gt(e);
                case 61:
                case 33:
                    return this.readToken_eq_excl(e);
                case 63:
                    return this.readToken_question();
                case 126:
                    return this.finishOp(E.types.prefix, 1);
                case 35:
                    return this.readToken_numberSign()
                }
                this.raise(this.pos, "Unexpected character '" + i(e) + "'")
            }
            ,
            t.finishOp = function(e, t) {
                var r = this.input.slice(this.pos, this.pos + t);
                return this.pos += t,
                this.finishToken(e, r)
            }
            ,
            t.readRegexp = function() {
                for (var e, t, r = this.pos; ; ) {
                    this.pos >= this.input.length && this.raise(r, "Unterminated regular expression");
                    var n = this.input.charAt(this.pos);
                    if (T.lineBreak.test(n) && this.raise(r, "Unterminated regular expression"),
                    e)
                        e = !1;
                    else {
                        if ("[" === n)
                            t = !0;
                        else if ("]" === n && t)
                            t = !1;
                        else if ("/" === n && !t)
                            break;
                        e = "\\" === n
                    }
                    ++this.pos
                }
                var o = this.input.slice(r, this.pos)
                  , i = (++this.pos,
                this.pos)
                  , s = this.readWord1()
                  , i = (this.containsEsc && this.unexpected(i),
                this.regexpState || (this.regexpState = new ll.RegExpValidationState(this)))
                  , i = (i.reset(r, o, s),
                this.validateRegExpFlags(i),
                this.validateRegExpPattern(i),
                null);
                try {
                    i = new RegExp(o,s)
                } catch (e) {}
                return this.finishToken(E.types.regexp, {
                    pattern: o,
                    flags: s,
                    value: i
                })
            }
            ,
            t.readInt = function(e, t, r) {
                for (var n = 12 <= this.options.ecmaVersion && void 0 === t, o = r && 48 === this.input.charCodeAt(this.pos), r = this.pos, i = 0, s = 0, a = 0, l = null == t ? 1 / 0 : t; a < l; ++a,
                ++this.pos) {
                    var c = this.input.charCodeAt(this.pos)
                      , p = void 0;
                    if (n && 95 === c)
                        o && this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals"),
                        95 === s && this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore"),
                        0 === a && this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits"),
                        s = c;
                    else {
                        if (e <= (p = 97 <= c ? c - 97 + 10 : 65 <= c ? c - 65 + 10 : 48 <= c && c <= 57 ? c - 48 : 1 / 0))
                            break;
                        s = c,
                        i = i * e + p
                    }
                }
                return n && 95 === s && this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits"),
                this.pos === r || null != t && this.pos - r !== t ? null : i
            }
            ,
            t.readRadixNumber = function(e) {
                var t = this.pos
                  , r = (this.pos += 2,
                this.readInt(e));
                return null == r && this.raise(this.start + 2, "Expected number in radix " + e),
                11 <= this.options.ecmaVersion && 110 === this.input.charCodeAt(this.pos) ? (r = o(this.input.slice(t, this.pos)),
                ++this.pos) : (0,
                Ha.isIdentifierStart)(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"),
                this.finishToken(E.types.num, r)
            }
            ,
            t.readNumber = function(e) {
                var t = this.pos
                  , r = (e || null !== this.readInt(10, void 0, !0) || this.raise(t, "Invalid number"),
                2 <= this.pos - t && 48 === this.input.charCodeAt(t))
                  , n = (r && this.strict && this.raise(t, "Invalid number"),
                this.input.charCodeAt(this.pos));
                if (!r && !e && 11 <= this.options.ecmaVersion && 110 === n)
                    return e = o(this.input.slice(t, this.pos)),
                    ++this.pos,
                    (0,
                    Ha.isIdentifierStart)(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number"),
                    this.finishToken(E.types.num, e);
                r && /[89]/.test(this.input.slice(t, this.pos)) && (r = !1),
                46 !== n || r || (++this.pos,
                this.readInt(10),
                n = this.input.charCodeAt(this.pos)),
                69 !== n && 101 !== n || r || (43 !== (n = this.input.charCodeAt(++this.pos)) && 45 !== n || ++this.pos,
                null === this.readInt(10) && this.raise(t, "Invalid number")),
                (0,
                Ha.isIdentifierStart)(this.fullCharCodeAtPos()) && this.raise(this.pos, "Identifier directly after number");
                e = this.input.slice(t, this.pos);
                n = r ? parseInt(e, 8) : parseFloat(e.replace(/_/g, ""));
                return this.finishToken(E.types.num, n)
            }
            ,
            t.readCodePoint = function() {
                var e, t;
                return 123 === this.input.charCodeAt(this.pos) ? (this.options.ecmaVersion < 6 && this.unexpected(),
                e = ++this.pos,
                t = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos),
                ++this.pos,
                1114111 < t && this.invalidStringToken(e, "Code point out of bounds")) : t = this.readHexChar(4),
                t
            }
            ,
            t.readString = function(e) {
                for (var t = "", r = ++this.pos; ; ) {
                    this.pos >= this.input.length && this.raise(this.start, "Unterminated string constant");
                    var n = this.input.charCodeAt(this.pos);
                    if (n === e)
                        break;
                    92 === n ? (t = (t += this.input.slice(r, this.pos)) + this.readEscapedChar(!1),
                    r = this.pos) : 8232 === n || 8233 === n ? (this.options.ecmaVersion < 10 && this.raise(this.start, "Unterminated string constant"),
                    ++this.pos,
                    this.options.locations && (this.curLine++,
                    this.lineStart = this.pos)) : ((0,
                    T.isNewLine)(n) && this.raise(this.start, "Unterminated string constant"),
                    ++this.pos)
                }
                return t += this.input.slice(r, this.pos++),
                this.finishToken(E.types.string, t)
            }
            ;
            var n = {};
            t.tryReadTemplateToken = function() {
                this.inTemplateElement = !0;
                try {
                    this.readTmplToken()
                } catch (e) {
                    if (e !== n)
                        throw e;
                    this.readInvalidTemplateToken()
                }
                this.inTemplateElement = !1
            }
            ,
            t.invalidStringToken = function(e, t) {
                if (this.inTemplateElement && 9 <= this.options.ecmaVersion)
                    throw n;
                this.raise(e, t)
            }
            ,
            t.readTmplToken = function() {
                for (var e = "", t = this.pos; ; ) {
                    this.pos >= this.input.length && this.raise(this.start, "Unterminated template");
                    var r = this.input.charCodeAt(this.pos);
                    if (96 === r || 36 === r && 123 === this.input.charCodeAt(this.pos + 1))
                        return this.pos !== this.start || this.type !== E.types.template && this.type !== E.types.invalidTemplate ? (e += this.input.slice(t, this.pos),
                        this.finishToken(E.types.template, e)) : 36 === r ? (this.pos += 2,
                        this.finishToken(E.types.dollarBraceL)) : (++this.pos,
                        this.finishToken(E.types.backQuote));
                    if (92 === r)
                        e = (e += this.input.slice(t, this.pos)) + this.readEscapedChar(!0),
                        t = this.pos;
                    else if ((0,
                    T.isNewLine)(r)) {
                        switch (e += this.input.slice(t, this.pos),
                        ++this.pos,
                        r) {
                        case 13:
                            10 === this.input.charCodeAt(this.pos) && ++this.pos;
                        case 10:
                            e += "\n";
                            break;
                        default:
                            e += String.fromCharCode(r)
                        }
                        this.options.locations && (++this.curLine,
                        this.lineStart = this.pos),
                        t = this.pos
                    } else
                        ++this.pos
                }
            }
            ,
            t.readInvalidTemplateToken = function() {
                for (; this.pos < this.input.length; this.pos++)
                    switch (this.input[this.pos]) {
                    case "\\":
                        ++this.pos;
                        break;
                    case "$":
                        if ("{" !== this.input[this.pos + 1])
                            break;
                    case "`":
                        return this.finishToken(E.types.invalidTemplate, this.input.slice(this.start, this.pos))
                    }
                this.raise(this.start, "Unterminated template")
            }
            ,
            t.readEscapedChar = function(e) {
                var t, r, n = this.input.charCodeAt(++this.pos);
                switch (++this.pos,
                n) {
                case 110:
                    return "\n";
                case 114:
                    return "\r";
                case 120:
                    return String.fromCharCode(this.readHexChar(2));
                case 117:
                    return i(this.readCodePoint());
                case 116:
                    return "\t";
                case 98:
                    return "\b";
                case 118:
                    return "\v";
                case 102:
                    return "\f";
                case 13:
                    10 === this.input.charCodeAt(this.pos) && ++this.pos;
                case 10:
                    return this.options.locations && (this.lineStart = this.pos,
                    ++this.curLine),
                    "";
                case 56:
                case 57:
                    if (this.strict && this.invalidStringToken(this.pos - 1, "Invalid escape sequence"),
                    e)
                        return t = this.pos - 1,
                        this.invalidStringToken(t, "Invalid escape sequence in template string"),
                        null;
                default:
                    return 48 <= n && n <= 55 ? (t = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0],
                    255 < (r = parseInt(t, 8)) && (t = t.slice(0, -1),
                    r = parseInt(t, 8)),
                    this.pos += t.length - 1,
                    n = this.input.charCodeAt(this.pos),
                    "0" === t && 56 !== n && 57 !== n || !this.strict && !e || this.invalidStringToken(this.pos - 1 - t.length, e ? "Octal literal in template string" : "Octal literal in strict mode"),
                    String.fromCharCode(r)) : (0,
                    T.isNewLine)(n) ? "" : String.fromCharCode(n)
                }
            }
            ,
            t.readHexChar = function(e) {
                var t = this.pos
                  , e = this.readInt(16, e);
                return null === e && this.invalidStringToken(t, "Bad character escape sequence"),
                e
            }
            ,
            t.readWord1 = function() {
                for (var e = "", t = !(this.containsEsc = !1), r = this.pos, n = 6 <= this.options.ecmaVersion; this.pos < this.input.length; ) {
                    var o = this.fullCharCodeAtPos();
                    if ((0,
                    Ha.isIdentifierChar)(o, n))
                        this.pos += o <= 65535 ? 1 : 2;
                    else {
                        if (92 !== o)
                            break;
                        this.containsEsc = !0,
                        e += this.input.slice(r, this.pos);
                        var o = this.pos
                          , i = (117 !== this.input.charCodeAt(++this.pos) && this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX"),
                        ++this.pos,
                        this.readCodePoint());
                        (t ? Ha.isIdentifierStart : Ha.isIdentifierChar)(i, n) || this.invalidStringToken(o, "Invalid Unicode escape"),
                        e += this.input.substr(this.pos - 6, 6),
                        r = this.pos
                    }
                    t = !1
                }
                return e + this.input.slice(r, this.pos)
            }
            ,
            t.readWord = function() {
                var e = this.readWord1()
                  , t = E.types.name;
                return this.keywords.test(e) && (t = E.keywords[e]),
                this.finishToken(t, e)
            }
        })
          , pl = j(function(e, t) {
            t.__esModule = !0,
            t.parse = function(e, t) {
                return Va.Parser.parse(e, t)
            }
            ,
            t.parseExpressionAt = function(e, t, r) {
                return Va.Parser.parseExpressionAt(e, t, r)
            }
            ,
            t.tokenizer = function(e, t) {
                return Va.Parser.tokenizer(e, t)
            }
            ,
            t.version = void 0,
            t.Parser = Va.Parser,
            t.defaultOptions = Ua.defaultOptions,
            t.Position = Fa.Position,
            t.SourceLocation = Fa.SourceLocation,
            t.getLineInfo = Fa.getLineInfo,
            t.Node = sl.Node,
            t.TokenType = E.TokenType,
            t.tokTypes = E.types,
            t.keywordTypes = E.keywords,
            t.TokContext = tl.TokContext,
            t.tokContexts = tl.types,
            t.isIdentifierChar = Ha.isIdentifierChar,
            t.isIdentifierStart = Ha.isIdentifierStart,
            t.Token = cl.Token,
            t.isNewLine = T.isNewLine,
            t.lineBreak = T.lineBreak,
            t.lineBreakG = T.lineBreakG,
            t.nonASCIIwhitespace = T.nonASCIIwhitespace;
            var r = function(e, t) {
                if (!t && e && e.__esModule)
                    return e;
                if (null === e || "object" != typeof e && "function" != typeof e)
                    return {
                        default: e
                    };
                t = s(t);
                if (t && t.has(e))
                    return t.get(e);
                var r, n = {}, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
                for (r in e) {
                    var i;
                    "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && ((i = o ? Object.getOwnPropertyDescriptor(e, r) : null) && (i.get || i.set) ? Object.defineProperty(n, r, i) : n[r] = e[r])
                }
                n.default = e,
                t && t.set(e, n);
                return n
            }(Ba);
            function s(e) {
                if ("function" != typeof WeakMap)
                    return null;
                var t = new WeakMap
                  , r = new WeakMap;
                return (s = function(e) {
                    return e ? r : t
                }
                )(e)
            }
            t.version = "8.7.0",
            Va.Parser.acorn = {
                Parser: Va.Parser,
                version: "8.7.0",
                defaultOptions: Ua.defaultOptions,
                Position: Fa.Position,
                SourceLocation: Fa.SourceLocation,
                getLineInfo: Fa.getLineInfo,
                Node: sl.Node,
                TokenType: E.TokenType,
                tokTypes: E.types,
                keywordTypes: E.keywords,
                TokContext: tl.TokContext,
                tokContexts: tl.types,
                isIdentifierChar: Ha.isIdentifierChar,
                isIdentifierStart: Ha.isIdentifierStart,
                Token: cl.Token,
                isNewLine: T.isNewLine,
                lineBreak: T.lineBreak,
                lineBreakG: T.lineBreakG,
                nonASCIIwhitespace: T.nonASCIIwhitespace
            };
            var n = r.wordsRegexp
              , o = {};
            r.wordsRegexp = function(e) {
                return o[e] || (o[e] = n(e)),
                o[e]
            }
        })
          , ul = /^(\xEF\xBB\xBF|\xFE\xFF|\xFF\xFE|\x00\x00\xFE\xFF|\xFF\xFE\x00\x00|\x2B\x2F\x76\x38|\x2B\x2F\x76\x39|\x2B\x2F\x76\x2B|\x2B\x2F\x76\x2F|\xF7\x64\x4C|\xDD\x73\x66\x73|\x0E\xFE\xFF|\xFB\xEE\x28|\x84\x31\x95\x33)/;
        var hl = /(^|\n)\s*<!--[^\n]*(\n|$)/g
          , dl = /^\s*\{.*\}\s*$/
          , fl = /;\s*$/
          , ml = /^\s*\((.*)\);\s*$/
          , gl = /(?:\/\/[@#][ \t]+sourceMappingURL=([^\s'"]+?)[ \t]*$)/gm
          , yl = new RegExp([xa(v.getLocation), xa(v.setLocation), xa(v.getProperty), xa(v.setProperty), xa(v.callMethod), xa(v.processScript), xa(v.processHtml), xa(v.getPostMessage), xa(v.getProxyUrl)].join("|"))
          , vl = {
            allowReturnOutsideFunction: !0,
            allowImportExportEverywhere: !0,
            ecmaVersion: 13
        };
        function El(e) {
            var t = (t = (t = e).match(ul)) ? t[0] : null;
            return {
                bom: t,
                preprocessed: Da(t ? e.substring(t.length) : e).replace(gl, "")
            }
        }
        function Sl(e, t) {
            e = t ? "(" + e + ")" : e;
            try {
                return pl.parse(e, vl)
            } catch (e) {
                return null
            }
        }
        function _l(e, t) {
            var r, e = Zi(e, {
                format: {
                    quotes: "double",
                    escapeless: !0,
                    compact: !0
                }
            });
            return t ? (r = e,
            fl.test(t) ? r : r.replace(fl, "")) : e
        }
        function bl(e) {
            return yl.test(e)
        }
        function wl(e, t, r, n, o) {
            void 0 === t && (t = !1),
            void 0 === r && (r = !1);
            var i = El(e)
              , s = i.bom
              , i = i.preprocessed
              , a = function(e) {
                for (; e = e.replace(hl, "\n"),
                hl.test(e); )
                    ;
                return e
            }(i)
              , l = (l = a,
            p = dl.test(l),
            !(c = Sl(l, p)) && p && (c = Sl(l, !1),
            p = !1),
            {
                ast: c,
                isObject: p
            })
              , c = l.ast
              , p = l.isObject;
            if (!c)
                return e;
            t = t && !p && (l = c.body[0],
            !(1 === c.body.length && l.type === C.ExpressionStatement && l.expression.type === C.ArrayExpression));
            var e = wa(c, r, n)
              , l = e.length ? function(e, t, r) {
                var n = r ? -1 : 0
                  , o = []
                  , i = 0;
                if (!t.length)
                    return e;
                t.sort(function(e, t) {
                    return e.start - t.start || e.end - t.end || (e.node.type === C.VariableDeclaration ? 0 : 1) - (t.node.type === C.VariableDeclaration ? 0 : 1)
                });
                for (var s = 0, a = t; s < a.length; s++) {
                    var l = a[s]
                      , c = l.start + n
                      , p = l.end + n
                      , u = l.node.type === C.SequenceExpression && l.parentType !== C.ExpressionStatement && l.parentType !== C.SequenceExpression;
                    o.push(e.substring(i, c)),
                    o.push(u ? "(" : " "),
                    o.push(_l(l.node, e.substring(c, p))),
                    o.push(u ? ")" : " "),
                    i += p - i
                }
                return o.push(e.substring(i)),
                o.join("")
            }(a, e, p) : i;
            return r = l,
            n = t,
            a = s,
            e = function(e) {
                if (e.body.length) {
                    e = e.body[0];
                    if (e.type === C.ExpressionStatement && e.expression.type === C.Literal)
                        return "use strict" === e.expression.value
                }
                return !1
            }(c),
            i = o,
            n && (r = Ma(r, e, i)),
            l = a ? a + r : r,
            l = p ? l.replace(ml, "$1") : l
        }
        var xl = Object.freeze({
            __proto__: null,
            isScriptProcessed: bl,
            processScript: wl
        })
          , Cl = {
            href: ["a", "link", "image", "area", "base"],
            src: ["img", "embed", "script", "source", "video", "audio", "input", "frame", "iframe"],
            action: ["form"],
            formaction: ["button", "input"],
            manifest: ["html"],
            data: ["object"]
        }
          , Tl = ["href", "src", "action", "formaction", "manifest", "data"]
          , Al = {
            target: ["a", "form", "area", "base"],
            formtarget: ["input", "button"]
        }
          , Pl = ["target", "formtarget"]
          , Il = ["sandbox", "autocomplete", "target", "formtarget", "style"]
          , Nl = /\/\*\s*[#@]\s*sourceMappingURL\s*=[\s\S]*?\*\/|\/\/[\t ]*[#@][\t ]*sourceMappingURL[\t ]*=.*/gi
          , Ol = /(url\s*\(\s*(['"]?))([^\s]*?)(\2\s*\))|(@import\s+(['"]))([^\s]*?)(\6)/g
          , Ll = /((?:(\W?)(\w+))?\[\s*)(\w+)(\s*\^?=)/g
          , kl = "/*hammerhead|stylesheet|start*/"
          , Dl = "/*hammerhead|stylesheet|end*/"
          , Ml = /:\s*hover(\W)/gi
          , Rl = new RegExp("\\[" + a.hoverPseudoClass + "\\](\\W)","ig")
          , jl = new RegExp("\\s*" + xa(kl),"gi")
          , Hl = new RegExp(xa(kl) + "\n?|\n?" + xa(Dl) + "\\s*","gi");
        function Bl() {
            this.STYLESHEET_PROCESSING_START_COMMENT = kl,
            this.STYLESHEET_PROCESSING_END_COMMENT = Dl
        }
        Bl.prototype.process = function(e, t, r) {
            return !e || "string" != typeof e || r && jl.test(e) ? e : (e = (e = e.replace(Ml, "[" + a.hoverPseudoClass + "]$1")).replace(Nl, ""),
            e = this._replaceStylesheetUrls(e, t),
            e = this._replaceUrlAttributes(e),
            r ? kl + "\n" + e + "\n" + Dl : e)
        }
        ,
        Bl.prototype.cleanUp = function(e, r) {
            return "string" != typeof e ? e : (e = e.replace(Rl, ":hover$1").replace(a.storedAttrPostfix, ""),
            e = this._removeStylesheetProcessingComments(e),
            this._replaceStylesheetUrls(e, function(e) {
                var t = r(e);
                return t ? t.destUrl : e
            }))
        }
        ,
        Bl.prototype._removeStylesheetProcessingComments = function(e) {
            var t = e.split(Hl);
            if (!(3 <= t.length))
                return e;
            for (var r = 0; r < t.length; r += 2) {
                for (var n = 0, o = t[r].length - 1; 0 <= o && /\s/.test(t[r][o]); o--)
                    n++;
                t[r] = t[r].substring(0, t[r].length - n)
            }
            return t.join("")
        }
        ,
        Bl.prototype._replaceStylesheetUrls = function(e, c) {
            return e.replace(Ol, function(e, t, r, n, o, i, s, a, l) {
                t = t || i,
                i = n || a,
                n = _t(i) ? i : c(i);
                return i ? t + n + (o || l) : e
            })
        }
        ,
        Bl.prototype._replaceUrlAttributes = function(e) {
            return e.replace(Ll, function(e, t, r, n, o, i) {
                r = "." === r || "#" === r ? "" : n;
                return r && Cl[o] && -1 !== Cl[o].indexOf(r) ? t + P.getStoredAttrName(o) + i : e
            })
        }
        ;
        var Fl = new Bl
          , Ul = "authorization"
          , Vl = "www-authenticate"
          , Gl = "proxy-authorization"
          , Wl = "proxy-authenticate"
          , ql = "refresh"
          , Kl = "cache-control"
          , zl = "content-security-policy"
          , Xl = /^(\s)*\/\/<!\[CDATA\[([\s\S]*)\/\/\]\]>(\s)*$/
          , $l = /(\/\/[^\n]*|\n\s*)-->[^\n]*([\n\s]*)?$/
          , Yl = /^(\s)*<!--[^\n]*\n/
          , Ql = /-->\s*$/
          , Jl = /^\s*javascript\s*:/i
          , Zl = /^\s*(application\/(x-)?(ecma|java)script|text\/(javascript(1\.[0-5])?|((x-)?ecma|x-java|js|live)script)|module)\s*$/i
          , ec = ["animate", "animateColor", "animateMotion", "animateTransform", "mpath", "set", "linearGradient", "radialGradient", "stop", "a", "altglyph", "color-profile", "cursor", "feimage", "filter", "font-face-uri", "glyphref", "image", "mpath", "pattern", "script", "textpath", "use", "tref"]
          , tc = ["script", "link"]
          , rc = ["a", "form", "area", "input", "button"]
          , nc = "modulepreload"
          , oc = "hammerhead|element-processed"
          , ic = "hammerhead|autocomplete-attribute-absence-marker"
          , P = (I.isTagWithTargetAttr = function(e) {
            return !!e && -1 < Al.target.indexOf(e)
        }
        ,
        I.isTagWithFormTargetAttr = function(e) {
            return !!e && -1 < Al.formtarget.indexOf(e)
        }
        ,
        I.isTagWithIntegrityAttr = function(e) {
            return !!e && -1 !== tc.indexOf(e)
        }
        ,
        I.isIframeFlagTag = function(e) {
            return !!e && -1 !== rc.indexOf(e)
        }
        ,
        I.isAddedAutocompleteAttr = function(e, t) {
            return "autocomplete" === e && t === ic
        }
        ,
        I.processJsAttrValue = function(e, t) {
            var r = t.isJsProtocol
              , t = t.isEventAttr;
            return e = wl(e = r ? e.replace(Jl, "") : e, !1, r && !t, void 0),
            e = r ? "javascript:" + e : e
        }
        ,
        I.getStoredAttrName = function(e) {
            return e + a.storedAttrPostfix
        }
        ,
        I.isJsProtocol = function(e) {
            return Jl.test(e)
        }
        ,
        I._isHtmlImportLink = function(e, t) {
            return !!e && !!t && "link" === e && "import" === t
        }
        ,
        I.isElementProcessed = function(e) {
            return e[oc]
        }
        ,
        I.setElementProcessed = function(e, t) {
            e[oc] = t
        }
        ,
        I.prototype._getRelAttribute = function(e) {
            return String(this.adapter.getAttr(e, "rel")).toLowerCase()
        }
        ,
        I.prototype._getAsAttribute = function(e) {
            return String(this.adapter.getAttr(e, "as")).toLowerCase()
        }
        ,
        I.prototype._createProcessorPatterns = function(r) {
            var n = this
              , e = function(e) {
                return n.isUrlAttr(e, "href")
            }
              , t = function(e) {
                return n.isUrlAttr(e, "src")
            }
              , o = function(e) {
                return n.isUrlAttr(e, "action")
            }
              , i = function(e) {
                return n.isUrlAttr(e, "formaction")
            }
              , s = function(e) {
                return n.isUrlAttr(e, "manifest")
            }
              , a = function(e) {
                return n.isUrlAttr(e, "data")
            }
              , l = function(e) {
                var t = n.adapter.getTagName(e);
                return ("iframe" === t || "frame" === t) && r.hasAttr(e, "srcdoc")
            }
              , c = function(e) {
                return "meta" === r.getTagName(e) && r.hasAttr(e, "http-equiv")
            }
              , p = function() {
                return !0
            }
              , u = function(e) {
                return "script" === r.getTagName(e)
            }
              , h = function(e) {
                return "link" === r.getTagName(e)
            }
              , d = function(e) {
                return "input" === r.getTagName(e)
            }
              , f = function(e) {
                return "input" === r.getTagName(e) && r.hasAttr(e, "type") && "file" === r.getAttr(e, "type").toLowerCase()
            }
              , m = function(e) {
                return "style" === r.getTagName(e)
            }
              , g = function(e) {
                return r.hasEventHandler(e)
            }
              , y = function(e) {
                var t = r.getTagName(e);
                return ("iframe" === t || "frame" === t) && r.hasAttr(e, "sandbox")
            }
              , v = function(e) {
                return r.isSVGElement(e) && r.hasAttr(e, "xlink:href") && -1 !== ec.indexOf(r.getTagName(e))
            }
              , E = function(e) {
                return r.isSVGElement(e) && r.hasAttr(e, "xml:base")
            };
            return [{
                selector: function(e) {
                    return I.isTagWithFormTargetAttr(r.getTagName(e)) && r.hasAttr(e, "formtarget")
                },
                targetAttr: "formtarget",
                elementProcessors: [this._processTargetBlank]
            }, {
                selector: e,
                urlAttr: "href",
                targetAttr: "target",
                elementProcessors: [this._processTargetBlank, this._processUrlAttrs, this._processUrlJsAttr]
            }, {
                selector: t,
                urlAttr: "src",
                targetAttr: "target",
                elementProcessors: [this._processTargetBlank, this._processUrlAttrs, this._processUrlJsAttr]
            }, {
                selector: o,
                urlAttr: "action",
                targetAttr: "target",
                elementProcessors: [this._processTargetBlank, this._processUrlAttrs, this._processUrlJsAttr]
            }, {
                selector: i,
                urlAttr: "formaction",
                targetAttr: "formtarget",
                elementProcessors: [this._processUrlAttrs, this._processUrlJsAttr]
            }, {
                selector: s,
                urlAttr: "manifest",
                elementProcessors: [this._processUrlAttrs, this._processUrlJsAttr]
            }, {
                selector: a,
                urlAttr: "data",
                elementProcessors: [this._processUrlAttrs, this._processUrlJsAttr]
            }, {
                selector: l,
                elementProcessors: [this._processSrcdocAttr]
            }, {
                selector: c,
                urlAttr: "content",
                elementProcessors: [this._processMetaElement]
            }, {
                selector: u,
                elementProcessors: [this._processScriptElement, this._processIntegrityAttr]
            }, {
                selector: p,
                elementProcessors: [this._processStyleAttr]
            }, {
                selector: h,
                relAttr: "rel",
                elementProcessors: [this._processIntegrityAttr, this._processRelPrefetch]
            }, {
                selector: m,
                elementProcessors: [this._processStylesheetElement]
            }, {
                selector: d,
                elementProcessors: [this._processAutoComplete]
            }, {
                selector: f,
                elementProcessors: [this._processRequired]
            }, {
                selector: g,
                elementProcessors: [this._processEvtAttr]
            }, {
                selector: y,
                elementProcessors: [this._processSandboxedIframe]
            }, {
                selector: v,
                urlAttr: "xlink:href",
                elementProcessors: [this._processSVGXLinkHrefAttr, this._processUrlAttrs]
            }, {
                selector: E,
                urlAttr: "xml:base",
                elementProcessors: [this._processUrlAttrs]
            }]
        }
        ,
        I.prototype.processElement = function(e, t) {
            if (!I.isElementProcessed(e))
                for (var r = 0, n = this.elementProcessorPatterns; r < n.length; r++) {
                    var o = n[r];
                    if (o.selector(e) && !this._isShadowElement(e)) {
                        for (var i = 0, s = o.elementProcessors; i < s.length; i++)
                            s[i].call(this, e, t, o);
                        I.setElementProcessed(e, !0)
                    }
                }
        }
        ,
        I.prototype.getElementResourceType = function(e) {
            var t = this.adapter.getTagName(e);
            return "link" !== t || "script" !== this._getAsAttribute(e) && this._getRelAttribute(e) !== nc ? it({
                isIframe: "iframe" === t || "frame" === t || this._isOpenLinkInIframe(e),
                isForm: "form" === t || "input" === t || "button" === t,
                isScript: "script" === t,
                isHtmlImport: "link" === t && "import" === this._getRelAttribute(e),
                isObject: "object" === t
            }) : it({
                isScript: !0
            })
        }
        ,
        I.prototype.isUrlAttr = function(e, t, r) {
            var n = this.adapter.getTagName(e);
            return t = t && t.toLowerCase(),
            !(!Cl[t] || -1 === Cl[t].indexOf(n)) || this.adapter.isSVGElement(e) && ("xml:base" === t || "base" === t && "http://www.w3.org/XML/1998/namespace" === r)
        }
        ,
        I.prototype.getUrlAttr = function(e) {
            for (var t = this.adapter.getTagName(e), r = 0, n = Tl; r < n.length; r++) {
                var o = n[r];
                if (-1 !== Cl[o].indexOf(t))
                    return o
            }
            return null
        }
        ,
        I.prototype.getTargetAttr = function(e) {
            for (var t = this.adapter.getTagName(e), r = 0, n = Pl; r < n.length; r++) {
                var o = n[r];
                if (-1 < Al[o].indexOf(t))
                    return o
            }
            return null
        }
        ,
        I.prototype._isOpenLinkInIframe = function(e) {
            var t = this.adapter.getTagName(e)
              , r = this.getTargetAttr(e)
              , r = r ? this.adapter.getAttr(e, r) : null
              , n = this._getRelAttribute(e);
            if ("_top" !== r) {
                t = !("input" === t && "image" === this.adapter.getAttr(e, "type")) && I.isIframeFlagTag(t) || I._isHtmlImportLink(t, n),
                n = !!r && "_" !== r[0];
                if ("_parent" === r)
                    return t && !this.adapter.isTopParentIframe(e);
                if (t && (this.adapter.hasIframeParent(e) || n && this.adapter.isExistingTarget(r, e)))
                    return !0
            }
            return !1
        }
        ,
        I.prototype._isShadowElement = function(e) {
            e = this.adapter.getClassName(e);
            return "string" == typeof e && -1 < e.indexOf(Me.postfix)
        }
        ,
        I.prototype._processAutoComplete = function(e) {
            var t = I.getStoredAttrName("autocomplete")
              , r = this.adapter.hasAttr(e, t)
              , n = this.adapter.getAttr(e, r ? t : "autocomplete");
            r || this.adapter.setAttr(e, t, n || "" === n ? n : ic),
            this.adapter.setAttr(e, "autocomplete", "off")
        }
        ,
        I.prototype._processRequired = function(e) {
            var t, r = I.getStoredAttrName("required");
            !this.adapter.hasAttr(e, r) && this.adapter.hasAttr(e, "required") && (t = this.adapter.getAttr(e, "required"),
            this.adapter.setAttr(e, r, t),
            this.adapter.removeAttr(e, "required"))
        }
        ,
        I.prototype._processIntegrityAttr = function(e) {
            var t = I.getStoredAttrName("integrity")
              , r = this.adapter.hasAttr(e, t) && !this.adapter.hasAttr(e, "integrity")
              , n = this.adapter.getAttr(e, r ? t : "integrity");
            n && this.adapter.setAttr(e, t, n),
            r || this.adapter.removeAttr(e, "integrity")
        }
        ,
        I.prototype._processRelPrefetch = function(e, t, r) {
            var n, o, i;
            r.relAttr && (n = I.getStoredAttrName(r.relAttr),
            o = this.adapter.hasAttr(e, n) && !this.adapter.hasAttr(e, r.relAttr),
            (i = this.adapter.getAttr(e, o ? n : r.relAttr)) && "prefetch" === Re(i.toLowerCase()) && (this.adapter.setAttr(e, n, i),
            o || this.adapter.removeAttr(e, r.relAttr)))
        }
        ,
        I.prototype._processJsAttr = function(e, t, r) {
            var n = r.isJsProtocol
              , r = r.isEventAttr
              , o = I.getStoredAttrName(t)
              , i = this.adapter.hasAttr(e, o)
              , i = this.adapter.getAttr(e, i ? o : t) || ""
              , n = I.processJsAttrValue(i, {
                isJsProtocol: n,
                isEventAttr: r
            });
            i !== n && (this.adapter.setAttr(e, o, i),
            this.adapter.setAttr(e, t, n))
        }
        ,
        I.prototype._processEvtAttr = function(e) {
            for (var t = this.adapter.EVENTS, r = 0; r < t.length; r++) {
                var n = this.adapter.getAttr(e, t[r]);
                n && this._processJsAttr(e, t[r], {
                    isJsProtocol: I.isJsProtocol(n),
                    isEventAttr: !0
                })
            }
        }
        ,
        I.prototype._processMetaElement = function(e, t, r) {
            var n, o = (this.adapter.getAttr(e, "http-equiv") || "").toLowerCase();
            o === ql && r.urlAttr ? (n = At(n = this.adapter.getAttr(e, r.urlAttr) || "", t),
            this.adapter.setAttr(e, r.urlAttr, n)) : o === zl && (this.adapter.removeAttr(e, "http-equiv"),
            this.adapter.removeAttr(e, "content"))
        }
        ,
        I.prototype._processSandboxedIframe = function(e) {
            var t = this.adapter.getAttr(e, "sandbox") || ""
              , r = -1 !== t.indexOf("allow-same-origin")
              , n = -1 !== t.indexOf("allow-scripts")
              , o = I.getStoredAttrName("sandbox");
            this.adapter.setAttr(e, o, t),
            this.adapter.setAttr(e, "sandbox", t = r && n ? t : t + (r ? "" : " allow-same-origin") + (n ? "" : " allow-scripts"))
        }
        ,
        I.prototype._processScriptElement = function(e, t) {
            var r, n, o, i, s, a = this.adapter.getScriptContent(e);
            a && this.adapter.needToProcessContent(e) && (bl(a) || (r = this.adapter.getAttr(e, "type")) && !Zl.test(r) || (r = "",
            n = (a = a).match(Yl),
            o = "",
            i = null,
            s = Xl.test(a),
            n && (r = n[0],
            (i = a.match($l)) ? o = i[0] : Ql.test(r) || (o = "//--\x3e"),
            a = a.replace(r, "").replace(o, "")),
            a = r + wl(a = s ? a.replace(Xl, "$2") : a, !0, !1, t) + o,
            this.adapter.setScriptContent(e, a = s ? "\n//<![CDATA[\n" + a + "//]]>" : a)))
        }
        ,
        I.prototype._processStyleAttr = function(e, t) {
            var r = this.adapter.getAttr(e, "style");
            r && this.adapter.setAttr(e, "style", Fl.process(r, t, !1))
        }
        ,
        I.prototype._processStylesheetElement = function(e, t) {
            var r = this.adapter.getStyleContent(e);
            r && t && this.adapter.needToProcessContent(e) && (r = Fl.process(r, t, !0),
            this.adapter.setStyleContent(e, r))
        }
        ,
        I.prototype._processTargetBlank = function(e, t, r) {
            var n, o;
            !this.allowMultipleWindows && r.targetAttr && (n = I.getStoredAttrName(r.targetAttr),
            this.adapter.hasAttr(e, n) || "_blank" === (o = (o = this.adapter.getAttr(e, r.targetAttr)) && o.replace(/\s/g, "")) && (this.adapter.setAttr(e, r.targetAttr, "_top"),
            this.adapter.setAttr(e, n, o)))
        }
        ,
        I.prototype._processUrlAttrs = function(e, t, r) {
            var n, o, i, s, a, l, c, p, u, h, d, f, m, g;
            r.urlAttr && (n = I.getStoredAttrName(r.urlAttr),
            i = !!(o = this.adapter.getAttr(e, r.urlAttr)) && _t(o),
            s = this.adapter.hasAttr(e, n),
            !o && "" !== o || s || !mt(o) && !i || (a = "iframe" === (s = this.adapter.getTagName(e)) || "frame" === s,
            u = "script" === s,
            l = "a" === s,
            c = r.targetAttr ? this.adapter.getAttr(e, r.targetAttr) : null,
            this.adapter.needToProcessUrl(s, c || "") && (c = this.getElementResourceType(e) || "",
            p = "file:" !== (p = ft(o)).protocol && !p.host,
            u = u && this.adapter.getAttr(e, "charset") || "",
            h = "img" === s && "" === o,
            d = a && "" === o,
            f = ht(t("/")),
            m = !1,
            g = o,
            a && !i && !p && f && (m = !this.adapter.sameOriginCheck(f.destUrl, o)),
            i && !l || h || d || (g = "img" !== s || this.forceProxySrcForImage ? t(o, c, u, m) : gt(o, t)),
            this.adapter.setAttr(e, n, o),
            this.adapter.setAttr(e, r.urlAttr, g))))
        }
        ,
        I.prototype._processSrcdocAttr = function(e) {
            var t = I.getStoredAttrName("srcdoc")
              , r = this.adapter.getAttr(e, "srcdoc") || ""
              , n = this.adapter.processSrcdocAttr(r);
            this.adapter.setAttr(e, t, r),
            this.adapter.setAttr(e, "srcdoc", n)
        }
        ,
        I.prototype._processUrlJsAttr = function(e, t, r) {
            r.urlAttr && I.isJsProtocol(this.adapter.getAttr(e, r.urlAttr) || "") && this._processJsAttr(e, r.urlAttr, {
                isJsProtocol: !0,
                isEventAttr: !1
            })
        }
        ,
        I.prototype._processSVGXLinkHrefAttr = function(e, t, r) {
            var n;
            r.urlAttr && (n = this.adapter.getAttr(e, r.urlAttr) || "",
            Xe.test(n) && (r = I.getStoredAttrName(r.urlAttr),
            this.adapter.setAttr(e, r, n)))
        }
        ,
        I);
        function I(e) {
            this.adapter = e,
            this.HTML_PROCESSING_REQUIRED_EVENT = "hammerhead|event|html-processing-required",
            this.SVG_XLINK_HREF_TAGS = ec,
            this.AUTOCOMPLETE_ATTRIBUTE_ABSENCE_MARKER = ic,
            this.PROCESSED_PRELOAD_LINK_CONTENT_TYPE = "script",
            this.MODULE_PRELOAD_LINK_REL = nc,
            this.forceProxySrcForImage = !1,
            this.allowMultipleWindows = !1,
            this.EVENTS = this.adapter.EVENTS,
            this.elementProcessorPatterns = this._createProcessorPatterns(this.adapter)
        }
        var sc = new WeakMap;
        function ac(e, t, r, n) {
            e = he(e, r, {
                value: n
            });
            b.objectDefineProperty(t, r, e)
        }
        var lc, Ls = function() {}, cc = (Ls.prototype = DOMStringList.prototype,
        e(pc, lc = Ls),
        pc.prototype.item = function(e) {
            return this[e]
        }
        ,
        pc.prototype.contains = function(e) {
            "string" != typeof e && (e = String(e));
            for (var t = sc.get(this) || 0, r = 0; r < t; r++)
                if (this[r] === e)
                    return !0;
            return !1
        }
        ,
        Object.defineProperty(pc.prototype, "length", {
            get: function() {
                return sc.get(this)
            },
            enumerable: !0,
            configurable: !0
        }),
        pc);
        function pc(e, n) {
            for (var o = lc.call(this) || this, i = e.rammerheadAncestorOrigins, t = i.length, s = e.rammerheadParent, a = (sc.set(o, t),
            this), r = 0; r < t; r++)
                !function(t) {
                    var e = wc.getLocationWrapper(s)
                      , r = e === s.location || !(()=>{
                        try {
                            return s["%hammerhead%"]
                        } catch (e) {
                            return !0
                        }
                    }
                    )();
                    ac(i, a, t.toString(), r ? "" : e.origin),
                    r && n && n(s, function(e) {
                        return ac(i, o, t, e)
                    }),
                    s = s.parent
                }(r);
            return o
        }
        var uc = Number.MAX_SAFE_INTEGER || 9007199254740991
          , hc = Number.MIN_SAFE_INTEGER || -9007199254740991
          , dc = (fc.prototype.increment = function() {
            return this._id = this._id === uc ? hc : this._id + 1,
            this._id
        }
        ,
        Object.defineProperty(fc.prototype, "value", {
            get: function() {
                return this._id
            },
            enumerable: !0,
            configurable: !0
        }),
        fc);
        function fc() {
            this._id = hc
        }
        var mc = "hammerhead|command|get-origin"
          , gc = "hammerhead|command|origin-received";
        function yc(e) {
            try {
                return e.location.toString()
            } catch (e) {
                return
            }
        }
        var vc, ks = function() {}, Ec = (ks.prototype = Location.prototype,
        e(Sc, vc = ks),
        Sc);
        function Sc(i, n, o) {
            function e() {
                if (wn(i) && i.location.href === Je)
                    return Je;
                var e = Rt()
                  , t = Nt.getResolverElement(i.document);
                return b.anchorHrefSetter.call(t, e),
                St(b.anchorHrefGetter.call(t), e)
            }
            function r(e) {
                if (e = Tt(e = "string" != typeof e ? String(e) : e),
                P.isJsProtocol(e))
                    return P.processJsAttrValue(e, {
                        isJsProtocol: !0,
                        isEventAttr: !1
                    });
                var t, r = yc(i), n = null, o = (i !== i.rammerheadParent && (o = yc(i.rammerheadParent),
                (t = Qt(o)) && t.proxy && (t = t.proxy.port,
                n = lt(o, e) ? t : Xt(t))),
                r && ar(r, e));
                return w(e, {
                    resourceType: o ? u : m,
                    proxyPort: n
                })
            }
            function t(t, r) {
                f[t] = he(d, t, {
                    getter: function() {
                        var e = hn(i);
                        return (e && Dn(e) ? i.location : Ht())[t]
                    },
                    setter: function(e) {
                        var t = tr(i.location.toString(), r, e, m);
                        return i.location = t,
                        o(t),
                        e
                    }
                })
            }
            var s, a, l, c = vc.call(this) || this, p = Qt(yc(i)), u = p ? p.resourceType : "", p = ir(u), h = b.objectHasOwnProperty.call(i.Location.prototype, "href"), d = h ? i.Location.prototype : i.location, f = {}, m = (p.isIframe = p.isIframe || wn(i),
            it({
                isIframe: p.isIframe,
                isForm: p.isForm
            }));
            f.href = he(d, "href", {
                getter: e,
                setter: function(e) {
                    var t = r(e);
                    return i.location.href = t,
                    o(t),
                    e
                }
            }),
            f.search = he(d, "search", {
                getter: function() {
                    return new URL(Rt()).search
                },
                setter: function(e) {
                    var t = new URL(Rt());
                    return t.search = e,
                    i.location = Zt(t.href),
                    e
                }
            }),
            f.origin = he(d, "origin", {
                getter: function() {
                    return ut(Ht())
                },
                setter: function(e) {
                    return e
                }
            }),
            f.hash = he(d, "hash", {
                getter: function() {
                    return new URL(Rt()).hash
                },
                setter: function(e) {
                    var t = new URL(Rt());
                    return t.hash = e,
                    i.location.hash = new URL(Zt(t.href)).hash,
                    e
                }
            }),
            i.rammerheadAncestorOrigins && (s = b.objectCreate(null),
            a = new dc,
            n && n.on(n.SERVICE_MSG_RECEIVED_EVENT, function(e) {
                var t = e.message
                  , e = e.source;
                t.cmd === mc ? n.sendServiceMsg({
                    id: t.id,
                    cmd: gc,
                    origin: c.origin
                }, e) : t.cmd === gc && (e = s[t.id]) && e(t.origin)
            }),
            l = new cc(i,n ? function(e, t) {
                var r = a.increment();
                s[r] = t,
                n.sendServiceMsg({
                    id: r,
                    cmd: mc
                }, e)
            }
            : void 0),
            f.ancestorOrigins = he(d, "ancestorOrigins", {
                getter: function() {
                    return l
                }
            }));
            if (t("port", b.anchorPortSetter),
            t("host", b.anchorHostSetter),
            t("hostname", b.anchorHostnameSetter),
            t("pathname", b.anchorPathnameSetter),
            t("protocol", b.anchorProtocolSetter),
            f.assign = he(d, "assign", {
                value: function(e) {
                    var e = r(e)
                      , t = i.location.assign(e);
                    return o(e),
                    t
                }
            }),
            f.replace = he(d, "replace", {
                value: function(e) {
                    var e = r(e)
                      , t = i.location.replace(e);
                    return o(e),
                    t
                }
            }),
            f.reload = he(d, "reload", {
                value: function(e) {
                    e = i.location.reload(e);
                    return o(i.location.toString()),
                    e
                }
            }),
            f.toString = he(d, "toString", {
                value: e
            }),
            !h && b.objectHasOwnProperty.call(i.location, "valueOf") && (f.valueOf = he(d, "valueOf", {
                value: function() {
                    return c
                }
            })),
            b.objectDefineProperties(c, f),
            xe)
                return c;
            function g(e, t) {
                var r;
                "function" == typeof e[t] && (r = e[t],
                e[t] = function() {
                    var e = this === y ? i.location : this;
                    return r.apply(e, arguments)
                }
                )
            }
            for (var p = b.objectKeys(Location.prototype), y = c, v = 0, E = p; v < E.length; v++) {
                var S, _ = E[v];
                _ in f || (g(S = b.objectGetOwnPropertyDescriptor(Location.prototype, _), "get"),
                g(S, "set"),
                g(S, "value"),
                b.objectDefineProperty(y, _, S),
                b.consoleMeths.log("testcafe-hammerhead: unwrapped Location.prototype." + _ + " descriptor!"))
            }
            return c
        }
        "function" != typeof Location ? Ec.toString = function() {
            return Location.toString()
        }
        : de(Ec, Location);
        var _c, bc = "hammerhead|location-wrapper", wc = (e(xc, _c = r),
        xc.isLocationWrapper = function(e) {
            return e instanceof Ec
        }
        ,
        xc.getLocationWrapper = function(t) {
            if (S && bn(window, t))
                return t.location;
            try {
                return t[bc]
            } catch (e) {
                return t.location
            }
        }
        ,
        xc.prototype.attach = function(e) {
            _c.prototype.attach.call(this, e);
            var t = e.document
              , r = new Ec(e,this._messageSandbox,this._locationChangedEventCallback);
            b.objectDefineProperty(e, bc, {
                value: r,
                configurable: !0
            }),
            b.objectDefineProperty(t, bc, {
                value: r,
                configurable: !0
            }),
            b.objectDefineProperty(e, v.getLocation, {
                value: function(e) {
                    return ho(e) ? r : e
                },
                configurable: !0
            }),
            b.objectDefineProperty(e, v.setLocation, {
                value: function(e, t) {
                    return ho(e) && "string" == typeof t ? r.href = t : null
                },
                configurable: !0
            })
        }
        ,
        xc);
        function xc(e) {
            var t = _c.call(this) || this;
            return t._messageSandbox = e,
            t.LOCATION_CHANGED_EVENT = "hammerhead|event|location-changed",
            t._locationChangedEventCallback = function(e) {
                return t.emit(t.LOCATION_CHANGED_EVENT, e)
            }
            ,
            t
        }
        function Cc(e) {
            return null === e ? "null" : "undefined"
        }
        function Tc(e) {
            return null == e
        }
        function Ac(e) {
            e = typeof e;
            return "object" != e && "function" != e
        }
        var Pc, Ic = Object.freeze({
            __proto__: null,
            inaccessibleTypeToStr: Cc,
            isNullOrUndefined: Tc,
            isPrimitiveType: Ac
        }), Nc = "hammerhead|iframe-window-inited", Oc = (e(Lc, Pc = r),
        Lc.prototype._shouldSaveIframeNativeMethods = function(e) {
            if (!Ne)
                return !1;
            e = this.nativeMethods.getAttribute.call(e, "src");
            return P.isJsProtocol(e)
        }
        ,
        Lc.prototype._ensureIframeNativeMethodsForChrome = function(e) {
            var t = b.contentWindowGetter.call(e)
              , r = b.contentDocumentGetter.call(e);
            this.iframeNativeMethodsBackup ? (this.iframeNativeMethodsBackup.restoreDocumentMeths(t, r),
            this.iframeNativeMethodsBackup = null) : this._shouldSaveIframeNativeMethods(e) && (this.iframeNativeMethodsBackup = new this.nativeMethods.constructor(r,t))
        }
        ,
        Lc.prototype._ensureIframeNativeMethodsForIE = function(e) {
            var t = b.contentWindowGetter.call(e)
              , e = b.contentDocumentGetter.call(e)
              , r = t[_.iframeNativeMethods];
            r && (r.restoreDocumentMeths(t, e),
            delete t[_.iframeNativeMethods])
        }
        ,
        Lc.prototype._ensureIframeNativeMethods = function(e) {
            this._ensureIframeNativeMethodsForChrome(e),
            this._ensureIframeNativeMethodsForIE(e)
        }
        ,
        Lc.prototype._emitEvents = function(e) {
            this.emit(this.EVAL_HAMMERHEAD_SCRIPT_EVENT, {
                iframe: e
            }),
            this.emit(this.EVAL_EXTERNAL_SCRIPT_EVENT, {
                iframe: e
            }),
            this.emit(this.RUN_TASK_SCRIPT_EVENT, e)
        }
        ,
        Lc.prototype._raiseReadyToInitEvent = function(e) {
            var t, r;
            Dn(e) && (t = b.contentWindowGetter.call(e),
            r = b.contentDocumentGetter.call(e),
            Lc.isIframeInitialized(e) ? t[Nc] || t[_.hammerhead] || (this._ensureIframeNativeMethods(e),
            b.objectDefineProperty(t, Nc, {
                value: !0
            }),
            this._emitEvents(e),
            t[_.processDomMethodName]()) : fe(r.write) && this.emit(this.IFRAME_DOCUMENT_CREATED_EVENT, {
                iframe: e
            }))
        }
        ,
        Lc.isIframeInitialized = function(e) {
            var t = b.contentWindowGetter.call(e)
              , r = b.contentDocumentGetter.call(e);
            return Te ? "uninitialized" !== r.readyState : S ? !!r.documentElement || t[_.documentWasCleaned] : !(!t[_.documentWasCleaned] && Mn(e)) || "about:srcdoc" === t.location.href
        }
        ,
        Lc.isWindowInited = function(e) {
            return e[Nc]
        }
        ,
        Lc.prototype.iframeReadyToInitHandler = function(e) {
            function t(e) {
                return e.replace(/\$/g, "$$$$")
            }
            var r = m.get().iframeTaskScriptTemplate
              , n = Ta(this._cookieSandbox.getCookie())
              , o = m.get().referer || this.window.location.toString()
              , i = Ta(r)
              , r = r.replace("{{{cookie}}}", t(n)).replace("{{{referer}}}", t(Ta(o))).replace("{{{iframeTaskScriptTemplate}}}", t(i))
              , n = b.contentWindowGetter.call(e);
            n.eval.call(n, r)
        }
        ,
        Lc.prototype.onIframeBeganToRun = function(e) {
            this._raiseReadyToInitEvent(e)
        }
        ,
        Lc.prototype.processIframe = function(e) {
            var t = this;
            x(e) || ((Ln(e) && b.contentWindowGetter.call(e) || kn(e) && b.frameContentWindowGetter.call(e)) && this._raiseReadyToInitEvent(e),
            this.nativeMethods.addEventListener.call(e, "load", function() {
                return t._raiseReadyToInitEvent(e)
            }))
        }
        ,
        Lc);
        function Lc(e, t) {
            var r = Pc.call(this) || this;
            return r._nodeMutation = e,
            r._cookieSandbox = t,
            r.RUN_TASK_SCRIPT_EVENT = "hammerhead|event|run-task-script",
            r.EVAL_HAMMERHEAD_SCRIPT_EVENT = "hammerhead|event|eval-hammerhead-script",
            r.EVAL_EXTERNAL_SCRIPT_EVENT = "hammerhead|event|eval-external-script",
            r.IFRAME_DOCUMENT_CREATED_EVENT = "hammerhead|event|iframe-document-created",
            r.on(r.RUN_TASK_SCRIPT_EVENT, r.iframeReadyToInitHandler),
            r._nodeMutation.on(r._nodeMutation.IFRAME_ADDED_TO_DOM_EVENT, function(e) {
                return r.processIframe(e)
            }),
            r.iframeNativeMethodsBackup = null,
            r
        }
        function kc() {
            this.EVENTS = ["onblur", "onchange", "onclick", "oncontextmenu", "oncopy", "oncut", "ondblclick", "onerror", "onfocus", "onfocusin", "onfocusout", "onhashchange", "onkeydown", "onkeypress", "onkeyup", "onload", "onmousedown", "onmouseenter", "onmouseleave", "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onpaste", "onreset", "onresize", "onscroll", "onselect", "onsubmit", "ontextinput", "onunload", "onwheel", "onpointerdown", "onpointerup", "onpointercancel", "onpointermove", "onpointerover", "onpointerout", "onpointerenter", "onpointerleave", "ongotpointercapture", "onlostpointercapture", "onmspointerdown", "onmspointerup", "onmspointercancel", "onmspointermove", "onmspointerover", "onmspointerout", "onmspointerenter", "onmspointerleave", "onmsgotpointercapture", "onmslostpointercapture"]
        }
        function Dc(e) {
            return ('\n        <script class="' + Me.selfRemovingScript + "\">\n            (function () {\n                var currentScript = document.currentScript;\n\n                /* NOTE: IE11 doesn't support the 'currentScript' property */\n                if (!currentScript) {\n                    var scripts       = document.scripts;\n                    var scriptsLength = scripts.length;\n\n                    currentScript = scripts[scriptsLength - 1];\n                }\n\n                currentScript.parentNode.removeChild(currentScript);\n\n                " + e + "\n            })();\n        <\/script>\n    ").replace(/\n\s*|\/\*[\S\s]*?\*\//g, "")
        }
        var Mc, Rc = {
            iframeInit: Dc('\n        var parentHammerhead = null;\n\n        if (!window["' + _.hammerhead + '"])\n            Object.defineProperty(window, "' + _.documentWasCleaned + '", { value: true, configurable: true });\n\n        try {\n            parentHammerhead = window.rammerheadParent["' + _.hammerhead + '"];\n        } catch(e) {}\n\n        if (parentHammerhead)\n            parentHammerhead.sandbox.onIframeDocumentRecreated(window.frameElement);\n    '),
            onWindowRecreation: Dc('\n        var hammerhead = window["' + _.hammerhead + '"];\n        var sandbox    = hammerhead && hammerhead.sandbox;\n\n        if (!sandbox) {\n            try {\n                sandbox = window.rammerheadParent["' + _.hammerhead + '"].sandboxUtils.backup.get(window);\n            } catch(e) {}\n        }\n\n        if (sandbox) {\n            Object.defineProperty(window, "' + _.documentWasCleaned + '", { value: true, configurable: true });\n\n            sandbox.node.mutation.onDocumentCleaned(window, document);\n\n            /* NOTE: B234357 */\n            sandbox.node.processNodes(null, document);\n        }\n    '),
            onBodyCreated: Dc('\n        if (window["' + _.hammerhead + '"])\n            window["' + _.hammerhead + '"].sandbox.node.raiseBodyCreatedEvent();\n    '),
            onOriginFirstTitleLoaded: Dc('\n        window["' + _.hammerhead + '"].sandbox.node.onOriginFirstTitleElementInHeadLoaded();\n    '),
            restoreStorages: Dc('\n        window.localStorage.setItem("%s", %s);\n        window.sessionStorage.setItem("%s", %s);\n    ')
        }, jc = ((Ds = Mc = Mc || {}).beforeBegin = "beforebegin",
        Ds.afterBegin = "afterbegin",
        Ds.beforeEnd = "beforeend",
        Ds.afterEnd = "afterend",
        Mc);
        function Hc(e) {
            var t = b.nodeParentNodeGetter.call(e);
            t && b.removeChild.call(t, e)
        }
        var Rs = "hh_fake_tag_name_"
          , Bc = "hh_fake_doctype"
          , Fc = Rs + "head"
          , Uc = Rs + "body"
          , js = "hh_fake_attr"
          , Vc = new RegExp("(<\\/?)" + Rs,"ig")
          , Gc = /(<\/?)(html|head|body|table|tbody|tfoot|thead|tr|td|th|caption|colgroup)((?:\s[^>]*)?>)/gi
          , Wc = "$1" + Rs + "$2$3"
          , qc = /<(\/?(?:col|noscript))(\s[^>]*?)?(\s?\/)?>/gi
          , Kc = "<br " + js + '="$1|$3"$2>'
          , zc = new RegExp("<br([^>]*?) " + js + '="([^|]+)\\|([^"]*)"([^>]*)',"ig")
          , Xc = /<!doctype([^>]*)>/gi
          , $c = "<" + Bc + ">$1</" + Bc + ">"
          , Yc = new RegExp("<" + Bc + ">([\\S\\s]*?)</" + Bc + ">","ig")
          , Qc = /<svg\s?[^>]*>/gi
          , Jc = /\s(?:NS[0-9]+:[^"']+('|")[\S\s]*?\1|[^:]+:NS[0-9]+=(?:""|''))/g
          , Zc = function() {
            for (var e = [], t = 0, r = Tl; t < r.length; t++) {
                var n = r[t];
                e.push(P.getStoredAttrName(n))
            }
            for (var o = 0, i = Il; o < i.length; o++) {
                n = i[o];
                e.push(P.getStoredAttrName(n))
            }
            return "[" + e.join("],[") + "]"
        }()
          , ep = '[class*="' + Me.postfix + '"]'
          , tp = "[" + a.hoverPseudoClass + "],[" + a.focusPseudoClass + "]"
          , rp = "hammerhead|html-parser-element-flag"
          , np = b.createHTMLDocument.call(document.implementation, "title")
          , op = b.createDocumentFragment.call(np);
        function ip(e) {
            return e.replace(Yc, "<!doctype$1>").replace(zc, "<$2$1$4$3").replace(Vc, "$1")
        }
        function sp(e) {
            return /^\s*(<\s*(!doctype|html|head|body)[^>]*>)/i.test(e)
        }
        function ap(e, t) {
            var n, o, r = b.createElement.call(function() {
                try {
                    np.location && np.location.toString()
                } catch (e) {
                    np = b.createHTMLDocument.call(document.implementation, "title"),
                    (op = b.createDocumentFragment.call(np))[rp] = !0
                }
                return np
            }(), "div"), t = (e = e.replace(Xc, $c).replace(qc, Kc).replace(Gc, Wc),
            b.appendChild.call(op, r),
            b.elementInnerHTMLSetter.call(r, e),
            t(r) ? b.elementInnerHTMLGetter.call(r) : e);
            return Hc(r),
            t = ip(t),
            S && !Ae && e !== t && (r = t,
            n = e.match(Qc),
            o = 0,
            t = n ? r.replace(Qc, function(e) {
                var t = n[o]
                  , r = t ? t.match(Jc) : null;
                return t && o++,
                t ? e.replace(Jc, function() {
                    var e = r ? r.join("") : "";
                    return r = r && null,
                    e
                }) : e
            }) : r),
            t
        }
        function lp(e) {
            return ap(e, function(e) {
                var i = !1;
                return vn(e, Zc, function(e) {
                    var t, r, n, o;
                    o = e,
                    (r = N.getUrlAttr(o)) && b.hasAttribute.call(o, r) && (t = P.getStoredAttrName(r),
                    b.hasAttribute.call(o, t) && (b.setAttribute.call(o, r, b.getAttribute.call(o, t)),
                    b.removeAttribute.call(o, t))),
                    r = e,
                    b.hasAttribute.call(r, "autocomplete") && (o = P.getStoredAttrName("autocomplete"),
                    b.hasAttribute.call(r, o) && (t = b.getAttribute.call(r, o),
                    P.isAddedAutocompleteAttr("autocomplete", t) ? b.removeAttribute.call(r, "autocomplete") : b.setAttribute.call(r, "autocomplete", t),
                    b.removeAttribute.call(r, o))),
                    r = e,
                    (o = N.getTargetAttr(r)) && b.hasAttribute.call(r, o) && (n = P.getStoredAttrName(o),
                    b.hasAttribute.call(r, n) && (b.setAttribute.call(r, o, b.getAttribute.call(r, n)),
                    b.removeAttribute.call(r, n))),
                    o = e,
                    "iframe" === N.adapter.getTagName(o) && b.hasAttribute.call(o, "sandbox") && (r = P.getStoredAttrName("sandbox"),
                    b.hasAttribute.call(o, r) && (b.setAttribute.call(o, "sandbox", b.getAttribute.call(o, r)),
                    b.removeAttribute.call(o, r))),
                    n = e,
                    b.hasAttribute.call(n, "style") && (o = P.getStoredAttrName("style"),
                    b.hasAttribute.call(n, o) && (b.setAttribute.call(n, "style", b.getAttribute.call(n, o)),
                    b.removeAttribute.call(n, o))),
                    i = !0
                }),
                vn(e, ep, function(e) {
                    var t = b.nodeParentNodeGetter.call(e);
                    t && (b.removeChild.call(t, e),
                    i = !0)
                }),
                vn(e, "script", function(e) {
                    var t = b.nodeTextContentGetter.call(e)
                      , r = Da(t);
                    t !== r && (b.nodeTextContentSetter.call(e, r),
                    i = !0)
                }),
                vn(e, "style", function(e) {
                    var t = b.nodeTextContentGetter.call(e)
                      , r = Fl.cleanUp(t, Qt);
                    t !== r && (b.nodeTextContentSetter.call(e, r),
                    i = !0)
                }),
                vn(e, tp, function(e) {
                    b.removeAttribute.call(e, a.hoverPseudoClass),
                    b.removeAttribute.call(e, a.focusPseudoClass),
                    i = !0
                }),
                vn(e, "hh_fake_tag_name_head, hh_fake_tag_name_body", function(e) {
                    var t = b.elementInnerHTMLGetter.call(e);
                    -1 !== t.indexOf(Rc.iframeInit) && (b.elementInnerHTMLSetter.call(e, t.replace(Rc.iframeInit, "")),
                    i = !0)
                }),
                i
            })
        }
        function cp(e, t) {
            var f = (t = void 0 === t ? {} : t).parentTag
              , m = t.prepareDom
              , g = t.processedContext
              , y = t.isPage;
            return ap(e, function(e) {
                var t = null
                  , r = []
                  , n = []
                  , o = 0
                  , i = Nt.getBaseUrl(document)
                  , s = (m && m(e),
                b.htmlCollectionLengthGetter.call(b.elementChildrenGetter.call(e)) && (n = b.elementQuerySelectorAll.call(e, "*"),
                o = b.nodeListLengthGetter.call(n)),
                b.elementQuerySelector.call(e, "base"));
                s && Nt.updateBase(b.getAttribute.call(s, "href"), document);
                for (var a = 0; a < o; a++) {
                    var l = n[a]
                      , c = (Xn(l) && (c = b.nodeTextContentGetter.call(l),
                    b.nodeTextContentSetter.call(l, ip(c))),
                    l[_.processedContext] = g,
                    N.processElement(l, Zt),
                    Cn(l));
                    c === Fc || c === Uc ? r.push(l) : c === Bc && (t = l)
                }
                if (!f)
                    if (r.length)
                        for (var p = 0, u = r; p < u.length; p++) {
                            var h = u[p]
                              , d = b.elementQuerySelector.call(h, 'script,link[rel="stylesheet"]');
                            d ? b.insertAdjacentHTML.call(d, jc.beforeBegin, Rc.iframeInit) : b.insertAdjacentHTML.call(h, jc.beforeEnd, Rc.iframeInit)
                        }
                    else
                        t && S ? b.insertAdjacentHTML.call(t, jc.afterEnd, Rc.iframeInit) : y && b.insertAdjacentHTML.call(e, jc.afterBegin, Rc.iframeInit);
                return Nt.updateBase(i, document),
                !0
            })
        }
        function pp() {
            np = op = null
        }
        function up(e) {
            for (; b.nodeParentNodeGetter.call(e); )
                e = b.nodeParentNodeGetter.call(e);
            return !!e[rp]
        }
        op[rp] = !0;
        var hp = Object.freeze({
            __proto__: null,
            isPageHtml: sp,
            cleanUpHtml: lp,
            processHtml: cp,
            dispose: pp,
            isInternalHtmlParserElement: up
        })
          , dp = "hammerhead_write_marker_begin"
          , fp = "hammerhead_write_marker_end"
          , mp = "<" + dp + "></" + dp + ">"
          , gp = "<" + fp + "></" + fp + ">"
          , yp = new RegExp("^[\\S\\s]*" + mp,"g")
          , vp = new RegExp(gp + "[\\S\\s]*$","g")
          , Ep = /^<[^>]+>/g
          , Sp = /<\/[^<>]+>$/g
          , _p = /<\/?(?:[A-Za-z][^>]*)?$/g
          , bp = "hammerhead|unclosed-element-flag"
          , wp = (xp.prototype._cutPending = function(e) {
            var t = e.match(_p);
            return this.pending = t ? t[0] : "",
            this.pending ? e.substring(0, e.length - this.pending.length) : e
        }
        ,
        xp.prototype._wrapHtmlChunk = function(e) {
            var t = this.parentTagChain.length ? "<" + this.parentTagChain.join("><") + ">" : "";
            return this.isNonClosedComment && (t += "\x3c!--"),
            t + mp + e + gp
        }
        ,
        xp.prototype._unwrapHtmlChunk = function(e) {
            return e && (e = e.replace(yp, "").replace(vp, ""),
            this.isBeginMarkerInDOM || (e = this.isNonClosedComment ? e.slice(4) : e.replace(Ep, "")),
            this.isEndMarkerInDOM || (e = this.isNonClosedComment ? e.slice(0, -3) : e.replace(Sp, "")),
            !this.isBeginMarkerInDOM && this.isEndMarkerInDOM && (this.isNonClosedComment = !1),
            e)
        }
        ,
        xp._setUnclosedElementFlag = function(e) {
            (Xn(e) || $n(e)) && (e[bp] = !0)
        }
        ,
        xp.hasUnclosedElementFlag = function(e) {
            return !!e[bp]
        }
        ,
        xp._searchBeginMarker = function(e) {
            var t = b.elementQuerySelector.call(e, dp);
            if (t)
                return t;
            for (t = e; b.elementFirstElementChildGetter.call(t); )
                t = b.elementFirstElementChildGetter.call(t);
            e = b.nodeParentNodeGetter.call(t);
            return b.nodeFirstChildGetter.call(e) !== t ? t = b.nodeFirstChildGetter.call(e) : Co(b.nodeFirstChildGetter.call(t)) && (t = b.nodeFirstChildGetter.call(t)),
            t
        }
        ,
        xp._searchEndMarker = function(e) {
            var t = b.elementQuerySelector.call(e, fp);
            if (t)
                return t;
            for (t = e; b.elementLastElementChildGetter.call(t); )
                t = b.elementLastElementChildGetter.call(t);
            e = b.nodeParentNodeGetter.call(t);
            return b.nodeLastChildGetter.call(e) !== t ? t = b.nodeLastChildGetter.call(e) : Co(b.nodeLastChildGetter.call(t)) && (t = b.nodeLastChildGetter.call(t)),
            t
        }
        ,
        xp.prototype._updateParentTagChain = function(e, t) {
            var r = Cn(t) !== fp ? t : b.nodeParentNodeGetter.call(t);
            for (Co(t) && (this.isNonClosedComment = !0,
            r = b.nodeParentNodeGetter.call(t)),
            this.parentTagChain = []; r !== e; )
                this.parentTagChain.unshift(Cn(r)),
                r = b.nodeParentNodeGetter.call(r)
        }
        ,
        xp.prototype._processBeginMarkerInContent = function(e) {
            var t = e
              , r = (xp._setUnclosedElementFlag(t),
            this.isClosingContentEl && (Xn(t) || $n(t)) ? (this.contentForProcessing = b.nodeTextContentGetter.call(this.nonClosedEl) + b.nodeTextContentGetter.call(t).replace(yp, ""),
            b.nodeTextContentSetter.call(t, "")) : (r = b.nodeTextContentGetter.call(t),
            b.nodeTextContentSetter.call(t, r.replace(yp, ""))),
            e = b.createElement.call(document, dp),
            b.nodeParentNodeGetter.call(t));
            b.insertBefore.call(r, e, t)
        }
        ,
        xp._createStartsWithClosingTagRegExp = function(e) {
            for (var t = [e.charAt(e.length - 1), "?"], r = e.length - 2; -1 < r; r--)
                t.unshift("(?:", e.charAt(r)),
                t.push(")?");
            return t.unshift("^</"),
            t.push("$"),
            new RegExp(t.join(""),"i")
        }
        ,
        xp.prototype._getStartsWithClosingTagRegExp = function(e) {
            return e = e.toLowerCase(),
            this.cachedStartsWithClosingTagRegExps[e] || (this.cachedStartsWithClosingTagRegExps[e] = xp._createStartsWithClosingTagRegExp(e)),
            this.cachedStartsWithClosingTagRegExps[e]
        }
        ,
        xp.prototype._processEndMarkerInContent = function(e) {
            var t = e
              , r = b.nodeTextContentGetter.call(t)
              , r = (xp._setUnclosedElementFlag(t),
            b.nodeTextContentSetter.call(t, r.replace(vp, "")),
            e = b.createElement.call(document, fp),
            this.pending && !this._getStartsWithClosingTagRegExp(t.tagName).test(this.pending) && (r = b.nodeTextContentGetter.call(t) + this.pending,
            b.nodeTextContentSetter.call(t, r),
            this.pending = ""),
            b.nodeParentNodeGetter.call(t));
            b.appendChild.call(r, e)
        }
        ,
        xp._addOnDocumentRecreationScript = function(e) {
            var t = b.createElement.call(e.ownerDocument, "span")
              , r = b.nodeParentNodeGetter.call(e);
            b.insertBefore.call(r, t, e),
            b.elementOuterHTMLSetter.call(t, Rc.onWindowRecreation)
        }
        ,
        xp.prototype._prepareDom = function(e, t) {
            var r = xp._searchBeginMarker(e)
              , n = xp._searchEndMarker(e);
            this.isBeginMarkerInDOM = Cn(r) === dp,
            this.isEndMarkerInDOM = Cn(n) === fp,
            this.isAddContentToEl = r === n,
            this.isClosingContentEl = !this.isBeginMarkerInDOM && !this.isAddContentToEl,
            this.isAddContentToEl || (this._updateParentTagChain(e, n),
            t && xp._addOnDocumentRecreationScript(n)),
            this.isBeginMarkerInDOM || this.isEndMarkerInDOM ? this.isBeginMarkerInDOM && !this.isEndMarkerInDOM ? this._processEndMarkerInContent(n) : !this.isBeginMarkerInDOM && this.isEndMarkerInDOM && this._processBeginMarkerInContent(r) : (this._processBeginMarkerInContent(r),
            this._processEndMarkerInContent(n))
        }
        ,
        xp.prototype._processHtmlChunk = function(e, t) {
            var r = this;
            return e = this._cutPending(this.pending + e),
            e = cp(e = this._wrapHtmlChunk(e), {
                prepareDom: function(e) {
                    return r._prepareDom(e, t)
                },
                processedContext: this.window
            }),
            e = (e = this._unwrapHtmlChunk(e)) && this.isBeginMarkerInDOM && (Te || S) && !sp(e) ? Rc.iframeInit + e : e
        }
        ,
        xp.prototype.write = function(e, t, r) {
            e = this._processHtmlChunk(b.arrayJoin.call(e, ""), r);
            this.nonClosedEl && this.contentForProcessing && (n = this.contentForProcessing,
            Xn(this.nonClosedEl) ? n = wl(this.contentForProcessing, !0, !1, Zt) : $n(this.nonClosedEl) && (n = Fl.process(this.contentForProcessing, w, !0)),
            b.nodeTextContentSetter.call(this.nonClosedEl, n),
            this.contentForProcessing = "");
            var n = (t ? b.documentWriteLn : b.documentWrite).call(this.document, e);
            if (r && S)
                return n;
            if (!this.isEndMarkerInDOM && !this.isAddContentToEl) {
                for (var o = this.document.documentElement; b.elementLastElementChildGetter.call(o); )
                    o = b.elementLastElementChildGetter.call(o);
                this.nonClosedEl = o
            }
            return n
        }
        ,
        xp);
        function xp(e, t) {
            this.window = e,
            this.document = t,
            this.pending = "",
            this.parentTagChain = [],
            this.isBeginMarkerInDOM = !1,
            this.isEndMarkerInDOM = !1,
            this.isClosingContentEl = !1,
            this.isNonClosedComment = !1,
            this.isAddContentToEl = !1,
            this.contentForProcessing = "",
            this.nonClosedEl = null,
            this.cachedStartsWithClosingTagRegExps = {}
        }
        var Cp = "hammerhead|windows-storage";
        function Tp() {
            var e = yn(window)
              , t = e[Cp];
            return t || b.objectDefineProperty(e, Cp, {
                value: t = []
            }),
            t
        }
        function Ap(e) {
            for (var t = Tp(), r = t.length - 1; 0 <= r; r--)
                try {
                    if (t[r] === e)
                        return
                } catch (e) {
                    t.splice(r, 1)
                }
            t.push(e)
        }
        function Pp(e) {
            var t = Tp()
              , e = t.indexOf(e);
            -1 !== e && t.splice(e, 1)
        }
        function Ip(e) {
            for (var t = Tp(), r = 0; r < t.length; r++)
                try {
                    if (t[r].name === e)
                        return t[r]
                } catch (e) {
                    t.splice(r, 1),
                    r--
                }
            return null
        }
        var Np, Op = Object.freeze({
            __proto__: null,
            add: Ap,
            remove: Pp,
            findByName: Ip
        });
        function Lp() {
            var e = null !== Np && Np.apply(this, arguments) || this;
            return e._srcdocMode = !1,
            e
        }
        e(Lp, Np = kc),
        Lp.prototype.removeAttr = function(e, t) {
            return b.removeAttribute.call(e, t)
        }
        ,
        Lp.prototype.getAttr = function(e, t) {
            return b.getAttribute.call(e, t)
        }
        ,
        Lp.prototype.hasAttr = function(e, t) {
            return e.hasAttribute(t)
        }
        ,
        Lp.prototype.isSVGElement = fo,
        Lp.prototype.getClassName = function(e) {
            return e.className
        }
        ,
        Lp.prototype.hasEventHandler = function(e) {
            for (var t = 0, r = b.elementAttributesGetter.call(e); t < r.length; t++) {
                var n = r[t];
                if (-1 !== this.EVENTS.indexOf(n.name))
                    return !0
            }
            return !1
        }
        ,
        Lp.prototype.getTagName = Cn,
        Lp.prototype.setAttr = function(e, t, r) {
            return b.setAttribute.call(e, t, r)
        }
        ,
        Lp.prototype.setScriptContent = function(e, t) {
            b.nodeTextContentSetter.call(e, t)
        }
        ,
        Lp.prototype.getScriptContent = function(e) {
            return b.nodeTextContentGetter.call(e)
        }
        ,
        Lp.prototype.getStyleContent = function(e) {
            return b.elementInnerHTMLGetter.call(e)
        }
        ,
        Lp.prototype.setStyleContent = function(e, t) {
            b.elementInnerHTMLSetter.call(e, t)
        }
        ,
        Lp.prototype.needToProcessContent = function(e) {
            return !wp.hasUnclosedElementFlag(e)
        }
        ,
        Lp.prototype.needToProcessUrl = function() {
            return !0
        }
        ,
        Lp.prototype.hasIframeParent = function(e) {
            if (this._srcdocMode)
                return !0;
            try {
                return e[_.processedContext] ? window.rammerheadTop !== e[_.processedContext] : window.rammerheadTop.document !== En(e)
            } catch (e) {
                return !0
            }
        }
        ,
        Lp.prototype.getProxyUrl = function() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            return w.apply(void 0, e)
        }
        ,
        Lp.prototype.isTopParentIframe = function(e) {
            e = e[_.processedContext];
            return e && window.rammerheadTop === e.parent
        }
        ,
        Lp.prototype.sameOriginCheck = Dt,
        Lp.prototype.isExistingTarget = function(e) {
            return !!Ip(e)
        }
        ,
        Lp.prototype.processSrcdocAttr = function(e) {
            e = cp(e, {
                isPage: this._srcdocMode = !0
            });
            return this._srcdocMode = !1,
            e
        }
        ;
        var kp, N = new P(new Lp), Dp = (e(Mp, kp = r),
        Mp.forceProxySrcForImageIfNecessary = function(e) {
            Rn(e) && m.get().forceProxySrcForImage && (e[_.forceProxySrcForImage] = !0)
        }
        ,
        Mp._isDocumentInDesignMode = function(e) {
            return "on" === e.designMode
        }
        ,
        Mp.prototype._isUninitializedIframeWithoutSrc = function(e) {
            var t = hn(e);
            return e !== e.rammerheadTop && t && Dn(t) && !Oc.isIframeInitialized(t)
        }
        ,
        Mp.prototype._beforeDocumentCleaned = function() {
            this._nodeSandbox.mutation.onBeforeDocumentCleaned(this.document)
        }
        ,
        Mp.prototype._onDocumentClosed = function() {
            this._nodeSandbox.mutation.onDocumentClosed(this.document)
        }
        ,
        Mp._shouldEmitDocumentCleanedEvents = function(e) {
            if (S) {
                if ("loading" !== e.readyState)
                    return !0;
                var t = e.defaultView;
                if (t[_.documentWasCleaned])
                    return !1;
                t = t && hn(t);
                return t && Dn(t)
            }
            return "loading" !== e.readyState && "uninitialized" !== e.readyState
        }
        ,
        Mp.prototype._performDocumentWrite = function(e, t, r) {
            var n = Mp._shouldEmitDocumentCleanedEvents(this.document)
              , e = (n && this._beforeDocumentCleaned(),
            this.writers.get(e).write(t, r, n));
            return n || this._nodeSandbox.processNodes(null, this.document),
            e
        }
        ,
        Mp._definePropertyDescriptor = function(e, t, r, n) {
            n.configurable ? b.objectDefineProperty(e, r, n) : t.hasOwnProperty(r) || b.objectDefineProperty(t, r, n)
        }
        ,
        Mp.prototype.iframeDocumentOpen = function(e, t, r) {
            var n = e.frameElement
              , t = b.documentOpen.apply(t, r);
            return b.objectDefineProperty(e, _.documentWasCleaned, {
                value: !0,
                configurable: !0
            }),
            this._nodeSandbox.iframeSandbox.onIframeBeganToRun(n),
            t
        }
        ,
        Mp.prototype.attach = function(o, e, t) {
            var r = this
              , i = (void 0 === t && (t = !1),
            this.writers.size || kp.prototype.attach.call(this, o, e),
            this.writers.has(e) || (this.writers.set(e, new wp(o,e)),
            this._nodeSandbox.mutation.on(this._nodeSandbox.mutation.BEFORE_DOCUMENT_CLEANED_EVENT, function() {
                r.writers.set(e, new wp(o,e))
            })),
            this)
              , n = o.Document.prototype
              , s = function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var r = i._isUninitializedIframeWithoutSrc(o);
                if (r || i._beforeDocumentCleaned(),
                S)
                    return o.rammerheadParent[_.hammerhead].sandbox.node.doc.iframeDocumentOpen(o, this, e);
                var n = b.documentOpen.apply(this, e);
                return (o[_.hammerhead] ? o[_.hammerhead].nativeMethods.objectDefineProperty : o.Object.defineProperty)(o, _.documentWasCleaned, {
                    value: !0,
                    configurable: !0
                }),
                r ? (r = hn(o)) && i._iframeSandbox.processIframe(r) : i._nodeSandbox.mutation.onDocumentCleaned(o, this),
                n
            }
              , a = function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                S && !Oc.isWindowInited(o) && b.restoreDocumentMeths(o, this),
                Mp._isDocumentInDesignMode(this) && Ju.removeSelfRemovingScripts(this);
                var r = b.documentClose.apply(this, e)
                  , n = (i._isUninitializedIframeWithoutSrc(o) || i._onDocumentClosed(),
                hn(o));
                return n && i._nodeSandbox.iframeSandbox.onIframeBeganToRun(n),
                r
            }
              , l = function() {
                return i._performDocumentWrite(this, arguments)
            }
              , c = function() {
                return i._performDocumentWrite(this, arguments, !0)
            }
              , a = (f(o[b.documentOpenPropOwnerName].prototype, "open", s),
            f(o[b.documentClosePropOwnerName].prototype, "close", a),
            f(o[b.documentWritePropOwnerName].prototype, "write", l),
            f(o[b.documentWriteLnPropOwnerName].prototype, "writeln", c),
            f(e, "open", s),
            f(e, "close", a),
            f(e, "write", l),
            f(e, "writeln", c),
            e.open !== s && f(e, "open", s),
            f(n, "createElement", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var r = b.createElement.apply(this, e);
                return Mp.forceProxySrcForImageIfNecessary(r),
                N.processElement(r, Zt),
                i._nodeSandbox.processNodes(r),
                r
            }),
            f(n, "createElementNS", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var r = b.createElementNS.apply(this, e);
                return Mp.forceProxySrcForImageIfNecessary(r),
                N.processElement(r, Zt),
                i._nodeSandbox.processNodes(r),
                r
            }),
            f(n, "createDocumentFragment", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var r = b.createDocumentFragment.apply(this, e);
                return i._nodeSandbox.processNodes(r),
                r
            }),
            o.HTMLDocument.prototype)
              , p = ""
              , l = (b.documentDocumentURIGetter && d(n, "documentURI", {
                getter: function() {
                    return lr(b.documentDocumentURIGetter.call(this))
                }
            }),
            he(n, "referrer", {
                getter: function() {
                    var e = lr(b.documentReferrerGetter.call(this));
                    return e === er() + "/" ? jt() : or(e) ? "" : e
                }
            }))
              , c = (Mp._definePropertyDescriptor(n, a, "referrer", l),
            he(n, "URL", {
                getter: function() {
                    return wc.getLocationWrapper(this).href
                }
            }))
              , s = (Mp._definePropertyDescriptor(n, a, "URL", c),
            b.objectHasOwnProperty.call(n, "domain") ? n : a)
              , l = he(s, "domain", {
                getter: function() {
                    return p || wc.getLocationWrapper(o).hostname
                },
                setter: function(e) {
                    p = e
                }
            })
              , c = (Mp._definePropertyDescriptor(s, a, "domain", l),
            d(n, "styleSheets", {
                getter: function() {
                    var e = b.documentStyleSheetsGetter.call(this);
                    return i._shadowUI._filterStyleSheetList(e, e.length)
                }
            }),
            o[b.documentCookiePropOwnerName].prototype);
            d(c, "cookie", {
                getter: function() {
                    return i._cookieSandbox.getCookie()
                },
                setter: function(e) {
                    return i._cookieSandbox.setCookie(String(e))
                }
            }),
            d(n, "activeElement", {
                getter: function() {
                    var e = b.documentActiveElementGetter.call(this);
                    return e && x(e) ? i._shadowUI.getLastActiveElement() || this.body : e
                }
            }),
            this._documentTitleStorageInitializer && !t && d(n, "title", {
                getter: function() {
                    return i._documentTitleStorageInitializer.storage.getTitle()
                },
                setter: function(e) {
                    i._documentTitleStorageInitializer.storage.setTitle(e)
                }
            })
        }
        ,
        Mp);
        function Mp(e, t, r, n, o) {
            var i = kp.call(this) || this;
            return i._nodeSandbox = e,
            i._shadowUI = t,
            i._cookieSandbox = r,
            i._iframeSandbox = n,
            i._documentTitleStorageInitializer = o,
            i.writers = new Map,
            i
        }
        function Rp(e) {
            var t = '[name="' + a.uploadInfoHiddenInputName + '"]';
            return b.elementQuerySelector.call(e, t) || (t = e,
            (e = b.createElement.call(document, "input")).type = "hidden",
            e.name = a.uploadInfoHiddenInputName,
            Ju.markElementAsShadow(e),
            b.inputValueSetter.call(e, "[]"),
            b.appendChild.call(t, e),
            Ju.markFormAsShadow(t),
            e)
        }
        function jp(e, t) {
            for (var r = 0; r < e.length; r++)
                if (e[r].id === t.id || e[r].name === t.name)
                    return r;
            return -1
        }
        function Hp(e, t, r) {
            var n = Bp(e);
            if (n) {
                for (var o = [], i = 0, s = (t = b.arraySlice.call(t)).length; i < s; i++) {
                    var a = t[i];
                    o.push({
                        name: a.name,
                        type: a.type,
                        data: a.base64
                    })
                }
                var l = jp(n, e)
                  , r = {
                    id: e.id,
                    name: e.name,
                    files: o,
                    value: r
                };
                -1 === l ? n.push(r) : n[l] = r,
                Fp(e, n)
            }
        }
        function Bp(e) {
            return e.form ? Ca(b.inputValueGetter.call(Rp(e.form))) : null
        }
        function Fp(e, t) {
            e.form && (e = Rp(e.form),
            b.inputValueSetter.call(e, Ta(t)))
        }
        function Up(e) {
            var t = Bp(e);
            if (t) {
                var r = jp(t, e);
                if (-1 !== r)
                    return t.splice(r, 1),
                    Fp(e, t),
                    !0
            }
            return !1
        }
        var Vp = Object.freeze({
            __proto__: null,
            addInputInfo: Hp,
            getFormInfo: Bp,
            setFormInfo: Fp,
            removeInputInfo: Up
        })
          , Gp = ["blur", "focus", "focusin", "focusout", "click", "dblclick", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "beforeinput", "input", "keydown", "keyup"]
          , Wp = {
            left: 0,
            middle: 1,
            right: 2
        }
          , qp = {
            noButton: 0,
            leftButton: 1,
            rightButton: 2
        }
          , Kp = {
            noButton: 0,
            leftButton: 1,
            middleButton: 2,
            rightButton: 3
        }
          , zp = {
            altKey: "Alt",
            ctrlKey: "Control",
            shiftKey: "Shift",
            metaKey: "Meta"
        }
          , Xp = ["click", "dblclick", "contextmenu", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave", "touchstart", "touchmove", "touchend", "keydown", "keypress", "keyup", "textInput", "textinput", "input", "change", "focus", "blur", "MSPointerDown", "MSPointerMove", "MSPointerOver", "MSPointerOut", "MSPointerUp", "pointerdown", "pointermove", "pointerover", "pointerout", "pointerup", "pointerenter", "pointerleave", "dragstart", "drop", "focusin", "focusout"];
        function $p(e, t) {
            e.preventDefault ? e.preventDefault() : e.returnValue = !1,
            t || Yp(e)
        }
        function Yp(e) {
            e.stopImmediatePropagation ? e.stopImmediatePropagation() : e.stopPropagation && e.stopPropagation(),
            e.cancelBubble = !0
        }
        function Qp(e) {
            return "object" == typeof e && e && "function" == typeof e.handleEvent
        }
        function Jp(e) {
            return "function" == typeof e || Qp(e)
        }
        function Zp(e, t, r) {
            return Qp(t) ? t.handleEvent.call(t, r) : t.call(e, r)
        }
        function eu(e) {
            return -1 !== Gp.indexOf(e)
        }
        var tu = !(!b.WindowPointerEvent && !b.WindowMSPointerEvent)
          , ru = Object.freeze({
            __proto__: null,
            BUTTON: Wp,
            BUTTONS_PARAMETER: qp,
            WHICH_PARAMETER: Kp,
            KEYBOARD_MODIFIERS_PARAMETER: zp,
            DOM_EVENTS: Xp,
            preventDefault: $p,
            stopPropagation: Yp,
            isObjectEventListener: Qp,
            isValidEventListener: Jp,
            callEventListener: Zp,
            isComposedEvent: eu,
            hasPointerEvents: tu
        });
        var nu = ["setNamedItem", "setNamedItemNS", "removeNamedItem", "removeNamedItemNS", "getNamedItem", "getNamedItemNS"];
        function ou(t, r, n) {
            return function() {
                var e = r[n].apply(r, arguments);
                return lu(t),
                e
            }
        }
        var iu = function(e, t) {
            var r, n = this;
            for (r in au(this, t),
            this.item = function(e) {
                return n[e]
            }
            ,
            t)
                "function" == typeof this[r] && "item" !== r && (this[r] = -1 !== nu.indexOf(r) ? ou(e, t, r) : function(e, t) {
                    return function() {
                        return e.apply(t, arguments)
                    }
                }(t[r], t));
            vr && (this.getNamedItem = ou(e, t, "getNamedItem"))
        }
          , su = "hammerhead|element-attribute-wrappers";
        function au(e, t) {
            for (var r = 0, n = {}, o = 0, i = t; o < i.length; o++) {
                var s = i[o];
                if (!On(s.name)) {
                    var a = t[P.getStoredAttrName(s.name)];
                    if (a) {
                        if (P.isAddedAutocompleteAttr(s.name, a.value))
                            continue;
                        (s = b.cloneNode.call(s)).value = a.value
                    }
                    n[s.name] = {
                        value: s,
                        configurable: !0,
                        enumerable: !0
                    },
                    n[r] = {
                        value: s,
                        configurable: !0
                    },
                    r++
                }
            }
            n.length = {
                value: r,
                configurable: !0
            },
            b.objectDefineProperties(e, n)
        }
        function lu(e) {
            var t = e[su];
            if (t) {
                var r = t;
                if (r.length)
                    for (var n = 0; n < r.length; n++)
                        delete r[r[n].name],
                        delete r[n];
                au(t, b.elementAttributesGetter.call(e))
            }
        }
        function cu() {
            var n = this;
            this._mutations = b.objectCreate(null),
            this._isDomContentLoaded = !1,
            b.addEventListener.call(document, "DOMContentLoaded", function() {
                for (var e = 0, t = b.objectKeys(n._mutations); e < t.length; e++) {
                    var r = t[e];
                    n._updateVersion(r)
                }
                n._isDomContentLoaded = !0
            })
        }
        cu.prototype._updateVersion = function(e) {
            e in this._mutations && this._mutations[e].increment()
        }
        ,
        cu.prototype._processElement = function(e) {
            e.tagName && !x(e) && (e = Cn(e),
            this._updateVersion("*"),
            this._updateVersion(e))
        }
        ,
        cu.prototype._processChildren = function(e) {
            if (e.querySelectorAll)
                for (var t = Vr(e).call(e, "*"), r = b.nodeListLengthGetter.call(t), n = 0; n < r; n++)
                    this._processElement(t[n])
        }
        ,
        cu.prototype.onElementChanged = function(e) {
            this._processElement(e),
            this._processChildren(e)
        }
        ,
        cu.prototype.onChildrenChanged = function(e) {
            this._processChildren(e)
        }
        ,
        cu.prototype.isDomContentLoaded = function() {
            return this._isDomContentLoaded
        }
        ,
        cu.prototype.isOutdated = function(e, t) {
            return e in this._mutations || (this._mutations[e] = new dc),
            t < this._mutations[e].value
        }
        ,
        cu.prototype.getVersion = function(e) {
            return e in this._mutations ? this._mutations[e].value : -1 / 0
        }
        ;
        var pu = new cu
          , uu = ["_blank", "_self", "_parent", "_top"];
        function hu(e) {
            return e = (e = void 0 === e ? "" : e).toLowerCase(),
            -1 !== uu.indexOf(e)
        }
        var du, fu, mu = [ql, zl], gu = ((Bs = du = du || {})[Bs.Ns = 0] = "Ns",
        Bs[Bs.Node = 1] = "Node",
        e(O, fu = r),
        O._onTargetChanged = function(e) {
            var t, r = Cn(e), n = N.getTargetAttr(e);
            P.isIframeFlagTag(r) && (t = "",
            "target" === n ? t = "form" === r ? "action" : "href" : "formtarget" === n && (t = "formaction"),
            r = P.getStoredAttrName(t),
            e.hasAttribute(r) && nr(n = e.getAttribute(r)) && e.setAttribute(t, n))
        }
        ,
        O._setProxiedSrc = function(e) {
            var t, r;
            e[_.forceProxySrcForImage] || (r = !!(t = b.imageSrcGetter.call(e)) && e.complete && !e[_.cachedImage],
            e[_.forceProxySrcForImage] = !0,
            t && e.setAttribute("src", t),
            e[_.skipNextLoadEventForImage] = r)
        }
        ,
        O.prototype.getAttributeCore = function(e, t, r) {
            var n = String(t[r ? 1 : 0])
              , o = n.toLowerCase()
              , i = r ? t[0] : null
              , s = r ? b.getAttributeNS : b.getAttribute
              , a = Cn(e);
            if ("style" === o)
                return Fl.cleanUp(s.apply(e, t), Qt);
            if (N.isUrlAttr(e, o, i) || -1 !== N.EVENTS.indexOf(o) || -1 !== Il.indexOf(o)) {
                var l = P.getStoredAttrName(n)
                  , i = s.apply(e, r ? [i, l] : [l]);
                if (P.isAddedAutocompleteAttr(o, i))
                    return null;
                e.hasAttribute(l) && (t[r ? 1 : 0] = l)
            } else
                !r && ("integrity" === o && P.isTagWithIntegrityAttr(a) || "rel" === o && "link" === a || "required" === o && to(e) || "srcdoc" === o && "iframe" === a) && (i = P.getStoredAttrName(n),
                b.hasAttribute.call(e, i) && (t[0] = i));
            return s.apply(e, t)
        }
        ,
        O.prototype.setAttributeCore = function(e, t, r) {
            var n, o, i = r ? t[0] : null, s = String(t[r ? 1 : 0]), a = s.toLowerCase(), l = r ? 2 : 1, c = String(t[l]), p = r ? b.setAttributeNS : b.setAttribute, u = Cn(e), h = N.isUrlAttr(e, s, i), d = -1 !== N.EVENTS.indexOf(s), f = !1, m = !1, g = or(c), y = nr(c);
            if (h && !y && !g || d) {
                var v = P.isJsProtocol(c)
                  , E = P.getStoredAttrName(s);
                (h && v || d) && (t[l] = P.processJsAttrValue(c, {
                    isJsProtocol: v,
                    isEventAttr: d
                })),
                p.apply(e, r ? [i, E, c] : [E, c])
            } else if (h && (y || g)) {
                var v = P.getStoredAttrName(s);
                p.apply(e, r ? [i, v, c] : [v, c]),
                "img" !== u || e[_.forceProxySrcForImage] ? ("img" === u && (e[_.skipNextLoadEventForImage] = !1),
                "" === c || g && "a" !== u || (d = "iframe" === u || "frame" === u,
                E = "script" === u,
                h = y && !Dt(location.toString(), c),
                v = N.getElementResourceType(e),
                y = E && e.charset,
                E = e.ownerDocument || this.document,
                "formaction" !== a || b.hasAttribute.call(e, "formtarget") || (v = it({
                    isForm: !0
                }),
                e.form && b.hasAttribute.call(e.form, "action") && ((S = Qt(b.formActionGetter.call(e.form))) && (v = S.resourceType))),
                O._isHrefAttrForBaseElement(e, s) && In(e, E) && Nt.updateBase(c, E),
                t[l] = d && h ? Kt(c) : w(c, {
                    resourceType: v,
                    charset: y,
                    doc: E
                }))) : !c || g || Qt(c) || (t[l] = (e[_.forceProxySrcForImage] ? w : $t)(c)),
                b.nodeParentNodeGetter.call(e) || b.objectDefineProperty(e, _.currentBaseUrl, {
                    value: Nt.getBaseUrl(document),
                    configurable: !0,
                    writable: !0
                })
            } else if ("autocomplete" === a) {
                var S = P.getStoredAttrName(s);
                p.apply(e, r ? [i, S, c] : [S, c]),
                t[l] = "off"
            } else if ("target" === a && P.isTagWithTargetAttr(u) || "formtarget" === a && P.isTagWithFormTargetAttr(u)) {
                var d = b.getAttribute.call(e, a)
                  , h = this.getCorrectedTarget(c);
                if (h === d)
                    return null;
                v = P.getStoredAttrName(s);
                p.apply(e, r ? [i, v, c] : [v, c]),
                t[l] = h,
                f = !0
            } else if ("sandbox" === s) {
                var y = P.getStoredAttrName(s)
                  , E = -1 !== c.indexOf("allow-same-origin")
                  , g = -1 !== c.indexOf("allow-scripts");
                p.apply(e, r ? [i, y, c] : [y, c]),
                E && g || (t[l] += E ? "" : " allow-same-origin",
                t[l] += g ? "" : " allow-scripts"),
                e[this._nodeSandbox.win.SANDBOX_DOM_TOKEN_LIST_UPDATE_FN] && e[this._nodeSandbox.win.SANDBOX_DOM_TOKEN_LIST_UPDATE_FN](c)
            } else if ("meta" === u && "http-equiv" === s) {
                var S = c.toLowerCase();
                if (-1 !== mu.indexOf(S))
                    return null
            } else if ("xlink:href" === a && -1 !== N.SVG_XLINK_HREF_TAGS.indexOf(u) && fo(e)) {
                d = P.getStoredAttrName(s);
                p.apply(e, r ? [i, d, c] : [d, c]),
                Xe.test(c) || (t[l] = w(c))
            } else if ("style" === a)
                t[l] = Fl.process(c, w);
            else {
                if (!r && "integrity" === a && P.isTagWithIntegrityAttr(u))
                    return v = P.getStoredAttrName(s),
                    p.apply(e, [v, c]);
                r || "rel" !== a || "link" !== u ? r || "as" !== a || "link" !== u ? !r && "required" === a && to(e) ? (n = P.getStoredAttrName(s),
                b.removeAttribute.call(e, s),
                t[0] = n) : !r && "type" === a && jn(e) ? (h = b.getAttribute.call(e, a),
                y = c.toLowerCase(),
                n = P.getStoredAttrName("required"),
                E = b.hasAttribute.call(e, n) ? b.getAttribute.call(e, n) : b.getAttribute.call(e, "required"),
                h && y === h.toLowerCase() || null === E || ("file" === y ? (b.setAttribute.call(e, n, E),
                b.removeAttribute.call(e, "required")) : "file" === h && (b.setAttribute.call(e, "required", E),
                b.removeAttribute.call(e, n)))) : r || "srcdoc" !== a || "iframe" !== u || (g = P.getStoredAttrName(s),
                p.apply(e, [g, c]),
                t[l] = N.adapter.processSrcdocAttr(c)) : m = c !== (o = b.getAttribute.call(e, "as")) && (c === N.PROCESSED_PRELOAD_LINK_CONTENT_TYPE || o === N.PROCESSED_PRELOAD_LINK_CONTENT_TYPE) : (o = b.getAttribute.call(e, "rel"),
                S = Re(c.toLowerCase()),
                i = P.getStoredAttrName(s),
                m = c !== o && (c === N.MODULE_PRELOAD_LINK_REL || o === N.MODULE_PRELOAD_LINK_REL),
                "prefetch" === S ? (b.removeAttribute.call(e, s),
                t[0] = i) : b.removeAttribute.call(e, i))
            }
            d = p.apply(e, t);
            return "img" !== u || e[_.forceProxySrcForImage] || !e.complete || Te || (e[_.cachedImage] = !0),
            f && O._onTargetChanged(e),
            m && b.hasAttribute.call(e, "href") && this.setAttributeCore(e, ["href", b.getAttribute.call(e, "href")]),
            d
        }
        ,
        O.prototype._hasAttributeCore = function(e, t, r) {
            var n = r ? 1 : 0
              , o = r ? b.hasAttributeNS : b.hasAttribute
              , i = P.getStoredAttrName("autocomplete")
              , i = b.getAttribute.call(e, i)
              , s = Cn(e);
            if ("string" == typeof t[n] && P.isAddedAutocompleteAttr(t[n], i))
                return !1;
            if (!r && "integrity" === t[0] && P.isTagWithIntegrityAttr(s))
                t[0] = P.getStoredAttrName("integrity");
            else {
                if (!r && "rel" === t[0] && "link" === s)
                    return n = P.getStoredAttrName(t[0]),
                    o.apply(e, t) || o.apply(e, [n]);
                if (!r && "required" === t[0] && to(e))
                    return i = P.getStoredAttrName(t[0]),
                    o.apply(e, t) || o.call(e, i)
            }
            return o.apply(e, t)
        }
        ,
        O._removeStoredAttrNode = function(e) {
            var t = P.getStoredAttrName(e.name)
              , e = e.namespaceURI ? b.getAttributeNodeNS.call(this, e.namespaceURI, t) : b.getAttributeNode.call(this, t);
            e && b.removeAttributeNode.call(this, e)
        }
        ,
        O.prototype.removeAttributeCore = function(e, t, r) {
            var n, o, i, s, a = r === du.Ns, r = r === du.Node, l = r ? (n = (o = t[0]).name,
            O._removeStoredAttrNode) : (n = String(t[a ? 1 : 0]),
            a ? b.removeAttributeNS : b.removeAttribute), c = n.toLowerCase(), p = Cn(e), u = void 0;
            if (N.isUrlAttr(e, c, a ? t[0] : null) || "sandbox" === c || "autocomplete" === c || -1 !== N.EVENTS.indexOf(c) || "target" === c && P.isTagWithTargetAttr(p) || "formtarget" === c && P.isTagWithFormTargetAttr(p) ? (s = P.getStoredAttrName(n),
            "autocomplete" === c ? b.setAttribute.call(e, s, N.AUTOCOMPLETE_ATTRIBUTE_ABSENCE_MARKER) : l.apply(e, a ? [t[0], s] : [r ? o : s])) : a || "rel" !== c || "link" !== p ? !a && "required" === c && to(e) ? (i = P.getStoredAttrName(n),
            l.call(e, r ? o : i)) : !a && "type" === c && jn(e) && (i = P.getStoredAttrName("required"),
            b.hasAttribute.call(e, i) && (s = b.getAttribute.call(e, i),
            b.setAttribute.call(e, "required", s),
            b.removeAttribute.call(e, i))) : (s = P.getStoredAttrName(n),
            l.apply(e, [r ? o : s])),
            O._isHrefAttrForBaseElement(e, c) && Nt.updateBase(Rt(), this.document),
            "autocomplete" !== c)
                if (r) {
                    for (var h = [b.getAttributeNodeNS.call(e, o.namespaceURI, o.name)], d = 1, f = t.length; d < f; ++d)
                        h.push(t[d]);
                    u = b.removeAttributeNode.apply(e, h)
                } else
                    u = (a ? b.removeAttributeNS : b.removeAttribute).apply(e, t);
            return ("target" === c && P.isTagWithTargetAttr(p) || "formtarget" === c && P.isTagWithFormTargetAttr(p)) && O._onTargetChanged(e),
            u
        }
        ,
        O._getChildNodesArray = function(e, t) {
            var r = []
              , n = t[0]
              , o = t[1];
            if (0 === e.length)
                return r;
            for (var i = n; i < o; i++) {
                var s, a = e[i];
                To(a) ? (s = b.nodeChildNodesGetter.call(a),
                r.push.apply(r, Ko(s))) : "string" != typeof a && r.push(a)
            }
            return r
        }
        ,
        O.prototype._addNodeCore = function(e, t, r, n, o, i, s) {
            void 0 === i && (i = !0),
            this._prepareNodesForInsertion(n, r, e, s = void 0 === s ? !1 : s);
            var s = null
              , a = O._getChildNodesArray(n, r);
            s = i && no(e) && In(e) ? (i = b.arraySlice.apply(n, r),
            this._shadowUI.insertBeforeRoot(i)) : o.apply(t, n);
            for (var l = 0, c = a; l < c.length; l++) {
                var p = c[l];
                this._onElementAdded(p)
            }
            return s
        }
        ,
        O.prototype._removeNodeCore = function(e, t, r, n) {
            this._onRemoveFileInputInfo(r),
            this._onRemoveIframe(r);
            n = n.apply(e, t);
            return this._onElementRemoved(r),
            n
        }
        ,
        O.prototype._prepareNodesForInsertion = function(e, t, r, n) {
            if (void 0 === n && (n = !1),
            0 !== e.length)
                for (var o = t[0], i = t[1], s = o; s < i; s++) {
                    var a = e[s];
                    wo(a) ? a.data = O._processTextContent(a.data, r) : xn(a) || To(a) || Co(a) ? this._nodeSandbox.processNodes(a) : "string" == typeof (a = n ? String(a) : a) && (e[s] = O._processTextContent(a, r))
                }
        }
        ,
        O.prototype._insertAdjacentTextOrElement = function(e, t, r) {
            var n = null == (n = null == (o = t[0]) ? void 0 : o.toLocaleLowerCase) ? void 0 : n.call(o)
              , o = n === jc.beforeBegin || n === jc.afterEnd ? b.nodeParentNodeGetter.call(e) : e;
            return o ? this._addNodeCore(o, e, [1, 2], t, r, n === jc.beforeEnd) : b.insertAdjacentElement.apply(e, t)
        }
        ,
        O.prototype._createOverriddenMethods = function() {
            var a = this;
            this.overriddenMethods = {
                appendData: function(e) {
                    var t = b.nodeParentNodeGetter.call(this);
                    b.nodeTextContentSetter.call(this, b.nodeTextContentGetter.call(this) + e),
                    t && (this.data = O._processTextContent(this.data, t))
                },
                insertRow: function() {
                    var e = (Io(this) ? b.insertTableRow : b.insertTBodyRow).apply(this, arguments);
                    return a._nodeSandbox.processNodes(e),
                    e
                },
                insertCell: function() {
                    var e = b.insertCell.apply(this, arguments);
                    return a._nodeSandbox.processNodes(e),
                    e
                },
                insertAdjacentHTML: function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    var r = null == (r = null == (n = e[0]) ? void 0 : n.toLocaleLowerCase) ? void 0 : r.call(n)
                      , n = e[1]
                      , r = r === jc.beforeBegin || r === jc.afterEnd ? b.nodeParentNodeGetter.call(this) : this;
                    1 < e.length && null !== n && r && (e[1] = cp(String(n), {
                        parentTag: r.tagName,
                        processedContext: r[_.processedContext]
                    })),
                    b.insertAdjacentHTML.apply(this, e),
                    r && (a._nodeSandbox.processNodes(r),
                    pu.onChildrenChanged(r))
                },
                insertAdjacentElement: function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    return a._insertAdjacentTextOrElement(this, e, b.insertAdjacentElement)
                },
                insertAdjacentText: function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    return a._insertAdjacentTextOrElement(this, e, b.insertAdjacentText)
                },
                formSubmit: function() {
                    a._ensureTargetContainsExistingBrowsingContext(this);
                    var e = {
                        form: this,
                        preventSubmit: !1
                    };
                    return a.emit(a.BEFORE_FORM_SUBMIT_EVENT, e),
                    e.preventSubmit ? null : b.formSubmit.apply(this, arguments)
                },
                insertBefore: function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    return a._addNodeCore(this, this, [0, 1], e, b.insertBefore, !e[1])
                },
                appendChild: function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    return a._addNodeCore(this, this, [0, 1], e, b.appendChild)
                },
                append: function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    return a._addNodeCore(this, this, [0, e.length], e, b.append, !0, !0)
                },
                prepend: function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    return a._addNodeCore(this, this, [0, e.length], e, b.prepend, !1)
                },
                after: function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    var r = b.nodeParentNodeGetter.call(this);
                    return r ? a._addNodeCore(r, this, [0, e.length], e, b.after, !1) : b.after.apply(this, e)
                },
                removeChild: function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    return a._removeNodeCore(this, e, e[0], b.removeChild)
                },
                remove: function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    return a._removeNodeCore(this, e, this, b.remove)
                },
                elementReplaceWith: function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    var r = b.nodeParentNodeGetter.call(this);
                    if (!r)
                        return b.elementReplaceWith.apply(this, e);
                    var n = [0, e.length]
                      , r = (a._prepareNodesForInsertion(e, n, r),
                    O._getChildNodesArray(e, n))
                      , n = (a._onRemoveFileInputInfo(this),
                    a._onRemoveIframe(this),
                    b.elementReplaceWith.apply(this, e));
                    a._onElementRemoved(this);
                    for (var o = 0, i = r; o < i.length; o++) {
                        var s = i[o];
                        a._onElementAdded(s)
                    }
                    return n
                },
                replaceChild: function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    var r = e[0]
                      , n = e[1]
                      , o = (wo(r) && (r.data = O._processTextContent(r.data, this)),
                    a._onRemoveFileInputInfo(n),
                    b.replaceChild.apply(this, arguments));
                    return a._onAddFileInputInfo(r),
                    pu.onElementChanged(r),
                    pu.onElementChanged(n),
                    o
                },
                cloneNode: function() {
                    var e = b.cloneNode.apply(this, arguments);
                    return a._nodeSandbox.processNodes(e),
                    e
                },
                attachShadow: function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    var r = b.attachShadow.apply(this, e);
                    return b.objectDefineProperty(r, Tn, {
                        value: this
                    }),
                    r
                },
                getAttribute: function() {
                    return a.getAttributeCore(this, arguments)
                },
                getAttributeNS: function() {
                    return a.getAttributeCore(this, arguments, !0)
                },
                setAttribute: function() {
                    var e = a.setAttributeCore(this, arguments);
                    return lu(this),
                    e
                },
                setAttributeNS: function() {
                    var e = a.setAttributeCore(this, arguments, !0);
                    return lu(this),
                    e
                },
                removeAttribute: function() {
                    var e = a.removeAttributeCore(this, arguments);
                    return lu(this),
                    e
                },
                removeAttributeNS: function() {
                    var e = a.removeAttributeCore(this, arguments, du.Ns);
                    return lu(this),
                    e
                },
                removeAttributeNode: function() {
                    var e = a.removeAttributeCore(this, arguments, du.Node);
                    return lu(this),
                    e
                },
                querySelector: function() {
                    return "string" == typeof arguments[0] && (arguments[0] = Nu.processSelector(arguments[0])),
                    (xn(e = this) ? b.elementQuerySelector : To(e) || Ao(e) ? b.documentFragmentQuerySelector : b.querySelector).apply(this, arguments);
                    var e
                },
                querySelectorAll: function() {
                    return "string" == typeof arguments[0] && (arguments[0] = Nu.processSelector(arguments[0])),
                    Vr(this).apply(this, arguments)
                },
                hasAttribute: function() {
                    return a._hasAttributeCore(this, arguments, !1)
                },
                hasAttributeNS: function() {
                    return a._hasAttributeCore(this, arguments, !0)
                },
                hasAttributes: function() {
                    return 2 === b.elementAttributesGetter.call(this).length && b.elementAttributesGetter.call(this).getNamedItem("autocomplete") && b.elementAttributesGetter.call(this).getNamedItem(P.getStoredAttrName("autocomplete")) ? a._hasAttributeCore(this, ["autocomplete"], !1) : b.hasAttributes.apply(this, arguments)
                },
                anchorToString: function() {
                    return lr(b.anchorToString.call(this))
                },
                registerElement: function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    var r, n = e[1];
                    return n && n.prototype && n.prototype.createdCallback && (r = n.prototype.createdCallback,
                    n.prototype.createdCallback = function() {
                        up(this) || r.call(this)
                    }
                    ),
                    b.registerElement.apply(this, e)
                }
            }
        }
        ,
        O._processTextContent = function(e, t) {
            return t.tagName ? Xn(t) ? wl(e, !0, !1, Zt) : $n(t) ? Fl.process(e, w) : e : e
        }
        ,
        O._isHrefAttrForBaseElement = function(e, t) {
            return zn(e) && "href" === t
        }
        ,
        O._removeFileInputInfo = function(e) {
            Up(e)
        }
        ,
        O._hasShadowUIParentOrContainsShadowUIClassPostfix = function(e) {
            var t = b.nodeParentNodeGetter.call(e);
            return t && x(t) || Ju.containsShadowUIClassPostfix(e)
        }
        ,
        O.prototype._isFirstBaseTagOnPage = function(e) {
            var t = e.ownerDocument || this.document;
            return b.querySelector.call(t, "base") === e
        }
        ,
        O.prototype._onAddFileInputInfo = function(e) {
            if (xn(e))
                for (var t = 0, r = zo(e); t < r.length; t++) {
                    var n = r[t];
                    this.addFileInputInfo(n)
                }
        }
        ,
        O.prototype._onRemoveFileInputInfo = function(e) {
            xn(e) && (to(e) ? O._removeFileInputInfo(e) : vn(e, "input[type=file]", O._removeFileInputInfo))
        }
        ,
        O.prototype._onRemoveIframe = function(e) {
            xn(e) && Ln(e) && Pp(b.contentWindowGetter.call(e))
        }
        ,
        O.prototype._onElementAdded = function(e) {
            if (O._hasShadowUIParentOrContainsShadowUIClassPostfix(e) && Ju.markElementAndChildrenAsShadow(e),
            (xn(e) || po(e)) && In(e)) {
                for (var t = 0, r = Xo(e); t < r.length; t++) {
                    var n = r[t];
                    this.onIframeAddedToDOM(n)
                }
                for (var o = 0, i = $o(e); o < i.length; o++) {
                    var s = i[o];
                    this.emit(this.SCRIPT_ELEMENT_ADDED_EVENT, {
                        el: s
                    })
                }
                pu.onElementChanged(e)
            }
            var a;
            (jn(e) || Bn(e)) && e.form && b.hasAttribute.call(e, "formaction") && e.setAttribute("formaction", e.getAttribute("formaction")),
            Gn(e) && this._shadowUI.onBodyElementMutation(),
            this._onAddFileInputInfo(e),
            zn(e) && this._isFirstBaseTagOnPage(e) && (a = P.getStoredAttrName("href"),
            null !== (e = e.getAttribute(a)) && Nt.updateBase(e, this.document))
        }
        ,
        O.prototype._onElementRemoved = function(e) {
            var t;
            Gn(e) ? this._shadowUI.onBodyElementMutation() : zn(e) && (t = (t = b.querySelector.call(this.document, "base")) && t.getAttribute(P.getStoredAttrName("href")),
            Nt.updateBase(t || Rt(), this.document)),
            pu.onElementChanged(e)
        }
        ,
        O.prototype._reprocessElementsAssociatedWithIframe = function(e) {
            if (e.name)
                for (var t = 0, r = b.querySelectorAll.call(this.document, '*[target="' + e.name + '"]'); t < r.length; t++) {
                    var n = r[t];
                    this._reprocessElementAssociatedWithIframe(n)
                }
        }
        ,
        O.prototype._reprocessElementAssociatedWithIframe = function(e) {
            var t = N.getUrlAttr(e)
              , t = P.getStoredAttrName(t);
            b.removeAttribute.call(e, t),
            P.setElementProcessed(e, !1),
            N.processElement(e, Zt)
        }
        ,
        O.prototype.addFileInputInfo = function(e) {
            var t = this._uploadSandbox.infoManager;
            Hp(e, t.getFiles(e), t.getValue(e))
        }
        ,
        O.prototype.onIframeAddedToDOM = function(e) {
            _n(e, !0) || this._nodeSandbox.mutation.onIframeAddedToDOM(e),
            Ap(b.contentWindowGetter.call(e)),
            this._reprocessElementsAssociatedWithIframe(e)
        }
        ,
        O.prototype.attach = function(e) {
            fu.prototype.attach.call(this, e),
            this._createOverriddenMethods(),
            f(e.Element.prototype, "setAttribute", this.overriddenMethods.setAttribute),
            f(e.Element.prototype, "setAttributeNS", this.overriddenMethods.setAttributeNS),
            f(e.Element.prototype, "getAttribute", this.overriddenMethods.getAttribute),
            f(e.Element.prototype, "getAttributeNS", this.overriddenMethods.getAttributeNS),
            f(e.Element.prototype, "removeAttribute", this.overriddenMethods.removeAttribute),
            f(e.Element.prototype, "removeAttributeNS", this.overriddenMethods.removeAttributeNS),
            f(e.Element.prototype, "removeAttributeNode", this.overriddenMethods.removeAttributeNode),
            f(e.Element.prototype, "cloneNode", this.overriddenMethods.cloneNode),
            f(e.Element.prototype, "querySelector", this.overriddenMethods.querySelector),
            f(e.Element.prototype, "querySelectorAll", this.overriddenMethods.querySelectorAll),
            f(e.Element.prototype, "hasAttribute", this.overriddenMethods.hasAttribute),
            f(e.Element.prototype, "hasAttributeNS", this.overriddenMethods.hasAttributeNS),
            f(e.Element.prototype, "hasAttributes", this.overriddenMethods.hasAttributes),
            b.attachShadow && f(e.Element.prototype, "attachShadow", this.overriddenMethods.attachShadow),
            f(e.Node.prototype, "cloneNode", this.overriddenMethods.cloneNode),
            f(e.Node.prototype, "appendChild", this.overriddenMethods.appendChild),
            f(e.Node.prototype, "removeChild", this.overriddenMethods.removeChild),
            f(e.Node.prototype, "insertBefore", this.overriddenMethods.insertBefore),
            f(e.Node.prototype, "replaceChild", this.overriddenMethods.replaceChild),
            b.append && f(e.Element.prototype, "append", this.overriddenMethods.append),
            b.prepend && f(e.Element.prototype, "prepend", this.overriddenMethods.prepend),
            b.after && f(e.Element.prototype, "after", this.overriddenMethods.after),
            b.remove && f(e.Element.prototype, "remove", this.overriddenMethods.remove),
            b.elementReplaceWith && f(e.Element.prototype, "replaceWith", this.overriddenMethods.elementReplaceWith),
            f(e.DocumentFragment.prototype, "querySelector", this.overriddenMethods.querySelector),
            f(e.DocumentFragment.prototype, "querySelectorAll", this.overriddenMethods.querySelectorAll),
            f(e.HTMLTableElement.prototype, "insertRow", this.overriddenMethods.insertRow),
            f(e.HTMLTableSectionElement.prototype, "insertRow", this.overriddenMethods.insertRow),
            f(e.HTMLTableRowElement.prototype, "insertCell", this.overriddenMethods.insertCell),
            f(e.HTMLFormElement.prototype, "submit", this.overriddenMethods.formSubmit),
            f(e.HTMLAnchorElement.prototype, "toString", this.overriddenMethods.anchorToString),
            f(e.CharacterData.prototype, "appendData", this.overriddenMethods.appendData),
            e.Document.prototype.registerElement && f(e.Document.prototype, "registerElement", this.overriddenMethods.registerElement),
            f(b.insertAdjacentMethodsOwner, "insertAdjacentHTML", this.overriddenMethods.insertAdjacentHTML),
            f(b.insertAdjacentMethodsOwner, "insertAdjacentElement", this.overriddenMethods.insertAdjacentElement),
            f(b.insertAdjacentMethodsOwner, "insertAdjacentText", this.overriddenMethods.insertAdjacentText),
            this._setValidBrowsingContextOnElementClick(e),
            this._eventSandbox.listeners.on(this._eventSandbox.listeners.EVENT_LISTENER_ATTACHED_EVENT, function(e) {
                "load" === e.eventType && Rn(e.el) && O._setProxiedSrc(e.el)
            }),
            d(e.HTMLElement.prototype, "onload", {
                getter: null,
                setter: function(e) {
                    Rn(this) && Jp(e) && O._setProxiedSrc(this),
                    b.htmlElementOnloadSetter.call(this, e)
                }
            })
        }
        ,
        O.prototype._ensureTargetContainsExistingBrowsingContext = function(e) {
            var t, r;
            m.get().allowMultipleWindows || b.hasAttribute.call(e, "target") && (t = b.getAttribute.call(e, "target"),
            r = b.getAttribute.call(e, P.getStoredAttrName("target")),
            e.setAttribute("target", r || t))
        }
        ,
        O.prototype._setValidBrowsingContextOnElementClick = function(e) {
            var r = this;
            this._eventSandbox.listeners.initElementListening(e, ["click"]),
            this._eventSandbox.listeners.addInternalEventBeforeListener(e, ["click"], function(e) {
                var e = b.eventTargetGetter.call(e)
                  , t = Cn(e = jn(e) && e.form ? e.form : e);
                P.isTagWithTargetAttr(t) && r._ensureTargetContainsExistingBrowsingContext(e)
            })
        }
        ,
        O.prototype._setProxiedSrcUrlOnError = function(n) {
            n.addEventListener("error", function(e) {
                var t = b.getAttribute.call(n, P.getStoredAttrName("src"))
                  , r = b.imageSrcGetter.call(n);
                t && !Qt(r) && nr(r) && !or(r) && (b.setAttribute.call(n, "src", w(t)),
                Yp(e))
            }, !1)
        }
        ,
        O.prototype.getCorrectedTarget = function(e) {
            return void 0 === e && (e = ""),
            !m.get().allowMultipleWindows && (e && !hu(e) && !Ip(e) || /_blank/i.test(e)) ? "_top" : e
        }
        ,
        O.prototype._handleImageLoadEventRaising = function(i) {
            this._eventSandbox.listeners.initElementListening(i, ["load"]),
            this._eventSandbox.listeners.addInternalEventBeforeListener(i, ["load"], function(e, t, r, n, o) {
                i[_.cachedImage] && (i[_.cachedImage] = !1),
                i[_.skipNextLoadEventForImage] && (i[_.skipNextLoadEventForImage] = !1,
                r(),
                o())
            }),
            i[_.forceProxySrcForImage] || m.get().forceProxySrcForImage || this._setProxiedSrcUrlOnError(i)
        }
        ,
        O.prototype._processBaseTag = function(e) {
            var t;
            !this._isFirstBaseTagOnPage(e) || null !== (t = b.getAttribute.call(e, P.getStoredAttrName("href"))) && Nt.updateBase(t, e.ownerDocument || this.document)
        }
        ,
        O.prototype._reProcessElementWithTargetAttr = function(e, t) {
            var r = N.getTargetAttr(e);
            P.isIframeFlagTag(t) && "_parent" === b.getAttribute.call(e, r) && N.processElement(e, Zt)
        }
        ,
        O.prototype.processElement = function(e) {
            var t = Cn(e);
            switch (t) {
            case "a":
                this._childWindowSandbox.handleClickOnLinkOrArea(e);
                break;
            case "img":
                this._handleImageLoadEventRaising(e);
                break;
            case "iframe":
            case "frame":
                this._iframeSandbox.processIframe(e);
                break;
            case "base":
                this._processBaseTag(e);
                break;
            case "area":
                this._childWindowSandbox.handleClickOnLinkOrArea(e)
            }
            this._reProcessElementWithTargetAttr(e, t)
        }
        ,
        O);
        function O(e, t, r, n, o, i) {
            var s = fu.call(this) || this;
            return s._nodeSandbox = e,
            s._uploadSandbox = t,
            s._iframeSandbox = r,
            s._shadowUI = n,
            s._eventSandbox = o,
            s._childWindowSandbox = i,
            s.BEFORE_FORM_SUBMIT_EVENT = "hammerhead|event|before-form-submit",
            s.SCRIPT_ELEMENT_ADDED_EVENT = "hammerhead|event|script-added",
            s.overriddenMethods = null,
            s
        }
        var yu, vu = "hammerhead|document-title-storage|internal-prop-name", Eu = (e(Su, yu = ke),
        Su.prototype._ensureFirstTitleElement = function() {
            var e = this.getFirstTitleElement();
            return e || (e = b.createElement.call(this._document, "title"),
            b.appendChild.call(this._document.head, e),
            this.emit("titleElementAdded"),
            e)
        }
        ,
        Su.prototype._getValueFromFirstTitleElement = function() {
            var e = this.getFirstTitleElement();
            return e ? this.getTitleElementPropertyValue(e) : ""
        }
        ,
        Su.prototype._setValueForFirstTitleElement = function(e) {
            var t = this._ensureFirstTitleElement();
            this.setTitleElementPropertyValue(t, e)
        }
        ,
        Su.prototype._getTitleElement = function(e) {
            return this._document && this._document.head && b.elementQuerySelectorAll.call(this._document.head, "title")[e]
        }
        ,
        Su.prototype.getFirstTitleElement = function() {
            return this._getTitleElement(0)
        }
        ,
        Su.prototype.getSecondTitleElement = function() {
            return this._getTitleElement(1)
        }
        ,
        Su.prototype.getTitle = function() {
            return this._getValueFromFirstTitleElement()
        }
        ,
        Su.prototype.setTitle = function(e) {
            e = String(e),
            this._setValueForFirstTitleElement(e)
        }
        ,
        Su.prototype.getTitleElementPropertyValue = function(e) {
            return e[vu] || ""
        }
        ,
        Su.prototype.setTitleElementPropertyValue = function(e, t) {
            t = String(t),
            this.isElementProcessed(e) ? e[vu] = t : b.objectDefineProperty(e, vu, {
                value: t,
                writable: !0
            })
        }
        ,
        Su.prototype.getDocument = function() {
            return this._document
        }
        ,
        Su.prototype.isElementProcessed = function(e) {
            return vu in e
        }
        ,
        Object.defineProperty(Su, "DEFAULT_TITLE_VALUE", {
            get: function() {
                return ""
            },
            enumerable: !0,
            configurable: !0
        }),
        Su);
        function Su(e) {
            var t = yu.call(this) || this;
            return t._document = e,
            t
        }
        bu.prototype._setProxiedTitleValue = function() {
            var e = m.get()
              , e = e.sessionId + "*" + e.windowId;
            b.documentTitleSetter.call(this.storage.getDocument(), e)
        }
        ,
        bu.prototype._processFirstTitleElement = function() {
            var e = this.storage.getFirstTitleElement();
            if (!e)
                return !1;
            if (this.storage.isElementProcessed(e))
                return !1;
            var t = b.titleElementTextGetter.call(e);
            return this.storage.setTitleElementPropertyValue(e, t),
            this._setProxiedTitleValue(),
            !0
        }
        ,
        bu.prototype.onAttach = function() {
            this._processFirstTitleElement()
        }
        ,
        bu.prototype.onPageTitleLoaded = function() {
            var e, t, r, n;
            this._processFirstTitleElement() || (e = this.storage.getFirstTitleElement(),
            (t = this.storage.getSecondTitleElement()) && (r = b.titleElementTextGetter.call(t) || b.htmlElementInnerTextGetter.call(t),
            n = b.titleElementTextGetter.call(e),
            b.titleElementTextSetter.call(t, n),
            Hc(e),
            this.storage.setTitleElementPropertyValue(t, r)))
        }
        ;
        var _u = bu;
        function bu(e) {
            var t = this;
            this.storage = e,
            this.storage.on("titleElementAdded", function() {
                return t._processFirstTitleElement()
            })
        }
        var wu, xu = /\[([\w-]+)(\^?=.+?)]/g, Cu = /^\W+\s*#/, Tu = /\s*:focus\b/gi, Au = /:hover\b/gi, Pu = Node.DOCUMENT_FRAGMENT_NODE;
        function Iu(e, t, r, n, o, i, s) {
            var a = wu.call(this) || this;
            return a.mutation = e,
            a.iframeSandbox = t,
            a._eventSandbox = r,
            a._uploadSandbox = n,
            a.shadowUI = o,
            a._cookieSandbox = i,
            a._childWindowSandbox = s,
            a.raiseBodyCreatedEvent = a._onBodyCreated,
            b.objectDefineProperty(document, _.documentCharset, {
                value: Vo(),
                writable: !0
            }),
            a._documentTitleStorageInitializer = Iu._createDocumentTitleStorageInitializer(),
            a.doc = new Dp(a,a.shadowUI,a._cookieSandbox,a.iframeSandbox,a._documentTitleStorageInitializer),
            a.win = new Qh(a,a._eventSandbox,a._uploadSandbox,a.mutation,a._childWindowSandbox,a._documentTitleStorageInitializer),
            a.element = new gu(a,a._uploadSandbox,a.iframeSandbox,a.shadowUI,a._eventSandbox,a._childWindowSandbox),
            a
        }
        e(Iu, wu = r),
        Iu._createDocumentTitleStorageInitializer = function() {
            if (wn(window))
                return null;
            var e = new Eu(document);
            return new _u(e)
        }
        ,
        Iu.prototype._onBodyCreated = function() {
            this._eventSandbox.listeners.initDocumentBodyListening(this.document),
            this.mutation.onBodyCreated(this.document.body)
        }
        ,
        Iu.prototype._processElement = function(e) {
            var t, r, n = e[_.processedContext], o = !!e[_.currentBaseUrl] && e[_.currentBaseUrl] !== Nt.getBaseUrl(this.document);
            (o || !x(e) && n !== this.window) && (t = null,
            n && (t = (t = N.getUrlAttr(e)) && e.hasAttribute(t) ? t : null),
            r = b.objectIsExtensible(e),
            n = n && !b.objectIsFrozen(e),
            (r || n) && b.objectDefineProperty(e, _.processedContext, {
                value: this.window,
                writable: !0
            }),
            t && e.setAttribute(t, e.getAttribute(t)),
            o && delete e[_.currentBaseUrl],
            this.element.processElement(e))
        }
        ,
        Iu.prototype.onOriginFirstTitleElementInHeadLoaded = function() {
            this._documentTitleStorageInitializer && this._documentTitleStorageInitializer.onPageTitleLoaded()
        }
        ,
        Iu.prototype.processNodes = function(e, t) {
            if (e) {
                if (e.querySelectorAll) {
                    e.nodeType !== Pu && this._processElement(e);
                    for (var r = Vr(e).call(e, "*"), n = b.nodeListLengthGetter.call(r), o = 0; o < n; o++)
                        this._processElement(r[o])
                }
            } else
                (t = t || this.document).documentElement && this.processNodes(t.documentElement)
        }
        ,
        Iu.prototype.attach = function(e) {
            var n = this
              , t = e.document
              , r = !1;
            wu.prototype.attach.call(this, e, t),
            this._documentTitleStorageInitializer && this._documentTitleStorageInitializer.onAttach(),
            this.iframeSandbox.on(this.iframeSandbox.IFRAME_DOCUMENT_CREATED_EVENT, function(e) {
                var e = e.iframe
                  , t = b.contentWindowGetter.call(e)
                  , e = b.contentDocumentGetter.call(e)
                  , r = new n.nativeMethods.constructor(e,t);
                t[_.iframeNativeMethods] = r,
                n.doc.attach(t, e, !0)
            }),
            b.objectDefineProperty(e, _.processDomMethodName, {
                value: function(e, t) {
                    r || n.shadowUI.onBodyElementMutation(),
                    n.processNodes(e, t)
                },
                configurable: !0
            }),
            t.addEventListener("DOMContentLoaded", function() {
                r = !0,
                n.processNodes(null, t)
            }, !1),
            this.doc.attach(e, t),
            this.win.attach(e),
            this.element.attach(e)
        }
        ,
        Iu._processAttributeSelector = function(e) {
            return xu.test(e) ? e + "," + e.replace(xu, function(e, t, r) {
                return -1 === Tl.indexOf(t) || Cu.test(r) ? e : "[" + (t = P.getStoredAttrName(t)) + r + "]"
            }) : e
        }
        ,
        Iu._processPseudoClassSelectors = function(e) {
            return e = (e = S ? e : e.replace(Tu, "[" + a.focusPseudoClass + "]")).replace(Au, "[" + a.hoverPseudoClass + "]")
        }
        ,
        Iu.processSelector = function(e) {
            return e && (e = Iu._processPseudoClassSelectors(e),
            e = Iu._processAttributeSelector(e)),
            e
        }
        ;
        var Nu = Iu;
        function Ou(e) {
            var t = dn(e);
            if (t) {
                if (/^map$/i.test(e.tagName))
                    return ku(t);
                if (/^area$/i.test(e.tagName)) {
                    e = function(e, t) {
                        var r = b.getAttribute.call(e, "shape")
                          , n = b.getAttribute.call(e, "coords")
                          , o = 0;
                        if ("default" === r)
                            return ku(t);
                        if (!r || !n)
                            return null;
                        if (!(n = n.split(",")).length)
                            return null;
                        for (o = 0; o < n.length; o++)
                            if (n[o] = parseInt(n[o], 10),
                            "number" != typeof n[o])
                                return null;
                        var i = null;
                        switch (r) {
                        case "rect":
                            4 === n.length && (i = {
                                height: n[3] - n[1],
                                left: n[0],
                                top: n[1],
                                width: n[2] - n[0]
                            });
                            break;
                        case "circle":
                            3 === n.length && (i = {
                                height: 2 * n[2],
                                left: n[0] - n[2],
                                top: n[1] - n[2],
                                width: 2 * n[2]
                            });
                            break;
                        case "poly":
                            if (6 <= n.length && n.length % 2 == 0) {
                                for ((i = {}).left = i.right = n[0],
                                i.top = i.bottom = n[1],
                                o = 2; o < n.length; o += 2)
                                    i.left = n[o] < i.left ? n[o] : i.left,
                                    i.right = n[o] > i.right ? n[o] : i.right;
                                for (o = 3; o < n.length; o += 2)
                                    i.top = n[o] < i.top ? n[o] : i.top,
                                    i.bottom = n[o] > i.bottom ? n[o] : i.bottom;
                                i.height = i.bottom - i.top,
                                i.width = i.right - i.left
                            }
                        }
                        return i && (e = ju(t),
                        i.left += e.left,
                        i.top += e.top),
                        i
                    }(e, t);
                    if (e)
                        return e
                }
            }
            return {
                height: 0,
                left: 0,
                top: 0,
                width: 0
            }
        }
        function Lu(e) {
            var t, r, n = jo(e, "tspan") || jo(e, "tref") || "textpath" === Cn(e), o = e.getBoundingClientRect(), i = {
                height: n ? e.offsetHeight : o.height,
                left: o.left + (document.body.scrollLeft || document.documentElement.scrollLeft),
                top: o.top + (document.body.scrollTop || document.documentElement.scrollTop),
                width: n ? e.offsetWidth : o.width
            };
            if (n)
                return n = jr(e),
                t = Hr(e),
                r = Hr(n),
                n = jo(n, "body"),
                {
                    height: i.height || o.height,
                    left: n ? e.offsetLeft || t.left : r.left + e.offsetLeft,
                    top: n ? e.offsetTop || t.top : r.top + e.offsetTop,
                    width: i.width || o.width
                };
            if (Te || S)
                return i;
            n = b.getAttribute.call(e, "stroke-width") || l(e, "stroke-width");
            return (n = n ? +n.replace(/px|em|ex|pt|pc|cm|mm|in/, "") : 1) && +n % 2 != 0 && (n = +n + 1),
            !(jo(e, "line") || jo(e, "polyline") || jo(e, "polygon") || jo(e, "path")) || i.width && i.height ? (jo(e, "polygon") && (i.height += 2 * n,
            i.left -= n,
            i.top -= n,
            i.width += 2 * n),
            i.height += n,
            i.left -= n / 2,
            i.top -= n / 2,
            i.width += n) : !i.width && i.height ? (i.left -= n / 2,
            i.width = n) : i.width && !i.height && (i.height = n,
            i.top -= n / 2),
            i
        }
        function ku(e) {
            var t, r, n, o, i, s, a, l = {};
            return (l = oo(e) ? Ou(e) : Lr(e) ? (a = mn(t = e)) ? (r = ku(a),
            n = xr(a),
            o = Ir(a) === a.clientWidth ? 0 : fn(),
            i = Nr(a),
            s = cn(a, t),
            s = Math.max(s - Dr(a) / i, 0),
            {
                height: i,
                left: r.left + n.left,
                top: r.top + n.top + Tr(a).top + s * i,
                width: r.width - (n.left + n.right) - o
            }) : ku(t) : (a = ju(e),
            {
                height: (s = mo(e) ? Lu(e) : e.getBoundingClientRect()).height,
                left: a.left,
                top: a.top,
                width: s.width
            })).height = Math.round(l.height),
            l.left = Math.round(l.left),
            l.top = Math.round(l.top),
            l.width = Math.round(l.width),
            l
        }
        function Du(e, t, r) {
            if ("iframe" !== Cn(e))
                return !1;
            var n = ku(e)
              , o = xr(e)
              , e = Tr(e)
              , i = n.left + o.left + e.left
              , s = n.top + o.top + e.top
              , a = n.left + n.width - o.right - e.right
              , n = n.top + n.height - o.bottom - e.bottom;
            return i <= t && t <= a && s <= r && r <= n
        }
        function Mu(e, t, r) {
            var n = mo(e)
              , e = n ? Lu(e) : null;
            return {
                left: n ? e.left + t.left : r.left + t.left,
                top: n ? e.top + t.top : r.top + t.top
            }
        }
        function Ru(e, t, r, n, o) {
            var i = xr(o)
              , i = (t.left += i.left,
            t.top += i.top,
            ju(o))
              , o = Tr(o)
              , s = null;
            return s = mo(e) ? {
                x: (e = Lu(e)).left - (document.body.scrollLeft || document.documentElement.scrollLeft) + t.left,
                y: e.top - (document.body.scrollTop || document.documentElement.scrollTop) + t.top
            } : Hu({
                x: r.left + t.left,
                y: r.top + t.top
            }, n),
            {
                left: i.left + s.x + o.left,
                top: i.top + s.y + o.top
            }
        }
        function ju(e, t) {
            if (void 0 === t && (t = Math.round),
            oo(e))
                return {
                    left: (r = Ou(e)).left,
                    top: r.top
                };
            var r = En(e)
              , n = Nn(e, r)
              , o = n ? pn(r) : null
              , i = Hr(r === e ? r.documentElement : e)
              , n = (n && o ? Ru : Mu)(e, r.body ? xr(r.body) : {
                left: 0,
                top: 0
            }, i, r, o)
              , e = n.left
              , i = n.top;
            return "function" == typeof t && (e = t(e),
            i = t(i)),
            {
                left: e,
                top: i
            }
        }
        function Hu(e, t) {
            var t = t || document
              , r = kr(t)
              , n = Dr(t)
              , o = kr(t.body)
              , t = Dr(t.body);
            return {
                x: e.x - (0 === r && 0 !== o ? o : r),
                y: e.y - (0 === n && 0 !== t ? t : n)
            }
        }
        var Bu, Fu = Object.freeze({
            __proto__: null,
            getElementRectangle: ku,
            shouldIgnoreEventInsideIframe: Du,
            getOffsetPosition: ju,
            offsetToClientCoords: Hu
        }), Uu = ["button", "fieldset", "form", "iframe", "input", "map", "meta", "object", "output", "param", "select", "textarea"], Vu = 0, Fs = function() {}, Gu = (Fs.prototype = HTMLCollection.prototype,
        e(Wu, Bu = Fs),
        Wu.prototype.item = function(e) {
            return this._refreshCollection(),
            this._filteredCollection[e]
        }
        ,
        Object.defineProperty(Wu.prototype, "length", {
            get: function() {
                return this._refreshCollection(),
                this._filteredCollection.length
            },
            enumerable: !0,
            configurable: !0
        }),
        Wu.prototype._refreshCollection = function() {
            var e = this._lastNativeLength
              , t = b.htmlCollectionLengthGetter.call(this._collection);
            if (this._lastNativeLength = t,
            pu.isOutdated(this._tagName, this._version) || !pu.isDomContentLoaded() && e !== t) {
                var e = this._filteredCollection.length
                  , t = function(e, t) {
                    for (var r = e._collection, n = e._namedProps ? [] : null, o = e._filteredCollection, i = o.length = 0; i < t; i++) {
                        var s = r[i];
                        x(s) || (o.push(s),
                        n && null !== (s = b.getAttribute.call(s, "name")) && n.push(s))
                    }
                    return n
                }(this, t)
                  , r = (this._version = pu.getVersion(this._tagName),
                this)
                  , n = e
                  , o = this._filteredCollection.length;
                if (n !== o) {
                    for (; n < o; )
                        !function() {
                            var e = n++;
                            b.objectDefineProperty(r, e, {
                                enumerable: !0,
                                configurable: !0,
                                get: function() {
                                    return r.item(e)
                                }
                            })
                        }();
                    for (; o < n; )
                        delete r[--n];
                    e = Vu - 10;
                    e < o && qu(o - e)
                }
                var i = this
                  , e = this._namedProps
                  , s = t;
                if (s) {
                    for (var a = 0, l = e; a < l.length; a++) {
                        var c = l[a];
                        -1 === s.indexOf(c) && delete i[c]
                    }
                    for (var p = 0, u = s; p < u.length; p++)
                        !function(e) {
                            if (!i._collection[e])
                                return;
                            b.objectDefineProperty(i, e, {
                                configurable: !0,
                                get: function() {
                                    return this._refreshCollection(),
                                    i._collection[e]
                                }
                            })
                        }(u[p])
                }
            }
        }
        ,
        Wu);
        function Wu(e, t) {
            var r = Bu.call(this) || this;
            return t = t.toLowerCase(),
            b.objectDefineProperties(r, {
                _collection: {
                    value: e
                },
                _filteredCollection: {
                    value: []
                },
                _tagName: {
                    value: t
                },
                _version: {
                    value: -1 / 0,
                    writable: !0
                },
                _namedProps: {
                    value: -1 !== Uu.indexOf(t) ? [] : null
                },
                _lastNativeLength: {
                    value: 0,
                    writable: !0
                }
            }),
            r._refreshCollection(),
            r
        }
        Us = {
            constructor: {
                value: Gu.constructor,
                configurable: !0,
                enumerable: !1,
                writable: !0
            },
            _refreshCollection: {
                value: Gu.prototype._refreshCollection,
                enumerable: !1
            }
        };
        function qu(e) {
            for (var t = 0; t < e; t++)
                !function() {
                    var e = Vu++;
                    b.objectDefineProperty(Gu.prototype, e, {
                        get: function() {
                            this.item(e)
                        }
                    })
                }()
        }
        HTMLCollection.prototype.namedItem && (Us.namedItem = {
            value: function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                this._refreshCollection();
                var r = this._collection.namedItem.apply(this._collection, e);
                return r && x(r) ? null : r
            },
            enumerable: !0,
            configurable: !0,
            writable: !0
        }),
        b.objectDefineProperties(Gu.prototype, Us),
        qu(10);
        var Ku, zu = /fixed|relative|absolute/, Xu = /\.((?:\\.|[-\w]|[^\x00-\xa0])+)/g, $u = "hammerhead|shadow-ui|container-flag", Yu = "hammerhead|shadow-ui|container-collection-flag", Qu = "hammerhead|shadow-ui|html-collection-wrapper";
        function L(e, t, r, n) {
            var o = Ku.call(this) || this;
            return o._nodeMutation = e,
            o._messageSandbox = t,
            o._iframeSandbox = r,
            o._ieDebugSandbox = n,
            o.BODY_CONTENT_CHANGED_COMMAND = "hammerhead|command|body-content-changed",
            o.ROOT_CLASS = "root",
            o.ROOT_ID = "root",
            o.HIDDEN_CLASS = "hidden",
            o.BLIND_CLASS = "blind",
            o.root = null,
            o.lastActiveElement = null,
            o.uiStyleSheetsHtmlBackup = null,
            o.wrapperCreators = o._createWrapperCreators(),
            o._initEventCallbacks(),
            o
        }
        e(L, Ku = r),
        L.prototype._initEventCallbacks = function() {
            var r = this;
            this.runTaskScriptEventCallback = function(e) {
                var e = b.contentDocumentGetter.call(e)
                  , t = e.head
                  , e = e.body;
                r._restoreUIStyleSheets(t, r._getUIStyleSheetsHtml()),
                r.markShadowUIContainers(t, e)
            }
            ,
            this.beforeDocumentCleanedEventCallback = function() {
                r.uiStyleSheetsHtmlBackup = r._getUIStyleSheetsHtml()
            }
            ,
            this.documentCleanedEventCallback = function(e) {
                r._restoreUIStyleSheets(e.document.head, r.uiStyleSheetsHtmlBackup),
                r.uiStyleSheetsHtmlBackup = null,
                r.markShadowUIContainers(r.document.head, r.document.body)
            }
            ,
            this.documentClosedEventCallback = function(e) {
                r._restoreUIStyleSheets(e.head, r.uiStyleSheetsHtmlBackup),
                r.uiStyleSheetsHtmlBackup = null,
                r.markShadowUIContainers(e.head, e.body)
            }
            ,
            this.bodyContentChangedEventCallback = function(e) {
                e = e[_.processedContext];
                e !== window ? r._messageSandbox.sendServiceMsg({
                    cmd: r.BODY_CONTENT_CHANGED_COMMAND
                }, e) : r.onBodyElementMutation()
            }
            ,
            this.serviceMsgReceivedEventCallback = function(e) {
                e.message.cmd === r.BODY_CONTENT_CHANGED_COMMAND && r.onBodyElementMutation()
            }
            ,
            this.bodyCreatedEventCallback = function(e) {
                return r.markShadowUIContainers(r.document.head, e)
            }
        }
        ,
        L._filterElement = function(e) {
            return e && x(e) ? null : e
        }
        ,
        L.prototype._filterList = function(t, e, r) {
            for (var n = [], o = 0; o < e; o++)
                r(t[o]) && n.push(t[o]);
            if (S && t instanceof StyleSheetList)
                for (var i = 0, s = n; i < s.length; i++)
                    !function(e) {
                        e.id && b.objectDefineProperty(n, e.id, {
                            get: function() {
                                return e
                            }
                        })
                    }(s[i]);
            return b.objectDefineProperty(n, "item", {
                value: function(e) {
                    return e >= n.length ? null : n[e]
                }
            }),
            t.namedItem && b.objectDefineProperty(n, "namedItem", {
                value: function(e) {
                    return t.namedItem(e)
                }
            }),
            n.length === e ? t : n
        }
        ,
        L.prototype._filterNodeList = function(e, t) {
            return this._filterList(e, t, function(e) {
                return L._filterElement(e)
            })
        }
        ,
        L.prototype._filterStyleSheetList = function(e, t) {
            return this._filterList(e, t, function(e) {
                return L._filterElement(e.ownerNode)
            })
        }
        ,
        L._getFirstNonShadowElement = function(e) {
            for (var t = b.nodeListLengthGetter.call(e), r = 0; r < t; r++)
                if (L._filterElement(e[r]))
                    return e[r];
            return null
        }
        ,
        L.prototype._createWrapperCreators = function() {
            var i = this;
            return {
                getElementsByClassName: function(o) {
                    return function() {
                        for (var e = [], t = 0; t < arguments.length; t++)
                            e[t] = arguments[t];
                        var r = b[o].apply(this, e)
                          , n = b.htmlCollectionLengthGetter.call(r);
                        return i._filterNodeList(r, n)
                    }
                },
                getElementsByTagName: function(o) {
                    return function() {
                        for (var e = [], t = 0; t < arguments.length; t++)
                            e[t] = arguments[t];
                        var r = b[o].apply(this, e)
                          , n = e[0];
                        return "string" != typeof n || !Kn(this) && !eo(this) && "input" !== n.toLowerCase() && "getElementsByTagName" !== o ? r : (r[Qu] ? r[Qu]._refreshCollection() : r[Qu] = new Gu(r,n),
                        r[Qu])
                    }
                },
                querySelector: function(o, i) {
                    return function() {
                        for (var e = [], t = 0; t < arguments.length; t++)
                            e[t] = arguments[t];
                        "string" == typeof e[0] && (e[0] = Nu.processSelector(e[0]));
                        var r = b[o].apply(this, e)
                          , n = L._filterElement(r);
                        return !r || n ? n : L._getFirstNonShadowElement(b[i].apply(this, e))
                    }
                },
                querySelectorAll: function(o) {
                    return function() {
                        for (var e = [], t = 0; t < arguments.length; t++)
                            e[t] = arguments[t];
                        "string" == typeof e[0] && (e[0] = Nu.processSelector(e[0]));
                        var r = b[o].apply(this, e)
                          , n = b.nodeListLengthGetter.call(r);
                        return i._filterNodeList(r, n)
                    }
                }
            }
        }
        ,
        L.prototype._markShadowUIContainerAndCollections = function(e) {
            var t = b.elementChildrenGetter.call(e);
            L._markAsShadowContainer(e),
            L.markAsShadowContainerCollection(t),
            L.markAsShadowContainerCollection(b.nodeChildNodesGetter.call(e))
        }
        ,
        L.prototype.markShadowUIContainers = function(e, t) {
            e && this._markShadowUIContainerAndCollections(e),
            t && this._markShadowUIContainerAndCollections(t)
        }
        ,
        L.prototype._bringRootToWindowTopLeft = function() {
            for (var e, t, r, n = !1, o = b.nodeParentNodeGetter.call(this.root); o; ) {
                var i = l(o, "position");
                zu.test(i) && (n = !0),
                o = b.nodeParentNodeGetter.call(o)
            }
            !n || 0 === (e = ju(this.root)).left && 0 === e.top || (t = parseFloat(l(this.root, "left")) || 0,
            r = parseFloat(l(this.root, "top")) || 0,
            t = t - e.left + "px",
            r = r - e.top + "px",
            wr(this.root, "left", t),
            wr(this.root, "top", r))
        }
        ,
        L.prototype._overrideDocumentMethods = function(e, t) {
            var o = this
              , e = e.Document.prototype;
            f(e, "elementFromPoint", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                o.addClass(o.getRoot(), o.HIDDEN_CLASS);
                var r = L._filterElement(b.elementFromPoint.apply(this, e));
                return o.removeClass(o.getRoot(), o.HIDDEN_CLASS),
                r
            }),
            t.caretRangeFromPoint && f(e, "caretRangeFromPoint", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                o.addClass(o.getRoot(), o.HIDDEN_CLASS);
                var r = b.caretRangeFromPoint.apply(this, e);
                return r && r.startContainer && !L._filterElement(r.startContainer) && (r = null),
                o.removeClass(o.getRoot(), o.HIDDEN_CLASS),
                r
            }),
            t.caretPositionFromPoint && f(e, "caretPositionFromPoint", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                o.addClass(o.getRoot(), o.HIDDEN_CLASS);
                var r = b.caretPositionFromPoint.apply(this, e);
                return r && r.offsetNode && !L._filterElement(r.offsetNode) && (r = null),
                o.removeClass(o.getRoot(), o.HIDDEN_CLASS),
                r
            }),
            f(e, "getElementById", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return L._filterElement(b.getElementById.apply(this, e))
            }),
            f(e, "getElementsByName", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var r = b.getElementsByName.apply(this, e)
                  , n = (Er ? b.htmlCollectionLengthGetter : b.nodeListLengthGetter).call(r);
                return o._filterNodeList(r, n)
            }),
            f(e, "getElementsByClassName", this.wrapperCreators.getElementsByClassName("getElementsByClassName")),
            f(e, "getElementsByTagName", this.wrapperCreators.getElementsByTagName("getElementsByTagName")),
            f(e, "querySelector", this.wrapperCreators.querySelector("querySelector", "querySelectorAll")),
            f(e, "querySelectorAll", this.wrapperCreators.querySelectorAll("querySelectorAll"))
        }
        ,
        L.prototype._overrideElementMethods = function(e) {
            var t = e.Element.prototype
              , r = e.HTMLBodyElement.prototype
              , e = e.HTMLHeadElement.prototype;
            f(t, "getElementsByTagName", this.wrapperCreators.getElementsByTagName("elementGetElementsByTagName")),
            f(r, "getElementsByClassName", this.wrapperCreators.getElementsByClassName("elementGetElementsByClassName")),
            f(r, "querySelector", this.wrapperCreators.querySelector("elementQuerySelector", "elementQuerySelectorAll")),
            f(r, "querySelectorAll", this.wrapperCreators.querySelectorAll("elementQuerySelectorAll")),
            f(e, "getElementsByClassName", r.getElementsByClassName),
            f(e, "querySelector", r.querySelector),
            f(e, "querySelectorAll", r.querySelectorAll)
        }
        ,
        L.prototype._getUIStyleSheetsHtml = function() {
            for (var e = this.nativeMethods.querySelectorAll.call(this.document, "link." + Me.uiStylesheet), t = this.nativeMethods.nodeListLengthGetter.call(e), r = "", n = 0; n < t; n++)
                r += b.elementOuterHTMLGetter.call(e[n]);
            return r
        }
        ,
        L.prototype._restoreUIStyleSheets = function(e, t) {
            if (e && t)
                for (var r = this.nativeMethods.createElement.call(this.document, "div"), n = (b.elementInnerHTMLSetter.call(r, t),
                b.elementChildrenGetter.call(r)), o = b.htmlCollectionLengthGetter.call(n), i = 0; i < o; i++) {
                    var s = n[0];
                    L.markElementAsShadow(s),
                    this.nativeMethods.removeChild.call(r, s),
                    this.nativeMethods.appendChild.call(e, s)
                }
        }
        ,
        L.prototype._markElementsAsShadowInHead = function(e) {
            for (var t = b.elementChildrenGetter.call(e), r = b.htmlCollectionLengthGetter.call(t), n = 0; n < r; n++) {
                var o = t[n];
                L.containsShadowUIClassPostfix(o) && L.markElementAsShadow(o)
            }
        }
        ,
        L.prototype.getRoot = function() {
            var e = this;
            if (Pe && !L.isShadowContainer(this.document.body) && this._markShadowUIContainerAndCollections(this.document.body),
            !this.root || !this.document.body.contains(this.root))
                if (this.root)
                    b.appendChild.call(this.document.body, this.root);
                else {
                    this.root = b.createElement.call(this.document, "div"),
                    b.setAttribute.call(this.root, "id", L.patchId(this.ROOT_ID)),
                    b.setAttribute.call(this.root, "contenteditable", "false"),
                    this.addClass(this.root, this.ROOT_CLASS),
                    L.markElementAsShadow(this.root),
                    b.appendChild.call(this.document.body, this.root);
                    for (var t = b.documentAddEventListener || b.addEventListener, r = 0, n = N.EVENTS; r < n.length; r++) {
                        var o = n[r];
                        b.addEventListener.call(this.root, o, Yp)
                    }
                    this._bringRootToWindowTopLeft(),
                    t.call(this.document, "DOMContentLoaded", function() {
                        e.onBodyElementMutation(),
                        e._bringRootToWindowTopLeft()
                    })
                }
            return this.root
        }
        ,
        L.prototype.attach = function(e) {
            Ku.prototype.attach.call(this, e, e.document),
            this.markShadowUIContainers(this.document.head, this.document.body),
            this._overrideDocumentMethods(e, e.document),
            this._overrideElementMethods(e),
            e.document.head && this._markElementsAsShadowInHead(e.document.head),
            this._initEvents()
        }
        ,
        L.prototype._initEvents = function() {
            this._iframeSandbox.on(this._iframeSandbox.RUN_TASK_SCRIPT_EVENT, this.runTaskScriptEventCallback),
            this._nodeMutation.on(this._nodeMutation.BEFORE_DOCUMENT_CLEANED_EVENT, this.beforeDocumentCleanedEventCallback),
            this._nodeMutation.on(this._nodeMutation.DOCUMENT_CLEANED_EVENT, this.documentCleanedEventCallback),
            this._nodeMutation.on(this._nodeMutation.DOCUMENT_CLOSED_EVENT, this.documentClosedEventCallback),
            this._nodeMutation.on(this._nodeMutation.BODY_CONTENT_CHANGED_EVENT, this.bodyContentChangedEventCallback),
            this._messageSandbox.on(this._messageSandbox.SERVICE_MSG_RECEIVED_EVENT, this.serviceMsgReceivedEventCallback),
            this._nodeMutation.on(this._nodeMutation.BODY_CREATED_EVENT, this.bodyCreatedEventCallback)
        }
        ,
        L.prototype.onBodyElementMutation = function() {
            var e, t, r;
            this.root && this.document.body && (e = Ho(this.root, "html"),
            t = !this.nativeMethods.elementNextElementSiblingGetter.call(this.root),
            r = b.nodeParentNodeGetter.call(this.root) === this.document.body,
            e && t && r || this.nativeMethods.appendChild.call(this.document.body, this.root),
            this.markShadowUIContainers(this.document.head, this.document.body))
        }
        ,
        L.prototype.getFirstChild = function(e) {
            var e = b.nodeChildNodesGetter.call(e)
              , t = b.nodeListLengthGetter.call(e);
            return this._filterNodeList(e, t)[0] || null
        }
        ,
        L.prototype.getFirstElementChild = function(e) {
            var e = b.elementChildrenGetter.call(e)
              , t = b.htmlCollectionLengthGetter.call(e);
            return this._filterNodeList(e, t)[0] || null
        }
        ,
        L.prototype.getLastChild = function(e) {
            var e = b.nodeChildNodesGetter.call(e)
              , t = b.nodeListLengthGetter.call(e)
              , r = this._filterNodeList(e, t)
              , e = e === r ? t - 1 : r.length - 1;
            return 0 <= e ? r[e] : null
        }
        ,
        L.prototype.getLastElementChild = function(e) {
            var e = b.elementChildrenGetter.call(e)
              , t = b.htmlCollectionLengthGetter.call(e)
              , r = this._filterNodeList(e, t)
              , e = e === r ? t - 1 : r.length - 1;
            return 0 <= e ? r[e] : null
        }
        ,
        L.prototype.getNextSibling = function(e) {
            if (!e)
                return e;
            for (; (e = b.nodeNextSiblingGetter.call(e)) && x(e); )
                ;
            return e
        }
        ,
        L.prototype.getPrevSibling = function(e) {
            if (!e)
                return e;
            for (; (e = b.nodePrevSiblingGetter.call(e)) && x(e); )
                ;
            return e
        }
        ,
        L.prototype.getMutationRecordNextSibling = function(e) {
            if (!e)
                return e;
            for (; e && x(e); )
                e = b.nodeNextSiblingGetter.call(e);
            return e
        }
        ,
        L.prototype.getMutationRecordPrevSibling = function(e) {
            if (!e)
                return e;
            for (; e && x(e); )
                e = b.nodePrevSiblingGetter.call(e);
            return e
        }
        ,
        L.prototype.getNextElementSibling = function(e) {
            for (; (e = b.elementNextElementSiblingGetter.call(e)) && x(e); )
                ;
            return e
        }
        ,
        L.prototype.getPrevElementSibling = function(e) {
            for (; (e = b.elementPrevElementSiblingGetter.call(e)) && x(e); )
                ;
            return e
        }
        ,
        L._checkElementsPosition = function(e, t) {
            if (t) {
                for (var r = [], n = 0; n < t; n++) {
                    var o = e[n];
                    x(o) && r.push(o)
                }
                for (var i = r.length && b.nodeParentNodeGetter.call(r[0]), s = 0, a = r; s < a.length; s++) {
                    var l = a[s];
                    b.appendChild.call(i, l)
                }
            }
        }
        ,
        L._hasFlag = function(e, t) {
            try {
                return !!e[t]
            } catch (e) {
                return !1
            }
        }
        ,
        L._hasCollectionFlagForIE = function(e, t) {
            try {
                if (t in e)
                    return e[t];
                var r = b.nodeParentNodeGetter.call(e[0])
                  , n = qn(r) || eo(r);
                return b.objectDefineProperty(e, Yu, {
                    value: n,
                    configurable: !0
                }),
                n
            } catch (e) {
                return !1
            }
        }
        ,
        L.isShadowContainer = function(e) {
            return L._hasFlag(e, $u)
        }
        ,
        L.isShadowContainerCollection = function(e, t) {
            return S && t ? L._hasCollectionFlagForIE(e, Yu) : L._hasFlag(e, Yu)
        }
        ,
        L._isShadowUIChildListMutation = function(e) {
            if (x(e.target))
                return !0;
            for (var t = b.nodeListLengthGetter.call(e.removedNodes), r = 0; r < t; r++)
                if (x(e.removedNodes[r]))
                    return !0;
            for (var n = b.nodeListLengthGetter.call(e.addedNodes), r = 0; r < n; r++)
                if (x(e.addedNodes[r]))
                    return !0;
            return !1
        }
        ,
        L._isShadowUIAttributeMutation = function(e) {
            return x(e.target) || On(e.attributeName)
        }
        ,
        L._isShadowUICharacterDataMutation = function(e) {
            return x(e.target)
        }
        ,
        L.isShadowUIMutation = function(e) {
            switch (e.type) {
            case "childList":
                return L._isShadowUIChildListMutation(e);
            case "attributes":
                return L._isShadowUIAttributeMutation(e);
            case "characterData":
                return L._isShadowUICharacterDataMutation(e);
            default:
                return !1
            }
        }
        ,
        L.removeSelfRemovingScripts = function(e) {
            for (var t = b.querySelectorAll.call(e, "." + Me.selfRemovingScript), r = b.nodeListLengthGetter.call(t), n = 0; n < r; n++)
                Hc(t[n])
        }
        ,
        L.prototype.getShadowUICollectionLength = function(e, t) {
            for (var r = 0, n = 0; n < t; n++)
                x(e[n]) && r++;
            return r && !this._ieDebugSandbox.isDebuggerInitiator() && L._checkElementsPosition(e, t),
            t - r
        }
        ,
        L.prototype.addClass = function(e, t) {
            Bo(e, L.patchClassNames(t))
        }
        ,
        L.prototype.removeClass = function(e, t) {
            Fo(e, L.patchClassNames(t))
        }
        ,
        L.hasClass = function(e, t) {
            return Uo(e, L.patchClassNames(t))
        }
        ,
        L.patchId = function(e) {
            return e + Me.postfix
        }
        ,
        L.patchClassNames = function(e) {
            for (var t = e.split(/\s+/), r = 0; r < t.length; r++)
                t[r] += Me.postfix;
            return t.join(" ")
        }
        ,
        L.prototype.select = function(e, t) {
            e = e.replace(Xu, function(e) {
                return e + Me.postfix
            });
            return t ? b.elementQuerySelectorAll.call(t, e) : b.querySelectorAll.call(this.document, e)
        }
        ,
        L.prototype.setBlind = function(e) {
            e ? this.addClass(this.getRoot(), this.BLIND_CLASS) : this.removeClass(this.getRoot(), this.BLIND_CLASS)
        }
        ,
        L.prototype.getLastActiveElement = function() {
            return this.lastActiveElement
        }
        ,
        L.prototype.setLastActiveElement = function(e) {
            this.lastActiveElement = e
        }
        ,
        L.prototype.insertBeforeRoot = function(e) {
            var t = this.getRoot()
              , r = this.nativeMethods.nodeParentNodeGetter.call(t);
            if (this.nativeMethods.nodeLastChildGetter.call(r) != t && b.appendChild.call(r, t),
            1 < e.length || "object" != typeof e[0]) {
                for (var n = document.createDocumentFragment.call(this.document), o = 0, i = e; o < i.length; o++) {
                    var s = i[o];
                    "string" == typeof s && (s = b.createTextNode.call(this.document, s)),
                    b.appendChild.call(n, s)
                }
                return b.insertBefore.call(r, n, t)
            }
            return b.insertBefore.call(r, e[0], t)
        }
        ,
        L.markElementAsShadow = function(e) {
            e[_.shadowUIElement] = !0
        }
        ,
        L.markFormAsShadow = function(e) {
            var t = b.elementChildrenGetter.call(e)
              , t = (L._markAsShadowContainer(e),
            L.markAsShadowContainerCollection(e.elements),
            L.markAsShadowContainerCollection(t),
            b.nodeChildNodesGetter.call(e));
            L.markAsShadowContainerCollection(t)
        }
        ,
        L.markElementAndChildrenAsShadow = function(e) {
            if (L.markElementAsShadow(e),
            e.querySelectorAll)
                for (var t = Vr(e).call(e, "*"), r = b.nodeListLengthGetter.call(t), n = 0; n < r; n++)
                    L.markElementAsShadow(t[n])
        }
        ,
        L._markAsShadowContainer = function(e) {
            b.objectDefineProperty(e, $u, {
                value: !0
            })
        }
        ,
        L.markAsShadowContainerCollection = function(e) {
            b.objectDefineProperty(e, Yu, {
                value: !0,
                configurable: !0
            })
        }
        ,
        L.containsShadowUIClassPostfix = function(e) {
            return "string" == typeof e.className && -1 !== e.className.indexOf(Me.postfix)
        }
        ;
        var Ju = L;
        var Zu = [{
            mime: "image/x-icon",
            pattern: [0, 0, 1, 0],
            mask: [255, 255, 255, 255]
        }, {
            mime: "image/x-icon",
            pattern: [0, 0, 2, 0],
            mask: [255, 255, 255, 255]
        }, {
            mime: "image/bmp",
            pattern: [66, 77],
            mask: [255, 255]
        }, {
            mime: "image/gif",
            pattern: [71, 73, 70, 56, 55, 97],
            mask: [255, 255, 255, 255, 255, 255]
        }, {
            mime: "image/gif",
            pattern: [71, 73, 70, 56, 57, 97],
            mask: [255, 255, 255, 255, 255, 255]
        }, {
            mime: "image/webp",
            pattern: [82, 73, 70, 70, 0, 0, 0, 0, 87, 69, 66, 80, 86, 80],
            mask: [255, 255, 255, 255, 0, 0, 0, 0, 255, 255, 255, 255, 255, 255]
        }, {
            mime: "image/png",
            pattern: [137, 80, 78, 71, 13, 10, 26, 10],
            mask: [255, 255, 255, 255, 255, 255, 255, 255]
        }, {
            mime: "image/jpeg",
            pattern: [255, 216, 255],
            mask: [255, 255, 255]
        }]
          , eh = [{
            mime: "audio/basic",
            pattern: [46, 115, 110, 100],
            mask: [255, 255, 255, 255]
        }, {
            mime: "audio/aiff",
            pattern: [70, 79, 82, 77, 0, 0, 0, 0, 65, 73, 70, 70],
            mask: [255, 255, 255, 255, 0, 0, 0, 0, 255, 255, 255, 255]
        }, {
            mime: "audio/mpeg",
            pattern: [73, 68, 51],
            mask: [255, 255, 255]
        }, {
            mime: "application/ogg",
            pattern: [79, 103, 103, 83, 0],
            mask: [255, 255, 255, 255, 255]
        }, {
            mime: "audio/midi",
            pattern: [77, 84, 104, 100, 0, 0, 0, 6],
            mask: [255, 255, 255, 255, 255, 255, 255, 255]
        }, {
            mime: "video/avi",
            pattern: [82, 73, 70, 70, 0, 0, 0, 0, 65, 86, 73, 32],
            mask: [255, 255, 255, 255, 0, 0, 0, 0, 255, 255, 255, 255]
        }, {
            mime: "audio/wave",
            pattern: [82, 73, 70, 70, 0, 0, 0, 0, 87, 65, 86, 69],
            mask: [255, 255, 255, 255, 0, 0, 0, 0, 255, 255, 255, 255]
        }]
          , th = [{
            mime: "application/vnd.ms-fontobject",
            pattern: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 76, 80],
            mask: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255]
        }, {
            mime: "application/octet-stream",
            pattern: [0, 1, 0, 0],
            mask: [255, 255, 255, 255]
        }, {
            mime: "application/octet-stream",
            pattern: [79, 84, 84, 79],
            mask: [255, 255, 255, 255]
        }, {
            mime: "application/octet-stream",
            pattern: [116, 116, 99, 102],
            mask: [255, 255, 255, 255]
        }, {
            mime: "application/font-woff",
            pattern: [119, 79, 70, 70],
            mask: [255, 255, 255, 255]
        }]
          , rh = [{
            mime: "application/x-gzip",
            pattern: [31, 139, 8],
            mask: [255, 255, 255]
        }, {
            mime: "application/zip",
            pattern: [80, 75, 3, 4],
            mask: [255, 255, 255, 255]
        }, {
            mime: "application/x-rar-compressed",
            pattern: [82, 97, 114, 32, 26, 7, 0],
            mask: [255, 255, 255, 255, 255, 255, 255]
        }];
        function nh(e, t) {
            Do(t[0]) ? t = t[0] : Mo(t[0]) && (t = Ro(t[0]) ? t[0].buffer : t[0]);
            for (var r = new b.Uint8Array(t), n = 0, o = e; n < o.length; n++) {
                var i = o[n];
                if (function(e, t) {
                    if (!(t.length < e.pattern.length)) {
                        for (var r = 0, n = 0; r < e.pattern.length; ) {
                            if ((t[n] & e.mask[r]) !== e.pattern[r])
                                return;
                            n++,
                            r++
                        }
                        return 1
                    }
                }(i, r))
                    return i.mime
            }
            return r = null,
            ""
        }
        function oh(e) {
            return nh(Zu, e) || nh(eh, e) || nh(th, e) || nh(rh, e)
        }
        var ih = {
            getUploadedFiles: "hammerhead|command|get-uploaded-files",
            setCookie: "hammerhead|command|set-cookie",
            uploadFiles: "hammerhead|command|upload-files"
        }
          , sh = (ah._base64ToBlob = function(e, t, r) {
            for (var n = t.info.type || "", o = (r = r || 512,
            atob(e)), i = [], s = 0; s < o.length; s += r) {
                for (var a = o.slice(s, s + r), l = new Array(a.length), c = 0; c < a.length; c++)
                    l[c] = a.charCodeAt(c);
                i.push(new Uint8Array(l))
            }
            return b.File ? new File(i,t.info.name,{
                type: n,
                lastModified: t.info.lastModified
            }) : new Blob(i,{
                type: n
            })
        }
        ,
        ah._createFileWrapper = function(e) {
            var t = null;
            return (t = window.Blob ? e.blob ? b.File ? new File([e.blob],e.info.name,{
                type: e.info.type,
                lastModified: e.info.lastModified
            }) : new Blob([e.blob],{
                type: e.info.type
            }) : ah._base64ToBlob(e.data, e) : {
                size: e.info.size,
                type: e.info.type
            }).name = e.info.name,
            e.info.lastModifiedDate && (t.lastModifiedDate = e.info.lastModifiedDate),
            t.base64 = e.data,
            t
        }
        ,
        ah);
        function ah(e) {
            var t = this;
            b.objectDefineProperty(this, "length", {
                get: function() {
                    return e.length
                }
            });
            for (var r = 0; r < e.length; r++)
                this[r] = ah._createFileWrapper(e[r]);
            this.item = function(e) {
                return t[e]
            }
        }
        window.FileList && (sh.prototype = FileList.prototype);
        ch._getFileListData = function(e) {
            for (var t = [], r = 0, n = e; r < n.length; r++) {
                var o = n[r];
                t.push(o.base64)
            }
            return t
        }
        ,
        ch.formatValue = function(e) {
            var t = "";
            if ((e = "string" == typeof e ? [e] : e) && e.length) {
                if (!Ne)
                    return e[0].split("/").pop();
                t = "C:\\fakepath\\" + e[0].split("/").pop()
            }
            return t
        }
        ,
        ch.getFileNames = function(e, t) {
            var r = [];
            if (e)
                for (var n = 0, o = e; n < o.length; n++) {
                    var i = o[n];
                    r.push(i.name)
                }
            else
                -1 !== t.lastIndexOf("\\") && r.push(t.substr(t.lastIndexOf("\\") + 1));
            return r
        }
        ,
        ch.prototype.loadFilesInfoFromServer = function(e) {
            return this._transport.asyncServiceMsg({
                cmd: ih.getUploadedFiles,
                filePaths: "string" == typeof e ? [e] : e
            })
        }
        ,
        ch.prepareFileListWrapper = function(e) {
            for (var t = [], r = [], n = 0, o = e; n < o.length; n++) {
                var i = o[n];
                (i.err ? t : r).push(i)
            }
            return {
                errs: t,
                fileList: new sh(r)
            }
        }
        ,
        ch.prototype.sendFilesInfoToServer = function(e, t) {
            return this._transport.asyncServiceMsg({
                cmd: ih.uploadFiles,
                data: ch._getFileListData(e),
                fileNames: t
            })
        }
        ,
        ch.prototype.clearUploadInfo = function(e) {
            var t = this.getUploadInfo(e);
            return t ? (t.files = new sh([]),
            t.value = "",
            Up(e)) : null
        }
        ,
        ch.prototype.getFiles = function(e) {
            e = this.getUploadInfo(e);
            return e ? e.files : new sh([])
        }
        ,
        ch.prototype.getUploadInfo = function(e) {
            for (var t = 0, r = this.uploadInfo; t < r.length; t++) {
                var n = r[t];
                if (n.input === e)
                    return n
            }
            return null
        }
        ,
        ch.prototype.getValue = function(e) {
            e = this.getUploadInfo(e);
            return e ? e.value : ""
        }
        ,
        ch.prototype.loadFileListData = function(e, a) {
            return a.length ? new se(function(r) {
                var n = new FileReader
                  , o = []
                  , i = 0
                  , s = a[i];
                n.addEventListener("load", function(e) {
                    var t = {
                        type: s.type,
                        name: s.name
                    }
                      , e = ("number" == typeof s.lastModified && (t.lastModified = s.lastModified),
                    s.lastModifiedDate && (t.lastModifiedDate = s.lastModifiedDate),
                    b.eventTargetGetter.call(e).result);
                    o.push({
                        data: e.substr(e.indexOf(",") + 1),
                        blob: s.slice(0, s.size),
                        info: t
                    }),
                    a[++i] ? (s = a[i],
                    n.readAsDataURL(s)) : r(new sh(o))
                }),
                n.readAsDataURL(s)
            }
            ) : se.resolve(new sh([]))
        }
        ,
        ch.prototype.setUploadInfo = function(e, t, r) {
            var n = this.getUploadInfo(e);
            n || this.uploadInfo.push(n = {
                input: e
            }),
            Hp(e, n.files = t, n.value = r)
        }
        ;
        var lh = ch;
        function ch(e) {
            this._transport = e,
            this.uploadInfo = []
        }
        var ph = "hammerhead|sandbox-backup";
        function uh(t, e) {
            for (var r = t.length - 1; 0 <= r; r--)
                try {
                    if (t[r].iframe === e)
                        return t[r]
                } catch (e) {
                    t.splice(r, 1)
                }
        }
        function hh(e, t) {
            var r = yn(e)
              , e = e !== r ? hn(e) : null
              , n = r[ph]
              , r = (n || b.objectDefineProperty(r, ph, {
                value: n = []
            }),
            uh(n, e));
            r ? r.sandbox = t : n.push({
                iframe: e,
                sandbox: t
            })
        }
        function dh(e) {
            var t = yn(e)
              , r = t[ph]
              , t = e !== t ? e.frameElement : null;
            return r && (e = uh(r, t)) ? e.sandbox : null
        }
        var fh, mh = Object.freeze({
            __proto__: null,
            create: hh,
            get: dh
        }), gh = (e(yh, fh = r),
        yh.prototype._riseChangeEvent = function(e) {
            this._eventSimulator.change(e)
        }
        ,
        yh._getCurrentInfoManager = function(e) {
            return dh(e[_.processedContext]).upload.infoManager
        }
        ,
        yh.prototype.attach = function(e) {
            var s = this;
            fh.prototype.attach.call(this, e),
            this._listeners.addInternalEventBeforeListener(e, ["change"], function(e, t) {
                var r, n, o = b.eventTargetGetter.call(e), i = yh._getCurrentInfoManager(o);
                !t && to(o) && (Yp(e),
                $p(e),
                ((r = b.inputValueGetter.call(o)) || i.getValue(o)) && (t = b.inputFilesGetter.call(o),
                n = lh.getFileNames(t, r),
                s.emit(s.START_FILE_UPLOADING_EVENT, n, o),
                i.loadFileListData(o, t).then(function(e) {
                    return i.setUploadInfo(o, e, r),
                    s.infoManager.sendFilesInfoToServer(e, n)
                }).then(function(e) {
                    s._riseChangeEvent(o),
                    s.emit(s.END_FILE_UPLOADING_EVENT, e)
                })))
            }),
            m.get().isRecordMode || !S && !Te || this._listeners.addInternalEventBeforeListener(e, ["click"], function(e, t) {
                t && to(b.eventTargetGetter.call(e)) && $p(e, !0)
            })
        }
        ,
        yh.getFiles = function(e) {
            return void 0 !== b.inputFilesGetter.call(e) ? yh._getCurrentInfoManager(e).getFiles(e) : void 0
        }
        ,
        yh.getUploadElementValue = function(e) {
            return yh._getCurrentInfoManager(e).getValue(e)
        }
        ,
        yh.prototype.setUploadElementValue = function(e, t) {
            "" === t && yh._getCurrentInfoManager(e).clearUploadInfo(e) && xe && this._riseChangeEvent(e)
        }
        ,
        yh._shouldRaiseChangeEvent = function(e, t) {
            if (!t)
                return !0;
            var r = t.files;
            if (e.length !== r.length || Te || ve && Pe || Ie)
                return !0;
            for (var n = 0, o = e; n < o.length; n++) {
                for (var i = o[n], s = !1, a = 0, l = r; a < l.length; a++) {
                    var c = l[a];
                    if (i.name === c.name) {
                        s = !0;
                        break
                    }
                }
                if (!1 === s)
                    return !0
            }
            return !1
        }
        ,
        yh.prototype.doUpload = function(n, o) {
            var i = this
              , s = yh._getCurrentInfoManager(n);
            return o = o || [],
            this.infoManager.loadFilesInfoFromServer(o).then(function(e) {
                return lh.prepareFileListWrapper(e)
            }).then(function(e) {
                var t, r;
                return e.errs.length || (t = lh.formatValue(o),
                r = s.getUploadInfo(n),
                r = yh._shouldRaiseChangeEvent(e.fileList, r),
                s.setUploadInfo(n, e.fileList, t),
                r && i._riseChangeEvent(n)),
                e.errs
            })
        }
        ,
        yh);
        function yh(e, t, r) {
            var n = fh.call(this) || this;
            return n._listeners = e,
            n._eventSimulator = t,
            n.START_FILE_UPLOADING_EVENT = "hammerhead|event|start-file-uploading",
            n.END_FILE_UPLOADING_EVENT = "hammerhead|event|end-file-uploading",
            n.infoManager = new lh(r),
            n
        }
        var vh = b.createElement.call(document, "a")
          , Eh = b.createElement.call(document, "a");
        function Sh(e, t) {
            e = b.anchorHrefGetter.call(e);
            return vh || _h(),
            e ? (b.anchorHrefSetter.call(vh, lr(e)),
            t.call(vh)) : t.call(Eh)
        }
        function _h() {
            vh = b.createElement.call(document, "a"),
            Eh = b.createElement.call(document, "a")
        }
        var bh = "hammerhead|element-listening-events-storage-prop";
        function wh(e) {
            return e[bh]
        }
        function xh(e, t) {
            t = S && 10 < be && /MSPointer/.test(t) ? t.replace("MS", "").toLowerCase() : t;
            e = wh(e);
            return e && e[t]
        }
        function Ch(e) {
            return !!e[bh]
        }
        function Th(e, t) {
            for (var r = wh(e) || {}, n = 0; n < t.length; n++)
                r[t[n]] || (r[t[n]] = {
                    internalBeforeHandlers: [],
                    internalAfterHandlers: [],
                    outerHandlers: [],
                    outerHandlersWrapper: null,
                    wrappers: [],
                    cancelOuterHandlers: !1
                });
            Ch(e) || b.objectDefineProperty(e, bh, {
                value: r,
                writable: !0
            })
        }
        function Ah(e, t, r, n) {
            e.outerHandlers.push({
                fn: t,
                useCapture: n || !1
            }),
            e.wrappers.push(r)
        }
        function Ph(e, t, r) {
            for (var n = e.outerHandlers, o = e.wrappers, i = 0; i < n.length; i++) {
                var s = n[i];
                if (s.fn === t && (s.useCapture || !1) === (r || !1))
                    return s = o[i],
                    o.splice(i, 1),
                    n.splice(i, 1),
                    s
            }
            return null
        }
        function Ih(e, t) {
            for (var r = 0, n = wh(e)[t].internalAfterHandlers; r < n.length; r++) {
                var o = n[r];
                b.removeEventListener.call(e, t, o),
                b.addEventListener.call(e, t, o)
            }
        }
        var Nh, Oh, Lh = Object.freeze({
            __proto__: null,
            getElementCtx: wh,
            getEventCtx: xh,
            isElementListening: Ch,
            addListeningElement: Th,
            removeListeningElement: function(e) {
                delete e[bh]
            },
            addInternalAfterHandler: function(e, t, r) {
                for (var n = wh(e), o = 0, i = t; o < i.length; o++) {
                    var s = i[o];
                    n[s].internalAfterHandlers.unshift(r),
                    b.addEventListener.call(e, s, r)
                }
            },
            addFirstInternalBeforeHandler: function(e, t, r) {
                for (var n = wh(e), o = 0, i = t; o < i.length; o++)
                    n[i[o]].internalBeforeHandlers.unshift(r)
            },
            addInternalBeforeHandler: function(e, t, r) {
                for (var n = wh(e), o = 0, i = t; o < i.length; o++)
                    n[i[o]].internalBeforeHandlers.push(r)
            },
            removeInternalBeforeHandler: function(e, t, r) {
                for (var n = wh(e), o = 0, i = t; o < i.length; o++) {
                    var s = n[i[o]].internalBeforeHandlers
                      , a = s.indexOf(r);
                    -1 < a && s.splice(a, 1)
                }
            },
            wrapEventListener: Ah,
            getWrapper: Ph,
            updateInternalAfterHandlers: Ih
        }), kh = ["click", "mousedown", "mouseup", "dblclick", "contextmenu", "mousemove", "mouseover", "mouseout", "pointerdown", "pointermove", "pointerover", "pointerout", "pointerup", "MSPointerDown", "MSPointerMove", "MSPointerOver", "MSPointerOut", "MSPointerUp", "touchstart", "touchmove", "touchend", "keydown", "keypress", "keyup", "change", "focus", "blur", "focusin", "focusout"], Dh = "hammerhead|event-sandbox-dispatch-event-flag", Mh = (e(k, Nh = ke),
        k.getNativeAddEventListener = function(e) {
            return xe ? co(e) ? b.windowAddEventListener : void 0 !== e.body ? b.documentAddEventListener : b.addEventListener : b.addEventListener
        }
        ,
        k.getNativeRemoveEventListener = function(e) {
            return xe ? co(e) ? b.windowRemoveEventListener : void 0 !== e.body ? b.documentRemoveEventListener : b.removeEventListener : b.removeEventListener
        }
        ,
        k._isIEServiceHandler = function(e) {
            return "[object FunctionWrapper]" === e.toString()
        }
        ,
        k._getEventListenerWrapper = function(t, r) {
            return function(e) {
                return k._isIEServiceHandler(r) || t.cancelOuterHandlers ? null : "function" == typeof t.outerHandlersWrapper ? t.outerHandlersWrapper.call(this, e, r) : Zp(this, r, e)
            }
        }
        ,
        k._isDifferentHandler = function(e, t, r) {
            for (var n = 0, o = e; n < o.length; n++) {
                var i = o[n];
                if (i.fn === t && i.useCapture === r)
                    return !1
            }
            return !0
        }
        ,
        k._getUseCaptureParam = function(e) {
            return e && "boolean" == typeof e ? e : !(!e || "object" != typeof e) && !!e.capture
        }
        ,
        k.prototype._createEventHandler = function() {
            var h = this;
            return function(t) {
                var e = this[_.processedContext] || window
                  , r = !1
                  , n = !1
                  , o = !1
                  , i = h.listeningCtx.getEventCtx(this, t.type);
                if (i) {
                    function s(e) {
                        r = !0,
                        $p(t, e)
                    }
                    function a() {
                        n || (i.cancelOuterHandlers = !0),
                        n = !0
                    }
                    function l() {
                        o = !0,
                        Yp(t)
                    }
                    for (var c = i.internalBeforeHandlers, p = (i.cancelOuterHandlers = !1,
                    0), u = b.arraySlice.call(c); p < u.length; p++)
                        if (u[p].call(this, t, e[Dh], s, a, l),
                        r || o)
                            break
                }
            }
        }
        ,
        k.prototype.createOverriddenMethods = function() {
            var l = this;
            return {
                addEventListener: function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    var r = e[0]
                      , n = e[1]
                      , o = k._getUseCaptureParam(e[2])
                      , i = xh(this, r)
                      , s = k.getNativeAddEventListener(this);
                    if (!i || !Jp(n))
                        return s.apply(this, e);
                    if (!k._isDifferentHandler(i.outerHandlers, n, o))
                        return null;
                    var a = k._getEventListenerWrapper(i, n)
                      , i = (Ah(i, n, e[1] = a, o),
                    s.apply(this, e));
                    return Ih(this, r),
                    l.emit(l.EVENT_LISTENER_ATTACHED_EVENT, {
                        el: this,
                        eventType: r,
                        listener: n
                    }),
                    i
                },
                removeEventListener: function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    var r = e[0]
                      , n = e[1]
                      , o = k._getUseCaptureParam(e[2])
                      , i = k.getNativeRemoveEventListener(this)
                      , s = xh(this, r);
                    if (!s || !Jp(n))
                        return i.apply(this, e);
                    s = Ph(s, n, o),
                    e[1] = s,
                    o = i.apply(this, e);
                    return l.emit(l.EVENT_LISTENER_DETACHED_EVENT, {
                        el: this,
                        listener: n,
                        eventType: r
                    }),
                    o
                }
            }
        }
        ,
        k.prototype.initElementListening = function(e, t) {
            void 0 === t && (t = kh);
            for (var r = k.getNativeAddEventListener(e), n = 0, o = t; n < o.length; n++) {
                var i = o[n];
                this.listeningCtx.getEventCtx(e, i) || r.call(e, i, this._createEventHandler(), !0)
            }
            this.listeningCtx.addListeningElement(e, t),
            xe && (t = this.createOverriddenMethods(),
            e.addEventListener ? fe(e.addEventListener) && (f(e, "addEventListener", t.addEventListener),
            f(e, "removeEventListener", t.removeEventListener)) : (e.addEventListener = t.addEventListener,
            e.removeEventListener = t.removeEventListener,
            de(e.addEventListener, b.addEventListener),
            de(e.removeEventListener, b.removeEventListener)))
        }
        ,
        k.prototype.initDocumentBodyListening = function(e) {
            var t;
            Th(e.body, Xp),
            xe && (t = this.createOverriddenMethods(),
            f(e.body, "addEventListener", t.addEventListener),
            f(e.body, "removeEventListener", t.removeEventListener))
        }
        ,
        k.prototype.restartElementListening = function(e) {
            var t = k.getNativeAddEventListener(e)
              , r = this.listeningCtx.getElementCtx(e);
            if (r)
                for (var n = 0, o = b.objectKeys(r); n < o.length; n++) {
                    var i = o[n];
                    t.call(e, i, this._createEventHandler(), !0)
                }
        }
        ,
        k.prototype.cancelElementListening = function(e) {
            this.listeningCtx.removeListeningElement(e),
            e.body && this.listeningCtx.removeListeningElement(e.body)
        }
        ,
        k.beforeDispatchEvent = function(e) {
            e = e[_.processedContext] || window;
            e[Dh] = (e[Dh] || 0) + 1
        }
        ,
        k.afterDispatchEvent = function(e) {
            e = e[_.processedContext] || window;
            e[Dh]--,
            e[Dh] || delete e[Dh]
        }
        ,
        k.prototype.setEventListenerWrapper = function(e, t, r) {
            this.listeningCtx.isElementListening(e) || this.initElementListening(e, t);
            for (var n = 0, o = t; n < o.length; n++) {
                var i = o[n];
                this.listeningCtx.getEventCtx(e, i).outerHandlersWrapper = r
            }
        }
        ,
        k.prototype.getEventListeners = function(e, t) {
            e = this.listeningCtx.getEventCtx(e, t);
            return e ? b.arrayMap.call(e.outerHandlers, function(e) {
                return e.fn
            }) : null
        }
        ,
        k);
        function k() {
            var e = Nh.call(this) || this;
            return e.EVENT_LISTENER_ATTACHED_EVENT = "hammerhead|event|event-listener-attached",
            e.EVENT_LISTENER_DETACHED_EVENT = "hammerhead|event|event-listener-detached",
            e.listeningCtx = Lh,
            e.addInternalEventBeforeListener = e.listeningCtx.addInternalBeforeHandler,
            e.addFirstInternalEventBeforeListener = e.listeningCtx.addFirstInternalBeforeHandler,
            e.addInternalEventAfterListener = e.listeningCtx.addInternalAfterHandler,
            e.removeInternalEventBeforeListener = e.listeningCtx.removeInternalBeforeHandler,
            e
        }
        (Vs = Oh = Oh || {}).form = "_self",
        Vs.linkOrArea = "_self",
        Vs.windowOpen = "_blank";
        var Rh, jh = Oh, Hh = function() {
            for (var e = [], t = 0, r = b.objectKeys(v); t < r.length; t++) {
                var n = r[t];
                e.push(v[n])
            }
            return e
        }(), Bh = /^http/i, Fh = ["https:", "wss:", "file:"], Uh = ["localhost", "127.0.0.1"], Vh = ["text/javascript", "application/javascript", "application/x-javascript"], Gh = "hammerhead|context-svg-image-element", Wh = "hammerhead|sandbox-dom-token-list", qh = "hammerhead|sandbox-dom-token-list-owner", Kh = "hammerhead|sandbox-dom-token-list-update", zh = "hammerhead|is-proxy-object|internal-prop-name", Xh = "hammerhead|is-proxy-object|internal-prop-value", $h = "hammerhead|proxy-handler-flag", Yh = ["error", "unhandledrejection", "hashchange"], Qh = (e(D, Rh = r),
        D._prepareStack = function(e, t) {
            return t && -1 !== t.indexOf(e) ? t : e + "\n" + (t = t || "    No stack trace available")
        }
        ,
        D._isProcessableBlobParts = function(e) {
            for (var t = !1, r = 0, n = e; r < n.length; r++) {
                var o = n[r];
                if (t || "string" != typeof o) {
                    if ("string" != typeof o && "number" != typeof o && "boolean" != typeof o)
                        return !1
                } else
                    t = !0
            }
            return t
        }
        ,
        D._isProcessableBlob = function(e, t) {
            t = t && t.type && t.type.toString().toLowerCase() || oh(e);
            return (!t || -1 !== Vh.indexOf(t)) && D._isProcessableBlobParts(e)
        }
        ,
        D.prototype._getWindowOpenTarget = function(e) {
            return e ? this.nodeSandbox.element.getCorrectedTarget(String(e)) : m.get().allowMultipleWindows ? jh.windowOpen : "_self"
        }
        ,
        D.prototype._raiseUncaughtJsErrorEvent = function(e, t, r) {
            var n, o, i, s;
            bn(r, r.rammerheadTop) || (n = wn(r),
            o = Rt(),
            s = i = null,
            e === this.UNHANDLED_REJECTION_EVENT ? (i = D._formatUnhandledRejectionReason(t.reason),
            s = t.reason && t.reason.stack) : e === this.UNCAUGHT_JS_ERROR_EVENT && (i = (t.error || t).message,
            s = t.error && t.error.stack),
            s = ca(s = D._prepareStack(i, s)),
            n ? (this.emit(e, {
                msg: i,
                pageUrl: o,
                stack: s,
                inIframe: !0
            }),
            this.messageSandbox.sendServiceMsg({
                msg: i,
                pageUrl: o,
                stack: s,
                cmd: e
            }, r.rammerheadTop)) : this.emit(e, {
                msg: i,
                pageUrl: o,
                stack: s
            }))
        }
        ,
        D.prototype._reattachHandler = function(e, t) {
            var r = Mh.getNativeAddEventListener(e);
            Mh.getNativeRemoveEventListener(e).call(e, t, this),
            r.call(e, t, this)
        }
        ,
        D._formatUnhandledRejectionReason = function(e) {
            return Ac(e) ? String(e) : e instanceof b.Error ? (e.name || "Error") + ": " + e.message : b.objectToString.call(e)
        }
        ,
        D._getUrlAttr = function(e, t) {
            var r = b.getAttribute.call(e, t)
              , e = e.ownerDocument || document;
            return "" === r || null === r && "action" === t && hr ? Nt.resolve("", e) : null === r ? "" : !Xe.test(r) && wt(r) ? $t(r) : Nt.resolve(r, e)
        }
        ,
        D._removeProcessingInstructions = function(e) {
            return e && (e = Da(e),
            Fl.cleanUp(e, Qt))
        }
        ,
        D._processTextPropValue = function(e, t) {
            t = null != t ? String(t) : t;
            if (t) {
                if (Xn(e))
                    return wl(t, !0, !1, Zt);
                if ($n(e))
                    return Fl.process(t, w, !0)
            }
            return t
        }
        ,
        D.prototype._overrideUrlAttrDescriptors = function(t, e) {
            for (var r = this, n = 0, o = e; n < o.length; n++)
                d(o[n].prototype, t, {
                    getter: function() {
                        return D._getUrlAttr(this, t)
                    },
                    setter: function(e) {
                        r.nodeSandbox.element.setAttributeCore(this, [t, e])
                    }
                })
        }
        ,
        D.prototype._overrideAttrDescriptors = function(t, e) {
            for (var r = this, n = 0, o = e; n < o.length; n++)
                d(o[n].prototype, t, {
                    getter: function() {
                        return r.nodeSandbox.element.getAttributeCore(this, [t]) || ""
                    },
                    setter: function(e) {
                        r.nodeSandbox.element.setAttributeCore(this, [t, e])
                    }
                })
        }
        ,
        D.prototype._overrideUrlPropDescriptor = function(e, t, o) {
            d(window.HTMLAnchorElement.prototype, e, {
                getter: function() {
                    return Sh(this, t)
                },
                setter: function(e) {
                    var t, r, n;
                    t = this,
                    r = o,
                    e = e,
                    n = b.anchorHrefGetter.call(t),
                    vh || _h(),
                    n && (b.anchorHrefSetter.call(vh, lr(n)),
                    r.call(vh, e),
                    t.setAttribute("href", b.anchorHrefGetter.call(vh)))
                }
            })
        }
        ,
        D.prototype._overrideEventPropDescriptor = function(t, r, n) {
            var o = this;
            d(b.isEventPropsLocatedInProto ? t.Window.prototype : t, "on" + r, {
                getter: null,
                setter: function(e) {
                    n.call(t, e),
                    o.listenersSandbox.emit(o.listenersSandbox.EVENT_LISTENER_ATTACHED_EVENT, {
                        el: t,
                        listener: e,
                        eventType: r
                    })
                }
            })
        }
        ,
        D.prototype._createOverriddenDOMTokenListMethod = function(r) {
            var n = this;
            return function() {
                var e = r.apply(this, arguments)
                  , t = this[qh];
                return t && n.nodeSandbox.element.setAttributeCore(t, ["sandbox", this.toString()]),
                e
            }
        }
        ,
        D._patchFunctionPrototype = function(e, t) {
            if (t && "function" != typeof t) {
                t = b.objectGetPrototypeOf(t);
                if (t) {
                    for (var r = b.objectGetPrototypeOf(t); r && r !== b.Function.prototype; )
                        r = b.objectGetPrototypeOf(r);
                    r && b.objectSetPrototypeOf(e, t)
                }
            }
        }
        ,
        D._isSecureOrigin = function(e) {
            e = Jt($t(e));
            return -1 === Fh.indexOf(e.protocol) && -1 === Uh.indexOf(e.hostname)
        }
        ,
        D.prototype._setSandboxedTextForTitleElements = function(e) {
            if (!wn(window))
                for (var t = 0, r = Vr(e).call(e, "title"); t < r.length; t++) {
                    var n, o = r[t];
                    Hn(o) && (n = b.titleElementTextGetter.call(o),
                    this._documentTitleStorageInitializer.storage.setTitleElementPropertyValue(o, n))
                }
        }
        ,
        D.isProxyObject = function(e) {
            try {
                return e[zh] === Xh
            } catch (e) {
                return !1
            }
        }
        ,
        D.prototype.handleEvent = function(e) {
            e.defaultPrevented || ("unhandledrejection" === e.type ? this._raiseUncaughtJsErrorEvent(this.UNHANDLED_REJECTION_EVENT, e, this.window) : "error" === e.type ? -1 !== e.message.indexOf("NS_ERROR_NOT_INITIALIZED") ? e.preventDefault() : this._raiseUncaughtJsErrorEvent(this.UNCAUGHT_JS_ERROR_EVENT, e, window) : "hashchange" === e.type && this.emit(this.HASH_CHANGE_EVENT))
        }
        ,
        D.prototype.attach = function(h) {
            var o = this
              , e = (Rh.prototype.attach.call(this, h),
            this.messageSandbox)
              , n = this.nodeSandbox
              , i = this;
            b.arrayForEach.call(Yh, function(e) {
                o._reattachHandler(h, e)
            }),
            this.listenersSandbox.initElementListening(h, Yh),
            this.listenersSandbox.on(this.listenersSandbox.EVENT_LISTENER_ATTACHED_EVENT, function(e) {
                e.el === h && -1 !== Yh.indexOf(e.eventType) && o._reattachHandler(h, e.eventType)
            }),
            this._overrideEventPropDescriptor(h, "error", b.winOnErrorSetter),
            this._overrideEventPropDescriptor(h, "hashchange", b.winOnHashChangeSetter),
            b.winOnUnhandledRejectionSetter && this._overrideEventPropDescriptor(h, "unhandledrejection", b.winOnUnhandledRejectionSetter),
            e.on(e.SERVICE_MSG_RECEIVED_EVENT, function(e) {
                var e = e.message
                  , t = e.msg
                  , r = e.pageUrl
                  , n = e.stack
                  , e = e.cmd;
                e !== o.UNCAUGHT_JS_ERROR_EVENT && e !== o.UNHANDLED_REJECTION_EVENT || i.emit(e, {
                    msg: t,
                    pageUrl: r,
                    stack: n
                })
            }),
            f(h.CanvasRenderingContext2D.prototype, "drawImage", function() {
                for (var e = this, t = [], r = 0; r < arguments.length; r++)
                    t[r] = arguments[r];
                var n, o = t[0];
                return Rn(o) && !o[_.forceProxySrcForImage] && (n = b.imageSrcGetter.call(o),
                Dt(location.toString(), n) && (o = b.createElement.call(h.document, "img"),
                b.imageSrcSetter.call(o, w(n)),
                (t[0] = o).complete || b.addEventListener.call(o, "load", function() {
                    return b.canvasContextDrawImage.apply(e, t)
                }))),
                b.canvasContextDrawImage.apply(this, t)
            }),
            b.objectAssign && f(h.Object, "assign", function(e) {
                for (var t = [], r = 1; r < arguments.length; r++)
                    t[r - 1] = arguments[r];
                var n = [e]
                  , o = typeof e;
                if (e && ("object" == o || "function" == o) && t.length)
                    for (var i = 0, s = t; i < s.length; i++) {
                        var a = s[i]
                          , l = typeof a;
                        if (!a || "object" != l && "function" != l)
                            b.objectAssign.call(this, e, a);
                        else
                            for (var l = b.objectGetOwnPropertySymbols.call(h.Object, a), c = 0, p = b.arrayConcat.call(b.objectKeys.call(h.Object, a), l); c < p.length; c++) {
                                var u = p[c];
                                h[v.setProperty](e, u, a[u])
                            }
                    }
                else
                    n = b.arrayConcat.call(n, t);
                return b.objectAssign.apply(this, n)
            }),
            f(h, "open", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return e[0] = w(e[0]),
                e[1] = i._getWindowOpenTarget(e[1]),
                i._childWindowSandbox.handleWindowOpen(h, e)
            }),
            h.FontFace && me(h, "FontFace", function(e, t, r) {
                return t = Fl.process(t, Zt),
                new b.FontFace(e,t,r)
            }),
            h.Worker && me(h, "Worker", function e() {
                for (var t = [], r = 0; r < arguments.length; r++)
                    t[r] = arguments[r];
                var n = this instanceof e == 0;
                if (0 === arguments.length)
                    return n ? b.Worker() : new b.Worker;
                if (n)
                    return b.Worker.apply(this, t);
                var n = t[0]
                  , o = ("string" != typeof n && (n = String(n)),
                n = w(n, {
                    resourceType: it({
                        isScript: !0
                    })
                }),
                1 === arguments.length ? new b.Worker(n) : new b.Worker(n,t[1]));
                return "blob:" == Jt(n).protocol && o.postMessage({
                    cmd: "hammerhead|set-blob-worker-settings",
                    sessionId: m.get().sessionId,
                    windowId: m.get().windowId,
                    origin: Bt()
                }),
                o
            }, !0),
            h.Blob && me(h, "Blob", function(e, t) {
                return 0 === arguments.length ? new b.Blob : (D._isProcessableBlob(e, t) && (e = [wl(e.join(""), !0, !1, Zt)]),
                1 === arguments.length ? new b.Blob(e) : new b.Blob(e,t))
            }),
            b.File && me(h, "File", function(e, t, r) {
                return 0 === arguments.length ? new b.File : (D._isProcessableBlob(e, r) && (e = [wl(e.join(""), !0, !1, Zt)]),
                new b.File(e,t,r))
            }),
            h.EventSource && (me(h, "EventSource", function(e, t) {
                var r;
                return arguments.length ? (r = w(e, {
                    resourceType: it({
                        isEventSource: !0
                    })
                }),
                1 === arguments.length ? new b.EventSource(r) : new b.EventSource(r,t)) : new b.EventSource
            }),
            h.EventSource.CONNECTING = b.EventSource.CONNECTING,
            h.EventSource.OPEN = b.EventSource.OPEN,
            h.EventSource.CLOSED = b.EventSource.CLOSED),
            h.MutationObserver && (me(h, "MutationObserver", function(i) {
                return new b.MutationObserver(function(e) {
                    for (var t = [], r = 0, n = e; r < n.length; r++) {
                        var o = n[r];
                        Ju.isShadowUIMutation(o) || t.push(o)
                    }
                    t.length && i.call(this, t, this)
                }
                )
            }),
            h.WebKitMutationObserver && (h.WebKitMutationObserver = h.MutationObserver)),
            h.Proxy && (me(h, "Proxy", function(e, t) {
                var n;
                return t.get && !t.get[$h] && (n = t.get,
                t.get = function(e, t, r) {
                    if (t === zh)
                        return Xh;
                    if (-1 < Hh.indexOf(t))
                        return h[t];
                    e = n.call(this, e, t, r);
                    return "eval" === t && e[ad.WRAPPED_EVAL_FN] ? e[ad.WRAPPED_EVAL_FN] : e
                }
                ,
                b.objectDefineProperty(t.get, $h, {
                    value: !0,
                    enumerable: !1
                })),
                new b.Proxy(e,t)
            }),
            h.Proxy.revocable = b.Proxy.revocable),
            b.registerServiceWorker && f(h.navigator.serviceWorker, "register", function() {
                for (var s = [], e = 0; e < arguments.length; e++)
                    s[e] = arguments[e];
                var a = s[0]
                  , l = s[1];
                if ("string" == typeof a) {
                    if (D._isSecureOrigin(a))
                        return se.reject(Ee || Ae && 17 <= be ? new Error("Only secure origins are allowed.") : new DOMException("Only secure origins are allowed.","SecurityError"));
                    s[0] = w(a, {
                        resourceType: it({
                            isServiceWorker: !0
                        })
                    })
                }
                return s[1] = {
                    scope: "/"
                },
                b.registerServiceWorker.apply(h.navigator.serviceWorker, s).then(function(i) {
                    return new se(function(t, r) {
                        var e, n = Qt(s[0]), o = i.installing;
                        o ? (e = new b.MessageChannel,
                        o.postMessage({
                            cmd: "hammerhead|set-service-worker-settings",
                            currentScope: cr(a),
                            optsScope: cr(l && l.scope),
                            protocol: n.destResourceInfo.protocol,
                            host: n.destResourceInfo.host
                        }, [e.port1]),
                        e.port2.onmessage = function(e) {
                            e = b.messageEventDataGetter.call(e);
                            e.error ? r(new Error(e.error)) : t(i)
                        }
                        ) : t(i)
                    }
                    )
                })
            }),
            b.getRegistrationServiceWorker && f(h.navigator.serviceWorker, "getRegistration", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return "string" == typeof e[0] && (e[0] = "/"),
                b.getRegistrationServiceWorker.apply(h.navigator.serviceWorker, e)
            }),
            h.Range.prototype.createContextualFragment && f(h.Range.prototype, "createContextualFragment", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var r = e[0]
                  , r = ("string" == typeof r && (e[0] = cp(r, {
                    processedContext: this.startContainer && this.startContainer[_.processedContext]
                })),
                b.createContextualFragment.apply(this, e));
                return n.processNodes(r),
                r
            }),
            h.EventTarget && (e = this.listenersSandbox.createOverriddenMethods(),
            f(h.EventTarget.prototype, "addEventListener", e.addEventListener),
            f(h.EventTarget.prototype, "removeEventListener", e.removeEventListener)),
            me(h, "Image", function() {
                var e = null;
                return (e = arguments.length ? 1 === arguments.length ? new b.Image(arguments[0]) : new b.Image(arguments[0],arguments[1]) : new b.Image)[_.forceProxySrcForImage] = !0,
                n.processNodes(e),
                e
            }),
            me(h, "Function", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var r = e.length - 1
                  , r = ("string" == typeof e[r] && (e[r] = wl(e[r], !1, !1, Zt)),
                b.Function.apply(this, e));
                return D._patchFunctionPrototype(r, this),
                r
            }, !0),
            f(b.Function.prototype, "toString", function() {
                return b.objectHasOwnProperty.call(this, _.nativeStrRepresentation) ? this[_.nativeStrRepresentation] : b.functionToString.call(this)
            }),
            "function" == typeof h.history.pushState && "function" == typeof h.history.replaceState && (f(h.history, "pushState", (e = function(n) {
                return function() {
                    for (var e = [], t = 0; t < arguments.length; t++)
                        e[t] = arguments[t];
                    var r = e[2];
                    return 2 < e.length && null !== r && (S || void 0 !== r) && (e[2] = w(r)),
                    n.apply(this, e)
                }
            }
            )(b.historyPushState)),
            f(h.history, "replaceState", e(b.historyReplaceState))),
            b.sendBeacon && f(h.Navigator.prototype, "sendBeacon", function() {
                return "string" == typeof arguments[0] && (arguments[0] = w(arguments[0])),
                b.sendBeacon.apply(this, arguments)
            }),
            h.navigator.registerProtocolHandler && f(h.navigator, "registerProtocolHandler", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var r, n;
                return "string" == typeof e[1] && (r = Ht().hostname,
                (Te ? (n = Jt(e[1])).hostname && r === n.hostname : Dt(Rt(), e[1])) && (e[1] = w(e[1]))),
                b.registerProtocolHandler.apply(navigator, e)
            }),
            h.FormData && f(h.FormData.prototype, "append", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var r = e[0]
                  , n = e[1];
                r !== a.uploadInfoHiddenInputName && (2 === e.length && uo(n) && "name"in n && (e[2] = n.name),
                b.formDataAppend.apply(this, e))
            }),
            h.WebSocket && (me(h, "WebSocket", function(e, t) {
                if (0 === arguments.length)
                    return new b.WebSocket;
                var r = w(e, {
                    resourceType: it({
                        isWebSocket: !0
                    })
                });
                return 1 === arguments.length ? new b.WebSocket(r) : 2 === arguments.length ? new b.WebSocket(r,t) : new b.WebSocket(r,t,arguments[2])
            }),
            h.WebSocket.CONNECTING = b.WebSocket.CONNECTING,
            h.WebSocket.OPEN = b.WebSocket.OPEN,
            h.WebSocket.CLOSING = b.WebSocket.CLOSING,
            h.WebSocket.CLOSED = b.WebSocket.CLOSED,
            b.webSocketUrlGetter && d(h.WebSocket.prototype, "url", {
                getter: function() {
                    var e = b.webSocketUrlGetter.call(this)
                      , t = Qt(e);
                    return t && t.destUrl ? t.destUrl.replace(Bh, "ws") : e
                }
            })),
            d(h.MessageEvent.prototype, "origin", {
                getter: function() {
                    var e = b.eventTargetGetter.call(this)
                      , t = b.messageEventOriginGetter.call(this);
                    if (Oo(e)) {
                        var r = Jt(e.url);
                        if (r)
                            return r.protocol + "//" + r.host
                    } else if (co(e)) {
                        r = b.messageEventDataGetter.call(this);
                        if (r)
                            return r.originUrl
                    }
                    return t
                }
            }),
            d(h.HTMLCollection.prototype, "length", {
                getter: function() {
                    var e = b.htmlCollectionLengthGetter.call(this);
                    return Ju.isShadowContainerCollection(this, e) ? i.shadowUI.getShadowUICollectionLength(this, e) : e
                }
            }),
            d(h.NodeList.prototype, "length", {
                getter: function() {
                    var e = b.nodeListLengthGetter.call(this);
                    return Ju.isShadowContainerCollection(this) ? i.shadowUI.getShadowUICollectionLength(this, e) : e
                }
            }),
            d(h.Element.prototype, "childElementCount", {
                getter: function() {
                    var e, t;
                    return Ju.isShadowContainer(this) ? (e = b.elementChildrenGetter.call(this),
                    t = b.htmlCollectionLengthGetter.call(e),
                    i.shadowUI.getShadowUICollectionLength(e, t)) : b.elementChildElementCountGetter.call(this)
                }
            }),
            b.performanceEntryNameGetter && d(h.PerformanceEntry.prototype, "name", {
                getter: function() {
                    var e = b.performanceEntryNameGetter.call(this);
                    if (ko(this)) {
                        var t = Qt(e);
                        if (t)
                            return t.destUrl
                    }
                    return e
                }
            }),
            d(h.HTMLInputElement.prototype, "files", {
                getter: function() {
                    return "file" === this.type.toLowerCase() ? gh.getFiles(this) : b.inputFilesGetter.call(this)
                }
            }),
            d(h.HTMLInputElement.prototype, "value", {
                getter: function() {
                    return "file" === this.type.toLowerCase() ? gh.getUploadElementValue(this) : b.inputValueGetter.call(this)
                },
                setter: function(e) {
                    if ("file" === this.type.toLowerCase())
                        return i.uploadSandbox.setUploadElementValue(this, e);
                    b.inputValueSetter.call(this, e),
                    e !== b.inputValueGetter.call(this) && !x(this) && _o(this) && i.elementEditingWatcher.restartWatchingElementEditing(this)
                }
            }),
            Pe && d(h.HTMLInputElement.prototype, "disabled", {
                getter: null,
                setter: function(e) {
                    var t, r;
                    b.documentActiveElementGetter.call(document) === this && (t = i.elementEditingWatcher.getElementSavedValue(this),
                    r = b.inputValueGetter.call(this),
                    i.elementEditingWatcher.isEditingObserved(this) && r !== t && i.eventSimulator.change(this),
                    i.elementEditingWatcher.stopWatching(this)),
                    b.inputDisabledSetter.call(this, e)
                }
            }),
            d(h.HTMLInputElement.prototype, "required", {
                getter: function() {
                    return null !== i.nodeSandbox.element.getAttributeCore(this, ["required"])
                },
                setter: function(e) {
                    "file" !== this.type.toLowerCase() ? b.inputRequiredSetter.call(this, e) : e ? i.nodeSandbox.element.setAttributeCore(this, ["required", ""]) : i.nodeSandbox.element.removeAttributeCore(this, ["required"])
                }
            }),
            d(h.HTMLTextAreaElement.prototype, "value", {
                getter: null,
                setter: function(e) {
                    b.textAreaValueSetter.call(this, e),
                    !x(this) && _o(this) && i.elementEditingWatcher.restartWatchingElementEditing(this)
                }
            }),
            this._overrideUrlAttrDescriptors("data", [h.HTMLObjectElement]),
            this._overrideUrlAttrDescriptors("src", [h.HTMLImageElement, h.HTMLScriptElement, h.HTMLEmbedElement, h.HTMLSourceElement, h.HTMLMediaElement, h.HTMLInputElement, h.HTMLFrameElement, h.HTMLIFrameElement]),
            this._overrideUrlAttrDescriptors("action", [h.HTMLFormElement]),
            this._overrideUrlAttrDescriptors("formAction", [h.HTMLInputElement, h.HTMLButtonElement]),
            this._overrideUrlAttrDescriptors("href", [h.HTMLAnchorElement, h.HTMLLinkElement, h.HTMLAreaElement, h.HTMLBaseElement]),
            b.htmlManifestGetter && this._overrideUrlAttrDescriptors("manifest", [h.HTMLHtmlElement]),
            this._overrideAttrDescriptors("target", [h.HTMLAnchorElement, h.HTMLFormElement, h.HTMLAreaElement, h.HTMLBaseElement]),
            this._overrideAttrDescriptors("formTarget", [h.HTMLInputElement, h.HTMLButtonElement]),
            this._overrideAttrDescriptors("autocomplete", [h.HTMLInputElement]),
            this._overrideAttrDescriptors("httpEquiv", [h.HTMLMetaElement]),
            b.scriptIntegrityGetter && b.linkIntegrityGetter && (this._overrideAttrDescriptors("integrity", [h.HTMLScriptElement]),
            this._overrideAttrDescriptors("integrity", [h.HTMLLinkElement])),
            this._overrideAttrDescriptors("rel", [h.HTMLLinkElement]),
            b.linkAsSetter && this._overrideAttrDescriptors("as", [h.HTMLLinkElement]),
            d(h.HTMLInputElement.prototype, "type", {
                getter: null,
                setter: function(e) {
                    i.nodeSandbox.element.setAttributeCore(this, ["type", e])
                }
            }),
            d(h.HTMLIFrameElement.prototype, "sandbox", {
                getter: function() {
                    var t, e = this[Wh];
                    return e || (t = b.createElement.call(document, "span"),
                    e = b.elementClassListGetter.call(t),
                    t.className = i.nodeSandbox.element.getAttributeCore(this, ["sandbox"]) || "",
                    b.objectDefineProperty(e, qh, {
                        value: this
                    }),
                    b.objectDefineProperty(this, Wh, {
                        value: e
                    }),
                    b.objectDefineProperty(this, Kh, {
                        value: function(e) {
                            t.className = e
                        }
                    })),
                    e
                },
                setter: function(e) {
                    i.nodeSandbox.element.setAttributeCore(this, ["sandbox", e]),
                    this[Kh] && this[Kh](i.nodeSandbox.element.getAttributeCore(this, ["sandbox"]) || "")
                }
            }),
            b.iframeSrcdocGetter && d(h.HTMLIFrameElement.prototype, "srcdoc", {
                getter: function() {
                    return i.nodeSandbox.element.getAttributeCore(this, ["srcdoc"]) || ""
                },
                setter: function(e) {
                    i.nodeSandbox.element.setAttributeCore(this, ["srcdoc", e])
                }
            }),
            this._overrideUrlPropDescriptor("port", b.anchorPortGetter, b.anchorPortSetter),
            this._overrideUrlPropDescriptor("host", b.anchorHostGetter, b.anchorHostSetter),
            this._overrideUrlPropDescriptor("hostname", b.anchorHostnameGetter, b.anchorHostnameSetter),
            this._overrideUrlPropDescriptor("pathname", b.anchorPathnameGetter, b.anchorPathnameSetter),
            this._overrideUrlPropDescriptor("protocol", b.anchorProtocolGetter, b.anchorProtocolSetter),
            this._overrideUrlPropDescriptor("search", b.anchorSearchGetter, b.anchorSearchSetter),
            d(h.SVGImageElement.prototype, "href", {
                getter: function() {
                    var e = b.svgImageHrefGetter.call(this);
                    return e[Gh] || b.objectDefineProperty(e, Gh, {
                        value: this,
                        configurable: !0
                    }),
                    e
                }
            }),
            d(h.SVGAnimatedString.prototype, "baseVal", {
                getter: function() {
                    var e = b.svgAnimStrBaseValGetter.call(this);
                    return e = this[Gh] ? lr(e) : e
                },
                setter: function(e) {
                    var t, r = this[Gh];
                    r && (t = b.hasAttributeNS.call(r, "http://www.w3.org/1999/xlink", "href"),
                    i.nodeSandbox.element.setAttributeCore(r, [t ? "xlink:href" : "href", e]),
                    e = w(e)),
                    b.svgAnimStrBaseValSetter.call(this, e)
                }
            }),
            d(h.SVGAnimatedString.prototype, "animVal", {
                getter: function() {
                    var e = b.svgAnimStrAnimValGetter.call(this);
                    return this[Gh] ? lr(e) : e
                }
            }),
            b.anchorOriginGetter && d(h.HTMLAnchorElement.prototype, "origin", {
                getter: function() {
                    return Sh(this, b.anchorOriginGetter)
                }
            }),
            d(h.StyleSheet.prototype, "href", {
                getter: function() {
                    return lr(b.styleSheetHrefGetter.call(this))
                }
            }),
            b.cssStyleSheetHrefGetter && d(h.CSSStyleSheet.prototype, "href", {
                getter: function() {
                    return lr(b.cssStyleSheetHrefGetter.call(this))
                }
            }),
            b.nodeBaseURIGetter && d(h.Node.prototype, "baseURI", {
                getter: function() {
                    return lr(b.nodeBaseURIGetter.call(this))
                }
            }),
            h.DOMParser && f(h.DOMParser.prototype, "parseFromString", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var r, n = e[0], o = e[1], o = (1 < e.length && "string" == typeof n && "text/html" === o && (r = cp(n),
                e[0] = r),
                b.DOMParserParseFromString.apply(this, e));
                return r && Ju.removeSelfRemovingScripts(o),
                o
            }),
            d(h.Node.prototype, "firstChild", {
                getter: function() {
                    return Ju.isShadowContainer(this) ? i.shadowUI.getFirstChild(this) : b.nodeFirstChildGetter.call(this)
                }
            }),
            d(h.Element.prototype, "firstElementChild", {
                getter: function() {
                    return Ju.isShadowContainer(this) ? i.shadowUI.getFirstElementChild(this) : b.elementFirstElementChildGetter.call(this)
                }
            }),
            d(h.Node.prototype, "lastChild", {
                getter: function() {
                    return Ju.isShadowContainer(this) ? i.shadowUI.getLastChild(this) : b.nodeLastChildGetter.call(this)
                }
            }),
            d(h.Element.prototype, "lastElementChild", {
                getter: function() {
                    return Ju.isShadowContainer(this) ? i.shadowUI.getLastElementChild(this) : b.elementLastElementChildGetter.call(this)
                }
            }),
            d(h.Node.prototype, "nextSibling", {
                getter: function() {
                    return i.shadowUI.getNextSibling(this)
                }
            }),
            d(h.Node.prototype, "previousSibling", {
                getter: function() {
                    return i.shadowUI.getPrevSibling(this)
                }
            }),
            d(h.Element.prototype, "nextElementSibling", {
                getter: function() {
                    return i.shadowUI.getNextElementSibling(this)
                }
            }),
            d(h.Element.prototype, "previousElementSibling", {
                getter: function() {
                    return i.shadowUI.getPrevElementSibling(this)
                }
            }),
            d(h[b.elementHTMLPropOwnerName].prototype, "innerHTML", {
                getter: function() {
                    if (i._documentTitleStorageInitializer && Hn(this))
                        return i._documentTitleStorageInitializer.storage.getTitleElementPropertyValue(this);
                    var e = b.elementInnerHTMLGetter.call(this);
                    return Xn(this) ? Da(e) : $n(this) ? Fl.cleanUp(e, Qt) : lp(e)
                },
                setter: function(e) {
                    var t, r, n;
                    i._documentTitleStorageInitializer && Hn(this) ? i._documentTitleStorageInitializer.storage.setTitleElementPropertyValue(this, e) : (r = $n(t = this),
                    n = Xn(t),
                    e = (e = null != e ? String(e) : e) && (r ? Fl.process(e, w, !0) : n ? wl(e, !0, !1, Zt) : cp(e, {
                        parentTag: t.tagName,
                        processedContext: t[_.processedContext]
                    })),
                    r || n || pu.onChildrenChanged(t),
                    b.elementInnerHTMLSetter.call(t, e),
                    i._setSandboxedTextForTitleElements(t),
                    r || n || (pu.onChildrenChanged(t),
                    i.document.body === t ? (e = i.shadowUI.getRoot(),
                    i.shadowUI.markShadowUIContainers(i.document.head, t),
                    Ju.markElementAndChildrenAsShadow(e)) : x(t) && Ju.markElementAndChildrenAsShadow(t),
                    (n = (r = En(t)) ? r.defaultView : null) && n !== h && n[_.processDomMethodName] ? n[_.processDomMethodName](t, r) : h[_.processDomMethodName] && h[_.processDomMethodName](t),
                    h.self && (Vn(t) || Gn(t)) && b.setTimeout.call(h, function() {
                        return i.nodeMutation.onBodyContentChanged(t)
                    }, 0)))
                }
            }),
            d(h[b.elementHTMLPropOwnerName].prototype, "outerHTML", {
                getter: function() {
                    return lp(b.elementOuterHTMLGetter.call(this))
                },
                setter: function(e) {
                    var t, r, n = b.nodeParentNodeGetter.call(this);
                    pu.onElementChanged(this),
                    n && null != e ? (r = (t = En(n)) ? t.defaultView : null,
                    b.elementOuterHTMLSetter.call(this, cp(String(e), {
                        parentTag: n && n.tagName,
                        processedContext: this[_.processedContext]
                    })),
                    i._setSandboxedTextForTitleElements(n),
                    pu.onChildrenChanged(n),
                    r && r !== h && r[_.processDomMethodName] ? r[_.processDomMethodName](n, t) : h[_.processDomMethodName] && h[_.processDomMethodName](n),
                    h.self && Gn(this) && b.setTimeout.call(h, function() {
                        return i.shadowUI.onBodyElementMutation()
                    }, 0)) : b.elementOuterHTMLSetter.call(this, e)
                }
            }),
            d(h.HTMLElement.prototype, "innerText", {
                getter: function() {
                    if (i._documentTitleStorageInitializer && Hn(this))
                        return i._documentTitleStorageInitializer.storage.getTitleElementPropertyValue(this);
                    var e = b.htmlElementInnerTextGetter.call(this);
                    return D._removeProcessingInstructions(e)
                },
                setter: function(e) {
                    i._documentTitleStorageInitializer && Hn(this) ? i._documentTitleStorageInitializer.storage.setTitleElementPropertyValue(this, e) : (e = D._processTextPropValue(this, e),
                    pu.onChildrenChanged(this),
                    b.htmlElementInnerTextSetter.call(this, e))
                }
            }),
            d(h.HTMLScriptElement.prototype, "text", {
                getter: function() {
                    return Da(b.scriptTextGetter.call(this))
                },
                setter: function(e) {
                    e = e && wl(String(e), !0, !1, Zt);
                    b.scriptTextSetter.call(this, e)
                }
            }),
            d(h.HTMLAnchorElement.prototype, "text", {
                getter: function() {
                    var e = b.anchorTextGetter.call(this);
                    return D._removeProcessingInstructions(e)
                },
                setter: function(e) {
                    e = D._processTextPropValue(this, e);
                    pu.onChildrenChanged(this),
                    b.anchorTextSetter.call(this, e)
                }
            }),
            d(h.Node.prototype, "textContent", {
                getter: function() {
                    if (i._documentTitleStorageInitializer && Hn(this))
                        return i._documentTitleStorageInitializer.storage.getTitleElementPropertyValue(this);
                    var e = b.nodeTextContentGetter.call(this);
                    return D._removeProcessingInstructions(e)
                },
                setter: function(e) {
                    i._documentTitleStorageInitializer && Hn(this) ? i._documentTitleStorageInitializer.storage.setTitleElementPropertyValue(this, e) : (e = D._processTextPropValue(this, e),
                    pu.onChildrenChanged(this),
                    b.nodeTextContentSetter.call(this, e))
                }
            }),
            d(h[b.elementAttributesPropOwnerName].prototype, "attributes", {
                getter: function() {
                    var e = this;
                    if (e[su])
                        return lu(e),
                        e[su];
                    var t = b.elementAttributesGetter.call(e);
                    if (!t)
                        return t;
                    for (var r = 0, n = t; r < n.length; r++)
                        if (On(n[r].name))
                            return iu.prototype = t,
                            e[su] = new iu(e,t),
                            e[su];
                    return t
                }
            }),
            f(h.DOMTokenList.prototype, "add", this._createOverriddenDOMTokenListMethod(b.tokenListAdd)),
            f(h.DOMTokenList.prototype, "remove", this._createOverriddenDOMTokenListMethod(b.tokenListRemove)),
            f(h.DOMTokenList.prototype, "toggle", this._createOverriddenDOMTokenListMethod(b.tokenListToggle)),
            b.tokenListReplace && f(h.DOMTokenList.prototype, "replace", this._createOverriddenDOMTokenListMethod(b.tokenListReplace)),
            b.tokenListSupports && f(h.DOMTokenList.prototype, "supports", function() {
                var e;
                return this[qh] ? (e = b.iframeSandboxGetter.call(this[qh]),
                b.tokenListSupports.apply(e, arguments)) : b.tokenListSupports.apply(this, arguments)
            }),
            b.tokenListValueSetter && d(h.DOMTokenList.prototype, "value", {
                getter: null,
                setter: function(e) {
                    var t = this[qh];
                    b.tokenListValueSetter.call(this, e),
                    t && i.nodeSandbox.element.setAttributeCore(t, ["sandbox", this.value])
                }
            }),
            f(h.DOMImplementation.prototype, "createHTMLDocument", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var r = b.createHTMLDocument.apply(this, e);
                return Nt.init(r),
                r
            }),
            d(h.MutationRecord.prototype, "nextSibling", {
                getter: function() {
                    var e = b.mutationRecordNextSiblingGetter.call(this);
                    return i.shadowUI.getMutationRecordNextSibling(e)
                }
            }),
            d(h.MutationRecord.prototype, "previousSibling", {
                getter: function() {
                    var e = b.mutationRecordPrevSiblingGetter.call(this);
                    return i.shadowUI.getMutationRecordPrevSibling(e)
                }
            }),
            b.windowOriginGetter && d(h, "origin", {
                getter: function() {
                    var e = b.windowOriginGetter.call(this);
                    if (!e || "null" === e)
                        return e;
                    e = hn(i.window);
                    if (e) {
                        e = i.nodeSandbox.element.getAttributeCore(e, ["sandbox"]);
                        if ("string" == typeof e && -1 === e.indexOf("allow-same-origin"))
                            return "null"
                    }
                    e = Ht();
                    return e && "file:" === e.protocol ? "null" : Bt()
                },
                setter: function(e) {
                    return b.windowOriginSetter.call(this, e)
                }
            }),
            this._documentTitleStorageInitializer && d(h.HTMLTitleElement.prototype, "text", {
                getter: function() {
                    return i._documentTitleStorageInitializer.storage.getTitleElementPropertyValue(this)
                },
                setter: function(e) {
                    i._documentTitleStorageInitializer.storage.setTitleElementPropertyValue(this, e)
                }
            })
        }
        ,
        D);
        function D(e, t, r, n, o, i) {
            var s = Rh.call(this) || this;
            return s._childWindowSandbox = o,
            s._documentTitleStorageInitializer = i,
            s.UNCAUGHT_JS_ERROR_EVENT = "hammerhead|event|uncaught-js-error",
            s.UNHANDLED_REJECTION_EVENT = "hammerhead|event|unhandled-rejection",
            s.HASH_CHANGE_EVENT = "hammerhead|event|hashchange-event",
            s.nodeSandbox = e,
            s.messageSandbox = t.message,
            s.listenersSandbox = t.listeners,
            s.elementEditingWatcher = t.elementEditingWatcher,
            s.eventSimulator = t.eventSimulator,
            s.uploadSandbox = r,
            s.shadowUI = e.shadowUI,
            s.nodeMutation = n,
            s.SANDBOX_DOM_TOKEN_LIST_UPDATE_FN = Kh,
            s
        }
        function Jh() {}
        e(td, Zh = r),
        td._error = function(e) {
            throw new Error(e)
        }
        ,
        td._setCrossDomainLocation = function(e, t) {
            var r, n = "";
            return "string" != typeof t && (t = String(t)),
            n = P.isJsProtocol(t) ? P.processJsAttrValue(t, {
                isJsProtocol: !0,
                isEventAttr: !1
            }) : (r = it({
                isIframe: !0
            }),
            t = Tt(t),
            e !== window.rammerheadTop.location ? w(t, {
                resourceType: r
            }) : w(t, {
                proxyPort: m.get().crossDomainProxyPort
            })),
            e.href = n,
            t
        }
        ,
        td._getLocation = function(e) {
            var t = wc.getLocationWrapper(e);
            if (t)
                return t;
            if (!e.location)
                return e.location;
            t = co(e) ? e : e.defaultView;
            return new Ec(t,null,Jh)
        }
        ,
        td._setLocation = function(e, t) {
            var r = co(e) ? e : e.defaultView
              , n = wc.getLocationWrapper(r);
            return !n || n === e.location || S && bn(window, r) ? td._setCrossDomainLocation(e.location, t) : n && (n.href = t),
            t
        }
        ,
        td._propertyGetter = function(e, t, r) {
            if (void 0 === r && (r = !1),
            Tc(e) && !r && td._error("Cannot read property '" + t + "' of " + Cc(e)),
            "string" == typeof t && Ps(t)) {
                if (r && Tc(e))
                    return;
                if (!Qh.isProxyObject(e) && td._ACCESSORS[t].condition(e))
                    return td._ACCESSORS[t].get(e)
            }
            return r && Tc(e) ? void 0 : e[t]
        }
        ,
        td._propertySetter = function(e, t, r) {
            return Tc(e) && td._error("Cannot set property '" + t + "' of " + Cc(e)),
            "string" == typeof t && Ps(t) && !Qh.isProxyObject(e) && td._ACCESSORS[t].condition(e) ? td._ACCESSORS[t].set(e, r) : e[t] = r
        }
        ,
        td.prototype.attach = function(e) {
            Zh.prototype.attach.call(this, e),
            b.objectDefineProperties(e, ((e = {})[v.getProperty] = {
                value: td._propertyGetter,
                configurable: !0
            },
            e[v.setProperty] = {
                value: td._propertySetter,
                configurable: !0
            },
            e))
        }
        ,
        td._ACCESSORS = {
            href: {
                condition: ho,
                get: function(e) {
                    return e.href
                },
                set: td._setCrossDomainLocation
            },
            location: {
                condition: function(e) {
                    return po(e) || co(e)
                },
                get: td._getLocation,
                set: td._setLocation
            }
        };
        var Zh, ed = td;
        function td() {
            return null !== Zh && Zh.apply(this, arguments) || this
        }
        function rd(e, t, r) {
            var n = e[t];
            switch (r.length) {
            case 1:
                return n.call(e, r[0]);
            case 2:
                return n.call(e, r[0], r[1]);
            case 3:
                return n.call(e, r[0], r[1], r[2]);
            case 4:
                return n.call(e, r[0], r[1], r[2], r[3]);
            case 5:
                return n.call(e, r[0], r[1], r[2], r[3], r[4]);
            default:
                return n.apply(e, r)
            }
        }
        e(id, nd = r),
        id._error = function(e) {
            throw new Error(e)
        }
        ,
        id._getLocationResourceType = function(e) {
            return window.rammerheadTop.location === e ? null : it({
                isIframe: !0
            })
        }
        ,
        id._isPostMessageFn = function(e, t) {
            return e.postMessage == e.postMessage ? e.postMessage === t : t && "function" == typeof t.toString && t.toString() === e.postMessage.toString()
        }
        ,
        id.prototype.attach = function(e) {
            var n = this
              , r = (nd.prototype.attach.call(this, e),
            b.objectDefineProperty(e, v.callMethod, {
                value: function(e, t, r) {
                    return Tc(e) && id._error("Cannot call method '" + t + "' of " + Cc(e)),
                    "function" != typeof e[t] && id._error("'" + t + "' is not a function"),
                    "string" == typeof t && As(t) && n.methodWrappers[t].condition(e) ? n.methodWrappers[t].method(e, r) : rd(e, t, r)
                },
                configurable: !0
            }),
            this);
            b.objectDefineProperty(e, v.getPostMessage, {
                value: function(e, t) {
                    return 1 !== arguments.length || co(e) ? 2 !== arguments.length || id._isPostMessageFn(this, t) ? function() {
                        for (var e = [], t = 0; t < arguments.length; t++)
                            e[t] = arguments[t];
                        return r._messageSandbox.postMessage(this, e)
                    }
                    : t : e.postMessage
                },
                configurable: !0
            })
        }
        ;
        var nd, od = id;
        function id(r) {
            var e = nd.call(this) || this;
            return e._messageSandbox = r,
            e.methodWrappers = {
                postMessage: {
                    condition: co,
                    method: function(e, t) {
                        return r.postMessage(e, t)
                    }
                },
                replace: {
                    condition: ho,
                    method: function(e, t) {
                        return e.replace(w(t[0], {
                            resourceType: id._getLocationResourceType(e)
                        }))
                    }
                },
                assign: {
                    condition: ho,
                    method: function(e, t) {
                        return e.assign(w(t[0], {
                            resourceType: id._getLocationResourceType(e)
                        }))
                    }
                }
            },
            e
        }
        e(ld, sd = r),
        ld.prototype.attach = function(r) {
            var o = this;
            sd.prototype.attach.call(this, r),
            this._methodCallInstrumentation.attach(r),
            this._locationAccessorsInstrumentation.attach(r),
            this._propertyAccessorsInstrumentation.attach(r),
            b.objectDefineProperty(r, v.getEval, {
                value: function(t) {
                    if (t !== r.eval)
                        return t;
                    function e(e) {
                        return "string" == typeof e && (e = wl(e)),
                        t(e)
                    }
                    return b.objectDefineProperty(e, ld.WRAPPED_EVAL_FN, {
                        value: t
                    }),
                    e
                },
                configurable: !0
            }),
            b.objectDefineProperty(r, v.processScript, {
                value: function(e, t) {
                    if (t) {
                        if (e && e.length && "string" == typeof e[0]) {
                            for (var r = [wl(e[0], !1)], n = 1; n < e.length; n++)
                                r.push(e[n]);
                            return r
                        }
                    } else if ("string" == typeof e)
                        return wl(e, !1);
                    return e
                },
                configurable: !0
            }),
            b.objectDefineProperty(r, v.processHtml, {
                value: function(e, t) {
                    return t = "string" == typeof t ? cp("<html><body>" + t + "</body></html>", {
                        processedContext: e
                    }) : t
                },
                configurable: !0
            }),
            b.objectDefineProperty(r, v.getProxyUrl, {
                value: function(e, t) {
                    var r = Nt.getBaseUrl(o.document)
                      , n = t && t !== r
                      , t = (n && Nt.updateBase(t, o.document),
                    w(e, {
                        resourceType: it({
                            isScript: !0
                        })
                    }));
                    return n && Nt.updateBase(r, o.document),
                    t
                },
                configurable: !0
            }),
            b.objectDefineProperty(r, v.restArray, {
                value: function(e, t) {
                    return b.arraySlice.call(e, t)
                },
                configurable: !0
            }),
            b.objectDefineProperty(r, v.arrayFrom, {
                value: function(e) {
                    return e && (!b.isArray.call(b.Array, e) && "function" == typeof e[Symbol.iterator] ? b.arrayFrom.call(b.Array, e) : e)
                },
                configurable: !0
            }),
            b.objectDefineProperty(r, v.restObject, {
                value: function(e, t) {
                    for (var r = {}, n = 0, o = b.objectKeys(e); n < o.length; n++) {
                        var i = o[n];
                        t.indexOf(i) < 0 && (r[i] = e[i])
                    }
                    return r
                },
                configurable: !0
            })
        }
        ,
        ld.WRAPPED_EVAL_FN = "hammerhead|code-instrumentation|wrapped-eval-fn";
        var sd, ad = ld;
        function ld(e, t) {
            var r = sd.call(this) || this;
            return r._methodCallInstrumentation = new od(e.message),
            r._locationAccessorsInstrumentation = new wc(t),
            r._propertyAccessorsInstrumentation = new ed,
            r
        }
        var cd = 36
          , pd = 7
          , ud = /(?:^([^=]+)=([\s\S]*))?/
          , hd = {
            server: "s",
            client: "c",
            window: "w"
        }
          , dd = new RegExp("^[" + hd.server + hd.client + hd.window + "]+");
        function fd(e) {
            return (e.isServerSync ? hd.server : "") + (e.isClientSync ? hd.client : "") + (e.isWindowSync ? hd.window : "")
        }
        function md(e) {
            var t = fd(e)
              , r = encodeURIComponent(e.key)
              , n = encodeURIComponent(e.domain)
              , o = encodeURIComponent(e.path)
              , i = "Infinity" !== e.expires ? e.expires.getTime().toString(cd) : ""
              , s = e.lastAccessed.getTime().toString(cd);
            return t + "|" + e.sid + "|" + r + "|" + n + "|" + o + "|" + i + "|" + s
        }
        function gd(e) {
            for (var t = [], r = 0, n = e ? e.split(";") : ""; r < n.length; r++) {
                var o = Ed(Re(n[r]));
                o && t.push(o)
            }
            for (var i, s = t, a = [], l = [], c = 0; c < s.length; c++) {
                for (var p, u = c + 1; u < s.length; u++)
                    if (p = s[c],
                    i = s[u],
                    p.sid === i.sid && p.key === i.key && p.domain === i.domain && p.path === i.path) {
                        s[c].lastAccessed > s[u].lastAccessed && (p = s[c],
                        s[c] = s[u],
                        s[u] = p),
                        a.push(s[c]);
                        break
                    }
                u === s.length && l.push(s[c])
            }
            return {
                outdated: a,
                actual: l
            }
        }
        function yd(e) {
            e.syncKey = e.syncKey || md(e),
            e.cookieStr = e.cookieStr || e.syncKey + "=" + e.value
        }
        function vd(e) {
            return e.cookieStr ? e.cookieStr + ";path=/" : md(e) + "=" + e.value + ";path=/"
        }
        function Ed(e) {
            var t = ud.exec(e) || []
              , r = t[1]
              , t = t[2]
              , n = void 0 !== r && void 0 !== t && r.split("|");
            return n && n.length !== pd ? null : {
                isServerSync: -1 < n[0].indexOf(hd.server),
                isClientSync: -1 < n[0].indexOf(hd.client),
                isWindowSync: -1 < n[0].indexOf(hd.window),
                sid: n[1],
                key: decodeURIComponent(n[2]),
                domain: decodeURIComponent(n[3]),
                path: decodeURIComponent(n[4]),
                expires: n[5] ? new Date(parseInt(n[5], cd)) : "Infinity",
                lastAccessed: new Date(parseInt(n[6], cd)),
                syncKey: r,
                value: t,
                cookieStr: e
            }
        }
        function Sd(e, t) {
            "server"in t && (e.isServerSync = t.server),
            "client"in t && (e.isClientSync = t.client),
            "window"in t && (e.isWindowSync = t.window);
            var r, t = fd(e);
            e.syncKey = null == (r = e.syncKey) ? void 0 : r.replace(dd, t),
            e.cookieStr = null == (r = e.cookieStr) ? void 0 : r.replace(dd, t)
        }
        function _d(e) {
            return e.syncKey + "=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT"
        }
        var bd = Object.freeze({
            __proto__: null,
            SYNCHRONIZATION_TYPE: hd,
            parseClientSyncCookieStr: gd,
            prepareSyncCookieProperties: yd,
            formatSyncCookie: vd,
            parseSyncCookie: Ed,
            changeSyncType: Sd,
            isOutdatedSyncCookie: function(e, t) {
                return t.isServerSync === e.isServerSync && t.sid === e.sid && t.key === e.key && t.domain === e.domain && t.path === e.path && t.lastAccessed > e.lastAccessed
            },
            generateDeleteSyncCookieStr: _d
        })
          , wd = null;
        function xd() {
            if (!wd)
                for (wd = window.rammerheadTop; wd.opener && wd !== wd.opener; )
                    wd = wd.opener.rammerheadTop;
            return wd
        }
        var Cd = "hammerhead|command|sync-cookie-start"
          , Td = "hammerhead|command|sync-cookie-done"
          , Ad = (Pd._getCookieSandbox = function(e) {
            try {
                var t = e[_.hammerhead].sandbox.cookie;
                return t.document && t
            } catch (e) {
                return null
            }
        }
        ,
        Pd.prototype._onMsgReceived = function(e) {
            var t = this
              , r = e.message
              , n = e.source;
            r.cmd === Cd ? (this._cookieSandbox.syncWindowCookie(r.cookies),
            this._win !== this._win.rammerheadTop ? this._messageSandbox.sendServiceMsg({
                id: r.id,
                cmd: Td
            }, n) : this._win !== xd() ? this.syncBetweenWindows(r.cookies, n).then(function() {
                return t._messageSandbox.sendServiceMsg({
                    id: r.id,
                    cmd: Td
                }, n)
            }) : this.syncBetweenWindows(r.cookies, n)) : r.cmd === Td && (e = this._resolversMap.get(r.id)) && e()
        }
        ,
        Pd.prototype._getWindowsForSync = function(e, t, r) {
            void 0 === r && (r = []),
            t !== e && t !== this._win.rammerheadTop && r.push(t);
            for (var n = 0, o = t.frames; n < o.length; n++) {
                var i = o[n];
                this._getWindowsForSync(e, i, r)
            }
            return r
        }
        ,
        Pd.prototype._sendSyncMessage = function(o, i, s) {
            var a = this
              , l = this._messageIdGenerator.increment()
              , c = 0;
            return new se(function(e) {
                function t() {
                    b.clearTimeout.call(a._win, n),
                    a._resolversMap.delete(l),
                    e()
                }
                function r() {
                    c++ < 5 || !o.parent ? (a._messageSandbox.sendServiceMsg({
                        id: l,
                        cmd: i,
                        cookies: s
                    }, o),
                    n = b.setTimeout.call(a._win, r, 500 * c)) : t()
                }
                var n = null;
                a._resolversMap.set(l, t),
                r()
            }
            )
        }
        ,
        Pd.prototype._delegateSyncBetweenWindowsToMainTopWindow = function(e) {
            var t = xd()
              , r = Pd._getCookieSandbox(t);
            r ? (r.syncWindowCookie(e),
            r.getWindowSync().syncBetweenWindows(e, this._win)) : this._messageSandbox.sendServiceMsg({
                cmd: Cd,
                cookies: e
            }, t)
        }
        ,
        Pd.prototype._removeSyncCookie = function(e) {
            for (var t = this._win.document, r = e[0].isClientSync && b.documentCookieGetter.call(t), n = 0, o = e; n < o.length; n++) {
                var i = o[n];
                b.documentCookieSetter.call(t, _d(i))
            }
            e = e[0];
            r && Ud.isSyncCookieExists(e, r) && (Sd(e, {
                window: !1
            }),
            b.documentCookieSetter.call(t, vd(e)))
        }
        ,
        Pd.prototype.syncBetweenWindows = function(e, t) {
            var r = this
              , n = xd();
            if (this._win !== this._win.rammerheadTop || this._win !== n && !t)
                return this._delegateSyncBetweenWindowsToMainTopWindow(e),
                se.resolve();
            var t = this._getWindowsForSync(t, this._win)
              , o = [];
            if (this._win === n)
                for (var i = 0, s = this._childWindowSandbox.getChildWindows(); i < s.length; i++) {
                    var a = s[i];
                    (p = Pd._getCookieSandbox(a)) ? o.push(p.getWindowSync().syncBetweenWindows(e, this._win)) : o.push(this._sendSyncMessage(a, Cd, e))
                }
            for (var l = 0, c = t; l < c.length; l++) {
                var p, a = c[l];
                (p = Pd._getCookieSandbox(a)) ? p.syncWindowCookie(e) : o.push(this._sendSyncMessage(a, Cd, e))
            }
            return o.length ? (t = se.all(o),
            this._win === n ? t.then(function() {
                return r._removeSyncCookie(e)
            }) : t.then()) : (this._removeSyncCookie(e),
            se.resolve())
        }
        ,
        Pd.prototype.attach = function(e) {
            var t = this;
            this._win = e,
            this._messageSandbox.on(this._messageSandbox.SERVICE_MSG_RECEIVED_EVENT, function(e) {
                return t._onMsgReceived(e)
            }),
            e === e.rammerheadTop && (this._messageIdGenerator = this._messageIdGenerator || new dc,
            this._resolversMap = this._resolversMap || new Map)
        }
        ,
        Pd);
        function Pd(e, t, r) {
            this._cookieSandbox = e,
            this._messageSandbox = t,
            this._childWindowSandbox = r,
            this._win = null,
            this._messageIdGenerator = null,
            this._resolversMap = new Map
        }
        var Id = /^((?:=)?([^=;]*)\s*=\s*)?([^\n\r\0]*)/
          , Nd = /;+$/
          , Od = /((?:\s|,)[0-9]{1,2})(?:\s|-)([A-Za-z]{3})(?:\s|-)([0-9]{4}\s)/;
        function Ld(e) {
            e = Re(e);
            var t = Nd.exec(e)
              , t = (e = t ? e.slice(0, t.index) : e).indexOf(";")
              , r = -1 < t ? e.substr(0, t) : e
              , r = Id.exec(r);
            if (!r)
                return null;
            var n = {
                key: r[1] ? Re(r[2]) : "",
                value: Re(r[3])
            };
            if (-1 === t)
                return n;
            r = Re(e.slice(t).replace(/^\s*;\s*/, ""));
            if (0 === r.length)
                return n;
            for (var o = r.split(/\s*;\s*/); o.length; ) {
                var i, s = o.shift(), a = s.indexOf("="), l = null, c = null;
                switch (-1 === a ? l = s : (l = s.substr(0, a),
                c = Re(s.substr(a + 1))),
                l = Re(l.toLowerCase())) {
                case "expires":
                    c = c.replace(Od, "$1 $2 $3"),
                    (i = jd(Date.parse(c))) && (n.expires = i);
                    break;
                case "max-age":
                    n.maxAge = c;
                    break;
                case "path":
                    n.path = c;
                    break;
                case "secure":
                    n.secure = !0;
                    break;
                case "httponly":
                    n.httpOnly = !0;
                    break;
                case "domain":
                    n.domain = Re(c.replace(/^\./, ""))
                }
            }
            return n
        }
        function kd(e) {
            var t = e.value || "";
            return t = "" !== e.key ? e.key + "=" + t : t
        }
        function Dd(e, t) {
            var r = t.hostname
              , t = t.pathname;
            e.domain || (e.domain = r),
            e.path && "/" === e.path.charAt(0) || (r = t.slice(0, t.lastIndexOf("/")),
            e.path = r || "/"),
            e.expires || (e.expires = "Infinity")
        }
        function Md(e, t) {
            if (!t)
                return !0;
            if ((e = e.toLowerCase()) === (t = t.toLowerCase()))
                return !0;
            var r = e.indexOf(t);
            return 0 < r && e.length === t.length + r && "." === e.charAt(r - 1)
        }
        function Rd(e, t) {
            return !t || "/" !== t.charAt(0) || e === t || e.length > t.length && 0 === e.indexOf(t) && ("/" === t.charAt(t.length - 1) || "/" === e.charAt(t.length))
        }
        function jd(e) {
            if (arguments.length) {
                if (isNaN(e))
                    return null
            } else
                e = b.dateNow();
            return e = 1e3 * Math.floor(e / 1e3),
            new b.date(e)
        }
        var Hd, Bd = Object.freeze({
            __proto__: null,
            parse: Ld,
            formatClientString: kd,
            setDefaultValues: Dd,
            domainMatch: Md,
            pathMatch: Rd,
            getUTCDate: jd
        }), Fd = new b.date(0).toUTCString(), Ud = (e(Vd, Hd = r),
        Vd._removeAllSyncCookie = function() {
            for (var e = gd(b.documentCookieGetter.call(document)), t = m.get().sessionId, r = 0, n = e.outdated; r < n.length; r++) {
                var o = n[r];
                b.documentCookieSetter.call(document, _d(o))
            }
            for (var i = 0, s = e.actual; i < s.length; i++) {
                var a = s[i];
                a.sid === t && (a.isWindowSync || a.isServerSync) && (b.documentCookieSetter.call(document, _d(a)),
                a.isClientSync && (Sd(a, {
                    window: !1
                }),
                b.documentCookieSetter.call(document, vd(a))))
            }
        }
        ,
        Vd.prototype._canSetCookie = function(e, t) {
            if (t && (4096 < e.length || "file:" === Ht().protocol))
                return !1;
            t = "key" + b.mathRandom.call(b.math) + "=value",
            b.documentCookieSetter.call(this.document, t),
            e = !b.documentCookieGetter.call(this.document);
            return e || b.documentCookieSetter.call(this.document, t + ";expires=" + Fd),
            !e
        }
        ,
        Vd._updateClientCookieStr = function(e, t) {
            for (var r = m.get().cookie, n = [], o = !1, i = "" === e ? null : e + "=", s = 0, a = r ? r.split(";") : []; s < a.length; s++) {
                var l = Re(l = a[s]);
                (i ? 0 === l.indexOf(i) : -1 === l.indexOf("=")) ? null !== t && (n.push(t),
                o = !0) : n.push(l)
            }
            o || null === t || n.push(t),
            m.get().cookie = n.join("; ")
        }
        ,
        Vd.prototype.getCookie = function() {
            return this.syncCookie(),
            m.get().cookie || ""
        }
        ,
        Vd.prototype.setCookie = function(e) {
            var t, r, n, o = "string" == typeof e;
            !this._canSetCookie(e, o) || (e = o ? Ld(e) : e) && !e.httpOnly && Md((t = Ht()).hostname, e.domain) && (e.secure && "https:" !== t.protocol || !Rd(t.pathname, e.path) || (r = jd(),
            n = null,
            (!e.expires || "Infinity" === e.expires || e.expires > r) && (n = kd(e)),
            Vd._updateClientCookieStr(e.key, n)),
            o && (Dd(e, t),
            this._syncClientCookie(e),
            this.syncCookie()))
        }
        ,
        Vd.prototype.syncCookie = function() {
            for (var e = gd(b.documentCookieGetter.call(this.document)), t = m.get().sessionId, r = [], n = 0, o = e.outdated; n < o.length; n++) {
                var i = o[n];
                b.documentCookieSetter.call(this.document, _d(i))
            }
            for (var s = 0, a = e.actual; s < a.length; s++) {
                var l = a[s];
                l.sid === t && (l.isServerSync ? r.push(l) : l.isWindowSync && this.setCookie(l))
            }
            r.length && this._syncServerCookie(r)
        }
        ,
        Vd.prototype._syncServerCookie = function(e) {
            for (var t = 0, r = e; t < r.length; t++) {
                var n = r[t];
                this.setCookie(n),
                b.documentCookieSetter.call(this.document, _d(n)),
                Sd(n, {
                    server: !1,
                    window: !0
                }),
                b.documentCookieSetter.call(this.document, vd(n))
            }
            this._windowSync.syncBetweenWindows(e)
        }
        ,
        Vd.prototype._syncClientCookie = function(e) {
            e.isClientSync = !0,
            e.isWindowSync = !0,
            e.sid = m.get().sessionId,
            e.lastAccessed = new b.date,
            yd(e),
            b.documentCookieSetter.call(this.document, vd(e)),
            this._windowSync.syncBetweenWindows([e])
        }
        ,
        Vd.isSyncCookieExists = function(e, t) {
            var r = t.indexOf(e.cookieStr)
              , e = r + e.cookieStr.length;
            return -1 < r && (t.length === e || ";" === t.charAt(e))
        }
        ,
        Vd.prototype.syncWindowCookie = function(e) {
            for (var t = b.documentCookieGetter.call(this.document), r = 0, n = e; r < n.length; r++) {
                var o = n[r];
                Vd.isSyncCookieExists(o, t) && this.setCookie(o)
            }
        }
        ,
        Vd.prototype.getWindowSync = function() {
            return this._windowSync
        }
        ,
        Vd.prototype.attach = function(e) {
            Hd.prototype.attach.call(this, e),
            this._windowSync.attach(e),
            e === xd() && this._unloadSandbox.on(this._unloadSandbox.UNLOAD_EVENT, Vd._removeAllSyncCookie)
        }
        ,
        Vd);
        function Vd(e, t, r) {
            var n = Hd.call(this) || this;
            return n._unloadSandbox = t,
            n._windowSync = new Ad(n,e,r),
            n
        }
        var Gd = "hammerhead|editing-observed"
          , Wd = "hammerhead|previous-value"
          , qd = (Kd._getValue = function(e) {
            return jn(e) ? b.inputValueGetter.call(e) : Qn(e) ? b.textAreaValueGetter.call(e) : e.value
        }
        ,
        Kd.prototype.stopWatching = function(e) {
            e && (b.removeEventListener.call(e, "blur", this._onBlur),
            b.removeEventListener.call(e, "change", this._onChange),
            void 0 !== e[Gd] && delete e[Gd],
            void 0 !== e[Wd] && delete e[Wd])
        }
        ,
        Kd.prototype.watchElementEditing = function(e) {
            var t;
            e && !e[Gd] && _o(e) && !x(e) && (b.objectDefineProperties(e, ((t = {})[Gd] = {
                value: !0,
                configurable: !0,
                writable: !0
            },
            t[Wd] = {
                value: Kd._getValue(e),
                configurable: !0,
                writable: !0
            },
            t)),
            b.addEventListener.call(e, "blur", this._onBlur),
            b.addEventListener.call(e, "change", this._onChange))
        }
        ,
        Kd.prototype.restartWatchingElementEditing = function(e) {
            e && e[Gd] && (e[Wd] = Kd._getValue(e))
        }
        ,
        Kd.prototype.processElementChanging = function(e) {
            return !(!e || !e[Gd] || Kd._getValue(e) === e[Wd]) && (this._eventSimulator.change(e),
            this.restartWatchingElementEditing(e),
            !0)
        }
        ,
        Kd.prototype.getElementSavedValue = function(e) {
            return e[Wd]
        }
        ,
        Kd.prototype.isEditingObserved = function(e) {
            return e[Gd]
        }
        ,
        Kd);
        function Kd(e) {
            var t = this;
            this._eventSimulator = e,
            this._onChange = function(e) {
                return t.stopWatching(b.eventTargetGetter.call(e))
            }
            ,
            this._onBlur = function(e) {
                e = b.eventTargetGetter.call(e);
                t.processElementChanging(e) || t.stopWatching(e)
            }
        }
        var zd, Xd = "hammerhead|event|window-activated", $d = "hammerhead|event|window-deactivated", Yd = (e(Qd, zd = r),
        Qd.prototype._notifyPrevActiveWindow = function() {
            try {
                this._activeWindow.rammerheadTop && this._activeWindow !== this._activeWindow.rammerheadTop && this._messageSandbox.sendServiceMsg({
                    cmd: $d
                }, this._activeWindow)
            } catch (e) {}
        }
        ,
        Qd.prototype.attach = function(e) {
            var t = this;
            zd.prototype.attach.call(this, e),
            this._isIframeWindow = wn(e),
            this._activeWindow = this._isIframeWindow ? null : e.rammerheadTop,
            this._isActive = !this._isIframeWindow,
            this._messageSandbox.on(this._messageSandbox.SERVICE_MSG_RECEIVED_EVENT, function(e) {
                e.message.cmd === Xd ? (t._notifyPrevActiveWindow(),
                t._isActive = !1,
                t._activeWindow = e.source) : e.message.cmd === $d && (t._isActive = !1)
            })
        }
        ,
        Qd.prototype.isCurrentWindowActive = function() {
            return this._isActive
        }
        ,
        Qd.prototype.makeCurrentWindowActive = function() {
            this._isActive = !0,
            this._isIframeWindow ? this._messageSandbox.sendServiceMsg({
                cmd: Xd
            }, this.window.rammerheadTop) : (this._notifyPrevActiveWindow(),
            this._activeWindow = this.window)
        }
        ,
        Qd);
        function Qd(e) {
            var t = zd.call(this) || this;
            return t._messageSandbox = e,
            t._isIframeWindow = !1,
            t._activeWindow = null,
            t._isActive = !1,
            t
        }
        function Jd() {
            return new se(function(e) {
                return b.setTimeout.call(window, e, 0)
            }
            )
        }
        var Zd, ef = Pe, tf = {
            bubbles: {
                focus: "focusin",
                blur: "focusout"
            },
            nonBubbles: {
                focusin: "focus",
                focusout: "blur"
            }
        }, rf = (e(nf, Zd = r),
        nf._getNativeMeth = function(e, t) {
            if (fo(e)) {
                if ("focus" === t)
                    return b.svgFocus;
                if ("blur" === t)
                    return b.svgBlur
            }
            return b[t]
        }
        ,
        nf._restoreElementScroll = function(e, t) {
            var r = Ar(e);
            r.left !== t.left && Mr(e, t.left),
            r.top !== t.top && Rr(e, t.top)
        }
        ,
        nf.prototype._onChangeActiveElement = function(e) {
            this._lastFocusedElement !== e && (this._lastFocusedElement && b.getAttribute.call(this._lastFocusedElement, a.focusPseudoClass) && b.removeAttribute.call(this._lastFocusedElement, a.focusPseudoClass),
            !lo(e) || Gn(e) && null === so(e) ? this._lastFocusedElement = null : (this._lastFocusedElement = e,
            b.setAttribute.call(e, a.focusPseudoClass, !0)))
        }
        ,
        nf.prototype._shouldUseLabelHtmlForElement = function(e, t) {
            return "focus" === t && !!e.htmlFor && !lo(e)
        }
        ,
        nf.prototype._getElementNonScrollableParentsScrollState = function(e) {
            for (var t = [], r = 0, n = Go(e); r < n.length; r++) {
                var o = n[r];
                "hidden" === l(o, "overflow") && t.push({
                    element: o,
                    state: Ar(o)
                })
            }
            return t
        }
        ,
        nf.prototype._restoreElementNonScrollableParentsScrollState = function(e) {
            for (var t = 0, r = e; t < r.length; t++) {
                var n = r[t];
                nf._restoreElementScroll(n.element, n.state)
            }
        }
        ,
        nf.prototype._saveScrollStateIfNecessary = function(e, t) {
            t && (this._scrollState.windowScroll = Ar(this.window)),
            S && (this._scrollState.elementNonScrollableParentsScrollState = this._getElementNonScrollableParentsScrollState(e))
        }
        ,
        nf.prototype._restoreScrollStateIfNecessary = function(e) {
            e && nf._restoreElementScroll(this.window, this._scrollState.windowScroll),
            S && this._restoreElementNonScrollableParentsScrollState(this._scrollState.elementNonScrollableParentsScrollState)
        }
        ,
        nf.prototype._restoreScrollStateAndRaiseEvent = function(e, t, r, n, o) {
            this._restoreScrollStateIfNecessary(n.preventScrolling);
            var i, s = En(e), a = ln(s), l = b.nodeParentNodeGetter.call(e), l = l === document ? null : Ho(l, "[tabindex]");
            "focus" === t && a !== e && l && n.forMouseEvent ? (i = Ne || Ie || S,
            this._raiseEvent(l, "focus", o, {
                preventScrolling: i,
                forMouseEvent: n.forMouseEvent
            })) : "blur" === t && a === e && e !== s.body ? this._raiseEvent(s.body, "focus", o, {
                withoutHandlers: !0
            }) : (ao(e) ? r : o)()
        }
        ,
        nf.prototype._raiseEvent = function(r, n, o, i) {
            function e() {
                var e, t;
                S && be < 12 ? s.window.setTimeout(function() {
                    s.window.setTimeout(function() {
                        delete r[nf.getInternalEventFlag(n)]
                    }, 0)
                }, 0) : delete r[nf.getInternalEventFlag(n)],
                i.withoutHandlers ? "focus" === n && ef && (e = function(e, t, r, n, o) {
                    n(),
                    o()
                }
                ,
                s._listeners.addInternalEventBeforeListener(window, ["focus"], e),
                s._eventSimulator.focus(r, i.relatedTarget),
                s._listeners.removeInternalEventBeforeListener(window, ["focus"], e)) : (e = tf.bubbles[n],
                t = xe || Ae && be < 17 && "blur" === n,
                i.isAsync ? (s._eventSimulator[e](r, i.relatedTarget),
                s._timersSandbox.deferFunction(function() {
                    return s._eventSimulator[n](r, i.relatedTarget)
                })) : t ? (s._eventSimulator[e](r, i.relatedTarget),
                s._eventSimulator[n](r, i.relatedTarget)) : (s._eventSimulator[n](r, i.relatedTarget),
                s._eventSimulator[e](r, i.relatedTarget))),
                o()
            }
            var s = this;
            if (r[n]) {
                if (this._saveScrollStateIfNecessary(r, i.preventScrolling),
                Yn(r) && this._shouldUseLabelHtmlForElement(r, n)) {
                    var t = b.getElementById.call(En(r), r.htmlFor);
                    if (!t)
                        return void o();
                    r = t
                }
                r[nf.getInternalEventFlag(n)] = !0,
                i.focusedOnChange || nf._getNativeMeth(r, n).call(r),
                Ie && 15 <= parseFloat(we) && i.preventScrolling ? Jd().then(function() {
                    s._restoreScrollStateAndRaiseEvent(r, n, o, i, e)
                }) : this._restoreScrollStateAndRaiseEvent(r, n, o, i, e)
            } else
                e()
        }
        ,
        nf.getInternalEventFlag = function(e) {
            return "hammerhead|event|internal-" + e
        }
        ,
        nf.getNonBubblesEventType = function(e) {
            return tf.nonBubbles[e]
        }
        ,
        nf.prototype.attach = function(e) {
            var t = this;
            Zd.prototype.attach.call(this, e),
            this._activeWindowTracker.attach(e),
            this._topWindow = bn(e, e.rammerheadTop) ? e : e.rammerheadTop,
            this._listeners.addInternalEventBeforeListener(e, ["focus", "blur"], function() {
                var e = ln(t.document);
                t._onChangeActiveElement(e)
            })
        }
        ,
        nf.prototype._raiseSelectionChange = function(e, t) {
            Ae && t && So(t) && this._eventSimulator.selectionchange(t),
            "function" == typeof e && e()
        }
        ,
        nf.prototype.focus = function(t, r, n, o, i, s) {
            var a = this
              , e = !i || Ne || !Fr(t)
              , l = (t[_.processedContext] || this.window).document;
            if (!l.defaultView)
                return null;
            if (!e || i && !Br(t, l))
                return null;
            function c() {
                v || x(t) || a._activeWindowTracker.makeCurrentWindowActive();
                var e = {
                    withoutHandlers: f || n,
                    isAsync: E,
                    forMouseEvent: o,
                    preventScrolling: s,
                    relatedTarget: h
                };
                a._raiseEvent(t, "focus", function() {
                    n || a._elementEditingWatcher.watchElementEditing(t),
                    p && u && ln(a._topWindow.document) !== u ? a._raiseEvent(u, "focus", function() {
                        return a._raiseSelectionChange(r, t)
                    }, {
                        withoutHandlers: !0,
                        isAsync: E
                    }) : a._raiseSelectionChange(r, t)
                }, e)
            }
            var p = Nn(t)
              , u = p ? pn(t) : null
              , e = En(t)
              , l = Gn(t)
              , h = ln()
              , d = En(h)
              , f = !1
              , m = !1
              , g = !1
              , y = Sn(t)
              , v = this._activeWindowTracker.isCurrentWindowActive()
              , f = h === t ? !(l && y && !v) : l && !(y || S)
              , E = !1;
            if (i && S) {
                if ((this._eventSimulator.isSavedWindowsEventsExists() || 10 < be) && this.window.event && "focus" === this.window.event.type && this.window.event.srcElement === t)
                    return this._raiseSelectionChange(r, t),
                    null;
                be < 12 && (E = !0)
            }
            return h && h.tagName && (h !== t && (e !== d && h === d.body ? m = !1 : h === e.body ? !n && S && (E ? this._timersSandbox.setTimeout.call(this.window, function() {
                return a._eventSimulator.blur(h)
            }, 0) : this._eventSimulator.blur(h)) : lo(t) && (m = !0)),
            g = e !== d && Nn(h, d)),
            g && !m ? S ? (this._eventSimulator.blur(pn(h)),
            c()) : this.blur(pn(h), c, !0, i) : m ? this.blur(h, function(e) {
                g ? a.blur(pn(h), c, !0, i) : e ? "function" == typeof r && r() : c()
            }, n, i, t) : c(),
            null
        }
        ,
        nf.prototype.blur = function(t, e, r, n, o) {
            var i = ln(En(t))
              , n = n && S && be < 12
              , s = !1
              , i = ((r = i !== t ? !0 : r) || (i = function(e) {
                s = b.eventTargetGetter.call(e) === t
            }
            ,
            ef && this._listeners.addInternalEventBeforeListener(window, ["focus"], i),
            this._elementEditingWatcher.processElementChanging(t),
            ef && this._listeners.removeInternalEventBeforeListener(window, ["focus"], i),
            this._elementEditingWatcher.stopWatching(t)),
            {
                withoutHandlers: r,
                isAsync: n,
                relatedTarget: o,
                focusedOnChange: s
            });
            this._raiseEvent(t, "blur", function() {
                "function" == typeof e && e(s)
            }, i)
        }
        ,
        nf.prototype.dispose = function() {
            this._lastFocusedElement = null
        }
        ,
        nf);
        function nf(e, t, r, n, o) {
            var i = Zd.call(this) || this;
            return i._listeners = e,
            i._eventSimulator = t,
            i._timersSandbox = n,
            i._topWindow = null,
            i._lastFocusedElement = null,
            i._scrollState = {},
            i._activeWindowTracker = new Yd(r),
            i._elementEditingWatcher = o,
            i
        }
        e(af, of = r),
        af._setHoverMarker = function(e, t) {
            for (t && b.setAttribute.call(t, a.hoverPseudoClass, ""); e && e.tagName && e !== t; ) {
                b.setAttribute.call(e, a.hoverPseudoClass, "");
                var r = Jo(e);
                r && b.setAttribute.call(r, a.hoverPseudoClass, ""),
                e = b.nodeParentNodeGetter.call(e)
            }
        }
        ,
        af.prototype._clearHoverMarkerUntilJointParent = function(e) {
            var t = null;
            if (this._lastHoveredElement) {
                for (var r = this._lastHoveredElement; r && r.tagName && r.contains; ) {
                    var n = Jo(r);
                    if (n && b.removeAttribute.call(n, a.hoverPseudoClass),
                    r.contains(e)) {
                        t = r;
                        break
                    }
                    b.removeAttribute.call(r, a.hoverPseudoClass),
                    r = b.nodeParentNodeGetter.call(r)
                }
                t && b.removeAttribute.call(t, a.hoverPseudoClass)
            }
            return t
        }
        ,
        af.prototype._onHover = function(e) {
            var t = b.eventTargetGetter.call(e)
              , r = e.clientX
              , e = e.clientY;
            S && Du(t, r, e) || this._hover(t)
        }
        ,
        af.prototype._hover = function(e) {
            var t;
            this._hoverElementFixed || x(e) || (t = this._clearHoverMarkerUntilJointParent(e),
            af._setHoverMarker(e, t),
            this._lastHoveredElement = e)
        }
        ,
        af.prototype.fixHoveredElement = function() {
            this._hoverElementFixed = !0
        }
        ,
        af.prototype.freeHoveredElement = function() {
            this._hoverElementFixed = !1
        }
        ,
        af.prototype.attach = function(e) {
            var t = this;
            of.prototype.attach.call(this, e),
            this._listeners.addInternalEventBeforeListener(e, ["mouseover", "touchstart"], function(e) {
                return t._onHover(e)
            })
        }
        ,
        af.prototype.dispose = function() {
            this._lastHoveredElement = null
        }
        ;
        var of, sf = af;
        function af(e) {
            var t = of.call(this) || this;
            return t._listeners = e,
            t._hoverElementFixed = !1,
            t._lastHoveredElement = null,
            t
        }
        cf.prototype.setSelection = function(e, t, r, n) {
            e.setSelectionRange ? e.setSelectionRange(t, r, n) : (e.selectionStart = t,
            e.selectionEnd = r)
        }
        ,
        cf.prototype.getSelection = function(e) {
            var t = e[_.selection];
            return {
                start: (t || e).selectionStart,
                end: (t || e).selectionEnd,
                direction: (t || e).selectionDirection
            }
        }
        ,
        cf.prototype.wrapSetterSelection = function(t, e, r, n) {
            function o(e) {
                b.eventTargetGetter.call(e) !== t && "none" !== t.style.display || (l = !0)
            }
            var i = this
              , s = En(t)
              , a = ln(s)
              , l = !1;
            return (r = r && a !== t) && this.listeners.addInternalEventBeforeListener(document, ["focus"], o),
            Mh.beforeDispatchEvent(t),
            Mh.beforeDispatchEvent(t),
            e = e(),
            Mh.afterDispatchEvent(t),
            Mh.afterDispatchEvent(t),
            r && ((a = ln(s)) !== t && (Ne || Ae && 17 < be) && (l && (t[rf.getInternalEventFlag("focus")] = !0),
            t.focus()),
            xe ? this.timersSandbox.setTimeout.call(window, function() {
                i.timersSandbox.setTimeout.call(window, function() {
                    i.listeners.removeInternalEventBeforeListener(document, ["focus"], o),
                    l || i.eventSimulator.focus(t)
                }, 0)
            }, 0) : (this.listeners.removeInternalEventBeforeListener(document, ["focus"], o),
            l || (n && Te ? this.focusBlurSandbox.focus(t, null, !0, !1, !0) : this.eventSimulator.focus(t)))),
            e
        }
        ;
        var lf = cf;
        function cf(e) {
            this.focusBlurSandbox = e.focusBlur,
            this.timersSandbox = e.timers,
            this.listeners = e.listeners,
            this.eventSimulator = e.eventSimulator;
            var c = this
              , p = this.eventSimulator
              , o = this.listeners
              , i = this.timersSandbox;
            this.setSelectionRangeWrapper = function() {
                function e() {
                    var t, e = Qo(s), r = s.type;
                    e && s.setAttribute("type", "text");
                    try {
                        t = a.call(s, n, o, i)
                    } catch (e) {
                        t = a.call(s, 0, 0, i)
                    }
                    return e && (s[_.selection] = {
                        selectionStart: s.selectionStart,
                        selectionEnd: s.selectionEnd,
                        selectionDirection: s.selectionDirection
                    },
                    s.setAttribute("type", r),
                    l && (c.focusBlurSandbox.blur(s, null, !0),
                    c.focusBlurSandbox.focus(s, null, !0),
                    ln(En(s)) !== s && c.focusBlurSandbox.focus(s, null, !0))),
                    Ae && p.selectionchange(s),
                    t
                }
                var n = arguments[0]
                  , o = arguments[1]
                  , i = arguments[2] || "none"
                  , s = this
                  , a = Qn(s) ? b.textAreaSetSelectionRange : b.setSelectionRange
                  , t = ln(En(s))
                  , r = En(s)
                  , l = !1;
                if (t === s)
                    return l = !0,
                    e();
                t = xe || Ae && (17 === be && !r.hasFocus() || 17 < be);
                return c.wrapSetterSelection(s, e, t)
            }
            ,
            this.selectWrapper = function() {
                var t = this.parentElement();
                if (!t || ln(En(t)) === t)
                    return b.select.call(this);
                function e(e) {
                    b.eventTargetGetter.call(e) !== t && "none" !== t.style.display || (n = !0)
                }
                var r, n = !1;
                return o.addInternalEventBeforeListener(document, ["focus"], e),
                r = b.select.call(this),
                i.setTimeout.call(window, function() {
                    i.setTimeout.call(window, function() {
                        o.removeInternalEventBeforeListener(document, ["focus"], e),
                        n || p.focus(t)
                    }, 0)
                }, 0),
                r
            }
        }
        var pf = "string"
          , uf = "file"
          , hf = function(t, e, r) {
            b.objectDefineProperty(this, "kind", {
                enumerable: !0,
                get: function() {
                    return t
                }
            }),
            b.objectDefineProperty(this, "type", {
                enumerable: !0,
                get: function() {
                    return e
                }
            }),
            b.objectDefineProperty(this, "getAsString", {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return function(e) {
                        if (!arguments.length)
                            throw new Error("Failed to execute 'getAsString' on 'DataTransferItem': 1 argument required, but only 0 present.");
                        "function" == typeof e && t === pf && b.setTimeout.call(window, function() {
                            return e(r)
                        }, 0)
                    }
                }
            }),
            b.objectDefineProperty(this, "getAsFile", {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return function() {
                        return t !== uf ? null : r
                    }
                }
            })
        };
        b.DataTransferItem && (hf.prototype = b.DataTransferItem.prototype);
        var df = "readwrite"
          , ff = "readonly"
          , mf = "protected";
        function gf(e) {
            return "text" === e ? "text/plain" : "url" === e ? "text/uri-list" : e
        }
        var yf = function(r) {
            function t() {
                for (var e = [], t = 0, r = c; t < r.length; t++) {
                    var n = r[t];
                    e.push(n.type)
                }
                return e
            }
            function s() {
                for (var e = 0; void 0 !== c[e] || void 0 !== o[e]; ) {
                    var t = c[e];
                    b.objectDefineProperty(o, e, {
                        enumerable: void 0 !== t,
                        configurable: !0,
                        value: t
                    }),
                    e++
                }
            }
            function a(e) {
                for (var t = !1, r = ("url" === (e = gf(e)) && (t = !0),
                ""), n = 0; n < c.length; n++)
                    c[n].type === e && (r = p[n]);
                return r = t && r ? function(e) {
                    var t = [];
                    if ("" === (e = e.replace(/\r\n$/, "")))
                        return t;
                    for (var r = 0, n = e = e.split(/\r\n/); r < n.length; r++) {
                        var o = n[r];
                        "#" !== o && t.push(o)
                    }
                    return t
                }(r)[0] : r
            }
            function l(e) {
                e = gf(e);
                for (var t = 0; t < c.length; t++)
                    if (c[t].type === e) {
                        c.splice(t, 1),
                        p.splice(t, 1);
                        break
                    }
                s()
            }
            function n(e, t, r) {
                var n = null;
                if ("string" == typeof e) {
                    var o = t.toString().toLowerCase()
                      , i = a(o);
                    if (!r && i)
                        throw new Error("Failed to execute 'add' on 'DataTransferItemList': An item already exists for type '" + o + "'.");
                    i && l(o),
                    n = new hf(pf,gf(t),e)
                } else
                    n = new hf(uf,null,e);
                return c.push(n),
                p.push(e),
                s(),
                n
            }
            var o = this
              , c = []
              , p = [];
            this.getAndHideInternalMethods = function() {
                var e = {
                    getTypes: t,
                    getItemData: a,
                    removeItem: l,
                    addItem: n
                };
                return delete o.getAndHideInternalMethods,
                e
            }
            ,
            b.objectDefineProperty(this, "length", {
                enumerable: !0,
                get: function() {
                    return c.length
                }
            }),
            b.objectDefineProperty(this, "remove", {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return function(e) {
                        r.mode === df && (c.splice(e, 1),
                        p.splice(e, 1),
                        s())
                    }
                }
            }),
            b.objectDefineProperty(this, "clear", {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return function() {
                        r.mode === df && (c = [],
                        p = [],
                        s())
                    }
                }
            }),
            b.objectDefineProperty(this, "add", {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return function(e, t) {
                        if (!arguments.length)
                            throw new Error("Failed to execute 'add' on 'DataTransferItemList': 1 argument required, but only 0 present.");
                        if (1 === arguments.length && "string" == typeof e)
                            throw new Error("Failed to execute 'add' on 'DataTransferItemList': parameter 1 is not of type 'File'.");
                        if (r.mode === df)
                            return n(e, t, !1)
                    }
                }
            })
        }
          , vf = (b.DataTransferItemList && (yf.prototype = b.DataTransferItemList.prototype),
        function() {
            b.objectDefineProperty(this, "length", {
                enumerable: !0,
                get: function() {
                    return 0
                }
            }),
            b.objectDefineProperty(this, "item", {
                enumerable: !0,
                get: function() {
                    return function() {}
                }
            })
        }
        )
          , Ef = (b.FileList && (vf.prototype = b.FileList.prototype),
        {
            none: "none",
            copy: "copy",
            link: "link",
            move: "move"
        })
          , Sf = {
            uninitialized: "uninitialized",
            none: "none",
            copy: "copy",
            copyLink: "copyLink",
            copyMove: "copyMove",
            link: "link",
            linkMove: "linkMove",
            move: "move",
            all: "all"
        }
          , _f = function(r) {
            function t() {
                return r.mode === mf ? l : s
            }
            var n = Ef.none
              , o = Sf.uninitialized
              , i = new yf(r)
              , s = i.getAndHideInternalMethods()
              , e = new vf
              , a = new yf(r)
              , l = a.getAndHideInternalMethods();
            b.objectDefineProperty(this, "dropEffect", {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return n
                },
                set: function(e) {
                    return Ef[e] && (n = Ef[e]),
                    e
                }
            }),
            b.objectDefineProperty(this, "effectAllowed", {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return o
                },
                set: function(e) {
                    return Sf[e] && (o = Sf[e]),
                    e
                }
            }),
            xe || b.objectDefineProperty(this, "items", {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return r.mode === mf ? a : i
                }
            }),
            b.objectDefineProperty(this, "types", {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return t().getTypes()
                }
            }),
            b.objectDefineProperty(this, "files", {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return e
                }
            }),
            xe || (this.setDragImage = function() {}
            ),
            this.getData = function(e) {
                if (arguments.length)
                    return e = e.toString().toLowerCase(),
                    t().getItemData(e);
                throw new Error("Failed to execute 'getData' on 'DataTransfer': 1 argument required, but only 0 present.")
            }
            ,
            this.setData = function(e, t) {
                if (arguments.length < 2)
                    throw new Error("Failed to execute 'setData' on 'DataTransfer': 2 argument required, but only " + arguments.length + " present.");
                r.mode === df && (e = e.toString().toLowerCase(),
                s.addItem(t, e, !0))
            }
            ,
            this.clearData = function(e) {
                r.mode === df && (void 0 === e ? i.clear() : s.removeItem(e))
            }
        }
          , bf = (yr && (_f.prototype = b.DataTransfer.prototype),
        wf.prototype.setReadOnlyMode = function() {
            this.mode = ff
        }
        ,
        wf.prototype.setProtectedMode = function() {
            this.mode = mf
        }
        ,
        wf);
        function wf() {
            this.mode = df
        }
        e(Tf, xf = r),
        Tf.prototype._createOverriddenMethods = function() {
            var e = this.selection
              , t = this.focusBlur
              , r = this.eventSimulator
              , n = this;
            this._overriddenMethods = {
                dispatchEvent: function() {
                    if (!window)
                        return null;
                    Mh.beforeDispatchEvent(this);
                    var e = (xe && co(this) ? b.windowDispatchEvent : b.dispatchEvent).apply(this, arguments);
                    return Mh.afterDispatchEvent(this),
                    e
                },
                click: function() {
                    if (!window)
                        return null;
                    Mh.beforeDispatchEvent(this);
                    var e = r.nativeClick(this, b.click);
                    return Mh.afterDispatchEvent(this),
                    e
                },
                setSelectionRange: function() {
                    return window ? e.setSelectionRangeWrapper.apply(this, arguments) : null
                },
                select: function() {
                    return window ? e.selectWrapper.call(this) : null
                },
                focus: function() {
                    return window ? t.focus(this, null, !1, !1, !0) : null
                },
                blur: function() {
                    return window ? t.blur(this, null, !1, !0) : null
                },
                preventDefault: function() {
                    return window ? (n.emit(n.EVENT_PREVENTED_EVENT, this),
                    b.preventDefault.call(this)) : null
                }
            }
        }
        ,
        Tf.prototype._createInternalHandlers = function() {
            var r = this._shadowUI
              , n = this.document
              , s = this.eventSimulator;
            this._onFocus = function(e) {
                var e = b.eventTargetGetter.call(e)
                  , t = ln(n);
                x(e) || x(t) || r.setLastActiveElement(t)
            }
            ,
            this._cancelInternalEvents = function(e, t, r, n, o) {
                var i = rf.getNonBubblesEventType(e.type) || e.type
                  , i = rf.getInternalEventFlag(i);
                b.eventTargetGetter.call(e)[i] && !e[s.DISPATCHED_EVENT_FLAG] && o()
            }
        }
        ,
        Tf.prototype._preventInputNativeDialogs = function(e) {
            (Te || S) && this.listeners.addInternalEventBeforeListener(e, ["click"], function(e, t) {
                t && ro(b.eventTargetGetter.call(e)) && $p(e, !0)
            })
        }
        ,
        Tf.prototype.attach = function(e) {
            xf.prototype.attach.call(this, e),
            f(e.HTMLInputElement.prototype, "setSelectionRange", this._overriddenMethods.setSelectionRange),
            f(e.HTMLTextAreaElement.prototype, "setSelectionRange", this._overriddenMethods.setSelectionRange),
            xe ? (f(e.Window.prototype, "dispatchEvent", this._overriddenMethods.dispatchEvent),
            f(e.Document.prototype, "dispatchEvent", this._overriddenMethods.dispatchEvent),
            f(e.HTMLElement.prototype, "dispatchEvent", this._overriddenMethods.dispatchEvent),
            f(e.SVGElement.prototype, "dispatchEvent", this._overriddenMethods.dispatchEvent)) : f(e.EventTarget.prototype, "dispatchEvent", this._overriddenMethods.dispatchEvent),
            f(e.HTMLElement.prototype, "focus", this._overriddenMethods.focus),
            f(e.HTMLElement.prototype, "blur", this._overriddenMethods.blur),
            f(e.HTMLElement.prototype, "click", this._overriddenMethods.click),
            f(e.Event.prototype, "preventDefault", this._overriddenMethods.preventDefault),
            e.Window.focus = this._overriddenMethods.focus,
            de(e.Window.focus, b.focus),
            e.Window.blur = this._overriddenMethods.blur,
            de(e.Window.blur, b.blur),
            e.TextRange && e.TextRange.prototype.select && f(e.TextRange.prototype, "select", this._overriddenMethods.select),
            this.listeners.initElementListening(document, Xp),
            this.listeners.initElementListening(e, Xp.concat(["load", "beforeunload", "pagehide", "unload", "message"])),
            this.listeners.addInternalEventBeforeListener(e, ["focus"], this._onFocus),
            this.listeners.addInternalEventBeforeListener(e, ["focus", "blur", "change", "focusin", "focusout"], this._cancelInternalEvents),
            this._preventInputNativeDialogs(e),
            this.unload.attach(e),
            this.message.attach(e),
            this.timers.attach(e),
            this.focusBlur.attach(e),
            this.hover.attach(e)
        }
        ,
        Tf.prototype.reattach = function(e) {
            this.listeners.restartElementListening(e.document),
            this.listeners.restartElementListening(e)
        }
        ;
        var xf, Cf = Tf;
        function Tf(e, t, r, n, o, i, s) {
            var a = xf.call(this) || this;
            return a._shadowUI = i,
            a.EVENT_PREVENTED_EVENT = "hammerhead|event|event-prevented",
            a.listeners = e,
            a.elementEditingWatcher = r,
            a.unload = n,
            a.timers = s,
            a.eventSimulator = t,
            a.focusBlur = new rf(e,t,o,s,r),
            a.selection = new lf(a),
            a.hover = new sf(e),
            a._shadowUI = i,
            a.message = o,
            a.DataTransfer = _f,
            a.DragDataStore = bf,
            a._overriddenMethods = null,
            a._onFocus = null,
            a._cancelInternalEvents = null,
            a._createOverriddenMethods(),
            a._createInternalHandlers(),
            a
        }
        function Af(e) {
            for (var t = [], r = 1; r < arguments.length; r++)
                t[r - 1] = arguments[r];
            var n, o;
            "object" != typeof (e = e || {}) && "[object Function]" !== e.toString() && (e = {});
            for (var i = 0; i < t.length; i++)
                if (null !== (n = t[i]))
                    for (var s in n)
                        o = n[s],
                        e !== o && void 0 !== o && (e[s] = o);
            return e
        }
        var Pf, If = -1, Nf = {
            click: S ? 0 : 1,
            dblclick: S ? 0 : 2,
            mousedown: 1,
            mouseup: 1
        }, Of = /^key\w+$/, Lf = /^((mouse\w+)|((dbl)?click)|(contextmenu)|(drag\w*)|(drop))$/, kf = /^touch\w+$/, Df = /^focus(in|out)$/, Mf = ["mouseover", "mouseenter", "mouseout"], Rf = {
            mousedown: "pointerdown",
            mouseup: "pointerup",
            mousemove: "pointermove",
            mouseover: "pointerover",
            mouseenter: "pointerenter",
            mouseout: "pointerout"
        }, jf = {
            touchstart: "pointerdown",
            touchend: "pointerup",
            touchmove: "pointermove"
        }, Hf = [Bn, Fn, jn, Un, Jn, Zn, Qn], Bf = (M._dispatchStorageEvent = function(e, t) {
            var r = b.documentCreateEvent.call(document, "StorageEvent");
            return r.initStorageEvent("storage", t.canBubble, t.cancelable, t.key, t.oldValue, t.newValue, t.url, null),
            b.objectDefineProperty(r, "storageArea", {
                get: function() {
                    return t.storageArea
                },
                configurable: !0
            }),
            null === t.key && b.objectDefineProperty(r, "key", {
                get: function() {
                    return null
                },
                configurable: !0
            }),
            e.dispatchEvent(r)
        }
        ,
        M.prototype._dispatchTouchEvent = function(e, t) {
            if (Du(e, t.clientX, t.clientY))
                return !0;
            var r = b.documentCreateEvent.call(document, "TouchEvent");
            return r.initTouchEvent ? Se ? r.initTouchEvent(t.type, t.canBubble, t.cancelable, t.view, t.detail, t.screenX, t.screenY, t.pageX, t.pageY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, t.touches, t.targetTouches, t.changedTouches, void 0 === t.scale ? 1 : t.scale, void 0 === t.rotation ? 0 : t.rotation) : 12 === r.initTouchEvent.length ? r.initTouchEvent(t.type, t.canBubble, t.cancelable, t.view, t.detail, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, t.touches, t.targetTouches, t.changedTouches) : r.initTouchEvent(t.touches, t.targetTouches, t.changedTouches, t.type, t.view, t.screenX, t.screenY, t.pageX - t.view.pageXOffset, t.pageY - t.view.pageYOffset, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey) : r = new b.WindowTouchEvent(t.type,{
                touches: t.touches,
                targetTouches: t.targetTouches,
                changedTouches: t.changedTouches,
                ctrlKey: t.ctrlKey,
                altKey: t.altKey,
                shiftKey: t.shiftKey,
                metaKey: t.metaKey,
                bubbles: t.canBubble,
                cancelable: t.cancelable,
                cancelBubble: !1,
                defaultPrevented: !1,
                detail: t.detail,
                view: t.view
            }),
            tu && this._dispatchPointerEvent(e, t),
            e.dispatchEvent(r)
        }
        ,
        M._getUIEventArgs = function(e, t) {
            var r = "detail"in (t = void 0 === t ? {} : t) ? t.detail : Nf[e];
            return {
                type: e,
                composed: t.composed,
                canBubble: !1 !== t.canBubble,
                cancelable: !1 !== t.cancelable,
                view: t.view || window,
                detail: r || 0,
                ctrlKey: t.ctrlKey || !1,
                altKey: t.altKey || !1,
                shiftKey: t.shiftKey || !1,
                metaKey: t.metaKey || !1
            }
        }
        ,
        M._getStorageEventArgs = function(e) {
            return Af(e = void 0 === e ? {} : e, {
                canBubble: !1 !== e.canBubble,
                cancelable: !1 !== e.cancelable
            })
        }
        ,
        M._getMouseEventArgs = function(e, t) {
            return Af(M._getUIEventArgs(e, t = void 0 === t ? {} : t), {
                screenX: t.screenX || 0,
                screenY: t.screenY || 0,
                clientX: t.clientX || 0,
                clientY: t.clientY || 0,
                button: void 0 === t.button ? Wp.left : t.button,
                buttons: void 0 === t.buttons ? qp.leftButton : t.buttons,
                relatedTarget: t.relatedTarget || null,
                which: t.which
            })
        }
        ,
        M._getKeyEventArgs = function(e, t) {
            var r = {
                keyCode: t.keyCode || 0,
                charCode: t.charCode || 0,
                which: "press" === e ? t.charCode : t.keyCode
            };
            return "keyIdentifier"in t && (r.keyIdentifier = t.keyIdentifier),
            "key"in t && (r.key = t.key),
            Af(M._getUIEventArgs(e, t), r)
        }
        ,
        M._getModifiersAsString = function(e) {
            var t, r = "";
            for (t in zp)
                b.objectHasOwnProperty.call(zp, t) && e[t] && (r += zp[t] + " ");
            return r
        }
        ,
        M._prepareMouseEventOptions = function(e) {
            var t = void 0 === (e = void 0 === e ? {} : e).buttons ? qp.noButton : e.buttons
              , r = Wp.left;
            return e.buttons = t,
            e.button = e.button || r,
            Ne && (e.which = Kp.leftButton,
            e.buttons === qp.noButton && (e.which = Kp.noButton),
            e.buttons === qp.rightButton && (e.which = Kp.rightButton)),
            e
        }
        ,
        M._isDisabled = function(e) {
            return e && e.hasAttribute && b.hasAttribute.call(e, "disabled")
        }
        ,
        M.prototype._simulateEvent = function(e, t, r, n) {
            var o = this
              , i = (void 0 === n && (n = {}),
            null)
              , s = null
              , a = "click" === t && Po(e)
              , a = Af(r ? {
                clientX: r.clientX,
                clientY: r.clientY,
                screenX: r.screenX,
                screenY: r.screenY,
                altKey: !a && r.alt,
                shiftKey: !a && r.shift,
                ctrlKey: !a && r.ctrl,
                metaKey: r.meta,
                button: r.button,
                which: r.which,
                buttons: r.buttons,
                relatedTarget: r.relatedTarget
            } : {}, n);
            return a.composed = eu(t),
            a.relatedTarget || (a.relatedTarget = document.body),
            "storage" === t ? (a = Af(a, r),
            i = M._getStorageEventArgs(a),
            s = M._dispatchStorageEvent) : Lf.test(t) ? (r && void 0 !== r.button && (a = Af(a, {
                button: r.button
            })),
            i = M._getMouseEventArgs(t, a),
            s = function(e, t) {
                return o._dispatchMouseRelatedEvents(e, t, r)
            }
            ) : Of.test(t) ? (!r || void 0 === r.keyCode && void 0 === r.charCode || (a = Af(a, {
                key: r.key || void 0,
                keyCode: r.keyCode || 0,
                charCode: r.charCode || 0
            }),
            "keyIdentifier"in r && (a.keyIdentifier = r.keyIdentifier),
            "key"in r && (a.key = r.key)),
            i = M._getKeyEventArgs(t, a),
            s = function(e, t) {
                return o._dispatchKeyEvent(e, t)
            }
            ) : kf.test(t) && (i = this._getTouchEventArgs(t, Af(a, {
                target: e
            })),
            s = function(e, t) {
                return o._dispatchTouchEvent(e, t)
            }
            ),
            s(e, i)
        }
        ,
        M.prototype._getTouchEventArgs = function(e, t) {
            e = Af(M._getUIEventArgs(e, t = void 0 === t ? {} : t), {
                screenX: t.screenX || 0,
                screenY: t.screenY || 0,
                clientX: t.clientX || 0,
                clientY: t.clientY || 0,
                pageX: t.clientX || 0,
                pageY: t.clientY || 0,
                identifier: this._getTouchIdentifier(e)
            });
            return b.documentCreateTouch ? e.touch = Se ? b.documentCreateTouch.call(document, e.view, t.target, e.identifier, e.clientX, e.clientY, 0, 0) : b.documentCreateTouch.call(document, e.view, t.target, e.identifier, e.pageX, e.pageY, e.screenX, e.screenY, e.clientX, e.clientY, null, null, void 0 === e.rotation ? 0 : e.rotation) : e.touch = new b.WindowTouch({
                identifier: e.identifier,
                target: t.target,
                clientX: e.clientX,
                clientY: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY,
                screenX: e.screenX,
                screenY: e.screenY,
                rotationAngle: 0,
                radiusX: 25,
                radiusY: 25,
                force: .5
            }),
            e.changedTouches = [e.touch],
            e.touches = "touchend" === e.type ? [] : e.changedTouches,
            b.documentCreateTouchList && (e.changedTouches = (t = b.documentCreateTouchList).call.apply(t, le([document], e.changedTouches)),
            e.touches = (t = b.documentCreateTouchList).call.apply(t, le([document], e.touches))),
            e.targetTouches = e.touches,
            e
        }
        ,
        M.prototype._getTouchIdentifier = function(e) {
            return "touchstart" === e && this.touchIdentifier++,
            this.touchIdentifier
        }
        ,
        M.prototype._raiseNativeClick = function(e, t) {
            var r = Nn(e) && pn(e)
              , r = r ? b.contentWindowGetter.call(r) : window
              , n = r.event;
            xe && delete r.event,
            t.call(e),
            xe && n && b.objectDefineProperty(r, "event", {
                get: function() {
                    return n
                },
                configurable: !0
            })
        }
        ,
        M.prototype._dispatchKeyEvent = function(e, t) {
            var r, n, o, i = null;
            return this.browserWithNewEventsStyle && b.WindowKeyboardEvent ? (o = {
                bubbles: t.canBubble,
                composed: t.composed,
                cancelable: t.cancelable,
                cancelBubble: !1,
                defaultPrevented: !1,
                view: t.view,
                detail: t.detail,
                ctrlKey: t.ctrlKey,
                altKey: t.altKey,
                shiftKey: t.shiftKey,
                metaKey: t.metaKey,
                keyCode: t.keyCode,
                charCode: t.charCode,
                which: t.which
            },
            "keyIdentifier"in t && (o.keyIdentifier = t.keyIdentifier),
            "key"in t && (o.key = t.key),
            i = new b.WindowKeyboardEvent(t.type,o)) : b.documentCreateEvent && (i = b.documentCreateEvent.call(document, "KeyboardEvent")).initKeyboardEvent(t.type, t.canBubble, t.cancelable, t.view, "", 0, M._getModifiersAsString(t), !1, ""),
            i ? (b.objectDefineProperty(i, "keyCode", {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return t.keyCode
                }
            }),
            b.objectDefineProperty(i, "charCode", {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return t.charCode
                }
            }),
            b.objectDefineProperty(i, "which", {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return t.which
                }
            }),
            "key"in t && b.objectDefineProperty(i, "key", {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return t.key
                }
            }),
            "keyIdentifier"in t && b.objectDefineProperty(i, "keyIdentifier", {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return t.keyIdentifier
                }
            }),
            n = !(r = !1),
            this.browserWithNewEventsStyle && (i.preventDefault = function() {
                return r = !0,
                b.preventDefault.call(i),
                !1
            }
            ),
            Ae && b.objectDefineProperty(i, "returnValue", {
                get: function() {
                    return n
                },
                set: function(e) {
                    !1 === e && i.preventDefault(),
                    n = e
                }
            }),
            o = this._raiseDispatchEvent(e, i),
            Ae ? n && !r : S ? o : !r) : null
        }
        ,
        M.prototype._getPointerEventTypeInfo = function(e) {
            return Rf[e] ? {
                eventType: Rf[e],
                pointerType: "mouse"
            } : jf[e] ? {
                eventType: jf[e],
                pointerType: "touch"
            } : null
        }
        ,
        M.prototype._dispatchPointerEvent = function(e, t) {
            var r, n, o, i, s = this._getPointerEventTypeInfo(t.type);
            s && (r = s.eventType,
            s = s.pointerType,
            n = null,
            o = ju(e),
            i = xr(e),
            o = Hu({
                x: o.left + i.left,
                y: o.top + i.top
            }),
            (i = Af({
                width: 1,
                height: 1,
                pressure: 0,
                tiltX: 0,
                tiltY: 0,
                pointerId: 1,
                pointerType: s,
                timeStamp: b.dateNow(),
                isPrimary: !0
            }, t)).type = r,
            i.offsetX = t.clientX - o.x,
            i.offsetY = t.clientY - o.y,
            "mousemove" !== t.type && "mouseover" !== t.type && "mouseout" !== t.type || (i.button = t.buttons === qp.noButton ? If : i.button),
            xe ? (i.rotation = 0,
            (n = b.documentCreateEvent.call(document, "PointerEvent")).initPointerEvent(i.type, i.canBubble, i.cancelable, window, i.detail, i.screenX, i.screenY, i.clientX, i.clientY, i.ctrlKey, i.altKey, i.shiftKey, i.metaKey, i.button, null, i.offsetX, i.offsetY, i.width, i.height, i.pressure, i.rotation, i.tiltX, i.tiltY, i.pointerId, i.pointerType, i.timeStamp, i.isPrimary),
            b.objectDefineProperty(n, "target", {
                get: function() {
                    return e
                },
                configurable: !0
            }),
            b.objectDefineProperty(n, "relatedTarget", {
                get: function() {
                    return t.relatedTarget
                },
                configurable: !0
            }),
            b.objectDefineProperty(n, "buttons", {
                get: function() {
                    return t.buttons
                }
            })) : (i.bubbles = !0,
            i.cancelable = !0,
            n = new b.WindowPointerEvent(r,i)),
            this._raiseDispatchEvent(e, n))
        }
        ,
        M.prototype._elementCanBeDisabled = function(e) {
            for (var t = 0, r = Hf; t < r.length; t++)
                if ((0,
                r[t])(e))
                    return !0;
            return !1
        }
        ,
        M.prototype._dispatchMouseRelatedEvents = function(e, t, r) {
            return void 0 === r && (r = {}),
            !("mouseover" === t.type || "mouseenter" === t.type || !Du(e, t.clientX, t.clientY)) || (!S || "click" !== t.type && "mouseup" !== t.type && "mousedown" !== t.type || (o = Ho(n = b.nodeParentNodeGetter.call(e), "button"),
            n && o && "submit" === b.getAttribute.call(o, "type") && (e = o)),
            !tu || gr && !Mf.includes(t.type) || this._dispatchPointerEvent(e, t),
            this._dispatchMouseEvent(e, t, r));
            var n, o
        }
        ,
        M.prototype._dispatchMouseEvent = function(e, t, r) {
            var n = this
              , o = r.dataTransfer
              , i = r.timeStamp;
            if (qo(e, !1, function(e) {
                return n._elementCanBeDisabled(e) && M._isDisabled(e)
            }) && this._elementCanBeDisabled(e) || M._isDisabled(e) && this._elementCanBeDisabled(e))
                return null;
            r = null;
            return this.browserWithNewEventsStyle && b.WindowMouseEvent ? r = new b.WindowMouseEvent(t.type,{
                bubbles: t.canBubble,
                composed: t.composed,
                cancelable: t.cancelable,
                view: window,
                detail: t.detail,
                screenX: t.screenX,
                screenY: t.screenY,
                clientX: t.clientX,
                clientY: t.clientY,
                ctrlKey: t.ctrlKey,
                altKey: t.altKey,
                shiftKey: t.shiftKey,
                metaKey: t.metaKey,
                button: t.button,
                buttons: t.buttons,
                relatedTarget: t.relatedTarget
            }) : ((r = b.documentCreateEvent.call(document, "MouseEvents")).initMouseEvent(t.type, t.canBubble, t.cancelable, window, t.detail, t.screenX, t.screenY, t.clientX, t.clientY, t.ctrlKey, t.altKey, t.shiftKey, t.metaKey, t.button, t.relatedTarget),
            b.objectDefineProperty(r, "buttons", {
                get: function() {
                    return t.buttons
                }
            })),
            void 0 !== t.which && Ne && b.objectDefineProperty(r, "which", {
                get: function() {
                    return t.which
                }
            }),
            i && !S && b.objectDefineProperty(r, "timeStamp", {
                get: function() {
                    return i
                }
            }),
            o && b.objectDefineProperty(r, "dataTransfer", {
                configurable: !0,
                enumerable: !0,
                get: function() {
                    return o
                }
            }),
            this._raiseDispatchEvent(e, r)
        }
        ,
        M.prototype._dispatchFocusEvent = function(e, t, r) {
            void 0 === r && (r = null);
            var n = null
              , o = Df.test(t);
            return this.browserWithNewEventsStyle && b.WindowFocusEvent ? n = new b.WindowFocusEvent(t,{
                bubbles: o,
                composed: eu(t),
                cancelable: !1,
                cancelBubble: !1,
                relatedTarget: r,
                defaultPrevented: !1
            }) : b.documentCreateEvent && (n = b.documentCreateEvent.call(document, "FocusEvent")).initFocusEvent(t, o, !0, null, 0, o ? r : null),
            n ? (n[this.DISPATCHED_EVENT_FLAG] = !0,
            this._raiseDispatchEvent(e, n)) : null
        }
        ,
        M.prototype._dispatchTextEvent = function(e, t) {
            var r;
            return b.WindowTextEvent && b.documentCreateEvent ? (r = b.documentCreateEvent.call(document, "TextEvent"),
            t = {
                eventType: xe ? "textinput" : "textInput",
                bubbles: !0,
                cancelable: !0,
                view: window,
                data: t,
                inputMethod: 1,
                locale: navigator.language
            },
            r.initTextEvent(t.eventType, t.bubbles, t.cancelable, t.view, t.data, t.inputMethod, t.locale),
            this._raiseDispatchEvent(e, r)) : null
        }
        ,
        M.prototype._dispatchInputEvent = function(e, t, r) {
            if (!b.WindowInputEvent)
                return this._dispatchEvent(e, t, !0);
            var n = {
                bubbles: !0,
                composed: eu(t),
                cancelable: !0,
                view: window,
                inputType: "insertText"
            }
              , r = (void 0 !== r && (n.data = r),
            new b.WindowInputEvent(t,n));
            return this._raiseDispatchEvent(e, r)
        }
        ,
        M.prototype._dispatchEvent = function(e, t, r, n) {
            var o = null;
            return b.documentCreateEvent && (o = b.documentCreateEvent.call(document, "Events")).initEvent(t, r, !0),
            o ? (n && (o[n] = !0),
            this._raiseDispatchEvent(e, o)) : null
        }
        ,
        M.prototype._raiseDispatchEvent = function(e, t) {
            var r = Nn(e) && pn(e)
              , n = r ? b.contentWindowGetter.call(r) : window
              , r = (xe && r && n && b.objectDefineProperty(n, "event", {
                get: function() {
                    return window.event
                },
                configurable: !0
            }),
            e.dispatchEvent(t));
            return xe && n && delete n.event,
            r
        }
        ,
        M.prototype.click = function(e, t) {
            return this._simulateEvent(e, "click", t, {
                button: Wp.left,
                buttons: qp.noButton
            })
        }
        ,
        M.prototype.nativeClick = function(e, t) {
            this._raiseNativeClick(e, t)
        }
        ,
        M.prototype.dblclick = function(e, t) {
            return this._simulateEvent(e, "dblclick", t, {
                button: Wp.left,
                buttons: qp.noButton
            })
        }
        ,
        M.prototype.rightclick = function(e, t) {
            return this._simulateEvent(e, "click", t, {
                button: Wp.right,
                buttons: qp.rightButton
            })
        }
        ,
        M.prototype.contextmenu = function(e, t) {
            return this._simulateEvent(e, "contextmenu", t, {
                button: Wp.right,
                buttons: qp.noButton
            })
        }
        ,
        M.prototype.mousedown = function(e, t) {
            var r = void 0 === (t = void 0 === t ? {} : t).button ? Wp.left : t.button
              , n = r === Wp.left ? qp.leftButton : qp.rightButton;
            return t.button = r,
            t.buttons = void 0 === t.buttons ? n : t.buttons,
            this._simulateEvent(e, "mousedown", t)
        }
        ,
        M.prototype.mouseup = function(e, t) {
            var r = void 0 === (t = void 0 === t ? {} : t).button ? Wp.left : t.button;
            return this._simulateEvent(e, "mouseup", t, {
                button: r,
                buttons: qp.noButton
            })
        }
        ,
        M.prototype.mouseover = function(e, t) {
            return t = M._prepareMouseEventOptions(t),
            this._simulateEvent(e, "mouseover", t)
        }
        ,
        M.prototype.mousemove = function(e, t) {
            return t = M._prepareMouseEventOptions(t),
            this._simulateEvent(e, "mousemove", t, {
                cancelable: !1
            })
        }
        ,
        M.prototype.mouseout = function(e, t) {
            return t = M._prepareMouseEventOptions(t),
            this._simulateEvent(e, "mouseout", t)
        }
        ,
        M.prototype.mouseenter = function(e, t) {
            return t = M._prepareMouseEventOptions(t),
            this._simulateEvent(e, "mouseenter", t, {
                canBubble: !1
            })
        }
        ,
        M.prototype.mouseleave = function(e, t) {
            return t = M._prepareMouseEventOptions(t),
            this._simulateEvent(e, "mouseleave", t, {
                canBubble: !1
            })
        }
        ,
        M.prototype.keypress = function(e, t) {
            return this._simulateEvent(e, "keypress", t)
        }
        ,
        M.prototype.keyup = function(e, t) {
            return this._simulateEvent(e, "keyup", t)
        }
        ,
        M.prototype.keydown = function(e, t) {
            return this._simulateEvent(e, "keydown", t)
        }
        ,
        M.prototype.blur = function(e, t) {
            return this._dispatchFocusEvent(e, "blur", t)
        }
        ,
        M.prototype.focus = function(e, t) {
            return this._dispatchFocusEvent(e, "focus", t)
        }
        ,
        M.prototype.focusin = function(e, t) {
            return this._dispatchFocusEvent(e, "focusin", t)
        }
        ,
        M.prototype.focusout = function(e, t) {
            return this._dispatchFocusEvent(e, "focusout", t)
        }
        ,
        M.prototype.storage = function(e, t) {
            return this._simulateEvent(e, "storage", t)
        }
        ,
        M.prototype.change = function(e) {
            return this._dispatchEvent(e, "change", !0, this.DISPATCHED_EVENT_FLAG)
        }
        ,
        M.prototype.textInput = function(e, t) {
            return this._dispatchTextEvent(e, t)
        }
        ,
        M.prototype.beforeInput = function(e, t) {
            return this._dispatchInputEvent(e, "beforeinput", t)
        }
        ,
        M.prototype.input = function(e, t) {
            return this._dispatchInputEvent(e, "input", t)
        }
        ,
        M.prototype.submit = function(e) {
            return this._dispatchEvent(e, "submit", !0)
        }
        ,
        M.prototype.selectionchange = function(e) {
            return this._dispatchEvent(e, "selectionchange", !1)
        }
        ,
        M.prototype.touchstart = function(e, t) {
            return this._simulateEvent(e, "touchstart", t)
        }
        ,
        M.prototype.touchend = function(e, t) {
            return this._simulateEvent(e, "touchend", t)
        }
        ,
        M.prototype.touchmove = function(e, t) {
            return this._simulateEvent(e, "touchmove", t)
        }
        ,
        M.prototype.dragstart = function(e, t) {
            return this._simulateEvent(e, "dragstart", t)
        }
        ,
        M.prototype.drag = function(e, t) {
            return this._simulateEvent(e, "drag", t)
        }
        ,
        M.prototype.dragenter = function(e, t) {
            return this._simulateEvent(e, "dragenter", t)
        }
        ,
        M.prototype.dragover = function(e, t) {
            return this._simulateEvent(e, "dragover", t)
        }
        ,
        M.prototype.dragleave = function(e, t) {
            return this._simulateEvent(e, "dragleave", t)
        }
        ,
        M.prototype.drop = function(e, t) {
            return this._simulateEvent(e, "drop", t)
        }
        ,
        M.prototype.dragend = function(e, t) {
            return this._simulateEvent(e, "dragend", t)
        }
        ,
        M.prototype.isSavedWindowsEventsExists = function() {
            return this.savedWindowEvents && this.savedWindowEvents.length
        }
        ,
        M);
        function M() {
            this.DISPATCHED_EVENT_FLAG = "hammerhead|dispatched-event",
            this.touchIdentifier = b.dateNow(),
            this.savedWindowEvents = [],
            this.savedNativeClickCount = 0,
            this.browserWithNewEventsStyle = !xe
        }
        (Gs = Pf = Pf || {}).Service = "hammerhead|service-msg",
        Gs.User = "hammerhead|user-msg";
        e(Vf, Ff = r),
        Vf._getMessageData = function(e) {
            e = Lo(e) ? b.messageEventDataGetter.call(e) : e.data;
            return "string" == typeof e ? Ca(e) : e
        }
        ,
        Vf._isWindowAvailable = function(e) {
            try {
                return !!e.postMessage
            } catch (e) {
                return !1
            }
        }
        ,
        Vf.prototype._onMessage = function(e) {
            var t = Vf._getMessageData(e);
            t.type === Pf.Service && e.source && (this.pingCmd && t.message.cmd === this.pingCmd && t.message.isPingResponse ? (this.pingCallback(),
            this.pingCallback = null,
            this.pingCmd = null) : this.emit(this.SERVICE_MSG_RECEIVED_EVENT, {
                message: t.message,
                source: e.source,
                ports: e.ports
            }))
        }
        ,
        Vf.prototype._onWindowMessage = function(e, t) {
            var r = Vf._getMessageData(e);
            if (r.type !== Pf.Service) {
                var n = Rt();
                if ("*" === r.targetUrl || Dt(n, r.targetUrl))
                    return Zp(this.window, t, e)
            }
            return null
        }
        ,
        Vf._wrapMessage = function(e, t, r) {
            var n = Ht();
            return {
                message: t,
                originUrl: Yt({
                    protocol: n.protocol,
                    host: n.host
                }),
                targetUrl: r,
                type: e
            }
        }
        ,
        Vf.prototype._removeInternalMsgFromQueue = function(e) {
            for (var t = 0, r = this.iframeInternalMsgQueue.length; t < r; t++)
                if (this.iframeInternalMsgQueue[t].sendFunc === e)
                    return this.iframeInternalMsgQueue.splice(t, 1),
                    !0;
            return !1
        }
        ,
        Vf.prototype.attach = function(e) {
            function t() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return rd(r, "_onMessage", e)
            }
            var r = this
              , n = (Ff.prototype.attach.call(this, e),
            this.topWindow = e.rammerheadTop,
            this.isWindowUnloaded = !1,
            this._unloadSandbox.on(this._unloadSandbox.UNLOAD_EVENT, function() {
                for (r.isWindowUnloaded = !0; r.iframeInternalMsgQueue.length; ) {
                    var e = r.iframeInternalMsgQueue[0];
                    b.clearTimeout.call(r.window, e.timeoutId),
                    e.sendFunc()
                }
            }),
            this._listeners.addInternalEventBeforeListener(e, ["message"], t),
            this._listeners.setEventListenerWrapper(e, ["message"], function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return rd(r, "_onWindowMessage", e)
            }),
            b.objectDefineProperty(e, this.RECEIVE_MSG_FN, {
                value: t,
                configurable: !0
            }),
            d(e.MessageEvent.prototype, "data", {
                getter: function() {
                    var e = b.eventTargetGetter.call(this)
                      , t = b.messageEventDataGetter.call(this);
                    return t && t.type !== Pf.Service && co(e) ? t.message : t
                }
            }),
            b.isEventPropsLocatedInProto ? e.Window.prototype : e);
            d(n, "onmessage", {
                getter: function() {
                    return r.storedOnMessageHandler
                },
                setter: function(t) {
                    r.storedOnMessageHandler = "function" == typeof t ? t : null,
                    b.winOnMessageSetter.call(e, r.storedOnMessageHandler ? function(e) {
                        return r._onWindowMessage(e, t)
                    }
                    : null)
                }
            })
        }
        ,
        Vf.prototype.postMessage = function(e, t) {
            var r = t[1] || Bt();
            return t[1] = "*",
            t[0] = Vf._wrapMessage(Pf.User, t[0], r),
            rd(e, "postMessage", t)
        }
        ,
        Vf.prototype.sendServiceMsg = function(e, t, r) {
            var n = this
              , o = Vf._wrapMessage(Pf.Service, e);
            if (!(!bn(t, this.window) && !!t[this.RECEIVE_MSG_FN]))
                return Vf._isWindowAvailable(t) && t.postMessage(o, "*", r);
            var i = function(e) {
                if (e || n._removeInternalMsgFromQueue(i))
                    try {
                        t[n.RECEIVE_MSG_FN]({
                            data: Ca(Ta(o)),
                            source: n.window,
                            ports: r
                        })
                    } catch (e) {}
            };
            return this.isWindowUnloaded ? i(!0) : (e = yn(this.window),
            e = b.setTimeout.call(e, i, 10),
            this.iframeInternalMsgQueue.push({
                timeoutId: e,
                sendFunc: i
            })),
            null
        }
        ,
        Vf.prototype.pingIframe = function(a, l, c) {
            var p = this;
            return new se(function(e, t) {
                function r() {
                    (o = b.contentWindowGetter.call(a)) && p.sendServiceMsg({
                        cmd: p.pingCmd,
                        isPingRequest: !0
                    }, o)
                }
                function n() {
                    b.clearInterval.call(p.window, i),
                    b.clearTimeout.call(p.window, s),
                    p.pingCallback = null,
                    p.pingCmd = null,
                    s = i = null
                }
                var o, i = null, s = null, s = b.setTimeout.call(p.window, function() {
                    n(),
                    t()
                }, c ? p.PING_IFRAME_MIN_TIMEOUT : p.PING_IFRAME_TIMEOUT);
                p.pingCallback = function() {
                    n(),
                    e()
                }
                ,
                p.pingCmd = l,
                r(),
                i = b.setInterval.call(p.window, r, p.PING_DELAY)
            }
            )
        }
        ;
        var Ff, Uf = Vf;
        function Vf(e, t) {
            var r = Ff.call(this) || this;
            return r._listeners = e,
            r._unloadSandbox = t,
            r.PING_DELAY = 200,
            r.PING_IFRAME_TIMEOUT = 7e3,
            r.PING_IFRAME_MIN_TIMEOUT = 100,
            r.SERVICE_MSG_RECEIVED_EVENT = "hammerhead|event|service-msg-received",
            r.RECEIVE_MSG_FN = "hammerhead|receive-msg-function",
            r.topWindow = null,
            r.window = null,
            r.storedOnMessageHandler = null,
            r.isWindowUnloaded = !1,
            r.iframeInternalMsgQueue = [],
            r
        }
        e(qf, Gf = ke),
        qf.prototype.onIframeAddedToDOM = function(e) {
            this.emit(this.IFRAME_ADDED_TO_DOM_EVENT, e)
        }
        ,
        qf.prototype.onBeforeDocumentCleaned = function(e) {
            this.emit(this.BEFORE_DOCUMENT_CLEANED_EVENT, e)
        }
        ,
        qf.prototype.onDocumentCleaned = function(e, t) {
            this.emit(this.DOCUMENT_CLEANED_EVENT, {
                window: e,
                document: t
            })
        }
        ,
        qf.prototype.onDocumentClosed = function(e) {
            this.emit(this.DOCUMENT_CLOSED_EVENT, e)
        }
        ,
        qf.prototype.onBodyContentChanged = function(e) {
            this.emit(this.BODY_CONTENT_CHANGED_EVENT, e)
        }
        ,
        qf.prototype.onBodyCreated = function(e) {
            this.emit(this.BODY_CREATED_EVENT, e)
        }
        ;
        var Gf, Wf = qf;
        function qf() {
            var e = null !== Gf && Gf.apply(this, arguments) || this;
            return e.BEFORE_DOCUMENT_CLEANED_EVENT = "hammerhead|event|before-document-cleaned",
            e.DOCUMENT_CLEANED_EVENT = "hammerhead|event|document-cleaned",
            e.DOCUMENT_CLOSED_EVENT = "hammerhead|event|document-closed",
            e.BODY_CONTENT_CHANGED_EVENT = "hammerhead|event|body-content-changed",
            e.BODY_CREATED_EVENT = "hammerhead|event|body-created",
            e.IFRAME_ADDED_TO_DOM_EVENT = "hammerhead|event|iframe-added-to-dom",
            e
        }
        e(Xf, Kf = r),
        Xf.prototype._wrapTimeoutFunctionsArguments = function(e) {
            var t, r, n = this, o = "string" == typeof e[0], i = o ? null : e[0], s = o ? wl(e[0], !1) : null;
            return S && be < 12 ? (t = this,
            r = o ? function() {
                return (0,
                n.window.eval)(s)
            }
            : i,
            e[0] = function() {
                return t._callDeferredFunction(r, arguments)
            }
            ) : o && (e[0] = s),
            e
        }
        ,
        Xf.prototype._callDeferredFunction = function(e, t) {
            if (this.timeouts.length) {
                for (var r = [], n = [], o = 0; o < this.timeouts.length; o++)
                    r.push(this.timeouts[o]),
                    n.push(this.deferredFunctions[o]);
                this.timeouts = [],
                this.deferredFunctions = [];
                for (var i = 0; i < r.length; i++)
                    b.clearInterval.call(this.window, r[i]),
                    n[i]();
                return this._callDeferredFunction(e, t)
            }
            return e.apply(this.window, t)
        }
        ,
        Xf.prototype.attach = function(r) {
            Kf.prototype.attach.call(this, r);
            var n = this;
            f(r, "setTimeout", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return b.setTimeout.apply(r, n._wrapTimeoutFunctionsArguments(e))
            }),
            f(r, "setInterval", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return b.setInterval.apply(r, n._wrapTimeoutFunctionsArguments(e))
            }),
            this.setTimeout = r.setTimeout
        }
        ,
        Xf.prototype.deferFunction = function(t) {
            function r() {
                t();
                for (var e = 0; e < n.deferredFunctions.length; e++)
                    if (n.deferredFunctions[e] === r) {
                        n.deferredFunctions.splice(e, 1),
                        n.timeouts.splice(e, 1);
                        break
                    }
            }
            var n = this;
            this.deferredFunctions.push(r),
            this.timeouts.push(b.setTimeout.call(window, r, 0))
        }
        ;
        var Kf, zf = Xf;
        function Xf() {
            var e = Kf.call(this) || this;
            return e.timeouts = [],
            e.deferredFunctions = [],
            e.setTimeout = b.setTimeout,
            e
        }
        function $f(e) {
            return e.configurable = !0,
            e.enumerable = !0,
            e
        }
        e(Jf, Yf = r),
        Jf._getBeforeUnloadEventName = function() {
            return Se ? "pagehide" : "beforeunload"
        }
        ,
        Jf._getBeforeUnloadPropSetter = function() {
            return Se ? b.winOnPageHideSetter : b.winOnBeforeUnloadSetter
        }
        ,
        Jf.prototype._emitEvent = function(e) {
            this.emit(e.eventName, {
                returnValue: e.storedReturnValue,
                prevented: e.prevented
            })
        }
        ,
        Jf._prepareStoredReturnValue = function(e) {
            if ("string" == typeof e)
                return e;
            try {
                return String(e)
            } catch (e) {
                return ""
            }
        }
        ,
        Jf.prototype._createEventHandler = function(r) {
            return function(e, t) {
                b.objectDefineProperty(e, "returnValue", $f({
                    get: function() {
                        return r.storedReturnValue
                    },
                    set: function(e) {
                        r.storedReturnValue = Jf._prepareStoredReturnValue(e),
                        r.prevented = !Te || "" !== e
                    }
                })),
                b.objectDefineProperty(e, "preventDefault", $f({
                    get: function() {
                        return function() {
                            return r.prevented = !0
                        }
                    },
                    set: function() {}
                }));
                t = t.call(this, e);
                void 0 !== t && (r.storedReturnValue = Jf._prepareStoredReturnValue(t),
                r.prevented = !0)
            }
        }
        ,
        Jf.prototype._reattachListener = function(e) {
            var t = Mh.getNativeAddEventListener(this.window);
            Mh.getNativeRemoveEventListener(this.window).call(this.window, e.nativeEventName, this),
            t.call(this.window, e.nativeEventName, this)
        }
        ,
        Jf.prototype._setEventListenerWrapper = function(e) {
            this._listeners.setEventListenerWrapper(window, [e.nativeEventName], this._createEventHandler(e))
        }
        ,
        Jf.prototype._addEventListener = function(t) {
            var r = this;
            Mh.getNativeAddEventListener(window).call(window, t.nativeEventName, this),
            this._listeners.on(this._listeners.EVENT_LISTENER_ATTACHED_EVENT, function(e) {
                e.el === window && e.eventType === t.nativeEventName && r._reattachListener(t)
            })
        }
        ,
        Jf.prototype._overrideEventDescriptor = function(t) {
            var r = this;
            d(b.isEventPropsLocatedInProto ? window.Window.prototype : window, "on" + t.nativeEventName, {
                getter: function() {
                    return t.storedHandler
                },
                setter: function(e) {
                    return r.setOnEvent(t, window, e)
                }
            })
        }
        ,
        Jf.prototype._attachEvent = function(e) {
            this._setEventListenerWrapper(e),
            this._addEventListener(e),
            this._overrideEventDescriptor(e)
        }
        ,
        Jf.prototype.attach = function(e) {
            var t = this;
            Yf.prototype.attach.call(this, e),
            this._attachEvent(this.beforeUnloadProperties),
            this._attachEvent(this.unloadProperties),
            this._listeners.addInternalEventBeforeListener(e, [this.beforeUnloadProperties.nativeEventName], function() {
                return t.emit(t.BEFORE_BEFORE_UNLOAD_EVENT)
            })
        }
        ,
        Jf.prototype.setOnEvent = function(t, e, r) {
            var n = this;
            "function" == typeof r ? (t.storedHandler = r,
            t.eventPropSetter.call(e, function(e) {
                return n._createEventHandler(t)(e, r)
            }),
            this._reattachListener(t)) : (t.storedHandler = null,
            t.eventPropSetter.call(e, null))
        }
        ,
        Jf.prototype.handleEvent = function(e) {
            e.type === this.beforeUnloadProperties.nativeEventName ? this._emitEvent(this.beforeUnloadProperties) : e.type === this.unloadProperties.nativeEventName && this._emitEvent(this.unloadProperties)
        }
        ;
        var Yf, Qf = Jf;
        function Jf(e) {
            var t = Yf.call(this) || this;
            return t._listeners = e,
            t.BEFORE_UNLOAD_EVENT = "hammerhead|event|before-unload",
            t.BEFORE_BEFORE_UNLOAD_EVENT = "hammerhead|event|before-before-unload",
            t.UNLOAD_EVENT = "hammerhead|event|unload",
            t.beforeUnloadProperties = {
                storedReturnValue: "",
                prevented: !1,
                storedHandler: null,
                nativeEventName: Jf._getBeforeUnloadEventName(),
                eventName: t.BEFORE_UNLOAD_EVENT,
                eventPropSetter: Jf._getBeforeUnloadPropSetter()
            },
            t.unloadProperties = {
                storedReturnValue: "",
                prevented: !1,
                storedHandler: null,
                nativeEventName: "unload",
                eventName: t.UNLOAD_EVENT,
                eventPropSetter: b.winOnUnloadSetter
            },
            t
        }
        e(em, Zf = r),
        em.prototype.gettingSettingInProgress = function() {
            return !!this._waitHammerheadSettings
        }
        ,
        em.prototype.delayUntilGetSettings = function(e) {
            return this._waitHammerheadSettings.then(e)
        }
        ;
        var Zf, Ws = em;
        function em(e) {
            var t = Zf.call(this) || this;
            return (t._waitHammerheadSettings = e) && e.then(function() {
                t._waitHammerheadSettings = null
            }),
            t
        }
        var tm = "~~~TestCafe added this prefix to hide the authentication dialog box~~~"
          , rm = "~~~TestCafe added this prefix to control the authorization flow~~~";
        function nm(e) {
            return -1 < e.indexOf(tm)
        }
        function om(e) {
            return e.replace(tm, "")
        }
        function im(e) {
            e = String(e).toLowerCase();
            return e === Vl || e === Wl
        }
        function sm(e) {
            return rm + e
        }
        function am(e) {
            return -1 < e.indexOf(rm)
        }
        function lm(e) {
            return e.replace(rm, "")
        }
        function cm(e) {
            e = String(e).toLowerCase();
            return e === Ul || e === Gl
        }
        var pm, um = Object.freeze({
            __proto__: null,
            addAuthenticatePrefix: function(e) {
                return tm + e
            },
            hasAuthenticatePrefix: nm,
            removeAuthenticatePrefix: om,
            isAuthenticateHeader: im,
            addAuthorizationPrefix: sm,
            hasAuthorizationPrefix: am,
            removeAuthorizationPrefix: lm,
            isAuthorizationHeader: cm
        }), hm = ["UNSENT", "OPENED", "HEADERS_RECEIVED", "LOADING", "DONE"], dm = (e(fm, pm = Ws),
        fm.setRequestOptions = function(e, t, r) {
            fm.REQUESTS_OPTIONS.set(e, {
                withCredentials: t,
                openArgs: r,
                headers: []
            })
        }
        ,
        fm.createNativeXHR = function() {
            var e = new b.XMLHttpRequest;
            return e.open = b.xhrOpen,
            e.abort = b.xhrAbort,
            e.send = b.xhrSend,
            e.addEventListener = b.xhrAddEventListener || b.addEventListener,
            e.removeEventListener = b.xhrRemoveEventListener || b.removeEventListener,
            e.setRequestHeader = b.xhrSetRequestHeader,
            e.getResponseHeader = b.xhrGetResponseHeader,
            e.getAllResponseHeaders = b.xhrGetAllResponseHeaders,
            e.overrideMimeType = b.xhrOverrideMimeType,
            e.dispatchEvent = b.xhrDispatchEvent || b.dispatchEvent,
            e
        }
        ,
        fm.openNativeXhr = function(e, t, r) {
            e.open("POST", t, r),
            e.setRequestHeader(Kl, "no-cache, no-store, must-revalidate")
        }
        ,
        fm._reopenXhr = function(e, t) {
            var r = t.openArgs[1]
              , n = e.withCredentials;
            t.withCredentials = n,
            t.openArgs[1] = pr(r, n ? je.include : je.sameOrigin),
            b.xhrOpen.apply(e, t.openArgs),
            t.openArgs[1] = r;
            for (var o = 0, i = t.headers; o < i.length; o++) {
                var s = i[o];
                b.xhrSetRequestHeader.apply(e, s)
            }
        }
        ,
        fm.prototype.attach = function(e) {
            pm.prototype.attach.call(this, e);
            function t() {
                var e = b.xhrAddEventListener || b.addEventListener
                  , t = new b.XMLHttpRequest;
                return e.call(t, "loadend", i),
                e.call(t, "readystatechange", s),
                t
            }
            for (var o = this, r = e.XMLHttpRequest.prototype, i = function() {
                var e = b.xhrRemoveEventListener || b.removeEventListener;
                o.emit(o.XHR_COMPLETED_EVENT, {
                    xhr: this
                }),
                e.call(this, "loadend", i)
            }, s = function() {
                var e;
                this.readyState < this.HEADERS_RECEIVED || (e = b.xhrRemoveEventListener || b.removeEventListener,
                o._cookieSandbox.syncCookie(),
                e.call(this, "readystatechange", s))
            }, n = 0, a = hm; n < a.length; n++) {
                var l = a[n];
                b.objectDefineProperty(t, l, b.objectGetOwnPropertyDescriptor(b.XMLHttpRequest, l))
            }
            me(e, "XMLHttpRequest", t),
            b.objectDefineProperty(r, "constructor", {
                value: t
            }),
            f(r, "abort", function() {
                for (var e = this, t = [], r = 0; r < arguments.length; r++)
                    t[r] = arguments[r];
                o.gettingSettingInProgress() ? o.delayUntilGetSettings(function() {
                    return e.abort.apply(e, t)
                }) : (b.xhrAbort.apply(this, t),
                o.emit(o.XHR_ERROR_EVENT, {
                    err: new Error("XHR aborted"),
                    xhr: this
                }))
            }),
            f(r, "open", function() {
                for (var e = this, t = [], r = 0; r < arguments.length; r++)
                    t[r] = arguments[r];
                var n = t[1];
                if (w(n) === n)
                    return fm.setRequestOptions(this, this.withCredentials, t),
                    void b.xhrOpen.apply(this, t);
                o.gettingSettingInProgress() ? o.delayUntilGetSettings(function() {
                    return e.open.apply(e, t)
                }) : (n = "string" == typeof n ? n : String(n),
                t[1] = pr(n, this.withCredentials ? je.include : je.sameOrigin),
                b.xhrOpen.apply(this, t),
                t[1] = n,
                fm.setRequestOptions(this, this.withCredentials, t))
            }),
            f(r, "send", function() {
                for (var e, t = this, r = [], n = 0; n < arguments.length; n++)
                    r[n] = arguments[n];
                o.gettingSettingInProgress() ? o.delayUntilGetSettings(function() {
                    return t.send.apply(t, r)
                }) : ((e = fm.REQUESTS_OPTIONS.get(this)) && e.withCredentials !== this.withCredentials && fm._reopenXhr(this, e),
                o.emit(o.BEFORE_XHR_SEND_EVENT, {
                    xhr: this
                }),
                b.xhrSend.apply(this, r),
                this.readyState === this.DONE && i.call(this),
                s.call(this))
            }),
            f(r, "setRequestHeader", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                cm(e[0]) && (e[1] = sm(e[1])),
                b.xhrSetRequestHeader.apply(this, e);
                var r = fm.REQUESTS_OPTIONS.get(this);
                r && r.headers.push([String(e[0]), String(e[1])])
            }),
            b.xhrResponseURLGetter && d(e.XMLHttpRequest.prototype, "responseURL", {
                getter: function() {
                    return lr(b.xhrResponseURLGetter.call(this))
                }
            }),
            f(r, "getResponseHeader", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var r = b.xhrGetResponseHeader.apply(this, e);
                return r = r && im(e[0]) ? om(r) : r
            }),
            f(r, "getAllResponseHeaders", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                for (var r = b.xhrGetAllResponseHeaders.apply(this, e); nm(r); )
                    r = om(r);
                return r
            })
        }
        ,
        fm.REQUESTS_OPTIONS = new WeakMap,
        fm);
        function fm(e, t) {
            t = pm.call(this, t) || this;
            return t._cookieSandbox = e,
            t.XHR_COMPLETED_EVENT = "hammerhead|event|xhr-completed",
            t.XHR_ERROR_EVENT = "hammerhead|event|xhr-error",
            t.BEFORE_XHR_SEND_EVENT = "hammerhead|event|before-xhr-send",
            t
        }
        function mm(e) {
            switch (e = String(e).toLowerCase()) {
            case "omit":
                return je.omit;
            case "same-origin":
                return je.sameOrigin;
            case "include":
                return je.include;
            default:
                return je.unknown
            }
        }
        var gm, ym = mm(b.Request && new b.Request(location.toString()).credentials), vm = (e(Em, gm = Ws),
        Em._removeAuthHeadersPrefix = function(e, t) {
            return cm(e) ? lm(t) : im(e) ? om(t) : t
        }
        ,
        Em._processInit = function(e) {
            var t = e.headers;
            if (!t)
                return e;
            go(t) || (t = t ? new b.Headers(t) : new b.Headers,
            e.headers = t);
            var r = b.headersGet.call(t, Ul)
              , n = b.headersGet.call(t, Gl);
            return null === r || am(r) || b.headersSet.call(t, Ul, rm + r),
            null === n || am(n) || b.headersSet.call(t, Gl, rm + n),
            e
        }
        ,
        Em._processArguments = function(e) {
            var t = e[0]
              , r = e[1]
              , n = "string" == typeof t
              , o = mm(r && r.credentials);
            yo(t) ? (o !== je.unknown && (e[0] = pr(t.url, o)),
            r && r.headers && "worker" !== t.destination && (e[1] = Em._processInit(r))) : (n = n ? t : String(t),
            t = o === je.unknown ? ym : o,
            e[0] = pr(n, t),
            e[1] = Em._processInit(r || {}))
        }
        ,
        Em._processHeaderEntry = function(e, t) {
            if (void 0 === t && (t = !1),
            e.done)
                return e;
            var r = Em._removeAuthHeadersPrefix(e.value[0], e.value[1]);
            return t ? e.value = r : e.value[1] = r,
            e
        }
        ,
        Em._entriesWrapper = function() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            var r = b.headersEntries.apply(this, e)
              , n = r.next;
            return r.next = function() {
                return Em._processHeaderEntry(n.call(r))
            }
            ,
            r
        }
        ,
        Em._valuesWrapper = function() {
            for (var e = [], t = 0; t < arguments.length; t++)
                e[t] = arguments[t];
            var r = b.headersEntries.apply(this, e)
              , n = r.next;
            return r.next = function() {
                return Em._processHeaderEntry(n.call(r), !0)
            }
            ,
            r
        }
        ,
        Em.prototype.attach = function(o) {
            var i;
            gm.prototype.attach.call(this, o, o.document),
            b.fetch && (i = this,
            me(o, "Request", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                Em._processArguments(e),
                o.Headers.prototype.entries = o.Headers.prototype[Symbol.iterator] = b.headersEntries;
                var r = 1 === e.length ? new b.Request(e[0]) : new b.Request(e[0],e[1]);
                return o.Headers.prototype.entries = o.Headers.prototype[Symbol.iterator] = Em._entriesWrapper,
                r
            }),
            d(o.Request.prototype, "url", {
                getter: function() {
                    return lr(b.requestUrlGetter.call(this))
                }
            }),
            d(o.Request.prototype, "referrer", {
                getter: function() {
                    return lr(b.requestReferrerGetter.call(this))
                }
            }),
            f(o, "fetch", function() {
                for (var e = this, t = [], r = 0; r < arguments.length; r++)
                    t[r] = arguments[r];
                if (i.gettingSettingInProgress())
                    return i.delayUntilGetSettings(function() {
                        return e.fetch.apply(e, t)
                    });
                if (!t.length && !Ie)
                    return b.fetch.apply(this, t);
                try {
                    Em._processArguments(t)
                } catch (e) {
                    return b.promiseReject.call(i.window.Promise, e)
                }
                o.Headers.prototype.entries = o.Headers.prototype[Symbol.iterator] = b.headersEntries;
                var n = b.fetch.apply(this, t);
                return o.Headers.prototype.entries = o.Headers.prototype[Symbol.iterator] = Em._entriesWrapper,
                i.emit(i.FETCH_REQUEST_SENT_EVENT, n),
                b.promiseThen.call(n, function(e) {
                    return i.cookieSandbox.syncCookie(),
                    e
                })
            }),
            d(o.Response.prototype, "url", {
                getter: function() {
                    return lr(b.responseUrlGetter.call(this))
                }
            }),
            f(o.Headers.prototype, "entries", Em._entriesWrapper),
            f(o.Headers.prototype, Symbol.iterator, Em._entriesWrapper),
            f(o.Headers.prototype, "values", Em._valuesWrapper),
            f(o.Headers.prototype, "forEach", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var n = e[0];
                return "function" == typeof n && (e[0] = function(e, t, r) {
                    e = Em._removeAuthHeadersPrefix(t, e),
                    n.call(this, e, t, r)
                }
                ),
                b.headersForEach.apply(this, e)
            }),
            f(o.Headers.prototype, "get", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var r = b.headersGet.apply(this, e);
                return r && Em._removeAuthHeadersPrefix(e[0], r)
            }),
            f(o.Headers.prototype, "set", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return cm(e[0]) && (e[1] = sm(e[1])),
                b.headersSet.apply(this, e)
            }))
        }
        ,
        Em);
        function Em(e, t) {
            t = gm.call(this, t) || this;
            return t.cookieSandbox = e,
            t.FETCH_REQUEST_SENT_EVENT = "hammerhead|event|fetch-request-sent-event",
            t
        }
        var Sm, _m = "hammerhead|get-storage-wrapper", bm = S ? "" : null, wm = new WeakMap, Zs = function() {}, xm = (Zs.prototype = Storage.prototype,
        e(Cm, Sm = Zs),
        Object.defineProperty(Cm.prototype, "internal", {
            get: function() {
                return wm.get(this)
            },
            enumerable: !0,
            configurable: !0
        }),
        Cm.create = function(e, t, r) {
            t = new Cm(e,t,r);
            return e.Proxy ? new b.Proxy(t,{
                get: function(e, t) {
                    return t === _m ? e : e[t]
                },
                set: function(e, t, r) {
                    return e.setItem(t, r),
                    !0
                },
                deleteProperty: function(e, t) {
                    return e.removeItem(t),
                    !0
                }
            }) : t
        }
        ,
        Cm.prototype.setContext = function(e) {
            this.internal.ctx = e
        }
        ,
        Cm.prototype.getContext = function() {
            return this.internal.ctx
        }
        ,
        Cm.prototype.saveToNativeStorage = function() {}
        ,
        Cm.prototype.getCurrentState = function() {
            for (var e = [[], []], t = 0, r = b.objectKeys(this); t < r.length; t++) {
                var n = r[t];
                e[0].push(n),
                e[1].push(this[n])
            }
            return e
        }
        ,
        Cm.prototype.restore = function(e) {
            this.clearStorage(),
            this.loadStorage(e)
        }
        ,
        Cm.prototype.clearStorage = function() {
            for (var e = !1, t = 0, r = b.objectKeys(this); t < r.length; t++)
                delete this[r[t]],
                e = !0;
            return e && (this.internal.lastState = this.getCurrentState()),
            e
        }
        ,
        Cm.prototype.loadStorage = function(e) {
            e = e || this.internal.nativeStorage[this.internal.nativeStorageKey];
            for (var t = Ca(e || "[[],[]]"), r = t[0].length, n = 0; n < r; n++)
                this[t[0][n]] = t[1][n];
            this.internal.lastState = t
        }
        ,
        Cm.prototype.raiseStorageChanged = function(e, t, r) {
            var n = null;
            try {
                var o = Qt(this.internal.ctx.location.toString())
                  , n = o ? o.destUrl : Rt()
            } catch (e) {
                this.internal.ctx = this.internal.win,
                n = Rt()
            }
            this.internal.eventEmitter.emit("change", {
                key: e,
                oldValue: t,
                newValue: r,
                url: n
            })
        }
        ,
        Cm.prototype.checkStorageChanged = function() {
            for (var e = this.internal.lastState, t = this.getCurrentState(), r = 0; r < e[0].length; r++) {
                var n = e[0][r]
                  , o = e[1][r]
                  , i = t[0].indexOf(n);
                -1 !== i ? (t[1][i] !== o && this.raiseStorageChanged(t[0][i], o, t[1][i]),
                t[0].splice(i, 1),
                t[1].splice(i, 1)) : this.raiseStorageChanged(n, o, null)
            }
            for (var s = 0; s < t[0].length; s++)
                this.raiseStorageChanged(t[0][s], bm, t[1][s]);
            this.internal.lastState = this.getCurrentState()
        }
        ,
        Cm.prototype.addChangeEventListener = function(e) {
            this.internal.eventEmitter.on("change", e)
        }
        ,
        Cm.prototype.removeChangeEventListener = function(e) {
            this.internal.eventEmitter.off("change", e)
        }
        ,
        Cm.prototype.unwrapProxy = function() {
            return b.Proxy && this[_m] || this
        }
        ,
        Cm);
        function Cm(e, t, r) {
            var n = Sm.call(this) || this;
            return wm.set(n, {
                win: e,
                ctx: e,
                lastState: null,
                eventEmitter: new ke,
                nativeStorage: t,
                nativeStorageKey: r
            }),
            n.loadStorage(),
            n
        }
        ea = b.objectKeys(xm.prototype);
        -1 === ea.indexOf("internal") && ea.push("internal");
        for (var Tm = 0, Am = ea; Tm < Am.length; Tm++) {
            var Pm = Am[Tm];
            "constructor" !== Pm && "internal" !== Pm && b.objectDefineProperty(xm.prototype, Pm, {
                value: xm.prototype[Pm],
                configurable: !1,
                enumerable: !1,
                writable: !1
            })
        }
        ce = b.objectGetOwnPropertyDescriptor(xm.prototype, "internal");
        ce.configurable = !1,
        ce.enumerable = !1,
        b.objectDefineProperty(xm.prototype, "internal", ce),
        b.objectDefineProperty(xm.prototype, "constructor", b.objectGetOwnPropertyDescriptor(Storage.prototype, "constructor")),
        b.objectDefineProperty(xm, "INTERNAL_METHODS", {
            value: ea
        });
        var Im, Nm = "hammerhead|api-key-prefix|", Om = b.arrayConcat.call(b.objectKeys(Storage.prototype), xm.INTERNAL_METHODS), Lm = (e(km, Im = r),
        km.prototype._simulateStorageEvent = function(e, t) {
            this.isDeactivated() || e.unwrapProxy().getContext() === this.window || ((t = t).storageArea = e,
            this._eventSimulator.storage(this.window, t))
        }
        ,
        km.prototype._createStorageWrappers = function() {
            var e, t = this, r = Ht().host, r = "hammerhead|storage-wrapper|" + m.get().sessionId + "|" + r, n = yn(this.window)[_.hammerhead].sandbox.storageSandbox;
            n !== this ? (this.localStorageProxy = n.localStorageProxy,
            this.sessionStorageProxy = n.sessionStorageProxy) : (n = this.nativeMethods.winLocalStorageGetter.call(this.window),
            e = this.nativeMethods.winSessionStorageGetter.call(this.window),
            this.localStorageProxy = xm.create(this.window, n, r),
            this.sessionStorageProxy = xm.create(this.window, e, r),
            this._unloadSandbox.on(this._unloadSandbox.UNLOAD_EVENT, n = function() {
                t.isLocked || (t.localStorageProxy.unwrapProxy().saveToNativeStorage(),
                t.sessionStorageProxy.unwrapProxy().saveToNativeStorage())
            }
            ),
            gg.pageNavigationWatch.on(gg.pageNavigationWatch.PAGE_NAVIGATION_TRIGGERED_EVENT, n))
        }
        ,
        km.prototype._overrideStorageEvent = function() {
            "object" != typeof StorageEvent && me(this.window, "StorageEvent", function(e, t) {
                var r, n = null == t ? void 0 : t.storageArea;
                return n && delete t.storageArea,
                r = 0 === arguments.length ? new b.StorageEvent : 1 === arguments.length ? new b.StorageEvent(e) : new b.StorageEvent(e,t),
                n && b.objectDefineProperty(r, "storageArea", {
                    get: function() {
                        return n
                    },
                    set: function() {}
                }),
                r
            })
        }
        ,
        km.prototype.clear = function() {
            var e = this.localStorageProxy.unwrapProxy()
              , t = this.sessionStorageProxy.unwrapProxy();
            b.storageRemoveItem.call(e.internal.nativeStorage, e.internal.nativeStorageKey),
            b.storageRemoveItem.call(t.internal.nativeStorage, t.internal.nativeStorageKey)
        }
        ,
        km.prototype.lock = function() {
            this.isLocked = !0
        }
        ,
        km.prototype.backup = function() {
            return {
                localStorage: Ta(this.localStorageProxy.unwrapProxy().getCurrentState()),
                sessionStorage: Ta(this.sessionStorageProxy.unwrapProxy().getCurrentState())
            }
        }
        ,
        km.prototype.restore = function(e) {
            var t = e.localStorage
              , e = e.sessionStorage;
            this.localStorageProxy.unwrapProxy().restore(t),
            this.sessionStorageProxy.unwrapProxy().restore(e)
        }
        ,
        km.prototype._overrideStorageProps = function() {
            f(window.Storage.prototype, "clear", function() {
                var e = this.unwrapProxy();
                e.clearStorage() && e.raiseStorageChanged(null, null, null)
            }),
            f(window.Storage.prototype, "getItem", function(e) {
                if (0 === arguments.length)
                    throw new TypeError("Failed to execute 'getItem' on 'Storage': 1 argument required, but only 0 present.");
                var t = this.unwrapProxy()
                  , r = km._wrapKey(e);
                return b.objectHasOwnProperty.call(t, r) ? t[r] : null
            }),
            f(window.Storage.prototype, "key", function(e) {
                if (0 === arguments.length)
                    throw new TypeError("TypeError: Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present.");
                e %= 4294967296,
                isNaN(e) && (e = 0);
                var t = this.unwrapProxy()
                  , t = b.objectKeys(t);
                return 0 <= e && e < t.length ? km._unwrapKey(t[e]) : null
            }),
            f(window.Storage.prototype, "removeItem", function(e) {
                if (0 === arguments.length)
                    throw new TypeError("Failed to execute 'removeItem' on 'Storage': 1 argument required, but only 0 present.");
                var t = this.unwrapProxy();
                delete t[km._wrapKey(e)],
                t.checkStorageChanged()
            }),
            f(window.Storage.prototype, "setItem", function(e, t) {
                if (arguments.length < 2)
                    throw new TypeError("Failed to execute 'setItem' on 'Storage': 2 arguments required, but only " + arguments.length + " present.");
                var r = this.unwrapProxy();
                r[km._wrapKey(e)] = String(t),
                r.checkStorageChanged()
            }),
            d(window.Storage.prototype, "length", {
                getter: function() {
                    return b.objectKeys(this).length
                },
                setter: null
            })
        }
        ,
        km.prototype._overrideStoragesGetters = function() {
            var e = this
              , t = this.nativeMethods.getStoragesPropsOwner(window);
            this.nativeMethods.isStoragePropsLocatedInProto && this.nativeMethods.objectHasOwnProperty.call(window, "localStorage") || this.nativeMethods.objectDefineProperties(window, {
                localStorage: he(t, "localStorage", {
                    getter: function() {
                        return e.localStorageProxy.unwrapProxy().setContext(window),
                        e.localStorageProxy
                    }
                }),
                sessionStorage: he(t, "sessionStorage", {
                    getter: function() {
                        return e.sessionStorageProxy.unwrapProxy().setContext(window),
                        e.sessionStorageProxy
                    }
                })
            })
        }
        ,
        km._wrapKey = function(e) {
            e = String(e);
            return -1 !== Om.indexOf(e) ? Nm + e : e
        }
        ,
        km._unwrapKey = function(e) {
            return e.replace(Nm, "")
        }
        ,
        km.prototype.attach = function(e) {
            var t = this
              , r = (Im.prototype.attach.call(this, e),
            this._overrideStorageProps(),
            this._createStorageWrappers(),
            this.localStorageProxy.unwrapProxy())
              , n = this.sessionStorageProxy.unwrapProxy();
            this.intervalId = b.setInterval.call(this.window, function() {
                r.checkStorageChanged(),
                n.checkStorageChanged()
            }, 10),
            this.localStorageChangeHandler = function(e) {
                return t._simulateStorageEvent(t.localStorageProxy, e)
            }
            ,
            this.sessionStorageChangeHandler = function(e) {
                return t._simulateStorageEvent(t.sessionStorageProxy, e)
            }
            ,
            r.addChangeEventListener(this.localStorageChangeHandler),
            n.addChangeEventListener(this.sessionStorageChangeHandler),
            this._listeners.initElementListening(e, ["storage"]),
            this._listeners.addInternalEventBeforeListener(e, ["storage"], function(e, t, r) {
                return !t && r()
            }),
            this._overrideStorageEvent(),
            this._overrideStoragesGetters()
        }
        ,
        km.prototype.dispose = function() {
            this.localStorageProxy.unwrapProxy().removeChangeEventListener(this.localStorageChangeHandler),
            this.sessionStorageProxy.unwrapProxy().removeChangeEventListener(this.sessionStorageChangeHandler);
            var e = yn(this.window);
            this.window !== e || e.frameElement || b.clearInterval.call(this.window, this.intervalId)
        }
        ,
        km);
        function km(e, t, r) {
            var n = Im.call(this) || this;
            return n._listeners = e,
            n._unloadSandbox = t,
            n._eventSimulator = r,
            n.localStorageProxy = null,
            n.sessionStorageProxy = null,
            n.intervalId = null,
            n.isLocked = !1,
            n
        }
        e(Rm, Dm = r),
        Rm._createFnWrapper = function(r, n) {
            return function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                return "string" == typeof e[0] && (e[0] = wl(e[0])),
                n.apply(r, e)
            }
        }
        ,
        Rm._overrideElectronModulePaths = function(e) {
            var t = e.require
              , r = t("path")
              , n = Ht();
            "file:" === n.protocol && (n = "win32" === e.process.platform && "/" === n.pathname[0] ? n.pathname.substr(1) : n.pathname,
            e.__filename = r.normalize(decodeURIComponent(n)),
            e.__dirname = r.dirname(e.__filename),
            e.module.filename = e.__filename,
            e.module.paths = e.module.paths.concat(t("module")._nodeModulePaths(e.__dirname)))
        }
        ,
        Rm.prototype.attach = function(e) {
            var t, r;
            Dm.prototype.attach.call(this, e),
            e.require && (t = e.require("vm")) && (r = this.nativeMethods).refreshElectronMeths(t) && (f(t, "createScript", Rm._createFnWrapper(t, r.createScript)),
            t.runInDebugContext && f(t, "runInDebugContext", Rm._createFnWrapper(t, r.runInDebugContext)),
            f(t, "runInContext", Rm._createFnWrapper(t, r.runInContext)),
            f(t, "runInNewContext", Rm._createFnWrapper(t, r.runInNewContext)),
            f(t, "runInThisContext", Rm._createFnWrapper(t, r.runInThisContext)),
            Rm._overrideElectronModulePaths(e))
        }
        ;
        var Dm, Mm = Rm;
        function Rm() {
            return null !== Dm && Dm.apply(this, arguments) || this
        }
        e(Bm, jm = r),
        Bm.prototype._toString = function(e) {
            try {
                return String(e)
            } catch (e) {
                return "object"
            }
        }
        ,
        Bm.prototype._proxyConsoleMeth = function(o) {
            var i = this;
            f(this.window.console, o, function() {
                for (var e, t, r = [], n = 0; n < arguments.length; n++)
                    r[n] = arguments[n];
                bn(window, window.rammerheadTop) || (e = wn(window),
                t = b.arrayMap.call(r, i._toString).join(" "),
                e ? (i.emit(i.CONSOLE_METH_CALLED_EVENT, {
                    meth: o,
                    line: t,
                    inIframe: !0
                }),
                i._messageSandbox.sendServiceMsg({
                    meth: o,
                    line: t,
                    cmd: i.CONSOLE_METH_CALLED_EVENT
                }, window.rammerheadTop)) : i.emit(i.CONSOLE_METH_CALLED_EVENT, {
                    meth: o,
                    line: t
                })),
                i.nativeMethods.consoleMeths[o].apply(i.nativeMethods.console, r)
            })
        }
        ,
        Bm.prototype.attach = function(e) {
            jm.prototype.attach.call(this, e),
            this._proxyConsoleMeth("log"),
            this._proxyConsoleMeth("info"),
            this._proxyConsoleMeth("error"),
            this._proxyConsoleMeth("warn"),
            this._messageSandbox.on(this._messageSandbox.SERVICE_MSG_RECEIVED_EVENT, this._serviceMsgReceivedEventCallback)
        }
        ;
        var jm, Hm = Bm;
        function Bm(e) {
            var t = jm.call(this) || this;
            return t._messageSandbox = e,
            t.CONSOLE_METH_CALLED_EVENT = "hammerhead|event|console-meth-called",
            t._serviceMsgReceivedEventCallback = function(e) {
                e = e.message;
                e.cmd === t.CONSOLE_METH_CALLED_EVENT && t.emit(t.CONSOLE_METH_CALLED_EVENT, {
                    meth: e.meth,
                    line: e.line
                })
            }
            ,
            t
        }
        var Fm, Um = "hammerhead|style|is-processed", Vm = "hammerhead|style|proxy-object", Gm = "hammerhead|style|proxy-target", Wm = (e(qm, Fm = r),
        qm._convertToDashed = function(e) {
            return e.replace(/[A-Z]/g, "-$&").toLowerCase()
        }
        ,
        qm._generateDashedProps = function(e) {
            for (var t = [], r = 0, n = e; r < n.length; r++) {
                var o = n[r]
                  , i = qm._convertToDashed(o);
                o !== i && t.push(i)
            }
            return t
        }
        ,
        qm.prototype._detectBrowserFeatures = function() {
            var e, t, r, n = {};
            return n.css2PropertiesProtoContainsAllProps = !!window.CSS2Properties,
            n.cssStyleDeclarationProtoContainsUrlProps = this.nativeMethods.objectHasOwnProperty.call(window.CSSStyleDeclaration.prototype, "background"),
            n.cssStyleDeclarationProtoContainsDashedProps = this.nativeMethods.objectHasOwnProperty.call(window.CSSStyleDeclaration.prototype, "background-image"),
            n.cssStyleDeclarationContainsAllProps = n.cssStyleDeclarationProtoContainsUrlProps && n.cssStyleDeclarationProtoContainsDashedProps,
            n.css2PropertiesProtoContainsAllProps || n.cssStyleDeclarationProtoContainsUrlProps || (e = this.nativeMethods.createElement.call(document, "div"),
            t = !1,
            (r = this.nativeMethods.objectGetOwnPropertyDescriptor.call(window.Object, e.style, "background")).configurable && (delete r.value,
            delete r.writable,
            r.set = function() {
                t = !0
            }
            ,
            this.nativeMethods.objectDefineProperty(e.style, "background", r),
            e.style.background = "url"),
            n.propsCannotBeOverridden = !r.configurable || !t),
            n
        }
        ,
        qm.prototype._overrideStyleProp = function(e, t) {
            var r = this.nativeMethods
              , n = qm._convertToDashed(t);
            d(e, t, {
                getter: function() {
                    var e = r.styleGetPropertyValue.call(this, n);
                    return Fl.cleanUp(e, Qt)
                },
                setter: function(e) {
                    "string" == typeof e && (e = Fl.process(e, w)),
                    r.styleSetProperty.call(this, n, e)
                }
            })
        }
        ,
        qm.prototype._overrideStyleInstanceProp = function(e, t) {
            var r = this.nativeMethods
              , n = qm._convertToDashed(t);
            d(e, t, {
                getter: function() {
                    var e = r.styleGetPropertyValue.call(this, n);
                    return Fl.cleanUp(e, Qt)
                },
                setter: function(e) {
                    "string" == typeof e && (e = Fl.process(e, w)),
                    r.styleSetProperty.call(this, n, e)
                }
            })
        }
        ,
        qm.prototype._processStyleInstance = function(e) {
            if (!e[Um]) {
                for (var t = 0, r = this.DASHED_URL_PROPS; t < r.length; t++) {
                    var n = r[t];
                    this._overrideStyleInstanceProp(e, n)
                }
                if (!this.FEATURES.cssStyleDeclarationProtoContainsUrlProps)
                    for (var o = 0, i = this.URL_PROPS; o < i.length; o++) {
                        n = i[o];
                        this._overrideStyleInstanceProp(e, n)
                    }
                this.nativeMethods.objectDefineProperty(e, Um, {
                    value: !0
                })
            }
            return e
        }
        ,
        qm.prototype._getStyleProxy = function(e) {
            var n = this
              , t = e[Vm];
            return t || (t = new this.nativeMethods.Proxy(e,{
                get: function(e, t) {
                    return -1 !== n.URL_PROPS.indexOf(t) || -1 !== n.DASHED_URL_PROPS.indexOf(t) ? Fl.cleanUp(e[t], Qt) : t === Gm ? e : e[t]
                },
                set: function(e, t, r) {
                    return -1 === n.URL_PROPS.indexOf(t) && -1 === n.DASHED_URL_PROPS.indexOf(t) || "string" == typeof r && (r = Fl.process(r, w)),
                    e[t] = r,
                    !0
                }
            }),
            this.nativeMethods.objectDefineProperty(e, Vm, {
                value: t
            })),
            t
        }
        ,
        qm.prototype._overrideCSSStyleDeclarationFunctionsCtx = function(r) {
            var e, n = r.CSSStyleDeclaration.prototype, o = this;
            for (e in n)
                !function(e) {
                    var t = o.nativeMethods.objectGetOwnPropertyDescriptor.call(r.Object, n, e).value;
                    o.nativeMethods.objectHasOwnProperty.call(n, e) && "function" == typeof t && (n[e] = function() {
                        return t.apply(this[Gm] || this, arguments)
                    }
                    ,
                    de(n[e], t))
                }(e)
        }
        ,
        qm.prototype.attach = function(e) {
            Fm.prototype.attach.call(this, e);
            var n = this.nativeMethods
              , t = this;
            if (d(e[n.htmlElementStylePropOwnerName].prototype, "style", {
                getter: this.FEATURES.css2PropertiesProtoContainsAllProps || this.FEATURES.cssStyleDeclarationContainsAllProps ? null : function() {
                    var e = n.htmlElementStyleGetter.call(this);
                    return t.FEATURES.propsCannotBeOverridden ? t._getStyleProxy(e) : t._processStyleInstance(e)
                }
                ,
                setter: n.htmlElementStyleSetter ? function(e) {
                    e = Fl.process(e, w);
                    n.htmlElementStyleSetter.call(this, e)
                }
                : null
            }),
            this.FEATURES.css2PropertiesProtoContainsAllProps) {
                for (var r = 0, o = this.URL_PROPS; r < o.length; r++) {
                    var i = o[r];
                    this._overrideStyleProp(e.CSS2Properties.prototype, i)
                }
                for (var s = 0, a = this.DASHED_URL_PROPS; s < a.length; s++) {
                    i = a[s];
                    this._overrideStyleProp(e.CSS2Properties.prototype, i)
                }
            } else {
                if (this.FEATURES.cssStyleDeclarationProtoContainsUrlProps)
                    for (var l = 0, c = this.URL_PROPS; l < c.length; l++) {
                        i = c[l];
                        this._overrideStyleProp(e.CSSStyleDeclaration.prototype, i)
                    }
                if (this.FEATURES.cssStyleDeclarationProtoContainsDashedProps)
                    for (var p = 0, u = this.DASHED_URL_PROPS; p < u.length; p++) {
                        i = u[p];
                        this._overrideStyleProp(e.CSSStyleDeclaration.prototype, i)
                    }
            }
            d(e.CSSStyleDeclaration.prototype, "cssText", {
                getter: function() {
                    var e = n.styleCssTextGetter.call(this);
                    return Fl.cleanUp(e, Qt)
                },
                setter: function(e) {
                    "string" == typeof e && (e = Fl.process(e, w)),
                    n.styleCssTextSetter.call(this, e)
                }
            }),
            f(e.CSSStyleSheet.prototype, "insertRule", function(e, t) {
                e = Fl.process(e, w);
                return n.styleInsertRule.call(this, e, t)
            }),
            f(e.CSSStyleDeclaration.prototype, "getPropertyValue", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var r = n.styleGetPropertyValue.apply(this, e);
                return Fl.cleanUp(r, Qt)
            }),
            f(e.CSSStyleDeclaration.prototype, "setProperty", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var r = e[1];
                return "string" == typeof r && (e[1] = Fl.process(r, w)),
                n.styleSetProperty.apply(this, e)
            }),
            f(e.CSSStyleDeclaration.prototype, "removeProperty", function() {
                for (var e = [], t = 0; t < arguments.length; t++)
                    e[t] = arguments[t];
                var r = n.styleRemoveProperty.apply(this, e);
                return Fl.cleanUp(r, Qt)
            }),
            this.FEATURES.propsCannotBeOverridden && this._overrideCSSStyleDeclarationFunctionsCtx(e)
        }
        ,
        qm);
        function qm() {
            var e = Fm.call(this) || this;
            return e.URL_PROPS = ["background", "backgroundImage", "borderImage", "borderImageSource", "listStyle", "listStyleImage", "cursor"],
            e.DASHED_URL_PROPS = qm._generateDashedProps(e.URL_PROPS),
            e.FEATURES = e._detectBrowserFeatures(),
            e
        }
        var Km, zm = "__BROWSERTOOLS_CONSOLE_SAFEFUNC", Xm = (e($m, Km = r),
        $m.prototype._createFuncWrapper = function(e) {
            var o = this;
            return "function" == typeof e ? function(t, r) {
                var n = o;
                return function() {
                    n._isDebuggerInitiator = !0;
                    try {
                        var e = t(arguments);
                        return n._isDebuggerInitiator = !1,
                        e
                    } catch (e) {
                        r(e)
                    }
                    n._isDebuggerInitiator = !1
                }
            }
            : e
        }
        ,
        $m.prototype.isDebuggerInitiator = function() {
            return this._isDebuggerInitiator
        }
        ,
        $m.prototype.attach = function(e) {
            var t, r, n = this;
            S && (t = this.nativeMethods.objectGetOwnPropertyDescriptor(e, zm),
            r = void 0,
            t && !t.value || (t && (r = this._createFuncWrapper(t.value)),
            this.nativeMethods.objectDefineProperty(e, zm, {
                set: function(e) {
                    r = n._createFuncWrapper(e)
                },
                get: function() {
                    return r
                }
            })))
        }
        ,
        $m);
        function $m() {
            var e = Km.call(this) || this;
            return e._isDebuggerInitiator = !1,
            e
        }
        var Ym, Qm = "hammerhead|command|store-child-window", Jm = (e(Zm, Ym = r),
        Zm._shouldOpenInNewWindowOnElementAction = function(e, t) {
            if ("string" == typeof b.getAttribute.call(e, "download"))
                return !1;
            e = this._calculateTargetForElement(e);
            return this._shouldOpenInNewWindow(e, t)
        }
        ,
        Zm._shouldOpenInNewWindow = function(e, t) {
            return hu(e = (e = e || t).toLowerCase()) ? "_blank" === e : !Ip(e)
        }
        ,
        Zm.prototype._openUrlInNewWindow = function(e, t, r, n) {
            o = new b.Uint16Array(1),
            b.cryptoGetRandomValues.call(b.crypto, o);
            var o = o[0].toString()
              , e = (r = r || "width=500px, height=500px",
            t = t || o,
            zt(e, o))
              , n = n || this.window
              , n = b.windowOpen.call(n, e, t, r);
            return this._tryToStoreChildWindow(n, xd()),
            this.emit(this.WINDOW_OPENED_EVENT, {
                windowId: o,
                window: n
            }),
            {
                windowId: o,
                wnd: n
            }
        }
        ,
        Zm._calculateTargetForElement = function(e) {
            var t = b.querySelector.call(En(e), "base");
            return e.target || (null == t ? void 0 : t.target)
        }
        ,
        Zm.prototype.handleClickOnLinkOrArea = function(r) {
            var n = this;
            m.get().allowMultipleWindows && (this._listeners.initElementListening(r, ["click"]),
            this._listeners.addInternalEventAfterListener(r, ["click"], function(e) {
                var t;
                e.defaultPrevented || Zm._shouldOpenInNewWindowOnElementAction(r, jh.linkOrArea) && (t = b.anchorHrefGetter.call(r),
                e.preventDefault(),
                n._openUrlInNewWindowIfNotPrevented(t, e))
            }))
        }
        ,
        Zm.prototype._openUrlInNewWindowIfNotPrevented = function(e, t) {
            var r = this
              , n = !1
              , o = !1
              , i = function() {
                n = !0,
                Mh.getNativeRemoveEventListener(window).call(window, "click", i),
                o || r._openUrlInNewWindow(e)
            }
              , s = (Mh.getNativeAddEventListener(window).call(window, "click", i),
            t.preventDefault);
            t.preventDefault = function() {
                return o = !0,
                s.call(t)
            }
            ,
            Jd().then(function() {
                n || i()
            })
        }
        ,
        Zm.prototype.handleWindowOpen = function(e, t) {
            var r = t[0]
              , n = t[1]
              , o = t[2];
            return m.get().allowMultipleWindows && Zm._shouldOpenInNewWindow(n, jh.windowOpen) ? this._openUrlInNewWindow(r, n, o, e).wnd : (Ie && 15 <= be && this.emit(this.BEFORE_WINDOW_OPEN_IN_SAME_TAB, {
                url: r
            }),
            b.windowOpen.apply(e, t))
        }
        ,
        Zm.prototype._handleFormSubmitting = function(e) {
            var n = this;
            m.get().allowMultipleWindows && (this._listeners.initElementListening(e, ["submit"]),
            this._listeners.addInternalEventBeforeListener(e, ["submit"], function(e) {
                var t, r, e = b.eventTargetGetter.call(e);
                eo(e) && Zm._shouldOpenInNewWindowOnElementAction(e, jh.form) && (t = w(Je),
                t = n._openUrlInNewWindow(t),
                r = zt(b.formActionGetter.call(e), t.windowId),
                b.formActionSetter.call(e, r),
                b.formTargetSetter.call(e, t.windowId))
            }))
        }
        ,
        Zm.prototype._tryToStoreChildWindow = function(e, t) {
            try {
                return t[_.hammerhead].sandbox.childWindow.addWindow(e),
                !0
            } catch (e) {
                return !1
            }
        }
        ,
        Zm.prototype._setupChildWindowCollecting = function(e) {
            var t, r = this;
            wn(e) || (e !== (t = xd()) ? this._tryToStoreChildWindow(e, t) || this._messageSandbox.sendServiceMsg({
                cmd: Qm
            }, t) : (this._childWindows = new Set,
            this._messageSandbox.on(this._messageSandbox.SERVICE_MSG_RECEIVED_EVENT, function(e) {
                var t = e.message
                  , e = e.source;
                t.cmd === Qm && r._childWindows.add(e)
            })))
        }
        ,
        Zm.prototype.addWindow = function(e) {
            this._childWindows.add(e)
        }
        ,
        Zm.prototype.getChildWindows = function() {
            var t = this
              , r = [];
            return this._childWindows.forEach(function(e) {
                e.parent ? r.push(e) : t._childWindows.delete(e)
            }),
            r
        }
        ,
        Zm.prototype.attach = function(e) {
            Ym.prototype.attach.call(this, e, e.document),
            this._handleFormSubmitting(e),
            this._setupChildWindowCollecting(e)
        }
        ,
        Zm);
        function Zm(e, t) {
            var r = Ym.call(this) || this;
            return r._messageSandbox = e,
            r._listeners = t,
            r.WINDOW_OPENED_EVENT = "hammerhead|event|window-opened",
            r.BEFORE_WINDOW_OPEN_IN_SAME_TAB = "hammerhead|event|before-window-open-in-same-tab",
            r
        }
        e(rg, eg = r),
        rg._canUseSandbox = function(e) {
            try {
                e.off()
            } catch (e) {
                return !1
            }
            return !0
        }
        ,
        rg.prototype.onIframeDocumentRecreated = function(e) {
            var t, r, n;
            e && (t = b.contentWindowGetter.call(e),
            r = b.contentDocumentGetter.call(e),
            (n = dh(t)) && rg._canUseSandbox(n) ? t[_.sandboxIsReattached] && n.document === r || n.reattach(t, r) : (t[_.iframeNativeMethods] && delete t[_.iframeNativeMethods],
            this.nativeMethods.restoreDocumentMeths(t, r),
            this.iframe.onIframeBeganToRun(e)))
        }
        ,
        rg.prototype.reattach = function(e, t) {
            b.objectDefineProperty(e, _.sandboxIsReattached, {
                value: !0,
                configurable: !1
            }),
            S && this.nativeMethods.refreshIfNecessary(t, e),
            Nt.init(t),
            this.event.reattach(e),
            this.shadowUI.attach(e),
            this.codeInstrumentation.attach(e),
            this.node.doc.attach(e, t),
            this.console.attach(e),
            this.childWindow.attach(e)
        }
        ,
        rg.prototype.attach = function(e) {
            var t = this;
            eg.prototype.attach.call(this, e),
            b.objectDefineProperty(e, _.sandboxIsReattached, {
                value: !0,
                configurable: !1
            }),
            Nt.init(this.document),
            this.iframe.on(this.iframe.EVAL_HAMMERHEAD_SCRIPT_EVENT, function(e) {
                b.contentWindowGetter.call(e.iframe).eval("(" + yg.toString() + ")();//# sourceURL=hammerhead.js")
            }),
            this.node.mutation.on(this.node.mutation.DOCUMENT_CLEANED_EVENT, function(e) {
                return t.reattach(e.window, e.document)
            }),
            this.ieDebug.attach(e),
            this.iframe.attach(e),
            this.xhr.attach(e),
            this.fetch.attach(e),
            this.storageSandbox.attach(e),
            this.codeInstrumentation.attach(e),
            this.shadowUI.attach(e),
            this.event.attach(e),
            this.node.attach(e),
            this.upload.attach(e),
            this.cookie.attach(e),
            this.console.attach(e),
            this.style.attach(e),
            this.childWindow.attach(e),
            this.electron && this.electron.attach(e),
            this.unload.on(this.unload.UNLOAD_EVENT, function() {
                return t.dispose()
            })
        }
        ,
        rg.prototype._removeInternalProperties = function() {
            for (var e = this.event.listeners.listeningCtx.removeListeningElement, t = (e(this.window),
            e(this.document),
            b.querySelectorAll.call(this.document, "*")), r = b.nodeListLengthGetter.call(t), n = 0; n < r; n++) {
                var o = t[n];
                delete o[_.processedContext],
                e(o)
            }
        }
        ,
        rg.prototype.dispose = function() {
            this.event.hover.dispose(),
            this.event.focusBlur.dispose(),
            pp(),
            Eh = vh = null,
            Nt.dispose(this.document),
            this.storageSandbox.dispose(),
            this._removeInternalProperties()
        }
        ;
        var eg, tg = rg;
        function rg(e) {
            var t = eg.call(this) || this
              , r = (hh(window, t),
            Ap(window),
            new Xm)
              , n = new Mh
              , o = new Wf
              , i = new Qf(n)
              , s = new Uf(n,i)
              , a = new Bf
              , l = new qd(a)
              , c = new zf
              , p = new Jm(s,n)
              , u = new Ud(s,i,p);
            return t.ieDebug = r,
            t.cookie = u,
            t.childWindow = p,
            t.storageSandbox = new Lm(n,i,a),
            t.xhr = new dm(u),
            t.fetch = new vm(u),
            t.iframe = new Oc(o,u),
            t.shadowUI = new Ju(o,s,t.iframe,r),
            t.upload = new gh(n,a,e),
            t.event = new Cf(n,a,l,i,s,t.shadowUI,c),
            t.node = new Nu(o,t.iframe,t.event,t.upload,t.shadowUI,u,t.childWindow),
            t.codeInstrumentation = new ad(t.event,s),
            t.console = new Hm(s),
            t.style = new Wm,
            t.unload = i,
            Oe && (t.electron = new Mm),
            t.windowStorage = Op,
            t
        }
        og._getStoredMessages = function() {
            var e = b.winLocalStorageGetter.call(window)
              , e = b.storageGetItem.call(e, m.get().sessionId);
            return e ? Ca(e) : []
        }
        ,
        og._storeMessage = function(e) {
            var t = og._getStoredMessages()
              , r = b.winLocalStorageGetter.call(window);
            t.push(e),
            b.storageSetItem.call(r, m.get().sessionId, Ta(t))
        }
        ,
        og._removeMessageFromStore = function(e) {
            for (var t = og._getStoredMessages(), r = b.winLocalStorageGetter.call(window), n = 0; n < t.length; n++)
                if (t[n].cmd === e) {
                    t.splice(n, 1);
                    break
                }
            b.storageSetItem.call(r, m.get().sessionId, Ta(t))
        }
        ,
        og.prototype.batchUpdate = function() {
            var e = og._getStoredMessages();
            if (!e.length)
                return se.resolve();
            var t = []
              , r = b.winLocalStorageGetter.call(window);
            b.storageRemoveItem.call(r, m.get().sessionId);
            for (var n = 0, o = e; n < o.length; n++) {
                var i = o[n];
                t.push(this.queuedAsyncServiceMsg(i))
            }
            return se.all(t)
        }
        ,
        og.prototype.waitForServiceMessagesCompleted = function(n) {
            var o = this;
            return new se(function(e) {
                var t, r;
                o._activeServiceMsgCount ? (r = null,
                t = b.setTimeout.call(window, function() {
                    b.clearInterval.call(window, r),
                    e()
                }, n),
                r = b.setInterval.call(window, function() {
                    o._activeServiceMsgCount || (b.clearInterval.call(window, r),
                    b.clearTimeout.call(window, t),
                    e())
                }, 50)) : e()
            }
            )
        }
        ;
        var ng = og;
        function og() {
            this._activeServiceMsgCount = 0
        }
        var ig, sg = "hammerhead|command|get-message-port", ag = "hammerhead|command|set-message-port", lg = (e(cg, ig = ng),
        cg.prototype.start = function(o) {
            var i = this;
            window === window.rammerheadTop ? (this._transportWorker = new b.Worker(m.get().transportWorkerUrl,{
                name: "Transport"
            }),
            this._transportWorker.postMessage({
                cmd: "hammerhead|transport|set-initial-worker-settings",
                sessionId: m.get().sessionId,
                serviceMsgUrl: m.get().serviceMsgUrl
            }),
            this._transportWorker.addEventListener("message", function(e) {
                return i._onWorkerMessage(e)
            }),
            this._processQueue()) : o.sendServiceMsg({
                cmd: sg
            }, window.rammerheadTop),
            o.on(o.SERVICE_MSG_RECEIVED_EVENT, function(e) {
                var t, r = e.message, n = e.source, e = e.ports;
                r.cmd === sg ? (t = new b.MessageChannel,
                o.sendServiceMsg({
                    cmd: ag
                }, n, [t.port1]),
                i._transportWorker.postMessage({
                    cmd: "hammerhead|transport|handle-port"
                }, [t.port2])) : r.cmd === ag && (i._transportWorker = e[0],
                i._transportWorker.onmessage = function(e) {
                    return i._onWorkerMessage(e)
                }
                ,
                i._processQueue())
            })
        }
        ,
        cg.prototype._processQueue = function() {
            for (var e = 0, t = this._queue; e < t.length; e++) {
                var r = t[e];
                this._transportWorker.postMessage(r)
            }
            this._queue.length = 0
        }
        ,
        cg._shouldAddReferer = function() {
            var e = hn(window);
            return e && Dn(e)
        }
        ,
        cg.prototype._onWorkerMessage = function(e) {
            var e = e.data
              , t = e.id
              , e = e.result;
            this._messageCallbacks.has(t) && (this._messageCallbacks.get(t)(e.err, e.data),
            this._messageCallbacks.delete(t))
        }
        ,
        cg.prototype.asyncServiceMsg = function(o, t) {
            var i = this;
            return void 0 === t && (t = !1),
            new se(function(r, n) {
                var e = i._idGenerator.increment();
                ++i._activeServiceMsgCount,
                i._shouldAddReferer && (o.referer = m.get().referer),
                i._messageCallbacks.set(e, function(e, t) {
                    --i._activeServiceMsgCount,
                    e ? (o.disableResending || !Ne && !Te || (ng._removeMessageFromStore(o.cmd),
                    ng._storeMessage(o),
                    r()),
                    o.allowRejecting && n(new Error(e))) : r(t)
                }),
                i._transportWorker ? i._transportWorker.postMessage({
                    id: e,
                    queued: t,
                    msg: o
                }) : i._queue.push({
                    id: e,
                    queued: t,
                    msg: o
                })
            }
            )
        }
        ,
        cg.prototype.queuedAsyncServiceMsg = function(e) {
            return this.asyncServiceMsg(e, !0)
        }
        ,
        cg);
        function cg() {
            var e = null !== ig && ig.apply(this, arguments) || this;
            return e._transportWorker = null,
            e._idGenerator = new dc,
            e._messageCallbacks = new Map,
            e._queue = [],
            e._shouldAddReferer = cg._shouldAddReferer(),
            e
        }
        e(hg, pg = ke),
        hg.prototype._formWatch = function(e, o) {
            function i(e) {
                var t = hg._getTargetWindow(e);
                hg._onNavigationTriggeredInWindow(t, b.formActionGetter.call(e))
            }
            e.on(e.BEFORE_FORM_SUBMIT_EVENT, function(e) {
                return i(e.form)
            }),
            o.listeners.initElementListening(window, ["submit"]),
            o.listeners.addInternalEventBeforeListener(window, ["submit"], function(t) {
                var e, r = !1, n = b.eventTargetGetter.call(t);
                eo(n) && (o.on(o.EVENT_PREVENTED_EVENT, e = function(e) {
                    r = r || e === t
                }
                ),
                Jd().then(function() {
                    o.off(o.EVENT_PREVENTED_EVENT, e),
                    t.defaultPrevented || r || i(n)
                }))
            })
        }
        ,
        hg._getTargetWindow = function(e) {
            var t = b.getAttribute.call(e, P.getStoredAttrName("target")) || b.getAttribute.call(e, "target") || "_self";
            switch (t) {
            case "_top":
                return window.rammerheadTop;
            case "_parent":
                return window.rammerheadParent;
            case "_self":
                return window;
            default:
                return Ip(t)
            }
        }
        ,
        hg.prototype._linkWatch = function(s) {
            s.listeners.initElementListening(window, ["click"]),
            s.listeners.addInternalEventBeforeListener(window, ["click"], function(t) {
                var r, e, n, o, i = b.eventTargetGetter.call(t), i = Po(i) ? i : Ho(i, "a");
                i && !x(i) && (r = !1,
                e = hg._getTargetWindow(i),
                n = b.anchorHrefGetter.call(i),
                s.on(s.EVENT_PREVENTED_EVENT, o = function(e) {
                    r = r || e === t
                }
                ),
                Jd().then(function() {
                    s.off(s.EVENT_PREVENTED_EVENT, o),
                    t.defaultPrevented || r || hg._onNavigationTriggeredInWindow(e, n)
                }))
            })
        }
        ,
        hg.prototype._locationWatch = function(e) {
            var t = this
              , e = e._locationAccessorsInstrumentation;
            e.on(e.LOCATION_CHANGED_EVENT, function(e) {
                return t.onNavigationTriggered(e)
            })
        }
        ,
        hg._onNavigationTriggeredInWindow = function(e, t) {
            try {
                e[_.hammerhead].pageNavigationWatch.onNavigationTriggered(t)
            } catch (e) {}
        }
        ,
        hg.prototype._childWindowWatch = function(e) {
            var t = this;
            e.on(e.BEFORE_WINDOW_OPEN_IN_SAME_TAB, function(e) {
                e = e.url;
                t.onNavigationTriggered(e)
            })
        }
        ,
        hg.prototype.onNavigationTriggered = function(e) {
            var t = this._lastLocationValue;
            this._lastLocationValue = window.location.toString(),
            e !== t && ("#" === e.charAt(0) || ar(t, e)) || P.isJsProtocol(e) || (t = ht(e)) && this.emit(this.PAGE_NAVIGATION_TRIGGERED_EVENT, t.destUrl)
        }
        ,
        hg.prototype.start = function() {
            this._locationWatch(this._codeInstrumentation),
            this._linkWatch(this._eventSandbox),
            this._formWatch(this._elementSandbox, this._eventSandbox),
            this._childWindowWatch(this._childWindowSandbox)
        }
        ;
        var pg, ug = hg;
        function hg(e, t, r, n) {
            var o = pg.call(this) || this;
            return o._eventSandbox = e,
            o._codeInstrumentation = t,
            o._elementSandbox = r,
            o._childWindowSandbox = n,
            o.PAGE_NAVIGATION_TRIGGERED_EVENT = "hammerhead|event|page-navigation-triggered",
            o._lastLocationValue = window.location.toString(),
            o
        }
        var dg = "." + Me.script;
        function fg() {
            var e = b.querySelector.call(document, dg);
            e && Hc(e)
        }
        function mg() {
            var r = this
              , e = (this.win = null,
            this.transport = new lg,
            this.sandbox = new tg(this.transport),
            this.pageNavigationWatch = new ug(this.sandbox.event,this.sandbox.codeInstrumentation,this.sandbox.node.element,this.sandbox.childWindow),
            this.EVENTS = {
                beforeFormSubmit: this.sandbox.node.element.BEFORE_FORM_SUBMIT_EVENT,
                beforeBeforeUnload: this.sandbox.event.unload.BEFORE_BEFORE_UNLOAD_EVENT,
                beforeUnload: this.sandbox.event.unload.BEFORE_UNLOAD_EVENT,
                unload: this.sandbox.event.unload.UNLOAD_EVENT,
                bodyCreated: this.sandbox.node.mutation.BODY_CREATED_EVENT,
                documentCleaned: this.sandbox.node.mutation.DOCUMENT_CLEANED_EVENT,
                uncaughtJsError: this.sandbox.node.win.UNCAUGHT_JS_ERROR_EVENT,
                unhandledRejection: this.sandbox.node.win.UNHANDLED_REJECTION_EVENT,
                startFileUploading: this.sandbox.upload.START_FILE_UPLOADING_EVENT,
                endFileUploading: this.sandbox.upload.END_FILE_UPLOADING_EVENT,
                evalIframeScript: this.sandbox.iframe.EVAL_EXTERNAL_SCRIPT_EVENT,
                xhrCompleted: this.sandbox.xhr.XHR_COMPLETED_EVENT,
                xhrError: this.sandbox.xhr.XHR_ERROR_EVENT,
                beforeXhrSend: this.sandbox.xhr.BEFORE_XHR_SEND_EVENT,
                fetchSent: this.sandbox.fetch.FETCH_REQUEST_SENT_EVENT,
                pageNavigationTriggered: this.pageNavigationWatch.PAGE_NAVIGATION_TRIGGERED_EVENT,
                scriptElementAdded: this.sandbox.node.element.SCRIPT_ELEMENT_ADDED_EVENT,
                consoleMethCalled: this.sandbox.console.CONSOLE_METH_CALLED_EVENT,
                windowOpened: this.sandbox.childWindow.WINDOW_OPENED_EVENT
            },
            this.PROCESSING_INSTRUCTIONS = {
                dom: {
                    script: v,
                    internal_attributes: a,
                    internal_props: _
                }
            },
            this.SHADOW_UI_CLASS_NAME = Me,
            this.SESSION_COMMAND = ih,
            this.EventEmitter = ke,
            this.doUpload = function(e, t) {
                return r.sandbox.upload.doUpload(e, t)
            }
            ,
            this.createNativeXHR = dm.createNativeXHR,
            this.processScript = wl,
            this.Promise = se,
            this.json = Aa,
            this.nativeMethods = this.sandbox.nativeMethods,
            this.shadowUI = this.sandbox.shadowUI,
            this.storages = this.sandbox.storageSandbox,
            this.eventSandbox = {
                listeners: this.sandbox.event.listeners,
                hover: this.sandbox.event.hover,
                focusBlur: this.sandbox.event.focusBlur,
                elementEditingWatcher: this.sandbox.event.elementEditingWatcher,
                eventSimulator: this.sandbox.event.eventSimulator,
                selection: this.sandbox.event.selection,
                message: this.sandbox.event.message,
                timers: this.sandbox.event.timers,
                DataTransfer: this.sandbox.event.DataTransfer,
                DragDataStore: this.sandbox.event.DragDataStore
            },
            {
                script: xl,
                header: ja,
                instrumentation: Is
            });
            this.utils = {
                browser: Le,
                dom: pi,
                event: ru,
                position: Fu,
                style: Ur,
                types: Ic,
                trim: Re,
                extend: Af,
                html: hp,
                url: ur,
                featureDetection: Sr,
                destLocation: Ft,
                overriding: ge,
                cookie: Bd,
                getMimeType: oh,
                urlResolver: Nt,
                processing: e,
                removeInjectedScript: fg
            },
            this.sharedUtils = {
                cookie: bd,
                url: Pt,
                headers: um,
                stackProcessing: ua,
                selfRemovingScripts: Rc
            },
            this.settings = m,
            this.sandboxes = {
                XhrSandbox: dm,
                StyleSandbox: Wm,
                ShadowUISandbox: Ju,
                ElectronSandbox: Mm,
                UploadSandbox: gh,
                ChildWindowSandbox: Jm
            },
            this.sandboxUtils = {
                hiddenInfo: Vp,
                listeningContext: Lh,
                backup: mh,
                domMutationTracker: pu,
                defaultTarget: jh,
                UploadInfoManager: lh,
                FileListWrapper: sh,
                EventListeners: Mh,
                StorageWrapper: xm,
                CodeInstrumentation: ad,
                LocationInstrumentation: wc,
                LocationWrapper: Ec
            },
            this.processors = {
                styleProcessor: Fl,
                domProcessor: N,
                DomProcessor: P
            }
        }
        mg.prototype._getEventOwner = function(e) {
            switch (e) {
            case this.EVENTS.pageNavigationTriggered:
                return this.pageNavigationWatch;
            case this.EVENTS.beforeUnload:
            case this.EVENTS.beforeBeforeUnload:
            case this.EVENTS.unload:
                return this.sandbox.event.unload;
            case this.EVENTS.bodyCreated:
            case this.EVENTS.documentCleaned:
                return this.sandbox.node.mutation;
            case this.EVENTS.uncaughtJsError:
            case this.EVENTS.unhandledRejection:
                return this.sandbox.node.win;
            case this.EVENTS.startFileUploading:
            case this.EVENTS.endFileUploading:
                return this.sandbox.upload;
            case this.EVENTS.evalIframeScript:
                return this.sandbox.iframe;
            case this.EVENTS.xhrCompleted:
            case this.EVENTS.xhrError:
            case this.EVENTS.beforeXhrSend:
                return this.sandbox.xhr;
            case this.EVENTS.beforeFormSubmit:
            case this.EVENTS.scriptElementAdded:
                return this.sandbox.node.element;
            case this.EVENTS.fetchSent:
                return this.sandbox.fetch;
            case this.EVENTS.consoleMethCalled:
                return this.sandbox.console;
            case this.EVENTS.windowOpened:
                return this.sandbox.childWindow;
            default:
                return null
            }
        }
        ,
        mg._cleanLocalStorageServiceData = function(e, t) {
            t = b.winLocalStorageGetter.call(t);
            b.storageRemoveItem.call(t, e)
        }
        ,
        mg.prototype.on = function(e, t) {
            var r = this._getEventOwner(e);
            r && r.on(e, t)
        }
        ,
        mg.prototype.off = function(e, t) {
            var r = this._getEventOwner(e);
            r && r.off(e, t)
        }
        ,
        mg.prototype.navigateTo = function(e, t) {
            var r = this
              , e = qt(e, this.win);
            e && (this.win.location = e,
            t && this.sandbox.node.win.on(this.sandbox.node.win.HASH_CHANGE_EVENT, function() {
                r.win.location.reload(!0)
            }))
        }
        ,
        mg.prototype.start = function(e, t) {
            this.win = t || window,
            m.set(e),
            e.isFirstPageLoad && mg._cleanLocalStorageServiceData(e.sessionId, this.win),
            N.forceProxySrcForImage = e.forceProxySrcForImage,
            N.allowMultipleWindows = e.allowMultipleWindows,
            this.transport.start(this.eventSandbox.message),
            this.sandbox.attach(this.win),
            this.pageNavigationWatch.start()
        }
        ;
        var n = new mg
          , gg = (b.objectDefineProperty(window, _.hammerhead, {
            value: n,
            configurable: !0
        }),
        n)
    }()
}(),
window["%hammerhead%"].utils.removeInjectedScript();
