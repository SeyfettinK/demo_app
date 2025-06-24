import {Component} from '@angular/core';
import {DilutionInfo, Medication, MEDICATIONS} from '../../data/medications'; // Dışarıdan import
import { MedicationInfoComponent } from '../dose-calculator/../../components/medication-info/medication-info.component';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-dose-calculator',
  templateUrl: './dose-calculator.component.html',
  styleUrls: ['./dose-calculator.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    MedicationInfoComponent,
    NgIf,
    NgForOf
  ]
})
export class DoseCalculatorComponent {
  medications: Medication[] = MEDICATIONS;

  selectedMedication: Medication | null = null;
  babyWeight: number | null = null;
  babyWeightInputGr:  number | null = null;
  doseAmount: number | null = null;
  doseUnit: 'mg' | 'mcg' | 'IU' = 'mg';

  // İnfüzyon süresi
  infusionHours: number | null = null;
  infusionMinutes: number | null = null;
  infusionHoursTotal: number | null = null;
  infusionCalculationMode: 'toplam' | 'saatlik' | 'bolus' = 'toplam';

  // Sonuç
  minDilutionVolume: number | null = null;
  maxDilutionVolume: number | null = null;
  doseWarning: string | null = null;
  isWeightRequired: boolean = true;

  minAdditionalFluid: number | null = null;
  maxAdditionalFluid: number | null = null;

  // dose-calculator.component.ts  (ek alanlar)
  doseVolumeMl: number | null = null;       // hastaya verilecek hacim
  extraPrepNote: string | null = null;      // gereken ek hazırlama var mı?

  /* ---------------------------------------------------------- */
  /* ----------- YENİ STATE ----------------------------------- */
  babyAgeDays: number | null = null;          // gün cinsinden yaş
  doseType: 'loading' | 'maintenance' = 'loading'; // kullanıcı seçimi
  doseSuggested: string | null = null;        // “10-20 mcg/kg/sa” gibi
  doseNote: string | null = null;


  /* UI’daki doz alanları aktif mi? */
  get isDoseReady(): boolean {
    const hasGuide = !!this.selectedMedication?.doseGuide?.length;
    if (!hasGuide) return true;                        // kılavuz yoksa hep aktif
    return this.babyAgeDays != null && this.doseType != null;
  }

  /* --------- yeni ---------- */
  dilutionMode: 'bolus' | 'infusion' = 'bolus';

  /* ----------------------------------------------------------------
   ——— yardımcı “mevcut rehber” seçicileri ———
   ---------------------------------------------------------------- */

  /* seçilen ilaçta hangi rehberler var? */
  get hasBolus(): boolean {
    const d = this.selectedMedication?.dilution as any;
    return d && (d.steps || d.bolus);
  }

  get hasInfusion(): boolean {
    const d = this.selectedMedication?.dilution as any;
    return d && d.infusion;
  }
  /* component sınıfına ekleyin */
  get showInfusionControls(): boolean {
    return !!(
      this.selectedMedication?.continuousInfusion &&   // ilaç infüzyona uygun
      this.doseType === 'maintenance'                  // İdame seçili
    );
  }



  /* kullanacağımız rehber (DilutionInfo) */

  /* kullanıcının seçtiği (ya da tek mevcut) rehber */
  /** kullanıcının seçtiği (ya da tek mevcut) rehber */
  get currentDilution(): DilutionInfo | null {
    const d: any = this.selectedMedication?.dilution;
    if (!d) return null;

    /* eski tek‐rehber biçimi */
    if (d.steps) return d as DilutionInfo;

    /* yeni çoklu biçim */
    return d[this.dilutionMode] ?? null;
  }

  // Yeni: Sadece IU formatındaki ilaçlar için mg/mcg hesaplamasını atlayacağız.
  private isIUDrug: boolean = false;

  /* seçilen yaşa ve tipe uygun kuralı bulur */
  /* yaş / tip seçilince çağrılır */
  applyDoseGuide(): void {
    this.doseSuggested = null;

    const rules = this.selectedMedication?.doseGuide;
    if (!rules || this.babyAgeDays == null || this.doseType == null) {
      this.checkDoseValidity();   // alanlar unlock olduğunda da çalışsın
      return;
    }

    const age = this.babyAgeDays;
    const rule = rules.find(r => {
      const { op, days } = r.age;
      return  op === '<'  ? age <  days :
        op === '<=' ? age <= days :
          op === '>'  ? age >  days :
            op === '>=' ? age >= days :
              age === days;
    });

    if (rule) {
      this.doseSuggested = rule.doses[this.doseType] ?? null;
      this.doseNote      = rule.notes?.[this.doseType] ?? null;   // ← tek satır eklendi
    } else {
      this.doseSuggested = null;
      this.doseNote      = null;
    }
    // Yükleme seçildiyse süre alanlarını sıfırla/gizle
    if (this.doseType === 'loading') {
      this.infusionCalculationMode = 'bolus';
      this.infusionHours = this.infusionMinutes = this.infusionHoursTotal = null;
    }

    this.checkDoseValidity();     // her değişimde doğrula
  }

  /** Bolus / İnfüzyon seçildiğinde tetiklenir */
  onDilutionModeChange(): void {
    if (this.dilutionMode === 'bolus') {
      this.infusionCalculationMode = 'bolus';
    } else {                      // infusion seçildi
      /* Yükleme ise yine süre isteme  */
      if (this.doseType === 'loading') {
        this.infusionCalculationMode = 'toplam';
      }
      /* İdame ise eski varsayılan davranış */
      else if (this.infusionCalculationMode === 'bolus') {
        this.infusionCalculationMode = 'toplam';
      }
    }
    this.checkDoseValidity();
  }


  onMedicationSelect(): void {
    // Alanları sıfırla
    this.babyWeight = null;
    this.doseAmount = null;
    this.infusionHours = null;
    this.infusionMinutes = null;
    this.infusionHoursTotal = null;
    this.infusionCalculationMode = 'toplam';
    this.doseWarning = null;
    this.minDilutionVolume = null;
    this.maxDilutionVolume = null;
    this.minAdditionalFluid = null;
    this.maxAdditionalFluid = null;
    this.isIUDrug = false;

    if (this.selectedMedication) {
      // Doz birimini otomatik algıla (mg, mcg, IU)
      const unitRegex = /(mg|mcg|IU)\/(?:kg|mL|saat|dk|sa|dose)/i;
      const unitMatch = this.selectedMedication.dose.match(unitRegex);
      if (unitMatch) {
        this.doseUnit = unitMatch[1] as 'mg' | 'mcg' | 'IU';
      } else {
        this.doseUnit = 'mg';
      }

      // Eğer doz formülünde "kg" geçmiyorsa, kilogram bilgisini devre dışı bırak
      this.isWeightRequired = /kg/.test(this.selectedMedication.dose);

      // İlacın kendisi IU bazlı mı? (Örn. "Heparin 25000 IU/5 ml")
      // Basit bir check: 'IU' geçiyorsa isIUDrug = true
      if (this.selectedMedication.name.match(/iu/i)) {
        this.isIUDrug = true;
      }
      /* === rehber modu otomatik ayarla === */
      if (this.hasBolus && !this.hasInfusion) this.dilutionMode = 'bolus';
      else if (!this.hasBolus && this.hasInfusion) this.dilutionMode = 'infusion';
      else this.dilutionMode = 'bolus';
    }
    this.babyAgeDays = null;
    this.applyDoseGuide();        // dozSuggested temizlensin
  }
  /** Rehber cümle içindeki özel boşluk ve tireleri sadeleştirir */
  normalize(str: string): string {
    return str
    .replace(/[\u00A0\u202F]/g, ' ')   // NBSP & narrow NBSP → normal boşluk
      .replace(/[–—]/g, '-')            // en/em-dash → kısa tire
      .replace(/\s*-\s*/g, '-')         // “  -  ”  → tek tire
      .trim();
  }
  /* dose-calculator.component.ts  ➜  class içine ekleyin */
  private normalizeDose(str: string): string {
    return str
      // en-dash, em-dash, minus-sign → hyphen-minus
      .replace(/[\u2012\u2013\u2014\u2212]/g, '-')
      // “ − ” gibi etrafı boşluklu tireleri sıkıştır
      .replace(/\s*-\s*/g, '-')          // "0.05 – 0.15" → "0.05-0.15"
      .trim();
  }
  checkDoseValidity(): void {
    /* ----------------------------------------------------------------
     1) Hangi “doz cümlesi” kullanılacak?
     • Varsayılan  → ilacın .dose alanı                 (örn. "10-20 mcg/kg/dose")
     • Eğer doseGuide + yaş + yükleme/İdame seçilmişse  → ilgili kılavuz satırı
     ---------------------------------------------------------------- */
    let doseString = this.selectedMedication?.dose ?? '';
    // rehberden gelen satırı da kapsar
    doseString = this.normalizeDose(doseString);

    if (
      this.selectedMedication?.doseGuide?.length &&
      this.babyAgeDays != null
    ) {
      const age = this.babyAgeDays;
      const rule = this.selectedMedication.doseGuide.find(r => {
        const { op, days } = r.age;
        switch (op) {
          case '<'  : return age <  days;
          case '<=' : return age <= days;
          case '>'  : return age >  days;
          case '>=' : return age >= days;
          case '==' : return age === days;
          default   : return false;
        }
      });
      if (rule) {
        // doseType 'maintenance' ise ama bu alan tanımlı değilse
        // yükleme dozuna (ya da boş stringe) geri düşüyoruz
        const raw = rule.doses[this.doseType] ?? rule.doses.loading ?? '';
        doseString = this.normalizeDose(raw);
      }
      doseString = this.normalizeDose(doseString);

    }

    /* ----------------------------------------------------------------
     2) Ön kontroller (mevcut kod değişmedi)
     ---------------------------------------------------------------- */
    if (!this.selectedMedication || this.doseAmount === null) {
      this.doseWarning = null;
      return;
    }

    if (this.isIUDrug && (this.doseUnit === 'mg' || this.doseUnit === 'mcg')) {
      this.doseWarning = 'Bu ilaç IU bazlı. Lütfen doz birimini "IU" seçiniz.';
      return;
    }

    if (this.isWeightRequired && !this.babyWeight) {
      this.doseWarning = null;
      return;
    }

    /* ----------------------------------------------------------------
     3) Süre faktörü (orijinal hesap mantığı değiştirilmedi)
     ---------------------------------------------------------------- */
    let timeFactor = 1;
    if (this.selectedMedication.continuousInfusion &&
      this.doseType === 'maintenance') {

      /* ▶▶ BOLUS ◀◀  – süre gerekmez */
      if (this.infusionCalculationMode === 'bolus') {
        timeFactor = 1;                     // süre etkisiz
      }

      else if (this.infusionCalculationMode === 'toplam') {
        const infusionH = this.infusionHours ?? 0;
        const infusionM = this.infusionMinutes ?? 0;
        if (infusionM > 59) {
          this.doseWarning = 'Dakika değeri maksimum 59 olmalıdır.';
          return;
        }
        const totalMinutes = infusionH * 60 + infusionM;
        if (totalMinutes <= 0) {
          this.doseWarning = 'Lütfen geçerli bir infüzyon süresi giriniz.';
          return;
        }
        const timeUnitMatch = doseString.match(/\/kg\/(dk|sa|saat)/i);
        if (timeUnitMatch) {
          const tu = timeUnitMatch[1].toLowerCase();
          timeFactor = tu === 'dk' ? totalMinutes : totalMinutes / 60;
        } else {
          timeFactor = totalMinutes;
        }
      }
      else { /* saatlik mod */
        if (!this.infusionHoursTotal || this.infusionHoursTotal <= 0) {
          this.doseWarning = 'Lütfen toplam infüzyon süresini giriniz.';
          return;
        }
        const totalHours   = this.infusionHoursTotal;
        const totalMinutes = totalHours * 60;
        const tuMatch = doseString.match(/\/kg\/(dk|sa|saat)/i);
        if (tuMatch) {
          const unit = tuMatch[1].toLowerCase();
          timeFactor = unit === 'dk' ? totalMinutes : totalHours;
        } else {
          timeFactor = totalHours;
        }
      }
    }

    /* ----------------------------------------------------------------
     4) Doz aralığını regex ile yakala   (doseString kullanılıyor!)
     ---------------------------------------------------------------- */
    /*const doseRegex =
      /(\d+\.?\d*)(?:\s*-\s*(\d+\.?\d*))?\s*(mg|mcg|iu)\/(?:kg|mL|saat|dk|sa|dose|bolus)/i;*/

    const doseRegex = /(\d+\.?\d*)(?:\s*-\s*(\d+\.?\d*))?\s*(mg|mcg|iu)\/(?:kg|mL)(?:\/(?:dk|sa|saat|dose|bolus))?/i;


    const doseMatch = doseString.match(doseRegex);
    if (!doseMatch) {
      this.doseWarning = null;
      return;
    }

    const minDose = parseFloat(doseMatch[1]);
    const maxDose = doseMatch[2] ? parseFloat(doseMatch[2]) : minDose;
    const doseUnitFromData = doseMatch[3].toLowerCase();

    /* ----------------------------------------------------------------
     5) Önerilen min-max doz (kg & süre faktörü dahil)
     ---------------------------------------------------------------- */
    const w = this.babyWeight ?? 0;
    const minRec = this.isWeightRequired ? +(minDose * w * timeFactor).toFixed(2)
      : minDose * timeFactor;
    const maxRec = this.isWeightRequired ? +(maxDose * w * timeFactor).toFixed(2)
      : maxDose * timeFactor;

    /* ----------------------------------------------------------------
     6) Kullanıcının girdiği dozu gerekli birime dönüştür
     ---------------------------------------------------------------- */
    let doseConv = +this.doseAmount.toFixed(2);
    if (!this.isIUDrug) {
      if (this.doseUnit === 'mcg' && doseUnitFromData === 'mg')  doseConv = +(doseConv / 1000).toFixed(2);
      if (this.doseUnit === 'mg'  && doseUnitFromData === 'mcg') doseConv = +(doseConv * 1000).toFixed(2);
    }

    /* ----------------------------------------------------------------
     7) Uyarı mesajı
     ---------------------------------------------------------------- */
    if (doseConv < minRec) {
      this.doseWarning = `⚠️ Girilen doz önerilen minimumun altında! (${minRec} ${doseUnitFromData})`;
    } else if (doseConv > maxRec) {
      this.doseWarning = `⚠️ Girilen doz önerilen maksimumu aşıyor! (${maxRec} ${doseUnitFromData})`;
    } else {
      this.doseWarning = null;
    }
  }


  calculateDilution(): void {
    if (!this.selectedMedication || this.doseAmount === null) {
      alert('Lütfen gerekli tüm alanları doldurun!');
      return;
    }

    // 1) Saatlik mod => toplam doz
    let actualDose = this.doseAmount;
    if (this.selectedMedication.continuousInfusion && this.infusionCalculationMode === 'saatlik') {
      if (this.infusionHoursTotal && this.infusionHoursTotal > 0) {
        actualDose = this.doseAmount * this.infusionHoursTotal;
      }
    }

    // 2) IU bazlı ilaç ise mg-dönüşüm adımlarını atla:
    if (this.isIUDrug) {
      // Örnek: Heparin 25000 IU/5 ml, sonDilution: "(1-2 IU/mL)"
      // a) sonDilution verisini IU/mL formatında yakala
      const dilutionRegexIU = /\((\d+\.?\d*)(?:\s*-\s*(\d+\.?\d*))?\s*iu\/mL\)/i;
      const matchIU = this.selectedMedication.sonDilution.match(dilutionRegexIU);

      this.minDilutionVolume = null;
      this.maxDilutionVolume = null;
      this.minAdditionalFluid = null;
      this.maxAdditionalFluid = null;

      if (matchIU) {
        const minConc = parseFloat(matchIU[1]); // 1 IU/mL
        const maxConc = matchIU[2] ? parseFloat(matchIU[2]) : minConc; // 2 IU/mL

        // actualDose => total IU
        const dose = parseFloat(actualDose.toFixed(2));

        // minDilutionVolume = total IU / maxConc
        this.minDilutionVolume = parseFloat((dose / maxConc).toFixed(2));
        this.maxDilutionVolume = parseFloat((dose / minConc).toFixed(2));
      }

      // b) ilaç adından "25000 IU/5 ml" yakala
      const nameRegexIU = /(\d+(?:\.\d+)?)\s*iu\s*\/\s*(\d+(?:\.\d+)?)\s*ml/i;
      const nameMatchIU = this.selectedMedication.name.match(nameRegexIU);

      if (nameMatchIU && this.minDilutionVolume !== null && this.maxDilutionVolume !== null && actualDose > 0) {
        const totalDrugIU = parseFloat(nameMatchIU[1]);   // 25000
        const totalDrugVolumeMl = parseFloat(nameMatchIU[2]); // 5

        // Oran => actualDose IU -> this.minDilutionVolume mL
        //         totalDrugIU -> x mL
        const xMin = (totalDrugIU * this.minDilutionVolume) / actualDose;
        const xMax = (totalDrugIU * this.maxDilutionVolume) / actualDose;

        this.minAdditionalFluid = parseFloat((xMin - totalDrugVolumeMl).toFixed(2));
        this.maxAdditionalFluid = parseFloat((xMax - totalDrugVolumeMl).toFixed(2));
      }
      return; // IU akışını burada sonlandırıyoruz.
    }

    // 3) mg/mcg tabanlı ilaçlar için eski mantık
    // ---------------------------------------------------
    let userDoseInMg = actualDose;
    if (this.doseUnit === 'mcg') {
      userDoseInMg = parseFloat((userDoseInMg / 1000).toFixed(4));
    }

    const dilutionRegex = /\((\d+\.?\d*)(?:\s*-\s*(\d+\.?\d*))?\s*(mg|mcg|IU)\/mL\)/i;
    const dilutionMatch = this.selectedMedication.sonDilution.match(dilutionRegex);

    let doseForDilution = userDoseInMg;
    this.minDilutionVolume = null;
    this.maxDilutionVolume = null;

    if (dilutionMatch) {
      const minConcentration = parseFloat(dilutionMatch[1]);
      const maxConcentration = dilutionMatch[2] ? parseFloat(dilutionMatch[2]) : minConcentration;
      const dilutionUnit = dilutionMatch[3].toLowerCase();

      if (dilutionUnit === 'mcg') {
        doseForDilution = parseFloat((doseForDilution * 1000).toFixed(4));
      }
      this.minDilutionVolume = parseFloat((doseForDilution / maxConcentration).toFixed(2));
      this.maxDilutionVolume = parseFloat((doseForDilution / minConcentration).toFixed(2));
    }

    // 4) İlaç adı mg / mcg
    const medicationNameRegex = /(\d+(?:\.\d+)?)(mg|mcg)\s*\/\s*(\d+(?:\.\d+)?)?\s*ml/i;
    const nameMatch = this.selectedMedication.name.match(medicationNameRegex);

    this.minAdditionalFluid = null;
    this.maxAdditionalFluid = null;

    if (
      nameMatch &&
      this.minDilutionVolume !== null &&
      this.maxDilutionVolume !== null &&
      userDoseInMg > 0
    ) {
      let totalDrugMg = parseFloat(nameMatch[1]);
      const drugUnit = nameMatch[2].toLowerCase();
      if (drugUnit === 'mcg') {
        totalDrugMg = totalDrugMg / 1000;
      }
      const totalDrugVolumeMl = nameMatch[3] ? parseFloat(nameMatch[3]) : 1;

      const xMin = (totalDrugMg * this.minDilutionVolume) / userDoseInMg;
      const xMax = (totalDrugMg * this.maxDilutionVolume) / userDoseInMg;

      this.minAdditionalFluid = parseFloat((xMin - totalDrugVolumeMl).toFixed(2));
      this.maxAdditionalFluid = parseFloat((xMax - totalDrugVolumeMl).toFixed(2));
    }
  }


  //-------------- Yardımcılar --------------//
  private parseAmount(str: string): { value: number; unit: string } {
    const m = str.trim().match(/([\d.]+)\s*(µ?g|mcg|mg|iu)/i);
    if (!m) throw new Error('Parse error in "' + str + '"');
    let unit = m[2].toLowerCase();
    if (unit === 'µg') unit = 'mcg';
    return {value: +m[1], unit};
  }

  /* dose-calculator.component.ts */
  private convert(value: number, from: string, to: string): number {
    const f = from.toLowerCase();
    const t = to.toLowerCase();

    // 1) Aynı birim ⇒ dönüşüm yok
    if (f === t) return value;

    // 2) IU kombinasyonu ⇒ spesifik oran tanımlı değil, değeri koru
    if (f === 'iu' || t === 'iu') return value;

    // 3) mg ↔ mcg
    if (f === 'mg' && t === 'mcg') return value * 1000;
    if (f === 'mcg' && t === 'mg') return value / 1000;

    // 4) Diğer tüm durumlar
    throw `Birim dönüştürülemedi (${from}→${to})`;
  }


  //-------------- Yeni hesap --------------//
  /* --------- calculateGuideDoseVolume güncellendi -------- */
  calculateGuideDoseVolume(): void {
    this.doseVolumeMl = null;
    this.extraPrepNote = null;

    const guide = this.currentDilution;
    if (!guide || this.doseAmount == null) {
      alert('Rehber veya doz eksik');
      return;
    }

    /* 1) Konsantrasyon */
    const {value: concVal, unit: concUnit} =
      this.parseAmount(guide.finalConcentration);

    /* 2) Toplam istenen doz */
    let reqDose = this.doseAmount;
    if (
      this.selectedMedication?.continuousInfusion &&
      this.infusionCalculationMode === 'saatlik' &&
      this.infusionHoursTotal
    ) {
      reqDose *= this.infusionHoursTotal;
    }

    /* 3) Birim eşitle */
    reqDose = this.convert(reqDose, this.doseUnit, concUnit);

    /* 4) Gerekli hacim */
    const vol = +(reqDose / concVal).toFixed(2);
    this.doseVolumeMl = vol;

    /* 5) Tek partiden büyükse uyarı (guide.finalVolumeMl mevcut) */
    if (guide.finalVolumeMl && vol > guide.finalVolumeMl) {
      const times = Math.ceil(vol / guide.finalVolumeMl);
      this.extraPrepNote =
        `Bu doz için ${times} parti (${guide.finalVolumeMl} mL) hazırlamalısınız.`;
    }
  }
  /* component içinde en alta ekleyin */
  get hasMaintenanceDose(): boolean {
    const g = this.selectedMedication?.doseGuide;
    if (!g?.length) return false;

    /* Seçilen yaş aralığındaki satırı bulalım */
    const rule = g.find(r => {
      const { op, days } = r.age;
      return  op === '<'  ? (this.babyAgeDays??0) <  days :
        op === '<=' ? (this.babyAgeDays??0) <= days :
          op === '>'  ? (this.babyAgeDays??0) >  days :
            op === '>=' ? (this.babyAgeDays??0) >= days :
              (this.babyAgeDays??0) === days;
    });
    /* maintenance yoksa false */
    return !!rule?.doses.maintenance;
  }
  disablePreviousResults(): void {
    this.minDilutionVolume = null;
    this.maxDilutionVolume = null;
    this.minAdditionalFluid = null;
    this.maxAdditionalFluid = null;
    this.doseVolumeMl = null;
    this.extraPrepNote = null;
  }
  convertToKg(): void {
    if (this.babyWeightInputGr) {
      this.babyWeight = this.babyWeightInputGr / 1000; // gram → kg
    } else {
      this.babyWeight = 0;
    }
  }

}
