<template>
  <div>
    <child-header></child-header>

    <div class="content-box">
      <div class="form-list">
        <TitleBar></TitleBar>
        <div class="subtitle">填报儿童信息</div>
        <Form label-position="top">
          <Row>
            <Col span="11">
              <FormItem label="儿童姓名">
                <Input placeholder="请输入儿童姓名" v-model="child_name"></Input>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="儿童身份证号">
                <Input placeholder="请输入儿童身份证号" v-model="child_idCard"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="11" class="city-select">
              <FormItem label="户籍所在地">
                <Select placeholder="请选择省级" v-model="temp_registered[0]" class="mr9" @on-change="selectArea">
                  <Option v-for="(item, i) in arr_registered[0]" :key="i" :value="JSON.stringify(item)">{{ item.name }}</Option>
                </Select>
                <Select placeholder="请选择市级" v-model="temp_registered[1]" class="mr9" @on-change="selectArea">
                  <Option v-for="(item, i) in arr_registered[1]" :key="i" :value="JSON.stringify(item)">{{ item.name }}</Option>
                </Select>
                <Select placeholder="请选择区、县" v-model="temp_registered[2]" class="mr9" @on-change="selectArea">
                  <Option v-for="(item, i) in arr_registered[2]" :key="i" :value="JSON.stringify(item)">{{ item.name }}</Option>
                </Select>
                <Select placeholder="请选择街道" v-model="temp_registered[3]" @on-change="selectArea">
                  <Option v-for="(item, i) in arr_registered[3]" :key="i" :value="JSON.stringify(item)">{{ item.name }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="11" offset="2">
              <FormItem label="家庭详细住址">
                <Input placeholder="请输入家庭详细住址" v-model="child_address"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row class="form-btn">
            <Col span="24">
              <FormItem>
                <Button @click="$router.go(-1)">取消</Button>
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

<script src="./ChildFill.js"></script>
