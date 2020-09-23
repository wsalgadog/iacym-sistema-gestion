<template>

  <div>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Miembros de la Iglesia</h3>
        </div>
        <br/>
        <div class="panel-body">
            <b-button v-b-modal.modal-prevent-closing @click="addModal">Agregar Miembro</b-button>
            <br />
            <br />

            <b-table 
                :items="personas"
                :fields="fields"
                :small="true"
                :striped="true"
                :bordered="true"   
                :primary-key="persona.id"   
                :responsive="true"       
                >
                <template v-slot:cell(actions)="persona">
                    <b-button size="sm" @click="editModal(persona.item)" class="mr-1">
                    Modificar
                    <b-icon icon="edit" size="is-small"></b-icon>
                    </b-button>
                    <b-button size="sm" @click="deletePersona(persona.item)" class="btn btn-danger btn-sm">
                    Eliminar
                    <b-icon icon="delete" size="is-small"></b-icon>
                    </b-button>
                </template>
            </b-table>

       
        </div>
    </div>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      v-bind:title="titulo"
      size="lg"
      cancel-title="Cancelar"
      ok-title="Guardar"
      @hidden="resetModal"      
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-card no-body>
            <b-tabs card>
            <b-tab title="Datos personales" active>
                <b-form-group
                :state="nombreState"
                label="Nombres"
                label-for="input-nombre"
                >
                    <b-form-input id="input-nombre" 
                        v-model="persona.nombres" 
                        class="form-control"  
                        :state="nombreState"
                        placeholder="Digite el nombre de la persona"   
                        :formatter="formatoMayusculas"         
                        trim    
                        required  
                        autofocus       
                    ></b-form-input>          
                </b-form-group>

                <b-form-group
                :state="apellidoState"
                label="Apellidos"
                label-for="input-apellido"
                >
                    <b-form-input id="input-apellido" 
                        v-model="persona.apellidos" 
                        class="form-control"  
                        :state="apellidoState"
                        placeholder="Digite el apellido de la persona"                         
                        :formatter="formatoMayusculas"                             
                        trim    
                        required         
                    ></b-form-input>          
                </b-form-group>

                <b-form-group
                label="Fecha de Nacimiento"
                label-for="input-fecha"
                >
                    <b-form-input id="input-fecha" 
                        v-model="persona.fechanacimiento" 
                        class="form-control"  
                        placeholder="Seleccione la fecha de nacimiento"                
                        type="date"        
                    ></b-form-input>          
                </b-form-group>

                <b-form-group 
                    label="Estado Civil:" 
                    label-for="select-ecivil"
                >
                    <b-form-select id="select-ecivil"
                        v-model="persona.estadocivil"
                        :options="estadocivil"
                    ></b-form-select>
                </b-form-group>                
            </b-tab>
            <b-tab title="Contacto">

                <b-form-group
                label="Email"
                label-for="input-email"
                invalid-feedback="Ingrese minimo 10 digitos"
                >
                    <b-form-input id="input-email" 
                        v-model="persona.email" 
                        class="form-control"  
                        placeholder="Digite el email de la persona"   
                        :formatter="formatoMinusculas" 
                        type="email"            
                        trim         
                    ></b-form-input>          
                </b-form-group>

                <b-form-group
                label="Telefono"
                label-for="input-telefono"
                >
                    <b-form-input id="input-telefono" 
                        v-model="persona.telefono" 
                        class="form-control"  
                        placeholder="Digite el telefono de la persona"   
                        type="tel"              
                    ></b-form-input>          
                </b-form-group>

            </b-tab>
            <b-tab title="Dirección">
                <b-form-group 
                    label="Distrito:" 
                    label-for="select-distrito"
                >
                    <b-form-input id="input-distrito"
                        v-model="persona.distrito"
                        list="list-distrito"
                    ></b-form-input>
                    <datalist id="list-distrito">
                        <option v-for="distrito in distritos" v-bind:key="distrito">{{ distrito }}</option>
                    </datalist>                          
                </b-form-group>

                <b-form-group
                label="Dirección:"
                label-for="textarea-direccion"
                >
                    <b-form-textarea
                        id="textarea-direccion"
                        placeholder="Digite la dirección"   
                        rows="3"                    
                        v-model="persona.direccion"          
                        trim         
                    ></b-form-textarea>                        
                </b-form-group>
            </b-tab>      
            <b-tab title="Identificación">
                <b-form-group 
                    label="Tipo de Documento:" 
                    label-for="select-tipodoc"
                >
                    <b-form-select id="select-tipodoc"
                        v-model="persona.tipodocumento"
                        :options="tipodocs"
                    ></b-form-select>
                </b-form-group>

                <b-form-group
                label="Número de Documento:"
                label-for="input-nrodoc"
                >
                    <b-form-input id="input-nrodoc" 
                        v-model="persona.numero_documento" 
                        class="form-control"  
                        placeholder="Digite el número de documento de identidad"   
                        type="number"             
                        trim         
                    ></b-form-input>          
                </b-form-group>
            </b-tab>                  
            </b-tabs>
        </b-card>

      </form>
    </b-modal>

    <ul class="errors">
    </ul>
</div>

</template>

<script>

    import { personasRef } from './../db'
    import { db } from './../db'
    
    export default {
        data() {
            return {
                modal: null,       
                titulo: '',     
                idpersona: null,
                personas: [],
                persona: {
                    nombres: '',
                    apellidos: '',
                    email: '',
                    estadocivil: null,
                    fechanacimiento: '',
                    telefono: '',
                    tipodocumento: null,
                    numero_documento: '',
                    distrito:'',
                    direccion:''
                },     
                fields: [                     
                    {
                        key: 'nombres',
                        sortable: true
                    },
                    {
                        key: 'apellidos',
                        sortable: false                      
                    },
                    {
                        key: 'estadocivil',
                        label: 'E.Civil',
                        sortable: true
                    },
                    {
                        key: 'fechanacimiento',
                        label: 'F.Nac.',
                        sortable: false
                    },
                    {
                        key: 'email',
                        label: 'email',
                        sortable: false
                    },    
                    {
                        key: 'telefono',
                        label: 'Teléfono',
                        sortable: false
                    },   
                    {
                        key: 'actions',
                        label: ''
                    },                      
                                                                                                                                         
                ],                
                tipodocs: [{ text: 'Seleccione', value: null }, 'DNI', 'CE'],       
                distritos: ['LOS OLIVOS', 'SAN MARTIN DE PORRES', 'SAN MIGUEL'],
                estadocivil: [{ text: 'Seleccione', value: null }, 'CASADO', 'SOLTERO', 'VIUDO', 'DIVORCIADO', 'CONVIVIENTE', 'SEPARADO'],          
            }
        },
        created(){
            this.$bind('personas', personasRef).then(personas => {
                this.personas === personas
            })
            //this.$bindAsArray('personas', personasRef);
        },        
        computed:{
            nombreState() {
                return this.persona.nombres.length > 2 ? true : false
            },
            apellidoState() {
                return this.persona.apellidos.length > 2 ? true : false
            }            
        },
        methods: {  
            addModal(){
                this.modal = 'new';
                this.titulo = "Nueva persona"
                this.resetModal();
                this.$bvModal.show('modal-prevent-closing')
            },
            editModal(persona) {
                this.idpersona = persona.id
                this.modal = 'edit';
                this.titulo = persona.nombres + ' ' + persona.apellidos
                //console.log( this.idpersona)                
                db.collection('personas')
                    .doc(persona.id)
                    .get()
                    .then(snapshot => {
                        this.persona = snapshot.data()
                    })

                //console.log(this.persona)


                //personasRef.child(persona['.key']).update({ edit:true }); 
                this.$bvModal.show('modal-prevent-closing')
            },            
            resetModal(){
                this.persona = {
                    nombres: '',
                    apellidos: '',
                    email: '',
                    estadocivil: null,
                    fechanacimiento: '',
                    telefono: '',
                    tipodocumento: null,
                    numero_documento: '',
                    distrito:'',
                    direccion:''
                }
                this.idpersona = null
            },            
            updatePersona(){
                db.collection('personas')
                    .doc(this.idpersona)
                    .set(this.persona)
                    .then(() => {
                        //console.log('user updated!')
                    })

                this.$bvModal.hide('modal-prevent-closing')
            },
            addPersona(){       
                console.log('nuevoooo')     
                personasRef.add(this.persona)
                this.$bvModal.hide('modal-prevent-closing')
            },
            deletePersona(persona){
                personasRef.doc(persona.id).delete()             
            },         
            checkFormValidity() {
                const valid = this.$refs.form.checkValidity()
                return valid
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
                if(this.modal=="edit")
                { 
                    this.updatePersona()
                } else {
                    this.addPersona()
                }
                
                this.$nextTick(() => {
                    this.$bvModal.hide('modal-prevent-closing')
                })
            },
            formatoMayusculas(value) {
                return value.toUpperCase();
            },
            formatoMinusculas(value) {
                return value.toLowerCase();
            }                               
            /*
             
            editPersona: function(persona) {
                modal = "edit"
                //this.resetModal()
                this.persona = persona
                this.$bvModal.show('modal-prevent-closing')
            },       
            updatePersona: function(persona) {
                const childKey = persona['.key'];
                delete persona['.key'];
                this.$firebaseRefs.personas.child(childKey).set(persona)
            },                  
            removePersona(persona){
                console.log(persona)
                personasRef.doc(persona.id).delete()
                //postsRef.child(post['.key']).remove()
                //toastr.success('Persona removed successfully')                
            },
            checkFormValidity() {
                const valid = this.$refs.form.checkValidity()
                this.nameState = valid
                return valid
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
            */      
        }
    }

</script>