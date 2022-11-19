console.log("H")

function onClick() {

  const fileField = document.querySelector('input[type="file"]');
  //const formData     = new FormData();
  const url_func = "https://1s4pf1fpk3.execute-api.us-east-2.amazonaws.com/test/syllabi-test";
  const url_image = "https://1s4pf1fpk3.execute-api.us-east-2.amazonaws.com/beta/nocors";
  getBase64(fileField.files[0]).then(function(data) {
    // I have to substring because the Base64 function adds weird header data at the front
    const bod = {
      "file": data.substring(28)
    }
    console.log(data)
    fetch(url_image, {
      method: 'POST',
      headers: {
      "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
      "X-Requested-With": "*"
    },
      body: JSON.stringify(bod)
    })
    .then(response => response.json())
    .then(response => console.log(response))
  });
  console.log(fileField.files[0])

  
  


  // fetch(url_func, {
  //   method: 'POST',
  //   //mode: "no-cors",
  //   // headers: {
  //   //   'content-type': 'application/pdf',
  //   //   // "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers",
  //   //   // "Access-Control-Allow-Origin": "*",
  //   //   // "Access-Control-Allow-Methods": "DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT",
  //   //   // "X-Requested-With": "*"
  //   // },
  //   body: formData
  // })
  //   .then((response) => response.json())
  //   .then((result) => {
  //     console.log('Success:', result);
  //   })
  //   .catch((error) => {
  //     console.error('Error:', error);
  //   });
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

//var file = document.querySelector('input[type="file"]').files[0];
