<script setup>
import {useNotification} from "@kyvg/vue3-notification";
const {notify} = useNotification()
import {ref, onMounted} from 'vue'
const transcript = ref('')
const text1 = ref('')
const isRecording = ref(false)
const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition
const recording = new Recognition()
const selected = ref(null)
const langList = ref([{text:'English', lang: 'en-EN'}, {text:'Russian', lang: 'ru-RU'}, {text:'Romanian', lang:'ro-RO'}])
const changeLang = () => {
  notify({
    text: `Switched to ${selected.value}`,
  });
  recording.lang = selected.value
}

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
    text1.value = text1.value + ' ' +  transcript.value
  }
}

const showResults = () => {
  recording.onresult = (event) => {
    const text = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
    transcript.value = text
  }
}


const ToggleMic = () => {
  isRecording.value ? recording.stop() : recording.start()
}

onMounted(() => {
  startRecording()
  showResults()
})
</script>

<template>
  <v-app>
    <v-layout class="mx-auto" justify-center align-center>
      <v-flex xs12 sm8 md6>
        <div>
          <h4>Select language</h4>
          <select v-model="selected" @change="changeLang()" :item="langList" outlined>
            <option v-for="item in langList"  :value="item.lang">
              {{ item.text }}
            </option>
          </select>
          <h4>Everything you have said so far</h4>
          <div class="transcript1">{{ text1 }}</div>
          <h1>Say something</h1>
          <div class="btn-box">
            <v-btn
                dark
                @click="ToggleMic()"
                icon
                :color="!isRecording ? 'grey' : (isRecording ? 'red' : 'red darken-3')"
                :class="{'animated infinite pulse': isRecording}"
            >
              <v-icon>{{isRecording ? 'mic_off' : 'mic'}}</v-icon>
            </v-btn>
          </div>
          <div class="transcript">
            Current recording: {{ transcript }}
          </div>
        </div>
      </v-flex>
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
  display: inline-block;
  animation: cursorBlink 1s infinite;
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
</style>