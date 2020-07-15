<template>
  <div id="tablelist" :style="{overflowX:this.tableid.proid ? 'auto' : 'hidden'}">
    <vuetable ref="vuetable"
      :css="css.table"
      isHeader="true"
      :api-url="apiurl"
      :fields="nowfields"
      :row-class="onRowClass"
      no-data-template="<div>无数据</div>"
      data-path="data"
      pagination-path=""
      :append-params="appendparams"
      :query-params="queryparams"
      :columnClass="onColumnClass"
      @vuetable:pagination-data="onPaginationData"
      @vuetable:cell-clicked="rowdataclick"
    >
      <colgroup isHeader="true" :column-class="onColumnClass" />
    </vuetable>
    <vuetable-pagination ref="pagination"
      :css="css.pagination"
      @vuetable-pagination:change-page="onChangePage"
    />
  </div>
</template>

<script>
import {Vuetable,VuetablePagination} from 'vuetable-2';
export default {
  components: {
    Vuetable,
    VuetablePagination,
  },
  props:{
    fields: Array,
    tableid: Object,
    Filter: String,
  },
  data(){
    return {
      css: {
        table: {
          // tableClass: 'table table-striped table-bordered table-hovered',
          loadingClass: 'loading',
          // ascendingIcon: 'glyphicon glyphicon-chevron-up',
          // descendingIcon: 'glyphicon glyphicon-chevron-down',
          handleIcon: 'glyphicon glyphicon-menu-hamburger',
          tableHeaderClass: 'mb-0',
          tableBodyClass: 'mb-0',
          tableClass: 'table table-bordered table-hover',
          ascendingIcon: 'fa fa-chevron-up',
          descendingIcon: 'fa fa-chevron-down',
          ascendingClass: 'sorted-asc',
          descendingClass: 'sorted-desc',
          sortableIcon: '',
          detailRowClass: 'vuetable-detail-row',
        },
        pagination: {
          infoClass: 'pull-left',
          wrapperClass: 'vuetable-pagination pull-right',
          activeClass: 'btn-primary',
          disabledClass: 'disabled',
          pageClass: 'btn btn-border',  
          linkClass: 'btn btn-border',
          icons: {
            first: '',
            prev: '',
            next: '',
            last: '',
          },
        },
      },
      apiurl: this.tableid.proid ? '/api/baitu-workflows/businessFlow/'+this.tableid.proid+'/data' : '',
      queryparams: {
        sort: 'sort',
        page: 'page',
        perPage: 'perpage',
      },
      nowfields: [],
      appendparams: {},
    };
  },
  methods:{
    //点击行时触发
    rowdataclick(a,b,c){
      console.log(a,b,c);
      this.$emit('openpress');
    },
    //改变每列的样式
    genderLabel(value,name){
      console.log(value,name,'value');
      let maxwidth = '280px';
      let minwidth = '100px';
      if (name == 'CreationTime' || name == 'endDate' || name == 'beginDate'){
        minwidth = '120px';
      } else if (name == 'Version') {
        minwidth = '60px';
      }
      return '<div class="ui pink label" style="max-width:'+maxwidth+';min-width:'+minwidth+'"><i class="large woman icon"></i>'+value+'</div>';
    },
    //改变每行的样式
    onColumnClass(field,fieldIndex){
      console.log(field,fieldIndex,'onColumnClass');
      return (field.isOverdue)?'color-red':'color-white';
    },
    onRowClass(dataItem,index){
      console.log(dataItem,index,'onRowClass');
      return (dataItem.isOverdue)?'color-red':'color-white';
    },
    onChangePage(page){
      this.$refs.vuetable.changePage(page);
    },
    onPaginationData(paginationData){
      
      if (Array.isArray(paginationData.data)){
        paginationData.data.forEach(item=>{
          console.log(item.CreationTime);
          item.CreationTime = this.gettime(item.CreationTime);
        });
      }
      this.$refs.pagination.setPaginationData(paginationData);
      console.log(paginationData,'paginationData');
      
      this.$forceUpdate();
    },
    gettime(date){
      let d = new Date(date);
      let yy = d.getFullYear();
      let mm = (d.getMonth() + 1) <10 ? '0'+(d.getMonth() + 1) : (d.getMonth() + 1);
      let dd = d.getDate() <10 ? '0'+d.getDate() : d.getDate();
      let hh = d.getHours() <10 ? '0'+d.getHours() : d.getHours();
      let ss = d.getMinutes() <10 ? '0'+d.getMinutes() : d.getMinutes();
      let ff = d.getSeconds() <10 ? '0'+d.getSeconds() : d.getSeconds();
      return yy+'-'+mm+'-'+dd+' '+hh+':'+ss+':'+ff;
    },
  },
  created(){
    this.$nextTick(()=>{
      if (this.tableid.proid){
        console.log(this.$refs.vuetable,this.tableid,'vuetable1');
        this.apiurl = '/api/baitu-workflows/businessFlow/'+this.tableid.proid+'/data';
      }
    });
    console.log(this.fields,'this.fields');
    this.nowfields = this.fields;
    this.appendparams = {Filter:this.Filter};
  },
};
</script>

<style lang="scss" scoped>
#tablelist{
  overflow-x: auto;
  
}
</style>
<style>
#tablelist .table thead th{
  white-space: nowrap;
  text-align: center;
}
</style>