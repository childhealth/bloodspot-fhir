export class Generator {

    public generateFHIRMessage(input: string) {
        if (input === '') {
            throw new Error("Input must not be empty.");
        }
    }
}
