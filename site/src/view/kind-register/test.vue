<template>
  <div>
    <ul>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li></li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
      <li>1</li>
    </ul>
  </div>
</template>
<style lang="less" scoped>
ul {
  li {
    height: 30px;
    background-color: #daa520;
    margin-top: 20px;
  }
  li:empty::before {
    content: '暂无';
    color: gray;
    background-color: red;
    
  }
}
</style>