!function() {
    window.rammerheadDisableLocalStorageImplementation = !0,
    window.rammerheadStartListeners = [function() {
        const i = window["%hammerhead%"]
          , s = i.settings._settings.sessionId
          , c = window.__get$(window, "location").origin
          , d = (window.__get$(window, "location").href,
        `rhbrowser|${s}|` + c)
          , l = localStorage
          , w = l.internal.nativeStorage
          , e = sessionStorage.internal.nativeStorage;
        "https://discord.com" === c && Object.defineProperty(window, "outerHeight", {
            configurable: !0,
            enumerable: !0,
            get: Object.getOwnPropertyDescriptor(window, "innerHeight").get,
            set: Object.getOwnPropertyDescriptor(window, "outerHeight").set
        });
        window.WebSocket = new Proxy(g,{
            construct(e, t, o) {
                if (t[0]) {
                    var n = new URL(t[0]).href;
                    const a = i.createNativeXHR();
                    a.open("GET", `/api/getCookie?id=${encodeURIComponent(s)}&url=` + encodeURIComponent(new URL(t[0]).origin), !1),
                    a.send();
                    var r = JSON.parse(a.responseText).data;
                    t[0] = `${window.location.origin.replace(/^http/, "ws")}/wsdirect/?origin=${encodeURIComponent(c)}&cookie=${encodeURIComponent(r)}&url=` + encodeURIComponent(n)
                }
                return Reflect.construct(e, t, o)
            }
        });
        for (const n of i.nativeMethods.documentCookieGetter.call(document).split(";")) {
            var t = n.split("|")[1];
            t && t.length === s.length && !w["rhdatabase-" + t] && i.nativeMethods.documentCookieSetter.call(document, n.split("=")[0] + "=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT")
        }
        for (const r in e)
            r.startsWith("rammerhead|storage-wrapper|") && !w["rhdatabase-" + r.split("|")[2]] && delete e[r];
        for (const a in w)
            a.startsWith("rammerhead|storage-wrapper|") && !w["rhdatabase-" + a.split("|")[2]] ? delete w[a] : a.startsWith("rhbrowser|") && !w["rhdatabase-" + a.split("|")[1]] && (delete w[a],
            delete w["notSynced|" + a]);
        var o = w["rhdatabase-" + s];
        if (!o)
            throw new Error("cannot find localStorage database. (are you running this independently of the rammerhead browser?)");
        indexedDB.open(o).onsuccess = async function(t) {
            const e = t.target.result;
            var o, n = w[d] || (o = e.transaction("localStorage", "readonly").objectStore("localStorage").get(c),
            ((await new Promise((e,t)=>{
                o.onsuccess = e,
                o.onerror = t
            }
            )).result || {}).data);
            if (l.clear(),
            delete w["notSynced|" + d],
            n) {
                let e;
                try {
                    e = JSON.parse(n)
                } catch (t) {
                    console.error("unable to parse localStorage data. Data may be lost. initData: " + n)
                }
                if (e)
                    for (const a in e)
                        l.setItem(a, e[a])
            }
            const r = ()=>JSON.stringify(l);
            setInterval(()=>{
                e.transaction("localStorage", "readwrite").objectStore("localStorage").put({
                    origin: c,
                    data: r()
                })
            }
            , 5e3),
            document.addEventListener("visibilitychange", function() {
                "hidden" === document.visibilityState && (w[d] = r(),
                w["notSynced|" + d] = "true")
            })
        }
    }
    ];
    const g = WebSocket
}();
