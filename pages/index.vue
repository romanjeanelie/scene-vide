<template>
  <div>
    <div class="info">Essai4</div>
    <div ref="imgWrapper" class="img__wrapper">
      <img
        v-for="n in 10"
        ref="image"
        :key="n"
        :src="`https://picsum.photos/id/${n}37/850/1200`"
        alt=""
      />
    </div>
    <div ref="wrapper" class="wrapper">
      <article v-for="n in 10" ref="article" :key="n" class="article">
        <div ref="titleWrapper" class="title__wrapper">
          <h2>TITRE {{ n }}</h2>
        </div>

        <div class="article__content">
          <p>Article {{ n }}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageWidth: 0,
      scrollValue: 0,

      // Bounds
      titleWidth: 0,
      borderTitleDistance: null,
      articleWidth: 0,
      imageWapperPosition: 0,
      wrapperPosition: 0,
      wrapperWidthWithoutTitle: 0,
      articleInWrapper: 0,
      ratioArticleVisible: 0,
      ratioSecondArticleVisible: 0,
      ratioTitleVisible: 0,

      // Titles variables
      titlesOffsetLeft: 5,
      offsetTitle: 0,
      nbTitlesOut: 0,
    }
  },
  mounted() {
    this.pageWidth = document.body.scrollWidth

    // Compute onResize
    this.computeBounds()

    this.onScroll()
    this.positionTitle()
  },
  methods: {
    computeBounds() {
      // Bounding title
      this.titleWidth = this.$refs.titleWrapper[0].getBoundingClientRect().width

      this.borderTitleDistance =
        this.pageWidth - this.titleWidth * (this.titlesOffsetLeft - 1)

      // Compute titles outside of the page
      this.nbTitlesOut = Math.floor(
        this.$refs.article.length - this.titlesOffsetLeft
      )

      this.ratioTitleVisible =
        (this.titleWidth * this.titlesOffsetLeft) / this.pageWidth

      // Bounding Article
      this.articleWidth = Math.ceil(
        this.$refs.article[0].getBoundingClientRect().width
      )

      // Bounding Image
      this.imageWapperPosition = this.$refs.imgWrapper.getBoundingClientRect()

      // Bounding Wrapper
      this.wrapperPosition = this.$refs.wrapper.getBoundingClientRect()
    },

    onScroll() {
      this.scrollValue = 0

      window.addEventListener('scroll', () => {
        // Change vertical scroll to horizontal
        this.$refs.wrapper.scroll(window.scrollY, 0)
        this.$refs.imgWrapper.scroll(window.scrollY, 0)

        this.getScroll()
        this.getOffsetTitle()
      })
    },
    getScroll() {
      // Get scroll normalized
      this.scrollValue =
        Math.floor(
          (this.$refs.wrapper.scrollLeft /
            (this.$refs.wrapper.scrollWidth - this.$refs.wrapper.clientWidth)) *
            1000
        ) / 1000
    },
    getOffsetTitle() {
      // Rapport scroll / article width
      this.ratioArticleVisible =
        this.$refs.wrapper.scrollLeft / this.articleWidth

      this.ratioSecondArticleVisible =
        this.articleInWrapper - (1 - this.ratioArticleVisible)

      // Compute offset title
      this.offsetTitle = this.ratioArticleVisible * this.titleWidth
    },
    initPositionTitle() {
      this.$refs.article.forEach((articleEl, i) => {
        // Specific varaibles
        const articlePosition = articleEl.getBoundingClientRect()
        const rightPositionTitle =
          (this.$refs.article.length - i - this.nbTitlesOut) * this.titleWidth

        if (articlePosition.x > this.borderTitleDistance) {
          // Article outside RIGHT
          this.$refs.titleWrapper[i].style.position = 'fixed'
          this.$refs.titleWrapper[i].style.right = `${rightPositionTitle}px`
          if (!this.borderTitleDistance) {
            this.borderTitleDistance =
              this.$refs.titleWrapper[i].getBoundingClientRect().x
          }
        }
      })
    },
    positionTitle() {
      this.initPositionTitle()

      /**
       * Compute wrapper after positioning titles
       */
      this.wrapperWidthWithoutTitle =
        this.borderTitleDistance - this.imageWapperPosition.width

      this.articleInWrapper = this.wrapperWidthWithoutTitle / this.articleWidth

      /**
       * Position titles onScroll
       */
      this.$refs.article.forEach((articleEl, i) => {
        // Position fix titles
        const rightPositionTitle =
          (this.$refs.article.length - i - this.nbTitlesOut) * this.titleWidth

        window.addEventListener('scroll', () => {
          // console.log('ratio title', this.ratioTitleVisible)
          if (this.ratioArticleVisible > i) {
            // Article outside LEFT
            this.$refs.titleWrapper[i].style.position = 'fixed'
            this.$refs.titleWrapper[
              i
            ].style.left = `${this.wrapperPosition.x}px`
          } else if (i > this.ratioSecondArticleVisible + 1) {
            // Article outside RIGHT

            this.$refs.titleWrapper[i].style.position = 'fixed'
            this.$refs.titleWrapper[i].style.right = `${
              0 + rightPositionTitle
            }px`
            this.$refs.titleWrapper[
              i
            ].style.transform = `translateX(-${this.offsetTitle}px)`
          } else {
            // Article inside
            this.$refs.titleWrapper[i].style.transform = `translateX(0px)`
            this.$refs.titleWrapper[i].style.position = 'absolute'
            this.$refs.titleWrapper[i].style.left = 'unset'
            this.$refs.titleWrapper[i].style.right = 'unset'
          }
        })
      })
    },
  },
}
</script>

<style lang="scss">
/* https://codepen.io/GreenSock/pen/9e7bf431223f98516c0431cfdefb6e3f */
$image-width: 40vw;

.info {
  position: fixed;
  top: 0;
  left: 0;
  padding: 16px;
  font-size: 16px;
  z-index: 10;
  display: none;
}

.img__wrapper {
  position: fixed;
  left: 0;
  width: $image-width;
  height: 100vh;
  display: flex;
  overflow: hidden;

  scroll-snap-type: x mandatory;

  img {
    flex-grow: 1;
    flex-shrink: 0;
    height: auto;
    width: $image-width;

    /* scroll-snap-align: proxi; */
  }
}
.wrapper {
  position: fixed;
  display: flex;
  margin-left: $image-width;
  width: calc(100vw - $image-width);
  height: 100vh;
  overflow: hidden;
  box-shadow: -16px 1px 28px 2px rgba(0, 0, 0, 0.36);

  scroll-snap-type: x mandatory;
}
.title__wrapper {
  width: 3vw;
  height: 100%;
  background: #fbfaf5;
  position: absolute;
  border-left: 1px solid black;
  h2 {
    font-size: 25px;
    transform: rotate(90deg) translate(0, -100%);
    width: 100vh;
    transform-origin: top left;
    margin-left: 16px;
    margin-top: 8px;
  }
}

.article__content {
  /* scroll-snap-align: x proximity; */

  height: 100%;
  width: 40vw;
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid lightgrey;
}
</style>
