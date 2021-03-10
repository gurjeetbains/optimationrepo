# Optimation Rest API Test

This is the test project showing how to create a REST API that takes input in the form of data and then returns the gst, value and cost centre in reponse. We are assuming here that the gst is 15% and that total will a number (floating or interger)

## Installation

Clone this project and then use the package manager [npm](https://www.npmjs.com/) to install dependencies.

```bash
npm install
```

## Usage

First Start the server using below
```javascript
npm run start
```
Then open postman or terminal and run the following curl
```bash
curl --location --request GET 'http://localhost:3000/api/extractTags' \
--header 'Content-Type: application/json' \
--data-raw '{"data":"Hi Yvaine,Please create an expense claim for the below. Relevant details are marked up as requested...<expense><cost_centre>DEV002</cost_centre><total>1024.01</total><payment_method>personal card</payment_method></expense>From: Ivan Castle Sent: Friday, 16 February 2018 10:32 AMTo: Antoine Lloyd <Antoine.Lloyd@example.com>Subject: testHi Antoine,Please create a reservation at the <vendor>ViaductSteakhouse</vendor> our<description>development team’s project end celebration dinner</description> on <date>Tuesday27 April 2017<date>. We expect to arrive around 7.15pm. Approximately 12 people but I’llconfirm exact numbers closer to the day.Regards,Ivan"}'
```
More Use Cases 
```bash
curl --location --request GET 'http://localhost:3000/api/extractTags' \
--header 'Content-Type: application/json' \
--data-raw '{"data":"Hi Yvlow. Relevant details are marked up as requested...<expense><total>1024.01</total><payment_method>personal card</payment_method></expense>From: Ivan Castle Sent: Friday, 16 February 2018 10:32 AMTo: Antoine Lloyd <Antoine.Lloyd@example.com>Subject: testHi Antoine,Please create a reservation at the <vendor>ViaductSteakhouse</vendor> our<description>development team’s project end celebration dinner</description> on <date>Tuesday27 April 2017<date>. We expect to arrive around 7.15pmards,Ivan"}'
```
```bash
curl --location --request GET 'http://localhost:3000/api/extractTags' \
--header 'Content-Type: application/json' 
```
## Failure scenarios

* Opening tags that have no corresponding closing tag. In this case the whole message should be
rejected.
* Missing total tag In this case the whole message should be rejected.
* Missing cost_centre tag In this case the ‘cost centre’ field in the output should be defaulted to
‘UNKNOWN’.
