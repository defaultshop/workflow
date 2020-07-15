<template>
  <div class="index-wrap">
    <div class="header">
      <div class="leftside">
        <img src="@/assets/img/logo.png" alt class="logo" />
      </div>
      <div class="rightside">
        <span class="company">
          <i class="iconfont iconmorentouxiang"></i>
          {{ realName }}
          <span class="exit" @click="logout">【退出】</span>
        </span>
      </div>
    </div>

    <div class="banner">
      <div class="inner">
        <div class="title">幼儿园入园报名</div>
      </div>
    </div>

    <div class="content-box">
      <!--通知公告-->
      <div class="notice-box">
        <!-- <div class="title-bar">
          <span class="title">提醒</span>
        </div> -->
        <div class="inner">
          <div class="left">提醒</div>
          <div class="txt">
            <ul>
              <li>
                <i class="iconfont icontongzhi"></i>
                <span class="omit name">
                  <marquee scrollamount="4" v-if="is_scrolling">{{ notice_data.scrollingContent }}</marquee>
                </span>
                <!-- <span class="date">2018-09-08</span> -->
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!--我的报名服务-->
      <div class="service-box">
        <div class="type-subtitle">我的报名服务</div>
        <ul>
          <li @click="$router.push({ name: 'ApplyList' })">
            <p class="iconfont iconjinduchaxun1"></p>
            <p class="name">报名进度查询</p>
          </li>
          <li @click="$router.push({ name: 'ApplyConsult' })">
            <p class="iconfont iconxinxi1"></p>
            <p class="name">报名信息咨询</p>
          </li>
        </ul>
      </div>
      <!--学校-->
      <div class="school-enroll" v-if="json_applyData.childSchoolType && json_applyData.childSchoolType.length">
        <div class="type-subtitle">公办幼儿园</div>
        <ul>
          <li v-for="(item, i) in childArr" :key="i">
            <span
              class="tag"
              :class="$common.schoolRegisterTypeFormat(item.schoolRegisterType).indexOf('预报名') > -1 ? 'yellow' : 'blue'"
              >正式报名</span
            >
            <span class="name omit">{{ item.schoolRegisterTypeDescription }}</span>
            <span class="time" v-if="item.showState === 2">截止时间：{{ item.endTime | dateformat('YYYY-MM-DD HH:mm') }}</span>
            <span class="time" v-if="item.showState === 1">截止时间：长期有效</span>
            <span class="enroll-btn" @click="skip(item.schoolRegisterType, item.skipCheck, item.schoolType)">我要报名</span>
          </li>
        </ul>
      </div>

      <div class="school-enroll" v-if="json_applyData.primarySchoolType && json_applyData.primarySchoolType.length">
        <div class="type-subtitle">公办小学</div>
        <ul>
          <li v-for="(item, i) in json_applyData.primarySchoolType" :key="i">
            <span
              class="tag"
              :class="$common.schoolRegisterTypeFormat(item.schoolRegisterType).indexOf('预报名') > -1 ? 'yellow' : 'blue'"
              >{{ $common.schoolRegisterTypeFormat(item.schoolRegisterType) }}</span
            >
            <span class="name omit">{{ item.schoolRegisterTypeDescription }}</span>
            <span class="time" v-if="item.showState === 2">截止时间：{{ item.endTime | dateformat('YYYY-MM-DD HH:mm') }}</span>
            <span class="time" v-if="item.showState === 1">截止时间：长期有效</span>
            <span class="enroll-btn" @click="skip(item.schoolRegisterType, item.skipCheck, item.schoolType)">我要报名</span>
          </li>
        </ul>
      </div>

      <div class="school-enroll" v-if="json_applyData.middleSchoolType && json_applyData.middleSchoolType.length">
        <div class="type-subtitle">公办中学</div>
        <ul>
          <li v-for="(item, i) in json_applyData.middleSchoolType" :key="i">
            <span
              class="tag"
              :class="$common.schoolRegisterTypeFormat(item.schoolRegisterType).indexOf('预报名') > -1 ? 'yellow' : 'blue'"
              >{{ $common.schoolRegisterTypeFormat(item.schoolRegisterType) }}</span
            >
            <span class="name omit">{{ item.schoolRegisterTypeDescription }}</span>
            <span class="time" v-if="item.showState === 2">截止时间：{{ item.endTime | dateformat('YYYY-MM-DD HH:mm') }}</span>
            <span class="time" v-if="item.showState === 1">截止时间：长期有效</span>
            <span class="enroll-btn" @click="skip(item.schoolRegisterType, item.skipCheck, item.schoolType)">我要报名</span>
          </li>
        </ul>
      </div>
    </div>

    <child-footer></child-footer>
  </div>
</template>

<script src="./Home.js"></script>

<style lang="less" src="@/assets/css/index.less"></style>
