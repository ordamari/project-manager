import IconName from '@/types/icon-name.type'
import Dashboard from './svg/dashboard.svg'
import Close from './svg/close.svg'
import Menu from './svg/menu.svg'
import Language from './svg/language.svg'
import Dark from './svg/dark.svg'
import Light from './svg/light.svg'
import Edit from './svg/edit.svg'
import ArrowUp from './svg/arrow-up.svg'
import ArrowBottom from './svg/arrow-bottom.svg'
import Table from './svg/table.svg'

type IconProps = {
  name: IconName
} & React.SVGProps<SVGSVGElement>
function Icon({ name, ...props }: IconProps) {
  switch (name) {
    case 'table':
      return <Table {...props} />
    case 'dashboard':
      return <Dashboard {...props} />
    case 'close':
      return <Close {...props} />
    case 'menu':
      return <Menu {...props} />
    case 'language':
      return <Language {...props} />
    case 'dark':
      return <Dark {...props} />
    case 'light':
      return <Light {...props} />
    case 'edit':
      return <Edit {...props} />
    case 'arrow-up':
      return <ArrowUp {...props} />
    case 'arrow-bottom':
      return <ArrowBottom {...props} />

    default:
      return null
  }
}

export default Icon
