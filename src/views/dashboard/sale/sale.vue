<template>
  <div class="sale">
    <el-card>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="销售额" name="first">
          <h2>销售额</h2>
          <el-row :gutter="20">
            <el-col :span="18"><div ref="one" style="width: 1200px;height: 500px" /></el-col>
            <el-col :span="6">
              <h2>门店销售额排名</h2>
              <div v-for="item in 7" :key="item" class="rightOne" style="display: flex;justify-content: space-around;padding: 19px">
                <div><span>11</span> 肯德基</div>
                <div>123456</div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="访问量" name="second">
          <h2>访问量</h2>
          <el-row :gutter="20">
            <el-col :span="18"><div ref="two" style="width: 1200px;height: 500px" /></el-col>
            <el-col :span="6">
              <h2>门店访问量排名</h2>
              <div v-for="item in 7" :key="item" class="rightTwo" style="display: flex;justify-content: space-around;padding: 19px">
                <div><span>11</span> 肯德基</div>
                <div>123456</div>
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>

  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Sale',
  data() {
    return {
      activeName: 'first'
    }
  },
  mounted() {
    const One = echarts.init(this.$refs.one)
    const Two = echarts.init(this.$refs.two)

    One.setOption({
      xAxis: {
        // show: false,
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        // show: false,
        type: 'value'
      },
      series: [
        {
          data: [10, 70, 150, 180, 270, 101, 120],
          type: 'bar',
          //   color: '#64d9d6',
          colorBy: 'data',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    })
    Two.setOption({
      xAxis: {
        // show: false,
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        // show: false,
        type: 'value'
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: 'bar',
          //   color: '#64d9d6',
          colorBy: 'data',
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)'
          }
        }
      ]
    })
  }

}
</script>

    <style lang="scss" scoped>

    </style>
