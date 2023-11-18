/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
	readonly FIREBASE_CREDENTIAL: string
	readonly SENDGRID_API_KEY: string
	readonly RECAPTCHA_API_KEY: string
}
  
interface ImportMeta {
	readonly env: ImportMetaEnv
}