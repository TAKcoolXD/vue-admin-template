<template>
  <div class="attr">
    <el-card style="margin: 20px 0;">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>

    <el-card>
      <!-- 显示商品属性 -->
      <div v-show="isShowTable">
        <!-- 添加属性button -->
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="handleTableShow">添加属性</el-button>
        <!-- 商品属性表 -->
        <el-table :data="arrtList" border style="width: 100%">
          <el-table-column type="index" label="序号" width="100" align="center" />
          <el-table-column prop="attrName" label="属性名称" width="300" align="center" />
          <!-- <el-table-column prop="logoUrl" label="品牌logo" align="center" /> -->
          <el-table-column label="属性值列表" align="center" width="600">
            <template slot-scope="{row,$index}">
              <!-- <span style="margin-left: 10px">{{ $index }}</span> -->
              <!-- <div v-for="item in row.attrValueList" :key="item.id"></div> -->
              <el-button v-for="item in row.attrValueList" :key="item.id" size="mini" type="success" plain disabled> {{ item.valueName }}</el-button>
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
                @click="handleEdit(row)"
              >修改</el-button>
              <el-button type="danger" icon="el-icon-delete" style="margin: 10px 10px;" size="mini" @click="reqDeleteAttr(row,$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 修改商品属性 -->
      <div v-show="!isShowTable">
        <el-form ref="form" :inline="true" :model="attrInfo">
          <el-form-item label="属性名">
            <el-input v-model="attrInfo.attrName" placeholder="请输入属性名" />
          </el-form-item>
        </el-form>

        <el-button type="primary" @click="addAttrValue">添加属性</el-button>
        <el-button>取消</el-button>

        <el-table :data="attrInfo.attrValueList" border>
          <el-table-column type="index" label="序号" width="80" />

          <el-table-column align="center" label="属性值名称">
            <template slot-scope="{row}">
              <el-input v-if="row.flag" v-model="row.valueName" placeholder="请输入属性值名称" size="mini" @blur="takeLook(row)" />
              <span v-else @click="row.flag=true">{{ row.valueName }}</span>
            </template>
          </el-table-column>

          <el-table-column align="center" label="操作">
            <template slot-scope="{ row ,$index}">
              <el-popconfirm :title="`${row.valueName}`" @onConfirm="confirmDelete($index,row)" @onCancel="cancelDelete($index)">
                <el-button slot="reference" type="danger" plain>删除</el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-button type="primary" :disabled="attrInfo.attrValueList.length<1" @click="saveAttr">保存</el-button>
        <el-button @click="isShowTable=true">取消</el-button>
      </div>
    </el-card>

  </div>
</template>

<script>
import CategorySelect from '@/components/CategorySelect/CategorySelect.vue'
import { getAttrInfoList, reqAddOrUpdateAttr, reqDeleteAttr } from '@/api/product/attr'
import cloneDeep from 'lodash/cloneDeep'
export default {
  components: { CategorySelect },
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      arrtList: [],
      isShowTable: true,
      attrInfo: {
        attrName: '', // 属性名
        attrValueList: [
          // 属性值，因为属性值可以有多个因此用数组，每一个属性值都是一个对象需要attrId，valueName
          // {
          //   attrId: '123',
          //   valueName: '123'

          // }
        ],
        categoryId: 0, // 三级分类的id
        categoryLevel: 3 // 因为服务器也需要区分几级id
      }
    }
  },
  mounted() {
    // getReqAttr()
  },
  methods: {
    // 子组建传过来的数据
    getCategoryId(Info) {
      console.log('子传父', Info)
      const {
        categoryId,
        level
      } = Info
      console.log(categoryId, level)
      if (level === 1) {
        this.category1Id = categoryId
        this.category2Id = ''
        this.category3Id = ''
      } else if (level === 2) {
        this.category2Id = categoryId
        this.category3Id = ''
      } else {
        this.category3Id = categoryId
        const { category1Id, category2Id, category3Id } = this
        getAttrInfoList(category1Id, category2Id, category3Id).then(res => {
          console.log(res)
          if (res.code === 200) {
            this.arrtList = res.data
            console.log('🚀 ~ getAttrInfoList ~  this.arrtList:', this.arrtList)
          }
        })
      }
    },
    // 第一个添加属性按钮
    handleTableShow() {
      console.log(1)
      this.isShowTable = false
      this.attrInfo = {
        attrName: '', // 属性名
        attrValueList: [
          // 属性值，因为属性值可以有多个因此用数组，每一个属性值都是一个对象需要attrId，valueName
        ],
        categoryId: this.category3Id, // 三级分类的id
        categoryLevel: 3 // 因为服务器也需要区分几级id
      }
    },
    // 第二个添加属性的按钮
    addAttrValue() {
      this.attrInfo.attrValueList.push(
        {
          attrId: this.attrInfo.id,
          valueName: '',
          flag: true
        }
      )
    },
    // 响应式数据 修改 编辑双休绑定
    handleEdit(row) {
      console.log('🚀 ~ handleEdit ~ row:', row)
      this.isShowTable = false
      this.attrInfo = cloneDeep(row)
      this.attrInfo.attrValueList.forEach((item) => {
        // 这样书写也可以给属性值添加flag自动，但是会发现视图不会跟着变化（因为flag不是响应式数据）
        // 因为Vue无法探测普通的新增 property,这样书写的属性并非响应式属性（数据变化视图跟这边）
        // 第一个参数:对象  第二个参数:添加新的响应式属性  第三参数：新的属性的属性值
        this.$set(item, 'flag', false)
      })
    },
    takeLook(row) {
      console.log('🚀 ~ takeLook ~ row:', row)
      const a = this.attrInfo.attrValueList.some(item => {
        if (row !== item) {
          return row.valueName == item.valueName
        }
      })
      if (a) return
      row.flag = false
    },
    // 确认删除
    confirmDelete($index, row) {
      console.log('删除', $index, row)
      this.attrInfo.attrValueList.splice($index, 1)
    },
    cancelDelete($index) {
      console.log('取消删除', $index)
    },
    // 修改完保存
    saveAttr() {
      console.log('保存')
      this.attrInfo.attrValueList = this.attrInfo.attrValueList.filter(item => {
        if (item.valueName != '') {
          delete item.flag
          return true // filter 需要return 箭头函数可以省略
        }
      })
      reqAddOrUpdateAttr(this.attrInfo).then(res => {
        console.log(res)
        const { category1Id, category2Id, category3Id } = this
        if (res.code === 200) {
          this.$message.success('保存成功')
          this.isShowTable = true
          getAttrInfoList(category1Id, category2Id, category3Id).then(res => {
            console.log(res)
            if (res.code === 200) {
              this.arrtList = res.data
              console.log('🚀 ~ getAttrInfoList ~  this.arrtList:', this.arrtList)
            }
          })
        }
      })
    },
    // 删除整个属性名称
    reqDeleteAttr(row, $index) {
      console.log('删除', row, $index)
      reqDeleteAttr(row.id).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message.success('删除成功')
          const { category1Id, category2Id, category3Id } = this
          console.log(category1Id, category2Id, category3Id)
          getAttrInfoList(category1Id, category2Id, category3Id).then(res => {
            console.log(res)
            if (res.code === 200) {
              this.arrtList = res.data
              console.log('🚀 ~ getAttrInfoList ~  this.arrtList:', this.arrtList)
            }
          })
        }
      })
    }
  }
}
</script>

<style></style>
