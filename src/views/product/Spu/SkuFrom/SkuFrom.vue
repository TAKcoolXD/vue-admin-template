<template>

  <div class="SkuFrom">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input v-model="a" placeholder="SPU名称" />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="model" placeholder="请选择品牌">
          <el-option />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU名称">
        <el-input v-model="a" type="textarea" placeholder="SPU名称" :rows="4" />
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="model" placeholder="还有3未选择">
          <el-option />
        </el-select>
        <el-button icon="el-icon-plus" type="primary">添加销售属性</el-button>
        <el-table
          border
          :data="data"
          style="width: 100%"
        >
          <el-table-column
            prop="prop"
            label="序号"
            width="50"
            type="index"
          />
          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            label="属性名"
          />
          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            label="属性值名称列表"
          />
          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            label="操作"
          />
        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      a: '',
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>
 <style>
</style>
