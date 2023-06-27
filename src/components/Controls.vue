<template>
  <div class="controls">
    <div class="grid">
      <custom-button :btn="btn" v-for="btn in controls"></custom-button>
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
  },
}
</script>

<style lang="scss" scoped>
.controls {
  background-color: var(--toggle-keypad-bg);
  height: 420px;
  //min-width: 327px;
  border-radius: 10px;
  padding: 24px;
  & .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    column-gap: clamp(13px, 4%, 24px);
    row-gap: clamp(17px, 4vw, 28px);
  }
}
</style>
