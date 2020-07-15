<template>
  <div>
    <child-header></child-header>

    <div class="content-box padd">
      <div class="title-bar">
        <span class="title">请选择报名类型</span>
      </div>
      <div class="entry-type">
        <ul>
          <li>
            <div class="item" @click="skip('1')">
              <p class="iconfont iconhukoubanli"></p>
              <p class="name">一类:适龄儿童户籍在开发区的</p>
            </div>
          </li>
          <li>
            <div class="item" @click="skip('2')">
              <p class="iconfont iconhukoubanli"></p>
              <p class="name">二类1批:父母一方户口在开发区的</p>
            </div>
          </li>
          <li>
            <div class="item" @click="skip('4')">
              <p class="iconfont iconzhufang"></p>
              <p class="name">二类2批:父母在开发区购买全权所有商品住房的</p>
            </div>
          </li>
          <li>
            <div class="item" @click="skip('8')">
              <p class="iconfont iconzhufang1"></p>
              <p class="name">二类3批:父母在开发区经商、办企业的</p>
            </div>
          </li>
          <li>
            <div class="item" @click="skip('16')">
              <p class="iconfont icongongzuo"></p>
              <p class="name">二类4批:父母双方在开发区用工单位工作均在一年以上的</p>
            </div>
          </li>
          <li>
            <div class="item" @click="skip('32')">
              <p class="iconfont icongongzuo"></p>
              <p class="name">二类5批:父母单方在开发 区用工单位工作6个月以上的</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <child-footer></child-footer>
  </div>
</template>

<script src='./TypeChioce.js'></script>
