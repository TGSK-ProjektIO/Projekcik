import {container} from "../config/container.config";
import {ReportRepository} from "../repository/report.repository";
import {TYPES} from "../config/types.config";
import {Report} from "../model/report";
import {faker} from "@faker-js/faker";
import {ObjectId} from "mongodb";
import {ReportPartial} from "../model/report.partial";

const reportRepository = container.get<ReportRepository>(TYPES.ReportRepository);

const
  description: Array<string> = ["Błędna kategoria", "Wymiary się nie zgadzają", "W opisie pisze, że kolor jest zielony a jest czerwony", "Takiego produktu już nie ma", "Niepoprawna masa"],
  updateDescriptionA: string = "Cena produktu jest zaniżona!",
  updateDescriptionB: string = "Opis podaje błędną ilość sprzedawanego produktu...",
  updateDescriptionC: string = "Nie lubię tego produktu!!"

let validReport: ReportPartial;

beforeAll(async () => {
  await reportRepository.setup();
});

beforeEach(async () => {
  validReport = {
    type: 1,
    description: description[0],
    status: 1,
    idProduct: "639ddb4eadc75cbdf635ab95",
    idUser: "639b97aaf0e7e2226b1dc592"
  };
  let numer = Math.floor(Math.random() * 5);
  if(numer==0){
    validReport.description = description[0];
  }
  if(numer==1){
    validReport.description = description[1];
    validReport.type = 2;
    validReport.idProduct = "103hpo4eadc24bsrf815ab86";
  }
  if(numer==2){
    validReport.description = description[2];
    validReport.type = 3;
    validReport.idProduct = "741dfg4bymc10bazf436ab14";
  }
  if(numer==3){
    validReport.description = description[3];
    validReport.type = 4;
    validReport.idProduct = "552hbg4eopi24khrf203ab54";
  }
  if(numer==4){
    validReport.description = description[4];
    validReport.type = 2;
    validReport.idProduct = "415upo4ezas24ecrf419hb87";
  }
});

test('Create Report positive test', async () => {
  await expect(reportRepository.create(validReport)).resolves.not.toBeUndefined();
});

test('Create Report negative test', async () => {
  // @ts-ignore
  await expect(reportRepository.create({
    idUser: "0",
    idProduct: "0",
    type: 0,
    status: 0
  })).rejects.toBeUndefined();
});


test('Read Report positive test', async () => {
  let createdReport = await reportRepository.create(validReport);
  let readReport = await reportRepository.read(createdReport._id.toString());
  expect(readReport).toEqual(createdReport);
});

test("Update Report positive test", async () => {
  let createdReport = await reportRepository.create(validReport);
  createdReport.description = updateDescriptionB;
  await expect(reportRepository.update({
    _id: createdReport._id,
    description: createdReport.description
  })).resolves.toBeUndefined();
  await expect(reportRepository.read(createdReport._id.toString())).resolves.toEqual(createdReport);
})

test('Read all Reports positive test', async () => {
  let createdProfile = await reportRepository.create(validReport);
  let readProfile = await reportRepository.readAll();
  expect(readProfile).toContainEqual(createdProfile);
});

test('Delete Report positive test', async () => {
  let createdReport = await reportRepository.create(validReport);
  await expect(reportRepository.delete(createdReport._id.toString())).resolves.toBeUndefined();
  await expect(reportRepository.read(createdReport._id.toString())).rejects.toBeUndefined();
});

// It does not function as a test tho.
test('Delete all because why not', async () => {
  let readReports = await reportRepository.readAll();
  for (let i = 0; i < readReports.length; i++) {
    console.log(readReports[i]._id.toString());
    await reportRepository.delete(readReports[i]._id.toString());
  }
})
