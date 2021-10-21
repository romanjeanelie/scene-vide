<template>
  <div ref="articleContent" class="article__content">
    <div ref="top" class="top">
      <div class="article__title__wrapper">
        <h2 class="title">Le théâtre polonais</h2>
        <h3 class="auteur">Maxime Kurvers</h3>
      </div>
    </div>

    <div ref="middle" class="middle">
      <p class="resume">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos cum vitae
        sunt, dolore voluptatibus consequuntur animi consequatur facilis
        cupiditate fugiat sed molestias perspiciatis iusto quidem debitis nulla
        atque eum. At unde sunt vero consectetur labore? Tempora suscipit vero
        id amet excepturi sit totam reprehenderit.!
      </p>
    </div>

    <div ref="bottom" class="bottom">
      <button class="open">ouvrir l'article</button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.reset()
  },
  methods: {
    animIn() {
      this.$gsap.to([this.$refs.top, this.$refs.middle, this.$refs.bottom], {
        opacity: 1,
      })
    },
    animOut() {
      this.$gsap.to([this.$refs.top, this.$refs.middle, this.$refs.bottom], {
        opacity: 0,
      })
    },

    reset() {
      this.$gsap.set([this.$refs.top, this.$refs.middle, this.$refs.bottom], {
        opacity: 0,
      })
    },
  },
}
</script>

<style lang="scss">
.article__content {
  z-index: 1;
  height: 100%;
  width: 40vw;
  display: flex;
  flex-direction: column;

  padding: $sizeProgress vw(16);
  background: #fbfaf5;
  border-right: 1px solid black;

  .top {
    display: flex;
    flex-direction: column;
    /* justify-content: start; */
    .article__title__wrapper {
      display: flex;
      flex-direction: column;
      align-items: start;
      margin-top: vw(50);
    }
    .title {
      /* width: vw(300); */
      font-weight: 500;
      font-size: vw(65);
      text-transform: uppercase;
      line-height: 1.2;
    }
    .auteur {
      /* display: inline-block; */
      align-self: flex-end;
      margin-top: vw(12);
      font-size: vw(18);
      margin-right: vw(150);
      /* transform: translateX(-120%); */
    }
  }

  .middle {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: vw(30);
    font-size: vw(14);
    line-height: 1.5;
    max-width: vw(450);
  }

  .bottom {
    margin-bottom: vw(100);
    padding-left: vw(30);
    .open {
      padding: vw(8) vw(16);
      cursor: pointer;
      background: $yellow;
      color: $white;
      border-radius: 30px;
      border: transparent;
      font-family: 'Poppins';
      font-weight: 500;
      text-transform: uppercase;
      font-size: vw(14);
      line-height: 1.5;
    }
  }
}
</style>
