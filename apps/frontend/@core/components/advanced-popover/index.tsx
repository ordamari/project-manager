import useMediaQuery from '@/@core/hooks/useMediaQuery'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer'
import { PopoverContentProps, PopoverProps, PopoverTriggerProps } from '@radix-ui/react-popover'
import NONE_MOBILE_MATCH from '@/@core/constants/none-mobile-match.constant'

type AdvancedPopoverTriggerProps = PopoverTriggerProps
type AdvancedPopoverContentProps = Omit<PopoverContentProps, 'onAnimationEnd'>

type AdvancedPopoverProps = PopoverProps & {
    trigger?: AdvancedPopoverTriggerProps
    content?: AdvancedPopoverContentProps
}

function AdvancedPopover({ trigger, content, ...popDrawerProps }: AdvancedPopoverProps) {
    const isNoneMobile = useMediaQuery(NONE_MOBILE_MATCH)

    if (isNoneMobile) {
        return (
            <Popover {...popDrawerProps}>
                <PopoverTrigger {...trigger} />
                <PopoverContent {...content} />
            </Popover>
        )
    } else
        return (
            <Drawer {...popDrawerProps}>
                <DrawerTrigger {...trigger} />
                <DrawerContent {...content} />
            </Drawer>
        )
}

export default AdvancedPopover
