'use server'
import fs from 'fs';
import path from 'path';

export const GetFormList = async () => {
    const filePath = path.resolve(process.cwd(), 'data', 'database.json');
    const jsonData = await fs.readFileSync(filePath).toString();  
    const data = JSON.parse(jsonData);
    return data.forms
} 
export const GetFormById = async (id:string) => {
    const filePath = path.resolve(process.cwd(), 'data', 'database.json');
    const jsonData = await fs.readFileSync(filePath).toString();  
    const data = JSON.parse(jsonData);
    const form=data.forms.find((form:any)=>form.id===id)
    return form
} 
export const UpdateFormById = async (form:any) => {
    const filePath = path.resolve(process.cwd(), 'data', 'database.json');
    const jsonData = await fs.readFileSync(filePath).toString();  
    const data = JSON.parse(jsonData);
    const formIndex = data.forms.findIndex((f:any) => f.id === form.id);

    if (formIndex !== -1) {
        data.forms[formIndex] = form; // Update the whole form object
        await fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    }
    return true
} 