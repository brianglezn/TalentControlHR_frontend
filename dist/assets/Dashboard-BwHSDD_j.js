import{r as i,j as r,N as o,O as M}from"./index-BELUaJOk.js";import{C as H,u as $,P as B,a as U,D as q,h as _,O as x,I as L}from"./componentbase.esm-BwD6gpic.js";function d(e){"@babel/helpers - typeof";return d=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(a){return typeof a}:function(a){return a&&typeof Symbol=="function"&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a},d(e)}function J(e,a){if(d(e)!=="object"||e===null)return e;var t=e[Symbol.toPrimitive];if(t!==void 0){var s=t.call(e,a||"default");if(d(s)!=="object")return s;throw new TypeError("@@toPrimitive must return a primitive value.")}return(a==="string"?String:Number)(e)}function K(e){var a=J(e,"string");return d(a)==="symbol"?a:String(a)}function X(e,a,t){return a=K(a),a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function N(){return N=Object.assign?Object.assign.bind():function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var s in t)Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s])}return e},N.apply(this,arguments)}function Q(e){if(Array.isArray(e))return e}function V(e,a){var t=e==null?null:typeof Symbol<"u"&&e[Symbol.iterator]||e["@@iterator"];if(t!=null){var s,n,c,m,u=[],l=!0,f=!1;try{if(c=(t=t.call(e)).next,a!==0)for(;!(l=(s=c.call(t)).done)&&(u.push(s.value),u.length!==a);l=!0);}catch(y){f=!0,n=y}finally{try{if(!l&&t.return!=null&&(m=t.return(),Object(m)!==m))return}finally{if(f)throw n}}return u}}function S(e,a){(a==null||a>e.length)&&(a=e.length);for(var t=0,s=new Array(a);t<a;t++)s[t]=e[t];return s}function W(e,a){if(e){if(typeof e=="string")return S(e,a);var t=Object.prototype.toString.call(e).slice(8,-1);if(t==="Object"&&e.constructor&&(t=e.constructor.name),t==="Map"||t==="Set")return Array.from(e);if(t==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return S(e,a)}}function Y(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function E(e,a){return Q(e)||V(e,a)||W(e,a)||Y()}var G={root:function(a){var t=a.props,s=a.state;return _("p-avatar p-component",{"p-avatar-image":x.isNotEmpty(t.image)&&!s.imageFailed,"p-avatar-circle":t.shape==="circle","p-avatar-lg":t.size==="large","p-avatar-xl":t.size==="xlarge","p-avatar-clickable":!!t.onClick})},label:"p-avatar-text",icon:"p-avatar-icon"},Z=`
@layer primereact {
    .p-avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        font-size: 1rem;
    }
    
    .p-avatar.p-avatar-image {
        background-color: transparent;
    }
    
    .p-avatar.p-avatar-circle {
        border-radius: 50%;
    }
    
    .p-avatar.p-avatar-circle img {
        border-radius: 50%;
    }
    
    .p-avatar .p-avatar-icon {
        font-size: 1rem;
    }
    
    .p-avatar img {
        width: 100%;
        height: 100%;
    }
    
    .p-avatar-clickable {
        cursor: pointer;
    }
}
`,g=H.extend({defaultProps:{__TYPE:"Avatar",className:null,icon:null,image:null,imageAlt:"avatar",imageFallback:"default",label:null,onImageError:null,shape:"square",size:"normal",style:null,template:null,children:void 0},css:{classes:G,styles:Z}});function P(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);a&&(s=s.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),t.push.apply(t,s)}return t}function ee(e){for(var a=1;a<arguments.length;a++){var t=arguments[a]!=null?arguments[a]:{};a%2?P(Object(t),!0).forEach(function(s){X(e,s,t[s])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):P(Object(t)).forEach(function(s){Object.defineProperty(e,s,Object.getOwnPropertyDescriptor(t,s))})}return e}var w=i.forwardRef(function(e,a){var t=$(),s=i.useContext(B),n=g.getProps(e,s),c=i.useRef(null),m=i.useState(!1),u=E(m,2),l=u[0],f=u[1],y=i.useState(!1),O=E(y,2),A=O[0],I=O[1],h=g.setMetaData({props:n,state:{imageFailed:l,nested:A}}),v=h.ptm,j=h.cx,k=h.isUnstyled;U(g.css.styles,k,{name:"avatar"});var C=function(){if(x.isNotEmpty(n.image)&&!l){var p=t({src:n.image,onError:D},v("image"));return i.createElement("img",N({alt:n.imageAlt},p))}else if(n.label){var T=t({className:j("label")},v("label"));return i.createElement("span",T,n.label)}else if(n.icon){var z=t({className:j("icon")},v("icon"));return L.getJSXIcon(n.icon,ee({},z),{props:n})}return null},D=function(p){n.imageFallback==="default"?n.onImageError||(f(!0),p.target.src=null):p.target.src=n.imageFallback,n.onImageError&&n.onImageError(p)};i.useEffect(function(){var b=q.isAttributeEquals(c.current.parentElement,"data-pc-name","avatargroup");I(b)},[]),i.useImperativeHandle(a,function(){return{props:n,getElement:function(){return c.current}}});var R=t({ref:c,style:n.style,className:_(n.className,j("root",{imageFailed:l}))},g.getOtherProps(n),v("root")),F=n.template?x.getJSXElement(n.template,n):C();return i.createElement("div",R,F,n.children)});w.displayName="Avatar";const ae="/assets/logo_text_h-BfVQFb9-.png",te="/assets/avatar-CMyM0u-q.png";function re(){return r.jsxs("nav",{className:"dashboard-menu",children:[r.jsx("div",{className:"menu-logo",children:r.jsx("img",{src:ae,alt:"Logo"})}),r.jsxs("ul",{className:"menu-sections",children:[r.jsx("li",{children:r.jsxs(o,{to:"/dashboard",end:!0,className:({isActive:e})=>e?"active-link":"",children:[r.jsx("i",{className:"pi pi-objects-column"})," Home"]})}),r.jsx("li",{children:r.jsxs(o,{to:"/dashboard/inbox",className:({isActive:e})=>e?"active-link":"",children:[r.jsx("i",{className:"pi pi-bell"})," Inbox"]})}),r.jsx("li",{children:r.jsxs(o,{to:"/dashboard/calendar",className:({isActive:e})=>e?"active-link":"",children:[r.jsx("i",{className:"pi pi-calendar"})," Calendar"]})}),r.jsx("li",{children:r.jsxs(o,{to:"/dashboard/shifts",className:({isActive:e})=>e?"active-link":"",children:[r.jsx("i",{className:"pi pi-clock"})," Shifts"]})}),r.jsx("li",{children:r.jsxs(o,{to:"/dashboard/timeOff",className:({isActive:e})=>e?"active-link":"",children:[r.jsx("i",{className:"pi pi-car"})," TimeOff"]})}),r.jsx("li",{children:r.jsxs(o,{to:"/dashboard/company",className:({isActive:e})=>e?"active-link":"",children:[r.jsx("i",{className:"pi pi-building"})," Company"]})})]}),r.jsx(o,{to:"/dashboard/user-settings",className:({isActive:e})=>e?"active-link":"",children:r.jsxs("div",{className:"menu-user",children:[r.jsx(w,{image:te,shape:"circle"}),r.jsxs("div",{className:"user-info",children:[r.jsx("span",{className:"user-name",children:"Brian"}),r.jsx("span",{className:"user-username",children:"@brianglezn"})]}),r.jsx("i",{className:"pi pi-ellipsis-v",style:{fontSize:"1rem"}})]})})]})}function ie(){return r.jsxs("div",{className:"dashboard",children:[r.jsx(re,{}),r.jsx("div",{className:"dashboard-content",children:r.jsx(M,{})})]})}export{ie as default};
