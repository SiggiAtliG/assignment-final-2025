import { datadogRum } from '@datadog/browser-rum';

export function initDatadogRum() {
  if (typeof window !== 'undefined') {
    datadogRum.init({
      applicationId: process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID || '',
      clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN || '',
      site: (process.env.NEXT_PUBLIC_DATADOG_SITE || 'datadoghq.com') as 'datadoghq.com' | 'datadoghq.eu' | 'us3.datadoghq.com' | 'us5.datadoghq.com' | 'ap1.datadoghq.com' | 'ddog-gov.com',
      service: 'tic-tac-toe',
      env: process.env.NODE_ENV,
      version: '1.0.0',
      sessionSampleRate: 100,
      sessionReplaySampleRate: 20,
      trackUserInteractions: true,
      trackResources: true,
      trackLongTasks: true,
      defaultPrivacyLevel: 'mask-user-input',
    });
    
    datadogRum.startSessionReplayRecording();
  }
}

// Don't initialize in development to avoid sending test data
if (process.env.NODE_ENV === 'production') {
  initDatadogRum();
} 