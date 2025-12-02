/**
 * Generate a unique device ID based on browser fingerprint
 * This is used for one-device-per-user enforcement
 */
export function generateDeviceId(): string {
  // Check if device ID already exists in localStorage
  const existing = localStorage.getItem('device_id');
  if (existing) return existing;

  // Generate new device ID from browser characteristics
  const fingerprint = [
    navigator.userAgent,
    navigator.language,
    screen.width + 'x' + screen.height,
    new Date().getTimezoneOffset(),
    !!window.sessionStorage,
    !!window.localStorage,
  ].join('|');

  // Simple hash function
  let hash = 0;
  for (let i = 0; i < fingerprint.length; i++) {
    const char = fingerprint.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }

  const deviceId = Math.abs(hash).toString(36) + Date.now().toString(36);
  
  // Store for future use
  localStorage.setItem('device_id', deviceId);
  
  return deviceId;
}

/**
 * Get browser/device name for display
 */
export function getDeviceName(): string {
  const ua = navigator.userAgent;
  
  if (ua.includes('Chrome')) return 'Chrome Browser';
  if (ua.includes('Firefox')) return 'Firefox Browser';
  if (ua.includes('Safari')) return 'Safari Browser';
  if (ua.includes('Edge')) return 'Edge Browser';
  
  if (ua.includes('Mobile')) return 'Mobile Device';
  
  return 'Web Browser';
}