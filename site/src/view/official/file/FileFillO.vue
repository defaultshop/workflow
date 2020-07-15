<template>
  <div>
    <child-header></child-header>

    <div class="content-box">
      <div class="form-list">
        <TitleBar :type="3"></TitleBar>

        <div v-for="item in arr_fileData" :key="item.title">
          <div class="file-title mt">{{ item.title }}</div>
          <div class="file-list" v-for="itemChild in item.data" :key="itemChild.index">
            <div class="file-item">
              <div class="txt">
                + 上传图片
                <br />{{ itemChild.name }}
              </div>
              <div class="img" v-show="arr_selectImgs[itemChild.index]">
                <viewer><img :src="arr_selectImgs[itemChild.index]" alt/></viewer>
                <span class="delete" @click="deleteImg(itemChild.index)"></span>
              </div>
              <input
                type="file"
                ref="file"
                accept="image/jpeg,image/jpg,image/png"
                @change="selectImg($event, itemChild.index)"
              />
            </div>
          </div>
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

<script src="./FileFillO.js"></script>
