window.onload = function() {
    if (a_fRC) initLogon();
    else redir()
};
function initLogon() {
    try {
        LogoffMime()
    } catch(e) {}
    var d = /(^|; )logondata=acc=([0|1])&lgn=([^;]+)(;|$)/,
        a = d.exec(document.cookie);
    if (a) {
        gbid("username").value = a[3];
        gbid("password").focus();
        gbid("rdoPrvt").click();
        a[2] == "1" && gbid("chkBsc") && gbid("chkBsc").click()
    } else if (g_fFcs) try {
        gbid("username").focus()
    } catch(e) {}
    if (IsOwaPremiumBrowser() && gbid("chkBsc")) gbid("chkBsc").disabled = false;
    var b = "cookieTest";
    document.cookie = secureCookie(b + "=1");
    var c = document.cookie.indexOf(b + "=") != -1;
    if (c == false) {
        shw(gbid("tblMid2"));
        hd(gbid("tblMid"))
    }
}
function redir() {
    var a = window;
    try {
        if (a.dialogArguments) {
            var g = new String(Math.round(Math.random() * 1e5)),
                f = "toolbar=0,location=0,directories=0,status=1,menubar=0,scrollbars=1,resizable=1,width=800,height=600",
                i = Math.round((screen.availHeight - 600) / 2),
                h = Math.round((screen.availWidth - 800) / 2);
            f += ",top=" + i + ",left=" + h;
            var e = a.dialogArguments.opener;
            try {
                e && e.open(a_sCW, g, f)
            } catch(l) {}
            a.close();
            return
        }
    } catch(l) {}
    var b = a_sUrl;
    while (1) try {
        if (! (a.frameElement && a.frameElement.ownerDocument)) break;
        var c = a.frameElement.ownerDocument.parentWindow || a.frameElement.ownerDocument.defaultView;
        if (!c || !c.g_fOwa && !c.g_fEcp) break;
        a = c;
        b = a.GetReloadUrl ? "&url=" + encodeURIComponent(a.GetReloadUrl()) : ""
    } catch(l) {
        break
    }
    try {
        var d = a.opener;
        if (d && (d.g_fOwa || d.g_fEcp)) {
            var j = Math.round((screen.availWidth - 800) / 2),
                k = Math.round((screen.availHeight - 600) / 2);
            a.moveTo(j, k);
            a.resizeTo(800, 600);
            b = "&url=" + encodeURIComponent(a_sCW)
        }
    } catch(l) {}
    if (a.navigate) a.navigate(a_sLgn + b);
    else a.location = a_sLgn + b
}
function shw(a) {
    a.style.display = ""
}
function hd(a) {
    a.style.display = "none"
}
function clkExp(b) {
    var a = gbid(b);
    if (a.tagName == "IMG") a = a.parentNode;
    switch (a) {
        case gbid("lnkShwSec"):
            hd(gbid("lnkShwSec"));
            shw(gbid("lnkHdSec"));
            shw(gbid("trPubExp"));
            shw(gbid("trPrvtExp"));
            gbid("lnkHdSec").focus();
            break;
        case gbid("lnkHdSec"):
            shw(gbid("lnkShwSec"));
            hd(gbid("lnkHdSec"));
            hd(gbid("trPubExp"));
            hd(gbid("trPrvtExp"));
            gbid("lnkShwSec").focus()
    }
}
function clkSec() {
    var b = gbid("rdoPrvt").checked;
    gbid("trPrvtWrn").style.display = b ? "": "none";
    if (b) document.logonForm.flags.value |= 4;
    else {
        document.logonForm.flags.value &= ~4;
        var a = new Date;
        a.setTime(a.getTime() - 9999);
        document.cookie = secureCookie("logondata=; expires=" + a.toUTCString())
    }
}
function clkBsc() {
    var a = gbid("chkBsc").checked;
    gbid("trBscExp").style.display = a ? "": "none";
    if (a) document.logonForm.flags.value |= 1;
    else document.logonForm.flags.value &= ~1
}
function clkLgn() {
    addPerfMarker("Logon.Start");
    if (gbid("rdoPrvt").checked) {
        var a = new Date;
        a.setTime(a.getTime() + 2 * 7 * 24 * 60 * 60 * 1e3);
        var b = "acc=" + (gbid("chkBsc") && gbid("chkBsc").checked ? 1 : 0),
            c = "lgn=" + gbid("username").value;
        document.cookie = secureCookie("logondata=" + b + "&" + c + "; expires=" + a.toUTCString())
    }
    document.cookie = secureCookie("PBack=0; path=/")
}
function clkRtry() {
    window.location.reload()
}
function clkReLgn() {
    window.location.href = "../"
}
function gbid(a) {
    return document.getElementById(a)
}
function IsOwaPremiumBrowser() {
    var b = navigator.userAgent,
        c = navigator.appVersion,
        g = c.indexOf("Mac") != -1,
        h = c.indexOf("Win") != -1 || c.indexOf("NT") != -1,
        f = b.indexOf("MSIE ") != -1,
        d = b.indexOf("Firefox/") != -1 && b.indexOf("Gecko/") != -1 && Array.every,
        e = b.indexOf("Safari") != -1 && b.indexOf("WebKit") != -1,
        a = 2;
    if (f) a = parseFloat(b.replace(/^.*MSIE /, ""));
    else if (d) a = parseFloat(b.replace(/^.*Firefox\//, ""));
    else if (e) a = parseFloat(b.replace(/^.*Version\//, ""));
    else a = parseInt(c);
    if (h) {
        if (f) return a >= 7;
        else if (e) return a >= 3;
        else if (d) return a >= 3
    } else if (g) if (e) return a >= 2;
    else if (d) return a >= 3;
    return false
}
function hres(a) {
    return a + 4294967295 + 1
}
function LogoffMime() {
    try {
        typeof mimeLogoffE2k3 != "undefined" && null != mimeLogoffE2k3 && IsMimeCtlInst("MimeBhvr.MimeCtlVer") && mimeLogoffE2k3.Logoff();
        typeof mimeLogoffE2k7SP1 != "undefined" && null != mimeLogoffE2k7SP1 && IsMimeCtlInst("OwaSMime.MimeCtlVer") && mimeLogoffE2k7SP1.Logoff();
        typeof mimeLogoffE2k9 != "undefined" && null != mimeLogoffE2k9 && IsMimeCtlInst("OwaSMime2.MimeCtlVer") && mimeLogoffE2k9.Logoff()
    } catch(a) {}
}
function addPerfMarker(a) {
    try {
        window.msWriteProfilerMark && window.msWriteProfilerMark(a)
    } catch(b) {}
}
function secureCookie(a) {
    if (isHttps()) a += "; secure";
    return a
}
function isHttps() {
    return window.location.protocol == "https:"
}