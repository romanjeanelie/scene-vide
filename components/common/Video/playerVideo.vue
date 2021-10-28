<template>
  <div ref="videoWrapper" class="video__wrapper">
    <video ref="video" src="@/assets/videos/Vivre-sa-vie.mp4" @timeupdate="updateDuration"></video>

    <div class="play-start__wrapper" @click="launchVideo">
      <button class="play-start">
        <svg ref="playStart" xmlns="http://www.w3.org/2000/svg" width="63" height="63">
          <g data-name="Groupe 24">
            <path
              ref="playStartPathSvg"
              data-name="Icon ionic-md-play"
              d="M26.123 19.782v22.984L44.15 31.274Z"
              fill="#fbfaf5"
            />
            <g data-name="Ellipse 2" fill="none" stroke="#fff" stroke-width="2">
              <circle ref="playStartCircleSvg" cx="31.5" cy="31.5" r="30.5" />
            </g>
          </g>
        </svg>
      </button>
      <div ref="playStartOverlay" class="play-start__overlay"></div>
    </div>

    <div ref="controls" class="controls">
      <div class="top">
        <div class="progress" @click="changeDuration">
          <p class="start">0:00</p>
          <div ref="progressLine" class="progress__line">
            <div class="line line__back"></div>
            <div ref="lineDuration" class="line line__front">
              <span class="cursor"></span>
            </div>
          </div>

          <p class="end">2:10</p>
        </div>
      </div>

      <div class="bottom">
        <div class="left">
          <div class="playPauseWrapper">
            <button @click="togglePlayPause">
              <svg
                id="pauseSVG"
                ref="pauseSVG"
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17.597"
              >
                <g data-name="Groupe 38" fill="none" stroke="#fff" stroke-width="5">
                  <path data-name="Ligne 58" d="M14.5 0v17.597" />
                  <path data-name="Ligne 59" d="M2.5 0v17.597" />
                </g>
              </svg>
              <svg
                id="playSVG"
                ref="playSVG"
                xmlns="http://www.w3.org/2000/svg"
                width="18.027"
                height="22.984"
              >
                <path
                  data-name="Icon ionic-md-play"
                  d="M0 0v22.984l18.027-11.492Z"
                  fill="#fbfaf5"
                />
              </svg>
            </button>
          </div>
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
            <div ref="soundProgressLine" class="sound__progress" @click="changeVolume">
              <div class="sound__line">
                <div class="line line__back"></div>
                <div ref="lineVolume" class="line line__front">
                  <span class="cursor"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="right">
          <button class="fullscreen-btn" @click="toggleFullscreen">
            <svg
              id="fullScreenSVG"
              xmlns="http://www.w3.org/2000/svg"
              width="33.165"
              height="26.045"
            >
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
          </button>
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

  data() {
    return {
      progressBounds: null,
      volumeBounds: null,
      videoDuration: null,
      timer: null,
      videoLaunched: false,
      videoIsPlaying: false,
    }
  },

  mounted() {
    this.pageWidth = window.innerWidth
    this.computeBounds()
    // this.displayControls()
  },

  methods: {
    launchVideo() {
      this.$gsap.to(this.$refs.playStartPathSvg, {
        scale: 0.4,
        opacity: 0,
        yoyo: true,
      })

      this.$gsap.to(this.$refs.playStartCircleSvg, {
        scale: 0.7,
        drawSVG: '0%',
      })

      this.$gsap.to(this.$refs.playStartOverlay, {
        opacity: 0,
      })

      this.$refs.video.play()
      this.videoIsPlaying = true
      this.displayControls()
    },
    displayControls() {
      this.$refs.videoWrapper.addEventListener('mousemove', (e) => {
        clearTimeout(this.timer)
        this.$refs.controls.style.transform = 'translateY(0)'
        this.timer = setTimeout(() => {
          this.$refs.controls.style.transform = 'translateY(100%)'
        }, 1000)
      })
    },

    computeBounds() {
      this.progressBounds = this.$refs.progressLine.getBoundingClientRect()
      this.soundProgressBounds = this.$refs.soundProgressLine.getBoundingClientRect()
    },
    updateDuration() {
      const currentTime = this.$refs.video.currentTime
      this.videoDuration = this.$refs.video.duration
      const valueOffsetLine = 100 - (currentTime / this.videoDuration) * 100

      this.$refs.lineDuration.style.transform = `translateX(${-valueOffsetLine}%)`
    },
    changeDuration(e) {
      const offsetX = e.clientX - this.progressBounds.x
      const width = this.progressBounds.width

      const ratioTime = offsetX / width
      const newTime = this.videoDuration * ratioTime
      const valueOffsetLine = 100 - ratioTime * 100

      this.$refs.lineDuration.style.transform = `translateX(${-valueOffsetLine}%)`
      this.$refs.video.currentTime = newTime
    },
    togglePlayPause() {
      if (!this.videoIsPlaying) {
        this.$refs.video.play()
        this.videoIsPlaying = true
        this.$refs.playSVG.style.opacity = '0'
        this.$refs.pauseSVG.style.opacity = '1'
      } else {
        this.$refs.video.pause()
        this.videoIsPlaying = false
        this.$refs.pauseSVG.style.opacity = '0'
        this.$refs.playSVG.style.opacity = '1'
      }
    },
    changeVolume(e) {
      const offsetX = e.clientX - this.soundProgressBounds.x
      const width = this.soundProgressBounds.width

      const ratioVolume = offsetX / width
      const newVolume = ratioVolume
      const valueOffsetLine = 100 - ratioVolume * 100

      this.$refs.lineVolume.style.transform = `translateX(${-valueOffsetLine}%)`
      this.$refs.video.volume = newVolume
    },
    toggleFullscreen() {
      this.$refs.video.requestFullscreen()
    },
  },
}
</script>

<style lang="scss">
.video__wrapper {
  margin-top: vw(50);
  overflow: hidden;
  height: 70vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  /* border: 1px solid $red; */
  video {
    height: 100%;
    width: auto;
    /* background: $yellow; */
    /* border: 1px solid $red; */
    /* background: $yellow; */
  }

  .play-start__wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      z-index: 1;
    }

    .play-start__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: black;
      opacity: 0.5;
    }
  }

  .controls {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: vw(10) vw(20);

    display: flex;
    flex-direction: column;

    background: rgb(0, 0, 0);
    background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(246, 246, 246, 0) 100%);

    transform: translateY(100%);
    transition: transform 600ms ease-in-out;
    .top {
      .progress {
        display: flex;
        align-items: center;
        width: 100%;
        p {
          font-size: vw(10);

          transform: translateY(20%);
        }
        .progress__line {
          display: block;
          width: 100%;
          height: vw(10);
          margin: 0 vw(12);
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;

          .line {
            position: absolute;
            left: 0;
            top: 50%;
            width: 100%;
            height: 2px;
            background: $white;
            transform: translateY(-50%);

            cursor: pointer;
            &.line__back {
              opacity: 0.3;
            }
            &.line__front {
              transform: translateX(-100%); // Value to modify video
              transition: transform 300ms linear;
              .cursor {
                position: absolute;
                right: 0;
                top: 0;
                width: 2px;
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
      align-items: flex-end;
      margin-top: vw(16);

      .left {
        display: flex;

        .playPauseWrapper {
          button {
            position: relative;
            svg {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(50%, -50%);

              &#playSVG {
                opacity: 0;
              }
              &#pauseSVG {
                opacity: 1;
              }
            }
          }
        }
        .sound {
          margin-left: vw(30);
          display: flex;
          align-items: center;
          #btn__sound {
            margin-right: vw(10);
          }
          .sound__progress {
            width: vw(120);
            display: flex;
            align-items: center;
            transform: translateY(-10%);

            .sound__line {
              width: 100%;
              height: vw(10);
              position: relative;
              display: flex;
              align-items: center;

              overflow: hidden;

              .line {
                position: absolute;
                left: 0;
                top: 50%;
                width: 100%;
                height: 2px;
                background: $white;

                cursor: pointer;
                &.line__back {
                  opacity: 0.3;
                }
                &.line__front {
                  transform: translateX(-20%); // Value to modify sound
                  transition: transform 300ms linear;

                  .cursor {
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: vw(10);
                    height: vw(10);
                    border-radius: 50%;
                    transform: translate3d(0, -50%, 0);

                    background: $white;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
