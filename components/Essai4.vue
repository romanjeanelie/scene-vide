<template>
  <div class="essai4">
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
      titleWidth: 0,
      articleWidth: 0,
      titlesOffsetLeft: 5,
      borderTitleDistance: 0,
      offsetTitle: 0,
      nbTitlesOut: 0,
      wrapperPosition: 0,
    }
  },
  mounted() {
    this.pageWidth = window.innerWidth
    // Compute onResize
    this.boundingTitle()
    this.boundingArticle()
    this.boundingWrapper()
    // Compute onResize
    this.onScroll()
    this.positionTitle()
  },
  methods: {
    boundingTitle() {
      this.titleWidth = Math.ceil(
        this.$refs.titleWrapper[0].getBoundingClientRect().width
      )
      this.borderTitleDistance =
        this.pageWidth - this.titleWidth * this.titlesOffsetLeft
      this.nbTitlesOut = Math.floor(
        this.$refs.article.length - this.titlesOffsetLeft
      )
    },
    boundingArticle() {
      this.articleWidth = Math.ceil(
        this.$refs.article[0].getBoundingClientRect().width
      )
    },
    boundingWrapper() {
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
      const ratioArticleVisible =
        this.$refs.wrapper.scrollLeft / this.articleWidth

      // Compute offset title
      this.offsetTitle = ratioArticleVisible * this.titleWidth
    },
    initPositionTitle(articleEl, i) {
      // Specific varaibles
      const articlePosition = articleEl.getBoundingClientRect()
      const rightPositionTitle =
        (this.$refs.article.length - i - this.nbTitlesOut) * this.titleWidth

      if (articlePosition.x > this.borderTitleDistance) {
        // Article outside RIGHT
        this.$refs.titleWrapper[i].style.position = 'fixed'
        this.$refs.titleWrapper[i].style.right = `${rightPositionTitle}px`
      }
    },
    positionTitle() {
      this.$refs.article.forEach((articleEl, i) => {
        this.initPositionTitle(articleEl, i)

        // Position fix titles
        const rightPositionTitle =
          (this.$refs.article.length - i - this.nbTitlesOut) * this.titleWidth

        window.addEventListener('scroll', () => {
          const articlePosition = articleEl.getBoundingClientRect()
          if (articlePosition.x < this.wrapperPosition.x) {
            // Article outside LEFT
            this.$refs.titleWrapper[i].style.position = 'fixed'
            this.$refs.titleWrapper[
              i
            ].style.left = `${this.wrapperPosition.x}px`
          } else if (articlePosition.x < this.borderTitleDistance) {
            // Article inside
            this.$refs.titleWrapper[i].style.transform = `translateX(0px)`
            this.$refs.titleWrapper[i].style.position = 'absolute'
            this.$refs.titleWrapper[i].style.left = 'unset'
            this.$refs.titleWrapper[i].style.right = 'unset'
          } else if (articlePosition.x > this.borderTitleDistance) {
            // Article outside RIGHT
            this.$refs.titleWrapper[i].style.position = 'fixed'
            this.$refs.titleWrapper[i].style.right = `${
              0 + rightPositionTitle
            }px`
            this.$refs.titleWrapper[
              i
            ].style.transform = `translateX(-${this.offsetTitle}px)`
          }
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
/* https://codepen.io/GreenSock/pen/9e7bf431223f98516c0431cfdefb6e3f */
.essai4 {
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
    display: flex;
    left: 0;
    width: 40vw;
    height: 100vh;
    overflow: hidden;
    img {
      height: 100%;
      width: 40vw;
    }
  }
  .wrapper {
    position: fixed;
    display: flex;
    margin-left: 40vw;
    width: calc(100vw - 40vw);
    height: 100vh;
    overflow: hidden;
    box-shadow: -16px 1px 28px 2px rgba(0, 0, 0, 0.36);
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
    height: 100%;
    width: 40vw;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
