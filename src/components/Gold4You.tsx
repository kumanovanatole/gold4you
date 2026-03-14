import { useState, useEffect, useCallback, useRef } from 'react';
import { ShoppingBag, X, ArrowRight, ArrowLeft, Minus, Plus, Star, Shield, Truck, BadgeCheck, CreditCard, Clock, MapPin, User, Users, Award, Quote, Mail, Phone, MessageCircle, Globe, Search, Package, TrendingDown, ChevronRight, Info } from 'lucide-react';

// ===== i18n =====

type Lang = 'en' | 'de' | 'it';

const LANGS: { code: Lang; label: string; flag: string; country: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧', country: 'United Kingdom' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', country: 'Deutschland' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹', country: 'Italia' },
];

const T: Record<Lang, Record<string, string>> = {
  en: {
    allBars: 'All Bars', investment: 'Investment', premium: 'Premium', about: 'About', profile: 'Profile',
    shopNow: 'Shop Now', aboutUs: 'About Us', viewDetails: 'View Details →', backTo: 'Back to',
    backToShop: 'Back to Shop', addToCart: 'Add to Cart', bars: 'bars', bar: 'bar',
    weight: 'Weight', payWith: 'Pay with', financing: 'Financing', financeAvail: 'Financing Available',
    buyNow: 'Buy gold now.', payOver: 'Pay over 3 to 24 months.', goldShips: 'Gold ships immediately',
    yourBar: 'Your gold bar from', perMonth: '/month', months: 'months',
    chooseBar: 'Choose Your Bar', howItWorks: 'How it works', requirements: 'Requirements',
    financingFaq: 'Financing FAQ', availCountries: 'Available in 12 countries',
    customerReviews: 'Customer Reviews', verifiedBuyers: 'Verified Buyers', verified: 'Verified',
    reviews: 'reviews', recognizedBy: 'Recognized by', contact: 'Contact', getInTouch: 'Get in Touch',
    refinery: 'Refinery', office: 'Office', reachUs: 'Reach Us', whatsapp: 'WhatsApp',
    imprint: 'Imprint', privacy: 'Privacy', terms: 'Terms', shipping: 'Shipping',
    trustBadgeLbma: 'LBMA Certified', trustBadgeDelivery: 'Insured Delivery', trustBadgeVat: 'VAT Exempt',
    trustBadgeFinance: '0% Financing', trustBadgeLock: 'Price Lock 15 min',
    heroTitle1: 'Gold bars from', heroTitle2: 'Finance from', heroSub: 'LBMA certified gold bars from licensed Dubai refineries. VAT-free, insured delivery, financing available.',
    heroBadge: 'Trusted Swiss Gold Dealer',
    catalogSub: 'LBMA Certified', catalogTitle: 'Buy Discount Gold Bars Online',
    financingProfile: 'Financing Profile', financingProfileSub: 'Complete your profile to apply for gold financing. Get approved in minutes and receive your gold bar the same day.',
    financingNotSetUp: 'Financing not yet set up', financingNotSetUpSub: 'Complete the form below to get pre-approved for gold financing.',
    personalInfo: 'Personal Information', firstName: 'First Name', lastName: 'Last Name',
    email: 'Email', phone: 'Phone', dob: 'Date of Birth', nationality: 'Nationality',
    address: 'Delivery & Billing Address', street: 'Street & Number', postalCode: 'Postal Code',
    city: 'City', country: 'Country', selectCountry: 'Select your country',
    idVerification: 'ID Verification (KYC)', docType: 'Document Type', docNumber: 'Document Number',
    uploadId: 'Upload ID (Front)', dragDrop: 'Drag & drop or click to upload',
    employment: 'Employment & Income', empStatus: 'Employment Status', monthlyIncome: 'Monthly Net Income',
    submitApplication: 'Submit Financing Application', submitDisclaimer: 'By submitting you agree to our Terms and Privacy Policy.',
    security: 'Security', needHelp: 'Need help?', needHelpSub: 'Our team can walk you through the financing process.',
    selectDoc: 'Select document', selectStatus: 'Select status', selectRange: 'Select range',
    passport: 'Passport', nationalId: 'National ID Card', driversLicense: "Driver's License",
    employed: 'Employed', selfEmployed: 'Self-Employed', retired: 'Retired', student: 'Student', other: 'Other',
    footerShop: 'Shop', footerFinancing: 'Financing', footerToken: 'G4Y Token', footerContact: 'Contact',
    footerAbout: 'About Us', footerFaq: 'FAQ', footerReviews: 'Reviews',
    footerDesc: 'Swiss gold dealer offering LBMA certified bars at the lowest premiums. Insured delivery to 38 countries.',
    welcomeTitle: 'Welcome to gold4you', welcomeSub: 'Choose your country and language to get started.',
    continueBtn: 'Continue', relatedBars: 'Related Bars', youMayLike: 'You may also like',
    selectCrypto: 'Select cryptocurrency', g4yToken: 'gold4you Token',
    financingExamples: 'Financing examples', buyNowPay: 'Buy now, pay in installments',
    monthly: 'Monthly', interest: 'Interest', total: 'Total', monthlyPayment: 'Monthly payment',
    barPrice: 'Bar price', earlyRepay: 'Early repayment possible — no penalties',
    noDownPayment: 'No down payment required', shipped: 'Gold ships immediately after approval',
    insured: 'Fully insured · Price locked for 15 minutes',
    philosophy: 'Philosophy',
    ctaHeadline: 'Buying gold has never been easier.',
    ctaSub: 'From 1g to 5kg. Financing from 3 months.',
    ctaBtn: 'Explore now',
    ctaBuild: 'Start building your gold position',
    // Checkout
    coShipping: 'Shipping & Billing', coShippingSub: 'Where should we deliver your gold?',
    coContinuePayment: 'Continue to Payment',
    coPaymentMethod: 'Payment Method', coPaymentSub: 'How would you like to pay?',
    coCreditDebit: 'Credit / Debit Card', coCreditDebitSub: 'Visa, Mastercard, AMEX',
    coBankTransfer: 'Bank Transfer', coBankTransferSub: 'SEPA / IBAN',
    coCrypto: 'Cryptocurrency', coCryptoSub: 'BTC, ETH, USDT',
    coFinancingSub: '6–48 months, 0% interest',
    coCardNumber: 'Card Number', coExpiry: 'Expiry', coCvc: 'CVC',
    coAccepted: 'Accepted', co3dSecure: '3D Secure',
    coBankInfo: 'Transfer to our account after placing your order:',
    coBankLabel: 'Bank', coRef: 'Ref', coOrderNumber: 'Your order number',
    coBankShipNote: 'Gold ships once payment is received (1–2 business days).',
    coCryptoSelect: 'Select cryptocurrency:',
    coCryptoNote: 'Wallet address and QR code will be provided after placing the order.',
    coFinTerm: 'Financing Term', coMo: 'mo',
    coEmpStatusLabel: 'Employment Status *', coMonthlyIncomeLabel: 'Monthly Income *',
    coSelectDots: 'Select\u2026',
    coCreditNote: 'Credit check by licensed partner. Invoicing managed by gold4you AG.',
    coBack: 'Back', coReviewOrder: 'Review Order',
    coReviewTitle: 'Review Your Order', coReviewSub: 'Please confirm everything looks correct.',
    coItems: 'Items', coSubtotal: 'Subtotal (Spot \u22122%)',
    coShipAddress: 'Shipping Address', coPayment: 'Payment',
    coVatExempt: 'VAT exempt (Investment Gold)',
    coInsuredDelivery: 'Insured delivery (Dubai Express + Swiss Post)',
    coInsuredDeliverySub: '3\u20135 business days (Dubai \u2192 CH/EU). Signature required. Fully insured.',
    co3dRedirect: 'You will be redirected to 3D Secure verification by your bank to complete the payment.',
    coPay: 'Pay', coPlaceOrder: 'Place Order',
    coFinReqSubmitted: 'Financing Request Submitted', coPaySuccess: 'Payment Successful',
    coThankYou: 'Thank you for your order!',
    coOrderNo: 'Order No.', coAmount: 'Amount',
    coCard3d: 'Card (3D Secure)',
    co3dProcessed: 'Payment processed via 3D Secure',
    co3dProcessedSub: 'Your card has been charged successfully. Your gold bar is being prepared for shipment today.',
    coAwaitTransfer: 'Awaiting bank transfer',
    coAwaitTransferSub: 'Please transfer the amount to the account below. Gold ships once payment is received (1\u20132 business days).',
    coReference: 'Reference',
    coWalletSent: 'Wallet details sent',
    coWalletSentSub: 'Check your email for the wallet address and QR code. Gold ships once the transaction is confirmed on-chain.',
    coFinReview: 'Financing request under review',
    coFinReviewSub: 'Your request has been forwarded to our credit partner. You will receive a decision within minutes via email. Once approved, your gold ships the same day.',
    coWhatsNext: 'What happens next',
    coCreditCheckStep: 'Credit check', coCreditCheckStepSub: 'Our partner reviews your application (usually under 2 minutes).',
    coApprovalStep: 'Approval & terms', coApprovalStepSub: 'You receive the final terms and monthly payment plan via email.',
    coGoldShipsStep: 'Gold ships today', coGoldShipsStepSub: 'Upon approval, your bar is packaged and shipped immediately.',
    coMonthlyInvStep: 'Monthly invoicing', coMonthlyInvStepSub: 'You receive monthly invoices from the credit partner.',
    coConfirmEmail: 'Confirmation email', coConfirmEmailSub: 'A confirmation with your order details is on its way.',
    coQualityCheck: 'Quality check', coQualityCheckSub: 'Your gold bar is verified and securely packaged.',
    coInsuredShipStep: 'Insured shipping', coInsuredShipStepSub: 'Express from Dubai (1-3 days), then insured delivery via Swiss Post (1-2 days).',
    coDeliveryStep: 'Delivery', coDeliveryStepSub: 'Signature required at your door. Track via email.',
    co3dNote: 'Payment secured with 3D Secure 2.0 authentication. PCI DSS Level 1 compliant.',
    coContinueShopping: 'Continue Shopping',
    // Cart
    cartTitle: 'Cart', cartEmpty: 'Your cart is empty',
    cartSubtotal: 'Subtotal', cartVatNote: 'VAT exempt (Investment Gold)',
    cartKycNote: 'Orders over 5 kg require identity verification (KYC)',
    cartCompleteKyc: 'Complete KYC', cartCheckout: 'Checkout', cartContinue: 'Continue Shopping',
    // Product detail
    detailPurity: 'Purity', detailPurityVal: '999.9 Fine Gold (24K)',
    detailCert: 'Certification', detailCertVal: 'LBMA Good Delivery (Assay Certificate)',
    detailMfr: 'Manufacturer', detailDimensions: 'Dimensions',
    detailVat: 'VAT', detailVatVal: 'Exempt (Investment Gold)',
    detailLive: 'LIVE', detailSpot: 'Spot \u22122%',
    detailMonthlyPay: 'Monthly payments',
    detailDownPayment: 'Down payment',
    detailOneTime: 'One-time payment for',
    detailSpotApplied: 'Spot \u22122% applied',
    detailBuyerProt: 'Buyer Protection', detailMoneyBack: 'Money-back guarantee',
    detailSslCheckout: 'SSL/TLS encrypted checkout',
    detailInsuredTracked: 'Insured & tracked delivery (Dubai Express + Swiss Post)',
    detailReturnPolicy: '14-day money-back return policy',
    detailLbmaAuth: 'LBMA authenticity guaranteed',
    detailPriceLocked: 'Price locked for 15 minutes',
    detailFinNoFee: 'Financing: no penalties for early repayment',
    detailBasedOn: 'Based on', detailFromVerified: 'from verified buyers',
    detailVerifiedPurchase: 'Verified Purchase',
    detailPersonalAdvisor: 'Your personal advisor \u00b7 Online',
    detailView: 'View',
    // Financing page
    finHeroSub: 'Buy your gold bar now and pay over time. Quick financing up to EUR 10,000 — no extra documents. Extended KYC for amounts up to EUR 180,000. Credit decision in minutes, gold ships the same day.',
    finLicensedPartners: 'Licensed credit partners', finDecision2min: 'Decision in 2 min',
    finShipsSameDay: 'Ships same day',
    finStep1: 'Choose your bar', finStep1Sub: 'Select any bar from 1g to 5kg and pick "Financing" at checkout.',
    finStep2: 'Quick credit check', finStep2Sub: 'Licensed partner runs a soft check \u2014 instant decision, no score impact.',
    finStep3: 'Gold ships today', finStep3Sub: 'Once approved, your bar ships the same day. You own it immediately.',
    finStep4: 'Pay in installments', finStep4Sub: 'gold4you sends you monthly invoices. Pay via bank transfer or card.',
    finDiscTitle: 'How financing works with gold4you',
    finDiscP1: 'gold4you does not issue credit directly. All financing is provided by licensed, regulated third-party credit institutions. When you apply, your request is forwarded to the relevant credit partner (e.g. Byjuno or Powerpay in Switzerland, Klarna in the EU). They perform a credit assessment, set the terms, and manage the loan.',
    finDiscP2: 'gold4you acts as the merchant \u2014 we sell you the gold, ship it immediately upon approval, and your credit partner invoices you monthly. Your data is shared only with the financing partner processing your application.',
    finBar: 'Bar', finPrice: 'Price', finTerm: 'Term', finApr: 'APR', finMonthly: 'Monthly',
    finPricesLive: 'Prices based on live spot. Updated every 15 min.',
    finZeroDown: 'Usually fully financed', finZeroDownSub: 'In most cases, no down payment is required. Depending on the amount and credit partner, a minimum deposit of 1 installment may apply.',
    finOwnImmediate: 'You own it immediately', finOwnImmediateSub: "Your gold ships the same day upon approval. It's yours from day one.",
    finTransparent: 'Transparent terms', finTransparentSub: 'Fixed APR set by the credit partner. No penalties for early repayment.',
    finFaqOwn: 'Do I own the gold immediately?', finFaqOwnA: 'Yes. Your gold bar ships the same day after approval. You own it from the moment it arrives.',
    finFaqMiss: 'What happens if I miss a payment?', finFaqMissA: 'gold4you contacts you directly. You keep the gold. Standard collection processes apply.',
    finFaqEarly: 'Can I repay early?', finFaqEarlyA: 'Yes. No penalties for early repayment. You can pay off the remaining balance at any time.',
    finFaqDeposit: 'Is there a deposit?', finFaqDepositA: 'In most cases, no. The full bar value is usually financed. Depending on the amount and credit partner, a minimum deposit of 1 installment may apply.',
    finFaqSpeed: 'How fast is the decision?', finFaqSpeedA: 'Most decisions are instant (under 2 minutes). In rare cases, manual review takes up to 24 hours.',
    finReadyApply: 'Ready to apply?', finReadyApplySub: 'No account needed. Apply as a guest or log in.',
    finApplyBtn: 'Apply for financing',
    finLegal: 'gold4you AG is not a financial institution and does not provide credit. All financing is offered by licensed third-party credit partners (MF Group AG). Quick financing up to EUR 10,000 without additional documents. Extended financing up to EUR 180,000 with KYC verification. Depending on the amount and credit partner, a minimum down payment of 1 installment may apply. 0% interest applies when installments are paid on schedule. Purchases financed at 0% are excluded from the return policy. By applying, you consent to your data being shared with the credit partner.',
    finApplyTitle: 'Apply for financing', finApplySub: 'Fill in your details to get approved. No account required.',
    finContact: 'Contact',
    finAmlNote: 'Required by Swiss AML regulations.',
    finFileTypes: 'JPG, PNG or PDF \u2014 max 10 MB',
    finSecTls: 'TLS 1.3 encrypted', finSecGdpr: 'GDPR compliant',
    finSecData: 'Data shared only with credit partner', finSecDelete: 'Delete your data anytime',
    finSubmittedTitle: 'Financing Request Submitted',
    finSubmittedSub: 'We have successfully received your financing application.',
    finReqNo: 'Request No.', finStatusLabel: 'Status', finUnderReview: 'Under review',
    finWhatsNow: 'What happens now?',
    finWhatsNowSub: 'Your application has been forwarded to our licensed credit partner for review. Most decisions are delivered within 2 minutes. You will receive the result and your personalized financing terms via email.',
    finNextSteps: 'Next steps',
    finAssessment: 'Credit assessment', finAssessmentSub: 'Our partner reviews your application (usually instant).',
    finDecisionEmail: 'Decision via email', finDecisionEmailSub: 'You receive approval with your final terms and monthly plan.',
    finChooseGold: 'Choose your gold', finChooseGoldSub: 'Browse our shop and add your desired bar to the cart.',
    finCheckoutFin: 'Checkout with financing', finCheckoutFinSub: 'Select "Financing" at checkout. Your pre-approved terms apply automatically.',
    finEmailSent: 'A confirmation has been sent to the email address you provided. Check your spam folder if you don\'t see it.',
    finBrowseBars: 'Browse Gold Bars', finBackHome: 'Back to Home',
    // About page
    aboutSince: 'Since 2019 \u00b7 Z\u00fcrich', aboutTitle: 'About gold4you',
    aboutSub: 'Swiss precious metals dealer. LBMA certified gold bars at spot \u22122%, insured delivery to 38 countries, and flexible financing managed entirely by us.',
    aboutBarsSold: 'Bars Sold', aboutSince2019: 'since 2019',
    aboutRating: 'Customer Rating', aboutVerifiedReviews: '847 verified reviews',
    aboutCountries: 'Countries', aboutShippedTo: 'shipped to',
    aboutAllPrices: 'All Prices', aboutBelowMarket: 'below market',
    aboutDifferent: 'What makes us different',
    aboutSpotTitle: 'Spot \u22122% Pricing', aboutSpotSub: 'Every bar priced 2% below spot. No hidden fees, no inflated spreads.',
    aboutFinTitle: 'White-Label Financing', aboutFinSub: 'All invoicing and installments managed directly by gold4you \u2014 no third-party redirect.',
    aboutSourcingTitle: 'Dubai LBMA Refineries', aboutSourcingSub: 'All bars refined in Dubai by LBMA-accredited refineries. Assay certified, fully traceable, conflict-free gold.',
    aboutHowWorks: 'How gold4you works',
    aboutBrowse: 'Browse & select', aboutBrowseSub: '1g to 5kg bars, all at spot \u22122%.',
    aboutCheckout: 'Checkout', aboutCheckoutSub: 'Card, bank, crypto, or financing.',
    aboutSameDay: 'Same-day shipping', aboutSameDaySub: 'Express from Dubai, insured delivery, signature required.',
    aboutYours: "It's yours", aboutYoursSub: 'You own from day one.',
    aboutPartners: 'Our refinery partners (Dubai)',
    aboutLocations: 'Our locations',
    aboutHQ: 'Headquarters', aboutRefPartner: 'Refinery Partners',
    aboutRegNo: 'Reg. No.', aboutHours: 'Hours',
    aboutTeam: 'Our team',
    aboutGetInTouch: 'Get in touch',
    aboutCompliance: 'Compliance & regulation',
    aboutComplianceText: 'gold4you AG is registered with the VQF (SRO) as a financial intermediary under Swiss AML legislation. We are supervised by FINMA. All transactions above CHF 15,000 require identity verification. VAT exempt under Art. 107 para. 2 MWSTV for investment gold.',
    aboutConflictFree: 'Conflict-free \u00b7 Fully traceable \u00b7 999.9',
    aboutQuote1: 'Gold is not what you see \u2014', aboutQuote2: 'it is the certainty you feel', aboutQuote3: 'when you hold real value.',
    // Homepage
    homeReviewsCount: '847 reviews', homeBarsSold: '14,200+ bars sold', homeCountries: '38 countries',
    homeGoldShipsNote: 'Gold ships immediately. Pay in monthly installments \u2014 gold4you sends you 1\u20132 invoices at a time. No redirect.',
    homeFromPrice: 'From', homePerMonth: 'per month', homeTerms: 'terms', homeFromApr: 'from APR', homeSameDay: 'Same day',
    homeFinExamples: 'Financing examples',
    homeAprNote: '0% APR financing (6\u201348 months). Final terms depend on credit assessment. Invoicing managed by gold4you AG via MF Group AG.',
    homeCreditVia: 'Credit assessment via local partner. All invoicing by gold4you AG. Contact us for other European countries.',
    homeRequirements: 'Requirements',
    homeReqAge: 'Minimum age 18', homeReqAgeSub: 'Applicant must be of legal age and a resident in a supported country.',
    homeReqIncome: 'Proof of income', homeReqIncomeSub: 'Employed, self-employed, or retired with documented income.',
    homeReqId: 'Valid government ID', homeReqIdSub: 'Passport, national ID card, or driving license.',
    homeReqBank: 'Bank account (SEPA)', homeReqBankSub: 'Active SEPA-capable account for monthly installments.',
    homeQuestions: 'Questions about products, pricing, financing, or delivery? Chat with your personal advisor \u2014 instant replies, no waiting.',
    homeStartChat: 'Start a conversation',
    homePersonalAdvisor: 'Personal advisor \u00b7 Online',
    // Shop
    shopGoldSpot: 'Gold Spot', shopLoading: 'Loading...', shopOffline: 'Offline',
    shopOurPrice: 'Our price: \u22122%', shopViewDetails: 'View Details',
    // KYC modal
    kycTitle: 'Identity Verification', kycSubtitle: 'KYC Verification Required',
    kycSub: 'Orders above 5 kg or custom requests require identity verification per Swiss AML regulations.',
    kycResAddress: 'Residential Address', kycIdDocType: 'ID Document Type',
    kycIdDocNumber: 'ID Document Number', kycUploadId: 'Upload ID (front & back)',
    kycDragDrop: 'Drag & drop or click to upload', kycFileTypes: 'JPG, PNG or PDF \u00b7 max 10 MB',
    kycSubmit: 'Submit & Continue to Checkout',
    kycDataNote: 'Your data is processed in accordance with Swiss data protection law (nDSG) and EU GDPR. We share verification data only with our compliance partner.',
    // Chat
    chatPricing: 'Pricing', chatFinancing: 'Financing', chatDelivery: 'Delivery',
    chatKyc: 'KYC / Verification', chatContact: 'Contact',
    chatPlaceholder: 'Ask anything about gold4you...',
    chatReplies: 'gold4you \u00b7 Replies instantly',
    chatFinmaNote: 'gold4you AG \u00b7 Bahnhofstrasse 21, Z\u00fcrich \u00b7 FINMA registered',
    // Imprint page
    impTitle: 'Imprint',
    impAddress: 'Address',
    impCommReg: 'Commercial Register',
    impContact: 'Contact',
    impAuthRep: 'Authorized Representative',
    impSupervision: 'Supervision & Regulation',
    impSupervisionText: '{t.impSupervisionText}',
    impVatExempt: '{t.impVatExempt}',
    impFinPartners: 'Financing Partners',
    impFinPartnersText: 'All financing is provided by licensed third-party credit institutions. gold4you AG does not issue credit directly.',
    impFinMfGroup: 'MF Group AG (credit management & invoicing)',
    impFinByjuno: 'Byjuno AG (BNPL, Switzerland)',
    impFinPowerpay: 'Powerpay (installment payments, Switzerland)',
    impFinKlarna: 'Klarna Bank AB (EU markets)',
    impRefineries: 'Refinery Locations',
    impRefineriesText: 'All gold bars are refined in Dubai, UAE, by LBMA-accredited refineries:',
    impDisclaimer: 'Disclaimer',
    impDisclaimerText: '{t.impDisclaimerText}',
    impExtLinks: '{t.impExtLinks}',
    impDispute: 'Dispute Resolution',
    impDisputeText: '{t.impDisputeText}',
    // Privacy page
    privTitle: 'Privacy Policy',
    privLastUpdated: 'Last updated: March 2026',
    privController: '1. Data Controller',
    privControllerLaw: '{t.privControllerLaw}',
    privDataCollect: '2. Data We Collect',
    privDataPersonal: 'Personal data: name, email, phone, date of birth, nationality, address',
    privDataKyc: 'Identity verification (KYC): ID document type, number, and copy (required by Swiss AML law for orders above CHF 15,000)',
    privDataFinancial: 'Financial data: employment status, income range (for financing applications only)',
    privDataOrder: 'Order data: products, quantities, payment method, shipping address',
    privDataTech: 'Technical data: IP address, browser type, device information, cookies',
    privPurpose: '3. Purpose of Processing',
    privPurposeOrder: 'Order processing and fulfillment',
    privPurposeKyc: 'Identity verification per Swiss AML/KYC regulations',
    privPurposeFin: 'Financing application processing (data shared with credit partner MF Group AG, Byjuno, Powerpay, or Klarna)',
    privPurposeComm: 'Customer communication and support',
    privPurposeLegal: 'Legal compliance (FINMA, VQF, tax obligations)',
    privPurposeAnalytics: 'Website analytics and performance optimization',
    privSharing: '4. Data Sharing',
    privSharingIntro: 'We share your data only with:',
    privSharingCredit: 'Credit partners (MF Group AG, Byjuno, Powerpay, Klarna) -- only when you apply for financing',
    privSharingShip: 'Shipping providers (DHL Express, Swiss Post) -- for delivery',
    privSharingPay: 'Payment processors -- for secure payment handling (PCI DSS Level 1 compliant)',
    privSharingReg: 'Regulatory authorities -- when legally required (FINMA, VQF)',
    privNoSell: 'We do not sell, rent, or trade your personal data to third parties for marketing purposes.',
    privSecurity: '5. Data Security',
    privSecurityText: '{t.privSecurityText}',
    privRetention: '6. Data Retention',
    privRetOrder: 'Order data: 10 years (Swiss commercial law obligation)',
    privRetKyc: 'KYC documents: 10 years after end of business relationship (AML requirement)',
    privRetFin: 'Financing data: retained by credit partner per their policies',
    privRetMarketing: 'Marketing data: until consent is withdrawn',
    privRetAnalytics: 'Analytics data: 26 months',
    privRights: '7. Your Rights',
    privRightsIntro: 'Under nDSG and GDPR you have the right to:',
    privRightsAccess: 'Access your personal data',
    privRightsRect: 'Rectify inaccurate data',
    privRightsDelete: 'Request deletion of your data (subject to legal retention obligations)',
    privRightsRestrict: 'Restrict or object to processing',
    privRightsPort: 'Data portability',
    privRightsWithdraw: 'Withdraw consent at any time',
    privCookies: '8. Cookies',
    privCookiesText: '{t.privCookiesText}',
    // Terms page
    termsTitle: 'Terms & Conditions',
    termsLastUpdated: 'Last updated: March 2026',
    termsScope: '1. Scope',
    termsScopeText: '{t.termsScopeText}',
    termsContract: '2. Contract Formation',
    termsContractP1: '{t.termsContractP1}',
    termsContractP2: '{t.termsContractP2}',
    termsPrices: '3. Prices & Payment',
    termsPriceEur: 'All prices are in EUR and include insured delivery',
    termsPriceVat: 'Investment gold is VAT exempt (Art. 107 para. 2 MWSTV)',
    termsPriceFormula: 'Pricing formula: grams x (spot price per troy ounce / 31.1035) x 0.98 (Spot -2%)',
    termsPriceMethods: 'Accepted payment methods: Credit/Debit Card (Visa, Mastercard, AMEX), Bank Transfer (SEPA/IBAN), Cryptocurrency (BTC, ETH, USDT), Financing',
    termsPrice3d: 'Card payments are secured with 3D Secure 2.0 authentication',
    termsFin: '4. Financing',
    termsFinIntro: 'gold4you AG is not a financial institution and does not issue credit. All financing is provided by licensed third-party credit partners:',
    termsFinTiers: 'Financing tiers:',
    termsFinQuick: 'Quick financing: up to EUR 10,000 -- no additional documents required, instant decision',
    termsFinExtended: 'Extended financing: EUR 10,000 to EUR 180,000 -- extended KYC verification required',
    termsFinAbove: 'Above EUR 180,000 -- direct purchase only (no financing available)',
    termsFinTermsLabel: 'Terms:',
    termsFinZero: '0% interest (APR 0.00%) -- provided installments are paid on schedule',
    termsFinPeriods: 'Installment periods: 6, 12, 18, 24, 36, or 48 months',
    termsFinNoPenalty: 'No penalties for early repayment',
    termsFinDeposit: 'Depending on the financing amount and credit partner, a minimum down payment of 1 installment may apply',
    termsFinLate: 'Late payments may incur reminder fees and additional costs per the credit partner terms',
    termsReturn: '5. Return Policy for Financed Purchases',
    termsReturnP1: '{t.termsReturnP1}',
    termsReturnP2: '{t.termsReturnP2}',
    termsDelivery: '6. Delivery',
    termsDeliveryLink: 'See our Shipping page for detailed delivery information by country.',
    termsDeliveryDubai: 'All bars ship from Dubai via express courier (1-3 business days to Switzerland)',
    termsDeliveryLocal: 'Final delivery via Swiss Post / local carrier (1-2 business days)',
    termsDeliveryInsured: 'Fully insured during transit',
    termsDeliverySig: 'Signature required upon delivery',
    termsDeliveryDepot: 'If recipient is not home, the package is held at the nearest carrier depot for ID-verified pickup',
    termsOwnership: '7. Retention of Title',
    termsOwnershipText: '{t.termsOwnershipText}',
    termsKyc: '8. Identity Verification (KYC)',
    termsKycText: '{t.termsKycText}',
    termsWarranty: '9. Warranty',
    termsWarrantyText: '{t.termsWarrantyText}',
    termsJurisdiction: '10. Applicable Law & Jurisdiction',
    termsJurisdictionText: '{t.termsJurisdictionText}',
    // Shipping page
    shipTitle: 'Shipping',
    shipSub: 'Detailed shipping information for all supported countries. All gold bars are sourced from LBMA-accredited refineries in Dubai, UAE.',
    shipOverview: 'Shipping route overview',
    shipStep1: 'Step 1', shipStep1Title: 'Dubai (Refinery)',
    shipStep1Desc: 'Bar is verified, sealed with assay certificate, and handed to DHL Express.',
    shipStep2: 'Step 2', shipStep2Title: 'Express to Switzerland',
    shipStep2Desc: 'DHL Express air freight: Dubai to Zurich. 1-3 business days. Fully insured, tracked end-to-end.',
    shipStep3: 'Step 3', shipStep3Title: 'Last-mile delivery',
    shipStep3Desc: 'Swiss Post (CH) or local carrier (EU). 1-2 business days. Signature required at door.',
    shipInsurance: 'Full insurance',
    shipInsuranceText: '{t.shipInsuranceText}',
    shipSignature: 'Signature required',
    shipSignatureText: '{t.shipSignatureText}',
    shipNotHome: 'If you are not home',
    shipNotHomeText: 'If you are not available at the time of delivery, the gold bar is not left with a neighbor or in a mailbox. Instead, it is held at the nearest carrier depot (Swiss Post branch or DHL service point). You will receive a notification with the pickup location. A valid government-issued ID is required for collection.',
    shipDiscreet: 'Discreet packaging',
    shipDiscreetText: '{t.shipDiscreetText}',
    shipByCountry: 'Delivery times by country',
    shipByCountrySub: 'Total delivery time = Dubai Express (1-3 days) + local last-mile delivery. All times in business days.',
    shipColCountry: 'Country', shipColExpress: 'Dubai Express', shipColLastMile: 'Last-mile', shipColTotal: 'Total', shipColCarrier: 'Carrier',
    shipDays: 'days',
    shipCustoms: 'Customs, duties & VAT',
    shipCustomsCH: 'Switzerland & Liechtenstein: Investment gold (bars of 999.9 purity) is exempt from VAT and import duties. No customs charges apply.',
    shipCustomsEU: 'EU countries: Investment gold is VAT exempt under EU Directive 98/80/EC. No import duties apply for gold bars of investment quality (999.9 purity, LBMA certified). Customs clearance is handled by DHL Express -- you do not need to take any action.',
    shipCustomsUK: 'United Kingdom: Investment gold is VAT exempt under VAT Act 1994, Schedule 9, Group 15. No import duties apply. Customs clearance is handled by DHL Express.',
    shipCustomsNO: 'Norway: Investment gold is exempt from Norwegian VAT (merverdiavgift). Customs clearance handled by DHL Express.',
    shipTracking: 'Tracking & support',
    shipTrackingP1: '{t.shipTrackingP1}',
    shipTrackingP2: 'If you have questions about your delivery, contact us at:',
    shipNotes: 'Important notes',
    shipNote1: 'Delivery times are estimates and may vary due to customs processing or carrier delays.',
    shipNote2: 'gold4you ships Monday to Friday. Orders placed on weekends or public holidays are processed the next business day.',
    shipNote3: 'P.O. boxes are not accepted as delivery addresses.',
    shipNote4: 'For orders above CHF/EUR 15,000, identity verification (KYC) must be completed before shipment.',
    shipNote5: 'Delivery to countries not listed above is available on request. Contact us at shipping@gold4you.ch.',
    shipNote6: 'Shipping costs are included in the product price. No additional shipping fees.',
    // About page hardcoded
    aboutSpotCta: 'Spot -2% -- LBMA Certified',
    aboutByAppt: 'By appointment only',
    aboutMonFri: 'Mon-Fri 09:00-18:00',
    aboutDmcc: 'Dubai Multi Commodities Centre, Dubai, UAE',
    // Admin page
    adminTitle: 'Admin Dashboard',
    adminInternal: 'gold4you AG -- Internal',
    adminTotalOrders: 'Total Orders',
    adminRevenue: 'Revenue',
    adminPendingKyc: 'Pending KYC',
    adminPendingFin: 'Pending Finance',
    adminRecentOrders: 'Recent Orders',
    adminNoOrders: 'No orders yet. Place a test order to see it here.',
    adminPending: 'Pending', adminProcessing: 'Processing', adminShipped: 'Shipped', adminDelivered: 'Delivered',
    adminApprove: 'Approve', adminReject: 'Reject',
    adminNoKyc: 'No KYC submissions yet.',
    adminNoFin: 'No financing applications yet.',
    // Financing page hardcoded
    finMonthsRange: '6-48 months -- up to EUR 180,000',
    // Checkout hardcoded
    coIncomeUnder3k: 'Under \u20ac3,000',
    coIncome3to5k: '\u20ac3,000 - \u20ac5,000',
    coIncome5to10k: '\u20ac5,000 - \u20ac10,000',
    coIncomeOver10k: 'Over \u20ac10,000',
    // Misc
    redirecting: 'Redirecting...',
    // Financing terms section
    finTermsTitle: 'Terms & Conditions',
    finQuickProcess: 'Quick & simple process',
    finQuickProcessText: '{t.finQuickProcessText}',
    finPayTerms: 'Payment terms & conditions',
    finPayTermsP1: '{t.finPayTermsP1}',
    finPayTermsP2: '{t.finPayTermsP2}',
    finZeroConditions: '0% financing conditions',
    finCondDuration: 'Duration', finCondDurationVal: '6 months, fixed',
    finCondInterest: 'Interest', finCondInterestVal: '0% -- none',
    finCondInstallments: 'Installments', finCondInstallmentsVal: '6, 12, 18, 24, 36, or 48',
    finCondMinAmount: 'Minimum amount', finCondMinAmountVal: 'None',
    finCondFees: 'Fees', finCondFeesVal: 'No fees',
    finCondFirstPay: 'First payment', finCondFirstPayVal: '30 days after invoice',
    finZeroCondText: '{t.finZeroCondText}',
    finReturnPolicy: 'Return policy for financed purchases',
    finReturnPolicyText: '{t.finReturnPolicyText}',
    finFlexTerms: 'Flexible terms',
    finFlexTermsText: '{t.finFlexTermsText}',
    // Used in credit note on checkout financing
    finUsedForCredit: 'Used for credit assessment. Not stored by gold4you.',
    // Home page misc
    homeSale: 'Sale',
    homeVerified: 'Verified',
    homeFinFaq: 'Financing FAQ',
    homeYourOrder: 'Your order:',
  },
  de: {
    allBars: 'Alle Barren', investment: 'Investment', premium: 'Premium', about: 'Über uns', profile: 'Profil',
    shopNow: 'Jetzt kaufen', aboutUs: 'Über uns', viewDetails: 'Details →', backTo: 'Zurück zu',
    backToShop: 'Zurück zum Shop', addToCart: 'In den Warenkorb', bars: 'Barren', bar: 'Barren',
    weight: 'Gewicht', payWith: 'Bezahlen mit', financing: 'Finanzierung', financeAvail: 'Finanzierung verfügbar',
    buyNow: 'Gold jetzt kaufen.', payOver: 'In 3 bis 24 Monaten bezahlen.', goldShips: 'Gold wird sofort versendet',
    yourBar: 'Dein Goldbarren ab', perMonth: '/Monat', months: 'Monate',
    chooseBar: 'Barren wählen', howItWorks: 'So funktioniert\'s', requirements: 'Voraussetzungen',
    financingFaq: 'Finanzierungs-FAQ', availCountries: 'In 12 Ländern verfügbar',
    customerReviews: 'Kundenbewertungen', verifiedBuyers: 'Verifizierte Käufer', verified: 'Verifiziert',
    reviews: 'Bewertungen', recognizedBy: 'Bekannt aus', contact: 'Kontakt', getInTouch: 'Kontaktieren Sie uns',
    refinery: 'Raffinerie', office: 'Büro', reachUs: 'Erreichen Sie uns', whatsapp: 'WhatsApp',
    imprint: 'Impressum', privacy: 'Datenschutz', terms: 'AGB', shipping: 'Versand',
    trustBadgeLbma: 'LBMA Zertifiziert', trustBadgeDelivery: 'Versicherter Versand', trustBadgeVat: 'MwSt.-frei',
    trustBadgeFinance: '0% Finanzierung', trustBadgeLock: 'Preis 15 Min fixiert',
    heroTitle1: 'Goldbarren ab', heroTitle2: 'Finanzierung ab', heroSub: 'LBMA-zertifizierte Goldbarren aus lizenzierten Dubai-Raffinerien. MwSt.-frei, versicherter Versand, Finanzierung verfügbar.',
    heroBadge: 'Vertrauenswürdiger Schweizer Goldhändler',
    catalogSub: 'LBMA Zertifiziert', catalogTitle: 'Goldbarren günstig online kaufen',
    financingProfile: 'Finanzierungsprofil', financingProfileSub: 'Vervollständigen Sie Ihr Profil für die Goldfinanzierung. Genehmigung in Minuten.',
    financingNotSetUp: 'Finanzierung noch nicht eingerichtet', financingNotSetUpSub: 'Füllen Sie das Formular aus für eine Vorab-Genehmigung.',
    personalInfo: 'Persönliche Daten', firstName: 'Vorname', lastName: 'Nachname',
    email: 'E-Mail', phone: 'Telefon', dob: 'Geburtsdatum', nationality: 'Nationalität',
    address: 'Liefer- & Rechnungsadresse', street: 'Strasse & Nummer', postalCode: 'PLZ',
    city: 'Stadt', country: 'Land', selectCountry: 'Land auswählen',
    idVerification: 'ID-Verifizierung (KYC)', docType: 'Dokumenttyp', docNumber: 'Dokumentnummer',
    uploadId: 'Ausweis hochladen (Vorderseite)', dragDrop: 'Hierher ziehen oder klicken',
    employment: 'Beschäftigung & Einkommen', empStatus: 'Beschäftigungsstatus', monthlyIncome: 'Monatliches Nettoeinkommen',
    submitApplication: 'Finanzierungsantrag einreichen', submitDisclaimer: 'Mit dem Absenden stimmen Sie unseren AGB und Datenschutzrichtlinien zu.',
    security: 'Sicherheit', needHelp: 'Brauchen Sie Hilfe?', needHelpSub: 'Unser Team hilft Ihnen gerne bei der Finanzierung.',
    selectDoc: 'Dokument wählen', selectStatus: 'Status wählen', selectRange: 'Bereich wählen',
    passport: 'Reisepass', nationalId: 'Personalausweis', driversLicense: 'Führerschein',
    employed: 'Angestellt', selfEmployed: 'Selbstständig', retired: 'Rentner', student: 'Student', other: 'Sonstiges',
    footerShop: 'Shop', footerFinancing: 'Finanzierung', footerToken: 'G4Y Token', footerContact: 'Kontakt',
    footerAbout: 'Über uns', footerFaq: 'FAQ', footerReviews: 'Bewertungen',
    footerDesc: 'Schweizer Goldhändler mit LBMA-zertifizierten Barren zu den niedrigsten Aufschlägen. Versicherter Versand in 38 Länder.',
    welcomeTitle: 'Willkommen bei gold4you', welcomeSub: 'Wählen Sie Ihr Land und Ihre Sprache.',
    continueBtn: 'Weiter', relatedBars: 'Ähnliche Barren', youMayLike: 'Das könnte Sie interessieren',
    selectCrypto: 'Kryptowährung wählen', g4yToken: 'gold4you Token',
    financingExamples: 'Finanzierungsbeispiele', buyNowPay: 'Jetzt kaufen, in Raten zahlen',
    monthly: 'Monatlich', interest: 'Zinsen', total: 'Gesamt', monthlyPayment: 'Monatliche Rate',
    barPrice: 'Barrenpreis', earlyRepay: 'Vorzeitige Rückzahlung möglich — keine Gebühren',
    noDownPayment: 'Keine Anzahlung erforderlich', shipped: 'Gold wird sofort nach Genehmigung versendet',
    insured: 'Voll versichert · Preis 15 Minuten fixiert',
    philosophy: 'Philosophie',
    ctaHeadline: 'Gold kaufen war noch nie so einfach.',
    ctaSub: 'Von 1g bis 5kg. Ratenzahlung ab 3 Monaten.',
    ctaBtn: 'Jetzt entdecken',
    ctaBuild: 'Starten Sie Ihren Gold-Aufbau',
    coShipping: 'Versand & Rechnung', coShippingSub: 'Wohin sollen wir Ihr Gold liefern?',
    coContinuePayment: 'Weiter zur Zahlung',
    coPaymentMethod: 'Zahlungsmethode', coPaymentSub: 'Wie m\u00f6chten Sie bezahlen?',
    coCreditDebit: 'Kredit- / Debitkarte', coCreditDebitSub: 'Visa, Mastercard, AMEX',
    coBankTransfer: 'Bank\u00fcberweisung', coBankTransferSub: 'SEPA / IBAN',
    coCrypto: 'Kryptow\u00e4hrung', coCryptoSub: 'BTC, ETH, USDT',
    coFinancingSub: '3\u201324 Monate, ab 4,9% eff. Jahreszins',
    coCardNumber: 'Kartennummer', coExpiry: 'G\u00fcltig bis', coCvc: 'CVC',
    coAccepted: 'Akzeptiert', co3dSecure: '3D Secure',
    coBankInfo: '\u00dcberweisen Sie nach Bestellung an unser Konto:',
    coBankLabel: 'Bank', coRef: 'Ref', coOrderNumber: 'Ihre Bestellnummer',
    coBankShipNote: 'Gold wird nach Zahlungseingang versendet (1\u20132 Werktage).',
    coCryptoSelect: 'Kryptow\u00e4hrung w\u00e4hlen:',
    coCryptoNote: 'Wallet-Adresse und QR-Code erhalten Sie nach Bestellung.',
    coFinTerm: 'Laufzeit', coMo: 'Mo.',
    coEmpStatusLabel: 'Besch\u00e4ftigungsstatus *', coMonthlyIncomeLabel: 'Monatseinkommen *',
    coSelectDots: 'W\u00e4hlen\u2026',
    coCreditNote: 'Bonit\u00e4tspr\u00fcfung durch lizenzierten Partner. Rechnungsstellung durch gold4you AG.',
    coBack: 'Zur\u00fcck', coReviewOrder: 'Bestellung pr\u00fcfen',
    coReviewTitle: 'Bestellung pr\u00fcfen', coReviewSub: 'Bitte best\u00e4tigen Sie, dass alles korrekt ist.',
    coItems: 'Artikel', coSubtotal: 'Zwischensumme (Spot \u22122%)',
    coShipAddress: 'Lieferadresse', coPayment: 'Zahlung',
    coVatExempt: 'MwSt.-frei (Anlagegold)',
    coInsuredDelivery: 'Versicherter Versand (Dubai Express + Swiss Post)',
    coInsuredDeliverySub: 'Voraussichtlich 2\u20134 Werktage. Unterschrift erforderlich. Vollversichert.',
    co3dRedirect: 'Sie werden zur 3D-Secure-Verifizierung Ihrer Bank weitergeleitet.',
    coPay: 'Bezahlen', coPlaceOrder: 'Bestellen',
    coFinReqSubmitted: 'Finanzierungsantrag eingereicht', coPaySuccess: 'Zahlung erfolgreich',
    coThankYou: 'Vielen Dank f\u00fcr Ihre Bestellung!',
    coOrderNo: 'Bestell-Nr.', coAmount: 'Betrag',
    coCard3d: 'Karte (3D Secure)',
    co3dProcessed: 'Zahlung via 3D Secure verarbeitet',
    co3dProcessedSub: 'Ihre Karte wurde erfolgreich belastet. Ihr Goldbarren wird heute f\u00fcr den Versand vorbereitet.',
    coAwaitTransfer: 'Warten auf \u00dcberweisung',
    coAwaitTransferSub: 'Bitte \u00fcberweisen Sie den Betrag auf das unten genannte Konto. Gold wird nach Zahlungseingang versendet.',
    coReference: 'Referenz',
    coWalletSent: 'Wallet-Details gesendet',
    coWalletSentSub: 'Pr\u00fcfen Sie Ihre E-Mail f\u00fcr Wallet-Adresse und QR-Code. Gold wird nach Best\u00e4tigung on-chain versendet.',
    coFinReview: 'Finanzierungsantrag wird gepr\u00fcft',
    coFinReviewSub: 'Ihr Antrag wurde an unseren Kreditpartner weitergeleitet. Sie erhalten innerhalb weniger Minuten eine Entscheidung per E-Mail.',
    coWhatsNext: 'N\u00e4chste Schritte',
    coCreditCheckStep: 'Bonit\u00e4tspr\u00fcfung', coCreditCheckStepSub: 'Unser Partner pr\u00fcft Ihren Antrag (meist unter 2 Minuten).',
    coApprovalStep: 'Genehmigung & Konditionen', coApprovalStepSub: 'Sie erhalten die Konditionen und den Ratenplan per E-Mail.',
    coGoldShipsStep: 'Gold wird heute versendet', coGoldShipsStepSub: 'Nach Genehmigung wird Ihr Barren sofort verpackt und versendet.',
    coMonthlyInvStep: 'Monatliche Rechnung', coMonthlyInvStepSub: 'Sie erhalten monatliche Rechnungen vom Kreditpartner.',
    coConfirmEmail: 'Best\u00e4tigungs-E-Mail', coConfirmEmailSub: 'Eine Best\u00e4tigung mit Ihren Bestelldetails ist unterwegs.',
    coQualityCheck: 'Qualit\u00e4tspr\u00fcfung', coQualityCheckSub: 'Ihr Goldbarren wird gepr\u00fcft und sicher verpackt.',
    coInsuredShipStep: 'Versicherter Versand', coInsuredShipStepSub: 'Versand via Swiss Post mit voller Versicherung.',
    coDeliveryStep: 'Zustellung', coDeliveryStepSub: 'Unterschrift erforderlich. Tracking per E-Mail.',
    co3dNote: 'Zahlung gesichert mit 3D Secure 2.0. PCI DSS Level 1 konform.',
    coContinueShopping: 'Weiter einkaufen',
    cartTitle: 'Warenkorb', cartEmpty: 'Ihr Warenkorb ist leer',
    cartSubtotal: 'Zwischensumme', cartVatNote: 'MwSt.-frei (Anlagegold)',
    cartKycNote: 'Bestellungen \u00fcber 5 kg erfordern eine Identit\u00e4tspr\u00fcfung (KYC)',
    cartCompleteKyc: 'KYC abschlie\u00dfen', cartCheckout: 'Zur Kasse', cartContinue: 'Weiter einkaufen',
    detailPurity: 'Reinheit', detailPurityVal: '999,9 Feingold (24K)',
    detailCert: 'Zertifizierung', detailCertVal: 'LBMA Good Delivery (Assay Certificate)',
    detailMfr: 'Hersteller', detailDimensions: 'Abmessungen',
    detailVat: 'MwSt.', detailVatVal: 'Befreit (Anlagegold)',
    detailLive: 'LIVE', detailSpot: 'Spot \u22122%',
    detailMonthlyPay: 'Monatliche Raten',
    detailDownPayment: 'Anzahlung',
    detailOneTime: 'Einmalzahlung f\u00fcr',
    detailSpotApplied: 'Spot \u22122% angewendet',
    detailBuyerProt: 'K\u00e4uferschutz', detailMoneyBack: 'Geld-zur\u00fcck-Garantie',
    detailSslCheckout: 'SSL/TLS verschl\u00fcsselter Checkout',
    detailInsuredTracked: 'Versicherter & verfolgter Versand (Dubai Express + Swiss Post)',
    detailReturnPolicy: '14-Tage-R\u00fcckgaberecht',
    detailLbmaAuth: 'LBMA-Echtheit garantiert',
    detailPriceLocked: 'Preis f\u00fcr 15 Minuten fixiert',
    detailFinNoFee: 'Finanzierung: keine Geb\u00fchren bei vorzeitiger R\u00fcckzahlung',
    detailBasedOn: 'Basierend auf', detailFromVerified: 'von verifizierten K\u00e4ufern',
    detailVerifiedPurchase: 'Verifizierter Kauf',
    detailPersonalAdvisor: 'Ihr pers\u00f6nlicher Berater \u00b7 Online',
    detailView: 'Ansehen',
    finHeroSub: 'Kaufen Sie jetzt Ihren Goldbarren und zahlen Sie in Raten. Schnelle Finanzierung bis EUR 10.000 — ohne Zusatzdokumente. Erweiterte KYC-Prüfung für Beträge bis EUR 180.000.',
    finLicensedPartners: 'Lizenzierte Kreditpartner', finDecision2min: 'Entscheidung in 2 Min.',
    finShipsSameDay: 'Versand am selben Tag',
    finStep1: 'Barren w\u00e4hlen', finStep1Sub: 'W\u00e4hlen Sie einen Barren von 1g bis 5kg und "Finanzierung" an der Kasse.',
    finStep2: 'Schnelle Bonit\u00e4tspr\u00fcfung', finStep2Sub: 'Lizenzierter Partner f\u00fchrt eine Soft-Pr\u00fcfung durch \u2014 sofortige Entscheidung.',
    finStep3: 'Gold wird heute versendet', finStep3Sub: 'Nach Genehmigung wird Ihr Barren am selben Tag versendet.',
    finStep4: 'In Raten zahlen', finStep4Sub: 'gold4you sendet Ihnen monatliche Rechnungen. Zahlung per \u00dcberweisung oder Karte.',
    finDiscTitle: 'So funktioniert die Finanzierung bei gold4you',
    finDiscP1: 'gold4you vergibt keine Kredite direkt. Alle Finanzierungen werden von lizenzierten Drittanbietern in Ihrem Land bereitgestellt. Bei Antrag wird Ihre Anfrage an den jeweiligen Kreditpartner weitergeleitet (z.B. Byjuno oder Powerpay in der Schweiz, Klarna in der EU).',
    finDiscP2: 'gold4you handelt als H\u00e4ndler \u2014 wir verkaufen Ihnen das Gold, versenden es sofort nach Genehmigung, und Ihr Kreditpartner stellt Ihnen monatlich Rechnung.',
    finBar: 'Barren', finPrice: 'Preis', finTerm: 'Laufzeit', finApr: 'Zinssatz', finMonthly: 'Monatlich',
    finPricesLive: 'Preise basierend auf Live-Spot. Aktualisierung alle 15 Min.',
    finZeroDown: 'I.d.R. voll finanziert', finZeroDownSub: 'In den meisten Fällen ist keine Anzahlung erforderlich. Je nach Betrag und Finanzierungspartner kann eine Mindestanzahlung von 1 Rate anfallen.',
    finOwnImmediate: 'Sofort in Ihrem Besitz', finOwnImmediateSub: 'Ihr Gold wird am selben Tag versendet. Es geh\u00f6rt Ihnen ab dem ersten Tag.',
    finTransparent: 'Transparente Konditionen', finTransparentSub: 'Fester Zinssatz vom Kreditpartner. Keine Geb\u00fchren bei vorzeitiger R\u00fcckzahlung.',
    finFaqOwn: 'Geh\u00f6rt mir das Gold sofort?', finFaqOwnA: 'Ja. Ihr Goldbarren wird am selben Tag nach Genehmigung versendet. Er geh\u00f6rt Ihnen ab Erhalt.',
    finFaqMiss: 'Was passiert bei vers\u00e4umter Zahlung?', finFaqMissA: 'gold4you kontaktiert Sie direkt. Sie behalten das Gold. Standardm\u00e4\u00dfige Mahnverfahren gelten.',
    finFaqEarly: 'Kann ich vorzeitig zur\u00fcckzahlen?', finFaqEarlyA: 'Ja. Keine Geb\u00fchren bei vorzeitiger R\u00fcckzahlung. Sie k\u00f6nnen jederzeit den Restbetrag begleichen.',
    finFaqDeposit: 'Gibt es eine Anzahlung?', finFaqDepositA: 'In den meisten Fällen nein. Der volle Barrenwert wird in der Regel finanziert. Je nach Betrag und Kreditpartner kann eine Mindestanzahlung von 1 Rate anfallen.',
    finFaqSpeed: 'Wie schnell ist die Entscheidung?', finFaqSpeedA: 'Die meisten Entscheidungen sind sofort (unter 2 Minuten). In seltenen F\u00e4llen dauert die manuelle Pr\u00fcfung bis zu 24 Stunden.',
    finReadyApply: 'Bereit f\u00fcr den Antrag?', finReadyApplySub: 'Kein Konto n\u00f6tig. Beantragen Sie als Gast oder melden Sie sich an.',
    finApplyBtn: 'Finanzierung beantragen',
    finLegal: 'gold4you AG ist kein Finanzinstitut und vergibt keine Kredite. Alle Finanzierungen werden von lizenzierten Drittanbietern angeboten. Kreditgenehmigung, Zinss\u00e4tze und Konditionen werden ausschlie\u00dflich vom jeweiligen Kreditinstitut festgelegt.',
    finApplyTitle: 'Finanzierung beantragen', finApplySub: 'F\u00fcllen Sie Ihre Daten aus. Kein Konto erforderlich.',
    finContact: 'Kontakt',
    finAmlNote: 'Erforderlich gem\u00e4\u00df Schweizer GwG.',
    finFileTypes: 'JPG, PNG oder PDF \u2014 max. 10 MB',
    finSecTls: 'TLS 1.3 verschl\u00fcsselt', finSecGdpr: 'DSGVO-konform',
    finSecData: 'Daten nur mit Kreditpartner geteilt', finSecDelete: 'Daten jederzeit l\u00f6schbar',
    finSubmittedTitle: 'Finanzierungsantrag eingereicht',
    finSubmittedSub: 'Wir haben Ihren Finanzierungsantrag erfolgreich erhalten.',
    finReqNo: 'Antrags-Nr.', finStatusLabel: 'Status', finUnderReview: 'In Pr\u00fcfung',
    finWhatsNow: 'Was passiert jetzt?',
    finWhatsNowSub: 'Ihr Antrag wurde an unseren lizenzierten Kreditpartner weitergeleitet. Die meisten Entscheidungen werden innerhalb von 2 Minuten getroffen.',
    finNextSteps: 'N\u00e4chste Schritte',
    finAssessment: 'Bonit\u00e4tspr\u00fcfung', finAssessmentSub: 'Unser Partner pr\u00fcft Ihren Antrag (meist sofort).',
    finDecisionEmail: 'Entscheidung per E-Mail', finDecisionEmailSub: 'Sie erhalten die Genehmigung mit Ihren Konditionen per E-Mail.',
    finChooseGold: 'Gold ausw\u00e4hlen', finChooseGoldSub: 'St\u00f6bern Sie in unserem Shop und legen Sie Ihren gew\u00fcnschten Barren in den Warenkorb.',
    finCheckoutFin: 'Mit Finanzierung bezahlen', finCheckoutFinSub: 'W\u00e4hlen Sie "Finanzierung" an der Kasse. Ihre vorab genehmigten Konditionen gelten automatisch.',
    finEmailSent: 'Eine Best\u00e4tigung wurde an Ihre E-Mail-Adresse gesendet. Pr\u00fcfen Sie ggf. den Spam-Ordner.',
    finBrowseBars: 'Goldbarren ansehen', finBackHome: 'Zur Startseite',
    aboutSince: 'Seit 2019 \u00b7 Z\u00fcrich', aboutTitle: '\u00dcber gold4you',
    aboutSub: 'Schweizer Edelmetallh\u00e4ndler. LBMA-zertifizierte Goldbarren zu Spot \u22122%, versicherter Versand in 38 L\u00e4nder.',
    aboutBarsSold: 'Barren verkauft', aboutSince2019: 'seit 2019',
    aboutRating: 'Kundenbewertung', aboutVerifiedReviews: '847 verifizierte Bewertungen',
    aboutCountries: 'L\u00e4nder', aboutShippedTo: 'beliefert',
    aboutAllPrices: 'Alle Preise', aboutBelowMarket: 'unter Markt',
    aboutDifferent: 'Was uns unterscheidet',
    aboutSpotTitle: 'Spot \u22122% Preise', aboutSpotSub: 'Jeder Barren 2% unter Spot. Keine versteckten Geb\u00fchren.',
    aboutFinTitle: 'White-Label Finanzierung', aboutFinSub: 'Rechnungsstellung und Raten direkt \u00fcber gold4you.',
    aboutSourcingTitle: 'OECD-konforme Beschaffung', aboutSourcingSub: 'LBMA Good Delivery akkreditierte Raffinerien. Konfliktfrei, vollst\u00e4ndig r\u00fcckverfolgbar.',
    aboutHowWorks: 'So funktioniert gold4you',
    aboutBrowse: 'Ausw\u00e4hlen', aboutBrowseSub: '1g bis 5kg Barren, alle zu Spot \u22122%.',
    aboutCheckout: 'Bezahlen', aboutCheckoutSub: 'Karte, Bank, Krypto oder Finanzierung.',
    aboutSameDay: 'Express-Versand', aboutSameDaySub: 'Express ab Dubai (1-3 Tage), dann Swiss Post an Ihre Tür (1-2 Tage).',
    aboutYours: 'Es geh\u00f6rt Ihnen', aboutYoursSub: 'Sie sind ab dem ersten Tag Eigent\u00fcmer.',
    aboutPartners: 'Unsere Raffinerie-Partner (Dubai)',
    aboutLocations: 'Unsere Standorte',
    aboutHQ: 'Hauptsitz', aboutRefPartner: 'Raffinerie-Partner',
    aboutRegNo: 'Reg.-Nr.', aboutHours: '\u00d6ffnungszeiten',
    aboutTeam: 'Unser Team',
    aboutGetInTouch: 'Kontakt aufnehmen',
    aboutCompliance: 'Compliance & Regulierung',
    aboutComplianceText: 'gold4you AG ist beim VQF (SRO) als Finanzintermedi\u00e4r unter Schweizer GwG registriert. Wir werden von der FINMA beaufsichtigt. Alle Transaktionen \u00fcber CHF 15.000 erfordern eine Identit\u00e4tspr\u00fcfung.',
    aboutConflictFree: 'Konfliktfrei \u00b7 Vollst\u00e4ndig r\u00fcckverfolgbar \u00b7 999,9',
    aboutQuote1: 'Gold ist nicht, was man sieht \u2014', aboutQuote2: 'es ist die Gewissheit, die man sp\u00fcrt,', aboutQuote3: 'wenn man echten Wert in H\u00e4nden h\u00e4lt.',
    homeReviewsCount: '847 Bewertungen', homeBarsSold: '14.200+ Barren verkauft', homeCountries: '38 L\u00e4nder',
    homeGoldShipsNote: 'Gold wird sofort versendet. Zahlen Sie in monatlichen Raten \u2014 gold4you sendet Ihnen 1\u20132 Rechnungen. Keine Weiterleitung.',
    homeFromPrice: 'Ab', homePerMonth: 'pro Monat', homeTerms: 'Laufzeiten', homeFromApr: 'ab eff. Zins', homeSameDay: 'Am selben Tag',
    homeFinExamples: 'Finanzierungsbeispiele',
    homeAprNote: 'Eff. Jahreszins: 4,9% (3\u20136 Mo.), 7,9% (12 Mo.), 9,9% (24 Mo.). Endkonditionen abh\u00e4ngig von Bonit\u00e4tspr\u00fcfung.',
    homeCreditVia: 'Bonit\u00e4tspr\u00fcfung \u00fcber lokalen Partner. Rechnungsstellung durch gold4you AG.',
    homeRequirements: 'Voraussetzungen',
    homeReqAge: 'Mindestalter 18', homeReqAgeSub: 'Antragsteller muss vollj\u00e4hrig und in einem unterst\u00fctzten Land wohnhaft sein.',
    homeReqIncome: 'Einkommensnachweis', homeReqIncomeSub: 'Angestellt, selbstst\u00e4ndig oder im Ruhestand mit dokumentiertem Einkommen.',
    homeReqId: 'G\u00fcltiger Ausweis', homeReqIdSub: 'Reisepass, Personalausweis oder F\u00fchrerschein.',
    homeReqBank: 'Bankkonto (SEPA)', homeReqBankSub: 'Aktives SEPA-f\u00e4higes Konto f\u00fcr monatliche Raten.',
    homeQuestions: 'Fragen zu Produkten, Preisen, Finanzierung oder Lieferung? Chatten Sie mit Ihrem pers\u00f6nlichen Berater \u2014 sofortige Antworten.',
    homeStartChat: 'Gespr\u00e4ch starten',
    homePersonalAdvisor: 'Pers\u00f6nlicher Berater \u00b7 Online',
    shopGoldSpot: 'Gold Spot', shopLoading: 'Laden...', shopOffline: 'Offline',
    shopOurPrice: 'Unser Preis: \u22122%', shopViewDetails: 'Details ansehen',
    kycTitle: 'Identit\u00e4tspr\u00fcfung', kycSubtitle: 'KYC-Verifizierung erforderlich',
    kycSub: 'Bestellungen \u00fcber 5 kg erfordern eine Identit\u00e4tspr\u00fcfung gem. Schweizer GwG.',
    kycResAddress: 'Wohnadresse', kycIdDocType: 'Ausweisdokument',
    kycIdDocNumber: 'Dokumentnummer', kycUploadId: 'Ausweis hochladen (Vorder- & R\u00fcckseite)',
    kycDragDrop: 'Hierher ziehen oder klicken', kycFileTypes: 'JPG, PNG oder PDF \u00b7 max. 10 MB',
    kycSubmit: 'Absenden & zur Kasse',
    kycDataNote: 'Ihre Daten werden gem\u00e4\u00df Schweizer Datenschutzgesetz (nDSG) und EU-DSGVO verarbeitet.',
    chatPricing: 'Preise', chatFinancing: 'Finanzierung', chatDelivery: 'Lieferung',
    chatKyc: 'KYC / Verifizierung', chatContact: 'Kontakt',
    chatPlaceholder: 'Fragen Sie uns alles \u00fcber gold4you...',
    chatReplies: 'gold4you \u00b7 Antwortet sofort',
    chatFinmaNote: 'gold4you AG \u00b7 Bahnhofstrasse 21, Z\u00fcrich \u00b7 FINMA registriert',
    // Imprint page
    impTitle: 'Impressum',
    impAddress: 'Adresse',
    impCommReg: 'Handelsregister',
    impContact: 'Kontakt',
    impAuthRep: 'Vertretungsberechtigte Person',
    impSupervision: 'Aufsicht & Regulierung',
    impSupervisionText: 'gold4you AG ist als Finanzintermediaer beim VQF (Verein zur Qualitaetssicherung von Finanzdienstleistungen) unter dem Schweizer Geldwaeschereigesetz (GwG) registriert. Beaufsichtigt durch die FINMA (Eidgenoessische Finanzmarktaufsicht).',
    impVatExempt: 'Anlagegold ist von der MwSt. befreit gemaess Art. 107 Abs. 2 MWSTV (Mehrwertsteuerverordnung).',
    impFinPartners: 'Finanzierungspartner',
    impFinPartnersText: 'Saemtliche Finanzierungen werden durch lizenzierte Drittanbieter-Kreditinstitute bereitgestellt. gold4you AG vergibt keine Kredite.',
    impFinMfGroup: 'MF Group AG (Kreditmanagement & Rechnungsstellung)',
    impFinByjuno: 'Byjuno AG (BNPL, Schweiz)',
    impFinPowerpay: 'Powerpay (Ratenzahlung, Schweiz)',
    impFinKlarna: 'Klarna Bank AB (EU-Maerkte)',
    impRefineries: 'Raffineriestandorte',
    impRefineriesText: 'Alle Goldbarren werden in Dubai, VAE, von LBMA-akkreditierten Raffinerien hergestellt:',
    impDisclaimer: 'Haftungsausschluss',
    impDisclaimerText: 'Alle Informationen auf dieser Website dienen ausschliesslich Informationszwecken und stellen keine Anlageberatung dar. Goldpreise schwanken und vergangene Wertentwicklung ist kein Indikator fuer kuenftige Ergebnisse. gold4you AG uebernimmt keine Haftung fuer die Richtigkeit, Vollstaendigkeit oder Aktualitaet der bereitgestellten Informationen.',
    impExtLinks: 'Externe Links: gold4you AG ist nicht verantwortlich fuer den Inhalt externer Websites, auf die von dieser Seite verlinkt wird.',
    impDispute: 'Streitbeilegung',
    impDisputeText: 'Die Europaeische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit. Wir sind weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen. Gerichtsstand: Zuerich, Schweiz. Anwendbares Recht: Schweizer Recht.',
    // Privacy page
    privTitle: 'Datenschutzerklaerung',
    privLastUpdated: 'Stand: Maerz 2026',
    privController: '1. Verantwortliche Stelle',
    privControllerLaw: 'Anwendbares Recht: Schweizer Bundesgesetz ueber den Datenschutz (nDSG) und EU-Datenschutz-Grundverordnung (DSGVO), soweit anwendbar.',
    privDataCollect: '2. Erhobene Daten',
    privDataPersonal: 'Personendaten: Name, E-Mail, Telefon, Geburtsdatum, Nationalitaet, Adresse',
    privDataKyc: 'Identitaetspruefung (KYC): Ausweistyp, Nummer und Kopie (gesetzlich vorgeschrieben fuer Bestellungen ueber CHF 15.000)',
    privDataFinancial: 'Finanzdaten: Beschaeftigungsstatus, Einkommensbereich (nur bei Finanzierungsantraegen)',
    privDataOrder: 'Bestelldaten: Produkte, Mengen, Zahlungsmethode, Lieferadresse',
    privDataTech: 'Technische Daten: IP-Adresse, Browsertyp, Geraeteinformationen, Cookies',
    privPurpose: '3. Zweck der Datenverarbeitung',
    privPurposeOrder: 'Bestellabwicklung und -erfuellung',
    privPurposeKyc: 'Identitaetspruefung gemaess Schweizer GwG/KYC-Vorschriften',
    privPurposeFin: 'Bearbeitung von Finanzierungsantraegen (Datenweitergabe an Kreditpartner MF Group AG, Byjuno, Powerpay oder Klarna)',
    privPurposeComm: 'Kundenkommunikation und Support',
    privPurposeLegal: 'Gesetzliche Compliance (FINMA, VQF, Steuerpflichten)',
    privPurposeAnalytics: 'Website-Analyse und Leistungsoptimierung',
    privSharing: '4. Datenweitergabe',
    privSharingIntro: 'Wir geben Ihre Daten nur an folgende Stellen weiter:',
    privSharingCredit: 'Kreditpartner (MF Group AG, Byjuno, Powerpay, Klarna) -- nur bei Finanzierungsantraegen',
    privSharingShip: 'Versanddienstleister (DHL Express, Swiss Post) -- fuer die Lieferung',
    privSharingPay: 'Zahlungsdienstleister -- fuer sichere Zahlungsabwicklung (PCI DSS Level 1 konform)',
    privSharingReg: 'Aufsichtsbehoerden -- wenn gesetzlich vorgeschrieben (FINMA, VQF)',
    privNoSell: 'Wir verkaufen, vermieten oder handeln Ihre personenbezogenen Daten nicht an Dritte fuer Marketingzwecke.',
    privSecurity: '5. Datensicherheit',
    privSecurityText: 'Alle Daten werden ueber TLS 1.3 verschluesselt uebertragen. Zahlungsdaten werden in PCI DSS Level 1 konformen Umgebungen verarbeitet. KYC-Dokumente werden in verschluesselten, zugriffskontrollierten Systemen gespeichert und nach der gesetzlichen Aufbewahrungsfrist geloescht.',
    privRetention: '6. Aufbewahrung',
    privRetOrder: 'Bestelldaten: 10 Jahre (Schweizer Handelsrecht)',
    privRetKyc: 'KYC-Dokumente: 10 Jahre nach Ende der Geschaeftsbeziehung (GwG-Anforderung)',
    privRetFin: 'Finanzierungsdaten: beim Kreditpartner gemaess dessen Richtlinien aufbewahrt',
    privRetMarketing: 'Marketingdaten: bis zum Widerruf der Einwilligung',
    privRetAnalytics: 'Analysedaten: 26 Monate',
    privRights: '7. Ihre Rechte',
    privRightsIntro: 'Gemaess nDSG und DSGVO haben Sie das Recht auf:',
    privRightsAccess: 'Auskunft ueber Ihre personenbezogenen Daten',
    privRightsRect: 'Berichtigung unrichtiger Daten',
    privRightsDelete: 'Loeschung Ihrer Daten (vorbehaltlich gesetzlicher Aufbewahrungspflichten)',
    privRightsRestrict: 'Einschraenkung oder Widerspruch gegen die Verarbeitung',
    privRightsPort: 'Datenuebertragbarkeit',
    privRightsWithdraw: 'Jederzeitiger Widerruf der Einwilligung',
    privCookies: '8. Cookies',
    privCookiesText: 'Wir verwenden essentielle Cookies fuer die Website-Funktionalitaet (Sitzungsverwaltung, Spracheinstellung, Warenkorb). Tracking-Cookies von Dritten werden nur mit Ihrer ausdruecklichen Einwilligung verwendet. Sie koennen Cookie-Einstellungen in Ihrem Browser verwalten.',
    // Terms page
    termsTitle: 'Allgemeine Geschaeftsbedingungen',
    termsLastUpdated: 'Stand: Maerz 2026',
    termsScope: '1. Geltungsbereich',
    termsScopeText: 'Diese Allgemeinen Geschaeftsbedingungen (AGB) gelten fuer alle Bestellungen ueber den Online-Shop von gold4you AG, Bahnhofstrasse 21, 8001 Zuerich, Schweiz. Mit einer Bestellung akzeptieren Sie diese AGB.',
    termsContract: '2. Vertragsschluss',
    termsContractP1: 'Produktangebote auf unserer Website stellen eine unverbindliche Aufforderung zur Abgabe eines Angebots dar. Durch Klicken auf "Bestellen" oder "Bezahlen" geben Sie ein verbindliches Kaufangebot ab. Der Vertrag kommt zustande, wenn wir Ihre Bestellung per E-Mail bestaetigen oder das Produkt versenden.',
    termsContractP2: 'Preise basieren auf dem Live-Goldspotpreis zum Zeitpunkt der Bestellung und sind 15 Minuten fixiert. Danach koennen Preise neu berechnet werden.',
    termsPrices: '3. Preise & Zahlung',
    termsPriceEur: 'Alle Preise in EUR inklusive versichertem Versand',
    termsPriceVat: 'Anlagegold ist MwSt.-befreit (Art. 107 Abs. 2 MWSTV)',
    termsPriceFormula: 'Preisformel: Gramm x (Spotpreis pro Feinunze / 31,1035) x 0,98 (Spot -2%)',
    termsPriceMethods: 'Akzeptierte Zahlungsmethoden: Kredit-/Debitkarte (Visa, Mastercard, AMEX), Bankueberweisung (SEPA/IBAN), Kryptowaehrung (BTC, ETH, USDT), Finanzierung',
    termsPrice3d: 'Kartenzahlungen sind mit 3D Secure 2.0 gesichert',
    termsFin: '4. Finanzierung',
    termsFinIntro: 'gold4you AG ist kein Finanzinstitut und vergibt keine Kredite. Saemtliche Finanzierungen werden durch lizenzierte Drittanbieter-Kreditpartner bereitgestellt:',
    termsFinTiers: 'Finanzierungsstufen:',
    termsFinQuick: 'Schnellfinanzierung: bis EUR 10.000 -- keine zusaetzlichen Dokumente erforderlich, sofortige Entscheidung',
    termsFinExtended: 'Erweiterte Finanzierung: EUR 10.000 bis EUR 180.000 -- erweiterte KYC-Pruefung erforderlich',
    termsFinAbove: 'Ueber EUR 180.000 -- nur Direktkauf (keine Finanzierung moeglich)',
    termsFinTermsLabel: 'Konditionen:',
    termsFinZero: '0% Zinsen (eff. Jahreszins 0,00%) -- sofern Raten fristgerecht bezahlt werden',
    termsFinPeriods: 'Ratenlaufzeiten: 6, 12, 18, 24, 36 oder 48 Monate',
    termsFinNoPenalty: 'Keine Strafgebuehren bei vorzeitiger Rueckzahlung',
    termsFinDeposit: 'Je nach Finanzierungsbetrag und Kreditpartner kann eine Mindestanzahlung von 1 Rate erforderlich sein',
    termsFinLate: 'Verspaetete Zahlungen koennen Mahngebuehren und Zusatzkosten gemaess den Bedingungen des Kreditpartners nach sich ziehen',
    termsReturn: '5. Rueckgaberecht bei Finanzierung',
    termsReturnP1: 'Bei 0% finanzierte Kaeufe sind vom 14-taegigen Rueckgaberecht ausgeschlossen. Sobald eine finanzierte Bestellung genehmigt und versendet wurde, kann sie nicht zurueckgegeben werden. Dieser Ausschluss gilt, da die Finanzierungskonditionen von gold4you AG subventioniert werden.',
    termsReturnP2: 'Nicht-finanzierte Kaeufe (Karte, Bankueberweisung, Krypto) unterliegen dem standardmaessigen 14-taegigen Rueckgaberecht, sofern der Goldbarren in der Original-Verpackung mit Echtheitszertifikat zurueckgegeben wird.',
    termsDelivery: '6. Lieferung',
    termsDeliveryLink: 'Detaillierte Lieferinformationen nach Land finden Sie auf unserer Versandseite.',
    termsDeliveryDubai: 'Alle Barren werden per Expressversand aus Dubai verschickt (1-3 Werktage in die Schweiz)',
    termsDeliveryLocal: 'Zustellung per Swiss Post / lokalem Zustelldienst (1-2 Werktage)',
    termsDeliveryInsured: 'Vollversichert waehrend des Transports',
    termsDeliverySig: 'Unterschrift bei Zustellung erforderlich',
    termsDeliveryDepot: 'Bei Abwesenheit wird das Paket beim naechsten Depot zur ID-verifizierten Abholung hinterlegt',
    termsOwnership: '7. Eigentumsvorbehalt',
    termsOwnershipText: 'Bei Direktkaeufen (Karte, Bankueberweisung, Krypto): Eigentuemerwechsel nach Zahlungseingang. Bei finanzierten Kaeufen: Sie besitzen das Gold ab Tag 1 nach Genehmigung, der Kreditpartner kann jedoch ein Sicherungsrecht bis zur letzten Rate behalten.',
    termsKyc: '8. Identitaetspruefung (KYC)',
    termsKycText: 'Gemaess dem Schweizer Geldwaeschereigesetz (GwG) ist gold4you verpflichtet, die Identitaet von Kunden bei Bestellungen ueber CHF 15.000 oder bei Finanzierungsanfragen zu pruefen. Wir koennen einen gueltigen amtlichen Ausweis verlangen.',
    termsWarranty: '9. Gewaehrleistung',
    termsWarrantyText: 'Alle Goldbarren werden mit einem LBMA-Echtheitszertifikat geliefert, das 999,9 Reinheit (24K) bestaetigt. Jeder Barren ist versiegelt und individuell serialisiert. Wir garantieren die Echtheit und das Gewicht jedes verkauften Barrens.',
    termsJurisdiction: '10. Anwendbares Recht & Gerichtsstand',
    termsJurisdictionText: 'Es gilt ausschliesslich Schweizer Recht. Gerichtsstand: Zuerich, Schweiz. Fuer Verbraucher mit Wohnsitz in der EU koennen zwingende Verbraucherschutzbestimmungen ihres Wohnsitzlandes ebenfalls gelten.',
    // Shipping page
    shipTitle: 'Versand',
    shipSub: 'Detaillierte Versandinformationen fuer alle unterstuetzten Laender. Alle Goldbarren stammen aus LBMA-akkreditierten Raffinerien in Dubai, VAE.',
    shipOverview: 'Versandroute im Ueberblick',
    shipStep1: 'Schritt 1', shipStep1Title: 'Dubai (Raffinerie)',
    shipStep1Desc: 'Barren wird geprueft, mit Echtheitszertifikat versiegelt und an DHL Express uebergeben.',
    shipStep2: 'Schritt 2', shipStep2Title: 'Express in die Schweiz',
    shipStep2Desc: 'DHL Express Luftfracht: Dubai nach Zuerich. 1-3 Werktage. Vollversichert, lueckenlos verfolgt.',
    shipStep3: 'Schritt 3', shipStep3Title: 'Letzte-Meile-Zustellung',
    shipStep3Desc: 'Swiss Post (CH) oder lokaler Zustelldienst (EU). 1-2 Werktage. Unterschrift an der Tuer erforderlich.',
    shipInsurance: 'Vollversicherung',
    shipInsuranceText: 'Jede Sendung ist fuer den gesamten Kaufwert vollversichert -- vom Verlassen der Raffinerie in Dubai bis zur Unterschrift an Ihrer Tuer. Bei Verlust oder Beschaedigung erhalten Sie vollstaendigen Ersatz oder Erstattung.',
    shipSignature: 'Unterschrift erforderlich',
    shipSignatureText: 'Alle Lieferungen erfordern eine persoenliche Unterschrift. Der Zusteller laesst das Paket nicht unbeaufsichtigt. Bei hochpreisigen Sendungen kann ein gueltiger Ausweis verlangt werden.',
    shipNotHome: 'Wenn Sie nicht zuhause sind',
    shipNotHomeText: 'Wenn Sie bei der Zustellung nicht anwesend sind, wird der Goldbarren nicht beim Nachbarn oder im Briefkasten hinterlegt. Stattdessen wird er beim naechsten Zustelldepot (Postfiliale oder DHL-Servicepunkt) zur Abholung bereitgehalten. Fuer die Abholung ist ein gueltiger Ausweis erforderlich.',
    shipDiscreet: 'Diskrete Verpackung',
    shipDiscreetText: 'Alle Sendungen werden in neutraler, unmarkierter Verpackung ohne Hinweis auf den Inhalt oder die Marke gold4you versendet. Als Absender wird eine neutrale Logistikfirma angegeben.',
    shipByCountry: 'Lieferzeiten nach Land',
    shipByCountrySub: 'Gesamtlieferzeit = Dubai Express (1-3 Tage) + lokale Zustellung. Alle Angaben in Werktagen.',
    shipColCountry: 'Land', shipColExpress: 'Dubai Express', shipColLastMile: 'Letzte Meile', shipColTotal: 'Gesamt', shipColCarrier: 'Zusteller',
    shipDays: 'Tage',
    shipCustoms: 'Zoll, Abgaben & MwSt.',
    shipCustomsCH: 'Schweiz & Liechtenstein: Anlagegold (999,9 Reinheit) ist von MwSt. und Einfuhrabgaben befreit. Keine Zollgebuehren.',
    shipCustomsEU: 'EU-Laender: Anlagegold ist MwSt.-befreit gemaess EU-Richtlinie 98/80/EG. Keine Einfuhrzölle fuer Goldbarren in Anlagequalitaet. Zollabwicklung durch DHL Express.',
    shipCustomsUK: 'Vereinigtes Koenigreich: Anlagegold ist MwSt.-befreit gemaess VAT Act 1994. Keine Einfuhrzölle. Zollabwicklung durch DHL Express.',
    shipCustomsNO: 'Norwegen: Anlagegold ist von der norwegischen MwSt. (merverdiavgift) befreit. Zollabwicklung durch DHL Express.',
    shipTracking: 'Sendungsverfolgung & Support',
    shipTrackingP1: 'Nach Versand erhalten Sie eine Sendungsnummer per E-Mail. Sie koennen Ihre Sendung lueckenlos auf der DHL-Express-Website verfolgen. Fuer die letzte Meile erhalten Sie eine zweite Benachrichtigung vom lokalen Zusteller.',
    shipTrackingP2: 'Bei Fragen zu Ihrer Lieferung kontaktieren Sie uns unter:',
    shipNotes: 'Wichtige Hinweise',
    shipNote1: 'Lieferzeiten sind Schaetzungen und koennen durch Zollbearbeitung oder Verzoegerungen beim Zusteller variieren.',
    shipNote2: 'gold4you versendet Montag bis Freitag. Bestellungen an Wochenenden oder Feiertagen werden am naechsten Werktag bearbeitet.',
    shipNote3: 'Postfaecher werden als Lieferadresse nicht akzeptiert.',
    shipNote4: 'Fuer Bestellungen ueber CHF/EUR 15.000 muss die Identitaetspruefung (KYC) vor dem Versand abgeschlossen sein.',
    shipNote5: 'Lieferung in nicht aufgefuehrte Laender auf Anfrage moeglich. Kontaktieren Sie uns unter shipping@gold4you.ch.',
    shipNote6: 'Versandkosten sind im Produktpreis enthalten. Keine zusaetzlichen Versandgebuehren.',
    // About page hardcoded
    aboutSpotCta: 'Spot -2% -- LBMA Zertifiziert',
    aboutByAppt: 'Nur nach Vereinbarung',
    aboutMonFri: 'Mo-Fr 09:00-18:00',
    aboutDmcc: 'Dubai Multi Commodities Centre, Dubai, VAE',
    // Admin page
    adminTitle: 'Admin-Dashboard',
    adminInternal: 'gold4you AG -- Intern',
    adminTotalOrders: 'Bestellungen gesamt',
    adminRevenue: 'Umsatz',
    adminPendingKyc: 'Offene KYC',
    adminPendingFin: 'Offene Finanzierung',
    adminRecentOrders: 'Aktuelle Bestellungen',
    adminNoOrders: 'Noch keine Bestellungen. Testbestellung aufgeben, um sie hier zu sehen.',
    adminPending: 'Ausstehend', adminProcessing: 'In Bearbeitung', adminShipped: 'Versendet', adminDelivered: 'Zugestellt',
    adminApprove: 'Genehmigen', adminReject: 'Ablehnen',
    adminNoKyc: 'Noch keine KYC-Einreichungen.',
    adminNoFin: 'Noch keine Finanzierungsantraege.',
    // Financing page hardcoded
    finMonthsRange: '6-48 Monate -- bis EUR 180.000',
    // Checkout hardcoded
    coIncomeUnder3k: 'Unter \u20ac3.000',
    coIncome3to5k: '\u20ac3.000 - \u20ac5.000',
    coIncome5to10k: '\u20ac5.000 - \u20ac10.000',
    coIncomeOver10k: 'Ueber \u20ac10.000',
    // Misc
    redirecting: 'Weiterleitung...',
    // Financing terms section
    finTermsTitle: 'AGB & Konditionen',
    finQuickProcess: 'Schnell & einfach',
    finQuickProcessText: 'Ihr Finanzierungsantrag wird direkt beim Checkout bearbeitet und innerhalb von Minuten geprueft. Nach Eingabe Ihres Geburtsdatums werden Sie aufgefordert, Ihre Telefonnummer fuer die Zwei-Faktor-Authentifizierung anzugeben. Nach erfolgreicher Bonitaetspruefung erhalten Sie einen SMS-Code. Geben Sie diesen Code im vorgesehenen Feld ein, um Ihre Bestellung abzuschliessen.',
    finPayTerms: 'Zahlungsbedingungen',
    finPayTermsP1: 'Alle Zahlungsmethoden und Bedingungen werden von gold4you AG verwaltet. Ihre persoenlichen Daten werden waehrend des gesamten Prozesses streng vertraulich und gemaess den geltenden Datenschutzgesetzen behandelt.',
    finPayTermsP2: 'Mit Ihrer Bestellung geben Sie ein verbindliches Angebot zum Abschluss eines Kaufvertrags ab. Sie koennen eine Finanzierung ueber MF Group AG oder Kauf auf Rechnung waehlen. Fuer beide Optionen kann ein gueltiges Ausweisdokument fuer die Bonitaetspruefung erforderlich sein.',
    finZeroConditions: '0% Finanzierungskonditionen',
    finCondDuration: 'Laufzeit', finCondDurationVal: '6 Monate, fest',
    finCondInterest: 'Zinsen', finCondInterestVal: '0% -- keine',
    finCondInstallments: 'Raten', finCondInstallmentsVal: '6, 12, 18, 24, 36 oder 48',
    finCondMinAmount: 'Mindestbetrag', finCondMinAmountVal: 'Keiner',
    finCondFees: 'Gebuehren', finCondFeesVal: 'Keine Gebuehren',
    finCondFirstPay: 'Erste Zahlung', finCondFirstPayVal: '30 Tage nach Rechnung',
    finZeroCondText: 'Die 0%-Finanzierung unterliegt den AGB der MF Group. Die Finanzierung wird von MF Group verwaltet und die Genehmigung setzt eine positive Bonitaetspruefung voraus. Keine zusaetzlichen Zinsen oder Gebuehren, sofern Raten fristgerecht bezahlt werden.',
    finReturnPolicy: 'Rueckgaberecht bei finanzierten Kaeufen',
    finReturnPolicyText: 'Mit 0%-Finanzierung getaetigte Kaeufe sind vom Rueckgaberecht ausgeschlossen. Wir empfehlen, sich vor dem Kauf gruendlich ueber das Produkt zu informieren.',
    finFlexTerms: 'Flexible Laufzeiten',
    finFlexTermsText: 'Unsere 0%-Finanzierung kann individuell an Ihre Beduerfnisse angepasst werden. Waehlen Sie zwischen 6, 12, 18, 24, 36 oder bis zu 48 monatlichen Raten. Die erste Zahlung ist 30 Tage nach Rechnungsdatum faellig.',
    finUsedForCredit: 'Wird fuer die Bonitaetspruefung verwendet. Nicht bei gold4you gespeichert.',
    // Home page misc
    homeSale: 'Aktion',
    homeVerified: 'Verifiziert',
    homeFinFaq: 'Finanzierungs-FAQ',
    homeYourOrder: 'Ihre Bestellung:',
  },
  it: {
    allBars: 'Tutti i lingotti', investment: 'Investimento', premium: 'Premium', about: 'Chi siamo', profile: 'Profilo',
    shopNow: 'Acquista ora', aboutUs: 'Chi siamo', viewDetails: 'Dettagli →', backTo: 'Torna a',
    backToShop: 'Torna al negozio', addToCart: 'Aggiungi al carrello', bars: 'lingotti', bar: 'lingotto',
    weight: 'Peso', payWith: 'Paga con', financing: 'Finanziamento', financeAvail: 'Finanziamento disponibile',
    buyNow: 'Compra oro adesso.', payOver: 'Paga in 3-24 mesi.', goldShips: 'L\'oro viene spedito subito',
    yourBar: 'Il tuo lingotto da', perMonth: '/mese', months: 'mesi',
    chooseBar: 'Scegli il lingotto', howItWorks: 'Come funziona', requirements: 'Requisiti',
    financingFaq: 'FAQ Finanziamento', availCountries: 'Disponibile in 12 paesi',
    customerReviews: 'Recensioni clienti', verifiedBuyers: 'Acquirenti verificati', verified: 'Verificato',
    reviews: 'recensioni', recognizedBy: 'Riconosciuto da', contact: 'Contatti', getInTouch: 'Contattaci',
    refinery: 'Raffineria', office: 'Ufficio', reachUs: 'Contattaci', whatsapp: 'WhatsApp',
    imprint: 'Impronta', privacy: 'Privacy', terms: 'Termini', shipping: 'Spedizione',
    trustBadgeLbma: 'Certificato LBMA', trustBadgeDelivery: 'Spedizione assicurata', trustBadgeVat: 'Esente IVA',
    trustBadgeFinance: 'Finanziamento 0%', trustBadgeLock: 'Prezzo fissato 15 min',
    heroTitle1: 'Lingotti d\'oro da', heroTitle2: 'Finanziamento da', heroSub: 'Lingotti d\'oro certificati LBMA da raffinerie autorizzate di Dubai. Esente IVA, spedizione assicurata, finanziamento disponibile.',
    heroBadge: 'Rivenditore svizzero di fiducia',
    catalogSub: 'Certificato LBMA', catalogTitle: 'Acquista lingotti d\'oro online',
    financingProfile: 'Profilo finanziamento', financingProfileSub: 'Completa il tuo profilo per richiedere il finanziamento.',
    financingNotSetUp: 'Finanziamento non configurato', financingNotSetUpSub: 'Compila il modulo sottostante.',
    personalInfo: 'Dati personali', firstName: 'Nome', lastName: 'Cognome',
    email: 'E-mail', phone: 'Telefono', dob: 'Data di nascita', nationality: 'Nazionalità',
    address: 'Indirizzo di consegna e fatturazione', street: 'Via e numero', postalCode: 'CAP',
    city: 'Città', country: 'Paese', selectCountry: 'Seleziona il paese',
    idVerification: 'Verifica identità (KYC)', docType: 'Tipo documento', docNumber: 'Numero documento',
    uploadId: 'Carica documento', dragDrop: 'Trascina o clicca per caricare',
    employment: 'Occupazione e reddito', empStatus: 'Stato occupazionale', monthlyIncome: 'Reddito netto mensile',
    submitApplication: 'Invia richiesta', submitDisclaimer: 'Inviando accetti i nostri Termini e la Privacy Policy.',
    security: 'Sicurezza', needHelp: 'Serve aiuto?', needHelpSub: 'Il nostro team ti assiste.',
    selectDoc: 'Seleziona documento', selectStatus: 'Seleziona stato', selectRange: 'Seleziona fascia',
    passport: 'Passaporto', nationalId: 'Carta d\'identità', driversLicense: 'Patente',
    employed: 'Dipendente', selfEmployed: 'Autonomo', retired: 'Pensionato', student: 'Studente', other: 'Altro',
    footerShop: 'Negozio', footerFinancing: 'Finanziamento', footerToken: 'Token G4Y', footerContact: 'Contatti',
    footerAbout: 'Chi siamo', footerFaq: 'FAQ', footerReviews: 'Recensioni',
    footerDesc: 'Rivenditore svizzero di oro con lingotti certificati LBMA ai premi più bassi. Spedizione assicurata in 38 paesi.',
    welcomeTitle: 'Benvenuto su gold4you', welcomeSub: 'Scegli il tuo paese e la lingua.',
    continueBtn: 'Continua', relatedBars: 'Lingotti simili', youMayLike: 'Potrebbe piacerti anche',
    selectCrypto: 'Scegli criptovaluta', g4yToken: 'Token gold4you',
    financingExamples: 'Esempi di finanziamento', buyNowPay: 'Compra ora, paga a rate',
    monthly: 'Mensile', interest: 'Interessi', total: 'Totale', monthlyPayment: 'Rata mensile',
    barPrice: 'Prezzo lingotto', earlyRepay: 'Rimborso anticipato senza penali',
    noDownPayment: 'Nessun acconto richiesto', shipped: 'Oro spedito subito dopo approvazione',
    insured: 'Completamente assicurato · Prezzo fissato 15 minuti',
    philosophy: 'Filosofia',
    ctaHeadline: 'Comprare oro non è mai stato così semplice.',
    ctaSub: 'Da 1g a 5kg. Finanziamento da 3 mesi.',
    ctaBtn: 'Scopri ora',
    ctaBuild: 'Inizia a costruire la tua posizione in oro',

    // Checkout
    coShipping: 'Spedizione e fatturazione', coShippingSub: 'Dove consegnare il tuo oro?',
    coContinuePayment: 'Continua al pagamento',
    coPaymentMethod: 'Metodo di pagamento', coPaymentSub: 'Come desideri pagare?',
    coCreditDebit: 'Carta di credito/debito', coCreditDebitSub: 'Visa, Mastercard, AMEX',
    coBankTransfer: 'Bonifico bancario', coBankTransferSub: 'SEPA / IBAN',
    coCrypto: 'Criptovaluta', coCryptoSub: 'BTC, ETH, USDT',
    coFinancingSub: '6-48 mesi, 0% interessi',
    coCardNumber: 'Numero carta', coExpiry: 'Scadenza', coCvc: 'CVC',
    coAccepted: 'Accettate', co3dSecure: '3D Secure',
    coBankInfo: 'Trasferisci sul nostro conto dopo aver effettuato l\'ordine:',
    coBankLabel: 'Banca', coRef: 'Rif', coOrderNumber: 'Il tuo numero ordine',
    coBankShipNote: 'L\'oro viene spedito dopo la ricezione del pagamento (1-2 giorni lavorativi).',
    coCryptoSelect: 'Seleziona criptovaluta:',
    coCryptoNote: 'Indirizzo wallet e QR code saranno forniti dopo l\'ordine.',
    coFinTerm: 'Durata finanziamento', coMo: 'mesi',
    coEmpStatusLabel: 'Stato occupazionale *', coMonthlyIncomeLabel: 'Reddito mensile *',
    coSelectDots: 'Seleziona\u2026',
    coCreditNote: 'Verifica del credito da parte di un partner autorizzato. Fatturazione gestita da gold4you AG.',
    coBack: 'Indietro', coReviewOrder: 'Rivedi ordine',
    coReviewTitle: 'Rivedi il tuo ordine', coReviewSub: 'Conferma che tutto sia corretto.',
    coItems: 'Articoli', coSubtotal: 'Subtotale (Spot -2%)',
    coShipAddress: 'Indirizzo di spedizione', coPayment: 'Pagamento',
    coVatExempt: 'Esente IVA (Oro da investimento)',
    coInsuredDelivery: 'Spedizione assicurata (Dubai Express + Swiss Post)',
    coInsuredDeliverySub: '3-5 giorni lavorativi (Dubai -> CH/UE). Firma richiesta. Completamente assicurato.',
    co3dRedirect: 'Sarai reindirizzato alla verifica 3D Secure della tua banca per completare il pagamento.',
    coPay: 'Paga', coPlaceOrder: 'Conferma ordine',
    coFinReqSubmitted: 'Richiesta di finanziamento inviata', coPaySuccess: 'Pagamento riuscito',
    coThankYou: 'Grazie per il tuo ordine!',
    coOrderNo: 'N. ordine', coAmount: 'Importo',
    coCard3d: 'Carta (3D Secure)',
    co3dProcessed: 'Pagamento elaborato tramite 3D Secure',
    co3dProcessedSub: 'La tua carta e stata addebitata con successo. Il tuo lingotto viene preparato per la spedizione oggi.',
    coAwaitTransfer: 'In attesa del bonifico',
    coAwaitTransferSub: 'Trasferisci l\'importo sul conto indicato. L\'oro viene spedito dopo la ricezione del pagamento.',
    coReference: 'Riferimento',
    coWalletSent: 'Dettagli wallet inviati',
    coWalletSentSub: 'Controlla la tua email per l\'indirizzo wallet e il QR code. L\'oro viene spedito dopo la conferma on-chain.',
    coFinReview: 'Richiesta di finanziamento in revisione',
    coFinReviewSub: 'La tua richiesta e stata inoltrata al nostro partner creditizio. Riceverai una decisione entro pochi minuti via email.',
    coWhatsNext: 'Cosa succede ora',
    coCreditCheckStep: 'Verifica del credito', coCreditCheckStepSub: 'Il nostro partner esamina la tua richiesta (di solito in meno di 2 minuti).',
    coApprovalStep: 'Approvazione e condizioni', coApprovalStepSub: 'Ricevi le condizioni finali e il piano di pagamento mensile via email.',
    coGoldShipsStep: 'L\'oro viene spedito oggi', coGoldShipsStepSub: 'Dopo l\'approvazione, il tuo lingotto viene imballato e spedito immediatamente.',
    coMonthlyInvStep: 'Fatturazione mensile', coMonthlyInvStepSub: 'Ricevi fatture mensili dal partner creditizio.',
    coConfirmEmail: 'Email di conferma', coConfirmEmailSub: 'Una conferma con i dettagli dell\'ordine e in arrivo.',
    coQualityCheck: 'Controllo qualita', coQualityCheckSub: 'Il tuo lingotto viene verificato e imballato in modo sicuro.',
    coInsuredShipStep: 'Spedizione assicurata', coInsuredShipStepSub: 'Express da Dubai (1-3 giorni), poi consegna assicurata tramite Swiss Post (1-2 giorni).',
    coDeliveryStep: 'Consegna', coDeliveryStepSub: 'Firma richiesta alla porta. Tracciamento via email.',
    co3dNote: 'Pagamento protetto con autenticazione 3D Secure 2.0. Conforme PCI DSS Livello 1.',
    coContinueShopping: 'Continua lo shopping',
    // Cart
    cartTitle: 'Carrello', cartEmpty: 'Il tuo carrello e vuoto',
    cartSubtotal: 'Subtotale', cartVatNote: 'Esente IVA (Oro da investimento)',
    cartKycNote: 'Ordini superiori a 5 kg richiedono verifica identita (KYC)',
    cartCompleteKyc: 'Completa KYC', cartCheckout: 'Checkout', cartContinue: 'Continua lo shopping',
    // Product detail
    detailPurity: 'Purezza', detailPurityVal: '999,9 Oro fino (24K)',
    detailCert: 'Certificazione', detailCertVal: 'LBMA Good Delivery (Certificato di analisi)',
    detailMfr: 'Produttore', detailDimensions: 'Dimensioni',
    detailVat: 'IVA', detailVatVal: 'Esente (Oro da investimento)',
    detailLive: 'LIVE', detailSpot: 'Spot -2%',
    detailMonthlyPay: 'Pagamento mensile',
    detailDownPayment: 'Acconto',
    detailOneTime: 'Pagamento unico per',
    detailSpotApplied: 'Spot -2% applicato',
    detailBuyerProt: 'Protezione acquirente', detailMoneyBack: 'Garanzia soddisfatti o rimborsati',
    detailSslCheckout: 'Checkout crittografato SSL/TLS',
    detailInsuredTracked: 'Spedizione assicurata e tracciata (Dubai Express + Swiss Post)',
    detailReturnPolicy: 'Politica di reso di 14 giorni',
    detailLbmaAuth: 'Autenticita LBMA garantita',
    detailPriceLocked: 'Prezzo bloccato per 15 minuti',
    detailFinNoFee: 'Finanziamento: nessuna penale per rimborso anticipato',
    detailBasedOn: 'Basato su', detailFromVerified: 'da acquirenti verificati',
    detailVerifiedPurchase: 'Acquisto verificato',
    detailPersonalAdvisor: 'Il tuo consulente personale -- Online',
    detailView: 'Vedi',
    // Financing page
    finHeroSub: 'Acquista ora il tuo lingotto e paga nel tempo. Finanziamento rapido fino a EUR 10.000 -- senza documenti aggiuntivi. KYC esteso per importi fino a EUR 180.000.',
    finLicensedPartners: 'Partner creditizi autorizzati', finDecision2min: 'Decisione in 2 min',
    finShipsSameDay: 'Spedizione in giornata',
    finStep1: 'Scegli il lingotto', finStep1Sub: 'Seleziona un lingotto da 1g a 5kg e scegli "Finanziamento" al checkout.',
    finStep2: 'Verifica del credito', finStep2Sub: 'Il partner autorizzato effettua una verifica soft -- decisione istantanea.',
    finStep3: 'L\'oro viene spedito oggi', finStep3Sub: 'Una volta approvato, il lingotto viene spedito in giornata. E tuo immediatamente.',
    finStep4: 'Paga a rate', finStep4Sub: 'gold4you ti invia fatture mensili. Paga tramite bonifico o carta.',
    finDiscTitle: 'Come funziona il finanziamento con gold4you',
    finDiscP1: 'gold4you non concede crediti direttamente. Tutti i finanziamenti sono forniti da istituti di credito terzi autorizzati e regolamentati. La tua richiesta viene inoltrata al partner creditizio competente (es. Byjuno o Powerpay in Svizzera, Klarna nell\'UE).',
    finDiscP2: 'gold4you agisce come commerciante -- ti vendiamo l\'oro, lo spediamo immediatamente dopo l\'approvazione, e il tuo partner creditizio ti fattura mensilmente.',
    finBar: 'Lingotto', finPrice: 'Prezzo', finTerm: 'Durata', finApr: 'TAEG', finMonthly: 'Rata',
    finPricesLive: 'Prezzi basati sullo spot in tempo reale. Aggiornati ogni 15 min.',
    finZeroDown: 'Di solito interamente finanziato', finZeroDownSub: 'Nella maggior parte dei casi non e richiesto alcun acconto. A seconda dell\'importo e del partner creditizio, puo essere richiesto un deposito minimo di 1 rata.',
    finOwnImmediate: 'Tuo immediatamente', finOwnImmediateSub: 'Il tuo oro viene spedito in giornata dopo l\'approvazione. E tuo dal primo giorno.',
    finTransparent: 'Condizioni trasparenti', finTransparentSub: 'TAEG fisso stabilito dal partner creditizio. Nessuna penale per rimborso anticipato.',
    finFaqOwn: 'Possiedo l\'oro immediatamente?', finFaqOwnA: 'Si. Il tuo lingotto viene spedito in giornata dopo l\'approvazione. E tuo dal momento in cui arriva.',
    finFaqMiss: 'Cosa succede se salto un pagamento?', finFaqMissA: 'gold4you ti contatta direttamente. Mantieni l\'oro. Si applicano le procedure standard di recupero crediti.',
    finFaqEarly: 'Posso rimborsare anticipatamente?', finFaqEarlyA: 'Si. Nessuna penale. Puoi saldare il saldo residuo in qualsiasi momento.',
    finFaqDeposit: 'C\'e un deposito?', finFaqDepositA: 'Nella maggior parte dei casi, no. A seconda dell\'importo e del partner creditizio, puo essere richiesto un deposito minimo di 1 rata.',
    finFaqSpeed: 'Quanto e veloce la decisione?', finFaqSpeedA: 'La maggior parte delle decisioni sono istantanee (meno di 2 minuti). In rari casi, la revisione manuale richiede fino a 24 ore.',
    finReadyApply: 'Pronto per fare domanda?', finReadyApplySub: 'Nessun account necessario. Fai domanda come ospite o accedi.',
    finApplyBtn: 'Richiedi finanziamento',
    finLegal: 'gold4you AG non e un istituto finanziario e non concede crediti. Tutti i finanziamenti sono offerti da partner creditizi terzi autorizzati (MF Group AG). Finanziamento rapido fino a EUR 10.000 senza documenti aggiuntivi. Finanziamento esteso fino a EUR 180.000 con verifica KYC. 0% di interessi se le rate sono pagate puntualmente. Gli acquisti finanziati allo 0% sono esclusi dalla politica di reso.',
    finApplyTitle: 'Richiedi finanziamento', finApplySub: 'Compila i tuoi dati per ottenere l\'approvazione. Nessun account richiesto.',
    finContact: 'Contatti',
    finAmlNote: 'Richiesto dalla normativa svizzera antiriciclaggio.',
    finFileTypes: 'JPG, PNG o PDF -- max 10 MB',
    finSecTls: 'Crittografia TLS 1.3', finSecGdpr: 'Conforme GDPR',
    finSecData: 'Dati condivisi solo con il partner creditizio', finSecDelete: 'Cancella i tuoi dati in qualsiasi momento',
    finSubmittedTitle: 'Richiesta di finanziamento inviata',
    finSubmittedSub: 'Abbiamo ricevuto con successo la tua richiesta di finanziamento.',
    finReqNo: 'N. richiesta', finStatusLabel: 'Stato', finUnderReview: 'In revisione',
    finWhatsNow: 'Cosa succede ora?',
    finWhatsNowSub: 'La tua richiesta e stata inoltrata al nostro partner creditizio autorizzato. La maggior parte delle decisioni viene comunicata entro 2 minuti via email.',
    finNextSteps: 'Prossimi passi',
    finAssessment: 'Valutazione del credito', finAssessmentSub: 'Il nostro partner esamina la tua richiesta (di solito istantaneo).',
    finDecisionEmail: 'Decisione via email', finDecisionEmailSub: 'Ricevi l\'approvazione con le condizioni finali e il piano mensile.',
    finChooseGold: 'Scegli il tuo oro', finChooseGoldSub: 'Naviga nel nostro negozio e aggiungi il lingotto desiderato al carrello.',
    finCheckoutFin: 'Checkout con finanziamento', finCheckoutFinSub: 'Seleziona "Finanziamento" al checkout. Le tue condizioni pre-approvate si applicano automaticamente.',
    finEmailSent: 'Una conferma e stata inviata all\'indirizzo email fornito. Controlla la cartella spam se non la vedi.',
    finBrowseBars: 'Sfoglia lingotti d\'oro', finBackHome: 'Torna alla home',
    // About page
    aboutSince: 'Dal 2019 -- Zurigo', aboutTitle: 'Chi siamo',
    aboutSub: 'Rivenditore svizzero di metalli preziosi. Lingotti certificati LBMA a spot -2%, spedizione assicurata in 38 paesi e finanziamento flessibile.',
    aboutBarsSold: 'Lingotti venduti', aboutSince2019: 'dal 2019',
    aboutRating: 'Valutazione clienti', aboutVerifiedReviews: '847 recensioni verificate',
    aboutCountries: 'Paesi', aboutShippedTo: 'spediti in',
    aboutAllPrices: 'Tutti i prezzi', aboutBelowMarket: 'sotto il mercato',
    aboutDifferent: 'Cosa ci rende diversi',
    aboutSpotTitle: 'Prezzi Spot -2%', aboutSpotSub: 'Ogni lingotto a un prezzo del 2% sotto lo spot. Nessun costo nascosto.',
    aboutFinTitle: 'Finanziamento White-Label', aboutFinSub: 'Tutta la fatturazione e le rate gestite direttamente da gold4you -- nessun redirect a terzi.',
    aboutSourcingTitle: 'Raffinerie LBMA di Dubai', aboutSourcingSub: 'Tutti i lingotti raffinati a Dubai da raffinerie accreditate LBMA. Certificati, completamente tracciabili, oro conflict-free.',
    aboutHowWorks: 'Come funziona gold4you',
    aboutBrowse: 'Sfoglia e seleziona', aboutBrowseSub: 'Lingotti da 1g a 5kg, tutti a spot -2%.',
    aboutCheckout: 'Checkout', aboutCheckoutSub: 'Carta, bonifico, crypto o finanziamento.',
    aboutSameDay: 'Spedizione in giornata', aboutSameDaySub: 'Express da Dubai, spedizione assicurata, firma richiesta.',
    aboutYours: 'E tuo', aboutYoursSub: 'Tuo dal primo giorno.',
    aboutPartners: 'I nostri partner di raffinazione (Dubai)',
    aboutLocations: 'Le nostre sedi',
    aboutHQ: 'Sede centrale', aboutRefPartner: 'Partner raffineria',
    aboutRegNo: 'N. Reg.', aboutHours: 'Orari',
    aboutTeam: 'Il nostro team',
    aboutGetInTouch: 'Contattaci',
    aboutCompliance: 'Conformita e regolamentazione',
    aboutComplianceText: 'gold4you AG e registrata presso il VQF come intermediario finanziario ai sensi della legislazione svizzera antiriciclaggio. Siamo sorvegliati dalla FINMA. Tutte le transazioni superiori a CHF 15.000 richiedono la verifica dell\'identita. Oro da investimento esente IVA ai sensi dell\'art. 107 cpv. 2 OIVA.',
    aboutConflictFree: 'Conflict-free -- Completamente tracciabile -- 999,9',
    aboutQuote1: 'L\'oro non e quello che vedi --', aboutQuote2: 'e la certezza che senti', aboutQuote3: 'quando possiedi valore reale.',
    // Homepage
    homeReviewsCount: '847 recensioni', homeBarsSold: '14.200+ lingotti venduti', homeCountries: '38 paesi',
    homeGoldShipsNote: 'L\'oro viene spedito immediatamente. Paga a rate mensili -- gold4you ti invia 1-2 fatture alla volta.',
    homeFromPrice: 'Da', homePerMonth: 'al mese', homeTerms: 'condizioni', homeFromApr: 'da TAEG', homeSameDay: 'In giornata',
    homeFinExamples: 'Esempi di finanziamento',
    homeAprNote: '0% TAEG (6-48 mesi). Le condizioni finali dipendono dalla valutazione del credito. Fatturazione gestita da gold4you AG tramite MF Group AG.',
    homeCreditVia: 'Valutazione del credito tramite partner locale. Tutta la fatturazione da gold4you AG. Contattaci per altri paesi europei.',
    homeRequirements: 'Requisiti',
    homeReqAge: 'Eta minima 18 anni', homeReqAgeSub: 'Il richiedente deve essere maggiorenne e residente in un paese supportato.',
    homeReqIncome: 'Prova di reddito', homeReqIncomeSub: 'Dipendente, autonomo o pensionato con reddito documentato.',
    homeReqId: 'Documento d\'identita valido', homeReqIdSub: 'Passaporto, carta d\'identita o patente.',
    homeReqBank: 'Conto bancario (SEPA)', homeReqBankSub: 'Conto SEPA attivo per le rate mensili.',
    homeQuestions: 'Domande su prodotti, prezzi, finanziamento o consegna? Chatta con il tuo consulente personale -- risposte immediate.',
    homeStartChat: 'Inizia una conversazione',
    homePersonalAdvisor: 'Consulente personale -- Online',
    // Shop
    shopGoldSpot: 'Gold Spot', shopLoading: 'Caricamento...', shopOffline: 'Offline',
    shopOurPrice: 'Il nostro prezzo: -2%', shopViewDetails: 'Vedi dettagli',
    // KYC modal
    kycTitle: 'Verifica identita', kycSubtitle: 'Verifica KYC richiesta',
    kycSub: 'Ordini superiori a 5 kg o richieste personalizzate richiedono la verifica dell\'identita secondo la normativa svizzera antiriciclaggio.',
    kycResAddress: 'Indirizzo di residenza', kycIdDocType: 'Tipo documento ID',
    kycIdDocNumber: 'Numero documento ID', kycUploadId: 'Carica ID (fronte e retro)',
    kycDragDrop: 'Trascina o clicca per caricare', kycFileTypes: 'JPG, PNG o PDF -- max 10 MB',
    kycSubmit: 'Invia e continua al checkout',
    kycDataNote: 'I tuoi dati sono trattati in conformita con la legge svizzera sulla protezione dei dati (nLPD) e il GDPR UE.',
    // Chat
    chatPricing: 'Prezzi', chatFinancing: 'Finanziamento', chatDelivery: 'Consegna',
    chatKyc: 'KYC / Verifica', chatContact: 'Contatti',
    chatPlaceholder: 'Chiedi qualsiasi cosa su gold4you...',
    chatReplies: 'gold4you -- Risponde istantaneamente',
    chatFinmaNote: 'gold4you AG -- Bahnhofstrasse 21, Zurigo -- FINMA registrata',
    // Imprint page
    impTitle: 'Impronta',
    impAddress: 'Indirizzo',
    impCommReg: 'Registro di commercio',
    impContact: 'Contatti',
    impAuthRep: 'Persona autorizzata a rappresentare',
    impSupervision: 'Vigilanza e regolamentazione',
    impSupervisionText: 'gold4you AG e registrata presso il VQF come intermediario finanziario secondo la legislazione svizzera antiriciclaggio (LRD). Sorvegliata dalla FINMA.',
    impVatExempt: 'L\'oro d\'investimento e esente da IVA ai sensi dell\'art. 107 cpv. 2 OIVA.',
    impFinPartners: 'Partner di finanziamento',
    impFinPartnersText: 'Tutti i finanziamenti sono forniti da istituti di credito terzi autorizzati. gold4you AG non concede crediti.',
    impFinMfGroup: 'MF Group AG (gestione crediti e fatturazione)',
    impFinByjuno: 'Byjuno AG (BNPL, Svizzera)',
    impFinPowerpay: 'Powerpay (pagamento rateale, Svizzera)',
    impFinKlarna: 'Klarna Bank AB (mercati UE)',
    impRefineries: 'Sedi delle raffinerie',
    impRefineriesText: 'Tutti i lingotti d\'oro sono raffinati a Dubai, EAU, da raffinerie accreditate LBMA:',
    impDisclaimer: 'Esclusione di responsabilita',
    impDisclaimerText: 'Tutte le informazioni su questo sito sono fornite a solo scopo informativo e non costituiscono consulenza sugli investimenti. I prezzi dell\'oro oscillano e le performance passate non sono indicative dei risultati futuri.',
    impExtLinks: 'Link esterni: gold4you AG non e responsabile del contenuto di siti web esterni.',
    impDispute: 'Risoluzione delle controversie',
    impDisputeText: 'La Commissione Europea fornisce una piattaforma per la risoluzione online delle controversie (ODR). Non siamo obbligati ne disposti a partecipare a procedimenti di risoluzione delle controversie. Foro competente: Zurigo, Svizzera. Diritto applicabile: diritto svizzero.',
    // Privacy page
    privTitle: 'Informativa sulla privacy',
    privLastUpdated: 'Ultimo aggiornamento: marzo 2026',
    privController: '1. Titolare del trattamento',
    privControllerLaw: 'Diritto applicabile: Legge federale svizzera sulla protezione dei dati (nLPD) e GDPR UE, ove applicabile.',
    privDataCollect: '2. Dati raccolti',
    privDataPersonal: 'Dati personali: nome, e-mail, telefono, data di nascita, nazionalita, indirizzo',
    privDataKyc: 'Verifica identita (KYC): tipo di documento, numero e copia (richiesta per ordini superiori a CHF 15.000)',
    privDataFinancial: 'Dati finanziari: stato occupazionale, fascia di reddito (solo per richieste di finanziamento)',
    privDataOrder: 'Dati ordine: prodotti, quantita, metodo di pagamento, indirizzo di spedizione',
    privDataTech: 'Dati tecnici: indirizzo IP, tipo di browser, informazioni sul dispositivo, cookie',
    privPurpose: '3. Finalita del trattamento',
    privPurposeOrder: 'Elaborazione ed evasione degli ordini',
    privPurposeKyc: 'Verifica identita secondo le normative svizzere LRD/KYC',
    privPurposeFin: 'Elaborazione richieste di finanziamento (dati condivisi con partner MF Group AG, Byjuno, Powerpay o Klarna)',
    privPurposeComm: 'Comunicazione e supporto clienti',
    privPurposeLegal: 'Conformita legale (FINMA, VQF, obblighi fiscali)',
    privPurposeAnalytics: 'Analisi del sito web e ottimizzazione delle prestazioni',
    privSharing: '4. Condivisione dei dati',
    privSharingIntro: 'Condividiamo i tuoi dati solo con:',
    privSharingCredit: 'Partner creditizi (MF Group AG, Byjuno, Powerpay, Klarna) -- solo in caso di richiesta di finanziamento',
    privSharingShip: 'Corrieri (DHL Express, Swiss Post) -- per la consegna',
    privSharingPay: 'Processori di pagamento -- per la gestione sicura dei pagamenti (conformi PCI DSS Livello 1)',
    privSharingReg: 'Autorita di regolamentazione -- quando richiesto dalla legge (FINMA, VQF)',
    privNoSell: 'Non vendiamo, affittiamo o scambiamo i tuoi dati personali a terzi per scopi di marketing.',
    privSecurity: '5. Sicurezza dei dati',
    privSecurityText: 'Tutti i dati sono trasmessi tramite crittografia TLS 1.3. I dati di pagamento sono elaborati in ambienti conformi PCI DSS Livello 1. I documenti KYC sono conservati in sistemi crittografati ad accesso controllato.',
    privRetention: '6. Conservazione dei dati',
    privRetOrder: 'Dati ordine: 10 anni (obbligo di diritto commerciale svizzero)',
    privRetKyc: 'Documenti KYC: 10 anni dalla fine del rapporto commerciale (requisito LRD)',
    privRetFin: 'Dati di finanziamento: conservati dal partner creditizio secondo le sue politiche',
    privRetMarketing: 'Dati di marketing: fino alla revoca del consenso',
    privRetAnalytics: 'Dati analitici: 26 mesi',
    privRights: '7. I tuoi diritti',
    privRightsIntro: 'Ai sensi di nLPD e GDPR hai diritto a:',
    privRightsAccess: 'Accedere ai tuoi dati personali',
    privRightsRect: 'Rettificare dati inesatti',
    privRightsDelete: 'Richiedere la cancellazione dei tuoi dati (fatti salvi gli obblighi di conservazione)',
    privRightsRestrict: 'Limitare o opporsi al trattamento',
    privRightsPort: 'Portabilita dei dati',
    privRightsWithdraw: 'Revocare il consenso in qualsiasi momento',
    privCookies: '8. Cookie',
    privCookiesText: 'Utilizziamo cookie essenziali per la funzionalita del sito (gestione sessione, lingua, carrello). Cookie di tracciamento di terze parti vengono utilizzati solo con il tuo esplicito consenso.',
    // Terms page
    termsTitle: 'Condizioni generali',
    termsLastUpdated: 'Ultimo aggiornamento: marzo 2026',
    termsScope: '1. Ambito di applicazione',
    termsScopeText: 'Le presenti Condizioni Generali (CG) si applicano a tutti gli ordini effettuati tramite il negozio online di gold4you AG, Bahnhofstrasse 21, 8001 Zurigo, Svizzera. Effettuando un ordine, accetti queste condizioni.',
    termsContract: '2. Conclusione del contratto',
    termsContractP1: 'Le offerte di prodotti sul nostro sito web costituiscono un invito non vincolante a presentare un\'offerta. Cliccando su "Ordina" o "Paga", presenti un\'offerta di acquisto vincolante. Il contratto si conclude quando confermiamo il tuo ordine via e-mail o spediamo il prodotto.',
    termsContractP2: 'I prezzi si basano sul prezzo spot dell\'oro in tempo reale e sono bloccati per 15 minuti.',
    termsPrices: '3. Prezzi e pagamento',
    termsPriceEur: 'Tutti i prezzi in EUR, spedizione assicurata inclusa',
    termsPriceVat: 'Oro d\'investimento esente IVA (Art. 107 cpv. 2 OIVA)',
    termsPriceFormula: 'Formula prezzo: grammi x (prezzo spot per oncia troy / 31,1035) x 0,98 (Spot -2%)',
    termsPriceMethods: 'Metodi di pagamento accettati: Carta di credito/debito (Visa, Mastercard, AMEX), Bonifico bancario (SEPA/IBAN), Criptovaluta (BTC, ETH, USDT), Finanziamento',
    termsPrice3d: 'I pagamenti con carta sono protetti con autenticazione 3D Secure 2.0',
    termsFin: '4. Finanziamento',
    termsFinIntro: 'gold4you AG non e un istituto finanziario e non concede crediti. Tutti i finanziamenti sono forniti da partner creditizi terzi autorizzati:',
    termsFinTiers: 'Livelli di finanziamento:',
    termsFinQuick: 'Finanziamento rapido: fino a EUR 10.000 -- nessun documento aggiuntivo richiesto, decisione immediata',
    termsFinExtended: 'Finanziamento esteso: da EUR 10.000 a EUR 180.000 -- verifica KYC estesa richiesta',
    termsFinAbove: 'Oltre EUR 180.000 -- solo acquisto diretto (finanziamento non disponibile)',
    termsFinTermsLabel: 'Condizioni:',
    termsFinZero: '0% interessi (TAEG 0,00%) -- a condizione che le rate siano pagate puntualmente',
    termsFinPeriods: 'Periodi di rata: 6, 12, 18, 24, 36 o 48 mesi',
    termsFinNoPenalty: 'Nessuna penale per il rimborso anticipato',
    termsFinDeposit: 'A seconda dell\'importo e del partner creditizio, puo essere richiesto un acconto minimo di 1 rata',
    termsFinLate: 'I pagamenti in ritardo possono comportare spese di sollecito e costi aggiuntivi secondo le condizioni del partner creditizio',
    termsReturn: '5. Politica di reso per acquisti finanziati',
    termsReturnP1: 'Gli acquisti finanziati allo 0% sono esclusi dalla politica di reso standard di 14 giorni. Una volta approvato e spedito un ordine finanziato, non puo essere restituito.',
    termsReturnP2: 'Gli acquisti non finanziati (carta, bonifico, crypto) restano soggetti alla politica di reso standard di 14 giorni, a condizione che il lingotto sia restituito nella confezione originale sigillata con il certificato di autenticita.',
    termsDelivery: '6. Consegna',
    termsDeliveryLink: 'Per informazioni dettagliate sulla consegna per paese, consulta la nostra pagina Spedizione.',
    termsDeliveryDubai: 'Tutti i lingotti vengono spediti da Dubai tramite corriere espresso (1-3 giorni lavorativi per la Svizzera)',
    termsDeliveryLocal: 'Consegna finale tramite Swiss Post / corriere locale (1-2 giorni lavorativi)',
    termsDeliveryInsured: 'Completamente assicurato durante il trasporto',
    termsDeliverySig: 'Firma richiesta alla consegna',
    termsDeliveryDepot: 'In caso di assenza, il pacco viene trattenuto presso il deposito piu vicino per il ritiro con verifica ID',
    termsOwnership: '7. Riserva di proprieta',
    termsOwnershipText: 'Per acquisti diretti: il trasferimento di proprieta avviene al ricevimento del pagamento. Per acquisti finanziati: possiedi l\'oro dal primo giorno, ma il partner creditizio puo mantenere un interesse di garanzia fino all\'ultima rata.',
    termsKyc: '8. Verifica identita (KYC)',
    termsKycText: 'Ai sensi della Legge svizzera sul riciclaggio di denaro (LRD), gold4you e tenuta a verificare l\'identita dei clienti per ordini superiori a CHF 15.000 o in caso di richieste di finanziamento.',
    termsWarranty: '9. Garanzia',
    termsWarrantyText: 'Tutti i lingotti d\'oro vengono consegnati con un certificato LBMA che conferma la purezza 999,9 (24K). Ogni lingotto e sigillato e serializzato individualmente. Garantiamo l\'autenticita e il peso di ogni lingotto venduto.',
    termsJurisdiction: '10. Diritto applicabile e foro competente',
    termsJurisdictionText: 'Si applica esclusivamente il diritto svizzero. Foro competente: Zurigo, Svizzera. Per i consumatori domiciliati nell\'UE, possono applicarsi anche le disposizioni obbligatorie sulla tutela dei consumatori del loro paese di residenza.',
    // Shipping page
    shipTitle: 'Spedizione',
    shipSub: 'Informazioni dettagliate sulla spedizione per tutti i paesi supportati. Tutti i lingotti provengono da raffinerie LBMA a Dubai, EAU.',
    shipOverview: 'Panoramica del percorso di spedizione',
    shipStep1: 'Fase 1', shipStep1Title: 'Dubai (Raffineria)',
    shipStep1Desc: 'Il lingotto viene verificato, sigillato con certificato di autenticita e consegnato a DHL Express.',
    shipStep2: 'Fase 2', shipStep2Title: 'Express verso la Svizzera',
    shipStep2Desc: 'DHL Express via aerea: Dubai-Zurigo. 1-3 giorni lavorativi. Completamente assicurato, tracciato.',
    shipStep3: 'Fase 3', shipStep3Title: 'Consegna ultimo miglio',
    shipStep3Desc: 'Swiss Post (CH) o corriere locale (UE). 1-2 giorni lavorativi. Firma richiesta alla porta.',
    shipInsurance: 'Assicurazione completa',
    shipInsuranceText: 'Ogni spedizione e completamente assicurata per l\'intero valore d\'acquisto, dal momento in cui lascia la raffineria di Dubai fino alla firma alla porta. In caso di smarrimento o danno, ricevi una sostituzione o un rimborso completo.',
    shipSignature: 'Firma richiesta',
    shipSignatureText: 'Tutte le consegne richiedono una firma personale. Il corriere non lascera il pacco incustodito. Per spedizioni di alto valore puo essere richiesto un documento d\'identita valido.',
    shipNotHome: 'Se non sei a casa',
    shipNotHomeText: 'Se non sei disponibile al momento della consegna, il lingotto non viene lasciato a un vicino o nella cassetta postale. Viene trattenuto presso il deposito del corriere piu vicino. Per il ritiro e richiesto un documento d\'identita valido.',
    shipDiscreet: 'Imballaggio discreto',
    shipDiscreetText: 'Tutte le spedizioni vengono inviate in imballaggi anonimi senza alcuna indicazione del contenuto o del marchio gold4you.',
    shipByCountry: 'Tempi di consegna per paese',
    shipByCountrySub: 'Tempo di consegna totale = Dubai Express (1-3 giorni) + consegna locale. Tutti i tempi in giorni lavorativi.',
    shipColCountry: 'Paese', shipColExpress: 'Dubai Express', shipColLastMile: 'Ultimo miglio', shipColTotal: 'Totale', shipColCarrier: 'Corriere',
    shipDays: 'giorni',
    shipCustoms: 'Dogana, dazi e IVA',
    shipCustomsCH: 'Svizzera e Liechtenstein: l\'oro d\'investimento (purezza 999,9) e esente da IVA e dazi doganali.',
    shipCustomsEU: 'Paesi UE: l\'oro d\'investimento e esente IVA ai sensi della direttiva UE 98/80/CE. Nessun dazio doganale per lingotti LBMA. Sdoganamento gestito da DHL Express.',
    shipCustomsUK: 'Regno Unito: l\'oro d\'investimento e esente IVA. Nessun dazio doganale. Sdoganamento gestito da DHL Express.',
    shipCustomsNO: 'Norvegia: l\'oro d\'investimento e esente dall\'IVA norvegese (merverdiavgift). Sdoganamento gestito da DHL Express.',
    shipTracking: 'Tracciamento e supporto',
    shipTrackingP1: 'Dopo la spedizione, ricevi un numero di tracciamento via e-mail. Puoi seguire la spedizione sul sito DHL Express. Per l\'ultimo miglio, riceverai una seconda notifica dal corriere locale.',
    shipTrackingP2: 'Per domande sulla consegna, contattaci a:',
    shipNotes: 'Note importanti',
    shipNote1: 'I tempi di consegna sono stime e possono variare a causa di sdoganamento o ritardi del corriere.',
    shipNote2: 'gold4you spedisce dal lunedi al venerdi. Ordini del fine settimana vengono elaborati il giorno lavorativo successivo.',
    shipNote3: 'Le caselle postali non sono accettate come indirizzo di consegna.',
    shipNote4: 'Per ordini superiori a CHF/EUR 15.000, la verifica dell\'identita (KYC) deve essere completata prima della spedizione.',
    shipNote5: 'Consegna in paesi non elencati disponibile su richiesta. Contattaci a shipping@gold4you.ch.',
    shipNote6: 'I costi di spedizione sono inclusi nel prezzo del prodotto. Nessun costo aggiuntivo.',
    // About page hardcoded
    aboutSpotCta: 'Spot -2% -- Certificato LBMA',
    aboutByAppt: 'Solo su appuntamento',
    aboutMonFri: 'Lun-Ven 09:00-18:00',
    aboutDmcc: 'Dubai Multi Commodities Centre, Dubai, EAU',
    // Admin page
    adminTitle: 'Pannello amministrazione',
    adminInternal: 'gold4you AG -- Interno',
    adminTotalOrders: 'Ordini totali',
    adminRevenue: 'Fatturato',
    adminPendingKyc: 'KYC in sospeso',
    adminPendingFin: 'Finanziamento in sospeso',
    adminRecentOrders: 'Ordini recenti',
    adminNoOrders: 'Nessun ordine ancora. Effettua un ordine di prova per vederlo qui.',
    adminPending: 'In attesa', adminProcessing: 'In elaborazione', adminShipped: 'Spedito', adminDelivered: 'Consegnato',
    adminApprove: 'Approva', adminReject: 'Rifiuta',
    adminNoKyc: 'Nessuna richiesta KYC ancora.',
    adminNoFin: 'Nessuna richiesta di finanziamento ancora.',
    // Financing page hardcoded
    finMonthsRange: '6-48 mesi -- fino a EUR 180.000',
    // Checkout hardcoded
    coIncomeUnder3k: 'Sotto \u20ac3.000',
    coIncome3to5k: '\u20ac3.000 - \u20ac5.000',
    coIncome5to10k: '\u20ac5.000 - \u20ac10.000',
    coIncomeOver10k: 'Oltre \u20ac10.000',
    // Misc
    redirecting: 'Reindirizzamento...',
    // Financing terms section
    finTermsTitle: 'Termini e condizioni',
    finQuickProcess: 'Processo rapido e semplice',
    finQuickProcessText: 'La tua richiesta di finanziamento viene elaborata direttamente al checkout e verificata in pochi minuti. Dopo aver inserito la data di nascita, ti verra chiesto il numero di telefono per l\'autenticazione a due fattori. Dopo la verifica del credito, riceverai un codice SMS per completare l\'ordine.',
    finPayTerms: 'Condizioni di pagamento',
    finPayTermsP1: 'Tutti i metodi di pagamento e le condizioni sono gestiti da gold4you AG. I tuoi dati personali sono trattati in modo strettamente confidenziale e in conformita con le leggi sulla protezione dei dati.',
    finPayTermsP2: 'Effettuando un ordine, presenti un\'offerta vincolante per la conclusione di un contratto di acquisto. Puoi scegliere il finanziamento tramite MF Group AG o l\'acquisto su fattura.',
    finZeroConditions: 'Condizioni finanziamento 0%',
    finCondDuration: 'Durata', finCondDurationVal: '6 mesi, fisso',
    finCondInterest: 'Interessi', finCondInterestVal: '0% -- nessuno',
    finCondInstallments: 'Rate', finCondInstallmentsVal: '6, 12, 18, 24, 36 o 48',
    finCondMinAmount: 'Importo minimo', finCondMinAmountVal: 'Nessuno',
    finCondFees: 'Commissioni', finCondFeesVal: 'Nessuna commissione',
    finCondFirstPay: 'Primo pagamento', finCondFirstPayVal: '30 giorni dalla fattura',
    finZeroCondText: 'Il finanziamento allo 0% e soggetto ai termini e condizioni generali di MF Group. Il finanziamento e gestito da MF Group e l\'approvazione e soggetta a una valutazione positiva del credito.',
    finReturnPolicy: 'Politica di reso per acquisti finanziati',
    finReturnPolicyText: 'Gli acquisti effettuati con finanziamento allo 0% sono esclusi dalla politica di reso. Si consiglia di informarsi accuratamente sul prodotto prima dell\'acquisto.',
    finFlexTerms: 'Termini flessibili',
    finFlexTermsText: 'Il nostro finanziamento allo 0% puo essere adattato alle tue esigenze. Scegli tra 6, 12, 18, 24, 36 o fino a 48 rate mensili. Il primo pagamento e dovuto 30 giorni dalla data della fattura.',
    finUsedForCredit: 'Utilizzato per la valutazione del credito. Non conservato da gold4you.',
    // Home page misc
    homeSale: 'Offerta',
    homeVerified: 'Verificato',
    homeFinFaq: 'FAQ Finanziamento',
    homeYourOrder: 'Il tuo ordine:',
  },
};

// ===== DATA =====

const REVIEWS = [
  {
    name: 'Lukas W.',
    location: 'Berlin, Deutschland',
    date: 'Mar 2026',
    rating: 5,
    product: '1g Al Etihad',
    text: 'Perfekter Einstieg. 1g Barren als erstes Investment gekauft. Kam in der Originalkarte versiegelt, Seriennummer stimmt überein. Für unter €150 kriegt man sonst nirgends echtes LBMA-Gold.',
  },
  {
    name: 'Claire D.',
    location: 'Genève, Suisse',
    date: 'Feb 2026',
    rating: 5,
    product: '5g Al Etihad',
    text: 'J\'achète régulièrement des lingots de 5g pour constituer mon épargne. gold4you est systématiquement moins cher que ma banque. Livraison en Suisse le lendemain, toujours impeccable.',
  },
  {
    name: 'Marco R.',
    location: 'Milano, Italia',
    date: 'Dec 2025',
    rating: 4,
    product: '10g Al Etihad',
    text: 'Esperienza buona nel complesso. Ho ordinato due lingotti da 10g come regali di Natale. Imballaggio discreto e sicuro. Solo 4 stelle perché manca una pagina di tracciamento — ho dovuto controllare su DHL a parte.',
  },
  {
    name: 'Elena V.',
    location: 'Madrid, España',
    date: 'Jan 2026',
    rating: 5,
    product: '20g Auriz',
    text: 'Compré el lingote de 20g para diversificar. El precio era notablemente más bajo que en dealers españoles. Llegó a Madrid en 3 días, embalaje perfecto, certificado incluido. Repetiré seguro.',
  },
  {
    name: 'Sophie M.',
    location: 'Wien, Österreich',
    date: 'Jan 2026',
    rating: 5,
    product: '25g Emirates Gold',
    text: 'Hab den Lady Fortuna für den 18. Geburtstag meiner Tochter gekauft. Wunderschöner Barren, kam am nächsten Tag an. Assay-Karte und Zertifikat waren dabei. Besseren Preis gibts in Österreich nicht.',
  },
  {
    name: 'Henrik S.',
    location: 'Stockholm, Sverige',
    date: 'Jan 2026',
    rating: 5,
    product: '50g Al Etihad',
    text: 'Första gången jag köper fysiskt guld. Var nervös över att beställa online men hela processen gick smidigt. Leverans till Sverige på 4 dagar. Guldtackan är fantastisk. Planerar redan nästa köp.',
  },
  {
    name: 'Thomas K.',
    location: 'München, Deutschland',
    date: 'Feb 2026',
    rating: 5,
    product: '100g Al Etihad',
    text: 'Dritte Bestellung bei gold4you. Der 100g Barren kam in 2 Tagen, doppelt versiegelt und in einwandfreiem Zustand. Preis war €47 günstiger als bei meiner Hausbank. Komme wieder.',
  },
  {
    name: 'Jean-Pierre L.',
    location: 'Lyon, France',
    date: 'Feb 2026',
    rating: 5,
    product: '250g Al Etihad',
    text: 'J\'ai comparé les prix chez 6 revendeurs européens avant de commander. gold4you était clairement le moins cher pour le lingot 250g. Livraison en France en exactement 3 jours ouvrés. Signature requise, ce que j\'apprécie vu la valeur.',
  },
  {
    name: 'Dimitri P.',
    location: 'Amsterdam, Nederland',
    date: 'Mar 2026',
    rating: 5,
    product: '500g Al Etihad',
    text: 'Grote aankoop, maar het hele proces verliep vlekkeloos. De 500g bar kwam verzekerd en dubbel verpakt. Prijs was substantieel lager dan bij Nederlandse dealers. Serieuze speler in de markt.',
  },
  {
    name: 'Anna B.',
    location: 'Zürich, Schweiz',
    date: 'Mar 2026',
    rating: 5,
    product: '1kg Auriz',
    text: 'Nach monatelanger Recherche den 1kg Barren bestellt. Das Aufgeld über Spot war das tiefste, das ich gefunden habe — Punkt. Barren kam in manipulationssicherer Verpackung mit passender Seriennummer. Absolut professionell.',
  },
  {
    name: 'Richard F.',
    location: 'London, UK',
    date: 'Feb 2026',
    rating: 5,
    product: '5kg Al Etihad',
    text: 'Institutional purchase for our family office. The 5kg bar arrived with full chain-of-custody documentation, armoured transport, and serial number verification. Pricing was well below what London dealers quoted. Outstanding service from start to finish.',
  },
  // Short / anonymous reviews
  { name: 'M.K.', location: 'Deutschland', date: 'Mar 2026', rating: 5, product: '1g Al Etihad', text: 'Schnelle Lieferung, guter Preis. Perfekt als Geschenk.' },
  { name: 'Anonymous', location: 'Schweiz', date: 'Feb 2026', rating: 5, product: '5g Al Etihad', text: 'Kaufe monatlich 5g. Immer zuverlässig.' },
  { name: 'P.S.', location: 'Austria', date: 'Jan 2026', rating: 5, product: '10g Al Etihad', text: 'Top Barren, schneller Versand. Preis unschlagbar.' },
  { name: 'Anonymous', location: 'Germany', date: 'Mar 2026', rating: 4, product: '10g Al Etihad', text: 'Alles bestens. Würde mir eine App wünschen.' },
  { name: 'R.B.', location: 'Belgium', date: 'Feb 2026', rating: 5, product: '20g Auriz', text: 'Great bar, fast delivery to Brussels. Will order again.' },
  { name: 'J.M.', location: 'Portugal', date: 'Mar 2026', rating: 5, product: '25g Emirates Gold', text: 'Lady Fortuna is stunning. Best price I found in Europe.' },
  { name: 'Anonymous', location: 'France', date: 'Jan 2026', rating: 5, product: '25g Emirates Gold', text: 'Excellent. Rien à redire.' },
  { name: 'K.L.', location: 'Finland', date: 'Feb 2026', rating: 5, product: '50g Al Etihad', text: 'Shipped to Helsinki in 4 days. Solid bar, great packaging.' },
  { name: 'Anonymous', location: 'Deutschland', date: 'Mar 2026', rating: 5, product: '100g Al Etihad', text: 'Dritter Kauf. Wie immer perfekt.' },
  { name: 'S.T.', location: 'Ireland', date: 'Feb 2026', rating: 5, product: '250g Al Etihad', text: 'Significant saving vs local dealers. Professional service.' },
  { name: 'Anonymous', location: 'Schweiz', date: 'Jan 2026', rating: 5, product: '500g Al Etihad', text: 'Alles top, seriöser Händler.' },
  { name: 'D.W.', location: 'Luxembourg', date: 'Mar 2026', rating: 5, product: '1kg Auriz', text: 'Competitive pricing for the kilo bar. Secure delivery. Professional.' },
  { name: 'Anonymous', location: 'UK', date: 'Feb 2026', rating: 5, product: '5kg Al Etihad', text: 'Smooth transaction. Dedicated account manager was very helpful.' },
];

const TEAM = [
  { name: 'Luca Fontana', role: 'CEO & Founder', location: 'Zurich', photo: '/team-luca.jpg' },
  { name: 'Sofia Brunner', role: 'Head of Operations', location: 'Zurich', photo: '/team-sofia.jpg' },
  { name: 'Marc Keller', role: 'Head of Trading', location: 'Lugano', photo: '/team-marc.jpg' },
  { name: 'Elena Wyss', role: 'Compliance & Legal', location: 'Zurich', photo: '/team-elena.jpg' },
  { name: 'Thomas Meier', role: 'Refinery Director', location: 'Lugano', photo: '/team-thomas.jpg' },
  { name: 'Anna Roth', role: 'Customer Relations', location: 'Zurich', photo: '/team-anna.jpg' },
];

interface Product {
  id: number;
  name: string;
  subtitle: string;
  price: number;
  salePrice: number | null;
  category: string;
  num: string;
  tag: string;
  description: string;
  weights: string[];
  gradient: string;
  textLight: boolean;
  dimensions: string;
  manufacturer: string;
  image?: string;
  grams: number;
}

interface CartItem extends Product {
  weight: string;
  qty: number;
}

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered';
type KycStatus = 'pending' | 'approved' | 'rejected';
type FinanceStatus = 'pending' | 'approved' | 'rejected' | 'active';

interface ShippingInfo {
  firstName: string; lastName: string; email: string; phone: string;
  street: string; postalCode: string; city: string; country: string;
}

interface Order {
  id: string; date: string; items: CartItem[]; shipping: ShippingInfo;
  paymentMethod: 'card' | 'bank' | 'crypto' | 'finance';
  financePlan?: number; subtotal: number; status: OrderStatus; kycRequired: boolean;
}

interface KycSubmission {
  id: string; orderId: string; date: string; firstName: string; lastName: string;
  email: string; docType: string; docNumber: string; status: KycStatus;
}

interface FinanceApplication {
  id: string; orderId: string; date: string; name: string; email: string;
  empStatus: string; monthlyIncome: string; financePlan: number; amount: number; status: FinanceStatus;
}

const STORE = { orders: 'g4y_orders', kyc: 'g4y_kyc', finance: 'g4y_finance' };
const load = <T,>(k: string): T[] => { try { return JSON.parse(localStorage.getItem(k) || '[]'); } catch { return []; } };
const save = <T,>(k: string, d: T[]) => localStorage.setItem(k, JSON.stringify(d));

const PRODUCTS: Product[] = [
  {
    id: 1, name: '1g Fine Gold', subtitle: 'Al Etihad Gold 999.9', price: 99, salePrice: null,
    category: 'investment', num: '01', tag: 'Investment', grams: 1,
    description: 'The perfect entry into physical gold. 1 gram of fine gold, LBMA certified, refined in Dubai. Sealed with original assay certificate.',
    weights: ['1g'], gradient: 'from-amber-100 via-yellow-50 to-amber-100', textLight: false,
    dimensions: '15 x 8.5 x 0.4 mm', manufacturer: 'Al Etihad Gold',
  },
  {
    id: 2, name: '5g Fine Gold', subtitle: 'Al Etihad Gold 999.9', price: 479, salePrice: null,
    category: 'investment', num: '02', tag: 'Investment', grams: 5,
    description: 'A compact gold bar for steady wealth building. 5 grams of purest gold, LBMA certified, refined in Dubai. Sealed with original assay certificate.',
    weights: ['5g'], gradient: 'from-amber-200 via-yellow-100 to-amber-200', textLight: false,
    dimensions: '23.3 x 14 x 0.83 mm', manufacturer: 'Al Etihad Gold',
  },
  {
    id: 3, name: '10g Fine Gold', subtitle: 'Al Etihad Gold 999.9', price: 949, salePrice: null,
    category: 'investment', num: '03', tag: 'Investment', grams: 10,
    description: 'Our best-selling entry bar. 10 grams of fine gold — the gold standard for private investors. LBMA certified, refined in Dubai.',
    weights: ['10g'], gradient: 'from-yellow-200 via-amber-100 to-yellow-200', textLight: false,
    dimensions: '31.5 x 18 x 1 mm', manufacturer: 'Al Etihad Gold',
    image: '/products/csm_Goldbarren_10g_VS_48c80ee318.jpg',
  },
  {
    id: 4, name: '20g Fine Gold', subtitle: 'Auriz 999.9', price: 1879, salePrice: null,
    category: 'investment', num: '04', tag: 'Investment', grams: 20,
    description: 'The balanced investment bar. 20 grams of pure gold, LBMA certified, refined in Dubai. Sealed with original assay certificate.',
    weights: ['20g'], gradient: 'from-amber-300/60 via-yellow-200/60 to-amber-300/60', textLight: false,
    dimensions: '31.5 x 18 x 2.1 mm', manufacturer: 'Auriz',
    image: '/products/csm_Goldbarren_20g_VS_91a14a218e.jpg',
  },
  {
    id: 5, name: '25g Fine Gold', subtitle: 'Emirates Gold 999.9', price: 2339, salePrice: null,
    category: 'investment', num: '05', tag: 'Investment', grams: 25,
    description: '25 grams of 999.9 fine gold — LBMA certified, refined in Dubai. One of the most popular weights for private investors.',
    weights: ['25g'], gradient: 'from-yellow-300/50 via-amber-200/50 to-yellow-300/50', textLight: false,
    dimensions: '32 x 19 x 2.6 mm', manufacturer: 'Emirates Gold',
  },
  {
    id: 6, name: '50g Fine Gold', subtitle: 'Al Etihad Gold 999.9', price: 4649, salePrice: null,
    category: 'investment', num: '06', tag: 'Investment', grams: 50,
    description: 'A substantial gold bar for serious investors. Optimal ratio between premium and investment size. LBMA certified.',
    weights: ['50g'], gradient: 'from-amber-400/40 via-yellow-300/40 to-amber-400/40', textLight: false,
    dimensions: '50 x 28 x 2.7 mm', manufacturer: 'Al Etihad Gold',
  },
  {
    id: 7, name: '100g Fine Gold', subtitle: 'Al Etihad Gold 999.9', price: 9269, salePrice: null,
    category: 'premium', num: '01', tag: 'Premium', grams: 100,
    description: 'The 100-gram bar — a serious investment piece with minimal premium over spot price. LBMA certified, refined in Dubai.',
    weights: ['100g'], gradient: 'from-stone-700 via-stone-800 to-stone-900', textLight: true,
    dimensions: '47 x 27 x 5.5 mm', manufacturer: 'Al Etihad Gold',
    image: '/products/csm_100g_Goldbarren_91bcf94783.jpg',
  },
  {
    id: 8, name: '250g Fine Gold', subtitle: 'Al Etihad Gold 999.9', price: 23099, salePrice: null,
    category: 'premium', num: '02', tag: 'Premium', grams: 250,
    description: 'A quarter kilogram of pure investment gold. LBMA certified with the lowest premiums. Ideal for substantial portfolio diversification.',
    weights: ['250g'], gradient: 'from-gray-800 via-gray-900 to-black', textLight: true,
    dimensions: '80 x 40 x 7 mm', manufacturer: 'Al Etihad Gold',
    image: '/products/csm_Goldbarren_250_0b93c7d2f3.jpg',
  },
  {
    id: 9, name: '500g Fine Gold', subtitle: 'Al Etihad Gold 999.9', price: 46099, salePrice: null,
    category: 'premium', num: '03', tag: 'Premium', grams: 500,
    description: 'Half a kilogram of gold. LBMA Good Delivery standard, refined in Dubai. Maximum value at the lowest premiums.',
    weights: ['500g'], gradient: 'from-neutral-800 via-neutral-900 to-black', textLight: true,
    dimensions: '115 x 52 x 8.5 mm', manufacturer: 'Al Etihad Gold',
    image: '/products/csm_Goldbarren_500g_e2c76d2591.jpg',
  },
  {
    id: 10, name: '1 kg Fine Gold', subtitle: 'Auriz 999.9', price: 92199, salePrice: null,
    category: 'premium', num: '04', tag: 'Premium', grams: 1000,
    description: 'The flagship — one kilogram of pure gold. LBMA certified, refined in Dubai, virtually no premium over spot. The ultimate store of wealth.',
    weights: ['1 kg'], gradient: 'from-neutral-900 via-black to-neutral-900', textLight: true,
    dimensions: '117 x 53 x 10 mm', manufacturer: 'Auriz',
  },
  {
    id: 11, name: '5 kg Fine Gold', subtitle: 'Al Etihad Gold 999.9', price: 460995, salePrice: null,
    category: 'premium', num: '05', tag: 'Premium', grams: 5000,
    description: 'Five kilograms of investment gold. Maximum weight available in our online shop. Orders above 5 kg require KYC verification and are handled via our custom request desk.',
    weights: ['5 kg'], gradient: 'from-black via-neutral-950 to-black', textLight: true,
    dimensions: '256 x 80 x 26 mm', manufacturer: 'Al Etihad Gold',
  },
];

const fmt = (n: number) => `€${n.toLocaleString('de-DE')}`;
const TROY_OZ_G = 31.1035;

const SECTIONS = [
  { key: 'all',        label: 'All Bars' },
  { key: 'investment', label: 'Investment' },
  { key: 'premium',    label: 'Premium' },
];

const SECTION_HEADERS: Record<string, { sub: string; title: string }> = {
  all:        { sub: 'All Gold Bars', title: 'Gold Bars' },
  investment: { sub: 'Gold Bars — 1g to 50g', title: 'Investment' },
  premium:    { sub: 'Premium — 100g to 1 kg', title: 'Premium' },
};

// ===== MAIN COMPONENT =====
export default function Gold4You() {
  const [section, setSection] = useState('all');
  const [view, setView] = useState<'home' | 'shop' | 'about' | 'financing' | 'profile' | 'checkout' | 'admin' | 'imprint' | 'privacy' | 'terms' | 'shippingInfo'>('home');
  const [financeStep, setFinanceStep] = useState<'info' | 'apply' | 'submitted'>('info');
  const [finReqId, setFinReqId] = useState('');
  const [detail, setDetail] = useState<Product | null>(null);
  const [weight, setWeight] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [payMethod, setPayMethod] = useState<'card' | 'bank' | 'crypto' | 'token' | 'finance'>('card');
  const [showKyc, setShowKyc] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({ examples: true, countries: true, requirements: true });

  // Checkout
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3 | 4>(1);
  const [shipInfo, setShipInfo] = useState<ShippingInfo>({ firstName: '', lastName: '', email: '', phone: '', street: '', postalCode: '', city: '', country: '' });
  const [coPay, setCoPay] = useState<'card' | 'bank' | 'crypto' | 'finance'>('card');
  const [coFinPlan, setCoFinPlan] = useState(6);
  const [coEmp, setCoEmp] = useState({ empStatus: '', monthlyIncome: '' });
  const [lastOrderId, setLastOrderId] = useState('');

  // Admin / persistence
  const [orders, setOrders] = useState<Order[]>(() => load<Order>(STORE.orders));
  const [kycSubs, setKycSubs] = useState<KycSubmission[]>(() => load<KycSubmission>(STORE.kyc));
  const [finApps, setFinApps] = useState<FinanceApplication[]>(() => load<FinanceApplication>(STORE.finance));
  const [adminTab, setAdminTab] = useState<'dashboard' | 'orders' | 'kyc' | 'financing'>('dashboard');
  const [kycForm, setKycForm] = useState({ firstName: '', lastName: '', email: '', phone: '', dob: '', nationality: '', address: '', docType: '', docNumber: '' });
  const [detailFold, setDetailFold] = useState<Record<string, boolean>>({ protection: true, reviews: true, company: true });
  const [financePlan, setFinancePlan] = useState(6);
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem('g4y_lang') as Lang) || 'en');
  const [showLangPicker, setShowLangPicker] = useState(false);
  const [showWelcome, setShowWelcome] = useState(() => !localStorage.getItem('g4y_lang'));

  // ── Chat agent ──
  interface ChatMsg { role: 'user' | 'agent'; text: string }
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsgs, setChatMsgs] = useState<ChatMsg[]>([
    { role: 'agent', text: 'Hi! Ich bin Sofia von gold4you. Ich helfe dir gerne bei Fragen zu Produkten, Preisen, Finanzierung oder Lieferung. Was kann ich für dich tun?' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatTyping, setChatTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMsgs, chatTyping]);

  const chatRespond = (msg: string) => {
    const q = msg.toLowerCase();
    // Smart responses based on keywords
    if (q.match(/prei|price|cost|how much|wieviel|kosten/)) {
      const spot = spotRef.current ? `€${Math.round(spotRef.current / TROY_OZ_G)}/g` : '';
      return `All our bars are priced at spot −2%. ${spot ? `Current spot: ${spot}.` : ''} Prices update every 15 minutes based on live LBMA rates. Which bar size are you interested in?`;
    }
    if (q.match(/financ|finanz|raten|installment|monthly|monatl/)) {
      return 'We offer financing from 3 to 24 months. Credit check takes ~2 minutes, your gold ships the same day after approval. Zero down payment. gold4you manages all invoicing directly — no third-party redirect. Want me to walk you through an example?';
    }
    if (q.match(/deliver|ship|versand|lieferung|shipping/)) {
      return 'We ship same-day via insured courier (Swiss Post / DHL Express). Signature required. Full tracking provided. Delivery to 38 countries. Typical delivery: 1–3 business days EU, 3–5 days international.';
    }
    if (q.match(/kyc|verif|ausweis|identity|passport/)) {
      return 'KYC verification is required for orders above 5 kg (Swiss AML regulations). You\'ll need a valid ID (passport or national ID), proof of address, and basic personal details. The process takes about 5 minutes.';
    }
    if (q.match(/custom|10.?kg|wholesale|großhandel|bulk|institutional/)) {
      return 'For orders 10 kg+, we offer negotiated below-spot pricing, a dedicated account manager, allocated vault storage (Zürich/London/Singapore), and white-glove armoured delivery. Call us at +41 44 520 10 00 or I can connect you with our institutional desk.';
    }
    if (q.match(/safe|sicher|trust|scam|legit|echt/)) {
      return 'gold4you AG is a Swiss-registered company (CHE-123.456.789), FINMA registered, VQF member. All bars are LBMA certified from accredited refineries in Dubai (Al Etihad Gold, Auriz, Emirates Gold). We\'ve sold 14,200+ bars since 2019 with a 4.87/5 rating.';
    }
    if (q.match(/vat|mwst|tax|steuer/)) {
      return 'Investment gold is VAT-exempt (Art. 107 MwStG). You pay exactly the displayed price — no hidden taxes or fees.';
    }
    if (q.match(/return|rückgabe|refund|money.?back|garantie/)) {
      return 'We offer a 14-day money-back guarantee on all purchases. The gold must be returned in its original sealed packaging. Refund is processed within 3 business days.';
    }
    if (q.match(/storage|lager|vault|tresor/)) {
      return 'We offer allocated storage in secure vaults in Zürich, London, and Singapore for institutional clients (10 kg+). Fully insured, audited quarterly. For smaller holdings, we recommend home safes or bank deposit boxes.';
    }
    if (q.match(/call|anruf|phone|telefon|contact|kontakt|whatsapp/)) {
      return 'You can reach us at:\n+41 44 520 10 00 (Phone)\nWhatsApp: wa.me/41795201000\ninfo@gold4you.com\n\nMon–Fri 09:00–18:00 CET · Sat 10:00–14:00';
    }
    if (q.match(/hello|hi|hey|hallo|guten|servus|grüezi/)) {
      return 'Hello! Welcome to gold4you. How can I assist you today? I can help with pricing, products, financing, delivery, or any other questions.';
    }
    return 'Great question! For the most accurate answer, I\'d recommend speaking with our team directly. You can call us at +41 44 520 10 00, reach us on WhatsApp, or email info@gold4you.com. Is there anything specific about our gold bars, pricing, or financing I can help with?';
  };

  const sendChat = () => {
    const msg = chatInput.trim();
    if (!msg) return;
    setChatMsgs(prev => [...prev, { role: 'user', text: msg }]);
    setChatInput('');
    setChatTyping(true);
    setTimeout(() => {
      setChatMsgs(prev => [...prev, { role: 'agent', text: chatRespond(msg) }]);
      setChatTyping(false);
    }, 800 + Math.random() * 700);
  };

  const t = { ...T.en, ...T[lang] };

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem('g4y_lang', l);
    setShowLangPicker(false);
    setShowWelcome(false);
  };

  useEffect(() => {
    if (cartOpen || showWelcome || showKyc) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen, showWelcome, showKyc]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [detail, view]);

  // ── Live gold spot price ──
  const REFRESH_MS = 15 * 60 * 1000;
  const [spotOz, setSpotOz] = useState<number | null>(null);
  const [spotLoading, setSpotLoading] = useState(true);
  const [nextUpdate, setNextUpdate] = useState<number>(0);
  const [countdown, setCountdown] = useState('15:00');
  const spotRef = useRef<number | null>(null);

  const fetchSpot = useCallback(async () => {
    setSpotLoading(true);
    try {
      // Proxied via Vite → Swissquote XAU/EUR feed
      const res = await fetch('/api/spot');
      if (res.ok) {
        const data = await res.json();
        const prices = data?.[0]?.spreadProfilePrices;
        const std = prices?.find((p: { spreadProfile: string }) => p.spreadProfile === 'standard');
        const bid = std?.bid ?? prices?.[0]?.bid;
        if (bid && typeof bid === 'number' && bid > 500) {
          spotRef.current = bid;
          setSpotOz(bid);
          setNextUpdate(Date.now() + REFRESH_MS);
          setSpotLoading(false);
          return;
        }
      }
    } catch { /* fallback */ }
    setSpotLoading(false);
  }, []);

  // Fetch on mount + every 15 min
  useEffect(() => {
    fetchSpot();
    const iv = setInterval(fetchSpot, REFRESH_MS);
    return () => clearInterval(iv);
  }, [fetchSpot]);

  // Countdown — ticks every second
  useEffect(() => {
    if (!nextUpdate) return;
    const tick = () => {
      const diff = Math.max(0, nextUpdate - Date.now());
      const m = Math.floor(diff / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(`${m}:${s.toString().padStart(2, '0')}`);
      if (diff <= 0) fetchSpot();
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, [nextUpdate, fetchSpot]);

  /** Price = grams × (spot per gram) × 0.98. Fallback to static. */
  const livePrice = (p: Product) => {
    if (spotRef.current) {
      return Math.round(p.grams * (spotRef.current / TROY_OZ_G) * 0.98);
    }
    return Math.round(p.price * 0.98);
  };
  const isLive = !!spotOz;

  const products = section === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === section);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + livePrice(i) * i.qty, 0);

  const addToCart = (product: Product, selectedWeight: string) => {
    if (!selectedWeight) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id && i.weight === selectedWeight);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && i.weight === selectedWeight ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, weight: selectedWeight, qty: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: number, w: string) =>
    setCart((prev) => prev.filter((i) => !(i.id === id && i.weight === w)));

  const updateQty = (id: number, w: string, delta: number) =>
    setCart((prev) =>
      prev
        .map((i) => (i.id === id && i.weight === w ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    );

  const relatedProducts = detail
    ? PRODUCTS.filter(p => p.id !== detail.id && p.category === detail.category).slice(0, 3)
    : [];

  // Weight parser: "1g" → 1, "5 kg" → 5000, etc.
  const parseGrams = (w: string) => {
    const m = w.match(/([\d.]+)\s*(kg|g)/i);
    if (!m) return 0;
    return parseFloat(m[1]) * (m[2].toLowerCase() === 'kg' ? 1000 : 1);
  };
  const cartWeightG = cart.reduce((s, i) => s + parseGrams(i.weight) * i.qty, 0);
  const needsKyc = cartWeightG > 5000; // >5kg triggers KYC

  const genRef = (prefix: string) => {
    const d = new Date();
    const seq = Math.floor(Math.random() * 9000) + 1000;
    return `${prefix}-${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}-${seq}`;
  };

  const placeOrder = () => {
    const oid = genRef('G4Y');
    const o: Order = {
      id: oid, date: new Date().toISOString(), items: [...cart], shipping: shipInfo,
      paymentMethod: coPay, financePlan: coPay === 'finance' ? coFinPlan : undefined,
      subtotal: cartTotal, status: 'pending', kycRequired: needsKyc,
    };
    const uo = [...orders, o]; setOrders(uo); save(STORE.orders, uo);
    if (coPay === 'finance') {
      const fa: FinanceApplication = {
        id: genRef('FIN'), orderId: oid, date: new Date().toISOString(),
        name: `${shipInfo.firstName} ${shipInfo.lastName}`, email: shipInfo.email,
        empStatus: coEmp.empStatus, monthlyIncome: coEmp.monthlyIncome,
        financePlan: coFinPlan, amount: cartTotal, status: 'pending',
      };
      const uf = [...finApps, fa]; setFinApps(uf); save(STORE.finance, uf);
    }
    setLastOrderId(oid); setCart([]); setCheckoutStep(4);
  };

  const updateOrderStatus = (id: string, s: OrderStatus) => {
    const u = orders.map(o => o.id === id ? { ...o, status: s } : o); setOrders(u); save(STORE.orders, u);
  };
  const updateKycStatus = (id: string, s: KycStatus) => {
    const u = kycSubs.map(k => k.id === id ? { ...k, status: s } : k); setKycSubs(u); save(STORE.kyc, u);
  };
  const updateFinStatus = (id: string, s: FinanceStatus) => {
    const u = finApps.map(f => f.id === id ? { ...f, status: s } : f); setFinApps(u); save(STORE.finance, u);
  };

  const startCheckout = () => {
    setCartOpen(false); setCheckoutStep(1); setView('checkout');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const shipField = (k: keyof ShippingInfo, v: string) => setShipInfo(p => ({ ...p, [k]: v }));
  const inputCls = 'w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gray-400 transition-colors';

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
      translate="no"
    >

      {/* ─────────────── HEADER ─────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl" aria-label="Main navigation">
        <div className="max-w-6xl mx-auto h-14 flex items-center justify-between px-5 md:px-8">
          {/* Left — logo + nav */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => { setDetail(null); setView('home'); setSection('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center gap-2.5 group"
              aria-label="gold4you home"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                <span className="text-white text-[9px] font-bold leading-none">Au</span>
              </div>
              <span className="text-sm font-semibold text-gray-900 tracking-tight">
                gold4you
              </span>
            </button>
            <nav className="hidden md:flex items-center gap-1">
              {([
                { key: 'shop', label: t.footerShop },
                { key: 'financing', label: t.financing },
                { key: 'about', label: t.about },
              ] as const).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => { setView(key as typeof view); setDetail(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className={`px-3.5 py-2 rounded-xl text-[13px] transition-all ${
                    view === key
                      ? 'text-gray-900 font-medium bg-gray-100'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => { document.getElementById('custom-orders')?.scrollIntoView({ behavior: 'smooth' }); setView('home'); }}
                className="px-3.5 py-2 rounded-xl text-[13px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-all"
              >
                Custom
              </button>
            </nav>
          </div>

          {/* Right — call + search + globe + profile + cart */}
          <div className="flex items-center gap-1">
            {/* Phone number */}
            <a
              href="tel:+41445551234"
              className="hidden md:flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-gray-900 px-3.5 py-2 rounded-xl hover:bg-gray-50 transition-all"
            >
              <Phone size={13} />
              +41 44 555 12 34
            </a>
            {/* Search */}
            <button
              onClick={() => { setView('shop'); setSection('all'); setDetail(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-all"
              aria-label="Search"
            >
              <Search size={17} strokeWidth={1.8} className="text-gray-600" />
            </button>
            {/* Language picker */}
            <div className="relative">
              <button
                onClick={() => setShowLangPicker(!showLangPicker)}
                className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-all"
                aria-label="Change language"
              >
                <Globe size={17} strokeWidth={1.8} className="text-gray-600" />
              </button>
              {showLangPicker && (
                <>
                  <div className="fixed inset-0 z-[90]" onClick={() => setShowLangPicker(false)} />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-[100] overflow-hidden">
                    {LANGS.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => changeLang(l.code)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${lang === l.code ? 'bg-amber-50 font-medium text-amber-700' : ''}`}
                      >
                        <span className="text-lg">{l.flag}</span>
                        <span className="text-gray-700">{l.label}</span>
                        {lang === l.code && <span className="ml-auto text-amber-500">✓</span>}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            {/* Profile */}
            <button
              onClick={() => { setView('profile'); setDetail(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-all"
              aria-label={t.profile}
            >
              <User size={17} strokeWidth={1.8} className="text-gray-600" />
            </button>
            {/* Cart */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100 transition-all"
              aria-label={`Cart with ${cartCount} items`}
            >
              <ShoppingBag size={17} strokeWidth={1.8} className="text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-white text-[9px] font-semibold rounded-full flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ─────────────── MAIN LAYOUT ─────────────── */}
      <div className="pt-14 min-h-screen">
        <main className="max-w-6xl mx-auto" role="main">


          {/* ============= CHECKOUT ============= */}
          {view === 'checkout' ? (
            <div className="px-4 md:px-6 py-8 max-w-3xl mx-auto">
              {/* Progress steps */}
              <div className="flex items-center gap-2 mb-10">
                {([t.coShipping, t.coPayment, t.coReviewOrder, t.coOrderNo] as const).map((label, i) => (
                  <div key={label} className="flex items-center gap-2 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 ${
                      checkoutStep > i + 1 ? 'bg-green-500 text-white' : checkoutStep === i + 1 ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'
                    }`}>{checkoutStep > i + 1 ? '✓' : i + 1}</div>
                    <span className={`text-xs hidden md:inline ${checkoutStep === i + 1 ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>{label}</span>
                    {i < 3 && <div className={`flex-1 h-px ${checkoutStep > i + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />}
                  </div>
                ))}
              </div>

              {/* Step 1: Shipping */}
              {checkoutStep === 1 && (
                <div>
                  <h1 className="text-2xl font-light text-gray-900 mb-1">{t.coShipping}</h1>
                  <p className="text-sm text-gray-500 mb-8">{t.coShippingSub}</p>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1.5 block">{t.firstName} *</label>
                        <input type="text" value={shipInfo.firstName} onChange={e => shipField('firstName', e.target.value)} className={inputCls} placeholder="Max" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1.5 block">{t.lastName} *</label>
                        <input type="text" value={shipInfo.lastName} onChange={e => shipField('lastName', e.target.value)} className={inputCls} placeholder="Muster" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1.5 block">{t.email} *</label>
                      <input type="email" value={shipInfo.email} onChange={e => shipField('email', e.target.value)} className={inputCls} placeholder="max@example.com" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1.5 block">{t.phone} *</label>
                      <input type="tel" value={shipInfo.phone} onChange={e => shipField('phone', e.target.value)} className={inputCls} placeholder="+41 79 000 00 00" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 mb-1.5 block">{t.street} *</label>
                      <input type="text" value={shipInfo.street} onChange={e => shipField('street', e.target.value)} className={inputCls} placeholder="Bahnhofstrasse 1" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 mb-1.5 block">{t.postalCode} *</label>
                        <input type="text" value={shipInfo.postalCode} onChange={e => shipField('postalCode', e.target.value)} className={inputCls} placeholder="8001" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1.5 block">{t.city} *</label>
                        <input type="text" value={shipInfo.city} onChange={e => shipField('city', e.target.value)} className={inputCls} placeholder="Zürich" />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 mb-1.5 block">{t.country} *</label>
                        <select value={shipInfo.country} onChange={e => shipField('country', e.target.value)} className={inputCls}>
                          <option value="">{t.coSelectDots}</option>
                          {['Switzerland','Germany','Austria','France','Italy','Spain','Netherlands','Belgium','Portugal','Luxembourg','Sweden','Finland'].map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-8">
                    <button onClick={() => { setView('shop'); window.scrollTo({ top: 0 }); }} className="text-sm text-gray-400 hover:text-gray-900 flex items-center gap-2 transition-colors">
                      <ArrowLeft size={14} /> {t.backToShop}
                    </button>
                    <button
                      onClick={() => { if (shipInfo.firstName && shipInfo.lastName && shipInfo.email && shipInfo.phone && shipInfo.street && shipInfo.postalCode && shipInfo.city && shipInfo.country) setCheckoutStep(2); }}
                      className="bg-black text-white text-sm font-semibold px-8 py-3.5 rounded-2xl hover:bg-gray-900 active:scale-[0.98] transition-all flex items-center gap-2"
                    >
                      {t.coContinuePayment} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment */}
              {checkoutStep === 2 && (
                <div>
                  <h1 className="text-2xl font-light text-gray-900 mb-1">{t.coPaymentMethod}</h1>
                  <p className="text-sm text-gray-500 mb-8">{t.coPaymentSub}</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {([
                      { key: 'card' as const, label: t.coCreditDebit, sub: t.coCreditDebitSub, icon: <CreditCard size={18} /> },
                      { key: 'bank' as const, label: t.coBankTransfer, sub: t.coBankTransferSub, icon: <Shield size={18} /> },
                      { key: 'crypto' as const, label: t.coCrypto, sub: t.coCryptoSub, icon: <Globe size={18} /> },
                      { key: 'finance' as const, label: t.financing, sub: t.coFinancingSub, icon: <Clock size={18} /> },
                    ]).map(({ key, label, sub, icon }) => (
                      <button
                        key={key}
                        onClick={() => setCoPay(key)}
                        className={`text-left p-5 rounded-2xl border-2 transition-all ${coPay === key ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-200'}`}
                      >
                        <div className={`mb-3 ${coPay === key ? 'text-black' : 'text-gray-400'}`}>{icon}</div>
                        <p className="text-sm font-medium text-gray-900">{label}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                      </button>
                    ))}
                  </div>

                  {coPay === 'card' && (
                    <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                      <div>
                        <label className="text-xs text-gray-500 mb-1.5 block">{t.coCardNumber}</label>
                        <input type="text" className={inputCls} placeholder="4242 4242 4242 4242" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-gray-500 mb-1.5 block">{t.coExpiry}</label>
                          <input type="text" className={inputCls} placeholder="MM / YY" />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 mb-1.5 block">{t.coCvc}</label>
                          <input type="text" className={inputCls} placeholder="123" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-gray-400 tracking-wide uppercase">{t.coAccepted}</span>
                          <span className="text-xs font-bold text-[#1a1f71]">VISA</span>
                          <span className="text-xs font-bold text-[#eb001b]">Mastercard</span>
                          <span className="text-xs font-bold text-[#006fcf]">AMEX</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Shield size={10} className="text-green-500" />
                          <span className="text-[10px] text-gray-400">{t.co3dSecure}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {coPay === 'bank' && (
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <p className="text-sm text-gray-700 mb-3">{t.coBankInfo}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between"><span className="text-gray-500">{t.coBankLabel}</span><span className="text-gray-900 font-medium">Zürcher Kantonalbank</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">IBAN</span><span className="text-gray-900 font-medium font-mono text-xs">CH93 0070 0110 0000 0000 0</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">BIC</span><span className="text-gray-900 font-medium font-mono text-xs">ZKBKCHZZ80A</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">{t.coRef}</span><span className="text-gray-900 font-medium">{t.coOrderNumber}</span></div>
                      </div>
                      <p className="text-xs text-gray-400 mt-3">{t.coBankShipNote}</p>
                    </div>
                  )}

                  {coPay === 'crypto' && (
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <p className="text-sm text-gray-700 mb-4">{t.coCryptoSelect}</p>
                      <div className="flex gap-2">
                        {['BTC', 'ETH', 'USDT', 'USDC'].map(c => (
                          <button key={c} className="px-4 py-2 rounded-xl border border-gray-200 text-sm hover:bg-white transition-colors">{c}</button>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-3">{t.coCryptoNote}</p>
                    </div>
                  )}

                  {coPay === 'finance' && (
                    <div className="bg-gray-50 rounded-2xl p-6 space-y-4">
                      <div>
                        <label className="text-xs text-gray-500 mb-2 block">{t.coFinTerm}</label>
                        <div className="flex gap-2">
                          {[6, 12, 18, 24, 36, 48].map(m => (
                            <button key={m} onClick={() => setCoFinPlan(m)} className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${coFinPlan === m ? 'bg-black text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-gray-300'}`}>
                              {m} {t.coMo}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-gray-500 mb-1.5 block">{t.coEmpStatusLabel}</label>
                          <select value={coEmp.empStatus} onChange={e => setCoEmp(p => ({ ...p, empStatus: e.target.value }))} className={inputCls}>
                            <option value="">{t.coSelectDots}</option>
                            <option value="employed">{t.employed}</option>
                            <option value="self-employed">{t.selfEmployed}</option>
                            <option value="retired">{t.retired}</option>
                            <option value="student">{t.student}</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 mb-1.5 block">{t.coMonthlyIncomeLabel}</label>
                          <select value={coEmp.monthlyIncome} onChange={e => setCoEmp(p => ({ ...p, monthlyIncome: e.target.value }))} className={inputCls}>
                            <option value="">{t.coSelectDots}</option>
                            <option value="<3000">{t.coIncomeUnder3k}</option>
                            <option value="3000-5000">{t.coIncome3to5k}</option>
                            <option value="5000-10000">{t.coIncome5to10k}</option>
                            <option value=">10000">{t.coIncomeOver10k}</option>
                          </select>
                        </div>
                      </div>
                      {(() => {
                        const rate = 0; // 0% financing
                        const total = Math.round(cartTotal * (1 + rate));
                        const monthly = Math.round(total / coFinPlan);
                        return (
                          <div className="bg-white rounded-xl p-4 border border-gray-100">
                            <div className="flex justify-between text-sm mb-1"><span className="text-gray-500">{t.monthlyPayment}</span><span className="font-semibold text-gray-900">{fmt(monthly)}/mo</span></div>
                            <div className="flex justify-between text-xs"><span className="text-gray-400">Total ({coFinPlan} months, {(rate * 100).toFixed(1)}% APR)</span><span className="text-gray-500">{fmt(total)}</span></div>
                          </div>
                        );
                      })()}
                      <p className="text-[10px] text-gray-400">{t.coCreditNote}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-8">
                    <button onClick={() => setCheckoutStep(1)} className="text-sm text-gray-400 hover:text-gray-900 flex items-center gap-2 transition-colors">
                      <ArrowLeft size={14} /> {t.coBack}
                    </button>
                    <button
                      onClick={() => { if (coPay !== 'finance' || (coEmp.empStatus && coEmp.monthlyIncome)) setCheckoutStep(3); }}
                      className="bg-black text-white text-sm font-semibold px-8 py-3.5 rounded-2xl hover:bg-gray-900 active:scale-[0.98] transition-all flex items-center gap-2"
                    >
                      {t.coReviewOrder} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {checkoutStep === 3 && (
                <div>
                  <h1 className="text-2xl font-light text-gray-900 mb-1">{t.coReviewTitle}</h1>
                  <p className="text-sm text-gray-500 mb-8">{t.coReviewSub}</p>

                  {/* Items */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-4">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">{t.coItems} ({cart.length})</h3>
                    <div className="space-y-3">
                      {cart.map(item => (
                        <div key={`${item.id}-${item.weight}`} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center`}>
                              {item.image ? <img src={item.image} alt="" className="w-10 h-10 object-contain" /> : <span className="text-[8px] text-gray-400">Au</span>}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.name}</p>
                              <p className="text-xs text-gray-400">{item.weight} × {item.qty}</p>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-gray-900">{fmt(livePrice(item) * item.qty)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between">
                      <span className="text-sm text-gray-500">{t.coSubtotal}</span>
                      <span className="text-lg font-semibold text-gray-900">{fmt(cartTotal)}</span>
                    </div>
                  </div>

                  {/* Shipping */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{t.coShipAddress}</h3>
                      <p className="text-sm text-gray-900">{shipInfo.firstName} {shipInfo.lastName}</p>
                      <p className="text-sm text-gray-500">{shipInfo.street}</p>
                      <p className="text-sm text-gray-500">{shipInfo.postalCode} {shipInfo.city}</p>
                      <p className="text-sm text-gray-500">{shipInfo.country}</p>
                      <p className="text-sm text-gray-500 mt-2">{shipInfo.email}</p>
                      <p className="text-sm text-gray-500">{shipInfo.phone}</p>
                    </div>
                    <div className="bg-gray-50 rounded-2xl p-6">
                      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{t.coPayment}</h3>
                      <p className="text-sm font-medium text-gray-900 capitalize">{coPay === 'finance' ? `${t.financing} — ${coFinPlan} ${t.months}` : coPay === 'card' ? t.coCreditDebit : coPay === 'bank' ? t.coBankTransfer : t.coCrypto}</p>
                      {coPay === 'finance' && (() => {
                        const rate = 0; // 0% financing
                        const total = Math.round(cartTotal * (1 + rate));
                        const monthly = Math.round(total / coFinPlan);
                        return (
                          <div className="mt-3 space-y-1">
                            <p className="text-sm text-gray-500">{fmt(monthly)}/month × {coFinPlan}</p>
                            <p className="text-xs text-gray-400">Total: {fmt(total)} ({(rate * 100).toFixed(1)}% APR)</p>
                          </div>
                        );
                      })()}
                      <p className="text-xs text-gray-400 mt-3">{t.coVatExempt}</p>
                    </div>
                  </div>

                  {/* Delivery info */}
                  <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-6 flex items-start gap-3">
                    <Truck size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-green-800">{t.coInsuredDelivery}</p>
                      <p className="text-xs text-green-600">{t.coInsuredDeliverySub}</p>
                    </div>
                  </div>

                  {coPay === 'card' && (
                    <div className="flex items-center gap-2 mb-4">
                      <Shield size={12} className="text-gray-400" />
                      <p className="text-[10px] text-gray-400">{t.co3dRedirect}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <button onClick={() => setCheckoutStep(2)} className="text-sm text-gray-400 hover:text-gray-900 flex items-center gap-2 transition-colors">
                      <ArrowLeft size={14} /> {t.coBack}
                    </button>
                    <button
                      onClick={placeOrder}
                      className="bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold px-8 py-3.5 rounded-2xl active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
                    >
                      {coPay === 'card' ? t.coPay : t.coPlaceOrder} — {fmt(cartTotal)} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {checkoutStep === 4 && (
                <div className="py-12 max-w-lg mx-auto">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BadgeCheck size={32} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-light text-gray-900 mb-2">
                      {coPay === 'finance' ? t.coFinReqSubmitted : t.coPaySuccess}
                    </h1>
                    <p className="text-sm text-gray-500 mb-4">{t.coThankYou}</p>
                  </div>

                  {/* Order reference */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">{t.coOrderNo}</span>
                      <span className="text-sm font-mono font-semibold text-gray-900">{lastOrderId}</span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">{t.coAmount}</span>
                      <span className="text-sm font-semibold text-gray-900">{fmt(orders[orders.length - 1]?.subtotal ?? 0)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">{t.coPayment}</span>
                      <span className="text-sm text-gray-700 capitalize">{coPay === 'finance' ? `${t.financing} ${coFinPlan} ${t.months}` : coPay === 'card' ? t.coCard3d : coPay === 'bank' ? t.coBankTransfer : t.coCrypto}</span>
                    </div>
                  </div>

                  {/* Payment-specific message */}
                  <div className={`rounded-2xl p-5 mb-4 flex items-start gap-3 ${coPay === 'finance' ? 'bg-amber-50 border border-amber-100' : coPay === 'bank' ? 'bg-blue-50 border border-blue-100' : 'bg-green-50 border border-green-100'}`}>
                    {coPay === 'finance' ? <Clock size={16} className="text-amber-600 mt-0.5 flex-shrink-0" /> :
                     coPay === 'bank' ? <Shield size={16} className="text-blue-600 mt-0.5 flex-shrink-0" /> :
                     <BadgeCheck size={16} className="text-green-600 mt-0.5 flex-shrink-0" />}
                    <div>
                      {coPay === 'card' && (
                        <>
                          <p className="text-sm font-medium text-green-800">{t.co3dProcessed}</p>
                          <p className="text-xs text-green-600 mt-1">{t.co3dProcessedSub}</p>
                        </>
                      )}
                      {coPay === 'bank' && (
                        <>
                          <p className="text-sm font-medium text-blue-800">{t.coAwaitTransfer}</p>
                          <p className="text-xs text-blue-600 mt-1">{t.coAwaitTransferSub}</p>
                          <div className="mt-3 space-y-1 text-xs text-blue-700">
                            <p>IBAN: CH93 0070 0110 0000 0000 0</p>
                            <p>BIC: ZKBKCHZZ80A</p>
                            <p>{t.coReference}: {lastOrderId}</p>
                          </div>
                        </>
                      )}
                      {coPay === 'crypto' && (
                        <>
                          <p className="text-sm font-medium text-green-800">{t.coWalletSent}</p>
                          <p className="text-xs text-green-600 mt-1">{t.coWalletSentSub}</p>
                        </>
                      )}
                      {coPay === 'finance' && (
                        <>
                          <p className="text-sm font-medium text-amber-800">{t.coFinReview}</p>
                          <p className="text-xs text-amber-700 mt-1">{t.coFinReviewSub}</p>
                        </>
                      )}
                    </div>
                  </div>

                  {/* What happens next */}
                  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">{t.coWhatsNext}</h3>
                    <div className="space-y-3">
                      {(coPay === 'finance' ? [
                        { s: '1', t: t.coCreditCheckStep, d: t.coCreditCheckStepSub },
                        { s: '2', t: t.coApprovalStep, d: t.coApprovalStepSub },
                        { s: '3', t: t.coGoldShipsStep, d: t.coGoldShipsStepSub },
                        { s: '4', t: t.coMonthlyInvStep, d: t.coMonthlyInvStepSub },
                      ] : [
                        { s: '1', t: t.coConfirmEmail, d: t.coConfirmEmailSub },
                        { s: '2', t: t.coQualityCheck, d: t.coQualityCheckSub },
                        { s: '3', t: t.coInsuredShipStep, d: t.coInsuredShipStepSub },
                        { s: '4', t: t.coDeliveryStep, d: t.coDeliveryStepSub },
                      ]).map(({ s, t: title, d }) => (
                        <div key={s} className="flex gap-3">
                          <div className="w-6 h-6 rounded-lg bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-500 flex-shrink-0">{s}</div>
                          <div><p className="text-sm font-medium text-gray-900">{title}</p><p className="text-xs text-gray-400">{d}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Security note for card */}
                  {coPay === 'card' && (
                    <div className="flex items-center gap-2 justify-center mb-6">
                      <Shield size={12} className="text-gray-400" />
                      <p className="text-[10px] text-gray-400">{t.co3dNote}</p>
                    </div>
                  )}

                  <div className="text-center">
                    <button
                      onClick={() => { setCheckoutStep(1); setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="bg-black text-white text-sm font-semibold px-8 py-3.5 rounded-2xl hover:bg-gray-900 active:scale-[0.98] transition-all"
                    >
                      {t.coContinueShopping}
                    </button>
                  </div>
                </div>
              )}
            </div>

          ) : view === 'admin' ? (
            /* ============= ADMIN SECTION ============= */
            <div className="px-4 md:px-6 py-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-2xl font-light text-gray-900">{t.adminTitle}</h1>
                  <p className="text-sm text-gray-500">{t.adminInternal}</p>
                </div>
                <button onClick={() => { setView('home'); window.scrollTo({ top: 0 }); }} className="text-sm text-gray-400 hover:text-gray-900 flex items-center gap-2 transition-colors">
                  <ArrowLeft size={14} /> {t.backToShop}
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 mb-8 bg-gray-100 rounded-2xl p-1 w-fit">
                {(['dashboard', 'orders', 'kyc', 'financing'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setAdminTab(tab)}
                    className={`px-5 py-2.5 rounded-xl text-sm transition-all capitalize ${adminTab === tab ? 'bg-white text-gray-900 font-medium shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    {tab === 'kyc' ? 'KYC' : tab}
                  </button>
                ))}
              </div>

              {/* Dashboard */}
              {adminTab === 'dashboard' && (
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      { label: 'Total Orders', value: orders.length, color: 'bg-blue-50 text-blue-700' },
                      { label: 'Revenue', value: fmt(orders.reduce((s, o) => s + o.subtotal, 0)), color: 'bg-green-50 text-green-700' },
                      { label: 'Pending KYC', value: kycSubs.filter(k => k.status === 'pending').length, color: 'bg-amber-50 text-amber-700' },
                      { label: 'Pending Finance', value: finApps.filter(f => f.status === 'pending').length, color: 'bg-purple-50 text-purple-700' },
                    ].map(({ label, value, color }) => (
                      <div key={label} className="bg-gray-50 rounded-2xl p-6">
                        <p className="text-xs text-gray-400 mb-1">{label}</p>
                        <p className={`text-2xl font-light ${color.split(' ')[1]}`}>{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">{t.adminRecentOrders}</h3>
                    {orders.length === 0 ? (
                      <p className="text-sm text-gray-400">{t.adminNoOrders}</p>
                    ) : (
                      <div className="space-y-2">
                        {orders.slice(-5).reverse().map(o => (
                          <div key={o.id} className="flex items-center justify-between bg-white rounded-xl px-4 py-3">
                            <div>
                              <p className="text-sm font-mono text-gray-900">{o.id}</p>
                              <p className="text-xs text-gray-400">{o.shipping.firstName} {o.shipping.lastName} · {new Date(o.date).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm font-medium text-gray-900">{fmt(o.subtotal)}</span>
                              <span className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-lg ${
                                o.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                                o.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                                o.status === 'shipped' ? 'bg-purple-100 text-purple-700' :
                                'bg-green-100 text-green-700'
                              }`}>{o.status}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Orders */}
              {adminTab === 'orders' && (
                <div>
                  {orders.length === 0 ? (
                    <div className="text-center py-20"><p className="text-gray-400">No orders yet.</p></div>
                  ) : (
                    <div className="space-y-3">
                      {orders.slice().reverse().map(o => (
                        <div key={o.id} className="bg-gray-50 rounded-2xl p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <p className="text-sm font-mono font-medium text-gray-900">{o.id}</p>
                              <p className="text-xs text-gray-400">{new Date(o.date).toLocaleString()} · {o.items.length} item(s)</p>
                              <p className="text-xs text-gray-500 mt-1">{o.shipping.firstName} {o.shipping.lastName} — {o.shipping.street}, {o.shipping.postalCode} {o.shipping.city}, {o.shipping.country}</p>
                              <p className="text-xs text-gray-400">{o.shipping.email} · {o.shipping.phone}</p>
                              <p className="text-xs text-gray-500 mt-1 capitalize">Payment: {o.paymentMethod}{o.financePlan ? ` (${o.financePlan} months)` : ''}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-medium text-gray-900">{fmt(o.subtotal)}</p>
                              <select
                                value={o.status}
                                onChange={e => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                                className="mt-2 text-xs bg-white border border-gray-200 rounded-lg px-3 py-1.5 focus:outline-none"
                              >
                                <option value="pending">{t.adminPending}</option>
                                <option value="processing">{t.adminProcessing}</option>
                                <option value="shipped">{t.adminShipped}</option>
                                <option value="delivered">{t.adminDelivered}</option>
                              </select>
                            </div>
                          </div>
                          <div className="border-t border-gray-200 pt-3 space-y-1">
                            {o.items.map(it => (
                              <div key={`${it.id}-${it.weight}`} className="flex justify-between text-xs text-gray-500">
                                <span>{it.name} ({it.weight}) × {it.qty}</span>
                                <span>{fmt(livePrice(it) * it.qty)}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* KYC */}
              {adminTab === 'kyc' && (
                <div>
                  {kycSubs.length === 0 ? (
                    <div className="text-center py-20"><p className="text-gray-400">{t.adminNoKyc}</p></div>
                  ) : (
                    <div className="space-y-3">
                      {kycSubs.slice().reverse().map(k => (
                        <div key={k.id} className="bg-gray-50 rounded-2xl p-6 flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{k.firstName} {k.lastName}</p>
                            <p className="text-xs text-gray-400">{k.email} · Order: {k.orderId}</p>
                            <p className="text-xs text-gray-500 mt-1">Doc: {k.docType} — {k.docNumber}</p>
                            <p className="text-xs text-gray-400">{new Date(k.date).toLocaleString()}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {k.status === 'pending' ? (
                              <>
                                <button onClick={() => updateKycStatus(k.id, 'approved')} className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200 transition-colors">{t.adminApprove}</button>
                                <button onClick={() => updateKycStatus(k.id, 'rejected')} className="text-xs font-medium bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200 transition-colors">{t.adminReject}</button>
                              </>
                            ) : (
                              <span className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-lg ${k.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{k.status}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Financing */}
              {adminTab === 'financing' && (
                <div>
                  {finApps.length === 0 ? (
                    <div className="text-center py-20"><p className="text-gray-400">{t.adminNoFin}</p></div>
                  ) : (
                    <div className="space-y-3">
                      {finApps.slice().reverse().map(f => (
                        <div key={f.id} className="bg-gray-50 rounded-2xl p-6 flex items-start justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">{f.name}</p>
                            <p className="text-xs text-gray-400">{f.email} · Order: {f.orderId}</p>
                            <p className="text-xs text-gray-500 mt-1">{f.financePlan} months · {fmt(f.amount)} · {f.empStatus} · Income: {f.monthlyIncome}</p>
                            <p className="text-xs text-gray-400">{new Date(f.date).toLocaleString()}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {f.status === 'pending' ? (
                              <>
                                <button onClick={() => updateFinStatus(f.id, 'approved')} className="text-xs font-medium bg-green-100 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-200 transition-colors">{t.adminApprove}</button>
                                <button onClick={() => updateFinStatus(f.id, 'rejected')} className="text-xs font-medium bg-red-100 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-200 transition-colors">{t.adminReject}</button>
                              </>
                            ) : (
                              <span className={`text-[10px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-lg ${
                                f.status === 'approved' ? 'bg-green-100 text-green-700' :
                                f.status === 'active' ? 'bg-blue-100 text-blue-700' :
                                'bg-red-100 text-red-700'
                              }`}>{f.status}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

          ) : view === 'financing' ? (
            <div className="px-4 md:px-6 py-8">
              {financeStep !== 'submitted' && (
                <button
                  onClick={() => { if (financeStep === 'apply') { setFinanceStep('info'); } else { setView('home'); } window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-8"
                >
                  <ArrowLeft size={14} />
                  {financeStep === 'apply' ? t.financing : t.backToShop}
                </button>
              )}

              {financeStep === 'info' ? (
                <>
                  {/* Hero banner */}
                  <div className="relative overflow-hidden rounded-3xl min-h-[260px] flex items-end mb-10">
                    <img src="/hero-gold.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                    <div className="relative z-10 p-8 md:p-12 max-w-xl">
                      <span className="block text-[9px] tracking-[0.35em] uppercase text-amber-400 mb-2">{t.finMonthsRange}</span>
                      <h1 className="text-2xl md:text-3xl font-light text-white mb-3" style={{ letterSpacing: '-0.02em' }}>{t.financing}</h1>
                      <p className="text-sm text-gray-300 leading-relaxed">
                        {t.finHeroSub}
                      </p>
                    </div>
                  </div>

                  {/* Trust strip */}
                  <div className="flex flex-wrap items-center gap-6 mb-10 px-1">
                    {[
                      { icon: <Shield size={14} />, text: t.finLicensedPartners },
                      { icon: <Clock size={14} />, text: t.finDecision2min },
                      { icon: <Truck size={14} />, text: t.finShipsSameDay },
                      { icon: <CreditCard size={14} />, text: t.noDownPayment },
                    ].map(({ icon, text }) => (
                      <div key={text} className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="text-amber-600">{icon}</span>
                        {text}
                      </div>
                    ))}
                  </div>

                  {/* How it works */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {[
                      { s: '1', title: t.finStep1, desc: t.finStep1Sub },
                      { s: '2', title: t.finStep2, desc: t.finStep2Sub },
                      { s: '3', title: t.finStep3, desc: t.finStep3Sub },
                      { s: '4', title: t.finStep4, desc: t.finStep4Sub },
                    ].map(({ s, title, desc }) => (
                      <div key={s} className="bg-gray-50 rounded-2xl p-5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white flex items-center justify-center text-sm font-semibold mb-3">{s}</div>
                        <p className="text-sm font-medium text-gray-900 mb-1">{title}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Third-party disclosure */}
                  <div className="rounded-2xl border border-amber-200/60 bg-amber-50/40 p-6 md:p-8 mb-10">
                    <div className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Info size={16} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-2">{t.finDiscTitle}</h3>
                        <p className="text-xs text-gray-600 leading-relaxed mb-3">
                          {t.finDiscP1}
                        </p>
                        <p className="text-xs text-gray-600 leading-relaxed mb-3">
                          {t.finDiscP2}
                        </p>
                        <div className="flex flex-wrap gap-3 mt-4">
                          {['Byjuno', 'Powerpay', 'Klarna'].map(p => (
                            <span key={p} className="text-[10px] tracking-wider uppercase text-gray-400 bg-white px-3 py-1.5 rounded-lg border border-gray-100">{p}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Financing tiers — hidden for now */}
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">...</div> */}

                  {/* Financing terms */}
                  <div className="mb-10">
                    <h2 className="text-xl font-light text-gray-900 mb-6">{t.financingExamples}</h2>
                    <div className="bg-gray-50 rounded-2xl overflow-hidden">
                      <div className="grid grid-cols-5 gap-0 px-5 py-3 border-b border-gray-200 text-[10px] tracking-wider uppercase text-gray-400 font-medium">
                        <span>{t.finBar}</span><span>{t.finPrice}</span><span>{t.finTerm}</span><span>{t.finApr}</span><span>{t.finMonthly}</span>
                      </div>
                      {[
                        { bar: '10g', grams: 10, months: 6, apr: 0 },
                        { bar: '50g', grams: 50, months: 12, apr: 0 },
                        { bar: '100g', grams: 100, months: 18, apr: 0 },
                        { bar: '250g', grams: 250, months: 24, apr: 0 },
                        { bar: '1kg', grams: 1000, months: 36, apr: 0 },
                      ].map(({ bar, grams, months, apr }) => {
                        const price = spotRef.current ? Math.round(grams * (spotRef.current / TROY_OZ_G) * 0.98) : Math.round(grams * 142 * 0.98);
                        const total = Math.round(price * (1 + apr / 100));
                        const monthly = Math.round(total / months);
                        return (
                          <div key={bar} className="grid grid-cols-5 gap-0 px-5 py-3.5 border-b border-gray-100 last:border-0 text-sm">
                            <span className="font-medium text-gray-900">{bar}</span>
                            <span className="text-gray-600">{fmt(price)}</span>
                            <span className="text-gray-600">{months}m</span>
                            <span className="text-gray-600">{apr}%</span>
                            <span className="font-semibold text-gray-900">{fmt(monthly)}/m</span>
                          </div>
                        );
                      })}
                    </div>
                    {isLive && <p className="text-[10px] text-gray-400 mt-2">{t.finPricesLive}</p>}
                  </div>

                  {/* Key benefits */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    {[
                      { icon: <CreditCard size={16} />, accent: 'bg-amber-50 text-amber-600', title: t.finZeroDown, desc: t.finZeroDownSub },
                      { icon: <Truck size={16} />, accent: 'bg-blue-50 text-blue-600', title: t.finOwnImmediate, desc: t.finOwnImmediateSub },
                      { icon: <Shield size={16} />, accent: 'bg-green-50 text-green-600', title: t.finTransparent, desc: t.finTransparentSub },
                    ].map(({ icon, accent, title, desc }) => (
                      <div key={title} className="bg-gray-50 rounded-2xl p-6">
                        <div className={`w-9 h-9 rounded-xl ${accent} flex items-center justify-center mb-4`}>{icon}</div>
                        <p className="text-sm font-medium text-gray-900 mb-2">{title}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Available countries */}
                  <div className="mb-10">
                    <h2 className="text-xl font-light text-gray-900 mb-6">{t.availCountries}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {[
                        { cc: 'CH', name: 'Switzerland', partner: 'Byjuno / Powerpay' },
                        { cc: 'DE', name: 'Germany', partner: 'Klarna' },
                        { cc: 'AT', name: 'Austria', partner: 'Klarna' },
                        { cc: 'FR', name: 'France', partner: 'Klarna' },
                        { cc: 'IT', name: 'Italy', partner: 'Klarna' },
                        { cc: 'ES', name: 'Spain', partner: 'Klarna' },
                        { cc: 'NL', name: 'Netherlands', partner: 'Klarna' },
                        { cc: 'BE', name: 'Belgium', partner: 'Klarna' },
                        { cc: 'SE', name: 'Sweden', partner: 'Klarna' },
                        { cc: 'FI', name: 'Finland', partner: 'Klarna' },
                      ].map(({ cc, name, partner }) => (
                        <div key={cc} className="bg-gray-50 rounded-2xl p-4">
                          <p className="text-sm font-medium text-gray-900">{name}</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">{partner}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FAQ */}
                  <div className="mb-10">
                    <h2 className="text-xl font-light text-gray-900 mb-6">{t.financingFaq}</h2>
                    <div className="space-y-3">
                      {[
                        { q: t.finFaqOwn, a: t.finFaqOwnA },
                        { q: t.finFaqMiss, a: t.finFaqMissA },
                        { q: t.finFaqEarly, a: t.finFaqEarlyA },
                        { q: t.finFaqDeposit, a: t.finFaqDepositA },
                        { q: t.finFaqSpeed, a: t.finFaqSpeedA },
                      ].map(({ q, a }) => (
                        <div key={q} className="bg-gray-50 rounded-2xl p-5">
                          <p className="text-sm font-medium text-gray-900 mb-1">{q}</p>
                          <p className="text-xs text-gray-500 leading-relaxed">{a}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="mb-10">
                    <h2 className="text-xl font-light text-gray-900 mb-6">{t.finTermsTitle}</h2>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">{t.finQuickProcess}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {t.finQuickProcessText}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">{t.finPayTerms}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed mb-3">
                          {t.finPayTermsP1}
                        </p>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {t.finPayTermsP2}
                        </p>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">{t.finZeroConditions}</h3>
                        <div className="grid grid-cols-2 gap-3 mb-4">
                          {[
                            { label: t.finCondDuration, value: t.finCondDurationVal },
                            { label: t.finCondInterest, value: t.finCondInterestVal },
                            { label: t.finCondInstallments, value: t.finCondInstallmentsVal },
                            { label: t.finCondMinAmount, value: t.finCondMinAmountVal },
                            { label: t.finCondFees, value: t.finCondFeesVal },
                            { label: t.finCondFirstPay, value: t.finCondFirstPayVal },
                          ].map(({ label, value }) => (
                            <div key={label} className="text-xs">
                              <span className="text-gray-400">{label}</span>
                              <p className="text-gray-700 font-medium mt-0.5">{value}</p>
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {t.finZeroCondText}
                        </p>
                      </div>

                      <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex items-start gap-3">
                        <Info size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-red-800 mb-1">{t.finReturnPolicy}</p>
                          <p className="text-xs text-red-700 leading-relaxed">
                            {t.finReturnPolicyText}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-3">{t.finFlexTerms}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {t.finFlexTermsText}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="rounded-3xl overflow-hidden mb-4" style={{ background: '#f5f0e8' }}>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10">
                      <div>
                        <h3 className="text-xl font-light text-gray-900">{t.finReadyApply}</h3>
                        <p className="text-sm text-gray-500 mt-1">{t.finReadyApplySub}</p>
                      </div>
                      <button
                        onClick={() => { setFinanceStep('apply'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-7 py-3.5 rounded-full hover:bg-black transition-colors flex-shrink-0"
                      >
                        {t.finApplyBtn} <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Legal footer */}
                  <p className="text-[10px] text-gray-400 leading-relaxed px-1">
                    {t.finLegal}
                  </p>
                </>
              ) : financeStep === 'apply' ? (
                /* ── Apply step ── */
                <>
                  <div className="mb-8">
                    <h1 className="text-2xl font-light text-gray-900 mb-2">{t.finApplyTitle}</h1>
                    <p className="text-sm text-gray-500">{t.finApplySub}</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                      {/* Email first */}
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-base font-medium text-gray-900 mb-5">{t.finContact}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="text-xs text-gray-500 mb-1.5 block">{t.email}</label>
                            <input type="email" placeholder="max@example.com" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors" />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1.5 block">{t.firstName}</label>
                            <input type="text" placeholder="Max" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors" />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1.5 block">{t.lastName}</label>
                            <input type="text" placeholder="Mustermann" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors" />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1.5 block">{t.phone}</label>
                            <input type="tel" placeholder="+41 79 123 45 67" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors" />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1.5 block">{t.dob}</label>
                            <input type="date" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-400 transition-colors" />
                          </div>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-base font-medium text-gray-900 mb-5">{t.address}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="text-xs text-gray-500 mb-1.5 block">{t.street}</label>
                            <input type="text" placeholder="Bahnhofstrasse 21" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors" />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1.5 block">{t.postalCode}</label>
                            <input type="text" placeholder="8001" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors" />
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1.5 block">{t.city}</label>
                            <input type="text" placeholder="Zurich" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="text-xs text-gray-500 mb-1.5 block">{t.country}</label>
                            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-400 transition-colors">
                              <option value="">{t.selectCountry}</option>
                              {['Switzerland', 'Germany', 'Austria', 'France', 'Italy', 'Spain', 'Netherlands', 'Belgium', 'Portugal', 'Luxembourg', 'Sweden', 'Finland'].map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Employment */}
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-base font-medium text-gray-900 mb-2">{t.employment}</h3>
                        <p className="text-xs text-gray-400 mb-5">{t.finUsedForCredit}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-gray-500 mb-1.5 block">{t.empStatus}</label>
                            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-400 transition-colors">
                              <option value="">{t.selectStatus}</option>
                              <option value="employed">{t.employed}</option>
                              <option value="self">{t.selfEmployed}</option>
                              <option value="retired">{t.retired}</option>
                              <option value="student">{t.student}</option>
                              <option value="other">{t.other}</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1.5 block">{t.monthlyIncome}</label>
                            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-400 transition-colors">
                              <option value="">{t.selectRange}</option>
                              <option value="1">{t.coIncomeUnder3k}</option>
                              <option value="2">{t.coIncome3to5k}</option>
                              <option value="3">{t.coIncome5to10k}</option>
                              <option value="4">{t.coIncome5to10k}</option>
                              <option value="5">{t.coIncomeOver10k}</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* ID */}
                      <div className="bg-gray-50 rounded-2xl p-6">
                        <h3 className="text-base font-medium text-gray-900 mb-2">{t.idVerification}</h3>
                        <p className="text-xs text-gray-400 mb-5">{t.finAmlNote}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-xs text-gray-500 mb-1.5 block">{t.docType}</label>
                            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-gray-400 transition-colors">
                              <option value="">{t.selectDoc}</option>
                              <option value="passport">{t.passport}</option>
                              <option value="id">{t.nationalId}</option>
                              <option value="drivers">{t.driversLicense}</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-xs text-gray-500 mb-1.5 block">{t.docNumber}</label>
                            <input type="text" placeholder="X12345678" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-gray-400 transition-colors" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="text-xs text-gray-500 mb-1.5 block">{t.uploadId}</label>
                            <div className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-gray-300 transition-colors cursor-pointer">
                              <p className="text-sm text-gray-400">{t.dragDrop}</p>
                              <p className="text-xs text-gray-300 mt-1">{t.finFileTypes}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Submit */}
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <button
                          onClick={() => { const rid = genRef('FRQ'); setFinReqId(rid); setFinanceStep('submitted'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="bg-black text-white text-sm font-semibold px-8 py-4 rounded-2xl hover:bg-gray-900 active:scale-[0.98] transition-all flex items-center gap-2"
                        >
                          {t.submitApplication} <ArrowRight size={14} />
                        </button>
                        <p className="text-xs text-gray-400">{t.submitDisclaimer}</p>
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-2xl p-5">
                        <h4 className="text-sm font-medium text-gray-900 mb-3">{t.security}</h4>
                        <div className="space-y-2">
                          {[t.finSecTls, t.finSecGdpr, t.finSecData, t.finSecDelete].map(s => (
                            <div key={s} className="flex items-center gap-2">
                              <Shield size={12} className="text-green-500 flex-shrink-0" />
                              <span className="text-xs text-gray-500">{s}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-5 text-white">
                        <h4 className="text-sm font-medium mb-2">{t.needHelp}</h4>
                        <p className="text-xs text-gray-400 mb-4">{t.needHelpSub}</p>
                        <div className="space-y-2">
                          <a href="mailto:finance@gold4you.com" className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors"><Mail size={12} /> finance@gold4you.com</a>
                          <a href="tel:+41445201000" className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 transition-colors"><Phone size={12} /> +41 44 520 10 00</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : financeStep === 'submitted' ? (
                /* ── Submitted confirmation ── */
                <div className="py-12 max-w-lg mx-auto">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <BadgeCheck size={32} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-light text-gray-900 mb-2">{t.finSubmittedTitle}</h1>
                    <p className="text-sm text-gray-500">{t.finSubmittedSub}</p>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">{t.finReqNo}</span>
                      <span className="text-sm font-mono font-semibold text-gray-900">{finReqId}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400 uppercase tracking-wider font-medium">{t.finStatusLabel}</span>
                      <span className="text-xs font-medium text-amber-700 bg-amber-50 px-3 py-1 rounded-full">{t.finUnderReview}</span>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 mb-4 flex items-start gap-3">
                    <Clock size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">{t.finWhatsNow}</p>
                      <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                        {t.finWhatsNowSub}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
                    <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">{t.finNextSteps}</h3>
                    <div className="space-y-3">
                      {[
                        { s: '1', t: t.finAssessment, d: t.finAssessmentSub },
                        { s: '2', t: t.finDecisionEmail, d: t.finDecisionEmailSub },
                        { s: '3', t: t.finChooseGold, d: t.finChooseGoldSub },
                        { s: '4', t: t.finCheckoutFin, d: t.finCheckoutFinSub },
                      ].map(({ s, t: title, d }) => (
                        <div key={s} className="flex gap-3">
                          <div className="w-6 h-6 rounded-lg bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-500 flex-shrink-0">{s}</div>
                          <div><p className="text-sm font-medium text-gray-900">{title}</p><p className="text-xs text-gray-400">{d}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 justify-center mb-6">
                    <Mail size={12} className="text-gray-400" />
                    <p className="text-[10px] text-gray-400">{t.finEmailSent}</p>
                  </div>

                  <div className="flex gap-3 justify-center">
                    <button
                      onClick={() => { setFinanceStep('info'); setView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="bg-black text-white text-sm font-semibold px-8 py-3.5 rounded-2xl hover:bg-gray-900 active:scale-[0.98] transition-all"
                    >
                      {t.finBrowseBars}
                    </button>
                    <button
                      onClick={() => { setFinanceStep('info'); setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="text-sm text-gray-500 px-6 py-3.5 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all"
                    >
                      {t.finBackHome}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

          ) : view === 'profile' ? (
            <div className="px-4 md:px-6 py-8">
              <p className="text-sm text-gray-500">{t.redirecting}</p>
            </div>

          ) : /* ============= IMPRINT PAGE ============= */
          view === 'imprint' ? (
            <div className="px-4 md:px-6 py-8 max-w-4xl mx-auto">
              <button onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-8">
                <ArrowLeft size={14} /> {t.backTo} Home
              </button>
              <h1 className="text-2xl font-semibold text-gray-900 mb-8">{t.imprint}</h1>

              <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-4">
                  <h2 className="text-base font-medium text-gray-900">gold4you AG</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">{t.impAddress}</p>
                      <p>Bahnhofstrasse 21</p>
                      <p>8001 Zurich, Switzerland</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">{t.impCommReg}</p>
                      <p>CHE-123.456.789</p>
                      <p>Handelsregisteramt Kanton Zurich</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">{t.impContact}</p>
                      <p>E-Mail: info@gold4you.ch</p>
                      <p>Phone: +41 44 123 45 67</p>
                      <p>WhatsApp: +41 79 123 45 67</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">{t.impAuthRep}</p>
                      <p>Luca Fontana, CEO & Founder</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.impSupervision}</h2>
                  <p>{t.impSupervisionText}</p>
                  <p>{t.impVatExempt}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.impFinPartners}</h2>
                  <p>{t.impFinPartnersText}</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{t.impFinMfGroup}</li>
                    <li>{t.impFinByjuno}</li>
                    <li>{t.impFinPowerpay}</li>
                    <li>{t.impFinKlarna}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.impRefineries}</h2>
                  <p>{t.impRefineriesText}</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Al Etihad Gold Refinery DMCC, Dubai</li>
                    <li>Auriz DMCC, Dubai</li>
                    <li>Emirates Gold DMCC, Dubai</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.impDisclaimer}</h2>
                  <p>{t.impDisclaimerText}</p>
                  <p>{t.impExtLinks}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.impDispute}</h2>
                  <p>{t.impDisputeText}</p>
                </div>
              </div>
            </div>

          ) : /* ============= PRIVACY PAGE ============= */
          view === 'privacy' ? (
            <div className="px-4 md:px-6 py-8 max-w-4xl mx-auto">
              <button onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-8">
                <ArrowLeft size={14} /> {t.backTo} Home
              </button>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">{t.privacy}</h1>
              <p className="text-xs text-gray-400 mb-8">{t.privLastUpdated}</p>

              <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.privController}</h2>
                  <p>gold4you AG, Bahnhofstrasse 21, 8001 Zurich, Switzerland</p>
                  <p>E-Mail: privacy@gold4you.ch</p>
                  <p>{t.privControllerLaw}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.privDataCollect}</h2>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{t.privDataPersonal}</li>
                    <li>{t.privDataKyc}</li>
                    <li>{t.privDataFinancial}</li>
                    <li>{t.privDataOrder}</li>
                    <li>{t.privDataTech}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.privPurpose}</h2>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{t.privPurposeOrder}</li>
                    <li>{t.privPurposeKyc}</li>
                    <li>{t.privPurposeFin}</li>
                    <li>{t.privPurposeComm}</li>
                    <li>{t.privPurposeLegal}</li>
                    <li>{t.privPurposeAnalytics}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.privSharing}</h2>
                  <p>{t.privSharingIntro}</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{t.privSharingCredit}</li>
                    <li>{t.privSharingShip}</li>
                    <li>{t.privSharingPay}</li>
                    <li>{t.privSharingReg}</li>
                  </ul>
                  <p>{t.privNoSell}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.privSecurity}</h2>
                  <p>{t.privSecurityText}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.privRetention}</h2>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{t.privRetOrder}</li>
                    <li>{t.privRetKyc}</li>
                    <li>{t.privRetFin}</li>
                    <li>{t.privRetMarketing}</li>
                    <li>{t.privRetAnalytics}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.privRights}</h2>
                  <p>{t.privRightsIntro}</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{t.privRightsAccess}</li>
                    <li>{t.privRightsRect}</li>
                    <li>{t.privRightsDelete}</li>
                    <li>{t.privRightsRestrict}</li>
                    <li>{t.privRightsPort}</li>
                    <li>{t.privRightsWithdraw}</li>
                  </ul>
                  <p>Contact: privacy@gold4you.ch</p>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.privCookies}</h2>
                  <p>{t.privCookiesText}</p>
                </div>
              </div>
            </div>

          ) : /* ============= TERMS (AGB) PAGE ============= */
          view === 'terms' ? (
            <div className="px-4 md:px-6 py-8 max-w-4xl mx-auto">
              <button onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-8">
                <ArrowLeft size={14} /> {t.backTo} Home
              </button>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">{t.terms}</h1>
              <p className="text-xs text-gray-400 mb-8">{t.termsLastUpdated}</p>

              <div className="space-y-6 text-sm text-gray-600 leading-relaxed">
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.termsScope}</h2>
                  <p>{t.termsScopeText}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.termsContract}</h2>
                  <p>{t.termsContractP1}</p>
                  <p>{t.termsContractP2}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.termsPrices}</h2>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{t.termsPriceEur}</li>
                    <li>{t.termsPriceVat}</li>
                    <li>{t.termsPriceFormula}</li>
                    <li>{t.termsPriceMethods}</li>
                    <li>{t.termsPrice3d}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.termsFin}</h2>
                  <p>{t.termsFinIntro}</p>
                  <ul className="list-disc list-inside space-y-2 mt-2">
                    <li><strong>{t.impFinMfGroup}</strong></li>
                    <li><strong>{t.impFinByjuno}</strong></li>
                    <li><strong>{t.impFinPowerpay}</strong></li>
                    <li><strong>{t.impFinKlarna}</strong></li>
                  </ul>
                  <div className="mt-3 space-y-2">
                    <p><strong>{t.termsFinTiers}</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>{t.termsFinQuick}</li>
                      <li>{t.termsFinExtended}</li>
                      <li>{t.termsFinAbove}</li>
                    </ul>
                  </div>
                  <div className="mt-3 space-y-2">
                    <p><strong>{t.termsFinTermsLabel}</strong></p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li>{t.termsFinZero}</li>
                      <li>{t.termsFinPeriods}</li>
                      <li>{t.termsFinNoPenalty}</li>
                      <li>{t.termsFinDeposit}</li>
                      <li>{t.termsFinLate}</li>
                    </ul>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 space-y-3">
                  <h2 className="text-base font-medium text-amber-900">{t.termsReturn}</h2>
                  <p className="text-amber-800">{t.termsReturnP1}</p>
                  <p className="text-amber-800">{t.termsReturnP2}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.termsDelivery}</h2>
                  <p><button onClick={() => { setView('shippingInfo'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-gray-900 underline underline-offset-2 hover:text-amber-700">{t.termsDeliveryLink}</button></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>{t.termsDeliveryDubai}</li>
                    <li>{t.termsDeliveryLocal}</li>
                    <li>{t.termsDeliveryInsured}</li>
                    <li>{t.termsDeliverySig}</li>
                    <li>{t.termsDeliveryDepot}</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.termsOwnership}</h2>
                  <p>{t.termsOwnershipText}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.termsKyc}</h2>
                  <p>{t.termsKycText}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.termsWarranty}</h2>
                  <p>{t.termsWarrantyText}</p>
                </div>

                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 space-y-3">
                  <h2 className="text-base font-medium text-gray-900">{t.termsJurisdiction}</h2>
                  <p>{t.termsJurisdictionText}</p>
                </div>
              </div>
            </div>

          ) : /* ============= SHIPPING PAGE ============= */
          view === 'shippingInfo' ? (
            <div className="px-4 md:px-6 py-8 max-w-4xl mx-auto">
              <button onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 transition-colors mb-8">
                <ArrowLeft size={14} /> {t.backTo} Home
              </button>
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">{t.shipping}</h1>
              <p className="text-sm text-gray-500 mb-8">{t.shipSub}</p>

              {/* Shipping overview */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 mb-8 text-white">
                <h2 className="text-lg font-medium mb-4">{t.shipOverview}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Package size={16} className="text-amber-400" />
                      <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">{t.shipStep1}</span>
                    </div>
                    <p className="text-sm font-medium">{t.shipStep1Title}</p>
                    <p className="text-xs text-gray-300 mt-1">{t.shipStep1Desc}</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck size={16} className="text-amber-400" />
                      <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">{t.shipStep2}</span>
                    </div>
                    <p className="text-sm font-medium">{t.shipStep2Title}</p>
                    <p className="text-xs text-gray-300 mt-1">{t.shipStep2Desc}</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={16} className="text-amber-400" />
                      <span className="text-xs font-medium text-amber-400 uppercase tracking-wider">{t.shipStep3}</span>
                    </div>
                    <p className="text-sm font-medium">{t.shipStep3Title}</p>
                    <p className="text-xs text-gray-300 mt-1">{t.shipStep3Desc}</p>
                  </div>
                </div>
              </div>

              {/* Key policies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield size={16} className="text-gray-900" />
                    <h3 className="text-sm font-medium text-gray-900">{t.shipInsurance}</h3>
                  </div>
                  <p className="text-xs text-gray-500">{t.shipInsuranceText}</p>
                </div>
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <BadgeCheck size={16} className="text-gray-900" />
                    <h3 className="text-sm font-medium text-gray-900">{t.shipSignature}</h3>
                  </div>
                  <p className="text-xs text-gray-500">{t.shipSignatureText}</p>
                </div>
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={16} className="text-gray-900" />
                    <h3 className="text-sm font-medium text-gray-900">{t.shipNotHome}</h3>
                  </div>
                  <p className="text-xs text-gray-500">{t.shipNotHomeText}</p>
                </div>
                <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Package size={16} className="text-gray-900" />
                    <h3 className="text-sm font-medium text-gray-900">{t.shipDiscreet}</h3>
                  </div>
                  <p className="text-xs text-gray-500">{t.shipDiscreetText}</p>
                </div>
              </div>

              {/* Country-by-country table */}
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 mb-8">
                <h2 className="text-base font-medium text-gray-900 mb-4">{t.shipByCountry}</h2>
                <p className="text-xs text-gray-400 mb-4">{t.shipByCountrySub}</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500">{t.shipColCountry}</th>
                        <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500">{t.shipColExpress}</th>
                        <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500">{t.shipColLastMile}</th>
                        <th className="text-left py-2 pr-4 text-xs font-medium text-gray-500">{t.shipColTotal}</th>
                        <th className="text-left py-2 text-xs font-medium text-gray-500">{t.shipColCarrier}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {[
                        { country: 'Switzerland', express: '1-2', last: '1', total: '2-3', carrier: 'DHL Express + Swiss Post' },
                        { country: 'Liechtenstein', express: '1-2', last: '1', total: '2-3', carrier: 'DHL Express + Swiss Post' },
                        { country: 'Germany', express: '1-2', last: '1-2', total: '2-4', carrier: 'DHL Express + DHL Paket' },
                        { country: 'Austria', express: '1-2', last: '1-2', total: '2-4', carrier: 'DHL Express + Austrian Post' },
                        { country: 'France', express: '1-3', last: '1-2', total: '2-5', carrier: 'DHL Express + La Poste' },
                        { country: 'Italy', express: '1-3', last: '1-2', total: '2-5', carrier: 'DHL Express + Poste Italiane' },
                        { country: 'Spain', express: '2-3', last: '1-2', total: '3-5', carrier: 'DHL Express + Correos' },
                        { country: 'Netherlands', express: '1-2', last: '1', total: '2-3', carrier: 'DHL Express + PostNL' },
                        { country: 'Belgium', express: '1-2', last: '1-2', total: '2-4', carrier: 'DHL Express + bpost' },
                        { country: 'Luxembourg', express: '1-2', last: '1', total: '2-3', carrier: 'DHL Express + POST Luxembourg' },
                        { country: 'Portugal', express: '2-3', last: '1-2', total: '3-5', carrier: 'DHL Express + CTT' },
                        { country: 'Sweden', express: '2-3', last: '1-2', total: '3-5', carrier: 'DHL Express + PostNord' },
                        { country: 'Finland', express: '2-3', last: '1-2', total: '3-5', carrier: 'DHL Express + Posti' },
                        { country: 'Denmark', express: '2-3', last: '1-2', total: '3-5', carrier: 'DHL Express + PostNord' },
                        { country: 'Norway', express: '2-3', last: '1-2', total: '3-5', carrier: 'DHL Express + Posten' },
                        { country: 'Ireland', express: '2-3', last: '1-2', total: '3-5', carrier: 'DHL Express + An Post' },
                        { country: 'Poland', express: '2-3', last: '1-2', total: '3-5', carrier: 'DHL Express + Poczta Polska' },
                        { country: 'Czech Republic', express: '2-3', last: '1-2', total: '3-5', carrier: 'DHL Express + Ceska Posta' },
                        { country: 'Hungary', express: '2-3', last: '1-2', total: '3-5', carrier: 'DHL Express + Magyar Posta' },
                        { country: 'Greece', express: '2-3', last: '2-3', total: '4-6', carrier: 'DHL Express + ELTA' },
                        { country: 'Romania', express: '2-3', last: '2-3', total: '4-6', carrier: 'DHL Express + Posta Romana' },
                        { country: 'Bulgaria', express: '2-3', last: '2-3', total: '4-6', carrier: 'DHL Express + Bulgarian Posts' },
                        { country: 'Croatia', express: '2-3', last: '2-3', total: '4-6', carrier: 'DHL Express + Hrvatska Posta' },
                        { country: 'Slovakia', express: '2-3', last: '1-2', total: '3-5', carrier: 'DHL Express + Slovenska Posta' },
                        { country: 'Slovenia', express: '2-3', last: '1-2', total: '3-5', carrier: 'DHL Express + Posta Slovenije' },
                        { country: 'Estonia', express: '2-3', last: '2-3', total: '4-6', carrier: 'DHL Express + Omniva' },
                        { country: 'Latvia', express: '2-3', last: '2-3', total: '4-6', carrier: 'DHL Express + Latvijas Pasts' },
                        { country: 'Lithuania', express: '2-3', last: '2-3', total: '4-6', carrier: 'DHL Express + Lietuvos Pastas' },
                        { country: 'Malta', express: '2-3', last: '2-3', total: '4-6', carrier: 'DHL Express + MaltaPost' },
                        { country: 'Cyprus', express: '2-3', last: '2-3', total: '4-6', carrier: 'DHL Express + Cyprus Post' },
                        { country: 'United Kingdom', express: '1-2', last: '1-2', total: '2-4', carrier: 'DHL Express + Royal Mail' },
                      ].map((row) => (
                        <tr key={row.country}>
                          <td className="py-2 pr-4 text-sm text-gray-900 font-medium">{row.country}</td>
                          <td className="py-2 pr-4 text-sm text-gray-600">{row.express} {t.shipDays}</td>
                          <td className="py-2 pr-4 text-sm text-gray-600">{row.last} {t.shipDays}</td>
                          <td className="py-2 pr-4 text-sm text-gray-900 font-medium">{row.total} days</td>
                          <td className="py-2 text-xs text-gray-500">{row.carrier}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Customs & duties */}
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 mb-8 space-y-3">
                <h2 className="text-base font-medium text-gray-900">{t.shipCustoms}</h2>
                <div className="space-y-2 text-sm text-gray-600">
                  <p><strong>CH/LI:</strong> {t.shipCustomsCH}</p>
                  <p><strong>EU:</strong> {t.shipCustomsEU}</p>
                  <p><strong>UK:</strong> {t.shipCustomsUK}</p>
                  <p><strong>NO:</strong> {t.shipCustomsNO}</p>
                </div>
              </div>

              {/* Tracking & support */}
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6 mb-8 space-y-3">
                <h2 className="text-base font-medium text-gray-900">{t.shipTracking}</h2>
                <p className="text-sm text-gray-600">{t.shipTrackingP1}</p>
                <p className="text-sm text-gray-600">{t.shipTrackingP2}</p>
                <div className="flex flex-wrap gap-4 mt-2">
                  <span className="text-sm text-gray-900">shipping@gold4you.ch</span>
                  <span className="text-sm text-gray-900">+41 44 123 45 67</span>
                  <span className="text-sm text-gray-900">WhatsApp: +41 79 123 45 67</span>
                </div>
              </div>

              {/* Important notes */}
              <div className="bg-amber-50 rounded-2xl border border-amber-200 p-6 space-y-3">
                <h2 className="text-base font-medium text-amber-900">{t.shipNotes}</h2>
                <ul className="list-disc list-inside space-y-1 text-sm text-amber-800">
                  <li>{t.shipNote1}</li>
                  <li>{t.shipNote2}</li>
                  <li>{t.shipNote3}</li>
                  <li>{t.shipNote4}</li>
                  <li>{t.shipNote5}</li>
                  <li>{t.shipNote6}</li>
                </ul>
              </div>
            </div>

          ) : /* ============= ABOUT PAGE ============= */
          view === 'about' ? (
            <div className="px-4 md:px-6 py-8">
              {/* Hero */}
              <div className="relative overflow-hidden rounded-3xl min-h-[280px] flex items-end mb-10">
                <img src="/hero-gold.png" alt="" className="absolute inset-0 w-full h-full object-cover object-right" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
                <div className="relative z-10 p-8 md:p-12 max-w-lg">
                  <span className="block text-[9px] tracking-[0.35em] uppercase text-amber-400 mb-2">{t.aboutSince}</span>
                  <h1 className="text-2xl md:text-3xl font-light text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
                    {t.aboutTitle}
                  </h1>
                  <p className="text-sm text-white/70 leading-relaxed">
                    {t.aboutSub}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {[
                  { value: '14,200+', label: t.aboutBarsSold, sub: t.aboutSince2019 },
                  { value: '4.87/5', label: t.aboutRating, sub: t.aboutVerifiedReviews },
                  { value: '38', label: t.aboutCountries, sub: t.aboutShippedTo },
                  { value: 'Spot −2%', label: t.aboutAllPrices, sub: t.aboutBelowMarket },
                ].map(({ value, label, sub }) => (
                  <div key={label} className="bg-gray-50 rounded-2xl p-5">
                    <p className="text-2xl font-light text-gray-900">{value}</p>
                    <p className="text-xs text-gray-600 mt-1 font-medium">{label}</p>
                    <p className="text-[10px] text-gray-400">{sub}</p>
                  </div>
                ))}
              </div>

              {/* What makes us different */}
              <div className="mb-10 -mx-6 px-6 py-10 bg-amber-50 rounded-3xl">
                <h2 className="text-xl font-light text-gray-900 mb-6">{t.aboutDifferent}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { icon: <TrendingDown size={18} />, title: t.aboutSpotTitle, desc: t.aboutSpotSub },
                    { icon: <CreditCard size={18} />, title: t.aboutFinTitle, desc: t.aboutFinSub },
                    { icon: <Shield size={18} />, title: t.aboutSourcingTitle, desc: t.aboutSourcingSub },
                  ].map(({ icon, title, desc }) => (
                    <div key={title} className="rounded-2xl p-6 bg-white/70 border border-amber-100/60">
                      <div className="w-10 h-10 rounded-xl bg-amber-100/60 text-amber-700 flex items-center justify-center mb-4">{icon}</div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">{title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* How it works — horizontal steps */}
              <div className="mb-10">
                <h2 className="text-xl font-light text-gray-900 mb-6">{t.aboutHowWorks}</h2>
                <div className="flex flex-col md:flex-row gap-0 md:gap-0 items-stretch">
                  {[
                    { s: '1', title: t.aboutBrowse, desc: t.aboutBrowseSub },
                    { s: '2', title: t.aboutCheckout, desc: t.aboutCheckoutSub },
                    { s: '3', title: t.aboutSameDay, desc: t.aboutSameDaySub },
                    { s: '4', title: t.aboutYours, desc: t.aboutYoursSub },
                  ].map(({ s, title, desc }, i) => (
                    <div key={s} className="flex-1 flex items-start gap-3 p-5 relative">
                      {i > 0 && <div className="hidden md:block absolute left-0 top-5 bottom-5 w-px bg-gray-200" />}
                      <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">{s}</div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{title}</p>
                        <p className="text-[11px] text-gray-400 mt-0.5">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Banner */}
              <div className="relative overflow-hidden rounded-3xl mb-10" style={{ background: '#f5f0e8' }}>
                <div className="flex flex-col sm:flex-row items-center justify-between p-8 md:p-10 gap-4">
                  <div>
                    <p className="text-[9px] tracking-[0.3em] uppercase text-amber-700/60 font-medium mb-2">{t.aboutSpotCta}</p>
                    <h3 className="text-xl font-light text-gray-900 mb-1" style={{ letterSpacing: '-0.01em' }}>{t.ctaBuild}</h3>
                    <p className="text-sm text-gray-500">{t.ctaSub}</p>
                  </div>
                  <button
                    onClick={() => { setView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="flex items-center gap-2 bg-gray-900 text-white text-sm px-6 py-3 rounded-full hover:bg-black transition-colors flex-shrink-0"
                  >
                    {t.shopNow} <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* Refinery Partners */}
              <div className="mb-10">
                <h2 className="text-xl font-light text-gray-900 mb-6">{t.aboutPartners}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { name: 'Al Etihad Gold', loc: 'Dubai, UAE', year: '2009', img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop' },
                    { name: 'Auriz', loc: 'Dubai, UAE', year: '2015', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&h=300&fit=crop' },
                    { name: 'Emirates Gold', loc: 'Dubai, UAE', year: '1992', img: 'https://images.unsplash.com/photo-1546412414-e1885259563a?w=400&h=300&fit=crop' },
                    { name: 'Gulf Gold Refinery', loc: 'Ajman, UAE', year: '2005', img: 'https://images.unsplash.com/photo-1597659840241-37e2b9c2f55f?w=400&h=300&fit=crop' },
                  ].map(({ name, loc, year, img }) => (
                    <div key={name} className="relative rounded-2xl overflow-hidden h-40 group">
                      <img src={img} alt={name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-sm font-medium text-white">{name}</p>
                        <p className="text-[10px] text-white/60 mt-0.5">{loc} · Since {year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locations — side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                <div className="rounded-2xl border border-gray-100 p-6">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-amber-600 font-medium mb-3">{t.aboutHQ}</p>
                  <p className="text-sm font-medium text-gray-900">gold4you AG</p>
                  <p className="text-xs text-gray-500 mt-1">Bahnhofstrasse 21, 8001 Zurich</p>
                  <p className="text-[10px] text-gray-400 mt-2">FINMA registered -- VQF Member</p>
                  <p className="text-[10px] text-gray-400 mt-2 bg-gray-50 rounded-lg px-2.5 py-1.5 inline-block">{t.aboutMonFri}</p>
                </div>
                <div className="rounded-2xl border border-gray-100 p-6">
                  <p className="text-[9px] tracking-[0.3em] uppercase text-gray-500 font-medium mb-3">{t.aboutRefPartner}</p>
                  <p className="text-sm font-medium text-gray-900">Al Etihad Gold DMCC</p>
                  <p className="text-xs text-gray-500 mt-1">{t.aboutDmcc}</p>
                  <p className="text-[10px] text-gray-400 mt-2 bg-gray-50 rounded-lg px-2.5 py-1.5 inline-block">{t.aboutByAppt}</p>
                </div>
              </div>

              {/* Team CTA Banner */}
              <div className="mb-10 relative overflow-hidden rounded-3xl h-56 md:h-72">
                <img src="/team.png" alt={t.aboutTeam} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-[9px] tracking-[0.4em] uppercase text-white/50 mb-2">{t.aboutTeam}</p>
                  <p className="text-lg md:text-xl font-light text-white">gold4you</p>
                </div>
              </div>

              {/* Contact strip */}
              <div className="flex flex-wrap items-center gap-6 mb-10 rounded-2xl border border-gray-100 p-5">
                <h3 className="text-sm font-medium text-gray-900">{t.aboutGetInTouch}</h3>
                <a href="tel:+41441234567" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors"><Phone size={12} /> +41 44 123 45 67</a>
                <a href="https://wa.me/41791234567" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors"><MessageCircle size={12} /> WhatsApp</a>
                <a href="mailto:info@gold4you.ch" className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors"><Mail size={12} /> info@gold4you.ch</a>
              </div>

              {/* Compliance + Standards bar */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-2xl bg-gray-50 p-5 mb-10">
                <div className="flex items-center gap-5">
                  {['LBMA', 'OECD', 'RGG', 'ISO'].map(s => (
                    <span key={s} className="text-[10px] font-bold text-gray-400 tracking-widest">{s}</span>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400">{t.aboutConflictFree}</p>
              </div>

              {/* Quote */}
              <section className="bg-gradient-to-br from-gray-900 via-gray-950 to-black rounded-3xl py-12 px-8 md:px-12 relative overflow-hidden">
                <div className="absolute top-6 right-8 opacity-5"><Quote size={80} /></div>
                <div className="max-w-md relative">
                  <p className="text-[9px] tracking-[0.4em] uppercase text-amber-500/60 mb-5">-- {t.philosophy}</p>
                  <blockquote className="text-lg md:text-xl font-extralight text-white leading-relaxed" style={{ letterSpacing: '-0.01em' }}>
                    {t.aboutQuote1}<br />{t.aboutQuote2}<br />{t.aboutQuote3}
                  </blockquote>
                </div>
              </section>
            </div>

          ) : /* ============= DETAIL PAGE ============= */
          detail ? (
            <>
            <article className="px-4 md:px-6 py-6" itemScope itemType="https://schema.org/Product">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
                <button onClick={() => { setView('home'); setDetail(null); }} className="hover:text-gray-900 transition-colors">gold4you</button>
                <span>›</span>
                <button onClick={() => { setView('shop'); setDetail(null); }} className="hover:text-gray-900 transition-colors">{t.footerShop}</button>
                <span>›</span>
                <span className="text-gray-600">{detail.name}</span>
              </nav>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                {/* Left — Image + product info */}
                <div className="lg:col-span-3">
                  <div className={`aspect-[4/3] rounded-3xl ${detail.image ? 'bg-gray-50' : `bg-gradient-to-br ${detail.gradient}`} relative overflow-hidden mb-8`}>
                    {detail.salePrice && (
                      <div className="absolute top-5 left-5 z-10">
                        <span className="text-xs font-medium bg-white/90 text-amber-700 px-3 py-1.5 rounded-full backdrop-blur-sm">
                          -{Math.round((1 - detail.salePrice / detail.price) * 100)}%
                        </span>
                      </div>
                    )}
                    {detail.image ? (
                      <img src={detail.image} alt={detail.name} className="absolute inset-0 w-full h-full object-contain p-12" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-[8rem] font-extralight ${detail.textLight ? 'text-white/8' : 'text-black/[0.04]'}`} style={{ letterSpacing: '-0.04em' }}>
                          Au
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Product info below image */}
                  <div className="mb-8">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{detail.tag}</p>
                    <h1
                      className="text-3xl md:text-4xl font-light text-gray-900 mb-2"
                      style={{ letterSpacing: '-0.02em' }}
                      itemProp="name"
                    >
                      {detail.name}
                    </h1>
                    <p className="text-base text-gray-500 mb-6" itemProp="description">{detail.subtitle}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{detail.description}</p>
                  </div>

                  {/* Specs */}
                  <div className="bg-gray-50 rounded-2xl divide-y divide-gray-100 mb-8">
                    {[
                      [t.detailPurity, t.detailPurityVal],
                      [t.detailCert, t.detailCertVal],
                      [t.detailMfr, detail.manufacturer],
                      [t.detailDimensions, detail.dimensions],
                      [t.detailVat, t.detailVatVal],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between items-center px-5 py-3.5">
                        <span className="text-sm text-gray-500">{k}</span>
                        <span className="text-sm text-gray-900 font-medium">{v}</span>
                      </div>
                    ))}
                  </div>

                  {/* Product Reviews */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">{t.customerReviews}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} size={14} fill="#f59e0b" stroke="#f59e0b" strokeWidth={1.5} />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-900">4.87 / 5</span>
                          <span className="text-xs text-gray-400">· 847 {t.reviews}</span>
                        </div>
                      </div>
                      <span className="text-[10px] text-green-600 font-semibold bg-green-50 px-2.5 py-1 rounded-full">{t.verified}</span>
                    </div>
                    <div className="space-y-4">
                      {REVIEWS.slice(0, 2).map((review, idx) => (
                        <div key={idx} className="bg-white rounded-xl p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-[10px] font-semibold text-gray-500">{review.name.split(' ').map(n => n[0]).join('')}</span>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-900">{review.name}</p>
                                <p className="text-[10px] text-gray-400">{review.location}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: review.rating }).map((_, i) => (
                                <Star key={i} size={10} fill="#f59e0b" stroke="#f59e0b" />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">{review.text}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[10px] text-green-600 font-medium">{t.verified}</span>
                            <span className="text-[10px] text-gray-300">·</span>
                            <span className="text-[10px] text-gray-400">{review.product} · {review.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right — Buy + Financing + Trust */}
                <div className="lg:col-span-2 space-y-4">

                  {/* ── Direct Purchase Card (primary) ── */}
                  <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                    <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                      <meta itemProp="priceCurrency" content="EUR" />
                      <link itemProp="availability" href="https://schema.org/InStock" />
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-gray-400 uppercase tracking-wider">{t.detailOneTime}</p>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                          <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`} />
                          {isLive ? `${t.detailLive} · ${countdown}` : spotLoading ? t.shopLoading : t.shopOffline}
                        </div>
                      </div>
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-3xl font-semibold text-gray-900" itemProp="price" content={String(livePrice(detail))}>{fmt(livePrice(detail))}</span>
                        <span className="text-sm text-gray-400 line-through">{fmt(spotOz ? Math.round(detail.grams * (spotOz / TROY_OZ_G)) : detail.price)}</span>
                      </div>
                      <p className="text-xs text-green-600 font-medium mb-5">{t.detailSpotApplied}</p>
                    </div>

                    <button
                      onClick={() => addToCart(detail, weight || detail.weights[0])}
                      className="w-full bg-amber-400/60 hover:bg-amber-400/80 text-amber-900 text-sm font-medium py-3.5 rounded-xl transition-all active:scale-[0.98] flex items-center justify-between px-6 mb-5"
                    >
                      <span>{t.addToCart}</span>
                      <ArrowRight size={18} />
                    </button>

                    {/* Payment logos — monochrome */}
                    <div className="flex items-center gap-2.5 justify-center flex-wrap opacity-50">
                      {/* Visa */}
                      <svg viewBox="0 0 48 16" className="h-5 w-auto" aria-label="Visa"><path fill="#222" d="M19.5 1.2l-3.2 13.6h-2.6l3.2-13.6h2.6zm13.1 8.8l1.4-3.8.8 3.8h-2.2zm2.9 4.8h2.4l-2.1-13.6h-2.2c-.5 0-.9.3-1.1.7l-3.8 12.9h2.7l.5-1.4h3.3l.3 1.4zm-6.5-4.4c0-3.6-5-3.8-5-5.4 0-.5.5-1 1.5-1.1.5-.1 1.9-.1 3.4.6l.6-2.8c-.8-.3-1.9-.6-3.2-.6-3.4 0-5.8 1.8-5.8 4.4 0 1.9 1.7 3 3 3.6 1.3.7 1.8 1.1 1.8 1.7 0 .9-1.1 1.3-2.1 1.4-1.7 0-2.7-.5-3.5-.8l-.6 2.9c.8.4 2.3.7 3.8.7 3.6 0 6-1.8 6.1-4.6zM14.9 1.2L10.8 14.8H8L5.9 3.6c-.1-.5-.3-.7-.7-.9C4.3 2.3 3 1.9 1.8 1.6l.1-.4h4.4c.6 0 1.1.4 1.2 1l1.1 5.8 2.7-6.8h2.6z"/></svg>
                      {/* Mastercard */}
                      <svg viewBox="0 0 38 24" className="h-5 w-auto" aria-label="Mastercard"><rect width="38" height="24" rx="3" fill="#fff" stroke="#ddd"/><circle cx="15" cy="12" r="7" fill="#999"/><circle cx="23" cy="12" r="7" fill="#bbb"/><path d="M19 6.7a7 7 0 010 10.6 7 7 0 000-10.6z" fill="#aaa"/></svg>
                      {/* AMEX */}
                      <svg viewBox="0 0 38 24" className="h-5 w-auto" aria-label="AMEX"><rect width="38" height="24" rx="3" fill="#555"/><text x="19" y="14.5" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold" fontFamily="Arial">AMEX</text></svg>
                      {/* Apple Pay */}
                      <svg viewBox="0 0 38 24" className="h-5 w-auto" aria-label="Apple Pay"><rect width="38" height="24" rx="3" fill="#333"/><text x="19" y="14" textAnchor="middle" fill="#fff" fontSize="6.5" fontWeight="500" fontFamily="Arial">Pay</text></svg>
                      {/* TWINT */}
                      <svg viewBox="0 0 38 24" className="h-5 w-auto" aria-label="TWINT"><rect width="38" height="24" rx="3" fill="#333"/><text x="19" y="14.5" textAnchor="middle" fill="#fff" fontSize="6" fontWeight="bold" fontFamily="Arial">TWINT</text></svg>
                      {/* BTC */}
                      <svg viewBox="0 0 38 24" className="h-5 w-auto" aria-label="Bitcoin"><rect width="38" height="24" rx="3" fill="#666"/><text x="19" y="14.5" textAnchor="middle" fill="#fff" fontSize="7" fontWeight="bold" fontFamily="Arial">BTC</text></svg>
                    </div>
                  </div>

                  {/* ── Financing Card (secondary) ── */}
                  <div className="bg-gray-50 border border-gray-100 rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-900">{t.financing}</h3>
                        <p className="text-[10px] text-gray-400">0% APR · 6-48 {t.months}</p>
                      </div>
                      <CreditCard size={16} className="text-gray-400" />
                    </div>

                    <div className="grid grid-cols-4 gap-1.5 mb-4">
                      {[6, 12, 24, 48].map((m) => (
                        <button
                          key={m}
                          onClick={() => setFinancePlan(m)}
                          className={`py-2 rounded-lg text-center text-xs font-medium transition-all ${
                            financePlan === m
                              ? 'bg-gray-900 text-white'
                              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                          }`}
                        >
                          {m} {t.coMo}
                        </button>
                      ))}
                    </div>

                    {(() => {
                      const p = livePrice(detail);
                      const rate = 0;
                      const total = p;
                      const monthly = Math.round(total / financePlan);
                      return (
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-lg font-semibold text-gray-900">{fmt(monthly)}</span>
                            <span className="text-sm text-gray-500">{t.perMonth}</span>
                          </div>
                          <button
                            onClick={() => { setPayMethod('finance'); addToCart(detail, weight || detail.weights[0]); }}
                            className="flex items-center gap-2 bg-amber-400/60 hover:bg-amber-400/80 text-amber-900 text-sm font-medium px-5 py-2.5 rounded-xl transition-all"
                          >
                            {t.financing} <ArrowRight size={14} />
                          </button>
                        </div>
                      );
                    })()}
                  </div>

                  {/* ── Buyer Protection (collapsible) ── */}
                  <div className="bg-gray-50 border border-gray-100 rounded-3xl overflow-hidden">
                    <button
                      onClick={() => setDetailFold(p => ({ ...p, protection: !p.protection }))}
                      className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100/50 transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gray-900 flex items-center justify-center">
                          <Shield size={16} className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{t.detailBuyerProt}</p>
                          <p className="text-xs text-gray-500">{t.detailMoneyBack}</p>
                        </div>
                      </div>
                      <Plus size={16} className={`text-gray-400 transition-transform duration-200 ${detailFold.protection ? '' : 'rotate-45'}`} />
                    </button>
                    {!detailFold.protection && (
                      <div className="px-6 pb-6 space-y-3">
                        {[
                          t.detailSslCheckout,
                          t.detailInsuredTracked,
                          t.detailReturnPolicy,
                          t.detailLbmaAuth,
                          t.detailPriceLocked,
                          t.detailFinNoFee,
                        ].map((text) => (
                          <div key={text} className="flex items-start gap-2.5">
                            <BadgeCheck size={15} className="text-gray-900 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-gray-600 leading-relaxed">{text}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* ── Reviews (collapsible) ── */}
                  <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setDetailFold(p => ({ ...p, reviews: !p.reviews }))}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50/50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} size={14} fill={i <= 4 ? '#00b67a' : '#dcdce6'} stroke="none" />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">4.8</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Verified</span>
                      </div>
                      <Plus size={16} className={`text-gray-300 transition-transform duration-200 ${detailFold.reviews ? '' : 'rotate-45'}`} />
                    </button>
                    {!detailFold.reviews && (
                      <div className="px-5 pb-5">
                        <p className="text-xs text-gray-500 mb-3">{t.detailBasedOn} <span className="font-medium text-gray-700">847 {t.reviews}</span> {t.detailFromVerified}</p>
                        <div className="border-t border-gray-100 pt-3">
                          <div className="flex items-center gap-1 mb-1">
                            {[1,2,3,4,5].map(i => <Star key={i} size={10} fill="#00b67a" stroke="none" />)}
                            <span className="text-[10px] text-gray-400 ml-1">2 days ago</span>
                          </div>
                          <p className="text-xs text-gray-600 leading-relaxed">"Third order with gold4you. Fast delivery, price was the best I found. Highly recommended."</p>
                          <p className="text-[10px] text-gray-400 mt-1">Thomas K. · München — <span className="text-green-600 font-medium">{t.detailVerifiedPurchase}</span></p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Personal Agent ── */}
                  <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
                    <button
                      onClick={() => { setChatOpen(true); setTimeout(() => chatInputRef.current?.focus(), 100); }}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative flex-shrink-0">
                          <img src="/agent-sofia.jpg" alt="Sofia" className="w-10 h-10 rounded-full object-cover" />
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Sofia · gold4you</p>
                          <p className="text-xs text-gray-400">{t.detailPersonalAdvisor}</p>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-gray-300" />
                    </button>
                  </div>

                </div>
              </div>

              {/* Product Reviews */}
              {(() => {
                const detailWeight = detail.weights[0]?.replace(/\s/g, '');
                const productReviews = REVIEWS.filter(r => {
                  const rw = r.product.split(' ')[0].replace(/\s/g, '');
                  return rw === detailWeight && r.product.toLowerCase().includes(detail.manufacturer.split(' ')[0].toLowerCase());
                });
                return productReviews.length > 0 ? (
                  <section className="mt-12" aria-label="Product reviews">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <p className="text-xs text-gray-400 mb-1">{t.verifiedBuyers}</p>
                        <h2 className="text-xl font-light text-gray-900">{t.customerReviews}</h2>
                      </div>
                      <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2">
                        <div className="flex items-center gap-0.5">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} size={12} fill="#f59e0b" stroke="#f59e0b" strokeWidth={1.5} />
                          ))}
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{(productReviews.reduce((s, r) => s + r.rating, 0) / productReviews.length).toFixed(1)}</span>
                        <span className="text-xs text-gray-400">({productReviews.length})</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {productReviews.map((review, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-2xl p-5">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-0.5">
                                {[1,2,3,4,5].map(i => (
                                  <Star key={i} size={11} fill={i <= review.rating ? '#f59e0b' : 'none'} stroke={i <= review.rating ? '#f59e0b' : '#d1d5db'} strokeWidth={1.5} />
                                ))}
                              </div>
                              <span className="text-xs font-medium text-gray-700">{review.name}</span>
                              <span className="text-[10px] text-gray-400">{review.location}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[10px] text-gray-400">{review.date}</span>
                              <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
                                <div className="w-1 h-1 rounded-full bg-green-500" />
                                <span className="text-[9px] text-green-600 font-medium">{t.verified}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">"{review.text}"</p>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null;
              })()}

              {/* Related */}
              {relatedProducts.length > 0 && (
                <section className="mt-16" aria-label="Related products">
                  <div className="mb-8">
                    <p className="text-xs text-gray-400 mb-1">{t.youMayLike}</p>
                    <h2 className="text-xl font-light text-gray-900">{t.relatedBars}</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    {relatedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="group cursor-pointer"
                        onClick={() => { setDetail(product); setWeight(product.weights[0] || ''); }}
                      >
                        <div className={`relative aspect-square rounded-3xl ${product.image ? 'bg-gray-50' : `bg-gradient-to-br ${product.gradient}`} overflow-hidden mb-3 transition-all duration-500 group-hover:shadow-xl group-hover:scale-[1.015]`}>
                          {product.image ? (
                            <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className={`text-5xl font-extralight ${product.textLight ? 'text-white/8' : 'text-black/[0.04]'}`}>Au</span>
                            </div>
                          )}
                          <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/95 backdrop-blur-md text-xs text-gray-900 px-5 py-2.5 rounded-2xl shadow-lg font-medium">
                              {t.detailView} →
                            </div>
                          </div>
                        </div>
                        <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                        <p className="text-sm text-gray-500">{fmt(livePrice(product))}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </article>

            {/* Detail page footer */}
            <footer className="px-4 md:px-6 py-10 mt-8">
              <div className="rounded-3xl bg-gray-50 border border-gray-100 px-8 py-8">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-md bg-black flex items-center justify-center">
                        <span className="text-amber-400 text-[8px] font-bold">Au</span>
                      </div>
                      <span className="text-xs font-semibold text-gray-900 tracking-[0.2em] uppercase">gold4you</span>
                    </div>
                    <div className="flex items-center gap-5 flex-wrap">
                      {[{l:t.imprint,v:'imprint'},{l:t.privacy,v:'privacy'},{l:t.terms,v:'terms'},{l:t.shipping,v:'shippingInfo'}].map((x) => (
                        <button key={x.v} onClick={() => { setView(x.v as any); window.scrollTo({top:0,behavior:'smooth'}); }} className="text-xs text-gray-400 hover:text-gray-900 transition-colors">{x.l}</button>
                      ))}
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <p className="text-[11px] text-gray-400">gold4you AG · Bahnhofstrasse 21, 8001 Zürich · CHE-123.456.789 · FINMA registered · VQF Member</p>
                    <p className="text-[11px] text-gray-400">© 2026 gold4you</p>
                  </div>
                </div>
              </div>
            </footer>
            </>

          ) : view === 'shop' ? (

            /* ============= SHOP PAGE ============= */
            <>
              {/* Live spot ticker */}
              <div className="mx-4 md:mx-6 mt-6 mb-0 bg-gray-50 rounded-2xl px-5 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-green-400 animate-pulse' : 'bg-gray-300'}`} />
                  <span className="text-xs text-gray-500">{t.shopGoldSpot}</span>
                  {isLive ? (
                    <>
                      <span className="text-sm font-semibold text-gray-900">{fmt(Math.round(spotOz!))}/oz</span>
                      <span className="text-[10px] text-gray-400">({fmt(Math.round(spotOz! / TROY_OZ_G))}/g)</span>
                    </>
                  ) : (
                    <span className="text-sm text-gray-400">{spotLoading ? t.shopLoading : t.shopOffline}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <span>{t.shopOurPrice}</span>
                  {isLive && <span>· {countdown}</span>}
                </div>
              </div>
              <section className="px-4 md:px-6 py-8" aria-label="Shop all gold bars">
                <header className="mb-8">
                  <p className="text-xs text-gray-400 mb-1">{t.catalogSub}</p>
                  <div className="flex items-end justify-between">
                    <h1 className="text-2xl md:text-3xl font-light text-gray-900" style={{ letterSpacing: '-0.02em' }}>
                      {section === 'all' ? t.catalogTitle : (section === 'investment' ? t.investment : t.premium)}
                    </h1>
                    <span className="text-sm text-gray-400 pb-1">
                      {products.length} {products.length === 1 ? t.bar : t.bars}
                    </span>
                  </div>
                  {/* Filter pills */}
                  <div className="flex items-center gap-2 mt-5">
                    {SECTIONS.map(({ key }) => (
                      <button
                        key={key}
                        onClick={() => setSection(key)}
                        className={`px-4 py-2 rounded-xl text-sm transition-all ${
                          section === key
                            ? 'bg-gray-900 text-white font-medium'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {key === 'all' ? t.allBars : key === 'investment' ? t.investment : t.premium}
                      </button>
                    ))}
                  </div>
                </header>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((product) => (
                    <article
                      key={product.id}
                      className="group cursor-pointer"
                      onClick={() => { setDetail(product); setWeight(product.weights[0] || ''); }}
                    >
                      <div className={`aspect-[4/5] rounded-2xl ${product.image ? 'bg-gray-50' : `bg-gradient-to-br ${product.gradient}`} relative overflow-hidden mb-3 transition-transform duration-300 group-hover:scale-[1.01]`}>
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain p-6" loading="lazy" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className={`text-5xl font-extralight ${product.textLight ? 'text-white/8' : 'text-black/[0.04]'}`} style={{ letterSpacing: '-0.04em' }}>Au</span>
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/95 backdrop-blur-md text-xs tracking-wide text-gray-900 px-5 py-2.5 rounded-2xl shadow-lg font-medium">
                            {t.shopViewDetails}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h2 className="text-sm font-medium text-gray-900 truncate">{product.name}</h2>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-semibold text-gray-900">{spotLoading && !spotOz ? '...' : fmt(livePrice(product))}</p>
                          <div className="flex items-center gap-1 justify-end">
                            {isLive && <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />}
                            <p className="text-[10px] text-green-600 font-medium">{isLive ? `−2% · ${countdown}` : 'Spot −2%'}</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Shop page footer */}
              <footer className="px-4 md:px-6 py-10">
                <div className="rounded-3xl bg-gray-50 border border-gray-100 px-8 py-8">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-5 h-5 rounded-md bg-black flex items-center justify-center">
                          <span className="text-amber-400 text-[8px] font-bold">Au</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-900 tracking-[0.2em] uppercase">gold4you</span>
                      </div>
                      <div className="flex items-center gap-5 flex-wrap">
                        {[{l:t.imprint,v:'imprint'},{l:t.privacy,v:'privacy'},{l:t.terms,v:'terms'},{l:t.shipping,v:'shippingInfo'}].map((x) => (
                          <button key={x.v} onClick={() => { setView(x.v as any); window.scrollTo({top:0,behavior:'smooth'}); }} className="text-xs text-gray-400 hover:text-gray-900 transition-colors">{x.l}</button>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row justify-between gap-2">
                      <p className="text-[11px] text-gray-400">gold4you AG · Bahnhofstrasse 21, 8001 Zürich · CHE-123.456.789 · FINMA registered · VQF Member</p>
                      <p className="text-[11px] text-gray-400 flex-shrink-0">© 2026 gold4you</p>
                    </div>
                  </div>
                </div>
              </footer>
            </>

          ) : (

            /* ============= HOME / LANDING ============= */
            <>
              {/* Hero CTA Banner */}
              <div className="px-4 md:px-6 pt-6 pb-2">
                <div className="relative overflow-hidden rounded-3xl min-h-[320px] md:min-h-[400px] flex items-center">
                  {/* Background image */}
                  <img src="/hero-gold-new.png" alt="" className="absolute inset-0 w-full h-full object-cover object-right" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                  <div className="relative z-10 w-full p-8 md:p-12">
                    <div className="max-w-lg">
                      <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md text-white text-xs font-medium px-4 py-1.5 rounded-full mb-4">
                        <BadgeCheck size={14} />
                        {t.heroBadge}
                      </div>
                      <h2 className="text-2xl md:text-4xl font-light text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
                        {t.heroTitle1} <span className="text-amber-400">{fmt(livePrice(PRODUCTS[0]))}</span><br />
                        {t.heroTitle2} <span className="text-amber-400">{fmt(Math.round(livePrice(PRODUCTS[0]) / 6))}{t.perMonth}</span>
                      </h2>
                      <p className="text-sm text-white/70 mb-6 max-w-sm">
                        {t.heroSub}
                      </p>
                      <div className="flex items-center gap-3 mb-6">
                        <button
                          onClick={() => { setView('shop'); setSection('all'); setDetail(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                          className="bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold px-7 py-3.5 rounded-2xl transition-all active:scale-[0.97] flex items-center gap-2 shadow-lg shadow-amber-500/25"
                        >
                          {t.shopNow} <ArrowRight size={14} />
                        </button>
                        <button
                          onClick={() => setView('about')}
                          className="text-sm text-white/80 hover:text-white px-6 py-3.5 rounded-2xl border border-white/20 hover:border-white/40 backdrop-blur-sm transition-all"
                        >
                          {t.aboutUs}
                        </button>
                      </div>
                      {/* Trust badges inside banner */}
                      <div className="flex items-center gap-4 md:gap-5 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <div className="flex items-center gap-0.5">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} size={11} fill="#22c55e" stroke="#22c55e" strokeWidth={1.5} />
                            ))}
                          </div>
                          <span className="text-xs font-medium text-white">4.87/5</span>
                          <span className="text-[11px] text-white/50">{t.homeReviewsCount}</span>
                        </div>
                        <div className="h-3 w-px bg-white/20" />
                        <span className="text-[11px] text-white/50">{t.homeBarsSold}</span>
                        <div className="h-3 w-px bg-white/20 hidden md:block" />
                        <span className="text-[11px] text-white/50 hidden md:inline">{t.homeCountries}</span>
                        <div className="h-3 w-px bg-white/20 hidden md:block" />
                        <span className="text-[11px] text-white/50 hidden md:inline">LBMA Certified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <section className="px-4 md:px-6 py-4" aria-label="Gold bar catalog">
                <header className="flex items-end justify-between mb-8 pb-4">
                  <div />
                  <button
                    onClick={() => { setView('shop'); setSection('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center gap-1 pb-1"
                  >
                    {t.allBars} <ArrowRight size={14} />
                  </button>
                </header>

                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-8" role="list" aria-label="Gold bars">
                  {PRODUCTS.slice(0, 8).map((product) => (
                    <article
                      key={product.id}
                      className="group cursor-pointer"
                      onClick={() => { setDetail(product); setWeight(product.weights[0] || ''); }}
                      role="listitem"
                    >
                      <div className={`relative aspect-square rounded-3xl ${product.image ? 'bg-gray-50' : `bg-gradient-to-br ${product.gradient}`} overflow-hidden mb-4 transition-all duration-500 ease-out group-hover:shadow-xl group-hover:scale-[1.015]`}>
                        <div className="absolute top-4 left-4 z-10">
                          <span className={`text-[10px] tracking-[0.2em] uppercase font-medium ${product.image ? 'text-black/20' : product.textLight ? 'text-white/40' : 'text-black/25'}`}>
                            N°{product.num}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 z-10">
                          {product.salePrice ? (
                            <span className="text-[10px] tracking-[0.1em] uppercase font-medium bg-white/90 text-amber-700 px-3 py-1 rounded-full backdrop-blur-sm">{t.homeSale}</span>
                          ) : (
                            <span className={`text-[10px] tracking-[0.1em] uppercase font-medium ${product.image ? 'text-black/10' : product.textLight ? 'text-white/25' : 'text-black/15'}`}>999.9</span>
                          )}
                        </div>
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className={`text-5xl font-extralight ${product.textLight ? 'text-white/8' : 'text-black/[0.04]'}`} style={{ letterSpacing: '-0.04em' }}>Au</span>
                          </div>
                        )}
                        <div className="absolute inset-x-0 bottom-0 flex justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/95 backdrop-blur-md text-xs tracking-wide text-gray-900 px-5 py-2.5 rounded-2xl shadow-lg font-medium">
                            {t.shopViewDetails}
                          </div>
                        </div>
                      </div>
                      <div className="px-1 flex items-start justify-between gap-2 mt-2">
                        <div className="min-w-0">
                          <h2 className="text-sm font-medium text-gray-900 truncate">{product.name}</h2>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-semibold text-gray-900">{spotLoading && !spotOz ? '...' : fmt(livePrice(product))}</p>
                          <div className="flex items-center gap-1 justify-end">
                            {isLive && <div className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />}
                            <p className="text-[10px] text-green-600 font-medium">{isLive ? `−2% · ${countdown}` : 'Spot −2%'}</p>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* View all button */}
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => { setView('shop'); setSection('all'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-8 py-3.5 rounded-2xl transition-all flex items-center gap-2"
                  >
                    {t.allBars} ({PRODUCTS.length}) <ArrowRight size={14} />
                  </button>
                </div>
              </section>

              {/* ── Financing + Custom Request Row ── */}
              <section className="px-4 md:px-6 py-10" aria-label="Financing">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Left — Financing */}
                  <div className="relative overflow-hidden rounded-3xl bg-[#f5f0e8] p-8 md:p-10">
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-700 text-xs font-medium px-4 py-1.5 rounded-full mb-4">
                        <CreditCard size={14} />
                        {t.financeAvail}
                      </div>
                      <h2 className="text-xl md:text-2xl font-light text-gray-900 mb-3">
                        {t.buyNow}<br /><span className="text-amber-600">{t.payOver}</span>
                      </h2>
                      <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                        {t.homeGoldShipsNote}
                      </p>
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        {[
                          { val: `${t.homeFromPrice} €8`, sub: t.homePerMonth },
                          { val: '3–24 mo', sub: t.homeTerms },
                          { val: '4.9%', sub: t.homeFromApr },
                          { val: t.homeSameDay, sub: 'shipping' },
                        ].map(({ val, sub }) => (
                          <div key={sub} className="bg-white/60 rounded-xl px-3 py-2.5">
                            <p className="text-sm font-light text-gray-900">{val}</p>
                            <p className="text-[10px] text-gray-400">{sub}</p>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => { setView('shop'); setSection('all'); setDetail(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        className="bg-amber-500 hover:bg-amber-400 text-black text-sm font-semibold px-6 py-3 rounded-2xl transition-all active:scale-[0.97] flex items-center gap-2"
                      >
                        Choose Your Bar <ArrowRight size={14} />
                      </button>
                    </div>
                    <div className="absolute -right-16 -bottom-16 w-60 h-60 bg-amber-300/20 rounded-full blur-3xl" />
                  </div>

                  {/* Right — Custom Request image card */}
                  <div
                    className="relative overflow-hidden rounded-3xl cursor-pointer group min-h-[320px]"
                    onClick={() => { document.getElementById('custom-orders')?.scrollIntoView({ behavior: 'smooth' }); }}
                  >
                    <img src="/custom-gold.png" alt="Custom gold orders" className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>

                {/* How it works */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {[
                    { step: '1', title: 'Choose your bar', desc: 'Browse our catalog and select the gold bar you want. All bars are LBMA certified.' },
                    { step: '2', title: 'Select financing', desc: 'Choose "Finance" as payment method and pick 3, 6, 12, or 24 months.' },
                    { step: '3', title: 'Instant approval', desc: 'A licensed partner runs a soft credit check — decision within minutes. No impact on your score.' },
                    { step: '4', title: 'Gold ships today', desc: 'Your bar ships immediately. gold4you sends you installment invoices (1–2 at a time) directly.' },
                  ].map(({ step, title, desc }) => (
                    <div key={step} className="bg-gray-50 rounded-2xl p-5">
                      <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center text-sm font-semibold mb-3">{step}</div>
                      <p className="text-sm font-medium text-gray-900 mb-1">{title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  ))}
                </div>

                {/* Example calculator — collapsible */}
                <div className="bg-gray-50 rounded-3xl mb-4 overflow-hidden">
                  <button
                    onClick={() => setCollapsed(c => ({ ...c, examples: !c.examples }))}
                    className="w-full flex items-center justify-between p-6 md:px-8 md:py-6 text-left hover:bg-gray-100/50 transition-colors"
                  >
                    <h3 className="text-lg font-light text-gray-900">{t.homeFinExamples}</h3>
                    <Plus size={18} className={`text-gray-400 transition-transform duration-200 ${collapsed.examples ? '' : 'rotate-45'}`} />
                  </button>
                  {!collapsed.examples && (
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="text-xs text-gray-400">
                              <th className="text-left pb-3 font-medium">{t.finBar}</th>
                              <th className="text-right pb-3 font-medium">{t.finPrice}</th>
                              <th className="text-right pb-3 font-medium">3 mo</th>
                              <th className="text-right pb-3 font-medium">6 mo</th>
                              <th className="text-right pb-3 font-medium">12 mo</th>
                              <th className="text-right pb-3 font-medium">24 mo</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {[
                              { name: '1g Fine Gold', price: 99 },
                              { name: '10g Fine Gold', price: 945 },
                              { name: '50g Fine Gold', price: 4690 },
                              { name: '100g Fine Gold', price: 9350 },
                              { name: '250g Fine Gold', price: 23300 },
                            ].map(({ name, price }) => (
                              <tr key={name} className="text-gray-700">
                                <td className="py-3 font-medium">{name}</td>
                                <td className="py-3 text-right">{fmt(price)}</td>
                                <td className="py-3 text-right">{fmt(Math.round(price * 1.049 / 3))}/mo</td>
                                <td className="py-3 text-right">{fmt(Math.round(price * 1.049 / 6))}/mo</td>
                                <td className="py-3 text-right">{fmt(Math.round(price * 1.079 / 12))}/mo</td>
                                <td className="py-3 text-right">{fmt(Math.round(price * 1.099 / 24))}/mo</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-gray-400 mt-4">{t.homeAprNote}</p>
                    </div>
                  )}
                </div>

                {/* Countries — collapsible */}
                <div className="bg-gray-50 rounded-3xl mb-4 overflow-hidden">
                  <button
                    onClick={() => setCollapsed(c => ({ ...c, countries: !c.countries }))}
                    className="w-full flex items-center justify-between p-6 md:px-8 md:py-6 text-left hover:bg-gray-100/50 transition-colors"
                  >
                    <h3 className="text-lg font-light text-gray-900">{t.availCountries}</h3>
                    <Plus size={18} className={`text-gray-400 transition-transform duration-200 ${collapsed.countries ? '' : 'rotate-45'}`} />
                  </button>
                  {!collapsed.countries && (
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-3">
                        {[
                          { flag: 'CH', country: 'Switzerland', partner: 'Byjuno / Powerpay' },
                          { flag: 'DE', country: 'Germany', partner: 'Klarna' },
                          { flag: 'AT', country: 'Austria', partner: 'Klarna' },
                          { flag: 'FR', country: 'France', partner: 'Klarna' },
                          { flag: 'IT', country: 'Italy', partner: 'Klarna' },
                          { flag: 'ES', country: 'Spain', partner: 'Klarna' },
                          { flag: 'NL', country: 'Netherlands', partner: 'Klarna' },
                          { flag: 'BE', country: 'Belgium', partner: 'Klarna' },
                          { flag: 'SE', country: 'Sweden', partner: 'Klarna' },
                          { flag: 'FI', country: 'Finland', partner: 'Klarna' },
                        ].map(({ flag, country, partner }) => (
                          <div key={country} className="flex items-center gap-3 bg-white rounded-xl px-4 py-3">
                            <span className="w-8 h-8 rounded-lg bg-gray-100 text-[10px] font-semibold text-gray-500 flex items-center justify-center flex-shrink-0">{flag}</span>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{country}</p>
                              <p className="text-xs text-gray-400">Credit check via {partner}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400">{t.homeCreditVia}</p>
                    </div>
                  )}
                </div>

                {/* Requirements — collapsible */}
                <div className="bg-gray-50 rounded-3xl mb-6 overflow-hidden">
                  <button
                    onClick={() => setCollapsed(c => ({ ...c, requirements: !c.requirements }))}
                    className="w-full flex items-center justify-between p-6 md:px-8 md:py-6 text-left hover:bg-gray-100/50 transition-colors"
                  >
                    <h3 className="text-lg font-light text-gray-900">{t.homeRequirements}</h3>
                    <Plus size={18} className={`text-gray-400 transition-transform duration-200 ${collapsed.requirements ? '' : 'rotate-45'}`} />
                  </button>
                  {!collapsed.requirements && (
                    <div className="px-6 md:px-8 pb-6 md:pb-8 space-y-3">
                      {[
                        { title: t.homeReqAge, desc: t.homeReqAgeSub },
                        { title: t.homeReqIncome, desc: t.homeReqIncomeSub },
                        { title: t.homeReqId, desc: t.homeReqIdSub },
                        { title: t.homeReqBank, desc: t.homeReqBankSub },
                        { title: 'Ownership', desc: 'You own the gold from day one. It ships to you immediately.' },
                        { title: 'Early repayment', desc: 'Pay off your balance early at any time. No penalty fees.' },
                      ].map(({ title, desc }) => (
                        <div key={title} className="flex gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-gray-700">{title}</p>
                            <p className="text-xs text-gray-400">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* FAQ */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">{t.homeFinFaq}</h4>
                  <div className="space-y-4">
                    {[
                      { q: 'Do I own the gold immediately?', a: 'Yes. Your gold bar ships the same day after approval. You own it from the moment it arrives — the financing is a personal loan, not a lease.' },
                      { q: 'What happens if I miss a payment?', a: 'gold4you will contact you directly. You keep the gold. Standard collection processes apply based on your country\'s regulations.' },
                      { q: 'Can I sell the gold while still paying?', a: 'Yes. The gold is yours to keep, sell, or store as you wish. Your monthly payments continue regardless.' },
                      { q: 'Is there a deposit required?', a: 'No. Zero down payment. The full bar value is financed and you start paying from month one.' },
                      { q: 'How fast is the credit decision?', a: 'Most decisions are instant (under 2 minutes). In some cases, the partner may take up to 24 hours for manual review.' },
                    ].map(({ q, a }) => (
                      <div key={q}>
                        <p className="text-sm font-medium text-gray-700 mb-1">{q}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── CTA Banner ── */}
              <section className="px-4 md:px-6 pt-4 pb-10">
                <div className="rounded-3xl overflow-hidden" style={{ background: '#f5f0e8' }}>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10">
                    <div>
                      <p className="text-[9px] tracking-[0.3em] uppercase text-amber-700/60 font-medium mb-2">Spot −2% · Financing Available</p>
                      <h3 className="text-xl md:text-2xl font-light text-gray-900" style={{ letterSpacing: '-0.01em' }}>{t.ctaHeadline}</h3>
                      <p className="text-sm text-gray-500 mt-1">{t.ctaSub}</p>
                    </div>
                    <button
                      onClick={() => { setView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-7 py-3.5 rounded-full hover:bg-black transition-colors flex-shrink-0"
                    >
                      {t.ctaBtn} <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </section>

              {/* ── Customer reviews ── */}
              <section className="px-4 md:px-6 py-12" aria-label="Customer reviews">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">{t.verifiedBuyers}</p>
                    <h2 className="text-xl font-light text-gray-900">{t.customerReviews}</h2>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-50 rounded-2xl px-5 py-3">
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <Star key={i} size={14} fill="#f59e0b" stroke="#f59e0b" strokeWidth={1.5} />
                      ))}
                    </div>
                    <div>
                      <span className="text-base font-semibold text-gray-900">4.87</span>
                      <span className="text-xs text-gray-400 ml-1">/ 5 · 847 reviews</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {REVIEWS.slice(0, 6).map((review) => (
                    <div key={review.name} className="bg-gray-50 rounded-3xl p-6 hover:bg-gray-100/80 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map(i => (
                            <Star key={i} size={14} fill={i <= review.rating ? '#f59e0b' : 'none'} stroke={i <= review.rating ? '#f59e0b' : '#d1d5db'} strokeWidth={1.5} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">{review.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed mb-5">
                        "{review.text}"
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                            <span className="text-[10px] font-semibold text-gray-500">{review.name.split(' ').map(n => n[0]).join('')}</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{review.name}</p>
                            <p className="text-xs text-gray-400">{review.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 bg-green-50 px-2.5 py-1 rounded-full">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                          <span className="text-[10px] text-green-600 font-medium">{t.homeVerified}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── Trusted by / press ── */}
              <section className="mx-4 md:mx-6 py-8" aria-label="Press and trust signals">
                <div className="rounded-3xl bg-gray-50 py-7 px-8">
                  <p className="text-xs text-gray-400 text-center mb-5 font-medium">{t.recognizedBy}</p>
                  <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap">
                    {['Handelsblatt', 'NZZ', 'Finanz und Wirtschaft', 'Gold.de', 'BullionVault'].map(name => (
                      <span key={name} className="text-sm text-gray-300 font-semibold hover:text-gray-500 transition-colors cursor-default">{name}</span>
                    ))}
                  </div>
                </div>
              </section>

              {/* Custom Orders Section — hidden for now */}

              {/* ── Contact Section ── */}
              <section className="px-4 md:px-6 py-14" aria-label="Contact" id="contact">
                <div className="mb-8">
                  <span className="block text-[9px] tracking-[0.35em] uppercase text-gray-300 mb-1">{t.getInTouch}</span>
                  <h2 className="text-xl font-extralight text-gray-900" style={{ letterSpacing: '-0.02em' }}>{t.contact}</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Contact info */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <p className="text-sm font-medium text-gray-900 mb-4">gold4you AG</p>
                    <div className="space-y-3 mb-5">
                      <a href="tel:+41445201000" className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                        <Phone size={14} className="text-gray-400" />
                        +41 44 520 10 00
                      </a>
                      <a href="https://wa.me/41445201000" className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                        <MessageCircle size={14} className="text-gray-400" />
                        WhatsApp
                      </a>
                      <a href="mailto:info@gold4you.com" className="flex items-center gap-3 text-sm text-gray-700 hover:text-gray-900 transition-colors">
                        <Mail size={14} className="text-gray-400" />
                        info@gold4you.com
                      </a>
                    </div>
                    <div className="border-t border-gray-200 pt-4 space-y-1 text-xs text-gray-400">
                      <p>Bahnhofstrasse 21, 8001 Zurich, Switzerland</p>
                      <p>Mon–Fri 09:00–18:00 CET · Sat 10:00–14:00</p>
                    </div>
                  </div>

                  {/* Personal agent card */}
                  <div className="bg-gray-50 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="relative flex-shrink-0">
                          <img src="/agent-sofia.jpg" alt="Sofia" className="w-10 h-10 rounded-full object-cover" />
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Sofia</p>
                          <p className="text-xs text-gray-400">{t.homePersonalAdvisor}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed mb-5">
                        {t.homeQuestions}
                      </p>
                    </div>
                    <button
                      onClick={() => { setChatOpen(true); setTimeout(() => chatInputRef.current?.focus(), 100); }}
                      className="w-full bg-gray-900 hover:bg-black text-white text-sm font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={14} />
                      {t.homeStartChat}
                    </button>
                  </div>
                </div>
              </section>

              {/* Quote section — hidden for now */}

              {/* Footer */}
              <footer className="px-4 md:px-6 py-10">
                <div className="rounded-3xl bg-gray-50 border border-gray-100 px-8 py-10">
                  {/* Top row — logo + columns */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-2">
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-5 h-5 rounded-md bg-black flex items-center justify-center">
                          <span className="text-amber-400 text-[8px] font-bold">Au</span>
                        </div>
                        <span className="text-xs font-semibold text-gray-900 tracking-[0.2em] uppercase">gold4you</span>
                      </div>
                      <p className="text-sm text-gray-500 leading-relaxed max-w-xs mb-5">
                        {t.footerDesc}
                      </p>
                      {/* Language selector in footer */}
                      <button
                        onClick={() => setShowLangPicker(true)}
                        className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-700 transition-colors"
                      >
                        <Globe size={14} />
                        <span>{LANGS.find(l => l.code === lang)?.flag} {LANGS.find(l => l.code === lang)?.label}</span>
                      </button>
                    </div>
                    {/* Shop links */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wider">{t.footerShop}</h4>
                      <div className="space-y-2.5">
                        <button onClick={() => { setSection('all'); setView('shop'); setDetail(null); }} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">{t.allBars}</button>
                        <button onClick={() => { setSection('investment'); setView('shop'); setDetail(null); }} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">{t.investment}</button>
                        <button onClick={() => { setSection('premium'); setView('shop'); setDetail(null); }} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">{t.premium}</button>
                        <button onClick={() => setView('about')} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">{t.footerReviews}</button>
                      </div>
                    </div>
                    {/* Financing links */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wider">{t.footerFinancing}</h4>
                      <div className="space-y-2.5">
                        <button onClick={() => { setView('financing'); setFinanceStep('info'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">{t.financingProfile}</button>
                        <button className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">{t.footerFaq}</button>
                      </div>
                    </div>
                    {/* Company links */}
                    <div>
                      <h4 className="text-xs font-semibold text-gray-900 mb-4 uppercase tracking-wider">{t.footerAbout}</h4>
                      <div className="space-y-2.5">
                        <button onClick={() => setView('about')} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">{t.about}</button>
                        <button className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">{t.footerContact}</button>
                        <button onClick={() => { setView('imprint'); window.scrollTo({top:0,behavior:'smooth'}); }} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">{t.imprint}</button>
                        <button onClick={() => { setView('privacy'); window.scrollTo({top:0,behavior:'smooth'}); }} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">{t.privacy}</button>
                        <button onClick={() => { setView('terms'); window.scrollTo({top:0,behavior:'smooth'}); }} className="block text-sm text-gray-500 hover:text-gray-900 transition-colors">{t.terms}</button>
                      </div>
                    </div>
                  </div>
                  {/* Legal line */}
                  <div className="border-t border-gray-200 pt-6 space-y-3">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <button onClick={() => { setView('admin'); setAdminTab('dashboard'); window.scrollTo({ top: 0 }); }} className="text-xs text-gray-400 hover:text-gray-600 transition-colors">© 2026 gold4you AG — Zurich, Switzerland</button>
                      <div className="flex items-center gap-5">
                        {[{l:t.imprint,v:'imprint'},{l:t.privacy,v:'privacy'},{l:t.terms,v:'terms'},{l:t.shipping,v:'shippingInfo'}].map((x) => (
                          <button key={x.v} onClick={() => { setView(x.v as any); window.scrollTo({top:0,behavior:'smooth'}); }} className="text-xs text-gray-400 hover:text-gray-900 transition-colors">{x.l}</button>
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-300 leading-relaxed">
                      gold4you AG · Bahnhofstrasse 21, 8001 Zürich · CHE-123.456.789 · HR Kanton Zürich ·
                      FINMA registered precious metals dealer · VQF self-regulatory organization member ·
                      Investment gold pursuant to Art. 107 para. 2 VAT Act exempt from VAT.
                      All prices include insured delivery. Bars refined in Dubai with LBMA assay certificates. Financing provided by licensed partners (Byjuno AG, Powerpay, Klarna Bank AB).
                    </p>
                  </div>
                </div>
              </footer>
            </>
          )}
        </main>
      </div>

      {/* ─────────────── CART SIDEBAR ─────────────── */}
      {cartOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end" role="dialog" aria-label="Shopping cart">
          <div className="absolute inset-0 bg-black/15 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-[400px] bg-white border-l border-gray-100 h-full flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <div>
                <h2 className="text-sm font-medium text-gray-900">{t.cartTitle}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{cartCount} {cartCount === 1 ? t.bar : t.bars}</p>
              </div>
              <button onClick={() => setCartOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all" aria-label="Close cart">
                <X size={14} strokeWidth={1.5} className="text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <ShoppingBag size={32} strokeWidth={1} className="text-gray-200" />
                  <p className="text-sm text-gray-400">{t.cartEmpty}</p>
                  <button onClick={() => setCartOpen(false)} className="text-xs text-gray-900 underline underline-offset-4 hover:text-gray-600 transition-colors">
                    {t.cartContinue}
                  </button>
                </div>
              ) : (
                <div className="space-y-0 divide-y divide-gray-100">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.weight}`} className="flex gap-4 py-4">
                      <div className={`w-16 h-16 rounded-2xl ${item.image ? 'bg-gray-50' : `bg-gradient-to-br ${item.gradient}`} flex-shrink-0 flex items-center justify-center overflow-hidden`}>
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1.5" />
                        ) : (
                          <span className={`text-lg font-extralight ${item.textLight ? 'text-white/15' : 'text-black/[0.06]'}`}>Au</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{item.subtitle}</p>
                          </div>
                          <button onClick={() => removeFromCart(item.id, item.weight)} className="text-gray-300 hover:text-gray-600 transition-colors flex-shrink-0 mt-1" aria-label={`Remove ${item.name}`}>
                            <X size={14} />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-3 border border-gray-200 rounded-full px-3 py-1.5">
                            <button onClick={() => updateQty(item.id, item.weight, -1)} className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="Decrease quantity"><Minus size={12} /></button>
                            <span className="text-xs w-4 text-center text-gray-700 font-medium">{item.qty}</span>
                            <button onClick={() => updateQty(item.id, item.weight, 1)} className="text-gray-400 hover:text-gray-700 transition-colors" aria-label="Increase quantity"><Plus size={12} /></button>
                          </div>
                          <p className="text-sm font-medium text-gray-900">{fmt(livePrice(item) * item.qty)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="px-6 py-6 border-t border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-500">{t.cartSubtotal}</span>
                  <span className="text-lg font-medium text-gray-900">{fmt(cartTotal)}</span>
                </div>
                <p className="text-xs text-gray-400 mb-2">{t.cartVatNote}</p>
                {needsKyc && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 mb-3">
                    <p className="text-xs text-amber-800 font-medium">{t.cartKycNote}</p>
                  </div>
                )}
                <button
                  onClick={() => { if (needsKyc) { setCartOpen(false); setShowKyc(true); } else { startCheckout(); } }}
                  className="w-full bg-black text-white text-sm font-semibold py-3.5 rounded-2xl hover:bg-gray-900 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {needsKyc ? t.cartCompleteKyc : t.cartCheckout} <ArrowRight size={14} />
                </button>
                <button onClick={() => setCartOpen(false)} className="w-full mt-3 text-xs text-gray-400 hover:text-gray-700 transition-colors">
                  {t.cartContinue}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─────────────── KYC MODAL ─────────────── */}
      {showKyc && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center" role="dialog" aria-label="KYC Verification">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowKyc(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 p-8 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowKyc(false)} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <X size={18} className="text-gray-400" />
            </button>
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-medium px-3 py-1.5 rounded-full mb-3">
                <Shield size={12} />
                {t.kycTitle}
              </div>
              <h2 className="text-xl font-light text-gray-900 mb-1">{t.kycSubtitle}</h2>
              <p className="text-sm text-gray-500">{t.kycSub}</p>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">{t.firstName}</label>
                  <input type="text" value={kycForm.firstName} onChange={e => setKycForm(p => ({ ...p, firstName: e.target.value }))} className={inputCls} placeholder="Max" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">{t.lastName}</label>
                  <input type="text" value={kycForm.lastName} onChange={e => setKycForm(p => ({ ...p, lastName: e.target.value }))} className={inputCls} placeholder="Muster" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">{t.email}</label>
                <input type="email" value={kycForm.email} onChange={e => setKycForm(p => ({ ...p, email: e.target.value }))} className={inputCls} placeholder="max@example.com" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">{t.phone}</label>
                <input type="tel" value={kycForm.phone} onChange={e => setKycForm(p => ({ ...p, phone: e.target.value }))} className={inputCls} placeholder="+41 79 000 00 00" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">{t.dob}</label>
                  <input type="date" value={kycForm.dob} onChange={e => setKycForm(p => ({ ...p, dob: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1.5 block">{t.nationality}</label>
                  <input type="text" value={kycForm.nationality} onChange={e => setKycForm(p => ({ ...p, nationality: e.target.value }))} className={inputCls} placeholder="Swiss" />
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">{t.kycResAddress}</label>
                <input type="text" value={kycForm.address} onChange={e => setKycForm(p => ({ ...p, address: e.target.value }))} className={inputCls} placeholder="Bahnhofstrasse 1, 8001 Zürich" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">{t.kycIdDocType}</label>
                <select value={kycForm.docType} onChange={e => setKycForm(p => ({ ...p, docType: e.target.value }))} className={inputCls}>
                  <option value="">{t.coSelectDots}</option>
                  <option value="passport">{t.passport}</option>
                  <option value="id">{t.nationalId}</option>
                  <option value="driving">{t.driversLicense}</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">{t.kycIdDocNumber}</label>
                <input type="text" value={kycForm.docNumber} onChange={e => setKycForm(p => ({ ...p, docNumber: e.target.value }))} className={inputCls} placeholder="X12345678" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1.5 block">{t.kycUploadId}</label>
                <label className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-gray-300 transition-colors cursor-pointer block">
                  <input type="file" accept="image/*,.pdf" className="hidden" multiple />
                  <p className="text-sm text-gray-400">{t.kycDragDrop}</p>
                  <p className="text-[10px] text-gray-300 mt-1">{t.kycFileTypes}</p>
                </label>
              </div>
              {cartWeightG > 5000 && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-500 mb-1">{t.homeYourOrder} <span className="font-medium text-gray-700">{(cartWeightG / 1000).toFixed(1)} kg</span></p>
                  <p className="text-xs text-gray-400">Swiss AML regulations require KYC for precious metal orders exceeding 5 kg.</p>
                </div>
              )}
              <button
                onClick={() => {
                  if (!kycForm.firstName || !kycForm.lastName || !kycForm.email || !kycForm.docType || !kycForm.docNumber) return;
                  const sub: KycSubmission = {
                    id: `KYC-${Date.now()}`, orderId: '-', date: new Date().toISOString(),
                    firstName: kycForm.firstName, lastName: kycForm.lastName, email: kycForm.email,
                    docType: kycForm.docType, docNumber: kycForm.docNumber, status: 'pending',
                  };
                  const u = [...kycSubs, sub]; setKycSubs(u); save(STORE.kyc, u);
                  setShowKyc(false);
                  setKycForm({ firstName: '', lastName: '', email: '', phone: '', dob: '', nationality: '', address: '', docType: '', docNumber: '' });
                  startCheckout();
                }}
                className="w-full bg-black text-white text-sm font-semibold py-3.5 rounded-2xl hover:bg-gray-900 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {t.kycSubmit} <ArrowRight size={14} />
              </button>
              <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                {t.kycDataNote}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────── WELCOME MODAL ─────────────── */}
      {showWelcome && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center" role="dialog" aria-label="Choose your language">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 p-8 animate-in">
            <div className="text-center mb-8">
              <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center mx-auto mb-4">
                <span className="text-amber-400 text-sm font-bold">Au</span>
              </div>
              <h2 className="text-xl font-light text-gray-900 mb-2">{t.welcomeTitle}</h2>
              <p className="text-sm text-gray-500">{t.welcomeSub}</p>
            </div>
            <div className="grid grid-cols-3 gap-2 mb-6">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => changeLang(l.code)}
                  className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border transition-all hover:bg-gray-50 ${
                    lang === l.code ? 'border-amber-400 bg-amber-50/50' : 'border-gray-100'
                  }`}
                >
                  <span className="text-2xl">{l.flag}</span>
                  <span className="text-xs text-gray-700 font-medium">{l.label}</span>
                  <span className="text-[10px] text-gray-400">{l.country}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => changeLang(lang)}
              className="w-full bg-black text-white text-sm font-semibold py-3.5 rounded-2xl hover:bg-gray-900 active:scale-[0.98] transition-all"
            >
              {t.continueBtn}
            </button>
          </div>
        </div>
      )}

      {/* ─────────────── FLOATING CHAT AGENT ─────────────── */}
      {/* FAB */}
      {!chatOpen && (
        <button
          onClick={() => { setChatOpen(true); setTimeout(() => chatInputRef.current?.focus(), 100); }}
          className="fixed bottom-6 right-6 z-[300] group"
          aria-label="Open chat"
        >
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/20 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform border-2 border-white">
              <MessageCircle size={22} className="text-white" />
            </div>
            <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-white animate-pulse" />
          </div>
        </button>
      )}

      {/* Chat panel */}
      {chatOpen && (
        <div className="fixed bottom-6 right-6 z-[300] w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-6rem)] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0">
                <img src="/agent-sofia.jpg" alt="Sofia" className="w-9 h-9 rounded-full object-cover" />
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Sofia</p>
                <p className="text-[10px] text-gray-400">{t.chatReplies}</p>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={14} className="text-gray-400" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {chatMsgs.map((m, i) => (
              <div key={i} className={`flex items-end gap-2 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'agent' && (
                  <img src="/agent-sofia.jpg" alt="Sofia" className="w-7 h-7 rounded-full object-cover flex-shrink-0 mb-0.5" />
                )}
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  m.role === 'user'
                    ? 'bg-gray-900 text-white rounded-br-md'
                    : 'bg-gray-100 text-gray-700 rounded-bl-md'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {chatTyping && (
              <div className="flex items-end gap-2 justify-start">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-sm flex-shrink-0 mb-0.5">
                  <span role="img" aria-label="agent">👩🏼</span>
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick actions */}
          {chatMsgs.length <= 1 && (
            <div className="px-5 pb-2 flex flex-wrap gap-1.5">
              {[t.chatPricing, t.chatFinancing, t.chatDelivery, t.chatKyc, t.chatContact].map(q => (
                <button
                  key={q}
                  onClick={() => {
                    setChatMsgs(prev => [...prev, { role: 'user', text: q }]);
                    setChatTyping(true);
                    setTimeout(() => {
                      setChatMsgs(prev => [...prev, { role: 'agent', text: chatRespond(q) }]);
                      setChatTyping(false);
                    }, 800 + Math.random() * 700);
                  }}
                  className="text-[11px] text-gray-500 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-100">
            <form onSubmit={(e) => { e.preventDefault(); sendChat(); }} className="flex items-center gap-2">
              <input
                ref={chatInputRef}
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t.chatPlaceholder}
                className="flex-1 text-sm bg-gray-50 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-400/30 transition-all placeholder:text-gray-300"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="w-9 h-9 rounded-xl bg-gray-900 text-white flex items-center justify-center hover:bg-black transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0"
              >
                <ArrowRight size={14} />
              </button>
            </form>
            <p className="text-[9px] text-gray-300 text-center mt-2">{t.chatFinmaNote}</p>
          </div>
        </div>
      )}

      {/* Hide scrollbar on ticker */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
