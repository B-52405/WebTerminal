import{c as n,C as o,t}from"./index-f07282cf.js";n.Command("color").Description("Set the console background and font color.").Option({name:"background",type:"String",default:"gray",short:"b",description:"set background color"}).Option({name:"font",type:"String",default:"white",short:"f",description:"set font color"}).Action((e,r)=>{e.toUpperCase()in o?t.background_color=o[e.toUpperCase()]:t.background_color=e,r.toUpperCase()in o?t.font_color=o[r.toUpperCase()]:t.font_color=r});
