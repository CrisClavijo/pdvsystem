import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useFormik } from 'formik';

const Settings = () =>{
    const formik = useFormik({
        initialValues: {
            nombre: '',
            razon: '',
            logo: '',
            direccion: '',
            rfc: '',
            telefono: '',
            celular: '',
            correo: '',
            iva: '',
            impresora:'',
            cliente: '',
            terminos: ''
        },
        validate: (data) => {

        }
    });
    return(
        <div className="grid categorie-catalog">
            <div className="col-12 md:col-12">
                <div className="card">
                    <div className=' header-content'>
                        <h5>Configuracion del sistema</h5>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='d-flex flex-wrap'>
                            <div className="field col-lg-4 col-12 p-fluid">
                                <div>Nombre</div>
                                <InputText type="search" placeholder='Nombre' name="nombre" value={formik.values.nombre} onChange={formik.handleChange}/>
                            </div>
                            <div className="field col-lg-4 col-12 p-fluid">
                                <div>Razon social</div>
                                <InputText type="search" placeholder='Nombre' name="nombre" value={formik.values.razon} onChange={formik.handleChange}/>
                            </div>
                            <div className="field col-lg-4 col-12 p-fluid">
                                <div>Logo url</div>
                                <InputText type="search" placeholder='Nombre' name="nombre" value={formik.values.logo} onChange={formik.handleChange}/>
                            </div>
                            <div className="field col-lg-4 col-12 p-fluid">
                                <div>Direccion</div>
                                <InputText type="search" placeholder='Nombre' name="nombre" value={formik.values.direccion} onChange={formik.handleChange}/>
                            </div>
                            <div className="field col-lg-4 col-12 p-fluid">
                                <div>RFC</div>
                                <InputText type="search" placeholder='Nombre' name="nombre" value={formik.values.rfc} onChange={formik.handleChange}/>
                            </div>
                            <div className="field col-lg-4 col-12 p-fluid">
                                <div>Telefono</div>
                                <InputText type="search" placeholder='Nombre' name="nombre" value={formik.values.telefono} onChange={formik.handleChange}/>
                            </div>
                            <div className="field col-lg-4 col-12 p-fluid">
                                <div>Celular</div>
                                <InputText type="search" placeholder='Nombre' name="nombre" value={formik.values.celular} onChange={formik.handleChange}/>
                            </div>
                            <div className="field col-lg-4 col-12 p-fluid">
                                <div>Correo</div>
                                <InputText type="search" placeholder='Nombre' name="nombre" value={formik.values.correo} onChange={formik.handleChange}/>
                            </div>
                            <div className="field col-lg-4 col-12 p-fluid">
                                <div>IVA</div>
                                <InputText type="search" placeholder='Nombre' name="nombre" value={formik.values.iva} onChange={formik.handleChange}/>
                            </div>
                            <div className="field col-lg-4 col-12 p-fluid">
                                <div>Impresora</div>
                                <InputText type="search" placeholder='Nombre' name="nombre" value={formik.values.impresora} onChange={formik.handleChange}/>
                            </div>
                            <div className="field col-lg-4 col-12 p-fluid">
                                <div>Cliente por defecto</div>
                                <InputText type="search" placeholder='Nombre' name="nombre" value={formik.values.cliente} onChange={formik.handleChange}/>
                            </div>
                            <div className="field col-lg-4 col-12 p-fluid">
                                <div>Terminos</div>
                                <InputText type="search" placeholder='Nombre' name="nombre" value={formik.values.terminos} onChange={formik.handleChange}/>
                            </div>
                            <div className='d-flex flex-wrap py-4'>
                                <Button label="Guardar" className="p-button-warning" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(Settings, comparisonFn);