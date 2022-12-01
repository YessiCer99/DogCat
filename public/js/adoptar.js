function reedireccionar(volAn) {
    if (volAn=="perro") {
        window.location= 'Catalogo_dogs.html';     
    } else if (volAn=="gato"){
      window.location= 'Catalogo_cats.html';
    } else {
      window.location= 'index.html';
    }
  }

  function addSolicitud() {
    let values = {
      idMascota : localStorage.getItem("idMascotaForSolicitarAdopcion"),
      nombre : document.querySelector("#valNombre").value,
      telefono : document.querySelector("#valTelefono").value,
      correo : document.querySelector("#valCorreo").value,      
      razonAdoptar : document.querySelector("#valR1").value,
      razonVivira : document.querySelector("#valR2").value
    };
    console.log(values);
    $.post('php/addSolicitudAdopcion.php',values,function(data){
      //Aqui se obtiene la respuesta 
      var data2 = JSON.parse(data);
      console.log(data2);
      if (data2!=null) {
          //Si se obtuvieron los datos correctos serán mostrados en pantalla
          if (data2.response == "SUCCESS") {
            console.log("SUCCESS");
            alert(data2.detail);
          } else {
            alert('Ha ocurrido un error, intetelo mas tarde');
          }
      }else{
          alert('Ha ocurrido un error, intetelo mas tarde');
          window.location= 'index.php';
      }
    });
  }