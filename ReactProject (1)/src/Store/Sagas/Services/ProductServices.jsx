export async function addRecord(payload) {
  // let response = await fetch("/api/product", {
  //   method: "post",
  //   headers: {
  //     "content-type": "application/json",
  //     Authorization: localStorage.getItem("token"),
  //   },
  //   body: JSON.stringify(payload),
  // });
  // return await response.json();

  let response = await fetch("/api/product", {
    method: "post",
    headers: {
      Authorization: localStorage.getItem("token"),
    },
    body: payload,
  });
  return await response.json();
}
export async function getRecord() {
  let response = await fetch("/api/product", {
    method: "get",
    headers: {
      "content-type": "application/json",
    },
  });
  let x = await response.json();
  // console.log('PageLoad', x);
  return x;
}
export async function updateRecord(payload) {
  // console.log(`API update`,payload.get("_id"));
  let response = await fetch("http://localhost:8000/api/product/" + payload.get("_id"), {
    method: "put",
    headers: {
      // "content-type":"application/json",
      "Authorization": localStorage.getItem("token"),
    },
    body: payload,
  });
  var a = response.json()
  console.log(`from api `,a);
  return await a
  // var data = response.json()
  // var data2 =response
  // console.log(`API RESPONSE`,data);
  // console.log(`API RESPONSE data2`,data2);

  // return await getRecord(); 
  // console.log('====================================');
  // let x = await getRecord();
  // let y = x.data;
  // y = await JSON.parse(y);
  // console.log('my YY', x);
  
  // console.log('====================================');
  // return x;
}
export async function deleteRecord(payload) {
  let response = await fetch("/api/product/" + payload._id, {
    method: "delete",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  });
  return await response.json();
}

// let response = await fetch("/api/product/" + payload._id, {
//   method: "put",
//   headers: {
//     "content-type": "application/json",
//     Authorization: localStorage.getItem("token"),
//   },
//   body: JSON.stringify(payload),
// });
// return await response.json();
