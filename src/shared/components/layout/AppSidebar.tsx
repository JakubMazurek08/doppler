'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  useSidebar,
} from '@/shared/components/ui/sidebar';
import { Gamepad2, Bot, Store, List, PlusSquare } from 'lucide-react';
import Image from 'next/image';

const links = [
  {
    title: 'Play Now',
    url: '#',
    icon: Gamepad2,
  },
  {
    title: 'Dopples',
    url: '#',
    icon: Bot,
  },
  {
    title: 'Dopple Market',
    url: '#',
    icon: Store,
  },
  {
    title: 'Sets',
    url: '#',
    icon: List,
  },
  {
    title: 'Create New Set',
    url: '#',
    icon: PlusSquare,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {open ? (
          <Image className="h-8 w-fit" src="/logo/logoFull.png" alt="Doppler" height={100} width={100} />
        ) : (
          <Image className="h-8 w-fit" src="/logo/logo.png" alt="Doppler" height={100} width={100} />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {links.map((link) => (
              <SidebarMenuItem key={link.title}>
                <SidebarMenuButton asChild>
                  <a href={link.url}>
                    <link.icon />
                    <span>{link.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
