<template>
  <div>
    <nav :class="{ page: !isHome }">
      <ul :class="{ 'is-hovering': isHoveringLink }">
        <template v-for="page in pages">
          <router-link tag="li" :to="{ name: page.name }">
            <span class="prefix" v-if="page.prefix" v-text="page.prefix"/>
            <span class="content-container">
              {{ page.text }} <span @mouseover="linkMouseOver" @mouseout="linkMouseOut"><a class="main-link">{{ page.name }}</a></span>
              <transition name="fade">
                <div class="content" v-if="page.name === routeName">
                  <p>{{ page.content }}</p>
                  <router-link class="back-link" :to="{ name: 'home' }">&larr;</router-link>
                </div>
              </transition>
            </span>
          </router-link>
        </template>
      </ul>
    </nav>
    <transition name="fade">
      <div class="vcard" v-if="isHome">
        <div class="fn">Magnus Havgry</div>
        <div clss="email">magnushavgry@gmail.com</div>
        <div class="tel">+45 509 800 80</div>
        <div class="adr">
          <span class="locality">Copenhagen</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app',
  data: () => ({
    isHoveringLink: false,
    pages: [
      {
        name: 'ideas',
        prefix: null,
        text: 'I think',
        content: 'Ideas description.',
      },
      {
        name: 'prototypes',
        prefix: ', ',
        text: 'I design',
        content: 'Prototypes description.',
      },
      {
        name: 'code',
        prefix: ', and ',
        text: 'I write',
        content: 'Code description.',
      },
    ],
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

$transition-speed: .2s;

[v-cloak] {
  display: none !important;
}

* {
  box-sizing: border-box;
}

.content-container {
  position: relative;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity $transition-speed ease;
}

.fade-enter-active {
  transition-delay: $transition-speed;
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
.router-link-active .prefix {
  opacity: 0;
  z-index: -1;
  position: relative;
  transition-delay: 0s;
}

li,
.prefix {
  // This transition is not handled by Vue as we
  // want to retain the `block` display property
  transition: opacity $transition-speed ease $transition-speed;
}

nav {
  font-size: 5vw;
  font-family: 'PT Serif', serif;
}

a {
  color: inherit;
  text-decoration: none;
}

.main-link {
  border: 0.04em solid transparent;
  padding: 0 0.1em;
  margin: 0 -0.14em;
  border-bottom: 0.04em solid;
  transition: border-color $transition-speed ease, background $transition-speed ease;
  .is-hovering & {
    border-bottom-color: transparent;
  }
  .router-link-active & {
    color: #fff;
    pointer-events: none;
  }
}

.back-link {
  font-size: 2em;
  font-family: 'Helvetica', 'Arial';
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
  @include linkColor(#00b0ff);
}

.vcard {
  font-size: 2vw;
  position: absolute;
  left: 6vw;
  bottom: 6vw;
}

</style>
