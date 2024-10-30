import { ModalEmpresa } from "./components/modals/ModalEmpresa/modalEmpresa"
import { ModalMostrarEmpresa } from "./components/modals/ModalMostrarEmpresa/modalMostrarEmpresa"
import { ModalMostrarSucursal } from "./components/modals/ModalMostrarSucursal/modalMostrarSucursal"
import { ModalSucursal } from "./components/modals/ModalSucursal/modalSucursal"
import { Footer } from "./components/ui/Footer/Footer"
import { AppRouter } from "./routes/AppRouter"


function App() {
  return (
    <>
      <AppRouter/>
    {/* <ModalEmpresa/> */}
    {/* <ModalSucursal/> */}
    {/* <ModalMostrarEmpresa/> */}
    {/* <ModalMostrarSucursal/> */}
    </>
  )
}

export default App
