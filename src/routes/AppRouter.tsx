import { Route, Routes} from "react-router-dom"
import { Home } from "../components/screens/Home/Home"
import { Alergenos } from "../components/screens/Alergenos/Alergenos"
import { Productos } from "../components/screens/Productos/Productos"
import { Header } from "../components/ui/Header/Header"
import { Footer } from "../components/ui/Footer/Footer"
import Categoria from "../components/screens/Categorias/Categoria"

export const AppRouter = () => {
    return (
        <>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                {/* <Route path="/categorias/allCategoriasPorSucursal/:id" element={<Categorias/>}/> */}
                <Route path="/categorias/allCategoriasPorSucursal/:id" element={<Categoria/>}/>
                <Route path="/Productos" element={<Productos/>}/>
                <Route path="/Alergenos" element={<Alergenos/>}/>
            </Routes>
            <Footer/>
        </>
    )
}
