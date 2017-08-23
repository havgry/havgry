<template>
  <div>
    <nav :class="{ page: !isFront }">
      <ul :class="{ 'is-hovering': isHoveringLink }">
        <router-link tag="li" :to="{ name: 'ideas' }">
          <span class="content-container">
            I think <span @mouseover="linkMouseOver" @mouseout="linkMouseOut"><a>ideas</a></span>
            <div class="content" v-if="routeName === 'ideas'">Ideas description.</div>
          </span>
        </router-link>
        <router-link tag="li" :to="{ name: 'prototypes' }">
          <span class="punctuation">, </span>
          <span class="content-container">
            I design <span @mouseover="linkMouseOver" @mouseout="linkMouseOut"><a>prototypes</a></span>
            <div class="content" v-if="routeName === 'prototypes'">Prototypes description.</div>
          </span>
        </router-link>
        <router-link tag="li" :to="{ name: 'code' }">
          <span class="punctuation">, and </span>
          <span class="content-container">
            I write <span @mouseover="linkMouseOver" @mouseout="linkMouseOut"><a>code</a></span>
            <div class="content" v-if="routeName === 'code'">Code description.</div>
          </span>
        </router-link>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  data: () => ({
    isHoveringLink: false,
  }),
  computed: {
    ...mapState({
      title: state => state.title,
      isFront: state => state.route.meta.front,
      routeName: state => state.route.name,
    }),
  },
  methods: {
    linkMouseOver() {
      this.isHoveringLink = true
    },
    linkMouseOut() {
      this.isHoveringLink = false
    },
  },
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

.content-container {
  position: relative;
}

.content {
  width: 25em;
  position: absolute;
  margin: 1em 0;
  left: 0;
  display: block;
  font-size: 2vw;
  font-family: 'PT Sans', sans-serif;
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

.router-link-active a {
  pointer-events: none;
}

.page li:not(.router-link-active),
.router-link-active .punctuation {
  visibility: hidden;
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
  .is-hovering & {
    border-bottom-color: transparent;
  }
}

@mixin linkColor($color) {
  border-bottom-color: $color;
  .router-link-active &,
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
