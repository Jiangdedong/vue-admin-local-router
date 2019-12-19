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
        <el-button type="primary" size="small" @click="addUser">新增</el-button>
        <el-button type="primary" size="small" @click="openMenuDialog">批量赋权</el-button>
        <el-button type="danger" size="small" @click="multipleUserDel()">批量删除</el-button>
      </el-row>
      <el-table v-loading="tableData.loading" :data="tableData.data" max-height="700" border stripe highlight-current-row @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" />
        <el-table-column v-for="(item,index) in tableData.columns" :key="index" :prop="item.prop" :label="item.label" :show-overflow-tooltip="tableData.showOverflowTooltip" :formatter="item.formatter" :sortable="item.sortable" />
        <el-table-column fixed="right" label="操作" width="250" align="center" header-align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="editUser(scope.row)">编辑</el-button>
            <el-button size="mini" type="primary" @click="openPasswordDialog(scope.row.id)">密码修改</el-button>
            <el-button size="mini" type="danger" @click="multipleUserDel(scope.row.id)">删除</el-button>
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
          <el-input v-model="form.name" size="small" auto-complete="off" style="width:200px;" :maxlength="11" />
        </el-form-item>
        <el-form-item prop="loginAccount" label="登录账号" :label-width="formLabelWidth">
          <el-input v-model="form.loginAccount" :disabled="formType=='edit'?true:false" size="small" auto-complete="off" style="width:200px;" :maxlength="11" />
        </el-form-item>
        <el-form-item prop="tel" label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.tel" size="small" auto-complete="off" style="width:200px;" :maxlength="11" />
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio-group v-model="form.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" :loading="btnLoading" size="small" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog v-el-drag-dialog title="修改密码" :visible.sync="modifyPasswordVisible" :close-on-click-modal="false" width="400px" center>
      <el-form ref="passwordFormRef" :model="passwordForm" :inline="true" :rules="passwordRules">
        <el-form-item prop="newPassword" label="新的密码" :label-width="formLabelWidth">
          <el-input v-model="passwordForm.newPassword" size="small" placeholder="至少六位，最多十位" style="width:200px" type="password" auto-complete="off" :maxlength="10" />
        </el-form-item>
        <el-form-item prop="secondConfirm" label="再次确认" :label-width="formLabelWidth">
          <el-input v-model="passwordForm.secondConfirm" size="small" style="width:200px" type="password" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button size="small" @click="modifyPasswordVisible = false">取 消</el-button>
        <el-button type="primary" :loading="btnLoading" size="small" @click="modifyPassword">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog v-el-drag-dialog title="用户赋权" :visible.sync="authVisible" :close-on-click-modal="false" width="400px" center>
      <el-tree ref="menu" style="max-height:500px;" :props="{label:'title'}" :data="menuData" show-checkbox node-key="id" default-expand-all :expand-on-click-node="false" />
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button size="small" @click="authVisible = false">取 消</el-button>
        <el-button type="primary" :loading="btnLoading" size="small" @click="modifyPassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import elDragDialog from '@/directive/el-dragDialog'
import { userList, userAddOrEdit, multipleUserDel, modifyPassword, updateUserMenus } from '@/api/user'
import { menuList } from '@/api/menu'
import { Encrypt } from '@/utils/cryptojs'

export default {
  name: 'List',
  components: {},
  directives: { elDragDialog },
  data() {
    const validateLoginAccount = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('登录账号不能为空'))
      } else if (value.trim() === 'admin') {
        callback(new Error('admin账号为管理员账号，请更换！'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      const val = value.trim()
      if (val !== '') {
        if (this.passwordForm.newPassword !== value) {
          callback(new Error('第二次输入的密码与首次不同！'))
        } else {
          callback()
        }
      } else {
        callback(new Error('请再次输入密码！'))
      }
    }
    return {
      dataTableHeight: 0,
      tableData: {
        data: [],
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
        loginAccount: '',
        tel: '',
        sex: 1
      },
      rules: {
        name: [
          { required: true, message: '请填写昵称', trigger: 'blur' }
        ],
        loginAccount: [
          { required: true, trigger: 'blur', validator: validateLoginAccount },
          { pattern: /^[a-zA-Z]+$/, message: '只能输入英文字母' }
        ],
        tel: [
          { pattern: /^(13[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9]|14[0-9])[0-9]{8}$/, message: '请输入正确的手机号号码' }
        ]
      },
      formLabelWidth: '80px',
      btnLoading: false,
      multipleSelection: [],
      modifyPasswordVisible: false,
      passwordForm: {
        newPassword: '',
        secondConfirm: ''
      },
      passwordRules: {
        newPassword: [
          { required: true, message: '请输入新的密码', trigger: 'blur' },
          { pattern: /^(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/, message: '字母+数字、字母+特殊字符或数字+特殊字符' }
        ],
        secondConfirm: [
          { required: true, trigger: 'blur', validator: validatePassword }
        ]
      },
      userId: '',
      menuData: [],
      authVisible: false
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
      this.$nextTick(() => {
        this.$refs.formRef.resetFields()
      })
    },
    editUser(row) {
      this.dialogFormVisible = true
      this.formTitle = '编辑'
      this.formType = 'edit'
      this.ajaxUrl = '/user/edit'
      for (const item in this.form) {
        this.form[item] = row[item]
      }
      this.form.id = row.id
    },
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          userAddOrEdit(this.ajaxUrl, this.form).then((response) => {
            this.btnLoading = false
            if (response.statusCode === 200) {
              this.dialogFormVisible = false
              this.$message({
                message: this.formType === 'add' ? '新增成功！' : '更新成功！',
                type: 'success'
              })
              this.getTableData()
            } else {
              this.$message({
                message: response.message,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(val)
    },
    multipleUserDel(id) {
      let ids = ''
      if (id) {
        ids = id
      } else {
        const idArr = []
        this.multipleSelection.forEach((item) => {
          idArr.push(item.id)
        })
        if (idArr.length === 0) {
          this.$message({
            message: '请选择要删除的数据',
            type: 'warning'
          })
          return false
        }
        ids = idArr.join(',')
      }
      this.$confirm('确定删除吗?', '操作警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        multipleUserDel({ ids }).then((response) => {
          if (response.statusCode === 200) {
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
            this.getTableData()
          } else {
            this.$message({
              message: response.message,
              type: 'error'
            })
          }
        })
      }).catch(() => {})
    },
    openPasswordDialog(id) {
      this.userId = id
      this.modifyPasswordVisible = true
      this.passwordForm.newPassword = ''
      this.passwordForm.secondConfirm = ''
      this.$nextTick(() => {
        this.$refs.passwordFormRef.resetFields()
      })
    },
    modifyPassword() {
      this.$refs.passwordFormRef.validate((valid) => {
        if (valid) {
          this.btnLoading = true
          const pwd = Encrypt(this.passwordForm.newPassword.trim())
          modifyPassword({ id: this.userId, pwd }).then((response) => {
            this.btnLoading = false
            if (response.statusCode === 200) {
              this.dialogFormVisible = false
              this.$message({
                message: '密码修改成功！',
                type: 'success'
              })
            } else {
              this.$message({
                message: response.message,
                type: 'error'
              })
            }
          })
        } else {
          return false
        }
      })
    },
    openMenuDialog() {
      const selectedLen = this.multipleSelection.length
      if (selectedLen === 0) {
        this.$message({
          duration: 5000,
          message: '请选择用户！',
          type: 'warning'
        })
        return false
      }
      this.authVisible = true
      this.getMenuData()
    },
    getMenuData() {
      menuList().then((response) => {
        if (response.statusCode === 200) {
          this.menuData = response.result
        } else {
          this.$message({
            message: response.message,
            type: 'error'
          })
        }
      })
    },
    updateUserMenus() {
      const checkedTree = this.$refs.menu.getCheckedKeys()
      const halfCheckedTree = this.$refs.menu.getHalfCheckedKeys()
      const checkedTreeLen = checkedTree.length
      const para = {
        userIds: [],
        menuIds: []
      }
      this.multipleSelection.forEach((item) => {
        para.userIds.push(item.id)
      })
      if (checkedTreeLen === 0) {
        this.$message({
          duration: 5000,
          message: '请选择菜单！',
          type: 'warning'
        })
        return false
      } else {
        para.menuIds = checkedTree
      }
      if (halfCheckedTree.length !== 0) {
        para.menuIds = para.menuIds.concat(halfCheckedTree)
      }
      updateUserMenus(para).then((response) => {
        if (response.errorNo === 200) {
          this.$message({
            message: '授权成功',
            type: 'success'
          })
        } else {
          this.$message({
            message: response.message,
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

