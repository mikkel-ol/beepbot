(function(t){function e(e){for(var r,i,c=e[0],o=e[1],l=e[2],d=0,f=[];d<c.length;d++)i=c[d],a[i]&&f.push(a[i][0]),a[i]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r]);u&&u(e);while(f.length)f.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],r=!0,c=1;c<n.length;c++){var o=n[c];0!==a[o]&&(r=!1)}r&&(s.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},a={app:0},s=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],o=c.push.bind(c);c.push=e,c=c.slice();for(var l=0;l<c.length;l++)e(c[l]);var u=o;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"206d":function(t,e,n){"use strict";var r=n("9cbb"),a=n.n(r);a.a},"21bb":function(t,e,n){"use strict";var r=n("bcc9"),a=n.n(r);a.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},s=[],i=(n("5c0b"),n("2877")),c={},o=Object(i["a"])(c,a,s,!1,null,null,null),l=o.exports,u=n("8c4f"),d=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},f=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{attrs:{id:"topbar"}},[n("div",{attrs:{id:"server-name"}},[n("span",[t._v("Server name")])]),n("div",{attrs:{id:"top-etc"}},[n("span",[t._v("Send nudes")])])]),n("div",{attrs:{id:"server-list"}},[n("div",{attrs:{id:"server-separator"}},[n("a",{attrs:{href:"#"}})]),n("div",{staticClass:"guild-container"},[n("div",{staticClass:"guild"})])]),n("div",{attrs:{id:"sidebar"}},[n("div",{staticClass:"text-channel-category"},[n("span",[t._v("⌨   --   TEXT CHANNELS")])]),n("div",{staticClass:"voice-channel-category"},[n("span",[t._v("🎤   --   VOICE CHANNELS")]),n("div",{staticClass:"voice-channel"},[n("a",{attrs:{href:"#",onclick:"changevc('')"}})])])]),n("div",{attrs:{id:"soundboard"}},[n("div",{staticClass:"soundbutton"},[n("img",{staticClass:"button",attrs:{src:"/img/soundboard/.jpg",onclick:"play('')"}})])]),n("div",{attrs:{id:"people-list"}},[n("h2",[t._v("\n      WORK\n      "),n("br"),t._v("IN\n      "),n("br"),t._v("PROGRESS\n    ")])])])}],p=(n("96cf"),n("3b8d")),v=n("bc3a"),h=n.n(v),m="".concat("http://beepbot.dk/api"),b={sounds:"".concat(m,"/sounds"),servers:"".concat(m,"/servers")},g={getSounds:function(){var t=Object(p["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,h.a.get(b.sounds);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t)}));function e(){return t.apply(this,arguments)}return e}(),getServers:function(){var t=Object(p["a"])(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,h.a.get(b.servers);case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}},t)}));function e(){return t.apply(this,arguments)}return e}()},k=g,_=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div")},C=[],w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div")},O=[],x={name:"textchannel",props:["id","name"]},y=x,E=Object(i["a"])(y,w,O,!1,null,null,null),S=E.exports,j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div")},T=[],R={name:"voicechannel",props:["id","name"]},I=R,N=Object(i["a"])(I,j,T,!1,null,null,null),M=N.exports,P={name:"guild",components:{TextChannel:S,VoiceChannel:M},data:function(){return{sounds:null}},mounted:function(){var t=Object(p["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,k.getSounds();case 2:e=t.sent,401==e&&this.$router.redirect("/auth"),this.sounds=e.data;case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},A=P,B=Object(i["a"])(A,_,C,!1,null,null,null),J=B.exports,L={name:"home",components:{Guild:J},data:function(){return{sounds:null,servers:null}},mounted:function(){var t=Object(p["a"])(regeneratorRuntime.mark(function t(){var e=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:this.servers=k.getServers().catch(function(t){401===t.response.status&&e.$router.push("/login")}).data;case 1:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}()},H=L,q=(n("21bb"),Object(i["a"])(H,d,f,!1,null,null,null)),D=q.exports,G=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},U=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"home"},[r("div",{attrs:{id:"frontpage"}},[r("div",{staticClass:"sk-circle animated fadeIn"},[r("div",{staticClass:"sk-circle1 sk-child"}),r("div",{staticClass:"sk-circle2 sk-child"}),r("div",{staticClass:"sk-circle3 sk-child"}),r("div",{staticClass:"sk-circle4 sk-child"}),r("div",{staticClass:"sk-circle5 sk-child"}),r("div",{staticClass:"sk-circle6 sk-child"}),r("div",{staticClass:"sk-circle7 sk-child"}),r("div",{staticClass:"sk-circle8 sk-child"}),r("div",{staticClass:"sk-circle9 sk-child"}),r("div",{staticClass:"sk-circle10 sk-child"}),r("div",{staticClass:"sk-circle11 sk-child"}),r("div",{staticClass:"sk-circle12 sk-child"})]),r("div",{attrs:{id:"front-container"}},[r("img",{staticClass:"animated bounceInLeft",attrs:{src:n("cf05"),id:"logo"}}),r("br"),r("h1",{staticClass:"animated fadeInRight"},[t._v("BEEP BOT")]),r("a",{staticClass:"animated",attrs:{id:"loginButton",href:"/auth"}},[t._v("Sign in with Discord")])])])])}],V=(n("ac6a"),n("28a5"),{name:"login",components:{},methods:{init:K},mounted:function(){this.init()}});//! This is shit..
function K(){setTimeout(function(){$(".sk-circle").removeClass("fadeIn"),$(".sk-circle").addClass("fadeOut"),setTimeout(function(){$("#front-container").css("display","flex"),setTimeout(function(){$("#front-container").addClass("slideUp"),setTimeout(function(){$("#loginButton").css({visibility:"visible",transform:"scale(1)",opacity:"1"})},500)},1500)},1e3)},1500),$("#logo").click(function(){var t,e=["bounce","pulse","rubberBand","shake","swing","tada","jello"],n=$("#logo").attr("class").split(/\s+/);$("#logo").removeClass("bounceInLeft");var r=e[Math.floor(Math.random()*e.length)];n.forEach(function(n){var r=e.indexOf(n);r>-1&&(t=e[r],$("#logo").removeClass(t))});while(t===r)r=e[Math.floor(Math.random()*e.length)];$("#logo").addClass(r)})}var W=V,X=(n("206d"),Object(i["a"])(W,G,U,!1,null,null,null)),z=X.exports,F=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},Q=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("h1",[t._v("AUTHENTICATION ERROR")])])}],Y={name:"error"},Z=Y,tt=Object(i["a"])(Z,F,Q,!1,null,null,null),et=tt.exports;r["a"].use(u["a"]);var nt=new u["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:D,meta:{requiresAuth:!1}},{path:"/login",name:"login",component:z},{path:"/error",name:"error",component:et},{path:"*",name:"catch-all",redirect:{name:"home"}}]}),rt=n("2f62");r["a"].use(rt["a"]);var at=new rt["a"].Store({state:{},mutations:{},actions:{}}),st={setToken:function(t){localStorage.setItem("beepbot-token",JSON.stringify(t))},getToken:function(){return JSON.parse(localStorage.getItem("beepbot-token"))},destroyToken:function(){localStorage.removeItem("beepbot-token")},isExpired:function(){var t=this.getToken(),e=t.split(".")[1],n=JSON.parse(window.atob(e));return Date.now()/1e3>n["exp"]&&(this.destroyToken(),!0)}},it=st;r["a"].config.productionTip=!1,nt.beforeEach(function(t,e,n){var r=it.getToken(),a=r?it.isExpired():null;t.meta.requiresAuth&&(r&&!a||n({name:"login"})),n()}),new r["a"]({router:nt,store:at,render:function(t){return t(l)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var r=n("5e27"),a=n.n(r);a.a},"5e27":function(t,e,n){},"9cbb":function(t,e,n){},bcc9:function(t,e,n){},cf05:function(t,e,n){t.exports=n.p+"img/logo.6fb8967e.png"}});
//# sourceMappingURL=app.8b4f2492.js.map