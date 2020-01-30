import { Injectable } from '@angular/core';
import { ReceiptData } from '../models/report-summary';
import { PRINTED_LOGO, PRINTED_RECIPT_NUMBER } from './pdf';

interface Scripts {
  name: string;
  src: string;
}
export const ScriptStore: Scripts[] = [
  { name: 'pdfMake', src: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.59/pdfmake.min.js' },
  { name: 'vfsFonts', src: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.59/vfs_fonts.js' }
];

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  private static PAGE_MARGINS = [ 70, 35, 70, 35 ];
  private static PDF_STYLES = {
    smallHighlighted: {
      fontSize: 18,
      decoration: 'underline',
      alignment: 'center',
      bold: true,
    },
    highlighted: {
      fontSize: 20,
      decoration: 'underline',
      alignment: 'center',
      bold: true,
    },
    smallUnderline: {
      fontSize: 18,
      decoration: 'underline',
      bold: false,
    },
    small: {
      fontSize: 18,
      alignment: 'center'
    },
    normal: {
      fontSize: 20,
      alignment: 'center'
    },
    smallEmpty: {
      margin: [4, 8]
    },
    empty: {
      margin: [10, 20]
    }
  }

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });
  }

  load(...scripts: string[]) {
    const promises: any[] = [];
    scripts.forEach((script) => promises.push(this.loadScript(script)));
    return Promise.all(promises);
  }

  loadScript(name: string) {
    return new Promise((resolve, reject) => {
      // resolve if already loaded
      if (this.scripts[name].loaded) {
        resolve({ script: name, loaded: true, status: 'Already Loaded' });
      } else {
        // load script
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.scripts[name].src;
        script.onload = () => {
          this.scripts[name].loaded = true;
          console.log(`${name} Loaded.`);
          resolve({ script: name, loaded: true, status: 'Loaded' });
        };
        script.onerror = (error: any) => resolve({ script: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }

  createReports(receipts: ReceiptData[], reportsPerPage: number): any {

    const reportContent = [];

    receipts.forEach(receipt => {
          reportContent.push(this.addReciptSmallHeader());
          reportContent.push(this.addReceiptSmallEmptyLine());
          reportContent.push(this.addReceiptContent12(receipt));
          reportContent.push(this.addReceiptContent3(receipt));
          reportContent.push(this.addReceiptSmallEmptyLine());
          reportContent.push(this.addReceiptSmallEmptyLine());
          reportContent.push(this.addReceiptSmallEmptyLine());
        });

    return {
      pageMargins: ScriptService.PAGE_MARGINS,
      content: reportContent,
      styles: ScriptService.PDF_STYLES
    };
  }


  createReport(receiptData: ReceiptData): any {

    const reportContent = [];
    reportContent.push(this.addReciptSmallHeader());
    reportContent.push(this.addReceiptSmallEmptyLine());
    reportContent.push(this.addReceiptContent12(receiptData));
    reportContent.push(this.addReceiptContent3(receiptData));
    reportContent.push(this.addReceiptSmallEmptyLine());
    reportContent.push(this.addReceiptSmallEmptyLine());
    reportContent.push(this.addReceiptSmallEmptyLine());

    return {
      pageMargins: ScriptService.PAGE_MARGINS,
      content: reportContent,
      styles: ScriptService.PDF_STYLES
    };
  }

  private addReceiptContent12(receiptData: ReceiptData): any {
    return {
      text: [
        { text: 'Recibí de ', style: 'small' },
        { text: `${receiptData.studentName.toUpperCase()}`, style: 'smallHighlighted' },
        { text: ' la cantidad de ', style: 'small' },
        { text: `... ${receiptData.paymentAmmout} € ...`, style: 'smallHighlighted' },
      ]
    };
  }

  private addReceiptContent3(receiptData: ReceiptData): any {
    return {
      text: [
        {
          text: `por clases de inglés - `,
          style: 'small'
        },
        {
          text: `${receiptData.month} de ${receiptData.year}`,
          style: 'smallUnderline'
        }
      ]
    };
  }

  private addReciptSmallHeader(): any {
    return {
      columns: [
        [{
            image: 'data:image/png;base64,' + PRINTED_LOGO,
            width: 200
        }],
        [{
            image: 'data:image/png;base64,' + PRINTED_RECIPT_NUMBER,
            width: 200
        }]
      ]
    };
  }


  private addReceiptSmallEmptyLine(): any {
    return {
      text: '',
      style: 'smallEmpty'
    };
  }

}
