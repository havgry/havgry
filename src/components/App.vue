<template>
  <div>
    <nav :class="{ page: !isHome }">
      <ul :class="{ 'is-hovering': isHoveringLink }">
        <template v-for="page in pages">
          <router-link tag="li" :to="{ name: page.name }" :page-name="page.name" :key="page.name">
            <span class="prefix" v-if="page.prefix" v-text="page.prefix"/>
            <span class="content-container">
              {{ page.namePrefix }} <span @mouseover="linkMouseOver" @mouseout="linkMouseOut"><a class="main-link">{{ page.name }}</a></span>
              <transition name="fade">
                <div class="content" v-if="page.name === routeName">
                  <p v-for="paragraph in page.paragraphs" v-html="paragraph" :key="paragraph"/>
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
import pages from '../content/pages'

export default {
  name: 'app',
  data: () => ({
    pages,
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

@import '../scss/index';

</style>
