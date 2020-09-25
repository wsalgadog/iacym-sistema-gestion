<template>

  <div>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Cursos</h3>
        </div>
        <br/>

        <div class="panel-body">
            <b-button v-b-modal.modal-prevent-closing @click="addModal">Agregar Curso</b-button>
            <br />
            <br />

            <b-table 
                :items="grupos"
                :fields="fields"
                :small="true"
                :striped="true"
                :bordered="true"   
                :primary-key="grupo.id"                   
                :responsive="true"  
                :sticky-header=true
                head-variant="light"     
                table-variant="light"
                >                
                <template v-slot:cell(actions)="grupo">
                    <b-button size="sm" @click="editModal(grupo.item)" class="mr-1" variant="outline-primary">
                        <b-icon icon="person-lines-fill" size="is-small"></b-icon>
                    </b-button>                 
                    <b-button size="sm" @click="editModal(grupo.item)" class="mr-1" variant="outline-secondary">
                        <b-icon icon="pencil" size="is-small"></b-icon>
                    </b-button>
                    <b-button size="sm" @click="deleteGrupo(grupo.item)" class="btn btn-danger btn-sm">
                        <b-icon icon="trash" size="is-small"></b-icon>
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
            <div>
                <b-form-group
                :state="nombreState"
                label="Nombre del curso"
                label-for="input-nombre"
                >                
                   <b-form-input id="input-nombre" 
                        v-model="grupo.nombre" 
                        class="form-control"  
                        :state="nombreState"
                        placeholder="Digite el nombre del curso"   
                        :formatter="formatoMayusculas"         
                        trim    
                        required  
                        autofocus       
                    ></b-form-input>          
                </b-form-group>

                <b-form-group
                :state="encargadoState"
                label="Encargado"
                label-for="input-encargado"
                >
                    <b-form-input id="input-encargado" 
                        v-model="grupo.encargado" 
                        class="form-control"  
                        :state="encargadoState"
                        placeholder="Digite el encargado del curso"                         
                        :formatter="formatoMayusculas"                             
                        trim    
                        required         
                    ></b-form-input>          
                </b-form-group>

                <b-form-group
                label="Asistente"
                label-for="input-asistente"
                >
                    <b-form-input id="input-asistente" 
                        v-model="grupo.asistente" 
                        class="form-control"  
                        placeholder="Digite el asistente del curso"                         
                        :formatter="formatoMayusculas"                             
                        trim    
                    ></b-form-input>          
                </b-form-group>

                <b-row>
                <b-col cols="4">
                    <b-form-group
                    label="Fecha de Inicio"
                    label-for="input-finicio"
                    >
                        <b-form-input id="input-finicio" 
                            v-model="grupo.fecha_inicio" 
                            class="form-control"  
                            placeholder="Seleccione la fecha de inicio"                
                            type="date"        
                        ></b-form-input>          
                    </b-form-group>
                </b-col>
                
                <b-col cols="4">
                    <b-form-group
                    label="Fecha de Fin"
                    label-for="input-ffin"
                    >
                        <b-form-input id="input-ffin" 
                            v-model="grupo.fecha_fin" 
                            class="form-control"  
                            placeholder="Seleccione la fecha de Fin"                
                            type="date"        
                        ></b-form-input>          
                    </b-form-group>	
                </b-col>

                <b-col cols="4">
                    <b-form-group 
                        label="Estado:" 
                        label-for="select-estado"
                    >
                        <b-form-select id="select-estado"
                            v-model="grupo.estado"
                            :options="estados"
                        ></b-form-select>
                    </b-form-group>                        
                </b-col>
                </b-row>
               
            </div>            
        </form>

    </b-modal>

    <ul class="errors">
    </ul>
</div>

</template>

<script>

    import { gruposRef } from './../db'
    import { db } from './../db'
    //const moment= require('moment') 
    //require('moment/locale/es')

    export default {
        data() {
            return {
                modal: null,       
                titulo: '',     
                idgrupo: null,
                grupos: [],
                grupo: {
                    nombre: '',
                    asistente: '',
                    encargado: '',
                    estado: null,
                    fecha_inicio: '',
                    fecha_fin: ''
                },     
                fields: [                     
                    {
                        key: 'nombre',
                        label: 'Nombre del Curso',
                        sortable: true
                    },
                    {
                        key: 'encargado',
                        sortable: false                      
                    },
                    {
                        key: 'asistente',
                        sortable: true
                    },
                    {
                        key: 'estado',
                        sortable: true
                    },
                    {
                        key: 'fecha_inicio',
                        label: 'Fecha Inicio'
                    },  
                    {
                        key: 'fecha_fin',
                        label: 'Fecha Fin'
                    },                       
                    {
                        key: 'actions',
                        label: ''
                    },                      
                                                                                                                                         
                ],                
                tipodocs: [{ text: 'Seleccione', value: null }, 'DNI', 'CE'],       
                distritos: ['LOS OLIVOS', 'SAN MARTIN DE PORRES', 'SAN MIGUEL'],
                estados: ['VIGENTE', 'CULMINADO'],          
            }
        },
        created(){
            this.$bind('grupos', gruposRef).then(grupos => {
                this.grupos === grupos
            })
            //this.$bindAsArray('personas', personasRef);
        },        
        computed:{
            nombreState() {
                return this.grupo.nombre.length > 2 ? true : false
            } ,
            encargadoState() {
                return this.grupo.encargado.length > 2 ? true : false
            }                       
        },
        methods: {  
            /*
            getFecha(fecha){
                console.log(fecha)
                
                if (fecha == null){
                    return 'xxx'
                }else {
                    console.log(fecha)
                    console.log(new Date(fecha) | moment("DD/MM/YYYY"))
                    return "sarava" //
                }
                
                
            }, */        
            getitemcontrols() {
                return 'item.controls';
            },            
            addModal(){
                this.modal = 'new';
                this.titulo = "Nuevo Curso"
                this.resetModal();
                this.$bvModal.show('modal-prevent-closing')
            },
            editModal(grupo) {
                this.idgrupo = grupo.id
                this.modal = 'edit';
                this.titulo = grupo.nombre
                //console.log( this.idpersona)                
                db.collection('grupos')
                    .doc(grupo.id)
                    .get()
                    .then(snapshot => {
                        this.grupo = snapshot.data()
                    })

                //console.log(this.persona)


                //personasRef.child(persona['.key']).update({ edit:true }); 
                this.$bvModal.show('modal-prevent-closing')
            },            
            resetModal(){
                this.grupo = {
                    nombre: '',
                    asistente: '',
                    encargado: '',
                    estado: null,
                    fecha_inicio: '',
                    fecha_fin: ''
                }
                this.idgrupo = null
            },            
            updateGrupo(){
                db.collection('grupos')
                    .doc(this.idgrupo)
                    .set(this.grupo)
                    .then(() => {
                        //console.log('user updated!')
                    })

                this.$bvModal.hide('modal-prevent-closing')
            },
            addGrupo(){       
                gruposRef.add(this.grupo)
                this.$bvModal.hide('modal-prevent-closing')
            },
            deleteGrupo(grupo){
                gruposRef.doc(grupo.id).delete()             
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
                    this.updateGrupo()
                } else {
                    this.addGrupo()
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
        }
    }

</script>