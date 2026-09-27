// Farmer Database: Pre-calibrated regional farm details mapped to accounts
// Uploaded and maintained for each registered farm sector

export const FARMER_PROFILES = {
  farmer: {
    username: 'farmer',
    farmerName: 'Bharanidharan',
    farmName: 'Bharanidharan Farm',
    location: 'Salem',
    acres: 3.5,
    crop: 'Tomato',
  },
  bharani: {
    username: 'bharani',
    farmerName: 'Bharanidharan',
    farmName: 'Bharanidharan Farm',
    location: 'Salem',
    acres: 3.5,
    crop: 'Tomato',
  },
  bharanidharan: {
    username: 'bharanidharan',
    farmerName: 'Bharanidharan',
    farmName: 'Bharanidharan Farm',
    location: 'Salem',
    acres: 3.5,
    crop: 'Tomato',
  },
  admin: {
    username: 'admin',
    farmerName: 'Admin Agri Specialist',
    farmName: 'Agronomy Research Center Farm',
    location: 'Salem',
    acres: 5.0,
    crop: 'Tomato',
  },
  ramesh: {
    username: 'ramesh',
    farmerName: 'Ramesh Kumar',
    farmName: 'Ramesh Farm',
    location: 'Salem',
    acres: 4.2,
    crop: 'Tomato',
  },
  murugan: {
    username: 'murugan',
    farmerName: 'Murugan',
    farmName: 'Murugan Organic Farm',
    location: 'Salem',
    acres: 2.8,
    crop: 'Chili',
  },
};

/**
 * Returns pre-calibrated farm data based on username/name entered.
 * If user enters any personal name, it formats their profile with that exact name.
 */
export function getFarmerProfile(inputUsername) {
  const cleanInput = (inputUsername || '').trim();
  const key = cleanInput.toLowerCase();

  if (FARMER_PROFILES[key]) {
    // If user explicitly typed a known key but we want their personal entered name:
    const profile = { ...FARMER_PROFILES[key] };
    if (key !== 'farmer' && key !== 'admin') {
      profile.farmerName = cleanInput;
      profile.farmName = `${cleanInput} Farm`;
    }
    return profile;
  }

  // Fallback for any newly entered farmer name
  const displayName = cleanInput.length > 0 ? cleanInput : 'Bharani';
  return {
    username: cleanInput || 'farmer',
    farmerName: displayName,
    farmName: `${displayName} Farm`,
    location: 'Salem',
    acres: 3.5,
    crop: 'Tomato',
  };
}
