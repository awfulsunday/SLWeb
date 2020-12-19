export default {
  locales: [
    {
      name: '中文',
      code: 'zh',
      iso: 'zh-CA',
      file: 'zh'
    },
    {
      name: 'English',
      code: 'en',
      iso: 'en-CA',
      file: 'en'
    }
  ],
  lazy: true,
  langDir: 'i18n/',
  defaultLocale: 'zh',
  vueI18n: {
    fallbackLocale: 'zh'
  },
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    onlyOnRoot: true // for SEO purposes
  }
}
