import AddMarker from '@/components/AddMarker'
import MapComponent from '@/components/MapComponent'
import MarkerList from '@/components/MarkerList';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export default function Home() {
  return (
    <div className="h-screen w-screen flex">
      <ThemeSwitcher/>
      <MarkerList/>
      <AddMarker/>
      <MapComponent/>
    </div>
  )

}
