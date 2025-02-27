import axiosInstance from "@/api/axiosInstace";
import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { BarChart, Book, LogOut } from "lucide-react";
import { useState } from "react";

function InstructorDashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuuItems =[
    {
      icon:BarChart,
      label:"Dashboard",
      value:"dashboard",
      component:<InstructorDashboard/>
    },
    {
      icon:Book,
      label:"Courses",
      value:"courses",
      component:<InstructorCourses/>
    },
    {
      icon:LogOut,
      label:"Logout",
      value:"logout",
      component:null
    }
  ]

  const handleLogout = async () => {
    try {
      const response = await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
      console.log("Logout Response:", response);
  
      if (response.status === 200) {
        // Local storage clear karo
        localStorage.removeItem("authToken");  
        localStorage.removeItem("user");
  
        // Page reload ya redirect
        window.location.href = "/auth";  
      }
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };
  
  

  return (
    <div className="flex h-full min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4">
          <h1 className="text-lg font-bold mb-4">Instructor Dashboard</h1>
          <nav>
          {menuuItems.map((menuItem)=>(
            <Button className="w-full justify-start mb-2" key={menuItem.value}
            variant ={activeTab === menuItem.value ? "secondary" :"ghost"}
            onClick={menuItem.value === 'logout'? handleLogout:()=>setActiveTab(menuItem.value)}
            
            
            >
              <menuItem.icon className="mr-2 h-4 w-4"/>
              {menuItem.label}

            </Button>
          ))}
          </nav>
        </div>

      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-8"> Dashboard</h1>
<Tabs value={activeTab} onValueChange={setActiveTab} >
  {
    menuuItems.map(menuuItem=>
      <TabsContent value={menuuItem.value} >
        {menuuItem.component !== null ? menuuItem.component : null}
      </TabsContent>
    )
  }


</Tabs>
        </div>
      </main>
    
    </div>
  );
}

export default InstructorDashboardPage;
