$(document).ready(function () {
    mostrarDonacion();
});

function addDonacion() {
    console.log("agregar mascotas");
    let values = {
        valNom:document.querySelector('#nombre').value,
        valTel:document.querySelector('#edad').value,
        valDon:document.querySelector('#talla').value,
        valDes:document.querySelector('#valDes').value
    };
    console.log(values);
    $.post('php/addDonacion.php',values,function(data){
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

function mostrarDonacion() {
    console.log("mostra mascota");
    $.ajax({
        data: {I:"D"},
        url:'php/selectDonacion.php',
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
                            <td>${element.telefono}</td>
                            <td>${element.tipo_donacion}</td>
                            <td>${element.descripcion}</td>
                            <td>${element.fechaF}</td>
                            <td>
                                <button onclick="deleteDonacion(${element.id})" class="action-delete"><span class="icon-delete"></span>Eliminar</button>
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

function deleteDonacion(idDonacion) {
    $.post('php/deleteDonacion.php',{id:idDonacion},function(data){
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