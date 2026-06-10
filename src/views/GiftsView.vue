<template>
  <div class="route-container">
    <div class="glass-card">
      <div class="cars-header">
        <img src="@/assets/cars_logo.png" alt="Cars Logo" class="cars-logo">
      </div>

      <!-- Cars Decorative Images -->
      <img src="@/assets/lightning-mcqueen.png" class="cars-decoration mcqueen" alt="Lightning McQueen">
      <img src="@/assets/mater.png" class="cars-decoration mater" alt="Mater">
      <img src="@/assets/sally.png" class="cars-decoration sally" alt="Sally">
      <img src="@/assets/guido.png" class="cars-decoration guido" alt="Guido">

      <!-- Header area -->
      <div class="gifts-header">
        <router-link to="/" class="btn-back" title="Voltar ao Convite">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"
               stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
        </router-link>
        <div class="gifts-title-container">
          <h2 class="gifts-title">LISTA DE PRESENTES</h2>
        </div>
      </div>

      <p class="description" style="margin-bottom: 1.5rem; font-size: 0.95rem;">
        Minha maior alegria é ter sua presença, mas caso queira me presentear, criei esta lista com algumas sugestões
        que irei adorar! Clique em reservar para escolher um item.
      </p>

      <!-- Gift Items Container -->
      <div class="gifts-grid">
        <div
            v-for="gift in GIFT_SUGGESTIONS()"
            :key="gift.id"
            class="gift-card"
        >
          <div class="gift-icon">
            {{ gift.icon }}
          </div>
          <div class="gift-info">
            <h4>{{ gift.name }}</h4>
            <span class="gift-description" >
              {{ gift.description }}
            </span>
          </div>

        </div>
      </div>

      <div class="all-cars-container">
        <img src="@/assets/all cars.png" alt="All Cars" class="all-cars-img">
      </div>
    </div>

    <!-- Reservation Confirmation Modal -->
    <transition name="fade">
      <div class="modal-overlay" v-if="activeModalGift" @click.self="closeModal">
        <div class="modal-content">
          <h3>Reservar Presente?</h3>
          <p>
            Você escolheu: <span class="modal-item-name">{{ activeModalGift.name }}</span>.
          </p>
          <p style="font-size: 0.9rem;">
            Ao confirmar, você enviará uma mensagem no WhatsApp do Atlas informando sua escolha para que o presente seja
            marcado como reservado.
          </p>
          <div class="modal-actions">
            <button class="btn btn-secondary" @click="closeModal" style="padding: 0.75rem 1rem;">Cancelar</button>
            <button class="btn btn-primary" @click="confirmReservation" style="padding: 0.75rem 1rem;">Confirmar &
              Avisar
            </button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>
<script>
import {ref} from 'vue'
import {EVENT_SETTINGS, GIFT_SUGGESTIONS} from '../config.js'

export default {
  name: 'GiftsView',
  methods: {
    GIFT_SUGGESTIONS() {
      return GIFT_SUGGESTIONS
    }
  },
  setup() {
    const settings = EVENT_SETTINGS
    const gifts = GIFT_SUGGESTIONS

    const sendGiftMessage = (gift) => {
      const text = encodeURIComponent(
          `Olá ${settings.hostName}! Escolhi te presentear com: *${gift.name}*. 🎁`
      )

      const waUrl = `https://wa.me/${settings.whatsappNumber}?text=${text}`
      window.open(waUrl, '_blank')
    }

    return {
      settings,
      gifts,
      sendGiftMessage
    }
  }
}
</script>
