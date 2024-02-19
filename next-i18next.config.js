const path = require('path')

module.exports = {
    i18n: {
        locales: ['en', 'id'],
        defaultLocale: "en",
    },
    defaultNS: 'main',
    localePath: path.resolve('./locales'),
    reloadOnPrerender: true,
}
