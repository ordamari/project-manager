import TNavItem from '@/types/nav-item.type'
import NavItem from '../nav-item'

type NavigationListProps = {
  navigation: TNavItem[]
  closeNavbar: () => void
}

function NavigationList({ navigation, closeNavbar }: NavigationListProps) {
  return (
    <ul className='list-none flex flex-col gap-2 pt-4'>
      {navigation.map(navItem => {
        return <NavItem navItem={navItem} key={navItem.path} closeNavbar={closeNavbar} />
      })}
    </ul>
  )
}

export default NavigationList
