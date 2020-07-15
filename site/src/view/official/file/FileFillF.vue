<template>
  <div>
    <child-header></child-header>

    <div class="content-box">
      <div class="form-list">
        <TitleBar :type="3"></TitleBar>
        <div class="file-title mt">请上传户籍相关信息</div>
        <div class="file-list">
          <upload :imgId="childrenHouseholdBookHome" @success="uploadSuccess($event, 1)" title="上传户口本首页"></upload>
          <upload :imgId="childrenHouseholdBookFather" @success="uploadSuccess($event, 2)" title="上传户口本父亲信息页"></upload>
          <upload :imgId="childrenHouseholdBookMother" @success="uploadSuccess($event, 3)" title="上传户口本母亲信息页"></upload>
          <upload :imgId="childrenHouseholdBookOneself" @success="uploadSuccess($event, 4)" title="上传户口本儿童信息页"></upload>
        </div>
        <div class="file-title mt">父母结婚证或离婚协议</div>
        <div class="file-list">
          <upload :imgId="marriageCertificateBook" @success="uploadSuccess($event, 5)" title="父母结婚证或离婚协议"></upload>
        </div>
        <div class="file-title mt">浙江省居住证</div>
        <div class="file-list">
          <upload :imgId="residencePermitBook" @success="uploadSuccess($event, 6)" title="浙江省居住证"></upload>
        </div>
        <div class="form-btn">
          <Button @click="$router.go(-1)">上一步</Button>
          <Button type="primary" @click="submitInfo">下一步</Button>
        </div>
      </div>
    </div>

    <child-footer></child-footer>
  </div>
</template>

<script src="./FileFillF.js"></script>
