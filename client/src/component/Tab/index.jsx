import React from 'react'
import './styles.scss'

export const Tab = ({ tabs }) => {
  return (
    <div className='tab-wrapper'>
      <div className="tab-wrapper--header">
        {tabs.map((tab, index) => (
          <div key={index} className='tab-item'>
            {tab.title}
          </div>
        ))}
      </div>
    </div>
  )
}
