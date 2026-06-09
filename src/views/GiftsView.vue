<template>
  <div class="route-container">
    <div class="glass-card">
      <!-- Checkered Racing Strip -->
      <div class="checkered-strip"></div>
      
      <!-- Header area -->
      <div class="gifts-header">
        <router-link to="/" class="btn-back" title="Voltar ao Convite">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
        </router-link>
        <div class="gifts-title-container">
          <h2 class="gifts-title">Lista de Presentes</h2>
        </div>
      </div>

      <p class="description" style="margin-bottom: 1.5rem; font-size: 0.85rem;">
        Minha maior alegria é ter sua presença, mas caso queira me presentear, criei esta lista com algumas sugestões que irei adorar! Clique em reservar para escolher um item.
      </p>

      <!-- Category Tabs selector -->
      <div class="category-tabs">
        <button 
          v-for="cat in categories" 
          :key="cat.id"
          class="tab-btn"
          :class="{ active: selectedCategory === cat.id }"
          @click="selectedCategory = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Gift Items Container -->
      <div class="gifts-grid">
        <div 
          v-for="gift in filteredGifts" 
          :key="gift.id" 
          class="gift-card"
        >
          <div class="gift-icon">
            {{ gift.icon }}
          </div>
          <div class="gift-info">
            <h4>{{ gift.name }}</h4>
            <span class="gift-category-badge" :class="gift.category">
              {{ gift.category }}
            </span>
          </div>
          
          <!-- Reservation Button -->
          <button 
            class="btn-reserve" 
            :class="{ reserved: isReserved(gift.id) }"
            @click="promptReservation(gift)"
            :disabled="isReserved(gift.id)"
          >
            {{ isReserved(gift.id) ? 'Reservado ✓' : 'Reservar' }}
          </button>
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredGifts.length === 0" style="padding: 2rem; color: var(--clr-text-muted);">
          Nenhum presente encontrado nessa categoria.
        </div>
      </div>

      <div class="invite-footer" style="margin-top: 2rem;">
        * A reserva avisa o Atlas via WhatsApp para evitar presentes repetidos.
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
          <p style="font-size: 0.8rem;">
            Ao confirmar, você enviará uma mensagem no WhatsApp do Atlas informando sua escolha para que o presente seja marcado como reservado.
          </p>
          <div class="modal-actions">
            <button class="btn btn-secondary" @click="closeModal" style="padding: 0.75rem 1rem;">Cancelar</button>
            <button class="btn btn-accent" @click="confirmReservation" style="padding: 0.75rem 1rem;">Confirmar & Avisar</button>
          </div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { EVENT_SETTINGS, GIFT_SUGGESTIONS } from '../config.js'

export default {
  name: 'GiftsView',
  setup() {
    const settings = EVENT_SETTINGS;
    const selectedCategory = ref('todas');
    const reservedGifts = ref([]);
    const activeModalGift = ref(null);

    // Initialize list of reserved gifts from localStorage
    onMounted(() => {
      const saved = localStorage.getItem('atlas_birthday_reserved_gifts');
      if (saved) {
        try {
          reservedGifts.value = JSON.parse(saved);
        } catch (e) {
          reservedGifts.value = [];
        }
      }
    });

    // Categories available for UI filtering
    const categories = [
      { id: 'todas', label: 'Todos' },
      { id: 'casa', label: 'Casa & Cozinha' },
      { id: 'tecnologia', label: 'Tecnologia' },
      { id: 'experiencia', label: 'Experiência' },
      { id: 'moda', label: 'Estilo & Moda' }
    ];

    // Filter gifts based on active tab
    const filteredGifts = computed(() => {
      if (selectedCategory.value === 'todas') {
        return GIFT_SUGGESTIONS;
      }
      return GIFT_SUGGESTIONS.filter(item => item.category === selectedCategory.value);
    });

    const isReserved = (id) => {
      return reservedGifts.value.includes(id);
    };

    // Open Reservation Confirmation Dialog
    const promptReservation = (gift) => {
      if (isReserved(gift.id)) return;
      activeModalGift.value = gift;
    };

    const closeModal = () => {
      activeModalGift.value = null;
    };

    // Confirm gift reservation locally & trigger WhatsApp message to inform the host
    const confirmReservation = () => {
      if (!activeModalGift.value) return;
      
      const giftId = activeModalGift.value.id;
      const giftName = activeModalGift.value.name;

      if (!reservedGifts.value.includes(giftId)) {
        reservedGifts.value.push(giftId);
        localStorage.setItem('atlas_birthday_reserved_gifts', JSON.stringify(reservedGifts.value));
      }

      // Generate WhatsApp message to host
      const text = encodeURIComponent(`Olá ${settings.hostName}! Dei uma olhada na lista de sugestões de presentes e escolhi te presentear com: *${giftName}*. Já reservei no site! 🎁`);
      const waUrl = `https://wa.me/${settings.whatsappNumber}?text=${text}`;

      closeModal();
      
      // Open WhatsApp in new tab
      window.open(waUrl, '_blank');
    };

    return {
      settings,
      selectedCategory,
      categories,
      filteredGifts,
      isReserved,
      promptReservation,
      activeModalGift,
      closeModal,
      confirmReservation
    };
  }
}
</script>
