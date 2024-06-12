import React from 'react'
import { Feature } from '../../components'
import "./WhatGPT3.css"

const WhatGPT3 = () => {
  return (
    <div className='gpt3__whatgpt3 section__margin' id='wgpt3'>
      <div className='gpt3__whatgpt3-feature'>
      </div>
      <div className='gpt3__whatgpt3-heading'>
        <h1 className='gradient__text'>
          The possibilities are beyond what they used to be.
        </h1>
      </div>
      <div className='gpt3__whatgpt3-container'>
       <Feature title="Non-invasive" text="EyeGuard offers a non-intrusive approach, potentially aiding in early detection efforts." />
       <Feature title="Rapid-Results" text="The system is designed to provide quick feedback, allowing for timely intervention if necessary." />
       <Feature title="Focus on Safety" text="Our goal is to empower informed decisions and contribute to public safety by potentially helping to identify impaired individuals." />
      </div>
    </div>
  )
}

export default WhatGPT3