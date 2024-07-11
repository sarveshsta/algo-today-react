import React from 'react'

const Headerr = ({headText}) => {
  return (
   <>
   
   <div className='container'>
          <h2 className='text-center'>{headText}</h2>
      </div></>
  )
}

export default React.memo(Headerr)