import { Checkbox, FormControlLabel } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function CheckBoxHandler({ e, changConditionHandler, medicalRecord ,setValCondition , valCondition}) {
    const [value, setValue] = useState(false);
    useEffect(()=>{
        setValCondition([])
        setValue(false)
    },[medicalRecord])
    useEffect(() => {
      
    medicalRecord.map((ev) => {
        
        if (e.itemId === ev.medicalItemId) {
            valCondition.push(ev.medicalItemId)
            // setValCondition([...new Set(valCondition)]);
            
        
        setValue(true);
        // setValCondition([...valCondition, ev.medicalItemId]);
        // if (valCondition.includes(Number(e.itemId))){
        //     setValCondition(valCondition.filter((event) => event !== Number(e.itemId)));
        // }else {
        //     setValCondition([...valCondition, Number(e.itemId)]);
        //   }
      }
    });
  }, [medicalRecord]);
  return (
    <>
      <div className="px-10">
        <FormControlLabel
          onChange={()=>{
            changConditionHandler(e)
            setValue(!value)
          }}
          control={<Checkbox checked={value} />}
          label={e.name}
          value={e.itemId}
        />
      </div>
    </>
  );
}
