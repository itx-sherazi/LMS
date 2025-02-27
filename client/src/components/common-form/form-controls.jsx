



import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function FormControl({ formControls = [], formData, setFormData }) {
  
    function renderComponentByType(getControlItem) {
        let element = null;
        const currenControlItemValue = formData[getControlItem.name] || "";
        switch (getControlItem.componentType) {
            case "input":
              return <Input 
              {...getControlItem} 
              onChange={(e) => setFormData({...formData, [getControlItem.name]: e.target.value})}
              value={currenControlItemValue}
               />;
            case "select":
              return (
                <Select 
                  value={currenControlItemValue}
                  onValueChange={(val) => setFormData({...formData, [getControlItem.name]: val})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={getControlItem.label} />
                  </SelectTrigger>
                  <SelectContent>
                    {getControlItem.options?.map((optionItem) => (
                      <SelectItem key={optionItem.id} value={optionItem.id}>
                        {optionItem.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            case "textarea":
              return <Textarea {...getControlItem} 
              onChange={(e) => setFormData({...formData, [getControlItem.name]: e.target.value})}
              value={currenControlItemValue}
              
              />;
            default:
              return <Input 
              {...getControlItem}
              onChange={(e) => setFormData({...formData, [getControlItem.name]: e.target.value})}
                value={currenControlItemValue}
              
              />;
        }
    }

    return (
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div key={controlItem.name}>
            <Label htmlFor={controlItem.name}>{controlItem.label}</Label>
            {renderComponentByType(controlItem)}
          </div>
        ))}
      </div>
    );
}

export default FormControl;
