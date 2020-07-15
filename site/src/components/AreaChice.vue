<template>
  <div>
    <Select placeholder="请选择省级" v-model="areaCodes[0]" class="mr9" @on-change="selectArea($event, 1)">
      <Option v-for="(item, i) in area.fi" :key="i" :value="item.code">{{ item.name }}</Option>
    </Select>
    <Select placeholder="请选择市级" v-model="areaCodes[1]" class="mr9" @on-change="selectArea($event, 2)">
      <Option v-for="(item, i) in area.s" :key="i" :value="item.code">{{ item.name }}</Option>
    </Select>
    <Select placeholder="请选择区、县" v-model="areaCodes[2]" class="mr9" @on-change="selectArea($event, 3)">
      <Option v-for="(item, i) in area.t" :key="i" :value="item.code">{{ item.name }}</Option>
    </Select>
    <Select placeholder="请选择街道" v-model="areaCodes[3]" @on-change="selectArea($event, 4)">
      <Option v-for="(item, i) in area.fo" :key="i" :value="item.code">{{ item.name }}</Option>
    </Select>
  </div>
</template>
<script>
export default {
  props: {
    areaCodes: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  }
};
</script>