<template>
  <div class="essai4">
    <div class="info">Essai4</div>
    <div ref="wrapper" class="wrapper">
      <article v-for="n in 7" ref="article" :key="n" class="article">
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
    }
  },
  mounted() {
    this.pageWidth = window.innerWidth
    this.initTitle()
    this.scrollAnim()
  },
  methods: {
    scrollAnim() {
      const ribbonWidth = Math.ceil(
        this.$refs.titleWrapper[0].getBoundingClientRect().width
      )
      const titlesOffsetIn = 3
      // Change vertical scroll to horizontal
      window.addEventListener('scroll', () => {
        this.$refs.wrapper.scroll(window.scrollY, 0)
        this.$refs.article.forEach((articleEl, i) => {
          const articlePosition = articleEl.getBoundingClientRect()

          const distArticleTitle =
            articlePosition.x -
            this.$refs.titleWrapper[i].getBoundingClientRect().x
          // Fix title at left
          if (articlePosition.x < 0) {
            this.$refs.titleWrapper[i].style.position = 'fixed'
            this.$refs.titleWrapper[i].style.left = 0
          } else if (
            articlePosition.x <
            this.pageWidth - ribbonWidth * titlesOffsetIn
          ) {
            // Dans la page
            this.$refs.titleWrapper[i].style.position = 'absolute'
            this.$refs.titleWrapper[i].style.left = 'unset'
            this.$refs.titleWrapper[i].style.right = 'unset'
          } else if (
            articlePosition.x >
            this.pageWidth - ribbonWidth * titlesOffsetIn
          ) {
            // Hors de la pge
            console.log('outside')
            this.$refs.titleWrapper[i].style.transform = `translateX(${
              distArticleTitle * 0.2
            }px)`
          }
        })
      })
    },

    initTitle() {
      this.$refs.article.forEach((articleEl, i) => {
        const article = {}
        const titlesOffsetIn = 4
        article.position = articleEl.getBoundingClientRect()
        article.length = this.$refs.article.length
        // Check when article enter
        if (article.position.x < this.pageWidth) {
          // Dans la page
        } else {
          // Hors de la pge
          this.$refs.titleWrapper[i].style.position = 'fixed'
          this.$refs.titleWrapper[i].style.right = `${
            0 + (article.length - i - titlesOffsetIn) * 100
          }px`
        }
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
  }
  h2 {
    font-size: 50px;
  }

  .wrapper {
    position: fixed;
    display: flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .title__wrapper {
    width: 100px;
    height: 100%;
    background: #f4f4f4;
    position: absolute;
    border: 1px solid blue;
    h2 {
      transform: rotate(90deg) translate(0, -100%);
      width: 100vh;
      transform-origin: top left;
    }
  }

  .article__content {
    height: 100%;
    width: 60vw;
    border: 1px solid salmon;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
