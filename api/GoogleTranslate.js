import request from 'request-promise-native'

export class GoogleTranslate {
    static async translate (message, from, to) {
        let body = await request({
            url: 'http://translate.googleapis.com/translate_a/single',
            qs: {
                client: 'gtx',
                sl: from,
                tl: to,
                dt: 't',
                q: message,
                ie: 'UTF-8',
                oe: 'UTF-8'
            }
        })

        body = body.replace(/null,/gi, '')
        body = JSON.parse(body).slice(0, 2)

        if (!Array.isArray(body[0]))
            return

        return {
            output: body[0].reduce((p, n) => p + n[0], ''),
            source: body[0].reduce((p, n) => p + `${n[1]} `, ''),
            outputLanguage: to,
            sourceLanguage: body[1]
        }
    }
}

export const languages = {
    'af': 'Africâner',
    'sq': 'Albanês',
    'de': 'Alemão',
    'am': 'Amárico',
    'ar': 'Árabe',
    'hy': 'Armênio',
    'az': 'Azerbaijano',
    'eu': 'Basco',
    'bn': 'Bengali',
    'be': 'Bielo-russo',
    'my': 'Birmanês',
    'bs': 'Bósnio',
    'bg': 'Búlgaro',
    'kn': 'Canarês',
    'ca': 'Catalão',
    'kk': 'Cazaque',
    'ceb': 'Cebuano',
    'ny': 'Chicheua',
    'zh-CN': 'Chinês',
    'sn': 'Chona',
    'si': 'Cingalês',
    'ko': 'Coreano',
    'co': 'Corso',
    'ht': 'Crioulo haitiano',
    'hr': 'Croata',
    'ku': 'Curdo',
    'da': 'Dinamarquês',
    'sk': 'Eslovaco',
    'sl': 'Esloveno',
    'es': 'Espanhol',
    'eo': 'Esperanto',
    'et': 'Estoniano',
    'tl': 'Filipino',
    'fi': 'Finlandês',
    'fr': 'Francês',
    'fy': 'Frísio',
    'gd': 'Gaélico escocês',
    'gl': 'Galego',
    'cy': 'Galês',
    'ka': 'Georgiano',
    'el': 'Grego',
    'gu': 'Guzerate',
    'ha': 'Hauçá',
    'haw': 'Havaiano',
    'iw': 'Hebraico',
    'hi': 'Hindi',
    'hmn': 'Hmong',
    'nl': 'Holandês',
    'hu': 'Húngaro',
    'ig': 'Igbo',
    'yi': 'Iídiche',
    'id': 'Indonésio',
    'en': 'Inglês',
    'yo': 'Ioruba',
    'ga': 'Irlandês',
    'is': 'Islandês',
    'it': 'Italiano',
    'ja': 'Japonês',
    'jw': 'Javanês',
    'km': 'Khmer',
    'lo': 'Laosiano',
    'la': 'Latim',
    'lv': 'Letão',
    'lt': 'Lituano',
    'lb': 'Luxemburguês',
    'mk': 'Macedônio',
    'ml': 'Malaiala',
    'ms': 'Malaio',
    'mg': 'Malgaxe',
    'mt': 'Maltês',
    'mi': 'Maori',
    'mr': 'Marata',
    'mn': 'Mongol',
    'ne': 'Nepalês',
    'no': 'Norueguês',
    'ps': 'Pachto',
    'fa': 'Persa',
    'pl': 'Polonês',
    'pt': 'Português',
    'pa': 'Punjabi',
    'ky': 'Quirguiz',
    'ro': 'Romeno',
    'ru': 'Russo',
    'sm': 'Samoano',
    'sr': 'Sérvio',
    'st': 'Sessoto',
    'sd': 'Sindi',
    'so': 'Somali',
    'sw': 'Suaíle',
    'sv': 'Sueco',
    'su': 'Sundanês',
    'tg': 'Tadjique',
    'th': 'Tailandês',
    'ta': 'Tâmil',
    'cs': 'Tcheco',
    'te': 'Telugo',
    'tr': 'Turco',
    'uk': 'Ucraniano',
    'ur': 'Urdu',
    'uz': 'Uzbeque',
    'vi': 'Vietnamita',
    'xh': 'Xhosa',
    'zu': 'Zulu'
}