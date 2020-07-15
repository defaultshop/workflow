<template>
  <div id="tenant">
    <comhead headindex="66" head="1" />
    <div class="tenantcont" @click="hide2">
      <div class="headnewtenant">
        <div class="newtenant">
          <div class="int">
            <input type="text" v-model="filter" placeholder="请输入搜索条件" >
          </div>
          <div>
            <el-select
              v-model="statusitem"
              value-key="id"
              @change="changestatus(statusitem)"
              placeholder="请选择"
            >
              <el-option
                v-for="item in optionstatus"
                :key="item.id"
                :label="item.name"
                :value="item"
              />
            </el-select>
          </div>
          <div class="search" @click.stop="searchbusiness">搜索</div>
        </div>
      </div>

      <div class="rolecont">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="sequenceNumber" label="业务识别码" />
          <el-table-column prop="flowInstanceStatusDesc" label="状态" />
          <el-table-column prop="creationTimeDesc" label="创建时间" />
          <el-table-column prop="id" label="详情">
            <template slot-scope="scope">
              <el-button
                @click.stop="Clickvpublish(scope.row)"
                type="text"
                size="small"
              >详情</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="page" v-if="totalCount>maxResultCount">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="totalCount"
            @current-change="changepage"
          />
        </div>
      </div>
    </div>

    <nowprocess ref="process1" @refreshlist="searchbusiness" />
  </div>
</template>

<script>
import comhead from '../common/comhead';
import nowprocess from '../home/business-management/nowprocess';
export default {
  components: {
    comhead,
    nowprocess,
  },
  data() {
    return {
      tableData: [],
      page: 1,
      totalCount: 1,
      centerDialogVisible: false,
      name: '',
      userinfo: '',
      linkstring: false,
      isDefault: false,
      defaultstring: '',
      id: '',
      maxResultCount: 10,
      skipCount: 0,
      info: { type: 1, id: '', method: 'post' },
      options: [],
      value: '',
      valueid: '',
      filter: '',
      status: '',
      optionstatus: [
        { name: '全部', status: '', id: -1 },
        { name: '等待审核', status: 4, id: 4 },
        { name: '审核通过', status: 3, id: 3 },        
        { name: '审核未通过', status: 8, id: 8 },             
      ],
      statusitem: '',
    };
  },
  methods: {
    changepage(page) {
      this.skipCount = (page - 1) * this.maxResultCount;
      this.getinfo();
    },
    hide2() {
      this.$refs.process1.closeprocess();
    },
    //搜索
    searchbusiness() {
      this.maxResultCount = 10;
      this.skipCount = 0;
      this.getinfo();
    },
    //搜索条件-选择
    changestatus(item) {
      this.status = item.status;
    },
    Clickvpublish(row) {
      this.$refs.process1.getdatainfo(row.id,1, true);
    },
    async getinfo() {
      var url =
          '/api/baitu-workflows/flowInstance?maxResultCount=' +
          this.maxResultCount +
          '&skipCount=' +
          this.skipCount +
          '&Filter=' +
          this.filter +
          '&Status=' +
          this.status,
        type = 'get';
      let res = await this.$getaxios(url, type);
      this.tableData = res.items;
      this.totalCount = res.totalCount;
    },
  },
  mounted() {
    this.getinfo();
  },
};
</script>

<style lang="scss" scoped src="./index.scss" />
<style>
#tenant .el-table__body-wrapper {
  min-height: 300px;
}
#tenant .userint .el-select {
  width: 100%;
}
</style>
