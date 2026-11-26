<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: 'facade',
  },
})
</script>

<template>
  <div
    class="photo-placeholder"
    :class="`photo-placeholder--${variant}`"
    role="img"
    :aria-label="`Espacio reservado para fotografía: ${label}`"
  >
    <div class="sun"></div>
    <div class="building">
      <span class="building-roof"></span>
      <span class="building-body"></span>
      <span class="building-columns"></span>
      <span class="building-steps"></span>
    </div>
    <div class="photo-caption">
      <span class="caption-mark"><span class="material-icon" aria-hidden="true">add</span></span>
      <span>{{ label }}</span>
    </div>
    <span class="frame-corner frame-corner--top" aria-hidden="true"></span>
    <span class="frame-corner frame-corner--bottom" aria-hidden="true"></span>
  </div>
</template>

<style scoped>
.photo-placeholder {
  position: relative;
  display: flex;
  min-height: 280px;
  overflow: hidden;
  align-items: flex-end;
  isolation: isolate;
  background:
    linear-gradient(147deg, rgba(122, 23, 55, 0.05), transparent 56%),
    linear-gradient(180deg, #d7c6ae 0%, #eee8dd 64%, #b8a78d 100%);
  color: var(--color-green);
}

.photo-placeholder::before,
.photo-placeholder::after {
  position: absolute;
  z-index: -1;
  content: "";
}

.photo-placeholder::before {
  top: 0;
  right: 13%;
  width: 1px;
  height: 72%;
  background: rgba(255, 255, 255, 0.48);
  box-shadow: -72px 0 rgba(255, 255, 255, 0.32), 72px 0 rgba(255, 255, 255, 0.32);
}

.photo-placeholder::after {
  right: 0;
  bottom: 0;
  left: 0;
  height: 32%;
  background: linear-gradient(0deg, rgba(24, 51, 47, 0.24), transparent);
}

.sun {
  position: absolute;
  top: 12%;
  right: 15%;
  width: clamp(48px, 8vw, 100px);
  aspect-ratio: 1;
  border-radius: 50%;
  background: rgba(186, 134, 74, 0.55);
  filter: blur(1px);
}

.building {
  position: absolute;
  right: 12%;
  bottom: 16%;
  left: 13%;
  height: 48%;
}

.building-roof {
  position: absolute;
  top: 0;
  left: -4%;
  width: 108%;
  height: 15%;
  background: #7a1737;
  clip-path: polygon(3% 100%, 8% 0, 92% 0, 97% 100%);
}

.building-body {
  position: absolute;
  top: 14%;
  right: 2%;
  bottom: 4%;
  left: 2%;
  background: linear-gradient(90deg, #f3eadc, #e1d4c1);
  box-shadow: inset 0 0 0 1px rgba(24, 51, 47, 0.1);
}

.building-columns {
  position: absolute;
  top: 24%;
  right: 12%;
  bottom: 13%;
  left: 12%;
  background: repeating-linear-gradient(
    90deg,
    transparent 0,
    transparent 12%,
    rgba(122, 23, 55, 0.65) 12%,
    rgba(122, 23, 55, 0.65) 13.5%,
    transparent 13.5%,
    transparent 25%
  );
}

.building-steps {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 7%;
  background: #ba864a;
  box-shadow: 0 8px 0 rgba(24, 51, 47, 0.2), 0 16px 0 rgba(24, 51, 47, 0.12);
}

.photo-caption {
  position: relative;
  z-index: 1;
  display: flex;
  width: 100%;
  padding: 1.15rem 1.3rem;
  align-items: center;
  gap: 0.7rem;
  color: #fff;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.025em;
}

.caption-mark {
  display: grid;
  width: 24px;
  height: 24px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  font-size: 1.1rem;
  font-weight: 400;
}

.caption-mark .material-icon {
  font-size: 1rem;
}

.frame-corner {
  position: absolute;
  z-index: 1;
  right: 18px;
  width: 20px;
  height: 20px;
  border-right: 1px solid rgba(255, 255, 255, 0.75);
}

.frame-corner--top {
  top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.75);
}

.frame-corner--bottom {
  bottom: 18px;
  transform: rotate(90deg);
  transform-origin: right center;
}

.photo-placeholder--library {
  min-height: 310px;
  background:
    linear-gradient(145deg, rgba(24, 51, 47, 0.12), transparent 60%),
    linear-gradient(180deg, #d5c7b1 0%, #e8e1d5 66%, #a8987f 100%);
}

.photo-placeholder--library .building-roof {
  background: var(--color-green);
}

.photo-placeholder--library .building-columns {
  background: repeating-linear-gradient(
    90deg,
    rgba(186, 134, 74, 0.68) 0,
    rgba(186, 134, 74, 0.68) 3%,
    transparent 3%,
    transparent 8%
  );
}
</style>
