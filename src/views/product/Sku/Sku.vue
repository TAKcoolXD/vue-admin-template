<template>
  <div>
    <el-table
      :data="records"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="prop"
        label="序号"
        width="60"
        type="index"
      />
      <el-table-column
        prop="skuName"
        label="名称"
        width="width"
      />
      <el-table-column
        prop="skuDesc"
        label="描述"
        width="width"
      />
      <el-table-column
        align="center"
        prop="prop"
        label="默认图片"
        width="150"
      >
        <template slot-scope="{row,$index}">
          <img :src="row.skuDefaultImg" alt="" style="width: 100px;height: 100px;">
        </template>
      </el-table-column>
      <el-table-column
        prop="weight"
        label="重量"
        width="80"
      />
      <el-table-column
        prop="prop"
        label="价格"
        width="80"
      >
        123
      </el-table-column>
      <el-table-column
        prop="prop"
        label="操作"
        width="width"
      >
        <template slot-scope="{row,$index}">
          <el-button v-if="row.isSale==0" icon="el-icon-sort-up" size="small" type="success" @click="sale(row)" />
          <el-button v-else icon="el-icon-sort-down" size="small" type="success" @click="cancle(row)" />
          <el-button icon="el-icon-edit" size="small" type="primary" />
          <el-button icon="el-icon-info" size="small" type="info" />
          <el-button icon="el-icon-delete-solid" size="small" type="danger" />
        </template>
      </el-table-column>
    </el-table>
    <!--   @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      current-page //当前第几页
      page-size //  每页多少条
      -->
    <el-pagination
      style="text-align: center"
      :current-page="page"
      :page-sizes="[3, 5, 10]"
      :page-size="limit"
      layout="  prev, pager, next, jumper,->,sizes,total"
      :total="tatal"
      :page-count="5"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { reqSkuListdata, reqOnsale, reqCancelSale } from '@/api/product/sku'
export default {
  data() {
    return {
      page: 4, // 当前页
      limit: 5, // 每一页展示几条
      tatal: '', // 分页器总共数据
      records: [], // 存储sku列表数据
      pages: ''

    }
  },
  mounted() {
    this.getSkuListdata()
  },
  methods: {
    getSkuListdata() {
      const { page
        , limit } = this
      reqSkuListdata(page, limit).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.tatal = res.data.tatal
          this.records = res.data.records
        }
      })
    },
    handleSizeChange(pages) {
      console.log('展示几条', pages)
      const { page } = this
      this.pages = pages
      reqSkuListdata(page, pages).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.tatal = res.data.tatal
          this.records = res.data.records
        }
      })
    },
    handleCurrentChange(page) {
      console.log('当前页', page)
      this.page = page
      const { limit } = this
      reqSkuListdata(page, limit).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.tatal = res.data.tatal
          this.records = res.data.records
        }
      })
    },
    // 上架
    sale(row) {
      console.log('上架', row)
      reqOnsale(row.id).then(res => {
        console.log(res)
        if (res.code == 200) {
          row.isSale = 1
          this.$message({
            message: '上架成功',
            type: 'success'
          })
        }
      })
    },
    // 下架
    cancle(row) {
      console.log('下架', row)
      reqCancelSale(row.id).then(res => {
        console.log(res)
        if (res.code == 200) {
          row.isSale = 0
          this.$message({
            message: '下架成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

    <style>

    </style>
