import { Button } from "../ui/button";
import FormControl from "./form-controls";



function CommonForm({handleSubmit, buttonText, FormControls = [],formData,setFormData,isButtonDisabled = false}) {

    return ( 
        
        <form onSubmit={handleSubmit}>
            <FormControl formControls={FormControls} formData={formData} setFormData={setFormData} />



            <Button disabled={isButtonDisabled} type='submit' className="mt-5 w-full font-bold">{buttonText || 'submit'}</Button>
            
        </form>
     );
}

export default CommonForm;