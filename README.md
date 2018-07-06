# nhsd-bloodspot-helper README

## What is it?

It's a command-line tool to generate newborn  [Blood Spot Test Outcome event FHIR messages](https://developer.nhs.uk/apis/dch-beta/explore_blood_spot_test_outcome.html) from screening laboratory data.


## Pre-requisites
Install [NodeJS](https://nodejs.org/) on your computer.

## How to install the tool locally

    npm install

    npm run dist


## How to build and run tests

    npm test


## How to run the tool

Usage is:

    bloodspot-helper input-lab-data.csv outputFolderName

### Examples

    bloodspot-helper 20180530-lab-data.csv outputFolder

The tool will read the file `20180530-lab-data.csv` from the current folder, generate some FHIR event messages and write them into a folder called `outputFolder`.

## Configuration

The tool must be configured with a configuration file called ***`bloodspot-helper.json`*** in the folder where the tool is run.


Key  | Description
---: | ---
laboratory | The laboratory who is running this tool; the site which generates these FHIR messages.
laboratory.odsCode | The ODS code of this site.
laboratory.description | Textual description of this site. Usually the ODS _display_ name.
laboratory.address | The postal address of the site.
laboratory.address.line1 | First line of the address.
laboratory.address.city | City where the site is.
laboratory.address.district | District/county of the site.
laboratory.address.postCode | Post code of the site.
laboratory.phone | Contact telephone number of the site.
healthcareService | Represents the service running this tool to support the Digital Child Health project. See the [DCH-HealthcareService-1](https://fhir.nhs.uk/STU3/StructureDefinition/DCH-HealthcareService-1) structure definition.
healthcareService.professionalType | The type of care professional or team who has run this tool to generate the FHIR messages. Must be a valid value with code and description in the ValueSet [DCH-ProfessionalType-1](https://fhir.nhs.uk/STU3/ValueSet/DCH-ProfessionalType-1)
healthcareService.professionalType.code | `code` property of the ValueSet above.
healthcareService.professionalType.description | `description` property of the ValueSet above.
healthcareService.specialty | A specialty that a healthcare service may provide. Must be a [DCH-Specialty-1](https://fhir.nhs.uk/STU3/ValueSet/DCH-Specialty-1) ValueSet structure.
healthcareService.specialty.code | `code` property of the ValueSet above.
healthcareService.specialty.description | `description` property of the ValueSet above.
healthcareService.logging | Specifies simple logging configuration.
healthcareService.logging.errorLogFilename | The filename of the error log to output.
healthcareService.logging.auditLogFilename | The filename of the audit log to output.

## Example

This is the example:

    {
        "laboratory": {
            "odsCode": "LAB01",
            "description": "Laboratory 01",
            "address": {
                "line1": "First line of the address",
                "city": "City",
                "district": "District",
                "postCode": "Post Code"
            },
            "phone": "0113 123 4567"
        },
        "healthcareService": {
            "professionalType": {
                "code": "C09",
                "description": "Screener (in a National Screening Programme)"
            },
            "specialty": {
                "code": "560",
                "description": "MIDWIFE EPISODE"
            }
        },
        "logging": {
            "errorLogFilename": "error.log",
            "auditLogFilename": "audit.log"
        }
    }

# Logging

This tool has simple logging. All command-line output is sent to both the console and to an audit log file.
When an error is encountered in the input CSV file, it is recorded in the error log file.

# Known issues

When an error is encountered on a line of the CSV file, it is logged and then processing continues on the next line. In other words, 
any other errors on that line are ignored.

# Contributing

Contributions in the form of pull requests very very welcome! :)
