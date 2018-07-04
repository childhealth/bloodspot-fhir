import { Outcome } from "../model/outcome";
import { ILoggerService } from "../services/i.logger.service";

/**
 * Knows how to build an Outcome object from the CSV file from a UK Newborn Screening Laboratory Network (UKNSLN).
 */
export class CSVOutcomeMapper {

    constructor(
        private logger: ILoggerService,
    ) {}

    public buildOutcomes(lines: string[], hasHeader: boolean, filename: string): Outcome[] {
        const result: Outcome[] = [];
        let lineNumber = 0;

        if (hasHeader) {
            lineNumber = lineNumber + 1;
        }

        for (const each of lines) {
            lineNumber = lineNumber + 1;
            try {
                const outcome = new Outcome(each);
                result.push(outcome);
            } catch (error) {
                this.logger.error("Error in file \"" + filename + "\" at line " + lineNumber + ": " + error);
            }
        }

        return result;
    }
}
