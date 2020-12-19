
<template>
  
</template>
<script>
export default {
  layout: 'project',

  data() {
    return {
      e6: 1,
      items: [
        { title: this.$t('projectHome.importData'), videoId: 'dA4ID1DSxCE' },
        { title: this.$t('projectHome.createLabels'), videoId: '1bSML270quU' },
        { title: this.$t('projectHome.addMembers'), videoId: 'NI09dcBz-qA' },
        { title: this.$t('projectHome.defineGuideline'), videoId: 'AvvX3Xs32nA' },
        { title: this.$t('projectHome.annotateDataset'), videoId: 'F3XoSdyiMhA' },
        { title: this.$t('projectHome.viewStatistics'), videoId: 'kfRpa0mNQMY' },
        { title: this.$t('projectHome.exportDataset'), videoId: 'Pfy_QcHEeQ4' }
      ]
    }
  },

  methods: {
    next() {
      this.e6 = Math.max(1, (this.e6 + 1) % (this.items.length + 1))
    },
    prev() {
      this.e6 = Math.max(1, this.e6 - 1)
    }
  },

  validate({ params }) {
    return /^\d+$/.test(params.id)
  }
}
</script>
