import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'

const Progres = ({progressValue}) => {

  return (
    <Wrapper>
    <div className='progress-bar'>
        <div className='filler' style={{width:`${progressValue}%`, transition: 'width 1s ease-in' }}></div>
    </div>
    </Wrapper>
  )
}


const Wrapper = styled.div`
  .progress-bar {
    position: relative;
    height: 20px;
    width: 850px;
    border-radius: 50px;
    border: 1px solid black;
    background: rgba(39, 39, 42, 1);
  }
  .filler{
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(98.24deg, #6DDCFF 0%, #7F60F9 100%);
  }
`
export default React.memo(Progres)