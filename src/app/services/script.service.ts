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

declare let pdfMake: any ;

@Injectable({
  providedIn: 'root'
})
export class ScriptService {

  private static PAGE_MARGINS = [ 50, 30, 50, 30 ];
  private static PDF_STYLES = {
    xSmallHighlighted: {
      fontSize: 15,
      decoration: 'underline',
      alignment: 'center',
      bold: true,
    },
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
    xSmall: {
      fontSize: 15,
      alignment: 'center'
    },
    normal: {
      fontSize: 20,
      alignment: 'center'
    },
    smallEmpty: {
      margin: [6, 12]
    },
    empty: {
      margin: [10, 20]
    }
  };

  private scripts: any = {};

  constructor() {
    ScriptStore.forEach((script: any) => {
      this.scripts[script.name] = {
        loaded: false,
        src: script.src
      };
    });

    this.load('pdfMake', 'vfsFonts');
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

  createReports(receipts: ReceiptData[]): any {

    const reportContent = [];

    receipts.forEach(receipt => {
          reportContent.push(this.addReciptSmallHeader());
          reportContent.push(this.addReceiptSmallEmptyLine());
          reportContent.push(this.addReceiptContentLine1(receipt));
          reportContent.push(this.addReceiptContentLine2(receipt));
          reportContent.push(this.addReceiptSmallEmptyLine());
          reportContent.push(this.addReceiptSmallEmptyLine());
        });

    return {
      pageMargins: ScriptService.PAGE_MARGINS,
      content: reportContent,
      styles: ScriptService.PDF_STYLES
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

  private addReceiptContentLine1(receiptData: ReceiptData): any {
    return {
      text: [
        { text: 'Recibí de ', style: 'xSmall' },
        { text: `${receiptData.studentName.toUpperCase()}`, style: 'xSmallHighlighted' },
        { text: ' la cantidad de ', style: 'xSmall' },
        { text: `... ${receiptData.paymentAmmout} € ...`, style: 'xSmallHighlighted' },
      ]
    };
  }

  private addReceiptContentLine2(receiptData: ReceiptData): any {
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

  private addReceiptSmallEmptyLine(): any {
    return {
      text: '',
      style: 'smallEmpty'
    };
  }


  // Download PDF with recipts info
  downloadInfo(receipts: ReceiptData[], reportName: string) {
    const documentDefinition = this.createReports(receipts);
    pdfMake.createPdf(documentDefinition).download(reportName);
  }

  // Open new window with report
  openInfo(receipts: ReceiptData[]) {
    const documentDefinition = this.createReports(receipts);
    pdfMake.createPdf(documentDefinition).open();
  }


}
