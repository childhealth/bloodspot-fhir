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


End.
