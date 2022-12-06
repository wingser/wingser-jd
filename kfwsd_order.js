/**
 作者：wingser
 日期：2022-11-14
 小程序：卡夫味事达公众号
 和卡夫味事达公用ck变量名字[kfwsdCookie]
 cron: 0-59 9 * * *

 */

const $ = new Env("卡夫味事达兑换");
const notify = $.isNode() ? require("./sendNotify") : "";
const { log } = console;
const Notify = 0; //0为关闭通知，1为打开通知,默认为1
const debug = 1; //0为关闭调试，1为打开调试,默认为0
const uaNum = 1; //随机UA，从0-20随便选一个填上去
const help = 1; //0为关闭互助，1为打开互助,默认为1
//////////////////////
let scriptVersion = "1.0.0";
let scriptVersionLatest = '';
let token = ($.isNode() ? process.env.kfwsdCookie : $.getdata("kfwsdCookie")) || "";
let UA = ($.isNode() ? process.env.UA : $.getdata("UA")) || "";
let UAArr = [];
let tokenArr = [];
let msg = "";
let integralNum = 0;
const User_Agents = [
    "Mozilla/5.0 (Linux; Android 10; ONEPLUS A5010 Build/QKQ1.191014.012; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    "Mozilla/5.0 (Linux; Android 9; Mi Note 3 Build/PKQ1.181007.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/045131 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 10; GM1910 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 9; 16T Build/PKQ1.190616.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 14_2 like Mac OS X) AppleWebKit/532.0 (KHTML, like Gecko) CriOS/43.0.823.0 Mobile/65M532 Safari/532.0",
    "Mozilla/5.0 (iPod; U; CPU iPhone OS 3_1 like Mac OS X; rw-RW) AppleWebKit/531.9.3 (KHTML, like Gecko) Version/4.0.5 Mobile/8B118 Safari/6531.9.3",
    "Mozilla/5.0 (Linux; Android 9; MI 6 Build/PKQ1.190118.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 11; Redmi K30 5G Build/RKQ1.200826.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045511 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 10; ONEPLUS A6000 Build/QKQ1.190716.003; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045224 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 9; MHA-AL00 Build/HUAWEIMHA-AL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 8.0.0; HTC U-3w Build/OPR6.170623.013; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 10; LYA-AL00 Build/HUAWEILYA-AL00L; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 8.1.0; MI 8 Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/045131 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 10; Redmi K20 Pro Premium Edition Build/QKQ1.190825.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045227 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 8.1.0; 16 X Build/OPM1.171019.026; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044942 Mobile Safari/537.36",
    "Mozilla/5.0 (Linux; Android 10; M2006J10C Build/QP1A.190711.020; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/77.0.3865.120 MQQBrowser/6.2 TBS/045230 Mobile Safari/537.36",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/532.0 (KHTML, like Gecko) FxiOS/18.2n0520.0 Mobile/50C216 Safari/532.0",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    "Mozilla/5.0 (iPhone; CPU iPhone OS 13_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36 NetType/WIFI MicroMessenger/7.0.20.1781(0x6700143B) WindowsWechat(0x63080021)",
];
let ua = User_Agents[uaNum];

!(async () => {
    if (typeof $request !== "undefined") {
        //await GetRewrite();
    } else {
        if (!(await Envs())) return;
        else {
            log(
                `\n\n=============================================    \n脚本执行 - 北京时间(UTC+8)：${new Date(
                    new Date().getTime() +
                    new Date().getTimezoneOffset() * 60 * 1000 +
                    8 * 60 * 60 * 1000
                ).toLocaleString()} \n=============================================\n`
            );

            //await getVersion();
            log(`\n============ 当前版本：${scriptVersion}  最新版本：${scriptVersionLatest} ============`)
            log(
                `\n=================== 共找到 ${tokenArr.length} 个账号 ===================`
            );

            if (debug) {
                log(`【debug】 这是你的全部账号数组:\n ${tokenArr}`);
            }

            for (let index = 0; index < tokenArr.length; index++) {
                ua = User_Agents[uaNum + index];

                if (UA) {
                    //如果配置了UA,从配置取ua,超出随机取
                    if (index >= UAArr.length) {
                        let i = UAArr.length + randomInt(0, 2);
                        ua = User_Agents[uaNum + i];
                    } else ua = UAArr[index];
                }

                token = tokenArr[index];
                let num = index + 1;

                log(`\n========= 开始【第 ${num} 个账号】=========\n`);

                if (debug) {
                    log(`【debug】 这是你的第 ${num} 个账号数组:\n ${token}`);
                }

                log("【开始兑换味事达京东卡】");
                msg += `\n【第${num}个账号兑换结果】`;
                await exchangeJDcard(5);
                await exchangeJDcard(2);
                await $.wait(2 * 1000);
            }

            await SendMsg(msg);
        }
    }
})()
    .catch((e) => log(e))
    .finally(() => $.done());

/**
 * 卡夫味事达兑换程序
 * 5元京东卡
 */
function exchangeJDcard(type, timeout = 2 * 1000) {

    let bodyContent;
    if (type == 5) {
        bodyContent = `value=%E4%BA%AC%E4%B8%9CE%E5%8D%A15%E5%85%83&phone=&type=%E8%A7%86%E9%A2%91%E5%8D%A1`
    } else {
        bodyContent = `value=%E4%BA%AC%E4%B8%9CE%E5%8D%A12%E5%85%83&phone=&type=%E8%A7%86%E9%A2%91%E5%8D%A1`
    }

    let url = {
        url: `https://kraftheinzcrm.kraftheinz.net.cn/crm/public/index.php/api/v1/exchangeIntegral`,
        headers: {
            Host: "kraftheinzcrm.kraftheinz.net.cn",
            "user-agent": `${ua}`,
            "Content-Type": "application/x-www-form-urlencoded",
            "token": `${token}`,
            "Referer": "https://kraftheinzcrm.kraftheinz.net.cn/master/"
        },
        //value=京东E卡5元&phone=&type=视频卡
        body: `${bodyContent}`
    };
    return new Promise((resolve) => {
        if (debug) {
            log(`\n【debug】=============== 这是 兑换${type}元 请求 url ===============`);
            log(JSON.stringify(url));
        }

        $.post(
            url,
            async (error, response, data) => {
                try {
                    if (error) {
                        msg += `\n${error}`;
                        log(error);
                    } else {
                        if (debug) {
                            log(
                                `\n\n【debug】===============这是 兑换${type}元 返回data==============`
                            );
                            log(data);
                        }
    
                        let result = JSON.parse(data);
                        if (result.error_code == 0) {
                            Notify = 1;//兑换成功,打开通知
                            log(`兑换${type}元成功：${result.data}`);
                            msg += `\n${result.data}`;
                        } else {
                            log(`兑换${type}元失败，原因是：${result.msg}`);
                        }
                        msg += `\n${result.msg}`;
                    }
                } catch (e) {
                    log(e);
                } finally {
                    resolve();
                }
            },
            timeout
        );
    });
}


// ============================================重写============================================ \\
/**
 * 登录后重写ck
 */
async function GetRewrite() {
    if ($request.url.indexOf("public/api/login") > -1) {
        const ck = $request.body;
        if (token) {
            if (token.indexOf(ck) == -1) {
                token = token + "@" + ck;
                $.setdata(token, "kfwsdCookie");
                let List = token.split("@");
                $.msg(
                    $.name +
                    ` 获取第${token.length}个 ck 成功: ${ck} ,不用请自行关闭重写!`
                );
            }
        } else {
            $.setdata(ck, "tqBody");
            $.msg($.name + ` 获取第1个 ck 成功: ${ck} ,不用请自行关闭重写!`);
        }
    }
}

// ============================================变量检查============================================ \\
/**
 * 读取ck/token配置
 */
async function Envs() {
    if (UA) {
        if (UA.indexOf("@") != -1) {
            UA.split("@").forEach((item) => {
                UAArr.push(item);
            });
        } else if (UA.indexOf("\n") != -1) {
            UA.split("\n").forEach((item) => {
                UAArr.push(item);
            });
        } else {
            UAArr.push(UA);
        }
    }
    if (token) {
        if (token.indexOf("@") != -1) {
            token.split("@").forEach((item) => {
                tokenArr.push(item);
            });
        } else if (token.indexOf("\n") != -1) {
            token.split("\n").forEach((item) => {
                tokenArr.push(item);
            });
        } else {
            tokenArr.push(token);
        }
    } else {
        log(`\n 【${$.name}】：未填写变量 kfwsdCookie`);
        return;
    }

    return true;
}

// ============================================发送消息============================================ \\
async function SendMsg(message) {
    if (!message) return;

    if (Notify > 0) {
        if ($.isNode()) {
            var notify = require("./sendNotify");
            await notify.sendNotify($.name, message);
        } else {
            $.msg(message);
        }
    } else {
        log(message);
    }
}

/**
 * 随机数生成
 */
function randomString(e) {
    e = e || 32;
    var t = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890",
        a = t.length,
        n = "";
    for (i = 0; i < e; i++) n += t.charAt(Math.floor(Math.random() * a));
    return n;
}

/**
 * 随机整数生成
 */
function randomInt(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/**
 * 获取毫秒时间戳
 */
function timestampMs() {
    return new Date().getTime();
}

/**
 * 获取秒时间戳
 */
function timestampS() {
    return Date.parse(new Date()) / 1000;
}


/**
 * 休眠
 */
function sleep(timeout) {
    return new Promise((resolve) => setTimeout(resolve, timeout));
}

/**
 * 获取远程版本
 */
function getVersion(timeout = 3 * 1000) {
    return new Promise((resolve) => {
        let url = {
            url: `https://raw.gh.fakev.cn/LinYuanovo/scripts/main/tyqs.js`,
        }
        $.get(url, async (err, resp, data) => {
            try {
                scriptVersionLatest = data.match(/scriptVersion = "([\d\.]+)"/)[1]
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve()
            }
        }, timeout)
    })
}

function Env(t, e) {
    "undefined" != typeof process &&
        JSON.stringify(process.env).indexOf("GITHUB") > -1 &&
        process.exit(0);
    class s {
        constructor(t) {
            this.env = t;
        }
        send(t, e = "GET") {
            t = "string" == typeof t ? { url: t } : t;
            let s = this.get;
            return (
                "POST" === e && (s = this.post),
                new Promise((e, i) => {
                    s.call(this, t, (t, s, r) => {
                        t ? i(t) : e(s);
                    });
                })
            );
        }
        get(t) {
            return this.send.call(this.env, t);
        }
        post(t) {
            return this.send.call(this.env, t, "POST");
        }
    }
    return new (class {
        constructor(t, e) {
            (this.name = t),
                (this.http = new s(this)),
                (this.data = null),
                (this.dataFile = "box.dat"),
                (this.logs = []),
                (this.isMute = !1),
                (this.isNeedRewrite = !1),
                (this.logSeparator = "\n"),
                (this.startTime = new Date().getTime()),
                Object.assign(this, e),
                this.log("", `🔔${this.name}, 开始!`);
        }
        isNode() {
            return "undefined" != typeof module && !!module.exports;
        }
        isQuanX() {
            return "undefined" != typeof $task;
        }
        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
        }
        isLoon() {
            return "undefined" != typeof $loon;
        }
        toObj(t, e = null) {
            try {
                return JSON.parse(t);
            } catch {
                return e;
            }
        }
        toStr(t, e = null) {
            try {
                return JSON.stringify(t);
            } catch {
                return e;
            }
        }
        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i)
                try {
                    s = JSON.parse(this.getdata(t));
                } catch { }
            return s;
        }
        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e);
            } catch {
                return !1;
            }
        }
        getScript(t) {
            return new Promise((e) => {
                this.get({ url: t }, (t, s, i) => e(i));
            });
        }
        runScript(t, e) {
            return new Promise((s) => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                (r = r ? 1 * r : 20), (r = e && e.timeout ? e.timeout : r);
                const [o, h] = i.split("@"),
                    n = {
                        url: `http://${h}/v1/scripting/evaluate`,
                        body: { script_text: t, mock_type: "cron", timeout: r },
                        headers: { "X-Key": o, Accept: "*/*" },
                    };
                this.post(n, (t, e, i) => s(i));
            }).catch((t) => this.logErr(t));
        }
        loaddata() {
            if (!this.isNode()) return {};
            {
                (this.fs = this.fs ? this.fs : require("fs")),
                    (this.path = this.path ? this.path : require("path"));
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i));
                    } catch (t) {
                        return {};
                    }
                }
            }
        }
        writedata() {
            if (this.isNode()) {
                (this.fs = this.fs ? this.fs : require("fs")),
                    (this.path = this.path ? this.path : require("path"));
                const t = this.path.resolve(this.dataFile),
                    e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t),
                    i = !s && this.fs.existsSync(e),
                    r = JSON.stringify(this.data);
                s
                    ? this.fs.writeFileSync(t, r)
                    : i
                        ? this.fs.writeFileSync(e, r)
                        : this.fs.writeFileSync(t, r);
            }
        }
        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i) if (((r = Object(r)[t]), void 0 === r)) return s;
            return r;
        }
        lodash_set(t, e, s) {
            return Object(t) !== t
                ? t
                : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []),
                    (e
                        .slice(0, -1)
                        .reduce(
                            (t, s, i) =>
                                Object(t[s]) === t[s]
                                    ? t[s]
                                    : (t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}),
                            t
                        )[e[e.length - 1]] = s),
                    t);
        }
        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
                    r = s ? this.getval(s) : "";
                if (r)
                    try {
                        const t = JSON.parse(r);
                        e = t ? this.lodash_get(t, i, "") : e;
                    } catch (t) {
                        e = "";
                    }
            }
            return e;
        }
        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
                    o = this.getval(i),
                    h = i ? ("null" === o ? null : o || "{}") : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), (s = this.setval(JSON.stringify(e), i));
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), (s = this.setval(JSON.stringify(o), i));
                }
            } else s = this.setval(t, e);
            return s;
        }
        getval(t) {
            return this.isSurge() || this.isLoon()
                ? $persistentStore.read(t)
                : this.isQuanX()
                    ? $prefs.valueForKey(t)
                    : this.isNode()
                        ? ((this.data = this.loaddata()), this.data[t])
                        : (this.data && this.data[t]) || null;
        }
        setval(t, e) {
            return this.isSurge() || this.isLoon()
                ? $persistentStore.write(t, e)
                : this.isQuanX()
                    ? $prefs.setValueForKey(t, e)
                    : this.isNode()
                        ? ((this.data = this.loaddata()),
                            (this.data[e] = t),
                            this.writedata(),
                            !0)
                        : (this.data && this.data[e]) || null;
        }
        initGotEnv(t) {
            (this.got = this.got ? this.got : require("got")),
                (this.cktough = this.cktough ? this.cktough : require("tough-cookie")),
                (this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar()),
                t &&
                ((t.headers = t.headers ? t.headers : {}),
                    void 0 === t.headers.Cookie &&
                    void 0 === t.cookieJar &&
                    (t.cookieJar = this.ckjar));
        }
        get(t, e = () => { }) {
            t.headers &&
                (delete t.headers["Content-Type"], delete t.headers["Content-Length"]),
                this.isSurge() || this.isLoon()
                    ? (this.isSurge() &&
                        this.isNeedRewrite &&
                        ((t.headers = t.headers || {}),
                            Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })),
                        $httpClient.get(t, (t, s, i) => {
                            !t && s && ((s.body = i), (s.statusCode = s.status)), e(t, s, i);
                        }))
                    : this.isQuanX()
                        ? (this.isNeedRewrite &&
                            ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
                            $task.fetch(t).then(
                                (t) => {
                                    const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                                    e(null, { status: s, statusCode: i, headers: r, body: o }, o);
                                },
                                (t) => e(t)
                            ))
                        : this.isNode() &&
                        (this.initGotEnv(t),
                            this.got(t)
                                .on("redirect", (t, e) => {
                                    try {
                                        if (t.headers["set-cookie"]) {
                                            const s = t.headers["set-cookie"]
                                                .map(this.cktough.Cookie.parse)
                                                .toString();
                                            s && this.ckjar.setCookieSync(s, null),
                                                (e.cookieJar = this.ckjar);
                                        }
                                    } catch (t) {
                                        this.logErr(t);
                                    }
                                })
                                .then(
                                    (t) => {
                                        const {
                                            statusCode: s,
                                            statusCode: i,
                                            headers: r,
                                            body: o,
                                        } = t;
                                        e(null, { status: s, statusCode: i, headers: r, body: o }, o);
                                    },
                                    (t) => {
                                        const { message: s, response: i } = t;
                                        e(s, i, i && i.body);
                                    }
                                ));
        }
        post(t, e = () => { }) {
            if (
                (t.body &&
                    t.headers &&
                    !t.headers["Content-Type"] &&
                    (t.headers["Content-Type"] = "application/x-www-form-urlencoded"),
                    t.headers && delete t.headers["Content-Length"],
                    this.isSurge() || this.isLoon())
            )
                this.isSurge() &&
                    this.isNeedRewrite &&
                    ((t.headers = t.headers || {}),
                        Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })),
                    $httpClient.post(t, (t, s, i) => {
                        !t && s && ((s.body = i), (s.statusCode = s.status)), e(t, s, i);
                    });
            else if (this.isQuanX())
                (t.method = "POST"),
                    this.isNeedRewrite &&
                    ((t.opts = t.opts || {}), Object.assign(t.opts, { hints: !1 })),
                    $task.fetch(t).then(
                        (t) => {
                            const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                            e(null, { status: s, statusCode: i, headers: r, body: o }, o);
                        },
                        (t) => e(t)
                    );
            else if (this.isNode()) {
                this.initGotEnv(t);
                const { url: s, ...i } = t;
                this.got.post(s, i).then(
                    (t) => {
                        const { statusCode: s, statusCode: i, headers: r, body: o } = t;
                        e(null, { status: s, statusCode: i, headers: r, body: o }, o);
                    },
                    (t) => {
                        const { message: s, response: i } = t;
                        e(s, i, i && i.body);
                    }
                );
            }
        }
        time(t, e = null) {
            const s = e ? new Date(e) : new Date();
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds(),
            };
            /(y+)/.test(t) &&
                (t = t.replace(
                    RegExp.$1,
                    (s.getFullYear() + "").substr(4 - RegExp.$1.length)
                ));
            for (let e in i)
                new RegExp("(" + e + ")").test(t) &&
                    (t = t.replace(
                        RegExp.$1,
                        1 == RegExp.$1.length
                            ? i[e]
                            : ("00" + i[e]).substr(("" + i[e]).length)
                    ));
            return t;
        }
        msg(e = t, s = "", i = "", r) {
            const o = (t) => {
                if (!t) return t;
                if ("string" == typeof t)
                    return this.isLoon()
                        ? t
                        : this.isQuanX()
                            ? { "open-url": t }
                            : this.isSurge()
                                ? { url: t }
                                : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"],
                            s = t.mediaUrl || t["media-url"];
                        return { openUrl: e, mediaUrl: s };
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl,
                            s = t["media-url"] || t.mediaUrl;
                        return { "open-url": e, "media-url": s };
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return { url: e };
                    }
                }
            };
            if (
                (this.isMute ||
                    (this.isSurge() || this.isLoon()
                        ? $notification.post(e, s, i, o(r))
                        : this.isQuanX() && $notify(e, s, i, o(r))),
                    !this.isMuteLog)
            ) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e),
                    s && t.push(s),
                    i && t.push(i),
                    console.log(t.join("\n")),
                    (this.logs = this.logs.concat(t));
            }
        }
        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]),
                console.log(t.join(this.logSeparator));
        }
        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s
                ? this.log("", `❗️${this.name}, 错误!`, t.stack)
                : this.log("", `❗️${this.name}, 错误!`, t);
        }
        wait(t) {
            return new Promise((e) => setTimeout(e, t));
        }
        done(t = {}) {
            const e = new Date().getTime(),
                s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`),
                this.log(),
                (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
        }
    })(t, e);
}
