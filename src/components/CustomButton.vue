<template>
  <button
    @click="handleBtn"
    class="btn"
    :class="{
      'btn--reset': btn === 'RESET' || btn === 'DEL',
      'btn--equally': btn === '=',
    }"
  >
    <div>{{ btn }}</div>
  </button>
</template>

<script>
export default {
  // data() {
  //   return {
  //     operator: '',
  //   }
  // },
  // methods: {},
  props: {
    btn: {
      type: String,
      required: true,
    },
    handleBtn: {
      type: Function,
    },
  },
}
</script>

<style lang="scss" scoped>
.btn {
  font-family: inherit;
  font-size: clamp(32px, 4vw, 40px);
  color: var(--text);
  border: none;
  height: 60px;
  box-shadow: 0 4px var(--key-shadow);
  background-color: var(--key);
  border-radius: 4px;
  cursor: pointer;
  div {
    margin-top: 6px;
  }
  &:hover {
    background-color: var(--key-hover);
  }
  &:nth-child(17) {
    grid-column: 1/3;
  }
  &:nth-child(18) {
    grid-column: 3/5;
  }
  &--reset {
    font-size: 20px;
    color: var(--reset-del-text);
    background-color: var(--key-reset-del);
    box-shadow: 0 4px var(--key-reset-del-shadow);
    &:hover {
      background-color: var(--key-reset-del-hover);
    }
  }
  &--equally {
    font-size: 18px;
    background-color: var(--key-equally-toggle);
    box-shadow: 0 4px var(--key-equally-toggle-shadow);
    color: var(--equally-text);
    &:hover {
      background-color: var(--key-equally-toggle-hover);
    }
  }
}
@media (min-width: 1440px) {
  .btn {
    border-radius: 10px;
    //font-size: 40px;
    &--reset,
    &--equally {
      font-size: 28px;
    }
  }
}
</style>
