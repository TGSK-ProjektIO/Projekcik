import {container} from "../config/container.config";
import {ReportRepository} from "../repository/report.repository";
import {TYPES} from "../config/types.config";
import {Report} from "../model/report";
import {faker} from "@faker-js/faker";
import {ObjectId} from "mongodb";


const reportRepository = container.get<ReportRepository>(TYPES.ReportRepository);

let validReport: Report;

beforeAll(async () => {
  await reportRepository.setup();
});

beforeEach(async () => {
  validReport = {
    id: "1",
    type: 1,
    description: "Cena produktu jest zawyżona.",
    status: 1,
    idProduct: "1",
    idUser: "1"
  };
});

test('Create Report positive test', async () => {
  const createdReport = await reportRepository.create(validReport);
  expect(createdReport.id).not.toBeNaN();
});

test('Create Report negative test', async () => {
  await expect(reportRepository.create(validReport)).rejects.toBeUndefined();
});


//test('Read Report positive test', async () => {
//  let createdProfile = await reportRepository.create(validReport);

  // @ts-ignore
  //let readProfile = await userRepository.read(createdUser._id);
  //expect(readProfile).toEqual(createdProfile);
//});

//test('Read Profile negative test', async () => {
//  await expect(profileRepository.read(new ObjectId().toString())).rejects.toBeUndefined();
//});


//test('Delete report positive test', async () => {
  //let createdReport = await reportRepository.create(validReport);
  // @ts-ignore
//  await expect(reportRepository.deleteReport(1)).resolves.not.toBeUndefined();
  // @ts-ignore
  //await expect(profileRepository.read(createdUser._id)).rejects.toBeUndefined();
//});
