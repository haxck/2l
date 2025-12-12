import {
  Button, Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem, Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter, useDisclosure, Input, Card, CardHeader, CardBody, CardFooter
} from '@nextui-org/react';
import { useState } from 'react';
export default function Menu({ SetCommemorations }: { SetCommemorations: (title: string, time: string) => void }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [title, setTitle] = useState(null)
  const [time, setTime] = useState(null)

  const onAction = () => {
    if (title === "" || title === null || time === null || time === "") {
      alert("请填写完整")
    } else {
      SetCommemorations(title,time)
      onOpenChange()
    }
  }
  return (
    <div>
      <Dropdown backdrop='blur'>
        <DropdownTrigger>
          <button 
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg fixed bottom-8 right-8 text-2xl pb-1 font-bold w-14 h-14 rounded-full flex items-center justify-center"
            aria-label="添加"
          >
            +
          </button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem 
            onPress={() => {
              setTitle('');
              setTime('');
              onOpen();
            }} 
            key="remember"
          >
            纪念日
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">添加新的纪念日</ModalHeader>
              <ModalBody>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input 
                    key="remember" 
                    type="text" 
                    label="纪念日名称：" 
                    placeholder="什么纪念日呢？" 
                    size='lg' 
                    required 
                    onBlur={(value) => {
                      setTitle(value.target.value)
                    }} 
                  />
                </div>
                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Input 
                    key="time" 
                    type="date" 
                    label="哪一天？" 
                    placeholder=' ' 
                    size='lg' 
                    isRequired 
                    onBlur={(value) => {
                      setTime(value.target.value)
                    }} 
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  取消
                </Button>
                <Button color="primary" onPress={onAction}>
                  添加
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )

}

