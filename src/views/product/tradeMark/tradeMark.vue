<template>
  <div class="tradeMark">
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px 0;" @click="add">添加</el-button>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="index" label="序号" width="100" align="center" />
      <el-table-column prop="tmName" label="品牌名称" width="300" align="center" />
      <!-- <el-table-column prop="logoUrl" label="品牌logo" align="center" /> -->
      <el-table-column label="品牌logo" prop="logoUrl" align="center">
        <template slot-scope="{row,$index}">
          <!-- <span style="margin-left: 10px">{{ $index }}</span> -->
          <img :src="row.logoUrl" alt="" style="width: 150px;height: 150px">
        </template>
      </el-table-column>
      <!-- <el-table-column prop="address" label="操作" align="center" /> -->
      <el-table-column label="操作" align="center">
        <template slot-scope="{row,$index}">
          <el-button
            type="warning"
            icon="el-icon-edit-outline"
            style="margin: 10px 10px;"
            size="mini"
            @click="handleEdit"
          >修改</el-button>
          <el-button type="danger" icon="el-icon-delete" style="margin: 10px 10px;" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--
      分页器
      当前第几页、数据总条数、每一页展示条数、连续页码数
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"

      current-page:代表的是当前第几页
      total：代表分页器一共需要展示数据条数
      page-size：代表的是每一页需要展示多少条数据
      page-sizes：代表可以设置每一页展示多少条数据
      layout：可以实现分页器布局
      pager-count:按钮的数量  如果 9  连续页码是7

    -->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="  prev, pager, next, jumper,->,sizes,total"
      :total="total"
      :page-count="5"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <el-dialog title="添加品牌" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">

      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="品牌名称" prop="name">
          <el-input v-model="ruleForm.tmname" />
        </el-form-item>
        <el-form-item label="品牌logo">
          <!--这里收集数据：不能使用v-model，因为不是表单元素
            action:设置图片上传的地址
            :on-success:可以检测到图片上传成功，当图片上传成功，会执行一次
            :before-upload：可以在上传图片之前，会执行一次
          -->
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="ruleForm.logoUrl" :src="ruleForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
        <div style="display: flex;justify-content: flex-end;">
          <el-button style="margin: 10px 10px;" size="mini" @click="handleCancle">取消</el-button>
          <el-button type="primary" style="margin: 10px 10px;" size="mini">确定</el-button>
        </div>

      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { reqTradeMarkList } from '@/api/product/tradeMark.js'
export default {
  data() {
    return {
      imageUrl: '',
      tableData: [],
      page: 1, // 第几页
      limit: 3, // 每页展示几条
      total: 0, // 总条数
      dialogVisible: false,
      ruleForm: {
        tmname: '',
        logoUrl: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    const { page, limit } = this
    this.getTradeMarkList(page, limit)
  },
  methods: {
    add() {
      console.log('添加事件')
      this.ruleForm = {
        tmname: '',
        logoUrl: ''
      }
      this.dialogVisible = true
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.limit = val
      this.getTradeMarkList(this.page, this.limit)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.getTradeMarkList(this.page, this.limit)
    },
    getTradeMarkList(page, limit) {
      reqTradeMarkList(page, limit).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.tableData = res.data.records
          this.total = res.data.total
        }
      })
    },
    handleClose() {
      console.log('关闭')
      this.dialogVisible = false
    },
    handleEdit() {
      this.dialogVisible = true
    },
    handleCancle() {
      this.dialogVisible = false
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      console.log(file)
      this.ruleForm.logoUrl = res.data
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }

  }
}
</script>

<style></style>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
