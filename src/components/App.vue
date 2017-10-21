<template>
  <div>
    <nav :class="{ page: !isHome }">
      <ul :class="{ 'is-hovering': isHoveringLink }">
        <template v-for="page in pages">
          <router-link tag="li" :to="{ name: page.name }" :page-name="page.name">
            <span class="prefix" v-if="page.prefix" v-text="page.prefix"/>
            <span class="content-container">
              {{ page.namePrefix }} <span @mouseover="linkMouseOver" @mouseout="linkMouseOut"><a class="main-link">{{ page.name }}</a></span>
              <transition name="fade">
                <div class="content" v-if="page.name === routeName">
                  <p v-for="paragraph in page.paragraphs" v-html="paragraph"/>
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
        namePrefix: 'I think',
        paragraphs: [
          'I\'m particularly fond of ideas with potential to make a real impact on people\'s lives and the environment.',
        ],
      },
      {
        name: 'prototypes',
        prefix: ', ',
        namePrefix: 'I design',
        paragraphs: [
          'I find the creative process of turning ideas and concepts into working prototypes to be challenging and deeply satisfying.',
        ],
      },
      {
        name: 'code',
        prefix: ', and ',
        namePrefix: 'I write',
        paragraphs: [
          'I do frontend development, and I\'m currently pretty excited about Vue and GraphQL.',
          '<a href="https://github.com/havgry">This thingie takes you to my GitHub profile</a>.',
        ],
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
@import url('https://fonts.googleapis.com/css?family=Roboto:300');

$border-width: .05em;
$transition-speed: .2s;
$background-color: #fff;
$text-color: #111;

@mixin underline($color: currentColor, $bg-color: $background-color){
  background: linear-gradient($background-color, $background-color),
    linear-gradient($background-color, $background-color), linear-gradient($color, $color);
  background-size: .05em 1px, .05em 1px, 1px 1px;
  background-repeat: no-repeat, no-repeat, repeat-x;
  text-shadow: .03em 0 $background-color, -.03em 0 $background-color,
    0 .03em $background-color, 0 -.03em $background-color,
    .06em 0 $background-color, -.06em 0 $background-color,
    .09em 0 $background-color, -.09em 0 $background-color,
    .12em 0 $background-color, -.12em 0 $background-color,
    .15em 0 $background-color, -.15em 0 $background-color;
  background-position: 0 95%, 100% 95%, 0 95%;
}

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
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
}

body {
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  line-height: 1.4;
  margin: 4vw 6vw;
  color: #111;
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
}

a {
  color: inherit;
  text-decoration: none;
  p & {
    transition: color $transition-speed;
    &:hover {
      background: none;
    }
    &::selection {
      text-shadow: none;
    }
  }
}

::selection {
  background-color: $text-color;
  color: $background-color;
}

.main-link {
  border: $border-width solid transparent;
  border-radius: $border-width;
  padding: 0 $border-width * 2;
  margin: 0 -$border-width * 3;
  transition: border-color $transition-speed ease, background-color $transition-speed ease;
  .router-link-active & {
    color: $background-color;
    pointer-events: none;
  }
}

.back-link {
  font-size: 2em;
  font-family: 'Times New Roman', serif;
}

@mixin linkColor($color) {
  .main-link {
    color: $color;
  }
  &.router-link-active .main-link,
  .main-link:hover {
    border-color: $color;
  }
  &.router-link-active .main-link {
    color: $background-color;
    background: $color;
  }
  p a {
    @include underline($color);
    &:hover {
      color: $color;
      background: inherit;
    }
  }
}

[page-name='ideas'] {
  @include linkColor(#21d279);
}

[page-name='prototypes'] {
  @include linkColor(#ea3a76);
}

[page-name='code'] {
  @include linkColor(#00b0ff);
}

.vcard {
  font-size: 2vw;
  position: absolute;
  left: 6vw;
  bottom: 6vw;
}

</style>
