<template>
  <v-app-bar
    app
    clipped-left
  >
    <slot name="leftDrawerIcon" />
    <nuxt-link
      to="/"
      style="line-height:0;"
    >
      <img src="~/assets/icon.png" height="48">
    </nuxt-link>
    <v-toolbar-title
      class="ml-2 d-none d-sm-flex"
    >
      doccano
    </v-toolbar-title>
    <v-btn
      v-if="isAuthenticated && isIndividualProject"
      text
      style="text-transform:none"
    >
      <v-icon small class="mr-1">
        mdi-hexagon-multiple
      </v-icon>
      <span> {{ currentProject.name }}</span>
    </v-btn>
    <div class="flex-grow-1" />
    <the-color-mode-switcher />
    <locale-menu />
    <v-btn
      v-if="isAuthenticated"
      text
      @click="$router.push(localePath('/projects'))"
    >
      {{ $t('header.projects') }}
    </v-btn>
    <v-btn
      v-if="!isAuthenticated"
      outlined
      @click="$router.push(localePath('/auth'))"
    >
      {{ $t('user.login') }}
    </v-btn>
    <v-menu
      v-if="isAuthenticated"
      offset-y
    >
      <template v-slot:activator="{ on }">
        <v-btn on icon v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-subheader>{{ getUsername() }}</v-subheader>
        <v-list-item @click="signout">
          <v-list-item-icon>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t('user.signOut') }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import TheColorModeSwitcher from '@/components/organisms/layout/TheColorModeSwitcher'
import LocaleMenu from '@/components/organisms/layout/LocaleMenu'

export default {
  components: {
    TheColorModeSwitcher,
    LocaleMenu
  },

  computed: {
    ...mapGetters('auth', ['isAuthenticated', 'getUsername']),
    ...mapGetters('projects', ['currentProject']),

    isIndividualProject() {
      return this.$route.name && this.$route.name.startsWith('projects-id')
    }
  },

  methods: {
    ...mapActions('auth', ['logout']),
    signout() {
      this.logout()
      this.$router.push(this.localePath('/'))
    }
  }
}
</script>
