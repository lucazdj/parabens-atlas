<template>
  <div class="route-container">
    <div class="glass-card">
      <div class="cars-header">
        <img src="@/assets/cars_logo.png" alt="Cars Logo" class="cars-logo">
      </div>

      <!-- Cars Decorative Images -->
      <img src="@/assets/lightning-mcqueen.png" class="cars-decoration mcqueen" alt="Lightning McQueen">
      <img src="@/assets/mater.png" class="cars-decoration mater" alt="Mater">
      
      <!-- Profile Picture Section -->
      <div class="profile-section">
        <div class="avatar-wrapper">
          <!-- Image with graceful fallback if the asset is missing -->
          <img 
            :src="profilePic" 
            alt="Aniversariante" 
            class="avatar-img" 
          />
        </div>
        <div class="birthday-badge">
          🏁 1 aninho
        </div>
      </div>

      <!-- Header Content -->
      <p class="invite-top-text">Liguem seus motores!</p>
      <h1 class="title">FESTA DO {{ settings.hostName }}</h1>
      <p class="subtitle">CORRIDA DE ANIVERSÁRIO</p>
      <p class="description">{{ settings.descriptionText }}</p>

      <!-- Countdown Timer -->
      <div class="countdown-container" v-if="!countdownFinished">
        <div class="countdown-box">
          <span class="countdown-val">{{ days }}</span>
          <span class="countdown-lbl">Dias</span>
        </div>
        <div class="countdown-box">
          <span class="countdown-val">{{ hours }}</span>
          <span class="countdown-lbl">Horas</span>
        </div>
        <div class="countdown-box">
          <span class="countdown-val">{{ minutes }}</span>
          <span class="countdown-lbl">Min</span>
        </div>
        <div class="countdown-box">
          <span class="countdown-val">{{ seconds }}</span>
          <span class="countdown-lbl">Seg</span>
        </div>
      </div>
      <div class="countdown-container" v-else>
        <div class="countdown-box" style="grid-column: span 4; padding: 1rem; border-color: var(--clr-primary);">
          <span class="countdown-val" style="font-size: 1.25rem; color: var(--clr-primary);">🎉 Liguem seus motores! É hoje! 🎉</span>
        </div>
      </div>

      <!-- Event Detail Points -->
      <div class="details-list">
        <!-- Date and Time -->
        <div class="detail-item">
          <div class="detail-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <div class="detail-content">
            <h4>Quando</h4>
            <p>
              <span class="blue-date">{{ settings.eventDateText }}</span><br>
              <span>{{ settings.eventTimeText }}</span>
            </p>
          </div>
        </div>

        <!-- Location -->
        <div class="detail-item">
          <div class="detail-icon-box loc">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <div class="detail-content">
            <h4>Onde</h4>
            <p>{{ settings.locationAddress }}</p>
          </div>
        </div>
      </div>

      <!-- Core Actions -->
      <div class="actions-wrapper">
        <a :href="rsvpLink" target="_blank" class="btn btn-primary" id="btn-rsvp">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.413 9.864-9.83.002-2.623-1.023-5.086-2.884-6.95C16.59 1.951 14.12 0.928 11.498 0.927 6.062.927 1.635 5.342 1.63 10.763c0 1.748.458 3.453 1.328 4.966l-.974 3.565 3.655-.959c1.602.875 3.187 1.341 4.608 1.341zM17.65 14.6c-.3-.15-1.782-.88-2.062-.98-.28-.1-.485-.15-.69.15-.2.3-.78 1-.955 1.2-.175.2-.35.225-.65.075-.3-.15-1.265-.465-2.41-1.485-.89-.795-1.49-1.775-1.665-2.075-.175-.3-.02-.46.13-.61.135-.13.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.69-1.665-.945-2.28-.25-.6-.505-.52-.69-.53-.18-.01-.385-.01-.59-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.11 3.22 5.115 4.525.715.31 1.27.495 1.705.635.715.225 1.37.195 1.88.12.57-.085 1.78-.73 2.03-1.435.25-.705.25-1.31.175-1.435-.075-.125-.275-.2-.575-.35z"/>
          </svg>
          Confirmar Presença
        </a>
        
        <a :href="settings.mapsLink" target="_blank" class="btn btn-secondary" id="btn-maps">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
            <line x1="9" y1="3" x2="9" y2="18"/>
            <line x1="15" y1="6" x2="15" y2="21"/>
          </svg>
          Como Chegar
        </a>

        <router-link to="/gifts" class="btn btn-accent" id="btn-gifts">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 12 20 22 4 22 4 12"/>
            <rect x="2" y="7" width="20" height="5"/>
            <line x1="12" y1="22" x2="12" y2="7"/>
            <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/>
            <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>
          </svg>
          Sugestões de Presente
        </router-link>
      </div>

      <!-- Footing context -->
      <div class="invite-footer">
        Mal podemos esperar para ver você na pista!
      </div>

    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { EVENT_SETTINGS } from '../config.js'
import profilePic from '@/assets/profile.png'

export default {
  name: 'HomeView',
  setup() {
    const settings = EVENT_SETTINGS;
    
    // Countdown Timer State
    const days = ref(0);
    const hours = ref(0);
    const minutes = ref(0);
    const seconds = ref(0);
    const countdownFinished = ref(false);
    let timerInterval = null;

    const calculateCountdown = () => {
      const target = new Date(settings.eventDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        countdownFinished.value = true;
        days.value = 0;
        hours.value = 0;
        minutes.value = 0;
        seconds.value = 0;
        if (timerInterval) clearInterval(timerInterval);
        return;
      }

      days.value = Math.floor(difference / (1000 * 60 * 60 * 24));
      hours.value = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes.value = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      seconds.value = Math.floor((difference % (1000 * 60)) / 1000);
    };

    // RSVP WhatsApp Link Builder
    const rsvpLink = computed(() => {
      const text = encodeURIComponent(`Olá ${settings.hostName}! Fiquei muito feliz com o convite. Confirmo minha presença na sua festa de aniversário no dia 05 de Julho! 🎉`);
      return `https://wa.me/${settings.whatsappNumber}?text=${text}`;
    });

    onMounted(() => {
      calculateCountdown();
      timerInterval = setInterval(calculateCountdown, 1000);
    });

    onUnmounted(() => {
      if (timerInterval) clearInterval(timerInterval);
    });

    return {
      settings,
      profilePic,
      days,
      hours,
      minutes,
      seconds,
      countdownFinished,
      rsvpLink
    };
  }
}
</script>
