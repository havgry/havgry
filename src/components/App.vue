<template>
  <div>
    <nav>
      <ul>
        <li>I think <router-link :to="{ name: 'ideas' }">ideas</router-link></li>
        <li>, I design <router-link :to="{ name: 'prototypes' }">prototypes</router-link></li>
        <li>, and I write <router-link :to="{ name: 'code' }">code</router-link></li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">

@import '~normalize.css/normalize.css';
@import url('https://fonts.googleapis.com/css?family=PT+Sans|PT+Serif');

[v-cloak] {
  display: none !important;
}

* {
  box-sizing: border-box;
}

body {
  font-family: 'PT Sans', sans-serif;
  line-height: 1.4;
  margin: 4vw 6vw;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

nav {
  font-size: 5vw;
  font-family: 'PT Serif', serif;
}

a {
  color: inherit;
  text-decoration: none;
  border: 0.04em solid transparent;
  padding: 0 0.1em;
  margin: 0 -0.14em;
  border-bottom: 0.04em solid;
}

@mixin linkColor($color) {
  border-bottom-color: $color;
  &:hover {
    border-color: $color;
  }
}

[href*='ideas'] {
  @include linkColor(#21d279);
}

[href*='prototypes'] {
  @include linkColor(#ea3a76);
}

[href*='code'] {
  @include linkColor(#03a9f4);
}

</style>
