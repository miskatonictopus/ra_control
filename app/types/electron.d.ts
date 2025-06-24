export {}

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        invoke: (...args: any[]) => Promise<any>
        electronAPI: ElectronAPI;
      }
    }
  }

  interface ElectronAPI {
    guardarAsignatura: (filename: string, data: any) => Promise<void>;
    leerAsignaturasLocales: () => Promise<Asignatura[]>;
  }

  interface Asignatura {
    codigo: string;
    nombre: string;
    creditos?: number;
  }
}
