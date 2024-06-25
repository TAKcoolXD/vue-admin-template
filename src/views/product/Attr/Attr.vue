<template>
  <div class="attr">
    <el-card style="margin: 20px 0;">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>

    <el-card>
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
            <el-button type="danger" icon="el-icon-delete" style="margin: 10px 10px;" size="mini" @click="deleteTradeMark(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
import CategorySelect from '@/components/CategorySelect/CategorySelect.vue'
import { getAttrInfoList } from '@/api/product/attr'
export default {
  components: { CategorySelect },
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      arrtList: []
    }
  },
  mounted() {

  },
  methods: {
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
    }
  }
}
</script>

<style></style>
