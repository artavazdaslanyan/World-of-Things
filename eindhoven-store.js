wot.register({
  "schemaVersion": 1,
  "projectId": "eindhoven-store",
  "projectName": "Eindhoven — Strijp-S",
  "projectManager": "Daan Bakker",
  "startDate": "2026-06-01",
  "endDate": "2027-05-31",
  "status": "red",
  "statusNote": "Permit rejected on parking norms; resubmission in progress, 3-month slip expected.",
  "description": "Open one FreshMarkt supermarket in Eindhoven (Strijp-S), following the standard opening playbook.",
  "updatedOn": "2026-10-23T17:10:00",
  "saveNote": "October monthly update",
  "milestones": [
    {
      "name": "Permit granted",
      "date": "2026-10-15",
      "done": false
    },
    {
      "name": "Store opening",
      "date": "2027-05-15",
      "done": false
    }
  ],
  "subItems": [
    {
      "subItemId": "eindhoven-site",
      "title": "Site selection",
      "startDate": "2026-06-01",
      "endDate": "2026-08-28",
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
      "subItemId": "eindhoven-permit",
      "title": "Permits and zoning",
      "startDate": "2026-07-01",
      "endDate": "2026-10-28",
      "status": "exceeded",
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
          "done": false
        },
        {
          "name": "Permit granted",
          "done": false
        }
      ],
      "updates": [
        {
          "date": "2026-10-23",
          "text": "Permit rejected: parking norm not met. Revised plan with shared parking agreement to be filed by 15 November."
        },
        {
          "date": "2026-09-01",
          "text": "Permit application filed."
        }
      ]
    },
    {
      "subItemId": "eindhoven-fitout",
      "title": "Fit-out and installation",
      "startDate": "2026-10-01",
      "endDate": "2027-03-28",
      "status": "not-started",
      "owner": "",
      "tasks": [
        {
          "name": "Design freeze",
          "done": false
        },
        {
          "name": "Contractor appointed",
          "done": false
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
      "updates": []
    },
    {
      "subItemId": "eindhoven-staff",
      "title": "Staffing",
      "startDate": "2027-01-01",
      "endDate": "2027-04-28",
      "status": "not-started",
      "owner": "",
      "tasks": [
        {
          "name": "Store manager hired",
          "done": false
        },
        {
          "name": "Vacancies published",
          "done": false
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
      "updates": []
    },
    {
      "subItemId": "eindhoven-open",
      "title": "Opening",
      "startDate": "2027-04-01",
      "endDate": "2027-05-28",
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
      "date": "2026-10-23",
      "description": "Parking norm dispute may require a smaller sales floor or a different site.",
      "relatedSubItemId": "eindhoven-permit",
      "owner": "Daan Bakker",
      "status": "open"
    }
  ],
  "links": []
});
