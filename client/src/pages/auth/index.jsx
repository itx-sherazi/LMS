import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CommonForm from '@/components/common-form';
import { signinFormControls, signUpFormControls } from '@/config';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthContext } from '@/context/auth-context';
function AuthPage() {
    const [activeTab, setActiveTab] = useState('signin');
    const {
      signInFormData,
      setSignInFormData,
      signUpFormData,
      setSignUpFormData,
      handleRegistrUser,
      handleLoginUser
    }= useContext(AuthContext)
    const handleTabChange = (newValue) => {
        setActiveTab(newValue);
    };
    
    
    function checIfSignInFormISValid(){
        return signInFormData && signInFormData.useremail !== '' && signInFormData.password !== ''
    }
   
    return ( 
        <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link to={'/'} className='flex items-center justify-center'>
        <GraduationCap className='h-8 w-8 mr-4'/>
        <span className='font-extrabold text-xl'>LMS LEARN</span>
        </Link>
      </header>
    <div className='flex items-center justify-center min-h-screen bg-background '>
   
    <Tabs
    value={activeTab}
    defaultValue='signin'
    onValueChange={handleTabChange}
    className='w-full max-w-md '
    >
        <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='signin'>Sign In</TabsTrigger>
            <TabsTrigger value='signup'>Sign Up</TabsTrigger>
        </TabsList>
        <TabsContent value='signin'>
          <Card className='p-6 space-y-4'>
            <CardHeader>
              <CardTitle>
                Sign In To Your account
              </CardTitle>
              <CardDescription>
                Enter your email and password to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
        <CommonForm FormControls={signinFormControls} isButtonDisabled={!checIfSignInFormISValid()} buttonText={'Sign In'} formData={signInFormData} setFormData={setSignInFormData} handleSubmit={handleLoginUser} />

            </CardContent>

          </Card>
        </TabsContent>
        <TabsContent value='signup'>
        <Card className='p-6 space-y-4'>
            <CardHeader>
              <CardTitle>
                Sign Up Your account
              </CardTitle>
              <CardDescription>
                Enter your username email and password and creat your accout
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
            <CommonForm FormControls={signUpFormControls}  buttonText={'Sign Up'}  handleSubmit={handleRegistrUser} formData={signUpFormData} setFormData={setSignUpFormData}/>


            </CardContent>

          </Card>

        </TabsContent>
        
    </Tabs>
  
    </div>
    </div>
     );
}

export default AuthPage;

