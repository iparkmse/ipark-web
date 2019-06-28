/**
 * The context for user creds; used for getting
 * users' login status and license plates
 */

import { createContext } from 'react'

export const CredContext = createContext()
export const CredContextProvider = CredContext.Provider
export const CredContextConsumer = CredContext.Consumer
