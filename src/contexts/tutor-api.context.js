import React from 'react'

const TutorAPIContext = React.createContext({})

export const TutorAPIProvider = TutorAPIContext.Provider
export const TutorAPIConsumer = TutorAPIContext.Consumer
export default TutorAPIContext