wot.register({
  "schemaVersion": 1,
  "projectId": "den-haag-store",
  "projectName": "Den Haag — Leyweg",
  "projectManager": "Fatima El Idrissi",
  "startDate": "2026-03-02",
  "endDate": "2027-02-26",
  "status": "green",
  "statusNote": "Fit-out started, two weeks ahead of plan.",
  "description": "Open one FreshMarkt supermarket at Leyweg, Den Haag, including a small in-store bakery pilot.",
  "updatedOn": "2026-10-24T10:15:00",
  "saveNote": "October update; bakery pilot scope added.",
  "milestones": [
    {
      "name": "Permit granted",
      "date": "2026-07-10",
      "done": true
    },
    {
      "name": "Bakery pilot decision",
      "date": "2026-12-01",
      "done": false
    },
    {
      "name": "Store opening",
      "date": "2027-02-15",
      "done": false
    }
  ],
  "subItems": [
    {
      "subItemId": "den-haag-site",
      "title": "Site selection",
      "startDate": "2026-03-01",
      "endDate": "2026-05-28",
      "status": "completed-validated",
      "owner": "",
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
      "updates": []
    },
    {
      "subItemId": "den-haag-permit",
      "title": "Permits and zoning",
      "startDate": "2026-04-01",
      "endDate": "2026-07-28",
      "status": "completed-validated",
      "owner": "",
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
          "done": true
        },
        {
          "name": "Permit granted",
          "done": true
        }
      ],
      "updates": []
    },
    {
      "subItemId": "den-haag-fitout",
      "title": "Fit-out and installation",
      "startDate": "2026-07-01",
      "endDate": "2026-12-28",
      "status": "on-track",
      "owner": "",
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
          "done": false
        },
        {
          "name": "Checkout and POS installed",
          "done": false
        },
        {
          "name": "Final inspection",
          "done": false
        }
      ],
      "updates": [
        {
          "date": "2026-10-24",
          "text": "Shelving installed; bakery oven ordered."
        },
        {
          "date": "2026-09-15",
          "text": "Contractor on site."
        }
      ]
    },
    {
      "subItemId": "den-haag-staff",
      "title": "Staffing",
      "startDate": "2026-10-01",
      "endDate": "2027-01-28",
      "status": "on-track",
      "owner": "",
      "tasks": [
        {
          "name": "Store manager hired",
          "done": true
        },
        {
          "name": "Vacancies published",
          "done": true
        },
        {
          "name": "Staff hired (80%)",
          "done": false
        },
        {
          "name": "Onboarding and training done",
          "done": false
        }
      ],
      "updates": [
        {
          "date": "2026-10-10",
          "text": "Store manager hired."
        }
      ]
    },
    {
      "subItemId": "den-haag-open",
      "title": "Opening",
      "startDate": "2027-01-01",
      "endDate": "2027-02-28",
      "status": "not-started",
      "owner": "",
      "tasks": [
        {
          "name": "Stock delivered",
          "done": false
        },
        {
          "name": "Soft opening",
          "done": false
        },
        {
          "name": "Marketing campaign",
          "done": false
        },
        {
          "name": "Grand opening",
          "done": false
        }
      ],
      "updates": []
    }
  ],
  "risks": [
    {
      "riskId": "r1",
      "date": "2026-10-24",
      "description": "Bakery pilot adds ventilation requirements not in the original permit.",
      "relatedSubItemId": "den-haag--fitout",
      "owner": "Fatima El Idrissi",
      "status": "open"
    }
  ],
  "links": []
});
