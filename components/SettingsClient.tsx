// components/SettingsClient.tsx
import React from 'react'

type SettingsClientProps = {
  userEmail?: string | null;
}

const SettingsClient = ({userEmail}: SettingsClientProps) => {
  return (
    <div className='text-white'>
      <h1>Settings</h1>

      <p>user email: {userEmail}</p>
      {/* <p>user nickname: {nickname}</p> */}
    </div>
  )
}

export default SettingsClient