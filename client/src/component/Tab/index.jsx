import React, { useState } from 'react'
import './styles.scss'

export const Tab = ({ tabs, active, onChange }) => {
  const [ activeTab, setActiveTab ] = useState(0);

  return (
    <div className='tab-wrapper'>
      <div className="tab-wrapper--header">
        {tabs.map((tab, index) => (
          <div 
          key={index} 
          onClick={()=> setActiveTab(index)}
          className={`tab-item ${activeTab === index ? 'tab-item--active' : ''}`}
          >
            {tab.title}
          </div>
        ))}
      </div>
    </div>
  )
}
