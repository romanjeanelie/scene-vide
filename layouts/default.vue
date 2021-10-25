<template>
  <div class="container">
    <Nuxt ref="page" />
  </div>
</template>

<script>
import Controls from '~/components/Controls'
import emitter from '~/assets/js/EventEmitter'

export default {
  mounted() {
    this.update()
    this.setControls()

    emitter.on('PAGE:MOUNTED', () => {
      this.pageAnimateIn()
    })
  },
  methods: {
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
