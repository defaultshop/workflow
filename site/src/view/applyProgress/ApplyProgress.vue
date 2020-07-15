<template>
  <div>
    <child-header></child-header>

    <div class="content-box padd">
      <div class="title-bar">
        <span class="title">报名进度</span>
      </div>
      <!--审核状态-->
      <!--通过-->
      <div class="audit-state pass" v-if="data_officialProgress.registerState == '8'">
        <div class="icon iconfont iconzhengchang"></div>
        <div class="title">审核通过</div>
        <div class="txt"></div>
      </div>
      <!--不通过-->
      <div class="audit-state not-pass" v-else-if="data_officialProgress.registerState == '4'">
        <div class="icon iconfont iconshanchu"></div>
        <div class="title">审核不通过</div>
        <div class="txt">{{ data_officialProgress.auditFailRemark }}</div>
      </div>
      <!--待审核-->
      <div class="audit-state" v-else>
        <div class="icon iconfont iconyuyue"></div>
        <div class="title">审核中</div>
        <div class="txt">{{ data_officialProgress.auditFailRemark }}</div>
      </div>

      <!--审核流程-->
      <div class="audit-process">
        <div class="subtitle">审核流程</div>
        <div class="inner" v-show="!arr_isTabShow[0]">
          <div
            class="item"
            v-for="(items, j) in arr_author"
            :key="j"
            :class="items.registerState == '8' ? 'success' : items.registerState == '4' ? 'fail' : ''"
          >
            <div class="left">
              <p>{{ items.noteDateTime | dateformat('YYYY-MM-DD HH:mm') }}</p>
            </div>
            <div class="right">
              <div class="dot"></div>
              <div :class="items.registerStateColorClass == 'cyan' ? 'bg-cyan' : items.registerStateColorClass"></div>
              <div class="name" :class="items.registerStateColorClass">{{ items.registerStateFormat }}</div>
              <div class="txt">{{ items.nodeRemark }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="form-list no-padd" v-if="schoolRegisterType === 1 || schoolRegisterType === 8">
        <ReportDetailKind :data_info="data_officialProgress"></ReportDetailKind>
      </div>
      <div class="form-list no-padd" v-else>
        <ReportDetail :data_info="data_officialProgress"></ReportDetail>
      </div>
    </div>

    <child-footer></child-footer>
  </div>
</template>

<script src="./ApplyProgress.js"></script>
