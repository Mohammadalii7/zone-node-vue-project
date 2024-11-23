<template>
<Logout />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<div class="container">
    <!-- <div class="tabs"> -->
        <a href="/home"><button class="tab">Zone</button></a>
        <a href="/node"><button class="tab">Node</button>
        </a>
        <div class="add">

            <a href="/an"><button class="add-zone">+ Add Node</button></a>
        </div>
        <!-- 
        <a href="/"><button class="tab" @click="logout()">Logout</button>
        </a> -->
    </div>

<!-- </div> -->

<div class="container">

    <input type="text" v-model="searchquery" placeholder="Search.....">

</div>
<button v-if="selectedItem.length > 1" @click="deleteselected" class="delete"> Delete</button>

<table class="table">
    <thead>
        <tr>
            <th scope="col"><input type="checkbox" @change="selectall($event)" /></th>
            <th scope="col">id</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Zone</th>
            <th scope="col">Status</th>
            <th scope="col">Created by</th>
            <th scope="col">Updated by</th>
            <th scope="col">Action
            </th>

        </tr>
        <tr v-for="item in filterednode" :key="item.id">
            <td><input type="checkbox" v-model="selectedItem" :value="item.id"></td>
            <td>{{ item.id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.description }}</td>
            <td>{{ item.zone }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.created_by }}</td>
            <td>{{ item.updated_by }}</td>

            <td>
                <router-link :to="'/un/'+item.id"><i id="edit" class="bi bi-pencil-square"></i></router-link>

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

            node: [],
            account: [],
            searchquery: '',
            selectedItem: [],
        }
    },
    computed: {
        filterednode() {
            return this.node.filter(item => {
                return item.name.toLowerCase().includes(this.searchquery.toLowerCase()) ||
                    item.status.toLowerCase().includes(this.searchquery.toLowerCase()) ||
                    item.created_by.toLowerCase().includes(this.searchquery.toLowerCase());
            })
        }
    },
    methods: {

        async del(id) {
            let result = await axios.delete("http://localhost:3000/Node/" + id)
            if (result.status == 200) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Delete Node successfully"
                });
                this.load()
            }
        },
        async deleteselected() {

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
                // Proceed with deletion if confirmed
                for (let id of this.selectedItem) {
                    await this.del(id);
                }
                this.selectedItem = [];

                // Show success message
                Swal.fire(
                    'Deleted!',
                    'Your selected Nodes have been deleted.',
                    'success'
                );
            }
        },
        async load() {
            let account = localStorage.getItem('account-info')

            if (!account) {
                this.$router.push({
                    name: 'Login'
                })
            } else {
                // this.name=JSON.parse(account).name

                let response = await axios.get("http://localhost:3000/Node")
                this.node = response.data
            }
        },

    },
    selectall(event) {
        if (event.target.checked) {
            this.selectedItem = this.node.map(item => item.id);
        } else {
            this.selectedItem = []
        }
    },

    mounted() {
        this.load()
    }
}
</script >

<style >
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
#del {
    margin-left: 20px;
    margin-right: auto;
    cursor: pointer;
    font-size: 1.3em;

    &:hover {
        color: red;
    }
}

#edit {
    margin-right: auto;
    cursor: pointer;
    font-size: 1.3em;

    &:hover {
        color: chartreuse;
    }
}

body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
}

.container {
    width: 90%;
    margin: 20px auto;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.tab,
.add-zone {
    padding: 10px 20px;
    margin-right: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 5px;
}

.add-zone {
    background-color: #28a745;
}

.controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.controls select,
.controls button,
.controls input {
    margin-right: 10px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
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

.pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.pagination button {
    padding: 5px 10px;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
    border-radius: 5px;
}

.pagination span {
    padding: 5px 10px;
}
.add{
    cursor: pointer;
    margin-top: -50px;
    margin-left: 86%;
    display: flex;
    justify-self: flex-end;
}
</style>
