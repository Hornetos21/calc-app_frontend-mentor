<template>
  <input class="display" type="text" v-model="calc.digitA" placeholder="0" />
</template>

<script>
export default {
  props: {
    calc: {
      digitA: {
        type: String,
      },
      digitB: {
        type: String,
      },
      operator: {
        type: String,
      },
      flagOperator: {
        type: Boolean,
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.display {
  font-size: clamp(38px, 5vw, 55px);
  color: var(--title);
  height: clamp(88px, 10vw, 130px);
  background: var(--screen-bg);
  border-radius: 10px;
  padding: 26px;
  margin-bottom: 24px;

  width: 100%;
  border: none;
  text-align: end;
  font-family: inherit;
  pointer-events: none;
  &::placeholder {
    color: var(--title);
  }
}
</style>
