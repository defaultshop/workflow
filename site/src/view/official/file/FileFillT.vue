<template>
  <div>
    <child-header></child-header>

    <div class="content-box">
      <div class="form-list">
        <TitleBar :type="3"></TitleBar>
        <div class="file-title mt">请上传户籍相关信息</div>
        <div class="file-list">
          <upload
            :imgId="nmsParentsHouseholdBookHome"
            @success="uploadSuccess($event, 1)"
            title="上传户口本南明山父母信息页"
          ></upload>
          <upload :imgId="childrenHouseholdBookOneself" @success="uploadSuccess($event, 2)" title="上传儿童户口信息页"></upload>
          <upload
            :imgId="childrenHouseholdBookParents"
            @success="uploadSuccess($event, 3)"
            title="上传儿童所在户口本父母信息页"
          ></upload>
        </div>
        <div class="file-title mt">请上传父母结婚证或离婚协议</div>
        <div class="file-list">
          <upload :imgId="marriageCertificateBook" @success="uploadSuccess($event, 4)" title="结婚证或离婚协议"></upload>
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

<script src="./FileFillT.js"></script>
