(function(e){function t(t){for(var r,s,o=t[0],c=t[1],u=t[2],d=0,p=[];d<o.length;d++)s=o[d],a[s]&&p.push(a[s][0]),a[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);l&&l(t);while(p.length)p.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},a={app:0},i=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var l=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"206d":function(e,t,n){"use strict";var r=n("9cbb"),a=n.n(r);a.a},"21bb":function(e,t,n){"use strict";var r=n("bcc9"),a=n.n(r);a.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),a=n("bc3a"),i=n.n(a),s=n("a7fe"),o=n.n(s),c=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},u=[],l=(n("5c0b"),n("2877")),d={},p=Object(l["a"])(d,c,u,!1,null,null,null),v=p.exports,h=n("8c4f"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container"},[n("div",{attrs:{id:"topbar"}},[n("div",{attrs:{id:"server-name"}},[e.current?n("span",[e._v(e._s(e.current.name))]):e._e()]),e._m(0)]),n("div",{attrs:{id:"server-list"}},[n("div",{attrs:{id:"server-separator"}},[n("div",{staticClass:"guild-container",attrs:{id:"addBotButton"},on:{click:e.addBot}},[n("div",{staticClass:"guild button"},[n("svg",{staticClass:"circleIcon-LvPL6c",attrs:{name:"Nova_Add",width:"24",height:"24",viewBox:"0 0 24 24"}},[n("path",{attrs:{fill:"currentColor",d:"M21 11.001H13V3.00098H11V11.001H3V13.001H11V21.001H13V13.001H21V11.001Z"}})])])])]),e.servers?n("div",{staticClass:"guild-container"},e._l(e.servers,function(t,r){return n("div",{key:t.id,staticClass:"guild-container"},[n("div",{staticClass:"guild",domProps:{innerHTML:e._s(e.generateAvatar(t))},on:{click:function(t){return e.changeCurrentGuild(r,t)}}})])}),0):e._e()]),n("div",{attrs:{id:"sidebar"}},[n("div",{staticClass:"text-channel-category"},[n("span",[e._v("⌨   --   TEXT CHANNELS")]),e.servers?n("div",e._l(e.current.channels,function(t){return n("div",{key:t.id},["text"===t.type?n("div",{staticClass:"text-channel"},[n("svg",{staticClass:"text-channel-icon",attrs:{width:"24",height:"24",viewBox:"0 0 24 24"}},[n("path",{attrs:{fill:"currentColor","fill-rule":"evenodd","clip-rule":"evenodd",d:"M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"}})]),n("div",{staticClass:"channel-entry"},[e._v(e._s(t.name))])]):e._e()])}),0):e._e()]),n("div",{staticClass:"voice-channel-category"},[n("span",[e._v("🎤   --   VOICE CHANNELS")]),e.servers?n("div",e._l(e.current.channels,function(t){return n("div",{key:t.id},["voice"==t.type?n("div",{staticClass:"voice-channel"},[n("svg",{staticClass:"voice-channel-icon",attrs:{name:"Speaker","aria-hidden":"false",width:"24",height:"24",viewBox:"0 0 24 24"}},[n("path",{attrs:{fill:"currentColor","fill-rule":"evenodd","clip-rule":"evenodd",d:"M11.383 3.07904C11.009 2.92504 10.579 3.01004 10.293 3.29604L6 8.00204H3C2.45 8.00204 2 8.45304 2 9.00204V15.002C2 15.552 2.45 16.002 3 16.002H6L10.293 20.71C10.579 20.996 11.009 21.082 11.383 20.927C11.757 20.772 12 20.407 12 20.002V4.00204C12 3.59904 11.757 3.23204 11.383 3.07904ZM14 5.00195V7.00195C16.757 7.00195 19 9.24595 19 12.002C19 14.759 16.757 17.002 14 17.002V19.002C17.86 19.002 21 15.863 21 12.002C21 8.14295 17.86 5.00195 14 5.00195ZM14 9.00195C15.654 9.00195 17 10.349 17 12.002C17 13.657 15.654 15.002 14 15.002V13.002C14.551 13.002 15 12.553 15 12.002C15 11.451 14.551 11.002 14 11.002V9.00195Z"}})]),n("a",{staticClass:"channel-entry",on:{click:function(n){return e.changeVoiceChannel(t.id)}}},[e._v(e._s(t.name))])]):e._e()])}),0):e._e()]),e.connected?n("div",{attrs:{id:"connection-status-container"}},[n("div",{attrs:{id:"connection-status-bars"}}),n("div",{attrs:{id:"connection-status-description"}}),n("button",{attrs:{id:"disconnect-button"},on:{click:function(t){return e.stop()}}},[n("svg",{staticClass:"buttonIcon-3yYVOH",attrs:{name:"Nova_CallLeave","aria-hidden":"false",width:"18",height:"18",viewBox:"0 0 24 24"}},[n("path",{attrs:{fill:"currentColor","fill-rule":"evenodd","clip-rule":"evenodd",d:"M21.1169 1.11603L22.8839 2.88403L19.7679 6.00003L22.8839 9.11603L21.1169 10.884L17.9999 7.76803L14.8839 10.884L13.1169 9.11603L16.2329 6.00003L13.1169 2.88403L14.8839 1.11603L17.9999 4.23203L21.1169 1.11603ZM18 22H13C6.925 22 2 17.075 2 11V6C2 5.447 2.448 5 3 5H7C7.553 5 8 5.447 8 6V10C8 10.553 7.553 11 7 11H6C6.063 14.938 9 18 13 18V17C13 16.447 13.447 16 14 16H18C18.553 16 19 16.447 19 17V21C19 21.553 18.553 22 18 22Z"}})])])]):e._e()]),n("div",{attrs:{id:"soundboard"}},[n("div",{staticClass:"soundbutton"},[e.sounds?n("div",e._l(e.sounds,function(t,r){return n("div",{key:t},[n("div",{staticStyle:{width:"40px",height:"40px","border-radius":"50%",background:"white",cursor:"pointer",color:"black","text-align":"center"},on:{click:function(n){return e.play(t)}}},[n("p",{staticStyle:{"padding-top":"8px"}},[e._v(e._s(r))])])])}),0):e._e()])]),e._m(1)])},m=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"top-etc"}},[n("span",[e._v("Send nudes")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"people-list"}},[n("h2",[e._v("WIP")])])}],C=(n("96cf"),n("3b8d")),g=(n("7f7f"),n("28a5"),"".concat("http://beepbot.dk/api")),b={sounds:"".concat(g,"/sounds"),servers:"".concat(g,"/servers"),voiceChannels:"".concat(g,"/soundboards/voicechannel"),playSound:"".concat(g,"/soundboards/play"),stopPlaying:"".concat(g,"/soundboards/stop")},_={getSounds:function(){var e=Object(C["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r["a"].axios.create({withCredentials:!0}).get(b.sounds);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));function t(){return e.apply(this,arguments)}return t}(),getServers:function(){var e=Object(C["a"])(regeneratorRuntime.mark(function e(){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r["a"].axios.create({withCredentials:!0}).get(b.servers);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}},e)}));function t(){return e.apply(this,arguments)}return t}(),changeVoiceChannel:function(e,t){r["a"].axios.create({withCredentials:!0}).put(b.voiceChannels,{id:{server:e,channel:t}})},play:function(e){r["a"].axios.create({withCredentials:!0}).post(b.playSound,{file:e})},stop:function(){r["a"].axios.create({withCredentials:!0}).post(b.stopPlaying)}},y=_,w=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div")},x=[],L={name:"guild",components:{},data:function(){return{sounds:null}},mounted:function(){var e=Object(C["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,y.getSounds();case 2:t=e.sent,401==t&&this.$router.redirect("/auth"),this.sounds=t.data;case 5:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},H=L,E=Object(l["a"])(H,w,x,!1,null,null,null),V=E.exports,k={name:"home",components:{Guild:V},data:function(){return{sounds:null,servers:null,current:null,connected:!1}},methods:{addBot:function(){window.location="https://discordapp.com/oauth2/authorize?client_id=352214774479847435&scope=bot&permissions=8"},changeVoiceChannel:function(e){y.changeVoiceChannel(this.current.id,e),document.getElementById("selectedVoiceChannel")&&document.getElementById("selectedVoiceChannel").removeAttribute("id"),event.target.id="selectedVoiceChannel",this.connected=!0},changeCurrentGuild:function(e){this.current=this.servers[e],document.getElementById("selectedGuild")&&document.getElementById("selectedGuild").removeAttribute("id"),event.target.parentElement.id="selectedGuild"},generateAvatar:function(e){return null===e.icon?e.name.split(" ").reduce(function(e,t){return e+t.slice(0,1)},"").substr(0,3).toUpperCase():"<a style=\"background-image: url('https://cdn.discordapp.com/icons/".concat(e.id,"/").concat(e.icon,".webp')\"></a>")},play:function(e){y.play(e)},stop:function(){y.stop(),document.getElementById("selectedVoiceChannel")&&document.getElementById("selectedVoiceChannel").removeAttribute("id"),this.connected=!1}},mounted:function(){var e=Object(C["a"])(regeneratorRuntime.mark(function e(){var t,n,r=this;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,y.getServers().catch(function(e){401===e.response.status&&r.$router.push("/login")});case 2:return t=e.sent,this.servers=t?t.data:void 0,this.current=this.servers?this.servers[0]:void 0,e.next=7,y.getSounds().catch(function(e){401===e.response.status&&r.$router.push("/login")});case 7:n=e.sent,this.sounds=n?n.data:void 0;case 9:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}()},O=k,S=(n("21bb"),Object(l["a"])(O,f,m,!1,null,null,null)),B=S.exports,j=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},M=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home"},[r("div",{attrs:{id:"frontpage"}},[r("div",{attrs:{id:"front-container"}},[r("img",{staticClass:"animated bounceInLeft",attrs:{src:n("cf05"),id:"logo"}}),r("br"),r("h1",{staticClass:"animated fadeInRight"},[e._v("BEEP BOT")]),r("a",{staticClass:"animated",attrs:{id:"loginButton",href:"/auth"}},[e._v("Sign in with Discord")])])])])}],I=(n("ac6a"),{name:"login",components:{},methods:{init:T},mounted:function(){this.init()}});//! This is shit..
function T(){setTimeout(function(){$(".sk-circle").removeClass("fadeIn"),$(".sk-circle").addClass("fadeOut"),setTimeout(function(){$("#front-container").css("display","flex"),setTimeout(function(){$("#front-container").addClass("slideUp"),setTimeout(function(){$("#loginButton").css({visibility:"visible",transform:"scale(1)",opacity:"1"})},5)},15)},10)},15),$("#logo").click(function(){var e,t=["bounce","pulse","rubberBand","shake","swing","tada","jello"],n=$("#logo").attr("class").split(/\s+/);$("#logo").removeClass("bounceInLeft");var r=t[Math.floor(Math.random()*t.length)];n.forEach(function(n){var r=t.indexOf(n);r>-1&&(e=t[r],$("#logo").removeClass(e))});while(e===r)r=t[Math.floor(Math.random()*t.length)];$("#logo").addClass(r)})}var A=I,P=(n("206d"),Object(l["a"])(A,j,M,!1,null,null,null)),R=P.exports,N=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},Z=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h1",[e._v("AUTHENTICATION ERROR")])])}],G={name:"error"},U=G,q=Object(l["a"])(U,N,Z,!1,null,null,null),J=q.exports;r["a"].use(h["a"]);var z=new h["a"]({mode:"history",base:"/",routes:[{path:"/",name:"home",component:B,meta:{requiresAuth:!1}},{path:"/login",name:"login",component:R},{path:"/error",name:"error",component:J},{path:"*",name:"catch-all",redirect:{name:"home"}}]}),D=n("2f62");r["a"].use(D["a"]);var W=new D["a"].Store({state:{},mutations:{},actions:{}});r["a"].use(o.a,i.a),r["a"].config.productionTip=!1,z.beforeEach(function(e,t,n){e.meta.requiresAuth&&(token&&!isExpired||n({name:"login"})),n()}),new r["a"]({router:z,store:W,render:function(e){return e(v)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var r=n("5e27"),a=n.n(r);a.a},"5e27":function(e,t,n){},"9cbb":function(e,t,n){},bcc9:function(e,t,n){},cf05:function(e,t,n){e.exports=n.p+"img/logo.6fb8967e.png"}});
//# sourceMappingURL=app.4d55b422.js.map