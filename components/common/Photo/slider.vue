<template>
  <div class="slider__container">
    <div ref="sliderWrapper" class="slider__wrapper">
      <div v-for="(image, i) in images" :key="i" class="img__wrapper">
        <img ref="image" :src="image.url" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    images: {
      type: Array,
      default: null,
    },
  },
  mounted() {
    this.pageWidth = window.innerWidth

    // Wait images loaded
    setTimeout(() => {
      this.offsetFirstImage()
    }, 200)
  },
  methods: {
    offsetFirstImage() {
      console.log(this.$refs.image[1].getBoundingClientRect())
      const firstImageBounds = this.$refs.image[0].getBoundingClientRect()
      const imageMiddleX = firstImageBounds.x + firstImageBounds.width / 2
      const screenMiddleX = this.pageWidth / 2
      console.log(firstImageBounds.width)

      const offset = screenMiddleX - imageMiddleX
      this.$refs.sliderWrapper.style.transform = `translateX(${offset}px)`
      this.$refs.image[0].style.opacity = 1
    },
  },
}
</script>

<style lang="scss">
.slider__container {
  margin-top: vw(100);
  width: 100%;
  height: 70vh;
  overflow: hidden;

  .slider__wrapper {
    width: 90%;
    height: 100%;
    display: flex;

    overflow: hidden;

    .img__wrapper {
      margin: 0 vw(8);
      img {
        height: 100%;
        width: auto;
        opacity: 0.5;
      }
    }
  }
}
</style>
