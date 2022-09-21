import React, { useState, useEffect, useRef } from 'react';
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ProductService } from '../service/ProductService';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const FormLayoutDemo = () => {
    const productsTable = [
        {nombre:'aceite', codigo:'62107278B8A51', pCompra:'$12.00', pVenta:'$22.00', descripcion:'Abarrotes', categoria:'Cajas', unidad:'Pieza', marca:'', medida: '', ubicacion:'Pasillo A, Estante AA', stock:'1', estado:'Activo'}
    ];
    let emptyProduct = {
        id: null,
        nombre: '',
        codigo: '',
        pCompra: 0,
        pVenta: 0,
        descripcion: '',
        categoria: null,
        unidad : null,
        marca: null,
        medida: null,
        ubicacion: '',
        stock: 0,
        estado: null
    };

    const [products, setProducts] = useState(productsTable);
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

    const hideDialog = () => {
        setSubmitted(false);
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }

    const saveProduct = () => {
        setSubmitted(true);

        if (product.name.trim()) {
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

    const editProduct = (product) => {
        setProduct({...product});
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        let _products = products.filter(val => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
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

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    }
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
            <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />

                <DataTable ref={dt} value={products} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    responsiveLayout="scroll">
                    <Column field="nombre" header="Nombre"></Column>
                    <Column field="codigo" header="Codigo"></Column>
                    <Column field="pCompra" header="P.Compra"></Column>
                    <Column field="pVenta" header="P.Venta"></Column>
                    <Column field="descripcion" header="Descripcion"></Column>
                    <Column field="categoria" header="Categoria"></Column>
                    <Column field="unidad" header="Unidad"></Column>
                    <Column field="marca" header="Marca"></Column>
                    <Column field="medida" header="Medida"></Column>
                    <Column field="ubicacion" header="Ubicacion"></Column>
                    <Column field="stock" header="Stock"></Column>
                    <Column field="estado" header="Estado"></Column>
                    <Column field="opciones" body={actionBodyTemplate} header="Opciones"></Column>
                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '450px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="name">Nombre</label>
                    <InputText id="name" value={product.nombre} onChange={(e) => onInputChange(e, 'nombre')} required autoFocus className={classNames({ 'p-invalid': submitted && !product.nombre })} />
                    {submitted && !product.nombre && <small className="p-error">Name is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="codigo">Codigo</label>
                    <InputText id="codigo" value={product.codigo} onChange={(e) => onInputChange(e, 'codigo')} required />
                    {submitted && !product.codigo && <small className="p-error">Codigo is required.</small>}
                </div>
                <div className="field">
                    <label htmlFor="categoria">Categoria</label>
                    <Dropdown id="categoria" value={product.categoria} onChange={(e) => onInputChange(e, 'categoria')} required />
                </div>
                <div className="field">
                    <label htmlFor="description">Description</label>
                    <InputTextarea id="description" value={product.description} onChange={(e) => onInputChange(e, 'description')} required rows={3} cols={20} />
                </div>
                <div className="field">
                    <label htmlFor="unidad">Unidad</label>
                    <Dropdown id="unidad" value={product.unidad} onChange={(e) => onInputChange(e, 'unidad')} required />
                </div>
                <div className="field">
                    <label htmlFor="marca">Marca</label>
                    <Dropdown id="marca" value={product.marca} onChange={(e) => onInputChange(e, 'marca')} required />
                </div>
                <div className="field">
                    <label htmlFor="medida">Medida</label>
                    <Dropdown id="medida" value={product.medida} onChange={(e) => onInputChange(e, 'medida')} required />
                </div>
                <div className="field">
                    <label htmlFor="ubicacion">Ubicacion</label>
                    <InputTextarea id="ubicacion" value={product.ubicacion} onChange={(e) => onInputChange(e, 'ubicacion')} required rows={3} cols={20} />
                </div>
                <div className="field">
                    <label htmlFor="estado">Estado</label>
                    <Dropdown id="estado" value={product.estado} onChange={(e) => onInputChange(e, 'estado')} required />
                </div>
                <div className="formgrid grid">
                    <div className="field col">
                        <label htmlFor="pCompra">Precio compra</label>
                        <InputNumber id="pCompra" value={product.pCompra} onValueChange={(e) => onInputNumberChange(e, 'pCompra')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="pVenta">Precio Venta</label>
                        <InputNumber id="pVenta" value={product.pVenta} onValueChange={(e) => onInputNumberChange(e, 'pVenta')} mode="currency" currency="USD" locale="en-US" />
                    </div>
                    <div className="field col">
                        <label htmlFor="stock">Stock</label>
                        <InputNumber id="stock" value={product.stock} onValueChange={(e) => onInputNumberChange(e, 'stock')} integeronly />
                    </div>
                </div>
            </Dialog>
            <Dialog visible={deleteProductDialog} style={{ width: '450px' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem'}} />
                    {product && <span>Are you sure you want to delete <b>{product.nombre}</b>?</span>}
                </div>
            </Dialog>
        </div>
    );
}
                            

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(FormLayoutDemo, comparisonFn);
