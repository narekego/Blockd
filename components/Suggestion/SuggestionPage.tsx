import React from 'react'
import SuggestionSearch from './SuggestionSearch'
import SuggestionBox from './SuggestionBox'
import SuggestionBody from './SuggestionBody'

function SuggestionPage() {
  return (
    <div className='max-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 border-x'>
        <SuggestionBox />
        <SuggestionSearch />
          {Array.from({ length: 5 }, (_, i) =>
            <SuggestionBody key={i} />
          )}
        
    </div>
  )
}

export default SuggestionPage