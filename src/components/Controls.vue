<template>
  <div class="controls">
    <div class="grid">
      <custom-button
        v-for="btn in controls"
        :btn="btn"
        :key="btn"
        :handle-btn="handleBtn"
      ></custom-button>
    </div>
  </div>
</template>

<script>
import CustomButton from '@/components/CustomButton.vue'

export default {
  components: { CustomButton },
  props: {
    controls: {
      type: Array,
      required: true,
    },
    handleBtn: {
      type: Function,
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
