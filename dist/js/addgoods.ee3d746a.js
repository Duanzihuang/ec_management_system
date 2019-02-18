(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["addgoods"],{2980:function(e,t,a){"use strict";var s=a("3838"),o=a.n(s);o.a},3838:function(e,t,a){},e5d1:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"title"},[e._v("添加商品信息")]),a("el-steps",{attrs:{space:200,active:e.active,"finish-status":"success"}},[a("el-step",{attrs:{title:"步骤 1"}}),a("el-step",{attrs:{title:"步骤 2"}}),a("el-step",{attrs:{title:"步骤 3"}}),a("el-step",{attrs:{title:"步骤 4"}}),a("el-step",{attrs:{title:"步骤 5"}})],1),a("el-form",{ref:"goodsForm",attrs:{model:e.goodsObj,rules:e.rules,"label-width":"150px"}},[a("el-tabs",{attrs:{value:"base","tab-position":"left"},on:{"tab-click":e.tabClick}},[a("el-tab-pane",{attrs:{name:"base",label:"基本信息"}},[a("el-form-item",{attrs:{label:"商品名称",prop:"goods_name"}},[a("el-input",{model:{value:e.goodsObj.goods_name,callback:function(t){e.$set(e.goodsObj,"goods_name",t)},expression:"goodsObj.goods_name"}})],1),a("el-form-item",{attrs:{label:"商品价格",prop:"goods_price"}},[a("el-input",{model:{value:e.goodsObj.goods_price,callback:function(t){e.$set(e.goodsObj,"goods_price",t)},expression:"goodsObj.goods_price"}})],1),a("el-form-item",{attrs:{label:"商品数量",prop:"goods_number"}},[a("el-input",{model:{value:e.goodsObj.goods_number,callback:function(t){e.$set(e.goodsObj,"goods_number",t)},expression:"goodsObj.goods_number"}})],1),a("el-form-item",{attrs:{label:"商品分类",prop:"goods_cat"}},[a("el-cascader",{attrs:{options:e.options,placeholder:"请选择分类","show-all-levels":!1,props:e.props},on:{change:e.selectCategory}})],1),a("el-form-item",{attrs:{label:"是否促销"}},[a("el-radio",{attrs:{label:1,border:""},model:{value:e.goodsObj.is_promote,callback:function(t){e.$set(e.goodsObj,"is_promote",t)},expression:"goodsObj.is_promote"}},[e._v("是")]),a("el-radio",{attrs:{label:0,border:""},model:{value:e.goodsObj.is_promote,callback:function(t){e.$set(e.goodsObj,"is_promote",t)},expression:"goodsObj.is_promote"}},[e._v("否")])],1)],1),a("el-tab-pane",{attrs:{label:"商品参数",name:"param"}},e._l(e.dparams,function(t){return a("el-form-item",{key:t.attr_id,attrs:{label:t.attr_name}},[a("el-checkbox-group",{model:{value:t.attr_vals,callback:function(a){e.$set(t,"attr_vals",a)},expression:"item.attr_vals"}},e._l(t.attr_vals,function(e,t){return a("el-checkbox",{key:t,attrs:{label:e,border:""}})}),1)],1)}),1),a("el-tab-pane",{attrs:{label:"商品属性",name:"property"}},e._l(e.sproperties,function(t){return a("el-form-item",{key:t.attr_id,attrs:{label:t.attr_name}},[a("el-input",{model:{value:t.attr_vals,callback:function(a){e.$set(t,"attr_vals",a)},expression:"item.attr_vals"}})],1)}),1),a("el-tab-pane",{attrs:{name:"picture",label:"商品图片"}},[a("el-upload",{staticClass:"upload-demo",attrs:{action:"http://127.0.0.1:8888/api/private/v1/upload",headers:e.headers,"on-success":e.handleSuccess,"on-preview":e.handlePreview,"on-remove":e.handleRemove,"list-type":"picture"}},[a("el-button",{attrs:{type:"success",plain:"",icon:"el-icon-upload"}},[e._v("上传")]),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[e._v("只能上传jpg/png文件，且不超过500kb")])],1)],1),a("el-tab-pane",{attrs:{name:"content",label:"商品内容"}},[a("quill-editor",{ref:"myQuillEditor",model:{value:e.goodsObj.goods_introduce,callback:function(t){e.$set(e.goodsObj,"goods_introduce",t)},expression:"goodsObj.goods_introduce"}})],1)],1)],1),a("div",{staticClass:"footer"},[a("el-button",{on:{click:function(t){e.$router.go(-1)}}},[e._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.addGoods}},[e._v("确定")])],1),a("el-dialog",{attrs:{visible:e.dialogVisibleForPreview,width:"50%"},on:{"update:visible":function(t){e.dialogVisibleForPreview=t}}},[a("img",{attrs:{src:e.previewImg,alt:""}})])],1)},o=[],r=(a("7f7f"),a("28a5"),a("ac6a"),a("96cf"),a("1da1")),i=(a("cadf"),a("551c"),a("097d"),a("953d")),n={components:{quillEditor:i["quillEditor"]},data:function(){return{active:0,rules:{goods_name:[{required:!0,message:"请输入商品名称",trigger:"blur"}],goods_price:[{required:!0,message:"请输入商品价格",trigger:"blur"}],goods_number:[{required:!0,message:"请输入商品数量",trigger:"blur"}],goods_cat:[{required:!0,message:"请输入商品分类",trigger:"blur"}]},options:[],props:{label:"cat_name",value:"cat_id",children:"children"},cat_id:null,dparams:[],sproperties:[],headers:{Authorization:localStorage.getItem("mytoken")},previewImg:"",dialogVisibleForPreview:!1,goodsObj:{goods_name:"",goods_cat:"",goods_price:"",goods_number:"",goods_introduce:"<h2>好商品</h2>",is_promote:0,pics:[],attrs:[]}}},created:function(){this.getCategoriesData()},methods:{getCategoriesData:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$axios.get("categories",{params:{type:3}});case 2:t=e.sent,this.options=t.data.data;case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),selectCategory:function(e){e.length<3?this.$message.error("请选择三级分类"):(this.goodsObj.goods_cat=e.join(","),this.cat_id=e[e.length-1])},getDynamicParamsOrStaticPropertiesData:function(){var e=Object(r["a"])(regeneratorRuntime.mark(function e(t){var a;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$axios.get("categories/".concat(this.cat_id,"/attributes"),{params:{sel:"param"===t?"many":"only"}});case 2:a=e.sent,e.t0=t,e.next="param"===e.t0?6:"property"===e.t0?9:11;break;case 6:return a.data.data.forEach(function(e){e.attr_vals.trim().length>0?e.attr_vals=e.attr_vals.split(","):e.attr_vals=[]}),this.dparams=a.data.data,e.abrupt("break",12);case 9:return this.sproperties=a.data.data,e.abrupt("break",12);case 11:return e.abrupt("break",12);case 12:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),tabClick:function(e){switch(e.name){case"base":this.active=0;break;case"param":this.active=1;break;case"property":this.active=2;break;case"picture":this.active=3;break;case"content":this.active=4;break;default:break}if("param"===e.name||"property"===e.name){if(!this.cat_id)return void this.$message.error("请选择分类");this.getDynamicParamsOrStaticPropertiesData(e.name)}},handleSuccess:function(e,t,a){e.data.pic=e.data.tmp_path,this.goodsObj.pics.push(e.data)},handlePreview:function(e){this.previewImg=e.response.data.url,this.dialogVisibleForPreview=!0},handleRemove:function(e,t){var a=-1;this.goodsObj.pics.some(function(t,s){if(e.url===t.url)return a=s,!0}),this.goodsObj.pics.splice(a,1)},addGoods:function(){var e=this;this.$refs.goodsForm.validate(function(){var t=Object(r["a"])(regeneratorRuntime.mark(function t(a){var s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(!a){t.next=8;break}return e.dparams.length,e.goodsObj.attrs=e.dparams.concat(e.sproperties),console.log(e.goodsObj),t.next=6,e.$axios.post("goods",e.goodsObj);case 6:s=t.sent,201===s.data.meta.status?(e.$message({type:"success",message:s.data.meta.msg}),e.$router.push({name:"goodslist"})):e.$message.error(s.data.meta.msg);case 8:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}())}}},l=n,c=(a("2980"),a("2877")),d=Object(c["a"])(l,s,o,!1,null,"2654e25c",null);d.options.__file="addgoods.vue";t["default"]=d.exports}}]);