<template>
  <div :class="`code${wrap ? ' code--wrap' : ''}`">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    wrap: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    this.$el.innerHTML = this.$el.innerHTML
      .replace(/("|'|`)([^"]+)(\1)/g, '$1<span class="code__value">$2</span>$3')
      .replace(
        /(": )([^\s"'`{[,]+)(,?)/g,
        '$1<span class="code__value">$2</span>$3'
      )
      .replace(/(\/\/|#) (.+)/g, '<span class="code__comment">$1 $2</span>')
  },
}
</script>

<style>
.code {
  font-size: 0.75rem;
  max-width: 100%;
  overflow-x: auto;
}

.theme--light .code {
  color: #4a4a4a;
}

.theme--dark .code {
  color: #eee;
}

.code--wrap {
  white-space: normal;
  line-height: 1.5rem;
}

.theme--light .code__comment {
  color: #999;
}

.theme--dark .code__comment {
  color: #999;
}

.code__value {
  border-radius: 3px;
  padding: 0.1rem 0.2rem;
}

.theme--light .code__value {
  background-color: #f0ebf9;
  color: #4608ad;
}

.theme--dark .code__value {
  background-color: #333;
  color: #fff;
}
</style>
