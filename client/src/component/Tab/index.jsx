import './styles.scss'

export const Tab = ({ tabs, active, onChange }) => {

  return (
    <div className='tab-wrapper'>
      <div className="tab-wrapper--header">
        {tabs.map((tab, index) => (
          <div
            key={index}
            onClick={() => onChange(tab.key)}
            className={`tab-item ${active === tab.key ? 'tab-item--active' : ''}`}
          >
            {tab.title}
          </div>
        ))}
      </div>
    </div>
  )
}
