
Ext.form.Field.prototype.msgTarget = 'side';


//var bd = Ext.getBody();
//var otro = {"departamento":"valle","ciudad":"cali","suscriptor":"cableUnion","numero":"12"};//formato JSON

//var myData = [
//['Valle','Cali','Cable Union',2397],
//['Valle','Cali','Telmex',2360],
//['Antioquia','Medellin','Telmex',1600],
//['Cundinamarca','Bogota','ETB',2500],
//['Atlantico','Barranquilla','Telecaribe',140],
//['Atlantico','Barranquilla','Telmex',2145],
//['Antioquia','Medellin','UNE', 45],
//['Cundinamarca','Bogota','Telmex',2200],
//['Cundinamarca','Bogota','Telefonica',72],
//['Risaralda','Pereira','Cable Union',34],
//['Tolima','Ibague','Cable Union',340],
//['Valle','Cali','Telefonica',47]
//];


//var ds = new Ext.data.Record.create({
var pagina_requerida = false;

// var valores = gridForm.getValues(); 
//alert("NO hubo error");
var ds = new Ext.data.Store({
    reader: new Ext.data.ArrayReader({}, [
        
    {
            name: 'codigo'
        },
        {
            name: 'departamento'
        },

        {
            name: 'municipio'
        },

        {
            name: 'nombre'
        },

        {
            name: 'numero', 
            type: 'float'
        }

        ])
});

llamarasincrono("conexion/CargarTabla.php", ds);



function italic(value){
    return '<i>' + value + '</i>';
}


function change(val){
    if(val > 0){
        return '<span style="color:green;">' + val + '</span>';
    }else if(val < 0){
        return '<span style="color:red;">' + val + '</span>';
    }
    return val;
}

function llamarasincrono (url, id_contenedor)
{
    if (window.XMLHttpRequest)
    {
        // Si es Mozilla, Safari etc
        pagina_requerida = new XMLHttpRequest ();
           
    } else if (window.ActiveXObject)
{
        // pero si es IE
        try
        {
            pagina_requerida = new ActiveXObject ("Msxml2.XMLHTTP");
        }
        catch (e)
        {
            // en caso que sea una versión antigua
            try
            {
                pagina_requerida = new ActiveXObject ("Microsoft.XMLHTTP");
            }
            catch (e)
            {
            }
        }
    }
    else
        return false;
    pagina_requerida.onreadystatechange = function ()
    {
        // función de respuesta
        cargarpagina (pagina_requerida, id_contenedor);
    }
    pagina_requerida.open ('GET', url, true); // asignamos los métodos open y send
    pagina_requerida.send (null);
}
// todo es correcto y ha llegado el momento de poner la información requerida
// en su sitio en la pagina xhtml
    
    
function cargarpagina (pagina_requerida, id_contenedor)
{
    if (pagina_requerida.readyState == 4 )
    {
        infoBD = window.JSON.parse(pagina_requerida.responseText);
        ds.loadData(infoBD);
    //                document.getElementById (id_contenedor).innerHTML = pagina_requerida.responseText;
                
    }
        
}
	
function pctChange(val){
    if(val > 0){
        return '<span style="color:green;">' + val + '%</span>';
    }else if(val < 0){
        return '<span style="color:red;">' + val + '%</span>';
    }
    return val;
}
function insertar()
{
    var codigo= gridForm.getForm().findField("codigo").getValue();
    var departamento= gridForm.getForm().findField("departamento").getValue();
    var municipio= gridForm.getForm().findField("municipio").getValue();
    var nombre= gridForm.getForm().findField("nombre").getValue();
    var numero= gridForm.getForm().findField("numero").getValue();
    
    
    alert("Funcion insertar se capturaron los sigueinte datos "+ codigo +departamento +municipio + nombre + numero);
} 

function actualizar()
{
    
    
    alert("Funcion actualizar");
} 



function limpiar()
{
    
//    Ext.ComponentMgr.getCmp (Ext.getCmp);
//    var mostrar = Ext.ComponentMgr.getCmp("departamento").getValue();
//    alert("hola");
//    alert(mostrar);
    
//    var nombre_element = document.getElementById('departamento').valueOf();
    
    
//    alert("Funcion limpiar");
} 

var colModel = new Ext.grid.ColumnModel([
{
    id:'codigo', 
    header: "Codigo", 
    width: 180, 
    sortable: true, 
    locked:false, 
    dataIndex:'codigo'
},
{
    id:'departamento', 
    header: "Departamento", 
    width: 180, 
    sortable: true, 
    locked:false, 
    dataIndex: 'departamento'
},
{
    id:'municipio', 
    header: "Municipio", 
    width: 180, 
    sortable: true, 
    locked:false, 
    dataIndex: 'municipio'
    
},
{
    id:'nombre', 
    header: "Nombre del Prestador", 
    width: 150, 
    sortable: true, 
    locked:false, 
    dataIndex: 'nombre'
},
{
    id:'numero', 
    header: "Numero de Suscriptores", 
    width: 180, 
    sortable: true, 
    locked:false, 
    dataIndex: 'numero'
}
]);




var gridForm = new Ext.FormPanel({
    id: 'formulario',
    frame: true,
    labelAlign: 'left',
    //title: '',
    bodyStyle:'padding:5px',
    autoWidth: true,
    layout: 'column',
    items: [{
        columnWidth: 0.6,
        layout: 'fit',
        items: {
            xtype: 'grid',
            ds: ds,
            cm: colModel,
            sm: new Ext.grid.RowSelectionModel({
                singleSelect: true,
                listeners: {
                    rowselect: function(sm, row, rec) {
                        Ext.getCmp("formulario").getForm().loadRecord(rec);
												
                    }
                }
            }),
            autoExpandColumn: 'nombre',
            height: 300,
            title:'Suscriptores por Cable en Colombia',
            border: true,
            listeners: {
                render: function(g) {
                    g.getSelectionModel().selectRow(0);
                },
                delay: 10
            }
        }
    },{
        columnWidth: 0.4,
        xtype: 'fieldset',
        labelWidth: 150,
        title:'Detalles',
        defaults: {
            width: 300
        },
        defaultType: 'textfield',
        autoHeight: true,
        bodyStyle: Ext.isIE ? 'padding:0 0 5px 15px;' : 'padding:10px 15px;',
        border: false,
        style: {
            "margin-left": "10px", 
            "margin-right": Ext.isIE6 ? (Ext.isStrict ? "-10px" : "-13px") : "0" 
        },
        items: [
        {
            fieldLabel: 'Codigo',
            name: 'codigo', 
            width: 150 
            
            
        },
        {
            fieldLabel: 'Departamento',
            name: 'departamento', 
            width: 150
        },
        
        
        {
            fieldLabel: 'Municipio',
            name: 'municipio',
            width: 150
        },{
            fieldLabel: 'Nombre del Prestador',
            width: 150,
            name: 'nombre'
        },{
            fieldLabel: 'Numero de Suscriptores',
            name: 'numero',
            width: 150
            
        }],
    
        buttons : [{
            id: "ingresar", 
            text : "Crear", 
            scope : this, 
            handler: function()

            {
                insertar();
            }
        },

        {
            id: "actualizar", 
            text : "Actualizar", 
            scope : this, 
            handler: function(){
                actualizar();
            }
        },
        {
            id: "eliminar", 
            text : "Eliminar", 
            scope : this, 
            handler: 
                function()
            {  
                
                 xhr = new window.XMLHttpRequest();
                 
                                xhr.open("GET", "conexion/main.php?op=eliminar&codigo=" +gridForm.getForm().findField('codigo').getValue(), true);
//                                alert("linea 325");
                                xhr.onreadystatechange = function() {
//                                     alert("linea 327");
                                        if (xhr.readyState === 4) {
//                                             alert("linea 329");
                                               datos = window.JSON.parse(xhr.responseText);
//                                                alert("linea 331");
                                               ds.loadData(datos);
//                                               llamarasincrono("conexion/CargarTabla.php", ds);
//                                                alert("linea 333");
                                        }
                                }
                                xhr.send(null);
                
                
//                if(window.confirm('Desea eliminar el registro???')){
//                    var codigo= gridForm.getForm().findField("codigo").getValue();
//                    llamarasincrono("conexion/conexionBD.php?op=eliminar&codigo="+codigo,ds);
//
//                }
                
            }
        },
        {
            id: "clear", 
            text : "Limpiar", 
            scope : this, 
            handler: function(){
                limpiar();
            }
        }
        ],
    
    },{
        columnWidth: 0.4,
        height:230,
        style:'padding:0 0 0 25px;',
        html:'<div id="result"></div>'
        
            
    }]
//renderTo: bd
});

function eliminar()
{
    
    
 
    
    
    
} 




