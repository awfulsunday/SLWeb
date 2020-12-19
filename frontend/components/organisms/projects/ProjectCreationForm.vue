<template>
  <base-card
    :disabled="!valid"
    :title="$t('overview.createProjectTitle')"
    :agree-text="$t('generic.create')"
    :cancel-text="$t('generic.cancel')"
    @agree="create"
    @cancel="cancel"
  >
    <template #content>
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-text-field
          v-model="name"
          :rules="projectNameRules($t('rules.projectNameRules'))"
          :label="$t('overview.projectName')"
          prepend-icon="mdi-account-multiple"
          data-test="project-name"
          required
          autofocus
        />
        <v-text-field
          v-model="description"
          :rules="descriptionRules($t('rules.descriptionRules'))"
          :label="$t('generic.description')"
          prepend-icon="mdi-clipboard-text"
          data-test="project-description"
          required
        />
      </v-form>
    </template>
  </base-card>
</template>

<script>
import BaseCard from '@/components/molecules/BaseCard'
import { projectNameRules, descriptionRules } from '@/rules/index'

export default {
  components: {
    BaseCard
  },
  props: {
    createProject: {
      type: Function,
      default: () => {},
      required: true
    }
  },
  data() {
    return {
      valid: false,
      name: '',
      description: '',
      projectNameRules,
      descriptionRules
    }
  },

  methods: {
    cancel() {
      this.$emit('close')
    },
    validate() {
      return this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    create() {
      if (this.validate()) {
        this.createProject({
          name: this.name,
          description: this.description,
          guideline: this.$t('guideline.writeGuidelinePrompt')
        })
        this.reset()
        this.cancel()
      }
    }
  }
}
</script>
