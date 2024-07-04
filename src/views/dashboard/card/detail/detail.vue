<template>
  <div class="detail">
    <div class="title">
      {{ title }}
    </div>
    <div class="count"> {{ count }}</div>
    <div>
      <slot name="charts" />
    </div>
    <div class="price" style="display: flex;">
      <slot name="price" />
      <span>{{ price }}</span>
    </div>
    <!-- <slot name="totalSales" />
    <slot name="visits" />
    <slot name="payments" />
    <slot name="performance" /> -->
  </div>
</template>

<script>

export default {
  name: 'Detail',
  props: ['title', 'count', 'price'],
  data() {
    return {

    }
  }
}
</script>

    <style lang="scss" scoped>

    </style>
