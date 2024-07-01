<template>
  <div class="SkuFrom">
    <el-form ref="form" model="form" label-width="80px">
      <el-form-item label="SPU名称">
        <div>{{ spu.spuName }}</div>
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input v-model="skuInfo.skuName" placeholder="请输入SKU名称" />
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuInfo.price" placeholder="请输入价格" type="number" />
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input v-model="skuInfo.weight" placeholder="请输入重量(千克)" />
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input v-model="skuInfo.skuDesc" placeholder="请输入规格描述" type="textarea" rows="4" />
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item v-for="item in AttrInfoList" :key="item.id" :label="item.attrName">
            <el-select v-model="item.attrIdAndValueId" placeholder="请选择">
              <el-option v-for="item1 in item.attrValueList" :key="item1.id" :label="item1.valueName" :value="`${item.id}:${item1.id}`" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form ref="form" :inline="true" label-width="80px">
          <el-form-item v-for="item in SpuSaleAttrList" :key="item.id" :label="item.saleAttrName">
            <el-select v-model="item.attrIdAndValueId" placeholder="请选择">
              <el-option v-for="item1 in item.spuSaleAttrValueList" :key="item1.id" :label="item1.saleAttrValueName" :value="`${item.id}:${item1.id}`" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table
          ref="multipleTable"
          border
          :data="spuImageList"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            type="selection"
            width="100"
          />
          <el-table-column prop="address" label="图片" show-overflow-tooltip width="360">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" alt="" style="width: 100px;height: 100px;margin-left: 110px">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" show-overflow-tooltip width="360" />
          <el-table-column prop="address" label="操作" show-overflow-tooltip width="360">
            <template slot-scope="{row,$index}">
              <el-button v-if="row.isDefault==0" type="primary" @click="changeDefault(row)">设为默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { reqSpuImageList,
  reqSpuSaleAttrList,
  reqAttrInfoList, reqAddSku } from '@/api/product/sku'
export default {
  data() {
    return {
      spuImageList: [],
      SpuSaleAttrList: [],
      AttrInfoList: [],
      skuInfo: {
        // 第一类收集的数据：父组件给的数据
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类：需要通过数据双向绑定v-model收集
        skuName: '',
        price: 0,
        weight: '',
        skuDesc: '',
        // 第三类：需要自己书写代码
        // 默认图片
        skuDefaultImg: '',
        // 收集图片的字段
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0,
          // },
        ],
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // },
        ],
        // 销售属性
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0,
          // },
        ]

      },
      spu: {},
      imageList: []
    }
  },
  methods: {
    getData(category1Id, category2Id, row) {
      console.log('父组件激活方法到子组件', category1Id, category2Id, row)
      this.skuInfo.category3Id = row.category3Id
      this.skuInfo.spuId = row.id
      this.skuInfo.tmId = row.tmId
      this.spu = row
      reqSpuImageList(row.id).then(res => {
        console.log(res)
        if (res.code == 200) {
          const list = res.data
          list.forEach(item => {
            item.isDefault = 0
          })
          this.spuImageList = list
        }
      })
      reqSpuSaleAttrList(row.id).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.SpuSaleAttrList = res.data
        }
      })
      reqAttrInfoList(category1Id, category2Id, row.category3Id).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.AttrInfoList = res.data
        }
      })
    },
    handleSelectionChange(a) {
      console.log('图片选择', a)
      this.imageList = a
    },
    changeDefault(row) {
      console.log('设为默认', row)
      this.spuImageList.forEach(item => {
        item.isDefault = 0
      })
      row.isDefault = 1
      this.skuInfo.skuDefaultImg = row.imgUrl
    },
    cancel() {
      console.log('点击取消')
      this.$emit('changeScenes', 1)
      Object.assign(this._data, this.$options.data())
    },
    save() {
      console.log('保存')
      const { AttrInfoList, skuInfo, SpuSaleAttrList, imageList } = this

      // const arr = []
      // AttrInfoList.forEach(item => {
      //   console.log(item)
      //   if (item.attrIdAndValueId) {
      //     const [valueId, attrId] = item.attrIdAndValueId.split(':')
      //     const obj = { valueId, attrId }
      //     arr.push(obj)
      //   }
      // })
      // skuInfo.skuAttrValueList = arr
      skuInfo.skuAttrValueList = AttrInfoList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [attrId, valueId] = item.attrIdAndValueId.split(':')
          prev.push({ attrId, valueId })
        }
        return prev
      }, [])

      skuInfo.skuSaleAttrValueList = SpuSaleAttrList.reduce((prev, item) => {
        if (item.attrIdAndValueId) {
          const [saleAttrId, saleAttrValueId] = item.attrIdAndValueId.split(':')
          prev.push({ saleAttrId, saleAttrValueId })
        }
        return prev
      }, [])

      skuInfo.skuImageList = imageList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })

      // const arr1 = []
      // SpuSaleAttrList.forEach(item1 => {
      //   console.log(item1)
      //   if (item1.attrIdAndValueId) {
      //     const [saleAttrId, saleAttrValueId] = item1.attrIdAndValueId.split(':')
      //     const obj1 = { saleAttrId, saleAttrValueId }
      //     arr1.push(obj1)
      //   }
      // })
      // skuInfo.skuSaleAttrValueList = arr1
      // skuInfo.skuImageList = imageList.map(item => {
      //   return {
      //     imgName: item.imgName,
      //     imgUrl: item.imgUrl,
      //     isDefault: item.isDefault,
      //     spuImgId: item.id
      //   }
      // })
      reqAddSku(skuInfo).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message({
            message: '添加SKU成功',
            type: 'success'
          })
          this.$emit('changeScenes', 1)
        }
      })
    }
  }
}
</script>
   <style>
  </style>
