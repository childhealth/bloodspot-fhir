import { OutcomeValidator } from "./outcome.validator";

describe("OutcomeValidator", () => {
    let subject: OutcomeValidator;
    let subjectWithPrivateMethods: any;

    // tslint:disable-next-line:max-line-length
    const csv1 = ",16N023744,08A,999 123 4567,TEST,BABY,17/06/2016,2,Dr Foster,G83067,1,1,2518,36,1,MumSurname,MumAltname,TEST# Firstname,Flat 11# Test House,Test Quay,Woolwich,LONDON,London,SE18 5NH,0712341234,23/05/2016,22/05/2016,,SAMPLE TAKER,SEThames,4,Made-up PKU supp code,PKU Not Suspected. Status Code 04,4,,CHT Not Suspected. Status Code 04,6,602,Carrier of Other Haemoglobin. Status Code 06,4,,CF Not Suspected. Status Code 04,4,,MCADD Not Suspected. Status Code 04,4,,HCU Not Suspected. Status Code 04,4,,MSUD Not Suspected. Status Code 04,4,,GA1 Not Suspected. Status Code 04,4,,IVA Not Suspected. Status Code 04";

    beforeEach(() => {
        subject = new OutcomeValidator();
        subjectWithPrivateMethods = subject;
    });

    describe("validate", () => {
        it("should throw Error if there are not the correct number of values", () => {
            expect(() => {
                subject.validate(["rubbish", "values"]);
            }).toThrow(new Error("Invalid values: string has 2 values but was expecting 57."));
        });

        it("should throw Error if there is a non-number in birthOrder.", () => {
            // tslint:disable-next-line:max-line-length
            const badBirthOrderCsv = ",16N023744,08A,999 123 4567,TEST,BABY,17/06/2016,2,Dr Foster,G83067,X,1,2518,36,1,,,TEST# Firstname,Flat 11# Test House,Test Quay,Woolwich,LONDON,London,SE18 5NH,,23/05/2016,22/05/2016,,SAMPLE TAKER,SEThames,4,,PKU Not Suspected. Status Code 04,4,,CHT Not Suspected. Status Code 04,6,602,Carrier of Other Haemoglobin. Status Code 06,4,,CF Not Suspected. Status Code 04,4,,MCADD Not Suspected. Status Code 04,4,,HCU Not Suspected. Status Code 04,4,,MSUD Not Suspected. Status Code 04,4,,GA1 Not Suspected. Status Code 04,4,,IVA Not Suspected. Status Code 04";
            expect(() => {
                subject.validate(badBirthOrderCsv.split(","));
            }).toThrow(new Error("Invalid number \"X\"."));
        });
    });

    describe("validateDate", () => {
        it("should set date of birth", () => {
            const actualDate: Date = subjectWithPrivateMethods.validateDate("17/06/2016");
            const expectedDate: Date = new Date(Date.UTC(2016, 6 - 1, 17));
            expect(actualDate.toUTCString()).toBe(expectedDate.toUTCString());
        });

        it("should throw error when given 'rubbish'", () => {
            expect(() => {
                const ignored = subjectWithPrivateMethods.validateDate("rubbish", "Date Of Birth");
            }).toThrow(new Error("Date Of Birth should be a date DD/MM/YYYY but was \"rubbish\"."));
        });

        it("should throw error when given '1/2/3/4'", () => {
            expect(() => {
                const ignored = subjectWithPrivateMethods.validateDate("1/2/3/4", "Nonsense");
            }).toThrow(new Error("Nonsense should be a date DD/MM/YYYY but was \"1/2/3/4\"."));
        });

        it("should throw error when given '32/1/2018'", () => {
            expect(() => {
                const ignored = subjectWithPrivateMethods.validateDate("32/1/2018", "Date1");
            }).toThrow(new Error("Date1 should be a date DD/MM/YYYY but was \"32/1/2018\"."));
        });

        it("should throw error when given '1/15/2018'", () => {
            expect(() => {
                const ignored = subjectWithPrivateMethods.validateDate("1/15/2018", "Date2");
            }).toThrow(new Error("Date2 should be a date DD/MM/YYYY but was \"1/15/2018\"."));
        });
    });

    describe("validateStatusCode", () => {
        it("should throw an error if the value is not a number between 1 and 10.", () => {
            expect(() => {
                const ignored = subjectWithPrivateMethods.validateStatusCode("dog", "PKU status code");
            }).toThrow(new Error("PKU status code should be a number between 1 and 10 but was \"dog\"."));
            expect(() => {
                const ignored = subjectWithPrivateMethods.validateStatusCode("0", "Some status code");
            }).toThrow(new Error("Some status code should be a number between 1 and 10 but was \"0\"."));
            expect(() => {
                const ignored = subjectWithPrivateMethods.validateStatusCode("11", "Too-high status code");
            }).toThrow(new Error("Too-high status code should be a number between 1 and 10 but was \"11\"."));
        });

        it("should pad a number; should return '04' when given '4'", () => {
            const statusCode = "4";
            const actual = subjectWithPrivateMethods.validateStatusCode(statusCode);
            expect(actual).toEqual("04");
        });

        it("should return '14' when given '10'", () => {
            const statusCode = "10";
            const actual = subjectWithPrivateMethods.validateStatusCode(statusCode);
            expect(actual).toEqual("10");
        });
    });

});