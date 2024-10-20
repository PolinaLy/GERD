import './style.css';
import './index.html';


(function() {
    const c = document.createElement("link").relList;
    if (c && c.supports && c.supports("modulepreload")) return;
    for (const a of document.querySelectorAll('link[rel="modulepreload"]')) l(a);
    new MutationObserver(a => {
        for (const n of a)
            if (n.type === "childList")
                for (const v of n.addedNodes) v.tagName === "LINK" && v.rel === "modulepreload" && l(v)
    }).observe(document, {
        childList: !0,
        subtree: !0
    });

    function i(a) {
        const n = {};
        return a.integrity && (n.integrity = a.integrity), a.referrerPolicy && (n.referrerPolicy = a.referrerPolicy), a.crossOrigin === "use-credentials" ? n.credentials = "include" : a.crossOrigin === "anonymous" ? n.credentials = "omit" : n.credentials = "same-origin", n
    }

    function l(a) {
        if (a.ep) return;
        a.ep = !0;
        const n = i(a);
        fetch(a.href, n)
    }
})();
var I = document.querySelectorAll(".molekula-wrapper");
I.forEach(s => {
    s.addEventListener("mouseenter", c => {
        var i = c.currentTarget,
            l = Math.floor(Math.random() * 120),
            a = Math.floor(Math.random() * 120);
        i.style.transform = `translate3d(${l}px, ${a}px, 0)`
    }), s.addEventListener("mouseleave", c => {
        var i = c.currentTarget;
        i.style.transform = "translate3d(0, 0, 0)"
    })
});
document.addEventListener("DOMContentLoaded", () => {
    var s = document.querySelector("#mobile-wrapper-adv"),
        c = document.querySelector("#desktop-wrapper-adv"),
        i = document.querySelector("#wrapper-adv"),
        l = window.matchMedia("(max-width: 1079px)");

    function a(e) {
        e.matches ? s.appendChild(i) : c.appendChild(i)
    }
    a(l), l.addEventListener("change", a);
    var n = document.querySelectorAll(".js-click-menu"),
        v = document.querySelector(".hamburger--vortex"),
        h = document.querySelector(".nav-mobile");
    n.forEach(e => {
        e.addEventListener("click", p)
    });

    function p() {
        v.classList.toggle("is-active"), h.classList.toggle("nav-mobile--active")
    }
    var g = document.getElementById("svg-media"),
        y = new Vivus("svg-media", {
            type: "delayed",
            start: "manual",
            duration: 100,
            forceRender: !1
        }),
        b = document.getElementById("svg-media-mobile"),
        L = new Vivus("svg-media-mobile", {
            type: "delayed",
            start: "manual",
            duration: 160,
            forceRender: !1
        });
    (function() {
        var e = document.querySelectorAll(".intersect-media"),
            r = new IntersectionObserver(o => {
                o.forEach(t => {
                    t.isIntersecting && (y.play(), g.contentDocument.firstElementChild.classList.add("intersect-media--active"), r.unobserve(t.target))
                })
            }, {
                threshold: .7
            });
        e.forEach(o => r.observe(o))
    })(),
    function() {
        var e = document.querySelectorAll(".intersect-media-mobile"),
            r = new IntersectionObserver(o => {
                o.forEach(t => {
                    t.isIntersecting && (L.play(), b.contentDocument.firstElementChild.classList.add("intersect-media--active"), r.unobserve(t.target))
                })
            }, {
                threshold: .2
            });
        e.forEach(o => r.observe(o))
    }(),
    function() {
        let e = .9;
        window.matchMedia("(max-width: 640px)").matches && (e = .3);
        var r = document.querySelectorAll(".js-list-practice"),
            o = new IntersectionObserver(t => {
                t.forEach(d => {
                    d.isIntersecting && (d.target.querySelectorAll(".opacity-0").forEach(u => {
                        u.classList.remove("opacity-0"), u.classList.add("opacity-100")
                    }), o.unobserve(d.target))
                })
            }, {
                threshold: e
            });
        r.forEach(t => o.observe(t))
    }();
    var w = document.querySelector(".js-book-content");
    document.querySelector(".js-book-btn").addEventListener("click", e => {
        e.currentTarget.lastElementChild.classList.toggle("rotate-180"), w.classList.toggle("hidden")
    });
    var S = document.querySelector(".js-block-table"),
        E = document.querySelector(".js-wrapper-img"),
        q = document.querySelector(".js-wrapper-img-parent ");
    document.querySelector(".js-table-btn").addEventListener("click", () => {
        E.classList.toggle("rotate-180"), q.classList.toggle("animate-bounce-custom"), S.classList.toggle("hidden")
    }), A();

    function A() {
        var e = document.querySelectorAll(".adv__img-certain"),
            r = e.length - 1;
        setInterval(o, 3e3);

        function o() {
            var t = (1 + r) % e.length;
            r = t
        }
    }
    let m = document.querySelector(".video-first"),
        f = document.querySelector(".video-btn--first");
    var k = document.querySelectorAll(".video-btn");
    k.forEach(e => {
            e.addEventListener("click", r => {
                f.classList.remove("video-btn--active"), f = r.currentTarget, f.classList.add("video-btn--active");
                var o = f.dataset.videoIndex;
                m.classList.remove("block"), m.classList.add("hidden");
                var t = document.querySelector("#" + o);
                m = t, m.classList.remove("hidden"), m.classList.add("block")
            })
        }),
        function() {
            let e = document.querySelector(".menu__link--first");
            var r = document.querySelectorAll(".js-link");
            r.forEach(o => {
                o.addEventListener("click", t => {
                    t.preventDefault();
                    var d = t.currentTarget.getAttribute("href"),
                        u = document.querySelector(d).getBoundingClientRect();
                    window.scroll({
                        top: u.top + window.scrollY - 150,
                        left: 0,
                        behavior: "smooth"
                    }), e.classList.remove("menu__link--active"), e = t.currentTarget, e.classList.add("menu__link--active")
                })
            })
        }(),
        function() {
            let e = document.querySelector(".nav-mobile__item--first");
            var r = document.querySelectorAll(".js-link-mobile");
            r.forEach(o => {
                o.addEventListener("click", t => {
                    t.preventDefault();
                    var d = t.currentTarget.getAttribute("href"),
                        u = document.querySelector(d).getBoundingClientRect();
                    window.scroll({
                        top: u.top + window.scrollY - 150,
                        left: 0,
                        behavior: "smooth"
                    }), e.classList.remove("nav-mobile__item--active"), e = t.currentTarget, e.classList.add("nav-mobile__item--active"), p()
                })
            })
        }(); {
        var M = document.querySelectorAll(".js-fixed-scale");
        M.forEach(e => {
            _(e)
        })
    }
});

function _(s) {
    var c = s.scrollWidth,
        i = s.scrollHeight,
        l = (c * .8 - c) / 2,
        a = (i * .8 - i) / 2;
    s.style.cssText = `transform: scale(0.8);margin: ${a}px ${l}px;`
}