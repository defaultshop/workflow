<template>
  <div>
    <child-header></child-header>

    <div class="content-box padd">
      <div class="title-bar">
        <span class="title">已申请的报名记录</span>
      </div>
      <div class="apply-list">
        <ul>
          <li v-if="arr_applyProgress.length === 0">暂无报名记录,请填报</li>
          <li
            v-for="(item, i) in arr_applyProgress"
            :key="i"
            @click="skipDetail(item.schoolRegisterType, item.businessType, item.isFront, item.id)"
          >
            <span class="tag" :class="item.isFront ? 'blue' : 'yellow'">{{ item.isFront ? '预报名' : '正式报名' }}</span>
            <span class="name omit"
              >{{ item.schoolRegisterType == 1 || item.schoolRegisterType == 8 ? '幼儿' : '儿童' }}姓名：
              {{ item.childrenName }}</span
            >
            <span class="state" :class="item.registerStateColor">{{ item.registerStateText }}</span>
            <span class="time">申请时间：{{ item.submitTimeText }}</span>
          </li>
        </ul>
      </div>
    </div>

    <child-footer></child-footer>
  </div>
</template>

<script src='./ApplyList.js'></script>
