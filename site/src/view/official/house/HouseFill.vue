<template>
  <div>
    <child-header></child-header>

    <div class="content-box">
      <div class="form-list">
        <TitleBar :type="3"></TitleBar>
        <Form label-position="top">
          <div class="subtitle">上传房产证</div>
          <Row>
            <Col span="11">
              <FormItem label="产权情况">
                <Select placeholder="请选择" v-model="proprety" class="mr9" @on-change="selectAreaFather">
                  <Option :value="1">已办理产权证</Option>
                  <Option :value="2">未办理产权证</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="11" offset="2" v-show="proprety == '1'">
              <FormItem label="不动产权号">
                <Input v-model="motion_proprety" placeholder="请输入不动产权号"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="房产所有人与儿童的关系">
                <Select placeholder="请选择" v-model="proprety_relation" class="mr9" @on-change="selectAreaFather">
                  <Option :value="1">祖父母</Option>
                  <Option :value="2">外祖父母</Option>
                  <Option :value="4">父母</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="房产所有人姓名">
                <Input v-model="proprety_name" placeholder="请输入房产所有人姓名"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="身份证号">
                <Input v-model="idcard" placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="11" class="city-select" offset="2">
              <FormItem label="户籍所在地">
                <Select placeholder="请选择省级" v-model="temp_fatherRegistered[0]" class="mr9" @on-change="selectAreaFather">
                  <Option v-for="(item, i) in arr_fatherRegistered[0]" :key="i" :value="JSON.stringify(item)">{{
                    item.name
                  }}</Option>
                </Select>
                <Select placeholder="请选择市级" v-model="temp_fatherRegistered[1]" class="mr9" @on-change="selectAreaFather">
                  <Option v-for="(item, i) in arr_fatherRegistered[1]" :key="i" :value="JSON.stringify(item)">{{
                    item.name
                  }}</Option>
                </Select>
                <Select placeholder="请选择区、县" v-model="temp_fatherRegistered[2]" class="mr9" @on-change="selectAreaFather">
                  <Option v-for="(item, i) in arr_fatherRegistered[2]" :key="i" :value="JSON.stringify(item)">{{
                    item.name
                  }}</Option>
                </Select>
                <Select placeholder="请选择街道" v-model="temp_fatherRegistered[3]" @on-change="selectAreaFather">
                  <Option v-for="(item, i) in arr_fatherRegistered[3]" :key="i" :value="JSON.stringify(item)">{{
                    item.name
                  }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="手机号码">
                <Input v-model="tel" placeholder="请输入手机号码"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="房产坐落地址">
                <Input v-model="proprety_address" placeholder="请输入房产坐落地址"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11">
              <FormItem label="请上传房产证或不动产证明">
                <div class="file-item">
                  <div class="txt">+ 上传图片</div>
                  <div class="img" v-if="houseFile.length">
                    <viewer>
                      <img :src="houseFile" alt />
                    </viewer>
                    <span class="delete" @click="deleteImg"></span>
                  </div>
                  <input type="file" ref="file" accept="image/jpeg, image/jpg, image/png" @change="selectImg" />
                </div>
              </FormItem>
            </Col>
          </Row>
          <Row class="form-btn">
            <Col span="24">
              <FormItem>
                <Button @click="$router.go(-1)">上一步</Button>
                <Button type="primary" @click="submitInfo">下一步</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>

    <child-footer></child-footer>
  </div>
</template>

<script src='./HouseFill.js'></script>
