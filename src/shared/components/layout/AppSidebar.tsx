'use client';

import Image from 'next/image';
import { Gamepad2, Bot, Store, List, PlusSquare } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  useSidebar,
} from '@/shared/components/ui/sidebar';
import { Button } from '@/shared/components/ui/button';
import { useAuth } from '@/shared/hooks/useAuth';

const links = [
  {
    title: 'Play Now',
    url: 'play',
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
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {open ? (
          <Image className="h-8 w-fit" src="/logo/logoText.png" alt="Doppler" height={100} width={100} />
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
      <SidebarFooter>
        {user ? (
          <div className="flex items-center justify-between gap-2 text-xs">
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{user.email ?? 'Signed in'}</p>
            </div>
            <Button size="sm" variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-muted-foreground">Not signed in</span>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
