wot.register({
  "schemaVersion": 1,
  "projectId": "contract-negotiations",
  "projectName": "Contract negotiations — leases, suppliers, logistics",
  "projectManager": "Lotte Jansen",
  "startDate": "2026-01-05",
  "endDate": "2027-03-31",
  "status": "green",
  "statusNote": "Supplier framework signed; two leases still open.",
  "description": "Negotiate and sign all commercial contracts the chain depends on: store leases, supplier framework agreements, logistics and distribution, IT and POS, and the collective labour agreement for store staff.",
  "updatedOn": "2026-09-12T13:20:00",
  "saveNote": "September update",
  "milestones": [
    {
      "name": "Supplier framework signed",
      "date": "2026-05-29",
      "done": true
    },
    {
      "name": "Logistics contract signed",
      "date": "2026-09-30",
      "done": true
    },
    {
      "name": "All leases signed",
      "date": "2027-03-15",
      "done": false
    }
  ],
  "subItems": [
    {
      "subItemId": "con-leases",
      "title": "Store leases (10 locations)",
      "startDate": "2026-01-05",
      "endDate": "2027-03-31",
      "status": "on-track",
      "owner": "Lotte Jansen",
      "tasks": [
        {
          "name": "Amsterdam Noord",
          "done": true
        },
        {
          "name": "Amsterdam Centrum",
          "done": true
        },
        {
          "name": "Amsterdam Zuid",
          "done": true
        },
        {
          "name": "Amsterdam West",
          "done": true
        },
        {
          "name": "Amsterdam Oost",
          "done": true
        },
        {
          "name": "Rotterdam",
          "done": true
        },
        {
          "name": "Utrecht",
          "done": true
        },
        {
          "name": "Eindhoven",
          "done": true
        },
        {
          "name": "Den Haag",
          "done": true
        },
        {
          "name": "Groningen",
          "done": false
        }
      ],
      "updates": [
        {
          "date": "2026-09-12",
          "text": "Nine of ten leases signed; Groningen waits for the site decision."
        }
      ]
    },
    {
      "subItemId": "con-suppliers",
      "title": "Supplier framework agreements",
      "startDate": "2026-01-05",
      "endDate": "2026-05-31",
      "status": "completed-validated",
      "owner": "Bram Smit",
      "tasks": [
        {
          "name": "Fresh produce",
          "done": true
        },
        {
          "name": "Dry goods",
          "done": true
        },
        {
          "name": "Dairy and frozen",
          "done": true
        }
      ],
      "updates": [
        {
          "date": "2026-05-29",
          "text": "All three framework agreements signed."
        }
      ]
    },
    {
      "subItemId": "con-logistics",
      "title": "Logistics and distribution",
      "startDate": "2026-04-01",
      "endDate": "2026-09-30",
      "status": "completed-validated",
      "owner": "Bram Smit",
      "tasks": [
        {
          "name": "Tender issued",
          "done": true
        },
        {
          "name": "Contract signed",
          "done": true
        }
      ],
      "updates": [
        {
          "date": "2026-09-10",
          "text": "Distribution contract signed, daily deliveries from the Utrecht hub."
        }
      ]
    },
    {
      "subItemId": "con-it",
      "title": "IT and POS contracts",
      "startDate": "2026-03-02",
      "endDate": "2026-08-31",
      "status": "completed-validated",
      "owner": "Lotte Jansen",
      "tasks": [
        {
          "name": "POS vendor",
          "done": true
        },
        {
          "name": "Network providers (with connectivity project)",
          "done": true
        }
      ],
      "updates": [
        {
          "date": "2026-08-20",
          "text": "POS contract signed."
        }
      ]
    },
    {
      "subItemId": "con-labour",
      "title": "Collective labour agreement",
      "startDate": "2026-06-01",
      "endDate": "2026-12-31",
      "status": "at-risk",
      "owner": "Lotte Jansen",
      "tasks": [
        {
          "name": "Union talks opened",
          "done": true
        },
        {
          "name": "Terms agreed",
          "done": false
        },
        {
          "name": "Agreement signed",
          "done": false
        }
      ],
      "updates": [
        {
          "date": "2026-09-11",
          "text": "Union asks for a higher Sunday allowance; next round 5 November."
        }
      ]
    }
  ],
  "risks": [
    {
      "riskId": "r1",
      "date": "2026-09-11",
      "description": "Labour agreement not signed before the Rotterdam opening would delay staff onboarding.",
      "relatedSubItemId": "con-labour",
      "owner": "Lotte Jansen",
      "status": "open"
    }
  ],
  "links": []
});
