export class CommonGenerator {

    public buildProfile(profileValue: string): any {
        return {
            profile: {
                "@": {
                    value: profileValue,
                },
            },
        };
    }

    public buildCoding(system: string, code: string, display: string) {
        return {
            coding: this.buildSystemCodeDisplay(system, code, display),
        };
    }

    public buildSystemCodeDisplay(system: string, code: string, display: string) {
        return {
            system: {
                "@": {
                    value: system,
                },
            },
            code: {
                "@": {
                    value: code,
                },
            },
            display: {
                "@": {
                    value: display,
                },
            },
        };
    }

    public buildSystemValue(systemValue: string, valueValue: string): any {
        return {
            system: {
                "@": {
                    value: systemValue,
                },
            },
            value: {
                "@": {
                    value: valueValue,
                },
            },
        };
    }

    public buildTimestamp(date: Date): any {
        const theDate = date.toISOString();
        return {
            "@": {
                value: theDate,
            },
        };
    }

}
