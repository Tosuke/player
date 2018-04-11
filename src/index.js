import { initializeFirebase } from '@/firebase'
import { initializeVue } from '@/initialize/vue'
import { processRedirectResult } from '@/auth'

initializeFirebase()
initializeVue()
processRedirectResult()