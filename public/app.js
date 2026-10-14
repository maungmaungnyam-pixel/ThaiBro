(() => {
  const API_BASE = 'https://thai-bro.fork-thursday-3b9.workers.dev';
  const $ = (id) => document.getElementById(id);
  const newsList = $('news-list'), jobsList = $('jobs-list'), homeList = $('home-list'), searchInput = $('search');
  const newsStatus = $('feed-status'), newsStatusText = $('feed-status-text'), jobsStatus = $('jobs-status'), jobsStatusText = $('jobs-status-text');
  const homeView = $('home-view'), newsView = $('news-panel'), jobsView = $('jobs-panel'), notificationsView = $('notifications-panel'), profileView = $('profile-view');
  const appShell = $('app'), siteHeader = $('site-header'), bottomNav = $('primary-tabs'), drawer = $('app-drawer'), drawerBackdrop = $('drawer-backdrop');
  const detail = $('detail-view'), searchPanel = $('search-panel');
  const photos = ['/images/kitchen.jpg', '/images/thai-food-stall.jpg', '/images/chef.jpg', '/images/bangkok-street.jpg'];
  const roles = {
    worker: {label: 'အလုပ်လုပ်ဖို့', short: 'အလုပ်သမား', keywords: ['work permit', 'worker', 'labour', 'labor', 'visa', 'ci', 'အလုပ်', 'အလုပ်သမား', 'အလုပ်လုပ်ခွင့်', 'အလုပ်သမားအခွင့်အရေး', 'လုပ်ခ', 'လစာ', 'ရွှေ့ပြောင်း']},
    student: {label: 'ပညာသင်ဖို့', short: 'ကျောင်းသား/ကျောင်းသူ', keywords: ['student', 'university', 'education', 'scholarship', 'campus', 'study', 'ကျောင်း', 'တက္ကသိုလ်', 'ပညာရေး', 'ပညာသင်', 'ကျောင်းသား', 'ပညာသင်ဆု']},
    business: {label: 'စီးပွားရေး / ရင်းနှီးမြှုပ်နှံဖို့', short: 'စီးပွားရေးလုပ်ငန်းရှင်', keywords: ['business', 'investment', 'investor', 'company', 'startup', 'sme', 'trade', 'tax', 'business license', 'လုပ်ငန်း', 'စီးပွားရေး', 'ရင်းနှီးမြှုပ်နှံ', 'ကုမ္ပဏီ', 'အခွန်', 'လိုင်စင်']}
  };
  const messages = {
    my: {
      home: 'ပင်မ', news: 'သတင်း', jobs: 'အလုပ်', profile: 'ကိုယ်ရေး',
      searchPlaceholder: 'သတင်း၊ အလုပ်အကိုင် ရှာမယ်…', searchLabel: 'သတင်းနှင့် အလုပ် ရှာရန်', searchSubmitLabel: 'ရှာမယ်',
      welcomeEyebrow: 'အကိုက ထိုင်းမှာ ညီ/ညီမတို့ဘေးမှာ ရှိနေတယ်', welcomeTitle: 'ထိုင်းနိုင်ငံမှာ သင့်ရဲ့မိတ်ဆွေ။', welcomeIntro: 'သတင်း၊ အလုပ်အကိုင်နဲ့ နေ့စဉ်အကူအညီတွေကို နွေးနွေးထွေးထွေး ကူညီပေးဖို့ ဒီမှာရှိတယ်။', welcomeStart: 'စတင်မယ်', workerRole: 'အလုပ်လုပ်ဖို့', workerRoleShort: 'အလုပ်သမား', studentRole: 'ပညာသင်ဖို့', studentRoleShort: 'ကျောင်းသား/ကျောင်းသူ', businessRole: 'စီးပွားရေး / ရင်းနှီးမြှုပ်နှံဖို့', businessRoleShort: 'စီးပွားရေး', welcomeNote: 'ညီ/ညီမတို့ရဲ့ ခရီးလမ်းတစ်လျှောက် အကိုက အတူရှိနေမယ်။', noPreference: 'အခုထိ မရွေးရသေးပါ', notifications: 'အသိပေးချက်များ', notificationsHeading: 'အသိပေးချက်များ', notificationsCaption: 'အရေးကြီးတဲ့ အပ်ဒိတ်တွေကို ဒီနေရာမှာ ကြည့်ပါ။', noNotificationsTitle: 'အသိပေးချက် မရှိသေးပါ', drawerLabel: 'အဓိက မီနူး', drawerNavigation: 'မီနူး', mainNavigation: 'အဓိက လမ်းညွှန်', openMenuLabel: 'မီနူးဖွင့်ရန်', closeMenuLabel: 'မီနူးပိတ်ရန်', closeLabel: 'ပိတ်ရန်', searchClose: 'ရှာဖွေမှု ပိတ်ရန်',
      guestName: 'ဧည့်သည်', guestEmail: 'အကောင့်မလိုပါ', drawerWelcome: 'Thai Bro မှ ကြိုဆိုပါတယ်', drawerGuestCopy: 'အကောင့်ဖွင့်ရန်မလိုဘဲ လွတ်လပ်စွာ အသုံးပြုနိုင်ပါတယ်။', settingsMenu: 'ဆက်တင်များ', openSettings: 'ဆက်တင်များကို ကြည့်ရန်', communityTagline: 'ယုံကြည်စိတ်ချရသော အသိုင်းအဝိုင်း လမ်းညွှန်',
      homeHeading: 'ထိုင်းနိုင်ငံမှာ ဘာတွေဖြစ်နေလဲ', homeCaption: 'သတင်းနဲ့ အလုပ်အကိုင်အသစ်တွေကို တစ်နေရာတည်းမှာ ကြည့်ပါ။',
      safetyReminder: 'အမြဲတမ်း သတိပေးချက်', public: 'အများမြင်', safetyTitle: 'အကို့သတိပေးချက်',
      safetyBody: 'ငွေကြိုတောင်းတဲ့ အလုပ်ကြော်ငြာတွေကို သေချာစစ်ပါ။ အလုပ်ရဖို့ ငွေကြိုမပေးပါနဲ့။',
      like: 'နှစ်သက်', comment: 'မှတ်ချက်', save: 'သိမ်းမယ်',
      broAlert: 'အကို့သတိပေးချက်', read: 'ကြည့်မယ်', sourceReminder: 'သတင်းတိုင်းအတွက် မူရင်းရင်းမြစ်ကို ဖွင့်ကြည့်နိုင်ပါတယ်။',
      latestNews: 'နောက်ဆုံးသတင်းများ', newsCaption: 'ယုံကြည်ရတဲ့ ရင်းမြစ်က သတင်းတွေကို အကိုက စုစည်းထားတယ်။ ၁၅ မိနစ်တစ်ကြိမ် အသစ်စစ်ဆေးသည်။',
      latestJobs: 'အလုပ်အကိုင်အသစ်များ', jobsCaption: 'လစာ၊ နေရာနဲ့ ဆက်သွယ်ရန်ကို မစခင် အရင်စစ်ပါ ညီ/ညီမ။',
      jobSafetyTitle: 'အလုပ်လက်ခံမီ အကို့စကားလေး', jobSafetyBody: 'အလုပ်ရဖို့ ငွေကြိုမပေးပါနဲ့။ စာချုပ်၊ လစာ၊ နားရက်နဲ့ အလုပ်လုပ်ခွင့်ကို စစ်ပြီးမှ ဆုံးဖြတ်ပါ။', officialJobs: 'တရားဝင် အလုပ်စာရင်းကို စစ်ကြည့်မယ် ↗',
      menuLabel: 'MENU', profileHeading: 'ကိုယ်ရေးနှင့် ဆက်တင်များ', profileIntro: 'ဘာသာစကား၊ အကူအညီနဲ့ အက်ပ်ဆိုင်ရာ ရွေးချယ်မှုများကို စီမံပါ။',
      languageTitle: 'Language / ဘာသာစကား', languageHelp: 'အက်ပ်အင်တာဖေ့စ် ဘာသာစကားရွေးပါ', sosSettings: 'SOS အရေးပေါ် အကူအညီများ',
      sosHelp: 'သံရုံး · ရဲ · ဆေးဘက် · အလုပ်သမားအခွင့်အရေး', emergency: 'အရေးပေါ်',
      notificationSettings: 'အသိပေးချက်များ', notificationSettingsHelp: 'အသိပေးချက်လက်ခံမှုကို စီမံရန်',
      savedPosts: 'သိမ်းထားသော ပို့စ်များ', savedHelp: 'သိမ်းထားသည့်အကြောင်းအရာများကို ပြန်ကြည့်ရန်',
      personalize: 'သင့်အတွက် စိတ်ကြိုက်ပြင်မယ်', profileStored: 'သင်ရွေးထားတဲ့အကြောင်းအရာအမျိုးအစားကို ဒီစက်ထဲမှာပဲ သိမ်းထားပါတယ်။', clearPreference: 'အကြောင်းအရာအားလုံးပြမယ်', allTopics: 'အကြောင်းအရာအားလုံး', preferenceCleared: 'သတင်းအမျိုးအစားအားလုံးကို ပြပါမယ်။', change: 'ပြောင်းမယ်',
      aboutThaiBro: 'Thai Bro အကြောင်း', aboutIntro: 'တရားဝင်သတင်းရင်းမြစ်က အကြောင်းအရာ၊ အလုပ်ကြော်ငြာနဲ့ အရေးပေါ်အကူအညီကို တစ်နေရာတည်းမှာ ရှာနိုင်ပါတယ်။', aboutUsHeading: 'ကျွန်ုပ်တို့အကြောင်း', aboutUsCopy: 'ထိုင်းနိုင်ငံမှာ သင့်မိတ်ဆွေတစ်ယောက်လို ကျွန်တော် ရှိနေမယ်။ သိထားသမျှကို ပြောပြပြီး မသိတာရှိရင်လည်း ရှာဖွေပြီး အဖြေကို ပြန်လည်ရှာပေးမယ်။', aboutFeaturesHeading: 'ဒီမှာ တွေ့နိုင်တာများ', aboutFeaturesCopy: 'ထိုင်းနိုင်ငံရဲ့ အသုံးဝင်တဲ့သတင်းများ၊ အလုပ်အကိုင်စာရင်းများနဲ့ နေ့စဉ်ဘဝအတွက် လက်တွေ့ကျတဲ့ အကူအညီများကို တစ်နေရာတည်းမှာ ရယူနိုင်ပါတယ်။', aboutNoteHeading: 'အသုံးဝင်သော မှတ်ချက်',
      aboutDisclaimer: 'Thai Bro သည် လွတ်လပ်သော အသိုင်းအဝိုင်းလမ်းညွှန်ဖြစ်ပြီး အစိုးရဝဘ်ဆိုက် သို့မဟုတ် ဥပဒေအကြံပေး မဟုတ်ပါ။ အရေးကြီးသောအချက်အလက်များကို သက်ဆိုင်ရာအာဏာပိုင်ထံ အတည်ပြုပါ။',
      emergencyHelp: 'အရေးပေါ်အချိန်မှာ', sosHeading: 'SOS / အကူအညီလမ်းညွှန်',
      sosIntro: 'အရေးပေါ်အခြေအနေဆိုရင် အခုချက်ချင်း ခေါ်ပါ။ မသေချာရင် အနီးနားက ယုံကြည်ရသူကိုပါ အသိပေးပါ။',
      medicalEmergency: 'အသက်အန္တရာယ် သို့မဟုတ် ဆေးဘက်အရေးပေါ်လား?', callEmergency: 'ထိုင်းအရေးပေါ်နံပါတ်ကို အခုခေါ်ပါ။', medicalHelp: 'ဆေးဘက်အရေးပေါ်', emergencyNumbers: 'အရေးပေါ်နှင့် အကူအညီဖုန်းများ',
      savedHeading: 'သိမ်းထားတဲ့အကြောင်းအရာ', backToSettings: 'ဆက်တင်များသို့', savedReadOnly: 'သိမ်းထားတဲ့ပို့စ်တွေကို ဒီစက်ထဲမှာပဲ လုံခြုံစွာ သိမ်းထားပါတယ်။',
      broGuide: 'အကို့လမ်းညွှန်', communityComments: 'ညီ/ညီမတို့ မှတ်ချက်များ', commentHelp: 'မှတ်ချက်များကို ဖတ်ရှုနိုင်ပြီး ရေးသားခြင်းကို မကြာမီ ထည့်သွင်းပါမည်။',
      recent: 'မကြာသေးမီက', newsLoading: 'သတင်းတင်နေတယ်…', jobsLoading: 'အလုပ်တင်နေတယ်…',
      updated: 'နောက်ဆုံးအပ်ဒိတ်', newsUnavailable: 'သတင်းမရနိုင်ပါ', partialNews: 'အချို့သတင်း မရနိုင်ပါ',
      noNews: 'သတင်းမရှိသေးပါ', noJobs: 'မကြာမီ', soon: 'မကြာမီ', jobsUnavailable: 'အလုပ်စာရင်း မရနိုင်ပါ',
      noMatches: 'ကိုက်ညီတဲ့အကြောင်းအရာ မတွေ့ပါ', noJobMatches: 'ကိုက်ညီတဲ့အလုပ် မတွေ့ပါ',
      emptyText: 'ခဏနေပြီး ပြန်စစ်ကြည့်ပါနော်။', noComments: 'မှတ်ချက် မရှိသေးပါ',
      noCommentsText: 'အခုထိ မှတ်ချက်မရှိသေးပါ။',
      commentsUnavailable: 'မှတ်ချက်ကို ခဏမရနိုင်ပါ', tryAgain: 'နောက်မှပြန်စစ်ပါနော်။',
      unverified: 'အကိုက မစစ်ဆေးရသေးပါ', verified: 'အကိုက စစ်ဆေးအတည်ပြုထားသည်',
      scamTag: 'အကို့သတိပေးချက်', featuredFor: 'သင့်အတွက်', newsType: 'သတင်း', jobType: 'အလုပ်',
      publicPost: 'အများမြင် ပို့စ်', refreshDone: 'အခုပဲ အသစ်ပြန်တင်ပြီးပါပြီ', refreshingFeed: 'အသစ်ပြန်စစ်နေပါတယ်…', refreshFailed: 'လတ်တတလော အသစ်ပြန်စစ်မရပါ။',
      noNotifications: 'အသိပေးချက်စနစ်ကို မဖွင့်ရသေးပါ။', refreshLabel: 'ပြန်စစ်ရန်',
      pullRefresh: 'လွှတ်လိုက်ရင် အသစ်ပြန်စစ်မယ်', scamTail: '— ငွေကြိုတောင်းမှုကို သတိထားပြီး အရင်စစ်ပါ။'
    },
    en: {
      home: 'Home', news: 'News', jobs: 'Jobs', profile: 'Profile',
      searchPlaceholder: 'Search news and jobs…', searchLabel: 'Search news and jobs', searchSubmitLabel: 'Search',
      welcomeEyebrow: 'A little help goes a long way', welcomeTitle: 'Your friend in Thailand.', welcomeIntro: 'News, jobs, and everyday support to help you feel at home.', workerRole: 'For work', workerRoleShort: 'Worker', studentRole: 'For study', studentRoleShort: 'Student', businessRole: 'For business or investment', businessRoleShort: 'Business', welcomeNote: 'Here for you, wherever your journey takes you.', noPreference: 'No preference selected', notifications: 'Notifications', notificationsHeading: 'Notifications', notificationsCaption: 'Important updates will appear here.', noNotificationsTitle: 'No notifications yet', drawerLabel: 'Main menu', drawerNavigation: 'Menu', mainNavigation: 'Main navigation', openMenuLabel: 'Open menu', closeMenuLabel: 'Close menu', closeLabel: 'Close', searchClose: 'Close search',
      guestName: 'Guest', guestEmail: 'No account needed', drawerWelcome: 'Welcome to Thai Bro', drawerGuestCopy: 'Browse freely — no account required.', welcomeStart: 'Start', settingsMenu: 'Settings', openSettings: 'Open settings', communityTagline: 'A trusted guide for the community',
      homeHeading: 'What’s happening in Thailand', homeCaption: 'News and job updates, all in one place.',
      safetyReminder: 'Safety reminder', public: 'Public', safetyTitle: 'A note from your Bro',
      safetyBody: 'Check job listings that ask for money upfront. Never pay an advance fee to get a job.',
      like: 'Like', comment: 'Comment', save: 'Save',
      broAlert: 'A note from your Bro', read: 'Read', sourceReminder: 'Open the original source for each news story.',
      latestNews: 'Latest news', newsCaption: 'Updates from trusted sources, checked every 15 minutes.',
      latestJobs: 'Latest jobs', jobsCaption: 'Check the pay, location, and contact details before you proceed.',
      jobSafetyTitle: 'A quick note before you accept a job', jobSafetyBody: 'Never pay to get a job. Check the contract, pay, days off, and work authorization before deciding.', officialJobs: 'Check official job listings ↗',
      menuLabel: 'MENU', profileHeading: 'Profile & settings', profileIntro: 'Manage your language, emergency help, and app preferences.',
      languageTitle: 'Language / ဘာသာစကား', languageHelp: 'Choose the app interface language', sosSettings: 'SOS emergency help',
      sosHelp: 'Embassy · Police · Medical · Labour rights', emergency: 'Emergency',
      notificationSettings: 'Notifications', notificationSettingsHelp: 'Manage notification preferences',
      savedPosts: 'Saved posts', savedHelp: 'Revisit saved content',
      personalize: 'Personalize your feed', profileStored: 'Your topic preference is saved only on this device.', clearPreference: 'Show all topics', allTopics: 'All topics', preferenceCleared: 'Your feed will now show all topics.', change: 'Change',
      aboutThaiBro: 'About Thai Bro', aboutUsHeading: 'About us', aboutUsCopy: 'Think of me as your friend in Thailand. I’ll share what I know, and when I don’t have the answer, I’ll look it up and find it for you.', aboutFeaturesHeading: 'What you’ll find here', aboutFeaturesCopy: 'Helpful news, job listings, and practical support for everyday life in Thailand—all gathered in one friendly place.', aboutNoteHeading: 'A helpful note',
      aboutDisclaimer: 'Thai Bro is an independent community guide, not a government website or legal adviser. Please confirm important details with the relevant authority.',
      emergencyHelp: 'If you need urgent help', sosHeading: 'SOS / Emergency help',
      sosIntro: 'Call now in an emergency. If you are unsure, also tell someone you trust nearby.',
      medicalEmergency: 'Is this a life-threatening or medical emergency?', callEmergency: 'Call the Thai emergency number now.', medicalHelp: 'Medical emergency', emergencyNumbers: 'Emergency and support contacts',
      savedHeading: 'Saved content', backToSettings: 'Back to settings', savedReadOnly: 'Your saved posts are stored privately on this device.',
      broGuide: 'Your guide', communityComments: 'Community comments', commentHelp: 'Comments are read-only for now.',
      recent: 'Recently', newsLoading: 'Loading news…', jobsLoading: 'Loading jobs…',
      updated: 'Updated', newsUnavailable: 'News unavailable', partialNews: 'Some news is unavailable',
      noNews: 'No news yet', noJobs: 'Soon', soon: 'Soon', jobsUnavailable: 'Jobs unavailable',
      noMatches: 'No matching stories found', noJobMatches: 'No matching jobs found',
      emptyText: 'Please check again in a little while.', noComments: 'No comments yet',
      noCommentsText: 'There are no comments yet.',
      commentsUnavailable: 'Comments are temporarily unavailable', tryAgain: 'Please try again later.',
      unverified: 'Not yet checked by Thai Bro', verified: 'Checked by Thai Bro',
      scamTag: 'Safety warning', featuredFor: 'For you', newsType: 'News', jobType: 'Job',
      publicPost: 'Public post', refreshDone: 'Just refreshed', refreshingFeed: 'Refreshing…', refreshFailed: 'Couldn’t refresh just now.',
      noNotifications: 'Notifications are not enabled yet.', refreshLabel: 'Refresh',
      pullRefresh: 'Release to refresh', scamTail: '— watch for requests to pay money upfront.'
    }
  };
  let language = (() => { try { if (localStorage.getItem('thaibro.default-english.migration.v1') !== 'done') { localStorage.setItem('thaibro.language.v2', 'en'); localStorage.setItem('thaibro.default-english.migration.v1', 'done'); return 'en'; } return localStorage.getItem('thaibro.language.v2') === 'my' ? 'my' : 'en'; } catch { return 'en'; } })();
  const uiText = {
    my: {
      seeMore: 'ပိုမိုဖတ်ရှုရန်', seeLess: 'လျှော့ဖတ်ရန်', sourceBy: 'ရင်းမြစ် —', photoBy: 'ဓာတ်ပုံ —', views: 'ကြည့်ရှုမှု',
      themeTitle: 'လင်း/မှောင်စနစ်', themeHelp: 'သင့်မျက်နှာပြင်အတွက် အလင်း သို့မဟုတ် အမှောင် ရွေးပါ',
      back: 'နောက်သို့', helpTitle: 'အကူအညီနှင့် ထောက်ပံ့မှု', helpIntroShort: 'အက်ပ်အသုံးပြုနည်းနှင့် လမ်းညွှန်ချက်များ',
      helpIntro: 'Thai Bro ကို အသုံးပြုရာတွင် လိုအပ်သော လမ်းညွှန်ချက်များကို ဤနေရာတွင် ကြည့်နိုင်ပါသည်။',
      helpFeedTitle: 'သတင်းနှင့် အလုပ်ကို ကြည့်ရှုရန်', helpFeedBody: 'ပင်မ၊ သတင်းနှင့် အလုပ် တက်ဘ်များကို အသုံးပြုပြီး နောက်ဆုံးအပ်ဒိတ်များကို ကြည့်ပါ။ ရှာဖွေရန် အပေါ်ဘက်ရှိ မှန်ဘီလူးကို နှိပ်ပါ။',
      helpJobsTitle: 'အလုပ်အကိုင် လုံခြုံရေး', helpJobsBody: 'အကိုစစ်ဆေးထားသည်ဟု ဖော်ပြထားခြင်းသည် Thai Bro ၏ စစ်ဆေးချက်သာဖြစ်ပြီး အစိုးရအာမခံချက် မဟုတ်ပါ။ ငွေကြိုမပေးပါနှင့်။',
      helpEmergencyTitle: 'အရေးပေါ် အကူအညီ', helpEmergencyBody: 'အရေးပေါ်အချိန်တွင် SOS စာမျက်နှာမှ ထိုင်းနိုင်ငံ၏ ဖုန်းနံပါတ်များနှင့် ဆက်သွယ်ရန်ရင်းမြစ်များကို ကြည့်ပါ။',
      openEmergencyHelp: 'SOS အကူအညီကို ဖွင့်ရန်', helpAccountTitle: 'အကောင့်မလိုဘဲ အသုံးပြုနိုင်သည်',
      helpAccountBody: 'Thai Bro ကို အကောင့်ဖွင့်ရန်မလိုဘဲ လွတ်လပ်စွာ အသုံးပြုနိုင်ပါတယ်။',
      authTagline: 'မြန်မာနိုင်ငံမှ ထိုင်းရောက်မိတ်ဆွေများအတွက် သတင်း၊ အလုပ်အကိုင်နှင့် အကူအညီများ',
      commentLoading: 'မှတ်ချက်များကို ဖွင့်နေပါတယ်…', noComments: 'မှတ်ချက် မရှိသေးပါ', commentingSoon: 'မှတ်ချက်ရေးသားခြင်းကို မကြာမီရရှိပါမည်။', like: 'နှစ်သက်သည်', saved: 'သိမ်းပြီးပါပြီ'
    },
    en: {
      seeMore: 'See more', seeLess: 'See less', sourceBy: 'Source by:', photoBy: 'Photo by:', views: 'views',
      themeTitle: 'Light / dark mode', themeHelp: 'Choose a light or dark appearance for your screen',
      back: 'Back', helpTitle: 'Help & Support', helpIntroShort: 'Guides and ways to use the app',
      helpIntro: 'Find practical guidance for using Thai Bro here.',
      helpFeedTitle: 'Browse news and jobs', helpFeedBody: 'Use Home, News, and Jobs to browse the latest updates. Tap the search icon in the top bar to search.',
      helpJobsTitle: 'Job-listing safety', helpJobsBody: '“Checked by Thai Bro” means a Thai Bro review, not a government guarantee. Never pay an advance fee for a job.',
      helpEmergencyTitle: 'Emergency assistance', helpEmergencyBody: 'In an emergency, open SOS for Thailand phone numbers and support organizations.',
      openEmergencyHelp: 'Open SOS help', helpAccountTitle: 'Browse without an account',
      helpAccountBody: 'You can browse Thai Bro freely—no account is needed.',
      authTagline: 'News, jobs, and support for Myanmar friends living in Thailand',
      commentLoading: 'Loading comments…', noComments: 'No comments yet', commentingSoon: 'Commenting is coming soon.', like: 'Like', saved: 'Saved'
    }
  };
  const t = (key) => uiText[language][key] || messages[language][key] || uiText.my[key] || messages.my[key] || key;
  const profileCopy = {
    my: {
      contacts: [
        ['ရဲတပ်ဖွဲ့ · အရေးပေါ်', 'ထိုင်းရဲတပ်ဖွဲ့', 'အရေးပေါ် ရဲအကူအညီ'],
        ['ခရီးသွားရဲ', 'Tourist Police', 'ခရီးသွားရဲ အရေးပေါ်အကူအညီ'],
        ['လူနာတင်ယာဉ် · ဆေးရုံ', 'အရေးပေါ်ဆေးဘက်အကူအညီ', 'လူနာတင်ယာဉ်နဲ့ ဆေးဘက်အရေးပေါ်'],
        ['မြန်မာသံရုံး · ဘန်ကောက်', 'မြန်မာသံရုံး', 'ကောင်စစ်နှင့် နိုင်ငံသားဆိုင်ရာအကူအညီ'],
        ['မြန်မာအလုပ်သမားအရေး', 'အလုပ်သမားရေးရာ ဖုန်းဆက်သွယ်ရေး', 'မြန်မာသံရုံး အလုပ်သမားဌာန · Call Center'],
        ['ရွှေ့ပြောင်းလုပ်သားအကူအညီ · ချင်းမိုင်', 'MAP Foundation', 'ရွှေ့ပြောင်းလုပ်သားအခွင့်အရေးနှင့် ဝန်ဆောင်မှုများ']
      ],
      call: 'ခေါ်မယ်', numbers: 'နံပါတ်များ ↗', website: 'ဝဘ်ဆိုက် ↗',
      caveat: 'ဖုန်းနံပါတ်နဲ့ ဝန်ဆောင်ချိန်တွေ ပြောင်းနိုင်ပါတယ်။ မခေါ်ခင် သက်ဆိုင်ရာအဖွဲ့ရဲ့ မူရင်းစာမျက်နှာမှာ ပြန်စစ်ပါ။ နံပါတ်များကို ၂၀၂၆ အောက်တိုဘာတွင် စစ်ဆေးထားသည်။',
      guideTitle: 'လိုအပ်တာကို တစ်ဆင့်ချင်းလုပ်ကြမယ်', callPrimary: '1669 ကိုခေါ်ရန်',
      guides: [
        {title: 'Passport သက်တမ်းတိုးရန်', subtitle: 'သံရုံးနဲ့ ရက်ချိန်းကို အရင်စစ်ပါ', steps: ['Passport သက်တမ်းကုန်မည့်ရက်ကို ကြည့်ပြီး အချိန်မီ စတင်ပြင်ဆင်ပါ။', 'မြန်မာသံရုံး၏ တရားဝင်ဝဘ်ဆိုက် သို့မဟုတ် ဖုန်းကတစ်ဆင့် လက်ရှိလိုအပ်ချက်၊ ရက်ချိန်း၊ အခကြေးငွေကို အတည်ပြုပါ။', 'သံရုံးက တောင်းထားသော မူရင်းစာရွက်စာတမ်းနှင့် မိတ္တူများကိုသာ ပြင်ဆင်ပါ။ အချက်အလက်ဟောင်းကို မမှီခိုပါနဲ့။', 'စာရွက်စာတမ်းကို မသိတဲ့ပွဲစားထံ မအပ်ပါနဲ့။ ပေးငွေတိုင်းအတွက် တရားဝင်ပြေစာယူပါ။'], link: 'သံရုံးဝဘ်ဆိုက်ကိုဖွင့်ရန် ↗'},
        {title: 'အလုပ်လုပ်ခွင့် သက်တမ်းတိုးရန်', subtitle: 'အလုပ်ရှင်နဲ့ တာဝန်ရှိဌာနကို အတည်ပြုပါ', steps: ['လက်ရှိ work permit နဲ့ သက်ဆိုင်ရာခွင့်ပြုချက် သက်တမ်းကုန်မည့်ရက်ကို မှတ်ထားပါ။', 'အလုပ်ရှင်/လူ့စွမ်းအားအရင်းအမြစ်ဌာနကို စောစောဆက်သွယ်ပြီး ဘယ်ဌာန၊ ဘယ်လုပ်ငန်းစဉ်နဲ့ ဆောင်ရွက်မယ်ဆိုတာ အတည်ပြုပါ။', 'လက်ရှိစာရွက်စာတမ်းစာရင်း၊ ကုန်ကျစရိတ်နဲ့ အချိန်ကာလကို ထိုင်းအလုပ်အကိုင်ဌာန (DOE) သို့မဟုတ် သက်ဆိုင်ရာရုံးမှာ ထပ်စစ်ပါ။', 'ပေးငွေတိုင်းအတွက် ပြေစာသိမ်းပါ။ စာရွက်အလွတ်၊ မမှန်ကန်တဲ့စာရွက် သို့မဟုတ် မရှင်းလင်းတဲ့ငွေတောင်းခံမှုကို လက်မခံပါနဲ့။'], link: 'ထိုင်းအလုပ်အကိုင်ဌာနကိုဖွင့်ရန် ↗'}
      ],
      legal: 'ဒီအချက်အလက်တွေက အထွေထွေလမ်းညွှန်ပါ။ ကိုယ့်အခြေအနေ၊ စည်းမျဉ်းနဲ့ နောက်ဆုံးလိုအပ်ချက်ကို သက်ဆိုင်ရာရုံးမှာ အတည်ပြုပြီးမှ လုပ်ဆောင်ပါ။'
    },
    en: {
      contacts: [
        ['Police · Emergency', 'Thailand Police', 'Emergency police assistance'],
        ['Tourist Police', 'Tourist Police', 'Emergency assistance for visitors'],
        ['Ambulance · Medical', 'Emergency medical services', 'Ambulance and urgent medical help'],
        ['Myanmar Embassy · Bangkok', 'Myanmar Embassy', 'Consular and citizen support'],
        ['Myanmar labour support', 'Labour support hotline', 'Myanmar Embassy labour department · Call Center'],
        ['Migrant worker support · Chiang Mai', 'MAP Foundation', 'Migrant worker rights and services']
      ],
      call: 'Call', numbers: 'Phone numbers ↗', website: 'Website ↗',
      caveat: 'Phone numbers and service hours can change. Check the organization’s original page before calling. Numbers were checked in October 2026.',
      guideTitle: 'Step-by-step guides', callPrimary: 'Call 1669',
      guides: [
        {title: 'Renewing your passport', subtitle: 'Check the embassy and appointment first', steps: ['Check your passport expiry date and start preparing in good time.', 'Confirm current requirements, appointments, and fees through the Myanmar Embassy’s official website or phone.', 'Prepare only the original documents and copies requested by the embassy. Do not rely on old information.', 'Do not hand your documents to an unknown broker. Keep official receipts for every payment.'], link: 'Open embassy website ↗'},
        {title: 'Renewing your work permit', subtitle: 'Confirm with your employer and the relevant office', steps: ['Note the expiry date of your work permit and any related authorization.', 'Contact your employer or HR early and confirm which office and process will handle the renewal.', 'Check the current document list, costs, and timing with Thailand’s Department of Employment (DOE) or the relevant office.', 'Keep receipts. Do not accept blank documents, false papers, or unclear payment demands.'], link: 'Open Thailand Department of Employment ↗'}
      ],
      legal: 'These are general guides, not legal advice. Confirm requirements for your case, current rules, and latest steps with the relevant office.'
    }
  };
  let news = [], jobs = [], currentView = 'home', activePost = null, lastFocus = null;
  let toastTimer, pullStatusTimer, drawerCloseTimer, searchCloseTimer, refreshing = false, profile = null, profilePane = 'settings', previousView = 'home';
  let savedIds = new Set(), likedIds = new Set();
  try { savedIds = new Set(JSON.parse(localStorage.getItem('thaibro.savedStories.v2') || '[]').map(String)); } catch {}
  try { likedIds = new Set(JSON.parse(localStorage.getItem('thaibro.likedStories.v1') || '[]').map(String)); } catch {}
  try { profile = JSON.parse(localStorage.getItem('thaibro.profile.v1') || 'null'); } catch {}
  const roleKey = () => profile?.role && roles[profile.role] ? profile.role : null;
  const postKey = (item) => String(item.postKey || item.id || item.title || 'unknown');
  const postType = (item) => item.type === 'job' ? 'job' : 'news';
  const postTitle = (item) => item.title || item.titleMm || (language === 'en' ? 'Story' : 'အကြောင်းအရာ');
  const postBody = (item) => item.body || item.summaryMm || item.description || '';
  const postCategory = (item) => item.category || item.categoryMm || (postType(item) === 'job' ? t('jobType') : t('newsType'));
  const postDate = (item) => item.createdAt || item.publishedAt || null;
  function applyLanguage() {
    document.documentElement.lang = language === 'my' ? 'my' : 'en';
    document.title = language === 'my' ? 'Thai Bro — ထိုင်းရောက် မြန်မာတို့အတွက်' : 'Thai Bro — Your friend in Thailand';
    document.querySelectorAll('[data-i18n]').forEach((node) => { node.textContent = t(node.dataset.i18n); });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((node) => { node.placeholder = t(node.dataset.i18nPlaceholder); });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((node) => { node.setAttribute('aria-label', t(node.dataset.i18nAriaLabel)); });
    $('search-toggle').setAttribute('aria-label', t('searchLabel'));
    $('search-close').setAttribute('aria-label', t('searchClose'));
    $('home-refresh').setAttribute('aria-label', t('refreshLabel'));
    $('refresh').setAttribute('aria-label', t('refreshLabel'));
    $('jobs-refresh').setAttribute('aria-label', t('refreshLabel'));
    $('search-submit').setAttribute('aria-label', t('searchSubmitLabel'));
    if (!$('pull-indicator').dataset.state || $('pull-indicator').dataset.state === 'pull') $('pull-indicator-text').textContent = t('pullRefresh');
    const copy = profileCopy[language];
    document.querySelectorAll('#sos-view .contact-card').forEach((card, index) => {
      const [kind, name, description] = copy.contacts[index];
      card.querySelector('.contact-kind').textContent = kind;
      card.querySelector('.contact-copy h3').textContent = name;
      card.querySelector('.contact-copy p').textContent = description;
      const callLink = card.querySelector('.call-button'), inlineCall = callLink.querySelector('span');
      if (inlineCall) inlineCall.textContent = copy.call; else callLink.textContent = copy.call;
      const source = card.querySelector('.contact-source');
      if (source) source.textContent = index === 5 ? copy.website : copy.numbers;
    });
    document.querySelector('.contact-caveat').textContent = copy.caveat;
    document.querySelector('.guide-title').textContent = copy.guideTitle;
    document.querySelector('.call-primary b').textContent = copy.callPrimary;
    document.querySelectorAll('.guide-card').forEach((guide, index) => {
      const data = copy.guides[index];
      guide.querySelector('summary strong').textContent = data.title;
      guide.querySelector('summary small').textContent = data.subtitle;
      guide.querySelectorAll('ol li').forEach((step, stepIndex) => { step.textContent = data.steps[stepIndex]; });
      guide.querySelector('a').textContent = data.link;
    });
    document.querySelector('.legal-note').textContent = copy.legal;
    document.querySelectorAll('.language-option').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
    updateProfilePreference();
    if (news.length || jobs.length) renderCurrentFeed();
  }
  function dateLabel(value) {
    if (!value) return t('updated');
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return t('updated');
    try { return new Intl.DateTimeFormat(language === 'my' ? 'my-MM' : 'en-US', {day: 'numeric', month: 'short', year: 'numeric', timeZone: 'Asia/Bangkok'}).format(date); }
    catch { return date.toLocaleDateString(); }
  }
  function timeAgo(value) {
    if (!value) return t('recent');
    const date = new Date(value), seconds = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
    if (Number.isNaN(date.getTime())) return t('recent');
    const [unit, amount] = seconds < 60 ? ['second', seconds] : seconds < 3600 ? ['minute', Math.floor(seconds / 60)] : seconds < 86400 ? ['hour', Math.floor(seconds / 3600)] : seconds < 2592000 ? ['day', Math.floor(seconds / 86400)] : seconds < 31536000 ? ['month', Math.floor(seconds / 2592000)] : ['year', Math.floor(seconds / 31536000)];
    try { return new Intl.RelativeTimeFormat(language === 'my' ? 'my' : 'en', {numeric: 'auto'}).format(-amount, unit); }
    catch { return dateLabel(value); }
  }
  function setTheme(dark, persist = false) {
    const enabled = Boolean(dark);
    document.documentElement.dataset.theme = enabled ? 'dark' : 'light';
    document.documentElement.style.colorScheme = enabled ? 'dark' : 'light';
    document.querySelectorAll('.switch-control').forEach((toggle) => {
      toggle.setAttribute('aria-checked', String(enabled));
      toggle.setAttribute('aria-label', t('themeTitle'));
    });
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.content = enabled ? '#0F172A' : '#1A2B49';
    if (persist) { try { localStorage.setItem('thaibro.theme.v1', enabled ? 'dark' : 'light'); } catch {} }
  }
  function formatCount(value) {
    const count = Number(value);
    return new Intl.NumberFormat(language === 'my' ? 'my-MM' : 'en-US').format(Number.isFinite(count) ? count : 0);
  }
  function showToast(text) {
    const node = $('toast'); node.textContent = text; node.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => { node.hidden = true; }, 2600);
  }
  function setPullStatus(text, state = 'pull') {
    const indicator = $('pull-indicator');
    clearTimeout(pullStatusTimer);
    indicator.dataset.state = state;
    indicator.classList.toggle('is-loading', state === 'loading');
    indicator.classList.toggle('is-error', state === 'error');
    indicator.classList.toggle('is-success', state === 'success');
    indicator.setAttribute('aria-busy', String(state === 'loading'));
    $('pull-indicator-text').textContent = text;
    indicator.hidden = false;
    if (state === 'success' || state === 'error') pullStatusTimer = setTimeout(() => { indicator.hidden = true; indicator.dataset.state = ''; }, 1900);
  }
  async function api(path, options = {}) {
    const headers = {...(options.body ? {'content-type': 'application/json'} : {}), ...(options.headers || {})};
    const response = await fetch(new URL(path, API_BASE).href, {cache: 'no-store', credentials: 'same-origin', ...options, headers});
    const data = await response.json().catch(() => ({}));
    if (!response.ok || data.ok === false) throw new Error(data.error || 'Request failed');
    return data;
  }
  function analyticsDayKey() {
    const parts = new Intl.DateTimeFormat('en-CA', {timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit'}).formatToParts(new Date());
    const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
    return `${values.year}-${values.month}-${values.day}`;
  }
  function trackAnonymousActivity() {
    let visit = true, active = true;
    try {
      const now = Date.now(), sessionKey = 'thaibro.analytics.last-visit.v1', activeKey = 'thaibro.analytics.active-day.v1';
      const last = Number(sessionStorage.getItem(sessionKey) || 0);
      visit = !last || now - last >= 30 * 60 * 1000;
      sessionStorage.setItem(sessionKey, String(now));
      const day = analyticsDayKey(); active = localStorage.getItem(activeKey) !== day;
      if (active) localStorage.setItem(activeKey, day);
    } catch {}
    if (!visit && !active) return;
    fetch(new URL('/api/analytics/visit', API_BASE).href, {method: 'POST', credentials: 'same-origin', headers: {'content-type': 'application/json'}, body: JSON.stringify({visit, active}), keepalive: true}).catch(() => {});
  }
  function makeViewCountBadge(item, detail = false) {
    const badge = document.createElement('span'); badge.className = detail ? 'detail-view-count' : 'post-view-count';
    badge.dataset.postKey = postKey(item);
    const icon = document.createElement('span'); icon.className = 'view-eye'; icon.setAttribute('aria-hidden', 'true'); icon.textContent = '👁️';
    const value = document.createElement('span'); value.className = detail ? 'detail-view-value' : 'post-view-value'; if (detail) value.id = 'detail-view-value'; value.textContent = formatCount(Number(item.viewCount || 0));
    badge.append(icon, value);
    if (detail) { const label = document.createElement('span'); label.textContent = t('views'); badge.append(label); }
    badge.setAttribute('aria-label', `${value.textContent} ${t('views')}`);
    return badge;
  }
  function updatePostViewCount(item, count) {
    if (!item) return;
    const key = postKey(item), formatted = formatCount(count);
    item.viewCount = Number(count) || 0;
    document.querySelectorAll('.post-view-count').forEach((badge) => {
      if (badge.dataset.postKey !== key) return;
      const value = badge.querySelector('.post-view-value'); if (value) value.textContent = formatted;
      badge.setAttribute('aria-label', `${formatted} ${t('views')}`);
    });
    const detailBadge = $('detail-view-count');
    if (detailBadge && activePost && postKey(activePost) === key) {
      const value = $('detail-view-value'); if (value) value.textContent = formatted;
      detailBadge.dataset.postKey = key; detailBadge.hidden = postType(item) !== 'news';
      detailBadge.setAttribute('aria-label', `${formatted} ${t('views')}`);
    }
  }
  async function recordPostView(item) {
    if (!item || postType(item) !== 'news') return;
    trackAnonymousActivity();
    try {
      const data = await api(`/api/posts/${encodeURIComponent(postKey(item))}/view`, {method: 'POST', body: '{}'});
      updatePostViewCount(item, Number(data.viewCount || 0));
    } catch {}
  }
  function safeImage(item, index = 0) {
    const value = item.imageUrl || item.image || '';
    if (typeof value === 'string' && (/^\/images\/[A-Za-z0-9._/-]+$/.test(value) || /^https:\/\//i.test(value) || /^data:image\/(?:jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/i.test(value))) return value;
    return '';
  }
  function normalizeManual(post) {
    return {...post, type: post.type || 'news', title: post.title || '', titleMm: post.title, categoryMm: post.category, summaryMm: post.body, body: post.body, image: post.image || post.imageUrl || '', imageUrl: post.imageUrl, sourceName: post.sourceName, sourceUrl: post.sourceUrl, postKey: post.id};
  }
  function sortNewest(items) {
    const unique = new Map();
    for (const item of items) {
      const source = safeSourceUrl(item.sourceUrl), key = source || postKey(item), previous = unique.get(key);
      if (!previous || (item.originalTitle && !previous.originalTitle)) unique.set(key, item);
    }
    return [...unique.values()].sort((a, b) => (Date.parse(postDate(b) || '') || 0) - (Date.parse(postDate(a) || '') || 0) || String(b.id || '').localeCompare(String(a.id || '')));
  }
  function safeSourceUrl(value) { try { const u = new URL(value, location.origin); return u.protocol === 'https:' ? u.href : ''; } catch { return ''; } }
  function emptyState(title, text) {
    const wrap = document.createElement('div'); wrap.className = 'empty-state';
    const inner = document.createElement('div'), strong = document.createElement('strong');
    strong.textContent = title; inner.append(strong); if (text) { const p = document.createElement('p'); p.textContent = text; inner.append(p); } wrap.append(inner); return wrap;
  }
  function isScam(item) { return Boolean(item.isScamAlert || item.is_scam_alert) || /(\bscam\b|\bfraudulent\b|advance[- ]fee scam|upfront[- ]fee scam|လိမ်လည်မှု|အလုပ်လိမ်လည်|အလုပ်အတု|အလိမ်အညာ)/i.test(`${item.title || ''} ${item.body || item.summaryMm || ''} ${item.category || item.categoryMm || ''}`); }
  function roleScore(item) {
    const key = roleKey(); if (!key) return 0;
    const text = `${postTitle(item)} ${postBody(item)} ${postCategory(item)} ${item.location || ''}`.toLocaleLowerCase();
    return roles[key].keywords.reduce((sum, word) => sum + (text.includes(word.toLocaleLowerCase()) ? 1 : 0), 0);
  }
  function getRoleMatch(items) {
    if (!roleKey()) return null;
    return [...items].filter((item) => roleScore(item) > 0).sort((a, b) => roleScore(b) - roleScore(a) || (Date.parse(postDate(b) || '') || 0) - (Date.parse(postDate(a) || '') || 0))[0] || null;
  }
  function addPublicIcon(parent) {
    const privacy = document.createElement('span'); privacy.className = 'public-privacy';
    privacy.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></svg>';
    const label = document.createElement('span'); label.textContent = t('public'); privacy.append(label); parent.append(privacy);
  }
  function hydrateCounters(item, card) {
    if (!card.isConnected || card.dataset.countsLoaded === 'true') return;
    card.dataset.countsLoaded = 'true';
    const likes = card.querySelector('[data-like-count]'), comments = card.querySelector('[data-comment-count]'), likeAction = card.querySelector('[data-like-action]');
    api(`/api/engagement?postKey=${encodeURIComponent(postKey(item))}`).then((data) => {
      if (!card.isConnected) return;
      const baseCount = Number(data.count) || 0, liked = likedIds.has(postKey(item));
      likes.dataset.baseCount = String(baseCount); likes.textContent = formatCount(baseCount + Number(liked));
      comments.textContent = formatCount(data.commentCount);
      if (likeAction) likeAction.setAttribute('aria-pressed', String(liked));
    }).catch(() => {
      if (!card.isConnected) return;
      likes.dataset.baseCount = '0'; likes.textContent = formatCount(Number(likedIds.has(postKey(item)))); comments.textContent = '—';
      if (likeAction) likeAction.setAttribute('aria-pressed', String(likedIds.has(postKey(item))));
    });
  }
  const counterObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { const card = entry.target; counterObserver.unobserve(card); hydrateCounters(card._postItem, card); } });
  }, {rootMargin: '280px'}) : null;
  function setInlineExpanded(card, expanded) {
    const body = card.querySelector('.post-body-content'), button = card.querySelector('.see-more-button');
    if (!body || !button) return;
    if (expanded) {
      recordPostView(card._postItem);
      body.classList.add('is-expanded');
      body.style.maxHeight = `${body.scrollHeight}px`;
      button.textContent = t('seeLess'); button.setAttribute('aria-expanded', 'true');
      const credits = card.querySelector('.post-credits'); if (credits) credits.hidden = false;
      window.setTimeout(() => { if (body.classList.contains('is-expanded')) body.style.maxHeight = 'none'; }, 360);
    } else {
      body.style.maxHeight = `${body.scrollHeight}px`;
      body.classList.remove('is-expanded');
      requestAnimationFrame(() => { body.style.maxHeight = ''; });
      button.textContent = t('seeMore'); button.setAttribute('aria-expanded', 'false');
      const credits = card.querySelector('.post-credits'); if (credits) credits.hidden = true;
    }
  }
  function expandInlinePost(item, scrollIntoView = false) {
    const key = postKey(item);
    let card = [...document.querySelectorAll('.post-card')].find((candidate) => candidate.dataset.postKey === key);
    if (!card) {
      const slot = $(postType(item) === 'job' ? 'personalized-jobs' : 'personalized-news');
      if (slot) {
        card = makeCard(item, 0, postType(item) === 'job');
        slot.append(card);
      }
    }
    if (card) {
      setInlineExpanded(card, true);
      if (scrollIntoView) card.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  }
  async function loadInlineComments(item, card, panel) {
    if (panel.dataset.commentsLoaded === 'true') return;
    panel.dataset.commentsLoaded = 'true'; panel.replaceChildren();
    const status = document.createElement('p'); status.className = 'comment-loading'; status.textContent = t('commentLoading'); panel.append(status);
    try {
      const data = await api(`/api/comments?postKey=${encodeURIComponent(postKey(item))}`);
      if (!card.isConnected) return;
      panel.replaceChildren();
      const heading = document.createElement('h3'); heading.textContent = t('communityComments'); panel.append(heading);
      const comments = document.createElement('ul'); comments.className = 'inline-comment-list';
      if (data.items?.length) {
        for (const comment of data.items) {
          const row = document.createElement('li'); row.className = 'inline-comment';
          const author = document.createElement('strong'), body = document.createElement('p'), time = document.createElement('time');
          author.textContent = comment.author || 'Thai Bro community'; body.textContent = comment.body || ''; time.textContent = dateLabel(comment.createdAt);
          row.append(author, time, body); comments.append(row);
        }
      } else {
        const empty = document.createElement('li'); empty.className = 'inline-comment-empty'; empty.textContent = t('noComments'); comments.append(empty);
      }
      panel.append(comments);
      const note = document.createElement('p'); note.className = 'comment-loading'; note.textContent = t('commentingSoon'); panel.append(note);
    } catch {
      if (!card.isConnected) return;
      panel.replaceChildren(emptyState(t('commentsUnavailable'), t('tryAgain')));
    }
  }
  function persistSavedIds() { try { localStorage.setItem('thaibro.savedStories.v2', JSON.stringify([...savedIds])); } catch {} }
  function persistLikedIds() { try { localStorage.setItem('thaibro.likedStories.v1', JSON.stringify([...likedIds])); } catch {} }
  function updateSavedButtons(key, saved) {
    document.querySelectorAll('.post-card').forEach((card) => {
      if (card.dataset.postKey !== key) return;
      const button = card.querySelector('[data-save-action]');
      if (button) { button.setAttribute('aria-pressed', String(saved)); const label = button.querySelector('.action-label'); if (label) label.textContent = t(saved ? 'saved' : 'save'); }
    });
    const detailButton = $('detail-bookmark');
    if (detailButton && activePost && postKey(activePost) === key) { detailButton.setAttribute('aria-pressed', String(saved)); const label = detailButton.querySelector('[data-i18n]'); if (label) label.textContent = t(saved ? 'saved' : 'save'); }
  }
  function toggleBookmark(item, button) {
    if (!item) return;
    recordPostView(item);
    const key = postKey(item), saved = !savedIds.has(key);
    if (saved) savedIds.add(key); else savedIds.delete(key);
    persistSavedIds(); updateSavedButtons(key, saved);
    if (button && button.id === 'detail-bookmark') { button.setAttribute('aria-pressed', String(saved)); const label = button.querySelector('[data-i18n]'); if (label) label.textContent = t(saved ? 'saved' : 'save'); }
    if (currentView === 'profile' && profilePane === 'saved') renderSaved();
    showToast(saved ? (language === 'en' ? 'Saved on this device.' : 'ဒီစက်ထဲမှာ သိမ်းပြီးပါပြီ။') : (language === 'en' ? 'Removed from saved posts.' : 'သိမ်းထားတာထဲက ဖယ်လိုက်ပါပြီ။'));
  }
  function toggleLike(item, button) {
    if (!item) return;
    recordPostView(item);
    const key = postKey(item), liked = !likedIds.has(key);
    if (liked) likedIds.add(key); else likedIds.delete(key);
    persistLikedIds();
    document.querySelectorAll('.post-card').forEach((card) => {
      if (card.dataset.postKey !== key) return;
      const likeAction = card.querySelector('[data-like-action]'), count = card.querySelector('[data-like-count]');
      if (likeAction) likeAction.setAttribute('aria-pressed', String(liked));
      if (count) count.textContent = formatCount((Number(count.dataset.baseCount) || 0) + Number(liked));
    });
    const detailLike = $('detail-like'), detailCount = $('like-count');
    if (detailLike && activePost && postKey(activePost) === key) {
      detailLike.setAttribute('aria-pressed', String(liked));
      if (detailCount) detailCount.textContent = formatCount((Number(detailCount.dataset.baseCount) || 0) + Number(liked));
    }
    if (button) button.setAttribute('aria-pressed', String(liked));
    showToast(liked ? (language === 'en' ? 'Liked on this device.' : 'ဒီစက်ထဲမှာ နှစ်သက်မှုကို မှတ်ထားပါတယ်။') : (language === 'en' ? 'Like removed.' : 'နှစ်သက်မှုကို ဖယ်လိုက်ပါပြီ။'));
  }
  function makeCard(item, index = 0, isJob = false) {
    const card = document.createElement('article'); card.className = 'post-card'; card.dataset.postKey = postKey(item); card.dataset.postType = postType(item); card._postItem = item;
    const header = document.createElement('div'); header.className = 'post-header';
    const avatar = document.createElement('span'); avatar.className = 'post-avatar';
    const avatarImage = document.createElement('img'); avatarImage.src = '/images/thaibro-logo.jpg'; avatarImage.alt = ''; avatar.append(avatarImage);
    const author = document.createElement('div'); author.className = 'post-author';
    const name = document.createElement('strong'); name.textContent = 'Thai Bro';
    const meta = document.createElement('div'); meta.className = 'post-meta';
    const time = document.createElement('time'); time.dateTime = postDate(item) || ''; time.textContent = timeAgo(postDate(item)); meta.append(time, document.createTextNode(' · '));
    if (postType(item) === 'news') meta.append(makeViewCountBadge(item));
    meta.append(document.createTextNode(' · ')); addPublicIcon(meta);
    author.append(name, meta); header.append(avatar, author); card.append(header);

    const copy = document.createElement('div'); copy.className = 'post-copy';
    const title = document.createElement('h2'); title.className = 'post-title';
    const titleButton = document.createElement('button'); titleButton.type = 'button'; titleButton.className = 'post-title-button'; titleButton.textContent = postTitle(item);
    titleButton.addEventListener('click', (event) => { event.stopPropagation(); openPost(item); });
    title.append(titleButton); copy.append(title); card.append(copy);

    const imageUrl = item.imageUrl || item.image || '';
    const sourceName = String(item.sourceName || '').trim();
    const sourceUrl = safeSourceUrl(item.sourceUrl);
    let photoCredit = String(item.photoCredit || item.imageCredit || item.photographer || '').trim();
    if (!photoCredit && imageUrl && sourceName && sourceUrl) {
      try {
        const imageHost = new URL(imageUrl, location.origin).hostname.toLowerCase().split('.').slice(-2).join('.');
        const sourceHost = new URL(sourceUrl).hostname.toLowerCase().split('.').slice(-2).join('.');
        if (imageHost === sourceHost) photoCredit = sourceName;
      } catch {}
    }
    const bodyText = postBody(item).trim();
    const hasDescription = bodyText && bodyText !== postTitle(item);
    const hasCredits = Boolean(sourceName || (photoCredit && imageUrl));
    let sourceCredits = null;
    if (hasDescription || hasCredits) {
      const bodyArea = document.createElement('div'); bodyArea.className = 'post-body-area';
      const body = document.createElement('div'); body.className = 'post-body-content';
      if (hasDescription) body.append(document.createTextNode(bodyText));
      bodyArea.append(body);
      const longText = bodyText.length > 260 || bodyText.split(/\n/).length > 4;
      if (longText) body.classList.add('has-more');
      if (longText || hasCredits) {
        const more = document.createElement('button'); more.type = 'button'; more.className = 'see-more-button'; more.textContent = t('seeMore'); more.setAttribute('aria-expanded', 'false');
        more.addEventListener('click', () => setInlineExpanded(card, !body.classList.contains('is-expanded'))); bodyArea.append(more);
      }
      card.append(bodyArea);
      if (hasCredits) {
        sourceCredits = document.createElement('p'); sourceCredits.className = 'post-credits'; sourceCredits.hidden = true;
        if (sourceName) {
          const label = document.createElement('span'); label.textContent = t('sourceBy'); sourceCredits.append(label, document.createTextNode(' '));
          if (sourceUrl) { const link = document.createElement('a'); link.href = sourceUrl; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = sourceName; sourceCredits.append(link); }
          else sourceCredits.append(document.createTextNode(sourceName));
        }
        if (photoCredit && imageUrl) {
          if (sourceName) sourceCredits.append(document.createTextNode(' · '));
          const label = document.createElement('span'); label.textContent = t('photoBy'); sourceCredits.append(label, document.createTextNode(` ${photoCredit}`));
        }
      }
    }
    if (imageUrl) {
      const imageWrap = document.createElement('div'); imageWrap.className = 'post-image-wrap';
      const image = document.createElement('img'); image.className = 'post-image'; image.src = safeImage(item, index); image.alt = item.imageAlt || (language === 'en' ? 'Story image' : 'သတင်းပုံ'); image.loading = 'lazy'; image.onerror = () => imageWrap.remove(); imageWrap.append(image);
      if (item.illustrative) { const note = document.createElement('span'); note.className = 'image-note'; note.textContent = language === 'en' ? 'Illustrative image' : 'ကိုယ်စားပြုပုံ'; imageWrap.append(note); }
      card.append(imageWrap);
    }

    const tags = document.createElement('div'); tags.className = 'post-label-row';
    const category = document.createElement('span'); category.className = 'post-tag'; category.textContent = postCategory(item); tags.append(category);
    if (isScam(item)) { const warning = document.createElement('span'); warning.className = 'post-tag scam'; warning.textContent = `⚠ ${t('scamTag')}`; tags.append(warning); }
    if (isJob) { const verified = document.createElement('span'); verified.className = `post-tag ${item.isVerified ? 'verified' : 'unverified'}`; verified.textContent = item.isVerified ? `✓ ${t('verified')}` : `⚠ ${t('unverified')}`; tags.append(verified); }
    card.append(tags);
    if (sourceCredits) card.append(sourceCredits);

    const actions = document.createElement('div'); actions.className = 'post-action-row';
    const actionIcons = {
      like: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 8.8c0 5.2-8.8 10.1-8.8 10.1S3.2 14 3.2 8.8A4.4 4.4 0 0 1 12 7.1a4.4 4.4 0 0 1 8.8 1.7Z"/></svg>',
      comment: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 9 9 0 0 1-4-.9L4 20l1.3-3.2A7 7 0 0 1 4 12c0-4.2 3.6-7.5 8-7.5s8 3.1 8 7Z"/></svg>',
      save: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3.5L6 21z"/></svg>'
    };
    const makeAction = (icon, label, countKey, handler) => {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'post-action';
      if (icon === 'like') { button.dataset.likeAction = 'true'; button.setAttribute('aria-pressed', String(likedIds.has(postKey(item)))); }
      if (icon === 'save') { button.dataset.saveAction = 'true'; button.setAttribute('aria-pressed', String(savedIds.has(postKey(item)))); }
      const symbol = document.createElement('span'); symbol.className = 'action-icon'; symbol.innerHTML = actionIcons[icon];
      const text = document.createElement('span'); text.className = 'action-label'; text.textContent = label; button.append(symbol, text);
      if (countKey) { const count = document.createElement('span'); count.className = 'action-count'; count.dataset[countKey] = ''; count.textContent = '…'; button.append(count); }
      button.addEventListener('click', (event) => { event.stopPropagation(); handler(button); }); return button;
    };
    const commentPanel = document.createElement('section'); commentPanel.className = 'inline-comments'; commentPanel.hidden = true;
    const likeButton = makeAction('like', t('like'), 'likeCount', (button) => toggleLike(item, button));
    const commentButton = makeAction('comment', t('comment'), 'commentCount', (button) => {
      const open = commentPanel.hidden; commentPanel.hidden = !open; button.setAttribute('aria-expanded', String(open));
      if (open) { recordPostView(item); loadInlineComments(item, card, commentPanel); }
    });
    commentButton.setAttribute('aria-expanded', 'false');
    const saveButton = makeAction('save', t(savedIds.has(postKey(item)) ? 'saved' : 'save'), null, (button) => toggleBookmark(item, button));
    actions.append(likeButton, commentButton, saveButton); card.append(actions, commentPanel);
    if (counterObserver) counterObserver.observe(card); else hydrateCounters(item, card);
    return card;
  }
  function renderPersonalized(slotId, items, isJob) {
    const slot = $(slotId); slot.replaceChildren(); const matched = getRoleMatch(items); if (!matched) return;
    const card = document.createElement('article'); card.className = 'featured-card'; card.tabIndex = 0; card.setAttribute('role', 'link');
    card.setAttribute('aria-label', `${t('featuredFor')}: ${postTitle(matched)}`);
    const imgWrap = document.createElement('div'); imgWrap.className = 'story-image-wrap';
    if (matched.imageUrl || matched.image) { const img = document.createElement('img'); img.className = 'story-image'; img.loading = 'lazy'; img.alt = ''; img.src = safeImage(matched, 0); img.onerror = () => imgWrap.remove(); imgWrap.append(img); }
    const copy = document.createElement('div'); copy.className = 'story-copy';
    const tag = document.createElement('span'); tag.className = 'featured-tag'; tag.textContent = `✦ ${t('featuredFor')} · ${t(`${roleKey()}RoleShort`)}`;
    const title = document.createElement('div'); title.className = 'story-title'; title.textContent = postTitle(matched); copy.append(tag, title);
    if (isJob) { const trust = document.createElement('div'); trust.className = matched.isVerified ? 'story-verified' : 'story-unverified'; trust.textContent = matched.isVerified ? `✓ ${t('verified')}` : `⚠ ${t('unverified')}`; copy.append(trust); }
    if (isScam(matched)) { const warning = document.createElement('div'); warning.className = 'story-scam-label'; warning.textContent = `⚠ ${t('scamTag')}`; copy.append(warning); }
    const arrow = document.createElement('span'); arrow.className = 'featured-arrow'; arrow.textContent = '›'; card.append(imgWrap, copy, arrow);
    card.addEventListener('click', () => expandInlinePost(matched, true)); card.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); expandInlinePost(matched, true); } }); slot.append(card);
  }
  function visibleForSearch(items, isJob = false) {
    const query = searchInput.value.trim().toLocaleLowerCase();
    return items.filter((item) => { const text = `${postTitle(item)} ${postBody(item)} ${item.sourceName || ''} ${item.location || ''} ${item.salary || ''} ${postCategory(item)}`.toLocaleLowerCase(); return !query || text.includes(query); });
  }
  function renderHome() {
    if (!homeList) return; homeList.replaceChildren(); homeList.setAttribute('aria-busy', 'false');
    const visible = visibleForSearch(sortNewest([...news, ...jobs]));
    if (!visible.length) { homeList.append(emptyState(searchInput.value.trim() ? t('noMatches') : `${t('noNews')} · ${t('noJobs')}`, t('emptyText'))); return; }
    visible.forEach((item, index) => homeList.append(makeCard(item, index, postType(item) === 'job')));
  }
  function renderNews() {
    newsList.replaceChildren(); newsList.setAttribute('aria-busy', 'false');
    const visible = visibleForSearch(news);
    renderPersonalized('personalized-news', visible, false);
    if (!visible.length) { newsList.append(emptyState(searchInput.value.trim() ? t('noMatches') : t('noNews'), t('emptyText'))); return; }
    const featured = getRoleMatch(visible), chronological = featured ? visible.filter((item) => postKey(item) !== postKey(featured)) : visible;
    chronological.forEach((item, index) => newsList.append(makeCard(item, index, false)));
  }
  function renderJobs() {
    jobsList.replaceChildren(); jobsList.setAttribute('aria-busy', 'false');
    const visible = visibleForSearch(jobs, true);
    renderPersonalized('personalized-jobs', visible, true);
    if (!visible.length) { jobsList.append(searchInput.value.trim() ? emptyState(t('noJobMatches'), t('emptyText')) : emptyState(t('soon'), '')); return; }
    const featured = getRoleMatch(visible), chronological = featured ? visible.filter((item) => postKey(item) !== postKey(featured)) : visible;
    chronological.forEach((item, index) => jobsList.append(makeCard(item, index, true)));
  }
  function renderSaved() {
    const list = $('saved-list'); list.replaceChildren();
    const saved = [...news, ...jobs].filter((item) => savedIds.has(postKey(item)));
    if (!saved.length) { list.append(emptyState(t('savedHeading'), t('savedReadOnly'))); return; }
    sortNewest(saved).forEach((item, index) => list.append(makeCard(item, index, postType(item) === 'job')));
  }
  function renderCurrentFeed() {
    if (currentView === 'home') renderHome();
    else if (currentView === 'news') renderNews();
    else if (currentView === 'jobs') renderJobs();
    else if (currentView === 'profile' && profilePane === 'saved') renderSaved();
  }
  function showProfilePane(pane) {
    profilePane = ['settings', 'saved', 'sos', 'help'].includes(pane) ? pane : 'settings';
    $('profile-settings').hidden = profilePane !== 'settings';
    $('saved-view').hidden = profilePane !== 'saved';
    $('sos-view').hidden = profilePane !== 'sos';
    $('help-view').hidden = profilePane !== 'help';
    if (profilePane === 'saved') renderSaved();
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  function backFromProfile() {
    if (profilePane !== 'settings') { showProfilePane('settings'); return; }
    setView(previousView || 'home');
  }
  function setView(view) {
    if (!['home', 'news', 'jobs', 'notifications', 'profile'].includes(view)) return;
    if (view === 'profile' && currentView !== 'profile') previousView = currentView;
    currentView = view;
    document.querySelectorAll('.nav-button[data-view]').forEach((button) => { if (button.dataset.view === view) button.setAttribute('aria-current', 'page'); else button.removeAttribute('aria-current'); });
    homeView.hidden = view !== 'home'; newsView.hidden = view !== 'news'; jobsView.hidden = view !== 'jobs'; notificationsView.hidden = view !== 'notifications'; profileView.hidden = view !== 'profile';
    if (view === 'profile') showProfilePane('settings');
    renderCurrentFeed(); setChromeHidden(false);
    const activeView = view === 'home' ? homeView : view === 'news' ? newsView : view === 'jobs' ? jobsView : view === 'notifications' ? notificationsView : profileView;
    activeView.classList.remove('view-enter'); requestAnimationFrame(() => activeView.classList.add('view-enter'));
    window.setTimeout(() => activeView.classList.remove('view-enter'), 320);
    window.scrollTo({top: 0, behavior: 'smooth'});
  }
  async function loadNews(showLoading = true) {
    if (showLoading) { newsStatus.classList.remove('error'); newsStatusText.textContent = t('newsLoading'); newsList.setAttribute('aria-busy', 'true'); }
    const results = await Promise.allSettled([api('/api/updates'), api('/api/posts?type=news')]);
    let official = [], authored = [], failed = false;
    if (results[0].status === 'fulfilled' && Array.isArray(results[0].value.items)) official = results[0].value.items.map((item) => ({...item, type: 'news', postKey: item.postKey || `official-${item.id}`, title: item.title || item.titleMm, body: item.body || item.summaryMm, createdAt: item.createdAt || item.publishedAt, imageUrl: item.imageUrl || item.image || ''})); else failed = true;
    if (results[1].status === 'fulfilled' && Array.isArray(results[1].value.items)) authored = results[1].value.items.map(normalizeManual); else failed = true;
    news = sortNewest([...official, ...authored]); newsStatus.classList.toggle('error', failed);
    newsStatusText.textContent = failed ? (news.length ? t('partialNews') : t('newsUnavailable')) : (news.length ? t('updated') : t('noNews'));
    renderNews(); if (currentView === 'home') renderHome(); return !failed;
  }
  async function loadJobs() {
    jobsStatus.classList.remove('error'); jobsStatusText.textContent = t('jobsLoading'); jobsList.setAttribute('aria-busy', 'true');
    let succeeded = true;
    try { const data = await api('/api/posts?type=jobs'); jobs = sortNewest((data.items || []).map(normalizeManual)); jobsStatusText.textContent = jobs.length ? t('updated') : t('noJobs'); }
    catch { succeeded = false; jobs = []; jobsStatus.classList.add('error'); jobsStatusText.textContent = t('jobsUnavailable'); }
    renderJobs(); if (currentView === 'home') renderHome(); return succeeded;
  }
  async function refreshAll() {
    if (refreshing) return; refreshing = true;
    const button = $(currentView === 'jobs' ? 'jobs-refresh' : currentView === 'home' ? 'home-refresh' : 'refresh');
    button.disabled = true;
    try {
      if (currentView === 'notifications') { showToast(t('noNotifications')); return; }
      setPullStatus(t('refreshingFeed'), 'loading');
      let succeeded = false;
      if (currentView === 'home' || currentView === 'profile') {
        const results = await Promise.allSettled([loadNews(false), loadJobs()]);
        succeeded = results.every((result) => result.status === 'fulfilled' && result.value === true);
      } else if (currentView === 'jobs') succeeded = await loadJobs();
      else succeeded = await loadNews();
      if (currentView === 'profile' && profilePane === 'saved') renderSaved();
      setPullStatus(t(succeeded ? 'refreshDone' : 'refreshFailed'), succeeded ? 'success' : 'error');
    } finally { button.disabled = false; refreshing = false; }
  }
  function updateProfilePreference() {
    const summary = $('profile-summary'), reset = $('clear-profile');
    if (!summary || !reset) return;
    summary.textContent = profile && roles[roleKey()] ? t(`${roleKey()}Role`) : t('allTopics');
    reset.hidden = !profile;
  }
  function clearProfilePreference() {
    profile = null;
    try { localStorage.removeItem('thaibro.profile.v1'); } catch {}
    updateProfilePreference(); renderCurrentFeed(); showToast(t('preferenceCleared'));
  }
  function startWelcome() {
    const overlay = $('welcome-overlay');
    if (currentView !== 'home') setView('home');
    overlay.classList.add('is-exiting'); appShell.classList.add('welcome-entering');
    try { localStorage.setItem('thaibro.welcome.started.v1', 'true'); } catch {}
    $('welcome-start').disabled = true;
    window.setTimeout(() => { overlay.hidden = true; overlay.classList.remove('is-exiting'); appShell.classList.remove('welcome-entering'); document.body.style.overflow = ''; window.scrollTo({top: 0, behavior: 'auto'}); }, 620);
  }
  function openPost(item, updateRoute = true) {
    if (!item) return;
    activePost = item; lastFocus = document.activeElement;
    $('detail-title').textContent = postTitle(item);
    $('detail-category').textContent = postCategory(item);
    const detailDate = $('detail-date'); detailDate.dateTime = postDate(item) || ''; detailDate.textContent = dateLabel(postDate(item));
    const cover = $('detail-cover'), coverUrl = safeImage(item, 0);
    if (coverUrl) { cover.src = coverUrl; cover.alt = postTitle(item); cover.hidden = false; cover.onerror = () => { cover.hidden = true; }; }
    else { cover.removeAttribute('src'); cover.alt = ''; cover.hidden = true; }
    const source = $('detail-source'), sourceUrl = safeSourceUrl(item.sourceUrl);
    source.textContent = item.sourceName || item.sourceTitle || ''; source.href = sourceUrl || '#'; source.hidden = !sourceUrl || !source.textContent;
    const verified = $('detail-verified'); verified.hidden = !(postType(item) === 'job' && item.isVerified); verified.textContent = `✓ ${t('verified')}`;
    $('detail-warning').hidden = !isScam(item);
    const summary = $('detail-summary'), summaryText = String(item.summary || '').trim();
    summary.textContent = summaryText; summary.hidden = !summaryText || summaryText === postBody(item).trim();
    $('detail-body').textContent = postBody(item);
    const contact = $('detail-contact'); contact.replaceChildren();
    if (postType(item) === 'job') {
      const labels = language === 'en'
        ? {company: 'Company', location: 'Location', salary: 'Pay', requirements: 'Requirements', contact: 'Contact', application: 'How to apply', phone: 'Phone', line: 'LINE', posted: 'Posted'}
        : {company: 'ကုမ္ပဏီ', location: 'အလုပ်နေရာ', salary: 'လစာ', requirements: 'လိုအပ်ချက်များ', contact: 'ဆက်သွယ်ရန်', application: 'လျှောက်ထားပုံ', phone: 'ဖုန်း', line: 'LINE', posted: 'တင်သည့်ရက်'};
      for (const [label, value] of [
        [labels.company, item.companyName], [labels.location, item.location], [labels.salary, item.salary],
        [labels.requirements, item.jobRequirements], [labels.contact, item.contactInfo],
        [labels.application, item.applicationMethod], [labels.phone, item.phone], [labels.line, item.lineId],
        [labels.posted, item.postedAt ? dateLabel(item.postedAt) : '']
      ]) {
        if (!value) continue; const row = document.createElement('p'), strong = document.createElement('strong'); strong.textContent = `${label}: `; row.append(strong, document.createTextNode(String(value))); contact.append(row);
      }
      if (item.applicationUrl) {
        const applyUrl = safeSourceUrl(item.applicationUrl);
        if (applyUrl) {
          const row = document.createElement('p'), link = document.createElement('a');
          link.href = applyUrl; link.target = '_blank'; link.rel = 'noopener noreferrer';
          link.textContent = language === 'en' ? 'Open application page' : 'လျှောက်ထားရန် စာမျက်နှာဖွင့်ရန်';
          row.append(link); contact.append(row);
        }
      }
    }
    const sourceFull = $('detail-source-full'); sourceFull.replaceChildren(); sourceFull.classList.add('hidden');
    const priorBadge = document.querySelector('.detail-view-count.dynamic-view-count'); if (priorBadge) priorBadge.remove();
    const newBadge = makeViewCountBadge(item, true); newBadge.classList.add('dynamic-view-count'); newBadge.id = 'detail-view-count'; newBadge.hidden = postType(item) !== 'news';
    const meta = document.querySelector('.detail-meta'); meta.append(newBadge);
    updatePostViewCount(item, Number(item.viewCount || 0));
    detail.hidden = false; document.body.style.overflow = 'hidden';
    if (updateRoute) {
      const routeType = postType(item) === 'job' ? 'job' : 'news', id = String(item.id || postKey(item));
      const hash = `#/${routeType}/${encodeURIComponent(id)}`;
      if (location.hash !== hash) history.pushState({postKey: postKey(item)}, '', `${location.pathname}${location.search}${hash}`);
    }
    loadEngagement(item); loadComments(item); recordPostView(item);
    requestAnimationFrame(() => $('detail-close').focus());
  }
  function closePost(updateRoute = true) {
    detail.hidden = true; activePost = null; document.body.style.overflow = '';
    if (updateRoute && location.hash.startsWith('#/')) history.replaceState(null, '', location.pathname + location.search);
    if (lastFocus?.focus) lastFocus.focus();
  }
  async function loadEngagement(item) {
    try { const data = await api(`/api/engagement?postKey=${encodeURIComponent(postKey(item))}`); $('like-count').dataset.baseCount = String(Number(data.count) || 0); $('like-count').textContent = formatCount((Number(data.count) || 0) + Number(likedIds.has(postKey(item)))); $('detail-like').setAttribute('aria-pressed', String(likedIds.has(postKey(item)))); }
    catch { $('like-count').dataset.baseCount = '0'; $('like-count').textContent = formatCount(Number(likedIds.has(postKey(item)))); $('detail-like').setAttribute('aria-pressed', String(likedIds.has(postKey(item)))); }
  }
  async function loadComments(item) {
    const list = $('comment-list'); list.replaceChildren();
    try {
      const data = await api(`/api/comments?postKey=${encodeURIComponent(postKey(item))}`);
      if (!data.items?.length) { list.append(emptyState(t('noComments'), t('noCommentsText'))); return; }
      for (const comment of data.items) {
        const li = document.createElement('li'); li.className = 'comment-item';
        const name = document.createElement('strong'), time = document.createElement('time'), text = document.createElement('p');
        name.textContent = comment.author || 'Thai Bro community'; time.textContent = dateLabel(comment.createdAt); text.textContent = comment.body; li.append(name, time, text); list.append(li);
      }
    } catch { list.append(emptyState(t('commentsUnavailable'), t('tryAgain'))); }
  }
  async function loadSourceBody(item) {
    const url = safeSourceUrl(item.sourceUrl); if (!url || !url.startsWith('https://thailand.prd.go.th/')) return;
    const slot = $('detail-source-full'); slot.classList.remove('hidden'); slot.replaceChildren();
    const heading = document.createElement('h2'), body = document.createElement('div'); heading.textContent = language === 'en' ? 'Full original article' : 'မူရင်းသတင်းအပြည့်အစုံ'; body.className = 'detail-body';
    body.textContent = language === 'en' ? 'Loading original text…' : 'မူရင်းစာသားကို ဖွင့်နေပါတယ်…'; slot.append(heading, body);
    try {
      const data = await api(`/api/source-detail?url=${encodeURIComponent(url)}`); if (activePost !== item) return; body.textContent = data.body || (language === 'en' ? 'Original text unavailable.' : 'မူရင်းစာသား မရနိုင်ပါ။');
      if (data.imageUrl && !item.imageUrl) { const image = document.createElement('img'); image.src = data.imageUrl; image.alt = ''; image.className = 'detail-cover'; image.onerror = () => image.remove(); slot.prepend(image); }
    } catch { if (activePost === item) body.textContent = language === 'en' ? 'Original text could not be loaded.' : 'မူရင်းစာသားကို အခုခဏ ဖွင့်မရပါ။'; }
  }
  async function restoreRoute() {
    const match = location.hash.match(/^#\/(news|job)\/(.+)$/);
    if (!match) { if (!detail.hidden) closePost(false); return; }
    const type = match[1]; let id = ''; try { id = decodeURIComponent(match[2]); } catch { return; }
    let post = [...news, ...jobs].find((item) => String(item.id) === id && postType(item) === (type === 'job' ? 'job' : 'news'));
    if (!post && /^[0-9a-f-]{30,40}$/i.test(id)) { try { post = normalizeManual((await api(`/api/posts/${encodeURIComponent(id)}`)).item); } catch {} }
    if (!post) { if (type === 'news') await loadNews(false); else await loadJobs(); post = [...news, ...jobs].find((item) => String(item.id) === id && postType(item) === (type === 'job' ? 'job' : 'news')); }
    if (!post) return;
    const targetView = postType(post) === 'job' ? 'jobs' : 'news';
    if (currentView !== targetView) setView(targetView);
    openPost(post, false);
  }
  function setLanguage(next) {
    if (!['my', 'en'].includes(next)) return; language = next;
    try { localStorage.setItem('thaibro.language.v2', language); } catch {}
    applyLanguage();
  }
  document.querySelectorAll('.nav-button[data-view]').forEach((button) => button.addEventListener('click', () => setView(button.dataset.view)));
  function openSearch() {
    if (drawer.classList.contains('is-open')) closeDrawer(false);
    clearTimeout(searchCloseTimer); searchPanel.hidden = false; searchPanel.inert = false;
    requestAnimationFrame(() => searchPanel.classList.add('is-open'));
    $('search-toggle').setAttribute('aria-expanded', 'true'); searchInput.focus();
  }
  function closeSearch(restoreFocus = true) {
    if (searchPanel.hidden) return;
    searchPanel.classList.remove('is-open'); searchPanel.inert = true; $('search-toggle').setAttribute('aria-expanded', 'false');
    clearTimeout(searchCloseTimer); searchCloseTimer = setTimeout(() => { if (!searchPanel.classList.contains('is-open')) searchPanel.hidden = true; }, 240);
    if (restoreFocus) $('search-toggle').focus();
  }
  $('search-toggle').addEventListener('click', () => searchPanel.hidden ? openSearch() : closeSearch());
  $('search-close').addEventListener('click', () => closeSearch());
  $('search-form').addEventListener('submit', (event) => { event.preventDefault(); renderCurrentFeed(); searchInput.blur(); });
  document.querySelectorAll('.language-option').forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));
  function openDrawer() { if (!searchPanel.hidden) closeSearch(false); clearTimeout(drawerCloseTimer); setChromeHidden(false); drawerBackdrop.hidden = false; requestAnimationFrame(() => drawerBackdrop.classList.add('is-visible')); drawer.classList.add('is-open'); drawer.inert = false; drawer.setAttribute('aria-hidden', 'false'); $('drawer-toggle').setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; $('drawer-close').focus(); }
  function closeDrawer(restoreFocus = true) { if (!drawer.classList.contains('is-open')) return; drawer.classList.remove('is-open'); drawerBackdrop.classList.remove('is-visible'); setChromeHidden(false); drawer.inert = true; drawer.setAttribute('aria-hidden', 'true'); $('drawer-toggle').setAttribute('aria-expanded', 'false'); document.body.style.overflow = detail.hidden ? '' : 'hidden'; clearTimeout(drawerCloseTimer); drawerCloseTimer = setTimeout(() => { if (!drawer.classList.contains('is-open')) drawerBackdrop.hidden = true; }, 280); if (restoreFocus) $('drawer-toggle').focus(); }
  $('drawer-toggle').addEventListener('click', openDrawer); $('drawer-close').addEventListener('click', () => closeDrawer()); drawerBackdrop.addEventListener('click', () => closeDrawer());
  $('drawer-open-settings').addEventListener('click', () => { closeDrawer(false); setView('profile'); });
  $('drawer-saved').addEventListener('click', () => { closeDrawer(false); setView('profile'); $('saved-shortcut').click(); });
  $('drawer-sos').addEventListener('click', () => { closeDrawer(false); setView('profile'); showProfilePane('sos'); });
  $('drawer-help').addEventListener('click', () => { closeDrawer(false); setView('profile'); showProfilePane('help'); });
  $('settings-help').addEventListener('click', () => showProfilePane('help'));
  $('help-open-sos').addEventListener('click', () => showProfilePane('sos'));
  $('profile-back').addEventListener('click', backFromProfile);
  $('sos-back').addEventListener('click', () => showProfilePane('settings'));
  $('help-back').addEventListener('click', () => showProfilePane('settings'));
  $('drawer-about').addEventListener('click', () => { closeDrawer(false); setView('profile'); document.querySelector('.about-box').scrollIntoView({behavior: 'smooth', block: 'center'}); });
  $('notification-settings').addEventListener('click', () => showToast(t('noNotifications')));
  $('drawer-notification-settings').addEventListener('click', () => showToast(t('noNotifications')));
  $('saved-shortcut').addEventListener('click', () => showProfilePane('saved'));
  $('saved-back').addEventListener('click', () => showProfilePane('settings'));
  document.querySelector('.sos-settings-link').addEventListener('click', (event) => { event.preventDefault(); showProfilePane('sos'); });
  document.querySelectorAll('.switch-control').forEach((button) => button.addEventListener('click', () => setTheme(document.documentElement.dataset.theme !== 'dark', true)));
  searchInput.addEventListener('input', renderCurrentFeed);
  $('refresh').addEventListener('click', refreshAll); $('jobs-refresh').addEventListener('click', refreshAll); $('home-refresh').addEventListener('click', refreshAll);
  $('welcome-start').addEventListener('click', startWelcome);
  $('clear-profile').addEventListener('click', clearProfilePreference);
  document.querySelectorAll('.about-accordion').forEach((section) => section.addEventListener('toggle', () => { if (section.open) document.querySelectorAll('.about-accordion').forEach((other) => { if (other !== section) other.open = false; }); }));
  $('detail-close').addEventListener('click', () => closePost(true));
  detail.addEventListener('click', (event) => { if (event.target === detail) closePost(true); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && drawer.classList.contains('is-open')) closeDrawer();
    else if (event.key === 'Escape' && !searchPanel.hidden) closeSearch(false);
    else if (event.key === 'Escape' && !detail.hidden) closePost(true);
  });
  $('detail-like').addEventListener('click', (event) => toggleLike(activePost, event.currentTarget));
  $('detail-bookmark').addEventListener('click', (event) => toggleBookmark(activePost, event.currentTarget));
  $('detail-comment').addEventListener('click', () => { recordPostView(activePost); $('detail-comments-heading').scrollIntoView({behavior: 'smooth', block: 'start'}); });
  window.addEventListener('hashchange', restoreRoute); window.addEventListener('popstate', restoreRoute);
  let lastScrollY = window.scrollY, scrollFrame = 0;
  function setChromeHidden(hidden) {
    if (hidden && (siteHeader.contains(document.activeElement) || bottomNav.contains(document.activeElement) || drawer.classList.contains('is-open') || !detail.hidden)) hidden = false;
    appShell.classList.toggle('chrome-hidden', hidden); siteHeader.inert = hidden; siteHeader.setAttribute('aria-hidden', String(hidden)); bottomNav.inert = hidden; bottomNav.setAttribute('aria-hidden', String(hidden));
  }
  function releaseChromeFocus(event) {
    if (!siteHeader.contains(event.target) && !bottomNav.contains(event.target) &&
        (siteHeader.contains(document.activeElement) || bottomNav.contains(document.activeElement))) document.activeElement.blur();
  }
  document.addEventListener('pointerdown', releaseChromeFocus, {passive: true});
  window.addEventListener('wheel', releaseChromeFocus, {passive: true});
  window.addEventListener('scroll', () => {
    if (scrollFrame) return; scrollFrame = requestAnimationFrame(() => { scrollFrame = 0; const currentY = window.scrollY, delta = currentY - lastScrollY;
      if (currentY < 56) setChromeHidden(false); else if (delta > 7) setChromeHidden(true); else if (delta < -7) setChromeHidden(false); lastScrollY = currentY;
    });
  }, {passive: true});
  $('search-toggle').addEventListener('click', () => { if (!searchPanel.hidden) setChromeHidden(false); });
  let touchStartY = null, touchAllowed = false, pullArmed = false;
  let backSwipeStart = null;
  document.addEventListener('touchstart', (event) => { if (event.touches.length === 1) backSwipeStart = {x: event.touches[0].clientX, y: event.touches[0].clientY}; }, {passive: true});
  document.addEventListener('touchend', (event) => {
    if (!backSwipeStart || !event.changedTouches.length) return;
    const end = event.changedTouches[0], dx = end.clientX - backSwipeStart.x, dy = Math.abs(end.clientY - backSwipeStart.y);
    if (dy < 70 && drawer.classList.contains('is-open') && dx < -90) closeDrawer();
    else if (dy < 70 && backSwipeStart.x < 26 && dx > 100 && currentView === 'profile') backFromProfile();
    backSwipeStart = null;
  }, {passive: true});
  document.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1 || refreshing || !detail.hidden) return;
    touchStartY = event.touches[0].clientY; touchAllowed = window.scrollY <= 2 && ['home', 'news', 'jobs'].includes(currentView); pullArmed = false;
  }, {passive: true});
  document.addEventListener('touchmove', (event) => {
    if (touchStartY === null || !touchAllowed) return; const dy = event.touches[0].clientY - touchStartY;
    if (dy > 45 && window.scrollY <= 2) { pullArmed = true; setPullStatus(t('pullRefresh'), 'pull'); }
    else if (dy < 20) { pullArmed = false; $('pull-indicator').hidden = true; $('pull-indicator').dataset.state = ''; }
  }, {passive: true});
  document.addEventListener('touchend', () => {
    const armed = pullArmed; touchStartY = null; touchAllowed = false; pullArmed = false;
    if (armed) refreshAll(); else { $('pull-indicator').hidden = true; $('pull-indicator').dataset.state = ''; }
  }, {passive: true});
  // Keep publisher full text on its source page; Thai Bro shows its own report and attribution link.
  loadSourceBody = async () => {};
  setTheme((() => { try { return localStorage.getItem('thaibro.theme.v1') === 'dark'; } catch { return false; } })());
  trackAnonymousActivity();
  applyLanguage(); updateProfilePreference();
  let welcomeAlreadyStarted = false; try { welcomeAlreadyStarted = localStorage.getItem('thaibro.welcome.started.v1') === 'true'; } catch {}
  if (welcomeAlreadyStarted) $('welcome-overlay').hidden = true;
  else { document.body.style.overflow = 'hidden'; window.setTimeout(() => $('welcome-start').focus(), 80); }
  Promise.allSettled([loadNews(), loadJobs()]).then(restoreRoute);
})();
