<template>
  <div class="container">
    <Nuxt v-if="checkedMotion" ref="page" />
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

import Controls from '~/components/Controls'
import emitter from '~/utils/EventEmitter'

export default {
  data() {
    return {
      checkedMotion: false,
    }
  },
  computed: {
    ...mapGetters(['isMobile', 'isTablet', 'isTouch']),
    ...mapState(['reducedMotion']),
  },
  mounted() {
    this.checkMobile()
    this.checkTablet()
    this.checkMotion().then(() => {
      this.checkedMotion = true
      console.log('reduced motion =', this.reducedMotion)
      console.log('isMobile =', this.isMobile)
      console.log('isTablet =', this.isTablet)
      console.log('isTouch =', this.isTouch)

      this.init()
    })
  },
  methods: {
    ...mapActions(['checkMobile', 'checkTablet', 'checkMotion']),
    init() {
      emitter.on('PAGE:MOUNTED', () => {
        this.pageAnimateIn()
      })
      this.update()
      this.setControls()
    },
    update() {
      if (this.$refs.page && this.$refs.page.$children[0]) {
        this.$refs.page.$children[0].update && this.$refs.page.$children[0].update()
      }

      window.requestAnimationFrame(this.update)
    },
    setControls() {
      this.controls = new Controls()
    },

    pageAnimateIn() {
      console.log('page animate in')
      // Toggle controls
      if (this.$route.name === 'index') {
        this.controls.init()
      } else {
        this.controls.destroy()
      }
    },
  },
}
</script>

<style lang="scss"></style>
