import React, { createContext, useContext } from 'react'

type Config = any

const ConfigContext = createContext<Config | null>(null)

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  const config = (typeof window !== 'undefined' && (window as any).APP_CONFIG) || {}
  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}

export const useConfig = () => {
  const context = useContext(ConfigContext)
  if (context === null) {
    throw new Error('useConfig 必须在 ConfigProvider 内部使用')
  }
  return context
}