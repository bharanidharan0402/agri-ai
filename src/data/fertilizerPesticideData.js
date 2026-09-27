// Fertilizer and Pesticide Recommendations Database with direct purchase links
// Fully localized in English, Tamil, and Hindi

export const FERTILIZERS_DATA = {
  Tomato: [
    {
      id: "tom-fert-1",
      brand: "IFFCO / Coromandel",
      buyUrl: "https://www.amazon.in/s?k=NPK+19-19-19+fertilizer+for+tomato",
      priceRange: "₹249 - ₹499",
      rating: 4.8,
      en: {
        name: "Water-Soluble NPK 19-19-19",
        type: "Balanced Chemical Fertilizer",
        dosage: "5g per liter of water (Foliar spray or drip every 12-15 days)",
        purpose: "Vegetative boost & uniform flower cluster initiation",
        description: "Provides equal proportions of Nitrogen, Phosphorus, and Potassium. Rapidly absorbed through leaves to enhance chlorophyll synthesis during the vegetative growth cycle.",
      },
      ta: {
        name: "நீரில் கரையும் என்பிகே (NPK 19-19-19)",
        type: "சமச்சீர் ரசாயன உரம்",
        dosage: "1 லிட்டர் தண்ணீருக்கு 5 கிராம் (12-15 நாட்களுக்கு ஒருமுறை இலைவழி தெளிப்பு)",
        purpose: "தழை வளர்ச்சி மற்றும் அதிக பூக்கள் பூக்க உதவும்",
        description: "நைட்ரஜன், பாஸ்பரஸ், பொட்டாசியம் சம அளவில் கொண்டுள்ளது. இலைகள் வழியாக உடனே உறிஞ்சப்பட்டு தக்காளி செடிகளை பசுமையாகவும் திடமாகவும் வளர்க்கிறது.",
      },
      hi: {
        name: "घुलनशील एनपीके (NPK 19-19-19)",
        type: "संतुलित रासायनिक उर्वरक",
        dosage: "5 ग्राम प्रति लीटर पानी (हर 12-15 दिनों में पर्णीय छिड़काव)",
        purpose: "पौधों की तेज वानस्पतिक वृद्धि और फूलों का विकास",
        description: "नाइट्रोजन, फास्फोरस और पोटाश का समान अनुपात। पत्तियों द्वारा तेजी से अवशोषित होकर टमाटर के पौधों को मजबूत और हरा-भरा बनाता है।",
      },
    },
    {
      id: "tom-fert-2",
      brand: "Mahadhan / Aries Agro",
      buyUrl: "https://www.amazon.in/s?k=Potassium+Schoenite+or+SOP+0-0-50+fertilizer",
      priceRange: "₹350 - ₹650",
      rating: 4.7,
      en: {
        name: "Sulphate of Potash (SOP 0-0-50)",
        type: "Potassic High-Grade Fertilizer",
        dosage: "4-5g per liter during tomato fruit swell stage",
        purpose: "Enhances fruit size, shine, firmness, and shelf life",
        description: "Zero chloride potassium fertilizer enriched with 17% Sulfur. Prevents fruit cracking and blossom end rot while increasing lycopene content.",
      },
      ta: {
        name: "பொட்டாசியம் சல்பேட் (SOP 0-0-50)",
        type: "உயர்தர பொட்டாஷ் உரம்",
        dosage: "காய் பிடிக்கும் தருணத்தில் 1 லிட்டர் தண்ணீருக்கு 4-5 கிராம்",
        purpose: "தக்காளி காய்களின் பளபளப்பு, எடை மற்றும் சுவையை அதிகரிக்கும்",
        description: "குளோரைடு இல்லாத உயர்ரக பொட்டாஷ் மற்றும் 17% கந்தகம் நிறைந்தது. தக்காளி வெடிப்பைத் தடுத்து, காய்களுக்கு நல்ல சிவப்பு நிறத்தையும் திரட்சியையும் தருகிறது.",
      },
      hi: {
        name: "सल्फेट ऑफ पोटाश (SOP 0-0-50)",
        type: "पोटाश युक्त उच्च गुणवत्ता उर्वरक",
        dosage: "फल बनने के समय 4-5 ग्राम प्रति लीटर पानी",
        purpose: "टमाटर के फलों का आकार, चमक, वजन और शेल्फ लाइफ बढ़ाना",
        description: "क्लोराइड-मुक्त पोटेशियम और 17% सल्फर। फलों को फटने से रोकता है और टमाटर को चमकदार लाल रंग और ठोसपन देता है।",
      },
    },
    {
      id: "tom-fert-3",
      brand: "TrustBasket / Utkarsh Agrochem",
      buyUrl: "https://www.amazon.in/s?k=cold+pressed+neem+cake+powder+fertilizer",
      priceRange: "₹199 - ₹399",
      rating: 4.9,
      en: {
        name: "Organic Enriched Neem Cake & Bio-NPK",
        type: "100% Organic Soil Conditioner",
        dosage: "100g per plant around drip zone, mix with topsoil",
        purpose: "Nematode suppression & sustained slow-release root feeding",
        description: "Natural organic fertilizer derived from neem seed kernels. Contains natural azadirachtin that destroys soil root-knot nematodes while providing slow-release bio-nutrients.",
      },
      ta: {
        name: "செறிவூட்டப்பட்ட வேப்பம் புண்ணாக்கு & உயிர் உரம்",
        type: "100% இயற்கை மண் வள உரம்",
        dosage: "செடி ஒன்றுக்கு 100 கிராம் வேர்ப்பகுதியில் இட்டு மண்ணுடன் கிளறவும்",
        purpose: "வேர்ப்புழு கட்டுப்பாடு மற்றும் நீண்ட கால கரிம சத்து",
        description: "தூய வேப்பங்கொட்டையிலிருந்து தயாரிக்கப்பட்டது. மண்ணில் உள்ள நூற்புழுக்களை (நெமடோட்) அழித்து, வேர் வளர்ச்சியைத் தூண்டி நிலத்தை வளப்படுத்துகிறது.",
      },
      hi: {
        name: "जैविक नीम खली एवं बायो-एनपीके",
        type: "100% प्राकृतिक मृदा सुधारक",
        dosage: "100 ग्राम प्रति पौधा जड़ के पास मिट्टी में मिलाएं",
        purpose: "जड़ में लगने वाले सूत्रकृमि (नेमाटोड) की रोकथाम और पोषक तत्व",
        description: "प्राकृतिक नीम बीजों से निर्मित। मिट्टी के हानिकारक कीड़ों और फफूंद को समाप्त करता है और लंबे समय तक जैविक पोषक तत्व प्रदान करता है।",
      },
    },
  ],

  Rice: [
    {
      id: "rice-fert-1",
      brand: "IFFCO Nano Fertilizer",
      buyUrl: "https://www.amazon.in/s?k=IFFCO+nano+urea+liquid",
      priceRange: "₹225 - ₹450",
      rating: 4.8,
      en: {
        name: "IFFCO Nano Urea (Liquid)",
        type: "Nanotechnology Nitrogen Fertilizer",
        dosage: "4 ml per liter water at active tillering & panicle initiation",
        purpose: "Maximized tillering count and grain filling percentage",
        description: "Advanced nanoscale nitrogen particles (20-50 nm) with 80%+ assimilation efficiency. Reduces conventional urea wastage and greenhouse emissions.",
      },
      ta: {
        name: "இப்கோ நானோ யூரியா (திரவ உரம்)",
        type: "நானோ தொழில்நுட்ப தழைச்சத்து உரம்",
        dosage: "தூர்கட்டும் மற்றும் கதிர் வரும் பருவத்தில் 1 லிட்டருக்கு 4 மி.லி",
        purpose: "அதிக தூர்கள் மற்றும் மணி பிடித்தலை அதிகரிக்க",
        description: "80%க்கும் அதிகமான உறிஞ்சும் திறன் கொண்ட நானோ துகள்கள். சாதாரண யூரியா விரயத்தைக் குறைத்து நெற்பயிரை செழிப்பாக வளர்க்கிறது.",
      },
      hi: {
        name: "इफको नैनो यूरिया (तरल)",
        type: "नैनो तकनीक नाइट्रोजन उर्वरक",
        dosage: "कल्ले फूटने और बाली निकलते समय 4 मिली प्रति लीटर पानी",
        purpose: "कल्लरों की संख्या और दानों के भराव में भारी वृद्धि",
        description: "80% से अधिक अवशोषण क्षमता। पारंपरिक यूरिया की बर्बादी को रोकता है और धान की फसल को मजबूत और स्वस्थ बनाता है।",
      },
    },
    {
      id: "rice-fert-2",
      brand: "Coromandel Gromor",
      buyUrl: "https://www.amazon.in/s?k=Zinc+Sulphate+monohydrate+33+fertilizer",
      priceRange: "₹180 - ₹350",
      rating: 4.6,
      en: {
        name: "Zinc Sulphate Monohydrate (33% Zn + 15% S)",
        type: "Essential Micronutrient Fertilizer",
        dosage: "10 kg/acre basal or 2.5g/L foliar spray",
        purpose: "Cures Khaira disease (Zinc deficiency) and yellowing leaves",
        description: "Zinc is crucial for auxin hormone production and carbohydrate metabolism in paddy. Overcomes stunted growth in waterlogged fields.",
      },
      ta: {
        name: "துத்தநாக சல்பேட் (ஜிங்க் சல்பேட் 33%)",
        type: "முக்கிய நுண்ணூட்ட உரம்",
        dosage: "ஏக்கருக்கு 10 கிலோ அடியுரமாக அல்லது 1 லிட்டருக்கு 2.5 கிராம் தெளிப்பு",
        purpose: "இலை மஞ்சள் நிறமாவதைத் தடுத்து தீவிர வளர்ச்சியைத் தரும்",
        description: "நெற்பயிரில் துத்தநாகக் குறைபாட்டால் வரும் 'கைரா' நோயை குணமாக்கி, கதிர் வளர்ச்சியைத் தூண்டுகிறது.",
      },
      hi: {
        name: "जिंक सल्फेट मोनोहाइड्रेट (33% जिंक + 15% सल्फर)",
        type: "सूक्ष्म पोषक तत्व उर्वरक",
        dosage: "10 किग्रा प्रति एकड़ आधार रूप में या 2.5 ग्राम प्रति लीटर छिड़काव",
        purpose: "खैरा रोग की रोकथाम और पत्तियों का पीलापन दूर करना",
        description: "धान में कार्बोहाइड्रेट निर्माण और कल्ले बढ़ाने के लिए अति आवश्यक। जलभराव वाले खेतों में पौधों को शक्ति देता है।",
      },
    },
  ],

  Wheat: [
    {
      id: "wheat-fert-1",
      brand: "IFFCO / Tata Paras",
      buyUrl: "https://www.amazon.in/s?k=DAP+Di+Ammonium+Phosphate+fertilizer",
      priceRange: "₹299 - ₹600",
      rating: 4.7,
      en: {
        name: "Di-Ammonium Phosphate (DAP 18-46-0)",
        type: "High-Phosphorus Basal Fertilizer",
        dosage: "50 kg/acre as basal dose during sowing",
        purpose: "Rapid seminal root development and cold resilience",
        description: "Crucial early-stage nutrient package for rabi wheat. Guarantees deep root architecture to anchor heavy grain spikes.",
      },
      ta: {
        name: "டி.ஏ.பி (DAP 18-46-0 உரம்)",
        type: "அதிக மணிச்சத்து கொண்ட அடியுரம்",
        dosage: "விதைக்கும் போது ஏக்கருக்கு 50 கிலோ அடியுரமாக",
        purpose: "ஆழமான வேர் வளர்ச்சி மற்றும் பனி தாங்கும் சக்தி",
        description: "கோதுமை பயிரின் ஆரம்ப கால வளர்ச்சிக்கு அத்தியாவசியமானது. செடிகள் திடமாக நின்று அதிக விளைச்சல் தர உதவுகிறது.",
      },
      hi: {
        name: "डीएपी (DAP 18-46-0 उर्वरक)",
        type: "उच्च फास्फोरस आधार उर्वरक",
        dosage: "बुवाई के समय 50 किलोग्राम प्रति एकड़",
        purpose: "गहरी जड़ों का विकास और मजबूत तना",
        description: "गेहूं के बीज अंकुरण और जड़ प्रणाली को शक्तिशाली बनाने के लिए सबसे उपयुक्त। ठंड सहन करने की क्षमता बढ़ाता है।",
      },
    },
  ],

  Cotton: [
    {
      id: "cot-fert-1",
      brand: "Multiplex / Aries",
      buyUrl: "https://www.amazon.in/s?k=Magnesium+Sulphate+fertilizer+for+cotton",
      priceRange: "₹220 - ₹480",
      rating: 4.8,
      en: {
        name: "Magnesium Sulphate (Epsom Salt - 9.6% Mg)",
        type: "Secondary Nutrient Foliar",
        dosage: "10g per liter spray at square formation and boll opening",
        purpose: "Prevents reddening of cotton leaves (Lal Rog) & boll drop",
        description: "Corrects magnesium starvation which causes chlorosis and premature leaf reddening in Bt cotton, drastically boosting lint quality.",
      },
      ta: {
        name: "மெக்னீசியம் சல்பேட் (எப்சம் உப்பு 9.6% Mg)",
        type: "இரண்டாம் நிலை நுண்ணூட்ட உரம்",
        dosage: "பூக்கும் தருணத்தில் 1 லிட்டர் தண்ணீருக்கு 10 கிராம் இலைவழி தெளிப்பு",
        purpose: "பருத்தி இலைகள் சிவப்பாவதை தடுத்து காய் உதிர்வை நிறுத்துகிறது",
        description: "Bt பருத்தியில் ஏற்படும் இலை சிவக்கும் நோயைத் தடுத்து, பஞ்சின் தரத்தையும் காய் எடையையும் அதிகரிக்கிறது.",
      },
      hi: {
        name: "मैग्नीशियम सल्फेट (एप्सम साल्ट 9.6% Mg)",
        type: "द्वितीयक पोषक तत्व छिड़काव",
        dosage: "फूल और टिंडे बनते समय 10 ग्राम प्रति लीटर पानी में छिड़काव",
        purpose: "पत्तियों का लाल होना (लाल रोग) और टिंडे गिरना रोकना",
        description: "कपास की पत्तियों में मैग्नीशियम की कमी को तुरंत दूर करता है, जिससे रुई की गुणवत्ता और चमक बढ़ती है।",
      },
    },
  ],

  Chili: [
    {
      id: "chi-fert-1",
      brand: "Katyayani / Utkarsh",
      buyUrl: "https://www.amazon.in/s?k=Calcium+Nitrate+with+Boron+fertilizer",
      priceRange: "₹280 - ₹520",
      rating: 4.8,
      en: {
        name: "Calcium Nitrate + Boron (Cal-Bor)",
        type: "Water Soluble Chelated Nutrient",
        dosage: "3-4g per liter during flowering and fruit setting",
        purpose: "Stops blossom blossom drop, fruit rot, and enhances pungency",
        description: "Combines 18.5% Calcium with 0.15% Boron to reinforce cell wall strength in chili pods, avoiding fruit curvature and fungal rot.",
      },
      ta: {
        name: "கால்சியம் நைட்ரேட் + போரான் உரம்",
        type: "நீரில் கரையும் நுண்ணூட்ட உரம்",
        dosage: "பூ மற்றும் பிஞ்சு பிடிக்கும் தருணத்தில் 1 லிட்டருக்கு 3-4 கிராம்",
        purpose: "பூ உதிர்வை தடுத்து, மிளகாய் நெளிவு மற்றும் அழுகலை நிறுத்தும்",
        description: "மிளகாயின் தோல் தடிமனாக மாறவும், பளபளப்பான காரத்தன்மை கொண்ட திரட்சியான காய்கள் கிடைக்கவும் உதவுகிறது.",
      },
      hi: {
        name: "कैल्शियम नाइट्रेट + बोरॉन",
        type: "घुलनशील सूक्ष्म पोषक तत्व",
        dosage: "फूल और फल आते समय 3-4 ग्राम प्रति लीटर पानी",
        purpose: "फूलों का गिरना रोकना और मिर्च की लंबाई एवं तीखापन बढ़ाना",
        description: "मिर्च की कोशिका दीवारों को मजबूत करता है। फल को सड़ने और मुड़ने से बचाकर बेहतर पैदावार देता है।",
      },
    },
  ],

  // Universal Fallback for any other crop
  General: [
    {
      id: "gen-fert-1",
      brand: "IFFCO / Coromandel",
      buyUrl: "https://www.amazon.in/s?k=NPK+19-19-19+fertilizer",
      priceRange: "₹240 - ₹450",
      rating: 4.8,
      en: {
        name: "NPK 19-19-19 All-Purpose Bio-Booster",
        type: "Complete Balanced Fertilizer",
        dosage: "4-5g per liter water every 14 days",
        purpose: "Balanced canopy, robust root anchoring & uniform yields",
        description: "Complete broad-spectrum fertilizer providing optimal nutritional balance across all growth stages for Indian soil profiles.",
      },
      ta: {
        name: "என்பிகே 19-19-19 அனைத்து பயிர் உரம்",
        type: "முழுமையான சமச்சீர் உரம்",
        dosage: "14 நாட்களுக்கு ஒருமுறை 1 லிட்டருக்கு 4-5 கிராம் தெளிப்பு",
        purpose: "வேர் வளர்ச்சி, பசுமையான தழைகள் மற்றும் அதிக விளைச்சல்",
        description: "அனைத்து விதமான பயிர்களுக்கும் தழை, மணி, சாம்பல் சத்துக்களை சம அளவில் வழங்கி செடியை வளமாக்கும் உரம்.",
      },
      hi: {
        name: "एनपीके 19-19-19 सर्व-उद्देशीय उर्वरक",
        type: "संपूर्ण संतुलित पोषक तत्व",
        dosage: "हर 14 दिन में 4-5 ग्राम प्रति लीटर पानी",
        purpose: "मजबूत जड़ें, हरी-भरी पत्तियां और भरपूर उत्पादन",
        description: "सभी फसलों के लिए नाइट्रोजन, फास्फोरस और पोटाश का सर्वोत्तम मिश्रण जो मिट्टी की उर्वरता बढ़ाता है।",
      },
    },
    {
      id: "gen-fert-2",
      brand: "TrustBasket Premium",
      buyUrl: "https://www.amazon.in/s?k=organic+vermicompost+fertilizer+pure",
      priceRange: "₹180 - ₹350",
      rating: 4.9,
      en: {
        name: "100% Organic Vermicompost with Beneficial Microbes",
        type: "Organic Humic Soil Amendment",
        dosage: "200-500g per plant or 2 tons/acre",
        purpose: "Enhances soil water holding capacity & beneficial soil flora",
        description: "Rich earthworm casting enriched with humic acid, fulvic acid, and beneficial mycorrhiza to rejuvenate stressed soils.",
      },
      ta: {
        name: "100% தூய மண்புழு உரம் (கரிம உரம்)",
        type: "இயற்கை மண்புழு மக்கிய உரம்",
        dosage: "செடிக்கு 200-500 கிராம் அல்லது ஏக்கருக்கு 2 டன்",
        purpose: "மண்ணின் ஈரப்பதம் மற்றும் நுண்ணுயிர் பெருக்கத்தை அதிகரிக்க",
        description: "மண்ணை மென்மையாக்கி, நீர் பிடிப்பு திறனை அதிகரித்து வேர்களுக்கு இயற்கையான சத்துக்களை வழங்குகிறது.",
      },
      hi: {
        name: "100% शुद्ध जैविक केंचुआ खाद (वर्मीकम्पोस्ट)",
        type: "प्राकृतिक जैविक खाद",
        dosage: "200-500 ग्राम प्रति पौधा अथवा 2 टन प्रति एकड़",
        purpose: "मिट्टी की जल धारण क्षमता और लाभकारी जीवाणुओं की वृद्धि",
        description: "ह्यूमिक एसिड और प्राकृतिक सूक्ष्मजीवों से भरपूर। मिट्टी को भुरभुरा और उपजाऊ बनाता है।",
      },
    },
  ],
};

export const PESTICIDES_DATA = {
  Tomato: [
    {
      id: "tom-pest-1",
      brand: "Bayer CropScience",
      buyUrl: "https://www.amazon.in/s?k=Confidor+imidacloprid+17.8+SL",
      priceRange: "₹290 - ₹550",
      rating: 4.8,
      en: {
        name: "Confidor (Imidacloprid 17.8% SL)",
        type: "Systemic Neonicotinoid Insecticide",
        dosage: "0.5 ml to 0.75 ml per liter water (Foliar spray)",
        targetPest: "Whiteflies, Aphids, Thrips & Leaf Curl Vectors",
        description: "Rapidly absorbed by plant vascular tissues. Effectively terminates sucking pest colonies that transmit debilitating Tomato Leaf Curl Virus (ToLCV).",
      },
      ta: {
        name: "கான்பிடார் (இமிடாக்குளோப்ரிட் 17.8% SL)",
        type: "உள் ஊடுருவி தாக்கும் பூச்சிக்கொல்லி",
        dosage: "1 லிட்டர் தண்ணீருக்கு 0.5 - 0.75 மி.லி",
        targetPest: "வெள்ளை ஈ, அசுவினி, இலைப்பேன் (சுருட்டை நோய் பரப்பும் பூச்சிகள்)",
        description: "செடியின் உடலுக்குள் விரைவாக சென்று சாறு உறிஞ்சும் பூச்சிகளை முற்றிலும் அழிக்கிறது. தக்காளி இலை சுருட்டை வைரஸ் பரவுவதை தடுக்கிறது.",
      },
      hi: {
        name: "कॉन्फिडोर (इमिडाक्लोप्रिड 17.8% SL)",
        type: "प्रणालीगत (सिस्टेमिक) कीटनाशक",
        dosage: "0.5 से 0.75 मिली प्रति लीटर पानी",
        targetPest: "सफेद मक्खी, एफिड्स (माहू), थ्रिप्स और पत्ती मरोड़ वाहक",
        description: "पौधों द्वारा तुरंत अवशोषित होकर रस चूसक कीटों को समाप्त करता है और टमाटर में लीफ कर्ल वायरस के प्रसार को रोकता है।",
      },
    },
    {
      id: "tom-pest-2",
      brand: "FMC India / DuPont",
      buyUrl: "https://www.amazon.in/s?k=Coragen+chlorantraniliprole+18.5+SC",
      priceRange: "₹450 - ₹1200",
      rating: 4.9,
      en: {
        name: "Coragen (Chlorantraniliprole 18.5% SC)",
        type: "Advanced Ovi-larvicide",
        dosage: "0.4 ml per liter water (60 ml per acre in 150L water)",
        targetPest: "Tomato Fruit Borer (Helicoverpa armigera) & Pinworm",
        description: "Activates insect ryanodine receptors causing immediate feeding cessation. Delivers extended 21-day rainfast protection inside developing fruit.",
      },
      ta: {
        name: "கோராஜன் (குளோரான்ட்ரானிலிப்ரோல் 18.5% SC)",
        type: "புழு மற்றும் முட்டை அழிக்கும் பூச்சிக்கொல்லி",
        dosage: "1 லிட்டர் தண்ணீருக்கு 0.4 மி.லி (ஏக்கருக்கு 60 மி.லி)",
        targetPest: "தக்காளி காய் துளைப்பான் மற்றும் இலை தின்னும் புழுக்கள்",
        description: "புழுக்களை உடனே சாப்பிடவிடாமல் தடுத்து அழிக்கிறது. தக்காளி காய்களை துளைக்காமல் 21 நாட்களுக்கு முழுமையான பாதுகாப்பு அளிக்கிறது.",
      },
      hi: {
        name: "कोराजन (क्लोरेंट्रानिलिप्रोल 18.5% SC)",
        type: "अंडा एवं इल्ली नाशक उन्नत कीटनाशक",
        dosage: "0.4 मिली प्रति लीटर पानी (60 मिली प्रति एकड़)",
        targetPest: "टमाटर फल छेदक इल्ली (हेलिकोवर्पा) एवं तना छेदक",
        description: "छिड़काव के बाद इल्ली तुरंत खाना बंद कर देती है और मर जाती है। टमाटर को 21 दिनों तक फलों के भीतर से सुरक्षित रखता है।",
      },
    },
    {
      id: "tom-pest-3",
      brand: "Indofil Industries",
      buyUrl: "https://www.amazon.in/s?k=Mancozeb+75+WP+Dithane+M45",
      priceRange: "₹180 - ₹340",
      rating: 4.7,
      en: {
        name: "Dithane M-45 (Mancozeb 75% WP)",
        type: "Broad-Spectrum Contact Fungicide",
        dosage: "2.5g per liter water at first sign of leaf spots",
        targetPest: "Early Blight (Alternaria), Late Blight & Fruit Rot",
        description: "Multi-site protective fungicide containing Manganese and Zinc. Forms a robust surface shield against aggressive fungal spores in humid weather.",
      },
      ta: {
        name: "டைத்தேன் எம்-45 (மேன்கோசெப் 75% WP)",
        type: "பரந்த வீரிய பூஞ்சாணக்கொல்லி",
        dosage: "1 லிட்டர் தண்ணீருக்கு 2.5 கிராம்",
        targetPest: "முன் மற்றும் பின் பருவ இலை கருகல் நோய், காய் அழுகல்",
        description: "மாங்கனீசு மற்றும் துத்தநாகம் கொண்ட சிறந்த பூஞ்சாணக் கொல்லி. மழை மற்றும் ஈரப்பதமான காலத்தில் இலைகளில் கருகல் புள்ளி விழுவதைத் தடுக்கிறது.",
      },
      hi: {
        name: "डाइथेन एम-45 (मैंकोजेब 75% WP)",
        type: "स्पर्शजन्य कवकनाशी (फफूंदनाशक)",
        dosage: "2.5 ग्राम प्रति लीटर पानी",
        targetPest: "अगेती व पछेती झुलसा रोग (ब्लाइट) एवं फल सड़न",
        description: "जिंक और मैंगनीज युक्त शक्तिशाली फफूंदनाशक। आर्द्र मौसम में टमाटर की पत्तियों और फलों को फफूंद से पूर्ण सुरक्षा देता है।",
      },
    },
  ],

  Rice: [
    {
      id: "rice-pest-1",
      brand: "PI Industries / Dhanuka",
      buyUrl: "https://www.amazon.in/s?k=Cartap+Hydrochloride+4G+or+50+SP",
      priceRange: "₹280 - ₹560",
      rating: 4.7,
      en: {
        name: "Padan / Cartap Hydrochloride 50% SP",
        type: "Nereistoxin Analogue Insecticide",
        dosage: "2g per liter water or 1 kg/acre broadcast",
        targetPest: "Yellow Stem Borer (Dead Heart) & Leaf Folder",
        description: "Fast-acting contact and systemic poison blocking insect nervous transmissions. Prevents white earhead damage in paddy.",
      },
      ta: {
        name: "பாடான் (கார்டாப் ஹைட்ரோகுளோரைடு 50% SP)",
        type: "தண்டு துளைப்பான் கொல்லி",
        dosage: "1 லிட்டர் தண்ணீருக்கு 2 கிராம்",
        targetPest: "நெல் தண்டு துளைப்பான் (வெண்கதிர்) மற்றும் இலை சுருட்டுப் புழு",
        description: "செடியின் நரம்பு மண்டலம் வழியாக செயல்பட்டு தண்டுக்குள் இருக்கும் புழுக்களை அழிக்கிறது. கதிர் வெண்மையாவதைத் தடுக்கிறது.",
      },
      hi: {
        name: "पदान (कार्टाप हाइड्रोक्लोराइड 50% SP)",
        type: "तना छेदक रोधी कीटनाशक",
        dosage: "2 ग्राम प्रति लीटर पानी",
        targetPest: "धान का तना छेदक (सफेद बाली) एवं पत्ता लपेटक",
        description: "तना छेदक इल्लियों को पौधे के अंदर ही मार देता है। सफेद बाली की समस्या को जड़ से समाप्त करता है।",
      },
    },
    {
      id: "rice-pest-2",
      brand: "Rallis India / Tata",
      buyUrl: "https://www.amazon.in/s?k=Tricyclazole+75+WP+blast+fungicide",
      priceRange: "₹340 - ₹680",
      rating: 4.8,
      en: {
        name: "Baan / Tricyclazole 75% WP",
        type: "Specialist Paddy Blast Systemic Fungicide",
        dosage: "0.6g per liter water at leaf blast initiation or boot stage",
        targetPest: "Paddy Blast (Leaf Blast, Neck Blast & Node Blast)",
        description: "Inhibits melanin biosynthesis in Magnaporthe oryzae, terminating neck blast fungal penetration before panicle breakage.",
      },
      ta: {
        name: "பான் (ட்ரைசைக்ளசோல் 75% WP)",
        type: "நெல் குலைநோய் சிறப்பு பூஞ்சாணக்கொல்லி",
        dosage: "1 லிட்டர் தண்ணீருக்கு 0.6 கிராம் தெளிப்பு",
        targetPest: "நெல் இலைக் குலைநோய், கழுத்துக் குலைநோய் (Blast)",
        description: "கதிர் முறியும் கழுத்துக் குலைநோயை உடனடியாகக் கட்டுப்படுத்தி, மணி முழுமையாக நிறையும் வரை நெற்பயிரைக் காக்கிறது.",
      },
      hi: {
        name: "बान (ट्राइसाइक्लाजोल 75% WP)",
        type: "धान ब्लास्ट रोग नाशक फफूंदनाशक",
        dosage: "0.6 ग्राम प्रति लीटर पानी",
        targetPest: "धान का झोंका रोग (लीफ ब्लास्ट एवं नेक ब्लास्ट)",
        description: "बाली टूटने और सूखने से बचाता है। फफूंद को पौधे में घुसने से पहले ही रोक देता है।",
      },
    },
  ],

  Cotton: [
    {
      id: "cot-pest-1",
      brand: "UPL / Bayer",
      buyUrl: "https://www.amazon.in/s?k=Diafenthiuron+50+WP+Pegasus",
      priceRange: "₹380 - ₹750",
      rating: 4.8,
      en: {
        name: "Pegasus (Diafenthiuron 50% WP)",
        type: "Mitochondrial Respiration Inhibitor",
        dosage: "1.25g per liter water (250g per acre)",
        targetPest: "Silverleaf Whitefly, Cotton Aphids & Red Spider Mites",
        description: "Transovarial and vapour action insecticide that paralyses nymphs and adults within hours, preserving green foliage under heavy infestations.",
      },
      ta: {
        name: "பெகாசஸ் (டயாஃபெந்தியூரான் 50% WP)",
        type: "சாறு உறிஞ்சும் பூச்சி & சிலந்தி கொல்லி",
        dosage: "1 லிட்டர் தண்ணீருக்கு 1.25 கிராம்",
        targetPest: "பருத்தி வெள்ளை ஈ, அசுவினி மற்றும் சிவப்பு சிலந்திப் பூச்சிகள்",
        description: "நீராவி மற்றும் நேரடி தாக்கும் திறன் கொண்டது. பருத்தி இலைகள் காய்ந்து போவதைத் தடுத்து இலைகளை பசுமையாகக் காக்கிறது.",
      },
      hi: {
        name: "पेगासस (डायफेन्थियुरॉन 50% WP)",
        type: "रस चूसक कीट एवं मकड़ी नाशक",
        dosage: "1.25 ग्राम प्रति लीटर पानी",
        targetPest: "सफेद मक्खी, माहू एवं लाल मकड़ी (माइट्स)",
        description: "कपास में गंभीर रस चूसक कीटों और लाल मकड़ी का एक साथ खात्मा करता है और पत्तियों को गिरने से रोकता है।",
      },
    },
  ],

  Chili: [
    {
      id: "chi-pest-1",
      brand: "Gharda Chemicals / Bayer",
      buyUrl: "https://www.amazon.in/s?k=Fipronil+5+SC+insecticide",
      priceRange: "₹260 - ₹510",
      rating: 4.8,
      en: {
        name: "Regent (Fipronil 5% SC)",
        type: "GABA-Gated Chloride Channel Antagonist",
        dosage: "2 ml per liter water",
        targetPest: "Chili Thrips (Scirtothrips dorsalis) & Gall Midge",
        description: "Effective answer to upward leaf curling in chili caused by thrips. Stimulates crop vigour and greener foliage (Phytotonic effect).",
      },
      ta: {
        name: "ரீஜென்ட் (ஃபிப்ரோனில் 5% SC)",
        type: "இலைப்பேன் எதிர்ப்பு பூச்சிக்கொல்லி",
        dosage: "1 லிட்டர் தண்ணீருக்கு 2 மி.லி",
        targetPest: "மிளகாய் இலைப்பேன் (மேல்நோக்கி சுருளும் நோய்)",
        description: "இலைகள் மேல்நோக்கி சுருண்டு படகாக மாறுவதைத் தடுத்து, புதிய தளிர்களையும் பூக்களையும் வரவழைக்கிறது.",
      },
      hi: {
        name: "रीजेंट (फिप्रोनिल 5% SC)",
        type: "थ्रिप्स नियंत्रक कीटनाशक",
        dosage: "2 मिली प्रति लीटर पानी",
        targetPest: "मिर्च का थ्रिप्स (पत्तियों का ऊपर मुड़ना) एवं मक्खी",
        description: "मिर्च में पत्ती मरोड़ और नाव जैसी मुड़ी पत्तियों की समस्या को ठीक करके पौधों में नई बढ़वार लाता है।",
      },
    },
  ],

  // Universal Fallback for any other crop
  General: [
    {
      id: "gen-pest-1",
      brand: "Katyayani Organic Solutions",
      buyUrl: "https://www.amazon.in/s?k=organic+neem+oil+10000+ppm+cold+pressed",
      priceRange: "₹260 - ₹480",
      rating: 4.9,
      en: {
        name: "Pure Cold-Pressed Neem Oil (10,000 PPM Azadirachtin)",
        type: "Certified 100% Bio-Insecticide",
        dosage: "3-5 ml per liter water + 1 ml natural detergent emulsifier",
        targetPest: "Broad-spectrum: Sucking insects, caterpillars, powdery mildew",
        description: "Safe for bees and beneficial insects. Acts as an anti-feedant, repellent, and insect growth regulator with zero chemical residue.",
      },
      ta: {
        name: "தூய இயற்கை வேப்பெண்ணெய் (10,000 PPM அசாடிராக்டின்)",
        type: "100% இயற்கை பூச்சி விரட்டி",
        dosage: "1 லிட்டர் தண்ணீருக்கு 3-5 மி.லி + சிறிதளவு சோப்பு நீர் கலந்து தெளிக்கவும்",
        targetPest: "அனைத்து சாறு உறிஞ்சும் பூச்சிகள், கம்பளிப் புழுக்கள், மாவுப் பூச்சி",
        description: "நன்மை செய்யும் பூச்சிகளுக்கு தீங்கு விளைவிக்காதது. நஞ்சற்ற இயற்கை பூச்சி விரட்டியாக அனைத்து காய்கறி மற்றும் பழப் பயிர்களுக்கு உகந்தது.",
      },
      hi: {
        name: "शुद्ध नीम तेल कीटनाशक (10,000 PPM अजाडिराक्टिन)",
        type: "100% प्रमाणित जैविक कीटनाशक",
        dosage: "3-5 मिली प्रति लीटर पानी में थोड़ा सर्फ मिलाकर छिड़काव करें",
        targetPest: "सभी प्रकार के रस चूसक कीड़े, सुंडी, माहू और मिलीबग",
        description: "मित्र कीटों और मधुमक्खियों के लिए सुरक्षित। रासायनिक अवशेषों से मुक्त संपूर्ण प्राकृतिक कीटनाशक।",
      },
    },
    {
      id: "gen-pest-2",
      brand: "Tata Rallis / Syngenta",
      buyUrl: "https://www.amazon.in/s?k=Copper+Oxychloride+50+WP+fungicide",
      priceRange: "₹220 - ₹430",
      rating: 4.7,
      en: {
        name: "Blitox / Blue Copper (Copper Oxychloride 50% WP)",
        type: "Broad-Spectrum Contact Fungicide & Bactericide",
        dosage: "2.5-3g per liter water spray",
        targetPest: "Bacterial leaf spot, damping-off, canker, downy mildew",
        description: "Releases copper ions that denature fungal enzymes and bacterial cell walls. Outstanding prevention against wet rot and fungal blights.",
      },
      ta: {
        name: "ப்ளிட்டாக்ஸ் - காப்பர் ஆக்ஸிகுளோரைடு 50% WP",
        type: "பூஞ்சாணம் மற்றும் பாக்டீரியா எதிர்ப்பு மருந்து",
        dosage: "1 லிட்டர் தண்ணீருக்கு 2.5 - 3 கிராம்",
        targetPest: "பாக்டீரியா இலைப்புள்ளி நோய், நாற்று அழுகல் மற்றும் கருகல்",
        description: "செம்பு துகள்கள் பூஞ்சை மற்றும் பாக்டீரியாவை அழிக்கின்றன. மழைக்கால அழுகல் நோய்களுக்கு சிறந்த தடுப்பு மருந்து.",
      },
      hi: {
        name: "ब्लिटॉक्स (कॉपर ऑक्सीक्लोराइड 50% WP)",
        type: "कवकनाशी एवं जीवाणुनाशक",
        dosage: "2.5 - 3 ग्राम प्रति लीटर पानी",
        targetPest: "जीवाणु पत्ती धब्बा, कॉलर रॉट (सड़न) एवं झुलसा",
        description: "तांबे के कण कवक और जीवाणुओं को नष्ट करते हैं। बारिश के मौसम में सड़न और फफूंद से पौधों को तुरंत बचाता है।",
      },
    },
  ],
};

/** Helper to retrieve localized fertilizer recommendations */
export function getFertilizerRecommendations(cropName, language = "English") {
  const list = FERTILIZERS_DATA[cropName] || FERTILIZERS_DATA.General;
  const langKey = language === "Tamil" ? "ta" : language === "Hindi" ? "hi" : "en";
  return list.map((item) => ({
    id: item.id,
    brand: item.brand,
    buyUrl: item.buyUrl,
    priceRange: item.priceRange,
    rating: item.rating,
    ...(item[langKey] || item.en),
  }));
}

/** Helper to retrieve localized pesticide recommendations */
export function getPesticideRecommendations(cropName, language = "English") {
  const list = PESTICIDES_DATA[cropName] || PESTICIDES_DATA.General;
  const langKey = language === "Tamil" ? "ta" : language === "Hindi" ? "hi" : "en";
  return list.map((item) => ({
    id: item.id,
    brand: item.brand,
    buyUrl: item.buyUrl,
    priceRange: item.priceRange,
    rating: item.rating,
    ...(item[langKey] || item.en),
  }));
}
