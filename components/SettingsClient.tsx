// components/SettingsClient.tsx
'use client';

import { updateNickname } from '@/lib/profile';
import { useState } from 'react'

type SettingsClientProps = {
  userEmail?: string | null;
  nickname?: string | null;
}

const SettingsClient = ({ userEmail, nickname }: SettingsClientProps) => {
  const [value, setValue] = useState(nickname ?? '')
  const [loading, setLoading] = useState(false)
  // console.log('nickname SettingsClient', nickname);
  
  const handleUpdate = async () => {
    setLoading(true)

    try {
      await updateNickname(value)
      alert('Nickname updated')
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='text-white'>
      <h1>Settings</h1>

      <p>user email: {userEmail}</p>
      <p>user nickname: {nickname}</p>

      <div className="mt-4">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="bg-gray-800 p-2 rounded"
        />

        <button
          onClick={handleUpdate}
          disabled={loading}
          className="ml-2 bg-blue-600 px-3 py-2 rounded"
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default SettingsClient