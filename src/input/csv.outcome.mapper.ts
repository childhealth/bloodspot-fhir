import { Outcome } from "../model/outcome";

/**
 * Knows how to build an Outcome object from the CSV file from a UK Newborn Screening Laboratory Network (UKNSLN).
 */
export class CSVOutcomeMapper {

    public buildOutcomes(lines: string[]): Outcome[] {
        const result: Outcome[] = [];

        for (const each of lines) {
            const outcome = new Outcome(each);
            // outcome.allValues = each;
            result.push(outcome);
        }

        return result;
    }
}
