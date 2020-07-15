<template>
  <div>
    <div class="header">
      <div class="leftside">
        <img src="@/assets/img/logo.png" alt class="logo" />
      </div>
      <div class="rightside">
        <span class="company">
          <i class="iconfont iconmorentouxiang"></i>
          浙江百图科技有限公司
          <span class="exit">【退出】</span>
        </span>
      </div>
    </div>

    <div class="banner">
      <div class="inner">
        <div class="title">丽水经济技术开发区入学报名</div>
        <div class="tab">
          <span class="current">入学报名</span>
          <span @click="$router.push('/index')">返回首页</span>
        </div>
      </div>
    </div>

    <div class="content-box">
      <div class="form-list">
        <div class="title-bar">
          <span class="title">开发区公办入学报名</span>
          <Alert show-icon closable>特别说明：网上申报仅需提供以下要求的表格及文件，其余证明材料暂无需上传。</Alert>
        </div>
        <div class="file-title mt">一、儿童及父母户口本</div>
        <div class="file-list">
          <div class="file-item">
            <div class="txt">
              + 上传图片
            </div>
            <input type="file" />
            <!-- <div class="img">
                    <img src="@/assets/img/card-dome.jpg" @click="modelShow" alt />
                    <span class="delete"></span>
            </div>-->
          </div>

          <div class="file-item">
            <div class="txt">
              + 上传图片
              <br />单个文件大小支持4M以内
            </div>
            <input type="file" />
            <!-- <div class="img">
                    <img src="@/assets/img/card-dome.jpg" @click="modelShow" alt />
                    <span class="delete"></span>
            </div>-->
          </div>

          <div class="file-item">
            <div class="txt">
              + 上传图片
              <br />单个文件大小支持4M以内
            </div>
            <input type="file" />
            <!-- <div class="img">
                    <img src="@/assets/img/card-dome.jpg" @click="modelShow" alt />
                    <span class="delete"></span>
            </div>-->
          </div>

          <div class="file-item">
            <!-- <div class="txt">
              + 上传图片
              <br />单个文件大小支持4M以内
            </div>
            <input type="file" />-->
            <div class="img">
              <img src="@/assets/img/card-dome.jpg" alt />
              <span class="delete"></span>
            </div>
          </div>
        </div>

        <div class="file-title mt">二、不动产权证明（房产证）</div>
        <div class="file-list">
          <div class="file-item">
            <div class="txt">
              + 上传图片
              <br />单个文件大小支持4M以内
            </div>
            <input type="file" />
          </div>

          <div class="file-item">
            <!-- <div class="txt">
              + 上传图片
              <br />单个文件大小支持4M以内
            </div>
            <input type="file" />-->
            <div class="img">
              <img src="@/assets/img/card-dome.jpg" alt />
              <span class="delete"></span>
            </div>
          </div>
        </div>

        <div class="file-title mt">
          三、表单展示式样《人员情况表》
          <span class="link">模板下载</span>
        </div>
        <div class="file-list">
          <div class="file-item">
            <div class="txt">
              + 上传图片
              <br />单个文件大小支持4M以内
            </div>
            <input type="file" />
            <!-- <div class="img">
              <img src="@/assets/img/card-dome.jpg" alt />
              <span class="delete"></span>
            </div>-->
          </div>
        </div>
        <div class="form-btn">
          <Button @click="$router.push('/parent')">上一步</Button>
          <Button type="primary" @click="$router.push('/school')">下一步</Button>
        </div>
      </div>
    </div>

    <div class="foot-txt">
      <p>本服务由浙江政务服务网、丽水教育局提供</p>
      <p>建议使用1366*768分辨率/IE10.0、chrome30、firefox30及以上浏览器访问效果最佳</p>
    </div>
  </div>
</template>
