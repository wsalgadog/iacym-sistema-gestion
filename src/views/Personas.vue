<template>

  <div>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Personas</h3>
        </div>
        <br/>
        <div class="panel-body">
            <b-button v-b-modal.modal-prevent-closing>Agregar Persona</b-button>
            <br />
            <div class="panel panel-default">
                <table class="table table-striped">
                    <tr>
                        <th>Nombres</th>
                        <th>email</th>
                        <th>Tipo Doc</th>
                        <th>Nro Doc</th>
                        <th>Acciones</th>
                    </tr>
                    <tr v-for="persona in personas" :key="persona['.key']">
                        <td>{{persona.nombres}}</td>
                        <td>{{persona.email}}</td>
                        <td>{{persona.tipodocumento}}</td>
                        <td>{{persona.numero_documento}}</td>
                        <td>
                            <button v-on:click="editPersona(persona)" type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> Edit</button>
                            <button v-on:click="removePersona(persona)" type="button" class="btn btn-danger btn-sm"><span class="glyphicon glyphicon-trash" aria-hidden="true"></span> Delete</button>
                        </td>
                    </tr>
                </table>
            </div>            
        </div>
    </div>


    

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Datos de la persona"
      size="lg"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          :state="nameState"
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"    
        >

        <div class="form-group">
            <label for="exampleInputPassword1">Nombres</label>
            <input v-model="newPersona.nombres" type="text" class="form-control" id="exampleInputPassword1" placeholder="Business Name">
        </div>
        <div class="form-group">
            <label for="basic-url">email</label>
            <div class="input-group">
            <input v-model="newPersona.email" type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
            </div>
        </div>

        <b-form-group id="input-group-3" label="Tipo Documento:" label-for="input-3">
            <b-form-select
            id="input-3"
            v-model="newPersona.tipodocumento"
            :options="tipodocs"
            required
            ></b-form-select>
        </b-form-group>

        <div class="form-group">
            <label for="basic-url">Número Documento</label>
            <div class="input-group">
            <input v-model="newPersona.numero_documento" type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3">
            </div>
        </div>

        <b-button type="button" variant="primary" v-if="newPersona['.key']" v-on:click="updatePersona(newPersona)">Update</b-button>
        <b-button type="submit" variant="danger" v-if="!newPersona['.key']" v-on:click="addPersona">Add Persona</b-button>

        </b-form-group>
      </form>
    </b-modal>






    <ul class="errors">
    </ul>
</div>

</template>

<script>

    import { personasRef } from './../db'

    export default {
        data() {
            return {
                personas: [],
                nameState: null,
                newPersona: {
                    nombres: '',
                    email: '',
                    tipodocumento: null,
                    numero_documento: ''
                },
                tipodocs: [{ text: 'Seleccione', value: null }, 'DNI', 'CE'],                
            }
        },
        methods: {
            addPersona() {
                personasRef.add(this.newPersona)
            },          
            editPersona: function(persona) {
                this.newPersona = persona
                this.$bvModal.show('modal-prevent-closing')
            },       
            updatePersona: function(persona) {
                const childKey = persona['.key'];
                delete persona['.key'];
                this.$firebaseRefs.personas.child(childKey).set(persona)
            },                  
            removePersona(persona){
                personasRef.doc(persona.id).delete()
                //postsRef.child(post['.key']).remove()
                //toastr.success('Persona removed successfully')                
            },
            checkFormValidity() {
                const valid = this.$refs.form.checkValidity()
                this.nameState = valid
                return valid
            },            
            resetModal() {
                this.newPersona.nombres = ''
                this.newPersona.email = ''
                this.newPersona.tipodocumento = null
                this.newPersona.numero_documento = ''
            },  
            handleOk(bvModalEvt) {
                    // Prevent modal from closing
                    bvModalEvt.preventDefault()
                    // Trigger submit handler
                    this.handleSubmit()
            },
            handleSubmit() {
                // Exit when the form isn't valid
                if (!this.checkFormValidity()) {
                    return
                }
                // Push the name to submitted names
                //this.submittedNames.push(this.name)
                // Hide the modal manually
                this.addPersona()
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing')
                })
            }            
        },
        created(){
            this.$bind('personas', personasRef).then(personas => {
                // user will point to the same property declared in data:
                this.personas === personas
            })
            //this.$bindAsArray('personas', personasRef);
        }
    }

</script>