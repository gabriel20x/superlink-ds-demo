import{j as e}from"./jsx-runtime-Cf8x2fCZ.js";import{r as L}from"./index-BlmOqGMO.js";import{c as F}from"./cva-DHafLMww.js";import{f as de,W as ue,H as le}from"./icons-DQYjEaMc.js";import{C as me}from"./Card-C4nhJzTG.js";import{u as be,t as ge,z as p}from"./index-eTM_bRNx.js";import{B as he}from"./Button-Dk9Pwy95.js";import"./index-yBjzXJbu.js";const Ie="_wrapper_6b2dr_9",fe="_errorText_6b2dr_25",ye="_labelWrapper_6b2dr_33",ke="_label_6b2dr_33",Se="_inputFeedback_6b2dr_49",xe="_helperText_6b2dr_69",we="_inputWrapper_6b2dr_85",Te="_input_6b2dr_49",_e="_hasTrailingIcon_6b2dr_129",Pe="_superlinkPage_6b2dr_137",Fe="_superlinkPageIcon_6b2dr_145",Le="_trailingIcon_6b2dr_159",Ee="_inputError_6b2dr_213",r={wrapper:Ie,errorText:fe,labelWrapper:ye,label:ke,inputFeedback:Se,helperText:xe,inputWrapper:we,input:Te,hasTrailingIcon:_e,superlinkPage:Pe,superlinkPageIcon:Fe,trailingIcon:Le,inputError:Ee},i=L.forwardRef(({error:n=!1,size:s="L",helperText:o,trailingIcon:t,tooltip:_,inputFeedback:a,inputLabel:c,className:d,onTrailingIconClick:u,isSuperlinkPage:l,...m},P)=>{const pe=F(r.wrapper,r[`size${s}`],n&&r.wrapperError),ce=F(r.input,n&&r.inputError,t&&r.hasTrailingIcon,l&&r.superlinkPage,d);return e.jsxs("div",{className:pe,children:[c&&e.jsxs("div",{className:r.labelWrapper,children:[e.jsxs("label",{className:r.label,children:[c,_&&e.jsx(de,{width:16,height:16})]}),o&&e.jsx("div",{className:r.helperText,children:o})]}),e.jsxs("div",{className:r.inputWrapper,children:[l&&e.jsx("p",{className:r.superlinkPageIcon,children:"Superlink.io/"}),e.jsx("input",{ref:P,className:ce,...m}),t&&e.jsx("div",{className:r.trailingIcon,onClick:u,children:t})]}),a&&e.jsxs("div",{className:F(r.inputFeedback,n&&r.errorText),children:[e.jsx(ue,{width:16,height:16}),a]})]})});i.displayName="Input";i.__docgenInfo={description:"",methods:[],displayName:"Input",props:{error:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},size:{required:!1,tsType:{name:"union",raw:'"L" | "M" | "S"',elements:[{name:"literal",value:'"L"'},{name:"literal",value:'"M"'},{name:"literal",value:'"S"'}]},description:"",defaultValue:{value:'"L"',computed:!1}},helperText:{required:!1,tsType:{name:"string"},description:""},trailingIcon:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},tooltip:{required:!1,tsType:{name:"string"},description:""},inputFeedback:{required:!1,tsType:{name:"string"},description:""},inputLabel:{required:!1,tsType:{name:"string"},description:""},onTrailingIconClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},isSuperlinkPage:{required:!1,tsType:{name:"boolean"},description:""}},composes:["Omit"]};const Me={title:"Components/Input",component:i,parameters:{layout:"centered"},tags:["autodocs"],decorators:[n=>e.jsx(me,{className:"p-6",children:e.jsx(n,{})})]},ve=p.object({username:p.string().min(1,"Username is required"),email:p.string().email("Invalid email address"),password:p.string().min(8,"Password must be at least 8 characters").regex(/[A-Z]/,"Password must contain at least one uppercase letter").regex(/[a-z]/,"Password must contain at least one lowercase letter").regex(/[0-9]/,"Password must contain at least one number"),apiKey:p.string().min(1,"API Key is required")}),b={args:{inputLabel:"Input Label",placeholder:"Enter value",size:"L",helperText:"This is a helper text",tooltip:"This is a tooltip",inputFeedback:"This is a feedback"}},g={args:{size:"M",inputLabel:"Medium Input",placeholder:"Medium input"}},h={args:{size:"S",inputLabel:"Small Input",placeholder:"Small input"}},I={args:{isSuperlinkPage:!0,inputLabel:"Superlink Page Input",placeholder:"Superlink page input"}},f={render:function(){var d,u,l,m;const[s,o]=L.useState(!1),{register:t,handleSubmit:_,formState:{errors:a}}=be({resolver:ge(ve),mode:"onBlur",reValidateMode:"onChange"}),c=P=>{console.log(P)};return e.jsxs("form",{onSubmit:_(c),style:{display:"flex",flexDirection:"column",gap:"1rem"},children:[e.jsx(i,{...t("username"),inputLabel:"Username",placeholder:"Enter username",error:!!a.username,inputFeedback:(d=a.username)==null?void 0:d.message}),e.jsx(i,{...t("email"),inputLabel:"Email",type:"email",placeholder:"Enter email",error:!!a.email,inputFeedback:(u=a.email)==null?void 0:u.message}),e.jsx(i,{...t("password"),inputLabel:"Password",type:s?"text":"password",placeholder:"Enter password",error:!!a.password,trailingIcon:e.jsx(le,{fill:s?"#14171F":"#727479"}),inputFeedback:(l=a.password)==null?void 0:l.message,onTrailingIconClick:()=>o(!s)}),e.jsx(i,{...t("apiKey"),inputLabel:"API Key",placeholder:"Enter API key",error:!!a.apiKey,inputFeedback:(m=a.apiKey)==null?void 0:m.message}),e.jsx(he,{type:"submit",variant:"primary",label:"Submit"})]})}},y={args:{inputLabel:"Username",placeholder:"Enter username",error:!0,inputFeedback:"Username is already taken"}},k={args:{inputLabel:"Username",placeholder:"Enter username",inputFeedback:"Username is available"}},S={args:{inputLabel:"Password",type:"password",placeholder:"Enter password",inputFeedback:"Password should be stronger"}},x={parameters:{docs:{description:{story:"Input with trailing icon that toggles password visibility"}}},render:function(){const[s,o]=L.useState(!1);return e.jsx(i,{inputLabel:"Password",type:s?"text":"password",placeholder:"Enter password",trailingIcon:e.jsx(le,{fill:s?"#14171F":"#727479"}),onTrailingIconClick:()=>o(!s)})}},w={args:{inputLabel:"API Key",placeholder:"Enter API key",tooltip:"You can find your API key in the settings page",inputFeedback:"Required for API access"}},T={args:{inputLabel:"Disabled Input",value:"This field is disabled",disabled:!0,inputFeedback:"This field cannot be edited"}};var E,v,j;b.parameters={...b.parameters,docs:{...(E=b.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    inputLabel: 'Input Label',
    placeholder: 'Enter value',
    size: 'L',
    helperText: 'This is a helper text',
    tooltip: 'This is a tooltip',
    inputFeedback: "This is a feedback"
  }
}`,...(j=(v=b.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var V,W,C;g.parameters={...g.parameters,docs:{...(V=g.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    size: 'M',
    inputLabel: 'Medium Input',
    placeholder: 'Medium input'
  }
}`,...(C=(W=g.parameters)==null?void 0:W.docs)==null?void 0:C.source}}};var A,N,q;h.parameters={...h.parameters,docs:{...(A=h.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    size: 'S',
    inputLabel: 'Small Input',
    placeholder: 'Small input'
  }
}`,...(q=(N=h.parameters)==null?void 0:N.docs)==null?void 0:q.source}}};var K,M,z;I.parameters={...I.parameters,docs:{...(K=I.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    isSuperlinkPage: true,
    inputLabel: 'Superlink Page Input',
    placeholder: 'Superlink page input'
  }
}`,...(z=(M=I.parameters)==null?void 0:M.docs)==null?void 0:z.source}}};var U,D,R;f.parameters={...f.parameters,docs:{...(U=f.parameters)==null?void 0:U.docs,source:{originalSource:`{
  render: function FormValidationStory() {
    const [isVisible, setIsVisible] = useState(false);
    const {
      register,
      handleSubmit,
      formState: {
        errors
      }
    } = useForm<FormData>({
      resolver: zodResolver(formSchema),
      mode: 'onBlur',
      reValidateMode: 'onChange'
    });
    const onSubmit = (data: FormData) => {
      console.log(data);
    };
    return <form onSubmit={handleSubmit(onSubmit)} style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    }}>\r
        <Input {...register('username')} inputLabel="Username" placeholder="Enter username" error={!!errors.username} inputFeedback={errors.username?.message} />\r
\r
        <Input {...register('email')} inputLabel="Email" type="email" placeholder="Enter email" error={!!errors.email} inputFeedback={errors.email?.message} />\r
\r
        <Input {...register('password')} inputLabel="Password" type={isVisible ? "text" : "password"} placeholder="Enter password" error={!!errors.password} trailingIcon={<HideIcon fill={isVisible ? "#14171F" : "#727479"} />} inputFeedback={errors.password?.message} onTrailingIconClick={() => setIsVisible(!isVisible)} />\r
\r
        <Input {...register('apiKey')} inputLabel="API Key" placeholder="Enter API key" error={!!errors.apiKey} inputFeedback={errors.apiKey?.message} />\r
\r
        <Button type="submit" variant="primary" label="Submit" />\r
      </form>;
  }
}`,...(R=(D=f.parameters)==null?void 0:D.docs)==null?void 0:R.source}}};var B,H,O;y.parameters={...y.parameters,docs:{...(B=y.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    inputLabel: 'Username',
    placeholder: 'Enter username',
    error: true,
    inputFeedback: 'Username is already taken'
  }
}`,...(O=(H=y.parameters)==null?void 0:H.docs)==null?void 0:O.source}}};var Y,Z,$;k.parameters={...k.parameters,docs:{...(Y=k.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    inputLabel: 'Username',
    placeholder: 'Enter username',
    inputFeedback: 'Username is available'
  }
}`,...($=(Z=k.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};var G,J,Q;S.parameters={...S.parameters,docs:{...(G=S.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    inputLabel: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    inputFeedback: 'Password should be stronger'
  }
}`,...(Q=(J=S.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var X,ee,re;x.parameters={...x.parameters,docs:{...(X=x.parameters)==null?void 0:X.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'Input with trailing icon that toggles password visibility'
      }
    }
  },
  render: function WithTrailingIconComponent() {
    const [isVisible, setIsVisible] = useState(false);
    return <Input inputLabel="Password" type={isVisible ? "text" : "password"} placeholder="Enter password" trailingIcon={<HideIcon fill={isVisible ? "#14171F" : "#727479"} />} onTrailingIconClick={() => setIsVisible(!isVisible)} />;
  }
}`,...(re=(ee=x.parameters)==null?void 0:ee.docs)==null?void 0:re.source}}};var ae,se,te;w.parameters={...w.parameters,docs:{...(ae=w.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  args: {
    inputLabel: 'API Key',
    placeholder: 'Enter API key',
    tooltip: 'You can find your API key in the settings page',
    inputFeedback: 'Required for API access'
  }
}`,...(te=(se=w.parameters)==null?void 0:se.docs)==null?void 0:te.source}}};var ie,ne,oe;T.parameters={...T.parameters,docs:{...(ie=T.parameters)==null?void 0:ie.docs,source:{originalSource:`{
  args: {
    inputLabel: 'Disabled Input',
    value: 'This field is disabled',
    disabled: true,
    inputFeedback: 'This field cannot be edited'
  }
}`,...(oe=(ne=T.parameters)==null?void 0:ne.docs)==null?void 0:oe.source}}};const ze=["Default","Medium","Small","SuperlinkPage","FormValidation","WithError","WithSuccess","WithWarning","WithTrailingIcon","WithTooltip","Disabled"];export{b as Default,T as Disabled,f as FormValidation,g as Medium,h as Small,I as SuperlinkPage,y as WithError,k as WithSuccess,w as WithTooltip,x as WithTrailingIcon,S as WithWarning,ze as __namedExportsOrder,Me as default};
