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
const langList = ref([{text: 'English', lang: 'en-EN'}, {text: 'Russian', lang: 'ru-RU'}, {
  text: 'Romanian',
  lang: 'ro-RO'
}])

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
    text1.value = text1.value + ' ' + transcript.value
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
    <v-layout>
      <div class="container">
        <div class="select-container">
          <h4>Select language for better recognition</h4>
          <select
              class="select"
              v-model="selected"
              @change="changeLang()"
              :item="langList"
            >
            <option v-for="item in langList" :value="item.lang">
              {{ item.text }}
            </option>
          </select>
        </div>
        <div class="mt-16 ml-16">
          <h1>Say something</h1>
          <h4>Current information</h4>
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
                @click="ToggleMic()"
                icon
                :color="!isRecording ? 'grey' : (isRecording ? 'red' : 'red darken-3')"
                :class="{'blob': isRecording}"
            >
              <i class="material-icons">{{ !isRecording ? 'mic' : 'mic_off' }}</i>
            </v-btn>
          </div>
          <v-divider class="mt-15"></v-divider>
          <div class="mt-15">
            <h4>Everything you have said so far</h4>
            <v-textarea
                :value="text1"
                class="transcript1"
                filled
                auto-grow
            ></v-textarea>
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

.select-container {
  margin-left: 80px;
}

.select {
  border: 1px solid black;
  width: 300px;
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