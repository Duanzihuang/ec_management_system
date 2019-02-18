(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["editgoods"],{4972:function(t,e,a){},ab7e:function(t,e,a){"use strict";var s=a("4972"),r=a.n(s);r.a},f3ed:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"title"},[t._v("修改商品信息")]),a("el-steps",{attrs:{space:200,active:t.active,"finish-status":"success"}},[a("el-step",{attrs:{title:"步骤 1"}}),a("el-step",{attrs:{title:"步骤 2"}}),a("el-step",{attrs:{title:"步骤 3"}}),a("el-step",{attrs:{title:"步骤 4"}}),a("el-step",{attrs:{title:"步骤 5"}})],1),a("el-form",{ref:"goodsForm",attrs:{model:t.goodsObj,rules:t.rules,"label-width":"150px"}},[a("el-tabs",{attrs:{value:"base","tab-position":"left"},on:{"tab-click":t.tabClick}},[a("el-tab-pane",{attrs:{name:"base",label:"基本信息"}},[a("el-form-item",{attrs:{label:"商品名称",prop:"goods_name"}},[a("el-input",{model:{value:t.goodsObj.goods_name,callback:function(e){t.$set(t.goodsObj,"goods_name",e)},expression:"goodsObj.goods_name"}})],1),a("el-form-item",{attrs:{label:"商品价格",prop:"goods_price"}},[a("el-input",{model:{value:t.goodsObj.goods_price,callback:function(e){t.$set(t.goodsObj,"goods_price",e)},expression:"goodsObj.goods_price"}})],1),a("el-form-item",{attrs:{label:"商品数量",prop:"goods_number"}},[a("el-input",{model:{value:t.goodsObj.goods_number,callback:function(e){t.$set(t.goodsObj,"goods_number",e)},expression:"goodsObj.goods_number"}})],1),a("el-form-item",{attrs:{label:"商品分类",prop:"goods_cat"}},[a("el-cascader",{attrs:{options:t.options,placeholder:"请选择分类","show-all-levels":!1,props:t.props},on:{change:t.selectCategory},model:{value:t.goods_cat_array,callback:function(e){t.goods_cat_array=e},expression:"goods_cat_array"}})],1),a("el-form-item",{attrs:{label:"是否促销"}},[a("el-radio",{attrs:{label:1,border:""},model:{value:t.goodsObj.is_promote,callback:function(e){t.$set(t.goodsObj,"is_promote",e)},expression:"goodsObj.is_promote"}},[t._v("是")]),a("el-radio",{attrs:{label:0,border:""},model:{value:t.goodsObj.is_promote,callback:function(e){t.$set(t.goodsObj,"is_promote",e)},expression:"goodsObj.is_promote"}},[t._v("否")])],1)],1),a("el-tab-pane",{attrs:{label:"商品参数",name:"param"}},t._l(t.dparams,function(e){return a("el-form-item",{key:e.attr_id,attrs:{label:e.attr_name}},[a("el-checkbox-group",{model:{value:e.attr_vals,callback:function(a){t.$set(e,"attr_vals",a)},expression:"item.attr_vals"}},t._l(e.attr_vals,function(t,e){return a("el-checkbox",{key:e,attrs:{label:t,border:""}})}),1)],1)}),1),a("el-tab-pane",{attrs:{label:"商品属性",name:"property"}},t._l(t.sproperties,function(e){return a("el-form-item",{key:e.attr_id,attrs:{label:e.attr_name}},[a("el-input",{model:{value:e.attr_vals,callback:function(a){t.$set(e,"attr_vals",a)},expression:"item.attr_vals"}})],1)}),1),a("el-tab-pane",{attrs:{name:"picture",label:"商品图片"}},[a("el-upload",{staticClass:"upload-demo",attrs:{action:"http://127.0.0.1:8888/api/private/v1/upload",headers:t.headers,"on-success":t.handleSuccess,"on-preview":t.handlePreview,"on-remove":t.handleRemove,"list-type":"picture","file-list":t.fileList}},[a("el-button",{attrs:{type:"success",plain:"",icon:"el-icon-upload"}},[t._v("上传")]),a("div",{staticClass:"el-upload__tip",attrs:{slot:"tip"},slot:"tip"},[t._v("只能上传jpg/png文件，且不超过500kb")])],1)],1),a("el-tab-pane",{attrs:{name:"content",label:"商品内容"}},[a("quill-editor",{ref:"myQuillEditor",model:{value:t.goodsObj.goods_introduce,callback:function(e){t.$set(t.goodsObj,"goods_introduce",e)},expression:"goodsObj.goods_introduce"}})],1)],1)],1),a("div",{staticClass:"footer"},[a("el-button",{on:{click:function(e){t.$router.go(-1)}}},[t._v("取消")]),a("el-button",{attrs:{type:"primary"},on:{click:t.editGoods}},[t._v("修改")])],1),a("el-dialog",{attrs:{visible:t.dialogVisibleForPreview,width:"50%"},on:{"update:visible":function(e){t.dialogVisibleForPreview=e}}},[a("img",{attrs:{src:t.previewImg,alt:""}})])],1)},r=[],o=(a("7f7f"),a("28a5"),a("ac6a"),a("96cf"),a("1da1")),i=a("953d"),n={components:{quillEditor:i["quillEditor"]},data:function(){return{active:0,rules:{goods_name:[{required:!0,message:"请输入商品名称",trigger:"blur"}],goods_price:[{required:!0,message:"请输入商品价格",trigger:"blur"}],goods_number:[{required:!0,message:"请输入商品数量",trigger:"blur"}],goods_cat:[{required:!0,message:"请输入商品分类",trigger:"blur"}]},options:[],props:{label:"cat_name",value:"cat_id",children:"children"},cat_id:null,fileList:[],goods_cat_array:[],dparams:[],sproperties:[],headers:{Authorization:localStorage.getItem("mytoken")},previewImg:"",dialogVisibleForPreview:!1,goodsObj:{}}},created:function(){this.getCategoriesData(),this.getGoodsData()},methods:{getGoodsData:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$axios.get("goods/".concat(this.$route.query.goods_id));case 2:e=t.sent,this.cat_id=e.data.data.cat_id,this.goods_cat_array=[e.data.data.cat_one_id,e.data.data.cat_two_id,e.data.data.cat_three_id],e.data.data.pics&&(e.data.data.pics.forEach(function(t,e){t.url=t.pics_mid_url,t.name="第".concat(e+1,"张")}),this.fileList=e.data.data.pics),this.goodsObj=e.data.data;case 7:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),getCategoriesData:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$axios.get("categories",{params:{type:3}});case 2:e=t.sent,this.options=e.data.data;case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),selectCategory:function(t){t.length<3?this.$message.error("请选择三级分类"):(this.goodsObj.goods_cat=t.join(","),this.cat_id=t[t.length-1])},getDynamicParamsOrStaticPropertiesData:function(){var t=Object(o["a"])(regeneratorRuntime.mark(function t(e){var a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$axios.get("categories/".concat(this.cat_id,"/attributes"),{params:{sel:"param"===e?"many":"only"}});case 2:a=t.sent,t.t0=e,t.next="param"===t.t0?6:"property"===t.t0?9:11;break;case 6:return a.data.data.forEach(function(t){t.attr_vals.trim().length>0?t.attr_vals=t.attr_vals.split(","):t.attr_vals=[]}),this.dparams=a.data.data,t.abrupt("break",12);case 9:return this.sproperties=a.data.data,t.abrupt("break",12);case 11:return t.abrupt("break",12);case 12:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),tabClick:function(t){switch(t.name){case"base":this.active=0;break;case"param":this.active=1;break;case"property":this.active=2;break;case"picture":this.active=3;break;case"content":this.active=4;break;default:break}if("param"===t.name||"property"===t.name){if(!this.goodsObj.cat_id)return void this.$message.error("请选择分类");this.cat_id===this.goodsObj.cat_id?(this.dparams=this.goodsObj.attrs.filter(function(t){return"many"===t.attr_sel}),this.dparams.forEach(function(t){t.attr_vals=t.attr_value.split(",")}),this.sproperties=this.goodsObj.attrs.filter(function(t){return"only"===t.attr_sel}),this.sproperties.forEach(function(t){t.attr_vals=t.attr_value})):this.getDynamicParamsOrStaticPropertiesData(t.name)}},handleSuccess:function(t,e,a){t.data.pic=t.data.tmp_path,this.goodsObj.pics.push(t.data),this.fileList=this.goodsObj.pics,this.fileList.forEach(function(t,e){t.name="第".concat(e+1,"张")})},handlePreview:function(t){this.previewImg=t.url,this.dialogVisibleForPreview=!0},handleRemove:function(t,e){var a=-1;this.goodsObj.pics.some(function(e,s){if(t.url===e.url)return a=s,!0}),this.goodsObj.pics.splice(a,1)},editGoods:function(){var t=this;this.$refs.goodsForm.validate(function(){var e=Object(o["a"])(regeneratorRuntime.mark(function e(a){var s;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(!a){e.next=7;break}return t.dparams.length,t.goodsObj.attrs=t.dparams.concat(t.sproperties),e.next=5,t.$axios.put("goods/".concat(t.goodsObj.goods_id),t.goodsObj);case 5:s=e.sent,200===s.data.meta.status?(t.$message({type:"success",message:s.data.meta.msg}),t.$router.push({name:"goodslist"})):t.$message.error(s.data.meta.msg);case 7:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}())}}},l=n,c=(a("ab7e"),a("2877")),d=Object(c["a"])(l,s,r,!1,null,"0d991709",null);d.options.__file="editgoods.vue";e["default"]=d.exports}}]);