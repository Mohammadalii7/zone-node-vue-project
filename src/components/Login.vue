
<template>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <section class="h-100 h-custom bg-light" >
      <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col d-flex justify-content-center align-items-center">
                      
                  <div class="card border-0 " style="min-width:350px; max-width:500px">
                      <div class="card-body">
                          <h3 class="mb-4">Janitor</h3>
                          <hr/>
                          <div v-if="v$.$errors.length > 0" class="alert alert-danger" role="alert">
                              <ul>
                                  <li
                                      v-for="error of v$.$errors"
                                      :key="error.$uid"
                                      >
                                      <strong>{{ error.$validator }}</strong>
                                      <small> on property </small>
                                      <strong>{{ error.$property }}</strong>
                                      <small> says: </small>
                                      <strong>{{ error.$message }}</strong>
                                  </li>
                              </ul>
                          </div>
                          <form @submit="Login">
                              
                              <div class="mb-3">
                                  <label class="form-label">Email</label>
                                  <input type="email" class="form-control"
                                      v-model.trim="form.email"
                                      @input="setTouched('email')"
                                      :class="v$.form.email.$error?'is-invalid':''"
                                  >
                                  <div v-for="error of v$.form.email.$errors" class="invalid-feedback"  :key="error.$uid"> 
                                      {{ error.$message }}
                                  </div>
                              </div>
                              <!-- Input--------------------->
                              <div class="mb-3">
                                  <label class="form-label">Password</label>
                                  <input type="password" class="form-control"
                                      v-model.trim="form.password"
                                      @input="setTouched('password')"
                                      :class="v$.form.password.$error?'is-invalid':''"
                                  >
                                  <div v-for="error of v$.form.password.$errors" class="invalid-feedback"  :key="error.$uid"> 
                                      {{ error.$message }}
                                  </div>
                              </div>
                              <br/>
                              <div class="mb-3 text-center">
                                  <button class="btn btn-primary"><i class="fa fa-lock icon"></i> Log in</button><br/><br/>
                                  
                                  <!-- <router-link to="/Sigin">Sign Up</router-link> -->
                              </div>
                              <hr/>
  
                          </form>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </section>
  </template>





<script>
import axios from 'axios';
import useVuelidate from '@vuelidate/core'
// eslint-disable-next-line no-unused-vars
import { required, email, sameAs, between, minValue, maxValue, alpha, numeric, helpers,minLength ,maxLength } from '@vuelidate/validators'
import swal from 'sweetalert';

export default{
  // eslint-disable-next-line vue/multi-word-component-names
  name:'Login',
    setup() {
        return { v$: useVuelidate() }
    },
    data(){
        return{
          form:{
            email:'',
            password:'',
          },
        }
    },
    validations() {
      return {
        form: {
          
          email: {
              required,
              email
          },
          password: {
              required,
            //   password
          },
        },
      }
    }, 
    methods: {
        setTouched(theModel) {
        if(theModel == 'email' || theModel == 'all' ){this.v$.form.email.$touch()}
        if(theModel == 'password' || theModel == 'all'){this.v$.form.password.$touch()}
        },
        
        async Login(e){
            e.preventDefault();
            
            this.setTouched('all');
            if (!this.v$.$invalid) {
                let result = await axios.get(`http://localhost:3000/account?email=${this.form.email}&password=${this.form.password}`);
                
                console.log(result);
                if( result.data == ''){
                    swal("Oops!", "Email is not register", "error");    
                }
                else if(result.data[0].password != this.form.password){
                    swal("Oops!", "Password is incorrect", "error");    
                }
                
                else if(this.form.email == result.data[0].email && this.form.password == result.data[0].password){
                    localStorage.setItem("account-info",JSON.stringify(result.data[0]))
                    this.$router.push({name:'Home'})
                }
            }
        }   
    },

    mounted(){
        let account=localStorage.getItem('account-info')
        
        if(account){ 
            this.$router.push({name:'Home'})
        }
    },
}
    
   
// }
// }

</script>