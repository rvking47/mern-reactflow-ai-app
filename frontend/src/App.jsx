import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Flow from './components/Flow'

const App = () => {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Flow />} />
      </Routes>
    </div>
  )
}

export default App