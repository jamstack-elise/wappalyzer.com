<template>
  <v-tooltip
    v-model="tour[step]"
    class="qux"
    min-width="300"
    max-width="300"
    top
  >
    <template v-slot:activator="{ on }">
      <div :class="`tour-item${tour[step] ? ' tour-item--active' : ''}`">
        <slot />
      </div>
    </template>

    <v-row>
      <v-col class="subtitle-2"
        ><small>Step {{ step + 1 }} of {{ steps }}</small></v-col
      >
      <v-col class="text-right" style="margin-right: -8px">
        <v-btn small icon @click="$emit('nav', 'close')">
          <v-icon small color="white">{{ mdiClose }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <p class="my-3">
      {{ text }}
    </p>

    <v-row>
      <v-col class="px-0">
        <v-btn
          v-if="step > 0"
          color="white"
          small
          text
          @click="$emit('nav', 'previous')"
        >
          <v-icon color="white" small left>{{ mdiChevronLeft }}</v-icon>
          Previous
        </v-btn>
      </v-col>

      <v-spacer />

      <v-col class="px-0 flex-grow-0">
        <template v-if="step < steps - 1">
          <v-btn color="white" small text @click="$emit('nav', 'next')">
            Next
            <v-icon color="white" small right>{{ mdiChevronRight }}</v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-btn color="white" small text @click="$emit('nav', 'close')">
            End tour
          </v-btn>
        </template>
      </v-col>
    </v-row>
  </v-tooltip>
</template>

<script>
import { mdiClose, mdiChevronLeft, mdiChevronRight } from '@mdi/js'

export default {
  props: {
    step: {
      type: Number,
    },
    steps: {
      type: Number,
    },
    activeStep: {
      type: Number,
    },
    text: {
      type: String,
    },
  },
  data() {
    return { mdiClose, mdiChevronLeft, mdiChevronRight }
  },
  computed: {
    tour() {
      return {
        [this.activeStep]: true,
      }
    },
  },
}
</script>

<style>
.tour-item {
  width: 100%;
}

.tour-item--active {
  position: relative;
}

.tour-item--active:before {
  content: '';
  background: #4608ad;
  opacity: 0.03;
  border-radius: 2px;
  position: absolute;
  top: -5px;
  left: -5px;
  bottom: -5px;
  right: -5px;
}

.tour-item--active:after {
  content: '';
  outline: 2px solid #4608ad;
  border-radius: 2px;
  position: absolute;
  top: -5px;
  left: -5px;
  bottom: -5px;
  right: -5px;
  pointer-events: none;
  z-index: 5;
}

.v-tooltip__content {
  pointer-events: auto;
}
</style>
