<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app{
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  color: #333;
  min-width: 1100px;
}
.clear::after {
  content: "";
  clear: both;
  display: block;
  overflow: hidden;
}
input,textarea{
  border: none;
  outline: none;
  background: transparent;
}
input::-webkit-input-placeholder { /* WebKit browsers */
  color: #ccc;
}
input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #ccc;
}
input::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #ccc;
}
input:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #ccc;
}
textarea::-webkit-input-placeholder { /* WebKit browsers */
  color: #ccc;
}
textarea:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #ccc;
}
textarea::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #ccc;
}
textarea:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #ccc;
}

::-webkit-scrollbar {  
  width: 5px;  
}
/*定义滚动条轨道 内阴影+圆角*/  
::-webkit-scrollbar-track { 
    border-radius: 10px;  
    background-color: rgba(0,0,0,0.1); 
} 
/*定义滑块 内阴影+圆角*/  
::-webkit-scrollbar-thumb {  
  border-radius: 10px;  
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
  background-color: rgba(0,0,0,0.1);
}
::-moz-scrollbar {  
  width: 5px;  
}
::-moz-scrollbar-track { 
    border-radius: 10px;  
    background-color: rgba(0,0,0,0.1); 
}  
::-moz-scrollbar-thumb {  
  border-radius: 10px;  
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
  background-color: rgba(0,0,0,0.1);
}
:-ms-scrollbar {  
  width: 5px;  
}
:-ms-scrollbar-track { 
    border-radius: 10px;  
    background-color: rgba(0,0,0,0.1); 
}  
:-ms-scrollbar-thumb {  
  border-radius: 10px;  
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
  background-color: rgba(0,0,0,0.1);
}
:-moz-scrollbar {  
  width: 5px;  
}
:-moz-scrollbar-track { 
    border-radius: 10px;  
    background-color: rgba(0,0,0,0.1); 
}  
:-moz-scrollbar-thumb {  
  border-radius: 10px;  
  box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
  background-color: rgba(0,0,0,0.1);
}
body .el-button--primary{
  background-color: #3671FF;
  border-color: #3671FF;
}
</style>