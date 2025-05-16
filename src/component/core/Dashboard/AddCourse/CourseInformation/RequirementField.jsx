import { set } from 'mongoose'
import React from 'react'
import { useEffect, useState } from 'react'

const RequirementField = ({name,label,register,errors,setValue,getValues}) => {
    const [requirement,setRequirement] = useState("")
    const [requirementList,setRequirementList] = useState([])
useEffect(()=>{
    register(name,{required:true,validate:(value)=>value.length>0})
},[])
useEffect(()=>{
    setValue(name,requirementList);
},[requirementList])
    const handleAddRequirement = () => {
        if(requirement){
            setRequirementList([...requirementList,requirement]);
            setRequirement("");
        }
    }
    const handleRemoveRequirement= (index)=>{
        const updatedRequiremenetList = [...requirementList]
        updatedRequiremenetList.splice(index,1);
        setRequirementList(updatedRequiremenetList);
     }
  return (
    <div>
         <label htmlFor="">{label}<sup>*</sup></label>
         <div>
            <input type="text" id={name} value={requirement}  onChange={(e)=>setRequirement(e.target.value)} className='w-full p-2 bg-richblack-300' />
            <button type='button' onClick={handleAddRequirement}
            className='font-semibold text-yellow-50' >Add</button>
         </div>
         {
            requirementList.length>0 && (
                <ul>
                    {
                        requirementList.map((item,index)=>(
                            <li key={index} className='flex items-center text-richblack-5' >
                                <span>{item}</span>
                                <button type='button' onClick={()=>handleRemoveRequirement(index)} className='text-xs text-pure-greys-300'  >clear</button>
                            </li>
                        ))
                    }
                </ul>
            )
         }
         {
            errors[name] && (
                <span>
                    {label} is required
                </span>
            )
         }
    </div>
  )
}

export default RequirementField
