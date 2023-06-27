<script setup>
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import Display from '@/components/Display.vue'
import Controls from '@/components/Controls.vue'
</script>

<template>
  <header>
    <h1>calc</h1>
    <div class="wrapper">
      <p>THEME</p>
      <theme-switcher />
    </div>
  </header>

  <main>
    <display />
    <controls :controls="controls" />
  </main>
</template>

<script>
export default {
  data() {
    return {
      controls: [
        '7',
        '8',
        '9',
        'DEL',
        '4',
        '5',
        '6',
        '+',
        '1',
        '2',
        '3',
        '-',
        '.',
        '0',
        '/',
        'x',
        'RESET',
        '=',
      ],
    }
  },
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  line-height: 1.5;
  margin-bottom: 32px;
  color: var(--title);
  & h1 {
    margin-left: 8px;
  }
  & .wrapper {
    display: flex;
    gap: 30px;
    align-self: flex-end;
    & p {
      line-height: 1.7;
    }
  }
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>