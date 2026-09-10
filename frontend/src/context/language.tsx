import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type Language = "en" | "hi";

const hindi: Record<string, string> = {
  Home: "होम",
  Schemes: "योजनाएँ",
  Calculator: "कैलकुलेटर",
  Partners: "साझेदार",
  "Track Application": "आवेदन ट्रैक करें",
  Login: "लॉग इन",
  "Find My Scheme": "मेरी योजना खोजें",
  "Scheme Discovery": "योजना खोज",
  "NSFDC concessional credit for SC beneficiaries": "अनुसूचित जाति लाभार्थियों के लिए NSFDC रियायती ऋण",
  "Find the right": "अपने लिए सही",
  "NSFDC credit product": "NSFDC ऋण उत्पाद",
  "for you.": "खोजें।",
  "SchemeSaarthi helps SC entrepreneurs and students (family income ≤ ₹5 lakh) find the right NSFDC concessional credit product — Micro Finance, Term Loan or Educational Loan — and connects you to the Channel Partner (SCA, PSB, RRB or NBFC-MFI) to apply.": "SchemeSaarthi अनुसूचित जाति के उद्यमियों और छात्रों (पारिवारिक आय ≤ ₹5 लाख) को सही NSFDC रियायती ऋण उत्पाद — सूक्ष्म वित्त, सावधि ऋण या शिक्षा ऋण — खोजने और आवेदन के लिए चैनल पार्टनर (SCA, PSB, RRB या NBFC-MFI) से जुड़ने में मदद करता है।",
  "Explore Credit Products": "ऋण उत्पाद देखें",
  "Explore Schemes": "योजनाएँ देखें",
  Profile: "प्रोफ़ाइल",
  "Share your needs": "अपनी जरूरत बताएँ",
  "Scheme Match": "योजना मिलान",
  "Get recommendations": "सुझाव पाएँ",
  Documents: "दस्तावेज़",
  "Know what to prepare": "जानें क्या तैयार करना है",
  Apply: "आवेदन",
  "Continue to official channel": "आधिकारिक माध्यम पर जाएँ",
  "What would you like to do?": "आप क्या करना चाहेंगे?",
  "Pick a starting point — we'll guide you to the right credit product.": "शुरुआत चुनें—हम आपको सही ऋण उत्पाद तक पहुँचाएँगे।",
  "Start or Expand a Business": "व्यवसाय शुरू करें या बढ़ाएँ",
  "Access NSFDC concessional credit — Micro Finance or Term Loan — to launch or grow your enterprise as an SC beneficiary.": "अनुसूचित जाति लाभार्थी के रूप में अपना उद्यम शुरू करने या बढ़ाने के लिए NSFDC रियायती ऋण — सूक्ष्म वित्त या सावधि ऋण — प्राप्त करें।",
  Education: "शिक्षा",
  "Find NSFDC-backed educational loans for SC students with concessional interest rates and flexible moratorium.": "अनुसूचित जाति के छात्रों के लिए रियायती ब्याज दर और लचीले मोरेटोरियम वाले NSFDC शिक्षा ऋण खोजें।",
  "Browse all three NSFDC credit products and compare ceilings, rates and moratorium periods.": "सभी तीन NSFDC ऋण उत्पाद देखें और सीमा, दर और मोरेटोरियम अवधि की तुलना करें।",
  "Understand Loan Terms": "ऋण की शर्तें समझें",
  "Clear, jargon-free explanations of NSFDC interest rates, collateral, moratorium and repayment through Channel Partners.": "चैनल पार्टनरों के माध्यम से NSFDC ब्याज दर, जमानत, मोरेटोरियम और पुनर्भुगतान की सरल जानकारी।",
  "Get started": "शुरू करें",
  "How it works": "यह कैसे काम करता है",
  "Four simple steps from discovery to application.": "खोज से आवेदन तक चार आसान चरण।",
  "Tell us about your needs": "अपनी जरूरतों के बारे में बताएँ",
  "Share your goals, SC category status, family income and location in a short guided questionnaire.": "एक छोटे प्रश्नपत्र में अपना लक्ष्य, अनुसूचित जाति स्थिति, पारिवारिक आय और स्थान बताएँ।",
  "Check your preliminary eligibility": "प्रारंभिक पात्रता जाँचें",
  "See which NSFDC credit products you qualify for based on your SC status and income (≤ ₹5 lakh) — instantly.": "अपनी अनुसूचित जाति स्थिति और आय (≤ ₹5 लाख) के आधार पर तुरंत जानें कि आप किन NSFDC ऋण उत्पादों के पात्र हैं।",
  "Compare suitable schemes": "उपयुक्त योजनाओं की तुलना करें",
  "Review NSFDC interest rates (6.5%–15%), loan ceilings, collateral requirements and moratorium periods side by side.": "NSFDC ब्याज दर (6.5%–15%), ऋण सीमा, जमानत आवश्यकताएँ और मोरेटोरियम अवधि की साथ-साथ तुलना करें।",
  "Continue to the official application channel": "आधिकारिक आवेदन माध्यम पर जाएँ",
  "We direct you to the authorized Channel Partner — SCA, PSB, RRB or NBFC-MFI — to submit your application.": "आवेदन जमा करने के लिए हम आपको अधिकृत चैनल पार्टनर — SCA, PSB, RRB या NBFC-MFI — तक पहुँचाते हैं।",
  "Popular schemes": "लोकप्रिय योजनाएँ",
  "The three NSFDC concessional credit products available for SC beneficiaries.": "अनुसूचित जाति लाभार्थियों के लिए उपलब्ध तीन NSFDC रियायती ऋण उत्पाद।",
  "View all schemes": "सभी योजनाएँ देखें",
  "Micro Finance Scheme": "सूक्ष्म वित्त योजना",
  "Term Loan Scheme": "सावधि ऋण योजना",
  "Educational Loan Scheme": "शिक्षा ऋण योजना",
  Business: "व्यवसाय",
  "View Details": "विवरण देखें",
  "Small-ticket NSFDC credit up to ₹1,40,000 through NBFC-MFI channel partners for SC micro entrepreneurs.": "अनुसूचित जाति के सूक्ष्म उद्यमियों के लिए NBFC-MFI चैनल पार्टनरों के माध्यम से ₹1,40,000 तक का NSFDC लघु ऋण।",
  "Concessional NSFDC term financing up to ₹50 lakh for SC entrepreneurs to set up or expand manufacturing and service units.": "निर्माण और सेवा इकाइयों की स्थापना या विस्तार के लिए अनुसूचित जाति उद्यमियों को ₹50 लाख तक का NSFDC रियायती सावधि वित्त।",
  "NSFDC-backed education loans for SC students with concessional rates and a moratorium during the course.": "अनुसूचित जाति के छात्रों के लिए रियायती दर और पाठ्यक्रम के दौरान मोरेटोरियम सहित NSFDC शिक्षा ऋण।",
  "Up to ₹1,40,000": "₹1,40,000 तक",
  "~6.5% interest": "~6.5% ब्याज",
  "3–6 month moratorium": "3–6 महीने मोरेटोरियम",
  "Up to ₹50 lakh": "₹50 लाख तक",
  "6.5–10% interest": "6.5–10% ब्याज",
  "6–12 month moratorium": "6–12 महीने मोरेटोरियम",
  "6.5–15% interest": "6.5–15% ब्याज",
  "Moratorium during studies": "पढ़ाई के दौरान मोरेटोरियम",
  "Routed via Channel Partners": "चैनल पार्टनरों के माध्यम से",
  "Why SchemeSaarthi": "SchemeSaarthi क्यों",
  "Built to make NSFDC concessional credit accessible to SC entrepreneurs.": "अनुसूचित जाति उद्यमियों के लिए NSFDC रियायती ऋण को सुलभ बनाने के लिए।",
  "Personalized recommendations": "व्यक्तिगत सुझाव",
  "Credit products matched to your SC category, income level and business or education goal — not a generic list.": "आपकी अनुसूचित जाति श्रेणी, आय स्तर और व्यवसाय या शिक्षा लक्ष्य के अनुसार ऋण उत्पाद—सामान्य सूची नहीं।",
  "Easy-to-understand eligibility": "आसान पात्रता जानकारी",
  "Plain-language eligibility checks covering SC status, family income (≤ ₹5 lakh) and other NSFDC criteria.": "सरल भाषा में पात्रता जाँच — अनुसूचित जाति स्थिति, पारिवारिक आय (≤ ₹5 लाख) और अन्य NSFDC मानदंड।",
  "Document guidance": "दस्तावेज़ मार्गदर्शन",
  "A clear checklist of the documents each NSFDC credit product requires before you apply through a Channel Partner.": "चैनल पार्टनर के माध्यम से आवेदन से पहले हर NSFDC ऋण उत्पाद के लिए जरूरी दस्तावेज़ों की स्पष्ट सूची।",
  "Multilingual support": "बहुभाषी सहायता",
  "Use SchemeSaarthi in English or हिंदी — more languages coming soon.": "SchemeSaarthi का उपयोग अंग्रेज़ी या हिन्दी में करें—अन्य भाषाएँ जल्द आएँगी।",
  "Learn More": "और जानें",
  "Quick Links": "त्वरित लिंक",
  About: "हमारे बारे में",
  FAQs: "सामान्य प्रश्न",
  "Privacy Policy": "गोपनीयता नीति",
  Terms: "नियम",
  Contact: "संपर्क",
  "Important Disclaimer": "महत्वपूर्ण अस्वीकरण",
  "Helping SC beneficiaries (family income ≤ ₹5 lakh) discover NSFDC concessional credit products — Micro Finance, Term Loan and Educational Loan — and connect with authorized Channel Partners.": "अनुसूचित जाति लाभार्थियों (पारिवारिक आय ≤ ₹5 लाख) को NSFDC रियायती ऋण उत्पाद — सूक्ष्म वित्त, सावधि ऋण और शिक्षा ऋण — खोजने और अधिकृत चैनल पार्टनरों से जुड़ने में मदद।",
  "SchemeSaarthi is an independent guidance platform. Final approval, verification, and disbursal of NSFDC concessional credit is handled solely by the authorized Channel Partners — State Channelizing Agencies (SCAs), Public Sector Banks (PSBs), Regional Rural Banks (RRBs), and NBFC-MFIs. SchemeSaarthi does not guarantee approval or act as a lender.": "SchemeSaarthi एक स्वतंत्र मार्गदर्शन मंच है। NSFDC रियायती ऋण की अंतिम मंजूरी, सत्यापन और वितरण केवल अधिकृत चैनल पार्टनरों — राज्य चैनलाइज़िंग एजेंसियों (SCAs), सार्वजनिक क्षेत्र के बैंकों (PSBs), क्षेत्रीय ग्रामीण बैंकों (RRBs) और NBFC-MFIs — द्वारा किया जाता है। SchemeSaarthi मंजूरी की गारंटी नहीं देता और ऋणदाता नहीं है।",
  "For guidance purposes only.": "केवल मार्गदर्शन के लिए।",
  "Empowering SC entrepreneurs": "अनुसूचित जाति उद्यमियों को सशक्त बनाना",
  "Welcome back": "फिर से स्वागत है",
  "Sign in to save matches and track your applications.": "मिलान सहेजने और आवेदन ट्रैक करने के लिए साइन इन करें।",
  "Email or mobile": "ईमेल या मोबाइल",
  Password: "पासवर्ड",
  "Sign in": "साइन इन",
  or: "या",
  "Use OTP to sign in": "OTP से साइन इन करें",
  "New to SchemeSaarthi?": "SchemeSaarthi पर नए हैं?",
  Register: "रजिस्टर करें",
  "Create your account": "अपना खाता बनाएँ",
  "Save your scheme matches and track applications in one place.": "अपनी योजनाएँ सहेजें और आवेदन एक ही जगह ट्रैक करें।",
  "Full name": "पूरा नाम",
  "Mobile number": "मोबाइल नंबर",
  "Confirm password": "पासवर्ड की पुष्टि करें",
  "Create account": "खाता बनाएँ",
  "Already registered?": "पहले से पंजीकृत हैं?",
  "Track your application": "अपना आवेदन ट्रैक करें",
  "Track status": "स्थिति ट्रैक करें",
  "Loan calculator": "ऋण कैलकुलेटर",
  "Estimate your monthly repayment before comparing schemes.": "योजनाओं की तुलना से पहले मासिक किस्त का अनुमान लगाएँ।",
  "Loan amount (₹)": "ऋण राशि (₹)",
  "Annual interest rate (%)": "वार्षिक ब्याज दर (%)",
  "Repayment period (years)": "पुनर्भुगतान अवधि (वर्ष)",
  "Estimated monthly repayment": "अनुमानित मासिक किस्त",
  "NSFDC Channel Partners": "NSFDC चैनल पार्टनर",
  "State Channelizing Agencies (SCAs)": "राज्य चैनलाइज़िंग एजेंसियाँ (SCAs)",
  "Public Sector Banks (PSBs) & Regional Rural Banks (RRBs)": "सार्वजनिक क्षेत्र के बैंक (PSBs) और क्षेत्रीय ग्रामीण बैंक (RRBs)",
  "NBFC-MFIs": "NBFC-MFIs",
  "Become a partner": "साझेदार बनें",

  // Guided Flow & Step Indicator
  "Step 1": "चरण 1",
  "Step 2": "चरण 2",
  "Step 3": "चरण 3",
  "Step 4": "चरण 4",
  "Eligibility & Match": "पात्रता और योजना मिलान",
  "Rule-based check": "नियम-आधारित जाँच",
  "EMI Calculator": "ईएमआई कैलकुलेटर",
  "Scheme-specific terms": "योजना-विशिष्ट शर्तें",
  "Partner Locator": "साझेदार खोजक",
  "Geo & health filter": "स्थान और वित्तीय स्थिति",
  "Summary & Review": "समीक्षा और सारांश",
  "Pre-filled handoff": "तैयार आवेदन",
  "Guided NSFDC Credit Pathway": "मार्गदर्शित NSFDC ऋण प्रक्रिया",
  "Find My Scheme & Channel Partner": "मेरी योजना और चैनल पार्टनर खोजें",
  "A seamless 4-step journey: Verify statutory eligibility, simulate scheme-specific EMI terms, locate active Channel Partners, and generate your application dossier.": "एक निर्बाध 4-चरणीय यात्रा: वैधानिक पात्रता सत्यापित करें, ईएमआई की गणना करें, सक्रिय चैनल पार्टनर खोजें और अपना आवेदन तैयार करें।",

  // Recommender
  "Strict Rule-Based Recommender": "सख्त नियम-आधारित चयनकर्ता",
  "Eligibility & Scheme Discovery": "पात्रता और योजना चयन",
  "Provide your family profile and funding requirement. We evaluate statutory NSFDC credit rules instantly.": "अपनी पारिवारिक जानकारी और ऋण आवश्यकता दर्ज करें। हम NSFDC नियमों के अनुसार तुरंत मूल्यांकन करते हैं।",
  "1. Do you belong to the Scheduled Caste (SC) category?": "1. क्या आप अनुसूचित जाति (SC) श्रेणी से संबंधित हैं?",
  "NSFDC credit is exclusively reserved for SC beneficiaries holding a valid caste certificate.": "NSFDC रियायती ऋण केवल वैध जाति प्रमाण पत्र धारक अनुसूचित जाति (SC) लाभार्थियों के लिए आरक्षित है।",
  "Yes, SC Beneficiary": "हाँ, अनुसूचित जाति (SC) लाभार्थी",
  "No (Other Category)": "नहीं (अन्य श्रेणी)",
  "2. Annual Family Income (₹)": "2. वार्षिक पारिवारिक आय (₹)",
  "Ceiling: ≤ ₹5,00,000": "अधिकतम सीमा: ≤ ₹5,00,000",
  "Total gross income from all sources of all family members.": "परिवार के सभी सदस्यों की सभी स्रोतों से कुल वार्षिक सकल आय।",
  "Income exceeds the ₹5,00,000 threshold for NSFDC schemes.": "पारिवारिक आय NSFDC योजनाओं की ₹5,00,000 की सीमा से अधिक है।",
  "3. Applicant Age (Years)": "3. आवेदक की आयु (वर्ष)",
  "Applicant Age (Years)": "आवेदक की आयु (वर्ष)",
  "Min. 18 Years": "न्यूनतम 18 वर्ष",
  "Enter primary borrower age (18–60 typical).": "मुख्य आवेदक की आयु दर्ज करें (सामान्यतः 18–60 वर्ष)।",
  "4. Gender": "4. लिंग",
  "Gender": "लिंग",
  "Female": "महिला",
  "Male": "पुरुष",
  "Transgender": "ट्रांसजेंडर",
  "NSFDC provides Mahila Samriddhi incentives for women.": "NSFDC महिलाओं के लिए महिला समृद्धि प्रोत्साहन प्रदान करता है।",
  "✦ Special concessional interest rebate & Mahila Samriddhi priority apply.": "✦ महिलाओं के लिए विशेष रियायती ब्याज छूट और महिला समृद्धि प्राथमिकता लागू।",
  "5. Purpose of Credit": "5. ऋण का उद्देश्य",
  "Type of Business You Want to Expand / Start": "वह व्यवसाय जिसे आप शुरू या बढ़ाना चाहते हैं",
  "Select your enterprise activity or sector.": "अपनी व्यावसायिक गतिविधि या क्षेत्र का चयन करें।",
  "Retail Shop / Kirana / Street Vending": "खुदरा दुकान / किराना / स्ट्रीट वेंडिंग",
  "Manufacturing / Fabrication / Small Workshop": "विनिर्माण / फैब्रिकेशन / छोटी कार्यशाला",
  "Services / Repair / Beauty & Salon": "सेवाएं / मरम्मत / सौंदर्य और सैलून",
  "Transport / E-Rickshaw / Logistics": "परिवहन / ई-रिक्शा / लॉजिस्टिक्स",
  "Artisan / Handloom / Handicrafts": "कारीगर / हथकरघा / हस्तशिल्प",
  "Agro-Allied / Dairy / Poultry / Food Processing": "कृषि-संबंधित / डेयरी / पोल्ट्री / खाद्य प्रसंस्करण",
  "Other Income-Generating Enterprise": "अन्य आय-सृजन उद्यम",
  "Area Type (Urban / Rural)": "क्षेत्र का प्रकार (शहरी / ग्रामीण)",
  "Area Type": "क्षेत्र का प्रकार",
  "Urban": "शहरी",
  "Rural": "ग्रामीण",
  "Applicant Demographics:": "आवेदक जनसांख्यिकी:",
  "Location & Area:": "स्थान और क्षेत्र:",
  "Business Sector / Activity:": "व्यवसाय क्षेत्र / गतिविधि:",
  "Educational Course:": "शैक्षिक पाठ्यक्रम:",
  "Choose whether you are establishing/expanding an enterprise or pursuing education.": "चुनें कि क्या आप व्यवसाय शुरू/विस्तार कर रहे हैं अथवा उच्च शिक्षा प्राप्त कर रहे हैं।",
  "Business / Project Finance": "व्यवसाय / परियोजना वित्त",
  "Higher Education": "उच्च शिक्षा",
  "Micro enterprises, machinery, trading, service units or manufacturing.": "लघु उद्यम, मशीनरी, व्यापार, सेवा इकाई या विनिर्माण।",
  "College admission, technical/professional degrees, or study abroad.": "कॉलेज प्रवेश, तकनीकी/व्यावसायिक डिग्री, या विदेश में उच्च अध्ययन।",
  "Estimated Total Project Cost (₹)": "अनुमानित कुल परियोजना लागत (₹)",
  "Combined capital requirements (equipment, raw material, working capital).": "कुल आवश्यक पूंजी (उपकरण, कच्चा माल, कार्यशील पूंजी)।",
  "Course Type": "पाठ्यक्रम प्रकार",
  "Estimated Total Educational Cost / Fee (₹)": "अनुमानित कुल शिक्षा लागत / शुल्क (₹)",
  "Tuition, examination, books, equipment, and hostel fees for the entire duration.": "पूरी अवधि के लिए शिक्षण, परीक्षा, पुस्तकें, उपकरण और छात्रावास शुल्क।",
  "Beneficiary State / Region": "लाभार्थी राज्य / क्षेत्र",
  "Matched Scheme": "उपयुक्त योजना",
  "100% Eligible Under NSFDC Rules": "NSFDC नियमों के तहत 100% पात्र",
  "Why this scheme was matched:": "यह योजना क्यों चुनी गई:",
  "Funding Coverage": "ऋण कवरेज",
  "Up to 90%": "90% तक",
  "Own Contribution": "स्वयं का योगदान (मार्जिन)",
  "Concessional Rate": "रियायती ब्याज दर",
  "Subsidized rate for SC beneficiaries": "अनुसूचित जाति लाभार्थियों के लिए रियायती दर",
  "Proceed to Scheme-Specific EMI Calculator": "योजना-विशिष्ट ईएमआई कैलकुलेटर पर जाएँ",
  "Apply on Official Portal": "आधिकारिक पोर्टल पर आवेदन करें",
  "View full scheme terms & guidelines": "पूर्ण योजना नियम और दिशा-निर्देश देखें",
  "Not Eligible Under This Scheme": "इस योजना के तहत अपात्र",
  "Preliminary Criteria Not Met": "प्रारंभिक पात्रता मानदंड पूरे नहीं हुए",
  "Reset to Eligible Defaults": "पात्र डिफ़ॉल्ट पर रीसेट करें",
  "Browse General Scheme Directory": "सामान्य योजना निर्देशिका देखें",
  "View Secondary Scheme Directory →": "द्वितीयक योजना निर्देशिका देखें →",

  // Calculator
  "Scheme-Specific Financial Engineering": "योजना-विशिष्ट वित्तीय विश्लेषण",
  "Concessional Loan & EMI Calculator": "रियायती ऋण और ईएमआई कैलकुलेटर",
  "Driven by NSFDC scheme credit caps, 90% funding coverage, and moratorium rules.": "NSFDC ऋण सीमा, 90% ऋण कवरेज और मोरेटोरियम नियमों पर आधारित।",
  "Total Project / Education Cost (₹)": "कुल परियोजना / शिक्षा लागत (₹)",
  "NSFDC Loan Requested (Max 90%)": "NSFDC ऋण मांग (अधिकतम 90%)",
  "Repayment Tenure (Years)": "पुनर्भुगतान अवधि (वर्ष)",
  "Starts after the moratorium period completes.": "मोरेटोरियम अवधि समाप्त होने के बाद शुरू होता है।",
  "Concessional Interest Rate (% p.a.)": "रियायती वार्षिक ब्याज दर (%)",
  "Moratorium Period (Months)": "मोरेटोरियम अवधि (महीने)",
  "Repayment Holiday": "किस्त स्थगन अवधि",
  "No principal payments due during moratorium. Interest accrues monthly and delays EMI commencement.": "मोरेटोरियम के दौरान मूलधन नहीं देना होता। ब्याज मासिक आधार पर संचित होता है और ईएमआई बाद में शुरू होती है।",
  "Accrued Interest in Moratorium:": "मोरेटोरियम में संचित ब्याज:",
  "Repayment Summary & Milestones": "पुनर्भुगतान सारांश और विवरण",
  "Monthly EMI (Post-Moratorium)": "मासिक ईएमआई (मोरेटोरियम के बाद)",
  "Total Interest Payable": "कुल देय ब्याज",
  "Total Repayment Amount": "कुल पुनर्भुगतान राशि",
  "Beneficiary Own Margin": "लाभार्थी का स्वयं का मार्जिन",
  "Find Eligible Channel Partners": "पात्र चैनल पार्टनर खोजें",
  "View Month-by-Month Amortization Schedule": "माह-दर-माह किस्त तालिका देखें",
  "Hide Amortization Schedule Table": "किस्त तालिका छिपाएँ",
  "Month-by-Month Amortization Schedule": "माह-दर-माह किस्त और ब्याज तालिका",
  "Period Type": "अवधि प्रकार",
  "Monthly Payment (₹)": "मासिक भुगतान (₹)",
  "Principal (₹)": "मूलधन (₹)",
  "Interest (₹)": "ब्याज (₹)",
  "Balance Outstanding (₹)": "शेष बकाया (₹)",
  "Moratorium Accrual": "मोरेटोरियम संचय",
  "Regular EMI": "नियमित ईएमआई",

  // Partner Locator
  "Geo-Spatial Channel Partner Locator": "भौगोलिक चैनल पार्टनर खोजक",
  "Nearby Eligible Channel Partners": "निकटतम पात्र चैनल पार्टनर",
  "Current Reference Location": "वर्तमान संदर्भ स्थान",
  "Detect My Location": "मेरा स्थान पहचानें",
  "Scheme Handled:": "योजना संचालन:",
  "All NSFDC Schemes": "सभी NSFDC योजनाएँ",
  "Search channel partner by name, city, or district...": "नाम, शहर या जिले द्वारा चैनल पार्टनर खोजें...",
  "Active Partner": "सक्रिय साझेदार",
  "Restricted (Audit)": "प्रतिबंधित (समीक्षाधीन)",
  "Start Application with this Partner": "इस साझेदार के साथ आवेदन शुरू करें",
  "Notice:": "सूचना:",
  "Prototype Notice: ": "प्रोटोटाइप सूचना: ",
  "Simulated partner health data — production version would pull from NSFDC/partner MIS in real time.": "अनुकारित पार्टनर स्वास्थ्य डेटा — वास्तविक संस्करण NSFDC/पार्टनर MIS से रीयल-टाइम में प्राप्त होगा।",

  // Summary
  "Application Handoff Dossier": "आवेदन सारांश दस्तावेज़",
  "Ready for Channel Partner Submission": "चैनल पार्टनर को जमा करने हेतु तैयार",
  "Print / Save PDF": "प्रिंट करें / PDF सहेजें",
  "Beneficiary & Scheme Profile": "लाभार्थी और योजना प्रोफ़ाइल",
  "Approved Financial Terms": "स्वीकृत वित्तीय शर्तें",
  "Designated Channel Partner": "नामित चैनल पार्टनर",
  "Checklist of Mandatory Documents": "अनिवार्य दस्तावेज़ों की सूची",
  "Category Status:": "श्रेणी स्थिति:",
  "Annual Household Income:": "वार्षिक पारिवारिक आय:",
  "Credit Purpose:": "ऋण का उद्देश्य:",
  "Matched Credit Scheme:": "चुनी गई ऋण योजना:",
  "Eligibility Rationale:": "पात्रता का कारण:",
  "Total Project / Course Cost:": "कुल परियोजना / पाठ्यक्रम लागत:",
  "NSFDC Concessional Loan (90%):": "NSFDC रियायती ऋण (90%):",
  "Beneficiary Margin (10%+):": "लाभार्थी मार्जिन (10%+):",
  "Concessional Rate & Moratorium:": "रियायती दर और मोरेटोरियम:",
  "Monthly EMI (Post Moratorium):": "मासिक ईएमआई (मोरेटोरियम बाद):",
  "Office Address:": "कार्यालय का पता:",
  "Direct Contact:": "सीधा संपर्क:",
  "Turnaround SLA:": "संभावित समय सीमा:",
  "Start New Eligibility Assessment": "← नया पात्रता परीक्षण शुरू करें",
  "Download / Print Formal Application Dossier": "औपचारिक आवेदन दस्तावेज़ डाउनलोड / प्रिंट करें",
};

const originals = new WeakMap<Node, string>();
const attributeOriginals = new WeakMap<Element, string>();
const englishByHindi = Object.fromEntries(Object.entries(hindi).map(([english, translation]) => [translation, english]));

function translatePage(language: Language) {
  const root = document.body;
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    const currentText = node.textContent ?? "";
    const currentTrimmed = currentText.trim();
    const original = originals.get(node) ?? (englishByHindi[currentTrimmed] ? currentText.replace(currentTrimmed, englishByHindi[currentTrimmed]) : currentText);
    originals.set(node, original);
    const trimmed = original.trim();
    const translated = hindi[trimmed];
    if (language === "hi" && translated) {
      const nextText = original.replace(trimmed, translated);
      if (node.textContent !== nextText) node.textContent = nextText;
    } else if (language === "en" && node.textContent !== original) {
      node.textContent = original;
    }
    node = walker.nextNode();
  }

  root.querySelectorAll("input[placeholder], textarea[placeholder]").forEach((element) => {
    const original = attributeOriginals.get(element) ?? element.getAttribute("placeholder") ?? "";
    attributeOriginals.set(element, original);
    const nextPlaceholder = language === "hi" ? hindi[original] ?? original : original;
    if (element.getAttribute("placeholder") !== nextPlaceholder) element.setAttribute("placeholder", nextPlaceholder);
  });
}

const LanguageContext = createContext<{ language: Language; setLanguage: (value: Language) => void }>({
  language: "en",
  setLanguage: () => undefined,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("schemesaarthi-language");
    if (saved === "hi") setLanguage("hi");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === "hi" ? "hi" : "en";
    window.localStorage.setItem("schemesaarthi-language", language);
    translatePage(language);
    const observer = new MutationObserver(() => translatePage(language));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}