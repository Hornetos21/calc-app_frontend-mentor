<template>
  <div class="wrapper-display">
    <input class="display" type="text" v-model="calc.display" placeholder="0" />
    <span class="history">{{ calc.history }}</span>
  </div>
</template>

<script>
export default {
  props: {
    calc: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.wrapper-display {
  position: relative;
  margin-bottom: 24px;
}
.display {
  height: clamp(88px, 10vw, 130px);
  font-size: clamp(38px, 5vw, 55px);
  padding: 26px;
  color: var(--title);
  background: var(--screen-bg);
  border-radius: 10px;
  width: 100%;

  border: none;
  text-align: end;
  font-family: inherit;
  pointer-events: none;
  &::placeholder {
    font-size: inherit;
    color: var(--title);
    opacity: 1;
  }
}
.history {
  color: var(--title);
  position: absolute;
  text-align: center;
  left: 0;
  right: 0;
  bottom: 5px;
  opacity: 0.6;
  &--test {
    position: absolute;
    left: 5px;
    bottom: 0;
  }
}
</style>
