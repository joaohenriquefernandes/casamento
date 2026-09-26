import { PlayerDeMusica } from './components/PlayerDeMusica/PlayerDeMusica'
import { SeletorDeTema } from './components/SeletorDeTema/SeletorDeTema'
import { Banner } from './sections/Banner'
import { ContagemRegressiva } from './sections/ContagemRegressiva'
import { NossaHistoria } from './sections/NossaHistoria'
import { OGrandeDia } from './sections/OGrandeDia'
import { Versiculo } from './sections/Versiculo'

function App() {
  return (
    <>
      <SeletorDeTema />
      <PlayerDeMusica />

      <main>
        <Banner />
        <ContagemRegressiva />
        <OGrandeDia />
        <Versiculo />
        <NossaHistoria />
      </main>
    </>
  )
}

export default App
