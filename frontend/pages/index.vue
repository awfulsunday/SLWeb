<template>
  <v-main>
    <the-top-banner />
    <the-bottom-banner />
  </v-main>
</template>

<script>
import TheTopBanner from '@/components/organisms/layout/TheTopBanner'
import TheBottomBanner from '@/components/organisms/layout/TheBottomBanner'

export default {
  components: {
    TheTopBanner,
    TheBottomBanner
  }
}
</script>
