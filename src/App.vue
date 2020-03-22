<template>
  <div id="app">
    <ShowStyle ref="comShowStyle"></ShowStyle>
    <ShowResume ref="comShowResume" :resumeData="resumeData"></ShowResume>
    <transition name="fade">
      <FormList
        ref="comFormList"
        :resumeData="resumeData"
        v-if="formListShow"
        v-on:listenFormList="listenFormList"
      ></FormList>
    </transition>
  </div>
</template>

<script>
import ShowStyle from "./components/showStyle/ShowStyle.vue";
import ShowResume from "./components/showResume/ShowResume.vue";
import FormList from "./components/form/FormList.vue";
import resumeData from "../static/resumedata.json";
import { str } from "./config/comstr.js";

export default {
  name: "app",
  data() {
    return {
      fromDataT: {},
      formListFlag: false,
      formListShow: false,
      resumeData: resumeData,
      code: str.code
    };
  },
  created() {
    let n = 0;
    let _this = this;
    this.$nextTick(function() {
      let len = _this.code.length;
      // 每10ms 写入一次
      var setIn = setInterval(function() {
        // 只显示作用
        _this.$refs.comShowStyle.writeStyleCode(_this.code.substring(0, n));
        // 渲染作用
        _this.$refs.comShowResume.responseStyleCode(_this.code.substring(0, n));
        n++;
        if (n >= len) {
          // 停止
          clearInterval(setIn);
        }
      }, 0);
    });
  },
  methods: {
    listenFormList: function(msg) {
      if (msg.type == "createResClick") {
        this.formListShow = msg.showFlag;
      }
      if (msg.type == "fromData") {
        this.resumeData = msg.fromData;
        this.formListFlag = true;
      }
    }
  },
  components: {
    // ShowMenu,
    ShowStyle,
    ShowResume,
    FormList
  }
};
</script>

<style>
/* 内外边距通常让各个浏览器样式的表现位置不同 */
body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
pre,
code,
form,
fieldset,
legend,
input,
textarea,
p,
blockquote,
th,
td,
hr,
button,
article,
aside,
details,
figcaption,
figure,
footer,
header,
menu,
nav,
section {
  margin: 0;
  padding: 0;
}

input,
select,
textarea {
  font-size: 100%;
}

input {
  outline: none;
  border-style: none;
}

/* 去掉各 Table  cell 的边距并让其边重合 */
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* 去除默认边框 */
fieldset,
img {
  border: 0;
}

/* 去掉 firefox 下此元素的边框 */
abbr,
acronym {
  border: 0;
  font-variant: normal;
}

/* 一致的 del 样式 */
del {
  text-decoration: line-through;
}

address,
caption,
cite,
code,
dfn,
em,
th,
var {
  font-style: normal;
  font-weight: 500;
}

/* 去掉列表前的标识, li 会继承 */
ol,
ul {
  list-style: none;
}

/* 对齐是排版最重要的因素, 别让什么都居中 */
caption,
th {
  text-align: left;
}

a {
  text-decoration: none;
}

/*清除浮动代码*/
.clearfloat:after {
  display: block;
  clear: both;
  content: "";
  visibility: hidden;
  height: 0;
}

.clearfloat {
  zoom: 1;
}

body,
html {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  min-width: 1024px;
  font-size: 62.5%;
}

#app {
  width: 100%;
  height: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
