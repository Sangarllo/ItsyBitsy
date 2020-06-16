import { Injectable } from '@angular/core';
import { ReceiptData, WeekLessonsData, RateData, CourseData } from '@models/report-summary';
import { PRINTED_LOGO, PRINTED_RECIPT_NUMBER } from './pdf';
import { AttendanceData } from '../models/report-summary';
import { ReportsService } from '@services/reports.service';

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

  private static PAGE_MARGINS = [ 40, 20, 40, 20 ];
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
    x10Small: {
      fontSize: 10,
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

  constructor(
    private reportSvc: ReportsService
  ) {
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
          reportContent.push(this.addSmallEmptyLine());
          reportContent.push(this.addReceiptContentLine1(receipt));
          reportContent.push(this.addReceiptContentLine2(receipt));
          reportContent.push(this.addSmallEmptyLine());
          reportContent.push(this.addSmallEmptyLine());
        });

    return {
      pageMargins: ScriptService.PAGE_MARGINS,
      content: reportContent,
      styles: ScriptService.PDF_STYLES
    };
  }

  createWeekLessonReports(dataTitle: string, lessonsData: WeekLessonsData[]): any {

    const reportContent = [];

    reportContent.push(this.addTitle(dataTitle));
    reportContent.push(this.addSmallEmptyLine());
    reportContent.push(
    {
      layout: 'lightHorizontalLines', // optional
      table: {
        // headers are automatically repeated if the table spans over multiple pages
        // you can declare how many rows should be treated as headers
        headerRows: 1,
        widths: [ 'auto', 'auto',  'auto', 'auto', 'auto', 'auto' ],

        body: this.getWeekLessonsDataTable(lessonsData)
      }
    });

    return {
      pageMargins: ScriptService.PAGE_MARGINS,
      content: reportContent,
      styles: ScriptService.PDF_STYLES
    };
  }

  private getWeekLessonsDataTable(lessonsData: WeekLessonsData[]): any {

    const bodyHeader = [ 'Profesor', 'Curso', 'Día', 'Horario', 'Aula', 'Asistentes' ];

    const bodyTable = [];
    bodyTable.push(bodyHeader);
    lessonsData.forEach(lesson => {
      bodyTable.push([
        { text: `${lesson.teacherName}`, fontSize: 10 },
        { text: `${lesson.courseName}`, fontSize: 10 },
        { text: `${lesson.date}`, fontSize: 10 },
        { text: `${lesson.schedule}`, fontSize: 10 },
        { text: `${lesson.classRoom}`, fontSize: 10 },
        {
          ul: this.getStudentsList(lesson.studentNames, 8)
        }
      ]);
    });

    return bodyTable;
  }

  private getStudentsList(studentNames: string[], fontSize: number): any {
    const studentsList = [];
    studentNames.forEach( name => {
      studentsList.push({
        text: `${name}`,
        fontSize
      });
    });
    return studentsList;
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

  private addTitle(title: string): any {
    return {
      text: [
        { text: title, style: 'xSmall' }
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

  private addLessonContent(lessonData: WeekLessonsData): any {
    console.log(`lessonData: ${lessonData}`);

    return {
      text: [
        { text: 'Clase: ', style: 'x10Small' },
        { text: `${lessonData.teacherName.toUpperCase()}`, style: 'x10Small' },
        { text: `${lessonData.courseName.toUpperCase()}`, style: 'x10Small' },
        { text: `${lessonData.schedule}`, style: 'x10Small' },
        { text: `${lessonData.classRoom.toUpperCase()}`, style: 'x10Small' },
      ]
    };
  }


  private addSmallEmptyLine(): any {
    return {
      text: '',
      style: 'smallEmpty'
    };
  }


  // Download PDF with recipts info
  downloadReceiptReport(receipts: ReceiptData[], reportName: string) {
    const documentDefinition = this.createReports(receipts);
    pdfMake.createPdf(documentDefinition).download(reportName);
  }

  // Open new window with report
  openInfo(receipts: ReceiptData[]) {
    const documentDefinition = this.createReports(receipts);
    pdfMake.createPdf(documentDefinition).open();
  }

  // Download PDF with WeekLesson info
  downloadWeekLessonReports(reportName: string, dataTitle: string, data: WeekLessonsData[]) {
    const documentDefinition = this.createWeekLessonReports(dataTitle, data);
    pdfMake.createPdf(documentDefinition).download(reportName);
  }

  // ---- RatesReport

  createRatesReports(dataTitle: string, rateData: RateData[]): any {

    const reportContent = [];

    reportContent.push(this.addTitle(dataTitle));
    reportContent.push(this.addSmallEmptyLine());
    reportContent.push(
    {
      layout: 'lightHorizontalLines', // optional
      table: {
        headerRows: 1,
        widths: [ 'auto', 'auto', 'auto' ],

        body: this.getRatesDataTable(rateData)
      }
    });

    return {
      pageMargins: ScriptService.PAGE_MARGINS,
      content: reportContent,
      styles: ScriptService.PDF_STYLES
    };
  }

  private getRatesDataTable(ratesData: RateData[]): any {

    const bodyHeader = [ 'Tarifa', 'Estudiantes', 'Listado' ];

    const bodyTable = [];
    bodyTable.push(bodyHeader);
    ratesData.forEach(rate => {
      bodyTable.push([
        { text: `Tarifa ${rate.name}`, fontSize: 14 },
        { text: `${rate.studentNames.length} estudiantes`, fontSize: 14 },
        {
          ul: this.getStudentsList(rate.studentNames, 10)
        }
      ]);
    });

    return bodyTable;
  }

  // Download PDF with Rates info
  downloadRatesReports(reportName: string, dataTitle: string, data: RateData[]) {
    const documentDefinition = this.createRatesReports(dataTitle, data);
    pdfMake.createPdf(documentDefinition).download(reportName);
  }

  // ---- CoursesReport

  createCoursesReports(dataTitle: string, courseData: CourseData[]): any {

    const reportContent = [];

    reportContent.push(this.addTitle(dataTitle));
    reportContent.push(this.addSmallEmptyLine());
    reportContent.push(
    {
      layout: 'lightHorizontalLines', // optional
      table: {
        headerRows: 1,
        widths: [ 'auto', 'auto', 'auto', 'auto', 'auto' ],

        body: this.getCoursesDataTable(courseData)
      }
    });

    return {
      pageMargins: ScriptService.PAGE_MARGINS,
      content: reportContent,
      styles: ScriptService.PDF_STYLES
    };
  }

  private getCoursesDataTable(coursesData: CourseData[]): any {

    const bodyHeader = [ 'Curso', 'Tipo', 'Horario', 'Profesor', 'Aforo' ];

    const bodyTable = [];
    bodyTable.push(bodyHeader);
    coursesData.forEach(course => {
      bodyTable.push([
        { text: `Curso ${course.name}`, fontSize: 9 },
        { text: `${course.type}`, fontSize: 8 },
        { text: `${course.schedule}`, fontSize: 8 },
        { text: `${course.teacher}`, fontSize: 8 },
        { text: `${course.nStudents} estudiantes`, fontSize: 8 },
      ]);
    });

    return bodyTable;
  }


  // Download PDF with courses info
  downloadCoursesReport(reportName: string, dataTitle: string, data: CourseData[]) {
    const documentDefinition = this.createCoursesReports(dataTitle, data);
    pdfMake.createPdf(documentDefinition).download(reportName);
  }


  // ---- AttendancesReport

  createAttendancesReport(dataTitle: string, attendancesData: AttendanceData[]): any {

    const reportContent = [];
    reportContent.push(this.addTitle(dataTitle));
    reportContent.push(this.addSmallEmptyLine());
    reportContent.push(
    {
      layout: 'lightHorizontalLines', // optional
      table: this.reportSvc.getAttendancesDataTable(attendancesData)
    });

    return {
      pageMargins: ScriptService.PAGE_MARGINS,
      content: reportContent,
      styles: ScriptService.PDF_STYLES
    };
  }


  // Download PDF with attendances info
  downloadAttendancesReports(reportName: string, dataTitle: string, data: AttendanceData[]) {
    const documentDefinition = this.createAttendancesReport(dataTitle, data);
    pdfMake.createPdf(documentDefinition).download(reportName);
  }



}
