$(document).ready(function () {
    mostrarSolicitudes();
});

function mostrarSolicitudes() {
    console.log("mostra solicitudes");
    $.ajax({
        data: {I:"D"},
        url:'php/selectSolAdp.php',
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
                    if (element.estatus==0) {
                        tab.innerHTML += `
                        <tr>
                            <td>${element.nombre}</td>
                            <td>${element.telefono}</td>
                            <td>${element.correo}</td>
                            <td>${element.razonAdoptar}</td>
                            <td>${element.razonVivira}</td>
                            <td>${element.nomMascota}</td>
                            <td><img alt="image" class="thumbnail" src="${element.foto}"></td>
                            <td>
                                <button onclick="updateSol(${element.id})"" >Confirmar</button>
                                <button onclick="deleteSol(${element.id})" class="action-delete"><span class="icon-delete"></span>Cancelar</button>
                            </td>
                        </tr>
                    `;
                    } else {
                        tab.innerHTML += `
                        <tr>
                            <td>${element.nombre}</td>
                            <td>${element.telefono}</td>
                            <td>${element.correo}</td>
                            <td>${element.razonAdoptar}</td>
                            <td>${element.razonVivira}</td>
                            <td>${element.nomMascota}</td>
                            <td><img alt="image" class="thumbnail" src="${element.foto}"></td>
                            <td>Completada</td>
                        </tr>
                    `;
                    }
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

function updateSol(idMascota) {
    $.post('php/updateSolAdp.php',{id:idMascota},function(data){
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

function deleteSol(idMascota) {
    $.post('php/deleteSolAdp.php',{id:idMascota},function(data){
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