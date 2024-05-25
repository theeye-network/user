const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const baseURL = 'https://acciresque-default-rtdb.asia-southeast1.firebasedatabase.app/.json';

// List all accidents
app.get('/accidents', async (req, res) => {
  try {
    const response = await axios.get(baseURL, {
      params: {
        auth: 'PUBLIC',
        query: 'ListAccidents'
      }
    });

    const accidents = response.data.accidents || [];
    res.json(accidents.map(accident => ({
      accidentId: accident.accidentId,
      location: accident.location,
      timestamp: accident.timestamp,
      police: {
        policeId: accident.police.policeId,
        station: accident.police.station
      },
      insurance: {
        insuranceId: accident.insurance.insuranceId,
        provider: accident.insurance.provider
      },
      ambulance: {
        ambulanceId: accident.ambulance.ambulanceId,
        location: accident.ambulance.location
      },
      medicalRecord: {
        hospitalId: accident.medicalRecord.hospitalId,
        name: accident.medicalRecord.name,
        medicalRecords: accident.medicalRecord.medicalRecords
      },
      hospital: {
        hospitalId: accident.hospital.hospitalId,
        name: accident.hospital.name,
        location: accident.hospital.location
      },
      vehicle: {
        vehicleId: accident.vehicle.vehicleId,
        registration: accident.vehicle.registration
      },
      contact: {
        contactId: accident.contact.contactId,
        name: accident.contact.name,
        phoneNumber: accident.contact.phoneNumber,
        relationship: accident.contact.relationship
      }
    })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get an accident by ID
app.get('/accidents/:id', async (req, res) => {
  try {
    const accidentId = req.params.id;
    const response = await axios.get(`${baseURL}/${accidentId}.json`, {
      params: {
        auth: 'PUBLIC',
        query: 'GetAccidentById'
      }
    });

    const accident = response.data || {};
    res.json({
      accidentId: accident.accidentId,
      location: accident.location,
      timestamp: accident.timestamp,
      police: {
        policeId: accident.police.policeId,
        station: accident.police.station
      },
      insurance: {
        insuranceId: accident.insurance.insuranceId,
        provider: accident.insurance.provider
      },
      ambulance: {
        ambulanceId: accident.ambulance.ambulanceId,
        location: accident.ambulance.location
      },
      medicalRecord: {
        hospitalId: accident.medicalRecord.hospitalId,
        name: accident.medicalRecord.name,
        medicalRecords: accident.medicalRecord.medicalRecords
      },
      hospital: {
        hospitalId: accident.hospital.hospitalId,
        name: accident.hospital.name,
        location: accident.hospital.location
      },
      vehicle: {
        vehicleId: accident.vehicle.vehicleId,
        registration: accident.vehicle.registration
},
      contact: {
        contactId: accident.contact.contactId,
        name: accident.contact.name,
        phoneNumber: accident.contact.phoneNumber,
        relationship: accident.contact.relationship
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new accident
app.post('/accidents', async (req, res) => {
  try {
    const accident = req.body;
    const response = await axios.post(baseURL, {
      auth: 'ADMIN',
      query: 'CreateAccident',
      accident: {
        accidentId: accident.accidentId,
        location: accident.location,
        timestamp: accident.timestamp,
        police: {
          policeId: accident.police.policeId,
          station: accident.police.station
        },
        insurance: {
          insuranceId: accident.insurance.insuranceId,
          provider: accident.insurance.provider
        },
        ambulance: {
          ambulanceId: accident.ambulance.ambulanceId,
          location: accident.ambulance.location
        },
        medicalRecord: {
          hospitalId: accident.medicalRecord.hospitalId,
          name: accident.medicalRecord.name,
          medicalRecords: accident.medicalRecord.medicalRecords
        },
        hospital: {
          hospitalId: accident.hospital.hospitalId,
          name: accident.hospital.name,
          location: accident.hospital.location
        },
        vehicle: {
          vehicleId: accident.vehicle.vehicleId,
          registration: accident.vehicle.registration
        },
        contact: {
          contactId: accident.contact.contactId,
          name: accident.contact.name,
          phoneNumber: accident.contact.phoneNumber,
          relationship: accident.contact.relationship
        }
      }
    });

    res.json({ accidentId: response.data.accidentId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update an existing accident
app.put('/accidents/:id', async (req, res) => {
  try {
    const accidentId = req.params.id;
    const accident = req.body;
    const response = await axios.put(`${baseURL}/${accidentId}.json`, {
      auth: 'ADMIN',
      query: 'UpdateAccident',
      accident: {
        location: accident.location,
        timestamp: accident.timestamp,
        police: {
          policeId: accident.police.policeId,
          station: accident.police.station
        },
        insurance: {
          insuranceId: accident.insurance.insuranceId,
          provider: accident.insurance.provider
        },
        ambulance: {
          ambulanceId: accident.ambulance.ambulanceId,
          location: accident.ambulance.location
        },
        medicalRecord: {
          hospitalId: accident.medicalRecord.hospitalId,
          name: accident.medicalRecord.name,
          medicalRecords: accident.medicalRecord.medicalRecords
        },
        hospital: {
          hospitalId: accident.hospital.hospitalId,
          name: accident.hospital.name,
          location: accident.hospital.location
        },
        vehicle: {
          vehicleId: accident.vehicle.vehicleId,
          registration: accident.vehicle.registration
        },
        contact: {
          contactId: accident.contact.contactId,
          name: accident.contact.name,
          phoneNumber: accident.contact.phoneNumber,
          relationship: accident.contact.relationship
        }
      }
    });

    res.json({ success: response.data.success });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete an accident
app.delete('/accidents/:id', async (req, res) => {
 try {
    const accidentId = req.params.id;
    const response = await axios.delete(`${baseURL}/${accidentId}.json`, {
      params: {
        auth: 'ADMIN',
        query: 'DeleteAccident'
      }
    });

    res.json({ success: response.data.success });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});