<template>
  <div class="dashboard-container">
    <card />
    <sale style="margin-top: 20px;" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import card from '@/views/dashboard/card/card.vue'
import sale from '@/views/dashboard/sale/sale.vue'
export default {
  name: 'Dashboard',
  components: {
    card,
    sale
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
