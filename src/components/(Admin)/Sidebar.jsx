import React from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '../ui/sidebar';
import { LayoutDashboard, Package, ShoppingCart, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useSidebarContext } from '../../context/SidebarContext';

const AdminSidebar = () => {
  const { isOpen, setIsOpen } = useSidebarContext();
  
  const links = [
    {
      label: "Dashboard",
      href: "/admin",
      icon: (
        <LayoutDashboard className="text-[#2B2B2B] h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Products",
      href: "/admin/products",
      icon: (
        <Package className="text-[#2B2B2B] h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Orders",
      href: "/admin/orders",
      icon: (
        <ShoppingCart className="text-[#2B2B2B] h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Add Product",
      href: "/admin/add-product",
      icon: (
        <Plus className="text-[#2B2B2B] h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  
  return (
    <Sidebar open={isOpen} setOpen={setIsOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {isOpen ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: "Admin User",
              href: "#",
              icon: (
                <div className="h-7 w-7 flex-shrink-0 rounded-full bg-[#B3B3B3] flex items-center justify-center">
                  <span className="text-xs font-medium text-[#2B2B2B]">A</span>
                </div>
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
};

export const Logo = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-[#2B2B2B] py-1 relative z-20">
      <div className="h-5 w-6 bg-[#2B2B2B] rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-[#2B2B2B] whitespace-pre"
      >
        Kickoff Admin
      </motion.span>
    </div>
  );
};

export const LogoIcon = () => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-[#2B2B2B] py-1 relative z-20">
      <div className="h-5 w-6 bg-[#2B2B2B] rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </div>
  );
};

export default AdminSidebar; 