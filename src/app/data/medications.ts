// data/medications.ts

export interface Diluent {
  volumeMl: number;
  type: string;
}

export interface DilutionInfo {
  /** Stok ampul/sıvı hacmi – mL */
  stockVolumeMl: number;
  /** Stoktaki toplam ilaç miktarı (mg, IU vb.) */
  stockAmount: string;           // "100 mg", "0.5 mg", "5 000 IU"
  /** Eklenen çözücü hacmi ve türü */
  diluent: { volumeMl: number; type: string };   // 18 mL %0.9 NaCl
  /** Elde edilen son hacim – mL */
  finalVolumeMl: number;         // 20
  /** Elde edilen son konsantrasyon */
  finalConcentration: string;    // "5 mg/mL"
  /** Adım adım anlatım – UI’de sıralı göstermek için */
  steps: string[];
}
/* yeni tip */
export interface DilutionGuide {
  bolus?: DilutionInfo;
  infusion?: DilutionInfo;
}
export interface Medication {
  name: string;
  dose: string;
  concentration: string;
  sonDilution: string;
  administrationRate: string;
  applicationMethod: string;
  indications: string;
  incompatibleDrugs: string;
  storageConditions: string;
  importantNotes: string;
  continuousInfusion: boolean;  // Yeni özellik
  /** YENİ: sulandırma rehberi – varsa doldurulur */
  dilution?: DilutionGuide;
  doseGuide?: DoseGuide[];
}
/* Yaş kuralı:  < 7 gün   ≥ 7 gün  … */
export interface AgeRule {
  op: '<' | '<=' | '>' | '>=' | '==';
  days: number;
}

/* Her yaş diliminde iki ayrı doz ifadesi (tam string) */
export interface DosePair {
  loading: string;      // ör: "10-20 mcg/kg/dose"
  maintenance?: string;  // ör: "5 mcg/kg/sa"
}
export interface DoseNotes {
  loading? : string;
  maintenance?: string;
}

/* Ayrıntılı doz kılavuzu */
export interface DoseGuide {
  age: AgeRule;         // hangi yaş grubu
  doses: DosePair;      // yükleme + idame
  notes?: DoseNotes;
}

export const MEDICATIONS: Medication[] = [
  {
    name: 'Amikasin 100mg/2ml',
    dose: '15-20 mg/kg/dose',
    concentration: '100 mg/2 ml',
    sonDilution: '100-500 mL D5W veya NS içine seyreltilir (1-5 mg/mL).',
    administrationRate: '30-60 dk IV infüzyon',
    applicationMethod: 'IV',
    indications: 'Gram-negatif bakteriyel enfeksiyonlar, sepsis, menenjit, pnömoni',
    incompatibleDrugs: 'Beta-laktam antibiyotikler (Penisilinler, Sefalosporinler) ile aynı enjektörde veya aynı damar hattında karıştırılmaz.',
    storageConditions: "2–8°C'de buzdolabında saklanır. Sulandırıldıktan sonra 24 saat içinde kullanılmalıdır.",
    importantNotes: 'Ototoksisite (işitme kaybı) ve nefrotoksisite (böbrek hasarı) riski vardır. Serum Amikasin düzeyi izlenmelidir. Doz ve aralık serum düzeyine göre ayarlanabilir.',
    continuousInfusion: false,
    dilution: {
      bolus: {
        stockVolumeMl: 2,
        stockAmount: '100 mg',
        diluent: { volumeMl: 18, type: '%0.9 NaCl veya %5 Dekstroz D5W' },
        finalVolumeMl: 20,
        finalConcentration: '5 mg/mL',
        steps: [
          '2 mL (100 mg) Amikasin çekilir.',
          '18 mL %0.9 NaCl veya %5 Dekstroz D5W eklenir.',
          'Toplam 20 mL ⇒ 5 mg/mL.'
        ]
      }
    },
  },
  {
    name: 'Amikasin 250mg/2ml',
    dose: '15-20 mg/kg/dose',
    concentration: '250 mg/2 ml',
    sonDilution: '100-500 mL D5W veya NS içine seyreltilir (1-5 mg/mL).',
    administrationRate: '30-60 dk IV infüzyon',
    applicationMethod: 'IV',
    indications: 'Gram-negatif bakteriyel enfeksiyonlar, sepsis, menenjit, pnömoni',
    incompatibleDrugs: 'Beta-laktam antibiyotikler (Penisilinler, Sefalosporinler) ile aynı enjektörde veya aynı damar hattında karıştırılmaz.',
    storageConditions: "2–8°C'de buzdolabında saklanır. Sulandırıldıktan sonra 24 saat içinde kullanılmalıdır.",
    importantNotes: 'Ototoksisite (işitme kaybı) ve nefrotoksisite (böbrek hasarı) riski vardır. Serum Amikasin düzeyi izlenmelidir. Doz ve aralık serum düzeyine göre ayarlanabilir.',
    continuousInfusion: false,
    dilution: {
      bolus: {
        stockVolumeMl: 2,
        stockAmount: '250 mg',
        diluent: { volumeMl: 48, type: '%0.9 NaCl veya %5 Dekstroz D5W' },
        finalVolumeMl: 50,
        finalConcentration: '5 mg/mL',
        steps: [
          '2 mL (250 mg) Amikasin çekilir.',
          '48 mL %0.9 NaCl veya %5 Dekstroz D5W eklenir.',
          'Toplam 50 mL ⇒ 5 mg/mL.'
        ]
      }
    },
  },
  {
    name: 'Amikasin 500mg/2ml',
    dose: '15-20 mg/kg/dose',
    concentration: '500 mg/2 ml',
    sonDilution: '100-500 mL D5W veya NS içine seyreltilir (1-5 mg/mL).',
    administrationRate: '30-60 dk IV infüzyon',
    applicationMethod: 'IV',
    indications: 'Gram-negatif bakteriyel enfeksiyonlar, sepsis, menenjit, pnömoni',
    incompatibleDrugs: 'Beta-laktam antibiyotikler (Penisilinler, Sefalosporinler) ile aynı enjektörde veya aynı damar hattında karıştırılmaz.',
    storageConditions: "2–8°C'de buzdolabında saklanır. Sulandırıldıktan sonra 24 saat içinde kullanılmalıdır.",
    importantNotes: 'Ototoksisite (işitme kaybı) ve nefrotoksisite (böbrek hasarı) riski vardır. Serum Amikasin düzeyi izlenmelidir. Doz ve aralık serum düzeyine göre ayarlanabilir.',
    continuousInfusion: false,
    dilution: {
      bolus: {
        stockVolumeMl: 2,
        stockAmount: '500 mg',
        diluent: { volumeMl: 98, type: '%0.9 NaCl veya %5 Dekstroz D5W' },
        finalVolumeMl: 100,
        finalConcentration: '5 mg/mL',
        steps: [
          '2 mL (500 mg) Amikasin çekilir.',
          '98 mL %0.9 NaCl veya %5 Dekstroz D5W eklenir.',
          'Toplam 100 mL ⇒ 5 mg/mL.'
        ]
      }
    },
  },
  {
    name: 'Digoxin 0.5mg/2ml IV Ampul' ,
    dose: '10-20 mcg/kg/dose',
    concentration: '0.5 mg/2 ml',
    sonDilution: '1:10 oranında NS ile seyreltilir. (1 mcg/mL)',
    administrationRate: '10-15 dk IV infüzyon',
    applicationMethod: 'IV veya oral',
    indications: 'Konjestif kalp yetmezliği, supraventriküler taşikardi, atriyal flatter/fibrilasyon.',
    incompatibleDrugs: 'Heparin, Furosemid, Amfoterisin B ile doğrudan aynı infüzyon hattında karıştırılmamalıdır.',
    storageConditions: "Oda sıcaklığında saklanabilir (15–25°C). Sulandırıldıktan sonra 24 saat içinde kullanılmalıdır.",
    importantNotes: 'Dar terapötik aralığı vardır. Serum Digoksin düzeyleri izlenmelidir. Doz aşımı ciddi kardiyak toksisiteye yol açabilir. Renal fonksiyon bozukluklarında doz azaltılmalıdır.',
    continuousInfusion: false,
    /* ☆ YAŞA VE YÜKLEME/İDAMEYE GÖRE AYRINTILI DOZLAR ☆ */
    doseGuide: [
      {                                   // <1 haftalık
        age: { op: '<',  days: 7 },
        doses: {
          loading:     '10-20 mcg/kg/dose', // yükleme
          maintenance: '5 mcg/kg/gün'        // idame (saatlik)
        }
      },
      {                                   // ≥1 hafta
        age: { op: '>=', days: 7 },
        doses: {
          loading:     '30 mcg/kg/dose',
          maintenance: '8-10 mcg/kg/gün'
        }
      }
    ],
    dilution: {
      bolus: {
        stockVolumeMl: 2,
        stockAmount: '0.5 mg',
        diluent: { volumeMl: 23, type: '%0.9 NaCl veya %5 Dekstroz D5W' },
        finalVolumeMl: 25,
        finalConcentration: '0.02 mg/mL (20 µg/mL)',
        steps: [
          '2 mL (0.5 mg) Digoksin alınır.',
          '23 mL %0.9 NaCl veya %5 Dekstroz D5W eklenir.',
          'Toplam 25 mL ⇒ 0.02 mg/mL.'
        ]
      }
    },
  },
  {
    name: 'Digoxin 0.5mg/ml Damla',
    dose: '10-20 mcg/kg/dose',
    concentration: '0.5 mg/1 ml',
    sonDilution: '1:10 oranında NS ile seyreltilir. (0.05 mg/mL)',
    administrationRate: '10-15 dk IV infüzyon',
    applicationMethod: 'IV veya oral',
    indications: 'Konjestif kalp yetmezliği, supraventriküler taşikardi, atriyal flatter/fibrilasyon.',
    incompatibleDrugs: 'Ağızdan birlikte verilmesi özel bir karışım uyarısı yoktur, ancak başka oral ilaçlarla karıştırılmaması önerilir.',
    storageConditions: "15–25°C oda sıcaklığında saklanır. Işıktan korunmalıdır.",
    importantNotes: 'Çok dar terapötik aralığı vardır. Aşırı dozda ciddi kardiyotoksisite yapabilir. Serum digoksin düzeyleri (0.8–2 ng/mL) mutlaka izlenmelidir. Renal fonksiyon bozukluğunda doz azaltılmalıdır. Doz ayarı ve uygulama miktarı çok dikkatli hesaplanmalıdır.',
    continuousInfusion: false,
    doseGuide: [
      {
        age: { op: '<', days: 7 },
        doses: {
          loading: '10-20 mcg/kg/dose',
          maintenance: '5 mcg/kg/gün'
        }
      },
      {
        age: { op: '>=', days: 7 },
        doses: {
          loading: '30 mcg/kg/dose',
          maintenance: '8-10 mcg/kg/gün'
        }
      }
    ],
    dilution: {
      bolus: {
        stockVolumeMl: 1,
        stockAmount: '0.5 mg',
        diluent: { volumeMl: 9, type: '%0.9 NaCl' },
        finalVolumeMl: 10,
        finalConcentration: '0.05 mg/mL (50 µg/mL)',
        steps: [
          '1 mL (0.5 mg) Digoksin damlası alınır.',
          '9 mL %0.9 NaCl veya steril enjeksiyonluk su eklenir.',
          'Toplam 10 mL → 0.05 mg/mL (50 µg/mL).',
          'Bu konsantrasyon küçük dozların (örneğin 5–10 µg) daha güvenli ölçülmesini sağlar.'
        ]
      }
    }
  },
  {
    name: 'Heparin 25000 IU/5ml',
    dose: '10-28 IU/kg/saat',
    concentration: '25000 IU/5 ml',
    sonDilution: 'NS veya D5W içine seyreltilir (1-2 IU/mL).',
    administrationRate: 'Sürekli IV infüzyon',
    applicationMethod: 'IV',
    indications: 'Venöz tromboz tedavisi, santral kateter tıkanıklıklarının önlenmesi, DVT, pulmoner emboli önlenmesi.',
    incompatibleDrugs: 'Amfoterisin B, Dobutamin, Nitroprussid gibi bazı ilaçlarla aynı damar hattında karıştırılmamalıdır. (Fiziksel uyumsuzluk riski.)',
    storageConditions: 'Oda sıcaklığında (15–25°C) saklanır. Işıktan korunmalıdır. Sulandırıldıktan sonra 24 saat içinde kullanılmalıdır.',
    importantNotes: 'aPTT (activated partial thromboplastin time) izlenmelidir. Aşırı dozda ciddi kanama riski vardır. Antidot: Protamin sülfattır. Doz titizlikle ayarlanmalıdır.',
    continuousInfusion: true,
    doseGuide: [
      {
        age: { op: '>=', days: 0 },           // tüm yaşlar
        doses: {
          loading:     '50-100 IU/kg/bolus',        // bolus
          maintenance: '10-28 IU/kg/saat'     // sürekli inf.
        }
      }
    ],
    dilution: {
      bolus: {
        stockVolumeMl: 1,
        stockAmount: '5 000 IU',
        diluent: { volumeMl: 499, type: '%0.9 NaCl veya %5 Dekstroz D5W' },
        finalVolumeMl: 500,
        finalConcentration: '10 IU/mL',
        steps: [
          '1 mL (5 000 IU) Heparin çekilir.',
          '499 mL  %0.9 NaCl veya D5W içine eklenir.',
          'Toplam 500 mL ⇒ 10 IU/mL.'
        ]
      }
    },
  },
  {
    name: 'İnsülin 100 IU/ml',
    /* ⬇︎ yeni başlangıç aralığı */
    dose: '0.01-0.1 IU/kg/saat IV infüzyon',
    concentration: '100 IU/ml',
    sonDilution: '0.05–1 IU/mL olacak şekilde NS veya D5W ile seyreltilir. (0.05–1 IU/mL)',
    administrationRate: 'Sürekli infüzyon',
    applicationMethod: 'IV',
    indications: 'Hiperglisemi yönetimi (özellikle prematüre ve çok düşük doğum ağırlıklı bebeklerde), hiperpotasemi yönetimi.',
    incompatibleDrugs: 'İnfüzyon sistemlerinde doğrudan başka ilaçlarla karıştırılmaz. (İnfüzyon hattı ayrı olmalıdır.)',
    storageConditions: "Kullanılmayan insülin flakonları 2–8°C buzdolabında saklanır.\n" +
      "Açılan flakon 28 gün içinde kullanılmalıdır. Sulandırılmış solüsyonlar oda sıcaklığında 24 saat içinde tüketilmelidir.",
    importantNotes:
      'Hipoglisemi riski vardır. Kan şekeri çok yakından izlenmelidir. İnsülin infüzyonu başlarken serum glukozu sık (saatlik) ölçülmelidir.',
    continuousInfusion: true,          // ← düzeltildi
    /* tek satırlık rehber – her yaştaki başlangıç hızı */
    doseGuide: [
      {
        age:   { op: '>=', days: 0 },   // yaş ayrımı yok
        doses: {
          /* yükleme kullanılmıyor → aynı aralığı verdik (boş bırakmak kodu bozabilir) */
          loading:     '0.01-0.1 IU/kg/saat',
          maintenance: '0.01-0.1 IU/kg/saat'
        },
        notes: {
          maintenance: 'Başlangıç hızı – glisemik hedefe göre titre edin'
        }
      }
    ],
    dilution: {
      bolus: {
        stockVolumeMl: 1,
        stockAmount: '100 IU',
        diluent: { volumeMl: 999, type: '%0.9 NaCl veya D5W' },
        finalVolumeMl: 1000,
        finalConcentration: '0.1 IU/mL',
        steps: [
          '1 mL (100 IU) insülin çekilir.',
          '999 mL %0.9 NaCl veya D5W eklenir.',
          'Toplam 1000 mL → 0.1 IU/mL.'
        ]
      }
    }
  },
  {
    name: 'Adrenalin 0.25mg/ml',
    dose: '0.05-0.5 mcg/kg/dk IV push',
    concentration: '0.25 mg/ml',
    sonDilution: '1:10 oranında NS veya D5W ile seyreltilir (10 mcg/mL).',
    administrationRate: 'Bolus veya sürekli infüzyon',
    applicationMethod: 'IV, ET (acil durumlarda)',
    indications: 'Yenidoğan resüsitasyonu (asistoli, ciddi bradikardi), kardiyopulmoner arrest, ciddi hipotansiyon.',
    incompatibleDrugs: 'Sodyum bikarbonat ile doğrudan aynı enjektörde veya infüzyon hattında verilmemelidir (inaktive olabilir).',
    storageConditions: '15–25°C arasında oda sıcaklığında saklanır. Işıktan korunmalıdır. Sulandırıldıktan sonra hemen kullanılmalı veya 24 saat içinde tüketilmelidir.',
    importantNotes:
      'Doz aşımı ciddi hipertansiyon, aritmi, iskemik hasar oluşturabilir. Bolus sonrası kalp ritmi ve kan basıncı sıkı takip edilmelidir. Endotrakeal uygulamada doz 2–3 kat artırılır.',
    continuousInfusion: true,
    doseGuide: [
      {
        age:  { op: '>=', days: 0 },          // yaş bağımsız
        doses: {
          loading:     '0.01-0.03 mg/kg/bolus',
          maintenance: '0.05-0.5 mcg/kg/dk'
        },
        notes: {                              // ← ayrı açıklamalar
          loading:     'Resüsitasyon sırasında (nabız <60/dk ise)',
          maintenance: 'Sürekli IV infüzyon'
        }
      }
    ],
    dilution: {
      bolus: {
        stockVolumeMl: 1,
        stockAmount: '0.25 mg',
        diluent: { volumeMl: 9, type: '%0.9 NaCl' },
        finalVolumeMl: 10,
        finalConcentration: '0.025 mg/mL',
        steps: [
          '1 mL (0.25 mg) Adrenalin çekilir.',
          '9 mL %0.9 NaCl eklenir.',
          'Toplam 10 mL → 0.025 mg/mL.'
        ]
      },
      infusion: {
        stockVolumeMl: 0.4, // 0.1 mg / 0.25 mg·mL⁻¹
        stockAmount: '0.1 mg',
        diluent: { volumeMl: 99.6, type: '%0.9 NaCl' },
        finalVolumeMl: 100,
        finalConcentration: '0.001 mg/mL (1 µg/mL)',
        steps: [
          '0.1 mg Adrenalin (≈0.4 mL) alınır.',
          '100 mL torbaya eklenir.',
          'Son kons.: 0.001 mg/mL (1 µg/mL).'
        ]
      }
    }
  },
  {
    name: 'Adrenalin 0.5mg/ml',
    dose: '0.05-0.5 mcg/kg/dk IV push',
    concentration: '0.50 mg/ml',
    sonDilution: '1:10 oranında NS veya D5W ile seyreltilir (10 mcg/mL).',
    administrationRate: 'Bolus veya sürekli infüzyon',
    applicationMethod: 'IV, ET (acil durumlarda)',
    indications: 'Yenidoğan resüsitasyonu (asistoli, ciddi bradikardi), kardiyopulmoner arrest, hipotansiyon.',
    incompatibleDrugs: 'Sodyum bikarbonat ile doğrudan karıştırılmaz (etkileşir ve inaktive olur).',
    storageConditions: '15–25°C oda sıcaklığında saklanır. Işıktan korunmalıdır. Sulandırıldıktan sonra 24 saat içinde kullanılmalıdır.',
    importantNotes:
      'Doz aşımı ciddi hipertansiyon, taşikardi, aritmi ve doku nekrozuna yol açabilir. Endotrakeal tüp (ETT) yoluyla uygulamada doz artırılarak verilir. Serum glukozu ve laktat düzeyleri izlenmelidir.',
    continuousInfusion: true,
    doseGuide: [
      {
        age:  { op: '>=', days: 0 },          // yaş bağımsız
        doses: {
          loading:     '0.01-0.03 mg/kg/bolus',
          maintenance: '0.05-0.5 mcg/kg/dk'
        },
        notes: {                              // ← ayrı açıklamalar
          loading:     'Resüsitasyon sırasında (nabız <60/dk ise)',
          maintenance: 'Sürekli IV infüzyon'
        }
      }
    ],
    dilution: {
      bolus: {
        stockVolumeMl: 1,
        stockAmount: '0.5 mg',
        diluent: { volumeMl: 49, type: '%0.9 NaCl' },
        finalVolumeMl: 50,
        finalConcentration: '0.01 mg/mL',
        steps: [
          '1 mL (0.5 mg) + 49 mL NaCl.',
          'Toplam 50 mL → 0.01 mg/mL.'
        ]
      },
      infusion: {
        stockVolumeMl: 0.2, // 0.1 mg / 0.5 mg·mL⁻¹
        stockAmount: '0.1 mg',
        diluent: { volumeMl: 99.8, type: '%0.9 NaCl' },
        finalVolumeMl: 100,
        finalConcentration: '0.001 mg/mL (1 µg/mL)',
        steps: [
          '0.1 mg Adrenalin (≈0.2 mL) alınır.',
          '100 mL NaCl ile karıştırılır.',
          'Son kons.: 0.001 mg/mL (1 µg/mL).'
        ]
      }
    }
  },
  {
    name: 'Adrenalin 1mg/ml',
    dose: '0.05-0.5 mcg/kg/dk IV push',
    concentration: '1 mg/ml',
    sonDilution: '1:10 oranında NS veya D5W ile seyreltilir (10 mcg/mL).',
    administrationRate: 'Bolus veya sürekli infüzyon',
    applicationMethod: 'IV, ET (acil durumlarda)',
    indications: 'Yenidoğan resüsitasyonu (bradikardi, asistoli), kardiyopulmoner arrest, ciddi hipotansiyon.',
    incompatibleDrugs: 'Sodyum bikarbonat ile aynı enjektörde veya infüzyon hattında verilmez (kimyasal inaktivasyon riski).',
    storageConditions: '15–25°C oda sıcaklığında saklanır. Işıktan korunmalıdır. Sulandırıldıktan sonra 24 saat içinde kullanılmalıdır.',
    importantNotes:
      'Doz aşımı hipertansiyon, taşikardi, ventriküler aritmi ve iskemik organ hasarına neden olabilir. Endotrakeal (ETT) uygulamada doz 2–3 kat artırılır. Uygulama sonrası vital bulgular sıkı takip edilmelidir.',
    continuousInfusion: true,
    doseGuide: [
      {
        age:  { op: '>=', days: 0 },          // yaş bağımsız
        doses: {
          loading:     '0.01-0.03 mg/kg/bolus',
          maintenance: '0.05-0.5 mcg/kg/dk'
        },
        notes: {                              // ← ayrı açıklamalar
          loading:     'Resüsitasyon sırasında (nabız <60/dk ise)',
          maintenance: 'Sürekli IV infüzyon'
        }
      }
    ],
    dilution: {
      bolus: {
        stockVolumeMl: 1,
        stockAmount: '1 mg',
        diluent: { volumeMl: 9, type: '%0.9 NaCl (ilk seyreltme)' },
        finalVolumeMl: 10,
        finalConcentration: '0.01 mg/mL',
        steps: [
          '1 mL (1 mg) + 9 mL NaCl → 0.1 mg/mL.',
          'Neonatal hedef 0.01 mg/mL:',
          '— 1 mL (0.1 mg/mL) + 9 mL NaCl → 0.01 mg/mL.'
        ]
      },
      infusion: {
        stockVolumeMl: 0.1, // 0.1 mg / 1 mg·mL⁻¹
        stockAmount: '0.1 mg',
        diluent: { volumeMl: 99.9, type: '%0.9 NaCl' },
        finalVolumeMl: 100,
        finalConcentration: '0.001 mg/mL (1 µg/mL)',
        steps: [
          '0.1 mg Adrenalin (0.1 mL) alınır.',
          '100 mL NaCl ile karıştırılır.',
          'Son kons.: 0.001 mg/mL (1 µg/mL).'
        ]
      }
    }
  },
  {
    name: 'Midazolam 15mg/3ml',
    dose: '0.05-0.15 mg/kg IV',
    concentration: '5 mg/ml',
    sonDilution: '0.5 mg/mL olacak şekilde NS veya D5W ile seyreltilir. (0.5 mg/mL)',
    administrationRate: '10 dk IV infüzyon veya sürekli',
    applicationMethod: 'IV, oral, intranazal, sublingual',
    indications: 'Mekanik ventilasyonda sedasyon sağlama, konvülsiyon kontrolü (status epileptikus), anksiyete ve ajitasyon kontrolü.',
    incompatibleDrugs: 'Midazolam özellikle alkali solüsyonlarla (örn. Sodyum bikarbonat) karıştırıldığında çökelme yapabilir, dikkat edilmelidir.',
    storageConditions: 'Ampuller 15–30°C arası oda sıcaklığında saklanır. Sulandırıldıktan sonra 24 saat içinde kullanılmalıdır.',
    importantNotes: 'Solunum depresyonu riski vardır. IV uygulama sırasında vital bulgular (solunum hızı, oksijen satürasyonu, kalp atımı) çok yakından izlenmelidir. Hipotansiyon ve bradikardi riski bulunur. Sürekli monitörizasyon önerilir.',
    continuousInfusion: true,
    /* ▼▼ yeni doz rehberi ▼▼ */
    doseGuide: [
      {
        age: { op: '>=', days: 0 },                 // yaş ayrımı yok
        doses: {
          loading:     '0.05–0.15 mg/kg/dose',     // tekrarlayan sedasyon
          maintenance: '0.03–0.15 mg/kg/saat'       // sürekli infüzyon
        },
        notes: {
          loading:     'Tekrarlayan sedasyon (IV bolus)',
          maintenance: 'Sürekli IV infüzyon'
        }
      }
    ],
    dilution: {
      bolus: {
        stockVolumeMl: 1,
        stockAmount: '5 mg',
        diluent: { volumeMl: 49, type: '%0.9 NaCl veya D5W' },
        finalVolumeMl: 50,
        finalConcentration: '0.1 mg/mL',
        steps: [
          '1 mL (5 mg) Midazolam + 49 mL %0.9 NaCl veya D5W eklenir',
          'Toplam 50 mL → 0.1 mg/mL.'
        ]
      }
    },
  },
  {
    name: 'Midazolam 50mg/10ml',
    dose: '0.05-0.15 mg/kg IV',
    concentration: '5 mg/ml',
    sonDilution: '0.5 mg/mL olacak şekilde NS veya D5W ile seyreltilir. (0.5 mg/mL)',
    administrationRate: '10 dk IV infüzyon veya sürekli',
    applicationMethod: 'IV, oral, intranazal, sublingual',
    indications: 'Mekanik ventilasyonda sedasyon sağlama, konvülsiyon kontrolü (status epileptikus), anksiyete ve ajitasyon kontrolü.',
    incompatibleDrugs: 'Midazolam özellikle alkali solüsyonlarla (örn. Sodyum bikarbonat) karıştırıldığında çökelme yapabilir, dikkat edilmelidir.',
    storageConditions: 'Ampuller 15–30°C arası oda sıcaklığında saklanır. Sulandırıldıktan sonra 24 saat içinde kullanılmalıdır.',
    importantNotes: 'Solunum depresyonu riski vardır. IV uygulama sırasında vital bulgular (solunum hızı, oksijen satürasyonu, kalp atımı) çok yakından izlenmelidir. Hipotansiyon ve bradikardi riski bulunur. Sürekli monitörizasyon önerilir.',
    continuousInfusion: true,
    /* ▼▼ yeni doz rehberi ▼▼ */
    doseGuide: [
      {
        age: { op: '>=', days: 0 },                 // yaş ayrımı yok
        doses: {
          loading:     '0.05–0.15 mg/kg/dose',     // tekrarlayan sedasyon
          maintenance: '0.03–0.15 mg/kg/saat'       // sürekli infüzyon
        },
        notes: {
          loading:     'Tekrarlayan sedasyon (IV bolus)',
          maintenance: 'Sürekli IV infüzyon'
        }
      }
    ],
    dilution: {
      bolus: {
        stockVolumeMl: 1,
        stockAmount: '5 mg',
        diluent: { volumeMl: 49, type: '%0.9 NaCl veya D5W' },
        finalVolumeMl: 50,
        finalConcentration: '0.1 mg/mL',
        steps: [
          '1 mL (5 mg) Midazolam + 49 mL %0.9 NaCl veya D5W eklenir',
          'Toplam 50 mL → 0.1 mg/mL.'
        ]
      }
    },
  },
  {
    name: 'Fentanil 50mcg/ml',
    dose: '0.5-2 mcg/kg/sa IV infüzyon',
    concentration: '50 mcg/ml',
    sonDilution: '10 mcg/mL olacak şekilde NS veya D5W ile seyreltilir. (1 mcg/mL)',
    administrationRate: '15-30 dk IV infüzyon',
    applicationMethod: 'IV',
    indications: 'Mekanik ventilasyon sırasında analjezi (ağrı kontrolü), ciddi ağrılı durumlar, postoperatif ağrı kontrolü.',
    incompatibleDrugs: 'Alkali solüsyonlarla (sodyum bikarbonat gibi) karıştırılmamalıdır (çökelme ve inaktivasyon riski).',
    storageConditions: 'Oda sıcaklığında (15–25°C) saklanır. Sulandırıldıktan sonra 24 saat içinde kullanılmalıdır.',
    importantNotes: 'Solunum depresyonu, bradikardi ve göğüs duvarı rijiditesi (göğüs kaslarında katılık) yapabilir. Uygulama sırasında vital bulgular (solunum hızı, satürasyon, kalp atımı) çok yakından izlenmelidir. Antidotu: Nalokson.',
    continuousInfusion: true,
    /* ▼▼ doz rehberi ▼▼ */
    doseGuide: [
      {
        age: { op: '>=', days: 0 },          // yaşa göre ayrım yok
        doses: {
          loading:     '2–3 mcg/kg/bolus',    // IV yavaş enjeksiyon
          maintenance: '0.5–4 mcg/kg/saat'   // sürekli IV infüzyon
        },
        notes: {
          loading:     'IV bolus – yavaş (1-2 dk) enjeksiyon',
          maintenance: 'Sürekli IV infüzyon'
        }
      }
    ],
    dilution: {
      bolus: {
        stockVolumeMl: 1,
        stockAmount: '50 µg',
        diluent: { volumeMl: 49, type: '%0.9 NaCl veya D5W' },
        finalVolumeMl: 50,
        finalConcentration: '1 µg/mL',
        steps: [
          '1 mL (50 µg) Fentanil + 49 mL %0.9 NaCl veya D5W eklenir.',
          'Toplam 50 mL → 1 µg/mL.'
        ]
      }
    },
  },
  {
    name: 'Dopamin 50mg/5ml',
    dose: '5-20 mcg/kg/dk IV infüzyon',
    concentration: '40 mgc/ml',
    sonDilution: '1600 mcg/mL olacak şekilde NS veya D5W ile seyreltilir. (1600 mcg/mL)',
    administrationRate: 'Sürekli IV infüzyon',
    applicationMethod: 'IV',
    indications: 'Hipotansiyon, şok, düşük kalp debisi sendromu (özellikle sepsis, asfiksi sonrası dolaşım desteği).',
    incompatibleDrugs: 'Sodyum bikarbonat ve diğer alkali solüsyonlarla karıştırılmaz (bozulur).',
    storageConditions: 'Ampul 15–30°C arasında saklanır. Sulandırıldıktan sonra 24 saat içinde kullanılmalıdır. Işıktan korunmalıdır.',
    importantNotes: 'İnfüzyon pompası kullanımı şarttır.\n' +
      '- Damar dışına kaçarsa ciddi doku nekrozu gelişebilir (ekstravazasyon).\n' +
      '- Uygulama sırasında kan basıncı, idrar çıkışı, kalp atım hızı sürekli izlenmelidir.\n' +
      '- Hipertansiyon ve taşikardi riski nedeniyle doz artışları dikkatle yapılmalıdır.\n' +
      '- Renal perfüzyon ve inotropik etki doza bağımlıdır:\n' +
      '→ Düşük dozlar (2–5 mcg/kg/dk): Böbrek kan akımını artırır.\n' +
      '→ Orta dozlar (5–10 mcg/kg/dk): Kalp kası kasılmasını artırır.\n' +
      '→ Yüksek dozlar (>10 mcg/kg/dk): Vazokonstriksiyon etkisi baskındır.',
    continuousInfusion: true,
    dilution: {
      bolus: {
        stockVolumeMl: 2.5,
        stockAmount: '100 mg',
        diluent: { volumeMl: 250, type: '%0.9 NaCl veya D5W' },
        finalVolumeMl: 252.5,
        finalConcentration: '0.4 mg/mL (400 µg/mL)',
        steps: [
          '2.5 mL (100 mg) Dopamin + 250 mL %0.9 NaCl veya D5W içine eklenir.',
          '≈252.5 mL → 0.4 mg/mL - (400 mcg/ml).'
        ]
      }
    },

  },
  {
    name: 'Klindamisin 300mg/2ml',
    dose: '5-10 mg/kg/dose IV infüzyon',
    concentration: '150 mg/ml',
    sonDilution: 'Genellikle 6–12 mg/mL arası hazırlanır.Yenidoğanlarda infüzyon solüsyonu genellikle 6–9 mg/mL konsantrasyonda ayarlanır. (6–9 mg/mL)',
    administrationRate: 'Yenidoğanlarda infüzyon solüsyonu genellikle 6–9 mg/mL konsantrasyonda ayarlanır.',
    applicationMethod: 'IV',
    indications: 'Anaerobik bakteriyel enfeksiyonlar, sepsis, kemik ve eklem enfeksiyonları, intraabdominal enfeksiyonlar.',
    incompatibleDrugs: 'Ampisilin, Furosemid ve bazı kalsiyum içeren solüsyonlarla fiziksel uyumsuzluk olabilir (çökelti oluşabilir).',
    storageConditions: 'Ampuller oda sıcaklığında (15–25°C) saklanır. Sulandırılmış çözeltiler 24 saat içinde kullanılmalıdır.',
    importantNotes: 'İnfüzyon hızı çok yüksek olursa hipotansiyon ve kardiyak arrest riski vardır. IV infüzyon mutlaka yavaş yapılmalıdır. Uzun süreli kullanımda psödomembranöz enterokolit (Clostridium difficile ilişkili ishal) gelişebilir.',
    continuousInfusion: false,
    doseGuide: [
      {
        age: { op: '<', days: 7 },                // <7 gün
        doses: {
          loading:     '5-10 mg/kg/dose',
        },
        notes: {
          loading:     '8–12 saatte bir',
        }
      },
      {
        age: { op: '>=', days: 7 },               // ≥7 gün
        doses: {
          loading:     '5-10 mg/kg/dose',
        },
        notes: {
          loading:     '6–8 saatte bir',
        }
      }
    ],
    /* 6 mg/mL’lik standart sulandırma şeması */
    dilution: {
      bolus: {
        stockVolumeMl: 2,
        stockAmount: '300 mg',
        diluent: { volumeMl: 48, type: '%0.9 NaCl veya D5W' },
        finalVolumeMl: 50,
        finalConcentration: '6 mg/mL',
        steps: [
          '2 mL (300 mg) Klindamisin ampulü çekilir.',
          '48 mL  %0.9 NaCl veya D5W eklenir.',
          'Toplam 50 mL → 6 mg/mL çözelti elde edilir.'
        ]
      }
    }
  },
  {
    name: 'Gentamisin 20mg/2ml',
    dose: '2.5 mg/kg/dose',
    concentration: '20 mg/2 ml, 40 mg/2 ml',
    sonDilution: '4-5 mg/mL olacak şekilde NS veya D5W ile seyreltilir. (4-5 mg/mL)',
    administrationRate: '30-60 dk IV infüzyon',
    applicationMethod: 'IV',
    indications: 'Gram-negatif enfeksiyonlar, sepsis, menenjit, pnömoni.',
    incompatibleDrugs: 'Penisilinler ve sefalosporinlerle aynı damar hattında karıştırılmamalıdır. (İnaktivasyon riski.)',
    storageConditions: "Oda sıcaklığında (15–25°C) saklanır. Açıldıktan sonra 24 saat içinde kullanılmalıdır.",
    importantNotes: 'Ototoksisite (işitme hasarı) ve nefrotoksisite (böbrek hasarı) riski vardır. Gentamisin serum düzeyleri (zirve ve çukur düzeyler) düzenli olarak izlenmelidir. Renal fonksiyonlar da izlenmelidir.',
    continuousInfusion: false,
    /* ▼▼ YAŞA GÖRE BOLUS DOZ REHBERİ ▼▼ */
    doseGuide: [
      {
        /* < 7 günlük yenidoğan */
        age: { op: '<', days: 7 },
        doses: {
          loading: '4-5 mg/kg/dose'     // yalnızca bolus; maintenance yok
        },
        notes: {
          loading: 'IV • 24 saatte bir'
        }
      },
      {
        /* ≥ 7 günlük */
        age: { op: '>=', days: 7 },
        doses: {
          loading: '4-5 mg/kg/dose'
        },
        notes: {
          loading: 'IV • 8-16 saatte bir'
        }
      }
    ],
    dilution: {
      bolus: {
        stockVolumeMl: 1,
        stockAmount: '10 mg',
        diluent: { volumeMl: 1, type: '%0.9 NaCl' },
        finalVolumeMl: 2,
        finalConcentration: '5 mg/mL',
        steps: [
          '1 mL (10 mg) + 1 mL NaCl.',
          'Toplam 2 mL → 5 mg/mL.'
        ]
      }
    },
  },
  {
    name: 'Meropenem 500mg/2ml',
    dose: '20-40 mg/kg/dose',
    concentration: '500 mg',
    sonDilution: '10-20 mg/mL olacak şekilde NS ile seyreltilir. (10-20 mg/mL)',
    administrationRate: '15-30 dk IV infüzyon',
    applicationMethod: 'IV',
    indications: 'Sepsis, menenjit, komplike intraabdominal enfeksiyonlar, gram-negatif bakteriyel enfeksiyonlar (özellikle çok ilaca dirençli patojenler).',
    incompatibleDrugs: 'Diğer antibiyotiklerle doğrudan aynı enjektörde veya infüzyon hattında karıştırılmamalıdır.',
    storageConditions: "Sulandırılmamış toz form buzdolabında 2–8°C'de saklanır.\n" +
      "Sulandırıldıktan sonra 24 saat içinde kullanılmalıdır.",
    importantNotes: 'Yüksek dozlarda konvülsiyon (nöbet) riski olabilir. Doz renal fonksiyonlara göre ayarlanmalıdır. Özellikle prematürelerde dikkatli serum kreatinin takibi önerilir.',
    continuousInfusion: false,
    /* ▼▼ YAŞ & DOZ REHBERİ (yalnız bolus) ▼▼ */
    doseGuide: [
      {
        /* <32 gestasyon haftası  VE  <14 postnatal gün */
        age: { op: '<', days: 14 },
        doses: {
          loading: '20 mg/kg/dose'
        },
        notes: {
          loading: '12 saat (<32 GA + <2 hafta)'
        }
      },
      {
        /* ≥14 postnatal gün  (veya >32 hafta GA) */
        age: { op: '>=', days: 14 },
        doses: {
          loading: '20 mg/kg/dose'
        },
        notes: {
          loading: '8 saat (≥2 hafta veya >32 GA)'
        }
      }
    ],
    dilution: {
      bolus: {
        stockVolumeMl: 2,
        stockAmount: '100 mg',
        diluent: { volumeMl: 18, type: '%0.9 NaCl veya D5W' },
        finalVolumeMl: 20,
        finalConcentration: '5 mg/mL',
        steps: [
          'Flakona 10 mL steril enjeksiyonluk su eklenir → 50 mg/mL.',
          '2 mL (100 mg) + 18 mL %0.9 NaCl veya D5W .',
          'Toplam 20 mL → 5 mg/mL.'
        ]
      }
    },
  },
  {
    name: 'Vancomisin 500mg/2ml',
    dose: '10-15 mg/kg/dose',
    concentration: '500 mg',
    sonDilution: '5 mg/mL olacak şekilde NS veya D5W ile seyreltilir. (5 mg/mL)',
    administrationRate: '60 dk IV infüzyon',
    applicationMethod: 'IV',
    indications: 'Gram-pozitif bakteriyel enfeksiyonlar, özellikle MRSA, enterokok enfeksiyonları, sepsis, menenjit, osteomiyelit.',
    incompatibleDrugs: 'Aminoglikozidler, bazı antibiyotikler ile aynı infüzyon hattında verilmemelidir.',
    storageConditions: "Toz form 2–8°C’de buzdolabında saklanır.Sulandırıldıktan sonra oda sıcaklığında 24 saat, buzdolabında 48 saat stabil kalır.",
    importantNotes: 'Hızlı infüzyon ciddi hipotansiyon ve Red Man Sendromu yapabilir. Serum Vankomisin düzeyleri (zirve ve çukur düzeyler) izlenmelidir. Renal fonksiyonlar (BUN, kreatinin) düzenli takip edilmelidir.',
    continuousInfusion: false,
    /* ▼▼ YAŞ & DOZ REHBERİ (yalnız bolus) ▼▼ */
    doseGuide: [
      {
        /* <7 gün */
        age: { op: '<', days: 7 },
        doses: {
          loading: '10-15 mg/kg/dose'
        },
        notes: {
          loading: '12-18 saat (<7 gün)'
        }
      },
      {
        /* ≥7 gün */
        age: { op: '>=', days: 7 },
        doses: {
          loading: '10-15 mg/kg/dose'
        },
        notes: {
          loading: '8-12 saat (≥7 gün)'
        }
      }
    ],
    dilution: {
      bolus: {
        stockVolumeMl: 5,
        stockAmount: '250 mg',
        diluent: { volumeMl: 45, type: '%0.9 NaCl' },
        finalVolumeMl: 50,
        finalConcentration: '5 mg/mL',
        steps: [
          'Flakona 10 mL steril enjeksiyonluk su eklenir → 50 mg/mL.',
          '5 mL (250 mg) + 45 mL %0.9 NaCl veya D5W.',
          'Toplam 50 mL → 5 mg/mL.'
        ]
      }
    },
  },
  {
    name: 'Curosurf (Surfactant) 120mg/1.5ml',
    dose: '200 mg/kg',
    concentration: '120 mg/1.5 ml, 240 mg/3 ml (120 mg/1.5 ml)',
    sonDilution: 'Seyreltme yapılmaz, doğrudan uygulanır.',
    administrationRate: 'Hızlı intratrakeal uygulama',
    applicationMethod: 'İntratrakeal',
    indications: 'Respiratuvar Distres Sendromu (RDS) tedavisi; prematüre yenidoğanlarda akciğer yüzey gerilimini azaltmak amacıyla kullanılır.',
    incompatibleDrugs: 'Diğer ilaçlarla karıştırılmaz, ayrı uygulanır.',
    storageConditions: "2–8°C’de buzdolabında saklanır.\n" +
      "Flakon kullanılmadan önce oda sıcaklığına (yaklaşık 20 dakika) getirilmelidir.Açılan flakon hemen kullanılmalı, kullanılmayan miktar atılmalıdır.\n",
    importantNotes: 'Uygulama sırasında bradikardi, hipoksi, apne gibi komplikasyonlar gelişebilir. Bu nedenle uygulama sırasında tam monitörizasyon gereklidir. Doz hesabı bebeğin doğum kilosuna göre tam yapılmalıdır.',
    continuousInfusion: false,
    dilution: {
      bolus: {
        stockVolumeMl: 1.5,
        stockAmount: '120 mg',
        diluent: { volumeMl: 0, type: 'Seyreltme yok' },
        finalVolumeMl: 1.5,
        finalConcentration: '80 mg/mL',
        steps: [
          'Seyreltme yapılmaz.',
          'Ampul içeriği doğrudan uygulanır.',
          'Toplam hacim: 1.5 mL → 80 mg/mL'
        ]
      }
    },
    /* ▼▼ DOZ REHBERİ ▼▼ */
    doseGuide: [
      {
        age: { op: '>=', days: 0 },          // tüm yenidoğanlar
        doses: {
          loading:     '200 mg/kg/dose',     // İlk (yükleme) doz
          maintenance: '100 mg/kg/dose'      // Ek doz (gerektikçe)
        },
        notes: {
          loading:     'İlk doz, intratrakeal (ETT) uygulama',
          maintenance: 'Ek doz; 12 saat ara ile, en çok 2 ek doz'
        }
      }
    ],

  },
  {
    name: 'Curosurf (Surfactant) 240mg/3ml',
    dose: '200 mg/kg',
    concentration: '120 mg/1.5 ml, 240 mg/3 ml (120 mg/1.5 ml)',
    sonDilution: 'Seyreltme yapılmaz, doğrudan uygulanır.',
    administrationRate: 'Hızlı intratrakeal uygulama',
    applicationMethod: 'İntratrakeal',
    indications: 'Respiratuvar Distres Sendromu (RDS) tedavisi; prematüre yenidoğanlarda akciğer yüzey gerilimini azaltmak amacıyla kullanılır.',
    incompatibleDrugs: 'Diğer ilaçlarla karıştırılmaz, ayrı uygulanır.',
    storageConditions: "2–8°C’de buzdolabında saklanır.\n" +
      "Flakon kullanılmadan önce oda sıcaklığına (yaklaşık 20 dakika) getirilmelidir.Açılan flakon hemen kullanılmalı, kullanılmayan miktar atılmalıdır.\n",
    importantNotes: 'Uygulama sırasında bradikardi, hipoksi, apne gibi komplikasyonlar gelişebilir. Bu nedenle uygulama sırasında tam monitörizasyon gereklidir. Doz hesabı bebeğin doğum kilosuna göre tam yapılmalıdır.',
    continuousInfusion: false,
    dilution: {
      bolus: {
        stockVolumeMl: 3,
        stockAmount: '240 mg',
        diluent: { volumeMl: 0, type: 'Seyreltme yok' },
        finalVolumeMl: 3,
        finalConcentration: '80 mg/mL',
        steps: [
          'Seyreltme yapılmaz.',
          'Ampul içeriği doğrudan uygulanır.',
          'Toplam hacim: 3 mL → 80 mg/mL'
        ]
      }
    },
    /* ▼▼ DOZ REHBERİ ▼▼ */
    doseGuide: [
      {
        age: { op: '>=', days: 0 },          // tüm yenidoğanlar
        doses: {
          loading:     '200 mg/kg/dose',     // İlk (yükleme) doz
          maintenance: '100 mg/kg/dose'      // Ek doz (gerektikçe)
        },
        notes: {
          loading:     'İlk doz, intratrakeal (ETT) uygulama',
          maintenance: 'Ek doz; 12 saat ara ile, en çok 2 ek doz'
        }
      }
    ],

  },
  {
    name: 'Penisilin G 1000000 UI/5ml',
    dose: '10000-50000 UI/kg/dose',
    concentration: '1000000 UI/5ml',
    sonDilution: '10000-50000 UI/ml (10000-50000 UI/ml)',
    administrationRate: '15–30 dk IV infüzyon',
    applicationMethod: 'IV',
    indications: 'Grup B streptokok enfeksiyonları, doğum sonrası sepsis, menenjit, diğer duyarlı gram-pozitif enfeksiyonlar.',
    incompatibleDrugs: 'Aminoglikozidler ile aynı enjektörde veya damar hattında verilmez (etkileşir ve inaktive olur).',
    storageConditions: "Sulandırılmamış toz 15–30°C'de saklanır.\n" +
      "Sulandırıldıktan sonra 24 saat içinde kullanılmalıdır.\n" +
      "Işıktan korunmalıdır.",
    importantNotes: 'Yüksek dozda nöbet riski (özellikle böbrek fonksiyon bozukluğu olan bebeklerde). Anafilaktik reaksiyon riski vardır. Renal fonksiyonlar ve elektrolit dengesi izlenmelidir.',
    continuousInfusion: false,
    /* ▼▼ DOZ REHBERİ ▼▼ */
    doseGuide: [
      {
        age: { op: '<', days: 7 },           // <7 gün
        doses: {
          loading: '50000 IU/kg/dose'
        },
        notes: {
          loading: '12 saat (<7 gün)'
        }
      },
      {
        age: { op: '>=', days: 7 },          // ≥7 gün
        doses: {
          loading: '50000 IU/kg/dose'
        },
        notes: {
          loading: '8 saat (≥7 gün)'
        }
      }
    ],
    dilution: {
      bolus: {
        stockVolumeMl: 1,
        stockAmount: '100000 IU',
        diluent: { volumeMl: 1, type: '%0.9 NaCl' },
        finalVolumeMl: 2,
        finalConcentration: '50000 IU/mL',
        steps: [
          'Flakona 10 mL steril enjeksiyonluk su eklenir → 100.000 IU/mL.',
          '1 mL (100.000 IU) alınır + 1 mL %0.9 NaCl eklenir',
          'Toplam 2 mL → 50000 IU/mL.'
        ]
      }
    }
  },
  {
    name: 'Ampisilin 125mg/5ml',
    dose: '50-100 mg/kg/dose',
    concentration: '125 mg/5 ml, 250 mg/5 ml (125 mg/5 ml)',
    sonDilution: '50-100 mL (50-100 ???mL)',
    administrationRate: '10-15 dk IV bolus veya 30 dk IV infüzyon',
    applicationMethod: 'IV',
    indications: 'Grup B streptokok enfeksiyonu, neonatal sepsis, menenjit, Listeria enfeksiyonları.',
    incompatibleDrugs: 'Aminoglikozidler (örneğin Gentamisin) ile aynı enjektörde veya infüzyon hattında verilmez (inaktivasyon riski).',
    storageConditions: "Sulandırılmamış flakon 15–30°C’de saklanır.Sulandırıldıktan sonra çözelti hemen kullanılmalı veya 1 saat içinde tüketilmelidir (özellikle infüzyon hazırlığı sonrası).",
    importantNotes: 'Alerjik reaksiyon (anafilaksi) riski vardır. Ciddi seyredebilecek ishal (psödomembranöz enterokolit) gelişebilir. Uygulama sırasında hastanın durumu yakından izlenmelidir.',
    continuousInfusion: false,
    dilution: {
      bolus: {
        stockVolumeMl: 1,
        stockAmount: '100 mg',
        diluent: { volumeMl: 9, type: '%0.9 NaCl' },
        finalVolumeMl: 10,
        finalConcentration: '10 mg/mL',
        steps: [
          'Flakona 4.8 mL su → 100 mg/mL.',
          '1 mL (100 mg) + 9 mL NaCl.',
          'Toplam 10 mL → 10 mg/mL.'
        ]
      }
    },
  }
];
