import AddMarker from '@/components/AddMarker'
import MarkerList from '@/components/MarkerList';
import NoSSRMapComponent from '@/components/NoSSRMapComponent';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';


export default function Home() {
  return (
    <div className="h-screen w-screen flex">
      <ThemeSwitcher />
      <MarkerList />
      <AddMarker />
      <NoSSRMapComponent />
    </div>
  )

}
