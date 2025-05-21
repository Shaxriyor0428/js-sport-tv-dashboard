import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { DialogTitle } from "@radix-ui/react-dialog";

const Room = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);
  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-spanColor" href="/settings">
                  Настройки
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <span className="text-spanColor">/</span>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink className="text-spanColor" href="/settings">
                  Конфигурация
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <span className="text-spanColor">/</span>
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage className="text-textColor">
                  Комната
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button className="rounded-[20px]" type="button">
            <Plus />
            Добавить бронированию
          </Button>
        </div>
        <h1>Комната</h1>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2 bg-white">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>

      <Dialog open={isOpen} onOpenChange={handleOpen}>
        <DialogContent className="max-w-[550px] rounded-3xl pt-5 pb-10 bg-white max-h-[90vh] overflow-y-auto">
          <DialogTitle>
            <div className="flex justify-between gap-0 items-center px-0">
              <span></span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-black hover:text-gray-600 focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </DialogTitle>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Room;
