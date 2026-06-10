<template>
  <div class="route-container">
    <div class="glass-card">

      <!-- Hanging Colorful Party Bunting Banner -->
      <svg class="bunting-svg" viewBox="0 0 440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 8C110 24 330 24 440 8" stroke="#ebdcb9" stroke-width="1.5" stroke-dasharray="2 2"/>
        <polygon points="15,10 40,13 27,38" fill="#1b9cfc"/>
        <polygon points="55,14 80,16 67,41" fill="#f5b027"/>
        <polygon points="95,17 120,18 107,43" fill="#e82b2b"/>
        <polygon points="135,19 160,19 147,44" fill="#2ecc71"/>
        <polygon points="175,20 200,20 187,45" fill="#1b9cfc"/>
        <polygon points="215,20 240,20 227,45" fill="#f5b027"/>
        <polygon points="255,19 280,19 267,44" fill="#e82b2b"/>
        <polygon points="295,18 320,17 307,42" fill="#2ecc71"/>
        <polygon points="335,16 360,14 347,39" fill="#1b9cfc"/>
        <polygon points="375,13 400,10 387,35" fill="#f5b027"/>
      </svg>

      <!-- Floating Sparkles (Four-pointed stars) -->
      <svg class="sparkle sparkle-green" style="top: 80px; left: -10px; width: 34px; height: 34px;" viewBox="0 0 24 24"
           fill="currentColor">
        <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z"/>
      </svg>
      <svg class="sparkle sparkle-gold" style="top: 90px; right: 10px; width: 28px; height: 28px;" viewBox="0 0 24 24"
           fill="currentColor">
        <path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4Z"/>
      </svg>

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
