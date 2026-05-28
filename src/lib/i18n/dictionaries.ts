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
    paymentMethod: string;
    paymentCard: string;
    paymentCash: string;
    paymentBank: string;
    paySecure: string;
    payWaiting: string;
    successPaid: string;
    successPlaced: string;
    errorGeneric: string;
    paymentFailed: string;
    paymentTimeout: string;
    cardUnavailable: string;
    submitting: string;
    loginRequired: string;
    loginCta: string;
    shippingMethodTitle: string;
    shippingDelivery: string;
    shippingDeliveryHint: string;
    shippingPickup: string;
    shippingPickupHint: string;
    deliveryAddress: string;
    selectAddress: string;
    noSavedAddresses: string;
    manageAddresses: string;
    orderNotes: string;
    orderNotesPlaceholder: string;
    coupon: string;
    couponPlaceholder: string;
    applyCoupon: string;
    couponApplied: string;
    couponInvalid: string;
    validatingCoupon: string;
    discount: string;
    totalInclTax: string;
    productsTotalAfterTax: string;
    shippingCost: string;
    totalSaved: string;
    finalTotal: string;
    totalEstimate: string;
    pricingLoadError: string;
    loadingTotals: string;
    bankTransferDetails: string;
    bankName: string;
    bankBranch: string;
    bankAccount: string;
    bankAccountOwner: string;
    bankIban: string;
    defaultAddressTag: string;
    bankTransferPanelTitle: string;
    bankTransferPanelHint: string;
    bankTransferReferenceHint: string;
    bankCopy: string;
    bankCopied: string;
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
    shippingCityRequired: string;
    shippingCityPlaceholder: string;
    shippingCitySearchPlaceholder: string;
    shippingCityEmpty: string;
    shippingCityLoading: string;
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
    shippingDeleteConfirm: string;
    shippingIsDefault: string;
    shippingDefaultTag: string;
    shippingMaxReached: string;
  };
  orders: {
    title: string;
    subtitle: string;
    empty: string;
    account: string;
    loading: string;
    status: string;
    total: string;
    statusUnknown: string;
    orderStatusPending: string;
    orderStatusConfirmed: string;
    orderStatusCancelled: string;
    orderStatusDone: string;
    payment: string;
    paymentStatus: string;
    paymentStatusUnpaid: string;
    paymentStatusPaid: string;
    paymentStatusFailed: string;
    paymentStatusCreditJ5: string;
    paymentStatusUnknown: string;
    paymentMethodCash: string;
    paymentMethodCard: string;
    paymentMethodBank: string;
    paymentMethodUnknown: string;
    viewOrder: string;
    backToOrders: string;
    orderDetailTitle: string;
    orderDetailSubtitle: string;
    items: string;
    quantityShort: string;
    lineTotal: string;
    placedOn: string;
    lastUpdated: string;
    subtotalBeforeTax: string;
    tax: string;
    discount: string;
    productsTotalAfterTax: string;
    shippingCost: string;
    totalSaved: string;
    finalTotal: string;
    couponUsed: string;
    shipmentTitle: string;
    shippingMethodLabel: string;
    shippingMethodUnknown: string;
    shippingDelivery: string;
    shippingPickup: string;
    shippingPickupHint: string;
    shipmentStatusLabel: string;
    shipmentStatusPending: string;
    shipmentStatusInTransit: string;
    shipmentStatusDelivered: string;
    shipmentStatusCancelled: string;
    shipmentStatusUnknown: string;
    shippingCostLabel: string;
    deliveryAddress: string;
    customerNotes: string;
    loadError: string;
    notFound: string;
    orderDetailsScreenTitle: string;
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
    subtitle: "Review shipping, payment, and coupons — then place your order.",
    empty: "Your cart is empty. Add items before checkout.",
    contact: "Contact",
    email: "Email",
    phone: "Phone",
    shipping: "Shipping",
    fullName: "Full name",
    address: "Address",
    subtotal: "Subtotal",
    placeOrder: "Place order",
    thanks: "Thank you for your order.",
    paymentMethod: "Payment",
    paymentCard: "Card",
    paymentCash: "Cash on delivery",
    paymentBank: "Bank transfer",
    paySecure: "Complete payment in the secure frame below.",
    payWaiting: "We’ll confirm automatically when payment succeeds.",
    successPaid:
      "Payment received. Your order number is {{orderNumber}}. Thank you!",
    successPlaced:
      "Order {{orderNumber}} was placed successfully. Thank you!",
    errorGeneric: "Something went wrong. Please try again.",
    paymentFailed:
      "Payment was not completed. You can return to checkout and try again.",
    paymentTimeout:
      "We could not confirm payment in time. If you were charged, contact support with your order number.",
    cardUnavailable:
      "Card payment is not available right now. Try cash, bank transfer, or try again later.",
    submitting: "Submitting…",
    loginRequired: "Sign in to complete checkout.",
    loginCta: "Sign in",
    shippingMethodTitle: "How do you want to receive your order?",
    shippingDelivery: "Delivery",
    shippingDeliveryHint: "We’ll ship to a saved address.",
    shippingPickup: "Pickup",
    shippingPickupHint: "Collect from the store — no shipping address needed.",
    deliveryAddress: "Delivery address",
    selectAddress: "Choose a saved address",
    noSavedAddresses:
      "You don’t have a delivery address yet. Add one in your account.",
    manageAddresses: "Manage addresses",
    orderNotes: "Order notes (optional)",
    orderNotesPlaceholder: "Instructions for the seller…",
    coupon: "Coupon",
    couponPlaceholder: "Enter code",
    applyCoupon: "Apply",
    couponApplied: "Coupon applied",
    couponInvalid: "This coupon could not be applied.",
    validatingCoupon: "Checking…",
    discount: "Discount",
    totalInclTax: "Total (incl. tax)",
    productsTotalAfterTax: "Products (incl. tax)",
    shippingCost: "Shipping",
    totalSaved: "You saved",
    finalTotal: "Total to pay",
    totalEstimate: "Estimated total",
    pricingLoadError: "Could not load order totals. Please try again.",
    loadingTotals: "Calculating totals…",
    bankTransferDetails: "Pay by bank transfer using these details",
    bankName: "Bank",
    bankBranch: "Branch",
    bankAccount: "Account",
    bankAccountOwner: "Account holder",
    bankIban: "IBAN",
    defaultAddressTag: "Default",
    bankTransferPanelTitle: "Pay by bank transfer",
    bankTransferPanelHint:
      "Use the details below in your banking app. Transfers usually take 1–2 business days.",
    bankTransferReferenceHint:
      "Important: include your name and order number in the transfer reference so we can match your payment.",
    bankCopy: "Copy",
    bankCopied: "Copied",
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
    shippingCity: "City *",
    shippingCityRequired: "Please select a city.",
    shippingCityPlaceholder: "Select city",
    shippingCitySearchPlaceholder: "Search cities…",
    shippingCityEmpty: "No cities found",
    shippingCityLoading: "Loading cities…",
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
    shippingDeleteConfirm: "Are you sure you want to delete this shipping detail?",
    shippingIsDefault: "Set as default shipping address",
    shippingDefaultTag: "Default",
    shippingMaxReached: "You can only keep up to 3 shipping details.",
  },
  orders: {
    title: "Order history",
    subtitle: "Track orders, payment, and fulfillment in one place.",
    empty: "No orders to show.",
    account: "Account",
    loading: "Loading orders...",
    status: "Order status",
    total: "Total",
    statusUnknown: "Unknown",
    orderStatusPending: "Pending",
    orderStatusConfirmed: "Confirmed",
    orderStatusCancelled: "Cancelled",
    orderStatusDone: "Done",
    payment: "Payment",
    paymentStatus: "Payment status",
    paymentStatusUnpaid: "Unpaid",
    paymentStatusPaid: "Paid",
    paymentStatusFailed: "Failed",
    paymentStatusCreditJ5: "Credit (J5)",
    paymentStatusUnknown: "Unknown",
    paymentMethodCash: "Cash",
    paymentMethodCard: "Card",
    paymentMethodBank: "Bank transfer",
    paymentMethodUnknown: "Other",
    viewOrder: "View details",
    backToOrders: "Back to orders",
    orderDetailTitle: "Order #{{orderNumber}}",
    orderDetailSubtitle: "Items, totals, and status for this order.",
    items: "Items",
    quantityShort: "Qty",
    lineTotal: "Line total",
    placedOn: "Placed on",
    lastUpdated: "Last updated",
    subtotalBeforeTax: "Subtotal (before tax)",
    tax: "Tax",
    discount: "Discount",
    productsTotalAfterTax: "Products (incl. tax)",
    shippingCost: "Shipping",
    totalSaved: "You saved",
    finalTotal: "Total to pay",
    couponUsed: "Coupon",
    shipmentTitle: "Shipping",
    shippingMethodLabel: "Method",
    shippingMethodUnknown: "Unknown method",
    shippingDelivery: "Delivery",
    shippingPickup: "Pickup",
    shippingPickupHint: "Collect from the store — no delivery address.",
    shipmentStatusLabel: "Shipment status",
    shipmentStatusPending: "Pending",
    shipmentStatusInTransit: "In transit",
    shipmentStatusDelivered: "Delivered",
    shipmentStatusCancelled: "Cancelled",
    shipmentStatusUnknown: "Unknown status",
    shippingCostLabel: "Shipping cost",
    deliveryAddress: "Delivery address",
    customerNotes: "Your notes",
    loadError: "Could not load this order.",
    notFound: "We couldn’t find this order.",
    orderDetailsScreenTitle: "Order details",
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
    subtitle: "בדקו משלוח, תשלום וקופון לפני שליחת ההזמנה.",
    empty: "העגלה ריקה. הוסיפו פריטים לפני התשלום.",
    contact: "פרטי קשר",
    email: "אימייל",
    phone: "טלפון",
    shipping: "משלוח",
    fullName: "שם מלא",
    address: "כתובת",
    subtotal: "סיכום ביניים",
    placeOrder: "ביצוע הזמנה",
    thanks: "תודה על הזמנתכם.",
    paymentMethod: "תשלום",
    paymentCard: "כרטיס אשראי",
    paymentCash: "מזומן בעת המסירה",
    paymentBank: "העברה בנקאית",
    paySecure: "השלימו את התשלום במסגרת המאובטחת למטה.",
    payWaiting: "נאשר אוטומטית כשהתשלום יושלם.",
    successPaid:
      "התשלום התקבל. מספר ההזמנה שלכם {{orderNumber}}. תודה!",
    successPlaced: "ההזמנה {{orderNumber}} נוצרה בהצלחה. תודה!",
    errorGeneric: "משהו השתבש. נסו שוב.",
    paymentFailed: "התשלום לא הושלם. ניתן לחזור ולנסות שוב.",
    paymentTimeout:
      "לא הצלחנו לאשר את התשלום בזמן. אם חויבתם, פנו לשירות עם מספר ההזמנה.",
    cardUnavailable:
      "תשלום בכרטיס אינו זמין כרגע. נסו מזומן, העברה בנקאית, או נסו שוב מאוחר יותר.",
    submitting: "שולח…",
    loginRequired: "התחברו כדי להשלים את התשלום.",
    loginCta: "כניסה",
    shippingMethodTitle: "איך תרצו לקבל את ההזמנה?",
    shippingDelivery: "משלוח",
    shippingDeliveryHint: "נשלח לכתובת שמורה.",
    shippingPickup: "איסוף עצמי",
    shippingPickupHint: "איסוף מהחנות — ללא כתובת משלוח.",
    deliveryAddress: "כתובת למשלוח",
    selectAddress: "בחרו כתובת שמורה",
    noSavedAddresses: "אין עדיין כתובת משלוח. הוסיפו בחשבון.",
    manageAddresses: "ניהול כתובות",
    orderNotes: "הערות להזמנה (אופציונלי)",
    orderNotesPlaceholder: "הנחיות לחנות…",
    coupon: "קופון",
    couponPlaceholder: "הזינו קוד",
    applyCoupon: "החלה",
    couponApplied: "הקופון הוחל",
    couponInvalid: "לא ניתן להחיל קופון זה.",
    validatingCoupon: "בודקים…",
    discount: "הנחה",
    totalInclTax: "סה״כ (כולל מע״מ)",
    productsTotalAfterTax: "מוצרים (כולל מע״מ)",
    shippingCost: "משלוח",
    totalSaved: "חסכתם",
    finalTotal: "לתשלום",
    totalEstimate: "סה״כ משוער",
    pricingLoadError: "לא ניתן לטעון את סיכום ההזמנה. נסו שוב.",
    loadingTotals: "מחשבים סיכום…",
    bankTransferDetails: "שלמו בהעברה בנקאית לפי הפרטים",
    bankName: "בנק",
    bankBranch: "סניף",
    bankAccount: "חשבון",
    bankAccountOwner: "בעל החשבון",
    bankIban: "מספר IBAN",
    defaultAddressTag: "ברירת מחדל",
    bankTransferPanelTitle: "תשלום בהעברה בנקאית",
    bankTransferPanelHint:
      "השתמשו בפרטים למטה באפליקציית הבנק. זיכויים בדרך כלל נקלטים תוך 1–2 ימי עסקים.",
    bankTransferReferenceHint:
      "חשוב: ציינו בשדה ההפניה את השם ומספר ההזמנה כדי שנוכל לזהות את התשלום.",
    bankCopy: "העתקה",
    bankCopied: "הועתק",
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
    shippingCity: "עיר *",
    shippingCityRequired: "נא לבחור עיר.",
    shippingCityPlaceholder: "בחירת עיר",
    shippingCitySearchPlaceholder: "חיפוש ערים…",
    shippingCityEmpty: "לא נמצאו ערים",
    shippingCityLoading: "טוען ערים…",
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
    shippingDeleteConfirm: "בטוחים שברצונך למחוק את פרטי המשלוח האלה?",
    shippingIsDefault: "הגדרה ככתובת משלוח ברירת מחדל",
    shippingDefaultTag: "ברירת מחדל",
    shippingMaxReached: "ניתן לשמור עד 3 פרטי משלוח בלבד.",
  },
  orders: {
    title: "היסטוריית הזמנות",
    subtitle: "מעקב אחר הזמנות, תשלום ואספקה.",
    empty: "אין הזמנות להצגה.",
    account: "חשבון",
    loading: "טוען הזמנות...",
    status: "סטטוס הזמנה",
    total: "סה״כ",
    statusUnknown: "לא ידוע",
    orderStatusPending: "ממתין",
    orderStatusConfirmed: "מאושר",
    orderStatusCancelled: "בוטל",
    orderStatusDone: "הושלם",
    payment: "תשלום",
    paymentStatus: "סטטוס תשלום",
    paymentStatusUnpaid: "לא שולם",
    paymentStatusPaid: "שולם",
    paymentStatusFailed: "נכשל",
    paymentStatusCreditJ5: "זיכוי (J5)",
    paymentStatusUnknown: "לא ידוע",
    paymentMethodCash: "מזומן",
    paymentMethodCard: "כרטיס",
    paymentMethodBank: "העברה בנקאית",
    paymentMethodUnknown: "אחר",
    viewOrder: "פרטים",
    backToOrders: "חזרה להזמנות",
    orderDetailTitle: "הזמנה מס׳ {{orderNumber}}",
    orderDetailSubtitle: "פריטים, סיכומים וסטטוס להזמנה זו.",
    items: "פריטים",
    quantityShort: "כמות",
    lineTotal: "סה״כ שורה",
    placedOn: "נוצר ב־",
    lastUpdated: "עודכן לאחרונה",
    subtotalBeforeTax: "סיכום לפני מע״מ",
    tax: "מע״מ",
    discount: "הנחה",
    productsTotalAfterTax: "מוצרים (כולל מע״מ)",
    shippingCost: "משלוח",
    totalSaved: "חסכתם",
    finalTotal: "לתשלום",
    couponUsed: "קופון",
    shipmentTitle: "משלוח",
    shippingMethodLabel: "שיטה",
    shippingMethodUnknown: "שיטה לא ידועה",
    shippingDelivery: "משלוח",
    shippingPickup: "איסוף עצמי",
    shippingPickupHint: "איסוף מהחנות — ללא כתובת משלוח.",
    shipmentStatusLabel: "סטטוס משלוח",
    shipmentStatusPending: "ממתין",
    shipmentStatusInTransit: "בדרך",
    shipmentStatusDelivered: "נמסר",
    shipmentStatusCancelled: "בוטל",
    shipmentStatusUnknown: "סטטוס לא ידוע",
    shippingCostLabel: "עלות משלוח",
    deliveryAddress: "כתובת משלוח",
    customerNotes: "הערות שלכם",
    loadError: "לא ניתן לטעון את ההזמנה.",
    notFound: "ההזמנה לא נמצאה.",
    orderDetailsScreenTitle: "פרטי הזמנה",
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
    subtitle: "راجع الشحن والدفع والقسيمة ثم أكّد الطلب.",
    empty: "سلتك فارغة. أضف منتجات قبل الدفع.",
    contact: "جهة الاتصال",
    email: "البريد الإلكتروني",
    phone: "الهاتف",
    shipping: "الشحن",
    fullName: "الاسم الكامل",
    address: "العنوان",
    subtotal: "المجموع الفرعي",
    placeOrder: "تأكيد الطلب",
    thanks: "شكراً لطلبك.",
    paymentMethod: "الدفع",
    paymentCard: "بطاقة",
    paymentCash: "نقداً عند الاستلام",
    paymentBank: "تحويل بنكي",
    paySecure: "أكمل الدفع في الإطار الآمن أدناه.",
    payWaiting: "سنؤكد تلقائياً عند نجاح الدفع.",
    successPaid:
      "تم استلام الدفع. رقم طلبك {{orderNumber}}. شكراً لك!",
    successPlaced: "تم إنشاء الطلب {{orderNumber}} بنجاح. شكراً لك!",
    errorGeneric: "حدث خطأ. حاول مرة أخرى.",
    paymentFailed: "لم يكتمل الدفع. يمكنك العودة والمحاولة مرة أخرى.",
    paymentTimeout:
      "تعذر تأكيد الدفع في الوقت المناسب. إذا تم الخصم، تواصل مع الدعم مع رقم الطلب.",
    cardUnavailable:
      "دفع البطاقة غير متاح حالياً. جرّب النقد أو التحويل البنكي أو لاحقاً.",
    submitting: "جاري الإرسال…",
    loginRequired: "سجّل الدخول لإتمام الدفع.",
    loginCta: "تسجيل الدخول",
    shippingMethodTitle: "كيف تريد استلام الطلب؟",
    shippingDelivery: "توصيل",
    shippingDeliveryHint: "الشحن إلى عنوان محفوظ.",
    shippingPickup: "استلام من المتجر",
    shippingPickupHint: "بدون عنوان شحن.",
    deliveryAddress: "عنوان التوصيل",
    selectAddress: "اختر عنواناً محفوظاً",
    noSavedAddresses: "لا يوجد عنوان بعد. أضفه من الحساب.",
    manageAddresses: "إدارة العناوين",
    orderNotes: "ملاحظات الطلب (اختياري)",
    orderNotesPlaceholder: "تعليمات للبائع…",
    coupon: "قسيمة",
    couponPlaceholder: "أدخل الرمز",
    applyCoupon: "تطبيق",
    couponApplied: "تم تطبيق القسيمة",
    couponInvalid: "تعذر تطبيق هذه القسيمة.",
    validatingCoupon: "جاري التحقق…",
    discount: "الخصم",
    totalInclTax: "المجموع (شامل الضريبة)",
    productsTotalAfterTax: "المنتجات (شامل الضريبة)",
    shippingCost: "الشحن",
    totalSaved: "وفرت",
    finalTotal: "المبلغ المستحق",
    totalEstimate: "الإجمالي التقديري",
    pricingLoadError: "تعذر تحميل ملخص الطلب. حاول مرة أخرى.",
    loadingTotals: "جاري حساب المجموع…",
    bankTransferDetails: "ادفع بالتحويل البنكي باستخدام البيانات التالية",
    bankName: "البنك",
    bankBranch: "الفرع",
    bankAccount: "الحساب",
    bankAccountOwner: "صاحب الحساب",
    bankIban: "رقم الآيبان",
    defaultAddressTag: "افتراضي",
    bankTransferPanelTitle: "الدفع بالتحويل البنكي",
    bankTransferPanelHint:
      "استخدم البيانات أدناه في تطبيق البنك. قد يستغرق ظهور التحويل يومي عمل.",
    bankTransferReferenceHint:
      "مهم: اذكر اسمك ورقم الطلب في بيانات التحويل ليتم ربط الدفع.",
    bankCopy: "نسخ",
    bankCopied: "تم النسخ",
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
    shippingCity: "المدينة *",
    shippingCityRequired: "يرجى اختيار مدينة.",
    shippingCityPlaceholder: "اختر المدينة",
    shippingCitySearchPlaceholder: "البحث عن مدن…",
    shippingCityEmpty: "لم يتم العثور على مدن",
    shippingCityLoading: "جارٍ تحميل المدن…",
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
    shippingDeleteConfirm: "هل أنت متأكد أنك تريد حذف تفاصيل الشحن هذه؟",
    shippingIsDefault: "تعيين كالعنوان الأساسي",
    shippingDefaultTag: "افتراضي",
    shippingMaxReached: "يمكنك الاحتفاظ بحد أقصى 3 تفاصيل شحن فقط.",
  },
  orders: {
    title: "سجل الطلبات",
    subtitle: "تتبع الطلبات والدفع والتنفيذ.",
    empty: "لا توجد طلبات.",
    account: "الحساب",
    loading: "جاري تحميل الطلبات...",
    status: "حالة الطلب",
    total: "الإجمالي",
    statusUnknown: "غير معروف",
    orderStatusPending: "قيد الانتظار",
    orderStatusConfirmed: "مؤكد",
    orderStatusCancelled: "ملغي",
    orderStatusDone: "مكتمل",
    payment: "الدفع",
    paymentStatus: "حالة الدفع",
    paymentStatusUnpaid: "غير مدفوع",
    paymentStatusPaid: "مدفوع",
    paymentStatusFailed: "فشل",
    paymentStatusCreditJ5: "رصيد (J5)",
    paymentStatusUnknown: "غير معروف",
    paymentMethodCash: "نقداً",
    paymentMethodCard: "بطاقة",
    paymentMethodBank: "تحويل بنكي",
    paymentMethodUnknown: "آخر",
    viewOrder: "عرض التفاصيل",
    backToOrders: "العودة للطلبات",
    orderDetailTitle: "الطلب رقم {{orderNumber}}",
    orderDetailSubtitle: "العناصر والمجاميع والحالة لهذا الطلب.",
    items: "العناصر",
    quantityShort: "الكمية",
    lineTotal: "إجمالي السطر",
    placedOn: "تاريخ الطلب",
    lastUpdated: "آخر تحديث",
    subtotalBeforeTax: "المجموع قبل الضريبة",
    tax: "الضريبة",
    discount: "الخصم",
    productsTotalAfterTax: "المنتجات (شامل الضريبة)",
    shippingCost: "الشحن",
    totalSaved: "وفرت",
    finalTotal: "المبلغ المستحق",
    couponUsed: "قسيمة",
    shipmentTitle: "الشحن",
    shippingMethodLabel: "الطريقة",
    shippingMethodUnknown: "طريقة غير معروفة",
    shippingDelivery: "توصيل",
    shippingPickup: "استلام",
    shippingPickupHint: "الاستلام من المتجر — بدون عنوان توصيل.",
    shipmentStatusLabel: "حالة الشحن",
    shipmentStatusPending: "قيد الانتظار",
    shipmentStatusInTransit: "قيد النقل",
    shipmentStatusDelivered: "تم التسليم",
    shipmentStatusCancelled: "ملغي",
    shipmentStatusUnknown: "حالة غير معروفة",
    shippingCostLabel: "تكلفة الشحن",
    deliveryAddress: "عنوان التوصيل",
    customerNotes: "ملاحظاتك",
    loadError: "تعذر تحميل هذا الطلب.",
    notFound: "لم يُعثر على الطلب.",
    orderDetailsScreenTitle: "تفاصيل الطلب",
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
