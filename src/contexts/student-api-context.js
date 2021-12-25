import React from 'react'

const StudentAPIContext = React.createContext({})

export const StudentAPIProvider = StudentAPIContext.Provider
export const StudentAPIConsumer = StudentAPIContext.Consumer
export default StudentAPIContext