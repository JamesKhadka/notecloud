import React from 'react'
import Notes from './Notes'
const Home = (props) => {
  const showAlert = props;
  return (
    <div >
      {/* notes is imported here */}
      <Notes showAlert={showAlert} />
    </div>


  )
}


export default Home
