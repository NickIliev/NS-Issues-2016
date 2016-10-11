var cameraModule = require("camera");
var imageModule = require("ui/image");
var view = require("ui/core/view");
var dialogs = require("ui/dialogs");
var layouts = require("ui/scroll-view");
var frameModule = require("ui/frame");
var topmost = frameModule.topmost();
var imageSourceModule = require("image-source");
var fileSystemModule = require("file-system");
var Observable = require("data/observable").Observable;
var ObservableArray = require("data/observable-array").ObservableArray;
var platform = require("platform");
var bghttp = require("nativescript-background-http");

var model = new Observable();
model.reddit = new ObservableArray([]);

var enums = require("ui/enums");

var page, campofoto, peso, partes, fecha, ubicacion, comentarios, idsesion, clear, iddocumento;

exports.NavigatedTo = function (args) {
    model.reddit.length = 0;

    page = args.object;

    page.bindingContext = model;

    var data = page.navigationContext;
    idsesion = data.idsesion;
    clear = data.clear;
    iddocumento = data.id;
}

exports.tomafoto = function () {
    try {
        var filename = 'cameraPicture_' + "0" + new Date().getUTCDate() + ((new Date().getMonth()) + 1) + new Date().getFullYear() + new Date().getHours() + new Date().getMinutes() + new Date().getSeconds() + '.jpg';
        cameraModule.takePicture({ width: 800, height: 800, keepAspectRatio: true }).then(function (picture) {
            try {
                var savepath = "/root/sdcard/Android/data/com.telerik.Aintercarga/files";
                var filepath = fileSystemModule.path.join(savepath, filename);
                alert(filepath);
                var url = "https://www.impeltechnology.com/rest/api/setBinaryData";
                var params = "sessionId=" + idsesion + "&fieldName=file&id=5834068&contentType=image/jpeg&fileName=foto.jpeg&output=json";

                var session = bghttp.session("image-upload");
                var request = {
                    url: url + params,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/octet-stream",
                        "File-Name": filename
                    }
                };

                var task = session.uploadFile("file://" + filepath, request);

                task.on("progress", logEvent);
                task.on("error", logEvent);
                task.on("complete", logEvent);

                model.reddit.push({
                    foto: picture
                });
            } catch (f) {
                alert(f);
            }
        }, function onRejected(error) {
            alert(error);
        });
    } catch (t) {
        alert(t);
    }
}
function logEvent(e) {
    alert(inspeccionar(e));
}
exports.guardar = function () {
    try {
        peso = view.getViewById(page, "peso");
        partes = view.getViewById(page, "partes");
        //fecha = view.getViewById(page, "fecha");
        ubicacion = view.getViewById(page, "ubicacion");
        comentarios = view.getViewById(page, "comentarios");

        maderos = view.getViewById(page, "maderos");
        abollado = view.getViewById(page, "abollado");
        humedo = view.getViewById(page, "humedo");
        recintado = view.getViewById(page, "recintado");
        recintadosdian = view.getViewById(page, "recintadosdian");

        abierto = view.getViewById(page, "abierto");
        rotos = view.getViewById(page, "rotos");
        malestadoembalaje = view.getViewById(page, "malestadoembalaje");
        aparentementehuellasdesaqueo = view.getViewById(page, "aparentementehuellasdesaqueo");
        destilandocontenido = view.getViewById(page, "destilandocontenido");

        mostrandocontenido = view.getViewById(page, "mostrandocontenido");
        piezasrayadas = view.getViewById(page, "piezasrayadas");
        maquinasabolladas = view.getViewById(page, "maquinasabolladas");

        peso = peso.text;
        partes = partes.text;
        //fecha = fecha.text;
        ubicacion = ubicacion.text;
        comentarios = comentarios.text;

        maderos = maderos.checked;
        abollado = abollado.checked;
        humedo = humedo.checked;
        recintado = recintado.checked;
        recintadosdian = recintadosdian.checked;
        abierto = abierto.checked;
        rotos = rotos.checked;
        malestadoembalaje = malestadoembalaje.checked;
        aparentementehuellasdesaqueo = aparentementehuellasdesaqueo.checked;
        destilandocontenido = destilandocontenido.checked;
        mostrandocontenido = mostrandocontenido.checked;
        piezasrayadas = piezasrayadas.checked;
        maquinasabolladas = maquinasabolladas.checked;

        var novedades = "";
        if (maderos == true) {
            novedades += ", Maderos";
        }
        if (abollado == true) {
            novedades += ", Abollado";
        }
        if (humedo == true) {
            novedades += ", Humedo";
        }
        if (recintado == true) {
            novedades += ", Recintado";
        }
        if (recintadosdian == true) {
            novedades += ", Recintados Dian";
        }
        if (abierto == true) {
            novedades += ", Abierto";
        }
        if (rotos == true) {
            novedades += ", Rotos";
        }
        if (malestadoembalaje == true) {
            novedades += ", Mal estado embalaje";
        }
        if (aparentementehuellasdesaqueo == true) {
            novedades += ", Aparentemente huellas de saqueo";
        }
        if (destilandocontenido == true) {
            novedades += ", Destilando Contenido";
        }
        if (mostrandocontenido == true) {
            novedades += ", Mostrando Contenido";
        }
        if (piezasrayadas == true) {
            novedades += ", Piezas Rayadas";
        }
        if (maquinasabolladas == true) {
            novedades += ", Maquinas Abolladas";
        }

        if (novedades.indexOf(", ") == 0) {
            novedades = novedades.replace(", ", "");
            novedades = novedades.replace(/\s/g, "%20");
        }
        //fecha = fecha.replace("/", "%2f");
        //fecha = fecha.replace("/", "%2f");
        comentarios = comentarios.replace(/\s/g, "%20");

        if ((peso == "") || (ubicacion == "") || (partes == "")) { //|| (fecha == "")) {
            alerta();
        } else {
            var url = "https://www.impeltechnology.com/rest/api/createRecord?sessionId=" + idsesion + "&objName=aintpieces&useIds=false&Parts=" + partes + "&Received_Weight=" + peso + "&Location=" + ubicacion + "&Clear=" + clear + "&R298072=" + iddocumento + "&Comment_Ingreso=" + comentarios + "&Novedad=" + novedades + "&output=json"; // + "&Clear_Date=" + fecha;

            try {
                fetch(url).then(response => {
                    return response.json();
                }).then(function (r) {
                    alert(JSON.stringify(r));
                    if (r.status == "ok") {
                        var url = "https://www.impeltechnology.com/rest/api/createRecord?sessionId=" + idsesion + "&objName=aintimage&useIds=false&R319231=" + iddocumento + "&description=" + "Imagen" + "&output=json";
                        alert(iddocumento);
                        fetch(url).then(response => {
                            return response.json();
                        }).then(function (r) {
                            var ident = r.id;
                            alert(JSON.stringify(r));
                            if (r.status == "ok") {
                                model.reddit.forEach(function (item) {
                                    var imge = item.foto;
                                    var imgb64 = imge.toBase64String(enums.ImageFormat.jpeg, 10);
                                    var numero = Math.floor((Math.random() * 20) + 1);
                                    var nombre = "imagen" + numero + ".jpeg";
                                });
                            }
                        }, function (e) {
                            alert("2 " + e);
                        });
                    }
                }, function (e) {
                    alert(e);
                });
            } catch (j) {
                alert(j);
            }
        }
    } catch (k) {
        alert(k);
    }
}

function confirmacion() {
    dialogs.confirm({
        title: "Confirmación",
        message: "La información se ha guardado correctamente",
        okButtonText: "Aceptar"
    }).then(function (result) {
        topmost.goBack();
    });
}

function alerta() {
    dialogs.confirm({
        title: "No se pudo guardar",
        message: "Verifique la información suministrada",
        okButtonText: "Aceptar"
    }).then(function (result) { });
}
exports.volver = function () {
    topmost.goBack();
}
exports.selecciona = function (args) {
    try {
        dialogs.confirm({
            title: "Confirmación",
            message: "¿Desea borrar la imagen seleccionada?",
            okButtonText: "Aceptar",
            cancelButtonText: "Cancelar"
        }).then(function (result) {
            if (result) {
                model.reddit.splice(args.index, 1);
            }
        });
    } catch (a) {
        alert(a);
    }
}

function inspeccionar(obj) {
    try {
        var msg = '';
        for (var property in obj) {
            if (typeof obj[property] == 'function') {
                var inicio = obj[property].toString().indexOf('function');
                var fin = obj[property].toString().indexOf(')') + 1;
                var propertyValue = obj[property].toString().substring(inicio, fin);
                msg += (typeof obj[property]) + ' ' + property + ' : ' + propertyValue + ' ;\n';
            } else if (typeof obj[property] == 'unknown') {
                msg += 'unknown ' + property + ' : unknown ;\n';
            } else {
                msg += (typeof obj[property]) + ' ' + property + ' : ' + obj[property] + ' ;\n';
            }
        }
        return (msg);
    } catch (e) {
        alert(e);
    }
}

function subirfoto(imagen) {
    try {
        imagen = imagen.toBase64String("jpeg", 10);

        var url = "https://www.impeltechnology.com/rest/api/setBinaryData";
        var params = "sessionId=" + idsesion + "&fieldName=file&id=5834068&value=" + imagen + "&contentType=image/jpeg&fileName=foto.jpeg&output=json";

        var bghttp = require("nativescript-background-http");

        var session = bghttp.session("image-upload");

        var request = {
            url: "https://www.impeltechnology.com/rest/api/setBinaryData?" + params,

            method: "POST",
            headers: {
                "Content-Type": "application/octet-stream",
                "File-Name": "Img.jpg"
            },
            description: "{ 'uploading': 'Img.jpg' }"
        };

        var task = session.uploadFile(imagen, request);

        task.on("progress", logEvent);
        task.on("error", logEvent);
        task.on("complete", logEvent);

        function logEvent(e) {
            alert(inspeccionar(e));
        }

    } catch (k) {
        alert(k);
    }

}
