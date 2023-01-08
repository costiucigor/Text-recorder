<script>
import {useNotification} from "@kyvg/vue3-notification";
const {notify} = useNotification()
import {ref, onMounted, defineComponent, toRef, computed} from 'vue'
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recording = new Recognition()

export default defineComponent ({
props: {
  selectedLanguage: {
    type: String,
    required: true
  },
  valueOfInput: {
    type: String,
    default: ''
  }
},

  setup (props) {
    const transcript = ref('')
    const transcriptArea = ref('')
    const isRecording = ref(false)
    const languageSelected = toRef(props, 'selectedLanguage')
    const computeSelectedLanguage = computed(
        () => recording.lang = languageSelected.value
    )

    onMounted(() => {
      startRecording()
      showResults()
    })

    const startRecording = () => {
      recording.continuous = true
      recording.interimResults = true
      recording.onstart = () => {
        notify({
          text: "Recording started!",
        });
        transcript.value = ''
        isRecording.value = true
      }
      recording.onend = () => {
        notify({
          text: "Recording stopped!",
        });
        isRecording.value = false
        transcriptArea.value = transcriptArea.value + ' ' + transcript.value //string template
      }
    }

    const showResults = () => {
      recording.onresult = (event) => {
        transcript.value = Array.from(event.results)
            .map(([result]) => result.transcript)
            .join('');
      }
    }

    const toggleMic = () => {
      isRecording.value ? recording.stop() : recording.start()
    }

    return {
      transcript,
      toggleMic,
      isRecording,
      languageSelected,
      transcriptArea,
      computeSelectedLanguage
    }
  }
})
</script>

<template>
  <v-app>
    <v-layout>
      <div class="container">
        <div class="mt-16 ml-16">
          <v-textarea
              :value="transcript"
              class="transcript"
              filled
              auto-grow
          >
          </v-textarea>
          <div class="btn-box">
            <v-btn
                dark
                icon
                :color="!isRecording ? 'grey' : (isRecording ? 'red' : 'red darken-3')"
                :class="{'blob': isRecording}"
                @click="toggleMic()"
            >
              <i class="material-icons">{{ !isRecording ? 'mic' : 'mic_off' }}</i>
            </v-btn>
          </div>
          <v-divider class="mt-15"></v-divider>
          <div class="mt-15">
            <v-textarea
                v-model="transcriptArea"
                class="transcript"
                filled
                auto-grow
            >
            </v-textarea>
            <div>
                <slot name="input"></slot>
            </div>
          </div>
        </div>
      </div>
    </v-layout>
  </v-app>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
}

body {
  background: #fafafa;
}

.transcript {
  width: 500px;
}

.app-container {
  margin: 50vh 43vw 0;
  width: 50%;
  padding: 10px;
}

.microphone:hover {
  cursor: pointer;
  color: lightskyblue;
}

.btn-box {
  position: absolute;
  left: 450px;
  top: 200px;
}

.container {
  margin-left: 500px;
}

.blob {
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
  transform: scale(1);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
  }
}
</style>