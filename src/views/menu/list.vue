<template>
  <div>
    <div class="jdd-content" style="margin-top:0px;">
      <el-row class="jdd-table-tile">
        <div class="jdd-table-name">菜单配置</div>
        <el-button type="primary" size="small" @click="append">新增</el-button>
      </el-row>
      <div class="custom-tree-container">
        <div class="block">
          <el-tree :style="{ height: dataTableHeight-85 + 'px' }" :props="{label:'title'}" :data="menuData" node-key="id" default-expand-all :expand-on-click-node="false">
            <div slot-scope="{ node, data }" class="custom-tree-node">
              <span>{{ node.label+'（path：'+ data.path +'，name：'+data.name+'）' }}</span>
              <span>
                <el-button
                  v-if="data.parentId === 0"
                  type="text"
                  size="mini"
                  @click="() => append(node, data)"
                >
                  添加子菜单
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => edit(node, data)"
                >
                  <span style="color:#0CC576">编辑</span>
                </el-button>
                <el-button
                  type="text"
                  size="mini"
                  @click="() => remove(node, data)"
                >
                  <span style="color:#f56c6c">删除</span>
                </el-button>
              </span>
            </div>
          </el-tree>
        </div>
      </div>
    </div>
    <el-dialog v-el-drag-dialog :title="formTitle" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="700px">
      <el-form ref="formRef" :model="form" :inline="true">
        <el-form-item prop="" label="path" :label-width="formLabelWidth">
          <el-input v-model="form.path" :disabled="formType=='edit'?true:false" placeholder="一级菜单请加'/'，二级菜单无需添加，可以参照现有菜单格式添加" size="small" style="width:500px;" />
        </el-form-item>
        <el-form-item prop="" label="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="首字母请大写" size="small" style="width:500px;" />
        </el-form-item>
        <el-form-item v-if="!isChildComponent" prop="" label="redirect" :label-width="formLabelWidth">
          <el-input v-model="form.redirect" size="small" :disabled="formType=='edit'?true:false" placeholder="" style="width:500px;" />
        </el-form-item>
        <el-form-item prop="" label="component" :label-width="formLabelWidth">
          <el-input v-model="form.component" :disabled="true" placeholder="" size="small" style="width:500px;" />
        </el-form-item>
        <el-form-item prop="" label="hidden" :label-width="formLabelWidth">
          <div style="width:185px;">
            <el-radio v-model="form.hidden" :label="true">true</el-radio>
            <el-radio v-model="form.hidden" :label="false">false</el-radio>
          </div>
        </el-form-item>
        <el-form-item prop="" label="title" :label-width="formLabelWidth">
          <el-input v-model="form.title" :disabled="formType=='edit'?true:false" size="small" placeholder="" />
        </el-form-item>
        <el-form-item prop="" label="icon" :label-width="formLabelWidth">
          <el-input v-model="form.icon" placeholder="" size="small" />
        </el-form-item>
        <!-- <el-form-item prop="" label="iconMini" :label-width="formLabelWidth">
          <el-input v-model="form.iconMini" placeholder="" size="small" />
        </el-form-item> -->
        <el-form-item prop="" label="priority" :label-width="formLabelWidth">
          <el-input v-model="form.priority" placeholder="" size="small" />
        </el-form-item>
      </el-form>
      <el-alert type="warning" :closable="false">请勿与已有菜单重复</el-alert>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('formRef')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import elDragDialog from '@/directive/el-dragDialog'
import { menuList, menuAddOrEdit, menuDel } from '@/api/menu'
export default {
  name: 'Menu',
  components: {},
  directives: { elDragDialog },
  data() {
    return {
      dataTableHeight: 600,
      menuData: [],
      form: {
        parentId: '',
        path: '',
        name: '',
        component: '',
        redirect: '',
        hidden: false,
        title: '',
        icon: '',
        iconMini: '',
        priority: ''
      },
      ajaxUrl: '',
      formType: 'add',
      formTitle: '新增菜单',
      formLabelWidth: '110px',
      dialogFormVisible: false,
      isChildComponent: false
    }
  },
  mounted() {
    this.getMenuData()
  },
  created() {},
  methods: {
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
    append(node, data) {
      // console.log(data)
      this.isChildComponent = false
      this.ajaxUrl = '/menu/add'
      this.dialogFormVisible = true
      this.form.path = ''
      this.form.name = ''
      this.form.component = 'Layout'
      this.form.redirect = ''
      this.form.hidden = false
      this.form.title = ''
      this.form.icon = ''
      this.form.iconMini = ''
      this.form.priority = '1'
      this.form.parentId = '0'
      if (data) {
        this.form.parentId = data.id
        this.form.component = 'test/list'
        this.isChildComponent = true
      }
      if (this.form.id) delete this.form.id
    },
    edit(node, data) {
      this.formTitle = '编辑'
      this.ajaxUrl = '/menu/edit'
      this.dialogFormVisible = true
      for (const item in this.form) {
        this.form[item] = data[item]
      }
      this.form.hidden = data.hidden === 1
      this.form.id = data.id
      this.isChildComponent = true
    },
    submitForm(data) {
      menuAddOrEdit(this.ajaxUrl, this.form).then((response) => {
        if (response.statusCode === 200) {
          this.dialogFormVisible = false
          this.getMenuData()
        } else {
          this.$message({
            message: response.message,
            type: 'error'
          })
        }
      })
    },
    remove(node, data) {
      // console.log(node,data)
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        menuDel({ id: data.id }).then((response) => {
          if (response.statusCode === 200) {
            this.getMenuData()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              message: response.message,
              type: 'error'
            })
          }
        })
      }).catch(() => {})
    }
  }
}
</script>
<style scoped>
  .custom-tree-container{display: flex;padding: 0 10px;}
  .custom-tree-container .block{flex: 1;}
  .custom-tree-container .block p{padding: 10px 0 10px 10px;background-color: #EEEEEE;margin: 0;}
  .custom-tree-container .block>div{overflow: auto}
  .custom-tree-node{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
</style>

