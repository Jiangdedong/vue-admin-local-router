<template>
  <div>
    <div ref="searchBox" class="jdd-search-box">
      <el-form :inline="true" @submit.native.prevent>
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="parameters.name" size="small" style="width:170px;" :clearable="true" @keyup.enter.native="parameters.pageNum=1;getTableData()" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search" @click="parameters.pageNum=1;getTableData()">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="jdd-content">
      <el-row class="jdd-table-tile">
        <div class="jdd-table-name">用户列表</div>
      </el-row>
      <el-table v-loading="tableData.loading" :data="tableData.data" max-height="700" border stripe highlight-current-row>
        <el-table-column v-for="(item,index) in tableData.columns" :key="index" :prop="item.prop" :label="item.label" :show-overflow-tooltip="tableData.showOverflowTooltip" :formatter="item.formatter" :sortable="item.sortable" />
      </el-table>
      <el-row style="text-align:right;margin: 10px 0">
        <el-pagination :total="tableData.total" layout="total, sizes, prev, pager, next" :page-sizes="[10, 20, 30, 40,50]" :page-size="20" :current-page="tableData.pageNum" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </el-row>
    </div>
  </div>
</template>
<script>
import { userList } from '@/api/user'

export default {
  name: 'ListReadonly',
  components: {},
  directives: {},
  data() {
    return {
      dataTableHeight: 0,
      tableData: {
        data: [
          { name: 'aaa', loginAccount: 'admin', sex: 1, tel: '15356678092' },
          { name: 'bbb', loginAccount: 'admin', sex: 1, tel: '15356678092' }
        ],
        width: '100%',
        height: 0,
        loading: false,
        showOverflowTooltip: true,
        columns: [
          { prop: 'name', label: '昵称' },
          { prop: 'loginAccount', label: '登陆账号' },
          { prop: 'sex', label: '性别', formatter: function(row, column, cellValue, index) {
            if (cellValue === 1) {
              return '男'
            } else {
              return '女'
            }
          } },
          { prop: 'tel', label: '手机号' }
        ],
        pageNum: 1,
        pageSize: 20,
        pages: 0,
        total: 0
      },
      parameters: {
        name: '',
        pageNum: 1,
        pageSize: 20
      }
    }
  },
  mounted() {
    this.getTableData()
  },
  created() {
  },
  methods: {
    getTableData() {
      this.tableData.loading = true
      userList(this.parameters).then((response) => {
        this.tableData.loading = false
        this.tableData.data = response.result
        this.tableData.pageSize = response.pageSize
        this.tableData.pageNum = response.pageNum
        this.tableData.total = response.total
      })
    },
    handleSizeChange(val) {
      this.tableData.pageSize = val
      this.parameters.pageSize = val
      this.getTableData()
    },
    handleCurrentChange(val) {
      this.tableData.pageNum = val
      this.parameters.pageNum = val
      this.getTableData()
    }
  }
}
</script>
<style scoped>
  .el-form-item{margin: 8px 10px;}
</style>

