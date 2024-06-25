<template>
  <div class="CategorySelect">
    <el-form :inline="true" :model="cForm" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select v-model="cForm.category1Id" placeholder="请选择" @change="getValue1()">
          <el-option
            v-for="item in this.getcategory1List"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="cForm.category2Id" placeholder="请选择" @change="getValue2()">
          <el-option
            v-for="item in this.getcategory2List"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="cForm.category3Id" placeholder="请选择" @change="getValue3()">
          <el-option
            v-for="item in this.getcategory3List"
            :key="item.id"
            :value="item.id"
            :label="item.name"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getcategory1, getcategory2, getcategory3 } from '@/api/product/attr'
export default {
  name: 'CategorySelect',
  data() {
    return {
      cForm: {
        category1Id: '',
        category2Id: '',
        category3Id: ''
      },
      value1: '',
      getcategory1List: '',
      getcategory2List: '',
      getcategory3List: '',
      selectvalue: ''
    }
  },
  mounted() {
    getcategory1().then(res => {
      console.log(res)
      if (res.code === 200) {
        this.getcategory1List = res.data
        console.log(this.getcategory1List)
      }
    })
    // getAttrInfoList().then(res => {
    //   console.log(res)
    // })
  },
  methods: {
    getValue1() {
      const { category1Id } = this.cForm
      this.cForm.category2Id = ''
      this.cForm.category3Id = ''
      this.getcategory2List = ''
      this.getcategory3List = ''
      console.log(category1Id)
      this.$emit('getCategoryId', { categoryId: category1Id, level: 1 })
      getcategory2(category1Id).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.getcategory2List = res.data
          console.log(this.getcategory2List)
        }
      })
    },
    getValue2() {
      const { category2Id } = this.cForm
      this.getcategory3List = ''
      this.cForm.category3Id = ''
      console.log(category2Id)
      this.$emit('getCategoryId', { categoryId: category2Id, level: 2 })
      getcategory3(category2Id).then(res => {
        console.log(res)
        if (res.code === 200) {
          this.getcategory3List = res.data
          console.log(this.getcategory2List)
        }
      })
    },
    getValue3() {
      const { category3Id } = this.cForm
      this.$emit('getCategoryId', { categoryId: category3Id, level: 3 })
    }
  }
}
</script>

<style></style>
