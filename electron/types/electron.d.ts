// app/types/electron.d.ts
export {}

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        invoke(channel: string, ...args: any[]): Promise<any>
      }
    }
    electronAPI: ElectronAPI
  }
  interface ElectronAPI {
    guardarAsignatura: (filename: string, data: any) => Promise<void>
  }
}