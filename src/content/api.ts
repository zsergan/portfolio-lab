import { aboutData, contactData, experienceData } from './data';
import type { AboutData, ContactData, ExperienceEntry } from './data';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchAbout(): Promise<AboutData> {
  await delay(500);
  return aboutData;
}

export async function fetchExperience(): Promise<ExperienceEntry[]> {
  await delay(500);
  return experienceData;
}

export async function fetchContact(): Promise<ContactData> {
  await delay(500);
  return contactData;
}
