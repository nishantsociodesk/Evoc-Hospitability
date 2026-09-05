/**
 * Utility to fetch user's GPS coordinates and reverse-geocode to a human-readable city and address.
 */
export async function fetchCurrentLocation() {
  if (!('geolocation' in navigator)) {
    throw new Error('Geolocation is not supported by your browser.');
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        let city = '';
        let state = '';
        let country = 'India';
        let formattedAddress = `Lat: ${latitude.toFixed(4)}, Long: ${longitude.toFixed(4)}`;

        try {
          // Attempt reverse geocode via OpenStreetMap Nominatim
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=14&addressdetails=1`,
            {
              headers: {
                'Accept-Language': 'en',
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            if (data && data.address) {
              city =
                data.address.city ||
                data.address.town ||
                data.address.suburb ||
                data.address.municipality ||
                data.address.county ||
                '';
              state = data.address.state || '';
              country = data.address.country || 'India';
              formattedAddress = [
                data.address.suburb || data.address.neighbourhood,
                city,
                state,
                country,
              ]
                .filter(Boolean)
                .join(', ');
            }
          }
        } catch (geoErr) {
          console.warn('Reverse geocoding lookup timed out or failed, using coordinates:', geoErr);
        }

        resolve({
          latitude,
          longitude,
          accuracy,
          city,
          state,
          country,
          address: formattedAddress || `Coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
          fetchedViaGeolocation: true,
        });
      },
      (error) => {
        let msg = 'Unable to retrieve your location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location access was denied. You can manually enter your city or address.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location information is currently unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'Location request timed out.';
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
}
