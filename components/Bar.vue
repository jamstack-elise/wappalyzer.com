<template>
  <v-sheet class="bar" color="primary lighten-1" rounded>
    <span class="bar__value bar__value--background"></span>
    <v-sheet
      :width="`${(100 / Math.max(1, max)) * value}%`"
      color="primary"
      class="bar__span white--text"
      height="14"
      rounded
    >
      <span class="bar__value bar__value--foreground" data-nosnippet></span>
    </v-sheet>

    <span class="bar__label">{{ percentage }}%</span>
  </v-sheet>
</template>

<script>
export default {
  props: {
    total: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 1,
    },
    value: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    percentage() {
      const percentage = (100 / Math.max(1, this.total)) * this.value

      return percentage.toFixed(
        percentage <= 0.9 ? (percentage <= 0.09 ? 2 : 1) : 0
      )
    },
  },
}
</script>

<style>
.bar {
  position: relative;
}

.bar__value {
  white-space: nowrap;
  position: absolute;
  left: 0;
  top: 0;
}

.bar__span {
  overflow: hidden;
  position: relative;
}

.bar__label {
  color: #fff;
  position: absolute;
  font-size: 0.6rem;
  line-height: 13px;
  left: 2px;
  top: 0;
  text-shadow: 0 1px 0 #4608ad;
}
</style>
