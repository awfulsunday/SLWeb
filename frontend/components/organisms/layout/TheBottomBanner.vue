<template>
  <section>
    <v-parallax
      :src="require(`~/assets/vbanner.jpg`)"
      height="400"
      dark
    >
      <v-container>
        <v-layout
          wrap
          align-center
          justify-center
          class="white--text"
        >
          <v-flex
            xs12
            md7
          >
            <v-img
              :src="require(`~/assets/ner_demo.png`)"
              max-height="380"
              contain
              class="ma-5"
            />
          </v-flex>
          <v-flex
            xs12
            md5
          >
            <h1 class="mb-2 display-1 text-xs-center">
              {{ $t('home.footerTitle') }}
            </h1>
            <div class="mt-4">
              <v-btn
                class="blue lighten-2 ml-5"
                dark
                large
                :href="localePath('/demo/named-entity-recognition')"
              >
                {{ $t('home.demoDropDown') }}
              </v-btn>
              
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-parallax>
  </section>
</template>

