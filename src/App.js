import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './AppTopbar';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { AppConfig } from './AppConfig';


import ProductsTable from './components/products/products';
import CategoriesTable from './components/categories/categories';
import UnitTable from './components/unitMeasurement/unitMeasurement';
import LocationTable from './components/location/location';
import DecreaseTable from './components/decrease/decrease';
import MarksTable from './components/marks/marks';
import MeasuresTable from './components/measures/measures';
import EntrysTable from './components/entrys/entry';
import ProvidersTable from './components/providers/providers';
import CostumersTable from './components/costumers/customers';
import EmployeesTable from './components/employees/employees';
import RolesTable from './components/roles/roles';
import Settings from './components/settings/settings'
import Profile from './components/profile/profile'
import QuotationTable from './components/quotation/quotation';


//import Dashboard from './components/Dashboard';
import FormLayoutDemo from './components/FormLayoutDemo';


import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
    const [layoutMode, setLayoutMode] = useState('static');
    const [layoutColorMode, setLayoutColorMode] = useState('light')
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    }

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value)
    }

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode)
    }

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode)
    }

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    }

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === 'overlay') {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            }
            else if (layoutMode === 'static') {
                setStaticMenuInactive((prevState) => !prevState);
            }
        }
        else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    }

    const onSidebarClick = () => {
        menuClick = true;
    }

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    }

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    }

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    }
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const menu = [
        {
            label: 'Home',
            items: [{
                label: 'Dashboard', icon: 'pi pi-home', to: '/'
            }]
        },
        {
            label: 'Almacen', icon: 'pi pi-fw pi-sitemap',
            items: [
                { label: 'Productos', icon: 'pi pi-circle', to: '/products' },
                { label: 'Categorias', icon: 'pi pi-circle', to: '/categories' },
                { label: "Unidad de Medida", icon: "pi pi-circle", to: "/unit" },
                { label: "Ubicaciones", icon: "pi pi-circle", to: "/location" },
                { label: 'Merma', icon: 'pi pi-circle', to: '/decrease' },
                { label: 'Marcas', icon: 'pi pi-circle', to: '/marks' },
                { label: 'Medidas', icon: 'pi pi-circle', to: '/measures' },
            ]
        },
        {
            label: 'Entradas', icon: 'pi pi-fw pi-sitemap',
            items: [
                { label: 'Ingresos', icon: 'pi pi-money-bill', to: '/entrys' },
                { label: 'Provedores', icon: 'pi pi-car', to: '/providers' },
            ]
        },
        {
            label: 'Salidas', icon: 'pi pi-fw pi-sitemap',
            items: [
                { label: 'Ventas', icon: 'pi pi-fw pi-id-card', to: '/formlayout' },
                { label: 'Clientes', icon: 'pi pi-fw pi-check-square', to: '/costumers' },
            ]
        },
        {
            label: 'Acceso', icon: 'pi pi-fw pi-sitemap',
            items: [
                { label: 'Empleados', icon: 'pi pi-circle', to: '/employees' },
                { label: 'Roles', icon: 'pi pi-circle', to: '/roles' },
                { label: 'Configuracion', icon: 'pi pi-cog', to: '/settings' },
                { label: 'Perfil', icon: 'pi pi-user', to: '/profile' },
            ]
        },
        {
            label: 'Cotizacion', icon: 'pi pi-fw pi-sitemap',
            items: [
                { label: 'Sencilla', icon: 'pi pi-fw pi-id-card', to: '/quotation' },
            ]
        },
        {
            label: 'Miscelanea', icon: 'pi pi-fw pi-sitemap',
            items: [
                { label: 'Codigo Barras', icon: 'pi pi-fw pi-id-card', to: '/formlayout' },
            ]
        },
    ];

    const addClass = (element, className) => {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'
    });

    return (
        <div className={wrapperClass} onClick={onWrapperClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode}
                mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    {/*<Route path="/" exact render={() => <Dashboard colorMode={layoutColorMode} location={location} />} />*/}
                    <Route path="/products" component={ProductsTable}/>
                    <Route path="/categories" component={CategoriesTable}/>
                    <Route path="/unit" component={UnitTable}/>
                    <Route path="/location" component={LocationTable}/>
                    <Route path="/decrease" component={DecreaseTable}/>
                    <Route path="/marks" component={MarksTable} />
                    <Route path="/measures" component={MeasuresTable} />
                    <Route path="/entrys" component={EntrysTable}/>
                    <Route path="/providers" component={ProvidersTable}/>
                    <Route path="/costumers" component={CostumersTable}/>
                    <Route path="/employees" component={EmployeesTable}/>
                    <Route path="/roles" component={RolesTable}/>
                    <Route path="/settings" component={Settings}/>
                    <Route path='/profile' component={Profile}/>
                    <Route path="/quotation" component={QuotationTable}/>

                    <Route path="/formlayout" component={FormLayoutDemo} />
                </div>

                <AppFooter layoutColorMode={layoutColorMode} />
            </div>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange}
                layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>

        </div>
    );

}

export default App;
