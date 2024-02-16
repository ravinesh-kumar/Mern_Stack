export async function addRecord(payload){
    let response = await fetch("/api/testimonial",{
        method:"post",
        headers:{
            // "content-type":"application/json",
            "Authorization": localStorage.getItem("token")
        },
        // body:JSON.stringify(payload)
        body:payload
    })
    return await response.json()
}
export async function getRecord(){
    let response = await fetch("/api/testimonial",{
        method:"get",
        headers:{
            "content-type":"application/json",
            // "Authorization": localStorage.getItem("token")
        }
    })
    return await response.json()
}
export async function updateRecord(payload){
    // console.log('update payload id is   ',{...payload});
    let response = await fetch("/api/testimonial/"+ payload.get("_id"),{
        method:"put",
        headers:{
            // "content-type":"application/json",
            "Authorization": localStorage.getItem("token")
        },
        // body:JSON.stringify(payload)
        body:payload
    })
    return await response.json()
}
export async function deleteRecord(payload){
    let response = await fetch("/api/testimonial/"+payload._id,{
        method:"delete",
        headers:{
            "content-type":"application/json",
            "Authorization": localStorage.getItem("token")
        }
    })
    return await response.json()
}