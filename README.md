# nhsd-bloodspot-helper README

## What is it?

It's a tool to generate newborn  [Blood Spot Test Outcome event FHIR messages](https://developer.nhs.uk/apis/dch-beta/explore_blood_spot_test_outcome.html) from screening laboratory data.


## Pre-requisites
Install [NodeJS](https://nodejs.org/) on your computer.

## How to deploy/install the tool locally

    npm install

    npm run dist


## How to build and run tests

    npm test


## How to run the tool adhoc

### Examples

    bloodspot-helper 20180530-lab-data.csv outputFolder

The tool will read the file `20180530-lab-data.csv` from the current folder, generate some FHIR event messages and write them into a folder called `outputFolder`.

