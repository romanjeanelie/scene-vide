<template>
  <div class="article-text__container">
    <navigation ref="nav" />

    <section class="title__wrapper">
      <div class="title">
        <h1>Le théâtre polonais</h1>
        <h3 class="auteur">Maxime Kurvers</h3>
      </div>
    </section>

    <article class="article">
      <header class="header">
        <p class="description">
          Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem
          ipsum dolor sit amet, consetetur sadipscing elitr, sed dia
        </p>
        <div class="img__wrapper">
          <img src="https://picsum.photos/1200/600" alt="" />
        </div>
      </header>

      <main>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
        et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
        diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
        et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
        et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
        diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
        et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet.

        <div class="img__wrapper">
          <img src="https://picsum.photos/600/400" alt="" />
        </div>

        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
        et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
        diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
        et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam
        et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est
        Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
        diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
        dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
        et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit
        amet.

        <div class="signature">
          <div class="signature__wrapper">
            <p class="name">Maxime Kurvers</p>
            <p class="desc">auteur, metteur en scène</p>
          </div>
          <div class="border"></div>
        </div>
      </main>
    </article>

    <section class="bottom">
      <close />
    </section>
    <share />
  </div>
</template>

<script>
import navigation from '~/components/common/navigation.vue'
import close from '~/components/common/close.vue'
import Share from '~/components/common/share.vue'
import emitter from '~/assets/js/EventEmitter'

export default {
  components: { Share, navigation, close },
  mounted() {
    this.$nextTick(() => {
      emitter.emit('PAGE:MOUNTED')
    })
  },
}
</script>

<style lang="scss">
.article-text__container {
  display: flex;
  flex-direction: column;
  align-items: center;

  .title__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: vw(100);
    .title {
      display: flex;
      flex-direction: column;
      h1 {
        @extend %title;
      }
      .auteur {
        @extend %title-auteur;

        align-self: flex-end;
      }
    }
  }

  .article {
    display: flex;
    flex-direction: column;
    align-items: center;

    .header {
      max-width: vw(800);
      margin-top: vw(100);
      display: flex;
      flex-direction: column;
      align-items: center;

      .description {
        @extend %text-header;
        text-align: center;
      }
      .img__wrapper {
        margin-top: vw(20);
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          width: 100%;
        }
      }
    }

    main {
      max-width: vw(600);
      margin-top: vw(60);
      display: flex;
      flex-direction: column;
      align-items: center;

      @extend %text-main;

      .img__wrapper {
        margin: vw(30);
        height: vw(400);
        overflow: hidden;
        img {
          height: 100%;
          width: auto;
        }
      }

      .signature {
        margin-top: vw(60);
        margin-left: auto;
        position: relative;

        @extend %signature;
        text-align: right;

        .signature__wrapper {
          margin-right: vw(20);
        }

        .border {
          height: 100%;
          width: vw(2);
          background: black;
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
  }
}
</style>
