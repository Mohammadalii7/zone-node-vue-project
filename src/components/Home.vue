<template>
<Logout />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<link rel="stylesheet" type="text/css" href="https://common.olemiss.edu/_js/sweet-alert/sweet-alert.css">
<div class="container">
    
        <button class="tab">Zone</button>
        <a href="/node"><button class="tab">Node</button>
        </a>
       
        <div class="add">
            
            <a href="/Add"><button class="add-zone">+ Add Zone</button>
            </a>
        </div>

        </div>

    
<div class="container">

    <input type="text" v-model="searchquery" placeholder="Search.....">

</div>
<button v-if="selectedItem.length > 0" @click="deleteselected" class="delete"> Delete</button>
<table class="table">
    <thead>
        <tr>
            <th scope="col"><input type="checkbox" @change="selectall($event)" /></th>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Status</th>
            <th scope="col">Created by</th>
            <th scope="col">Updated by</th>
            <th scope="col">Action
            </th>

        </tr>
        <tr v-for="item in filteredzone" :key="item.id">
            <td><input type="checkbox" v-model="selectedItem" :value="item.id"></td>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.created_by }}</td>
            <td>{{ item.updated_by }}</td>

            <td>
                <router-link :to="'/updateby/'+item.id"><i id="edit" class="bi bi-pencil-square"></i></router-link>

                <i id="del" class="bi bi-trash" @click="del(item.id)"></i>
            </td>

        </tr>
    </thead>

</table>
</template>

<script>
import axios from 'axios';
import Logout from './Logout.vue';
import Swal from 'sweetalert2';
export default {
    components: {
        Logout
    },

    data() {
        return {
            name: '',
            zone: [],
            account: [],
            searchquery: '',
            selectedItem: [],
        }
    },
    computed: {
        filteredzone() {
            return this.zone.filter(item => {
                return item.name.toLowerCase().includes(this.searchquery.toLowerCase()) ||
                    item.status.toLowerCase().includes(this.searchquery.toLowerCase()) ||
                    item.created_by.toLowerCase().includes(this.searchquery.toLowerCase());
            })
        }
    },
    methods: {
        async del(id) {
            try {
                let result = await axios.get("http://localhost:3000/zone/" + id);

                let response = await axios.get(`http://localhost:3000/Node?zone=${(result.data.name)}`);
                console.log(response.data);
                

                if (response.data.length === 0) { 

                    await axios.delete("http://localhost:3000/zone/" + id);
                    Swal.fire('Deleted!', 'Zone has been deleted.', 'success');

                } else {
                    Swal.fire('Cannot Delete', 'This zone is assigned to a node and cannot be deleted.', 'error');
                }
                this.load()
            } catch (error) {
                Swal.fire('Error', 'An error occurred while deleting the zone.', 'error');
                console.error(error); 
            }
        },

        async deleteselected() {
            const zonesToDelete = this.zone.filter(zone => this.selectedItem.includes(zone.id));

            for (let zone of zonesToDelete) {
                let nodeName = await axios.get(`http://localhost:3000/node?zone=${zone.name}`);
                if (nodeName.data.length > 0) {
                    await Swal.fire({
                        title: 'Cannot Delete',
                        text: `Zone '${zone.name}' is assigned to a node and cannot be deleted.`,
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    return;
                }
            }

            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                for (let id of this.selectedItem) {
                    await this.del(id);
                }
                this.selectedItem = [];

                Swal.fire('Deleted!', 'Your selected zones have been deleted.', 'success');
            }
        },

        async load() {
            let account = localStorage.getItem('account-info');

            if (!account) {
                this.$router.push({
                    name: 'Login'
                });
            } else {
                // let response = await axios.get("http://localhost/.php");
                // this.zone = response.data;

                let res = await axios.get("http://localhost:3000/zone");
                this.zone = res.data;
            }
        },

        selectall(event) {
            if (event.target.checked) {
                this.selectedItem = this.zone.map(item => item.id);
            } else {
                this.selectedItem = [];
            }
        }
    },

    mounted() {
        this.load();
    }
}
</script>

<style scoped>
.delete {
    background-color: red;
    color: white;
    margin-left: 100px;
    cursor: pointer;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.delete:hover {
    background-color: #991f00;
    color: white;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

table,
th,
td {
    border: 1px solid #ddd;
}

th,
td {
    padding: 10px;
    text-align: left;
}

th {
    background-color: #f8f8f8;
}

#del {
    margin-left: 20px;
    cursor: pointer;
    font-size: 1.3em;
}

#del:hover {
    color: red;
}

#edit {
    cursor: pointer;
    font-size: 1.3em;
}

#edit:hover {
    color: chartreuse;
}
.add{
    cursor: pointer;
    margin-top: -50px;
    margin-left: 86%;
    display: flex;
    justify-self: flex-end;
}
</style>
