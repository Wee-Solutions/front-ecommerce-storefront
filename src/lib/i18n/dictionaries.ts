import type { Locale } from "./locale-config";

export type Dictionary = {
  nav: {
    main: string;
    account: string;
    signIn: string;
    menu: string;
    search: string;
    cart: string;
    /** Slim top bar message, e.g. shipping promo */
    announcement: string;
    /** Screen reader label for category submenus in the header */
    subcategoriesMenu: string;
  };
  search: {
    placeholder: string;
    submit: string;
    title: string;
    resultsFor: string;
    allProducts: string;
    resultCount: string;
    /** Noun for search hit count line, e.g. "results" / "תוצאות" */
    resultsWord: string;
    noResults: string;
    home: string;
  };
  home: {
    shopAll: string;
    browse: string;
    collections: string;
    viewAll: string;
    featured: string;
    featuredSubtitle: string;
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    trustShipping: string;
    trustReturns: string;
    trustConcierge: string;
    shopCategories: string;
    shopCategoriesHint: string;
    shopByFabric: string;
    editorialEyebrow: string;
    editorialSupporting: string;
    fabricSilk: string;
    fabricCashmere: string;
    fabricLinen: string;
    fabricLeather: string;
    fabricWool: string;
    fabricExplorerBlurb: string;
  };
  product: {
    pageFallback: string;
    noImage: string;
    noDescription: string;
    selectOptions: string;
    priceError: string;
    available: string;
    outOfStock: string;
    addToCart: string;
    /** Short CTA on product cards */
    viewDetails: string;
    vatExcluded: string;
    home: string;
    reviewsTitle: string;
    reviewsPlaceholder: string;
    related: string;
    /** Heading above long description on PDP */
    details: string;
    /** Use {{rating}} and {{count}} placeholders */
    ratingReviews: string;
    lowStock: string;
    saveForLater: string;
    shopNow: string;
    trustShip: string;
    trustReturn: string;
    trustAuthentic: string;
    styleCode: string;
    /** Short label before a “from” price on cards, e.g. “From” */
    priceFrom: string;
    /** Hint under card price when product has options */
    optionsOnProductPage: string;
  };
  category: {
    home: string;
    collection: string;
    browse: string;
    noProducts: string;
    productsSuffix: string;
  };
  cart: {
    title: string;
    subtitle: string;
    empty: string;
    emptyDrawer: string;
    each: string;
    qty: string;
    remove: string;
    subtotal: string;
    checkout: string;
    viewCart: string;
    shippingNote: string;
    proceed: string;
    continueShopping: string;
    close: string;
    openCart: string;
  };
  checkout: {
    title: string;
    subtitle: string;
    empty: string;
    contact: string;
    email: string;
    phone: string;
    shipping: string;
    fullName: string;
    address: string;
    subtotal: string;
    placeOrder: string;
    thanks: string;
  };
  account: {
    title: string;
    subtitle: string;
    orders: string;
    cart: string;
    shippingDetails: string;
    soon: string;
    sectionsLabel: string;
    edit: string;
    cancel: string;
    saveProfile: string;
    verifyAndUpdatePhone: string;
    profileUpdated: string;
    profileUpdateFailed: string;
    phoneUpdated: string;
    phoneUpdateFailed: string;
    signedOut: string;
    signedOutCta: string;
    signedInAs: string;
    signOut: string;
    shippingSaved: string;
    shippingSaveFailed: string;
    shippingUpdated: string;
    shippingUpdateFailed: string;
    shippingDeleted: string;
    shippingDeleteFailed: string;
    shippingAddNew: string;
    shippingEmpty: string;
    shippingDelete: string;
    shippingEditTitle: string;
    shippingAddTitle: string;
    shippingCity: string;
    shippingZipCode: string;
    shippingStreetRequired: string;
    shippingStreetNumber: string;
    shippingApartmentNumber: string;
    shippingApartmentFloor: string;
    shippingEntrance: string;
    shippingEntranceCode: string;
    shippingAdditionalEntranceCode: string;
    shippingAddressNotes: string;
    shippingUpdate: string;
    shippingSave: string;
  };
  orders: {
    title: string;
    subtitle: string;
    empty: string;
    account: string;
    loading: string;
    status: string;
    total: string;
    statusPending: string;
    statusApproved: string;
    statusReady: string;
    statusDelivered: string;
    statusCancelled: string;
    statusUnknown: string;
  };
  auth: {
    loginTitle: string;
    loginSubtitle: string;
    registerTitle: string;
    registerSubtitle: string;
    registerCta: string;
    loginCta: string;
    sms: string;
    email: string;
    phone: string;
    emailLabel: string;
    sendCode: string;
    code: string;
    signIn: string;
    resend: string;
    firstName: string;
    lastName: string;
    emailOptional: string;
    createAccount: string;
    newHere: string;
    haveAccount: string;
    msgCodeSent: string;
    msgCodeResent: string;
    errSendCode: string;
    errResend: string;
    errLogin: string;
    errRegister: string;
    verifyChannel: string;
    phoneHint: string;
    emailHint: string;
    phonePlaceholder: string;
    emailPlaceholder: string;
    optionalShort: string;
    codeHint: string;
  };
  pagination: {
    previous: string;
    next: string;
    label: string;
  };
  unknownStore: {
    title: string;
    body: string;
  };
  locale: {
    label: string;
    en: string;
    he: string;
    ar: string;
  };
};

const en: Dictionary = {
  nav: {
    main: "Main",
    account: "Account",
    signIn: "Sign in",
    menu: "Menu",
    search: "Search",
    cart: "Cart",
    announcement:
      "Complimentary express shipping on orders over $200 · Easy 30-day returns",
    subcategoriesMenu: "Subcategories",
  },
  search: {
    placeholder: "Search products…",
    submit: "Search",
    title: "Search",
    resultsFor: "Results for",
    allProducts: "All products",
    resultCount: "result",
    resultsWord: "results",
    noResults: "No products match your search.",
    home: "Home",
  },
  home: {
    shopAll: "Shop all",
    browse: "Browse",
    collections: "Collections",
    viewAll: "View all",
    featured: "Featured",
    featuredSubtitle:
      "Editor's picks — the pieces our clients are wearing now.",
    heroBadge: "New arrivals",
    heroTitle: "The art of dressing well",
    heroSubtitle:
      "Handpicked silhouettes, sublime fabrics, and quiet confidence—discover pieces you will reach for again and again.",
    trustShipping: "White-glove delivery",
    trustReturns: "30-day returns",
    trustConcierge: "Personal styling support",
    shopCategories: "Shop by category",
    shopCategoriesHint: "Jump straight into the edit",
    shopByFabric: "Shop by material",
    editorialEyebrow: "The edit",
    editorialSupporting:
      "One hero piece each week—considered cuts, precious fibers, and the kind of detail you notice up close.",
    fabricSilk: "Silk",
    fabricCashmere: "Cashmere",
    fabricLinen: "Linen",
    fabricLeather: "Leather",
    fabricWool: "Wool",
    fabricExplorerBlurb:
      "Tap a material to browse everything we carry in that fiber.",
  },
  product: {
    pageFallback: "Product",
    noImage: "No image",
    noDescription: "No description.",
    selectOptions: "Select all options to see price and availability.",
    priceError: "Unable to load price for this combination.",
    available: "available",
    outOfStock: "Out of stock for this selection",
    addToCart: "Add to cart",
    viewDetails: "View piece",
    vatExcluded: "VAT excluded",
    home: "Home",
    reviewsTitle: "Reviews",
    reviewsPlaceholder:
      "Reviews will appear here when the review API is connected.",
    related: "You may also like",
    details: "The details",
    ratingReviews: "{{rating}} · {{count}} reviews",
    lowStock: "Only a few left",
    saveForLater: "Save",
    shopNow: "Shop now",
    trustShip: "Complimentary express shipping over $200",
    trustReturn: "30-day returns · Prepaid label",
    trustAuthentic: "Authenticity guaranteed",
    styleCode: "Style #",
    priceFrom: "From",
    optionsOnProductPage: "Sizes & colors on the product page",
  },
  category: {
    home: "Home",
    collection: "Collection",
    browse: "Browse",
    noProducts: "No products in this collection yet.",
    productsSuffix: "products",
  },
  cart: {
    title: "Your cart",
    subtitle:
      "Items persist on this device until checkout is connected to your API.",
    empty: "Your cart is empty.",
    emptyDrawer: "Your cart is empty.",
    each: "each",
    qty: "Qty",
    remove: "Remove",
    subtotal: "Subtotal",
    checkout: "Checkout",
    viewCart: "View cart",
    shippingNote: "Shipping and taxes calculated at checkout.",
    proceed: "Proceed to checkout",
    continueShopping: "Continue shopping",
    close: "Close cart",
    openCart: "Open cart",
  },
  checkout: {
    title: "Checkout",
    subtitle:
      "This is a UI shell. Connect payment and order APIs when available.",
    empty: "Your cart is empty. Add items before checkout.",
    contact: "Contact",
    email: "Email",
    phone: "Phone",
    shipping: "Shipping",
    fullName: "Full name",
    address: "Address",
    subtotal: "Subtotal",
    placeOrder: "Place order (demo)",
    thanks:
      "Thanks — this demo does not place an order. Wire to your checkout API when ready.",
  },
  account: {
    title: "Account",
    subtitle: "Manage your profile and orders.",
    orders: "Order history",
    cart: "Cart",
    shippingDetails: "Shipping details",
    soon: "Soon",
    sectionsLabel: "Account sections",
    edit: "Edit",
    cancel: "Cancel",
    saveProfile: "Save profile",
    verifyAndUpdatePhone: "Verify and update phone",
    profileUpdated: "Profile updated.",
    profileUpdateFailed: "Could not update profile.",
    phoneUpdated: "Phone number updated.",
    phoneUpdateFailed: "Could not update phone number.",
    signedOut: "You’re not signed in.",
    signedOutCta: "Sign in",
    signedInAs: "Signed in as customer",
    signOut: "Sign out",
    shippingSaved: "Shipping details saved.",
    shippingSaveFailed: "Could not save shipping details.",
    shippingUpdated: "Shipping details updated.",
    shippingUpdateFailed: "Could not update shipping details.",
    shippingDeleted: "Shipping details removed.",
    shippingDeleteFailed: "Could not delete shipping details.",
    shippingAddNew: "Add new",
    shippingEmpty: "No shipping details yet.",
    shippingDelete: "Delete",
    shippingEditTitle: "Edit shipping details",
    shippingAddTitle: "Add shipping details",
    shippingCity: "City",
    shippingZipCode: "Zip code",
    shippingStreetRequired: "Street *",
    shippingStreetNumber: "Street number",
    shippingApartmentNumber: "Apartment number",
    shippingApartmentFloor: "Apartment floor",
    shippingEntrance: "Entrance",
    shippingEntranceCode: "Entrance code",
    shippingAdditionalEntranceCode: "Additional entrance code",
    shippingAddressNotes: "Address notes",
    shippingUpdate: "Update",
    shippingSave: "Save",
  },
  orders: {
    title: "Order history",
    subtitle:
      "Customer order APIs are not exposed yet. This page is ready for future wiring.",
    empty: "No orders to show.",
    account: "Account",
    loading: "Loading orders...",
    status: "Status",
    total: "Total",
    statusPending: "Pending",
    statusApproved: "Approved",
    statusReady: "Ready",
    statusDelivered: "Delivered",
    statusCancelled: "Cancelled",
    statusUnknown: "Status",
  },
  auth: {
    loginTitle: "Sign in",
    loginSubtitle: "We’ll send a one-time code to your phone or email.",
    registerTitle: "Create account",
    registerSubtitle: "Verify your phone or email, then complete your profile.",
    registerCta: "Create an account",
    loginCta: "Sign in",
    sms: "SMS",
    email: "Email",
    phone: "Phone number",
    emailLabel: "Email",
    sendCode: "Send code",
    code: "Verification code",
    signIn: "Sign in",
    resend: "Resend code",
    firstName: "First name",
    lastName: "Last name",
    emailOptional: "Email (optional)",
    createAccount: "Create account",
    newHere: "New here?",
    haveAccount: "Already have an account?",
    msgCodeSent: "Verification code sent.",
    msgCodeResent: "Code resent.",
    errSendCode: "Could not send code.",
    errResend: "Could not resend.",
    errLogin: "Login failed.",
    errRegister: "Registration failed.",
    verifyChannel: "Send my code via",
    phoneHint: "Use the mobile number where you can receive SMS.",
    emailHint: "We’ll send a one-time code to this inbox.",
    phonePlaceholder: "555 010 2030",
    emailPlaceholder: "you@example.com",
    optionalShort: "optional",
    codeHint: "Check your messages or inbox for the code.",
  },
  pagination: {
    previous: "Previous",
    next: "Next",
    label: "Pagination",
  },
  unknownStore: {
    title: "Unknown storefront",
    body: "This hostname is not mapped to a vendor. For local development use store1.localhost:3000 or update src/tenants/registry.ts.",
  },
  locale: {
    label: "Language",
    en: "English",
    he: "עברית",
    ar: "العربية",
  },
};

const he: Dictionary = {
  nav: {
    main: "ראשי",
    account: "חשבון",
    signIn: "כניסה",
    menu: "תפריט",
    search: "חיפוש",
    cart: "עגלה",
    announcement: "משלוח מהיר חינם בהזמנות מעל $200 · החזרות עד 30 יום",
    subcategoriesMenu: "תת־קטגוריות",
  },
  search: {
    placeholder: "חיפוש מוצרים…",
    submit: "חפש",
    title: "חיפוש",
    resultsFor: "תוצאות עבור",
    allProducts: "כל המוצרים",
    resultCount: "תוצאה",
    resultsWord: "תוצאות",
    noResults: "לא נמצאו מוצרים התואמים לחיפוש.",
    home: "בית",
  },
  home: {
    shopAll: "לכל המוצרים",
    browse: "עיון ב",
    collections: "קולקציות",
    viewAll: "הצג הכל",
    featured: "מומלצים",
    featuredSubtitle: "בחירות העורך — הפריטים שהלקוחות שלנו לובשים עכשיו.",
    heroBadge: "הגעות חדשות",
    heroTitle: "אמנות ללבוש נכון",
    heroSubtitle:
      "קווים נבחרים, בדים מרגישים וביטחון שקט—תגלו פריטים שתחזרו אליהם שוב ושוב.",
    trustShipping: "משלוח יוקרתי",
    trustReturns: "החזרות עד 30 יום",
    trustConcierge: "ליווי סטיילינג אישי",
    shopCategories: "קנו לפי קטגוריה",
    shopCategoriesHint: "קיצור דרך לאוסף",
    shopByFabric: "קנו לפי בד",
    editorialEyebrow: "האדיט",
    editorialSupporting:
      "פריט שבועי אחד—גזרה מדויקת, סיבים נדירים ופרטים שרואים מקרוב.",
    fabricSilk: "משי",
    fabricCashmere: "קשמיר",
    fabricLinen: "פשתן",
    fabricLeather: "עור",
    fabricWool: "צמר",
    fabricExplorerBlurb: "בחרו חומר גלם כדי לסנן את כל הפריטים באותו סיב.",
  },
  product: {
    pageFallback: "מוצר",
    noImage: "אין תמונה",
    noDescription: "אין תיאור.",
    selectOptions: "בחרו את כל האפשרויות כדי לראות מחיר וזמינות.",
    priceError: "לא ניתן לטעון מחיר לשילוב זה.",
    available: "זמין",
    outOfStock: "אזל מהמלאי לבחירה זו",
    addToCart: "הוספה לעגלה",
    viewDetails: "לפריט",
    vatExcluded: "לא כולל מע״מ",
    home: "בית",
    reviewsTitle: "ביקורות",
    reviewsPlaceholder: "ביקורות יוצגו כאן כאשר יחובר ממשק הביקורות.",
    related: "אולי תאהבו גם",
    details: "הפרטים",
    ratingReviews: "{{rating}} · {{count}} ביקורות",
    lowStock: "נותרו מעט יחידות",
    saveForLater: "שמירה",
    shopNow: "לקנייה",
    trustShip: "משלוח מהיר חינם מעל $200",
    trustReturn: "החזרות 30 יום · תווית משלוח",
    trustAuthentic: "מקוריות מובטחת",
    styleCode: "מק״ט ",
    priceFrom: "החל מ־",
    optionsOnProductPage: "מידות וצבעים בדף המוצר",
  },
  category: {
    home: "בית",
    collection: "קולקציה",
    browse: "עיון",
    noProducts: "אין עדיין מוצרים בקולקציה זו.",
    productsSuffix: "מוצרים",
  },
  cart: {
    title: "העגלה שלך",
    subtitle: "הפריטים נשמרים במכשיר זה עד לחיבור תשלום ל-API.",
    empty: "העגלה ריקה.",
    emptyDrawer: "העגלה ריקה.",
    each: "ליחידה",
    qty: "כמות",
    remove: "הסרה",
    subtotal: "סיכום ביניים",
    checkout: "תשלום",
    viewCart: "לעגלה",
    shippingNote: "משלוח ומיסים יחושבו בתשלום.",
    proceed: "המשך לתשלום",
    continueShopping: "המשך לקנות",
    close: "סגירת עגלה",
    openCart: "פתיחת עגלה",
  },
  checkout: {
    title: "תשלום",
    subtitle: "מעטפת ממשק. יש לחבר תשלום והזמנות כשיהיו זמינים.",
    empty: "העגלה ריקה. הוסיפו פריטים לפני התשלום.",
    contact: "פרטי קשר",
    email: "אימייל",
    phone: "טלפון",
    shipping: "משלוח",
    fullName: "שם מלא",
    address: "כתובת",
    subtotal: "סיכום ביניים",
    placeOrder: "ביצוע הזמנה (הדגמה)",
    thanks: "תודה — הדגמה זו אינה יוצרת הזמנה. חברו ל-API כשתהיו מוכנים.",
  },
  account: {
    title: "חשבון",
    subtitle: "ניהול פרופיל והזמנות.",
    orders: "היסטוריית הזמנות",
    cart: "עגלה",
    shippingDetails: "פרטי משלוח",
    soon: "בקרוב",
    sectionsLabel: "מדורי חשבון",
    edit: "עריכה",
    cancel: "ביטול",
    saveProfile: "שמירת פרופיל",
    verifyAndUpdatePhone: "אימות ועדכון טלפון",
    profileUpdated: "הפרופיל עודכן.",
    profileUpdateFailed: "לא ניתן לעדכן פרופיל.",
    phoneUpdated: "מספר הטלפון עודכן.",
    phoneUpdateFailed: "לא ניתן לעדכן מספר טלפון.",
    signedOut: "לא מחוברים.",
    signedOutCta: "כניסה",
    signedInAs: "מחובר כלקוח",
    signOut: "יציאה",
    shippingSaved: "פרטי המשלוח נשמרו.",
    shippingSaveFailed: "לא ניתן לשמור פרטי משלוח.",
    shippingUpdated: "פרטי המשלוח עודכנו.",
    shippingUpdateFailed: "לא ניתן לעדכן פרטי משלוח.",
    shippingDeleted: "פרטי המשלוח הוסרו.",
    shippingDeleteFailed: "לא ניתן למחוק פרטי משלוח.",
    shippingAddNew: "הוספת כתובת",
    shippingEmpty: "אין עדיין פרטי משלוח.",
    shippingDelete: "מחיקה",
    shippingEditTitle: "עריכת פרטי משלוח",
    shippingAddTitle: "הוספת פרטי משלוח",
    shippingCity: "עיר",
    shippingZipCode: "מיקוד",
    shippingStreetRequired: "רחוב *",
    shippingStreetNumber: "מספר בית",
    shippingApartmentNumber: "מספר דירה",
    shippingApartmentFloor: "קומה",
    shippingEntrance: "כניסה",
    shippingEntranceCode: "קוד כניסה",
    shippingAdditionalEntranceCode: "קוד כניסה נוסף",
    shippingAddressNotes: "הערות לכתובת",
    shippingUpdate: "עדכון",
    shippingSave: "שמירה",
  },
  orders: {
    title: "היסטוריית הזמנות",
    subtitle: "ממשק הזמנות ללקוח עדיין לא חשוף. הדף מוכן לחיבור עתידי.",
    empty: "אין הזמנות להצגה.",
    account: "חשבון",
    loading: "טוען הזמנות...",
    status: "סטטוס",
    total: "סה״כ",
    statusPending: "ממתין",
    statusApproved: "אושר",
    statusReady: "מוכן",
    statusDelivered: "נמסר",
    statusCancelled: "בוטל",
    statusUnknown: "סטטוס",
  },
  auth: {
    loginTitle: "כניסה",
    loginSubtitle: "נשלח קוד חד-פעמי לטלפון או לאימייל.",
    registerTitle: "יצירת חשבון",
    registerSubtitle: "אמתו טלפון או אימייל והשלימו את הפרופיל.",
    registerCta: "יצירת חשבון",
    loginCta: "כניסה",
    sms: "SMS",
    email: "אימייל",
    phone: "מספר טלפון",
    emailLabel: "אימייל",
    sendCode: "שליחת קוד",
    code: "קוד אימות",
    signIn: "כניסה",
    resend: "שליחה מחדש",
    firstName: "שם פרטי",
    lastName: "שם משפחה",
    emailOptional: "אימייל (אופציונלי)",
    createAccount: "יצירת חשבון",
    newHere: "חדשים אצלנו?",
    haveAccount: "כבר יש לכם חשבון?",
    msgCodeSent: "קוד אימות נשלח.",
    msgCodeResent: "הקוד נשלח מחדש.",
    errSendCode: "לא ניתן לשלוח קוד.",
    errResend: "לא ניתן לשלוח שוב.",
    errLogin: "הכניסה נכשלה.",
    errRegister: "ההרשמה נכשלה.",
    verifyChannel: "שליחת הקוד דרך",
    phoneHint: "השתמשו במספר הנייד שאליו ניתן לקבל SMS.",
    emailHint: "נשלח קוד חד-פעמי לכתובת זו.",
    phonePlaceholder: "050-123-4567",
    emailPlaceholder: "your@email.com",
    optionalShort: "אופציונלי",
    codeHint: "בדקו את ההודעות או תיבת הדואר לקבלת הקוד.",
  },
  pagination: {
    previous: "הקודם",
    next: "הבא",
    label: "דפדוף",
  },
  unknownStore: {
    title: "חנות לא מוכרת",
    body: "שם המארח לא ממופה לספק. לפיתוח מקומי השתמשו ב-store1.localhost:3000 או עדכנו את src/tenants/registry.ts.",
  },
  locale: {
    label: "שפה",
    en: "English",
    he: "עברית",
    ar: "العربية",
  },
};

const ar: Dictionary = {
  nav: {
    main: "الرئيسية",
    account: "الحساب",
    signIn: "تسجيل الدخول",
    menu: "القائمة",
    search: "بحث",
    cart: "السلة",
    announcement: "شحن سريع مجاني للطلبات فوق 200$ · إرجاع خلال 30 يوماً",
    subcategoriesMenu: "الفئات الفرعية",
  },
  search: {
    placeholder: "ابحث عن المنتجات…",
    submit: "بحث",
    title: "بحث",
    resultsFor: "نتائج لـ",
    allProducts: "جميع المنتجات",
    resultCount: "نتيجة",
    resultsWord: "نتائج",
    noResults: "لا توجد منتجات مطابقة لبحثك.",
    home: "الرئيسية",
  },
  home: {
    shopAll: "تسوق الكل",
    browse: "تصفح",
    collections: "المجموعات",
    viewAll: "عرض الكل",
    featured: "مميز",
    featuredSubtitle: "اختيارات المحرر — القطع التي يرتديها عملاؤنا الآن.",
    heroBadge: "وصل حديثاً",
    heroTitle: "فنّ اختيار الأناقة",
    heroSubtitle:
      "قصّات منتقاة وأقمشة راقية وثقة هادئة—اكتشفوا قطعاً ستعودون إليها مراراً.",
    trustShipping: "توصيل فاخر",
    trustReturns: "إرجاع خلال 30 يوماً",
    trustConcierge: "دعم تنسيق شخصي",
    shopCategories: "تسوق حسب الفئة",
    shopCategoriesHint: "اختصار إلى التحرير",
    shopByFabric: "تسوق حسب القماش",
    editorialEyebrow: "التحرير",
    editorialSupporting:
      "قطعة بارزة أسبوعياً—قصّات مدروسة وأقمشة نادرة وتفاصيل تُرى عن قرب.",
    fabricSilk: "حرير",
    fabricCashmere: "كشمير",
    fabricLinen: "كتان",
    fabricLeather: "جلد",
    fabricWool: "صوف",
    fabricExplorerBlurb: "اختروا خامة لتصفح كل القطع من نفس النسيج.",
  },
  product: {
    pageFallback: "منتج",
    noImage: "لا توجد صورة",
    noDescription: "لا يوجد وصف.",
    selectOptions: "اختر كل الخيارات لعرض السعر والتوفر.",
    priceError: "تعذر تحميل السعر لهذا الاختيار.",
    available: "متوفر",
    outOfStock: "نفد من المخزون لهذا الاختيار",
    addToCart: "أضف إلى السلة",
    viewDetails: "عرض القطعة",
    vatExcluded: "غير شامل ضريبة القيمة المضافة",
    home: "الرئيسية",
    reviewsTitle: "التقييمات",
    reviewsPlaceholder: "ستظهر التقييمات هنا عند ربط واجهة التقييمات.",
    related: "قد يعجبك أيضاً",
    details: "التفاصيل",
    ratingReviews: "{{rating}} · {{count}} مراجعة",
    lowStock: "تبقى كمية محدودة",
    saveForLater: "حفظ",
    shopNow: "تسوق الآن",
    trustShip: "شحن سريع مجاني فوق 200$",
    trustReturn: "إرجاع خلال 30 يوماً · ملصق مسبق الدفع",
    trustAuthentic: "ضمان الأصالة",
    styleCode: "الرمز ",
    priceFrom: "من",
    optionsOnProductPage: "المقاسات والألوان في صفحة المنتج",
  },
  category: {
    home: "الرئيسية",
    collection: "المجموعة",
    browse: "تصفح",
    noProducts: "لا توجد منتجات في هذه المجموعة بعد.",
    productsSuffix: "منتجات",
  },
  cart: {
    title: "سلتك",
    subtitle: "تبقى العناصر على هذا الجهاز حتى ربط الدفع بواجهة البرمجة.",
    empty: "سلتك فارغة.",
    emptyDrawer: "سلتك فارغة.",
    each: "للوحدة",
    qty: "الكمية",
    remove: "إزالة",
    subtotal: "المجموع الفرعي",
    checkout: "الدفع",
    viewCart: "عرض السلة",
    shippingNote: "تُحسب الشحن والضرائب عند الدفع.",
    proceed: "متابعة الدفع",
    continueShopping: "متابعة التسوق",
    close: "إغلاق السلة",
    openCart: "فتح السلة",
  },
  checkout: {
    title: "الدفع",
    subtitle: "واجهة تجريبية. اربط الدفع والطلبات عند توفرها.",
    empty: "سلتك فارغة. أضف منتجات قبل الدفع.",
    contact: "جهة الاتصال",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    shipping: "الشحن",
    fullName: "الاسم الكامل",
    address: "العنوان",
    subtotal: "المجموع الفرعي",
    placeOrder: "تأكيد الطلب (تجريبي)",
    thanks:
      "شكراً — هذا العرض التوضيحي لا ينشئ طلباً. اربط واجهة البرمجة لاحقاً.",
  },
  account: {
    title: "الحساب",
    subtitle: "إدارة الملف والطلبات.",
    orders: "سجل الطلبات",
    cart: "السلة",
    shippingDetails: "تفاصيل الشحن",
    soon: "قريباً",
    sectionsLabel: "أقسام الحساب",
    edit: "تعديل",
    cancel: "إلغاء",
    saveProfile: "حفظ الملف",
    verifyAndUpdatePhone: "تحقق وتحديث الهاتف",
    profileUpdated: "تم تحديث الملف.",
    profileUpdateFailed: "تعذر تحديث الملف.",
    phoneUpdated: "تم تحديث رقم الهاتف.",
    phoneUpdateFailed: "تعذر تحديث رقم الهاتف.",
    signedOut: "لم تقم بتسجيل الدخول.",
    signedOutCta: "تسجيل الدخول",
    signedInAs: "مسجل كعميل",
    signOut: "تسجيل الخروج",
    shippingSaved: "تم حفظ تفاصيل الشحن.",
    shippingSaveFailed: "تعذر حفظ تفاصيل الشحن.",
    shippingUpdated: "تم تحديث تفاصيل الشحن.",
    shippingUpdateFailed: "تعذر تحديث تفاصيل الشحن.",
    shippingDeleted: "تمت إزالة تفاصيل الشحن.",
    shippingDeleteFailed: "تعذر حذف تفاصيل الشحن.",
    shippingAddNew: "إضافة عنوان",
    shippingEmpty: "لا توجد تفاصيل شحن بعد.",
    shippingDelete: "حذف",
    shippingEditTitle: "تعديل تفاصيل الشحن",
    shippingAddTitle: "إضافة تفاصيل الشحن",
    shippingCity: "المدينة",
    shippingZipCode: "الرمز البريدي",
    shippingStreetRequired: "الشارع *",
    shippingStreetNumber: "رقم الشارع",
    shippingApartmentNumber: "رقم الشقة",
    shippingApartmentFloor: "الطابق",
    shippingEntrance: "المدخل",
    shippingEntranceCode: "رمز المدخل",
    shippingAdditionalEntranceCode: "رمز مدخل إضافي",
    shippingAddressNotes: "ملاحظات العنوان",
    shippingUpdate: "تحديث",
    shippingSave: "حفظ",
  },
  orders: {
    title: "سجل الطلبات",
    subtitle: "واجهة طلبات العملاء غير متاحة بعد. الصفحة جاهزة للربط لاحقاً.",
    empty: "لا توجد طلبات.",
    account: "الحساب",
    loading: "جاري تحميل الطلبات...",
    status: "الحالة",
    total: "الإجمالي",
    statusPending: "قيد الانتظار",
    statusApproved: "تمت الموافقة",
    statusReady: "جاهز",
    statusDelivered: "تم التسليم",
    statusCancelled: "ملغي",
    statusUnknown: "الحالة",
  },
  auth: {
    loginTitle: "تسجيل الدخول",
    loginSubtitle: "سنرسل رمزاً لمرة واحدة إلى هاتفك أو بريدك.",
    registerTitle: "إنشاء حساب",
    registerSubtitle: "تحقق من الهاتف أو البريد ثم أكمل ملفك.",
    registerCta: "إنشاء حساب",
    loginCta: "تسجيل الدخول",
    sms: "رسالة نصية",
    email: "البريد",
    phone: "رقم الهاتف",
    emailLabel: "البريد الإلكتروني",
    sendCode: "إرسال الرمز",
    code: "رمز التحقق",
    signIn: "دخول",
    resend: "إعادة إرسال الرمز",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    emailOptional: "البريد (اختياري)",
    createAccount: "إنشاء الحساب",
    newHere: "جديد هنا؟",
    haveAccount: "لديك حساب بالفعل؟",
    msgCodeSent: "تم إرسال رمز التحقق.",
    msgCodeResent: "تمت إعادة إرسال الرمز.",
    errSendCode: "تعذر إرسال الرمز.",
    errResend: "تعذر إعادة الإرسال.",
    errLogin: "فشل تسجيل الدخول.",
    errRegister: "فشل إنشاء الحساب.",
    verifyChannel: "إرسال الرمز عبر",
    phoneHint: "استخدموا رقم الجوال الذي يستقبل الرسائل النصية.",
    emailHint: "سنرسل رمزاً لمرة واحدة إلى هذا البريد.",
    phonePlaceholder: "501 234 567",
    emailPlaceholder: "you@example.com",
    optionalShort: "اختياري",
    codeHint: "تحققوا من الرسائل أو البريد للحصول على الرمز.",
  },
  pagination: {
    previous: "السابق",
    next: "التالي",
    label: "ترقيم الصفحات",
  },
  unknownStore: {
    title: "متجر غير معروف",
    body: "اسم المضيف غير مربوط ببائع. للتطوير المحلي استخدم store1.localhost:3000 أو حدّث src/tenants/registry.ts.",
  },
  locale: {
    label: "اللغة",
    en: "English",
    he: "עברית",
    ar: "العربية",
  },
};

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  he,
  ar,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
