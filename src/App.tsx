import { AppSidebar } from "@/components/app/app-sidebar"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { BrowserRouter, HashRouter } from 'react-router-dom' 
import { ThemeProvider } from './contexts/ThemeContext'
import Router from './Router'
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import data from "./pages/data.json"
import { Search, Settings, Bell, Sun } from "lucide-react"

const AppRouter = import.meta.env.VITE_USE_HASH_ROUTE === 'true' ? HashRouter : BrowserRouter

export default function App() {
  return (
    <ThemeProvider>
      <AppRouter>
        <div className="flex h-screen bg-background">
          {/* Main Content Area with Sidebar */}
          <div className="flex flex-1">
            <SidebarProvider>
              <AppSidebar />
              
              <SidebarInset className="flex-1">
                {/* Fixed Top Navigation Bar - Now inside SidebarInset */}
                <header className="sticky top-0 z-50 h-16 bg-background border-b border-border flex items-center justify-between px-10 py-4 shadow-md">
                  {/* Search Bar - Updated styling */}
                  <div className="flex items-center gap-4">
                    <SidebarTrigger className="-ml-4 mr-3" />
                     <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search or type command..."
                        className="pl-10 pr-4 py-2 border border-border rounded-lg w-80 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                    <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                        <Settings className="w-5 h-5 text-muted-foreground" />
                      </button>
                  </div>

                  {/* Right side icons - Updated styling */}
                  <div className="flex items-center gap-3">
                    <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                      <Bell className="w-5 h-5 text-muted-foreground" />
                    </button>
                    <ModeToggle />
                    <div className="w-8 h-8 bg-muted rounded-full"></div>
                  </div>
                </header>
                {/* Breadcrumb Header - Now below the header */}
                <div className="flex h-12 shrink-0 items-center gap-2 px-4 border-b border-border bg-background">
                  <div className="flex items-center gap-2">
                    
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                            <BreadcrumbLink href="#">
                                Dashboard
                            </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                            <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                </div>

                {/* Page Content */}
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            <Router />
                        </div>
                        <div className="px-4 lg:px-6 mb-6">
                            <ChartAreaInteractive />
                        </div>
                        <DataTable data={data} />
                    </div>
                </div>
                
              </SidebarInset>

            </SidebarProvider>
          </div>
        </div>
      </AppRouter>
    </ThemeProvider>
  )
}
