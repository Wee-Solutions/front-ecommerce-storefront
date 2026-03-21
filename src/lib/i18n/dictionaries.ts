import type { Locale } from "./locale-config";

export type Dictionary = {
  nav: {
    main: string;
    account: string;
    signIn: string;
    menu: string;
    search: string;
    cart: string;
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
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
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
    vatExcluded: string;
    home: string;
    reviewsTitle: string;
    reviewsPlaceholder: string;
    related: string;
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
    signedOut: string;
    signedOutCta: string;
    signedInAs: string;
    signOut: string;
  };
  orders: {
    title: string;
    subtitle: string;
    empty: string;
    account: string;
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
    heroBadge: "New arrivals",
    heroTitle: "Design that sells",
    heroSubtitle:
      "Curated products with a calm, conversion-focused experience.",
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
    vatExcluded: "VAT excluded",
    home: "Home",
    reviewsTitle: "Reviews",
    reviewsPlaceholder:
      "Reviews will appear here when the review API is connected.",
    related: "You may also like",
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
    signedOut: "You’re not signed in.",
    signedOutCta: "Sign in",
    signedInAs: "Signed in as customer",
    signOut: "Sign out",
  },
  orders: {
    title: "Order history",
    subtitle:
      "Customer order APIs are not exposed yet. This page is ready for future wiring.",
    empty: "No orders to show.",
    account: "Account",
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
    heroBadge: "הגעות חדשות",
    heroTitle: "עיצוב שמוכר",
    heroSubtitle: "מוצרים נבחרים בחוויית קנייה שקטה וממוקדת המרה.",
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
    vatExcluded: "לא כולל מע״מ",
    home: "בית",
    reviewsTitle: "ביקורות",
    reviewsPlaceholder: "ביקורות יוצגו כאן כאשר יחובר ממשק הביקורות.",
    related: "אולי תאהבו גם",
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
    signedOut: "לא מחוברים.",
    signedOutCta: "כניסה",
    signedInAs: "מחובר כלקוח",
    signOut: "יציאה",
  },
  orders: {
    title: "היסטוריית הזמנות",
    subtitle:
      "ממשק הזמנות ללקוח עדיין לא חשוף. הדף מוכן לחיבור עתידי.",
    empty: "אין הזמנות להצגה.",
    account: "חשבון",
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
    heroBadge: "وصل حديثاً",
    heroTitle: "تصميم يبيع",
    heroSubtitle: "منتجات مختارة بتجربة هادئة تركز على التحويل.",
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
    vatExcluded: "غير شامل ضريبة القيمة المضافة",
    home: "الرئيسية",
    reviewsTitle: "التقييمات",
    reviewsPlaceholder: "ستظهر التقييمات هنا عند ربط واجهة التقييمات.",
    related: "قد يعجبك أيضاً",
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
    thanks: "شكراً — هذا العرض التوضيحي لا ينشئ طلباً. اربط واجهة البرمجة لاحقاً.",
  },
  account: {
    title: "الحساب",
    subtitle: "إدارة الملف والطلبات.",
    orders: "سجل الطلبات",
    cart: "السلة",
    signedOut: "لم تقم بتسجيل الدخول.",
    signedOutCta: "تسجيل الدخول",
    signedInAs: "مسجل كعميل",
    signOut: "تسجيل الخروج",
  },
  orders: {
    title: "سجل الطلبات",
    subtitle: "واجهة طلبات العملاء غير متاحة بعد. الصفحة جاهزة للربط لاحقاً.",
    empty: "لا توجد طلبات.",
    account: "الحساب",
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
