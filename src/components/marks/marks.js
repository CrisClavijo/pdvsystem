import React, { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useFormik } from 'formik';
import { classNames } from 'primereact/utils';
import { Toast } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dialog } from 'primereact/dialog';


const MarksTable = () => {
    
    const categories = [
        {marca:'Nike', descripcion:'Tenis', estatus:'Activo'}
    ];
    const iconsOption = (rowData) =>{
        return(
            <div>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning btn-size me-2" aria-label="Editar" onClick={() => editProduct(rowData)}/>
                <Button icon="pi pi-trash" className="p-button-rounded p-button-danger btn-size" aria-label="Eliminar" onClick={() => confirmDeleteProduct(rowData)}/>
            </div>
        )
    }
    let emptyProduct = {
        id: null,
        marca: '',
        descripcion: '',
        estado: null
    };

    const [products, setProducts] = useState(categories);
    const [productDialog, setProductDialog] = useState(false);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef(null);
    const dt = useRef(null);
    

    const openNew = () => {
        setProduct(emptyProduct);
        setSubmitted(false);
        setProductDialog(true);
    }
    const clearFilter = () =>{
        formik.resetForm();
    }

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }
    const saveProduct = () => { debugger;
        setSubmitted(true);

        if (product.marca.trim()) {
            let _products = [...products];
            let _product = {...product};
            if (product.id) {
                const index = findIndexById(product.id);

                _products[index] = _product;
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            }
            else {
                _product.id = createId();
                _product.image = 'product-placeholder.svg';
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    }

    const formik = useFormik({
        initialValues: {
            marca: '',
            estatus: null
        },
        validate: (data) => {

        }
    });

    const editProduct = (product) => {
        setProduct({...product});
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }
    const onCategoryChange = (e, name) => {debugger;
        let _product = {...product};
        _product[`${name}`] = e.value.name;
        setProduct(_product);
    }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = {...product};
        _product[`${name}`] = val;

        setProduct(_product);
    }

    const onInputNumberChange = (e, name) => {
        const val = e.value || 0;
        let _product = {...product};
        _product[`${name}`] = val;

        setProduct(_product);
    }
    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }
    const deleteProduct = () => {
        let _products = products.filter(val => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );

    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );

    return (
        <div className="grid categorie-catalog">
             <Toast ref={toast} />
            <div className="col-12 md:col-12">
                <div className="card">
                    <div className=' header-content'>
                        <h5>Catalogo de Marcas</h5>
                    </div>
                    <form onSubmit={formik.handleSubmit}>
                        <div className='d-flex flex-wrap'>
                            <div className="field col-lg-4 col-12 p-fluid">
                                <div>Marca</div>
                                <InputText type="search" placeholder='Marca' name="marca" value={formik.values.marca} onChange={formik.handleChange}/>
                            </div>
                            
                            <div className="field col-lg-4 col-12 p-fluid">
                                <div htmlFor="name1">Estatus</div>
                                <Dropdown placeholder='--Seleccione--' name="estatus" value={formik.values.estatus} onChange={formik.handleChange} /*options={countries} optionLabel="name"*//>
                            </div>
                            <div className='d-flex flex-wrap py-4'>
                                <Button label="Limpiar" className="p-button-warning me-1" icon='pi pi-pencil' iconPos='right' onClick={clearFilter}/>
                                <Button label="Nuevo" className="p-button-success me-1" icon='pi pi-plus' iconPos='right' onClick={openNew}/>
                            </div>
                        </div>
                    </form>
                    <div>
                        <DataTable value={products}  responsiveLayout="scroll"
                            dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown">
                            <Column field="marca" header="Marca"></Column>
                            <Column field="descripcion" header="Descripcion"></Column>
                            <Column field="estatus" header="Estatus"></Column>
                            <Column field="opciones" body={iconsOption} header="Opciones"></Column>
                        </DataTable>
                    </div>
                    <Dialog visible={productDialog} style={{ width: '450px' }} header="Detalles de marca" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="name">Marca</label>
                            <InputText id="marca" value={product.marca} onChange={(e) => onInputChange(e, 'marca')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.marca })} />
                            {submitted && !product.marca && <small className="p-error">marca is required.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="description">Descripcion</label>
                            <InputTextarea id="descripcion" value={product.descripcion} onChange={(e) => onInputChange(e, 'descripcion')} required rows={3} cols={20} />
                        </div>
                        <div className="field">
                            <label htmlFor="estado">Estado</label>
                            <Dropdown id="estado" name='estado' value={product.estado} onChange={(e) => onCategoryChange(e, 'estado')} required  optionLabel='name'/>
                        </div>
                    </Dialog>
                    <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                        <div className="confirmation-content">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                            {product && <span>Are you sure you want to delete <b>{product.nombre}</b>?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(MarksTable, comparisonFn);
