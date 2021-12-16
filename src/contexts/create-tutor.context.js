import React from 'react'

const CreateTutorContext = React.createContext({})

export const CreateTutorProvider = CreateTutorContext.Provider
export const CreateTutorConsumer = CreateTutorContext.Consumer
export default CreateTutorContext