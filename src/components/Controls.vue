<template>
  <div class="controls">
    <div class="grid">
      <custom-button
        :name="btn.type"
        v-for="btn in buttons"
        :key="btn.text"
        @click="handle(btn)"
        :class="{
          'btn--reset': btn.text === 'RESET' || btn.text === 'DEL',
          'btn--equally': btn.text === '=',
        }"
      >
        {{ btn.text }}
      </custom-button>
    </div>
  </div>
</template>

<script>
import CustomButton from '@/components/UI/CustomButton.vue'

export default {
  components: { CustomButton },
  props: {
    buttons: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handle(btn) {
      switch (btn.type) {
        case 'operator':
          return this.$emit('operator', btn)
        case 'reset':
          return this.$emit('reset')
        case 'delete':
          return this.$emit('delete')
        case 'equally':
          return this.$emit('equally')
        default:
          return this.$emit('digit', btn)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.controls {
  background-color: var(--toggle-keypad-bg);
  border-radius: 10px;
  padding: 7% 7% 9%;

  & .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: clamp(13px, 5%, 24px);
    row-gap: clamp(17px, 4vw, 28px);
  }
}

@media (min-width: 1440px) {
  .controls {
    padding: 6% 6% 7%;
  }
}
</style>
