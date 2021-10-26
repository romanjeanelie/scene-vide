<template>
  <div class="video__wrapper">
    <video ref="video" src="@/assets/videos/Vivre-sa-vie.mp4" muted></video>
    <div class="controls">
      <div class="top">
        <div class="progress">
          <span class="start">0:00</span>
          <div class="progress__line">
            <div class="line line__back"></div>
            <div class="line line__front__wrapper">
              <div class="line__front"></div>
              <span class="cursor"></span>
            </div>
          </div>

          <span class="end">2:10</span>
        </div>
      </div>

      <div class="bottom">
        <div class="left">
          <div class="playPauseWrapper">
            <button id="btn__pause">
              <svg id="pauseSVG" xmlns="http://www.w3.org/2000/svg" width="17" height="17.597">
                <g data-name="Groupe 38" fill="none" stroke="#fff" stroke-width="5">
                  <path data-name="Ligne 58" d="M14.5 0v17.597" />
                  <path data-name="Ligne 59" d="M2.5 0v17.597" />
                </g>
              </svg>
            </button>
          </div>
          <!-- Pause -->
          <div class="sound">
            <button id="btn__sound">
              <svg id="soundSVG" xmlns="http://www.w3.org/2000/svg" width="12.854" height="19.285">
                <path
                  data-name="Icon awesome-volume-off"
                  d="M10.8.354 6.327 4.823H1.205A1.205 1.205 0 0 0 0 6.028v7.231a1.205 1.205 0 0 0 1.205 1.204H6.33l4.47 4.469a1.207 1.207 0 0 0 2.059-.854V1.203A1.207 1.207 0 0 0 10.8.354Z"
                  fill="#fff"
                />
              </svg>
            </button>
            <div class="sound__progress">
              <span class="sound__cursor"></span>
              <div class="sound__line"></div>
            </div>
          </div>
        </div>

        <div class="right">
          <svg id="fullScreenSVG" xmlns="http://www.w3.org/2000/svg" width="33.165" height="26.045">
            <g
              data-name="Icon feather-arrow-right"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path data-name="Tracé 7" d="M13.806 11.483 3.909 5.768" />
              <path data-name="Tracé 8" d="M5.132 11.871 3.908 5.768l5.897-1.99" />
            </g>
            <g
              data-name="Icon feather-arrow-right"
              fill="none"
              stroke="#fff"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
            >
              <path data-name="Tracé 7" d="m19.358 14.562 9.9 5.715" />
              <path data-name="Tracé 8" d="m28.033 14.174 1.224 6.103-5.897 1.99" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    linkVideo: {
      type: String,
      default: '',
    },
  },

  mounted() {
    console.log(this.$refs.video)
    this.$refs.video.addEventListener('click', () => {
      this.$refs.video.play()
    })
  },
}
</script>

<style lang="scss">
.video__wrapper {
  margin-top: vw(50);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  border: 1px solid $red;
  video {
    /* background: $yellow; */
    border: 1px solid $red;
    /* background: $yellow; */
  }

  .controls {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: vw(10) vw(20);

    display: flex;
    flex-direction: column;

    background: rgba($red, 0.5);

    .top {
      .progress {
        display: flex;
        align-items: center;
        width: 100%;
        span {
          font-size: vw(10);
          line-height: 0;
        }
        .progress__line {
          display: block;
          width: 100%;
          height: 2px;
          margin: 0 vw(12);
          position: relative;
          display: flex;

          .line {
            /* position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%; */
            background: $white;
            &.line__back {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              opacity: 0.3;
            }
            &.line__front__wrapper {
              display: inline-block;
              transform-origin: center left;
              position: relative;
              height: 2px;
              .line__front {
                transform: scaleX(0.5);
                opacity: 1;
              }
              .cursor {
                position: absolute;
                right: 0;
                top: 0;
                width: vw(10);
                height: vw(10);
                transform: translate3d(0, -50%, 0);

                background: $white;
              }
            }
          }
        }
      }
    }

    .bottom {
      display: flex;
      justify-content: space-between;
      align-items: end;
      margin-top: vw(10);

      .left {
        display: flex;

        .playPauseWrapper {
        }
        .sound {
          margin-left: vw(30);
          display: flex;
          align-items: center;
          .sound__cursor {
            width: vw(10);
            height: vw(10);
            border-radius: 50%;
            background: $white;
          }
          .sound__progress {
            width: vw(150);
            height: 2px;
            .sound__line {
              width: 100%;
              height: 100%;
              background: $white;

              margin-left: vw(10);
            }
          }
        }
      }
    }
  }
}
</style>
