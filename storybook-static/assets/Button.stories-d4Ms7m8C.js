import{j as m}from"./jsx-runtime-Cf8x2fCZ.js";import{f as J}from"./index-D_Ss_HUe.js";import{R as H}from"./index-BlmOqGMO.js";import{B as p}from"./Button-Dk9Pwy95.js";import{A as K,F as M}from"./icons-DQYjEaMc.js";import{w as N}from"./withCard-B5aMLqNo.js";import"./index-yBjzXJbu.js";import"./cva-DHafLMww.js";import"./Card-C4nhJzTG.js";const er={title:"Components/Button",component:p,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{control:"select"},size:{control:"select"}},args:{onClick:J()},decorators:[N]},r={args:{variant:"primary",label:"Button"}},a={args:{label:"Button",variant:"secondary"}},e={args:{label:"Button",variant:"tertiary"}},t={args:{label:"Button",variant:"text"}},o={args:{label:"Button",variant:"destructive"}},n={args:{label:"Button",variant:"primary",disabled:!0}},s={args:{label:"Button",variant:"primary",loading:!0}},i={args:{variant:"text",label:"Back",icon:H.createElement(K,{width:16,height:16}),iconPosition:"left",width:"fit"}},c={args:{label:"Liked",icon:H.createElement(M),iconPosition:"right"}},l={render:()=>m.jsxs("div",{style:{display:"flex",gap:"8px"},children:[m.jsx(p,{variant:"text",label:"Cancel"}),m.jsx(p,{variant:"primary",label:"Submit"})]})};var u,d,g;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    label: 'Button'
  }
}`,...(g=(d=r.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};var v,B,b;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    label: 'Button',
    variant: 'secondary'
  }
}`,...(b=(B=a.parameters)==null?void 0:B.docs)==null?void 0:b.source}}};var y,x,h;e.parameters={...e.parameters,docs:{...(y=e.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    label: "Button",
    variant: "tertiary"
  }
}`,...(h=(x=e.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var f,S,w;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    label: "Button",
    variant: "text"
  }
}`,...(w=(S=t.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var I,k,R;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    label: "Button",
    variant: "destructive"
  }
}`,...(R=(k=o.parameters)==null?void 0:k.docs)==null?void 0:R.source}}};var E,L,P;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    label: "Button",
    variant: "primary",
    disabled: true
  }
}`,...(P=(L=n.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};var j,C,T;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    label: "Button",
    variant: "primary",
    loading: true
  }
}`,...(T=(C=s.parameters)==null?void 0:C.docs)==null?void 0:T.source}}};var D,W,A;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    variant: 'text',
    label: 'Back',
    icon: React.createElement(ArrowBackIcon, {
      width: 16,
      height: 16
    }),
    iconPosition: 'left',
    width: 'fit'
  }
}`,...(A=(W=i.parameters)==null?void 0:W.docs)==null?void 0:A.source}}};var F,G,_;c.parameters={...c.parameters,docs:{...(F=c.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    label: 'Liked',
    icon: React.createElement(FavIcon),
    iconPosition: 'right'
  }
}`,...(_=(G=c.parameters)==null?void 0:G.docs)==null?void 0:_.source}}};var z,O,q;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: '8px'
  }}>\r
      <Button variant="text" label="Cancel" />\r
      <Button variant="primary" label="Submit" />\r
    </div>
}`,...(q=(O=l.parameters)==null?void 0:O.docs)==null?void 0:q.source}}};const tr=["Primary","Secondary","Tertiary","Text","Destructive","Disabled","Loading","ButtonWithLeftIcon","ButtonWithRightIcon","ButtonGroup"];export{l as ButtonGroup,i as ButtonWithLeftIcon,c as ButtonWithRightIcon,o as Destructive,n as Disabled,s as Loading,r as Primary,a as Secondary,e as Tertiary,t as Text,tr as __namedExportsOrder,er as default};
