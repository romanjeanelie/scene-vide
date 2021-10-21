<template>
  <div class="cover">
    <div class="border"></div>
    <div class="left">
      <div class="overlay"></div>
      <img src="https://picsum.photos/id/439/800/600" alt="" />
    </div>
    <div class="right">
      <div class="right__top">
        <div class="title__wrapper">
          <h1 class="title">La scene est vide</h1>
          <p class="date">Décembre 2021</p>
        </div>
      </div>

      <div class="right__bottom">
        <ul class="names">
          <li>Jérôme Bel</li>
          <li>Enora Boëlle</li>
          <li>Olivier Coulon</li>
          <li>Eddy D'aranjo</li>
          <li>Däper Dutto</li>
          <li>Ecole des Actes</li>
          <li>Henri Jules Julien</li>
          <li>Irène Bonnaud</li>
          <li>Maxime Kurvers</li>
          <li>Marie-José Malis</li>
          <li>Philippe Quesne</li>
          <li>Marion Siéfert</li>
          <li>Stereoptik</li>
        </ul>

        <div class="word__wrapper">
          <h2 class="numero">n°1 -</h2>
          <h2 class="word">vide</h2>
        </div>
      </div>

      <div class="arrow">
        <img src="@/assets/img/arrow.svg" alt="arrow" />
      </div>
    </div>
  </div>
</template>

<script>
// import arrow from '~/assets/img/arrow.svg'
export default {}
</script>

<style lang="scss">
.cover {
  @extend %cover;
  width: 100vw;
  display: flex;
  background: $white;
  z-index: 1;

  .border {
    position: absolute;
    z-index: 1;
    /* display: none; */
    left: 0;
    top: 0;
    width: vw(10);
    height: 100vh;
    background: $red;
  }
  .left {
    flex: 1;
    height: 100vh;
    overflow: hidden;
    position: relative;
    .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: $red;
      mix-blend-mode: hue;
    }
    img {
      height: 100%;
      width: auto;
    }
  }

  .right {
    flex: 1;

    display: flex;
    flex-direction: column;
    padding: vw(16) vw(70) vw(16) vw(32);
    .right__top {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: start;
      .title__wrapper {
        display: flex;
        flex-direction: column;
        .title {
          font-family: 'Anybody';
          font-size: vw(290);
          text-transform: uppercase;
          line-height: 0.8;
        }
        .date {
          text-align: right;
          margin-top: vw(-20);
          text-transform: uppercase;
          font-size: vw(14);
        }
      }
    }

    .right__bottom {
      flex: 1;
      display: flex;
      align-items: end;
      justify-content: space-between;
      padding-bottom: vw(50);
      .names {
        li {
          margin-bottom: vw(10);
          font-family: 'Poppins';
          font-size: vw(14);
          text-transform: uppercase;
        }
      }
      .word__wrapper {
        font-family: 'Eb-Garamond';
        font-size: vw(120);
        text-transform: lowercase;
        h2 {
          display: inline-block;
        }
      }
    }
  }

  .arrow {
    img {
      width: 100%;
      height: auto;
    }
  }
}
</style>
