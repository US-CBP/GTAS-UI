export const raw = [
  {
    id: "1.14.0",
    val: `## 1.14.0

#### Front-end
  * Added architecture to register hits from external sources called "external hits". 
  * Added ability to create a rule on seat type.
  * Added auditing of user actions on web application. Administrators can now see user activity related to passengers.
  * Seat is now a top level entity for making rules and queries. 
  * Added saving the seat cabin class to the database as well as the ability to run rules on a seat cabin class.
  * GTAS can now be configured to put three types of messages on to its queue. All messages conform to the gtas-information-share project. GTAS can consume any message it exports, including messages with rule hits. These are classified as "external hits":
      * Raw Message: This will create and put a message on the queue that only contains the message type, identifier, and raw message. A use case would be when one install of GTAS wants to share unprocessed messages with another install.
      * Processed Message: This will create and put a message on the queue that has been populated with all information that has been processed into the system. A use case would be when one install of GTAS wants to check passengers against an external source.
      * Rule Message: This will create and put a message on the queue that has been populated with all relevant passenger information. A hit is configured to be a member of an organization group. A use case would be when one install of GTAS wants to send hit information to a different install of GTAS.
  
#### Back-end
  * Increased speed of loading significantly by modifying transaction scopes and caching appropriate values.
  * Moved knowledge base creation to the rule engine. This solves any serialization issues between the web application and rules engine and also results in a large speed increase and reduced CPU pressure as the KB no longer is downloaded and unzipped every time the rule engine runs.
  * Bug fixes and speed enhancements related to automatic deletion and masking.`
  },
  {
    id: "1.13.3",
    val: `## 1.13.3

#### Front-end
* Updated Equality for objects using PII.`
  },
  {
    id: "1.13.2",
    val: `## 1.13.2
  
#### Front-end
  * Added document source to document summary and event report.`
  },
  {
    id: "1.13.1",
    val: `## 1.13.1
  
#### Back-end
  * Update code to pass checks.`
  },
  {
    id: "1.13.0",
    val: `## 1.13.0

#### Front-end
* Added ability for a user to manually create a hit on a passenger based on watchlist category.
* Added latest release notes to the about page for GTAS.
* Cached commonly called data on front end, lowering network usage by magnitudes. 
* Added 'Severity' column to the watchlist table under the administrative controls.

#### Back-end
* Flightpax object loading has been removed and table is no longer populated.
* Rule engine can be reset through the database - recompiling on the start of a run instead of manually by resaving the rule.
* Updated flight history to be more performant and accurate.
* Added toggle-able feature to manage user data, allowing data to be both masked and deleted from GTAS application after a configurable period.
* Added four settings, for managing both APIS and PNR data on separate pipelines.
* Added ability to retain data on configurable settings.
* Added masking and deleting for front end as well as back end.
* Added relationship between a passenger's details and each specific message.
`
  },
  {
    id: "1.12.0",
    val: `## 1.12.0

#### Front-end
* Users are locked out after 5 attempts to log in.
* Users are able to reset their password via email.`
  },
  {
    id: "1.11.1",
    val: `## 1.11.1

#### Back-end
* Fixed property on docker file related to automated email notifications.
`
  },
  {
    id: "1.11.0",
    val: `## 1.11.0

#### Front-end
* GTAS now supports asynchronous hits. At the start of each rule run the rule engine will process all hits from the pending hits table into hits. This allows for asynchronous rule hit processing.
* Tamr integration. GTAS now supports a full Tamr integration. Tamr is used for passenger resolution. This is both used for resolving passengers to show flight history as well as to resolve passengers against a watchlist. 
* Several enhancements to docker deployment including
* Setting the the version of java used on scheduler and webapp as well as application properties.

#### Back-end
* Several docker bug fixes and updates
* Rule engine can now process messages with no passengers.
* Watchlist records can be deleted provided they have no hits.
* Flightpax object has been deprecated. Portions of the front end that used the FlightPax object now use either calculated objects or different fields. 
* Code Analysis shows 0 bugs (A rating), 0 vulnerabilities, x109 security hotspots(A rating), 39 day technical debt, 2.2k code smells (A rating), 33.7% code coverage, 295 unit test, 7.1% duplications, 249 duplicated blocks.
`
  }
];

export default raw;
