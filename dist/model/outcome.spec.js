"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const outcome_1 = require("./outcome");
describe("Outcome", () => {
    let subject;
    // tslint:disable-next-line:max-line-length
    const csv1 = ",16N023744,08A,999 123 4567,TEST,BABY,17/06/2016,2,,G83067,1,1,2518,36,1,,,TEST# Firstname,Flat 11# Test House,Test Quay,Woolwich,LONDON,London,SE18 5NH,,23/05/2016,22/05/2016,,SAMPLE TAKER,SEThames,4,,PKU Not Suspected. Status Code 04,4,,CHT Not Suspected. Status Code 04,6,602,Carrier of Other Haemoglobin. Status Code 06,4,,CF Not Suspected. Status Code 04,4,,MCADD Not Suspected. Status Code 04,4,,HCU Not Suspected. Status Code 04,4,,MSUD Not Suspected. Status Code 04,4,,GA1 Not Suspected. Status Code 04,4,,IVA Not Suspected. Status Code 04";
    describe("constructor", () => {
        it("should throw Error if there are not the correct number of values", () => {
            expect(() => {
                subject = new outcome_1.Outcome("rubbish, values");
            }).toThrow(new Error("Invalid values: string has 2 values but was expecting 57."));
        });
        it("should set the fields", () => {
            subject = new outcome_1.Outcome(csv1);
            expect(subject.labSerialNo).toBe("16N023744");
            expect(subject.nationalId).toBe("");
            expect(subject.providerUnit).toBe("08A");
            expect(subject.nhsNo).toBe("9991234567");
            expect(subject.surname).toBe("TEST");
            expect(subject.labCode).toBe("SEThames");
            expect(subject.pkuStatusCode).toBe("4");
            expect(subject.pkuSupplementaryCode).toBe("");
            expect(subject.pkuStatus).toBe("PKU Not Suspected. Status Code 04");
        });
    });
});
//# sourceMappingURL=outcome.spec.js.map