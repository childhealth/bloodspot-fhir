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

}
