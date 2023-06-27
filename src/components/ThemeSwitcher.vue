<template>
  <div>
    <div class="wrapper">
      <input
        type="range"
        name="points"
        onchange=""
        min="1"
        step="1"
        id="custom-toggle"
        class="switcher"
        max="3"
        value="1"
      />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  .switcher {
    -webkit-appearance: none;
    appearance: none;
    background: var(--toggle-keypad-bg);
    border-radius: 20px;
    padding: 4px;
    width: 70px;
    height: 26px;
    box-shadow: 0 0 0 black;
    cursor: pointer;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      height: 18px;
      width: 18px;
      border-radius: 50%;
      background-color: var(--key-equally-toggle);
      box-shadow: 0 0 1px 1px var(--key-equally-toggle-shadow);
    }
    &::-moz-range-thumb {
      border: none;
      height: 18px;
      width: 18px;
      border-radius: 50%;
      background-color: var(--key-equally-toggle);
      box-shadow: 0 0 1px 1px var(--key-equally-toggle-shadow);
    }
  }
}
</style>
