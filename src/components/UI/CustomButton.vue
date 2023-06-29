<template>
  <button class="btn"><slot></slot></button>
</template>

<script>
export default {
  // props: {
  //   btn: {
  //     type: Object,
  //     required: true,
  //   },
  //   handleBtn: {
  //     type: Function,
  //   },
  // },
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
  padding-top: 6px;

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
