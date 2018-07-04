import { Outcome } from "./outcome";

describe("Outcome", () => {
    let subject: Outcome;
    let subjectWithPrivateMethods: any;

    // tslint:disable-next-line:max-line-length
    const csv1 = ",16N023744,08A,999 123 4567,TEST,BABY,17/06/2016,2,Dr Foster,G83067,1,1,2518,36,1,MumSurname,MumAltname,TEST# Firstname,Flat 11# Test House,Test Quay,Woolwich,LONDON,London,SE18 5NH,0712341234,23/05/2016,22/05/2016,,SAMPLE TAKER,SEThames,4,Made-up PKU supp code,PKU Not Suspected. Status Code 04,4,,CHT Not Suspected. Status Code 04,6,602,Carrier of Other Haemoglobin. Status Code 06,4,,CF Not Suspected. Status Code 04,4,,MCADD Not Suspected. Status Code 04,4,,HCU Not Suspected. Status Code 04,4,,MSUD Not Suspected. Status Code 04,4,,GA1 Not Suspected. Status Code 04,4,,IVA Not Suspected. Status Code 04";

    beforeEach(() => {
        subject = new Outcome(csv1);
        subjectWithPrivateMethods = subject;
    });

    describe("constructor", () => {
        it("should set the simple fields", () => {
            expect(subject.labCardSerialNo).toEqual("16N023744");
            expect(subject.providerUnit).toEqual("08A");
            expect(subject.nhsNumber).toEqual("9991234567");
            expect(subject.surname).toEqual("TEST");
            expect(subject.firstName).toEqual("BABY");
            expect(subject.genderCode).toEqual(2);
            expect(subject.gpName).toEqual("Dr Foster"),
            expect(subject.gpPracticeCode).toEqual("G83067");
            expect(subject.birthOrder).toEqual(1);
            expect(subject.birthConfinement).toEqual(1);
            expect(subject.birthWeight).toEqual(2518);
            expect(subject.gestationLength).toEqual(36);
            expect(subject.nicu).toEqual(1);
            expect(subject.mothersSurname).toEqual("MumSurname");
            expect(subject.alternativeSurname).toEqual("MumAltname");
            expect(subject.mothersFirstname).toEqual("TEST# Firstname");
            expect(subject.address1).toEqual("Flat 11# Test House");
            expect(subject.address2).toEqual("Test Quay");
            expect(subject.address3).toEqual("Woolwich");
            expect(subject.address4).toEqual("LONDON");
            expect(subject.address5).toEqual("London");
            expect(subject.postcode).toEqual("SE18 5NH");
            expect(subject.mothersTelephone).toEqual("0712341234");
            expect(subject.labCode).toEqual("SEThames");
        });

        it("should set the lab condition test results", () => {
            expect(subject.pkuStatusCode).toBe("04");
            expect(subject.pkuSupplementaryCode).toBe("Made-up PKU supp code");
            expect(subject.pkuStatusDescription).toBe("PKU Not Suspected. Status Code 04");

            expect(subject.scdStatusCode).toBe("06");
            expect(subject.scdSupplementaryCode).toBe("0602");
            expect(subject.scdStatusDescription).toBe("Carrier of Other Haemoglobin. Status Code 06");

            expect(subject.cfStatusCode).toBe("04");
            expect(subject.cfSupplementaryCode).toBe("");
            expect(subject.cfStatusDescription).toBe("CF Not Suspected. Status Code 04");

            expect(subject.chtStatusCode).toBe("04");
            expect(subject.chtSupplementaryCode).toBe("");
            expect(subject.chtStatusDescription).toBe("CHT Not Suspected. Status Code 04");

            expect(subject.mcaddStatusCode).toBe("04");
            expect(subject.mcaddSupplementaryCode).toBe("");
            expect(subject.mcaddStatusDescription).toBe("MCADD Not Suspected. Status Code 04");

            expect(subject.hcuStatusCode).toBe("04");
            expect(subject.hcuSupplementaryCode).toBe("");
            expect(subject.hcuStatusDescription).toBe("HCU Not Suspected. Status Code 04");

            expect(subject.msudStatusCode).toBe("04");
            expect(subject.msudSupplementaryCode).toBe("");
            expect(subject.msudStatusDescription).toBe("MSUD Not Suspected. Status Code 04");

            expect(subject.ga1StatusCode).toBe("04");
            expect(subject.ga1SupplementaryCode).toBe("");
            expect(subject.ga1StatusDescription).toBe("GA1 Not Suspected. Status Code 04");

            expect(subject.ivaStatusCode).toBe("04");
            expect(subject.ivaSupplementaryCode).toBe("");
            expect(subject.ivaStatusDescription).toBe("IVA Not Suspected. Status Code 04");
        });

        it("should fill the status codes with leading digit zero if necessary", () => {
            expect(subject.pkuStatusCode).toBe("04");
            expect(subject.pkuSupplementaryCode).toBe("Made-up PKU supp code");
            expect(subject.scdStatusCode).toBe("06");
            expect(subject.scdSupplementaryCode).toBe("0602");
        });
    });

    describe("displayName", () => {
        it("should return a displayable name", () => {
            expect(subject.displayName).toEqual("TEST, BABY");
        });
    });

    describe("validatedSupplementaryCode", () => {
        it("should return the given value when its alphanumeric", () => {
            const value = "hello";
            const actual = subjectWithPrivateMethods.validatedSupplementaryCode(value);
            expect(actual).toEqual(value);
        });

        it("should return a 4-digit value when the given value is a 3-digit numeric value", () => {
            const actual = subjectWithPrivateMethods.validatedSupplementaryCode("123");
            expect(actual).toEqual("0123");
        });
    });
});
