import { forwardRef } from "react"
const Input=forwardRef(function Input({label,TypeofInput},ref){
    return(
        <p className="InputContainer">
        <label className="InputLabel">{label}</label>
        <TypeofInput ref={ref} type={label==="Due Date"?"date":"text"}className={TypeofInput==="input"?"InputBar":"InputTextarea"}/>
        </p>
    )
});
export default Input;