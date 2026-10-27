wot.register({
  "schemaVersion": 1,
  "projectId": "amsterdam-five-stores",
  "projectName": "Amsterdam — 5 supermarkets",
  "projectManager": "Sanne de Vries",
  "startDate": "2026-01-05",
  "endDate": "2027-06-30",
  "status": "amber",
  "statusNote": "Noord and Centrum on track; Zuid permit delayed by 6 weeks.",
  "description": "Open five FreshMarkt supermarkets across Amsterdam (Noord, Zuid, West, Oost, Centrum) as the flagship cluster of the chain. Each store follows the standard opening playbook: site, permits, fit-out, staffing, opening.",
  "updatedOn": "2026-10-20T16:42:00",
  "saveNote": "Monthly update October: Zuid permit slipped, Oost site signed.",
  "milestones": [
    {
      "name": "First store open (Noord)",
      "date": "2026-09-15",
      "done": true
    },
    {
      "name": "Three stores open",
      "date": "2027-01-31",
      "done": false
    },
    {
      "name": "All five stores open",
      "date": "2027-06-15",
      "done": false
    }
  ],
  "subItems": [
    {
      "subItemId": "ams-noord",
      "title": "Amsterdam Noord (Buikslotermeerplein)",
      "startDate": "2026-01-05",
      "endDate": "2026-09-30",
      "status": "completed-validated",
      "owner": "Tom Hendriks",
      "tasks": [
        {
          "name": "Stock delivered",
          "done": true
        },
        {
          "name": "Soft opening",
          "done": true
        },
        {
          "name": "Marketing campaign",
          "done": true
        },
        {
          "name": "Grand opening",
          "done": true
        }
      ],
      "updates": [
        {
          "date": "2026-09-16",
          "text": "Grand opening held on 15 September, 2,300 visitors on day one."
        },
        {
          "date": "2026-07-02",
          "text": "Fit-out complete, final inspection passed."
        },
        {
          "date": "2026-03-10",
          "text": "Permit granted by stadsdeel Noord."
        }
      ]
    },
    {
      "subItemId": "ams-centrum",
      "title": "Amsterdam Centrum (Haarlemmerstraat)",
      "startDate": "2026-02-02",
      "endDate": "2026-12-15",
      "status": "on-track",
      "owner": "Tom Hendriks",
      "tasks": [
        {
          "name": "Design freeze",
          "done": true
        },
        {
          "name": "Contractor appointed",
          "done": true
        },
        {
          "name": "Shelving and cold chain installed",
          "done": true
        },
        {
          "name": "Checkout and POS installed",
          "done": true
        },
        {
          "name": "Final inspection",
          "done": false
        }
      ],
      "updates": [
        {
          "date": "2026-10-14",
          "text": "Checkout and POS installed; final inspection booked for 20 November."
        },
        {
          "date": "2026-08-20",
          "text": "Contractor appointed after second tender."
        },
        {
          "date": "2026-05-05",
          "text": "Permit granted; monument status required adjusted shopfront design."
        }
      ]
    },
    {
      "subItemId": "ams-zuid",
      "title": "Amsterdam Zuid (Gelderlandplein)",
      "startDate": "2026-03-02",
      "endDate": "2027-02-28",
      "status": "at-risk",
      "owner": "Priya Nair",
      "tasks": [
        {
          "name": "Zoning check (omgevingsplan)",
          "done": true
        },
        {
          "name": "Permit application filed",
          "done": true
        },
        {
          "name": "Fire safety review",
          "done": false
        },
        {
          "name": "Permit granted",
          "done": false
        }
      ],
      "updates": [
        {
          "date": "2026-10-21",
          "text": "Municipality requested an additional traffic study; permit decision moved to mid-December."
        },
        {
          "date": "2026-09-01",
          "text": "Permit application filed."
        },
        {
          "date": "2026-06-15",
          "text": "Lease signed for 1,400 m² unit."
        }
      ]
    },
    {
      "subItemId": "ams-west",
      "title": "Amsterdam West (Bos en Lommerplein)",
      "startDate": "2026-05-01",
      "endDate": "2027-04-30",
      "status": "on-track",
      "owner": "Priya Nair",
      "tasks": [
        {
          "name": "Zoning check (omgevingsplan)",
          "done": true
        },
        {
          "name": "Permit application filed",
          "done": false
        },
        {
          "name": "Fire safety review",
          "done": false
        },
        {
          "name": "Permit granted",
          "done": false
        }
      ],
      "updates": [
        {
          "date": "2026-10-05",
          "text": "Zoning check completed, no objections expected."
        },
        {
          "date": "2026-08-28",
          "text": "Letter of intent signed with landlord."
        }
      ]
    },
    {
      "subItemId": "ams-oost",
      "title": "Amsterdam Oost (Oostpoort)",
      "startDate": "2026-08-03",
      "endDate": "2027-06-30",
      "status": "on-track",
      "owner": "Tom Hendriks",
      "tasks": [
        {
          "name": "Shortlist locations",
          "done": true
        },
        {
          "name": "Site visits",
          "done": true
        },
        {
          "name": "Business case approved",
          "done": true
        },
        {
          "name": "Letter of intent signed",
          "done": true
        }
      ],
      "updates": [
        {
          "date": "2026-10-18",
          "text": "Site signed at Oostpoort, 1,150 m². Permit track starts in November."
        },
        {
          "date": "2026-09-10",
          "text": "Two candidate sites under negotiation."
        }
      ]
    }
  ],
  "risks": [
    {
      "riskId": "r1",
      "date": "2026-10-21",
      "description": "Zuid permit may slip past Q1 2027 if the traffic study triggers objections.",
      "relatedSubItemId": "ams-zuid",
      "owner": "Priya Nair",
      "status": "open"
    },
    {
      "riskId": "r2",
      "date": "2026-09-02",
      "description": "Shortage of cold-chain installers in Q1 2027 may delay West and Oost fit-out.",
      "relatedSubItemId": null,
      "owner": "Sanne de Vries",
      "status": "open"
    },
    {
      "riskId": "r3",
      "date": "2026-04-11",
      "description": "Centrum monument restrictions on signage.",
      "relatedSubItemId": "ams-centrum",
      "owner": "Tom Hendriks",
      "status": "closed"
    }
  ],
  "links": [
    {
      "label": "Amsterdam cluster board",
      "url": "https://example.sharepoint.com/sites/freshmarkt/amsterdam"
    }
  ]
});
