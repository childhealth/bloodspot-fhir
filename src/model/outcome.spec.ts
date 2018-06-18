import { Outcome } from "./outcome";

describe("Outcome", () => {
    let subject: Outcome;
    let subjectWithPrivateMethods: any;

    // tslint:disable-next-line:max-line-length
    const csv1 = ",16N023744,08A,999 123 4567,TEST,BABY,17/06/2016,2,,G83067,1,1,2518,36,1,,,TEST# Firstname,Flat 11# Test House,Test Quay,Woolwich,LONDON,London,SE18 5NH,,23/05/2016,22/05/2016,,SAMPLE TAKER,SEThames,4,,PKU Not Suspected. Status Code 04,4,,CHT Not Suspected. Status Code 04,6,602,Carrier of Other Haemoglobin. Status Code 06,4,,CF Not Suspected. Status Code 04,4,,MCADD Not Suspected. Status Code 04,4,,HCU Not Suspected. Status Code 04,4,,MSUD Not Suspected. Status Code 04,4,,GA1 Not Suspected. Status Code 04,4,,IVA Not Suspected. Status Code 04";

    beforeEach(() => {
        subject = new Outcome(csv1);
        subjectWithPrivateMethods = subject;
    });

    describe("constructor", () => {
        it("should throw Error if there are not the correct number of values", () => {
            expect(() => {
                subject = new Outcome("rubbish, values");
            }).toThrow(new Error("Invalid values: string has 2 values but was expecting 57."));
        });

        it("should set the simple fields", () => {
            expect(subject.labSerialNo).toBe("16N023744");
            expect(subject.nationalId).toBe("");
            expect(subject.providerUnit).toBe("08A");
            expect(subject.nhsNo).toBe("9991234567");
            expect(subject.surname).toBe("TEST");
            expect(subject.firstName).toBe("BABY");
            expect(subject.labCode).toBe("SEThames");
        });

        it("should set the lab condition test results", () => {
            expect(subject.pkuStatusCode).toBe("4");
            expect(subject.pkuSupplementaryCode).toBe("");
            expect(subject.pkuStatus).toBe("PKU Not Suspected. Status Code 04");

            expect(subject.chtStatusCode).toBe("4");
            expect(subject.chtSupplementaryCode).toBe("");
            expect(subject.chtStatus).toBe("CHT Not Suspected. Status Code 04");

            expect(subject.sickleStatusCode).toBe("6");
            expect(subject.sickleSupplementaryCode).toBe("602");
            expect(subject.sickleStatus).toBe("Carrier of Other Haemoglobin. Status Code 06");
        });

        describe("validateDate", () => {
            it("should set date of birth", () => {
                const actualDate: Date = subjectWithPrivateMethods.validateDate("17/06/2016");
                const expectedDate: Date = new Date(Date.UTC(2016, 6 - 1, 17));
                expect(actualDate.toUTCString()).toBe(expectedDate.toUTCString());
            });

            it("should throw error when given 'rubbish'", () => {
                expect(() => {
                    const ignored = subjectWithPrivateMethods.validateDate("rubbish");
                }).toThrow(new Error("Invalid date \"rubbish\"."));
            });

            it("should throw error when given '1/2/3/4'", () => {
                expect(() => {
                    const ignored = subjectWithPrivateMethods.validateDate("1/2/3/4");
                }).toThrow(new Error("Invalid date \"1/2/3/4\"."));
            });

            it("should throw error when given '32/1/2018'", () => {
                expect(() => {
                    const ignored = subjectWithPrivateMethods.validateDate("32/1/2018");
                }).toThrow(new Error("Invalid date \"32/1/2018\"."));
            });

            it("should throw error when given '1/15/2018'", () => {
                expect(() => {
                    const ignored = subjectWithPrivateMethods.validateDate("1/15/2018");
                }).toThrow(new Error("Invalid date \"1/15/2018\"."));
            });
        });
    });
});
