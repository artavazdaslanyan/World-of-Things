wot.register({
  "schemaVersion": 1,
  "projectId": "connectivity-all-stores",
  "projectName": "Internet connectivity — all stores",
  "projectManager": "Jeroen Visser",
  "startDate": "2026-02-02",
  "endDate": "2027-08-31",
  "status": "amber",
  "statusNote": "Provider framework signed; Amsterdam Zuid and Eindhoven installs waiting on building access.",
  "description": "Provide dual-provider internet (fibre primary, 5G backup) and SD-WAN to every store before its soft opening, plus the central network design, security baseline and monitoring.",
  "updatedOn": "2026-10-21T15:30:00",
  "saveNote": "Added Groningen and Oost to rollout; Eindhoven on hold.",
  "milestones": [
    {
      "name": "Provider framework contract",
      "date": "2026-04-30",
      "done": true
    },
    {
      "name": "Network design approved",
      "date": "2026-06-15",
      "done": true
    },
    {
      "name": "Last store connected",
      "date": "2027-08-15",
      "done": false
    }
  ],
  "subItems": [
    {
      "subItemId": "net-provider",
      "title": "Provider selection and framework contract",
      "startDate": "2026-02-02",
      "endDate": "2026-04-30",
      "status": "completed-validated",
      "owner": "Jeroen Visser",
      "tasks": [
        {
          "name": "RFP issued",
          "done": true
        },
        {
          "name": "Provider shortlist",
          "done": true
        },
        {
          "name": "Framework contract signed",
          "done": true
        }
      ],
      "updates": [
        {
          "date": "2026-04-28",
          "text": "Framework contract signed with KPN (fibre) and Odido (5G backup)."
        }
      ]
    },
    {
      "subItemId": "net-design",
      "title": "Network and security design",
      "startDate": "2026-03-02",
      "endDate": "2026-06-30",
      "status": "completed-validated",
      "owner": "Mark de Jong",
      "tasks": [
        {
          "name": "Reference store design",
          "done": true
        },
        {
          "name": "SD-WAN vendor chosen",
          "done": true
        },
        {
          "name": "Security baseline (segmentation, PCI zone)",
          "done": true
        },
        {
          "name": "Design approved by CISO",
          "done": true
        }
      ],
      "updates": [
        {
          "date": "2026-06-12",
          "text": "Design approved; PCI zone separated from guest Wi-Fi and IoT."
        }
      ]
    },
    {
      "subItemId": "net-ams",
      "title": "Rollout Amsterdam (5 stores)",
      "startDate": "2026-06-01",
      "endDate": "2027-05-31",
      "status": "on-track",
      "owner": "Mark de Jong",
      "tasks": [
        {
          "name": "Noord connected",
          "done": true
        },
        {
          "name": "Centrum connected",
          "done": true
        },
        {
          "name": "Zuid connected",
          "done": false
        },
        {
          "name": "West connected",
          "done": false
        },
        {
          "name": "Oost connected",
          "done": false
        }
      ],
      "updates": [
        {
          "date": "2026-10-21",
          "text": "Centrum fibre live; Zuid waiting on permit before building access."
        },
        {
          "date": "2026-08-30",
          "text": "Noord connected and monitored."
        }
      ]
    },
    {
      "subItemId": "net-rot-utr",
      "title": "Rollout Rotterdam and Utrecht",
      "startDate": "2026-09-01",
      "endDate": "2027-02-28",
      "status": "on-track",
      "owner": "Mark de Jong",
      "tasks": [
        {
          "name": "Rotterdam fibre ordered",
          "done": true
        },
        {
          "name": "Rotterdam connected",
          "done": false
        },
        {
          "name": "Utrecht fibre ordered",
          "done": false
        },
        {
          "name": "Utrecht connected",
          "done": false
        }
      ],
      "updates": [
        {
          "date": "2026-10-15",
          "text": "Rotterdam fibre delivery confirmed for 20 November."
        }
      ]
    },
    {
      "subItemId": "net-eind-dh",
      "title": "Rollout Eindhoven and Den Haag",
      "startDate": "2026-11-02",
      "endDate": "2027-05-31",
      "status": "at-risk",
      "owner": "Jeroen Visser",
      "tasks": [
        {
          "name": "Den Haag fibre ordered",
          "done": true
        },
        {
          "name": "Den Haag connected",
          "done": false
        },
        {
          "name": "Eindhoven fibre ordered",
          "done": false
        },
        {
          "name": "Eindhoven connected",
          "done": false
        }
      ],
      "updates": [
        {
          "date": "2026-10-23",
          "text": "Eindhoven order on hold until the permit is resolved."
        }
      ]
    },
    {
      "subItemId": "net-gro",
      "title": "Rollout Groningen",
      "startDate": "2027-03-01",
      "endDate": "2027-08-31",
      "status": "not-started",
      "owner": "Jeroen Visser",
      "tasks": [
        {
          "name": "Fibre ordered",
          "done": false
        },
        {
          "name": "Connected",
          "done": false
        }
      ],
      "updates": []
    },
    {
      "subItemId": "net-monitor",
      "title": "Central monitoring and support",
      "startDate": "2026-07-01",
      "endDate": "2026-12-31",
      "status": "completed-pending",
      "owner": "Mark de Jong",
      "tasks": [
        {
          "name": "Monitoring platform live",
          "done": true
        },
        {
          "name": "Runbooks written",
          "done": true
        },
        {
          "name": "Handover to IT operations",
          "done": true
        }
      ],
      "updates": [
        {
          "date": "2026-10-20",
          "text": "Handover done; awaiting sign-off from IT operations."
        }
      ]
    }
  ],
  "risks": [
    {
      "riskId": "r1",
      "date": "2026-10-21",
      "description": "Fibre lead times of 10–12 weeks: any store that fixes its opening date late risks opening on 5G only.",
      "relatedSubItemId": null,
      "owner": "Jeroen Visser",
      "status": "open"
    }
  ],
  "links": []
});
