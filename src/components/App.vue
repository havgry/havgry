<template>
  <div>
    <nav :class="{ page: !isHome }">
      <ul :class="{ 'is-hovering': isHoveringLink }">
        <router-link tag="li" :to="{ name: 'ideas' }">
          <span class="content-container">
            I think <span @mouseover="linkMouseOver" @mouseout="linkMouseOut"><a class="main-link">ideas</a></span>
            <div class="content" v-if="routeName === 'ideas'">
              <p>Ideas description.</p>
              <router-link :to="{ name: 'home' }" v-if="!isHome">&larr; Back</router-link>
            </div>
          </span>
        </router-link>
        <router-link tag="li" :to="{ name: 'prototypes' }">
          <span class="punctuation">, </span>
          <span class="content-container">
            I design <span @mouseover="linkMouseOver" @mouseout="linkMouseOut"><a class="main-link">prototypes</a></span>
            <div class="content" v-if="routeName === 'prototypes'">
              <p>Prototypes description.</p>
              <router-link :to="{ name: 'home' }" v-if="!isHome">&larr; Back</router-link>
            </div>
          </span>
        </router-link>
        <router-link tag="li" :to="{ name: 'code' }">
          <span class="punctuation">, and </span>
          <span class="content-container">
            I write <span @mouseover="linkMouseOver" @mouseout="linkMouseOut"><a class="main-link">code</a></span>
            <div class="content" v-if="routeName === 'code'">
              <p>Code description.</p>
              <router-link :to="{ name: 'home' }" v-if="!isHome">&larr; Back</router-link>
            </div>
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
      isHome: state => state.route.meta.home,
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
}

.main-link {
  .is-hovering & {
    border-bottom-color: transparent;
  }
  .router-link-active & {
    color: #fff;
    pointer-events: none;
  }
}

@mixin linkColor($color) {
  border-bottom-color: $color;
  .router-link-active &,
  &:hover {
    border-color: $color;
  }
  .router-link-active & {
    background: $color;
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
