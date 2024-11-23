import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Add from './components/Add.vue'
import Updateby from './components/Updateby.vue'
import Node from './components/Node.vue'
import Addnode from './components/Addnode.vue'
import Updatenode from './components/Updatenode.vue'
// import Logout from './components/Logout.vue'

import {createWebHistory,createRouter} from 'vue-router'

const routes=[{
    name:'Home',
    component:Home,
    path:'/home',

},
{
    name:'Login',
    component:Login,
    path:'/',
},
{
    name:'Add',
    component:Add,
    path:'/add',
},
{
    name:'Updateby',
    component:Updateby,
    path:'/updateby/:id',
},
{
    name:'Node',
    component:Node,
    path:'/node',
},
{
    name:'Addnode',
    component:Addnode,
    path:'/an',
},
{
    name:'Updatenode',
    component:Updatenode,
    path:'/un/:id',
}

]
const router=createRouter({
    history:createWebHistory(),
    routes
    })

    export default router;