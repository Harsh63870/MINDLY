import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import './Support.css';

const Support = () => {
  const [selectedCity, setSelectedCity] = useState('all');

  const mentalHealthHospitals = [
    {
      name: "National Institute of Mental Health and Neurosciences (NIMHANS)",
      location: "Bangalore, Karnataka",
      phone: "+91-80-2699-5000",
      website: "https://nimhans.ac.in",
      specializations: ["Psychiatry", "Psychology", "Neurology"],
      opdInfo: "OPD registration available online and walk-in",
      emergency: "24/7 Emergency Services Available"
    },
    {
      name: "All India Institute of Medical Sciences (AIIMS)",
      location: "New Delhi",
      phone: "+91-11-2658-8500",
      website: "https://www.aiims.edu",
      specializations: ["Psychiatry", "Clinical Psychology", "Child Psychiatry"],
      opdInfo: "Online appointment booking through AIIMS website",
      emergency: "24/7 Emergency Services Available"
    },
    {
      name: "Institute of Mental Health",
      location: "Chennai, Tamil Nadu",
      phone: "+91-44-2641-5555",
      website: "https://www.imhchennai.gov.in",
      specializations: ["Psychiatry", "Rehabilitation", "Community Mental Health"],
      opdInfo: "Walk-in OPD registration from 8 AM to 2 PM",
      emergency: "24/7 Emergency Services Available"
    },
    {
      name: "Central Institute of Psychiatry",
      location: "Ranchi, Jharkhand",
      phone: "+91-651-245-1114",
      website: "https://cipranchi.nic.in",
      specializations: ["Psychiatry", "Clinical Psychology", "Social Work"],
      opdInfo: "Online and offline OPD registration available",
      emergency: "24/7 Emergency Services Available"
    },
    {
      name: "Lokopriya Gopinath Bordoloi Regional Institute of Mental Health",
      location: "Tezpur, Assam",
      phone: "+91-3712-220-001",
      website: "https://www.lgbrihm.gov.in",
      specializations: ["Psychiatry", "Psychology", "Community Mental Health"],
      opdInfo: "OPD services from Monday to Friday",
      emergency: "24/7 Emergency Services Available"
    },
    {
      name: "Institute of Human Behaviour and Allied Sciences",
      location: "Delhi",
      phone: "+91-11-2258-6001",
      website: "https://www.ihbas.delhigovt.nic.in",
      specializations: ["Psychiatry", "Clinical Psychology", "Occupational Therapy"],
      opdInfo: "Online appointment system available",
      emergency: "24/7 Emergency Services Available"
    },
    {
      name: "Mental Health Institute",
      location: "Cuttack, Odisha",
      phone: "+91-671-235-8000",
      website: "https://www.mhicuttack.nic.in",
      specializations: ["Psychiatry", "Psychology", "Social Work"],
      opdInfo: "Walk-in OPD registration",
      emergency: "24/7 Emergency Services Available"
    },
    {
      name: "Regional Mental Hospital",
      location: "Mumbai, Maharashtra",
      phone: "+91-22-2493-7755",
      website: "https://www.rmhmumbai.org",
      specializations: ["Psychiatry", "Clinical Psychology", "Rehabilitation"],
      opdInfo: "OPD registration from 9 AM to 1 PM",
      emergency: "24/7 Emergency Services Available"
    }
  ];

  const crisisHelplines = [
    {
      name: "National Mental Health Helpline",
      number: "1800-599-0019",
      available: "24/7",
      description: "Government of India's mental health helpline"
    },
    {
      name: "Vandrevala Foundation",
      number: "1860-266-2345",
      available: "24/7",
      description: "Free mental health counseling and support"
    },
    {
      name: "iCall Helpline",
      number: "022-2556-3291",
      available: "Monday to Saturday, 8 AM to 10 PM",
      description: "Professional counseling for mental health issues"
    },
    {
      name: "Sneha Foundation",
      number: "044-2464-0050",
      available: "24/7",
      description: "Suicide prevention helpline"
    }
  ];

  const filteredHospitals = selectedCity === 'all' 
    ? mentalHealthHospitals 
    : mentalHealthHospitals.filter(hospital => 
        hospital.location.toLowerCase().includes(selectedCity.toLowerCase())
      );

  const handleHospitalClick = (hospital) => {
    window.open(hospital.website, '_blank');
  };

  const handleCallClick = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  return (
    <div className="support-container">
      <div className="container">
        <div className="support-header">
          <h1>Get Professional Support</h1>
          <p>Connect with mental health professionals and hospitals near you</p>
        </div>

        {/* Crisis Helplines */}
        <Card className="crisis-section" shadow="medium" padding="large">
          <h2>💔 Crisis Helplines (24/7 Available)</h2>
          <p className="crisis-note">
            If you're in immediate crisis or having thoughts of self-harm, please call these helplines immediately.
          </p>
          <div className="helplines-grid">
            {crisisHelplines.map((helpline, index) => (
              <div key={index} className="helpline-card">
                <h3>{helpline.name}</h3>
                <div className="helpline-number">
                  <span className="phone-icon">📞</span>
                  <a href={`tel:${helpline.number}`} className="phone-link">
                    {helpline.number}
                  </a>
                </div>
                <p className="helpline-available">{helpline.available}</p>
                <p className="helpline-description">{helpline.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Mental Health Hospitals */}
        <Card className="hospitals-section" shadow="medium" padding="large">
          <div className="section-header">
            <h2>🏥 Mental Health Hospitals & OPD Services</h2>
            <div className="filter-controls">
              <label htmlFor="city-filter">Filter by location:</label>
              <select 
                id="city-filter" 
                value={selectedCity} 
                onChange={(e) => setSelectedCity(e.target.value)}
                className="city-filter"
              >
                <option value="all">All Locations</option>
                <option value="delhi">Delhi</option>
                <option value="mumbai">Mumbai</option>
                <option value="bangalore">Bangalore</option>
                <option value="chennai">Chennai</option>
                <option value="kolkata">Kolkata</option>
                <option value="hyderabad">Hyderabad</option>
                <option value="pune">Pune</option>
              </select>
            </div>
          </div>

          <div className="hospitals-grid">
            {filteredHospitals.map((hospital, index) => (
              <Card key={index} className="hospital-card" shadow="light" padding="medium">
                <div className="hospital-header">
                  <h3>{hospital.name}</h3>
                  <span className="location-badge">{hospital.location}</span>
                </div>
                
                <div className="hospital-details">
                  <div className="contact-info">
                    <div className="phone-section">
                      <span className="phone-icon">📞</span>
                      <a href={`tel:${hospital.phone}`} className="phone-link">
                        {hospital.phone}
                      </a>
                    </div>
                    <div className="website-section">
                      <span className="website-icon">🌐</span>
                      <a 
                        href={hospital.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="website-link"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>

                  <div className="specializations">
                    <h4>Specializations:</h4>
                    <div className="specialization-tags">
                      {hospital.specializations.map((spec, idx) => (
                        <span key={idx} className="specialization-tag">{spec}</span>
                      ))}
                    </div>
                  </div>

                  <div className="opd-info">
                    <h4>OPD Information:</h4>
                    <p>{hospital.opdInfo}</p>
                  </div>

                  <div className="emergency-info">
                    <span className="emergency-badge">🚨 {hospital.emergency}</span>
                  </div>
                </div>

                <div className="hospital-actions">
                  <Button 
                    variant="primary" 
                    onClick={() => handleHospitalClick(hospital)}
                    className="action-btn"
                  >
                    Book OPD Appointment
                  </Button>
                  <Button 
                    variant="secondary" 
                    onClick={() => handleCallClick(hospital.phone)}
                    className="action-btn"
                  >
                    Call Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Self-Help Resources */}
        <Card className="resources-section" shadow="medium" padding="large">
          <h2>📚 Self-Help Resources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <h3>Meditation & Mindfulness</h3>
              <p>Learn breathing exercises and meditation techniques</p>
              <Button variant="secondary" className="resource-btn">
                Explore Resources
              </Button>
            </div>
            <div className="resource-card">
              <h3>Support Groups</h3>
              <p>Connect with others going through similar experiences</p>
              <Button variant="secondary" className="resource-btn">
                Find Groups
              </Button>
            </div>
            <div className="resource-card">
              <h3>Educational Content</h3>
              <p>Articles and videos about mental health</p>
              <Button variant="secondary" className="resource-btn">
                Read Articles
              </Button>
            </div>
          </div>
        </Card>

        {/* Important Notice */}
        <Card className="notice-section" shadow="medium" padding="large">
          <div className="notice-content">
            <h3>⚠️ Important Notice</h3>
            <p>
              This information is provided for reference purposes only. Always consult with qualified mental health professionals for diagnosis and treatment. 
              In case of emergency, please contact emergency services (112) or visit the nearest hospital immediately.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Support;
