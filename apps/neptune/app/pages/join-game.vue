<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center px-4">
    <div class="w-full max-w-2xl">
      <!-- Bloc principal -->
      <div class="bg-slate-200 dark:bg-slate-800 rounded-2xl shadow-xl p-12">
        <div class="text-center space-y-8">
          <!-- Titre -->
          <div class="space-y-2">
            <h1 class="text-3xl font-bold text-slate-900 dark:text-white">
              🎮 Rejoindre une partie
            </h1>
            <p class="text-slate-600 dark:text-slate-400">
              {{ statusMessage }}
            </p>
          </div>

          <!-- Contenu dynamique selon l'état -->
          <div class="py-8">
            <!-- État initial : Bouton chercher -->
            <button v-if="gameState === 'idle'" @click="searchGame"
              class="px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-slate-900 font-bold text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              <div class="flex items-center gap-3">
                <Gamepad2 class="w-6 h-6" />
                <span>Chercher une game</span>
              </div>
            </button>

            <!-- État loading : Loader -->
            <div v-else-if="gameState === 'searching'" class="flex flex-col items-center gap-6">
              <div class="relative">
                <!-- Spinner animé -->
                <div
                  class="w-20 h-20 border-4 border-slate-300 dark:border-slate-600 border-t-yellow-500 rounded-full animate-spin">
                </div>
                <!-- Point central -->
                <div class="absolute inset-0 flex items-center justify-center">
                  <div class="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              <p class="text-lg text-slate-600 dark:text-slate-400 font-medium">
                Recherche d'adversaire en cours...
              </p>
            </div>

            <!-- État connecté : Bouton lancer -->
            <div v-else-if="gameState === 'ready'" class="space-y-6">
              <div class="flex items-center justify-center gap-3 text-green-600 dark:text-green-400 mb-4">
                <CheckCircle class="w-8 h-8" />
                <span class="text-xl font-semibold">Adversaire trouvé !</span>
              </div>

              <button @click="startGame"
                class="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                :disabled="!roomIsReady">
                <div class="flex items-center gap-3">
                  <Play class="w-6 h-6" />
                  <span>Lancer la partie</span>
                </div>
              </button>

              <button @click="cancelGame"
                class="px-6 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-medium transition-colors">
                Annuler
              </button>
            </div>
          </div>

          <!-- Info supplémentaire -->
          <div v-if="gameState === 'idle'" class="pt-4 border-t border-slate-300 dark:border-slate-700">
            <p class="text-sm text-slate-500 dark:text-slate-500">
              Le matchmaking vous connectera automatiquement avec un adversaire disponible
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Gamepad2, CheckCircle, Play } from 'lucide-vue-next'
import { Client } from "colyseus.js"

definePageMeta({
  title: 'Rejoindre une partie',
  middleware: ['auth']
})

type GameState = 'idle' | 'searching' | 'ready'

const gameState = ref<GameState>('idle')
const statusMessage = computed(() => {
  switch (gameState.value) {
    case 'idle':
      return 'Prêt à démarrer une nouvelle partie'
    case 'searching':
      return 'Connexion au serveur de jeu...'
    case 'ready':
      return 'Partie prête à démarrer'
    default:
      return ''
  }
})

const roomIsReady = ref(false)

// Simuler la recherche de partie
const searchGame = async () => {
  gameState.value = 'searching'

  const client = new Client("ws://localhost:2567")

  const roomToJoin = await client.joinOrCreate("my_room", {
    token: localStorage.getItem('token')
  })

  roomToJoin.onStateChange((state) => {
    console.log("Nouveau state reçu :", state)
    if (state.isFull) {
      roomIsReady.value = true
      alert("Un adversaire a rejoint la partie ! Vous pouvez maintenant démarrer la partie.")
    }
  })

  gameState.value = 'ready'
}

// Lancer la partie
const startGame = async () => {
  console.log("Démarrage de la partie dans la salle ...")
}


// Annuler et revenir à l'état initial
const cancelGame = () => {
  gameState.value = 'idle'
}

</script>
