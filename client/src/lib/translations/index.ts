export type Language = 'en' | 'jp';

export const translations = {
  nav: {
    home: {
      en: 'Home',
      jp: 'ホーム'
    },
    bars: {
      en: 'Bars',
      jp: 'バー'
    },
    liveHouses: {
      en: 'Live Houses',
      jp: 'ライブハウス'
    },
    events: {
      en: 'Events',
      jp: 'イベント'
    },
    contact: {
      en: 'Contact',
      jp: 'お問い合わせ'
    }
  },
  home: {
    title: {
      en: "Discover Shimokitazawa's Music Scene",
      jp: '下北沢の音楽シーンを探索'
    },
    subtitle: {
      en: "Your guide to the best live houses and bars in Tokyo's most vibrant music neighborhood",
      jp: '東京で最も活気のある音楽の街のライブハウスとバーガイド'
    },
    featuredVenues: {
      en: 'Featured Venues',
      jp: 'おすすめの会場'
    },
    upcomingEvents: {
      en: 'Upcoming Events',
      jp: '近日開催のイベント'
    },
    viewAll: {
      en: 'View All',
      jp: 'すべて見る'
    }
  },
  bars: {
    title: {
      en: 'Bars in Shimokitazawa',
      jp: '下北沢のバー'
    }
  },
  liveHouses: {
    title: {
      en: 'Live Houses in Shimokitazawa',
      jp: '下北沢のライブハウス'
    }
  },
  search: {
    placeholder: {
      en: 'Search by name or description...',
      jp: '名前や説明で検索...'
    },
    genre: {
      en: 'Genre',
      jp: 'ジャンル'
    }
  },
  venue: {
    capacity: {
      en: 'seats',
      jp: '席'
    },
    features: {
      en: 'Features',
      jp: '特徴'
    },
    details: {
      en: 'Venue Details',
      jp: '会場詳細'
    },
    genre: {
      en: 'Genre',
      jp: 'ジャンル'
    },
    contact: {
      en: 'Contact',
      jp: '連絡先'
    },
    website: {
      en: 'Website',
      jp: 'ウェブサイト'
    }
  },
  events: {
    title: {
      en: 'Upcoming Events',
      jp: '近日開催のイベント'
    },
    searchPlaceholder: {
      en: 'Search events...',
      jp: 'イベントを検索...'
    }
  },
  contact: {
    title: {
      en: 'Contact Us',
      jp: 'お問い合わせ'
    },
    subtitle: {
      en: 'Have questions about venues or events? We\'re here to help!',
      jp: '会場やイベントについてご質問がありますか？お気軽にお問い合わせください！'
    },
    form: {
      name: {
        en: 'Name',
        jp: '名前'
      },
      email: {
        en: 'Email',
        jp: 'メールアドレス'
      },
      message: {
        en: 'Message',
        jp: 'メッセージ'
      },
      send: {
        en: 'Send Message',
        jp: 'メッセージを送信'
      },
      sending: {
        en: 'Sending...',
        jp: '送信中...'
      }
    }
  }
};

export type TranslationKey = keyof typeof translations;