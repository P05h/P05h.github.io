(function () {

    // -------------------------------------------------------------
    // WARNING: this file is used by both the client and the server.
    // Do not use any browser or node-specific API!
    // -------------------------------------------------------------
    /* eslint hammerhead/proto-methods: 2 */
    var BUILTIN_HEADERS = {
        authorization: 'authorization',
        wwwAuthenticate: 'www-authenticate',
        proxyAuthorization: 'proxy-authorization',
        proxyAuthenticate: 'proxy-authenticate',
        host: 'host',
        referer: 'referer',
        origin: 'origin',
        contentLength: 'content-length',
        cookie: 'cookie',
        setCookie: 'set-cookie',
        ifModifiedSince: 'if-modified-since',
        ifNoneMatch: 'if-none-match',
        contentType: 'content-type',
        location: 'location',
        xFrameOptions: 'x-frame-options',
        sourceMap: 'sourcemap',
        referrerPolicy: 'referrer-policy',
        refresh: 'refresh',
        link: 'link',
        cacheControl: 'cache-control',
        pragma: 'pragma',
        eTag: 'etag',
        contentDisposition: 'content-disposition',
        accept: 'accept',
        contentEncoding: 'content-encoding',
        expires: 'expires',
        trailer: 'trailer',
        transferEncoding: 'transfer-encoding',
        serviceWorkerAllowed: 'service-worker-allowed',
        accessControlAllowOrigin: 'access-control-allow-origin',
        accessControlAllowCredentials: 'access-control-allow-credentials',
        contentSecurityPolicy: 'content-security-policy',
        contentSecurityPolicyReportOnly: 'content-security-policy-report-only',
        xContentSecurityPolicy: 'x-content-security-policy',
        xContentSecurityPolicyReportOnly: 'x-content-security-policy-report-only',
        xWebkitCsp: 'x-webkit-csp'
    };

    function handleResolve(ctx, e) {
        var xhr = e.target;
        // NOTE: The 500 status code is returned by server when an error occurred into service message handler
        if (xhr.status === 500 && xhr.responseText) {
            ctx.msg.disableResending = true;
            handleReject(ctx, e);
        }
        else
            ctx.callback(null, xhr.responseText && JSON.parse(xhr.responseText));
    }
    function handleReject(ctx, e) {
        var xhr = e.target;
        if (ctx.msg.disableResending) {
            var errorMsg = "XHR request failed with " + xhr.status + " status code.";
            if (xhr.responseText)
                errorMsg += "\nError message: " + xhr.responseText;
            ctx.callback(errorMsg);
        }
        else {
            ctx.msg.disableResending = true;
            request(ctx.url, ctx.msg, ctx.callback);
        }
    }
    function handleEvent(e) {
        var ctx = this;
        if (e.type === 'load')
            handleResolve(ctx, e);
        else
            handleReject(ctx, e);
    }
    function request(url, msg, callback) {
        var xhr = new XMLHttpRequest();
        var ctx = { url: url, msg: msg, callback: callback, handleEvent: handleEvent };
        xhr.open('POST', url, true);
        xhr.setRequestHeader(BUILTIN_HEADERS.cacheControl, 'no-cache, no-store, must-revalidate');
        xhr.addEventListener('load', ctx);
        xhr.addEventListener('abort', ctx);
        xhr.addEventListener('error', ctx);
        xhr.addEventListener('timeout', ctx);
        xhr.send(JSON.stringify(msg));
    }

    var SET_INITIAL_WORKER_SETTINGS_CMD = 'hammerhead|transport|set-initial-worker-settings';
    var HANDLE_PORT_CMD = 'hammerhead|transport|handle-port';

    var serviceMsgUrl = '';
    var sessionId = '';
    var msgQueue = {};
    function asyncServiceMsg(msg, callback) {
        request(serviceMsgUrl, msg, function (err, data) { return callback({ err: err, data: data }); });
    }
    function queuedAsyncServiceMsg(msg, callback) {
        if (!msgQueue[msg.cmd])
            msgQueue[msg.cmd] = [];
        msgQueue[msg.cmd].push({ msg: msg, callback: callback });
        var asyncMsgCallback = function (result) {
            var queuedMsg = msgQueue[msg.cmd].shift();
            queuedMsg.callback(result);
            if (msgQueue[msg.cmd].length)
                asyncServiceMsg(msgQueue[msg.cmd][0].msg, asyncMsgCallback);
        };
        if (msgQueue[msg.cmd].length === 1)
            asyncServiceMsg(msg, asyncMsgCallback);
    }
    var messageListener = function (e) {
        if (e.data.cmd === SET_INITIAL_WORKER_SETTINGS_CMD) {
            var settings = e.data;
            serviceMsgUrl = settings.serviceMsgUrl;
            sessionId = settings.sessionId;
        }
        else if (e.data.cmd === HANDLE_PORT_CMD)
            e.ports[0].onmessage = messageListener;
        else {
            var msgWrapper_1 = e.data;
            var msg = msgWrapper_1.msg;
            var callback = function (result) { return e.target.postMessage({ id: msgWrapper_1.id, result: result }); };
            msg.sessionId = sessionId;
            if (msgWrapper_1.queued)
                queuedAsyncServiceMsg(msg, callback);
            else
                asyncServiceMsg(msg, callback);
        }
    };
    self.addEventListener('message', messageListener);

})();
