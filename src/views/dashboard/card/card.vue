<template>
  <div class="Card">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card shadow="always">
          <detail title="总销售额" count="122" price="4000">
            <template v-slot:charts>
              <div ref="Line1" style="width: 280px;height: 200px;" />
            </template>
            <template v-slot:price>
              <div> 日销售额</div>
            </template>
          </detail>
        </el-card>

      </el-col>
      <el-col :span="6"><div class="grid-content bg-purple">
        <el-card shadow="always">
          <detail title="访问量" count="14" price="3000">
            <template v-slot:charts>
              <div ref="Line2" style="width: 280px;height: 200px; " />
            </template>
            <template v-slot:price>
              <div> 日访问量</div>
            </template>
          </detail>
        </el-card>

      </div></el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <detail title="支付笔数" count="1245" price="2000">
            <template v-slot:charts>
              <div ref="Line3" style="width: 280px;height: 200px;" />
            </template>
            <template v-slot:price>
              <div> 转换率</div>
            </template>
          </detail>
        </el-card>

      </el-col>
      <el-col :span="6">
        <el-card shadow="always">
          <detail title="运营效果" count="78%" price="1000">
            <template v-slot:charts>
              <div ref="Line4" style="width: 320px;height: 200px;" />
            </template>
            <template v-slot:price>
              <div> 周同比 56.67% 日同比 19.96%</div>
            </template>
          </detail>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import detail from '@/views/dashboard/card/detail/detail.vue'
import * as echarts from 'echarts'
export default {
  name: 'Card',
  components: {
    detail
  },
  data() {
    return {

    }
  },
  mounted() {
    const a = echarts.init(this.$refs.Line1)
    const b = echarts.init(this.$refs.Line2)
    const c = echarts.init(this.$refs.Line3)
    const d = echarts.init(this.$refs.Line4)
    a.setOption({
      xAxis: {
        show: false,
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        show: false,
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
    b.setOption({
      xAxis: {
        show: false,
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value',
        show: false
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          color: '#64d9d6',
          itemStyle: {
            opacity: 0
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#64d9d6' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#fff' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ]
    })
    c.setOption({
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {},
          color: '#64d9d6'
        }
      ]
    })
    d.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
      },
      legend: {
        data: ['降水量', '温度']
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: [
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
          ]
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '降水量',
          min: 0,
          max: 250,
          position: 'right',
          axisLabel: {
            formatter: '{value} ml'
          }
        },
        {
          type: 'value',
          name: '温度',
          min: 0,
          max: 25,
          position: 'left',
          axisLabel: {
            formatter: '{value} °C'
          }
        }
      ],
      series: [
        {
          color: '#64d9d6',
          name: '降水量',
          type: 'bar',
          yAxisIndex: 0,
          data: [6, 32, 70, 86, 68.7, 100.7, 125.6, 112.2, 78.7, 48.8, 36.0, 19.3],
          areaStyle: {
            normal: { opacity: 0.8 }
          }
        },
        {
          name: '温度',
          type: 'line',
          smooth: true,
          yAxisIndex: 1,
          data: [
            6.0,
            10.2,
            10.3,
            11.5,
            10.3,
            13.2,
            14.3,
            16.4,
            18.0,
            16.5,
            12.0,
            5.2
          ]
        }
      ]
    })
  }
}
</script>

  <style lang="scss" scoped>

  </style>
