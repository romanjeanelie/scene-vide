<template>
  <div class="essai3">
    <div class="wrapper">
      <section class="intro">
        <p>intro</p>
      </section>
      <section
        v-for="n in 3"
        :key="`article-${n}`"
        ref="article"
        class="article"
        :style="styleArticle(n)"
      >
        <div ref="title" class="title">
          <h2>TITRE {{ n }}</h2>
        </div>

        <div class="article__content">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            voluptates alias quibusdam, veritatis minima eaque sed eos amet
            beatae cupiditate. Nulla nostrum repudiandae labore voluptates vitae
            debitis omnis cum expedita quam dolorum praesentium corporis odit
            minima, aliquid autem voluptate explicabo voluptatum, asperiores,
            veritatis aspernatur accusamus dicta quaerat harum perferendis! Qui
            dolorum ad, minima ab omnis similique rem repudiandae, amet quo
            voluptas, aspernatur dolore accusantium aliquid voluptates eum
            perferendis. Similique distinctio voluptatum accusamus
            necessitatibus assumenda fugit praesentium modi. Saepe amet
            aspernatur fuga eveniet eum quisquam facere soluta vero, illo velit
            quibusdam, reiciendis optio voluptatum labore placeat dolor
            blanditiis. Asperiores, ut nam!
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  computed: {},
  mounted() {
    this.scrollAnim()
    this.$nextTick(() => {})
  },
  methods: {
    styleArticle(n) {},
    scrollAnim() {
      this.observerTitleUp()
      this.observerTitleDown()
      window.addEventListener('scroll', () => {
        // console.log(window.scrollY)
      })
      this.$refs.article.forEach((article, i) => {})
    },

    observerTitleUp() {
      const options = {
        threshold: 1,
      }
      this.$refs.article.forEach((article, i) => {
        let prevRatio = 0
        const observer = new IntersectionObserver((entries, observers) => {
          if (entries[0].intersectionRatio === 0) {
            console.log('elt caché > init', i)
            this.initTitles(i)
          }
          if (entries[0].intersectionRatio > prevRatio) {
            console.log('apparait', i)
            console.log(entries[0].isIntersecting)
            this.$refs.title[i].style.position = 'relative'
            this.$refs.title[i].style.bottom = 'unset'
            // entries[0].target.style.background = 'green'
          } else if (entries[0].intersectionRatio < prevRatio) {
            console.log('disparait', i)
            console.log(entries[0].intersectionRect.y)
            // entries[0].target.style.background = 'red'
            if (entries[0].intersectionRect.y < 1) {
              console.log('atteint top viewport')
              // entries[0].target.style.background = 'yellow'

              this.$refs.title[i].style.position = 'fixed'
              this.$refs.title[i].style.top = 0
            }
          }
          prevRatio = entries[0].intersectionRatio
        }, options)
        observer.observe(article)
      })
    },
    observerTitleDown() {
      const options = {
        threshold: 0.01,
      }
      this.$refs.article.forEach((article, i) => {
        let prevRatio = 0
        const observer = new IntersectionObserver((entries, observers) => {
          if (entries[0].intersectionRatio > prevRatio) {
            console.log('apparait un peu', i)
            this.$refs.title[i].style.position = 'relative'
            this.$refs.title[i].style.bottom = 'unset'
          } else if (entries[0].intersectionRatio < prevRatio) {
            console.log('disparait un peu', i)
            // this.initTitles(i)
          }
          prevRatio = entries[0].intersectionRatio
        }, options)
        observer.observe(article)
      })
    },
    initTitles(i) {
      console.log('init Titles', i)
      this.$refs.title[i].style.position = 'fixed'
      this.$refs.title[i].style.bottom = `${50 - (0 + (i - 1) * 50)}px`
    },
  },
}
</script>

<style lang="scss">
.essai3 {
  h2 {
    font-size: 50px;
  }

  p {
    font-size: 16px;
  }

  .wrapper {
    /* display: flex; */
  }

  .intro {
    height: 75vh;
  }

  .article {
    position: relative;
    border: 1px solid black;
    width: 95vw;
    height: 60vh;
    .title {
      border: 1px solid blue;
      width: 95vw;
      background: white;
      z-index: 2;
      /* position: absolute; */

      /* transform: rotate(90deg) translate(0, -100%); */
      /* width: 100vh; */
      transform-origin: top left;
    }
    .article__content {
      border: 1px solid salmon;
      line-height: 100px;
      position: absolute;
      top: 100px;
      /* margin-left: 100px; */
    }
  }
}
</style>
