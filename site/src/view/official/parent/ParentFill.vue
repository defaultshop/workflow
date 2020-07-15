<template>
  <div>
    <child-header></child-header>

    <div class="content-box">
      <div class="form-list">
        <TitleBar :type="64"></TitleBar>
        <Form label-position="top">
          <div class="subtitle">填报父亲信息</div>
          <Row>
            <Col span="11">
              <FormItem label="父亲姓名">
                <Input v-model="father_name" placeholder="请输入父亲姓名"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="父亲身份证号">
                <Input v-model="father_idCard" placeholder="请输入父亲身份证号"></Input>
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
            <Col span="11" offset="2">
              <FormItem label="手机号码">
                <Input v-model="father_mobile" placeholder="请输入手机号码"></Input>
              </FormItem>
            </Col>
          </Row>

          <div class="subtitle">填报母亲信息</div>
          <Row>
            <Col span="11">
              <FormItem label="母亲姓名">
                <Input v-model="mother_name" placeholder="请输入母亲姓名"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="母亲身份证号">
                <Input v-model="mother_idCard" placeholder="请输入母亲身份证号"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11" class="city-select">
              <FormItem label="户籍所在地">
                <Select placeholder="请选择省级" v-model="temp_motherRegistered[0]" class="mr9" @on-change="selectAreaMother">
                  <Option v-for="(item, i) in arr_motherRegistered[0]" :key="i" :value="JSON.stringify(item)">{{
                    item.name
                  }}</Option>
                </Select>
                <Select placeholder="请选择市级" v-model="temp_motherRegistered[1]" class="mr9" @on-change="selectAreaMother">
                  <Option v-for="(item, i) in arr_motherRegistered[1]" :key="i" :value="JSON.stringify(item)">{{
                    item.name
                  }}</Option>
                </Select>
                <Select placeholder="请选择区、县" v-model="temp_motherRegistered[2]" class="mr9" @on-change="selectAreaMother">
                  <Option v-for="(item, i) in arr_motherRegistered[2]" :key="i" :value="JSON.stringify(item)">{{
                    item.name
                  }}</Option>
                </Select>
                <Select placeholder="请选择街道" v-model="temp_motherRegistered[3]" @on-change="selectAreaMother">
                  <Option v-for="(item, i) in arr_motherRegistered[3]" :key="i" :value="JSON.stringify(item)">{{
                    item.name
                  }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="手机号码">
                <Input v-model="mother_mobile" placeholder="请输入手机号码"></Input>
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

<script src='./ParentFill.js'></script>
