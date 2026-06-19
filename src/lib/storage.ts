import { BusinessConfig } from '@/types';
import { DEFAULT_CONFIG } from './constants';

const CONFIG_KEY = 'wa-bot-config';
const API_KEY_KEY = 'wa-bot-api-key';

export function saveConfig(config: BusinessConfig): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Error saving config:', error);
  }
}

export function loadConfig(): BusinessConfig {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;
  try {
    const stored = localStorage.getItem(CONFIG_KEY);
    if (stored) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Error loading config:', error);
  }
  return DEFAULT_CONFIG;
}

export function saveApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    // Basic obfuscation with base64
    const encoded = btoa(key);
    localStorage.setItem(API_KEY_KEY, encoded);
  } catch (error) {
    console.error('Error saving API key:', error);
  }
}

export function loadApiKey(): string {
  if (typeof window === 'undefined') return '';
  try {
    const stored = localStorage.getItem(API_KEY_KEY);
    if (stored) {
      return atob(stored);
    }
  } catch (error) {
    console.error('Error loading API key:', error);
  }
  return '';
}

export function clearAll(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CONFIG_KEY);
  localStorage.removeItem(API_KEY_KEY);
}
