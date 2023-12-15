import * as Yup from "yup"

 export const itemSchema = Yup.object().shape({
    fullname : Yup.string().required("name is required"),
    photo : Yup.string().url("address is not valid").required("photo is required"),
    model : Yup.string().required("model is required"),
    desc : Yup.string().required("decription is required") , 
    cost : Yup.number().required("cost is required"),
    group : Yup.string().required("choose group is required")
})