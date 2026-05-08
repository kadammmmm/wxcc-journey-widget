(function () {
  'use strict';

  /**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t$2=globalThis,e$4=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$2 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$4&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$2=t=>new n$2("string"==typeof t?t:t+"",void 0,s$2),i$4=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$2(o,t,s$2)},S$1=(s,o)=>{if(e$4)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$4?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$2(e)})(t):t;

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const{is:i$3,defineProperty:e$3,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$1,getOwnPropertySymbols:o$3,getPrototypeOf:n$1}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$3(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$3(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$1(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$1(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t$1=globalThis,i$2=t=>t,s$1=t$1.trustedTypes,e$2=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n="?"+o$2,r=`<${n}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e$2?e$2.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$2(t).nextSibling;i$2(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.2");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const s=globalThis;let i$1 = class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}};i$1._$litElement$=true,i$1["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i$1});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i$1});(s.litElementVersions??=[]).push("4.2.2");

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
  const t={CHILD:2},e$1=t=>(...e)=>({_$litDirective$:t,values:e});class i{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i;}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}

  /**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */class e extends i{constructor(i){if(super(i),this.it=A,i.type!==t.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(r){if(r===A||null==r)return this._t=void 0,this.it=r;if(r===E)return r;if("string"!=typeof r)throw Error(this.constructor.directiveName+"() called with a non-string value");if(r===this.it)return this._t;this.it=r;const s=[r];return s.raw=s,this._t={_$litType$:this.constructor.resultType,strings:s,values:[]}}}e.directiveName="unsafeHTML",e.resultType=1;const o=e$1(e);

  const styles = i$4`
  :host {
    display: block;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 13px;
    line-height: 1.5;
    color: var(--cj-text-primary, #212529);
    background: var(--cj-bg, #ffffff);
    height: 100%;
    overflow: hidden;

    --cj-bg: #ffffff;
    --cj-card-bg: #f8f9fa;
    --cj-border: #e9ecef;
    --cj-text-primary: #212529;
    --cj-text-muted: #6c757d;
    --cj-accent-blue: #0d6efd;
    --cj-accent-teal: #0dcaf0;
    --cj-accent-green: #198754;
    --cj-accent-purple: #6f42c1;
    --cj-accent-gray: #adb5bd;
    --cj-accent-amber: #d97706;
    --cj-rail-color: #dee2e6;
    --cj-skeleton: #e9ecef;
    --cj-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
    --cj-shadow-hover: 0 4px 12px rgba(0,0,0,0.10), 0 2px 4px rgba(0,0,0,0.06);
  }

  @media (prefers-color-scheme: dark) {
    :host {
      --cj-bg: #1a1a2e;
      --cj-card-bg: #252540;
      --cj-border: #3a3a5c;
      --cj-text-primary: #e9ecef;
      --cj-text-muted: #8b8fa8;
      --cj-rail-color: #3a3a5c;
      --cj-skeleton: #2e2e50;
      --cj-shadow: 0 1px 3px rgba(0,0,0,0.3);
      --cj-shadow-hover: 0 4px 12px rgba(0,0,0,0.4);
    }
  }

  :host([dark]) {
    --cj-bg: #1a1a2e;
    --cj-card-bg: #252540;
    --cj-border: #3a3a5c;
    --cj-text-primary: #e9ecef;
    --cj-text-muted: #8b8fa8;
    --cj-rail-color: #3a3a5c;
    --cj-skeleton: #2e2e50;
    --cj-shadow: 0 1px 3px rgba(0,0,0,0.3);
    --cj-shadow-hover: 0 4px 12px rgba(0,0,0,0.4);
  }

  /* ── Layout ─────────────────────────────────────────────── */

  .widget {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--cj-bg);
    overflow: hidden;
    max-width: 720px;
    margin: 0 auto;
    width: 100%;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px 8px;
    border-bottom: 1px solid var(--cj-border);
    flex-shrink: 0;
    background: var(--cj-bg);
    position: relative;
    z-index: 2;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .header-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--cj-text-primary);
    letter-spacing: -0.01em;
  }

  .header-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .event-count-badge {
    background: var(--cj-accent-blue);
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    padding: 2px 7px;
    border-radius: 10px;
    min-width: 20px;
    text-align: center;
    transition: all 0.2s ease;
  }

  .event-count-badge.loading {
    background: var(--cj-accent-gray);
  }

  .ended-badge {
    font-size: 10px;
    font-weight: 600;
    color: var(--cj-text-muted);
    background: var(--cj-card-bg);
    border: 1px solid var(--cj-border);
    padding: 2px 8px;
    border-radius: 10px;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .status-row {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 5px 16px 6px;
    border-bottom: 1px solid var(--cj-border);
    flex-shrink: 0;
    background: var(--cj-bg);
  }

  .status-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--cj-accent-gray);
    flex-shrink: 0;
    transition: background 0.3s ease;
  }

  .status-dot.active {
    background: var(--cj-accent-green);
    animation: pulse-dot 2s infinite;
  }

  @keyframes pulse-dot {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.45; }
  }

  .status-text {
    font-size: 11px;
    color: var(--cj-text-muted);
  }

  /* ── Timeline body ───────────────────────────────────────── */

  .timeline-body {
    flex: 1;
    overflow-y: auto;
    padding: 8px 0 16px;
    scroll-behavior: smooth;
  }

  .timeline-body::-webkit-scrollbar {
    width: 4px;
  }

  .timeline-body::-webkit-scrollbar-track {
    background: transparent;
  }

  .timeline-body::-webkit-scrollbar-thumb {
    background: var(--cj-border);
    border-radius: 2px;
  }

  .timeline-inner {
    position: relative;
    padding: 0 16px 0 36px;
  }

  /* Vertical rail */
  .timeline-inner::before {
    content: '';
    position: absolute;
    left: 27px;
    top: 0;
    bottom: 0;
    width: 1px;
    background: var(--cj-rail-color);
  }

  /* ── Date separator ─────────────────────────────────────── */

  .date-separator {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 16px 0 10px -20px;
    position: relative;
  }

  .date-separator-label {
    font-size: 11px;
    font-weight: 600;
    color: var(--cj-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    white-space: nowrap;
    background: var(--cj-bg);
    padding: 0 8px 0 0;
  }

  .date-separator-line {
    flex: 1;
    height: 1px;
    background: var(--cj-border);
  }

  /* ── Event card ─────────────────────────────────────────── */

  .event-card-wrapper {
    position: relative;
    margin-bottom: 8px;
    animation: slideInCard 0.25s ease both;
  }

  @keyframes slideInCard {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .rail-dot {
    position: absolute;
    left: -24px;
    top: 14px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid var(--cj-bg);
    background: var(--cj-accent-gray);
    z-index: 1;
    transition: transform 0.15s ease;
  }

  .rail-dot.blue   { background: var(--cj-accent-blue); }
  .rail-dot.teal   { background: var(--cj-accent-teal); }
  .rail-dot.green  { background: var(--cj-accent-green); }
  .rail-dot.purple { background: var(--cj-accent-purple); }
  .rail-dot.gray   { background: var(--cj-accent-gray); }
  .rail-dot.amber  { background: var(--cj-accent-amber); }

  .event-card {
    background: var(--cj-card-bg);
    border: 1px solid var(--cj-border);
    border-left-width: 3px;
    border-radius: 8px;
    padding: 10px 12px;
    cursor: default;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
    box-shadow: var(--cj-shadow);
  }

  .event-card:hover {
    transform: translateY(-1px);
    box-shadow: var(--cj-shadow-hover);
  }

  .event-card.blue   { border-left-color: var(--cj-accent-blue); }
  .event-card.teal   { border-left-color: var(--cj-accent-teal); }
  .event-card.green  { border-left-color: var(--cj-accent-green); }
  .event-card.purple { border-left-color: var(--cj-accent-purple); }
  .event-card.gray   { border-left-color: var(--cj-accent-gray); }
  .event-card.amber  { border-left-color: var(--cj-accent-amber); }

  .card-top-row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 5px;
  }

  .source-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.03em;
    padding: 2px 7px 2px 5px;
    border-radius: 10px;
    text-transform: uppercase;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .source-badge svg {
    width: 11px;
    height: 11px;
    flex-shrink: 0;
  }

  .source-badge.blue   { background: color-mix(in srgb, var(--cj-accent-blue) 12%, transparent); color: var(--cj-accent-blue); }
  .source-badge.teal   { background: color-mix(in srgb, var(--cj-accent-teal) 12%, transparent); color: var(--cj-accent-teal); }
  .source-badge.green  { background: color-mix(in srgb, var(--cj-accent-green) 12%, transparent); color: var(--cj-accent-green); }
  .source-badge.purple { background: color-mix(in srgb, var(--cj-accent-purple) 12%, transparent); color: var(--cj-accent-purple); }
  .source-badge.gray   { background: color-mix(in srgb, var(--cj-accent-gray) 12%, transparent); color: var(--cj-text-muted); }
  .source-badge.amber  { background: color-mix(in srgb, var(--cj-accent-amber) 12%, transparent); color: var(--cj-accent-amber); }

  .card-timestamp {
    font-size: 10px;
    color: var(--cj-text-muted);
    white-space: nowrap;
    flex-shrink: 0;
    margin-top: 1px;
  }

  /* ── Card body: text + optional image ──────────────────── */

  .card-body {
    display: flex;
    gap: 10px;
    align-items: flex-start;
  }

  .card-text-col {
    flex: 1;
    min-width: 0;
  }

  .card-image-col {
    flex-shrink: 0;
  }

  .product-thumb {
    display: block;
    width: 72px;
    height: 72px;
    object-fit: cover;
    border-radius: 6px;
    border: 1px solid var(--cj-border);
    background: var(--cj-skeleton);
    transition: opacity 0.2s ease, transform 0.15s ease;
  }

  .product-thumb:hover {
    opacity: 0.88;
    transform: scale(1.03);
  }

  .product-thumb-link {
    display: block;
    line-height: 0;
    border-radius: 6px;
    overflow: hidden;
  }

  .card-title {
    font-size: 12px;
    font-weight: 600;
    color: var(--cj-text-primary);
    margin-bottom: 5px;
    word-break: break-word;
  }

  .title-link {
    color: inherit;
    text-decoration: none;
  }

  .title-link:hover {
    text-decoration: underline;
    color: var(--cj-accent-blue);
  }

  .card-url {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 11px;
    color: var(--cj-accent-blue);
    text-decoration: none;
    max-width: 100%;
    margin-bottom: 5px;
    word-break: break-all;
  }

  .card-url:hover { text-decoration: underline; }

  .card-url svg {
    width: 11px;
    height: 11px;
    flex-shrink: 0;
    opacity: 0.7;
  }

  .url-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 180px;
  }

  .field-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2px 8px;
    margin-top: 4px;
  }

  .field-label {
    font-size: 10px;
    color: var(--cj-text-muted);
    font-weight: 500;
    white-space: nowrap;
    padding-top: 1px;
    text-transform: capitalize;
  }

  .field-value {
    font-size: 11px;
    font-weight: 500;
    color: var(--cj-text-primary);
    word-break: break-word;
  }

  .price-label {
    font-weight: 600;
  }

  .price-value {
    font-size: 12px;
    font-weight: 700;
    color: var(--cj-accent-green);
  }

  .show-more-btn {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    margin-top: 6px;
    font-size: 10px;
    color: var(--cj-text-muted);
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    font-family: inherit;
    transition: color 0.15s ease;
  }

  .show-more-btn:hover { color: var(--cj-text-primary); }

  .show-more-btn svg {
    width: 12px;
    height: 12px;
    transition: transform 0.2s ease;
  }

  .show-more-btn.open svg { transform: rotate(180deg); }

  .secondary-fields {
    margin-top: 4px;
    animation: fadeIn 0.15s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* ── Journey summary strip ──────────────────────── */

  .summary-strip {
    display: flex;
    align-items: stretch;
    border-bottom: 1px solid var(--cj-border);
    flex-shrink: 0;
    background: var(--cj-card-bg);
  }

  .summary-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 9px 6px;
    gap: 3px;
    border-right: 1px solid var(--cj-border);
    min-width: 0;
    overflow: hidden;
  }

  .summary-stat:last-child { border-right: none; }

  .summary-stat-icon {
    display: flex;
    width: 13px;
    height: 13px;
    color: var(--cj-text-muted);
    flex-shrink: 0;
  }

  .summary-stat-value {
    font-size: 17px;
    font-weight: 700;
    color: var(--cj-text-primary);
    line-height: 1;
  }

  .summary-stat-label {
    font-size: 9px;
    color: var(--cj-text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    white-space: nowrap;
  }

  .summary-stat--intent .summary-stat-value,
  .summary-stat--intent .summary-stat-icon { color: var(--cj-accent-amber); }

  .summary-wrapup-pill {
    font-size: 10px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 8px;
    background: color-mix(in srgb, var(--cj-accent-green) 15%, transparent);
    color: var(--cj-accent-green);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }

  /* ── High-intent (add_to_cart) card ─────────────── */

  .event-card.high-intent {
    background: color-mix(in srgb, var(--cj-accent-amber) 5%, var(--cj-card-bg));
  }

  .intent-badge {
    display: inline-flex;
    align-items: center;
    gap: 3px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: var(--cj-accent-amber);
    background: color-mix(in srgb, var(--cj-accent-amber) 12%, transparent);
    border: 1px solid color-mix(in srgb, var(--cj-accent-amber) 30%, transparent);
    padding: 2px 6px;
    border-radius: 4px;
  }

  /* ── Call history card ──────────────────────────────── */

  .call-card-body {
    margin-top: 3px;
  }

  .call-disposition {
    font-size: 12px;
    font-weight: 600;
    color: var(--cj-text-primary);
  }

  .call-subtitle {
    font-size: 11px;
    color: var(--cj-text-muted);
    margin-top: 2px;
  }

  .call-direction {
    display: inline-block;
    margin-top: 4px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.04em;
    color: var(--cj-text-muted);
    background: color-mix(in srgb, var(--cj-accent-gray) 15%, transparent);
    padding: 1px 6px;
    border-radius: 4px;
  }

  /* ── Skeleton ──────────────────────────────────────────── */

  .skeleton-wrapper {
    padding: 8px 16px 0 36px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .skeleton-card {
    background: var(--cj-card-bg);
    border: 1px solid var(--cj-border);
    border-left: 3px solid var(--cj-skeleton);
    border-radius: 8px;
    padding: 10px 12px;
    box-shadow: var(--cj-shadow);
  }

  .skel {
    background: var(--cj-skeleton);
    border-radius: 4px;
    animation: shimmer 1.4s ease-in-out infinite;
  }

  .skel-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
  }

  @keyframes shimmer {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.4; }
  }

  /* ── Empty / error / idle states ─────────────────────── */

  .center-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 32px 24px;
    text-align: center;
    gap: 8px;
  }

  .state-icon {
    color: var(--cj-text-muted);
    opacity: 0.5;
    margin-bottom: 4px;
  }

  .state-icon svg {
    width: 40px;
    height: 40px;
  }

  .state-heading {
    font-size: 13px;
    font-weight: 600;
    color: var(--cj-text-primary);
    margin: 0;
  }

  .state-subtext {
    font-size: 12px;
    color: var(--cj-text-muted);
    margin: 0;
    max-width: 220px;
    line-height: 1.6;
  }

  .error-banner {
    margin: 12px 16px;
    padding: 10px 12px;
    background: color-mix(in srgb, #dc3545 8%, transparent);
    border: 1px solid color-mix(in srgb, #dc3545 25%, transparent);
    border-radius: 8px;
    color: #dc3545;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .error-message {
    font-weight: 500;
  }

  .retry-btn {
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    font-weight: 600;
    color: #dc3545;
    background: none;
    border: 1px solid color-mix(in srgb, #dc3545 40%, transparent);
    border-radius: 6px;
    padding: 4px 10px;
    cursor: pointer;
    font-family: inherit;
    transition: background 0.15s ease;
  }

  .retry-btn:hover {
    background: color-mix(in srgb, #dc3545 10%, transparent);
  }

  .retry-btn svg {
    width: 12px;
    height: 12px;
  }

  /* Spinning refresh icon */
  .spin {
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
`;

  const ICONS = {
    globe: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,

    'chat-bubble': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,

    phone: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.6 1.21h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,

    envelope: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,

    'activity-pulse': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,

    'external-link': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,

    'chevron-down': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,

    lock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,

    refresh: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,

    cart: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,

    eye: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`,
  };

  /**
   * Get the icon key for a given source string.
   * @param {string} source
   * @returns {string} icon key
   */
  function getIconForSource(source) {
    if (!source) return 'activity-pulse';
    const s = source.toLowerCase();
    if (s.includes('web') || s.includes('site') || s.includes('browse')) return 'globe';
    if (s.includes('chat') || s.includes('message')) return 'chat-bubble';
    if (s.includes('voice') || s.includes('phone') || s.includes('call')) return 'phone';
    if (s.includes('email') || s.includes('mail')) return 'envelope';
    return 'activity-pulse';
  }

  /**
   * Format an ISO timestamp into a human-readable relative string.
   * @param {string} isoString
   * @returns {string}
   */
  function formatRelativeTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);

    if (diffSec < 60) return 'Just now';
    if (diffMin < 60) return `${diffMin} min ago`;

    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart - 86400000);

    const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    if (date >= todayStart) return `Today ${timeStr}`;
    if (date >= yesterdayStart) return `Yesterday ${timeStr}`;

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + `, ${timeStr}`;
  }

  /**
   * Return a date-group label for timeline separators.
   * @param {string} isoString
   * @returns {string}
   */
  function getDateGroupLabel(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart - 86400000);

    if (date >= todayStart) return 'Today';
    if (date >= yesterdayStart) return 'Yesterday';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  /**
   * Resolve a customer alias (ANI / email) to a CJDS person identityId.
   *
   * @param {string} baseUrl        e.g. https://api-jds.wxdap-produs1.webex.com
   * @param {string} token          Bearer token
   * @param {string} workspaceId
   * @param {string} organizationId
   * @param {string} alias          phone number or email (will be URL-encoded)
   * @returns {Promise<string>}     identityId
   */
  async function resolveIdentity(baseUrl, token, workspaceId, organizationId, alias) {
    const url = `${baseUrl}/admin/v1/api/person/workspace-id/${workspaceId}/aliases/${encodeURIComponent(alias)}?organizationId=${encodeURIComponent(organizationId)}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) throw Object.assign(new Error('Unauthorized'), { code: 'AUTH_ERROR' });
    if (res.status === 404) throw Object.assign(new Error('Identity not found'), { code: 'NOT_FOUND' });
    if (!res.ok) throw Object.assign(new Error(`API error ${res.status}`), { code: 'API_ERROR' });

    const body = await res.json();
    const identities = Array.isArray(body.data) ? body.data : [];
    if (!identities.length) throw Object.assign(new Error('Identity not found'), { code: 'NOT_FOUND' });

    return identities[0].id ?? identities[0].identityId;
  }

  /**
   * Fetch recent journey events for a given customer alias.
   * Uses the alias directly — no separate identity resolution step needed.
   *
   * @param {string} baseUrl
   * @param {string} token
   * @param {string} workspaceId
   * @param {string} organizationId
   * @param {string} alias          phone number or email (will be URL-encoded)
   * @param {number} [limit=20]
   * @returns {Promise<Array>}      events sorted newest-first (CloudEvents format)
   */
  async function fetchJourneyEvents(baseUrl, token, workspaceId, organizationId, alias, limit = 20) {
    const url = `${baseUrl}/v1/api/events/workspace-id/${workspaceId}?organizationId=${encodeURIComponent(organizationId)}&identity=${encodeURIComponent(alias)}&limit=${limit}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) throw Object.assign(new Error('Unauthorized'), { code: 'AUTH_ERROR' });
    if (res.status === 404) throw Object.assign(new Error('Identity not found'), { code: 'NOT_FOUND' });
    if (!res.ok) throw Object.assign(new Error(`API error ${res.status}`), { code: 'API_ERROR' });

    const body = await res.json();
    const events = Array.isArray(body.data) ? body.data : [];

    // Parse nested stringified JSON if dataContentType indicates it
    const parsed = events.map(evt => {
      if (evt.dataContentType === 'string' && typeof evt.data === 'string') {
        try { return { ...evt, data: JSON.parse(evt.data) }; } catch { return evt; }
      }
      return evt;
    });

    // Sort newest-first; events use CloudEvents `time` field
    return parsed.slice().sort((a, b) => new Date(b.time ?? b.createdAt ?? 0) - new Date(a.time ?? a.createdAt ?? 0));
  }

  /**
   * Extract the customer identity from an interaction payload.
   * Outbound calls use dnis (dialed number); inbound use ani.
   *
   * @param {object} interaction
   * @returns {string|null}
   */
  function extractCustomerIdentity(interaction) {
    if (interaction?.contactDirection === 'OUTBOUND') {
      return interaction.dnis ?? null;
    }
    return (
      interaction?.ani ??
      interaction?.phoneNumber ??
      interaction?.callAssociatedData?.ani?.value ??
      interaction?.callAssociatedData?.ani ??
      interaction?.callAssociatedData?.email?.value ??
      interaction?.callAssociatedData?.email ??
      interaction?.callAssociatedDetails?.ani ??
      null
    );
  }

  /** Render a named SVG icon as actual markup (SVGs are trusted, defined in-package). */
  const icon = (name) => o(ICONS[name] ?? '');

  // ── Noise field configuration ─────────────────────────────────────────────────
  // These fields will be collapsed under a "show more" toggle on each card.
  const SECONDARY_FIELDS = ['demoId', 'companyName'];

  // These fields are never rendered in the key/value grid (already rendered elsewhere).
  const SKIP_FIELDS = ['title', 'url', 'timestamp', 'source', 'productName', 'imageUrl', 'productUrl'];
  // ─────────────────────────────────────────────────────────────────────────────

  const POLL_INTERVAL_MS = 15000;

  const STATE = {
    IDLE: 'idle',
    LOADING: 'loading',
    LOADED: 'loaded',
    EMPTY: 'empty',
    ERROR: 'error',
  };

  /** Map a source/type string to a color class name. Handles both free-form strings
   *  and CloudEvent type patterns like "page:view" or "task:new". */
  function colorForSource(source) {
    if (!source) return 'gray';
    const s = source.toLowerCase();
    if (s.includes('page') || s.includes('web') || s.includes('site') || s.includes('browse')) return 'blue';
    if (s.includes('chat') || s.includes('message')) return 'teal';
    if (s.includes('voice') || s.includes('phone') || s.includes('call') || s.includes('task') || s.includes('telephon')) return 'green';
    if (s.includes('email') || s.includes('mail')) return 'purple';
    return 'gray';
  }

  /** Capitalize words and replace underscores with spaces for field label display. */
  function humanizeKey(key) {
    return key.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  /** Format a field value — detects 13-digit epoch-ms timestamps. */
  function formatFieldValue(v) {
    if (/^\d{13}$/.test(v)) {
      try { return new Date(Number(v)).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }); }
      catch { /* fall through */ }
    }
    return v;
  }

  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const isUuid = (v) => UUID_RE.test(String(v));

  class JourneyWidget extends i$1 {
    static properties = {
      baseUrl:        { type: String, attribute: 'base-url' },
      workspaceId:    { type: String, attribute: 'workspace-id' },
      organizationId: { type: String, attribute: 'organization-id' },
      // Injected by the Desktop framework via $STORE bindings in the layout JSON
      bearerToken:    { type: String, attribute: 'bearer-token' },
      interactionData: { type: Object },
      // internal reactive state
      _state: { state: true },
      _events: { state: true },
      _statusText: { state: true },
      _polling: { state: true },
      _interactionEnded: { state: true },
      _errorMsg: { state: true },
      _errorCode: { state: true },
      _expandedCards: { state: true },
    };

    static styles = styles;

    constructor() {
      super();
      this.baseUrl = 'https://api-jds.wxdap-produs1.webex.com';
      this.workspaceId = '';
      this.organizationId = '';
      this.bearerToken = '';
      this.interactionData = null;
      this._state = STATE.IDLE;
      this._events = [];
      this._statusText = 'Waiting for interaction';
      this._polling = false;
      this._interactionEnded = false;
      this._errorMsg = null;
      this._errorCode = null;
      this._expandedCards = new Set();
      this._pollTimer = null;
      this._identityId = null;
      this._customerIdentity = null;
    }

    connectedCallback() {
      super.connectedCallback();
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this._stopPolling();
    }

    updated(changedProps) {
      if (!changedProps.has('interactionData')) return;
      const data = this.interactionData;
      if (!data) return;

      // isTerminated signals the contact has ended
      if (data.isTerminated) {
        this._onContactEnded();
        return;
      }

      const state = (data.state ?? '').toLowerCase();
      // connected = active call/chat; wrapup = post-contact wrap-up (journey still relevant)
      if (state === 'connected' || state === 'accepted' || state === 'wrapup') {
        this._onContactAccepted(data);
      }
    }

    async _onContactAccepted(interaction) {
      this._interactionEnded = false;
      const identity = extractCustomerIdentity(interaction);

      if (!identity) {
        this._state = STATE.ERROR;
        this._errorMsg = 'Could not extract customer identity from interaction.';
        this._errorCode = 'NO_IDENTITY';
        return;
      }

      this._customerIdentity = identity;
      this._identityId = null;
      this._events = [];
      this._expandedCards = new Set();
      this._state = STATE.LOADING;
      this._statusText = 'Loading journey…';

      await this._loadJourney();
      this._startPolling();
    }

    _onContactEnded() {
      this._interactionEnded = true;
      this._polling = false;
      this._statusText = 'Interaction ended';
      this._stopPolling();
    }

    async _loadJourney() {
      try {
        if (!this.workspaceId) throw Object.assign(new Error('workspace-id property is not configured'), { code: 'API_ERROR' });

        const token = this.bearerToken;
        if (!token) throw Object.assign(new Error('No bearer token — check $STORE.auth.accessToken binding'), { code: 'AUTH_ERROR' });

        if (!this._identityId) {
          this._identityId = await resolveIdentity(this.baseUrl, token, this.workspaceId, this.organizationId, this._customerIdentity);
        }

        const raw = await fetchJourneyEvents(this.baseUrl, token, this.workspaceId, this.organizationId, this._customerIdentity);
        // agent:state_change with currentState=wrapup-done = completed call with wrap-up code.
        // All other task:* events are internal telephony noise — drop them.
        const events = raw
          .filter(evt => {
            const t = (evt.type ?? '').toLowerCase();
            if (t === 'agent:state_change') {
              return (evt.data?.currentState ?? '').toLowerCase() === 'wrapup-done';
            }
            return !t.startsWith('task:');
          })
          .slice(0, 25);
        this._events = events;
        this._state = events.length === 0 ? STATE.EMPTY : STATE.LOADED;
        this._statusText = 'Updated just now';
        this._polling = true;
        this._errorMsg = null;
        this._errorCode = null;
      } catch (err) {
        this._state = STATE.ERROR;
        this._polling = false;
        this._errorCode = err.code ?? 'API_ERROR';
        switch (this._errorCode) {
          case 'AUTH_ERROR':
            this._errorMsg = 'Authentication failed. The session token may have expired.';
            break;
          case 'NOT_FOUND':
            this._errorMsg = `No journey data found for this customer.`;
            break;
          default:
            this._errorMsg = `Failed to load journey data: ${err.message}`;
        }
      }
    }

    _startPolling() {
      this._stopPolling();
      if (this._interactionEnded) return;
      this._pollTimer = setInterval(() => {
        if (!this._interactionEnded) this._loadJourney();
      }, POLL_INTERVAL_MS);
    }

    _stopPolling() {
      if (this._pollTimer) {
        clearInterval(this._pollTimer);
        this._pollTimer = null;
      }
    }

    _retry() {
      this._state = STATE.LOADING;
      this._errorMsg = null;
      this._loadJourney();
    }

    _toggleCard(id) {
      const next = new Set(this._expandedCards);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      this._expandedCards = next;
    }

    // ── Render helpers ─────────────────────────────────────────────────────────

    _renderHeader() {
      const { _state, _events, _polling, _interactionEnded } = this;
      const isLoading = _state === STATE.LOADING;

      return b`
      <div class="header">
        <div class="header-left">
          <span class="header-title">Journey Timeline</span>
        </div>
        <div class="header-right">
          ${_interactionEnded
            ? b`<span class="ended-badge">Ended</span>`
            : A}
          <span class="event-count-badge ${isLoading ? 'loading' : ''}">
            ${isLoading
              ? b`<span class="spin" style="display:inline-block;width:10px;height:10px;">${icon('refresh')}</span>`
              : _events.length}
          </span>
        </div>
      </div>
      <div class="status-row">
        <div class="status-dot ${_polling && !_interactionEnded ? 'active' : ''}"></div>
        <span class="status-text">${this._statusText}</span>
      </div>
    `;
    }

    _renderIdle() {
      return b`
      <div class="center-state">
        <div class="state-icon">${icon('lock')}</div>
        <p class="state-heading">Waiting for interaction…</p>
        <p class="state-subtext">Journey events will appear when a contact is accepted.</p>
      </div>
    `;
    }

    _renderLoading() {
      const skelCard = (w1, w2) => b`
      <div class="skeleton-card">
        <div class="skel-row">
          <div class="skel" style="width:${w1}px;height:14px;"></div>
          <div class="skel" style="width:50px;height:10px;margin-top:2px;"></div>
        </div>
        <div class="skel" style="width:${w2}px;height:12px;margin-bottom:6px;"></div>
        <div class="skel" style="width:100%;height:10px;margin-bottom:3px;"></div>
        <div class="skel" style="width:75%;height:10px;"></div>
      </div>
    `;
      return b`
      <div class="skeleton-wrapper">
        ${skelCard(80, 160)}
        ${skelCard(70, 140)}
        ${skelCard(90, 120)}
      </div>
    `;
    }

    _renderEmpty() {
      return b`
      <div class="center-state">
        <div class="state-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12h18M3 6h18M3 18h18" opacity="0.4"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </div>
        <p class="state-heading">No journey events yet</p>
        <p class="state-subtext">Events will appear here as the customer interacts.</p>
      </div>
    `;
    }

    _renderError() {
      const isApiError = this._errorCode === 'API_ERROR';
      return b`
      <div class="error-banner">
        <div class="error-message">${this._errorMsg}</div>
        ${isApiError ? b`
          <button class="retry-btn" @click=${this._retry}>
            <span style="display:inline-block;width:12px;height:12px;">${icon('refresh')}</span>
            Retry
          </button>
        ` : A}
      </div>
    `;
    }

    _renderSourceBadge(source) {
      const color = colorForSource(source);
      const iconKey = getIconForSource(source);
      const label = source ? source.replace(/_/g, ' ') : 'Unknown';
      return b`
      <span class="source-badge ${color}">
        <span style="display:inline-flex;width:11px;height:11px;">${icon(iconKey)}</span>
        ${label}
      </span>
    `;
    }

    _renderCard(event) {
      const { id, type, data = {} } = event;
      // CloudEvents use `time`; legacy CJDS used `createdAt`
      const timestamp = event.time ?? event.createdAt;
      const source = data.source ?? type ?? '';
      const isHighIntent = type === 'add_to_cart';
      const color = isHighIntent ? 'amber' : colorForSource(source);
      const title = data.productName ?? data.title ?? data.page ?? humanizeKey(type);
      const isExpanded = this._expandedCards.has(id);
      const imageUrl = data.imageUrl ?? null;
      const productUrl = data.productUrl ?? null;

      // Compute primary and secondary visible fields
      const primaryFields = [];
      const secondaryFields = [];

      for (const [k, v] of Object.entries(data)) {
        if (SKIP_FIELDS.includes(k)) continue;
        if (v === null || v === undefined || v === '') continue;
        if (isUuid(v)) continue;
        const entry = { k, v: String(v) };
        if (SECONDARY_FIELDS.includes(k)) secondaryFields.push(entry);
        else primaryFields.push(entry);
      }

      const hasSecondary = secondaryFields.length > 0;

      return b`
      <div class="event-card-wrapper">
        <div class="rail-dot ${color}"></div>
        <div class="event-card ${color} ${isHighIntent ? 'high-intent' : ''}">
          <div class="card-top-row">
            ${isHighIntent
              ? b`<span class="intent-badge"><span style="display:inline-flex;width:10px;height:10px;">${icon('cart')}</span> Added to Cart</span>`
              : this._renderSourceBadge(source)}
            <span class="card-timestamp">${formatRelativeTime(timestamp)}</span>
          </div>
          <div class="card-body">
            <div class="card-text-col">
              <div class="card-title">
                ${productUrl
                  ? b`<a class="title-link" href="${productUrl}" target="_blank" rel="noopener noreferrer">${title}</a>`
                  : title}
              </div>
              ${data.url ? b`
                <a class="card-url" href="${data.url}" target="_blank" rel="noopener noreferrer">
                  <span style="display:inline-flex;width:11px;height:11px;">${icon('external-link')}</span>
                  <span class="url-text">${data.url}</span>
                </a>
              ` : A}
              ${primaryFields.length ? b`
                <div class="field-grid">
                  ${primaryFields.map(({ k, v }) => b`
                    <span class="field-label ${k === 'price' ? 'price-label' : ''}">${humanizeKey(k)}</span>
                    <span class="field-value ${k === 'price' ? 'price-value' : ''}">${formatFieldValue(v)}</span>
                  `)}
                </div>
              ` : A}
              ${hasSecondary ? b`
                <button
                  class="show-more-btn ${isExpanded ? 'open' : ''}"
                  @click=${() => this._toggleCard(id)}
                >
                  <span style="display:inline-flex;width:12px;height:12px;">${icon('chevron-down')}</span>
                  ${isExpanded ? 'Show less' : `Show ${secondaryFields.length} more`}
                </button>
                ${isExpanded ? b`
                  <div class="secondary-fields">
                    <div class="field-grid">
                      ${secondaryFields.map(({ k, v }) => b`
                        <span class="field-label">${humanizeKey(k)}</span>
                        <span class="field-value">${formatFieldValue(v)}</span>
                      `)}
                    </div>
                  </div>
                ` : A}
              ` : A}
            </div>
            ${imageUrl ? b`
              <div class="card-image-col">
                ${productUrl ? b`
                  <a href="${productUrl}" target="_blank" rel="noopener noreferrer" class="product-thumb-link">
                    <img
                      class="product-thumb"
                      src="${imageUrl}"
                      alt="${title}"
                      loading="lazy"
                      @error=${(e) => { const col = e.target.closest('.card-image-col'); if (col) col.style.display = 'none'; }}
                    />
                  </a>
                ` : b`
                  <img
                    class="product-thumb"
                    src="${imageUrl}"
                    alt="${title}"
                    loading="lazy"
                    @error=${(e) => { const col = e.target.closest('.card-image-col'); if (col) col.style.display = 'none'; }}
                  />
                `}
              </div>
            ` : A}
          </div>
        </div>
      </div>
    `;
    }

    _renderSummaryStrip() {
      const evts = this._events;
      const calls = evts.filter(e => e.type === 'agent:state_change');
      const lastWrapUp = calls[0]?.data?.wrapUpAuxCodeName ?? null;
      const webCount = evts.filter(e => ['page_view', 'product_view', 'product_click'].includes(e.type)).length;
      const cartCount = evts.filter(e => e.type === 'add_to_cart').length;

      return b`
      <div class="summary-strip">
        <div class="summary-stat">
          <span class="summary-stat-icon">${icon('phone')}</span>
          <span class="summary-stat-value">${calls.length}</span>
          <span class="summary-stat-label">Calls</span>
        </div>
        <div class="summary-stat">
          ${lastWrapUp
            ? b`<span class="summary-wrapup-pill">${lastWrapUp}</span>`
            : b`<span class="summary-stat-value" style="font-size:12px;color:var(--cj-text-muted)">—</span>`}
          <span class="summary-stat-label">Last Outcome</span>
        </div>
        <div class="summary-stat">
          <span class="summary-stat-icon">${icon('eye')}</span>
          <span class="summary-stat-value">${webCount}</span>
          <span class="summary-stat-label">Web Events</span>
        </div>
        <div class="summary-stat ${cartCount > 0 ? 'summary-stat--intent' : ''}">
          <span class="summary-stat-icon">${icon('cart')}</span>
          <span class="summary-stat-value">${cartCount}</span>
          <span class="summary-stat-label">In Cart</span>
        </div>
      </div>
    `;
    }

    _renderCallCard(event) {
      const { data = {} } = event;
      const timestamp = event.time ?? event.createdAt;
      const disposition = data.wrapUpAuxCodeName ?? data.wrapUpReason ?? data.wrapupReason ?? 'N/A';
      const agentName = data.agentName ?? null;
      const queueName = data.queueName ?? null;
      const subtitle = [agentName, queueName].filter(Boolean).join(' • ');

      return b`
      <div class="event-card-wrapper">
        <div class="rail-dot green"></div>
        <div class="event-card call-card green">
          <div class="card-top-row">
            ${this._renderSourceBadge('telephony')}
            <span class="card-timestamp">${formatRelativeTime(timestamp)}</span>
          </div>
          <div class="call-card-body">
            <div class="call-disposition">${disposition}</div>
            ${subtitle ? b`<div class="call-subtitle">${subtitle}</div>` : A}
          </div>
        </div>
      </div>
    `;
    }

    _renderTimeline() {
      const events = this._events;
      const items = [];
      let lastLabel = null;

      for (const event of events) {
        const label = getDateGroupLabel(event.time ?? event.createdAt);
        if (label !== lastLabel) {
          items.push(b`
          <div class="date-separator">
            <span class="date-separator-label">${label}</span>
            <div class="date-separator-line"></div>
          </div>
        `);
          lastLabel = label;
        }
        const isCall = (event.type ?? '') === 'agent:state_change';
        items.push(isCall ? this._renderCallCard(event) : this._renderCard(event));
      }

      return b`
      <div class="timeline-body">
        <div class="timeline-inner">${items}</div>
      </div>
    `;
    }

    render() {
      const { _state } = this;
      return b`
      <div class="widget">
        ${this._renderHeader()}
        ${_state === STATE.LOADED  ? this._renderSummaryStrip() : A}
        ${_state === STATE.IDLE    ? this._renderIdle()    : A}
        ${_state === STATE.LOADING ? this._renderLoading() : A}
        ${_state === STATE.ERROR   ? this._renderError()   : A}
        ${_state === STATE.EMPTY   ? this._renderEmpty()   : A}
        ${_state === STATE.LOADED  ? this._renderTimeline(): A}
      </div>
    `;
    }
  }

  if (!customElements.get('cj-timeline-widget')) {
    customElements.define('cj-timeline-widget', JourneyWidget);
  }

})();
