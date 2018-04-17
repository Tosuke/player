import firebase, { initialize as initializeFirebase } from '@/firebase'
import { initialize as initializeVue } from '@/initialize/vue'
import { processRedirectResult } from '@/auth'

async function main() {
  initializeFirebase()
  await processRedirectResult()
  initializeVue()
}

main()