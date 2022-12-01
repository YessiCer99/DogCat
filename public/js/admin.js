$(document).ready(function () {
    mostrarMascotas();
});

function addMascota() {
    console.log("agregar mascotas");
    let form = new FormData($("#formParte1")[0]);
    console.log(form);
    $.ajax({
        data: form,
        url:'php/addMascota.php',
        type: "POST",
        contentType: false,
        processData: false,
        beforesend: function () {},
        success: function(response) {
            var data2 = JSON.parse(response);
            console.log(data2);
            if (data2.response == "SUCCESS") {
                console.log("SUCCESS");
                alert(data2.detail);
                window.location.reload();
              } else {
                alert('Ha ocurrido un error, intetelo mas tarde');
              }
        }
    });
}

function mostrarMascotas() {
    console.log("mostra mascota");
    $.ajax({
        data: {I:"D"},
        url:'php/selectMascota.php',
        type: "POST",
        contentType: false,
        processData: false,
        beforesend: function () {},
        success: function(response) {
            var data2 = JSON.parse(response);
            console.log(data2);
            if (data2!=null) {
                //Si se obtuvieron los datos correctos serán mostrados en pantalla
                if (data2.response == "SUCCESS") {
                  console.log("SUCCESS");
                  let tab = document.getElementById('tab-body');
                  let values = data2.detail;
                  values.forEach(element => {
                    tab.innerHTML += `
                        <tr>
                            <td>${element.nombre}</td>
                            <td>${element.talla}</td>
                            <td>${element.edad}</td>
                            <td>${element.color}</td>
                            <td>${element.sexo}</td>
                            <td>${element.esterilizado}</td>
                            <td><img alt="image" class="thumbnail" src="${element.foto}"></td>
                            <td>${element.raza}</td>
                            <td>
                                <button onclick="deleteMascota(${element.id})" class="action-delete"><span class="icon-delete"></span>Eliminar</button>
                            </td>
                        </tr>
                    `;
                  });
                } else {
                  alert('Ha ocurrido un error, vuelva mas tarde');
                  window.location= 'index.php';
                }
            }else{
                alert('Ha ocurrido un error, intetelo mas tarde');
                window.location= 'index.php';
            }
        }
    });
}

function deleteMascota(idMascota) {
    console.log("eliminar mascotas");
    console.log(idMascota);

    $.post('php/deleteMascota.php',{id:idMascota},function(data){
        //Aqui se obtiene la respuesta 
        var data2 = JSON.parse(data);
        console.log(data2);
        if (data2!=null) {
            //Si se obtuvieron los datos correctos serán mostrados en pantalla
            if (data2.response == "SUCCESS") {
              console.log("SUCCESS");
              alert(data2.detail);
              window.location.reload();
            } else {
              alert('Ha ocurrido un error, intetelo mas tarde');
              window.location.reload();
            }
        }else{
            alert('Ha ocurrido un error, intetelo mas tarde');
            window.location= 'index.php';
        }
    });
}

