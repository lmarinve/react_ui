import React from 'react'
import DashHeader from '../components/DashHeader'
import DashModal from '../components/dashboard/DashModal'
import '../styles/dashboard.css'

const Dashboard = () => {
  return (
    <div className='dashboard-container animated fadeIn'>
      <DashHeader
          title="Dashboard"
      />
      <DashModal />
      <div className="welcome-back-btn">
        <i className="fal fa-plus" />
      </div>
    </div>
  )
}

export default Dashboard
