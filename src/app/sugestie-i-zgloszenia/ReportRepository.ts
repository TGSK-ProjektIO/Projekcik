import {Report} from "./Report";
import {User} from "./User";
import {Opinion} from "./Opinion";
import {TypeOfReport} from "./TypeOfReport";

export class ReportRepository {
  private reports: Array<Report> = [];
  private index: number = 1;

  createReport(user: User, opinion: Opinion, category: TypeOfReport, description: string): Report {
    let temp: Report = new Report(this.index, user, opinion, category, description);
    this.reports.push(temp);
    this.index += 1;
    return temp;
  }

  get(id: number): Report | undefined {
    let temp = this.reports.find(elem => elem.id == id);
    return temp;
  }

  findBy(predicate: (this:void, value: Report, index: number, obj: Report[]) => boolean): Array<Report> {
    return this.reports.filter(predicate);
  }

  findAll(): Array<Report> {
    const clonedArray: Report[] = [];
    this.reports.forEach(report => clonedArray.push(Object.assign({}, report)));
    return clonedArray;
  }

  deleteReport(id: number) {
    let report: Report | undefined = this.get(id);
    if (report == undefined) return;

    const index = this.reports.indexOf(report, 0);
    if (index > -1) this.reports.splice(index, 1);
  }

}
