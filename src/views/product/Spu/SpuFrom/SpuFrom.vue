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
        <el-button icon="el-icon-plus" type="primary" @click="addAttr">添加销售属性</el-button>
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
                v-for="(tag,index) in row.spuSaleAttrValueList"
                :key="tag.id"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index,1)"
              >
                {{ tag.saleAttrValueName }}
              </el-tag>
              <el-input
                v-if="row.inputVisible"
                ref="saveTagInput"
                v-model="row.inputValue"
                class="input-new-tag"
                size="small"
                @blur="handleInputConfirm(row)"
              />
              <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>
            </template>
          </el-table-column>
          <el-table-column
            header-align="center"
            align="center"
            prop="prop"
            label="操作"
          >
            <template slot-scope="{row,$index}">
              <el-button size="mini" plain @click="deleteAttrLlstItem($index)"> 删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import { reqSpuInfo, reqTradeMarkList, reqSpuImageList, reqBaseSaleAttrList, reqAddOrUpdateSpu } from '@/api/product/spu'
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
    },
    // 添加销售属性
    addAttr() {
      // console.log('添加销售属性')
      const [baseSaleAttrId, saleAttrName] = this.attrIdAndAttrName.split(':')
      const newSaleAttr = { baseSaleAttrId, saleAttrName, spuSaleAttrList: [] }
      this.spu.spuSaleAttrList.push(newSaleAttr)
      this.attrIdAndAttrName = ''
    },
    // tag添加按钮
    addSaleAttrValue(row) {
      // console.log('tag添加按钮', row)
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
    },
    // 失去焦点触发
    handleInputConfirm(row) {
      console.log('失去焦点触发', row)
      const { baseSaleAttrId, inputValue } = row
      if (inputValue.trim() === '') {
        this.$mseeage('属性值不能为空')
        return
      }
      const result = row.spuSaleAttrValueList.every(item =>
        item.saleAttrValueName != inputValue
      )
      if (!result) {
        return
      }
      const newSaleAttrValue = {
        baseSaleAttrId, saleAttrValueName: inputValue
      }
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.inputVisible = false
    },
    deleteAttrLlstItem($index) {
      this.spu.spuSaleAttrList.splice($index, 1)
    },
    // 修改信息保存发送请求
    addOrUpdateSpu() {
      console.log('修改信息保存发送请求')
      this.spu.spuImageList = this.spuImageList.map((item) => {
        return {
          imageName: item.name,
          imageUrl: (item.response && item.response.data) || item.url
        }
      })
      console.log('🚀 ~ this.spu.spuImageList=this.spuImageList.map ~  this.spu.spuImageList :', this.spu.spuImageList)
      reqAddOrUpdateSpu(this.spu).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
          this.$emit('showOne', { scene: 1, flag: this.spu.id ? '修改' : '添加' })
        }
      })
    },
    // 父组件点击添加SPU,发送请求的函数
    addSpuData(category3Id) {
      console.log('addSpuData')
      this.spu.category3Id = category3Id
      reqTradeMarkList().then(res => {
        console.log(res)
        if (res.code === 200) {
          this.tradeMarkList = res.data
        }
      })
      reqBaseSaleAttrList().then(res => {
        console.log(res)
        if (res.code === 200) {
          this.saleAttrList = res.data
        }
      })
    },
    cancel() {
      this.$emit('showOne', { screen: 1, flag: '' })
      Object.assign(this._data, this.$options.data())
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
