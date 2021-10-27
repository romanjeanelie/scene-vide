<template>
  <div class="home__container">
    <section ref="imageContainer" class="image__container">
      <div v-for="n in 10" :key="n" class="image__wrapper">
        <div ref="image" class="image">
          <img :src="`https://picsum.photos/id/${n}37/850/1200`" />
        </div>
      </div>
    </section>

    <section ref="articleContainer" class="articles__container">
      <div v-for="n in 10" :key="n" ref="articleWrapper" class="article__wrapper">
        <div ref="article" class="article">
          <div ref="titleWrapper" class="title__wrapper">
            <div ref="titleBg" class="title__bg"></div>
            <div ref="titleBorder" class="title__border"></div>
            <h2 ref="title">Le théâtre polonais</h2>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scroll: { value: 0, eased: 0 },

      // Title
      nbTitlesOut: null,
      titlesOffsetLeft: 5,
    }
  },
  mounted() {
    this.pageWidth = document.body.scrollWidth

    // Compute onResize
    this.computeBounds()

    this.computePositions()
    this.initPositionTitle()

    document.body.addEventListener('wheel', (e) => {
      this.scroll.value += e.deltaY
      this.$gsap.to(this.scroll, {
        eased: this.scroll.value,
      })

      this.updatePositionTitle()
    })
  },

  methods: {
    update() {
      this.$refs.articleContainer.scrollTo(this.scroll.eased, 0)
      this.$refs.imageContainer.scrollTo(this.scroll.eased, 0)

      this.computePositions()

      this.updatePositionTitle()
    },
    computeBounds() {
      // TITLE
      this.titleWidth = this.$refs.titleWrapper[0].getBoundingClientRect().width

      this.borderTitleDistance = this.pageWidth - this.titleWidth * (this.titlesOffsetLeft - 1)

      // Compute titles outside of the page
      this.nbTitlesOut = Math.floor(this.$refs.articleWrapper.length - this.titlesOffsetLeft)

      // ARTICLE
      this.articleWrapperWidth = this.$refs.articleWrapper[0].getBoundingClientRect().width

      // IMAGE
      this.imageContainerBounds = this.$refs.imageContainer.getBoundingClientRect()

      // WRAPPER
      this.wrapperWidthWithoutTitle =
        // Compute with one more title width
        this.borderTitleDistance - this.titleWidth - this.imageContainerBounds.width
      this.articleInWrapper = this.wrapperWidthWithoutTitle / this.articleWrapperWidth
    },

    computePositions() {
      this.ratioArticleVisible = this.$refs.articleContainer.scrollLeft / this.articleWrapperWidth

      this.ratioSecondArticleVisible = this.articleInWrapper - (1 - this.ratioArticleVisible)

      this.offsetTitle = this.ratioArticleVisible * this.titleWidth
    },

    initPositionTitle() {
      this.$refs.articleWrapper.forEach((articleEl, i) => {
        // Position fix titles
        const rightPositionTitle =
          (this.$refs.titleWrapper.length - i - this.nbTitlesOut) * this.titleWidth

        if (i > this.ratioSecondArticleVisible + 1) {
          // Article outside RIGHT
          this.$refs.articleWrapper[i].style.position = 'unset'
          this.$refs.titleWrapper[i].style.position = `fixed`
          this.$refs.titleWrapper[i].style.right = `${rightPositionTitle}px`
        }
      })
    },
    updatePositionTitle() {
      // Position titles onScroll
      this.$refs.articleWrapper.forEach((articleEl, i) => {
        // Position fix titles
        const rightPositionTitle =
          (this.$refs.titleWrapper.length - i - this.nbTitlesOut) * this.titleWidth

        if (this.ratioArticleVisible > i) {
          // Article outside LEFT
          this.$refs.articleWrapper[i].style.position = 'unset'
          this.$refs.titleWrapper[i].style.position = `absolute`
          this.$refs.titleWrapper[i].style.left = 0
        } else if (i > this.ratioSecondArticleVisible + 1) {
          // Article outside RIGHT
          this.$refs.articleWrapper[i].style.position = 'unset'
          this.$refs.titleWrapper[i].style.position = `fixed`
          this.$refs.titleWrapper[i].style.right = `${rightPositionTitle}px`
          this.$refs.titleWrapper[i].style.transform = `translateX(-${this.offsetTitle}px)`
        } else {
          // Article inside
          // this.$refs.articleWrapper[i].style.position = 'relative'
          this.$refs.titleWrapper[i].style.transform = `translateX(0px)`
          this.$refs.titleWrapper[i].style.position = `unset`
          this.$refs.titleWrapper[i].style.left = 'unset'
          this.$refs.titleWrapper[i].style.right = 'unset'
        }
      })
    },
  },
}
</script>

<style lang="scss">
body {
  overflow: hidden;
}

.home__container {
  display: flex;

  // Images
  .image__container {
    width: 40vw;
    flex-shrink: 0;

    display: flex;
    justify-content: start;
    overflow: hidden;

    .image__wrapper {
      flex-shrink: 0;
      width: 80vw;
      height: 100vh;
      border: 1px solid green;
      .image {
        position: sticky;
        left: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        border: 1px solid orange;
        width: 40vw;
        height: 100%;

        img {
          object-fit: cover;
        }
      }
    }
  }

  // Articles
  .articles__container {
    width: 60vw;
    display: flex;
    /* display: none; */
    justify-content: start;
    overflow: hidden;
    position: relative;

    // Article content
    .article__wrapper {
      flex-shrink: 0;
      width: 80vw;
      height: 100vh;
      border: 1px solid $red;
      // Title
      .title__wrapper {
        z-index: 1;
        position: absolute;
        width: 3vw;
        height: 100%;

        //       /* border-left: 1px solid black; */
        .title__bg {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: $white;
        }
        .title__border {
          height: 100%;
          width: 2px;
          background: #707070;
          opacity: 0.4;
          position: absolute;
          top: 0;
          left: 1px;
          z-index: 2;
          transform-origin: center bottom;
        }
        h2 {
          width: 100vh;
          margin-left: 16px;
          padding-left: 8px;
          transform-origin: top left;
          transform: rotate(90deg) translate(0, -100%);

          font-size: vw(16);
          text-transform: uppercase;

          overflow: hidden;
        }
      }

      // Article content
      .article {
        position: sticky;
        left: 0;
        border: 1px solid blue;
        background: salmon;
        width: 80%;
        height: 100%;
      }
    }
  }
}
</style>
