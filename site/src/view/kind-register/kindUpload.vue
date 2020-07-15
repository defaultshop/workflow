<template>
  <div>
    <div class="file-item">
      <div class="txt">+ 上传图片</div>
      <div class="img" v-for="(item, index) in imgList" :key="item">
        <viewer>
          <img :src="item" alt ref="img" />
        </viewer>
        <span class="delete" @click="deleteImg(index)"></span>
      </div>
      <input type="file" ref="file" accept="image/jpeg,image/jpg,image/png" @change="selectImg" />
    </div>
  </div>
</template>
<script>
import baseUrl from '@/api/env';
import * as res_common from '@/api/common';
export default {
  props: {
    multiple: {
      default: false
    },
    imgId: {
      default: ''
    }
  },

  data() {
    return {
      imgList: [],
      fileUrl: baseUrl + 'EOL/File/Map?id=',
      imageId: this.imgId
    };
  },
  created() {
    if (this.imgId) {
      this.imgList.push(this.fileUrl + this.imgId);
    }
  },
  methods: {
    clear() {
      this.imgList = [];
      this.$emit('success', []);
    },
    deleteImg(index) {
      this.imgList.splice(index, 1);
      this.$emit('success', []);
      this.$refs.file.value = null;
    },
    selectImg(e) {
      let file = e.target.files[0];
      if (!file.size) return;
      if (file.size > 20 * 1024 * 1024) {
        this.$Message.error('图片不能大于20M');
        this.$refs.file.value = null;
        return;
      }
      let reader = new FileReader();
      let that = this;
      reader.readAsDataURL(file);
      reader.onload = async function(e) {
        that.imgList.push(this.result);
        let res = await res_common.post_uploadBase64(that.imgList);
        if (res.success) {
          that.$emit('success', [res.result[0].id]);
        }
      };
    }
  },
  watch: {
    imgId(val) {
      if (val) this.imgList.push(this.fileUrl + val);
    }
  }
};
</script>