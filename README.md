# MTN-MOMO-API (COLLECTION)
Simple integration of the MTN Mobile Money API using Express, NODE JS, MTN-MOMO NPM and Handlebars view template engine. 

[Try it out !](https://mtn-momo-api-implementation-production.up.railway.app/)

# Install

```bash
$ npm start | npm run dev [using nodemon]
```

# Prerequisite 

* [Sign in to MTN MOMO API](https://momodeveloper.mtn.com/)
* [Check out the MTN-MOMO NPM](https://www.npmjs.com/package/mtn-momo)


# Usage 

On the `/pay` route 

* Use any phone number to have a successful transaction 
* Use the following numbers provided by MTN MOMO API to test their respective results

| Number              | Response                                   
|---------------------|---------------------------------------------------------|
| 46733123450         | Failed                                                  |
| 46733123451         | Rejected                                                |                                    
| 46733123452         | Timeout                                                 |
| 46733123453         | Ongoing                                                 |
| 46733123454         | Pending                                                 |



## Issue Reporting

If you have found a bug, have a feature request or simply a suggestion, please report them at this repository issues section. Better, you can email me from the [Home page](https://mtn-momo-api-implementation-production.up.railway.app/) of this project.
Please do not report security vulnerabilities on the public GitHub issue tracker.

## Author

David Osee

## License
Open source. 
