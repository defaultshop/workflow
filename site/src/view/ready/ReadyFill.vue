<template>
  <div>
    <child-header></child-header>
    <div class="content-box">
      <div class="form-list">
        <div class="title-bar">
          <span class="title">开发区公办{{ schoolType == '2' ? '小学' : '中学' }}预报名</span>
        </div>
        <Form label-position="top">
          <div class="subtitle">填报儿童信息</div>
          <Row>
            <Col span="11">
              <FormItem label="姓名">
                <Input v-model="childrenName" placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="身份证号">
                <Input v-model="childrenCardId" placeholder="请输入"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11" class="city-select">
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

          <div class="subtitle">填报监护人信息</div>
          <Row>
            <Col span="11">
              <FormItem label="监护人">
                <Input v-model="guardian" placeholder="请输入"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="联系方式">
                <Input v-model="guardian_phone" placeholder="请输入"></Input>
              </FormItem>
            </Col>
          </Row>

          <div class="subtitle">填报信息</div>
          <Row>
            <Col span="11" v-if="schoolType == 2">
              <FormItem label="幼儿园是否在开发区就读">
                <Select placeholder="请选择" v-model="school_area">
                  <Option value="true">在开发区</Option>
                  <Option value="false">不在开发区</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="11" v-if="schoolType == 4">
              <FormItem label="毕业小学">
                <Input v-model="graduated_primarySchool" placeholder="请输入毕业小学"></Input>
              </FormItem>
            </Col>

            <Col span="11" offset="2">
              <FormItem label="选择志愿学校">
                <Select placeholder="请选择" v-model="voluteer_school" class="mr9">
                  <Option :value="item.id" v-for="item in voluteer_schoolList" :key="item.id">{{ item.name }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>

          <Row class="form-btn">
            <Col span="24">
              <FormItem>
                <Button @click="$router.go(-1)">上一步</Button>
                <Button type="primary" @click="submit">下一步</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
    </div>

    <child-footer></child-footer>
  </div>
</template>

<script src='./ReadyFill.js'></script>
