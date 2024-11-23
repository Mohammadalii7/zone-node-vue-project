<template>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<div class="container">
    <h2>Update Zone</h2>
    <hr>
    <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" v-model="form.name" @blur="validatename">
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
    </div>
    <div class="form-group">
        <label for="description">Description</label>
        <textarea id="description" name="description" v-model="form.description" @blur="validatedescription"></textarea>
        <span v-if="errors.description" class="error">{{ errors.description }}</span>
    </div>
    <div class="form-group">
        Status
        <label class="switch">
            <input type="checkbox" v-model="isEnabled">
            <span class="slider round"></span>
        </label>
        <br />
        <hr>

        <button class="btn" @click="update()"><i class="fas fa-sync"></i>Update</button>
    </div>
</div>
<input type="hidden" id="created_by" name="created_by" v-model="form.created_by">
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
export default {
    data() {

        return {
            isEnabled: false,
            form: {
                name: '',
                description: '',
                created_by: ''
            },
            errors: {
                name: '',
                description: '',

            }
        }
    },
    methods: {
        validatename() {

            if (!this.form.name) {
                this.errors.name = 'Name is required.';
            } else {
                this.errors.name = '';
            }
        },
        validatedescription() {
            if (!this.form.description) {
                this.errors.description = 'Description is required.';
            } else {
                this.errors.description = '';
            }
        },
        // async upZexist(name){
        //   try{
        //     const result=await axios.get(`http://localhost:3000/zone?name=${(name)}`)
        //     return result.data.length > 0;
        //   } catch(error){ 
        //     console.error('Error checking if zone exists:', error);
        //     return false;

        //   }
        // },
        async update() {
            this.validatename()
            this.validatedescription()

            if (this.errors.name || this.errors.description) {
                return;
            }

            var account_info = JSON.parse(localStorage.getItem('account-info'));
            (this.isEnabled) ? this.form.status = "Enable": this.form.status = "Disable";

            let result = await axios.put(`http://localhost:3000/zone/${this.$route.params.id}`, {

                name: this.form.name,
                description: this.form.description,
                status: this.form.status,
                updated_by: account_info.email,
                created_by: this.form.created_by

            });
            if (result.status == 200) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Update Zone Successfully"
                });
                this.$router.push({
                    name: 'Home'
                })
            }
        }
    },

    async mounted() {
        try {
            let account = localStorage.getItem('account-info');
            if (!account) {
                this.$router.push({
                    name: 'Login'
                });
            }
            const result = await axios.get(`http://localhost:3000/zone/${this.$route.params.id}`);

            this.form = result.data;

            this.isEnabled = (this.form.status == "Enable") ? true : false;

        } catch (error) {
            console.log(error);
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: linear-gradient(135deg, #f9f9f9, #e0e0e0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
}

input[type="text"],
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 1em;
    transition: border-color 0.3s, box-shadow 0.3s;
}

input[type="text"]:focus,
textarea:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.error {
    color: red;
    font-size: 0.875em;
    margin-top: 5px;
}

.switch {
    display: flex;
    align-items: center;
}

.switch input {
    display: none;
}

.slider {
    position: relative;
    width: 40px;
    height: 20px;
    background-color: #ccc;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.slider:before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 50%;
    top: 1px;
    left: 1px;
    transition: transform 0.2s;
}

input:checked+.slider {
    background-color: #4caf50;
}

input:checked+.slider:before {
    transform: translateX(20px);
}

.btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
}

.btn:hover {
    background-color: #0056b3;
    transform: scale(1.05);
}

.container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background: linear-gradient(135deg, #f9f9f9, #e0e0e0);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
}

input[type="text"],
textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 1em;
    transition: border-color 0.3s, box-shadow 0.3s;
}

input[type="text"]:focus,
textarea:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.error {
    color: red;
    font-size: 0.875em;
    margin-top: 5px;
}

.switch {
    display: flex;
    align-items: center;
}

.switch input {
    display: none;
}

.slider {
    position: relative;
    width: 40px;
    height: 20px;
    background-color: #ccc;
    border-radius: 20px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.slider:before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    background-color: white;
    border-radius: 50%;
    top: 1px;
    left: 1px;
    transition: transform 0.2s;
}

input:checked+.slider {
    background-color: #4caf50;
}

input:checked+.slider:before {
    transform: translateX(20px);
}

.btn {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
    display: flex;
    align-items: center;
}

.btn i {
    margin-right: 8px;
}

.btn:hover {
    background-color: #0056b3;
    transform: scale(1.05);
}
</style>
