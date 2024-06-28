<template>

  <div class="SpuFrom">
    <el-form ref="form" :model="spu" label-width="80px">
      <el-form-item label="SPU名称">
        <el-input v-model="spu.spuName" placeholder="SPU名称" />
      </el-form-item>
      <el-form-item label="品牌">
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option v-for="(item) in tradeMarkList" :key="item.id" :label="item.tmName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述">
        <el-input v-model="spu.description" type="textarea" placeholder="SPU描述" :rows="4" />
      </el-form-item>
      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-success="handlerSuccess"
          :on-remove="handleRemove"
          :file-list="spuImageList"
        >
          <i class="el-icon-plus" />
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-select v-model="attrIdAndAttrName" :placeholder="`还有${unSelectSaleAttr.length}未选择`">
          <el-option v-for="(item) in unSelectSaleAttr" :key="item.id" :label="item.name" :value="`${item.id}:${item.name}`" />
        </el-select>
        <el-button icon="el-icon-plus" type="primary">添加销售属性</el-button>
        <el-table
          border
          :data="spu.spuSaleAttrList"
          style="width: 100%;margin-top: 20px"
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
            prop="saleAttrName"
            label="属性名"
          />
          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            label="属性值名称列表"
          >
            <template slot-scope="{row,$index}">
              <el-tag
                v-for="tag in row.spuSaleAttrValueList"
                :key="tag.id"
                closable
                :disable-transitions="false"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.inputVisible"
                ref="saveTagInput"
                v-model="row.inputValue"
                class="input-new-tag"
                size="small"
              />
              <el-button v-else class="button-new-tag" size="small">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            label="操作"
          >
            <template slot-scope="{row,$index}">
              <el-button size="mini" plain> 删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary">保存</el-button>
        <el-button @click="$emit('showOne',1)">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { reqSpuInfo, reqTradeMarkList, reqSpuImageList, reqBaseSaleAttrList } from '@/api/product/spu'
export default {
  data() {
    return {
      a: '',
      dialogImageUrl: '',
      dialogVisible: false,
      spu: {
        // 三级分类的id
        category3Id: 0,
        // 描述
        description: '',
        // spu名称
        spuName: '',
        // 平台的id
        tmId: '',
        // 收集SPU图片的信息
        spuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   spuId: 0,
          // },
        ],
        // 平台属性与属性值收集
        spuSaleAttrList: [
          // {
          //   baseSaleAttrId: 0,
          //   id: 0,
          //   saleAttrName: "string",
          //   spuId: 0,
          //   spuSaleAttrValueList: [
          //     {
          //       baseSaleAttrId: 0,
          //       id: 0,
          //       isChecked: "string",
          //       saleAttrName: "string",
          //       saleAttrValueName: "string",
          //       spuId: 0,
          //     },
          //   ],
          // },
        ]
      }, // 存储SPU信息属性
      attrIdAndAttrName: '',
      tradeMarkList: [], // 存储品牌信息
      spuImageList: [], // 存储SPU图片的数据
      saleAttrList: []// 销售属性的数据（项目全部的销售属性）
    }
  },
  computed: {
    unSelectSaleAttr() {
      const res = this.saleAttrList.filter(item => {
        return this.spu.spuSaleAttrList.every(item1 => {
          return item.name != item1.saleAttrName
        })
      })
      return res
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
      this.spuImageList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    golist(row) {
      console.log('父组件通过ref传过来的值', row)
      reqSpuInfo(row.id).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.spu = res.data
        }
      })
      reqTradeMarkList().then(res => {
        console.log(res)
        if (res.code === 200) {
          this.tradeMarkList = res.data
        }
      })
      reqSpuImageList(row.id).then(res => {
        console.log(res)
        if (res.code === 200) {
          // this.spuImageList = res.data
          const imageList = res.data
          imageList.forEach(element => {
            console.log(element)
            element.name = element.imgName
            element.url = element.imgUrl
          })
          this.spuImageList = imageList
        }
      })
      reqBaseSaleAttrList().then(res => {
        console.log(res)
        if (res.code === 200) {
          this.saleAttrList = res.data
        }
      })
    },
    handlerSuccess(response, file, fileList) {
      this.spuImageList = fileList
    }
  }
}
</script>
 <style>
</style>
<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
