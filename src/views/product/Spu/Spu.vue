<template>
  <div class="spu">
    <el-card style="margin: 20px 0;">
      <CategorySelect @getCategoryId="getCategoryId" />
    </el-card>
    <el-card style="margin: 20px 0;">
      <div v-show="flag==1">
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="handleSpuShow">添加SPU</el-button>
        <el-table :data="records" border style="width: 100%">
          <el-table-column type="index" label="序号" width="100" align="center" />
          <el-table-column prop="spuName" label="SPU名称" width="300" align="center" />
          <!-- <el-table-column prop="logoUrl" label="品牌logo" align="center" /> -->
          <el-table-column prop="description" label="SPU描述" align="center" width="600" />
          <!-- <el-table-column prop="address" label="操作" align="center" /> -->
          <el-table-column label="操作" align="center">
            <template slot-scope="{row,$index}">
              <el-tooltip content="添加sku" placement="top">
                <el-button
                  type="success"
                  icon="el-icon-plus"
                  style="margin: 10px 0px;"
                  size="mini"
                  @click="handleEdit(row)"
                />
              </el-tooltip>

              <el-tooltip content="修改spu" placement="top">
                <el-button
                  type="warning"
                  icon="el-icon-edit"
                  style="margin: 10px 5px;"
                  size="mini"
                  @click="updateSpu(row)"
                />
              </el-tooltip>

              <el-tooltip content="查看当前sku和spu" placement="top">
                <el-button
                  type="info"
                  icon="el-icon-info"
                  style="margin: 10px 0px;"
                  size="mini"
                />
              </el-tooltip>
              <el-tooltip content="删除spu" placement="top">
                <el-button type="danger" icon="el-icon-delete" style="margin: 10px 5px;" size="mini" @click="reqDeleteAttr(row,$index)" />
              </el-tooltip>

            </template>
          </el-table-column>
        </el-table>
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
      </div>
      <SkuFrom v-show="flag==2" ref="sku" />
      <SpuFrom v-show="flag==3" ref="spu" @showOne="showOne" />
    </el-card>
  </div>
</template>

<script>
import SkuFrom from '@/views/product/Spu/SkuFrom/SkuFrom.vue'
import SpuFrom from '@/views/product/Spu/SpuFrom/SpuFrom.vue'
import CategorySelect from '@/components/CategorySelect/CategorySelect.vue'
import { reqSpuList } from '@/api/product/spu'
export default {
  components: {
    CategorySelect,
    SkuFrom,
    SpuFrom
  },
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      page: '1',
      limit: '3',
      total: '',
      records: '',
      flag: 1

    }
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
        // const { category1Id, category2Id, category3Id } = this
        // getAttrInfoList(category1Id, category2Id, category3Id).then(res => {
        //   console.log(res)
        //   if (res.code === 200) {
        //     this.arrtList = res.data
        //     console.log('🚀 ~ getAttrInfoList ~  this.arrtList:', this.arrtList)
        //   }
        // })
        this.getSpuList()
      }
    },
    getSpuList() {
      const { page, limit, category3Id } = this
      console.log(page, limit, category3Id, '结构数据')
      reqSpuList(page, limit, { category3Id }).then(res => {
        console.log(res, '返回')
        if (res.code === 200) {
          this.total = res.data.total
          this.records = res.data.records
        }
      })
    },
    // pageSize 改变时会触发
    handleSizeChange(a) {
      console.log(a)
      this.limit = a
      this.getSpuList()
    },
    // currentPage 改变时会触发
    handleCurrentChange(a) {
      console.log(a)
      this.page = a
      this.getSpuList(this.page)
    },
    // 点击展示SPu
    handleSpuShow() {
      this.flag = 2
    },
    showOne(a) {
      console.log('父传子', a)
      this.flag = a
      this.getSpuList(this.page)
    },
    // 点击修改spu
    updateSpu(row) {
      console.log(row)
      this.flag = 3
      console.log('🚀 ~ updateSpu ~ this.$refs.spu:', this.$refs.spu)
      // 给子组件绑定ref 通过this.$refs.spu可以拿到子组件的数据
      this.$refs.spu.golist(row)
    }

  }
}
</script>

    <style>

    </style>
