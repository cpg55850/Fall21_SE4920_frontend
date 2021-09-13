import React from 'react'
import { BeatLoader } from 'react-spinners'
import styled from 'styled-components'

const Spinner = () => {
  return (
    <Wrapper>
      <BeatLoader loading />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 100px;
`

export default Spinner
