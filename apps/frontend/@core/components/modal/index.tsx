import useMediaQuery from '@core/hooks/useMediaQuery'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@core/components/ui/dialog'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@core/components/ui/drawer'
import { Button, ButtonProps } from '../ui/button'
import { DESKTOP_MEDIA } from '../../lib/helpers'

type ModalProps = {
    children?: React.ReactNode
    title?: string
    description?: string
    buttons?: ButtonProps[]
    isOpen: boolean
    toggleIsOpen: (value?: any) => void
}

function Modal({ isOpen, title, description, children, buttons, toggleIsOpen }: ModalProps) {
    const isDesktop = useMediaQuery(DESKTOP_MEDIA)

    if (isDesktop) {
        return (
            <Dialog open={isOpen} onOpenChange={toggleIsOpen}>
                <DialogContent className='sm:max-w-[425px]'>
                    {title && description && (
                        <DialogHeader>
                            {title && <DialogTitle>{title}</DialogTitle>}
                            {description && <DialogDescription>{description}</DialogDescription>}
                        </DialogHeader>
                    )}
                    {children && <div className='text-muted-foreground'>{children}</div>}
                    {buttons &&
                        buttons.map((button, index) => {
                            return <Button key={index} {...button} />
                        })}
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={isOpen} onOpenChange={toggleIsOpen}>
            <DrawerContent>
                <DrawerHeader>
                    {title && <DrawerTitle>{title}</DrawerTitle>}
                    {description && <DrawerDescription>{description}</DrawerDescription>}
                </DrawerHeader>
                {children && <div className='py-4 px-4 text-muted-foreground'>{children}</div>}
                <DrawerFooter>
                    {buttons &&
                        buttons.map((button, index) => {
                            return <Button key={index} {...button} />
                        })}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default Modal
