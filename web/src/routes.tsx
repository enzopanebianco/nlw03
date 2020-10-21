import React from  'react';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import Landing from './pages/Landing';
import OrphanatesMap from './pages/OrphanatesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';



function Routes(){
    return(
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/map" component={OrphanatesMap} />
            <Route path="/orphanages/create" component={CreateOrphanage} />
            <Route path="/orphanages/:id" component={Orphanage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;