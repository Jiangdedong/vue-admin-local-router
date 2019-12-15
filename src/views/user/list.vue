<template>
  <div>
    <div ref="searchBox" class="jdd-search-box">
      <el-form :inline="true" @submit.native.prevent>
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="parameters.name" size="small" style="width:170px;" :clearable="true" @keyup.enter.native="getTableData" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search" @click="getTableData">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="jdd-content">
      <el-row class="jdd-table-tile">
        <div class="jdd-table-name">用户列表</div>
        <el-button type="primary" size="small" @click="addUser">新增</el-button>
      </el-row>
      <el-table v-loading="tableData.loading" :data="tableData.data" max-height="700" border stripe highlight-current-row>
        <el-table-column v-for="(item,index) in tableData.columns" :key="index" :prop="item.prop" :label="item.label" :show-overflow-tooltip="tableData.showOverflowTooltip" :formatter="item.formatter" :sortable="item.sortable" />
        <el-table-column fixed="right" label="操作" width="150" align="center" header-align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editUser(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="userDel(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="text-align:right;margin: 10px 0">
        <el-pagination :total="tableData.total" layout="total, sizes, prev, pager, next" :page-sizes="[10, 20, 30, 40,50]" :page-size="20" :current-page="tableData.pageNum" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </el-row>
    </div>
    <el-dialog v-el-drag-dialog :title="formTitle" :visible.sync="dialogFormVisible" width="400px" center :close-on-click-modal="false">
      <el-form ref="formRef" :model="form" :inline="true" :rules="rules">
        <el-form-item prop="name" label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.name" size="small" auto-complete="off" style="width:200px;" />
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.tel" size="small" auto-complete="off" style="width:200px;" :maxlength="11" />
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" size="small" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import elDragDialog from '@/directive/el-dragDialog'
import { userList, userAddOrEdit, userDel } from '@/api/user'

export default {
  name: 'List',
  components: {},
  directives: { elDragDialog },
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
      },
      dialogFormVisible: false,
      ajaxUrl: 'userAdd',
      formTitle: '新增用户',
      formType: 'add',
      form: {
        name: '',
        tel: '',
        sex: 1
      },
      rules: {
        name: [
          { required: true, message: '请填写昵称', trigger: 'blur' }
        ]
      },
      formLabelWidth: '80px',
      submitLoading: false
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
    },
    addUser() {
      this.dialogFormVisible = true
      this.formTitle = '新增'
      this.formType = 'add'
      this.ajaxUrl = '/user/add'
    },
    editUser(row) {
      this.dialogFormVisible = true
      this.formTitle = '编辑'
      this.formType = 'edit'
      this.ajaxUrl = '/user/edit'
    },
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.dialogFormVisible = false
          this.submitLoading = this.$loading({
            lock: true,
            text: '正在提交，请稍后',
            spinner: 'el-icon-loading'
          })
          userAddOrEdit(this.ajaxUrl, this.form).then((response) => {
            this.submitLoading.close()
            if (response.statusCode === 200) {
              this.dialogFormVisible = false
              this.$message({
                message: this.formType === 'add' ? '新增成功！' : '更新成功！',
                type: 'success'
              })
              this.getTableData()
            } else {
              this.$message({
                message: response.errorInfo,
                type: 'error'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    userDel(id) {
      userDel({ id }).then((response) => {
        if (response.statusCode === 200) {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.getTableData()
        } else {
          this.$message({
            message: response.errorInfo,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
  .el-form-item{margin: 8px 10px;}
</style>

